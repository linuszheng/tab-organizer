// --------------------------------- Variables ----------------------------------

var keys = [];
var tabs = [];
var new_window;

var h_tabs_list = document.getElementById('tabs-list');

var canLink = true;
var checkedTabs = [];

var tabsOpen = []; // for testing purposes only

// ---------------------------------- Functions -----------------------------------

function displayTabs(){
	for(tab of tabs){
		var h_list_elem = document.createElement('li');
		var h_container = document.createElement('div');
		var h_title = document.createElement('a');
		var h_url = document.createElement('a');
		var h_group = document.createElement('div');
		var h_checkbox = document.createElement('input');
		var h_burn = document.createElement('div');
		
		h_title.innerText = tab.title;
		h_url.innerText = tab.url;
		h_url.href = tab.url;
		h_group.innerText = 'null';
		h_checkbox.type = 'checkbox';
		h_burn.innerText = 'Burn';

		h_container.classList.add('tab-container');
		h_checkbox.classList.add('tab-checkbox');
		h_burn.classList.add('tab-burn');
		h_url.style.fontSize = '10px';
		h_group.style.fontSize = '12px';

		h_container.appendChild(h_title);
		h_container.appendChild(document.createElement('br'));
		h_container.appendChild(h_url);
		h_container.appendChild(h_group);
		h_list_elem.appendChild(h_container);
		h_list_elem.appendChild(h_checkbox)
		h_list_elem.appendChild(h_burn);
		h_tabs_list.appendChild(h_list_elem);
		h_list_elem.addEventListener('click', function(e){
			if (!canLink) return;
			var li = e.target.closest('li');
			var index = Array.from(h_tabs_list.children).indexOf(li);
			window.open(tabs[index].url);
		});
		h_burn.addEventListener('click', function(e){
			var li = e.target.closest('li');
			var index = Array.from(h_tabs_list.children).indexOf(li);
			window.open(tabs[index].url);
			removeTab(index);
			keys.splice(index, 1);
			tabs.splice(index, 1);
			h_tabs_list.removeChild(li);
		});
		h_checkbox.addEventListener('input', function(e){
			var li = e.target.closest('li');
			var index = Array.from(h_tabs_list.children).indexOf(li);
			if(e.target.checked){
				checkedTabs.push(index);
			} else {
				for(i in checkedTabs){
					if(checkedTabs[i]==index){
						checkedTabs.splice(i, 1);
					}
				}
			}
		});
		h_burn.addEventListener('mouseover', function(e){
			var li = e.target.closest('li');
			li.classList.add('burn');
			canLink = false;
		});
		h_burn.addEventListener('mouseout', function(e){
			var li = e.target.closest('li');
			li.classList.remove('burn');
			canLink = true;
		});
		h_checkbox.addEventListener('mouseover', function(e){canLink = false;});
		h_checkbox.addEventListener('mouseout', function(e){canLink = true;});
	}
}

function openTabsForTime(indices, time) {
	for(var i in indices) {
		var url = tabs[indices[i]].url;
		tabsOpen.push(window.open(url));
	}
	setTimeout(function(){
		for(var i in tabsOpen) {
			tabsOpen[i].close();
		}
	}, time);
}

document.getElementById('deploy-btn').addEventListener('click', function(e){
	var time = document.getElementById('enter-minutes').value;
	if(time<=0) return;
	openTabsForTime(checkedTabs, time*60*1000);
});

// ---------------------------------- Firebase -------------------------------------

function removeTab(index){
	db.ref('tabs').child(keys[index]).remove();
}

db.ref('tabs').once('value').then(function(snapshot){
	document.getElementById("loading").remove();
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










