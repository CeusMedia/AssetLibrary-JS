/**
 *	jQuery plugin for a tree with checkboxes for each item.
 *	@name		cmCheckTree
 *	@type		jQuery
 *	@cat		Plugins/UI
 *	@author		Christian W�rker <christian.wuerker@ceusmedia.de>
 *	@copyright	2009 Christian W�rker <christian.wuerker@ceusmedia.de> (http://ceus-media.de)
 *	@license	LGPL/CC
 *	@param		Object		settings (optional)		Customize your tree
 *	@option		string		disabledAnimateParams	Parameters for animation on nested lists after disabling a parent list
 *	@option		string		disabledAnimateSpeed	Speed of disabling animation
 *	@option		string		enabledAnimateParams	Parameters for animation on nested lists after enabling a parent list
 *	@option		string		enabledAnimateSpeed		Speed of enabling animation
 *	@option		string		useBlitz				Flag: use cmBlitz to hilight list updates
 */
(function($){
  jQuery.fn.cmCheckTree = function(settings){
    var container = this;
    settings = jQuery.extend({
      disabledAnimateParams	: {
        opacity: 0.25,
      },
      enabledAnimateParams	: {
        opacity: 1,
      },
      disabledAnimateSpeed	: 100,
      enabledAnimateSpeed	: 100,
      useBlitz				: true
    },settings);
    if(settings.useBlitz&&!jQuery.fn.cmBlitz){
      alert("jQuery plugin cmCheckTree requires plugin cmBlitz");
      return;
    }

    $("input:checkbox",container).each(function(){
      $(this).change(function(){
        var status = $(this).attr('checked')
        var nestedList = $("ul",$(this).parent().parent()).eq(0);
        var nestedItems = $("li",nestedList);
        var nestedBoxes = $("li input:checkbox",nestedList);
        if(status&&settings.enabledAnimateParams)
          nestedList.animate(settings.enabledAnimateParams,settings.enabledAnimateSpeed);
        else if(!status&&settings.disabledAnimateParams)
          nestedList.animate(settings.disabledAnimateParams,settings.disabledAnimateSpeed);
        if(settings.useBlitz && jQuery.fn.cmBlitz)
          nestedItems.cmBlitz();
        nestedBoxes.each(function(){
          $(this).attr('checked',status?true:false);
          $(this).attr('disabled',!status);
        });
      });
    });

    $("input:checkbox:not(:checked)",container).each(function(){
      if(!$(this).attr('disabled')){
        var nestedList = $("ul",$(this).parent().parent()).eq(0);
        if(settings.disabledAnimateParams)
          nestedList.animate(settings.disabledAnimateParams,1);
        $("ul li input:checkbox",$(this).parent().parent()).each(function(){
          $(this).attr('disabled',true);
        });
      }
    });
    return this;
  }
})(jQuery);
