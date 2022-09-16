const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const InvoicesSchema = new mongoose.Schema({
  clientId: {
    type: ObjectId,
  },
  clientName: {
    type: String,
  },
  invoiceNo: {
    type: String,
  },
  invoiceDate: {
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
  modeOfPayment: {
    type: String,
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
      rate: {
        type: Number,
      },
      qty: {
        type: Number,
      },
      amt: {
        type: Number,
      },
      GST: {
        type: String,
      },
      CGST: {
        type: String,
      },
      SGST: {
        type: String,
      },
      IGST: {
        type: String,
      },
      discount: {
        type: Number,
      },
      desc: {
        type: String,
      },
      totalAmt: {
        type: Number,
      },
      grandTotal: {
        type: Number,
      },
    },
  ],
  bank: {},
  invoiceEnteredById: {
    type: ObjectId,
  },
  invoiceEnteredByDateTime: {
    type: String,
    default: new Date().toLocaleString("en-GB"),
  },
});
module.exports = invoices = mongoose.model("invoices", InvoicesSchema);
