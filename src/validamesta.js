;(function( $, window, document, undefined) {

  var valid = true;
  var defaults = {
    border: '2px solid #f00'
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
      if(this.$target.is('form'))
        this.validateForm();
      else
        this.validateField();
    },
    validateForm: function() {
      that.$target.find('input').each(function() {
        that.validateInput(this);
      });
      that.$target.find('textarea').each(function() {
        that.validateTextArea(this);
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

