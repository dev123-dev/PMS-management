const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const ClientSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
  },
  clientEmail: {
    type: String,
  },
  clientContactNo1: {
    type: Number,
  },
  clientContactNo2: {
    type: Number,
  },
  clientAddress: {
    type: String,
  },
  clientCountry: {
    type: String,
  },
  clientDate: {
    type: Date,
  },
  clientDateTime: {
    type: Date,
    default: Date.now(),
  },
  clientEnteredById: {
    type: ObjectId,
  },
  clientBelongsTo: {
    type: ObjectId,
  },
  clientFolderName: {
    type: String,
  },
  clientCurrency: {
    type: String,
  },
  clientModeofPaymentId: {
    type: ObjectId,
  },
  testClient: {
    type: Number,
  },
});

module.exports = client = mongoose.model("client", ClientSchema);
