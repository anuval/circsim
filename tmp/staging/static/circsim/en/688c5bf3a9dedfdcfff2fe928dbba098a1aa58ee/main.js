/*globals Circsim CoreCircsim*/

Circsim.main = function main() {

    // Uncomment the desired messaging level (viewable in the browser's
    // JavaScript console.
    SC.Logger.logOutputLevel = SC.LOGGER_LEVEL_DEBUG;
    // SC.Logger.logOutputLevel = SC.LOGGER_LEVEL_INFO;
    // SC.Logger.logOutputLevel = SC.LOGGER_LEVEL_WARN;
    // SC.Logger.logOutputLevel = SC.LOGGER_LEVEL_ERROR;

    // Load procedures from server
    CoreCircsim.populateProcedures();

    // Instantiate views
    Circsim.getPath('mainPage.mainPane').append();

    // Set content of proceduresController
    Circsim.proceduresController.set('content', CoreCircsim.store.find(CoreCircsim.Procedure));

    // Initialize Statechart
    Circsim.statechart.initStatechart();

};

function main() {
    Circsim.main();
}
