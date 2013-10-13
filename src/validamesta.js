;(function( $, window, document, undefined) {

  var valid = true;
  var defaults = {
  };

  function validamesta(target, options) {
    this.$target = $(target);
    that = this;
    this.options = $.extend({}, defaults, options);
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
      this.$target.find('input').each(function() {
        that.validateInput(this);
      });
    },
    validateInput: function(target) {
      $(target).attr('data-border', $(target).css('border'));
      if(target.value == "") {
        valid = false;
        $(target).css('border', '1px solid red');
      }
      else
      {
        $(target).css('border', $(target).attr('border', $(target).attr('data-border')));
      }
    }
  }

  $.fn.validamesta = function( options ) {
    return this.each(function() {
      new validamesta(this, options);
    });
  }

})( jQuery, window, document);

