String.prototype.trimCentric = function(string,length,mask){
	maskLength	= mask.match('/^&.*;$/') ? 1 : mask.length;
	if(maskLength >= length)
		return string;

	if(!(length && string.length > length))
		return string;

	range	= (length - maskLength) / 2;
	left	= string.substr(0,Math.ceil(range));
	right	= string.substr(-Math.floor(range));
	return left+mask+right;
}

