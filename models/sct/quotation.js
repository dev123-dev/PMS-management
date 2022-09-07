const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const QuotationsSchema = new mongoose.Schema({
  clientId: {
    type: ObjectId,
  },
  clientName: {
    type: String,
  },
  quotationNo: {
    type: String,
  },
  quotationDate: {
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
  forId: {
    type: ObjectId,
  },
  forName: {
    type: String,
  },
  forAddress: {
    type: String,
  },
  item: [
    {
      itemName: {
        type: String,
      },
      GST: {
        type: String,
      },
      rate: {
        type: Number,
      },
      qty: {
        type: Number,
      },
      amt: {
        type: Number,
      },
      CGST: {
        type: String,
      },
      SGST: {
        type: String,
      },
      discount: {
        type: Number,
      },
      itemEnteredById: {
        type: ObjectId,
      },
      itemEnteredDateTime: {
        type: String,
        default: new Date().toLocaleString("en-GB"),
      },
    },
  ],
  quatationEnteredById: {
    type: ObjectId,
  },
  quatationEnteredByDateTime: {
    type: String,
    default: new Date().toLocaleString("en-GB"),
  },
});
module.exports = quotations = mongoose.model("quotations", QuotationsSchema);
