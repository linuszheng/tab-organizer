
var h_title = document.getElementById("enter-title");
var h_url = document.getElementById("enter-url");
var h_create = document.getElementById("create-btn");

var title = "";
var url = "";
var isPopup = false;

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
			h_title.value = "";
			h_url.value = "";
			titleChanged();
			urlChanged();
			setTimeout(function(){
				if(isPopup){
					window.close();
				}
			},100);
		});
	}
}

h_title.addEventListener("change", titleChanged);
h_url.addEventListener("change", urlChanged);
h_create.addEventListener("click", createClicked);

// if popup -----------------------------------------------------------------------

/*		Conveniently, running a script (below) on the desired webpage will create a popup of this site with the link and title already filled
		in. Cross-origin communication between this webpage and any webpage on the Internet (injected with the bookmarklet) limits the access that
		one site has on the other. Because the new popup window cannot be directly accessed, we use postMessage to communicate between one
		window and the other.		*/

function receivedMessage(event) {
	h_title.value = event.data.title;
	h_url.value = event.data.url;
	titleChanged();
	urlChanged();
}


if(window.opener != null) {
	isPopup = true;
	var w = window.opener;
	w.postMessage("ready","*");
	window.addEventListener("message", receivedMessage, false);
}

// script to create popup and send message (bookmarklet): ----------------------------------------------------------------------------

// javascript:(function(){
// 	var title = document.title;
// 	var url = window.document.URL;
// 	var target = "https://linuszheng.github.io/tab-organizer/create.html";
// 	var w = window.open(target);
// 	function receivedMessage(event) {
// 		if(event.data == "ready" && event.origin == "https://linuszheng.github.io") {
// 			w.postMessage({
// 				title: title,
// 				url: url
// 			}, target);
// 		}
// 	}
// 	window.addEventListener("message", receivedMessage, false);
// })();


