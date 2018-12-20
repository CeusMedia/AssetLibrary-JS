function go (url)
{
//	try {showLoading ();}
//	catch (e) {}
	location.href = url;
}
function submitFormularByLink (form_name, new_url)
{
	formular = document.getElementsByName(form_name)[0];
	formular.action = new_url;
	formular.submit();
}
