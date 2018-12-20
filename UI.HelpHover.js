document.getElementsByClassName = function (needle)
{
  var         my_array = document.getElementsByTagName("*");
  var         retvalue = new Array();
  var        i;
  var        j;

  for (i = 0, j = 0; i < my_array.length; i++)
  {
    var c = " " + my_array[i].className + " ";
    if (c.indexOf(" " + needle + " ") != -1)
      retvalue[j++] = my_array[i];
  }
  return retvalue;
}
function addEvent(obj, evType, fn)
{
  if (obj.addEventListener)
  {
    obj.addEventListener(evType, fn, true);
    return true;
  }
  else if (obj.attachEvent)
  {
    var r = obj.attachEvent("on"+evType, fn);
    return r;
  }
  else
  {
    return false;
  }
}

function HelpHover()
{
  if(this._hoverContents)
  {
    this._mousePosX = 0;
    this._mousePosY = 0;
    this._hoverItem = null;
    this._hoverContents = null;
  }
}

HelpHover.prototype.init = function()
{
  var hh = this;
  var helpItems = document.getElementsByClassName('hover');
  for (var i=0; i<helpItems.length; i++)
  {
    helpItems[i].onmousemove = function(e)
    {
      if (!e) var e = window.event;
      if (e.pageX || e.pageY)
      {
        hh.mousePosX = e.pageX;
        hh.mousePosY = e.pageY;
      }
      else if (e.clientX || e.clientY)
      {
        hh.mousePosX = e.clientX + document.documentElement.scrollLeft;
        hh.mousePosY = e.clientY + document.body.scrollTop;
      }
      hh._hoverItem = this;
      hh._hoverContents = document.getElementById(this.id+'Help');
      hh.move();
    }
    helpItems[i].onmouseout = function (e)
    {
      hh.out();
    }
  }
}

HelpHover.prototype.out = function()
{
  if(this._hoverContents)
  {
    this._hoverContents.style.top = -10000+'px';
    this._hoverContents.style.left = -10000+'px';
    this._hoverItem = null;
    this._hoverContents = null;
  }
}

HelpHover.prototype.move = function()
{
  this._hoverContents.style.top = this.mousePosY+20+'px';
  this._hoverContents.style.left = this.mousePosX-20+'px';
}

addEvent(window, 'load', function()
{
  var hh = new HelpHover();
  hh.init();
});