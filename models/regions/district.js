const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const DistrictSchema = new mongoose.Schema({
  districtName: {
    type: String,
    required: true,
  },
  stateId: {
    type: ObjectId,
  },
  districtStatus: {
    type: String,
    default: "Active",
  },
  districtBelongsTo: {
    type: String, //SCT,DCT
  },
  districtEnteredById: {
    type: ObjectId,
  },
  districtEnteredByName: {
    type: String,
  },
  districtEnteredDateTime: {
    type: String,
    default: new Date().toLocaleString("en-GB"),
  },
  districtEditedById: {
    type: ObjectId,
  },
  districtEditedDateTime: {
    type: String,
  },
  districtDeactivateById: {
    type: ObjectId,
  },
  districtDeactivateReason: {
    type: String,
  },
  districtDeactivateDateTime: {
    type: String,
  },
});

module.exports = district = mongoose.model("district", DistrictSchema);
