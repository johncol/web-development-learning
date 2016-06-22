(function (window) {

	/**
	 *  preparing indexedDB
	 */
	window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"}; // This line should only be needed if it is needed to support the object's constants for older browsers
	window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;


	/**
	 * services and controllers
	 */
	var services = {};
	var controllers = {};
	
	/**
	 *  new simple app
	 */
	window.app = {
		newService: function (name, service) { 
			services[name] = service();
		},
		newController: function (name, controller) { 
			controllers[name] = controller;
		},
		getService: function (name) {
			return services[name];
		},
		getController: function (name) {
			return controllers[name];
		}
	};

})(window);