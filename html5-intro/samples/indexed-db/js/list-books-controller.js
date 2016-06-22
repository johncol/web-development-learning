(function (app) {
	app.newController('list-books', function () {

		var dom = {
			table: $('table tbody'),
		};

		var addColumn = function (row, value) {
			row.append($('<td></td>').html(value));
		};

		var addRow = function (table, book) {
			var row = $('<tr></tr>');
			addColumn(row, book.name);
			addColumn(row, book.author);
			addColumn(row, book['publication-date']);
			addColumn(row, book.score);
			table.append(row);
		};

		setTimeout(function () {
			app.getService('book').list().then(function (books) {
				console.log('books: ', books);
				[].forEach.call(books, function (book) {
					addRow(dom.table, book);
				});
			});
		}, 500);

	});
})(window.app);