/**
 *	Class for draggable items.
 *	@param		id			DOM ID of item
 *	@param		options		Array Map of options to set
 *	@author		Christian Würker <christian.wuerker@ceusmedia.de>
 *	@version	$Id$
 */
draggable = function(id,options){

	/*  OPTIONS  */
	defaults = {																//  
		axis: null,																//  
		bubble: false,															//  
		enabled: true,															//  
		which: [1],																//  
		onStart: function(event,item){},										//  
		onMove: function(event,item){},											//  
		onEnd: function(event,item){},											//  
		revert: false,															//  
		revertDuration: 500,													//  
		revertEasing: null,														//  
		trapped: false,															//  
		droppable: null															//  
	};

	/*  CORE MEMBERS  */
	this.id = id;																//  
	this.options = $.extend(defaults,options);									//  
	this.options.revert = this.options.droppable || false;						//  
	this.helper = $("#"+id).css('position','absolute');							//  
	if(!this.helper.size)														//  
		throw "Element with ID "+id+" is missing";								//  

	/*  START SETUP  */
	this.isDragging = false;													//  
	this.offset = {																//  
		left: 0,																//  
		top: 0																	//  
	};
	this.position = {															//  
		left: 0,																//  
		top: 0,																	//  
		type: this.helper.css('position')										//  
	};
	this.moved = {																//  
		left: 0,																//  
		top: 0																	//  
	};
	this.size = {																//  
		width: this.helper.outerWidth(),										//  
		height: this.helper.outerHeight()										//  
	};

	/*  GET & SET OPTIONS  */
	this.get = function(option){												//  
		if(!this.options[option])												//  
			return null;														//  
		return this.options[option];											//  
	};

	this.set = function(option,value){											//  
		this.options[option] = value;											//  
		if(option == 'enabled'){												//  
			if(value)															//  
				this.helper.addClass('draggable-enabled');						//  
			else																//  
				this.helper.removeClass('draggable-enabled');					//  
		}
	};

	/*  CREATE & DESTROY  */
	this.create = function(){
		$("#"+this.id+" img").bind('selectstart', function(){return false;});	//  
		this.helper.bind('touchstart.'+id,{instance: this},function(event){		//  
			$("#droppable").html(event.type);
			var item = event.data.instance;										//  
			if(!item.options.bubble)											//  
				event.stopPropagation();										//  
			if(!item.options.enabled)											//  
				return;															//  
			if($.inArray(event.which,item.options.which) < 0)					//  
				return;															//  
			if(item.isDragging)													//  
				return;															//  
			item.isDragging = true;												//  
			item.moved.left = 0;												//  
			item.moved.top = 0;													//  
			item.offset.left = event.pageX;										//  
			item.offset.top = event.pageY;										//  
			item.startX	= parseInt(item.helper.css('left'));					//  
			item.startY	= parseInt(item.helper.css('top'));						//  
			item.position.left = item.startX + item.moved.left;					//  
			item.position.top = item.startY + item.moved.top;					//  
			item.helper.addClass('dragging');									//  
			item.trap = null;													//  
			if(item.options.trapped){											//  
				if(item.options.trapped == 'parent')							//  
					item.trap = item.helper.parent();							//  
				else{															//  
					var trap = $(item.options.trapped);							//  
					if(trap.size() == 1)										//  
						item.trap = trap.eq(0);									//  
				}
			}
			item.options.onStart(event,item);									//  
		});

		$(document).bind('touchmove.'+id,{instance: this},function(event){		//
			$("#droppable").html(event.type);
			var item = event.data.instance;										//  
			if(!item.options.bubble)											//  
				event.stopPropagation();										//  
			if(!item.options.enabled)											//  
				return;															//  
			if($.inArray(event.which,item.options.which) < 0)					//  
				return;															//  
			if(item.isDragging){												//  
				var axis = item.options.axis;									//  
				if(!axis || axis == 'x'){										//  
					item.moved.left = event.pageX - item.offset.left;			//  
					var left = item.startX + item.moved.left;					//  
					item.helper.css('left',left);								//  
					item.position.left = left;									//  
				}
				if(!axis || axis == 'y'){
					item.moved.top = event.pageY - item.offset.top;
					var top = item.startY + item.moved.top;
					item.helper.css('top',top);
					item.position.top = top;
				}
				if(item.options.trapped && item.trap){
					if(item.position.left < 0)
						item.position.left = 0;
					else if(item.position.left + item.size.width > item.trap.width())
						item.position.left = item.trap.width() - item.size.width;
					if(item.position.top < 0)
						item.position.top = 0;
					else if(item.position.top + item.size.height > item.trap.height())
						item.position.top = item.trap.height() - item.size.height;
					item.helper.css('left',item.position.left);
					item.helper.css('top',item.position.top);
				}
				if(item.options.droppable){
					item.options.droppable.onDraggableDrag(item);
				}
				item.options.onMove(event,item);
			}
		});

		$(document).bind('touchend.'+id,{instance: this},function(event){
			$("#droppable").html(event.type);
			var item = event.data.instance;										//  shortcut draggable item
			var droppable = item.options.droppable;								//  shortcut droppable
			if(!item.options.bubble)											//  bubbling is not enabled
				event.stopPropagation();										//  stop event propagation
			if(!item.options.enabled)											//  draggable not is enabled
				return;															//  quit event handling
			if(!item.isDragging)												//  dragging has been broken
				return;															//  quit event handling
			item.isDragging = false;											//  note dragging end
			item.helper.removeClass('dragging');								//  remove dragging style class
			if($.inArray(event.which,item.options.which) < 0)					//
				return;															//
			if(item.options.enabled)											//  draggable is enabled
				if(item.options.onEnd(event,item))								//  call method on drag end
					return;														//
			if(droppable)														//  a droppable is defined
				if(droppable.accept(item,droppable))							//  draggable is accepted by droppable
					return;														//  quit event handling

			if(item.options.revert){											//  revert animation is enabled
				item.helper.animate({											//  animate helper
					left: item.startX,											//  to original x value
					top: item.startY											//  to original y value
				},{
					duration: item.options.revertDuration,						//  animation duration
					easing: item.options.revertEasing							//  animation easing
				});
			}
		});

		this.helper.addClass('draggable');										//  
		if(this.options.enabled)												//  
			this.helper.addClass('draggable-enabled');							//  
	};

	this.destroy = function(){
		this.helper.removeClass('draggable draggable-enabled dragging',false);	//  
		this.helper.unbind('.'+id);												//  
		$(document).unbind('.'+id);												//  
	};

	this.create();																//  
};

