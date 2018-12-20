/**
 *	jQuery Plugin for sliding in a Content Block.
 *	@name		cmSlideBlock
 *	@type		jQuery
 *	@cat		Plugins/UI
 *	@author		Christian Würker <christian.wuerker@ceusmedia.de>
 *	@copyright	2008 Christian Würker <christian.wuerker@ceusmedia.de> (http://ceus-media.de)
 *	@license	LGPL/CC
 *	@version	0.2
 *	@param		Object		settings (optional) 	Custom Settings
 *	@option		int			indent					Width of Toggle, visible even if shut
 *	@option		string		size					Width of Block Container
 *	@option		string		speed					Animation Speed (default: fast)
 */
(function(jQuery){
  jQuery.fn.cmSlideBlock = function(settings){
    var container = jQuery(this);

    settings = jQuery.extend({
      indent: 20,
      size: 275,
      speed: "fast",
      cookie: "cmSB"
    },settings);

    container.each( function(){
      jQuery(this).addClass('slideBlock');

      if(settings.cookie && jQuery.cookie(settings.cookie+"_"+jQuery(this).attr('id'))){
        jQuery(this).addClass("open").css('width', settings.indent+settings.size+"px");
      }
      else
        jQuery(this).addClass('slideBlock').addClass("shut");
      
      jQuery(">.toggler",this).click(function(){
        block = jQuery(this).parent();
        if(block.hasClass('shut')){
          block.animate({
            width: settings.size+settings.indent+"px"
          },settings.speed);
          block.removeClass('shut').addClass('open');
          if(settings.cookie)
            jQuery.cookie(settings.cookie+"_"+block.attr('id'),1);
        }
        else{
          block.animate({
            width: settings.indent+"px"
          },settings.speed);
          block.removeClass('open').addClass('shut');
          if(settings.cookie)
            jQuery.cookie(settings.cookie+"_"+block.attr('id'),"");
        }
	  });
    });
    return this;
  }
})(jQuery);


function slideInBlock(selector){
  var block = jQuery(selector);
  if(block.hasClass("shut"))
    jQuery(">.toggler",block).trigger("click");
}

function slideOutBlock(selector){
  var block = jQuery(selector);
  if(block.hasClass("open"))
    jQuery(selector+">.toggler").trigger("click");
}

function toggleSlideBlock(selector){
  jQuery(selector+">.toggler").trigger("click");
}