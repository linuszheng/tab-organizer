// --------------------------------- Firebase setup --------------------------

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
// Get references to database and auth
let db = firebase.database();
let auth = firebase.auth();

