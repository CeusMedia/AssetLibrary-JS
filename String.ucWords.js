String.prototype.ucWords = function(){
	var parts = this.split(' ');
	for(i=0; i<parts.length; i++)
		parts[i] = parts[i][0].toUpperCase()+parts[i].substr(1);
	return parts.join(' ');
};