;(function( $, window, document, undefined) {

  // TODO LIST
  // Iterate over select fields
  // Iterate over sub-input fields

  /*
  * Valid will be our global
  * Setting up deafult styles for invalid fields
  */
  var valid = true; //Setting up to true in any case something fails will be set to false
  var defaults = {
    border: '2px solid #f00' //Basic style to set up invalid field
  };

  function validamesta(target, options) {
    that = this;
    this.$target = $(target);
    this.settings = $.extend({}, defaults, options);
    this.init();
    return valid;
  }
  
  validamesta.prototype = {
    init: function(options) {
      // Validating either a complete form or a single form field
      // this might work even if no form is present
      if(this.$target.is('form'))
        this.validateForm(); // Validating complete form
      else
        this.validateField(); // Validating single field
    },
    validateForm: function() {
      // For every type of input a special validation must be run

      // Iterating over input tag fields
      that.$target.find('input').each(function() {
        that.validateInput(this);
      });
      // Iterating over textarea tag fields
      that.$target.find('textarea').each(function() {
        that.validateTextArea(this);
      });
      // Still to be implemented
      // TODO: Iterate over select fields
      that.$target.find('select').each(function(){
        that.validateSelect(this);
      });
    },
    validateInput: function(target) {
      if($(target).attr('data-rule') == 'required'){
        switch(target.type) {
          case 'text':
            that._validateText(target);
        }
      }
    },
    validateTextArea: function(target) {
      if($(target).attr('data-rule') == 'required')
      that._validateText(target);
    },
    validateSelect: function(target) {
      if($(target).attr('data-rule') == 'required')
      that._validateText(target);
    },
    _validateText: function(textTarget) {
      if(textTarget.value == "")
        that._invalidField(textTarget);
      else
        $(textTarget).css('border', $(textTarget).attr('data-border'));
    },
    _invalidField: function(target) {
      //What I do here is to save the border style of the input for the first time and upon fail place a red border
      if($(target).attr('data-border') == "") $(target).attr('data-border', $(target).css('border'));
      valid = false;
      $(target).css('border', that.settings.border);
    }
  }

  $.fn.validamesta = function( options ) {
    return this.each(function() {
      new validamesta(this, options);
    });
  }

})( jQuery, window, document);

