(function (app) {
	app.newService('book', function () {

		const bookShelfDB = 'BookShelf';
		const bookOS = 'books';
		
		var db;

		var openDBRequest = indexedDB.open(bookShelfDB);

		openDBRequest.onerror = function (e) {
			console.log('DB ' + bookShelfDB + ' error: ', e);
		};

		openDBRequest.onsuccess = function (e) {
			db = event.target.result;
		};

		var generateId = function () {
			return Math.floor(Math.random() * 10000000);
		};

		return {

			save: function (book) {
				if (!('id' in book)) {
					book.id = generateId();
				}
				var transaction = db.transaction([bookOS], 'readwrite');
				var objectStore = transaction.objectStore(bookOS);
				var request = objectStore.add(book);
				return new Promise(function (resolve, reject) {
					request.onsuccess = function (e) {
						resolve({
							data: book,
							status: 'Book "' + book.name + '" was saved'
						});
					};
					request.onerror = function (e) {
						reject({
							data: book,
							status: e.target.error.message
						});
					};
				});
			},

			list: function () {
				var transaction = db.transaction([bookOS]);
				var objectStore = transaction.objectStore(bookOS);
				var cursor = objectStore.openCursor();
				return new Promise(function (resolve, reject) {
					var books = [];
					cursor.onsuccess = function (e) {
						var cursor = e.target.result;
						if (cursor) {
							books.push(cursor.value);
							cursor.continue();
						} else {
							resolve(books);
						}
					};
				});
			}

		};

	});
})(window.app);