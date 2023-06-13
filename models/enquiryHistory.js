const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;


const enquiryHistory = new mongoose.Schema({
    clientName : {
        type : String
    },
    clientEmailId :{
        type :String
    },
    enquiryTo :{
        type : String
    },
    enquiryType :{
        type :String       //DCT or SCT etc
    },
    estimatedERD :{       //ERD : enquiry resolved Date
        type :Date
    },
    discussionPointNotes :{
        type :String
    },
    enteredDateTime :{
        type :Date,
        default : Date.now()
    },
    enteredById :{
        type :ObjectId
    },
    enquiryStatus :{                 //resolved or Unresolved
        type :String
    },
    enteredBy:{
        type:String
    },
    radiodata :{
        type :String
    },
    
    
})
module.exports = mongoose.model("enquiryHistory", enquiryHistory);