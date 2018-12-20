

function onStartDefault(event,item){
	$(".start-x-"+item.id).val(item.startX);
	$(".start-y-"+item.id).val(item.startY);
}
function onMoveDefault(event,item){
	$(".pos-x-"+item.id).val(item.position.left);
	$(".pos-y-"+item.id).val(item.position.top);
	$(".offset-x-"+item.id).val(item.offset.left);
	$(".offset-y-"+item.id).val(item.offset.top);
	$(".moved-x-"+item.id).val(item.moved.left);
	$(".moved-y-"+item.id).val(item.moved.top);
	$(".start-x-"+item.id).val(item.startX);
	$(".start-y-"+item.id).val(item.startY);
}
function onEndDefault(event,item){
	$(".start-x-"+item.id).val(item.startX);
	$(".start-y-"+item.id).val(item.startY);
}
var draggables;
function log(){}


var d = {};
function setEnabled(id,state){
	if(!d[id])
		return;
	state = state && true;
	if(d[id].get('enabled') == state)
		return;
	d[id].set('enabled',state);
	$(".enabled-"+id).toggle();
}


function start(id){
	if(d[id])
		return;
	d[id] = new draggable(id,draggables[id]);
	$(".toggle-"+id).toggle();
}
function stop(id){
	if(!d[id])
		return;
	d[id].destroy();
	d[id] = null;
	$(".toggle-"+id).toggle();
}
function bubble(id){
	if(!d[id])
		return;
	d[id].set('bubble',true);
	$(".bubble-"+id).toggle();
}
function unbubble(id){
	if(!d[id])
		return;
	d[id].set('bubble',false);
	$(".bubble-"+id).toggle();
}
function setAxis(id,axis){
	if(d[id])
		d[id].set('axis',axis);
	$(".axis-"+id).val(axis);
}
function setLeft(id,left){
	if(!d[id])
		return;
	$("#"+id).css('left',left+'px');
}
function setRevert(id,state){
	if(d[id])
		d[id].set('revert',state);
	$(".revert-"+id).toggle();
}
function setTop(id,top){
	if(!d[id])
		return;
console.log(top);
	$("#"+id).css('top',top);
}
function setTrapped(id,trap){
	if(d[id])
		d[id].set('trapped',trap);
	$(".trap-"+id).val(trap);
}


var logLevel = 4 | 1024;

try{
	$(document).bind('mousemove',function(event){
		$("#coords").html(event.pageX+'/'+event.pageY);
	});
	$(document).ready(function(){

		var drop = new droppable('droppable',{
			onAccept: function(draggable,droppable){
				draggable.helper.animate({
					opacity: 0,
					width: 0,
					height: 0,
					left: draggable.helper.position().left + (draggable.helper.width() / 2),
					top: draggable.helper.position().top + (draggable.helper.height() / 2)
				},250);
			},
			onOver: function(draggable){},
			onOut: function(draggable){}
		});
		draggables = {
			'test-a': {
				droppable: drop,
				onStart: function(event,ui){
					onStartDefault(event,ui);
					log(2,'start a');
				},
				onMove: function(event,ui){
					onMoveDefault(event,ui);
					log(2,'move a: '+ui.moved.left+'/'+ui.moved.top);
				},
				onEnd: function(event,ui){
					onEndDefault(event,ui);
					log(2,'end a: '+ui.moved.left+'/'+ui.moved.top);
				}
			},
			'test-b': {
				droppable: drop,
				onStart: function(event,ui){
					onStartDefault(event,ui);
					log(2,'start b');
				},
				onMove: function(event,ui){
					onMoveDefault(event,ui);
					log(2,'move b: '+ui.moved.left+'/'+ui.moved.top);
				},
				onEnd: function(event,ui){
					onEndDefault(event,ui);
					log(2,'end b: '+ui.moved.left+'/'+ui.moved.top);
				}
			},
			'test-c': {
				droppable: drop,
				onStart: function(event,ui){
					onStartDefault(event,ui);
					log(2,'start c');
				},
				onMove: function(event,ui){
					onMoveDefault(event,ui);
					log(2,'move c: '+ui.moved.left+'/'+ui.moved.top);
				},
				onEnd: function(event,ui){
					onEndDefault(event,ui);
					log(2,'end c: '+ui.moved.left+'/'+ui.moved.top);
				}
			}
		}

		start('test-a');
		start('test-b');
		start('test-c');
	//	bubble('test-a',true);
	//	bubble('test-b',true);
	//	bubble('test-c',true);

		new draggable('test-img');
	/*
		$("img").bind('mousedown',function(e){
			console.log('mousedown');
			e.preventDefault();
		});
	*/
	});
}
catch(e){
alert( e );
}

