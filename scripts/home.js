// --------------------------------- Variables ----------------------------------

var keys = [];
var tabs = [];
var new_window;

var h_tabs_list = document.getElementById('tabs-list');

// ---------------------------------- Functions -----------------------------------

function displayTabs(){
	for(tab of tabs){
		var h_list_elem = document.createElement('li');
		var h_title = document.createElement('a');
		var h_url = document.createElement('a');
		var h_group = document.createElement('div')
		h_title.innerText = tab.title;
		h_url.innerText = tab.url;
		h_group.innerText = 'no group';
		h_list_elem.appendChild(h_title);
		h_list_elem.appendChild(h_url);
		h_list_elem.appendChild(h_group);
		h_tabs_list.appendChild(h_list_elem);
	}
}

// ---------------------------------- Listeners -------------------------------------


db.ref('tabs').once('value').then(function(snapshot){
	snapshot.forEach(function(childSnapshot){
		keys.push(childSnapshot.key);
		tabs.push(childSnapshot.val());
	});
	displayTabs();
});


// ----------------------------------- Testing -------------------------------------


// function testHash() {
// 	if(window.location.hash){
// 		var g = window.location.hash.substring(1);
// 	}
// }


// setTimeout(function(){
// 	new_window = window.open("https://stackoverflow.com/questions/7064998/how-to-make-a-link-open-multiple-pages-when-clicked");
// }, 10000);

// setTimeout(function(){
// 	new_window.location.href = "https://learn.vcs.net/login/index.php";
// }, 15000);


// setTimeout(function(){
// 	new_window.close()
// }, 20000);










