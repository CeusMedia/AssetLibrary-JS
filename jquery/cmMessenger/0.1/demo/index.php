<?php
require_once( 'cmClasses/0.7.0/autoload.php5' );
$pathJs		= '../';
$pathCss	= '//css.ceusmedia.de/';

$script	= '
var numberRandom	= 0;
function randomMessage(){
	numberRandom++;
	v = Math.round(Math.random()*4);
	if(!v)			Messenger.noteSuccess("Random: Success "+numberRandom);
	else if(v==1)	Messenger.noteNotice("Random: Notice "+numberRandom);
	else if(v==2)	Messenger.noteError("Random: Error "+numberRandom);
	else if(v==3)	Messenger.noteFailure("Random: Failure "+numberRandom);
}
var Messenger = $.cmMessenger({
	timeAutoRemove: 5000,
});
$(document).ready(function(){
	$("button#button-success").mousedown(function(){Messenger.noteSuccess("Success");});
	$("button#button-notice").mousedown(function(){Messenger.noteNotice("Notice");});
	$("button#button-error").mousedown(function(){Messenger.noteError("Error");});
	$("button#button-failure").mousedown(function(){Messenger.noteFailure("Failure");});
	$("button#button-random").mousedown(function(){randomMessage();});
	$("button#button-restart").mousedown(function(){document.location.reload();});
	Messenger.noteSuccess("Hello World! This is a success story :)");
	Messenger.noteNotice("These messages demonstrate the 4 message types and will hide after 5 seconds.");
	Messenger.noteError("This message type is for user input errors.");
	Messenger.noteFailure("This message type is for application or resource errors.");
	window.setInterval("randomMessage",3000);
});';
$body	= '
		<div class="buttons">
			<h3>cmMessenger Demo</h3>
			<button id="button-restart">restart Demo</button>
			<button id="button-success"><span>note Success</span></button>
			<button id="button-notice">note Notice</button>
			<button id="button-error">note Error</button>
			<button id="button-failure">note Failure</button>
			<button id="button-random">note Random</button>
		</div>
		<div id="messenger"></div>
		<div id="content">
			<h2>cmMessenger Demo</h2>
			<p></p>
			<h4>HTML</h4>
			<xmp class="code">
<script type="text/javascript" src="path/to/jquery.js"></script>
<script type="text/javascript" src="path/to/cmMessenger/0.1.js"></script>
<link rel="stylesheet" type="text/css" media="all" href="path/to/cmMessenger/themes/default.css"/>
			</xmp>
			<h4>JavaScript</h4>
			<pre class="code">
var Messenger = $.cmMessenger();
			</pre>
			<h4>Call</h4>
			<pre class="code">
Messenger.noteSuccess("Success!");
Messenger.noteNotice("Notice!");
Messenger.noteError("Error!");
Messenger.noteFailure("Failure!");
			</pre>
		</div>
';

$page	= new UI_HTML_PageFrame();
$page->addHead( UI_HTML_Tag::create( 'script', $script, array( 'type' => 'text/javascript' ) ) );
$page->setTitle( 'cmMessenger Demo' );

$page->addJavaScript( '../../../1.4.2.min.js' );
$page->addJavaScript( '../cmMessenger.js' );

$page->addStylesheet( $pathCss.'blueprint/reset.css' );
$page->addStylesheet( $pathCss.'blueprint/typography.css' );
$page->addStylesheet( 'style.css' );

$page->addStylesheet( '../themes/default.css' );

$page->addBody( $body );
echo $page->build();
?>