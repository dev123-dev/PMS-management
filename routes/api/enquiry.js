const express = require("express");
const router = express.Router();
const config = require("config");
const auth = require("../../middleware/auth");
const mongoose = require("mongoose");
const enquiryHistory = require("../../models/enquiryHistory");
const enquiry = require("../../models/enquiryDetails");


//add
router.post("/add-enquiry-details",async(req,res)=>{
     let data = req.body;
    // console.log(data)
    

    try{
    let enquiryDetails = new enquiry(data);
    await enquiryDetails.save();    

    }catch(error){
        console.log(error.message)
    }
});


//HISTORY

router.post("/add-enquiry-history",async(req,res)=>{
    let data = req.body;
   console.log("xxxx",data)
    try{
        
      let finalData = new enquiryHistory(data)
       await finalData.save();
       //console.log("12",finalData)
    }catch(error){console.log(error.message)}
})

//edit
router.post("/update-enquiry-details",async(req,res)=>{
let data = req.body
console.log("123",data)

    try{
        let updateEnquiry = await enquiry.updateOne(
            {
            _id : mongoose.Types.ObjectId(data.enquiryId),
            },
            {
                $set : {
                    enquiryStatus : data.radiodata,
                    enquiryNotes : data.discussionPointNotes,
                    enquiryType : data.enquiryType,
                    enteredById : data.enteredById,
                }
            })

    }catch(error){
        console.log(error.message)
    }
})

//delete
router.post("/get-enquiry-details",async(req,res)=>{
    let data = req.body;
  //  console.log(data)
    try{
        let finalData = await enquiry.find({enteredById :mongoose.Types.ObjectId(data.userId),enquiryStatus :{$eq :"UnResolved"} });
        res.json(finalData)

    }catch(error){
        console.log(error.message)
    }
})


router.post("/get-last-enquiry-details",async(req,res)=>{
    let data = req.body;
    try{
        let finalResult = await enquiryHistory.find({enteredById :mongoose.Types.ObjectId(data.enquiryId)}).sort({_id :-1})
        res.json(finalResult)
       //console.log("finalResult",finalResult)
    }catch(error){
        console.log(error.message)
    }
})

//get details

// router.post("/delete-enquiry-details",async(req,res)=>{
//     try{
//         console.log("")

//     }catch(error){
//         console.log(error.message)
//     }
// })

module.exports = router;