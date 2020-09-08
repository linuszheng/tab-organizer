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


// message sending and receiving -----------------------------------------------------------------------

function receivedMessage(event) {
	alert(event.data);
	h_title.value = event.data.title;
	h_url.value = event.data.url;
}

window.addEventListener("message", receivedMessage, false);

if(window.opener != null) {
	var w = window.opener;
	w.postMessage("ready","*");
}

// To send message (bookmarklet): -----------------------------------------------------------------------------------------------------

// javascript:(function(){
// 	var title = document.title;
// 	var url = window.document.URL;
// 	var target = "https://linuszheng.github.io/tab-organizer/create.html"
// 	var w = window.open(target);
// 	function receivedMessage(event) {
// 		alert(event.data);
// 		if(event.data == "ready" && event.origin == "https://linuszheng.github.io") {
// 			w.postMessage({
// 				title: title,
// 				url: url
// 			}, target);
// 		}
// 	}
// 	window.addEventListener("message", receivedMessage, false);
// })();


