var uid;
var tabsRef;
var tagsRef;

var logoutBtn = document.getElementById('logout-btn');

function makeLoginDOMElements(){
    document.getElementById('main-container').innerHTML = `
            <p>Email</p>
			<input type="email" id="email-field">
			<p>Password</p>
			<input type="password" id="pw-field">
            <button type="submit" id="login-btn">Sign Up / Log In</button>
            `;
}

function setLoginDOMListeners(){
    let emailField = document.getElementById('email-field');
    let pwField = document.getElementById('pw-field');
    let loginBtn = document.getElementById('login-btn');

    var email = '';
    var pw = '';

    emailField.addEventListener('change',()=>{
        email = emailField.value;
    });
    pwField.addEventListener('change',()=>{
        pw = pwField.value;
    });
    loginBtn.addEventListener('click',()=>{
        auth.signInWithEmailAndPassword(email, pw).catch(()=>{
            auth.createUserWithEmailAndPassword(email, pw).catch(()=>{
                alert('error logging in!');
            });
        });
    });
}

function setLogOutDOMListener(){
    logoutBtn.addEventListener('click',()=>{
        auth.signOut();
    })
}
setLogOutDOMListener();

function setAuthListeners(callbackOnLogin){
    auth.onAuthStateChanged((user)=>{
        if(user) {
            uid = user.uid;
            tabsRef = db.ref(uid).child('tabs');
            tagsRef = db.ref(uid).child('tags');
            logoutBtn.style.visibility = 'visible';
            callbackOnLogin();
        } else {
            logoutBtn.style.visibility = 'hidden';
            makeLoginDOMElements();
            setLoginDOMListeners();
        }
    });
}