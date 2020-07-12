// Railsへのcallback
// const functions = require('firebase-functions');
// const express = require('express');
// const request = require('request')

// exports.callback = functions
//   .region('asia-northeast1')
//   .https.onRequest((req, res) => {
//     console.log('Receive http request')

//     const options = {
//       url: 'https://bccd9eb6fd98.ngrok.io/callback',
//       port: '3000',
//       method: 'POST',
//       headers: {
//         "content-type": "application/json"
//       },
//       body: req,
//       json: true,
//     };
//     // console.log(options.body.body)
//     request(options, (error, body) => {
//       res.send(body.body.body);
//     })
// })


// firestoreへの保存
// const admin = require('firebase-admin');
const functions = require('firebase-functions');

// admin.initializeApp(functions.config().firebase);
// let db = admin.firestore();

// exports.save = functions
//   .region('asia-northeast1')
//   .https.onRequest((req, res) => {
//     let usersRef = db.collection('users');
//       usersRef.doc('SF').set({
//       name: 'San Francisco',
//       country: 'USA'
//     })
// })

// firebase authentication

exports.authenticate = functions
  .region('asia-northeast1')
  .auth.user().onCreate((user) => {
    console.log(user.email)
    console.log('ok')
});
