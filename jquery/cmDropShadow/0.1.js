(function($){
  jQuery.fn.cmDropShadow = function(settings){
    var container = this;
    var settings = jQuery.extend({},settings);
    $(this).wrap("<div class='wrap1'><div><div></div></div></div>");
    return this;
  }
})(jQuery);
