(function($) {
	$.fn.cmInputDelayAction = function( options ) {

	 	var options = $.extend({
			action: function(event){},
			timeout: 0,
			delayStart: function(event){},
			delayEnd: function(event){},
			classChanged: "changed"
		}, options );

		// Bind each separately so that each element has its own delay
		return this.each(function() {
			var value = $(this).val();
  			var elem = $(this);
		 	elem.data("lastValue", value);
		 	elem.data("options", options);
			elem.bind("keyup", function(event){
				var value = $(this).val();
				var elem = $(this);
				var options = elem.data("options");
				if(elem.data("lastValue") != value){
					elem.data("lastValue", value);
					if(elem.data("timer"))
						clearTimeout(elem.data("timer"));
					if(options.classChanged)
						elem.addClass(options.classChanged);
					elem.data("timer", window.setTimeout(function(event, elem){
				  		var options = elem.data("options");
						options.delayEnd.apply(elem.get(0), [event]);
						if(options.classChanged)
							elem.removeClass(options.classChanged);
						options.action.apply(elem.get(0), [event]);
					}, options.timeout, event, elem ));
					options.delayStart.apply(elem.get(0), [event]);
				}
			});
		});
	}
})(jQuery);
