/* >>>>>>>>>> BEGIN source/core.js */
/*globals Circsim*/ 

Circsim = SC.Application.create({

  NAMESPACE: 'Circsim',
  VERSION: '0.1.0',
  ERRORCOLOR: "#FFD6D6",
  CORRECTCOLOR: "#E8FFCA",
  NORMALCOLOR: "#FBFBFB",

  pvViewDisplay: ''

  
});

/* >>>>>>>>>> BEGIN source/controllers/cell.js */
/*globals Circsim */

Circsim.cellController = SC.ObjectController.create({
  
});

/* >>>>>>>>>> BEGIN source/controllers/cells.js */
/*globals Circsim */

Circsim.cellsController = SC.ArrayController.create({  
  
  colsBinding: "Circsim.procedureController.columns",

  allCells: function() {
    var cols     = this.get("cols"),
        allCells = [];         

    cols.forEach(function(col) {
      var cells = col.get('cells');
      cells.forEach(function(cell) {
        allCells.pushObject(cell);
      });
    });
    return allCells;
  }.property("cols").cacheable()
});

/* >>>>>>>>>> BEGIN source/controllers/column.js */
/*globals Circsim */

Circsim.columnController = SC.Object.create({
  content: "",
  current: 0
});

/* >>>>>>>>>> BEGIN source/controllers/columns.js */
/*globals Circsim */

Circsim.columnsController = SC.ArrayController.create({  
  contentBinding: "Circsim.procedureController.columns"
});

/* >>>>>>>>>> BEGIN source/controllers/content.js */
/*globals Circsim*/

Circsim.contentController = SC.Object.create({
  contentDisplay: ''
});
/* >>>>>>>>>> BEGIN source/controllers/instructions.js */
/*globals Circsim */

Circsim.instructionsController = SC.Object.create({  
  content: ""
});

/* >>>>>>>>>> BEGIN source/controllers/message.js */
/*globals Circsim */

Circsim.messageController = SC.Object.create({  
  content: "",
  title: "",
  titleColor: "#FBFBFB",
  color: "#FBFBFB"
});

/* >>>>>>>>>> BEGIN source/controllers/messages.js */
/*globals Circsim */

Circsim.messagesController = SC.ArrayController.create({  
    index: 0
});

/* >>>>>>>>>> BEGIN source/controllers/next_prompt_controller.js */
/*globals Circsim */

Circsim.nextPromptController = SC.Object.create({
  content: "Next"
});

/* >>>>>>>>>> BEGIN source/controllers/physio_state.js */
/*globals Circsim */

Circsim.drController = SC.ObjectController.create({

  content: function() {
    return Circsim.columnsController.objectAt(0);
  }.property()

});

Circsim.rrController = SC.ObjectController.create({

  content: function() {
    return Circsim.columnsController.objectAt(1);
  }.property()

});

Circsim.ssController = SC.ObjectController.create({

  content: function() {
    return Circsim.columnsController.objectAt(2);
  }.property()

});

/* >>>>>>>>>> BEGIN source/controllers/prev_prompt_controller.js */
/*globals Circsim */

Circsim.prevPromptController = SC.Object.create({
  content: "Back",
  isVisible: NO
});

/* >>>>>>>>>> BEGIN source/controllers/procedure.js */
/*globals Circsim */

Circsim.procedureController = SC.ObjectController.create({
  contentBinding: SC.Binding.single('Circsim.proceduresController.selection'),
  
  currentPV: function(){
    var rows = this.get('content').get('rows');
    var idx = this.get('content').get('initialVariable');
    
    return rows[idx];
  }.property('content')
});

/* >>>>>>>>>> BEGIN source/controllers/procedures.js */
/*globals Circsim */


Circsim.proceduresController = SC.ArrayController.create({  
  
});

/* >>>>>>>>>> BEGIN source/controllers/pv_selection.js */
/*globals Circsim*/

Circsim.pvSelectionController = SC.Object.create({
  content: ''
});
/* >>>>>>>>>> BEGIN source/controllers/relationship_evaluations_controller.js */
/*globals Circsim */

Circsim.relationshipEvaluationsController = SC.Object.create({

  content: [],
  current: 0

}) ;

/* >>>>>>>>>> BEGIN source/lib/grid_patch.js */
SC.GridView.prototype.mixin({

  contentIndexesInRect: function(rect) {
    var rowHeight = this.get('rowHeight') || 48 ,
        content = this.get('content'),
        count = (content) ? content.get('length') : 0,
        frameWidth = this.get('clippingFrame').width,
        itemsPerRow = this.get('itemsPerRow'),
        rows = Math.ceil(count / itemsPerRow ),
        columnWidth = Math.floor(frameWidth/itemsPerRow);
    if(this.get('insertionOrientation') === SC.HORIZONTAL_ORIENTATION){
      var min = Math.floor(SC.minY(rect) / rowHeight) * itemsPerRow,
          max = Math.ceil(SC.maxY(rect) / rowHeight) * itemsPerRow;
      return SC.IndexSet.create(min, max-min);
    }else{
      var max = 0,
          min = count;
      for(var colIndex=0;colIndex<itemsPerRow;++colIndex){
        var colMinX = colIndex*columnWidth,
            colMaxX = colMinX + columnWidth;
        if( colMaxX > SC.minX(rect) || colMinX < SC.maxX(rect) ){
          min = Math.min(min,Math.floor(SC.minY(rect) / rowHeight) + (colIndex * rows));
          max = Math.max(max,Math.min(Math.ceil(SC.maxY(rect) / rowHeight) + (colIndex * rows), (colIndex * rows) + rows));
        }
      }
      return SC.IndexSet.create(min,max-min);
    }
  },
 
  layoutForContentIndex: function(contentIndex) {
    var rowHeight = this.get('rowHeight') || 48,
        content = this.get('content'),
        count = (content) ? content.get('length') : 0,
        frameWidth = this.get('clippingFrame').width,
        itemsPerRow = this.get('itemsPerRow'),
        rows = Math.ceil(count / itemsPerRow ),
        columnWidth = Math.floor(frameWidth/itemsPerRow),
        isHorizontal = this.get('insertionOrientation') === SC.HORIZONTAL_ORIENTATION,
        row = isHorizontal ? Math.floor(contentIndex / itemsPerRow) : contentIndex%rows,
        col = isHorizontal ? contentIndex - (itemsPerRow*row) : Math.floor(contentIndex/rows);
    return { 
      left: col * columnWidth,
      top: row * rowHeight,
      height: rowHeight,
      width: columnWidth
    };
  }
});

/* >>>>>>>>>> BEGIN source/lib/target_action.js */
// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global OI */

/** @static
  
  This mixin implements the basic target-action handling for a view.
  
  @author Erich Ocean
  @since SproutCore 1.0
*/
SC.TargetAction = {
  
  /**
    The name of the action you want triggered when the button is pressed.  
    
    This property is used in conjunction with the target property to execute
    a method when a regular button is pressed.  These properties are not 
    relevant when the button is used in toggle mode.
    
    If you do not set a target, then pressing a button will cause the
    responder chain to search for a view that implements the action you name
    here.  If you set a target, then the button will try to call the method
    on the target itself.
    
    For legacy support, you can also set the action property to a function.  
    Doing so will cause the function itself to be called when the button is
    clicked.  It is generally better to use the target/action approach and 
    to implement your code in a controller of some type.
    
    @type String
  */
  action: null,
  
  /**
    The target object to invoke the action on when the button is pressed.
    
    If you set this target, the action will be called on the target object
    directly when the button is clicked.  If you leave this property set to
    null, then the button will search the responder chain for a view that 
    implements the action when the button is pressed instead.
    
    @type Object
  */
  target: null,
  
  /**
    Set to YES to send an action on mouseDown:, rather than mouseUp:.
    
    @type Boolean
  */
  actOnMouseDown: NO,
  
  /**
    fakes a click... evt is optional.  
    
    Temporarily highlights the button to show that it is being triggered.  
    Does nothing if the button is disabled. 
    
    @returns {bool} success/failure of the request
  */  
  triggerAction: function(evt) {  
    if (!this.get('isEnabled')) return false;
    this.set('isActive', YES);
    this.performAction(evt);
    this.didTriggerAction();
    this.invokeLater('set', 200, 'isActive', NO);
    return true;
  },
  
  /**
    Perform an action.
  */
  performAction: function(evt) {
    var action = this.get('action');
    var target = this.get('target') || null;
    if (action) {
      this.getPath('pane.rootResponder').sendAction(action, target, this, this.get('pane'));
    }
  },
  
  /**
    This method is called anytime the button's action is triggered.  You can 
    implement this method in your own subclass to perform any cleanup needed 
    after an action is performed.
  */
  didTriggerAction: function() {},
  
  /** @private 
    On mouse down, set active only if enabled.
  */    
  mouseDown: function(evt) {
    if (!this.get('isEnabled')) return YES ; // handled event, but do nothing
    
    this._actsOnMouseDown = !!this.get('actOnMouseDown') ; // cache
    
    if (this._actsOnMouseDown) {
      this.performAction(evt) ;
    } else {
      this.set('isActive', YES) ;
      this._isMouseDown = YES ;
    }
    
    return YES ;
  },
  
  /** @private
    Remove the active class on mouseOut if mouse is down.
  */  
  mouseExited: function(evt) {
    if (this._actsOnMouseDown) return YES ; // nothing to do
    
    if (this._isMouseDown) this.set('isActive', NO);
    return YES;
  },

  /** @private
    If mouse was down and we renter the button area, set the active state again.
  */  
  mouseEntered: function(evt) {
    if (this._actsOnMouseDown) return YES ; // nothing to do
    
    this.set('isActive', this._isMouseDown);
    return YES;
  },
  
  /** @private
    ON mouse up, trigger the action only if we are enabled and the mouse was released inside of the view.
  */  
  mouseUp: function(evt) {
    if (this._actsOnMouseDown) return YES ; // nothing to do
    
    if (this._isMouseDown) this.set('isActive', NO); // track independently in case isEnabled has changed
    this._isMouseDown = false;
    var inside = this.$().within(evt.target) ;
    if (inside && this.get('isEnabled')) this.performAction(evt) ;
    return true ;
  }
  
};

/* >>>>>>>>>> BEGIN source/resources/templates/circsim_intro.handlebars */
SC.TEMPLATES["circsim_intro"] = SC.Handlebars.compile("<p>CIRCSIM is a computer model with a heart in a chest, systemic arteries and arterioles, a capillary bed, and veins returning blood to the heart.  CIRCSIM is thus a complete circulatory system, and it functions like one. </p>\n\n<p>CIRCSIM can simulate normal physiology.  The simulation includes baroreceptors similar in operation to those which are situated at the bifurcation of the common carotid artery and at the aortic arch.  These act to stabilize blood pressure.</p>\n\n<p>However, the model has been simplified, and the heart is treated as a single chamber filling from the right atrium and pumping blood into the aorta.  The pulmonary circulation is not (as in life) in series with the systemic circulation.</p>\n\n<h4>Select a procedure from the left to begin.</h4>");
/* >>>>>>>>>> BEGIN source/resources/templates/footer.handlebars */
SC.TEMPLATES["footer"] = SC.Handlebars.compile("<div id=\"footer\">\n  <div id=\"copyright\">\n    © 1985-2012  Rush University, Chicago, Illinois\n  </div>\n</div>");
/* >>>>>>>>>> BEGIN source/resources/templates/procedure.handlebars */
SC.TEMPLATES["procedure"] = SC.Handlebars.compile("<body>\n\n  <div id=\"procedure\">\n    <h1 id=\"procedure-title\">{{title}}</h1>\n    <div id=\"procedure-instructions\">\n      {{instructions}}\n    </div>\n    <div id=\"procedure-interaction\">\n      <div id=\"grid\">\n        <div class=\"column\">\n          {{#view Circsim.contentViews.drView tagName=\"div\" class=\"header\"}}\n            {{content.header}}            \n          {{/view}}          \n          {{collection Circsim.contentViews.drCellsView tagName=\"div\" class=\"cell-group\" itemClass=\"cell\"}}\n        </div>\n        <div class=\"column\">\n          {{#view Circsim.contentViews.rrView tagName=\"div\" class=\"header\"}}\n            {{content.header}}            \n          {{/view}}          \n          {{collection Circsim.contentViews.rrCellsView tagName=\"div\" class=\"cell-group\" itemClass=\"cell\"}}\n        </div>\n        <div class=\"column\">\n          {{#view Circsim.contentViews.ssView tagName=\"div\" class=\"header\"}}\n            {{content.header}}            \n          {{/view}}          \n          {{collection Circsim.contentViews.ssCellsView tagName=\"div\" class=\"cell-group\" itemClass=\"cell\"}}\n        </div>\n\n      </div>\n      <div id=\"procedure-messages\">\n        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ultricies molestie bibendum. Ut tincidunt scelerisque ligula vel faucibus. Pellentesque vitae felis ac elit dictum rhoncus. Praesent lacus mauris, laoreet non interdum quis, vestibulum ac tellus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur ac ipsum enim, sed placerat metus. In eu sapien elit, ac imperdiet dui. Proin tempus dui et massa molestie venenatis luctus quam blandit. In urna nunc, consectetur blandit venenatis sit amet, dignissim varius turpis. Quisque ligula justo, dictum quis convallis ac, interdum eget lectus</p>\n        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ultricies molestie bibendum. Ut tincidunt scelerisque ligula vel faucibus. Pellentesque vitae felis ac elit dictum rhoncus. Praesent lacus mauris, laoreet non interdum quis, vestibulum ac tellus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur ac ipsum enim, sed placerat metus. In eu sapien elit, ac imperdiet dui. Proin tempus dui et massa molestie venenatis luctus quam blandit. In urna nunc, consectetur blandit venenatis sit amet, dignissim varius turpis. Quisque ligula justo, dictum quis convallis ac, interdum eget lectus</p>        \n      </div>\n    </div>\n  </div>\n</body>");
/* >>>>>>>>>> BEGIN source/resources/templates/title.handlebars */
SC.TEMPLATES["title"] = SC.Handlebars.compile("<h1>CIRCSIM v2.0*</h1>\n<p>Joel Michael, PhD</p>\n\n<p>\n  Additional content and pedagogy<br />\n  Thomas Shannon, DVM, PhD\n</p>\n\n<p>\n  Programming<br />\n  Ryan Golden, BS<br />\n  RMC Class of 2014\n</p>\n\n<p>\n  Anthony Nuval, BEng<br />\n  Rush Medical College<br />\n  RMC Class of 2015\n</p>\n\n<p>\n  Department of Molecular Biophysics and Physiology<br />\n  Rush Medical College<br />\n  Chicago, Illinois<br />\n</p>\n\n<p>\n  *Based on CIRCSIM (Allen Rovick and Joel Michael)\n</p>\n");
/* >>>>>>>>>> BEGIN source/statecharts/core-statechart.js */
/*globals Circsim CoreCircsim*/

Circsim.statechart = SC.Statechart.create({
  trace: YES,
  rootState: SC.State.design({
    substatesAreConcurrent: YES, 

    modalStates: SC.State.plugin('Circsim.modalStates'), 

    mainStates: SC.State.plugin('Circsim.mainStates') 

  })
});

/* >>>>>>>>>> BEGIN source/statecharts/main-statechart.js */
/*globals Circsim CoreCircsim*/

Circsim.mixin({
  mainStates: SC.State.design({
    initialSubstate: "Title",

    "Title": SC.State.design({
      enterState: function(){
        Circsim.contentController.set("contentDisplay", "Circsim.contentViews.titleView");
        Circsim.set("sidebarView", "Circsim.sidebarViews.titleView");      
      },
      
      startCircsim: function() {
        this.gotoState("Running");
      }
    }),

    "Running": SC.State.design({
      enterState: function(){
        Circsim.set('sidebarView', 'Circsim.sidebarViews.runningView');
        
        // Make the display none, so when you click on a procedure, it will detect that the modal help screen isn't visible.
        $("#help-modal").css("display", "none");
        $("#display-modal").css("display", "none");
      },
      
      initialSubstate: "Introduction",

      "Introduction": SC.State.design({
        enterState: function(){
          Circsim.contentController.set('contentDisplay', 'Circsim.contentViews.introView');        
        }
      }),

      "Procedure": SC.State.design({
        enterState: function(){
    
          var procedure = Circsim.procedureController;
          
          // TODO: This is a huge hack to account for that bug when the collection view is clicked on but not a procedure.
          if (procedure.get('title')) {
            // Reset stuff...
            Circsim.cellsController.get('allCells').forEach(function(c) {c.set('value', null);});
            Circsim.cellsController.get('allCells').forEach(function(c) {c.set('correctAnswer', null);});
            Circsim.columnController.set('current', 0);
            Circsim.columnController.set('content', "");
            Circsim.relationshipEvaluationsController.set('current', 0);
            // End reset...

            CoreCircsim.createGrid(procedure);          
            
          } else {
            console.log("No procedure selected. Catching this bug.");
            this.gotoState('Running');
          }
        },
        
        initialSubstate: "ProcedureIntro",  
        
        "ProcedureIntro": SC.State.design({
          enterState: function(){
            Circsim.contentController.set('contentDisplay', 'Circsim.contentViews.procedureIntroView');          
          },
          
          beginProcedure: function(){
            this.gotoState("InitialVariableEvaluation");
          }
        }),
        
        "InitialVariableEvaluation": SC.State.design({
          initialSubstate: "IVStudentPrompt", 
          
          "IVStudentPrompt": SC.State.design({
            enterState: function(){
              Circsim.contentController.set('contentDisplay', 'Circsim.contentViews.procedureView');
              Circsim.messageController.set("title", "Primary Variable");
              Circsim.messageController.set("content", "Please use the menu to the left to select the primary variable that is changed in this procedure. When you have made your decision, click the button above to submit your choice.");            
              Circsim.nextPromptController.set('content', 'Submit Primary Variable');
              Circsim.set('pvViewDisplay', "Circsim.PVView");
            },
            
            prev: function() {
                
            },
            
            next: function() {  
              this.selectedPV();
            },
            
            selectedPV: function(){
              var procedure = Circsim.procedureController.get('content');
              var rows = procedure.get("rows");
              var pv = Circsim.pvSelectionController.get("content");
              var idx = rows.indexOf(pv);
              
              var answerIsCorrect = CoreCircsim.evaluateInitialVariableSelection(procedure, idx);
              
              if (answerIsCorrect) {
                this.clickCorrectIVa();              
              } else {
                this.clickIncorrectIVa();
              }
            },

            clickCorrectIVa: function(){
              this.gotoState("IVSelectDirection");
            },

            clickIncorrectIVa: function(){
              this.gotoState("IVSecondChance");
            }                      
          }),
                  
          "IVSecondChance": SC.State.design({
            enterState: function() {
              Circsim.messageController.set('content', 'Sorry, that is the incorrect answer. Please select another primary variable.  When you have made your final selection, click Submit Primary Variable.');
              Circsim.messageController.set('color', Circsim.ERRORCOLOR);            
            },
            
            exitState: function() {
              Circsim.messageController.set('content', '');
              Circsim.messageController.set('color', Circsim.NORMALCOLOR);            
            },

            next: function() {  
              this.selectedPV();
            },
            
            selectedPV: function(){
              var procedure = Circsim.procedureController.get('content');
              var rows = procedure.get("rows");
              var pv = Circsim.pvSelectionController.get("content");
              var idx = rows.indexOf(pv);
              
              var answerIsCorrect = CoreCircsim.evaluateInitialVariableSelection(procedure, idx);
              
              if (answerIsCorrect) {
                this.clickCorrectIVb();              
              } else {
                this.clickIncorrectIVb();
              }
            },
            
            clickCorrectIVb: function(){
              this.gotoState("IVSelectDirection");
            },
            
            clickIncorrectIVb: function(){
              this.gotoState("IVIncorrectSummary");
            }
          }),
            
          "IVSelectDirection": SC.State.design({
            enterState: function(){
              Circsim.messageController.set('content', 'Great! Now, click on the cell in the table to select the direction that this variable changes.');            
              var pvIdx = Circsim.procedureController.get('initialVariable');
              var pvCell = Circsim.cellsController.get('allCells').objectAt(pvIdx);
              pvCell.set('isEnabled', YES);
              Circsim.set("pvViewDisplay", "Circsim.PVSummaryView");
              
              
              Circsim.nextPromptController.set('content', 'Submit Primary Variable');
            
              
            },

            clickedOnCell: function(s) {
              var cell = s.selection.firstObject();
              CoreCircsim.updateCell(cell);        
            },
            
            next: function(){
              var procedure = Circsim.procedureController.get("content");
              var IVIdx = procedure.get('initialVariable');
              var cell = procedure.get('columns').firstObject().get('cells').objectAt(IVIdx);
              var direction = cell.get('value');            

              var answerIsCorrect = CoreCircsim.evaluateInitialVariableDirection(procedure, direction);
              if (answerIsCorrect) {
                this.directionCorrect();
              }else{
                this.directionIncorrect();
              }
              
            },
            
            directionCorrect: function(){
              this.gotoState("IVCorrectSummary");
            },
            
            directionIncorrect: function(){
              this.gotoState("IVDirectionSecondChance");
            }
          }),
          
          "IVDirectionSecondChance": SC.State.design({
            enterState: function(){
              Circsim.messageController.set("content", "Sorry, that's the wrong direction. Please try again. When you have made your selection, click the 'Next' button above");
              Circsim.messageController.set("color", Circsim.ERRORCOLOR);
              Circsim.set("pvViewDisplay", "Circsim.PVSummaryView");
            },
            
            exitState: function(){
              Circsim.messageController.set("content", "");
              Circsim.messageController.set("color", Circsim.NORMALCOLOR);            
            },

            clickedOnCell: function(s) {
              var cell = s.selection.firstObject();
              CoreCircsim.updateCell(cell);        
            },
            
            next: function(){
              var procedure = Circsim.procedureController.get("content");
              var IVIdx = procedure.get('initialVariable');
              var cell = procedure.get('columns').firstObject().get('cells').objectAt(IVIdx);
              var direction = cell.get('value');            
              
              var answerIsCorrect = CoreCircsim.evaluateInitialVariableDirection(procedure, direction);
              
              if (answerIsCorrect) {
                this.directionCorrect();
              }else{
                this.directionIncorrect();
              }
              
              
            },
            
            directionCorrect: function(){
              this.gotoState("IVCorrectSummary");
            },
            
            directionIncorrect: function(){
              this.gotoState("IVIncorrectSummary");
            }
          }),
                  
          "IVCorrectSummary": SC.State.design({
            enterState: function(){
              Circsim.messageController.set("content", "Great!  You have identified the primary variable and the direction that it changes.  Please click Next to go on.");
              Circsim.messageController.set("color", Circsim.CORRECTCOLOR);
              Circsim.set("pvViewDisplay", "Circsim.PVSummaryView");
              var procedure = Circsim.procedureController.get('content');
              var cells = Circsim.cellsController.get('allCells');
              CoreCircsim.setPVToCorrect(procedure, cells);
              Circsim.nextPromptController.set('content', 'Next');  
            },
            
            exitState: function(){
              Circsim.messageController.set("content", "");
              Circsim.messageController.set("color", Circsim.NORMALCOLOR);
            },

            next: function() {
              this.gotoState("IVSummary");
            }
          }),
          
          "IVIncorrectSummary": SC.State.design({
            enterState: function(){
              Circsim.messageController.set("content", "Sorry, that is incorrect.  The correct answer is now displayed to the left.  Please click Next to move on.");
              Circsim.messageController.set("color", Circsim.ERRORCOLOR);
              Circsim.set("pvViewDisplay", "Circsim.PVSummaryView");
              
              var procedure = Circsim.procedureController.get('content');
              var cells = Circsim.cellsController.get('allCells');
              CoreCircsim.setPVToCorrect(procedure, cells);
              Circsim.nextPromptController.set('content', 'Next');
            },

            exitState: function(){
              Circsim.messageController.set("content", "");
              Circsim.messageController.set("color", Circsim.NORMALCOLOR);
            },
            
            next: function() {
              this.gotoState("IVSummary");
            }        
          }),
          
          "IVSummary": SC.State.design({
              enterState: function() {
                  var procedure = Circsim.procedureController.get("content");
                  Circsim.messageController.set("content", procedure.get('initialVariableSummary'));
              },
          
              exitState: function() {
                  Circsim.messageController.set("content", "");
              },
          
              next: function()
              {
                  this.gotoState("ColumnInput");
              }
          })
          

        }),
        
        "ColumnInput": SC.State.design({
          
          enterState: function(){
            this.setCurrentColumn();
            var header = Circsim.columnController.get('content').get('header');
            Circsim.messageController.set('title', '');
            Circsim.messageController.set('content', 'At this time, please fill out the '+header+' column.  When you are finished please click the Evaluate Column button.');
            
            Circsim.nextPromptController.set('content', 'Evaluate Column');
            
            // Enable only correct cells.
            var activeCells = Circsim.columnController.get('content').get('cells');
            Circsim.cellsController.get('allCells').forEach(function(c) {
              if (activeCells.contains(c)) {
                c.set('isEnabled', true);
              }else{
                c.set('isEnabled', false);
              }
            });
          },
          
          exitState: function(){
            Circsim.cellsController.get('allCells').forEach(function(c) {
              c.set('isEnabled', false);
            });
            
            Circsim.messageController.set('content', '');
            
          },
          
          setCurrentColumn: function(){
            var current = Circsim.columnController.get('current');
            Circsim.columnController.set('content', Circsim.columnsController.objectAt(current));          
          },
          
          clickedOnCell: function(s) {
            var cell = s.selection.firstObject();
            CoreCircsim.updateCell(cell);        
          },

          next: function() {
            var cells = Circsim.columnController.get('content').get('cells'); 
            var ary = [];
            
            cells.forEach(function(c) {
              ary.push(c.get('value'));
            });
            
            if (ary.contains(null) || ary.length > 7) {            
              // TODO: This is a bug.. Why is it doing this?  Fix this.            
              ary = ary.slice(0,7);
              if (ary.contains(null)) {
                Circsim.messageController.set('content',"You haven't filled in a value for all the cells yet.  Please do that before continuing.  When you have selected a value for each cell, click Evaluate Column.");
              } else {
                this.beginEvaluations();
              }
            } else {
              this.beginEvaluations();
            }
            
            
          },
          
          beginEvaluations: function(){
            this.gotoState("ColumnEvaluation");
          }
        }),
        
        "ColumnEvaluation": SC.State.design({
          initialSubstate: "RelationshipEvaluation",
          
          "RelationshipEvaluation": SC.State.design({
            initialSubstate: "REIntroduction",
            
            enterState: function() {
              var relationshipEvaluations = Circsim.procedureController.get('content').get('relationshipEvaluations');
              Circsim.relationshipEvaluationsController.set('content', relationshipEvaluations);
              Circsim.relationshipEvaluationsController.set('current', 0);            
              Circsim.messageController.set('title', "Relationship Evaluations");
            },
            
            exitState: function() {
              Circsim.messageController.set('title', "");
            },
            
            "REIntroduction": SC.State.design({
              enterState: function(){
                var idx = Circsim.relationshipEvaluationsController.get('current'),
                    re  = Circsim.relationshipEvaluationsController.get('content').objectAt(idx);
                Circsim.messageController.set("content", re.intro);
                Circsim.messageController.set("color", Circsim.NORMALCOLOR);
                
                Circsim.nextPromptController.set('content', 'Next');
                            
              },
              
              next: function() {
                this.evaluateRE();
              },
              
              evaluateRE: function() {
                var column = Circsim.columnController.get('content'),
                    cells  = column.get('cells'),
                    ary    = [],
                    re     = Circsim.relationshipEvaluationsController.get('content');
                
                if (re) {
                  var idx = Circsim.relationshipEvaluationsController.get('current');
                  re=re.objectAt(idx);  

                  cells.forEach(function(c) {
                    ary.push(c.get('value'));
                  });

                  var errorMessage = CoreCircsim.evaluateRelationships(re, ary);

                  if (errorMessage) {
                    Circsim.messageController.set('content',errorMessage);
                    this.gotoState("REErrorCorrection");
                  } else {                
                    this.gotoState("RECorrectSummary");
                  }                                            
                } else {
                  this.gotoState("ProcedureSpecificEvaluation");
                }
                
              }
              
            }),
            
            "REErrorCorrection": SC.State.design({
              enterState: function() {
                var idx = Circsim.relationshipEvaluationsController.get('current');
                var re  = Circsim.relationshipEvaluationsController.get('content').objectAt(idx);  
                Circsim.messageController.set('content', re.errorMessage);    
                Circsim.messageController.set('color', Circsim.ERRORCOLOR);

                // Enable only correct cells.
                var activeCells = re.equation;
                Circsim.columnController.get('content').get('cells').forEach(function(c) {
                  c.set('isEnabled', false);
                });              
                activeCells.forEach(function(i) {
                  var cell = Circsim.columnController.get('content').get('cells').objectAt(i);
                  cell.set('isEnabled', true);
                });
                
                // Highlight the group of cells being looked at.
                var cells = Circsim.columnController.get('content').get('cells');
                var relationshipIndices = re['equation'];
                CoreCircsim.highlightIncorrectRelationships(cells, relationshipIndices);
              },
              
              exitState: function(){
                Circsim.messageController.set('content', '');
                Circsim.messageController.set('color', Circsim.NORMALCOLOR);
                Circsim.cellsController.get('allCells').forEach(function(c) {
                  c.set('isEnabled', false);
                });
              },
              
              clickedOnCell: function(s) {
                var cell = s.selection.firstObject();
                CoreCircsim.updateCell(cell);        
              },            
              
              next: function(){
                this.submitRECorrections();
              },
              
              submitRECorrections: function(){
                var column    = Circsim.columnController.get('content'),
                    cells     = column.get('cells'),
                    ary       = [],
                    idx       = Circsim.relationshipEvaluationsController.get('current'),
                    re        = Circsim.relationshipEvaluationsController.get('content').objectAt(idx);

                cells.forEach(function(c) {
                  ary.push(c.get('value'));
                });

                var errorMessage = CoreCircsim.evaluateRelationships(re, ary);

                if (errorMessage) {
                  this.gotoState("REIncorrectSummary");
                } else {                
                  this.gotoState("RECorrectSummary");
                }                                            
              }
            }),
            
            "RECorrectSummary": SC.State.design({
              enterState: function(){
                var idx = Circsim.relationshipEvaluationsController.get('current'),
                    re  = Circsim.relationshipEvaluationsController.get('content').objectAt(idx);
                
                Circsim.messageController.set('content', re.summaryCorrectMessage);
                Circsim.messageController.set('color', Circsim.CORRECTCOLOR);
                
                Circsim.nextPromptController.set('content', 'Next');

                // Do RE Highlighting
                var cells = Circsim.columnController.get('content').get('cells');
                var relationshipIndices = re['equation'];
                CoreCircsim.highlightCorrectRelationships(cells, relationshipIndices);
              },
              
              exitState: function(){
                Circsim.messageController.set('content', "");
                Circsim.messageController.set('color', Circsim.NORMALCOLOR);              
                var cells = Circsim.columnController.get('content').get('cells');
                CoreCircsim.removeREHighlights(cells);
              },
              
              next: function(){
                var idx                          = Circsim.relationshipEvaluationsController.get('current'),
                    totalRelationshipEvaluations = Circsim.relationshipEvaluationsController.get('content').length;
                
                if (idx+1 == totalRelationshipEvaluations) {
                  this.gotoState("ProcedureSpecificEvaluation");
                } else {
                  Circsim.relationshipEvaluationsController.set('current', idx+1);
                  this.gotoState("REIntroduction");
                }
              }
            }),
            
            "REIncorrectSummary": SC.State.design({
              enterState: function(){
                var idx = Circsim.relationshipEvaluationsController.get('current'),
                    re  = Circsim.relationshipEvaluationsController.get('content').objectAt(idx);
                
                Circsim.messageController.set('content', re.summaryIncorrectMessage);
                Circsim.messageController.set('color', Circsim.ERRORCOLOR);
                
                Circsim.nextPromptController.set('content', 'Next');

                // RE Highlighting Stuff
                var cells = Circsim.columnController.get('content').get('cells');
                var relationshipIndices = re['equation'];
                CoreCircsim.highlightIncorrectRelationships(cells, relationshipIndices);

              },
              
              exitState: function(){
                Circsim.messageController.set('content', '');
                Circsim.messageController.set('color', Circsim.NORMALCOLOR);              
                var cells = Circsim.columnController.get('content').get('cells');
                CoreCircsim.removeREHighlights(cells);
              },
              
              next: function(){
                var idx                          = Circsim.relationshipEvaluationsController.get('current'),
                    totalRelationshipEvaluations = Circsim.relationshipEvaluationsController.get('content').length;
                
                if (idx+1 == totalRelationshipEvaluations) {
                  this.gotoState("ProcedureSpecificEvaluation");
                } else {
                  Circsim.relationshipEvaluationsController.set('current', idx+1);
                  this.gotoState("REIntroduction");
                }
              }
            })          
          }),
          
          "ProcedureSpecificEvaluation": SC.State.design({
                      
            initialSubstate: "ProcedureSpecificIntro",
            
            "ProcedureSpecificIntro": SC.State.design({
              enterState: function() {
                Circsim.messageController.set('title', "Procedure Specific Evaluations");
                Circsim.messageController.set('content', "Your predictions will now be evaluated for errors specific to this procedure.  When you are ready, please click Evalute My Answers.");
                Circsim.nextPromptController.set('content', 'Evalute My Answers');
              },
              
              next: function() {
                this.gotoState("PerformProcedureSpecificEvaluations");
              }
            }),
            
            "PerformProcedureSpecificEvaluations": SC.State.design({
              enterState: function(){
                var column    = Circsim.columnController.get('content'),
                    cells     = column.get('cells'),
                    ary       = [],
                    procedure = Circsim.procedureController.get('content'),
                    colNumber = Circsim.columnController.get('current');
                
                cells.forEach(function(c) {
                  ary.push(c.get('value'));
                });
                              
                var answerKeys = CoreCircsim.evaluateProcedureSpecificErrors(procedure, colNumber ,ary);              
                
                if (answerKeys.length === 0) {
                  Circsim.messageController.set('content', "Your answers don't match any of the answer keys.  This is probably an error.  Please notify Dr. Michael or Dr. Shannon and record the answers you submitted so we can fix this bug.");
                  this.gotoState("DisplayProcedureSpecificComment");
                } else {
                  
                  Circsim.messageController.set('content', "The evaluation is complete.  Your answers are displayed on the left.  The correct answers are displayed on the right.  When you are ready, we will walk through these answers one by one with explanations.  When you are finished reading an explanation, click Next to continue to the next one.  You will notice that if your answer matches the correct answer, the cell will be highlighted in green.  If your answer is incorrect, the cell will be highlighted in red.");
                  
                  Circsim.nextPromptController.set('content', 'Next');
                  
                  // Setting the correctAnswer display.
                  var key          = Circsim.procedureController.get('key');
                  var col          = Circsim.columnController.get('current');
                  var rowLength    = Circsim.procedureController.get('rows').length;
                  var vals         = key.slice(col*rowLength, (col+1)*rowLength);    
                  var currentCells = Circsim.columnController.get('content').get('cells');
                  CoreCircsim.setCellsToCorrectValues(vals, currentCells);                
                  
                  CoreCircsim.removeCorrectAnswers(Circsim.cellsController.get('allCells')); // First, remove all displayed answers
                  CoreCircsim.displayCorrectAnswers(currentCells); // Then display the correct ones.
                                  
                  // Setting messages array
                  Circsim.messagesController.set('content', answerKeys);
                  Circsim.messagesController.set('index', 0);
                }
              },
              
              next: function(){
                this.gotoState("DisplayProcedureSpecificComment");
              }
              
                          
            }),
            
            "DisplayProcedureSpecificComment": SC.State.design({
              enterState: function() {
                
                var answerKey = Circsim.messagesController.get('content'),
                    answerIndex = Circsim.messagesController.get('index'),
                    comment, 
                    category,
                    highlights,
                    isCorrect,
                    cells;
                
                // Do all display stuff in here.
                if (SC.compare(answerKey, []) !== 0 && SC.compare(answerKey, null) !== 0) {
                  answerKey = answerKey.get(answerIndex);
                  
                  if(answerIndex > 0) {
                      Circsim.prevPromptController.set('isVisible', YES);
                  }
                  else {
                      Circsim.prevPromptController.set('isVisible', NO);
                  }
                  
                  // Setup view here.
                  comment    = answerKey.get('comment');
                  category   = answerKey.get('category');
                  highlights = answerKey.get('highlights');
                  isCorrect  = answerKey.get('isCorrect');
                  cells      = Circsim.columnController.get('content').get('cells');
                              
                  CoreCircsim.updateHighlighting(cells, highlights);
                  Circsim.messageController.set('content', comment);
                  Circsim.messageController.set('title', category);
                  
                  // Set coloring
                  if (isCorrect) {
                    Circsim.messageController.set('color', Circsim.CORRECTCOLOR);
                  }else{
                    Circsim.messageController.set('color', Circsim.ERRORCOLOR);
                  }

                  // This code makes the correct answers highlight
                  var correctCells = [];
                  highlights.forEach(function(idx) {
                    correctCells.push(cells.objectAt(idx));
                  });
                  CoreCircsim.removeCorrectAnswers(Circsim.cellsController.get('allCells')); // First, remove all displayed answers
                  CoreCircsim.displayCorrectAnswers(correctCells); // Then display the correct ones.

                }              
              },
              
              exitState: function(){
                var cells = Circsim.columnController.get('content').get('cells');
                // Remove highlighting
                CoreCircsim.updateHighlighting(cells, null);
                // Disable all cells
                cells.forEach(function(cell) {cell.set("isEnabled", NO);});
                
                // Reset Messages
                Circsim.messageController.set('title', '');
                Circsim.messageController.set('content', '');
                Circsim.messageController.set('color', Circsim.NORMALCOLOR);                                          
                
                //
                CoreCircsim.removeCorrectAnswers(Circsim.cellsController.get('allCells'));
                
                Circsim.prevPromptController.set('isVisible', NO);
              },
              
              prev: function(){
                  var currentIndex = Circsim.messagesController.get('index');
                  Circsim.messagesController.set('index', currentIndex - 1);
                  this.gotoState("DisplayProcedureSpecificComment");
              },
              
              next: function(){
                var currentIndex = Circsim.messagesController.get('index');
                var commentsRemaining = Circsim.messagesController.get('content'); 
                if (currentIndex + 1 < commentsRemaining.length) {
                  Circsim.messagesController.set('index', currentIndex + 1);
                  this.gotoState("DisplayProcedureSpecificComment");
                } else {
                  this.gotoState("CheckForRemainingColumns");
                }
              }           
            })
          })
        }),
        
        "CheckForRemainingColumns": SC.State.design({
          
          enterState: function() {
            var totalColumns  = Circsim.procedureController.get('columns').length(),
                currentColumn = Circsim.columnController.get("current")+1;
                console.log("current: "+currentColumn+"; Total: "+totalColumns);
            if (currentColumn < totalColumns) {
              this.remainingColumns();
            }else{
              this.procedureComplete();            
            }          
          },
          
          remainingColumns: function(){
            var current = Circsim.columnController.get('current');
            Circsim.columnController.set('current', current+1);
            this.gotoState("ColumnInput");
          },
          
          procedureComplete: function(){
            this.gotoState("ProcedureComplete");
          }
        })
      }),

      "ProcedureComplete": SC.State.design({
        enterState: function(){
          var procedure = Circsim.procedureController.get("content");
          var allCells = Circsim.cellsController.get('allCells');

          Circsim.procedureController.get('content').set('isComplete', true);
          
          CoreCircsim.removeCorrectAnswers(allCells);
          CoreCircsim.removeValues(allCells);
          // CoreCircsim.displayValues(allCells);
          
          Circsim.messageController.set("title", "Summary");
          Circsim.messageController.set("content", procedure.get('procedureSummary'));
          Circsim.nextPromptController.set("content", "Finish");
        },
        
        exitState: function(){
          // Reset stuff...
          Circsim.cellsController.get('allCells').forEach(function(c) {c.set('value', null);});
          Circsim.cellsController.get('allCells').forEach(function(c) {c.set('correctAnswer', null);});
          Circsim.columnController.set('current', 0);
          Circsim.columnController.set('content', "");
          Circsim.relationshipEvaluationsController.set('current', 0);
        },
        
        next: function() {
          this.gotoState("Running");
        }
      }),

      selectProcedure: function(sender) {
        this.gotoState("Procedure");
        Circsim.cellsController.notifyPropertyChange('allCells');
      }
    })
  })
});

/* >>>>>>>>>> BEGIN source/statecharts/modal-statechart.js */
/*globals Circsim CoreCircsim*/

Circsim.mixin({
  modalStates: SC.State.design({ initialSubstate: 'NoModal',
    'NoModal': SC.State.design({
      enterState: function(attribute) {
      },

      toggleSchematic: function() {
        this.gotoState('Schematic');
      }, 

      toggleHelp: function() {
        this.gotoState('Help');
      }
    }), 

    'Schematic': SC.State.design({
      enterState: function() {
        var modal = Circsim.modalsPage.get('schematicView');  
        this._modal = modal;
        modal.append();
      }, 

      toggleSchematic: function() {
        this.gotoState('NoModal');
      }, 

      toggleHelp: function() {
        this.gotoState('Help');
      }, 

      exitState: function() {
        var modal = this._modal;
        modal.remove();
      }
    }), 

    'Help': SC.State.design({
      enterState: function() {
        var modal = Circsim.modalsPage.get('helpView');  
        this._modal = modal;
        modal.append();
      }, 

      toggleSchematic: function() {
        this.gotoState('Schematic');
      }, 

      toggleHelp: function() {
        this.gotoState('NoModal');
      }, 
      
      exitState: function() {
        var modal = this._modal;
        modal.remove();
      }
    })
  })
});

/* >>>>>>>>>> BEGIN source/views/cell.js */
/*globals Circsim*/

Circsim.CellView = SC.View.extend(SC.ContentDisplay, {
  contentDisplayProperties: "value isHighlighted isEnabled displayCorrectAnswer highlightRECorrect highlightREIncorrect displayValue".w(),
  
  render: function(context, f) {
    var content              = this.get('content'),
        value                = content.get('value'),
        column               = content.get('column').get('header'),
        isEnabled            = content.get('isEnabled'),
        isHighlighted        = content.get('isHighlighted'),
        correctAnswer        = content.get('correctAnswer'),
        displayCorrectAnswer = content.get('displayCorrectAnswer'),
        highlightRECorrect   = content.get('highlightRECorrect'),
        highlightREIncorrect = content.get('highlightREIncorrect'),
        displayValue         = content.get('displayValue');

    // Sets value of cell.
    switch (value) {
      case 0: 
        value = "0";
        break;
      case 1: 
        value = "<img src="+'/static/circsim/en/688c5bf3a9dedfdcfff2fe928dbba098a1aa58ee/source/resources/images/down.png'+" />";
        break;
      case 2: 
        value = "<img src="+'/static/circsim/en/688c5bf3a9dedfdcfff2fe928dbba098a1aa58ee/source/resources/images/up.png'+" />";
        break;
      default:
        value = "";
        break;
    }
    
    // Sets correct answer display
    switch (correctAnswer) {
      case 0: 
        correctAnswer = "0";
        break;
      case 1: 
        correctAnswer = "<img src="+'/static/circsim/en/688c5bf3a9dedfdcfff2fe928dbba098a1aa58ee/source/resources/images/down.png'+" />";
        break;
      case 2: 
        correctAnswer = "<img src="+'/static/circsim/en/688c5bf3a9dedfdcfff2fe928dbba098a1aa58ee/source/resources/images/up.png'+" />";
        break;
      default:
        correctAnswer = "";
        break;
    }        
    
    if (correctAnswer) {
      // Sets background color of cell.
      var enabled     = isEnabled;
      var disabled    = !isEnabled; 
      var correctHighlighting = false;
      var incorrectHighlighting = false;
      var correctHighlight = false;
      var incorrectHighlight = false;          

      // This is messy, but I basically am just saying "Add color if displayCorrectAnswer is true"
      if (displayCorrectAnswer){
        if (correctAnswer == value) {
          if (isHighlighted) {
            correctHighlight = true;
          }else {
            correctHighlighting = true;
          }            
        } else {
          if (isHighlighted) {
            incorrectHighlight = true;
          }else {
            incorrectHighlighting = true;
          }
        }            
      }
      
      var classes  = { 'enabled': enabled, 'disabled': disabled, 'correctomundo': correctHighlighting, 'wrongo': incorrectHighlighting, 'correctHighlight': correctHighlight, 'incorrectHighlight': incorrectHighlight};
      
      // Render the html   
      context.setClass(classes);
      if (displayValue) {
          context.push('<span class="cell-value-student">'+value+'</span>');  
          context.push('<span class="cell-value-correct">'+correctAnswer+'</span>'); 
      } else {
          context.push('<span class="cell-value">'+correctAnswer+'</span>')
      }
 
        
    } else {
      // Sets background color of cell.
      enabled     = isEnabled;
      disabled    = !isEnabled;

      // Do RE Highlighting
      highlightRECorrect = highlightRECorrect;
      highlightREIncorrect = highlightREIncorrect;

      classes  = { 'enabled': enabled, 'disabled': disabled, 'highlightRECorrect': highlightRECorrect, 'highlightREIncorrect': highlightREIncorrect};
      
      // Render the html
      context.setClass(classes);
      context.push('<span class="cell-value">'+value+'</span>');   
    }
  }
});

/* >>>>>>>>>> BEGIN source/views/content.js */
/*globals Circsim*/

Circsim.contentViews = SC.Page.design({});
/* >>>>>>>>>> BEGIN source/views/content/help.js */
/*globals Circsim*/

Circsim.contentViews.helpView = SC.View.design({
  childViews: "helpContentView closeHelpButton".w(),
  
  closeHelpButton: SC.ButtonView.design({
    layout: {top: 10, left: 10, height: 30, width: 100},
    title: "Close Help",
    target: "Circsim.statechart",
    action: "closeHelp"
  }),
  
  helpContentView: SC.LabelView.design({
    layout: {top: 55, bottom: 0, right: 0, left: 0},
    value: "Help Screen goes here."
  })
});



/* >>>>>>>>>> BEGIN source/views/content/intro.js */
/*globals Circsim*/

Circsim.contentViews.introView = SC.View.design({
  childViews: 'text'.w(),
  
  text: SC.TemplateView.design({
    templateName: 'circsim_intro',
    layerId: "circsim-introduction"    
  })
});

/* >>>>>>>>>> BEGIN source/views/content/procedure_intro.js */
/*globals Circsim*/

Circsim.contentViews.procedureIntroView = SC.View.design({
  
  layout: {top: 130, left: 130, right: 130, bottom: 130},  
  childViews: "startProcedureButton procedureIntroText".w(),
  
  procedureIntroText: SC.LabelView.design({
    layout: {right: 0, left: 0, top: 0, bottom: 30},    
    valueBinding: "Circsim.procedureController.introduction",
    escapeHTML: NO
  }),
  
  startProcedureButton: SC.ButtonView.design({
    layout: {bottom: 0, left: 0, height: 24, width: 124},
    title: "Begin Procedure",
    layerId: "begin-procedure-button",
    target: "Circsim.statechart",
    action: "beginProcedure"
  })
  
});

/* >>>>>>>>>> BEGIN source/views/content/title.js */
/*globals Circsim*/

Circsim.contentViews.titleView = SC.View.design({
  childViews: "circsimLogoView startButton".w(),
  
  circsimLogoView: SC.TemplateView.design({
    templateName: "title",
    layerId: 'title-information'
  }),
  
  startButton: SC.ButtonView.design({
    layout: {height: 75, width: 150, bottom: 0, left: 130},
    title: "Start Circsim",
    layerId: 'start-circsim-button',
    target: "Circsim.statechart",
    action: "startCircsim"
  })
  
});

/* >>>>>>>>>> BEGIN source/views/grid_header.js */
/*globals Circsim*/

Circsim.GridHeaderView = SC.View.extend({
    
    render: function(context){    
      var headers = Circsim.procedureController.get("content").get("cols");
        context.push('<div id="grid-headers">');

        headers.forEach(function(h) {
        context.push('<div>');
          switch (h) {
            case "DR": 
              context.push('<a href="#" rel="twipsy" data-original-title="Direct Response">'+h+'</a>');
              break;
            case "RR": 
              context.push('<a href="#" rel="twipsy" data-original-title="Reflex Response">'+h+'</a>');
              break;
            case "SS": 
              context.push('<a href="#" rel="twipsy" data-original-title="Steady State">'+h+'</a>');
              break;
            default:
              context.push(h);
              break;
          }
        context.push('</div>');          
        });

        context.push('</div>');
        $("#grid-headers a[rel=twipsy]").twipsy({live:true, placement: "above"});        

    }
});

/* >>>>>>>>>> BEGIN source/views/procedure_messages.js */
/*globals Circsim*/

Circsim.ProcedureMessagesView = SC.View.extend({
    
    render: function(context){    
      var message = this.get('message');
      context.push(
        '<p>',
        ''+message+'',
        '</p>'
      );
    }
});









/* >>>>>>>>>> BEGIN source/views/pv.js */
/*globals Circsim*/

Circsim.PVView = SC.View.design({
  layout: {top: 0, left: 0, height: 50, width: 480},
  tagName: "div",
  layerId: "pv-view",
  backgroundColor: "#999",
  childViews: "pvLabel pvSelection".w(),
    
    pvLabel: SC.LabelView.design({
      layout: {top: 15, width: 150, height: 30, left: 20},
      value: "Primary Variable:",
      layerId: 'pv-label'
    }),
    
    pvSelection: SC.SelectFieldView.design({          
      layout: {top: 15, width: 330, height: 30, right: 15},
      valueBinding: "Circsim.pvSelectionController.content",
      objectsBinding: "Circsim.procedureController.rows",
      disableSort: true,
      emptyName: "Select the Primary Variable",
      layerId: 'pv-select'
      
    })
});

Circsim.PVSummaryView = SC.View.design({
  layout: {top: 0, left: 0, height: 50, width: 480},
  tagName: "div",
  layerId: "pv-summary-view",
  backgroundColor: "#999",
  childViews: "pvLabel pvAnswer".w(),
    
  pvLabel: SC.LabelView.design({
    layout: {top: 15, width: 150, height: 30, left: 20},
    value: "Primary Variable:"
  }),
  
  pvAnswer: SC.LabelView.design({          
    layout: {top: 14, width: 250, height: 30, left: 132},
    valueBinding: "Circsim.procedureController.currentPV",
    fontWeight: SC.BOLD_WEIGHT,
    layerId: "correct-pv-display"
  })
});

/* >>>>>>>>>> BEGIN source/views/row_view.js */
/*globals Circsim */

Circsim.RowView = SC.View.extend({

  render: function(context){    
    var rows = Circsim.procedureController.get("content").get("rows");
      context.push('<ul id="grid-rows">');
      rows.forEach(function(h) {
        context.push("<li>");
        switch (h) {
          case "IS": 
            context.push('<a href="#" rel="twipsy" data-original-title="Inotropic State">'+h+'</a>');
            break;
          case "CVP": 
            context.push('<a href="#" rel="twipsy" data-original-title="Central Venous Pressure">'+h+'</a>');
            break;
          case "SV": 
            context.push('<a href="#" rel="twipsy" data-original-title="Stroke Volume">'+h+'</a>');
            break;
          case "HR": 
            context.push('<a href="#" rel="twipsy" data-original-title="Heart Rate">'+h+'</a>');
            break;
          case "CO": 
            context.push('<a href="#" rel="twipsy" data-original-title="Cardiac Output">'+h+'</a>');
            break;
          case "Ra": 
            context.push('<a href="#" rel="twipsy" data-original-title="Arterial Resistance">'+h+'</a>');
            break;
          case "MAP": 
            context.push('<a href="#" rel="twipsy" data-original-title="Mean Arterial Pressure">'+h+'</a>');
            break;
          default:
            context.push(h);
            break;
        }
        context.push("</li>");      
      });          
      context.push('</ul>');
      $("#grid-rows a[rel=twipsy]").twipsy({live:true, placement: "left"});
  }

});

/* >>>>>>>>>> BEGIN source/views/select_view.js */
/*globals Circsim */
Circsim.SelectView = SC.View.extend({

  tagName: "select",
  value: null,

  render: function(context){
    var items = Circsim.procedureController.get('rows');
    items.forEach(function(item) {
      context.push('<option value="'+item+'">'+item+'</option>');
    });
  }
});

/* >>>>>>>>>> BEGIN source/views/procedure.js */
/*globals Circsim*/

sc_require("views/procedure_messages");
sc_require("views/pv");
sc_require("views/row_view");
sc_require("views/select_view");
sc_require("lib/grid_patch");

Circsim.contentViews.procedureView = SC.View.design({
  layerId: 'procedure',
  layout: { left: 0, top: 0, right: 0, bottom: 0, minWidth: 800},
  childViews: "procedureToolbar procedureContent".w(),  
  procedureToolbar: SC.View.design({    
    layout: {top: 20, right: 10, left: 10, height: 40},
    tagName: "div",
    layerId: "procedure-toolbar",
    childViews: "procedureTitle nextButton prevButton".w(),
    procedureTitle: SC.LabelView.design({
      layout: {top: 0, right: 10, left: 10, height: 20, centerY: 0},
      tagName: "h3",
      layerId: "procedure-title",
      valueBinding: "Circsim.procedureController.title"
    }),
    prevButton: SC.ButtonView.design({
      useStaticLayout: YES,
      layerId: "prev-button",
      classNames: 'btn',
      titleBinding: "Circsim.prevPromptController.content",
      isVisibleBinding: "Circsim.prevPromptController.isVisible",
      target: "Circsim.statechart",
      action: "prev",
      render: function(context) {
        var title = this.get('title');
        context.push(title);
      }   
    }),
    nextButton: SC.ButtonView.design({
      useStaticLayout: YES, 
      layerId: "next-button",
      classNames: 'btn',
      titleBinding: "Circsim.nextPromptController.content",
      target: "Circsim.statechart",
      action: "next",
      render: function(context) {
        var title = this.get('title');
        context.push(title);
      }      
    })

  }),
  
  procedureContent: SC.View.design({
    layout: {top: 60, right: 10, left: 10, bottom: 0},
    tagName: "div",
    layerId: "procedure-content",
    childViews: "pvView predictionTableView messagesView".w(),
    pvView: SC.ContainerView.design({
      nowShowingBinding: "Circsim.pvViewDisplay"
    }),
    
    predictionTableView: SC.View.design({
      layout: {top: 50, left: 0, bottom: 0, width: 470},
      tagName: "div",
      layerId: "prediction-table-view",
      backgroundColor: "white",
      childViews: "gridView headerView rowTitleView".w(),
      
      headerView: Circsim.GridHeaderView.design({
        layout: {right: 0, left: 0, top: 0, height: 50 }
      }),
      
      rowTitleView: Circsim.RowView.design({
        layout: {left: 0, width: 90, top: 50, bottom: 0}
      }),
      
      gridView: SC.GridView.design({
        layout: {right: 4, top: 50, left: 68},
        insertionOrientation: SC.VERTICAL_ORIENTATION,
        columnWidth:120,
        rowHeight: 50,
        contentBinding: "Circsim.cellsController.allCells",           
        target: "Circsim.statechart",
        action: "clickedOnCell",
        actOnSelect: YES,
        exampleView: Circsim.CellView.design({
          classNames: "cell"
        })
      })
    }),
    
    messagesView: SC.View.design({
      layout: {top: 0, left: 480, bottom: 0, right: 0},
      childViews: "messageTitle messageBody".w(),
      tagName: "div",
      layerId: "messages-view",
      backgroundColor: "#FBFBFB",
    
      messageTitle: SC.LabelView.design({        
        layout: {top: 10, left: 20, height: 20, right: 20},
        valueBinding: "Circsim.messageController.title",
        layerId: 'messages-title',
        backgroundColorBinding: 'Circsim.messageController.titleColor'
      }),
      
      messageBody: SC.LabelView.design({
        layout: {top: 40, left: 20, height: 392, right: 20},
        valueBinding: "Circsim.messageController.content",
        layerId: 'messages-body',
        backgroundColorBinding: 'Circsim.messageController.color',
        escapeHTML: NO
      })
    })
  })
  
    
});

/* >>>>>>>>>> BEGIN source/views/sidebar.js */
/*globals Circsim*/

Circsim.sidebarViews = SC.Page.design({});
/* >>>>>>>>>> BEGIN source/views/sidebar/running.js */
/*globals Circsim*/

Circsim.sidebarViews.runningView = SC.View.design({
  layout: {width: 250},
  childViews: 'procedureLabelView procedureListView'.w(),        
  procedureLabelView: SC.LabelView.design({
    layout: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    },
    backgroundColor: "#DDDDDD",
    layerId: "procedure-label",
    fontWeight: SC.BOLD_WEIGHT,
    value: 'Procedures:'
  }),
  
  procedureListView: SC.ScrollView.design({
    hasHorizontalScroller: NO,
    layout: {
      top: 32,
      bottom: 0,
      left: 0,
      right: 0
    },
    backgroundColor: '#FBFBFB',
    contentView: SC.ListView.design({
      contentBinding: 'Circsim.proceduresController.arrangedObjects',
      selectionBinding: 'Circsim.proceduresController.selection',
      contentValueKey: 'title',
      rowHeight: 62,
      canDeleteContent: NO,
      actOnSelect: YES, 
      target: "Circsim.statechart",
      action: "selectProcedure"
    })
  })  

});
/* >>>>>>>>>> BEGIN source/views/sidebar/title.js */
/*globals Circsim*/

Circsim.sidebarViews.titleView = SC.View.design({
  layout: {width: 250},
  backgroundColor: "#ebebeb"
});
/* >>>>>>>>>> BEGIN source/views/toolbar.js */
/*globals Circsim*/

Circsim.ToolbarView = SC.View.extend({
    
    render: function(context){          
      var iconUrl = this.get('iconUrl');
      var schematicUrl = this.get('schematicUrl');
      var schematicImage = '/static/circsim/en/688c5bf3a9dedfdcfff2fe928dbba098a1aa58ee/source/resources/images/schematic.png';
      context.push(
        '  <div id="logo-image"></div>',
        '  <div id="circsim-title">',
        '    Circsim',
        '  </div>',
        '  <a href="#" data-controls-modal="schematic-modal" class="btn" id="schematic-button"><img src="'+schematicUrl+'">Schematic</a>',
        '  <a href="#" data-controls-modal="help-modal" class="btn" id="help-button"><img src="'+iconUrl+'">Help</a>',
        '<div id="help-modal" class="modal hide fade" style="display: block; ">',
        '  <div class="modal-header">',
        '    <a href="#" class="close">×</a>',
        '    <h3>Circsim Help</h3>',
        '  </div>',
        '  <div class="modal-body">',
        '    <p>Each of the "experiments" in this exercise illustrates some important principle which will help you to understand the circulatory system as a closed system with interacting parts.</p>',
        '    <p>To proceed through the program watch for the instructions on the right of the screen.</p>',
        '    <p></p>',
        '  </div>',
        '  <div class="modal-footer">',
        '  </div>',
        '</div>',
        '<div id="schematic-modal" class="modal hide fade" style="display: block; ">',
        '  <div class="modal-header">',
        '    <a href="#" class="close">×</a>',
        '    <h3>Circsim Schematic</h3>',
        '  </div>',
        '  <div class="modal-body">',
        '    <img src="'+schematicImage+'">',
        '  </div>',
        '  <div class="modal-footer">',
        '  </div>',
        '</div>'
        
      );
    }
});

/* >>>>>>>>>> BEGIN source/resources/main_page.js */
/*globals Circsim */

sc_require("views/toolbar");
sc_require("views/procedure");

// This page describes the main user interface for your application.  
Circsim.mainPage = SC.Page.design({

  mainPane: SC.MainPane.design({
    childViews: 'toolbar middleView bottomView'.w(),
    
    toolbar: SC.ToolbarView.design({
      iconUrl: '/static/circsim/en/688c5bf3a9dedfdcfff2fe928dbba098a1aa58ee/source/resources/images/help.png',
      schematicUrl: '/static/circsim/en/688c5bf3a9dedfdcfff2fe928dbba098a1aa58ee/source/resources/images/schematic-icon.png',
      displayProperties: ["helpDisplay"],
      tagName: "div",
      layerId: "top-toolbar",
      useStaticLayout: YES, 
      childViews: ['logoView', 'schematicButton', 'helpButton'],
      'logoView': SC.LabelView.design({
        useStaticLayout: YES,
        layerId: 'circsim-title',
        value: 'Circsim'
      }), 

      'schematicButton': SC.ButtonView.design({
        layout: {right: 98, top: 5, width:101, height: 24 },
        icon: '/static/circsim/en/688c5bf3a9dedfdcfff2fe928dbba098a1aa58ee/source/resources/images/schematic-icon.png',
        title: 'Schematic',
        target: 'Circsim.statechart', 
        action: 'toggleSchematic'
      }), 

      'helpButton': SC.ButtonView.design({
        layout: {right: 20, top: 5, width: 67, height: 24 },
        icon: '/static/circsim/en/688c5bf3a9dedfdcfff2fe928dbba098a1aa58ee/source/resources/images/help.png',
        title: 'Help',
        target: 'Circsim.statechart', 
        action: 'toggleHelp'
      })
    }),
    
    middleView: SC.SplitView.design({
      layout: {
        left: 0,
        top: 32,
        right: 0,
        bottom: 32
      },
      canCollapseViews: NO,
      defaultThickness: 250,
      topLeftMaxThickness: 250,
      dividerThickness: 0,
      layoutDirection: SC.LAYOUT_HORIZONTAL,
          
      topLeftView: SC.ContainerView.extend({
        layout:{width: 250},
        nowShowingBinding: 'Circsim.sidebarView',
        layerId: "procedure-selection"
      }),

      dividerView: SC.View,

      bottomRightView: SC.ContainerView.design({
        layerId: "content",
        nowShowingBinding: 'Circsim.contentController.contentDisplay'        
      })
    }),

    bottomView: SC.TemplateView.design({
      templateName: "footer"
    })
  })

});

/* >>>>>>>>>> BEGIN source/resources/modal_page.js */
Circsim.modalsPage = SC.Page.design({
  schematicView: SC.PanelPane.design({
    layout: {height: 444, width: 820, centerX: 0, centerY: 0},
    isModal: YES, 
    modalPane: SC.ModalPane.design({
      layout: {top:0, bottom: 0, left: 0, right: 0}, 
      layerId: 'schematic-modal',
      backgroundColor: "black"
    }),
    contentView: SC.View.design({
      childViews: 'schematicImage schematicLabel closeButton'.w(), 
      schematicImage: SC.ImageView.design({
        layout: {left: 0, right: 0, height: 400}, 
        value: '/static/circsim/en/688c5bf3a9dedfdcfff2fe928dbba098a1aa58ee/source/resources/images/schematic.png' 
      }),
      schematicLabel: SC.LabelView.design({
        layout: {left: 10, bottom: 11, width: 200, height: 24},
        layerId: 'schematic-label',
        value: "Circsim Schematic"
      }), 
      closeButton: SC.ButtonView.design({
        layout: {bottom: 10, right: 10, height: 24, width: 74},
        icon: '/static/circsim/en/688c5bf3a9dedfdcfff2fe928dbba098a1aa58ee/source/resources/images/no-change.png',
        title: "Close", 
        target: 'Circsim.statechart',
        action: 'toggleSchematic'
      })
    })
  }), 

  helpView: SC.PanelPane.design({
    layout: {height: 168, width: 420, centerX: 0, centerY: 0},
    isModal: YES, 
    modalPane: SC.ModalPane.design({
      layout: {top:0, bottom: 0, left: 0, right: 0}, 
      layerId: 'schematic-modal',
      backgroundColor: "black"
    }),
    contentView: SC.View.design({
      childViews: 'helpInfo helpLabel closeButton'.w(), 
      helpInfo: SC.LabelView.design({
        layout: {top: 44, left: 10, right: 10, height: 204},
        value: 'Each of the procedures in this exercise illustrates an important principle which will help you understand the circulatory system as a closed system with interacting parts. To proceed through the program, watch for instructions on the right of the screen.'
      }),
      helpLabel: SC.LabelView.design({
        layout: {left: 10, top: 11, width: 200, height: 24},
        layerId: 'schematic-label',
        value: "Circsim Help Menu"
      }), 
      closeButton: SC.ButtonView.design({
        layout: {bottom: 10, right: 10, height: 24, width: 74},
        icon: '/static/circsim/en/688c5bf3a9dedfdcfff2fe928dbba098a1aa58ee/source/resources/images/no-change.png',
        title: "Close", 
        target: 'Circsim.statechart',
        action: 'toggleHelp'
      })
    })
  })
})

/* >>>>>>>>>> BEGIN source/main.js */
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

