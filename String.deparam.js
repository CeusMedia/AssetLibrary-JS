String.prototype.deparam = function(){
	var data = {};
	var query = decodeURIComponent(this.split(/\?/).pop());
	var parts = query.split(/&/);
	for(var i in parts){
		var pair = parts[i].split(/=/);
		if(pair.length < 2)
			pair[1] = null;
		data[pair[0]] = pair[1];
	}
	return data;
}
