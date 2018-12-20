function buildCoverItems( path, items )
{
	for( link in items )
	{
		image	= items[link];
		$('dt#cover_'+link).css('background-image', 'url('+path+image+')');
		if($('div#navigation li#'+link).html() == null )
		{
			$('dt#cover_'+link).hide();
			$('dt#cover_'+link+'+dd').hide();
		}
	}
}
