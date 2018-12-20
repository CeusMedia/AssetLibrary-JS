(function($){
	jQuery.fn.cmExceptionView = function(settings){
		settings = jQuery.extend({
			foldBlockquotes: true,																	//
			foldTraces: false																		//
		},settings);
		if(settings.foldBlockquotes){
			$("ol.trace blockquote:visible",this).each(function(){
				link	= $("<a>&hellip;</a>").attr("href","javascript:void();").click(function(){
					$(this.nextSibling).show();
					$(this).remove();
				});
				$(this).before(link).hide();
			});
		}
		if(settings.foldTraces){
			$("ol.trace:visible",this).each(function(){
				link = $("<a>&hellip;</a>").attr("href","javascript:void();").click(function(){
					$(this.nextSibling).show();
					$(this).remove();
				});
				$(this).before(link).hide();
			});
		}
		return this;
	}
})(jQuery);
