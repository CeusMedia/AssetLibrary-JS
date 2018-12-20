<?php
require_once 'site/Package.php5';
class PackageTabs
{

	function __construct()
	{
		$this->config	= array();
	}

	function getPackages( $fileName )
	{
		$packages	= File_YAML_Reader::load( $fileName );
		return $packages['packages'];
	}

	function buildPackage( $packageName, $packageData )
	{
		$list		= $this->getFileList( $packageName."/" );
		$id			= 'tab_'.$packageName;
		$package	= new Package( $packageData );
		return require( "site/package.phpt" );
	}

	function buildPackages( $packages )
	{
		foreach( $packages as $packageName => $packageData )
		{
			$list	= $this->getFileList( $packageName."/" );
			$id		= 'tab_'.$packageName;
			$package	= new Package( $packageData );
			$tabs[$id]	= $package->title;
			$divs[$id]	= require( "site/package.phpt" );
		}
		return $this->buildTabs( $tabs, $divs );
	}

	private function buildTabs( $tabs, $containers )
	{
		if( count( $tabs ) )
		{
			$listTabs	= array();
			$listDivs	= array();
			foreach( $tabs as $id => $label )
			{
				$listTabs[]	= UI_HTML_Elements::ListItem( UI_HTML_Elements::Link( "#".$id, "<span>".$label."</span>" ) );
				$listDivs[]	= '<div id="'.$id.'">'.$containers[$id].'</div>';
			}
			$tabs	= UI_HTML_Elements::unorderedList( $listTabs );
			$divs	= implode( "\n", $listDivs );
			return require_once( $tabs.$divs );
		}
	}

	private function getFileList( $folder )
	{
		try
		{
			$list	= array();
			$index	= Folder_RecursiveLister::getFileList( $folder );
#			foreach( new File_RegexFilter( $folder, "@\.(js|css|html)$@" ) as $file )
			foreach( $index as $file )
			{
				$url	= str_replace( "\\", "/", $file->getPathname() );
				$label	= str_replace( "\\", "/", $file->getPathname() );
				$list[]	= UI_HTML_Elements::ListItem( UI_HTML_Elements::Link( $url, $label ) );
			}
			return UI_HTML_Elements::unorderedList( $list );
		}
		catch( Exception $e )
		{
			die( $e->getMessage() );
		}
	}
}
?>
