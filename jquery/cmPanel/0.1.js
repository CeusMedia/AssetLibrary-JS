(function($){
    jQuery.fn.cmPanel = function(settings){}
    jQuery.fn.setPanelHead = function(html){
      this.each(function(){
        $(".panelHeadInner",this).html(html);
      });
    }
    jQuery.fn.setPanelAbstract = function(html){
      this.each(function(){
        $(".panelAbstractInner",this).html(html);
      });
    }
    jQuery.fn.setPanelContent = function(html){
      this.each(function(){
        $(".panelContentInner",this).html(html);
      });
    }
    jQuery.fn.setPanelFoot = function(html){
      this.each(function(){
        $(".panelFootInner",this).html(html);
      });
    }
  }
)(jQuery);
