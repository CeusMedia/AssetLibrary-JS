function onUnloadHandler(link)
{
	if(self.VBArray)
	{
		var e = self.event, s = self.screen;
		if(e.clientX + s.width < 0 && e.clientY + s.height < 0) window.open(link ,'shutDown_' + mid, 'width=300, height=100');
	}
}
