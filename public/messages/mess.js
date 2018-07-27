const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings)



const auth = firebase.auth();
const messaging = firebase.messaging();
let currentUser = undefined;
//let chatsDiv = document.getElementById("allChats");

console.log("firestore", firestore);
console.log("auth", auth);
console.log("messaging", messaging);

var recID = localStorage.getItem("AdUserId");
var currentUserId = localStorage.getItem("currentUserId");


let chats = new Set();

let previosChatsDiv = document.getElementById("prev");

firestore.collection("messages").where("recID", "==", currentUserId)
    .onSnapshot(function (querySnapshot) {
        querySnapshot.docChanges().forEach(element => {
            chats.add(element.doc.id);
            firestore.collection('users').doc(element.doc.data().currentUserId).get()
                .then(doc => {

                    previosChatsDiv.innerHTML += `
                        <div class="w-80 m-auto chatDiv d-flex flex-row" id=${element.doc.id} onclick = "startChat(event)" >
                        <div class="align-self-center">
                        </div>
                        <div class="ml-3 d-flex flex-column align-self-center cursor-pointer">
                        <h5>${doc.data().name}</h5>
                        <span class="cursor-pointer">message....</span>
                        <span class="cursor-pointer">At: time</span>
                        </div>
                        </div>
                         `

                })

        })
    })




function startChat(event) {
    var chatBox = document.getElementsByClassName("chat")[0];

    if (event.target.nodeName == "SPAN" || event.target.nodeName == "H5") {
        let target = (event.target.parentNode.parentNode).id
        console.log(target);

        chatBox.id = target;
        firestore.collection("messages").doc(target)
            .get().then(doc => {
                if (doc.data().currentUserId !== currentUserId) {
                    recID = doc.data().currentUserId
                } else if (doc.data().recID !== currentUserId) {
                    recID = doc.data().recID
                }
                initailizeChatListner(target);
            })

    }



}




firestore.collection("messages").where("currentUserId", "==", currentUserId)
    .onSnapshot(function (querySnapshot) {
        querySnapshot.docChanges().forEach(element => {
            chats.add(element.doc.id);
            firestore.collection('users').doc(element.doc.data().recID).get()
                .then(doc => {

                    previosChatsDiv.innerHTML += `
                        <div class="w-80 m-auto chatDiv d-flex flex-row" id=${element.doc.id}>
                        <div class="align-self-center">
                        </div>
                        <div class="ml-3 d-flex flex-column align-self-center">
                        <h5 class="cursor-pointer">${doc.data().name}</h5>
                        <span class="cursor-pointer">message....</span>
                        <span class="cursor-pointer">At: time</span>
                        </div>
                        </div>
                         `

                })

        })
    })









let roomFound = false;

let currentChat;


if (recID && currentUserId) {
    let chatBox = document.getElementsByClassName("chat")[0];
    let messageDiv = document.getElementById("messages");


    console.log("working")
    firestore.collection("messages").where("currentUserId", "==", currentUserId)
        .where("recID", "==", recID)

        .get().then(function (snapshot) {
            snapshot.forEach(function (chatRoom) {
                roomFound = true;
                console.log("chat room Found>>>", chatRoom)
                currentChat = chatRoom.id;
                chatBox.id = chatRoom.id;

                initailizeChatListner(currentChat)


            })

        })







}






function createRoom() {
    return new Promise((resolve, reject) => {
        firestore.collection("messages").add({
            currentUserId: currentUserId,
            recID: recID,
        }).then(chatRoom => {
            chatBox.id = chatRoom.id;
            currentChat = chatRoom.id;
            console.log("Chat room Created With This ID >", chatRoom.id);
            initailizeChatListner(chatRoom.id)
            resolve(chatRoom.id);

        })

    })

}
let chatInitialed = false;



function send_msgs(event) {
    event.preventDefault()
    // debugger

    let mess = document.getElementById("input").value;
    let chatBox = document.getElementsByClassName("chat")[0]
    if (chatBox.id) {
        firestore.collection("messages").doc(chatBox.id)
            .collection("message").doc(((new Date).getTime()).toString()).set({
                message: mess,
                currentUserId: currentUserId,
                recID: recID,
                time: (new Date).toString()



            })
        firebase.firestore().collection("users").where("currentUserId", "==", true).get()
            .then((res) => {
                res.forEach((elem) => {
                    console.info("res.data()", elem.data());
                })

            })

            firebase.firestore().collection("users").where("")

        var name;
        var to;
        firebase.firestore().collection("users").doc(currentUserId).get()
            .then((querySnapshot) => {
                console.log(querySnapshot.data().token);
                to = querySnapshot.data().token;
                name = querySnapshot.data().name;
                // querySnapshot.forEach((elem) => {
                // console.info(elem.data());
                // });
            });

        var key = 'AIzaSyAor9xjGx6Lf29F8fo9Lg-CMg9sncNtf64';
        // var to = "fpHvA_Ouzqc:APA91bFyDMc9CcIvohBoafrTwnJGRKa_cFl0Of8mkReuO5-P0HfV4WTLtvxtp2wMf13px58h7vAwgwhd6OAmHs-N_vX03zxbDKfx8Aq7vAvK0QszmiXjlOekk_Zq5B88lovvfeevArYK";
        var notification = {
            'title': "Message From: " + name,
            'message': "message"
        };

        fetch("https://fcm.googleapis.com/fcm/send", {
            'method': 'POST',
            'headers': {
                'Authorization': 'key=' + key,
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify({
                'notification': notification,
                'to': to
            })
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.error(error);
        });

        messaging.onMessage(function (payload) {
            console.log('onMessage', payload);
        });

        messaging.onMessage(function (payload) {
            console.log('onMessage', payload);
        })

            .then(docRef => {
                if (chatInitialed == false) {

                    initailizeChatListner(chatBox.id);
                    chatInitialed = true

                }
            })

    } else {

        firestore.collection("messages").add({
            currentUserId: currentUserId,
            recID: recID
        }).then(docRef => {
            chatBox.id = docRef.id;
            firestore.collection("messages").doc("docRef.id")
                .collection("message")
                .add({
                    message: mess,
                    senderId: currentUserId,
                    recieverId: recID
                })
        })



    }





}



var messages = document.getElementById("messages");


function initailizeChatListner(chatId) {

    const chatID = chatId;
    if (chatID) {

        messages.innerHTML = "";

        firestore.collection("messages").doc(chatID)
            .collection("message")
            .onSnapshot(querySnapshot => {
                querySnapshot.docChanges().forEach(change => {
                    if (change.doc.data().currentUserId == currentUserId) {

                        messages.innerHTML += `
                                    <div class="message">
                                     <p class="text-success font-weight-bold p-3 mb-1">${change.doc.data().message}</p>
                                    </div>
                         `

                    }

                    else {

                        messages.innerHTML += `
                                    <div class="border m-2 message">
                                     <p class="font-weight-bold text-black p-3 mb-1">${change.doc.data().message}</p>
                                    </div>
                         `

                    }


                })

            })

    }

}



function signOut() {

    let btn = document.getElementById("logOUt");
    btn.innerHTML = `
        <img src="">
    `
    firebase.auth().signOut().then(function (res) {
        console.log("LOG OUT SuccessFull!!!");
        window.location = "../../index.html"
    })
}



// firebase.firestore().collection("users").where("currentUserId" , "==" , true).get()
// .then((res)=>{
//     res.forEach((elem)=>{
//         console.info("res.data()" , elem.data());
//     })

// })
// var name
// var to
// firebase.firestore().collection("users").doc(currentUserId).get()
//     .then((querySnapshot) => {
//         console.log(querySnapshot.data().token);
//         to = querySnapshot.data().token;
//         name = querySnapshot.data().name;
//         // querySnapshot.forEach((elem) => {
//         // console.info(elem.data());
//         // });
//     });

// var key = 'AIzaSyAor9xjGx6Lf29F8fo9Lg-CMg9sncNtf64';
// // var to = "fpHvA_Ouzqc:APA91bFyDMc9CcIvohBoafrTwnJGRKa_cFl0Of8mkReuO5-P0HfV4WTLtvxtp2wMf13px58h7vAwgwhd6OAmHs-N_vX03zxbDKfx8Aq7vAvK0QszmiXjlOekk_Zq5B88lovvfeevArYK";
// var notification = {
//     'title': "Message From: " + name,
//     'message': "message"
// };

// fetch("https://fcm.googleapis.com/fcm/send", {
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

// messaging.onMessage(function (payload) {
//     console.log('onMessage', payload);
// });

// messaging.onMessage(function (payload) {
//     console.log('onMessage', payload);
// });