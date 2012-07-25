/*globals CoreCircsim */

sc_require('models/procedure');

CoreCircsim.Procedure.FIXTURES = [

{
    guid: "./design/procedures/Decrease Ra",
    title: "Reduce Arterial Resistance (Ra) to 50% of Normal",
    introduction: "In this experiment we will decrease arterial resistance, Ra, by 50%. This might be accomplished pharmacologically with a drug that causes arteriolar dilatation.",
    instructions: "Instructions go here.",
    isComplete: false,
    cols: ["DR", "RR", "SS"],
    rows: ["IS", "CVP", "SV", "HR", "CO", "Ra", "MAP"],
    key: [0,1,2,0,2,1,1,2,1,1,2,2,2,2,2,1,1,2,2,1,1],
    initialVariable: 5,
    initialVariableDirection: 1,
    initialVariableSummary: "In this scenario, the variable being changed is directly implied by the experimental procedure. Click Next to continue.",
    procedureSummary: "The smooth muscle in the walls of systemic arterioles contain alpha adrenergic receptors that are physiologically stimulated by sympathetic activity.  An adrenergic blocking agent will therefore reduce this input to the arterioles, resulting in vasodilatation and decreased resistance.  Hence, Ra is decreased.<P><P>The fall is Ra must lead to a fall in MAP (which = CO x TPR).   This fall in MAP reduces the stimulation of the carotid and aortic baroreceptors and hence reduced firing delivered to the CV centers in the medulla.  The consequence is increased sympathetic firing and reduced parasympathetic firing to the heart and blood vessels.  There is therefore an increase in IS and HR.  Ra also increases as long as the dose of the alpha blocker was such that not all alpha receptors were occupied.<P><P>Increased HR causes CO to increase.  The increase in CO brings about a decrease in CVP as more blood is translocated from the veins to the arteries.  With preload reduced there will be a reduction in SV.  The increased IS that occurs partially counteracts the effect of the reduced preload and the magnitude of the fall in SV is reduced.  With CO increased and Ra increased there is an increase in MAP; the RR response has countered the DR fall in MAP.<P><P>In the final steady-state (SS) MAP is still reduced as the baroreceptor reflex cannot fully compensate for the initial fall in pressure.  That is to say, the decrease in Ra is greater than the reflex induced increase in CO.<P>",
    answerKeys: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
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
    guid: "./design/procedures/Increase Rv",
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
    answerKeys: [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
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