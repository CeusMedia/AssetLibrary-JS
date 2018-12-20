/**
 *	@deprecated		use Storage instance instead
 */
JSON.Storage = {

	prefix: '',

	clear: function(){
		if(!JSON.Storage.prefix.length)
			return sessionStorage.clear();
		JSON.Storage.remove(JSON.Storage.keys());
	},

	get: function(keys){
		if(typeof keys == 'string'){
			val = sessionStorage.getItem(this.prefix+keys);
			return val ? JSON.parse(val) : null;
		}
		if(!$.isArray(keys))
			throw 'Invalid argument type';
		list = [];
		for(i in keys)
			list.push(JSON.Storage.get(keys[i]));
		return list;
	},

	has: function(key){
		return JSON.Storage.get(key) !== null;
	},

	keys: function(regExp){
		keys = [];
		prefix = JSON.Storage.prefix.length;
		for(i=0;i<sessionStorage.length;i++){
			key = sessionStorage.key(i);
			if(prefix){
				if(key.substr(0,prefix) != JSON.Storage.prefix)
					continue;
				key = key.substr(prefix);
			}
			if(!regExp || key.match(regExp))
				keys.push(key);
		}
		keys.sort();
		return keys;
	},

	remove: function(keys){
		if(typeof keys == 'string')
			return sessionStorage.removeItem(JSON.Storage.prefix+keys);
		if(!$.isArray(keys))
			throw 'Invalid argument type';
		for(i in keys)
			JSON.Storage.remove(keys[i]);
	},

	set: function(key,value){
		return sessionStorage.setItem(JSON.Storage.prefix+key,JSON.stringify(value));
	}
}
if(sessionStorage == null) alert('Browser incompatible: Session Storage is missing');
