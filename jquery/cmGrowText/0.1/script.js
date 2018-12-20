/*  --  cmGrowText  --  */
$(document).ready(function(){
	$("#test").cmGrowText({
		maxLines: 5,
		minLines: 2
	});
});


/*  --  User Interface  --  */
function displaySettings(){
	var settings = $("#test").data("settings");
	var list = $("<dl></dl>");
	for(var i in settings)
		list.append("<dt>"+i+"</dt><dd>"+settings[i]+"</dd>");
	$("#list-config").html(list);
}

$(document).ready(function(){
	displaySettings();
	$("#test").focus();

	$("#btn-enable").click(function(){
		$("#btn-enable").attr("disabled","disabled");
		$("#btn-disable").removeAttr("disabled");
		$("#test").cmGrowText("enable");
	});

	$("#btn-disable").click(function(){
		$("#btn-enable").removeAttr("disabled");
		$("#btn-disable").attr("disabled","disabled");
		$("#test").cmGrowText("disable");
	});

	$("button.setOption").bind("click",function(){
		var parts = parts = $(this).attr("id").split(/-/);
		$("#test").cmGrowText("setOption", parts[2], parts[3]);
		$("button.setOption").each(function(){
			var regExp = new RegExp("^btn-set-"+parts[2]+".+");
			if($(this).attr("id").match(regExp))
				$(this).removeAttr("disabled");
		});
		$(this).attr("disabled", "disabled");
		displaySettings();
		$("#test").focus();
	});
});
