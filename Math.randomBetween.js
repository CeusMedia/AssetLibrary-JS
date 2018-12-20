Math.randomBetween = function(min, max) {
	if(min > max)
		return -1;
	if(min == max)
		return min;
	return min + parseInt(Math.random() * (max-min+1));
}