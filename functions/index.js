const functions = require('firebase-functions');
const admin = require('firebase-admin');
const request = require('request');
const { firestore } = require('firebase-admin');

// 初期化
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

exports.callback = functions
  .region('asia-northeast1')
  .https.onRequest((req) => {
    let messageType = req.body.events[0]['type']
    const uId = req.body.events[0]['source']['userId']
    const replyToken = req.body.events[0]['replyToken']
    const senderType = req.body.events[0]['source']['type']
    const usersRef = db.collection('deploy_test');

    // FireStoreに保存
    const saveFirestore = new Promise((resolve, reject) => {
      if (messageType === 'follow') {
        usersRef.doc().set({
          line_id: uId,
          message_type: messageType,
          reply_token: replyToken,
          sender_type: senderType
        })
      } else if (messageType === 'unfollow') {
          usersRef.doc().set({
            line_id: uId,
            message_type: messageType,
            sender_type: senderType
          })
      } else if (messageType === 'message') {
        messageType = req.body.events[0]['message']['type']
        const messgae = req.body.events[0]['message']['text']
  
        usersRef.doc().set({
          line_id: uId,
          message: { text: messgae },
          message_type: messageType,
          reply_token: replyToken,
          sender_type: senderType
        })
      } else if (messageType === 'postback') {
        const data = req.body.events[0]['postback']['data']
  
        usersRef.doc().set({
          line_id: uId,
          message: { 
            data: data,
            params: {
              datetime: '11111'
            }
          },
          message_type: messageType,
          reply_token: replyToken,
          sender_type: senderType
        })
      }
      resolve('Success!');
    })
    
    saveFirestore.then(() => {
      const options = {
        url: 'http://localhost:3000/callback',
        method: 'POST',
        headers: {
          "content-type": "application/json"
        },
        body: req.body,
        json: true,
      };
      request(options)
    }).catch((error) => { 
      console.log(error);
    });;
})
