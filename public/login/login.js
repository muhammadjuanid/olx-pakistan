var db = firebase.firestore();

function logIn(event){
    event.preventDefault();
    var eMail = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(eMail, password)
    .then((res) => {
        // console.log(res)
        localStorage.setItem("currentUserId" , res.user.uid)
        window.location.href="../Dashbord/dashbord.html"
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // console.log(errorMessage);
        // ...
      });
}

firebase.auth().onAuthStateChanged(function(user){
    if(user){
        
        window.location.href = "../Dashbord/dashbord.html";
    }
})