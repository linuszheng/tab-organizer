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

h_group = document.getElementById("group");
h_test = document.getElementById("test-btn");

// ---------------------------------- Functions --------------------------------

function test() {
	db.ref('tabs/' + 'asdfljk23423adfslk').set({
		name: "learn@vcs",
		url: "learn.vcs.net"
	});
}

// ----------------------------------- Testing -------------------------------------

if(window.location.hash){
	var g = window.location.hash.substring(1);
	h_group.innerHTML = g;
}

h_test.addEventListener("click", test, false);





