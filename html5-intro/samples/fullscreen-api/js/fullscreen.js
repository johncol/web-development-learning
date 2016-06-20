(function() {

	/**
	 * https://davidwalsh.name/fullscreen
	 */

	var launchFullscreen = function(element) {
		if (element.requestFullscreen) {
			element.requestFullscreen();
		} else if (element.mozRequestFullScreen) {
			element.mozRequestFullScreen();
		} else if (element.webkitRequestFullscreen) {
			element.webkitRequestFullscreen();
		} else if (element.msRequestFullscreen) {
			element.msRequestFullscreen();
		}
	};

	var exitFullscreen = function() {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		}
	}

	var carousel = document.getElementById('carousel');
	var button = document.getElementById('go-fullscreen');

	button.addEventListener('click', function (e) {
		launchFullscreen(carousel);
	});


})();