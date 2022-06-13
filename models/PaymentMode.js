const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const PaymentModeSchema = new mongoose.Schema({
  paymentModeName: {
    type: String,
  },
  paymentModeEnteredById: {
    type: ObjectId,
  },
  paymentModeDateTime: {
    type: Date,
    default: Date.now(),
  },
  paymentModeEditedById: {
    type: ObjectId,
  },
  paymentModeEditedDateTime: {
    type: Date,
  },
});

module.exports = paymentmode = mongoose.model("paymentmode", PaymentModeSchema);
