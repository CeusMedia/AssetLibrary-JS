<?php
return '
<html>
  <head>
    <title>JavaScript Library @ CeuS Media</title>
    <link rel="stylesheet" href="http://ceus-media.de/themes/cm5/css/screen.css"/>
    <link rel="stylesheet" href="site/tabs.css"/>
    <script type="text/javascript" src="jquery/1.2.3.pack.js"></script>
    <script type="text/javascript" src="jquery/history/1.0.3.pack.js"></script>
    <script type="text/javascript" src="jquery/tabs/2.7.4.pack.js"></script>
    <script type="text/javascript" src="jquery/timer.js"></script>
    <script type="text/javascript" src="jquery/hotkeys.js"></script>
    <script type="text/javascript">
<!--
$(document).ready(function(){
  $("#packages").tabs({
    "navClass": "tabs-dev",
    "containerClass": "tabs-dev-container",
    "remote": true
  });

  jQuery.hotkeys.add("1", function(){ $("a[href=#remote-tab-1]").trigger("click"); });
  jQuery.hotkeys.add("2", function(){ $("a[href=#remote-tab-2]").trigger("click"); });
  jQuery.hotkeys.add("3", function(){ $("a[href=#remote-tab-3]").trigger("click"); });
  jQuery.hotkeys.add("4", function(){ $("a[href=#remote-tab-4]").trigger("click"); });
  jQuery.hotkeys.add("5", function(){ $("a[href=#remote-tab-5]").trigger("click"); });
  jQuery.hotkeys.add("6", function(){ $("a[href=#remote-tab-6]").trigger("click"); });
});
-->
    </script>
    <style>
h2 {
	margin: 0px;
	padding: 0px;
	}
img.favicon {
	float: left;
	display: block;
	margin: 8px 12px 0px 5px;
	}
small {
	font-size: 11px;
	}
    </style>
  </head>
  <body>
    <div id="container">
      <img src="http://ceus-media.de/themes/cm5/images/head_logo.png"/>
      <div id="field">
        <div id="packages" class="">
          '.$tabs.'
        </div>
<!--        <input id="time" type="hidden1"></input>
        <a href="#" onclick="timer1.stop()">stop</a>
        <script>
var time_sec  = 0;
var timer1 = $.timer(1000,function(){$("#time").val(++time_sec)});
        </script>-->
      </div>
    </div>
  </body>
</html>
';
?>