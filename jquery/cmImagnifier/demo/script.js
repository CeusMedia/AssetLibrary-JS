
function enableImagnifier(nr){
	if($("img.zoomable").eq(nr).cmImagnifier('enable')){
		$("#button-enable-"+nr).attr('disabled','disabled');
		$("#button-disable-"+nr).removeAttr('disabled');
	}
}
function disableImagnifier(nr){
	if($("img.zoomable").eq(nr).cmImagnifier('disable')){
		$("#button-enable-"+nr).removeAttr('disabled');
		$("#button-disable-"+nr).attr('disabled','disabled');
	}
}
function toggleImagnifier(nr){
	var code = $("img.zoomable").eq(nr).cmImagnifier('toggle');
	if(code == 1){
		$("#button-enable-"+nr).attr('disabled','disabled');
		$("#button-disable-"+nr).removeAttr('disabled');
	}
	else if(code == 2){
		$("#button-enable-"+nr).removeAttr('disabled');
		$("#button-disable-"+nr).attr('disabled','disabled');
	}
}
function showImagnifierAt(nr,posX,posY){
	if(typeof(posX) == 'undefined')
		posX = $("#input-posX-"+nr).val();
	if(typeof(posY) == 'undefined')
		posY = $("#input-posY-"+nr).val();
	$("img.zoomable").eq(nr).cmImagnifier('showLenseAt', posX, posY);
}
function hideLense(nr){
	$("img.zoomable").eq(nr).cmImagnifier('hideLense');
}
function showLense(nr){
	$("img.zoomable").eq(nr).cmImagnifier('showLense');
}
function setImagnifierOption(nr,key,value){
	if(typeof(key) == 'undefined')
		key = $("#input-option-key-"+nr).val();
	if(typeof(value) == 'undefined')
		value = $("#input-option-value-"+nr).val();
	value = value == "true" ? true : (value == "false" ? false : value);
	$("img.zoomable").eq(nr).cmImagnifier('setOption',key,value);
}
function loadImagnifierOption(nr){
	var key = $("#input-option-key-"+nr).val();
	var value = $("img.zoomable").eq(nr).cmImagnifier('getOption',key);
	$("#input-option-value-"+nr).val(value);
}

$(document).ready(function(){
	
	var options = {
		onLoad: function(image){
//			image.cmImagnifier('showLenseAt',500,500);
		} 
	};
	$("img.zoomable").cmImagnifier(options);


//	$("img.zoomable").fadeIn(1000);
});
