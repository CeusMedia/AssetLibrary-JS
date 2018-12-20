function RackTree( cake, open, shut, class_link )
{
  this.cake = cake;
  this.open = open;
  this.shut = shut;
  this.link = class_link;

  this.change = function( element_id )
  {
    var element = document.getElementById( element_id );
    if( element )
    {
//      alert( element_id + " : " + element.className );
      if( element.className == this.open )
      {
        this.cake.setPiece( element_id, 'shut' );
        element.className = this.shut;
      }
      else if( element.className == this.shut )
      {
        this.cake.setPiece( element_id, 'open' );
        element.className = this.open;
      }
      else alert( element.className );
    }
  }

  this.shutRacks = function()
  {
    var element;
    var elements = document.getElementsByName( 'node' );
    for( var i=0; i<elements.length; i++ )
    {
      element = elements[i];
      if( element.id )
      {
        if( element.className == this.open )
        {
          this.cake.setPiece( element.id, 'shut' );
          this.change( element.id );
        }
      }
    }
  }

  this.openRacks = function()
  {
    var element;
    var elements = document.getElementsByName('node');
    for( var i=0; i<elements.length; i++ )
    {
      element = elements[i];
      if( element.id )
      {
        if( element.className == this.shut )
        {
          this.cake.setPiece( element.id, 'open' );
          this.change( element.id );
        }
      }
    }
  }

  this.recall = function( element_id )
  {
    if( this.cake.getPiece( element_id ) == 'open' )
      this.change( element_id );
  }

  this.recallAll = function()
  {
    var nodes = this.cake.getPieces();
    for( var i=0; i<nodes.length; i++ )
      this.recall( nodes[i] )
  }

  this.openCurrent = function()
  {
    elements	= document.getElementsByTagName( "li" );
    for( var i=0; i<elements.length; i++ )
    {
      element	= elements[i];
      if( element.parentNode.id.substr(0,5) == "node_" )
        if( element.className.match( new RegExp( this.link+".*current" ) ) )
          this._openCurrent_rec( element.parentNode );
    }
  }

  this._openCurrent_rec = function( node )
  {
    if( node.nodeName == "UL" )
    {
      if( node.className != this.open )
        node.className = this.open;
      if( node.parentNode )
        this._openCurrent_rec( node.parentNode );
    }
  }
}
