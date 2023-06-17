const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;

const FeedbackSchema = new mongoose.Schema({
  feedbackProblem: {
    type: String,
  },
  feedbackCategory: {
    type: String,
  },
  feedbackPriority: {
    type: String,
  },
  feedbackBelongsTo: {
    type: String,
  },
  feedbackNotes: {
    type: String,
  },
  feedbackStatus: {
    type: String, //pending,done
  },
  feedbackStatusNotes: {
    type: String, //pending,done
  },
  feedbackEnteredById: {
    type: ObjectId,
  },
  feedbackEnteredByName: {
    type: String,
  },
  feedbackEnteredDate: {
    type: String,
  },
  feedbackEnteredDateTime: {
    type: Date,
    default: Date.now(),
  },
  feedbackEditedById: {
    type: ObjectId,
  },
  feedbackEditedDateTime: {
    type: Date,
    default: Date.now(),
  },
  screenshot:[
    {
    PhotoUpload:{
      type:String,
    },
    imageNotes:{
      type:String,
    },
  },
],

});

module.exports = feedback = mongoose.model("feedback", FeedbackSchema);
