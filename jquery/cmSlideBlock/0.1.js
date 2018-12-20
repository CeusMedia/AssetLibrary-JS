/**
 *	jQuery Plugin for sliding in a Content Block.
 *	@name		cmSlideBlock
 *	@type		jQuery
 *	@cat		Plugins/UI
 *	@author		Christian Würker <christian.wuerker@ceusmedia.de>
 *	@copyright	2008 Christian Würker <christian.wuerker@ceusmedia.de> (http://ceus-media.de)
 *	@license	LGPL/CC
 *	@version	0.1
 *	@param		Object		settings (optional) 	Custom Settings
 *	@option		int			indent					Width of Toggle, visible even if shut
 *	@option		string		size					Width of Block Container
 *	@option		string		speed					Animation Speed (default: fast)
 */
(function($){
  jQuery.fn.cmSlideBlock = function(settings){
    var container = this;
    settings = jQuery.extend({
      indent: 20,
      size: 275,
      speed: "fast",
      cookie: "cmSB",
    },settings);

    container.each( function(){
      $(this).addClass('slideBlock');
      if(settings.cookie && $.cookie(settings.cookie+"_"+$(this).attr('id'))){
        $(this).addClass("open").css('width', settings.indent+settings.size+"px");
      }
      else
        $(this).addClass('slideBlock').addClass("shut");

      $(">.toggler",this).click(function(){
        block = $(this).parent();
        if(block.hasClass('shut')){
          block.animate({
            width: settings.size+settings.indent+"px"
          },settings.speed);
          block.removeClass('shut').addClass('open');
          if(settings.cookie)
            $.cookie(settings.cookie+"_"+block.attr('id'),1);
        }
        else{
          block.animate({
            width: settings.indent+"px"
          },settings.speed);
          block.removeClass('open').addClass('shut');
          if(settings.cookie)
            $.cookie(settings.cookie+"_"+block.attr('id'),"");
        }
	  });
    });

  }
})(jQuery);


function slideInBlock(selector){
  var block = $(selector);
  if(block.hasClass("shut"))
    $(">.toggler",block).trigger("click");
}

function slideOutBlock(selector){
  var block = $(selector);
  if(block.hasClass("open"))
    $(selector+">.toggler").trigger("click");
}

function toggleSlideBlock(selector){
  $(selector+">.toggler").trigger("click");
}