importScripts (src="https://www.gstatic.com/firebasejs/5.2.0/firebase-app.js");
importScripts (src="https://www.gstatic.com/firebasejs/5.2.0/firebase-messaging.js");

var config = {
    apiKey: "AIzaSyC6tw_nRT7KV1Hk1iMY4nHrExbTVq1HS90",
    authDomain: "myolx-36e96.firebaseapp.com",
    databaseURL: "https://myolx-36e96.firebaseio.com",
    projectId: "myolx-36e96",
    storageBucket: "myolx-36e96.appspot.com",
    messagingSenderId: "220677066754"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();

