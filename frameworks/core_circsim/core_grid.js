/*globals CoreCircsim*/

SC.mixin(CoreCircsim, {

  createGrid: function(procedure){
    procedure = this.createColumns(procedure);
    procedure = this.createCells(procedure);
    return procedure;
  },

  createColumns: function(procedure) {
    var headers = procedure.get('cols');

    headers.forEach(function(header) {
      var id = Math.random(Math.floor(Math.random() * 99999999));
      var col = CoreCircsim.store.createRecord(CoreCircsim.Column, {
        header: header
      }, id);
      procedure.get('columns').pushObject(col);
    });
    
    return procedure;
  },

  createCells: function(procedure) {
    var cols = procedure.get('columns');
    var rows = procedure.get('rows');
    
    cols.forEach(function(col) {
      for (var i=0; i < rows.length; i++) {
        var id = Math.random(Math.floor(Math.random() * 99999999));
        var cell = CoreCircsim.store.createRecord(CoreCircsim.Cell, {}, id);        
        col.get('cells').pushObject(cell);          
      }
    });
    
   return procedure;   
  },
  
  updateCell: function(cell){
    var val    = cell.get('value'),
        newVal = "";
    switch (val) {
      case null: 
        newVal = 0;
        break;
      case 0: 
        newVal = 1;
        break;
      case 1: 
        newVal = 2;
        break;
      case 2: 
        newVal = 0;
        break;
      default:        
        break;
    }    
    cell.set('value', newVal);
  }
  
});
