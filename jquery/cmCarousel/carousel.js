Carousel = function(selector,options){
	this.length = 0;
	this.animations = 0;
	this.timeout = null;
	this.options = $.extend({
		slideDuration: 250,
		slideEasing: null,
		slideLock: true,
		autoRotate: true,
		autoDirection: 'right',
		autoInterval: 2000,
		narrowFactor: 2.5,
		opacityFactor: 0,
		topFactorOffset: 0,
		topFactorRotation: 0,
		
	},options);
	this.selector = selector;
	this.elem = $(selector);
	this.width = this.elem.width();
	this.height = this.elem.height();
	this.itemHeight = $(">div",this.elem).eq(0).height();
	this.itemWidth = $(">div",this.elem).eq(0).height();
	this.length = $(">div",this.elem).size();

	this.render = function(initial){
		var items = $(">div",this.elem);
		this.animations = items.size();
		var show = this;
		var o = show.options;
		items.each(function(i){
			var item = $(">div",show.elem).eq(i);
			var x = i / show.length * 2 * Math.PI;
			var sinX = Math.round(Math.sin(x)*100)/100;
			var valX = sinX * show.width / o.narrowFactor;
			var posZ = Math.round(Math.cos(x)*100);
			item.css('z-index',Math.round(posZ));
			var posX = valX + show.width / 2 - show.itemWidth / 2;
			var width  = Math.round(((posZ / 100 + 1) / 2 + 1)  * show.itemHeight / 2);
			var height = Math.round(((posZ / 100 + 1) / 2 + 1) * show.itemHeight / 2);
			var left = Math.round(posX);
			var opacity = Math.min(Math.max(0, (1 - (1 - posZ / 100) / 2 * o.opacityFactor ).toFixed(4) ) );
			var top = Math.round(show.itemHeight - height / 2) + posZ * o.topFactorRotation + o.topFactorOffset * show.height;
			var options = {
				queue: false,
				easing: o.slideEasing,
				duration: initial ? 0 : o.slideDuration,
				complete: function(){
					show.elem.children('div').show();
					show.animations--;
				}
			};
			var animations = {
				left: posX,
				top: top,
				width: width,
				height: height,
				opacity: opacity
			};
			item.animate(animations,options);
			setUpNextAutoRotation(show);
		});
	},

	this.rotateLeft = function(){
		if(this.options.slideLock && this.animations > 1 )
			return;
		this.elem.append($(">div",this.elem).eq(0));
		this.render();

	}

	this.rotateRight = function(){
		if(this.options.slideLock && this.animations > 1 )
			return;
		this.elem.prepend($(">div",this.elem).eq(this.length-1));
		this.render();
	}

	function setUpNextAutoRotation(instance){
		if(instance.options.autoInterval){
			if(instance.timeout)
				clearTimeout(instance.timeout);
			instance.timeout = setTimeout(function(instance){
				if(instance.options.autoRotate)
					instance.rotateLeft();
				else
					setUpNextAutoRotation(instance);
			},instance.options.autoInterval,instance);
		}
	}

	this.render(true);
}
