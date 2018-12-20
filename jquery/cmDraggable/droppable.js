/**
 *	Class for droppable zones for draggable items.
 *	@param		id			DOM ID of item
 *	@param		options		Array Map of options to set
 *	@author		Christian Würker <christian.wuerker@ceusmedia.de>
 *	@version	$Id$
 */
droppable = function(id,options){

	/*  OPTIONS  */
	defaults = {																//  
		accept: 'div#test-a,div#test-c',										//  
		onAccept: function(draggable,droppable){},								//  
		onOver: function(draggable,droppable){},								//  
		onOut: function(draggable,droppable){},									//  
		onDrop: function(draggable,droppable){}									//  
	};

	/*  CORE MEMBERS  */
	this.id = id;																//  
	this.state = 0;																//  
	this.options = $.extend(defaults,options);									//  
	this.helper = $("#"+id);													//  
	this.size = null;															//  

	if(this.helper.size() == 1){
		this.size = {															//  
			x0: this.helper.offset().left,										//  
			y0: this.helper.offset().top,										//  
			x1: this.helper.width() + this.helper.offset().left,				//  
			y1: this.helper.height() + this.helper.offset().top					//  
		}
	}

	this.accept = function(draggable,droppable){
		if(droppable.isInBounds(draggable))										//  
			if(droppable.isAcceptable(draggable)){								//  
				droppable.options.onAccept(draggable,droppable);				//  
				droppable.onDraggableOut(draggable);							//  
				return true;													//  
			}
		droppable.onDraggableOut(draggable);									//  
		return false;															//  
	}

	this.isAcceptable = function(draggable){
		var droppable = draggable.options.droppable;							//  
		return draggable.helper.filter(droppable.options.accept).size() > 0;	//  
	}

	this.isInBounds = function(draggable){
		var drag = draggable.helper;											//  
		var drag = {															//  
			x: Math.round(drag.offset().left + drag.width() / 2),				//  
			y: Math.round(drag.offset().top + drag.height() / 2)				//  
		};
		var drop = draggable.options.droppable.size;							//  
		var inBoundsLeftTop = drag.x >= drop.x0 && drag.y >= drop.y0;			//  
		var inBoundsRightBottom = drag.x < drop.x1 && drag.y < drop.y1;			//  
		return inBoundsLeftTop && inBoundsRightBottom;							//  
	}

	this.onDraggableDrag = function(draggable){
		var droppable = draggable.options.droppable;							//  
		if(droppable.isInBounds(draggable,droppable))							//  
			droppable.onDraggableOver(draggable,droppable)						//  
		else																	//  
			droppable.onDraggableOut(draggable,droppable);						//  
	}

	this.onDraggableOver = function(draggable){
		var droppable = draggable.options.droppable;							//  
		var accept = droppable.isAcceptable(draggable);							//  
		droppable.helper.addClass('drag-over');									//  
		droppable.helper.addClass(accept ? 'drag-accepted' : 'drag-denied');	//  
	}

	this.onDraggableOut = function(draggable){
		var droppable = draggable.options.droppable;							//  
		droppable.helper.removeClass('drag-over');								//  
		droppable.helper.removeClass('drag-accepted');							//  
		droppable.helper.removeClass('drag-denied');							//  
	}
};

