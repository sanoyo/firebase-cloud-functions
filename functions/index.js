const functions = require('firebase-functions');
const express = require('express');
const request = require('request')
// const app = express();
// const port = 5000

exports.callback = functions
  .region('asia-northeast1')
  .https.onRequest((req, res) => {
    console.log(req)
    console.log('Receive http request')

    const options = {
      url: 'https://bccd9eb6fd98.ngrok.io/callback',
      port: '3000',
      method: 'POST',
      headers: {
        "content-type": "application/json"
      },
      body: req,
      json: true,
    };
    console.log(options.body.body)
    request(options, (error, body) => {
      res.send(body.body.body);
    })
})
