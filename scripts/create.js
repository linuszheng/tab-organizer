
// -------------------------------------------------------- Global Variables --------------------------------------------------------
var h_title = document.getElementById("enter-title");
var h_url = document.getElementById("enter-url");
var h_create = document.getElementById("create-btn");

var title = "";
var url = "";
var isPopup = false;

// -------------------------------------------------------- DOM Interactions --------------------------------------------------------

function titleChanged() {
	title = h_title.value;
}

function urlChanged() {
	url = h_url.value;
}

async function createClicked() {
	if(title.length > 0 && url.length > 0) {
		await addToDB();
		h_title.value = "";
		h_url.value = "";
		titleChanged();
		urlChanged();
		setTimeout(function(){
			if(isPopup){
				window.close();
			}
		},100);
	}
}

h_title.addEventListener("change", titleChanged);
h_url.addEventListener("change", urlChanged);
h_create.addEventListener("click", createClicked);

// -------------------------------------------------------- Firebase --------------------------------------------------------

async function addToDB(){
	db.ref('tabs').push({
		title: title,
		url: url
	}, function(){
		return;
	});
}


// if this is a popup created by bookmarklet.js -----------------------------------------------------------------------

/*		Running a script (below) on the desired webpage will create a popup of this site with the link and title already filled
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