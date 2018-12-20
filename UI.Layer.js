UI.Layer = {
	current		: null,
	isOpen		: false,
	speedIn		: 0,
	speedOut	: 0,
	width		: 800,
	height		: 600,
	animationShow: {
		'opacity': 'show'
	},
	animationHide: {
		'opacity': 'hide'
	},
	speedShow: 0,
	speedHide: 0,


	init: function(){
		window.onerror = function(e){
			alert(e);
		}
		var back = $('<div></div>').attr('id','layer-back').click(Layer.hide);
		$("body").prepend(back);

		$("a.layer-image").click(function(event){
			UI.Layer.showImage($(this),event)
			return false;
		});
		$("a.layer-html").click(function(event){
			UI.Layer.showContent($(this),event);
			return false;
		});
		$(document).keydown(function(event){
			if(event.keyCode == 27){
				if(UI.Layer.current)
					UI.Layer.hide();
			}
		});
	},
	scaleImage: function(image){
		var imageMaxWidth = UI.Layer.width;
		var imageMaxHeight = UI.Layer.height;
		var ratioImage = image.width() / image.height();
		var ratioMax = imageMaxWidth / imageMaxHeight;
		if(ratioImage > ratioMax){
			if(image.width() > imageMaxWidth){
				image.height(image.height()*imageMaxWidth/image.width());
				image.width(imageMaxWidth);
			}
		}else if(image.height() > imageMaxHeight){
			image.width(image.width()*imageMaxHeight/image.height());
			image.height(imageMaxHeight);
		}
		$("div.layer").removeClass('loading');
		image.fadeIn(0);
	},
	showContent: function(elem){
		if(!UI.Layer.current)
			this.create();
		UI.Layer.current.html(null);
		if(elem.attr('title')){
			var title = $('<div></div>').addClass('layer-head-title').html(elem.attr('title'));
		}
		var close = $('<button></button>').addClass('layer-head-close').append('X').click(UI.Layer.hide);
		var head = $('<div></div>').addClass('layer-head').append(close).append(title);
		var content = $('<div></div>').addClass('layer-content');
		var iframe = '';
		if($.browser.msie)
			iframe = $('<iframe></iframe>').attr({
				'src': elem.attr('href'),
				'frameborder': 0
			});
		else
			iframe = $('<object></object>').attr({
				'data': elem.attr('href'),
				'type': 'text/html',
				'border': 0
			});
		UI.Layer.current.append(head).append(content.html(iframe));
		UI.Layer.show();
	},
	showImage: function(elem){
		var imageIndex	= 0
		var imageGroup	= []
		if(elem.attr('rel')){
			$("a[rel='"+elem.attr('rel')+"']").each(function(i){
				imageGroup.push($(this));
				if($(this).attr('href') == elem.attr('href'))
					imageIndex = parseInt(i);
			});
		}
		else
			imageGroup.push(elem);
		if(!UI.Layer.current)
			this.create();

		var image = new Image();
		image.onload = function(){
			UI.Layer.scaleImage($(this));
		};
		$(image).click(UI.Layer.hide);

		UI.Layer.current.html('').append($('<div></div>').addClass('layer-image').html(image));
		image.src = elem.attr('href')+ ( $.browser.msie ? "#"+new Date().getMilliseconds() : '' );

		var buttonPrev = $('<button>&laquo;</button>').click(function(){
			UI.Layer.showImage($(imageGroup[imageIndex-1]));
		});
		var buttonNext = $('<button>&raquo;</button>').click(function(){
			UI.Layer.showImage($(imageGroup[imageIndex+1]));
		});
		if(imageIndex == 0)
			buttonPrev.attr('disabled','disabled');
		if(imageIndex == imageGroup.length - 1)
			buttonNext.attr('disabled','disabled');

		var infoNavi = $('<div></div>').addClass('layer-info-navi buttons').append(buttonPrev).append(buttonNext);
		var infoTitle = $('<div></div>').addClass('layer-info-title').html(elem.attr('title'));
		var info = $('<div></div>').addClass('layer-info').append(infoNavi).append(infoTitle);
		UI.Layer.current.append(info);
		UI.Layer.show();
	},
	create: function(){
		UI.Layer.current = $('<div></div>').addClass('layer').addClass('loading');
		$("body").append(UI.Layer.current);
	},
	show: function(){
		var left = Math.round(($(window).width()-UI.Layer.current.width())/2);
		var top = Math.round(($(window).height()-UI.Layer.current.height())/2);
		UI.Layer.current.css('top',top).css('left',left);
		if(!UI.Layer.isOpen){
			UI.Layer.isOpen = true;
			$("#layer-back").fadeIn(this.speedShow);
			UI.Layer.current.animate(this.animationShow,this.speedShow);
		}
	},
	hide: function(){
		if(!UI.Layer.isOpen)
			return;
		UI.Layer.isOpen = false;
		$("#layer-back").fadeOut(UI.Layer.speedHide);
		UI.Layer.current.animate(UI.Layer.animationHide,UI.Layer.speedHide,function(){
			UI.Layer.current.remove();
			UI.Layer.current = null;
		});
	}
};
