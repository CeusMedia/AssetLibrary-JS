var cmAutoScroll = {

	init: function (selector, speed, easing) {
		"use strict";
		if (typeof easing === "undefined") {
			easing = "linear";
		}
		var heightTotal	= $(selector).get(0).scrollHeight;
		var heightPort = $(selector).height();
		var height = heightTotal - heightPort;
		var duration = height / speed * 1000;
		cmAutoScroll.scrollDown(selector, heightTotal - heightPort, duration, easing);
	},

	scrollDown: function (selector, height, time, easing) {
		"use strict";
		$(selector).animate({scrollTop: height}, time, easing,function () {
			cmAutoScroll.scrollUp(selector, height, time, easing);
		});
	},

	scrollUp: function (selector, height, time, easing) {
		"use strict";
		$(selector).animate({scrollTop: 0}, time, easing,function () {
			cmAutoScroll.scrollDown(selector, height, time, easing);
		});
	}
};
