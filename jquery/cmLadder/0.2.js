/**
 *	jQuery Ladder Plugin.
 *	@name		cmLadder
 *	@type		jQuery
 *	@cat		Plugins/cmLadder
 *	@author		Christian Würker <christian.wuerker@ceusmedia.de>
 *	@since		14.05.2008
 *	@version	0.1
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
    jQuery.fn.cmLadder= function(settings){
      var container = this;
      var settings = jQuery.extend({
          changeUrl		: false,
          openClass		: "open",
          shutClass		: "shut"
        },
        settings
      );
      $(this).each(function(){
        var id = $(this).attr('id');
        $("#"+id).addClass('ladder');
        $("#"+id+">ul").addClass( "ladder" );

        $("#"+id+">ul>li").each(function(i){
          $(this).wrapInner("<span></span>");
          $(this).attr('id', id+"_"+i+"_link");
          $(this).bind('click',function(){
            fragment = "#"+id+"_"+i;
            if( settings.changeUrl )
              document.location.href = fragment;
            $("#"+id+" div.ladderContent").removeClass('active');
            $("#"+id+">ul>li").removeClass('active');
            $(fragment).addClass('active');
            $(this).addClass('active');
          });
          fragment	= "#"+id+"_"+i;
          content	= $(fragment).html();
          content	= content.replace (/^\s+/, '').replace (/\s+$/, '');
          if( !content ){
            $(this).hide();
          }
          else if(!$("#"+id+">ul>li.active").size()){
            $(fragment).addClass('active');
            $(this).addClass('active');
          }
        });
        var height=$(">ul.ladder",this).outerHeight();
        $("#"+id+">div").each(function(i){
          $(this).addClass("ladderContent");
            $(this).attr('id', id+"_"+i);
            if($(this).height()<height)
              $(this).height(height);
        });
        if(location.hash){
          var item=$("#"+id+">ul>li"+location.hash+"_link");
          item.trigger('click');
        }
        $(this).show();
      });
      return this;
    }
  }
)(jQuery);
