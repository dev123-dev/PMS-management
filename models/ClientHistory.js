const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;
const ClientHistorySchema = new mongoose.Schema({
  chId: {
    type: ObjectId,
  },
  chName: {
    type: String,
  },
  chCompanyName: {
    type: String,
  },
  chCompanyFounderName: {
    type: String,
  },
  chWebsite: {
    type: String,
  },
  chStandardInstruction: {
    type: String,
  },
  chBelongsToId: {
    type: ObjectId,
  },
  chBelongsToName: {
    type: String,
  },
  chEmail: {
    type: String,
  },
  chBillingEmail: {
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

  chFolderName: {
    type: String,
  },
  chCurrency: {
    type: String,
  },
  chPaymentId: {
    type: ObjectId,
  },
  chpaymentModeName: {
    type: String,
  },
  chclientType: {
    type: String,
  },
  chEnteredById: {
    type: ObjectId,
  },
  chEnteredDate: {
    type: String,
  },
  chEnteredDateTime: {
    type: Date,
    default: Date.now(),
  },
  chDateTime: {
    type: Date,
    default: Date.now(),
  },
  chEnteredById: {
    type: ObjectId,
  },
});

module.exports = clienthistory = mongoose.model(
  "clienthistory",
  ClientHistorySchema
);
