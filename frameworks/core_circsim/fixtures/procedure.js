/*globals CoreCircsim */

sc_require('models/procedure');

CoreCircsim.Procedure.FIXTURES = [

{
    guid: "./design/procedures/1_Decrease_Ra",
    title: "Reduce Arterial Resistance (Ra) to 50% of Normal",
    introduction: "In this experiment we will decrease arterial resistance, Ra, by 50%. This might be accomplished pharmacologically with a drug that causes arteriolar dilatation.",
    instructions: "Instructions go here.",
    isComplete: false,
    cols: ["DR", "RR", "SS"],
    rows: ["IS", "CVP", "SV", "HR", "CO", "Ra", "MAP"],
    key: [0,1,2,0,2,1,1,2,1,1,2,2,2,2,2,1,1,2,2,1,1],
    initialVariable: 5,
    initialVariableDirection: 1,
    initialVariableSummary: "placeholder text for initial variable summary",
    procedureSummary: "The smooth muscle in the walls of systemic arterioles contain alpha adrenergic receptors that are physiologically stimulated by sympathetic activity.  An adrenergic blocking agent will therefore reduce this input to the arterioles, resulting in vasodilatation and decreased resistance.  Hence, Ra is decreased.<P><P>The fall is Ra must lead to a fall in MAP (which = CO x TPR).   This fall in MAP reduces the stimulation of the carotid and aortic baroreceptors and hence reduced firing delivered to the CV centers in the medulla.  The consequence is increased sympathetic firing and reduced parasympathetic firing to the heart and blood vessels.  There is therefore an increase in IS and HR.  Ra also increases as long as the dose of the alpha blocker was such that not all alpha receptors were occupied.<P><P>Increased HR causes CO to increase.  The increase in CO brings about a decrease in CVP as more blood is translocated from the veins to the arteries.  With preload reduced there will be a reduction in SV.  The increased IS that occurs partially counteracts the effect of the reduced preload and the magnitude of the fall in SV is reduced.  With CO increased and Ra increased there is an increase in MAP; the RR response has countered the DR fall in MAP.<P><P>In the final steady-state (SS) MAP is still reduced as the baroreceptor reflex cannot fully compensate for the initial fall in pressure.  That is to say, the decrease in Ra is greater than the reflex induced increase in CO.<P>",
    answerKeys: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41],
    relationshipEvaluations: [{
      equation: [4, 2, 3],
      intro: "Before the simulation is run your predictions will be reviewed for logical consistency and for conformity to the relationship: CO=SVxHR. You will be asked to correct any errors. Please click Next to continue.",
      errorMessage: "Your predictions do not agree with the relationship: CO = HR X SV. You need to correct your errors.  Click Next when you are finished.",
      summaryCorrectMessage: "Great! Your predictions are consistent with the relationship: CO=SVxHR",
      summaryIncorrectMessage: "Sorry, your predictions are still not consistent with the relationship: CO=SVxHR. However, at this time we will move on."
    },
    {
      equation: [6, 4, 5],
      intro: "Before the simulation is run your predictions will be reviewed for logical consistency and for conformity to the relationship: MAP = CO x TPR. You will be asked to correct any errors. Please click Next to continue.",
      errorMessage: "Your predictions do not agree with the relationship: MAP = CO x TPR. You need to correct your errors.  Click Next when you are finished.",
      summaryCorrectMessage: "Great! Your predictions are consistent with the relationship: MAP = CO x TPR",
      summaryIncorrectMessage: "Sorry, your predictions are still not consistent with the relationship: MAP = CO x TPR. However, at this time we will move on."
    }]      
  },{
    guid: "./design/procedures/2_Increase_Rv",
    title: "Increase Venous Resistance (Rv) to 200% of Normal",
    introduction: "In this experiment we will increase venous resistance (Rv) to 200% of its normal value in a new subject.  This is accomplished  by constricting the small veins just distal to the capillaries. Only Rv is increased by this procedure.  Neither venous compliance or capacitance is affected.",
    instructions: "Instructions go here.",
    isComplete: false,
    cols: ["DR", "RR", "SS"],
    rows: ["IS", "CVP", "SV", "HR", "CO", "Ra", "MAP"],
    key: [0,1,1,0,1,0,1,2,1,1,2,2,2,2,2,1,1,2,2,2,1],
    initialVariable: 1,
    initialVariableDirection: 1,
    initialVariableSummary: "Here, an increase in venous resistance implies a change in central venous pressure.",
    procedureSummary: "In this procedure we increased Rv between the end of the capillaries and the great veins around the heart WITHOUT changing venous compliance or capacitance.  This has the effect of dropping the pressure downstream from the increased resistance, the central venous pressure (CVP).  We can also say that the increased venous resistance reduced venous return without affecting cardiac output.  The result is reduced central volume and hence reduced CVP.<P><P>With CVP reduced there will be reduced SV and hence reduced CO.  MAP must therefore fall.<P><P>The baroreceptor reflex then generates a response (RR) that will cause MAP to increase.  It does this my increasing IS, HR, and Ra.  CO is thus increased and MAP goes up.<P><P>In the final steady state (SS) MAP is still reduced as the reflex does not fully compensate for the initial (DR) fall.  All of the neutrally controlled variables are increased and CO is therefore increased.<P><P>",
    answerKeys: [42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74],
    relationshipEvaluations: [{
      equation: [4, 2, 3],
      intro: "Before the simulation is run your predictions will be reviewed for logical consistency and for conformity to the relationship: CO=SVxHR. You will be asked to correct any errors. Please click Next to continue.",
      errorMessage: "Your predictions do not agree with the relationship: CO = HR X SV. You need to correct your errors.  Click Next when you are finished.",
      summaryCorrectMessage: "Great! Your predictions are consistent with the relationship: CO=SVxHR",
      summaryIncorrectMessage: "Sorry, your predictions are still not consistent with the relationship: CO=SVxHR. However, at this time we will move on."
    },
    {
      equation: [6, 4, 5],
      intro: "Before the simulation is run your predictions will be reviewed for logical consistency and for conformity to the relationship: MAP = CO x TPR. You will be asked to correct any errors. Please click Next to continue.",
      errorMessage: "Your predictions do not agree with the relationship: MAP = CO x TPR. You need to correct your errors.  Click Next when you are finished.",
      summaryCorrectMessage: "Great! Your predictions are consistent with the relationship: MAP = CO x TPR",
      summaryIncorrectMessage: "Sorry, your predictions are still not consistent with the relationship: MAP = CO x TPR. However, at this time we will move on."
    }]      
  },{
    guid: "./design/procedures/3_Decrease_IS",
    title: "Decrease cardiac inotropic state (IS) to 50% of normal.",
    introduction: "In this procedure the inotropic state (IS) is decreased to 50% of normal.  This night occur as the result of a myocardial infarct that destroys an appreciable part of the wall of the left ventricle.",
    instructions: "Instructions go here.",
    isComplete: false,
    cols: ["DR", "RR", "SS"],
    rows: ["IS", "CVP", "SV", "HR", "CO", "Ra", "MAP"],
    key: [1,2,1,0,1,0,1,2,1,1,2,2,2,2,1,2,1,2,1,2,1],
    initialVariable: 0,
    initialVariableDirection: 1,
    initialVariableSummary: "An infarct is an ischemic event.  When it occurs in the ventricle it results in the death of myocardial cells.  If the affected ventricle fills to the normal extend (if preload stays the same) the damaged ventricle will generate a reduced output.  Thus, we can say that the inotropic state  of the heart has been decreased.  Thus, IS is the primary variable and its dorection is down.",
    procedureSummary: "A myocardial infarct (MI) damages or destroys cardiac muscle cells.  Thus when the ventricle contracts it can only generate a reduced output (however you measure it) with the same preload or filling.  This is equivalent to the heart having a reduced inotropic state (IS).<P><P>With IS reduced SV volume (one measure of ventricular output) is reduced.  Since HR has not changed (in the DR phase) the cardiac output (CO) must be down.  Since Ra is unchanged in DR and CO is down, there must be a fall in MAP.<P><P>This generates the stereotypical reflex response (RR).  Increased sympathetic firing causes HR and Ra to increase.  IS also increases in the remaining myocardial cells.  CO is increased by the increased HR.  CVP decreases because of the increased CO.  SV falls as preload falls.  With CO and Ra increased, the baroreceptor reflex results in an increase in MAP.<P><P>When a new steady state (SS) is achieved, HR and Ra are increased, CO is reduced (the reflex driven increase isnt as large as the initial fall in CO), and CVP is increased.  MAP is still decreased, although not as much as initially (partial compensation has occurred).<P><P><P>",
    answerKeys: [75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120],
    relationshipEvaluations: [{
      equation: [4, 2, 3],
      intro: "Before the simulation is run your predictions will be reviewed for logical consistency and for conformity to the relationship: CO=SVxHR. You will be asked to correct any errors. Please click Next to continue.",
      errorMessage: "Your predictions do not agree with the relationship: CO = HR X SV. You need to correct your errors.  Click Next when you are finished.",
      summaryCorrectMessage: "Great! Your predictions are consistent with the relationship: CO=SVxHR",
      summaryIncorrectMessage: "Sorry, your predictions are still not consistent with the relationship: CO=SVxHR. However, at this time we will move on."
    },
    {
      equation: [6, 4, 5],
      intro: "Before the simulation is run your predictions will be reviewed for logical consistency and for conformity to the relationship: MAP = CO x TPR. You will be asked to correct any errors. Please click Next to continue.",
      errorMessage: "Your predictions do not agree with the relationship: MAP = CO x TPR. You need to correct your errors.  Click Next when you are finished.",
      summaryCorrectMessage: "Great! Your predictions are consistent with the relationship: MAP = CO x TPR",
      summaryIncorrectMessage: "Sorry, your predictions are still not consistent with the relationship: MAP = CO x TPR. However, at this time we will move on."
    }]      
  }];