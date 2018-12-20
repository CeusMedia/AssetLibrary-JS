var timer_diff = 0;
var timer;
function initCountdown (timer, server_hour, server_min, server_sec)
{
	var now = new Date();
	var hour = now.getHours();
	var min = now.getMinutes();
	var sec = now.getSeconds();

	timer = timer;
	timer_diff = (hour - server_hour) * 3600 + (min - server_min) * 60 + (sec - server_sec);
}

function refreshCountdown (id, prefix, suffix)
{
	var now = new Date();
	var hour = now.getHours() - timer_diff_hour;
	var min = now.getMinutes() - timer_diff_min;
	var sec = now.getSeconds() - timer_diff_sec;

	timer_now = (hour) * 3600 + (min) * 60 + (sec);

	last = timer_now - timer;

	value = prefix + last + suffix;
	element = document.getElementsByName(id)[0];
	if (element) element.value = value;
	//else document.getElementById(id).innerHTML = value;
}
