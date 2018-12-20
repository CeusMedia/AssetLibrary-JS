/**
 *	Loading Blends.
 *	@author		Christian Würker <Christian.Wuerker@CeuS-Media.de>
 *	@version	0.1
 */
//  --  LOAD LAYER  --  //
function hideBuildLayer(){
//  $("#buildLayer").fadeOut();
  $("#buildLayer").hide();
  $("#container").css('opacity',1);
}
function hideLoadLayer(){
//  $("#loadLayer").fadeOut();
  $("#loadLayer").hide();
  $("#container").css('opacity',1);
}
function showBuildLayer(){
  $("#container").css('opacity',0.25);
//  $("#buildLayer").fadeIn();
  $("#buildLayer").show();
}
function showLoadLayer(){
  $("#container").css('opacity',0.25);
//  $("#loadLayer").fadeIn();
  $("#loadLayer").show();
}
$(document).ready(function(){
  $("#loadLayer").click(hideLoadLayer);
  $("#buildLayer").click(hideBuildLayer);
  links		= $("a").not("[href*='#'])").not("[href*='javascript'])").not("[name]").not(".thickbox").not(".download");
  buttons	= $("button");
//  links.add(buttons).click(showLoadLayer);
  links.click(showLoadLayer);
  window.setTimeout("hideBuildLayer()", 1);
})
