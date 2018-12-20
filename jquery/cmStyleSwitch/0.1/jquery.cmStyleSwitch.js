/**
 *	jQuery Plugin to switch Stylesheets.
 *	@name		StyleSwitch
 *	@type		jQuery
 *	@cat		Plugins/StyleSwitch
 *	@author		Christian Würker <christian.wuerker@ceusmedia.de>
 *	@author		Kelvin Luck ( http://www.kelvinluck.com/ )
 *	@copyright	2007 Christian Würker <christian.wuerker@ceusmedia.de> (http://ceus-media.de)
 *	@license	LGPL/CC
 *	@param		Object		settings (optional) Customize your StyleSwitch
 *	@option		string		cookieName			Name of Cookie
 */
(function($){
    jQuery.fn.StyleSwitcher = function(settings){
      var containers = this;
      settings = jQuery.extend({
          cookieName: 'style'
        },
        settings
      );
      var c = readCookie(settings.cookieName);
      if(c)
        switchStyle(c);

      //Loop through the jquery objects.
      return containers.each(
        function(){
          $(this).click(
            function(e){
              switchStyle(this.getAttribute("rel"));
              return false;
            }
          )
        }
      )

      function switchStyle(styleName){
        $('link[@rel*=style][@title]').each(function(i){
          this.disabled = this.getAttribute('title') == styleName ? false : true;
        });
        createCookie(settings.cookieName, styleName, 365);
      }

      // cookie functions http://www.quirksmode.org/js/cookies.html
      function createCookie(name,value,days){
        if(days){
          var date = new Date();
          date.setTime(date.getTime()+(days*24*60*60*1000));
          var expires = "; expires="+date.toGMTString();
        }
        else
          var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
      }

      function readCookie(name){
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++){
          var c = ca[i];
          while(c.charAt(0)==' ')
            c = c.substring(1,c.length);
          if(c.indexOf(nameEQ) == 0)
            return c.substring(nameEQ.length,c.length);
        }
        return null;
      }
      function eraseCookie(name){
        createCookie(name,"",-1);
      }
    }
  }
)(jQuery);
