JSON.RPC = {
	uri: null,
	username: null,
	password: null,
	onError: function(jqXHR, textStatus, errorThrown){},
	request: function(method, args, onSuccess,onError){
		var start = new Date().getTime();
		var data = JSON.stringify({
			method: method,
			arguments: args
		});
		$.ajax({
			url: this.uri,
			type: "POST",
			dataType: "json",
			data: data,
			username: this.username,
			password: this.password,
			contentType: "application/json-rpc",
			success: function(message, textStatus, jqXHR){
				var end = new Date().getTime();
				message.timestampSent		= start / 1000;
				message.timestampReceived	= end / 1000;
				message.timeTransfer		= (end - start) / 1000;
				if(type(onSuccess) !== 'undefined' && $.isFunction(onSuccess))	//  on success callback function given
					onSuccess(message,jqXHR);
			},
			error: function(jqXHR, textStatus, errorThrown){					//  textStatus: (timeout|error|abort|parsererror)
				if(type(onError) !== 'undefined' && $.isFunction(onError))		//  on error callback function given
					onError(jqXHR, textStatus, errorThrown);
				else
					JSON.RPC.onError(jqXHR, textStatus, errorThrown);			//  execute default on error callback
			}
		});
	}
}
