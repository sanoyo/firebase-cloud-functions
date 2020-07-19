// import { Follow } from './usecase/follow.js'
let usecase = require('./usecase/follow.js');

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const request = require('request')

// 初期化
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

exports.callback = functions
  .region('asia-northeast1')
  .https
  .onRequest((req) => {
    let event = req.body.events[0]
    const usersRef = db.collection('user_posts');
    let messageType = req.body.events[0]['type']
    const uId = req.body.events[0]['source']['userId']
    const replyToken = req.body.events[0]['replyToken']
    const senderType = req.body.events[0]['source']['type']

    // FireStoreに保存
    if (messageType === 'follow') {
      const follow = new usecase.Follow(event)
      follow.save(usersRef)
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

    // Railsにpost投げる
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
})

// firestoreへの保存
exports.authenticate = functions
  .region('asia-northeast1')
  .auth
  .user()
  .onCreate((user) => {
    let usersRef = db.collection('admin_users');
      usersRef.doc(user.uid).set({
        email: user.email
    })
});
