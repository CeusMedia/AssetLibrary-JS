/**
 *	jQuery Plugin for hilighting Table Cells of Input Field and their Labels according
 *	to existing Error Messages.
 *
 *	ATTENTION: This Plugin is designed especially for CeuS Media Frameworks and its Messenger.
 *
 *	If the Messenger has created Error Messages (within Page HTML) this Plugin will extract
 *	the Input IDs by reading the linked Labels within the Error Messages.
 *	For all found IDs the Table Cells of Input Fields and their Labels will be hilighted by
 *	setting a CSS Class.
 *	Furthermore an Event for removing the CSS Class will be attachted to these Input Elements.
 *
 *	Example:
 *
 *	$(document).ready(function(){
 * 	  $("#messages div.error label").cmErrorHilight();
 *	});
 *
 *	@name		cmErrorHilight
 *	@type		jQuery
 *	@cat		Plugins/UserInterface
 *	@author		Christian Würker <christian.wuerker@ceusmedia.de>
 *	@copyright	2008 Christian Würker <christian.wuerker@ceusmedia.de> (http://ceus-media.de)
 *	@license	LGPL/CC
 *	@param		Object		settings (optional) Customize your Horizon Navigation
 *	@option		string		selectorLabel		Selector Prefix for Input Labels
 *	@option		string		selectorField		Selector Prefix for Input Fields
 *	@option		string		classError			CSS Class of Input Labels and Field with Errors
 */
 (function($){
  jQuery.fn.cmErrorHilight= function(settings){
    var containers = this;
    //  options and defaults
    var settings = jQuery.extend({
      selectorLabel		: "#content table td.label label",
      selectorField		: "#content table td.field",
      classError		: "error"
    }, settings);

    containers.each( function(e){
      var id = $(this).attr('for');
      $(this).click(function(){document.location.href="#"+id});
      $(settings.selectorLabel+"[@for='"+id+"']").parent().addClass(settings.classError);
      $(":input[id^='"+id+"']").each(function(){
        $(this).change(function(){
          $(this).parent().removeClass(settings.classError);
          $(settings.selectorLabel+"[@for='"+id+"']").parent().removeClass(settings.classError);
          $(settings.selectorField+"#fld_"+id).removeClass(settings.classError);
        });
      });
      $(settings.selectorField+"#fld_"+id).addClass(settings.classError);
    });
  }
})(jQuery);
