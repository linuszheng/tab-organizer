// --------------------------------- Firebase setup --------------------------

// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: "AIzaSyBSFz0nSPVYE2x21lB_uWCZ1BqrAKyBq2A",
	authDomain: "tab-organizer.firebaseapp.com",
	databaseURL: "https://tab-organizer.firebaseio.com",
	projectId: "tab-organizer",
	storageBucket: "tab-organizer.appspot.com",
	messagingSenderId: "779249146375",
	appId: "1:779249146375:web:f937801473c148d8d568a2",
	measurementId: "G-5YY0T52JH4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
// Get a reference to the database service
var db = firebase.database();


// --------------------------------- Other setup ----------------------------------

var h_group = document.getElementById("group");
var h_test = document.getElementById("test-btn");

var new_window;

// ---------------------------------- Functions --------------------------------

function testDb() {
	var today = new Date();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	db.ref('tabs/' + 'asdfljk23423adfslk').set({
		name: "curTime",
		url: time
	});
}

function testHash() {
	if(window.location.hash){
		var g = window.location.hash.substring(1);
		h_group.innerHTML = g;
	}
}

// ----------------------------------- Testing -------------------------------------


h_test.addEventListener("click", testHash, false);


// setTimeout(function(){
// 	new_window = window.open("https://stackoverflow.com/questions/7064998/how-to-make-a-link-open-multiple-pages-when-clicked");
// }, 10000);


// setTimeout(function(){
// 	new_window.close()
// }, 20000);










