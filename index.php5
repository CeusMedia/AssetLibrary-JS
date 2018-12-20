<?php
require_once 'cmClasses/0.7.1/autoload.php5';
CMC_Loader::registerNew( 'php5', NULL, 'site' );

$fileName	= 'site/packages.yaml';

$tabs		= new PackageTabs();
$package	= isset( $_GET['package'] ) ? $_GET['package'] : "";
$page		= isset( $_GET['page'] ) ? $_GET['page'] : "";
$packages	= $tabs->getPackages( $fileName );

if( $package )
{
	if( in_array( $package, array_keys( $packages ) ) )
		die( $tabs->buildPackage( $package, $packages[$package] ) );
}
else if( $page )
{
	$fileName	= "site/".$page.".html";
	if( file_exists( $fileName ) )
		die( file_get_contents( $fileName ) );
}

$list	= array(
	'tabs'	=> array(),
	'divs'	=> array()
);

class TabViewer
{
	var $tabs	= array();
	var $divs	= array();

	function addTab( $id, $label, $content = "", $idPrefix = "#" )
	{
		$this->tabs[$id]	= UI_HTML_Elements::ListItem( UI_HTML_Elements::Link( $idPrefix.$id, "<span>".$label."</span>" ) );
		$this->divs[$id]	= '<div id="'.$id.'">'.$content.'</div>';
	}
	
	function buildView()
	{
		$tabs	= "<ul>".implode( "", $this->tabs )."</ul>\n";
		$divs	= implode( "", $this->divs );
		return $tabs.$divs;
	}
}
$viewer	= new TabViewer;
$viewer->addTab( "index", "Index", "", "?page=" );
#$viewer->addTab( "test", "Test", "", "?page=" );
foreach( $packages as $packageName => $packageData )
	$viewer->addTab( $packageName, $packageData['title'], "", "?package=" );
$tabs	= $viewer->buildView();
echo require_once( "site/master.phpt" );
die;
?>
