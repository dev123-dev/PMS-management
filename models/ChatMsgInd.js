const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const ChatMsgIndSchema = new mongoose.Schema({
  chatMsgIndUserId: {
    type: ObjectId,
  },
  chatMsgIndUserName: {
    type: String,
  },
  chatMsgIndOtherUserId: {
    type: ObjectId,
  },
  chatMsgIndOtherUserName: {
    type: String,
  },
  chatMsgIndMessage: {
    type: String,
  },
  chatMsgIndDate: {
    type: String,
  },
  chatMsgIndDateTime: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = chatMsgInd = mongoose.model("chatMsgInd", ChatMsgIndSchema);
