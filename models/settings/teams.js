const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const TeamsSchema = new mongoose.Schema({
  teamName: {
    type: String,
  },
  teamDescription: {
    type: String,
  },
  teamEnteredById: {
    type: ObjectId,
  },
  teamEnteredByName: {
    type: String,
  },
  teamStatus: {
    type: String,
    default: "Active",
  },
  teamEnteredDateTime: {
    type: String,
  },
  teamEditedById: {
    type: ObjectId,
  },
  teamEditedByName: {
    type: String,
  },
  teamEditedDateTime: {
    type: String,
  },
  teamDeactiveById: {
    type: ObjectId,
  },
  teamDeactiveByName: {
    type: String,
  },
  teamDeactiveDateTime: {
    type: String,
  },
  teamDeactiveReason: {
    type: String,
  },
});

module.exports = teams = mongoose.model("teams", TeamsSchema);
