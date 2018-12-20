//  Switching Radio Buttons
function toggleRadio (name, key)
{

	elem = document.getElementById(name + '_' + key);
	if (!elem.checked)
	{
		elem.checked=true;
		lightUp(name);
	}
}