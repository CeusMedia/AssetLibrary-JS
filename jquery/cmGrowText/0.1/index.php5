<?php
require_once 'cmClasses/trunk/autoload.php5';

$body	= '
<h2>cmGrowText</h2>
This jQuery extension allows to have multi line text fields (HTML: textarea) which enlarge or shrink depending on lines of content.
<br/><br/>
<div id="layout-data">
	<h3>Configuration</h3>
	These parameters are set:<br/><br/>
	<div id="list-config"></div>
</div>
<div id="layout-content">
	<h3>Demo</h3>
	<textarea id="test">This text area shows atleast two lines
but its height will increase up to 5 lines
if there are more lines to show.
Just like this 4-line-text demonstrates.</textarea>
	<br/><br/>
	<h4>Live Option Switches</h4>
	<b>Power <small>(autoEnable)</small></b>
	<button type="button" id="btn-enable" disabled="disabled">enable</button>
	<button type="button" id="btn-disable">disable</button><br/>
	<b>Option: maxLines</b>
	<button type="button" id="btn-set-maxLines-0" class="setOption">-</button>
	<button type="button" id="btn-set-maxLines-2" class="setOption">2</button>
	<button type="button" id="btn-set-maxLines-5" class="setOption" disabled="disabled">5</button>
	<button type="button" id="btn-set-maxLines-10" class="setOption">10</button><br/>
	<b>Option: minLines</b>
	<button type="button" id="btn-set-minLines-0" class="setOption">-</button>
	<button type="button" id="btn-set-minLines-2" class="setOption" disabled="disabled">2</button>
	<button type="button" id="btn-set-minLines-5" class="setOption">5</button>
	<button type="button" id="btn-set-minLines-10" class="setOption">10</button>
	<br/><br/>
	<h4>Known Bugs</h4>
	<ul>
		<li>Only "new lines" but no line wraps are counted.
			<ul>
				<li>So, long lines which wrap withn the text area will not be recognized as multiple lines.</li>
				<li>Possible Solution: Look for cursor position, react on carriage return</li>
			</ul>
	</ul>
	<br/><br/>
	<h4>JavaScript Code</h4>
	<xmp class="js">$(document).ready(function(){
	$("#test").cmGrowText({
		maxLines: 5,
		minLines: 2
	});
});</xmp>
</div>
';


$page	= new UI_HTML_PageFrame();
$page->addJavaScript( "http://js.int1a.net/jquery/1.6.min.js" );
$page->addJavaScript( "cmGrowText.js" );
$page->addJavaScript( "script.js" );
$page->addStyleSheet( "http://css.int1a.net/blueprint/reset.css" );
$page->addStyleSheet( "http://css.int1a.net/blueprint/typography.css" );
$page->addStyleSheet( "http://css.int1a.net/xmp.formats.css" );
$page->addStyleSheet( "style.css" );
$page->setTitle( "Demo: Growing Textarea" );
$page->addBody( $body );
echo $page->build();
?>
