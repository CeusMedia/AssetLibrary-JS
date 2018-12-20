function setActiveStyleSheet(title)
{
  var i, a, main;
  setCookie ("minerva_" + mid + "_style", title);
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++)
  {
    if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title"))
    {
      a.disabled = true;
      if(a.getAttribute("title") == title)
      {
		  a.disabled = false;
	  }
    }
  }
}

function getActiveStyleSheet()
{
  var i, a;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++)
  {
    if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title") && !a.disabled) return a.getAttribute("title");
  }
  return null;
}

function getPreferredStyleSheet()
{
  var i, a;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++)
  {
    if(a.getAttribute("rel").indexOf("style") != -1)
    {
      if (a.getAttribute("rel").indexOf("alt") == -1)
      {
	    if (a.getAttribute("title")) return a.getAttribute("title");
      }
	}
  }
  return "default";
}

/*window.onload = function(e) {
  var cookie = getCookie("minerva_" + mid + "_style");
  var title = cookie ? cookie : getPreferredStyleSheet();
  setActiveStyleSheet(title);
}*/
/*
var cookie = getCookie("minerva_" + mid + "_style");
var title = cookie ? cookie : getPreferredStyleSheet();
setActiveStyleSheet(title);
*/