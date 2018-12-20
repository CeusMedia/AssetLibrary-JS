/**
 *	jQuery Plugin for informing about something just like eMail Programs do by sliding in a Message Box.
 *	@name		cmInformant
 *	@type		jQuery
 *	@cat		Plugins/UI
 *	@author		Christian Würker <christian.wuerker@ceusmedia.de>
 *	@copyright	2008 Christian Würker <christian.wuerker@ceusmedia.de> (http://ceus-media.de)
 *	@license	LGPL/CC
 *	@param		string		message					Message to show
 *	@param		Object		settings (optional)		Optional Settings
 *	@option		string		heading					Heading Text
 *	@option		string		class					CSS Class(es) of Message Box
 *	@option		boolean		sticky					Message Box will stay until clicked
 *	@option		integer		duration				Time to show Message Box if not sticky
 *	@option		integer		speedIn					Speed of showing Animation
 *	@option		integer		speedOut				Speed of hiding Animation
 *	@option		string		easeIn					Easing of showing Animation
 *	@option		string		easeOut					Easing of hiding Animation
 *	@option		string		animateIn				CSS Attribute Object for showing Animation
 *	@option		string		animateOut				CSS Attribute Object for hiding	Animation
 *	@option		integer		padding					Space between Message Boxes and to bottom Border
 */
(function($){
  jQuery.cmInformant = function(message,settings){
    jQuery.fn.cmInformant(message,settings);
  }
  jQuery.fn.cmInformant = function(message, settings){
    settings = jQuery.extend({
      heading		: null,
      class			: null,
      content		: message,
      sticky		: false,
      duration		: 2000,
      speedIn		: 500,
      speedOut		: 1000,
      easeIn		: "linear",
      easeOut		: "linear",
      animateIn 	: {},
      animateOut	: {},
      padding		: 10,
    },settings);

    this.initMessageBox = function(){
      if(!$("#messageBox").size()){
        messageBox = $("<div></div>").attr('id','messageBox');
        $("body").append(messageBox);
      }
    }

    this.createMessage = function(settings){
      message	= $("<div></div>");
      message.addClass("messageBox");
      if(settings.class)
        message.addClass(settings.class);
      if(settings.heading){
        heading = $("<div></div>");
        heading.addClass("messageBoxHeading");
        heading.html(settings.heading);
        message.append(heading);
      }
      if(settings.content){
        content = $("<div></div>");
        content.addClass("messageBoxContent");
        content.html(settings.content);
        message.append(content);
      }
      $("#messageBox").append(message);

      this.showMessage(message,settings);
    }

    this.showMessage = function(message,settings){
      height = message.height();
      message.css('bottom',-height-10).show();
      animateIn = {
        bottom	: settings.padding
      }
      messages	= $("#messageBox>.messageBox");
      messages	= messages.slice(0,messages.size()-1);
      messages.each(function(){
        bottomSelf = parseInt($(this).css('bottom'));
        if(bottomSelf >= settings.padding){
          bottomSelf += height+settings.padding;
          $(this).animate({
            bottom: bottomSelf
          },{
            queue		: true,
            duration	: settings.speedIn
          });
        }
      });
      jQuery.extend(animateIn,settings.animateIn);
      message.animate(animateIn,{
        queue		: true,
        duration	: settings.speedIn,
        easing		: settings.easeIn,
        complete	: function(){
          message.click(function(){
            animateOut = {
              bottom: -height-settings.padding
            }
            jQuery.extend(animateOut,settings.animateOut);
            bottom = message.css('bottom');
            message.animate(animateOut,{
              queue		: true,
              duration	: settings.speedOut,
              easing	: settings.easeOut,
              complete	: function(){
                message.remove();
              }
            });
          });
          if(!settings.sticky){
            $.timer(settings.duration, function (timer){
              message.trigger('click');
              timer.stop();
            });
          }
        }
      });
    }
    this.initMessageBox();
    this.createMessage(settings);
  }
})(jQuery);
