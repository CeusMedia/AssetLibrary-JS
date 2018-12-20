<?php
return '
  <script type="text/javascript" src="jquery/history.pack.js"></script>
  <script type="text/javascript" src="jquery/tabs.pack.js"></script>

  <div id="packages" class="">
    <script type="text/javascript">
<!--
$(document).ready(function(){
  $("#packages").tabs({
    "navClass": "tabs-dev",
    "containerClass": "tabs-dev-container"
  });
});
-->
    </script>
    '.$tabs.'
    '.$divs.'
  </div>
';
?>
