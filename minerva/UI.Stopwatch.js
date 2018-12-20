stop_sec = 0;
stop_msec = 0;
function refreshStopWatch (id, prefix, suffix)
{
	stop_msec+=2;
	if (stop_msec>9)
	{
		stop_sec++;
		stop_msec=0;
	}
	value = prefix + stop_sec + '.' + stop_msec + suffix;
	element = document.getElementsByName(id)[0];
	if (element) element.value = value;
//	document.getElementById(id).innerHTML = value;
}
