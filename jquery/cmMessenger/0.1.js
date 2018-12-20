(function($){
	jQuery.cmMessenger = function(settings){
		settings = jQuery.extend({
			selectorContainer	: '#messenger',
			speedAnimateHide	: 'slow',
			speedAnimateShow	: 'fast',
			theme				: 'default',
			timeAutoRemove		: 3000,
			animateHide			: {
				height: 'toggle'
			},
			animateShow			: {
				height: 'toggle'
			}
		},settings);

		this.noteSuccess = function(message){
			renderMessage(message,'success');
		}

		this.noteNotice = function(message){
			renderMessage(message,'notice');
		}

		this.noteError = function(message){
			renderMessage(message,'error');
		}

		this.noteFailure = function(message){
			renderMessage(message,'failure');
		}

		removeMessage = function(messageId){
			$("#"+messageId).animate(
				settings.animateHide,
				settings.speedAnimateHide,
				function(){
					$(this).remove();
					if(!$(settings.selectorContainer+">ul>li").size())
						$(settings.selectorContainer+">ul").remove();
				}
			);
		}

		renderMessage = function(message,typeName){
			box	= $(settings.selectorContainer);
			box.addClass('cmMessenger');
			box.addClass(settings.theme);
			if(!$("ul",box).size())
				box.prepend($("<ul></ul>"));
			list		= $(settings.selectorContainer+">ul");
			messageId	= typeName+'-'+Math.round(Math.random()*1000000);
			item		= $("<li></li>");
			item.attr('id',messageId).hide();
			item.addClass(typeName).html('<div>'+message+'</div>');
			item.data('messageId',messageId);
			list.append(item);
			item.animate(
				settings.animateShow,
				settings.speedAnimateShow,
				function(){
					if(settings.timeAutoRemove)
						window.setTimeout(
							'this.removeMessage("'+$(this).data('messageId')+'")',
							settings.timeAutoRemove
						);
				}
			);
		}

		return this;
	}
})(jQuery);
