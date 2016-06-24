(function ($) {

	var content = {
		'index': $('#index'),
		'page-2': $('#page-2'),
		'page-3': $('#page-3'),
		'page-4': $('#page-4')
	};

	var hideAllBut = function (visiblePage) {
		for (var page in content) {
			content[page].hide();
		}
		content[visiblePage || 'index'].show();
	};

	$('button').on('click', function (event) {
		var target = $(event.target).data('target');
		history.pushState(target, target, target + '.html');
		hideAllBut(target);
	});

	window.addEventListener('popstate', function (event) {
		hideAllBut(event.state);
	});

	hideAllBut('index');

})(jQuery);