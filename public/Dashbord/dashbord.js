// var db = firebase.firestore();


// document.getElementById('addProductForm').addEventListener('submit', (event) => {
//     event.preventDefault();

//     var name = document.getElementById('name').value;
//     var catagory = document.getElementById('catagory').value;
//     var title = document.getElementById('title').value;
//     var phone_number = document.getElementById('phone_number').value;
//     var address = document.getElementById('address').value;
//     var price = document.getElementById('price').value;


//     var product = {
//         name,
//         catagory,
//         title,
//         phone_number,
//         address,
//         price,
//     };

//     db.collection("users").get(user_eMail).add({name , catagory , title , phone_number , address , price})
//     .then(function(docRef) {
//         console.log("Document written with ID: ", docRef.id);
//     })
//     .catch(function(error) {
//         console.error("Error adding document: ", error);
//     });


// });



// let currentUserId;
// // firebase.auth().onAuthStateChanged(function (user) {
// //   if (user) {
// //     currentUser = user.uid;
// //     //console.log(currentUserId);


// //   .catch(function (err) {
// //     console.log('Unable to get permission to notify.', err);
// //   });

// // });
// // })

// firebase.auth().onAuthStateChanged(function(user) {
//   if(user) {
//     currentUserId = user.uid;
//   }
// })
//firebase messages

let currentUserId;

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    currentUserId = user.uid;
    //console.log(currentUserId);

    //console.log("user", currentUserId);

    const messaging = firebase.messaging();
    messaging.requestPermission().then(function () {
   //   console.log('Notification permission granted.');
      return messaging.getToken()
    }).then(function (token) {
     // console.log('currentToken****');
    //  console.log(token)
      firebase.firestore().collection("users")
        .doc(user.uid).update({
          token: token
        })

    })

    firebase.firestore().collection("users").doc(user.uid).get()
      .then((doc) => {
        //  console.log(doc.data());
         // console.log(doc.data().token);
      })  
  } 
});
const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);



function addProductForm(event) {
  event.preventDefault();

  //Getting Values
  var name = document.getElementById('name').value;
  var catagory = document.getElementById('catagory').value;
  var title = document.getElementById('title').value;
  var phone_number = document.getElementById('phone_number').value;
  var address = document.getElementById('address').value;
  var price = document.getElementById('price').value;
  var file = document.getElementById("file").files;

  let promises = uploadPicture(file);

  let urls = [];

  Promise.all(promises).then(function (res) {

    var products = {
      name: name,
      catagory: catagory,
      title: title,
      phone_number: phone_number,
      address: address,
      price: price,
      AdUserId: currentUserId,
      imgs: res,
      date: new Date()
    };

    firebase.firestore().collection(catagory).add(products)
      .then((res) => {
        // console.log('Ad Submitted');
      })
      .catch((e) => {
        var errorCode = e.code;
        var errorMessage = e.message;
        // console.log(errorMessage);
      })
  })
}


var storage = firebase.storage();
console.log("storage ==>", storage);
function uploadPicture(array) {
  let storageRef = storage.ref();

  let promises = [];

  for (let i = 0; i < array.length; i++) {

    promises.push(new Promise(function (resolve, reject) {
      let imgRef = storageRef.child("/images/" + Math.random() + ".jpg");
      imgRef.put(array[i])
        .then(function (snapshot) {
          imgRef.getDownloadURL().then(function (url) {
            console.log(url);
            resolve(url);
          })
        })
    }))

  }

  return promises;
}

var catagories = ['propertyForBuy', 'propertyForRent', 'cars', 'bikes', 'Home Applinces', 'Jobs', 'Services', 'Mobile Phone'];
var divAdds = document.getElementById('divAdds');
for (var i = 0; i < catagories.length; i++) {
  firebase.firestore().collection(catagories[i]).get()
    .then(function (doc) {
      doc.forEach(element => {
        var container = document.createElement('div');
        var ancer = document.createElement("a");
        ancer.href = "Javascript:void(0)";
        ancer.setAttribute("ancerId", element.id);
        ancer.addEventListener('click', gotoad);
        container.appendChild(ancer);
        container.setAttribute('class', 'container');
        divAdds.appendChild(container);

        var addsDiv = document.createElement('div');
        addsDiv.setAttribute('class', 'addsDiv');
        ancer.appendChild(addsDiv);

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
        date.innerHTML = element.data().date;
        details.appendChild(date);

        // var btn = document.createElement("button");
        // button.innerHTML = Favourite;
        

        if (currentUserId != element.data().AdUserId) {
          var button = document.createElement("button");
          button.setAttribute('class', "btn");
       //   console.log("yes");
        } else { //console.log("not"); }

        var breakAds = document.createElement('hr');
        divAdds.appendChild(breakAds);

      }
    });
  });
  }

function gotoad() {
  // alert('clicked');
  localStorage.setItem('ad_id', this.getAttribute("ancerId"));
  window.location.href = "../adPage/page.html";
}



// let promises = [];
// searches.forEach(Element => {
//   let index = 0;
//   firestore.collection(Element)
//     .get().then(snapshot => {
//       if (snapshot.empty == false) {
//         snapshot.forEach((doc) => {
//           let data = doc.data();
//           data.adId = snapshot.docs[index].id;
//           index++;
//           promises.push(data)
//           console.log(data)
//         })
//       }
//     })
//   index = 0;
// })
let promises = [];
  catagories.forEach(Element => {
      let index = 0;
      firestore.collection(Element)
          .get().then(snapshot => {
              if (snapshot.empty == false) {
                  snapshot.forEach((doc) => {
                      let data = doc.data();
                      data.adId = snapshot.docs[index].id;
                      index++;
                      promises.push(data)
                     // console.log(data)
                  })
              }
          })
      index = 0;
  })


function searchName() {
  let toSearch = (document.getElementById("searchbyname").value).toLowerCase();
  let list = document.getElementById("list");
  list.innerHTML = "";
  divAdds.innerHTML = null;
  

  // console.log(promises);

  for (var i = 0; i < promises.length; i++) {

    // for (var j = 0; j < promises[i].Catagory.length; j++) {
    //     let category = (promises[i].Catagory).toLowerCase();

    //     if (toSearch[0] == category[j]) {
    //         for (var l = 1; l <= toSearch.length; l++) {
    //             if (toSearch == category.slice(j, l)) {
    //                 list.innerHTML += `<option value="${category}" id="${promises[i].adId}">${category}</option>`
    //                 break;
    //             }
    //         }
    //     }
    // }

    for (var k = 0; k < promises[i].title.length; k++) {
      let title = (promises[i].title).toLowerCase();
      if (toSearch[0] == title[k]) {
        for (var m = 1; m <= title.length; m++) {
          if (toSearch == title.slice(k, m)) {
            // console.log(promises[i]);
            var container = document.createElement('div');
        var ancer = document.createElement("a");
        ancer.href = "Javascript:void(0)";
        ancer.setAttribute("ancerId", promises[i].id);
        ancer.addEventListener('click', gotoadd);
        container.appendChild(ancer);
        container.setAttribute('class', 'container');
        divAdds.appendChild(container);

        var addsDiv = document.createElement('div');
        addsDiv.setAttribute('class', 'addsDiv');
        ancer.appendChild(addsDiv);

        var images1 = document.createElement('div');
        images1.setAttribute('class', 'images1');
        addsDiv.appendChild(images1);


        var imagesAdds = document.createElement('img');
        imagesAdds.setAttribute('class', 'imagesAdds');
        imagesAdds.setAttribute('src', promises[i].imgs[0]);
        images1.appendChild(imagesAdds);

        var details = document.createElement('div');
        details.setAttribute('class', 'details');
        addsDiv.appendChild(details);

        var title1 = document.createElement('h5');
        title1.setAttribute('class', 'title');
        title1.innerHTML = promises[i].title;
        details.appendChild(title1);

        var catagory = document.createElement('h6');
        catagory.setAttribute('class', 'catagory');
        catagory.innerHTML = promises[i].catagory;
        details.appendChild(catagory);

        var phone = document.createElement("h5");
        phone.setAttribute('class', 'phone');
        phone.innerHTML = "CELL #" + promises[i].phone_number;
        details.appendChild(phone);

        var price = document.createElement('h4');
        price.setAttribute('class', 'price');
        price.innerHTML = "Rs : " + promises[i].price;
        details.appendChild(price);

        var date = document.createElement('h6');
        date.setAttribute('class', 'datez');
        date.innerHTML = promises[i].date;
        details.appendChild(date);
            // list.innerHTML += `<option value="${title}" title="${promises[i].catagory}" id="${promises[i].name}">${title}</option>`
            break;
          }
        }
      }

    }
  }


}

function gotoadd() {
  // alert('clicked');
  localStorage.setItem('ad_id', this.getAttribute("ancerId"));
  window.location.href = "../adPage/page.html";
}


// function searchName() {
//   var searchInput = document.getElementById("ser_Btn");
//   divAdds.innerHTML = "";
//   console.log(searchInput);

//   firebase.firestore().collection(searchInput).get()
//     .then(function (doc) {

//       doc.forEach(element => {
//         console.log(element.data());
//         var container = document.createElement('div');
//         container.setAttribute('class', 'contaioner');
//         divAdds.appendChild(container);

//         var addsDiv = document.createElement('div');
//         addsDiv.setAttribute('class', 'addsDiv');
//         container.appendChild(addsDiv);

//         var images = document.createElement('div');
//         images.setAttribute('class', 'images');
//         addsDiv.appendChild(images);

//         var imagesAdds = document.createElement('img');
//         imagesAdds.setAttribute('class', 'imagesAdds');
//         imagesAdds.setAttribute('src', element.data().imgs[0]);
//         images.appendChild(imagesAdds);

//         var details = document.createElement('div');
//         details.setAttribute('class', 'details');
//         addsDiv.appendChild(details);

//         var title = document.createElement('h5');
//         title.setAttribute('class', 'title');
//         title.innerHTML = element.data().title;
//         details.appendChild(title);

//         var catagory1 = document.createElement('h6');
//         catagory1.setAttribute('class', 'catagory1');
//         catagory1.innerHTML = element.data().catagory;
//         details.appendChild(catagory1);

//         var phone = document.createElement("h5");
//         phone.setAttribute('class', 'phone');
//         phone.innerHTML = "CELL # " + element.data().phone_number;
//         details.appendChild(phone);

//         var price = document.createElement('h4');
//         price.setAttribute('class', 'price');
//         price.innerHTML = "Rs : " + element.data().price;
//         details.appendChild(price);  

//         var date = document.createElement('h6');
//         date.setAttribute('class', 'date');
//         date.innerHTML = element.data().date;
//         details.appendChild(date);

//         var breakAds = document.createElement('br');
//         divAdds.appendChild(breakAds);
//       });
//     });
// };

// function catagorySearch() {
//   var searchCatagory = document.getElementById("catagoryForSearch").value;
//   divAdds.innerHTML = null;

//   firebase.firestore().collection("catagories[i]").where("catagory", "==", searchCatagory).get()
//     .then(function (doc) {
//       doc.forEach(element => {
//         // console.log(element.data());
//         var container = document.createElement('div');
//         container.setAttribute('class', 'contaioner');
//         divAdds.appendChild(container);

//         var addsDiv = document.createElement('div');
//         addsDiv.setAttribute('class', 'addsDiv');
//         container.appendChild(addsDiv);

//         var images = document.createElement('div');
//         images.setAttribute('class', 'images');
//         addsDiv.appendChild(images);

//         var imagesAdds = document.createElement('img');
//         imagesAdds.setAttribute('class', 'imagesAdds');
//         imagesAdds.setAttribute('src', element.data().imgs[0]);
//         images.appendChild(imagesAdds);

//         var details = document.createElement('div');
//         details.setAttribute('class', 'details');
//         addsDiv.appendChild(details);

//         var title = document.createElement('h5');
//         title.setAttribute('class', 'title');
//         title.innerHTML = element.data().title;
//         details.appendChild(title);

//         var catagory1 = document.createElement('h6');
//         catagory1.setAttribute('class', 'catagory1');
//         catagory1.innerHTML = element.data().catagory;
//         details.appendChild(catagory1);

//         var phone = document.createElement("h5");
//         phone.setAttribute('class', 'phone');
//         phone.innerHTML = "CELL #", element.data().phone_number;
//         details.appendChild(phone);

//         var price = document.createElement('h4');
//         price.setAttribute('class', 'price');
//         price.innerHTML = "Rs : " + element.data().price;
//         details.appendChild(price);

//         var date = document.createElement('h6');
//         date.setAttribute('class', 'date');
//         date.innerHTML = element.data().date;
//         details.appendChild(date);

//         var breakAds = document.createElement('br');
//         card_ads.appendChild(breakAds);
//       });
//     })
// }
// const messaging = firebase.messaging();
// messaging.requestPermission()
// .then(function() {
//   console.log("premission");
//   return messaging.getToken();
// })
// .then(function(token) {
// console.log(token);
// })
// .catch(function(error){
//   console.log(error);
// })


//Current User Id




