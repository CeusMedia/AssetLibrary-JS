function input(form_name, elem_name, what)
{
	if (document.forms[form_name].elements[elem_name].createTextRange) // IE
	{
		document.forms[form_name].elements[elem_name].focus();
		document.selection.createRange().duplicate().text = what;
	}
	else if (document.getElementById && !document.all) // Mozilla
	{
		var tarea = document.forms[form_name].elements[elem_name];
		var selEnd = tarea.selectionEnd;
		var txtLen = tarea.value.length;
		var txtbefore = tarea.value.substring(0,selEnd);
		var txtafter =  tarea.value.substring(selEnd, txtLen);
		tarea.value = txtbefore + what + txtafter;
	}
	else document.entryform.text.value += what;
}
