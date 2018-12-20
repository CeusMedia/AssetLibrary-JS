/**
 *	@deprecated	moved to folder cmDevLog/
 *	@todo		to be removed
 */
function devLog(message,enabled){
  try{
    globalDebugEnabled = debug;
  } catch(e) {
    globalDebugEnabled = false;
  }
  if(enabled || globalDebugEnabled){
    if( 'console' in window && 'firebug' in console )			//  firebug plugin is available
      console.log(message);
    else{
      try{
        if(debugLogUrl && jQuery){
          jQuery.post(											//  open AJAX POST Request
            debugLogUrl,{										//  to Dev Logger Script
              'message' : message,								//  Dev Message
              'url'	    : document.location.href				//  Referrer URL
          });
        }
      }catch(e){}
	}
  }
}