var isOpenedDrop = false;
var win_drop = 0;
function closeDrop() { if (isOpenedDrop) if (!win_drop.closed) win_drop.close(); }
function openDrop(stringURL)
{
	win_args  = 'width=400,height=200,toolbar=no,menubar=no,status=no,dependent=yes,resizable=no';
	win_drop = window.open(stringURL, 'drop', win_args);
	win_drop.opener = self;
	isOpenedDrop = true;
	win_drop.focus();
}
function resizeDrop (width, height) { window.resizeTo(width, height);}
