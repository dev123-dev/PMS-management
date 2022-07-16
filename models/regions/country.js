const mongoose = require("mongoose");
require("mongoose-double")(mongoose);
var SchemaTypes = mongoose.Schema.Types;

const CountrySchema = new mongoose.Schema({
  countryName: {
    type: String,
    required: true,
  },
  countryCode: {
    type: Number,
  },
  countryStatus: {
    type: String,
    default: "Active",
  },
  countryBelongsTo: {
    type: String, //SCT,DCT
  },
  countryEnteredById: {
    type: ObjectId,
  },
  countryEnteredByName: {
    type: String,
  },
  countryEnteredDateTime: {
    type: Date,
    default: new Date().toLocaleString("en-GB"),
  },
  countryEditedById: {
    type: ObjectId,
  },
  countryEditedDateTime: {
    type: Date,
  },
  countryDeactivateById: {
    type: ObjectId,
  },
  countryDeactvateReason: {
    type: String,
  },
  countryDeactivateDateTime: {
    type: Date,
  },
});

module.exports = country = mongoose.model("country", CountrySchema);
