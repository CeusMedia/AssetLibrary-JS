var konsoul = {

	id: 'konsoul',
	height: 156,
	options: {
		limit: 10,
		open: false
	},
	state: 0,
	resizable: false,
	levels: {
		1: 'system',
		2: 'runtime',
		4: 'debug',

		16: 'info',
		32: 'warn',
		64: 'error',

		1024: 'with time'
	},
	logLevel: 1 | 2 | 4 | 16 | 32 | 64 | 1024,
	logStart: new Date().getTime(),
	logLast: new Date().getTime(),

	panel: {
		close: function(){
			konsoul.height = $('#konsoul-content').height();
			$('#konsoul-content').css('height',0);
			konsoul.state = 0;
			if(window.sessionStorage)
				sessionStorage.setItem('konsoul.open','');
		},

		open: function(){
			if(konsoul.state)
				return;
			$('#konsoul-content').css('height',konsoul.height);
			konsoul.state = 1;
			if(window.sessionStorage)
				sessionStorage.setItem('konsoul.open',1);
	//				konsoul.inspect();
		},

		toggle: function(){
			konsoul.state ? konsoul.panel.close() : konsoul.panel.open();
		},
		
		create: function(){
			div = '<!--  konsoul - a simple console  -->\
<div id="konsoul">\
	<div id="konsoul-head">\
		<div class="title">\
			<b>konsoul</b> - kriss console\
		</div>\
		<div id="konsoul-trigger-close"></div>\
	</div>\
	<div id="konsoul-content">\
		<ul id="konsoul-list"></ul>\
	</div>\
</div>';
			$("body").append(div);
			konsoul.container = $("#konsoul");
			konsoul.list = $("#konsoul-list");
			if(konsoul.options.open || (window.sessionStorage && sessionStorage.getItem('konsoul.open')))
				konsoul.panel.toggle();
			konsoul.headHight = $("#konsoul-head").outerHeight();
			$("#konsoul-trigger-close").click(function(event){
				event.stopPropagation();
				konsoul.panel.toggle();
			});
			$("#konsoul-head").bind('mousedown',function(event){
				if(!konsoul.resizable)
					return;
				if(!konsoul.state)
					return;
				konsoul.drag = {
					'start' : event.pageY,
					'height' : konsoul.container.height()
				}
				$("html").bind('mousemove.konsoul',function(event){
					if(!konsoul.drag)
						return;
					var height = konsoul.drag.height + konsoul.drag.start - event.pageY;
					if(height - konsoul.headHight < 50)
						return;
					$("#konsoul-content").height(height);
				});
				$("html").bind('mouseup.konsoul',function(event){
					$("html").unbind('.konsoul');
					if(window.sessionStorage)
						sessionStorage.setItem('konsoul.height',$("#konsoul-content").height());
				});
			});
		}		
	},

	log: function(level,message){
//		if(konsoul.state == 0)
//			konsoul.open();
		if(!(konsoul.logLevel & level))
			return;
		if(konsoul.logLevel & 1024){
			var now = new Date().getTime();
			if(typeof message !== 'object' && typeof message !== 'function'){
				var sinceStart = now-konsoul.logStart;
				var sinceLast = now-konsoul.logLast;
				message = sinceStart+'(+'+sinceLast+')> '+message;
			}
			konsoul.logLast = now;
		}
		var icon = $('<span class="level"></span>');
		for(i in konsoul.levels)
			if(level & i)
				icon.addClass('level'+i+' level-'+konsoul.levels[i]);
		var item = $('<li></li>').append(icon).append(message);
		konsoul.list.append(item);
		if($('li',this.list).size() > konsoul.options.limit)
			$('li:eq(0)',konsoul.list).remove();
	},

	init: function(options){
		var options = options || {};
		if(window.sessionStorage)
			if(sessionStorage.getItem('konsoul.height'))
				konsoul.height = sessionStorage.getItem('konsoul.height');
		konsoul.options = $.extend(konsoul.options,options);
		konsoul.panel.create();
		
	},

	inspect: function(){
		$("body *").not("#konsoul").not("#konsoul *").bind('mouseover.konsoul',function(event){
			event.preventDefault();
			event.stopPropagation();
			e = $(this);
			e.data('border', e.css('border'));
			e.data('background', e.css('background'));
			e.css('border', '1px solid red');
			e.css('background','yellow');
		}).bind('mouseout.konsoul',function(){
			e.css('border', e.data('border'));
			e.css('background',e.data('background'));
		}).bind('click',function(){
			konsoul.log(this);
		});
	}
}
