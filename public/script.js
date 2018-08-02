var config = {
    apiKey: "AIzaSyC6tw_nRT7KV1Hk1iMY4nHrExbTVq1HS90",
    authDomain: "myolx-36e96.firebaseapp.com",
    databaseURL: "https://myolx-36e96.firebaseio.com",
    projectId: "myolx-36e96",
    storageBucket: "myolx-36e96.appspot.com",
    messagingSenderId: "220677066754"
};
firebase.initializeApp(config);


// messaging.onMessage(function (payLoad) {
//     console.log("onMessage:", payLoad);
// })
// var to = 'cdBuOZmETyM:APA91bFEnUojHzSebwzAaJIqEMLK8D6HMCpHp7lV8ZglR6QAFXTkdpx9vgDbQMeUImrCXoYVusiqizuiTq48Dm_A-_7ZCp7_0wThjlY0cuikl1QPshsV9KfO-v9udPbwHGOK_EQkrVxK'
// var key = 'AIzaSyB0Xk_1x3dJoUB04xcJwa0QNtVlZtrSW2k';
// var notification = {
//     'title': 'Welcome To OLX-PAKISTAN',
//     'body': 'Property Cars Bikes HomeApplinces Mobiles',
//     'icon': 'images/car.png'
// };
// var url = "https://fcm.googleapis.com/fcm/send";
// fetch(url, {
//     'method': 'POST',
//     'headers': {
//         'Authorization': 'key=' + key,
//         'Content-Type': 'application/json'
//     },
//     'body': JSON.stringify({
//         'notification': notification,
//         'to': to
//     })
// }).then(function (response) {
//     console.log(response);
// }).catch(function (error) {
//     console.error(error);
// });



const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);

function icons_search() {
    var iconData = document.getElementById("PropertyForRent").value;
    // console.log(iconData);
    var catagories = ['propertyForBuy', 'propertyForRent', 'cars', 'bikes', 'homeApplinces', 'jobs', 'services', 'mobilePhone'];
    var divAdds = document.getElementById('mainDiv');
    for (var i = 0; i < catagories.length; i++) {
        firestore.collection("catagories[i]").where("catagory", "==", iconData).get()
            .then(function (doc) {
                doc.forEach(element => {
                    // console.log(element.data());
                    var container = document.createElement('div');
                    container.setAttribute('class', 'container');
                    divAdds.appendChild(container);

                    var addsDiv = document.createElement('div');
                    addsDiv.setAttribute('class', 'addsDiv');
                    container.appendChild(addsDiv);

                    var images1 = document.createElement('div');
                    images1.setAttribute('class', 'images1');
                    addsDiv.appendChild(images1);

                    var imagesAdds = document.createElement('img');
                    imagesAdds.setAttribute('class', 'imagesAdds');
                    imagesAdds.setAttribute('src', element.data().imgs[0]);
                    images1.appendChild(imagesAdds);

                    var details = document.createElement('div');
                    details.setAttribute('class', 'details');
                    addsDiv.appendChild(details);

                    var title1 = document.createElement('h5');
                    title1.setAttribute('class', 'title');
                    title1.innerHTML = element.data().title;
                    details.appendChild(title1);

                    var catagory = document.createElement('h6');
                    catagory.setAttribute('class', 'catagory');
                    catagory.innerHTML = element.data().catagory;
                    details.appendChild(catagory);

                    var phone = document.createElement("h5");
                    phone.setAttribute('class', 'phone');
                    phone.innerHTML = "CELL #" + element.data().phone_number;
                    details.appendChild(phone);

                    var price = document.createElement('h4');
                    price.setAttribute('class', 'price');
                    price.innerHTML = "Rs : " + element.data().price;
                    details.appendChild(price);

                    var date = document.createElement('h6');
                    date.setAttribute('class', 'datez');
                    date.innerHTML = new Date();
                    details.appendChild(date);
                    // console.log(date);

                    var breakAds = document.createElement('hr');
                    divAdds.appendChild(breakAds);

                });
            });
    };
};

function goAddBikes() {
    window.location.href = "catagoryages/bikes.html";
};

function goAddCars() {
    window.location.href = "catagoryages/cars.html";
};

function goAddHomeApplinces() {
    window.location.href = "catagoryages/homeApplinces.html";
};

function goAddJobs() {
    window.location.href = "catagoryages/jobs.html";

};

function goAddMobilePhone() {
    window.location.href = "catagoryages/mobilePhone.html";
};

function goAddPropertyForBuy() {
    window.location.href = "catagoryages/propertyForBuy.html";
};

function goAddPropertyForRent() {
    window.location.href = "catagoryages/PropertyForRent.html";
};

function goAddServices() {
    window.location.href = "catagoryages/services.html";
};



if ('serviceWorker' in navigator) {

    // console.log('Service Worker is supported');
  
    // if service worker supported then register my service worker
    navigator.serviceWorker.register('firebase-messaging-sw.js').then(function (reg) {
    //   console.log('Successfully Register :^)', reg);
  
      reg.pushManager.subscribe({
        userVisibleOnly: true
      }).then(function (subscription) {
        // console.log('subscription:', subscription.toJSON());
        // GCM were used this endpoint
        console.log('endpoint:', subscription.endpoint);
      });
  
    }).catch(function (error) {
    //   console.log('SW Registration Failed: :^(', error);
    });
  
  }