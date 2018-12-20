var isOpenedCal = false;
var win_cal = 0;
function closeCal() { if (isOpenedCal) if (!win_cal.closed) win_cal.close();}
function openCal (stringURL)
	{
	 win_args  = 'width=300, height=200, status=no, dependent=yes';
	 win_cal = window.open(stringURL, 'cal', win_args);
	 win_cal.opener = self;
	 isOpenedCal = true;
	 win_cal.focus();
	}
function resizeCal (width, height) { window.resizeTo(width, height);}
