const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const ChatMessageSchema = new mongoose.Schema({
  chatMessageUserId: {
    type: ObjectId,
  },
  chatMessage: {
    type: String,
  },
  chatMessageDate: {
    type: String,
  },
  chatMessageDateTime: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = chatmessage = mongoose.model("chatmessage", ChatMessageSchema);
