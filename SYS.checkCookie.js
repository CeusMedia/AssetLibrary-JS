function checkCookie(){
  if(document.cookie.length)
    return true;
  document.cookie = 'cookieTest=1';
  if(document.cookie.indexOf('cookieTest=1') == -1)
  	return false;
  return true;
}