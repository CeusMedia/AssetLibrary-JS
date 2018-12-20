<?php
return '
<div class="package">
  <h2>'.( $package->icon ? '<img class="favicon" src="'.$package->icon.'"/>' : '' ).$package->title.' <small>'.$package->version.'</small></h2>
  <p>'.$package->description.'</p>
  <div style="float: right; width: 40%">
    <h4>Links</h4>
    <dl>
      '.( $package->homepage ? '<dt>Home Page</dt><dd><a href="'.$package->homepage.'" target="_blank">'.$package->homepage.'</a></dd>' : '' ).'
      '.( $package->download ? '<dt>Download</dt><dd><a href="'.$package->download.'" target="_blank">'.$package->download.'</a></dd>' : '' ).'
      '.( $package->repository ? '<dt>Repository</dt><dd><a href="'.$package->repository.'" target="_blank">'.$package->repository.'</a></dd>' : '' ).'
      '.( $package->examples ? '<dt>Demos</dt><dd><a href="'.$package->examples.'" target="_blank">'.$package->examples.'</a></dd>' : '' ).'
      '.( $package->tutorials ? '<dt>Tutorials</dt><dd><a href="'.$package->tutorials.'" target="_blank">'.$package->tutorials.'</a></dd>' : '' ).'
      '.( $package->docs ? '<dt>Documentation</dt><dd><a href="'.$package->docs.'" target="_blank">'.$package->docs.'</a></dd>' : '' ).'
      '.( $package->mailgroup ? '<dt>Mail Group</dt><dd><a href="'.$package->mailgroup.'" target="_blank">'.$package->mailgroup.'</a></dd>' : '' ).'
      '.( $package->maillist ? '<dt>Mail List</dt><dd><a href="'.$package->maillist.'" target="_blank">'.$package->maillist.'</a></dd>' : '' ).'
      '.( $package->forum ? '<dt>Forum</dt><dd><a href="'.$package->forum.'" target="_blank">'.$package->forum.'</a></dd>' : '' ).'
      '.( $package->tracker ? '<dt>Tracker</dt><dd><a href="'.$package->tracker.'" target="_blank">'.$package->tracker.'</a></dd>' : '' ).'
    </dl>
  </div>
  <h4>Files</h4>
  <div class="files">
    '.$list.'
  </div>
  <div style="clear: both"></div>
</div>
';
/*
'.$package->.'
*/
?>