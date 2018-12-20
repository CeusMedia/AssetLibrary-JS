/**
 *	jQuery Plugin for dynamic List Navigations.
 *	@name		ListNavigation
 *	@type		jQuery
 *	@cat		Plugins/ListNavigation
 *	@author		Christian W�rker <christian.wuerker@ceusmedia.de>
 *	@copyright	2007 Christian W�rker <christian.wuerker@ceusmedia.de> (http://ceus-media.de)
 *	@license	LGPL/CC
 *	@param		Object		settings (optional) Customize your List Navigation
 *	@option		string		cookieName			Name of Cookie
 *	@option		string		currentLink			ID of current Link
 *	@option		string		openClass			CSS Class of open Sublists
 *	@option		string		shutClass			CSS Class of shut Sublists
 */
(function($){
  jQuery.fn.ListNavigation = function(settings){
    var container = this;
    settings = jQuery.extend({
      currentLink: '',
      cookieName: 'navigation',
      openClass: 'open',
      shutClass: 'closed'
    },settings);

    //  --  DYNAMIC  --  //
    var cake = new Cake(settings.cookieName);
    $("li.main>a",container).parent().prepend("<span></span>");
    $("li.main>ul",container).parent().find("span").addClass(settings.shutClass).bind("click", function(){
      id	= $(this).parent().attr("id");
      list	= $(this).parent().find("ul");
      $("li#"+id+">span",container).toggleClass(settings.shutClass).toggleClass(settings.openClass);
      cake.setPiece(id,list.css('display')=="block"?false:true);
      list.slideToggle('fast');
    });

    //  --  RESTORE COOKIE  --  //
    $("li.main>ul",container).hide();
    pieces = cake.getPieces();
    for(i=0;i<pieces.length;i++){
      $("#"+pieces[i]+" span",container).removeClass(settings.shutClass).addClass(settings.openClass).parent().find("ul").show();
    }

    //  --  CURRENT LINK  --  //
    if(settings.currentLink){
      list = $("li.main ul li#link_"+settings.currentLink,container).parent();
      list.parent().find("span").removeClass(settings.shutClass).addClass(settings.openClass);
      list.show();
      $("li#link_"+settings.currentLink).addClass("current");
    }
    return this;
  }
})(jQuery);