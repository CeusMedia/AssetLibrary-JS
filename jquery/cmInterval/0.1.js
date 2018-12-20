cmInterval = {
	instances: {},
	timeMin: 100,

	add: function(key,callback,time){
		if(this.instances[key])
			return -1;
		time	= Math.max(this.timeMin,parseInt(time));
		this.instances[key] = {
			callback: callback,
			time: time
		};
		this.start(key);
	},

	remove: function(key){
		if(!this.instances[key])
			return -1;
		window.clearInterval(this.instances[key]['pointer']);
		this.instances[key] = null;
	},
	
	reset: function(key){
		var stop = this.stop(key);
		if(stop < 0)
			return stop;
		this.start();
	},

	start: function(key){
		if(!this.instances[key])
			return -1;
		if(this.instances[key]['pointer'])
			return -2;
		this.instances[key]['pointer'] = window.setInterval(
			this.instances[key]['callback'],
			this.instances[key]['time']
		);
	},

	stop: function(key){
		if(!this.instances[key])
			return -1;
		if(!this.instances[key]['pointer'])
			return -2;
		window.clearInterval(this.instances[key]['pointer']);
		this.instances[key]['pointer'] = null;
	}
};
