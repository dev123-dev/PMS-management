const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const POSchema = new mongoose.Schema({
  clientId: {
    type: ObjectId,
  },
  clientName: {
    type: String,
  },
  PONo: {
    type: String,
  },
  PODate: {
    type: String,
  },
  clientFromId: {
    type: ObjectId,
  },
  clientFrom: {
    type: String,
  },
  companyId: {
    type: ObjectId,
  },
  companyName: {
    type: String,
  },
  companyAddress: {
    type: String,
  },
  forName: {
    type: String,
  },
  forAddress: {
    type: String,
  },
  workDesc: {
    type: String,
  },
  amount: {
    type: Number,
  },
  tax: {
    type: Number,
  },
  shipping: {
    type: Number,
  },
  other: {
    type: Number,
  },
  status: {
    type: String,
    default: "Active",
  },
  item: [
    {
      itemName: {
        type: String,
      },
      itemDesc: {
        type: String,
      },
      itemOty: {
        type: Number,
      },
      itemPrice: {
        type: Number,
      },
      itemTotal: {
        type: Number,
      },
    },
  ],
  POEnteredById: {
    type: ObjectId,
  },
  POEnteredByDateTime: {
    type: String,
    default: new Date().toLocaleString("en-GB"),
  },
});
module.exports = purchaseorders = mongoose.model("purchaseorders", POSchema);
