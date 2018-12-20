(function($){
	var settings = {
		labelUp: '&plus;',
		labelDown: '&minus;',
		min : null,
		max : null,
		precision: 0,
		step : 1,
		value : null,
		change: function(event,data){}
	};
	var isValidKey = function(keyCode,data){
		if(keyCode == 8 || keyCode == 46)															//  typed character is backspace or delete
			return true;
		if(keyCode >= 48 && keyCode <= 57)															//  typed character is a number
			return true;
		if(keyCode >= 37 && keyCode <= 40)															//  typed character is an arrow key
			return true;
		if(keyCode == 189)																			//  typed character is a minus
			return true;
		return false;
	}

	var isValidValue = function(value,data){
		if(isNaN(value))
			return false;
		if(data.settings.max !== null && value > parseFloat(data.settings.max))
			return false;
		if(data.settings.min !== null && value < parseFloat(data.settings.min))
			return false;
		if(data.settings.step > 1 && value % data.settings.step)
			return false;
		return true;
	}

	var modify = function(event,input,data,increase,recall){
		if(recall && !data.state)																	//  timed call but no change state
			return;																					//  break since timed called is obsolete
		var value = parseFloat(input.val());															//  get current value from input element
		value = value + (increase ? 1 : -1) * data.settings.step;									//  change value depending on direction and step width
		if(isValidValue(value,data)){																//  new value is valid
			value	= getValidValue(value,data);
			input.val(value);																		//  set new value in input element
			data.value = value;																		//  store new value in element data
			var time = 400;
			if(data.count)
				time = data.count > 10 ? (data.count > 50 ? 10 : 50) : 100;
			if(recall){
				data.count++;
				setTimeout(function(){
					modify(event,input,data,increase,recall)
				},time);
			}
		}
	}
	
	var getValidValue = function(value,data){
		value = parseFloat(value);
		if(!isValidValue(value,data)){
			if(!isValidValue(data.settings.value,data))
				throw "Invalid default value ("+data.settings.value+") for #"+data.target.attr('id');
			value = parseFloat(data.settings.value);
		}
		return value.toFixed(data.settings.precision);
	}
	
	var methods = {
		destroy : function(){
			return this.each(function(){
				var $this = $(this);
				var container = $this.parent();
				container.children('button').unbind('.cmSpinControl').remove();
				container.replaceWith($this);
				$this.data('cmSpinControl',null);
			});
		},
		init : function(options){
			return this.each(function(){
				var $this = $(this);
				var data = $this.data('cmSpinControl');

				$this.bind('keydown.cmSpinControl',function(event){									//  bind key press to avoid invalid characters
					if(!isValidKey(event.keyCode)){													//  typed character is not valid
						event.stopPropagation();													//  stop propagation of key press
						return false;																//  stop key press
					}
					if(event.keyCode == 38 || event.keyCode == 40)
						modify(event,$this,data,event.keyCode == 38);
				});

				$this.bind('keyup.cmSpinControl',function(event){
					var value = $(this).val();
					if(isValidValue(value,data)){
						data.value = getValidValue(value,data);
						if(data.value !== data.value)
							data.target.val(data.value);
					}
					else{
						event.stopPropagation();													//  stop propagation of key press
						$(this).val(data.value).val();
						return false;
					}
					$this.trigger('change');
				});

				$this.bind('change',function(event){
					if($.isFunction(data.settings.change))
						data.settings.change(event,data);
				});

				if(!data){																			//  plugin has not been initialized yet
					$this.data('cmSpinControl', {													//  save data
						target : $this,																//  store target input element
						settings : $.extend({},settings,options),									//  settings
						state: 0,																	//  internal change state
						count: 0																	//  internal call counter
					});
					data = $this.data('cmSpinControl');												//  read final data
				}
				var container = $('<span></span>').addClass('spin-control');
				$this.wrap(container);
				var value = $this.val();
				if(data.settings.value !== null)
					value = data.settings.value;
				else if(!value.length)
					value = 0;
				data.value = getValidValue(value,data);
				$this.val(data.value);
				container = $this.parent();
				container.append('<button type="button" class="button-up">'+data.settings.labelUp+'</button>');
				container.append('<button type="button" class="button-down">'+data.settings.labelDown+'</button>');
				container.children('button').each(function(nr){
					$(this).bind('mousedown.cmSpinControl',function(event){
						if(event.which == 1 && !data.state){
							data.state = 1;
							modify(event,$this,data,nr == 0,true);
						}
					});
					$(this).bind('mouseenter.cmSpinControl',function(event){
						$(this).addClass('hover');
					});
					$(this).bind('mouseleave.cmSpinControl',function(event){
						$(this).removeClass('hover');
					});
					$(this).bind('mouseleave.cmSpinControl mouseup.cmSpinControl',function(event){	//  mouse leaves a button
						if(event.which == 1 && data.state){											//  left mouse and button is pressed
							clearInterval(data.interval);											//  clear recall interval
							data.state = 0;															//  reset internal change state
							data.count = 0;															//  reset internal call counter
							$this.trigger('change');
						}
					});
				})
			});
		},
		setOption: function(key,value){
			return this.each(function(){
				var $this = $(this);
				var data = $this.data('cmSpinControl');
				data.settings[key] = value;
				if(key == 'precision'){
					data.value = getValidValue(data.value,data);
					data.target.val(data.value);
				}
			});
		},
		setValue: function(value){
			return this.each(function(){
				var $this = $(this);
				var data = $this.data('cmSpinControl');
				if(isValidValue(value,data)){
					value = parseFloat(value).toFixed(data.settings.precision);
					data.target.val(value);
					data.value = value;
				}
				else
					throw "invalid valud: "+value;
			});
		}
	};

	$.fn.cmSpinControl = function(method){
		if(methods[method])
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		else if(typeof method === 'object' || !method)
			return methods.init.apply(this, arguments);
		else
			$.error('Method ' +  method + ' does not exist on jQuery.cmSpinControl');
	};
})(jQuery);
