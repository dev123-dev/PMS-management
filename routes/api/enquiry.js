const express = require("express");
const router = express.Router();
const config = require("config");
const auth = require("../../middleware/auth");
const mongoose = require("mongoose");

const enquiry = require("../../models/enquiryDetails");


//add
router.post("/add-enquiry-details",async(req,res)=>{
    // let data = req.body;
    console.log("hii")

    try{
    // let enquiryDetails = new enquiry(data);
    // await enquiryDetails.save();    

    }catch(error){
        console.log(error.message)
    }
});

//edit
router.post("/edit-enquiry-details",async(req,res)=>{
    try{
        console.log("")

    }catch(error){
        console.log(error.message)
    }
})

//delete
router.post("/get-enquiry-details",async(req,res)=>{
    try{
        console.log("")

    }catch(error){
        console.log(error.message)
    }
})

//get details

router.post("/delete-enquiry-details",async(req,res)=>{
    try{
        console.log("")

    }catch(error){
        console.log(error.message)
    }
})

module.exports = router;