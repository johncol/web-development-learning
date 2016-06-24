(function($) {

	var content = document.getElementById('content');
	var input = document.getElementById('nth-prime-number');
	var output = document.getElementById('output');
	var primeNumber = $('#prime-number').hide();
	var loader = $('#loading').hide();

	if (!window.Worker) {
		content.innerHTML = 'Sorry, your browser does not support web workers..';
		return;
	}

	var primeWorker = new Worker('prime-numbers-worker.js');

	primeWorker.onmessage = function (message) {
		console.log('A message arrived from the worker: ', message);
		output.innerHTML = message.data;
		primeNumber.show();
		loader.hide();
	};

	document.getElementById('calc-button').addEventListener('click', function (event) {
		if (input.value !== '') {
			output.innerHTML = '';
			primeWorker.postMessage(input.value);
			loader.show();
		}
	});

})(jQuery);