Net.Service = {
	uri: null,
	username: null,
	password: null,
	defaultData: {format: 'json'},
	
	init: function(){
		$.ajaxSetup({
			dataType: 'json',
			type: 'POST'
		});
	},

	handleResponseJSON: function(json,callback){
		switch(json.status){
			case 'data':
				if(!$.isFunction(callback))
					return json.data;
				callback(json.data);
				break;
			case 'exception':
				alert(json.data.message);
				break;
			default:
				alert("Unknown NetService response type: "+json.status);
		}
		return null;
	},

	read: function(service,parameters,callback){
		settings = {
			url : Net.Service.uri+service,
			data : $.extend(this.defaultData,parameters)
		};
		devLog(settings);
		if($.isFunction(callback)){
			settings['success'] = function(json){
				Net.Service.handleResponseJSON(json,callback);
			};
		}else{
			settings['async'] = false;
		}

		request = $.ajax(settings);
		if($.isFunction(callback))
			return null;
		json = $.parseJSON(request.responseText);
		return this.handleResponseJSON(json,callback);
	}
};

