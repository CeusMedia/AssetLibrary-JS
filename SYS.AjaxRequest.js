var req;
function AjaxRequest()
{
  this.method	= "POST";
  this.mime	= "text/xml";
  this.content	= "application/x-www-form-urlencoded";
  this.async	= true;
  this.loader	= "";

  this.setLoader = function( id )
  {
    this.loader = id;
  }
  
  this.showLoader = function()
  {
    if( this.loader )
    {
      var element = document.getElementById( this.loader );
      element.style.visibility = 'visible';
    }
  }
  
  this.hideLoader = function()
  {
    if( this.loader )
    {
      var element = document.getElementById( this.loader );
      element.style.visibility = 'hidden';
    }
  }
  
  this.get = function( url, callback )
  {
    method	= this.method;
    this.method	= "GET";
    this.showLoader();
    this.request( url, callback, "" );
    this.method	= method;
  }

  this.post = function( url, callback, formdata )
  {
    method	= this.method;
    this.method	= "POST";
    this.request( url, callback, formdata );
    this.method	= method;
  }

  this.request = function( url, callback, formdata )
  {
  	if( window.ActiveXObject )
  	{
	      try {
		req = new ActiveXObject("Msxml2.XMLHTTP");
	      }
	      catch(e)
	      {
		try {
		  req  = new ActiveXObject("Microsoft.XMLHTTP");
		}
		catch(e)
		{
		  req  = false;
		}
	      }
      req.onreadystatechange = processCalendar;
        req.open( "GET", url, true );
        req.send( null );
       }
       else
       {



    this._getRequest();
    if( req )
    {
      eval( "req.onreadystatechange = " + callback + ";" );
      if( window.XMLHttpRequest )
      {
        try{
          req.open( this.method, url, this.async );
        }
        catch(e) {}
      }
      else if( window.ActiveXObject )
      {
      }
      if( this.content )
        req.setRequestHeader( "Content-Type", this.content );
      if( this.mime && req.overrideMimeType )
        req.overrideMimeType( this.mime );
      req.setRequestHeader( "Content-length", formdata.length );
      req.setRequestHeader( "Connection", "close" );
      req.send( formdata );
//      req.send( null );
    }}
  }

  this._getRequest = function()
  {
    if( typeof( XMLHttpRequest ) != 'undefined' )
      req = new XMLHttpRequest();
    else
    {
      try {
        req = new ActiveXObject("Msxml2.XMLHTTP");
      }
      catch(e)
      {
        try {
          req  = new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch(e)
        {
          req  = false;
        }
      }
    }
  }
}
