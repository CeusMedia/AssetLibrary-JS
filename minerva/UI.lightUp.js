// Function for Highlighting Labels
function lightUp (id)
{
	var label_id = 'lbl_' + id;
	var icons_id = 'ico_' + id;
	var field_id = 'fld_' + id;
	var element_label = document.getElementById(label_id);
	var element_icons = document.getElementById(icons_id);
	var element_field = document.getElementById(field_id);
	//elements = document.getElementsByName(label_id);
	//if (elements.length) element = elements[0];
	if (element_label) element_label.className = 'tablightlabel';
	if (element_icons) element_icons.className = 'tablighticons';
	if (element_field) element_field.className = 'tablightfield';
}
