
var isPrime = function (n) {
	for (var i = 2; i < n; i++) {
		if (n % i == 0) return false;
	}
	return true;
};

var calculateIt = function (nth) {
	var count = 0;
	var n = 1;
	while (count < nth) {
		if (isPrime(n)) count++;
		n++;
	}
	return n - 1;
};

onmessage = function (message) {
	var nth = message.data;
	var prime = calculateIt(nth);
	postMessage(prime);
};