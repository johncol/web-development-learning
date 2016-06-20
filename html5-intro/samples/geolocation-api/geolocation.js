(function() {

	var support = document.getElementById('support');
	var latitude = document.getElementById('latitude');
	var longitude = document.getElementById('longitude');
	var error = document.getElementById('error');

	if ('geolocation' in navigator) {
		support.innerHTML = 'Yes';
		navigator.geolocation.getCurrentPosition(function(position) {
			console.log('position: ', position);
			latitude.innerHTML = position.coords.latitude;
			longitude.innerHTML = position.coords.longitude;
		}, function(errorResponse) {
			console.log('error: ', errorResponse);
			error.innerHTML = errorResponse.message;
			latitude.innerHTML = 'unknown';
			longitude.innerHTML = 'unknown';
		});
	} else {
		support.innerHTML = 'No';
	}
})();