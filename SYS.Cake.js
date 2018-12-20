function Cake( name, duration, path, domain, secure )
{
  this.affix = "";
  if( duration )
  {
    var date = new Date();
    var curTime = new Date().getTime();

    date.setTime( curTime + ( 1000 * 60 * duration ) );
    this.affix = "; expires=" + date.toGMTString();
  }

  if( path )
    this.affix += "; path=" + path;

  if( domain )
    this.affix += "; domain=" + domain;

  if( secure )
    this.affix += "; secure=" + secure;

  function getValue()
  {
    var m = document.cookie.match( new RegExp( "(" + name + "=[^;]*)(;|$)" ) );
    return m ? m[1] : null;
  }

  this.cookieExists = function()
  {
    return getValue() ? true : false;
  }

  this.expire = function()
  {
    var date = new Date();
    date.setFullYear( date.getYear() - 1 );
    document.cookie=name + "=noop; expires=" + date.toGMTString();
  }

  this.setPiece = function( key, value )
  {
    var ck = getValue();
    if( /[;, ]/.test(value) )
    value = window.encodeURI ? encodeURI( value ) : escape( value );         //Mac IE doesn't support encodeURI
    if( value )
    {
      var attrPair = "@" + key + ":"+ value;
      if( ck )
      {
        if( new RegExp("@" + key + "[:]" ).test( ck ) )
          document.cookie = ck.replace( new RegExp( "@" + key + ":[^@;]*" ), attrPair ) + this.affix;
        else
          document.cookie = ck.replace( new RegExp( "(" + name + "=[^;]*)(;|$)" ), "$1" + attrPair ) + this.affix;
      }
      else
        document.cookie = name + "=" + attrPair + this.affix;
    }
    else
    {
      if( new RegExp( "@" + key + "[:]" ).test( ck ) )
        document.cookie = ck.replace( new RegExp( "@" + key + ":[^@;]*" ), "" ) + this.affix;
    }
  }


  this.getPiece = function( key )
  {
    var ck = getValue();
    if( ck )
    {
      var m = ck.match( new RegExp( "@" + key + ":([^@;]*)" ) );
      if( m )
      {
        var value = m[1];
        if( value )
        return window.decodeURI ? decodeURI( value ) : unescape( value );	           //Mac IE doesn't support decodeURI
      }
    }
  }

  this.getPieces = function()
  {
    var pieces	= new Array();
    var ck	= getValue();
    if( ck )
    {
      var parts	= ck.split( "=" );
      parts.shift();
      var pairs	= parts.join( "=" );
      var exp	= new RegExp( "@([^:]*):([^@;]*)" );
      var m; 	

      while( m = ck.match( exp ) )
      {
        pieces.push( m[1] );
        ck	= ck.replace( "@"+m[1]+":"+m[2], "" );
      }
      return pieces;
    }
  }
}
