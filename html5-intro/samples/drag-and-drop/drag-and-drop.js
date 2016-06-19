(function() {
	var dropZone = document.getElementById('drop-zone');
	var draggables = document.getElementsByClassName('draggable');

	var toggleElementDragAndDropStyle = function (e) {
		document.getElementById(e.target.id).classList.toggle('being-dragged');
	};

	var toggleDropZoneStyle = function (e) {
		document.getElementById(e.target.id).classList.toggle('in-drop-zone');
	};

	var handleDragStart = function (e) {
		e.dataTransfer.setData('draggable', e.target.id);
		toggleElementDragAndDropStyle(e);
	};

	var handleDropInZone = function (e) {
		if (e.target.dataset.dropZone === 'true') {
			var draggableId = e.dataTransfer.getData('draggable');
			e.target.appendChild(document.getElementById(draggableId));
		}
		toggleDropZoneStyle(e);
	};

	var preventDefault = function (e) {
		e.preventDefault();
	};

	[].forEach.call(draggables, function (draggable) {
		draggable.ondragover = preventDefault;
		draggable.ondragstart = handleDragStart;
		draggable.ondragend = toggleElementDragAndDropStyle;
	});

	dropZone.ondragenter = toggleDropZoneStyle;
	dropZone.ondragleave = toggleDropZoneStyle;
	dropZone.ondragover = preventDefault;
	dropZone.ondrop = handleDropInZone;
})();