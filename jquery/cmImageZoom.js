/**
 *	jQuery Plugin to zoom Images.
 *	@name		cmImageZoom
 *	@type		jQuery
 *	@cat		Plugins/cmImageZoom
 *	@author		Christian W�rker <christian.wuerker@ceusmedia.de>
 *	@copyright	2007 Christian W�rker <christian.wuerker@ceusmedia.de> (http://ceus-media.de)
 *	@license	LGPL
 *	@param		Object		settings (optional) Customize your ImageZoom
 *	@option		integer		innerWidth			Inner Width of Zoom Box
 *	@option		integer		outerWidth			Outer Width of Zoom Box
 *	@option		integer		outerHeight			Expected outer Height of Zoom Box
 *	@option		integer		smallerThan			Zoom only Images with a small Width (0 for all)
 *	@option		string		zoomSelector		Selector of Zoom Box
 *	@option		string		positionSelector	Selector of Position Box (Debug Mode)
 *	@option		boolean		showName			Flag: show Image Name
 *	@option		boolean		showSize			Flag: show Image Size
 *	@option		boolean		showURL				Flag: show Image URL
 */
(function($)
  {
    jQuery.fn.cmImageZoom = function(settings)
    {
      var cContainers = this;
      settings = jQuery.extend(
        {
          innerWidth: 300,
          outerWidth: 320,
          outerHeight: 360,
          smallerThan: 0,
          zoomSelector: '#zoom',
          positionSelector: '',
          showName: true,
          showSize: true,
          showURL: true
        },
        settings
      );

      $(settings.zoomSelector).hide();
      $(settings.zoomSelector).css('width', settings.innerWidth);

      //Loop through the jquery objects (these are the elements that contain our items to collapse).
      return cContainers.each(
        function()
        {
          $(this).hover(
            function(e)
            {
              if(e.pageX || e.pageY)
              {
                mousePosX = e.pageX;
                mousePosY = e.pageY;
                if(window.innerWidth)
                {
                  screenX  = window.innerWidth;
                  screenY  = window.innerHeight;
                }
                else
                {
                  screenX  = document.body.clientWidth;
                  screenY  = document.body.clientHeight;
                }
              }
              if(settings.positionSelector)
                $(settings.positionSelector).html(mousePosX+"/"+mousePosY+" | "+screenX+"/"+ screenY);

              html  = "";

              if( !settings.smallerThan || ( settings.smallerThan && this.width < settings.smallerThan ) )
                html += '<img src="'+this.src+'"/><br/>';
              if(settings.showName)
                html += '<span><b>Name: '+this.alt+'</b></span><br/>';
              if(settings.showSize)
                html += '<span><b>Size: '+this.width+'px * '+this.height+'px</b></span><br/>';
              if(settings.showURL)
                html += '<span>'+this.src+'</span><br/>';

              $(settings.zoomSelector).html(html);
              if(mousePosX + settings.outerWidth > screenX && mousePosX > settings.outerWidth)
              {
                $(settings.zoomSelector).css('left', 'auto');
                $(settings.zoomSelector).css('right', screenX-mousePosX+1);
              }
              else
              {
                $(settings.zoomSelector).css('left', mousePosX+1);
                $(settings.zoomSelector).css('right', 'auto');
              }
              if(mousePosY + settings.outerHeight > screenY && mousePosY > settings.outerHeight)
              {
                $(settings.zoomSelector).css('top', 'auto');
                $(settings.zoomSelector).css('bottom', screenY-mousePosY+1);
              }
              else
              {
                $(settings.zoomSelector).css('top', mousePosY+1);
                $(settings.zoomSelector).css('bottom', 'auto');
              }
              $(settings.zoomSelector).show();
            },
            function()
            {
              $(settings.zoomSelector).hide();
            }
          )
        }
      )
    }
  }
)(jQuery);