function ToolTip()
{
  tempX = 0;
  tempY = 0;
  IE = document.all ? true : false;

  this.getMouseXY = function( e )
  {
    tempX	= IE ? event.clientX + document.body.scrollLeft : e.pageX;
    tempY	= IE ? event.clientY + document.body.scrollTop : e.pageY;
    tempX	= tempX >= 0 ? tempX : 0;
    tempY	= tempY >= 0 ? tempY : 0;
    return true;
  }

  this.hide	= function( id )
  {
    var element	= document.getElementById( id ).style;
    element.display = 'none';
  }

  this.show	= function( id )
  {
    var element		= document.getElementById( id ).style;
    element.left	= ( tempX + 20 ) + "px";
    element.top		= ( tempY + 0 ) + "px";
    element.display	= 'block';
  }

  if( !IE )
    document.captureEvents( Event.MOUSEMOVE );
  document.onmousemove = this.getMouseXY;
}
ToolTip	= new ToolTip();
