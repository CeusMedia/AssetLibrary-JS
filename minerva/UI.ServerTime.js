var time_diff_hour = 0;
var time_diff_min = 0;
var time_diff_sec = 0;

function initTimer (server_hour, server_min, server_sec)
{
	var now = new Date();
	var hour = now.getHours();
	var min = now.getMinutes();
	var sec = now.getSeconds();

	time_diff_hour = hour - server_hour;
	time_diff_min = min - server_min;
	time_diff_sec = sec - server_sec;
}

function refreshTimer (id, prefix, suffix)
{
	var now = new Date();
	var hour = now.getHours() - time_diff_hour;
	var min = now.getMinutes() - time_diff_min;
	var sec = now.getSeconds() - time_diff_sec;
	if (sec < 0)
	{
		min--;
		sec += 60;
	}
	else if (sec >= 60)
	{
		min++;
		sec -= 60;
	}
	if (min < 0)
	{
		hour--;
		min += 60;
	}
	else if (min >= 60)
	{
		hour++;
		min -= 60;
	}
	hour = String(hour);
	min = String(min);
	sec = String(sec);

	if (sec.length <2) sec = '0'+sec;
	if (min.length <2) min = '0'+min;
	var value = prefix + hour + ':' + min + ':' + sec + suffix;
	var element = document.getElementsByName(id)[0];
	if (element) element.value = value;
	//else document.getElementById(id).innerHTML = value;
}
