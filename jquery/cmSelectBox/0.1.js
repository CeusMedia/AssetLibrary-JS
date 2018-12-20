/**
 *	jQuery Plugin for creating modern select box input components.
 *	@name		cmSelectBox
 *	@type		jQuery
 *	@cat		Plugins/UI
 *	@author		Christian Würker <christian.wuerker@ceusmedia.de>
 *	@copyright	2012 Christian Würker <christian.wuerker@ceusmedia.de> (http://ceusmedia.de)
 *	@license	LGPL/CC
 *	@option		string		autoEnable				Setup image on init
 *	@option		string		classContainer			CSS class(es) set to select container
 *	@option		string		easeIn					Easing of showing animation
 *	@option		string		easeOut					Easing of hiding animation
 *	@option		integer		speedIn					Speed of showing animation
 *	@option		integer		speedOut				Speed of hiding animation
 */
(function($){
	jQuery.fn.cmSelectBox = function(method){

		var methods = {																				//  methods callable using constructor
			init: function(options){
				var settings = jQuery.extend({														//  options and defaults
					classContainer: 'cmSelectBox',													//  
					openOnHover: false,
					easeIn: 'linear',																//  easing of showing Animation
					easeOut: 'linear',																//  easing of hiding Animation
					speedIn: 0,																		//  speed of showing Animation
					speedOut: 0																		//  speed of hiding Animation
				}, options);
				return this.each(function(){														//  iterate found images
					var select = $(this);															//  shortcut current image
					select.data('settings', settings);												//  store settings for image
					var container = $("<div></div>").hide().insertAfter(select);					//  
					var label = $("<div></div>").addClass("input").prependTo(container);			//  
					var list = $("<ol></ol>").hide().appendTo(container);							//  
					container.addClass(settings.classContainer);									//  
					container.addClass(settings.inverted ? "inverted" : '');
					label.append($("<ul></ul>").addClass("input-inner"));							//  
					select.find("option").each(function(){											//  
						var item = $("<li></li>").appendTo(list);									//  
						item.html($(this).html().length ? $(this).html() : '&nbsp;');				//  
						item.data("value",$(this).val());											//  
						item.data("selected",$(this).prop("selected"));								//  
						item.data("selected",$(this).prop("selected"));								//  
						item.data("disabled",$(this).prop("disabled"));								//  
						item.data("readonly",$(this).prop("readonly"));								//  
						item.addClass($(this).prop("class"));										//  copy class from option to list item
					});
					container.width(select.outerWidth());											//  copy width from select element
					select.hide();																	//  hide original select box
					container.show();																//  show replacement
					container.find("ol li").each(function(){										//	iterate all option items
						$(this).bind("click",function(){											//  
							selectItem(select,container,$(this).data("value"),true);
						});
						if($(this).data("selected"))												//  
							selectItem(select,container,$(this).data("value"))
					});
					if(settings.openOnHover){														//  show options on mouse over
						container.bind("mouseenter",function(){										//  mouse entered container
							if(!$(this).hasClass("open"))											//  option list is not visible 
								toggleOpen(select,container);										//  show option list
						}).bind("mouseleave",function(){											//	mouse leaved container
							if($(this).hasClass("open"))											//  option list is visible
								toggleOpen(select,container);										//  hide option list
						});
					}
					else{																			//  show options on click
						label.click(function(event){												//  
							if(!container.hasClass("open"))											//  option list is to be opened
								$("body").trigger("click");											//  close other open option lists
							toggleOpen(select,container);											//  open this option list
							event.stopPropagation();												//  stop click event to avoid body click event
						});
						$("body").click(function(){													//  click on page outside container
							if(container.hasClass("open"))											//  option list is visible
								toggleOpen(select,container);										//	hide option list
						})
					}

					select.closest("form").bind("reset",function(){									//  form reset button has been pressed
						label.find("ul.input-inner").html(container.find("ol li[0]"));				//  reset selectbox to first option item
						container.find("ol li").each(function(){									//	iterate all option items
							if($(this).data("selected"))											//  found option which was selected on load
								label.find("ul.input-inner").html($(this).clone());					//	
						});
					})
				});
			},
			select: function(value,triggerEvents){
				var select = $(this);
				var container = select.next();
				if(container.hasClass(select.data("settings").classContainer))
					selectItem(select,container,value,true);
			}
		}

		// Method calling logic
		if(methods[method])																			//  called method is defined
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));			//  call method with arguments
		else if(typeof(method) === 'object' || ! method)											//  options object or nothing given
			return methods.init.apply(this, arguments);												//  call init method with arguments
		$.error( 'Method ' +  method + ' does not exist on cmSelectBox' );							//  report invalid method call

		function selectItem(select,container,value,triggerEvents){
			container.find("ol li").each(function(){												//	iterate all option items
				if($(this).removeClass("selected").data("value") != value)
					return;
				$(this).addClass("selected");
				if(container.hasClass("open"))
					toggleOpen(select,container);													//  
				select.val(value);																	//  
				container.find("ul.input-inner").html($(this).clone());								//  
				if(typeof(triggerEvents) == "boolean" && triggerEvents)
					select.trigger("change");
			});
		}

		function toggleOpen(select,container){
			var s = select.data('settings');														//  
			var isOpen = container.hasClass("open");												//  
			var list = container.addClass("open").children("ol");									//  
			list.css("z-index", 1000 + isOpen ? 1 : 2);												//  
			if(!isOpen)																				//  
				return list.slideDown(s.speedIn, s.easeIn);											//  
			list.slideUp(s.speedOut, s.easeOut, function(){container.removeClass("open")});			//  
		}
	};
})( jQuery );