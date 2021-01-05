// --------------------------------- Global Variables ----------------------------------

var keys = [];
var tabs = [];
var checkedTabs = [];

var h_tabs_list;

var canLink = true;

var tags = [];

// ---------------------------- Structure ----------------------------

class Tab {
	title;	// String
	url;	// String
	tags;	// list of Strings
}

// ---------------------------- DOM Elements ----------------------------

var assignTagsContainer;
var addTagNode;
var addTagSubmitBtn;
var addTagField;

// ---------------------------- DOM Interactions ----------------------------

function startListeners(){
	assignTagsContainer = document.getElementById('assign-tags-container');
	addTagNode = document.getElementById('add-tag');
	addTagSubmitBtn = document.getElementById('add-tag-submit-btn');
	addTagField = document.getElementById('add-tag-field');

	document.getElementById('deploy-btn').addEventListener('click', function(e){
		var time = document.getElementById('enter-minutes').value;
		if(time<=0) return;
		openTabsForTime(checkedTabs, time*60*1000);
	});
	
	document.getElementById('trash').addEventListener('click', async function(e){
		let tabsReversed = [...checkedTabs].sort().reverse(); // start deleting from bottom to top
		removeCheckedTabsFromDB().then(async ()=>{
			for(const i of tabsReversed) {
				removeTabFromArrays(i);
				h_tabs_list.children[i].remove();
			}
		})
	});

	document.getElementById('assign-tags-btn').addEventListener('click',()=>{
		let cl = assignTagsContainer.classList.length;
		if(cl > 0) {
			assignTagsContainer.classList.remove('hidden');
		}
		else assignTagsContainer.classList.add('hidden');
	});

	addTagSubmitBtn.addEventListener('click', ()=>{
		if(addTagField.classList.length > 0){	// if field hidden (this means addTagSubmitBtn is a +)
			addTagField.classList.remove('hidden');
			addTagSubmitBtn.innerHTML = '&#10003';
		} else if (addTagField.value.length > 0){	// else addTagSubmitBtn is a checkmark
			let newTag = addTagField.value;
			if(!tags.includes(newTag)){
				addTagField.value = '';
				tags.push(newTag);
				addTagToDOM(newTag);
				addTagToDB(newTag);
				addTagSubmitBtn.innerHTML = '+';
				addTagField.classList.add('hidden');
			}
		}
	});
}

function addTagToDOM(tagName) {
	let newTagNode = document.createElement('div');
	newTagNode.classList.add('top-tag');
	newTagNode.innerText = tagName;
	assignTagsContainer.insertBefore(newTagNode, addTagNode);
}

function createTabRow(tab) {
	var h_list_elem = document.createElement('li');
	var h_container = document.createElement('div');
	var h_title = document.createElement('a');
	var h_url = document.createElement('a');
	var h_tag = document.createElement('div');
	var h_checkbox = document.createElement('input');
	var h_burn = document.createElement('div');
	
	h_title.innerText = tab.title;
	h_url.innerText = tab.url;
	h_url.href = tab.url;
	h_tag.innerText = 'null';
	h_checkbox.type = 'checkbox';
	h_burn.innerText = 'Burn';

	h_container.classList.add('tab-container');
	h_checkbox.classList.add('tab-checkbox');
	h_burn.classList.add('tab-burn');
	h_url.style.fontSize = '10px';
	h_tag.style.fontSize = '12px';

	h_container.appendChild(h_title);
	h_container.appendChild(document.createElement('br'));
	h_container.appendChild(h_url);
	h_container.appendChild(h_tag);
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
	h_burn.addEventListener('click', async function(e){
		var li = e.target.closest('li');
		var index = Array.from(h_tabs_list.children).indexOf(li);
		window.open(tabs[index].url);
		await removeTabFromDB(index);
		removeTabFromArrays(index);
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
					break;
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

// ------------------------------------------------ Misc Functions ------------------------------------------------

function displayTabs(){
	for(tab of tabs){
		createTabRow(tab);
	}
}

function displayTags(){
	for(tag of tags){
		addTagToDOM(tag);
	}
}

function openTabsForTime(indices, time) {
	for(var i in indices) {
		var url = tabs[indices[i]].url;
		var tab = window.open(url);
		function closeTab(tab, time){
			setTimeout(function(){
				tab.close();
			}, time);
		}
		closeTab(tab, time);
	}
}

function removeTabFromArrays(index){
	keys.splice(index, 1);
	tabs.splice(index, 1);
	for(var i in checkedTabs){
		if(checkedTabs[i]==index){
			checkedTabs.splice(i, 1);
		}
	}
}

// ---------------------------------- Firebase -------------------------------------


function displayTabsFromDB() {
	tabsRef.once('value').then(function(snapshot){
		document.getElementById("loading").remove();
		snapshot.forEach(function(childSnapshot){
			keys.push(childSnapshot.key);
			tabs.push(childSnapshot.val());
		});
		displayTabs();
	});
}

function displayTagsFromDB() {
	tagsRef.once('value').then(function(snapshot){
		tags = Object.keys(snapshot.val());
		displayTags();
	});
}

function addTagToDB(tag) {
	tagsRef.child(tag).update({
		tabs: false,
	});
}

async function removeTabFromDB(index){
	tabsRef.child(keys[index]).remove().then(function(){
		return;
	});
}

async function removeCheckedTabsFromDB(){
	tabsToRemove = {};
	for(i in checkedTabs){
		tabsToRemove[keys[checkedTabs[i]]]=null;
	}
	tabsRef.update(tabsToRemove).then(async ()=>{return;});
}

function populateWithLinks(){
	titles = ['mit admissions blog', 'aops', 'gdrive', 'gmail', 'post run stretches']
	urls = ['https://mitadmissions.org/blogs/',
			'https://artofproblemsolving.com/',
			'https://drive.google.com/drive/u/0/folders/1sXsCl4Hf0E5skaZxnTgkJR4m8kg2ctaW',
			'https://mail.google.com/mail/u/0/',
			'https://www.runnersworld.com/training/g20862016/cool-down-routine/']
	
	for (var i in titles){
		tabsRef.push({
			title: titles[i],
			url: urls[i]
		})
	}
	
}


setAuthListeners(()=>{
	// &nbsp = space
	// &#10003 = checkmark
	document.getElementById('main-container').innerHTML = `
			<img src="assets/loading2.gif" id="loading"/>
			<div id="assign-tags-container" class="hidden">
				<div id="add-tag" class="top-tag">
					<input type="text" id="add-tag-field" class="hidden">
					<button id="add-tag-submit-btn">+</button>
				</div>
			</div>
			<ul id="tabs-list">
			</ul>`;
	h_tabs_list = document.getElementById('tabs-list');
	// populateWithLinks();
	displayTabsFromDB();
	displayTagsFromDB();
	startListeners();
});
		