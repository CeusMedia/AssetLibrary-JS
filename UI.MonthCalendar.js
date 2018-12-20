function MonthCalendar( id_input, id_mcal, id_opener )
{
	this.id_input	= id_input;
	this.id_mcal	= id_mcal;
    this.mousePosX	= 0;
    this.mousePosY	= 0;
    this.format		= "m.y";

	$('#'+id_opener).click( function( e )
	{
		$('div.mcal').hide();
		if (!e) var e = window.event;
		if (e.pageX || e.pageY)
		{
			this.mousePosX = e.pageX;
			this.mousePosY = e.pageY;
		}
		else if (e.clientX || e.clientY)
		{
			this.mousePosX = e.clientX + document.documentElement.scrollLeft;
			this.mousePosY = e.clientY + document.body.scrollTop;
		}
		$('#'+id_mcal).css( 'top', this.mousePosY+10+'px' );
		$('#'+id_mcal).css( 'left', this.mousePosX+10+'px' );
		$('#'+id_mcal).css( 'display', 'block' );
	});

	this.hide	= function()
	{
		$('#'+this.id_mcal).hide();
	}

	this.select = function( month )
	{
		year	= $('#'+this.id_mcal+' select').val();
		output	= this.format.replace( /m/, month ).replace( /y/, year );
		$('#'+this.id_input).val( output );
		void(0);
	}
}
