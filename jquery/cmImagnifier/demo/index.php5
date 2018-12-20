<?php
require_once 'cmClasses/trunk/autoload.php5';

$pathJs		= 'http://js.ceusmedia.de/';
$pathCss	= 'http://css.ceusmedia.de/';

$images	= array(
	array( "Cerulean_Cross_3_500.jpg", "Cerulean_Cross_3_4000.jpg" ),
	array( "IMG_8940_720.JPG", "IMG_8940.JPG" ),
	array( "IMG_8575_720.JPG", "IMG_8575.JPG" ),
);

$image	= $images[0];

$page	= new UI_HTML_PageFrame();
$page->addStylesheet( $pathCss.'blueprint/reset.css' );
$page->addStylesheet( $pathCss.'blueprint/typography.css' );
$page->addStylesheet( 'cmImagnifier.css' );
$page->addStylesheet( 'style.css' );
$page->addJavaScript( '../../1.4.4.min.js' );
$page->addJavaScript( 'cmImagnifier.js' );
$page->addJavaScript( 'script.js' );
$page->setTitle( 'Demo: cmImagnifier' );
$body	= '
<div id="layout-page">
	<h1>cmImagnifier</h1>
	<small>Magnifier for an image by using a normal and a large image.</small>
	<div id="layout-content">
		<div>
			<div style="float: left;">
				<img src="'.$image[0].'" data-original="'.$image[1].'" alt="" class="zoomable"/>
				<div style="clear: left"></div>
				<small>Image created by <a href="http://www.spektyr.com/PrintImages/slides/Cerulean%20Cross%203%20Large.html">Spektyr</a>.</small>
			</div>
			<div style="float: left; margin-left: 2em;">
				<h2>Demo Controls</h2>
				<p>
					<b>Lense: </b>
					<button type="button" id="button-enable-0" onclick="enableImagnifier(0);" disabled="disabled">enable</button>
					<button type="button" id="button-disable-0" onclick="disableImagnifier(0);">disable</button>
					<button type="button" onclick="toggleImagnifier(0);">toggle</button> |
					<button type="button" onclick="hideLense(0);">hide</button>
					<button type="button" onclick="showLense(0);">show</button>
				</p>
				<p>
					<b>Show at: </b>
					<button type="button" onclick="showImagnifierAt(0,135,135);">135x135</button>
					<button type="button" onclick="showImagnifierAt(0,250,250);">250x250</button><br/>
				</p>
				<p>
					<b>Position: </b>
					<label for="input-posX-0">X: </label>
					<input type="text" name="posX" id="input-posX-0" value="250" size="1"/> 
					<label for="input-posY-0">Y: </label>
					<input type="text" name="posY" id="input-posY-0" value="250" size="1"/>
					<button type="button" onclick="showImagnifierAt(0);">show</button>
				</p>
				<p>
					<b>Style: </b>
					<button type="button" onclick="setImagnifierOption(0,\'classLense\',\'cmImagnifier-lense round\');">round</button>
					<button type="button" onclick="setImagnifierOption(0,\'classLense\',\'cmImagnifier-lense\');">rounded</button>
				</p>
				<p>
					<b>Ratio: </b>
					<button type="button" onclick="setImagnifierOption(0,\'showRatio\',true);">show</button>
					<button type="button" onclick="setImagnifierOption(0,\'showRatio\',false);">hide</button> |
					<b>Position: </b>
					<button type="button" onclick="setImagnifierOption(0,\'showPosition\',true);">show</button>
					<button type="button" onclick="setImagnifierOption(0,\'showPosition\',false);">hide</button>
				</p>
				<p>
					<b>Option: </b>
					<select name="key" id="input-option-key-0" onchange="loadImagnifierOption(0);">
						<option></option>
						<option>classLense</option>
						<option>classMagnified</option>
						<option>easeIn</option>
						<option>easeOut</option>
						<option>speedIn</option>
						<option>speedOut</option>
						<option>showRatio</option>
						<option>showPosition</option>
					</select>
					<input type="text" name="posX" id="input-option-value-0" size="11"/> 
					<button type="button" onclick="setImagnifierOption(0);">set</button>
				</p>
			</div>
			<div style="clear: left"></div>
			<br/>
			<div>
				<h2>Options</h2>
				<table style="border: 1px solid gray; border-collapse: collapse; width: 900px">
					<colgroup>
						<col width="18%"/>
						<col width="15%"/>
						<col width="22%"/>
						<col width="45%"/>
					</colgroup>
					<tbody>
						<tr><th>Option</th><th>Values</th><th>Default</th><th>Description</th></tr>
						<tr>
							<td>classContainer</td>
							<td><cite>string<cite></td>
							<td><cite>cmImagnifier-container<cite></td>
							<td>CSS class(es) set to image container</td>
						</tr>
						<tr>
							<td>classImage</td>
							<td><cite>string<cite></td>
							<td><cite>cmImagnifier-image<cite></td>
							<td>CSS class(es) set if image is magnifyable</td>
						</tr>
						<tr>
							<td>classLense</td>
							<td><cite>string<cite></td>
							<td><cite>cmImagnifier-lense<cite></td>
							<td>CSS class(es) set to lense</td>
						</tr>
						<tr>
							<td>classMagnified</td>
							<td><cite>string<cite></td>
							<td><cite>cmImagnifier-image-magnified<cite></td>
							<td>CSS class(es) set if image is magnified</td>
						</tr>
						<tr>
							<td>classRatio</td>
							<td><cite>string<cite></td>
							<td><cite>cmImagnifier-lense-ratio<cite></td>
							<td>CSS class(es) set to lense ratio</td>
						</tr>
						<tr>
							<td>classPosition</td>
							<td><cite>string<cite></td>
							<td><cite>cmImagnifier-lense-position<cite></td>
							<td>CSS class(es) set to lense position</td>
						</tr>
						<tr>
							<td>speedIn</td>
							<td>positive <cite>integer<cite></td>
							<td><cite>0<cite></td>
							<td>Speed of showing Animation</td>
						</tr>
						<tr>
							<td>speedOut</td>
							<td>positive <cite>integer<cite></td>
							<td><cite>0<cite></td>
							<td>Speed of hiding Animation</td>
						</tr>
						<tr>
							<td>easeIn</td>
							<td><cite>string<cite></td>
							<td><cite>linear<cite></td>
							<td>Easing of showing Animation <small>(see <a href="http://gsgd.co.uk/sandbox/jquery/easing/">jQuery Easing Plugin</a>)</small></td>
						</tr>
						<tr>
							<td>easeOut</td>
							<td>positive <cite>string<cite></td>
							<td><cite>linear<cite></td>
							<td>Easing of hiding Animation <small>(see <a href="http://gsgd.co.uk/sandbox/jquery/easing/">jQuery Easing Plugin</a>)</small></td>
						</tr>
						<tr>
							<td>showPosition</td>
							<td><cite>boolean<cite></td>
							<td><cite>false<cite></td>
							<td>Show lense position</td>
						</tr>
						<tr>
							<td>showRatio</td>
							<td><cite>boolean<cite></td>
							<td><cite>false<cite></td>
							<td>Show lense ratio</td>
						</tr>
						<tr>
							<td>onLoad</td>
							<td><cite>function<cite></td>
							<td><cite>function(){}<cite></td>
							<td>Function to call after zoomed image has been loaded</td>
						</tr>
					</tbody>
				</table>
			</div>
			<br/>
			<div>
				<h2>Methods</h2>
				Most methods <b>ONLY</b> do work if:
				<ol>
					<li>this plugin has been applied to</li>
					<li>an image with an "data-original" attribute</li>
					<li>containing the URL of an existing larger version of this image</li>
				</ol>
				<br/>
				<table style="border: 1px solid gray; border-collapse: collapse; width: 900px">
					<colgroup>
						<col width="25%"/>
						<col width="75%"/>
					</colgroup>
					<tbody>
						<tr><th>Method</th><th>Functionality</th></tr>
						<tr>
							<td>disable()</td>
							<td>Disables lense. Returns <cite>true</cite> on success and <cite>false</cite> if lense is already disabled or not disableable.</td>
						</tr>
						<tr>
							<td>enable()</td>
							<td>Enables lense. Returns <cite>true</cite> on success and <cite>false</cite> if lense is already enabled or not enableable.</td>
						</tr>
						<tr>
							<td>getOption()</td>
							<td></td>
						</tr>
						<tr>
							<td>hideLense()</td>
							<td>Hides lense. Returns <cite>true</cite> on success and <cite>false</cite> if lense is already hidden.</td>
							<td></td>
						</tr>
						<tr>
							<td>showLense()</td>
							<td>Shows lense. Returns <cite>true</cite> on success and <cite>false</cite> if lense is already visible.</td>
							<td></td>
						</tr>
						<tr>
							<td>showLenseAt(posX, posY)</td>
							<td>Moves lense to a position and shows it.</td>
						</tr>
						<tr>
							<td>setOption()</td>
							<td></td>
						</tr>
						<tr>
							<td>toggle()</td>
							<td>Enables or disables lense, depending on current state. Returns <cite>2</cite> for "disabled", <cite>1</cite> for "enabled" and <cite>0</cite> for "no action".</td>
						</tr>
					</tbody>
				</table>
				<br/>
			</div>
		</div>
	</div>
</div>
';

$page->addBody( $body );
echo $page->build();
?>
