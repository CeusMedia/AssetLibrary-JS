/**
 *	jQuery Plugin for Tabs.
 *	@name		cmTabs
 *	@type		jQuery
 *	@cat		Plugins/cmTabs
 *	@author		Christian W�rker <christian.wuerker@ceusmedia.de>
 *	@copyright	2007 Christian W�rker <christian.wuerker@ceusmedia.de> (http://ceus-media.de)
 *	@license	LGPL
 *	@since		18.04.2007
 *	@version	0.1
 *	@param		Object		settings (optional) Customize your Tabs
 *	@option		string		tabClass			Selector of Tabs
 *	@option		string		tabClassCurrent		Class of current Tab
 *	@option		string		contentClass		Selector of Content
 *	@option		string		contentID			ID of Content
 *	@option		string		corner				Options for Corners
 *	@option		boolean		wrap				Wrap Tab Content in SPAN
 */
(function($)
  {
    jQuery.fn.TabsSetup = function(settings) {
      //  options and defaults
      settings = jQuery.extend({
        activeID		: null,
        tabClass		: "li.tab",
        tabClassCurrent	: "current",
        contentClass	: "div.content",
        contentID		: "div#content_",
        corner			: "",
        wrap			: false,
        ajaxURI			: "",
        ajaxLoaderClass	: "loading"
       }, settings);

      //  wrap tab content into span
      if(settings.wrap)
        $(settings.tabClass).each( function(i) { this.innerHTML = "<span>"+this.innerHTML+"</span>" });

      //  register click event
      $(settings.tabClass).each( function(i) {
        $(this).click( function() {
          $(settings.tabClass).removeClass(settings.tabClassCurrent);			//  remove CSS class for all tabs
          $(this).addClass(settings.tabClassCurrent);							//  set CSS class for selected tab
          $(settings.contentClass).hide();										//  hide all contents
          $(settings.contentID+$(this).attr("id")).show();						//  show selected content
          if(settings.ajaxURI)
          {
            $(settings.contentClass).load(settings.ajaxURI,{id:$(this).attr("id")});
          }
        })
      });
      if(settings.ajaxURI)
      {
        $(settings.tabClass+":first").trigger("click");
      }

      //  rounded corners by jquery.corner.js
  //    if( settings.corner )
  //      $(settings.tabClass).corner(settings.corner);

      //  hide all contents
      $(settings.contentClass).hide();

      //  select active tab
      if( settings.activeID != null )
      {
        $("#"+settings.activeID).addClass(settings.tabClassCurrent);			//  activate selected tab
        $(settings.contentClass+"[@id$='"+settings.activeID+"']").show();		//  show selected content
      }
      else
      {
        $(settings.tabClass+":eq(0)").addClass(settings.tabClassCurrent);		//  activate first tab
        $(settings.contentID+$(settings.tabClass+":eq(0)").get(0).id).show();	//  show first content
      }
    }
  }
)(jQuery);
