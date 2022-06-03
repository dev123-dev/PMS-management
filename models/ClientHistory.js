const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;
const ClientHistorySchema = new mongoose.Schema({
  chName: {
    type: String,
    required: true,
  },
  chEmail: {
    type: String,
  },
  chContactNo1: {
    type: Number,
  },
  chContactNo2: {
    type: Number,
  },
  chAddress: {
    type: String,
  },
  chCountry: {
    type: String,
  },
  chDate: {
    type: Date,
  },
  chDateTime: {
    type: Date,
    default: Date.now(),
  },
  chEnteredById: {
    type: ObjectId,
  },
  chBelongsTo: {
    type: ObjectId,
  },
  chFolderName: {
    type: String,
  },
  chCurrency: {
    type: String,
  },
  chModeofPaymentId: {
    type: ObjectId,
  },
  chTestClient: {
    type: Number,
  },
  chEnteredById: {
    type: ObjectId,
  },
  chEnteredDate: {
    type: Date,
  },
  chEnteredDateTime: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = clienthistory = mongoose.model(
  "clienthistory",
  ClientHistorySchema
);
