function printMailAddress( address, linked )
{
	address	= address.replace( " (at) ", "@" );
	address = address.replace( " [dot] ", "." );
	if( linked )
	{
		url		= "mailto:"+address;
		document.write( "<a href=\""+url+"\">"+address+"</a>" );
	}
	else
	{
		document.write( address );
	}
}
