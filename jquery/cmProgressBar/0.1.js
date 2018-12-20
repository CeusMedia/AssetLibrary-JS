/**
 *	jQuery Plugin for progress bars.
 *	@name		cmInformant
 *	@type		jQuery
 *	@cat		Plugins/UI
 *	@author		Christian Würker <christian.wuerker@ceusmedia.de>
 *	@copyright	2011 Christian Würker <christian.wuerker@ceusmedia.de> (http://ceusmedia.de)
 *	@license	LGPL/CC
 */
(function( $ ){

  var current = 0;

  var settings = {
    total: 100
  };

  var methods = {
    init : function( options ) {
      jQuery.extend( settings,options );
    },
    get : function( ) {
      return current;
    },
    next : function( ) {
      current = this.cmProgressBar('get')+1;
      this.cmProgressBar('update',current);
    },
    update : function( number ) {
		if(number < 0)
			number = 0;
		else if(number > settings.total)
			number = settings.total;
		var x = number / settings.total * this.width();
		$("div",this).css('width',Math.round(x));
		current = number;
    }
  };

  $.fn.cmProgressBar = function( method ) {
    
    if ( methods[method] ) {																		// Method calling logic
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.cmProgressBar' );
    }    
  };
})( jQuery );
