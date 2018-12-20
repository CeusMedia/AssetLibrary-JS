function ExtendableContent()
{
  this.switch = function( id, linkMore, linkLess )
  {
    link  = document.getElementById( 'ec_link'+id );
    content  = document.getElementById( 'ec_content'+id );
    if( content.style.display == 'block' )
    {
      link.innerHTML = linkMore;
      content.style.display = 'none';
    }
    else
    {
      link.innerHTML = linkLess;
      content.style.display = 'block';
    }
  }
}
