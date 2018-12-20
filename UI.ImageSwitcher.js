function ImageSwitcher ( images )
{
  this.loadFirst	= function()
  {
    first	= images[0];
    code	= buildMainImage( first.id, first.detail, first.description );
    node	= document.getElementById( 'gallery_main_image' );
    node.innerHTML	= code;
    setTitle( first.title );
    setDescription( first.description );
  }

  this.loadList	= function()
  {
    if( images.length > 1 )
    {
      code	= '';
      for( i=1; i<images.length; i++ )
      {
        id	= images[i].id;
        thumb	= images[i].thumb;
        desc	= images[i].description;
        code	= code + '<li>' + buildListImage( id, thumb, desc ) + '</li>';
      }
      document.getElementById( 'gallery_list' ).innerHTML = '<ul>'+code+'</ul>';
    }
  }

  this.switchToImage	= function ( id )
  {
    main	= document.getElementById( 'gallery_main_image' ).childNodes[0].id;
    i = 0 ;
    while( i<images.length )
    {
      if( images[i].id == main )
        break;
      i++;
    }

    for( j=0; j<images.length; j++ )
    {
      if( images[j].id == id )
      {
	setListImage( id, images[i] );
	setMainImage( images[j] );
        setTitle( images[j].title );
        setDescription( images[j].description );
      }
    }
  }

  function setListImage( id, image )
  {
    code = buildListImage( image.id, image.thumb, image.description );
    node = document.getElementById( id ).parentNode;
    node.innerHTML = code;
  }

  function setMainImage( image )
  {
    code = buildMainImage( image.id, image.detail, image.description );
    node = document.getElementById( 'gallery_main_image' );
    node.innerHTML = code;
  }

  function setDescription( description )
  {
    node	= document.getElementById( 'gallery_main_description' );
    if( node )
      node.innerHTML = description;
  }    

  function setTitle( title )
  {
    node	= document.getElementById( 'gallery_main_title' );
    if( node )
      node.innerHTML = title;
  }

  function buildMainImage( id, url, alt )
  {
    alt	= alt.replace( "<br />", " " );
    return '<img id=\"'+id+'\" src=\"'+url+'\" alt=\"'+alt+'\" title=\"'+alt+'\"/>';
  }

  function buildListImage( id, url, alt )
  {
    alt	= alt.replace( "<br />", " " );
    return '<img id=\"'+id+'\" onClick=\"is.switchToImage( \''+id+'\');\" src=\"'+url+'\" alt=\"'+alt+'\" title=\"'+alt+'\"/>';
  }
}
