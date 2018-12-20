/**
 *	jQuery Plugin for collapsable Panels.
 *	@name		cmCollapsePanel
 *	@type		jQuery
 *	@cat		Plugins/UI
 *	@author		Christian Würker <christian.wuerker@ceusmedia.de>
 *	@copyright	2008 Christian Würker <christian.wuerker@ceusmedia.de> (http://ceus-media.de)
 *	@license	GPL3/CC3
 *	@param		Object		settings (optional) Customize your List Navigation
 *	@option		float		duration			Duration of Animation
 *	@option		bool		cookies				Flag: store State in Cookie
 *	@option		bool		closeAll			Flag: start with all Panels closed
 *	@option		string		selectorContent		CSS Class of Content DIV
 *	@option		string		selectorHead		CSS Class of Head DIV
 *	@option		string		selectorFoot		CSS Class of Foot DIV
 */
(function($){
    jQuery.fn.cmCollapsePanel = function(settings){
      var containers = this;
      //  options and defaults
      var settings = jQuery.extend({
        duration		: 300,
        cookies			: 1,
        closeAll		: false,
        closeAbstract	: true,
        selectorContent	: ".panelContent",
        selectorHead	: ".panelHead",
        selectorFoot	: ".panelFoot",
        selectorAbstract: ".panelAbstract"
       }, settings);

      //  register click event
      containers.each( function(e) {
        var id = $(this).attr('id');
        var abstract = $(settings.selectorAbstract,this);
        var content = $(settings.selectorContent,this);
        var head = $(settings.selectorHead,this);
        var foot = $(settings.selectorFoot,this);

        if(!$(settings.selectorContent+"Inner",content).size())
          content.wrapInner('<div class="'+settings.selectorContent.replace(/^\./,"")+'Inner">');
        if(!$(settings.selectorHead+"Inner",head).size())
          head.wrapInner('<div class="'+settings.selectorHead.replace(/^\./,"")+'Inner">');
        if(!$(settings.selectorFoot+"Inner",foot).size())
          foot.wrapInner('<div class="'+settings.selectorFoot.replace(/^\./,"")+'Inner">');

        content.show();
        if( settings.closeAll ){
          content.hide();
          abstract.hide();
          $(this).addClass("collapsed");
        }
        if(settings.cookies){
          if($.cookie("cmCP_"+id)==-1){
            content.hide();
            abstract.show();
            $(this).addClass("collapsed");
          }
          else if(settings.closeAbstract) 
            abstract.hide();
        }

        head.click( function() {
          display = content.css('display');
          if( display == "block" ){
            content.animate({
                "height": "hide"
              }, { "duration": settings.duration });
            if(settings.closeAbstract)
              abstract.animate({
                  "height": "show"
                }, { "duration": settings.duration });
            $("#"+id).addClass("collapsed");
            $.cookie("cmCP_"+id,-1);
          }
          else{
            content.animate({
                "height": "show"
              }, { "duration": settings.duration });
            if(settings.closeAbstract)
              abstract.animate({
                  "height": "hide"
                }, { "duration": settings.duration });
            $.cookie("cmCP_"+id,1);
            $("#"+id).removeClass("collapsed");
          }
        })
      });
      return this;
    }

    jQuery.fn.collapsePanel = function(){
      this.each( function(e) {
        if(!$(this).hasClass('collapsed'))
          $(".panelHead ",this).trigger('click');
      });
    }

    jQuery.fn.expandPanel = function(){
      this.each( function(e) {
        if($(this).hasClass('collapsed'))
          $(".panelHead ",this).trigger('click');
      });
    }

    jQuery.fn.togglePanel = function(){
      this.each( function(e) {
        $(".panelHead ",this).trigger('click');
      });
    }
  }
)(jQuery);

function collapsePanel(id){
  $("#"+id).collapsePanel();
}

function expandPanel(id){
  $("#"+id).expandPanel();
}

function togglePanel(id){
  $("#"+id).togglePanel();
}

/*
function initPanelCollapsedById(id){
  div = $("#"+id);
  if(!$.cookie("cmCP_"+id)){
	div.addClass('collapsed');
	$(".panelContent",div).hide();
  }
}

function initPanelExpandedById(id){
  div = $("#"+id);
  if(!$.cookie("cmCP_"+id)){
	div.removeClass('collapsed');
	$(".panelContent",div).show();
  }
}
*/
