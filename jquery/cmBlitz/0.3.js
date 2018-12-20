/**
 *	jQuery Plugin for flashing UI Elements after dynamic Update.
 *	Needs plugins color to work properly.
 *	@name		cmBlitz
 *	@type		jQuery
 *	@cat		Plugins/UI
 *	@author		Christian Würker <christian.wuerker@ceusmedia.de>
 *	@copyright	2008 Christian Würker <christian.wuerker@ceusmedia.de> (http://ceus-media.de)
 *	@license	LGPL/CC
 *	@version	0.3
 *	@param		Object		settings (optional) Customize your Blitz
 *	@option		string		backgroundColorStart	Blitz Background Color
 *	@option		string		backgroundColorStop		Final Background Color
 *	@option		string		speed					Animation Speed
 */
(function($){
  jQuery.fn.cmBlitz = function(settings){
    var container = this;
    var settings = jQuery.extend({
      backgroundColorStart : "#FFFF7F",
      backgroundColorStop  : "#FFFFFF",
      speed                : 250,
	  easing               : null,
	  complete             : function(){}

    },settings);

    container.each(function(){
      colorStop = $(this).css('background-color');
      colorStop = colorStop ? colorStop : settings.backgroundColorStop;
      if(colorStop == "transparent")
        colorStop = settings.backgroundColorStop;
      $(this).css("background-color",settings.backgroundColorStart);
      $(this).animate({
          backgroundColor: colorStop
        },
        settings.speed,
		settings.easing,
		settings.complete
      );
    });
    return this;
  }
})(jQuery);
