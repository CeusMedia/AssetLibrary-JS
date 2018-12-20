/**
 *	jQuery Plugin for collapsable Panels.
 *	@name		cmCollapsePanel
 *	@type		jQuery
 *	@cat		Plugins/UI
 *	@author		Christian W�rker <christian.wuerker@ceusmedia.de>
 *	@copyright	2008 Christian W�rker <christian.wuerker@ceusmedia.de> (http://ceus-media.de)
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
        selectorContent	: ".panelContent",
        selectorHead	: ".panelHead",
        selectorFoot	: ".panelFoot"
       }, settings);

      //  register click event
      containers.each( function(e) {
        var id = $(this).attr('id');
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
		  $(this).addClass("collapsed");
	    }
        if(settings.cookies && $.cookie("cmCP_"+id)==-1){
          content.hide();
		  $(this).addClass("collapsed");
	    }

      	head.click( function() {
          display = content.css('display');
          if( display == "block" ){
		    content.animate({
/*		        "opacity": "hide",*/
		        "height": "hide"
		      }, { "duration": settings.duration });
		    $("#"+id).addClass("collapsed");
		    $.cookie("cmCP_"+id,-1);
		  }
		  else{
		    content.animate({
/*		        "opacity": "show",*/
		        "height": "show"
		      }, { "duration": settings.duration });
		    $.cookie("cmCP_"+id,1);
		    $("#"+id).removeClass("collapsed");
		  }
        })
      });
      return this;
    }
  }
)(jQuery);

function initPanelExpandedById(id){
  div	= $("#"+id);
  if(!$.cookie("cmCP_"+id)){
    div.removeClass('collapsed');
    $(".panelContent",div).show();
  }
}

function initPanelCollapsedById(id){
  div	= $("#"+id);
  if(!$.cookie("cmCP_"+id)){
    div.addClass('collapsed');
    $(".panelContent",div).hide();
  }
}

function expandPanelById(id){
  div	= $("#"+id);
  div.removeClass('collapsed');
  $(".panelContent",div).show();
}

function collapsePanelById(id){
  div	= $("#"+id);
  div.addClass('collapsed');
  $(".panelContent",div).hide();
}
