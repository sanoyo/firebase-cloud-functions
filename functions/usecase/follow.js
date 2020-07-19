class Follow {
  constructor(event) {
    this.uId = event['source']['userId']
    this.replyToken = event['replyToken']
    this.senderType = event['source']['type']
    this.messageType = event['type']
  }
  save(usersRef) {
    usersRef.doc().set({
      line_id: this.uId,
      message_type: this.messageType,
      reply_token: this.replyToken,
      sender_type: this.senderType
    })
  }
}

module.exports.Follow = Follow;
