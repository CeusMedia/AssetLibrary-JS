/**
 *	jQuery Plugin for decoding encoded Mail Addresses to protect against SPAM Bots.
 *	@name		cmMailDecoder
 *	@type		jQuery
 *	@cat		Plugins/cmMailDecoder
 *	@author		Christian Würker <christian.wuerker@ceusmedia.de>
 *	@since		14.10.2008
 *	@version	0.1
 *	@copyright	2008 Christian Würker <christian.wuerker@ceusmedia.de> (http://ceus-media.de)
 *	@license	LGPL/CC
 *	@param		Object		settings (optional) Customize your Accordion
 *	@option		string		linkClass			Selector Class of Link Tag, default: "mailAddress"
 *	@option		string		spanClass			Selector Class of Span Tag, default: "mailAddress"
 *	@option		string		patternAt			Pattern of @, default: " (at) " (with withspaces!)
 *	@option		string		patternDot			Pattern of Dot, default: " (dot) " (with withspaces!)
 */
(function($){
  jQuery.fn.cmMailDecoder = function(settings){
    var container = this;
    var settings = jQuery.extend({
        linkClass	: "mailAddress",
        spanClass	: "mailAddress",
        patternAt	: " (at) ",
        patternDot	: " [dot] "
      },
      settings
    );

	$("a."+settings.linkClass).each(function(){
	  var adr	= $(this).attr("href");
	  $(this).attr("href",decode(adr));
	  var label	= $(this).html();
	  $(this).html(decode(label));
	})
	$("span."+settings.spanClass).each(function(){
	  var label	= $(this).html();
	  $(this).html(decode(label));
	})

	function decode(string){
	  var patternAt		= addslashes(settings.patternAt);
	  var patternDot	= addslashes(settings.patternDot);
	  var pattern		= "(\\S+)"+patternAt+"(\\S+)"+patternDot+"(\\S+)";
	  var regex			= new RegExp(pattern);
      var set			= regex.exec(string);
	  if(set!=null){
        string	= set[1]+"@"+set[2]+"."+set[3];
      }
      return string;
    }

    function addslashes(str) {
      str	= str.replace(/\'/g,'\\\'').replace(/\"/g,'\\"');
      str	= str.replace(/\\/g,'\\\\').replace(/\//g,'\\/');
      str	= str.replace(/\(/g,'\\(').replace(/\)/g,'\\)');
      str	= str.replace(/\[/g,'\\[').replace(/\]/g,'\\]');
      str	= str.replace(/\{/g,'\\{').replace(/\}/g,'\\}');
      str	= str.replace(/\./g,'\\.').replace(/\*/g,'\\*');
      return str;
    }
    return this;
  }
})(jQuery);
$(document).ready(function(){
  $(document).cmMailDecoder();
});
