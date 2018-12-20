/**
 *	jQuery Accordion Plugin.
 *	@name		cmAccordion
 *	@type		jQuery
 *	@cat		Plugins/cmAccordion
 *	@author		Christian Würker <christian.wuerker@ceusmedia.de>
 *	@since		12.03.2008
 *	@version	0.2
 *	@copyright	2007 Christian Würker <christian.wuerker@ceusmedia.de> (http://ceus-media.de)
 *	@license	LGPL/CC
 *	@param		Object		settings (optional) Customize your Accordion
 *	@option		string		layerPrefix			Prefix of Layer ID
 *	@option		string		contentClass		CSS Class of Layer Content
 *	@option		string		linkClass			CSS Class of Layer Link
 *	@option		string		openClass			CSS Class of opened Links and Contents
 *	@option		string		shutClass			CSS Class of closed Links and Contents
 *	@option		string		cookieName			Name of Cookie
 */
(function($){
	jQuery.fn.cmAccordion = function(settings){
      var container = this;
      var settings = jQuery.extend({
          layerPrefix	: "accordion_layer_",
          contentClass	: "accordionContent",
          linkClass		: "accordionLink",
          openClass		: "open",
          shutClass		: "shut"
        },
        settings
      );
      init();
      return this;

      /**
       *	Binds Click Event to Links and restores opened Layer.
       *	@access		private
       *	@param		bool		Flag: log to console
       */
      function init(log){
        $("."+settings.contentClass,container).addClass(settings.shutClass);
        $("a."+settings.linkClass,container).addClass(settings.shutClass);
        $("a."+settings.linkClass,container).click(function(){
          this.blur();
          url	= $(this).attr('href');
          name	= getAnchorNameFromUrl(url);
          openLayer(container,name,log);
        });

		//  --  RECALL FROM URL OR OPEN FIRST LAYER  --  //
        var url	= document.location.href;
        name = getAnchorNameFromUrl(url);
        if(name){
		  id = getLayerIdFromAnchorName(name);
		  if($(id).size()){
            openLayer(container,name);
            return;
          }
        }
        first = $("."+settings.linkClass,container).eq(0);
        first.trigger("click");
        if(log)
          $.log('opened first Layer: '+getAnchorNameFromUrl(first.attr('href')));
      }

      /**
       *	Returns ID of Layer related to Anchor.
       *	@access		private
       *	@param		string		Name of Anchor
       *	@return		string
       */
      function getLayerIdFromAnchorName(name){
        id = "#"+settings.layerPrefix+name;
        if(!$(id).size())
          return "";
        return id;
	  }

      /**
       *	Binds Click Event to Links and restores opened Layer.
       *	@access		private
       *	@param		Object		Accordion Container
       *	@param		string		Anchor Name of Layer to open
       *	@return		bool		Layer was found and opened
       */
      function openLayer(container,name,log){
        id = getLayerIdFromAnchorName(name);														//  get Layer ID from Anchor Name
        if(id && $(id).filter("."+settings.shutClass).size()){										//  check Layer
          var openLayer = $("."+settings.contentClass+":visible",container);						//  get open Layer
          var shutLayer = $(id,container);															//  get shut Layer
          openLayer.slideUp();																		//  close open Layer
          shutLayer.slideDown();																	//  open called Layer

          var toShut = openLayer.add("."+settings.linkClass,container);								//  collect open Layer and Link
          var toOpen = shutLayer.add("a[@href='#"+name+"']");										//  collect shut Layer and Link

          toShut.addClass(settings.shutClass).removeClass(settings.openClass);						//  swap CSS Classes
          toOpen.addClass(settings.openClass).removeClass(settings.shutClass);						//  swap CSS Classes
          return true;
        }
        return false;
      }

      /**
       *	Returns Anchor Name from URL.
       *	@access		private
       *	@param		string		Absolute URL
       *	@return		string		Anchor Name
       */
      function getAnchorNameFromUrl(url){
        name = url.replace(/^.*#/,"");																//
        if(name == url)
          return "";
        return name;
      }
    }
  }
)(jQuery);

function openAccordionLayerByName(name){
  link	= $("a[@href='#"+name+"']");
  if(link.size())
    link.trigger('click');
  else
    alert('No Accordion Layer with Name "'+name+'" defined.');
}
