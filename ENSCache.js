function ENSCache(client,storage){
	this.a = {};
	this.client = client;
	this.storage = storage;
	this.clear = function(){
		this.storage.clear();
	}
	this.register = function(key,serviceName,parameters){
		this.a[key] = {key: key, serviceName: serviceName, parameters: parameters};
	}
	this.get = function(key,parameters,callback){
		if(!this.a[key])
			throw 'No service call for "'+key+'" registered.';
		var a = this.a[key];
		var param = {};
		for(var i in a['parameters'])
			param[a['parameters'][i]] = parameters[a['parameters'][i]];
		if($(param).size())
			key	+= '_'+$.param(param);
		if(this.storage.has(key)){
			data = this.storage.get(key);
			if(!$.isFunction(callback))
				return data;
			callback(data,parameters);
		}
		else{
			if(!$.isFunction(callback)){
				data = this.client.read(a['serviceName'],parameters);
				this.storage.set(key,data);
				return data;
			}
			this.client.read(a['serviceName'],parameters,function(data){
				this.storage.set(key,data);
				callback(data,parameters);
			});
		}
	}
	this.remove = function(key,parameters){
		var a = this.a[key];
		var param = {};
		for(var i in a['parameters'])
			param[a['parameters'][i]] = parameters[a['parameters'][i]];
		if($(param).size())
			key	= key+'_'+$.param(param);
		if(this.storage.has(key))
			return this.storage.remove(key);
	}
};
