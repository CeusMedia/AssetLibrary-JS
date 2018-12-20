function ImagePreview()
{
  tempX	= 0;
  tempY	= 0;
  step	= 20;
  sizes	= new Array();
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

  this.zoomIn	= function( id )
  {
    var image	= document.getElementById( id );
    step_x	= Math.ceil( image.width * step / 100 );
//    step_y	= Math.ceil( image.height * step / 100 );
    if( image.width	< 1000 )
    {
      image.width	+= step_x;	
//      image.height	+= step_y;
    }
  }

  this.zoomOut	= function( id )
  {
    var image	= document.getElementById( id );
    step_x	= Math.floor( image.width * step / 100 );
//    step_y	= Math.floor( image.height * step / 100 );
//    alert( image.width+"x"+image.height+" "+step_x+"x"+step_y );
    if( image.width	> 10 )
    {
      image.width	-= step_x;	
//      image.height	-= step_y;	
    }
  }

  this.show	= function( id )
  {
    var element		= document.getElementById( id ).style;
    element.left	= ( tempX - 5 ) + "px";
    element.top	= ( tempY - 5 ) + "px";
    element.display	= 'block';
  }

  this.change	= function( id )
  {
    var element	= document.getElementById( id ).style;
    if( element.display == 'block' )
      this.hide( id );
    else
      this.show( id );
  }

  if( !IE )
    document.captureEvents( Event.MOUSEMOVE );
  document.onmousemove = this.getMouseXY;
}
ImagePreview	= new ImagePreview();