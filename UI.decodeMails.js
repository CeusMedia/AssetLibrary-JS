function decodeMails( separator )
{
	elements = document.getElementsByTagName( 'a' );
	for( i=0; i<elements.length; i++ )
	{
		if( elements[i].href.match( /mailto:/ ) && elements[i].href.match ( separator ) )
		{
			elements[i].href = elements[i].href.replace( separator, '@' );
			elements[i].innerHTML = elements[i].innerHTML.replace( separator, '@' );
		}
	}
}