window.onerror = handleError;										//  set Error Handler
function handleError( message, file, line ){
  $.post(															//  open AJAX POST Request
    'tools/catchJavaScriptError.php5',{								//  to Error Catcher Script
      'message' : message,											//  Error Message
      'file'	: file,												//  URL
      'line'	: line												//  Line in HTML Code
    });
  if( !( 'console' in window && 'firebug' in console ) )			//  if no Firebug available
    return true;													//  show no Error in Browser
};
