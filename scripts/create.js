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

function receivedMessage(event) {
	var data = JSON.parse(event.data);
	h_title.value = data.title;
	h_url.value = data.url;
}

h_title.addEventListener("change", titleChanged);
h_url.addEventListener("change", urlChanged);
h_create.addEventListener("click", createClicked);

window.addEventListener("message", receivedMessage, false);


/* -----------------------------------------------------------------------------------------------------
// To send message:

javascript:(function(){
	var title = document.title;
	var url = window.document.href;
	var w = window.open("https://linuszheng.github.io/tab-organizer/create.html");
	w.postMessage(JSON.stringify({
		title: title,
		url: url
	}), "https://linuszheng.github.io/tab-organizer/create.html");
})();
*/

