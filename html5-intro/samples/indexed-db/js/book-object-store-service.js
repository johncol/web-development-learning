(function (app) {
	app.newService('book-object-store', function () {

		var generateId = function () {
			return Math.floor(Math.random() * 10000000);
		};

		var newBook = function (name, author, publicationDate, score) {
			return { id: generateId(), name: name, author: author, 'publication-date': publicationDate, score: score };
		};

		var sampleData = [
			newBook('Five little pigs', 'Agatha Christie', '1942-05-01', 5),
			newBook('Misery', 'Stephen King', '1987-06-08', 3),
			newBook('Creativity', 'Osho', '1999-11-30', 4),
			newBook('The gunslinger', 'Stephen King', '1982-06-10', 3),
			newBook('The wrong man', 'John Katzenbach', '2006-02-13', 4),
			newBook('Ender\'s Game', 'Orson Scott', '1985-01-15', 5)
		];

		const bookShelfDB = 'BookShelf';
		const bookOS = 'books';
		
		var request = indexedDB.open(bookShelfDB);

		request.onerror = function (e) {
			console.log('DB ' + bookShelfDB + ' error: ', e);
		};

		request.onupgradeneeded = function (e) {
			var db = e.target.result;
			var objectStore = db.createObjectStore(bookOS, { keyPath: 'id', autoIncrement: true });
			objectStore.createIndex('name', 'name', { unique: true });
			objectStore.createIndex('author', 'author', { unique: false });
			objectStore.transaction.oncomplete = function (e) {
				console.log(bookShelfDB + ' created.')
				var books = db.transaction(bookOS, 'readwrite').objectStore(bookOS);
				sampleData.forEach(function (book) {
					books.add(book);
				});
			};
		};

		return {};
	});
})(window.app);