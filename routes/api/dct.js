const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const DctLeads = require("../../models/dct/dctLeads");

//ADD
router.post("/add-dct-Leads", async (req, res) => {
  let data = req.body;
  try {
    let AddDctLeadsDetails = new DctLeads(data);
    output = await AddDctLeadsDetails.save();
    res.send(output);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

//EDIT
router.post("/edit-dct-Leads", async (req, res) => {
  try {
    let data = req.body;
    const updateDctLeads = await DctLeads.updateOne(
      { _id: data.recordId },
      {
        $set: {
          companyName: data.companyName,
          emailId: data.emailId,
          website: data.website,
          dctLeadAddress: data.dctLeadAddress,
          feedbackStatus: data.feedbackStatus,
          feedbackEditedById: data.feedbackEditedById,
          feedbackEditedDateTime: Date.now(),
        },
      }
    );
    res.json(updateFeedback);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

//SELECT
router.post("/get-dct-Leads", async (req, res) => {
  try {
    const getDctLeadsDetails = await DctLeads.find({});
    res.json(getDctLeadsDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});
module.exports = router;
