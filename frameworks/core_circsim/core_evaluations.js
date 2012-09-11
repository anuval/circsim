/*globals CoreCircsim*/

SC.mixin(CoreCircsim, {
  evaluateInitialVariableSelection: function(procedure, studentSelection) {
    var correctAnswer = procedure.get('initialVariable');
    if (correctAnswer === -1) return true;
    return studentSelection == correctAnswer ? true: false;
  },

  evaluateInitialVariableDirection: function(procedure, studentSelection) {
    var correctAnswer = procedure.get('initialVariableDirection');
    if (correctAnswer === -1) return true;
    return studentSelection == correctAnswer ? true: false;
  },

  evaluateRelationships: function(relationshipEvaluation, studentInput) {
    var keys, equationVars, errorKeys, message, num, comparisonValue, studentValues = [],
        evaluations = [];

      equationVars = relationshipEvaluation.equation;
      errorKeys = [[2,1,1], [2,1,0], [2,0,0], [2,0,1], [1,2,2], [1,2,0], [1,0,0], [1,0,2], [0,2,2], [0,2,0], [0,1,1], [0,1,0], [0,0,2], [0,0,1]];
      message = relationshipEvaluation.errorMessage;

      // Get student values at equation indices
      studentValues = [];
      equationVars.forEach(function(eq) {
        num = studentInput.objectAt(eq);
        studentValues.push(num);
      });
      
      errorKeys.forEach(function(k){
        if (SC.compare(k, studentValues)===0) {
          evaluations.push(message);
        }
      });
      
      return SC.compare(evaluations, []) === 0 ? false : message;
  
  },

  // This method returns an array populated by CoreCircsim.AnswerKey objects.
  evaluateProcedureSpecificErrors: function(procedure, columnNumber, studentInput) {
    var keyMatches = [];    
    // I think this shoudl be done in controller layer
    // I think the signature should be (answerKeys, studentInput)
    // This would be best because when I refactor the model layer, I will only be pulling out column specific answer keys anyway.  But that shouldn't matter here. 
    var answerKeys = procedure.get('answerKeys').filterProperty('column', columnNumber);

    // Validations
    var numberOfCells = procedure.get('rows').length;
    if (numberOfCells != studentInput.length) return [];

    // This is getting the appropriate value from the student input to compare
    function getStudentInput(indices, studentInput) {
      var arr = [];
      indices.forEach(function(i) {
        arr.push(studentInput[i]);
      });
      return arr;
    }

    answerKeys.forEach(function(answerKey) {
      keyMatches.push(answerKey);
      var key = answerKey.get('cellValues');
      var indices = answerKey.get('cells');
      var student = getStudentInput(indices, studentInput);
      var matchType = answerKey.get('match');
      // Everything up to this point is just getting the correct values to compare, so this is the method that really needs to change.
      // This bascially just says if it is not a match, then remove it from the returned answer keys
      if (matchType === "ALL") {
        if (CoreCircsim.compareStudentInputWithKey(key, true, student) === false) keyMatches.removeObject(answerKey);
      } else if(matchType === "ANY") {
        if (CoreCircsim.compareStudentInputWithKey(key, false, student) === false) keyMatches.removeObject(answerKey);
      } else {
          SC.error("CoreCircsim.evaluateProcedureSpecficErrors: Bad match type");
      }
    });

    return keyMatches;
  },

  // This returns true or false based on whether it's a match
  compareStudentInputWithKey: function(key, match, student) {
    var returnVal;
    if (match) {
      // match == true: match all of the conditions
      returnVal = true;
      for (var i = 0; i < key.length; i++) {
        var k = key[i];
        var s = student[i];
        if (k == 3) {
          if (SC.compare(0, s) === 0) {
            returnVal = false;
            break;
          }
        } else if (k == 4) {
          if (SC.compare(1, s) === 0) {
            returnVal = false;
            break;
          }
        } else if (k == 5) {
          if (SC.compare(2, s) === 0) {
            returnVal = false;
            break;
          }
        } else {
          if (SC.compare(k, s) !== 0) {
            returnVal = false;
            break;
          }
        }
      }
      return returnVal;
    } else {
        // match any of the conditions
      returnVal = false;
      for (var i = 0; i < key.length; i++) {
        var k = key[i];
        var s = student[i];
        if (k == 3) {
          if (SC.compare(0, s) !== 0) {
            returnVal = true;
            break;
          }
        } else if (k == 4) {
          if (SC.compare(1, s) !== 0) {
            returnVal = true;
            break;
          }
        } else if (k == 5) {
          if (SC.compare(2, s) !== 0) {
            returnVal = true;
            break;
          }
        } else {
          if (SC.compare(k, s) === 0) {
            returnVal = true;
            break;
          }
        }
      }
      return returnVal;
    }
  }
});
