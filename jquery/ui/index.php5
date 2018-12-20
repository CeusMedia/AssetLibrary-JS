<?php

function getFolders( $path ){
	$index	= new DirectoryIterator( $path );
	$list	= array();
	foreach( $index as $item ){
		if( !$item->isDot() ){
			if( $item->isDir() ){
				$list[$item->getFilename()]	= $item->getPathname();
			}
		}
	}
	ksort( $list );
	return $list;
}

$list	= array();
foreach( getFolders( '.' ) as $name => $path )
	$list[]	= '<li><a href="'.$name.'">'.$name.'</a></li>';
$list	= '<ul>'.join( $list ).'</ul>';
?>
<html>
	<head>
		<title>jQuery UI - Version Index</title>
		<link type="text/css" rel="stylesheet" href="http://css.ceusmedia.de/blueprint/reset.css"/>
		<link type="text/css" rel="stylesheet" href="http://css.ceusmedia.de/blueprint/typography.css"/>
	</head>
	<body>
		<div style="margin: 50px">
			<h1>Welcome to jQuery UI!</h1>
			<p>This is an overview for jQuery UI versions bundled within cmScripts.</p>
			<p>There is also the latest version of development with <a href="development/demos">demos</a>.</p>
			<h2>Versions</h2>
			<?php echo $list;?>
		</div>
	</body>
</html>

