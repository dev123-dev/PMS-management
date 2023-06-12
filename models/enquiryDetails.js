const mongoose = require("mongoose");
ObjectId = mongoose.Schema.ObjectId;


const enquiryDetails = new mongoose.Schema({
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
    enquiryNotes :{
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
    
})
module.exports = mongoose.model("enquiryDetails", enquiryDetails);