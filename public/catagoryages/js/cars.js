
  const firestore = firebase.firestore();
  const settings = {/* your settings... */ timestampsInSnapshots: true};
  firestore.settings(settings);

var divAdds = document.getElementById('divAdds');
firebase.firestore().collection("cars").get()
  .then(function (doc) {
    doc.forEach(element => {
      // var container = document.createElement('div');
      // container.setAttribute('class', 'container');
      // divAdds.appendChild(container);
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
      title1.innerHTML = "TITTLE: " + element.data().title;
      details.appendChild(title1);

      var catagory = document.createElement('h6');
      catagory.setAttribute('class', 'catagory');
      catagory.innerHTML = "Catagory " + element.data().catagory;
      details.appendChild(catagory);

      var phone = document.createElement("h5");
      phone.setAttribute('class', 'phone');
      phone.innerHTML = "CELL #" + element.data().phone_number;
      details.appendChild(phone);

      var price = document.createElement('h4');
      price.setAttribute('class', 'price');
      price.innerHTML = "Rs : " + element.data().price;
      details.appendChild(price);

      // var date = document.createElement('h6');
      // date.setAttribute('class', 'datez');
      // date.innerHTML = element.data().date;
      // details.appendChild(date);

      var breakAds = document.createElement('hr');
      divAdds.appendChild(breakAds);

    });
  })

  
function gotoad() {
  // alert('clicked');
  localStorage.setItem('ad_id', this.getAttribute("ancerId"));
  window.location.href = "../adPage/page.html";
}