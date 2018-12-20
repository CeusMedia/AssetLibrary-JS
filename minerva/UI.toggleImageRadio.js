//  Switching Image Radio Buttons
function toogleImageRadio (max, name, id, value)
{
	for (i=0; i<max; i++)
		setImage (name + '_' + i, img_radio_unchecked);
	setImage (name + '_' + id, img_radio_checked);
	setField (name, value);
	lightUp(name);
}
function setImage (name, src) {document.getElementById(name).src = src;}
function setField (name, value) {document.getElementsByName(name)[0].value = value;}