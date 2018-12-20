<?php
@include '../vendor/autoload.php';
@include 'cmClasses/trunk/autoload.php';
@include 'cmClasses/trunk/autoload.php5';

$pathCDN	= "http://cdn.int1a.net/";

$body	= '
<script>
$(document).ready(function(){
	cmAutoScroll.init("div.framed", 25, "easeInOutSine");
});
</script>
<h1 class="muted">Ceus Media Demos</h1>
<h2>cmAutoScroll Demo</h2>
<h3>Example</h3>
<div class="framed">
	Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
	tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
	At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
	no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
	consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
	aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
	Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
</div>
<h3>Code</h3>
<code>
	cmAutoScroll.init("#myDivToScroll", 25, "easeInOutSine");
</code>';

$page	= new UI_HTML_PageFrame();
$page->addStylesheet( $pathCDN."css/bootstrap.css" );
$page->addJavaScript( $pathCDN."js/jquery/1.10.2.min.js" );
$page->addJavaScript( $pathCDN."js/jquery/easing/1.3.min.js" );
$page->addJavaScript( "cmAutoScroll-0.1.js" );
$page->addStylesheet( "style.css" );
$page->addBody( $body );
print( $page->build() );
?>
