// --------------------------------- Getting elements from DOM ----------------------------------

var h_title = document.getElementById("enter-title");
var h_url = document.getElementById("enter-url");
var h_create = document.getElementById("create-btn");

var title = "";
var url = "";

function titleChanged() {
	title = h_title.value;
}

function urlChanged() {
	url = h_url.value;
}

function createClicked() {
	if(title.length > 0 && url.length > 0) {
		db.ref('tabs').push({
			title: title,
			url: url
		}, function() {
			title = "";
			url = "";
			h_title.value = "";
			h_url.value = "";
		});
	}
}

h_title.addEventListener("change", titleChanged);
h_url.addEventListener("change", urlChanged);
h_create.addEventListener("click", createClicked);

