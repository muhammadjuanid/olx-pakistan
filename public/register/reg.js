var db = firebase.firestore()

function onSubmit(event){

    event.preventDefault();
    var name = document.getElementById("name").value;
    var eMail = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    firebase.auth().createUserWithEmailAndPassword(eMail, password)
    .then(function(res){
        localStorage.setItem("currentUserId" , res.user.uid)
        // console.log("res ===> " , res.user.uid);

        db.collection("users").doc(res.user.uid).set({name , eMail})
        .then(() => {
            // console.log("db added");
            window.location.href="../Dashbord/dashbord.html"
        })
        .catch((e) => {
            // console.log("error in added");
        })
    })
    // .catch(function(error) {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     // ...
    //   });
      
}