/**
 *	jQuery Plugin for a Tree with Checkboxes for each Item.
 *	@name		cmCheckTree
 *	@type		jQuery
 *	@cat		Plugins/UI
 *	@author		Christian W�rker <christian.wuerker@ceusmedia.de>
 *	@copyright	2009 Christian W�rker <christian.wuerker@ceusmedia.de> (http://ceus-media.de)
 *	@license	LGPL/CC
 *	@param		Object		settings (optional)		Customize your Service Index
 *	@option		string		useBlitz			Flag: use cmBlitz to hilight List Updates
 */
(function($){
  jQuery.fn.cmCheckTree = function(settings){
    var container = this;
    settings = jQuery.extend({
    },settings);
    if(!jQuery.fn.cmBlitz)
      alert("jQuery plugin cmBlitz requires plugin color");
    

    $("input:checkbox",container).each(function(){
      $(this).change(function(){
        if(jQuery.fn.cmBlitz)
          $("li",$(this).parent().parent()).cmBlitz();
        var status = $(this).attr('checked')
//        console.log($(this).attr('id')+":"+$(this).attr('checked'));
        var children = $("ul li input:checkbox",$(this).parent().parent());
        children.each(function(){
          $(this).attr('checked',status?true:false);
          $(this).attr('disabled',!status);
        });
      });
    });

    $("input:checkbox:not(:checked)",container).each(function(){
      if(!$(this).attr('disabled')){
        $("ul li input:checkbox",$(this).parent().parent()).each(function(){
          $(this).attr('disabled',true);
        });
      }
    });
    return this;
  }
})(jQuery);
