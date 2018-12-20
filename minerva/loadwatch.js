load_sec = 0;
load_msec = 0;
function refreshLoadWatch (id)
{
	load_msec++;
	if (load_msec>9)
	{
		load_sec++;
		load_msec=0;
	}
	value = load_sec + '.' + load_msec;
	document.getElementById(id).innerHTML = value;
}
