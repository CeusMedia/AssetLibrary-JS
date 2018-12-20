/**
 *	jQuery plugin for combining the input and select form elements.
 *	Uses plugins bgiframe (on IE) an cmBlitz (optionally).
 *	@name		cmComboBox
 *	@type		jQuery
 *	@cat		Plugins/UI
 *	@author		Christian Würker <christian.wuerker@ceusmedia.de>
 *	@copyright	2008 Christian Würker <christian.wuerker@ceusmedia.de> (http://ceus-media.de)
 *	@license	LGPL/CC
 *	@param		Object		settings (optional) 	Customize your ComboBox
 *	@option		string		backgroundColorStart	Blitz Background Color
 *	@option		string		backgroundColorStop		Final Background Color
 *	@option		string		speed					Animation Speed
 */
(function($){

  /**
   *	Initialize a ComboBox with settings, binds events and overhauls HTML for better CSS support.
   *	@param		container		ComboBox container
   *	@param		settings		settings of this container
   */
  jQuery.fn.cmComboBox = function(settings){

    /*  --  SETTINGS  --  */
    var settings = jQuery.extend({
      blurOtherComboBoxes   : true,
      cssClass              : "",
      cssClassGroup         : "group",
      cssClassOption        : "option",
      cssClassOptionsOpen   : "open",
      cssClassPlugin        : "cmComboBox",
      debug                 : true,
      easingSlideUp         : "easeInOutQuart",
      easingSlideDown       : "easeInOutQuart",
      flashOnChange         : true,
      optionTypeClassPrefix : /^type-/,
      selectorTrigger		: ".trigger",
      selectorOptionBox     : ".options",
      timeSlideUp           : 150,
      timeSlideDown         : 300,
      useOptionTypeClasses  : true,
      zIndex                : 1
    },settings);

    var container = this;													//  keep reference
    var c = container;														//  container shortcut (for less code only)
    var s = settings;														//  settings shortcut (for less code only)
    $(c).css('z-index',s.zIndex);											//  set z-index to default
    if($.browser.msie && jQuery.fn.bgiframe())								//  if browser is IE and plugin bgiframe is loaded
      $(s.selectorOptionBox).bgiframe();									//  apply bgiframe (fix for IE)

    /*  --  BIND EVENTS  --  */
    $(s.selectorTrigger,c).click(function(){								//  bind click on trigger
      if($(this).hasClass('open')){											//  option box is open
        devLog("[cmComboBox] event: click-close",s.debug);
        jQuery.fn.cmComboBox.close(c,s);									//  call closing method
	  }else{																//  option box is shut
        devLog("[cmComboBox] event: click-open",s.debug);
        jQuery.fn.cmComboBox.open(c,s);										//  call opening method
	  }
    })
    $(s.selectorOptionBox+" ul li",c).bind(									//  bind event on all options
	  "mousedown",															//  use mousedown event to forestall blur event
	  function(){															//  callback for event
        devLog("[cmComboBox] event: option-select",s.debug);
        devLog("[cmComboBox] "+$("span",this).html(),s.debug);


        $(":input:text",c).val($("span",this).html());						//  copy option content to input field
        s.justChanged = true;												//  set flag for flash: changed by option click
        jQuery.fn.cmComboBox.hilight(c,s);									//  hilight current option (with flash)
        jQuery.fn.cmComboBox.close(c,s);									//  call closing method
      }
    );
    $(":input:text",c).focus(function(){									//  bind focus event on input field
      devLog("[cmComboBox] event: focus",s.debug);
      jQuery.fn.cmComboBox.open(c,s);										//  call opening method
    }).blur(function(){														//  bind blur event on input field
      devLog("[cmComboBox] event: blur",s.debug);
      jQuery.fn.cmComboBox.close(c,s);										//  call closing method
    }).keyup(function(){													//  bind keyup event on input field
      devLog("[cmComboBox] event: keyup",s.debug);
      jQuery.fn.cmComboBox.hilight(c,s);									//  hilight current option (without flash)
    });

    /*  --  OVERHAUL OPTIONS HTML  --  */
    if(s.cssClassGroup && $(s.selectorOptionBox+" ol",c).size()){			//  option group class is enabled and groups are set
      $(s.selectorOptionBox+" ol>li",c).addClass(s.cssClassGroup);			//  add class to all group labels (for CSS)
    }
    if(s.cssClassGroup && $(s.selectorOptionBox+" ul",c).size()){			//  option class is enabled and options are set
      $(s.selectorOptionBox+" ul>li",c).each(function(){					//  iterate all options
        $(this).addClass(s.cssClassOption);									//  add class to option (for CSS)
        if(!$("span",$(this)).size())										//  option label is not wrapped in span
          $(this).wrapInner("<span></span>");								//  wrap option label in span (for CSS)
      });
    }
    jQuery.fn.cmComboBox.hilight(c,s);										//  hilight current option (without flash)
    return this;															//  return jQuery container
  }

  /**
   *	Open options and focus on current ComboBox (not in IE).
   *	@param		container		ComboBox container
   *	@param		settings		settings of this container
   */
  jQuery.fn.cmComboBox.open = function(container,settings){
    var c = container;														//  container shortcut (for less code only)
    var s = settings;														//  settings shortcut (for less code only)
    if(!$.browser.msie && s.blurOtherComboBoxes){							//  for each browser except IE and blur is enabled
	  $(".cmComboBox").css('opacity',0.8);									//  blur other ComboBoxes
	  $(c).css('opacity',1);												//  focus current ComboBox
    }
	s.zIndex++;																//  increate z-index
	$(c).css('z-index',s.zIndex);											//  apply z-index on ComboBox
    jQuery.fn.cmComboBox.hilight(c,s);										//  hilight current option (without flash)
    $(s.selectorTrigger,c).addClass(s.cssClassOptionsOpen);					//  change trigger class
    $(s.selectorOptionBox,c).animate({										//  animate option box
        height: "show"														//  show options
      },
      s.timeSlideDown,														//  set animation time
      s.easingSlideDown														//  set animation easing
    );
  }

  /**
   *	Close options, flash if value has been changed (by clicking an option) and restore opacity of all ComboBoxes (not in IE).
   *	@param		container		ComboBox container
   *	@param		settings		settings of this container
   */
  jQuery.fn.cmComboBox.close = function(container,settings){
    var c = container;														//  container shortcut (for less code only)
    var s = settings;														//  settings shortcut (for less code only)
    if(!$.browser.msie && s.blurOtherComboBoxes)							//  for each browser except IE and blur is enabled
      $(".cmComboBox").css('opacity',1);									//  restore opacity of all ComboBoxes
    $(s.selectorOptionBox,c).animate({										//  animate option box
        height: "hide"														//  hide options
      },
      s.timeSlideUp,														//  set animation time
      s.easingSlideDown,													//  set animation easing
      function(){															//  set callback on complete animation
        $(s.selectorTrigger,c).removeClass(s.cssClassOptionsOpen);			//  change trigger class
        if(s.justChanged){													//  value has been changed by option click
          if(s.flashOnChange && jQuery.fn.cmBlitz)							//  flashing is enabled
            $(":input:text",c).cmBlitz();									//  flash input field using cmBlitz
          s.justChanged = false;											//  unset change status
        }
      }
    );
  }

  /**
   *	Hilights currently selected option and applys option type class on input field (if enabled).
   *	@param		container		ComboBox container
   *	@param		settings		settings of this container
   */
  jQuery.fn.cmComboBox.hilight = function(container,settings){
    var c = container;														//  container shortcut (for less code only)
    var s = settings;														//  settings shortcut (for less code only)
    if(s.optionTypeClassPrefix){											//  optional: option type classes are enabled
      classes = $(":input",c).attr('class').split(/ /);						//  get classes from input field
      jQuery.each(classes,function(){										//  iterate classes
        if(this.match(s.optionTypeClassPrefix))								//  type class found
          $(":input",c).removeClass(this);									//  remove old type class
      });
    }
    var value = $(":input",c).val();										//  get current value from input field
    $("ul>li",c).each(function(){											//  iterate all options
      $(this).removeClass('current');										//  remove previously set marker class
      if($("span",this).html()==value){										//  option value = input field value
        if(s.optionTypeClassPrefix){										//  optional: option type classes are enabled
          classes = $(this).attr('class').split(/ /);						//  get classes from option
          $.each(classes,function(){										//  iterate the classes
            if(this.match(s.optionTypeClassPrefix)){						//  type class found
              $(":input",c).addClass(this);									//  set type class on input field
            }
          });
        }
        $(this).addClass('current');										//  set marker class on option
      }
    });
  }
})(jQuery);

