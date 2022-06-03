const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const PaymentModeSchema = new mongoose.Schema({
  paymentMode: {
    type: String,
  },
  paymentModeEnteredById: {
    type: ObjectId,
  },
  paymentModeDateTime: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = paymentmode = mongoose.model("paymentmode", PaymentModeSchema);
