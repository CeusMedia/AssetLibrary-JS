function ENSClient(path,options){
	var defaults = {
		username: null,
		password: null,
		callbackException: function(exception){
			console.log(exception);
			alert(exception.type+': '+exception.message);
		}
	};
	this.path = path.replace(/\/$/,'') + '/';
	this.options = $.extend($.extend({},defaults),options);
	this.defaultData = {format: 'json'};
	
	this.read = function(service,parameters,callback){
		settings = {
			url : this.path + service,
			data : $.extend(this.defaultData,parameters),
			dataType: 'json',
			username: this.username,
			password: this.password,
			type: 'POST'
		};
		var client = this;
		if($.isFunction(callback)){
			settings['success'] = function(json){
				client.handleResponseJSON(json,callback);
			};
			settings['error'] = function(xhr,status){
				console.log('AJAX error',{status:status});
			};
		}else{
			settings['async'] = false;
		}

		request = $.ajax(settings);
		if($.isFunction(callback))
			return null;
		json = $.parseJSON(request.responseText);
		return this.handleResponseJSON(json);
	};

	this.handleResponseJSON = function(json,callback){
		switch(json.status){
			case 'data':
				if(!$.isFunction(callback))
					return json.data;
				callback(json.data);
				break;
			case 'exception':
				this.options.callbackException(json.data);
				break;
			default:
				alert("Unknown NetService response type: "+json.status);
		}
		return null;
	}
};
