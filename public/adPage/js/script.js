var config = {
    apiKey: "AIzaSyC6tw_nRT7KV1Hk1iMY4nHrExbTVq1HS90",
    authDomain: "myolx-36e96.firebaseapp.com",
    databaseURL: "https://myolx-36e96.firebaseio.com",
    projectId: "myolx-36e96",
    storageBucket: "myolx-36e96.appspot.com",
    messagingSenderId: "220677066754"
};
firebase.initializeApp(config);


// const firestore = firebase.firestore();
// const settings = {/* your settings... */ timestampsInSnapshots: true};
// firestore.settings(settings);

const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);

let currentUserId;
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      currentUserId  = user.uid;
     // localStorage.setItem("currentUserId" , currentUserId);
    //console.log(currentUserId + "<====userID");
    }
  });
//   console.log("user" , currentUserId);

    //Ad Id

var ad_id = localStorage.getItem("ad_id");
// console.log(ad_id , "adddddd");

var divAdds = document.getElementById("addDiv");

var catagories = ['propertyForBuy', 'propertyForRent', 'cars', 'bikes', 'homeApplinces', 'jobs', 'services', 'mobilePhone'];
for(var i = 0 ; i < catagories.length; i++){

    firebase.firestore().collection(catagories[i])
       .onSnapshot((docs) => {
            docs.forEach((doc) => {
                // console.log('docs ***', doc.id);
            })
          });
firebase.firestore().collection(catagories[i]).get()
.then(function(doc){
    doc.forEach(element => {
        // console.log(element.id);
        if(ad_id == element.id){
            // alert("yes");
            localStorage.setItem("AdUserId" , element.data().AdUserId);
            var container = document.createElement('div');
      container.setAttribute('class', 'contaioner m-5 card btn');
      divAdds.appendChild(container);

      var addsDiv = document.createElement('div');
      addsDiv.setAttribute('class', 'addsDiv');
      container.appendChild(addsDiv);

      var images = document.createElement('div');
      images.setAttribute('class', 'images');
      addsDiv.appendChild(images);

      var imagesAdds = document.createElement('img');
      imagesAdds.setAttribute('class', 'imagesAdds');
      imagesAdds.setAttribute('src', element.data().imgs[0]);
      images.appendChild(imagesAdds);

      var details = document.createElement('div');
      details.setAttribute('class', 'details');
      addsDiv.appendChild(details);

      var title = document.createElement('h5');
      title.setAttribute('class', 'title');
      title.innerHTML = element.data().title;
      details.appendChild(title);

      var catagory1 = document.createElement('h6');
      catagory1.setAttribute('class', 'catagory1');
      catagory1.innerHTML = element.data().catagory;
      details.appendChild(catagory1);

      var phone = document.createElement("h5");
      phone.setAttribute('class' , 'phone');
      phone.innerHTML = "CELL # " + element.data().phone_number;
      details.appendChild(phone);

      var price = document.createElement('h4');
      price.setAttribute('class', 'price');
      price.innerHTML = "Rs : " + element.data().price;
      details.appendChild(price);

      var date = document.createElement('h6');
      date.setAttribute('class', 'date');
      date.innerHTML = element.data().date;
      details.appendChild(date);

      var button = document.createElement("button");
      button.setAttribute("class" , "btn btn-outline-success");
      button.innerHTML = "Chat To Adder"
      button.href="Javascript:void(0)";
      button.addEventListener('click', goChat);
      addsDiv.appendChild(button);

      var breakAds = document.createElement('br');
      divAdds.appendChild(breakAds);
        }
        // else{alert("sorry");}
    });
})
}


function goChat(){
    // alert('clicked');
    localStorage.setItem('ad_id', this.getAttribute("ancerId"));
    window.location.href = "../messages/messages.html";
  }