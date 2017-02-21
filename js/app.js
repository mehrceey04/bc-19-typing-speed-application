// Initialize Firebase
var config = {
  apiKey: "AIzaSyDTtXPIG5QLuOpEou_03cW9bwWlJsT55cU",
  authDomain: "typing-speed-app-c0ad7.firebaseapp.com",
  databaseURL: "https://typing-speed-app-c0ad7.firebaseio.com",
  storageBucket: "typing-speed-app-c0ad7.appspot.com",
  messagingSenderId: "461044281575"
};
firebase.initializeApp(config);
//get user input
var txtEmail = document.getElementById('email');
var txtPassword = document.getElementById('password');
var btnLogin = document.getElementById('sign-in');
var btnSignUp = document.getElementById('sign-up');
 
//add login event
btnLogin.addEventListener('click', e => {
  var email = txtEmail.value;
  var pass = txtPassword.value;
  var auth = firebase.auth(); 
  var promise = auth.signInWithEmailAndPassword(email, pass);
  promise.catch(e => console.log(e.message));
});

 //add signUp event
  btnSignUp.addEventListener('click', e => {
  	var email = txtEmail.value;
    var pass = txtPassword.value;
    var auth = firebase.auth();
    
    var promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
  });
 
 // add a real-time authentication listener
 