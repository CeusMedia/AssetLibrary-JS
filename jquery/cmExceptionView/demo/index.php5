<?php
class TestException extends RuntimeException{
}
class TestA{
	public function anExceptionMethod( $arg1 = NULL, $arg2 = NULL ){
		throw new TestException( 'This is an exception thrown for testing purposes, only.' );
	}
}
class TestB extends TestA{
	public function doSomethingMaybeExceptional( $arg1 = NULL, $arg2 = NULL ){
		try{
			$this->anExceptionMethod( $arg1, $arg2 );
		}
		catch( Exception $e ){
			throw new RuntimeException( 'An exception was thrown and catched.', 0, $e );
		}
	}
}
class ExceptionThrower{
	public function __construct(){
		$this->test	= new TestB;
	}
	public function callAnExceptionThrowingMethod( $arg1 = NULL, $arg2 = NULL ){
		try{
			$this->test->doSomethingMaybeExceptional( $arg1, $arg2 );
		}
		catch( Exception $e ){
			throw new RuntimeException( 'An exception was thrown and catched.', 0, $e );
		}
	}
}

require_once 'cmClasses/trunk/autoload.php5';

try{
	$thrower	= new ExceptionThrower();
	$thrower->callAnExceptionThrowingMethod( M_PI, array( 'a1' => 'value1', 'a2' => array( 'a3', 'a4' ) ) );
	print( "hmm.... no exception happened... but it should!... atleast *THIS* time :D" );
}
catch( Exception $e ){
	$page	= new UI_HTML_PageFrame();
	$page->addJavaScript( '../../1.4.4.min.js' );
	$page->addJavaScript( '../0.2.js' );
	$page->addStylesheet( 'http://css.ceusmedia.de/blueprint/reset.css' );
	$page->addStylesheet( 'http://css.ceusmedia.de/blueprint/typography.css' );
	$page->addStylesheet( '../0.2.css' );
	$page->addBody( UI_HTML_Tag::create( 'h2', 'Demo: cmExceptionView' ) );
	$body	= '
<p>
The following description shows the HTML output of a catched exception rendered with <cite>cmClasses::UI_HTML_Exception</cite> and improved by jQuery Plugin <cite>cmExceptionView</cite>.<br/>
So, the displayed error is <b>NOT</b> a real error. It is an exception thrown on purpose for demonstration sake.
</p>
<div id="exception-view-demo">'.UI_HTML_Exception_View::render( $e ).'</div>
';

	$page->addBody( $body );
	$page->addScript('window.onload = function(){$("dl.exception").cmExceptionView({foldTraces: false});};');
	print( $page->build( array( 'style' => 'margin: 2em' ) ) );
}
?>
