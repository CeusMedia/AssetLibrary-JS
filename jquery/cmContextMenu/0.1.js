/**
 *	...
 *	Uses plugins bgiframe (on IE).
 *	@name		cmContextMenu
 *	@type		jQuery
 *	@cat		Plugins/UI
 *	@author		Christian Würker <christian.wuerker@ceusmedia.de>
 *	@copyright	2009 Christian Würker <christian.wuerker@ceusmedia.de> (http://ceusmedia.de)
 *	@license	LGPL/CC
 *	@param		Object		settings (optional) 	Customize your ComboBox
 *	@option		string		backgroundColorStart	Blitz Background Color
 *	@option		string		backgroundColorStop		Final Background Color
 *	@option		string		speed					Animation Speed
 */
(function($){

  /**
   *	Initialize a ComboBox with settings, binds events and overhauls HTML for better CSS support.
   *	@param		container		ComboBox container
   *	@param		settings		settings of this container
   */
  jQuery.fn.cmContextMenu = function(settings){

    /*  --  SETTINGS  --  */
    var settings = jQuery.extend({
      blurOtherComboBoxes   : true,
      cssClass              : "",
      cssClassTriggerOpen   : "open",
      cssClassPlugin        : "cmContextMenu",
      debug                 : false,
      easingSlideUp         : "easeInQuart",
      easingSlideDown       : "easeOutQuart",
      selectorTrigger       : ".opener",
      selectorOptionBox     : ".contextMenu",
      timeSlideUp           : 200,
      timeSlideDown         : 400
    },settings);

    var container = this;													//  keep reference
    var c = container;														//  container shortcut (for less code only)
    var s = settings;														//  settings shortcut (for less code only)
    $(c).css('z-index',s.zIndex);											//  set z-index to default
    if($.browser.msie && jQuery.fn.bgiframe)								//  if browser is IE and plugin bgiframe is loaded
      $(s.selectorOptionBox).bgiframe();									//  apply bgiframe (fix for IE)
    container.each(function(){
      var t = $(this);
      t.hover(function(){
          $(s.selectorTrigger,t).show();
        },function(){
          jQuery.fn.cmContextMenu.close(t,s,true);
      });
      $(s.selectorTrigger,t).click(function(){
        if($(s.selectorTrigger+".open",t).size())
          jQuery.fn.cmContextMenu.close(t,s,false);
        else
          jQuery.fn.cmContextMenu.open(t,s);
      });
	});
	return this;
  }

  /**
   *	Open the options box.
   *	@param		container		ContextOptions container
   *	@param		settings		settings of this container
   */
  jQuery.fn.cmContextMenu.open = function(container,settings){
    var c = container;														//  container shortcut (for less code only)
    var s = settings;														//  settings shortcut (for less code only)
    $(s.selectorTrigger,c).addClass(s.cssClassTriggerOpen);
    $(s.selectorOptionBox,c.parent()).animate({								//  animate option box
        height: "show"														//  show options
      },
      s.timeSlideDown,														//  set animation time
      s.easingSlideDown														//  set animation easing
    );
  }

  /**
   *	Closes the options box.
   *	@param		container		ContextOptions container
   *	@param		settings		settings of this container
   *	@param		hideTrigger		...
   */
  jQuery.fn.cmContextMenu.close = function(container,settings,hideTrigger){
    var c = container;														//  container shortcut (for less code only)
    var s = settings;														//  settings shortcut (for less code only)
    $(s.selectorOptionBox,c.parent()).animate({
        height: "hide"
      },
      s.timeSlideUp,
      s.easingSlideUp,
      function(){
        $(s.selectorTrigger,c).removeClass(s.cssClassTriggerOpen);
        if(hideTrigger)
          $(s.selectorTrigger,c).hide();
    });
  }
})(jQuery);