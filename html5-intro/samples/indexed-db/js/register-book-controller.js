(function (app) {
	app.newController('register-book', function () {

		var dom = {
			submitButton: $('button[data-function=submit]'),
			cancelButton: $('button[data-function=cancel]'),
			form: $('form'),
			successMessage: $('#success-message'),
			errorMessage: $('#error-message'),
			requiredFields: $('[required]'),
		};

		var formData = function (form, selector, container) {
			form.find(selector).each(function (index, element) {
				var $element = $(element);
				container[$element.attr('name')] = $element.val().trim();
			});
		};

		var buildBook = function () {
			var book = {};
			formData(dom.form, 'input', book);
			formData(dom.form, 'textarea', book);
			return book;
		};

		var handleResult = function (success, result) {
			console.log('Result: ', result);
			if (success) {
				dom.successMessage.html(result.status).show();
				dom.errorMessage.hide();
				dom.form[0].reset();
			} else {
				dom.successMessage.hide();
				dom.errorMessage.html(result.status).show();
			}
			window.scrollTo(0, 0);
		};

		var isValid = function () {
			var valid = true;
			dom.requiredFields.each(function (index, element) {
				valid = valid && $(element).val().trim() !== '';
			});
			return valid;
		};

		var saveBook = function () {
			var book = buildBook();
			app.getService('book').save(book)
				.then(function (result) { 
					handleResult(true, result);
				})
				.catch(function (result) {
					handleResult(false, result);
				});
		};

		dom.submitButton.on('click', function (e) {
			e.preventDefault();
			if (isValid()) {
				saveBook();
			} else {
				handleResult(false, {
					status: 'Not all the required fields have been filled'
				});
			}
		});

		dom.cancelButton.on('click', function (e) {
			dom.successMessage.html('').hide();
			dom.errorMessage.html('').hide();
			dom.form[0].reset();
			window.scrollTo(0, 0);
		});

	});
})(window.app);