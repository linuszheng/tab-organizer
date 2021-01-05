function makeLoginElements(){
    document.getElementById('main-container').innerHTML = `
            <p>Email</p>
			<input type="email" id="email-field">
			<p>Password</p>
			<input type="password" id="pw-field">
            <button type="submit" id="login-btn">Sign Up / Log In</button>
            `;
}

function setLoginListeners(){
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