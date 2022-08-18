const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const DctLeads = require("../../models/dct/dctLeads");
const DctCalls = require("../../models/dct/dctCalls");
const DctClients = require("../../models/dct/dctClients");

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

router.post("/add-dct-client", async (req, res) => {
  let data = req.body;
  try {
    let AddDctClientsDetails = new DctClients(data);
    output = await AddDctClientsDetails.save();
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

router.post("/edit-dct-clients", async (req, res) => {
  try {
    let data = req.body;
    const updateDctClients = await DctClients.updateOne(
      { _id: data.recordId },
      {
        $set: {
          companyName: data.companyName,
          website: data.website,
          clientName: data.clientName,
          clientCompanyFounderName: data.clientCompanyFounderName,
          emailId: data.emailId,
          clientEmail: data.clientEmail,
          clientType: data.clientType,
          billingEmail: data.billingEmail,
          clientCurrency: data.clientCurrency,
          phone1: data.phone1,
          phone2: data.phone2,
          paymentId: data.paymentId,
          clientFolderName: data.clientFolderName,
          paymentModeName: data.paymentModeName,
          address: data.address,
          importantPoints: data.importantPoints,
          countryId: data.countryId,
          countryName: data.countryName,
          dctClientStatus: data.dctClientStatus,
          dctClientCategory: data.dctClientCategory,
          dctCallDate: data.dctCallDate,
          services: data.services,
          dctClientEditedById: data.dctClientEditedById,
          dctClientEditedDateTime: data.dctClientEditedDateTime,
        },
      }
    );
    res.json(updateDctClients);
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

router.post("/deactivate-dct-staff", async (req, res) => {
  try {
    let data = req.body;
    const deactivateDctStaffs = await DctLeads.updateOne(
      { "staffs._id": data.staffId },
      {
        $set: {
          "staffs.$.staffStatus": data.staffStatus,
          "staffs.$.staffDeactivateById": data.staffDeactivateById,
          "staffs.$.staffDeactiveByDateTime": data.staffDeactiveByDateTime,
        },
      }
    );
    res.json(deactivateDctStaffs);
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
          dctLeadCategoryStatus: data.callStatus,
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

router.post("/deactivate-dct-client", async (req, res) => {
  try {
    let data = req.body;
    const updateDctClients = await DctClients.updateOne(
      { _id: data.recordId },
      {
        $set: {
          dctClientDeactivateDateTime: data.dctLeadDeactivateByDateTime,
          dctClientDeactivateById: data.dctLeadDeactivateById,
          dctClientStatus: data.dctClientStatus,
          dctClientDeactivateReason: data.dctLeadDeactiveReason,
        },
      }
    );
    res.json(updateDctClients);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

//SELECT
router.post("/get-dct-Leads", async (req, res) => {
  var todayDate = new Date().toISOString().split("T")[0];
  let { countryId, clientsId, dctLeadCategory } = req.body;
  let catCondition = [];
  if (dctLeadCategory == "P" || dctLeadCategory == "NL") {
    catCondition = [{ dctLeadCategory: "P" }, { dctLeadCategory: "NL" }];
  } else if (dctLeadCategory == "F") {
    catCondition = [{ dctLeadCategory: "F" }, { dctLeadCategory: "F" }];
  }
  let query = {};
  if (countryId) {
    if (clientsId) {
      query = {
        dctLeadStatus: "Active",
        countryId: countryId,
        _id: clientsId,
        $or: catCondition,
        dctCallDate: { $lte: todayDate },
      };
    } else {
      query = {
        dctLeadStatus: "Active",
        countryId: countryId,
        $or: catCondition,
        dctCallDate: { $lte: todayDate },
      };
    }
  } else {
    if (clientsId) {
      query = {
        dctLeadStatus: "Active",
        _id: clientsId,
        $or: catCondition,
        dctCallDate: { $lte: todayDate },
      };
    } else {
      query = {
        dctLeadStatus: "Active",
        $or: catCondition,
        dctCallDate: { $lte: todayDate },
      };
    }
  }
  // console.log(query);
  try {
    const getDctLeadsDetails = await DctLeads.find(query).sort({
      dctCallDate: -1,
      dctLeadCategory: -1,
    });
    res.json(getDctLeadsDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-all-dct-Leads", async (req, res) => {
  let { countryId, clientsId } = req.body;
  let query = {};
  if (countryId) {
    if (clientsId) {
      query = {
        dctLeadStatus: "Active",
        countryId: countryId,
        _id: clientsId,
        $and: [
          { dctLeadCategory: { $ne: "TC" } },
          { dctLeadCategory: { $ne: "RC" } },
        ],
      };
    } else {
      query = {
        dctLeadStatus: "Active",
        countryId: countryId,
        $and: [
          { dctLeadCategory: { $ne: "TC" } },
          { dctLeadCategory: { $ne: "RC" } },
        ],
      };
    }
  } else {
    if (clientsId) {
      query = {
        dctLeadStatus: "Active",
        _id: clientsId,
        $and: [
          { dctLeadCategory: { $ne: "TC" } },
          { dctLeadCategory: { $ne: "RC" } },
        ],
      };
    } else {
      query = {
        dctLeadStatus: "Active",
        $and: [
          { dctLeadCategory: { $ne: "TC" } },
          { dctLeadCategory: { $ne: "RC" } },
        ],
      };
    }
  }
  try {
    const getDctLeadsDetails = await DctLeads.find(query).sort({
      _id: -1,
    });
    res.json(getDctLeadsDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-dct-clients", async (req, res) => {
  let { countryId, clientsId } = req.body;
  let query = {};
  if (countryId) {
    if (clientsId) {
      query = {
        dctClientStatus: "Active",
        countryId: countryId,
        _id: clientsId,
      };
    } else {
      query = {
        dctClientStatus: "Active",
        countryId: countryId,
      };
    }
  } else {
    if (clientsId) {
      query = {
        dctClientStatus: "Active",
        _id: clientsId,
      };
    } else {
      query = {
        dctClientStatus: "Active",
      };
    }
  }
  try {
    const getDctClientsDetails = await DctClients.find(query).sort({
      _id: -1,
    });
    res.json(getDctClientsDetails);
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
