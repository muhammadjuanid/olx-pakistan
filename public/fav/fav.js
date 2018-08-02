// var fav1 = localStorage.getItem("fav1");
fav =  JSON.parse(localStorage.getItem("fav"));

var divAdds = document.getElementById("main");
for (var j = 0; j < fav.length; j++) {
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
    var imagesAdds = new Image();
    imagesAdds.src = fav[j].imgs
    images.appendChild(imagesAdds);

    var details = document.createElement('div');
    details.setAttribute('class', 'details');
    addsDiv.appendChild(details);

    var title = document.createElement('h5');
    title.setAttribute('class', 'title');
    title.innerHTML = fav[j].title
    details.appendChild(title);

    var catagory1 = document.createElement('h6');
    catagory1.setAttribute('class', 'catagory1');
    catagory1.innerHTML = fav[j].catagory;
    details.appendChild(catagory1);     

    var phone = document.createElement("h5");
    phone.setAttribute('class', 'phone');
    phone.innerHTML = "CELL # " + fav[j].phone_number;
    details.appendChild(phone);

    var price = document.createElement('h4');
    price.setAttribute('class', 'price');
    price.innerHTML = "Rs : " + fav[j].price;
    details.appendChild(price);

    var date = document.createElement('h6');
    date.setAttribute('class', 'date');
    date.innerHTML = fav[j].date;
    details.appendChild(date);


    var breakAds = document.createElement('br');
    divAdds.appendChild(breakAds);
    break;
}
