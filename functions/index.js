const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });





exports.sendNotification = functions.firestore.document("messages/{room}/message/{newMessage}")
    .onCreate(event => {
        console.info(event.data());


        return admin.firestore().collection("users").doc(event.data().recID)
            .get().then((reciver) => {
                return admin.firestore().collection("users").doc(event.data().currentUserId)
                    .get().then((sender) => {
                        let payload = {
                            notification : {
                                title : "Message From " + sender.data().name,
                                body : event.data().message
                            }
                        }

                        return admin.messaging().sendToDevice(reciver.data().token , payload)

                    })
            })

    })