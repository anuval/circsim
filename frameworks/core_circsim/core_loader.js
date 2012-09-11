SC.mixin(CoreCircsim, {

    /*
     * Loads the simulation procedure information into memory.
     * 
     * Procedure information is specified in XML files stored on the server. The
     * structure is as follows:
     * 
     * procedure_1/ procedure_1/answer_keys.xml procedure_1/procedure.xml
     * 
     * procedure_2/ procedure_2/answer_keys.xml procedure_2/procedure.xml
     * 
     * ...
     * 
     * The procedure directories must be named using the format "procedure_N"
     * where N is a number (no leading zeros). The numbers should be sequential
     * (i.e. do not skip). This function assumes directory names to be in this
     * format and reads the contents of each directory until it finds a
     * directory that does not exist. Thus, if you have directories numbered 1,
     * 2, 4, then directory 4 will not be read because the function did not find
     * directory 3.
     * 
     * The XML files are generated from a Microsoft Excel spreadsheet using the
     * "save as XML" option when saving.
     * 
     * The information read from the XML files are saved to memory using
     * SproutCore's datastore functionality.
     */
    populateProcedures : function() {

        var answerKeysFile = "answer_keys.xml";
        var procedureFile = "procedure.xml";
        var procedureDirBasename = "procedure_";

        var hasProcedures = true;
        var procedureNumber = 1;

        // used as a part of creating the ID for the procedure record
        var proceduresMultiplier = 1000;

        while (hasProcedures) {

            // the ID passed to the datastore when saving the procedure
            var procedureID = proceduresMultiplier * procedureNumber;

            /*
             * Step 1: Make sure the procedure directory exists.
             */

            if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome,
                // Opera, Safari
                directoryRequest = new XMLHttpRequest();
            } else {// code for IE6, IE5
                directoryRequest = new ActiveXObject("Microsoft.XMLHTTP");
            }

            var procedureDirectory = procedureDirBasename + procedureNumber + "/";
	    var procedureExists = false;

            directoryRequest.open("GET", procedureDirectory, false);
            directoryRequest.send();
            SC.debug("Request status code is " + directoryRequest.status);

            if (directoryRequest.status == 403) {
                fileRequest.open("GET", fileToRetrieve, false);
                fileRequest.send();
                SC.debug("Request status code of file is " + fileRequest.status);
                if (fileRequest.status == 200) {
                    procedureExists = true;
                }
	    }
            else if (directoryRequest.status == 200) {
                procedureExists = true;
            }

            if (procedureExists === true) {

                /*
                 * Step 2: Read information from procedure.xml.
                 */

                // Retrieve procedure file
                var fileToRetrieve = procedureDirectory + procedureFile;
                if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome,
                    // Opera, Safari
                    fileRequest = new XMLHttpRequest();
                } else {// code for IE6, IE5
                    fileRequest = new ActiveXObject("Microsoft.XMLHTTP");
                }

                fileRequest.open("GET", fileToRetrieve, false);
                fileRequest.send();
                if (fileRequest.status != 200) {
                    SC.error("Procedure file not found: " + fileToRetrieve);
                    break;
                }

                xmlDoc = fileRequest.responseXML;

                procedure = CoreCircsim.store.createRecord(CoreCircsim.Procedure, {
                    instructions : "Instructions go here.",
                    isComplete : false,
                    cols : [ "DR", "RR", "SS" ],
                    rows : [ "IS", "CVP", "SV", "HR", "CO", "Ra", "MAP" ],
                    relationshipEvaluations : [ {
                        equation : [ 4, 2, 3 ],
                        intro : "Before the simulation is run your predictions will be reviewed for logical consistency and for conformity to the relationship: CO=SVxHR. You will be asked to correct any errors. Please click Next to continue.",
                        errorMessage : "Your predictions do not agree with the relationship: CO = HR X SV. You need to correct your errors.  Click Next when you are finished.",
                        summaryCorrectMessage : "Great! Your predictions are consistent with the relationship: CO=SVxHR",
                        summaryIncorrectMessage : "Sorry, your predictions are still not consistent with the relationship: CO=SVxHR. However, at this time we will move on."
                    }, {
                        equation : [ 6, 4, 5 ],
                        intro : "Before the simulation is run your predictions will be reviewed for logical consistency and for conformity to the relationship: MAP = CO x TPR. You will be asked to correct any errors. Please click Next to continue.",
                        errorMessage : "Your predictions do not agree with the relationship: MAP = CO x TPR. You need to correct your errors.  Click Next when you are finished.",
                        summaryCorrectMessage : "Great! Your predictions are consistent with the relationship: MAP = CO x TPR",
                        summaryIncorrectMessage : "Sorry, your predictions are still not consistent with the relationship: MAP = CO x TPR. However, at this time we will move on."
                    } ]
                }, procedureID);

                // Loop through rows
                allRows = xmlDoc.getElementsByTagName("Row");

                cellOffset = 1;

                allCellsInRow = allRows[1].getElementsByTagName("Cell");
                procedure.set('title', allCellsInRow[0].childNodes[0].childNodes[0].nodeValue);
                procedure.set('introduction', allCellsInRow[1].childNodes[0].childNodes[0].nodeValue);
                procedure.set('initialVariable', parseInt(allCellsInRow[2].childNodes[0].childNodes[0].nodeValue, 10));
                procedure.set('initialVariableDirection', parseInt(allCellsInRow[3].childNodes[0].childNodes[0].nodeValue, 10));
                procedure.set('initialVariableSummary', allCellsInRow[4].childNodes[0].childNodes[0].nodeValue);
                procedure.set('procedureSummary', allCellsInRow[5].childNodes[0].childNodes[0].nodeValue);

                keyArray = allCellsInRow[6].childNodes[0].childNodes[0].nodeValue.split(',');
                for (i = 0; i < keyArray.length; ++i) {
                    keyArray[i] = parseInt(keyArray[i], 10);
                }
                procedure.set('key', keyArray);

                /*
                 * Step 3: Read in the answer keys from answer_keys.xml. These
                 * are specific responses to check for so that detailed
                 * commentary can be provided.
                 */

                // Retrieve answer keys
                fileToRetrieve = procedureDirectory + answerKeysFile;
                if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome,
                    // Opera, Safari
                    fileRequest = new XMLHttpRequest();
                } else {// code for IE6, IE5
                    fileRequest = new ActiveXObject("Microsoft.XMLHTTP");
                }

                fileRequest.open("GET", fileToRetrieve, false);
                fileRequest.send();
                if (fileRequest.status != 200) {
                    SC.error("Answer keys file not found: " + fileToRetrieve);
                    break;
                }

                xmlDoc = fileRequest.responseXML;

                // Loop through rows
                allRows = xmlDoc.getElementsByTagName("Row");

                for (row = 1; row < allRows.length; ++row) {

                    var rowID = procedureID + row;

                    cellsToCheck = new Array();
                    comparisonValues = new Array();

                    // Loop through cells in row
                    allCellsInRow = allRows[row].getElementsByTagName("Cell");

                    answerKey = CoreCircsim.store.createRecord(CoreCircsim.AnswerKey, {}, procedureNumber * proceduresMultiplier + row);

                    /*
                     * The XML representation of the spreadsheet is compact.
                     * Empty cells are not included. This accounts for this
                     * using the ss:Index attribute of the cell (seen later on).
                     */
                    cellOffset = 1;

                    for (cell = 0; cell < allCellsInRow.length; ++cell) {

                        currentCell = allCellsInRow[cell];
                        actualIndex = currentCell.getAttribute("ss:Index");

                        if (null != actualIndex) {
                            cellOffset = actualIndex - cell;
                        }
                        actualIndex = cell + cellOffset - 1;
                        SC.debug("cell: " + cell + ", actual index: " + actualIndex);

                        if (0 == actualIndex) {
                            answerKey.set('category', allCellsInRow[cell].childNodes[0].childNodes[0].nodeValue);
                            SC.debug("Procedure " + procedureNumber + ", row " + row + ": category is " + answerKey.get('category'));
                        } else if (1 == actualIndex) {
                            answerKey.set('column', parseInt(allCellsInRow[cell].childNodes[0].childNodes[0].nodeValue, 10));
                            SC.debug("Procedure " + procedureNumber + ", row " + row + ": column is " + answerKey.get('column'));
                        } else if (2 == actualIndex) {
                            answerKey.set('comment', allCellsInRow[cell].childNodes[0].childNodes[0].nodeValue);
                            SC.debug("Procedure " + procedureNumber + ", row " + row + ": comment is " + answerKey.get('comment'));
                        } else if (3 == actualIndex) {
                            answerKey.set('isCorrect', allCellsInRow[cell].childNodes[0].childNodes[0].nodeValue);
                            SC.debug("Procedure " + procedureNumber + ", row " + row + ": isCorrect is " + answerKey.get('isCorrect'));
                        } else if (4 == actualIndex) {
                            answerKey.set('match', allCellsInRow[cell].childNodes[0].childNodes[0].nodeValue.toUpperCase());
                            SC.debug("Procedure " + procedureNumber + ", row " + row + ": match is " + answerKey.get('match'));
                        } else if (5 == actualIndex) {
                            highlightsArray = allCellsInRow[cell].childNodes[0].childNodes[0].nodeValue.split(',');
                            for (i = 0; i < highlightsArray.length; ++i) {
                                highlightsArray[i] = parseInt(highlightsArray[i], 10);
                            }
                            answerKey.set('highlights', highlightsArray);
                            SC.debug("Procedure " + procedureNumber + ", row " + row + ": highlights is " + answerKey.get('highlights'));
                        } else {
                            procedureTableCell = cell + cellOffset - 7;
                            cellsToCheck.push(procedureTableCell);
                            comparisonValues.push(parseInt(currentCell.childNodes[0].childNodes[0].nodeValue, 10));
                        }
                    }

                    answerKey.set('cells', cellsToCheck);
                    answerKey.set('cellValues', comparisonValues);

                    SC.debug("Procedure " + procedureNumber + ", row " + row + ": cells is " + answerKey.get('cells'));
                    SC.debug("Procedure " + procedureNumber + ", row " + row + ": cellValues is " + answerKey.get('cellValues'));

                    procedure.get('answerKeys').pushObject(answerKey);

                    CoreCircsim.store.commitRecord(rowID);
                    SC.debug("Pushed answer key to procedure");
                }

                CoreCircsim.store.commitRecord(procedureID);
                procedureNumber++;
            } else {
                SC.info("Procedure directory " + procedureDirectory + " does not exist. All procedures should be loaded now.")
                hasProcedures = false;
            }

        }

    }
});
