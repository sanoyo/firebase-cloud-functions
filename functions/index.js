// Railsへのcallback
const functions = require('firebase-functions');
const express = require('express');
const request = require('request')

exports.callback = functions
  .region('asia-northeast1')
  .https.onRequest((req) => {
    console.log('Receive http request')

    const options = {
      url: 'https://6509e3d00b5d.ngrok.io/callback',
      port: '3000',
      method: 'POST',
      headers: {
        "content-type": "application/json"
      },
      body: req.body,
      json: true,
    };
    console.log(options.body)
    request(options)
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
