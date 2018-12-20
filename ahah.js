
function ahah(url,target) {
    document.getElementById(target).innerHTML = '<div class="loading">loading data...</div>';
    if (window.XMLHttpRequest) {
        req = new XMLHttpRequest();
        req.onreadystatechange = function() {ahahDone(target);};
        req.open("GET", url, true);
        req.send(null);
    } else if (window.ActiveXObject) {
        req = new ActiveXObject("Microsoft.XMLHTTP");
        if (req) {
            req.onreadystatechange = function() {ahahDone(target);};
            req.open("GET", url, true);
            req.send();
        }
    }
}

function ahahDone(target) {
  if (req.readyState == 4) {  							// only if req is "loaded"
    if (req.status == 200 || req.status == 304) {    				// only if "OK"
      results = req.responseText;
      document.getElementById(target).innerHTML = results;
      execJS(document.getElementById(target));
    } else{
      document.getElementById(target).innerHTML="ahah error:\n" + req.statusText;
    }
  }
}

var bSaf   = (navigator.userAgent.indexOf('Safari') != -1);
var bOpera = (navigator.userAgent.indexOf('Opera') != -1);
var bMoz   = (navigator.appName == 'Netscape');
function execJS(node) {
  var st = node.getElementsByTagName('SCRIPT');
//  console.log('found Script');
  var strExec;
  console.log(strExec);
  for(var i=0;i<st.length; i++) {
    if (bSaf) {
      strExec = st[i].innerHTML;
    }
    else if (bOpera) {
      strExec = st[i].text;
    }
    else if (bMoz) {
      strExec = st[i].textContent;
    }
    else {
      strExec = st[i].text;
    }
    try {
      eval(strExec.split("<!--").join("").split("-->").join(""));
    } catch(e) {
      alert(e);
    }
  }
}
