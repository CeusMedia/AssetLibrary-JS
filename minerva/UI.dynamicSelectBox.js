function clearSelectBox (element_id)
{
	var element = document.getElementById (element_id);
	while (element.length>0) element.options[0] = null;
	element.disabled = true;

}

function fillSelectBox (element_id, items, mode)
{
	var element = document.getElementById (element_id);
	for (var i=0; i<items.length; i++){
		element.options[i] = new Option();
		element.options[i].text = items[i];
		if (mode == "same")
			element.options[i].value = items[i];
		else
			element.options[i].value = i;

		element.disabled = false;
	}
}


function selectValue (element_id, value)
{
	var found = false;
	var element = document.getElementById (element_id);
	for (var i=0; i<element.options.length; i++){
		if (value == element.options[i].value)
		{
			element.options[i].selected = true;
			found = true;
		}
		else element.options[i].selected = false;
	}
	return found;

}

function getSelectValue (element_id)
{
	var element = document.getElementById (element_id);
	var index = element.selectedIndex;
	var value = element.options[index].value;
//	alert (element.options[index].value + "-" + element.options[index].text);
//	alert (value);
	return value;
}

