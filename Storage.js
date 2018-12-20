/**
 *	Storage using localStorage and sessionStorage.
 *	@param		type		Type of storage engine to use, values: session|local, default: session, fallback: local
 *	@param		context		Prefix for keys
 */
Storage = function(type,context){

	this.context = context || '';
	this.storage = null;

	if(type == 'session'){
		if(typeof(sessionStorage) !== 'undefined')
			this.storage = sessionStorage;
	}
	else if(typeof(localStorage) !== 'undefined')
		this.storage = localStorage;

	this.clear = function(){
		if(!this.storage)
			return null;
		if(this.context){
			var keys = this.index();
			for(var i in keys)
				this.storage.removeItem(this.context + keys[i]);
		}
		else
			this.storage.clear();
	}

	this.index = function(regExp){
		if(!this.storage)
			return null;
		var list = [];
		var length = this.context.length;
		for(var i=0; i<this.storage.length; i++){
			key = this.storage.key(i);
			if(context){
				if(key.substr(0,length) != this.context)
					continue;
				key = key.substr(length);
			}
			if(!regExp || key.match(regExp))
				list.push(key);
		}
		list.sort();
		return list;
	}

	this.get = function(keys){
		if(!this.storage)
			return null;
		if(typeof keys == 'number')
			keys = new String(keys).toString();
		if(typeof keys == 'string'){
			var val = this.storage.getItem(this.context + keys);
			return val ? JSON.parse(val) : null;
		}
		if(!$.isArray(keys))
			throw 'Invalid argument type';
		list = [];
		for(i in keys)
			list.push(this.get(keys[i]));
		return list;
	}

	this.has = function(key){
		if(!this.storage)
			return null;
		return this.get(key) !== null;
	}

	this.remove = function(key){
		if(!this.storage)
			return null;
		return this.storage.removeItem(this.context + key);
	}

	this.set = function(key,value){
		if(!this.storage)
			return null;
		value	= JSON.stringify(value);
		return this.storage.setItem(this.context + key,value);
	}
};
