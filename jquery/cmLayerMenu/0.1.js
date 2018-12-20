(function($){
  jQuery.cmLayerMenu = function(settings){
    var container = this;
    var settings = jQuery.extend({
      classMoving : 'moving',
      cookieName  : "stepLayer",
      debug       : false,
      durationIn  : 500,
      durationOut : 250,
      easingIn    : "easeInOutQuart",
      easingOut   : "easeInOutQuart",
      root        : "root"
    },settings);

    $(".stepLayer").hide().data('settings',settings);
    id = $.cookie(settings.cookieName);
    if(!id){
      id = settings.root;
      $.cookie(settings.cookieName,id);
    }
    $("#layer_"+id).show();
  }
})(jQuery)

function stepInTo(id){
  settings  = $(".stepLayer").data('settings');
  toHide	= $("#layer_"+$.cookie(settings.cookieName));
  toShow	= $("#layer_"+id);
  if(toHide.queue("fx").length||toShow.queue("fx").length)
    return false;
  devLog("step in to "+id,settings.debug);
  $(".stepLayer ul").css({overflow: 'hidden'});
  var hideWidth = toHide.parent().width();
  toShow.css({
      width    : 0,
      left     : hideWidth,
      overflow : 'hidden'
    }
  ).addClass(settings.classMoving).show();
  toShow.animate({
      width: hideWidth,
      left: 0
    },{
      step: function(now){
        toHide.width(now);
        toHide.css({
          opacity: now / hideWidth
        });
      },
      duration: settings.durationIn,
      easing: settings.easingIn,
      complete: function(){
        toShow.removeClass(settings.classMoving);
        $(".stepLayer ul").css({overflow: 'auto'});
        $.cookie('stepLayer',id);
        toHide.hide().css('opacity',1);
	  }
    }
  );
}

function stepOutTo(id){
  settings  = $(".stepLayer").data('settings');
  toHide	= $("#layer_"+$.cookie(settings.cookieName));
  toShow	= $("#layer_"+id);
  if(toHide.queue("fx").length||toShow.queue("fx").length)
    return false;
  devLog("step out to "+id,settings.debug);
  $(".stepLayer ul").css("overflow", "hidden");
  var hideWidth = toHide.parent().width();
  toHide.addClass(settings.classMoving);
  toShow.css({
      width: 0,
      left: 0,
      overflow: 'hidden'
    }
   ).show();
  toHide.animate({
      width : "hide",
      left  : hideWidth
    },{
      step: function(now) {
        toShow.width( now );
        toShow.css({opacity: now });
      },
      duration: settings.durationOut,
      easing: settings.easingOut,
      complete: function(){
        $(".stepLayer ul").css({overflow: 'auto'});
        $.cookie(settings.cookieName,id);
        toHide.removeClass(settings.classMoving);
	  }
    }
  );
}

