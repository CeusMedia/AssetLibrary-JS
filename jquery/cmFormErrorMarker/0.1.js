/**
 *	jQuery plugin for marking form field according to error messages with labels in it.
 *	Uses plugin easing (optionally).
 *	@name		cmFormErrorMarker
 *	@type		jQuery
 *	@cat		Plugins/UI
 *	@author		Christian Würker <christian.wuerker@ceusmedia.de>
 *	@copyright	2010 Christian Würker <christian.wuerker@ceusmedia.de> (http://ceusmedia.de)
 *	@license	LGPL/CC
 *	@param		Object		settings (optional) 	Customize cmFormErrorMarker
 *	@option		string		selectorMessageList		Selector of message list container
 *	@option		string		selectorMessageLabel	Selector of label in message item
 *	@option		string		selectorForm			Selector of form or element above form fields
 *	@option		string		classError				Class to be added to form field on error
 *	@option		string		removeMessageOnChange	Flag: remove message item on change of form field
 *	@option		string		animationSpeed			Slide up speed
 *	@option		string		animationEasing			Slide up easing, requires easing.js if used
 */
(function($){
	jQuery.fn.cmFormErrorMarker = function(settings){
		var container = this;
		settings = jQuery.extend({
			selectorMessageList: '#messages .messageList',											// selector of message list container
			selectorMessageLabel: 'div.error label',												// selector of label in message item
			selectorForm: "body",																	// selector of form or element above form fields
			classError: 'error',																	// class to be added to form field on error
			removeMessageOnChange: true,															// flag: remove message item on change of form field
			animationSpeed: 600,																	// slide up speed
			animationEasing: false																	// slide up easing, requires easing.js if used
		},settings);

		var messageList = $(settings.selectorMessageList);											// find message list container
		$(settings.selectorMessageLabel,messageList).each(function(){								// find and iterate labels in messages
			form = $(settings.selectorForm);														// find related form
			field = $(":input[name="+$(this).attr('for')+"]",form);									// find related form field
			if(!field.size())																		// found none
				return false;																		// skip to next iteration
			field.addClass(settings.classError);													// add error indicating class
			field.change(function(){																// form field has been changed
				$(this).removeClass(settings.classError);											// remove error indicating class
				if(settings.removeMessageOnChange){													// remove message on change in form field
					labels = $(settings.selectorMessageLabel);										// find all message labels
					label = labels.filter('[for='+$(this).attr('name')+']');						// find the one related to the form field
					label.parent().parent().slideUp(												// step up to message item container and slide up
						settings.animationSpeed,													// ... with given speed
						settings.animationEasing,													// ... and given easing
						function(){																	// callback on animation end
							if(!$(">*:visible",messageList).size())									// no more visible list items
								$(messageList).slideUp();											// remove empty message list container
						}
					);
				}
			});
			return true;
		});
		return this;
	}
})(jQuery);
