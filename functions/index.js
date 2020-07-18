const functions = require('firebase-functions');
const admin = require('firebase-admin');
const request = require('request')

admin.initializeApp(functions.config().firebase);

exports.callback = functions
  .region('asia-northeast1')
  .https.onRequest((req) => {
    const uId = req.body.events[0]['source']['userId']
    const replyToken = req.body.events[0]['replyToken']
    const messageType = req.body.events[0]['type']
    const senderType = req.body.events[0]['source']['type']
    console.log(senderType)

    // FireStoreに保存
    // follow
    let db = admin.firestore();
    let usersRef = db.collection('user_posts');
      usersRef.doc(uId).set({
        line_id: uId,
        message_type: messageType,
        reply_token: replyToken,
        sender_type: senderType
    })
    
    // Railsにpost投げる
    // const options = {c
    //   url: 'https://6509e3d00b5d.ngrok.io/callback',
    //   port: '3000',
    //   method: 'POST',
    //   headers: {
    //     "content-type": "application/json"
    //   },
    //   body: req.body,
    //   json: true,
    // };
    // request(options)
})

// firestoreへの保存
// const admin = require('firebase-admin');
// const functions = require('firebase-functions');

// admin.initializeApp(functions.config().firebase);
// let db = admin.firestore();

// exports.authenticate = functions
//   .region('asia-northeast1')
//   .auth.user().onCreate((user) => {
//     let usersRef = db.collection('admin_users');
//       usersRef.doc(user.uid).set({
//         email: user.email
//     }) 
// });
