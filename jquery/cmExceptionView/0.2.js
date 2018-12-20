(function($){
	jQuery.fn.cmExceptionView = function(settings){
		settings = jQuery.extend({
			classList: 'panel',
			foldBlockquotes: true,												//
			foldTraces: true,													//
			foldPaths: true														//  shorten paths in file information
		},settings);
		if(settings.classList)
			$(this).addClass(settings.classList);
		
		if(settings.foldBlockquotes){
			$('ol.trace blockquote:visible',this).each(function(){
				link	= $('<a>&hellip;</a>').click(function(){				//  create link and bind click to
					$(this.nextSibling).show();									//  show full content and
					$(this).remove();											//  remove link itself
				});
				$(this).before(link.attr('href','javascript:void();')).hide();	//  insert link and hide full content
			});
		}
		if(settings.foldTraces){
			$('ol.trace:visible',this).each(function(){
				link = $('<span class="trace-short"></span>').click(function(){
					$(this.nextSibling).show();
					$(this).remove();
				});
				link.html('&nbsp;<a>&hellip;</a>&nbsp;');
				link.attr('href','javascript:void();');
				$(this).before(link).hide();
			});
		}
		if(settings.foldPaths){
			var paths = $('ol.trace>li>span.path',this);
			paths.add(this.find('dd.exception-file>.path')).each(function(){
				link = '<a href="javascript:void();">&hellip;</a>/';
				link = $('<span class="path-short"></span>').html(link).click(function(){
					$(this.nextSibling).show();
					$(this).remove();
				});
				$(this).before(link).hide();
			});
		}
		return this;
	}
})(jQuery);
