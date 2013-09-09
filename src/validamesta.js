;(function( $, window, document, undefined) {
  
  var pluginName = "validamesta", 
      defaults    = {
      };
  
  function Plugin( element, options) {
    this.element = element;
    this.options = $.extend( {}, defaults, options );
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  Plugin.prototype = {
    init: function() {
    },
    validate: function(el, options) {
      $this = this;
      $.each(this.element.elements, function(key, val) {
        if(this.type == 'text') {
          $this._validate_text(this);
        }
      });
    },
    _validate_text: function(el) {
      if("" == el.value) {
         console.log($(el).css('border'));
         $(el).css('border', '1px solid red');
      }
    }
  };

  $.fn[pluginName] = function( options ) {
    return this.each(function () {
      if(!$.data(this, pluginName)) {
        $.data(this, pluginName, new Plugin(this, options));
      }
    });
  }

})( jQuery, window, document);

