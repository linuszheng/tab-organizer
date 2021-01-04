
// Add this code to a bookmarklet; tested on Chrome and Safari
// This will open the website and automatically close it when finished saving tab info

javascript:(function(){
	var title = document.title;
	var url = window.document.URL;
	var target = "https://linuszheng.github.io/tab-organizer/create.html";
	var w = window.open(target);
	function receivedMessage(event) {
		if(event.data == "ready" && event.origin == "https://linuszheng.github.io") {
			w.postMessage({
				title: title,
				url: url
			}, target);
		}
	}
	window.addEventListener("message", receivedMessage, false);
})();