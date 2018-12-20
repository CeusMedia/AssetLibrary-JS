String.prototype.formatJSON = function(){
	var tab = '  ';
	var content = '';
	var inString = false;
	var indentLevel = 0;
	for(var c=0; c<this.length; c++){
		var char = this.substr(c,1);
		switch(char){
			case '{':
			case '[':
				content += char;
				if( !inString )
					content += "\n" + tab.repeat(++indentLevel);
				break;
			case '}':
			case ']':
				if( !inString )
					content += "\n" + tab.repeat(--indentLevel);
				content += char;
				break;
			case ',':
				content += (inString || !indentLevel) ? char : ",\n" + tab.repeat(indentLevel);
				break;
			case ':':
				content += (inString || !indentLevel) ? char : ": ";
				break;
			case '"':
				if(c > 0 && this.substr(c-1,1) != '\\' )
					inString = !inString;
			default:
				content += char;
				break;
		}
	}
	return content;
}