const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const DctLeads = require("../../models/dct/dctLeads");
const DctCalls = require("../../models/dct/dctCalls");

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

router.post("/add-dct-calls", async (req, res) => {
  let data = req.body;
  try {
    let AddDctCallsDetails = new DctCalls(data);
    output = await AddDctCallsDetails.save();
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
          website: data.website,
          clientName: data.clientName,
          emailId: data.emailId,
          phone1: data.phone1,
          phone2: data.phone2,
          dctLeadAddress: data.dctLeadAddress,
          importantPoints: data.importantPoints,
          countryId: data.countryId,
          countryName: data.countryName,
          dctLeadEditedById: data.dctLeadEditedById,
          dctLeadEditedDateTime: data.dctLeadEditedDateTime,
        },
      }
    );
    res.json(updateDctLeads);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

router.post("/add-new-dct-staff", async (req, res) => {
  try {
    let data = req.body;
    const updateDctLeads = await DctLeads.updateOne(
      { _id: data.recordId },
      {
        $push: {
          staffs: {
            _id: new mongoose.Types.ObjectId(),
            staffName: data.staffName,
            staffPhoneNumber: data.staffPhoneNumber,
            staffEmailId: data.staffEmailId,
            staffDesignation: data.staffDesignation,
          },
        },
      }
    );
    res.json(updateDctLeads);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});
router.post("/edit-dct-staff", async (req, res) => {
  try {
    let data = req.body;
    const updateDctLeads = await DctLeads.updateOne(
      { "staffs._id": data.staffId },
      {
        $set: {
          "staffs.$.staffName": data.staffName,
          "staffs.$.staffPhoneNumber": data.staffPhoneNumber,
          "staffs.$.staffEmailId": data.staffEmailId,
          "staffs.$.staffDesignation": data.staffDesignation,
        },
      }
    );
    res.json(updateDctLeads);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

router.post("/update-dct-leads-status", async (req, res) => {
  try {
    let data = req.body;
    const updateDctLeads = await DctLeads.updateOne(
      { _id: data.callToId },
      {
        $set: {
          dctLeadCategory: data.callCategory,
          dctCallDate: data.callDate,
        },
      }
    );
    res.json(updateDctLeads);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

router.post("/deactivate-dct-Leads", async (req, res) => {
  try {
    let data = req.body;
    const updateDctLeads = await DctLeads.updateOne(
      { _id: data.recordId },
      {
        $set: {
          dctLeadDeactivateByDateTime: data.dctLeadDeactivateByDateTime,
          dctLeadDeactivateById: data.dctLeadDeactivateById,
          dctLeadStatus: data.dctLeadStatus,
          dctLeadDeactiveReason: data.dctLeadDeactiveReason,
        },
      }
    );
    res.json(updateDctLeads);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});
//SELECT
router.post("/get-dct-Leads", async (req, res) => {
  let { countryId, clientsId } = req.body;
  let query = {};
  if (countryId) {
    if (clientsId) {
      query = {
        dctLeadStatus: "Active",
        countryId: countryId,
        _id: clientsId,
        dctLeadCategory: "P",
      };
    } else {
      query = {
        dctLeadStatus: "Active",
        countryId: countryId,
        dctLeadCategory: "P",
      };
    }
  } else {
    if (clientsId) {
      query = {
        dctLeadStatus: "Active",
        _id: clientsId,
        dctLeadCategory: "P",
      };
    } else {
      query = {
        dctLeadStatus: "Active",
        dctLeadCategory: "P",
      };
    }
  }
  console.log(query);
  try {
    const getDctLeadsDetails = await DctLeads.find(query);
    res.json(getDctLeadsDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-dct-Leads_dd", async (req, res) => {
  let { countryId } = req.body;
  let query = {};
  if (countryId) {
    query = {
      dctLeadStatus: "Active",
      countryId: countryId,
    };
  } else {
    query = { dctLeadStatus: "Active" };
  }
  try {
    const getDctLeadsDetails = await DctLeads.find(query);
    res.json(getDctLeadsDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-last-message", async (req, res) => {
  const { callToId } = req.body;
  let query = {};
  query = {
    callToId: {
      $eq: callToId,
    },
  };
  try {
    const getLastMsgData = await DctCalls.findOne(query)
      .sort({
        _id: -1,
      })
      .limit(1);
    res.json(getLastMsgData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-call-history", async (req, res) => {
  const { callToId } = req.body;
  let query = {};
  query = {
    callToId: {
      $eq: callToId,
    },
  };
  try {
    const getLastMsgData = await DctCalls.find(query).sort({
      _id: -1,
    });

    res.json(getLastMsgData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});
module.exports = router;
