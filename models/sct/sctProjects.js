const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const SctProjectSchema = new mongoose.Schema({
  sctProjectName: {
    type: String,
    //required: true,
  },
  sctProjectDesc: {
    type: String,
  },
  sctProjectEnteredById: {
    type: ObjectId,
  },
  sctProjectDate: {
    type: String,
    default: new Date().toLocaleString("en-GB"),
  },
  sctProjectEditedById: {
    type: ObjectId,
  },
  sctProjectEditedDateTime: {
    type: Date,
  },
});

module.exports = sctproject = mongoose.model("sctproject", SctProjectSchema);
