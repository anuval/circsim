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