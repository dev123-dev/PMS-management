const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const mongoose = require("mongoose");
const SctLeads = require("../../models/sct/sctLeads");
const SctClients = require("../../models/sct/sctClients");
const EmployeeDetails = require("../../models/EmpDetails");

//ADD
router.post("/add-sct-Leads", async (req, res) => {
  let data = req.body;
  try {
    let AddSctLeadsDetails = new SctLeads(data);
    output = await AddSctLeadsDetails.save();
    res.send(output);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/add-sct-client", async (req, res) => {
  let data = req.body;
  try {
    let AddSctClientsDetails = new SctClients(data);
    output = await AddSctClientsDetails.save();
    res.send(output);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/add-new-sct-staff", async (req, res) => {
  try {
    let data = req.body;
    const addNewSctLeads = await SctLeads.updateOne(
      { _id: data.recordId },
      {
        $push: {
          sctStaffs: {
            _id: new mongoose.Types.ObjectId(),
            sctStaffName: data.sctStaffName,
            sctStaffPhoneNumber: data.sctStaffPhoneNumber,
            sctStaffEmailId: data.sctStaffEmailId,
            sctStaffDesignation: data.sctStaffDesignation,
          },
        },
      }
    );
    res.json(addNewSctLeads);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

//EDIT
router.post("/edit-sct-Leads", async (req, res) => {
  try {
    let data = req.body;
    const updateSctLeads = await SctLeads.updateOne(
      { _id: data.recordId },
      {
        $set: {
          sctCompanyName: data.sctCompanyName,
          sctClientName: data.sctClientName,
          sctEmailId: data.sctEmailId,
          sctPhone1: data.sctPhone1,
          sctPhone2: data.sctPhone2,
          sctWebsite: data.sctWebsite,
          sctLeadAddress: data.sctLeadAddress,
          sctImportantPoints: data.sctImportantPoints,
          countryId: data.countryId,
          countryName: data.countryName,
          stateId: data.stateId,
          districtId: data.districtId,
          sctLeadEditedById: data.sctLeadEditedById,
          sctLeadEditedDateTime: data.sctLeadEditedDateTime,
        },
      }
    );
    res.json(updateSctLeads);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

router.post("/edit-sct-staff", async (req, res) => {
  try {
    let data = req.body;
    const updateSctStaff = await SctLeads.updateOne(
      { "sctStaffs._id": data.sctStaffId },
      {
        $set: {
          "sctStaffs.$.sctStaffName": data.sctStaffName,
          "sctStaffs.$.sctStaffPhoneNumber": data.sctStaffPhoneNumber,
          "sctStaffs.$.sctStaffEmailId": data.sctStaffEmailId,
          "sctStaffs.$.sctStaffDesignation": data.sctStaffDesignation,
        },
      }
    );
    res.json(updateSctStaff);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

//DEACTIVE
router.post("/deactivate-sct-Leads", async (req, res) => {
  try {
    let data = req.body;
    const deactiveSctLeads = await SctLeads.updateOne(
      { _id: data.recordId },
      {
        $set: {
          sctLeadStatus: data.sctLeadStatus,
          sctLeadDeactivateByDateTime: data.sctLeadDeactivateByDateTime,
          sctLeadDeactivateById: data.sctLeadDeactivateById,
          sctLeadDeactiveReason: data.sctLeadDeactiveReason,
        },
      }
    );
    res.json(deactiveSctLeads);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

router.post("/deactivate-sct-staff", async (req, res) => {
  try {
    let data = req.body;
    const deactivateSctStaffs = await SctLeads.updateOne(
      { "sctStaffs._id": data.staffId },
      {
        $set: {
          "sctStaffs.$.sctStaffStatus": data.sctStaffStatus,
          "sctStaffs.$.sctStaffDeactivateById": data.sctStaffDeactivateById,
          "sctStaffs.$.sctStaffDeactiveByDateTime":
            data.sctStaffDeactiveByDateTime,
        },
      }
    );
    res.json(deactivateSctStaffs);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

//SELECT
//ALL LEADS
router.post("/get-all-sct-Leads", auth, async (req, res) => {
  let { countryId, clientsId, assignedTo } = req.body;
  const userInfo = await EmployeeDetails.findById(req.user.id).select(
    "-password"
  );
  let sctLeadAssignedToId = "";
  if (userInfo.empCtAccess !== "All")
    sctLeadAssignedToId = mongoose.Types.ObjectId(userInfo._id);
  else {
    if (assignedTo) {
      sctLeadAssignedToId = mongoose.Types.ObjectId(assignedTo);
    } else {
      sctLeadAssignedToId = { $ne: null };
    }
  }

  let query = {};
  if (countryId) {
    if (clientsId) {
      query = {
        sctLeadStatus: "Active",
        countryId: mongoose.Types.ObjectId(countryId),
        _id: mongoose.Types.ObjectId(clientsId),
        $and: [
          { sctLeadCategory: { $ne: "TC" } },
          { sctLeadCategory: { $ne: "RC" } },
        ],
        sctLeadAssignedToId,
      };
    } else {
      query = {
        sctLeadStatus: "Active",
        countryId: mongoose.Types.ObjectId(countryId),
        $and: [
          { sctLeadCategory: { $ne: "TC" } },
          { sctLeadCategory: { $ne: "RC" } },
        ],
        sctLeadAssignedToId,
      };
    }
  } else {
    if (clientsId) {
      query = {
        sctLeadStatus: "Active",
        _id: mongoose.Types.ObjectId(clientsId),
        $and: [
          { sctLeadCategory: { $ne: "TC" } },
          { sctLeadCategory: { $ne: "RC" } },
        ],
        sctLeadAssignedToId,
      };
    } else {
      query = {
        sctLeadStatus: "Active",
        $and: [
          { sctLeadCategory: { $ne: "TC" } },
          { sctLeadCategory: { $ne: "RC" } },
        ],
        sctLeadAssignedToId,
      };
    }
  }
  // console.log(query);
  try {
    const getSctLeadsDetails = await SctLeads.find(query).sort({
      _id: -1,
    });
    const getSctLeadsEmp = await SctLeads.aggregate([
      {
        $match: query,
      },
      {
        $group: {
          _id: "$sctLeadAssignedToId",
          sctLeadAssignedToName: { $first: "$sctLeadAssignedToName" },
        },
      },
    ]).sort({ _id: 1 });
    res.json({ result1: getSctLeadsDetails, result2: getSctLeadsEmp });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-sct-last-message", async (req, res) => {
  const { callToId } = req.body;
  let query = {};
  query = {
    sctcallToId: {
      $eq: sctcallToId,
    },
  };
  try {
    const getLastMsgData = await SctCalls.findOne(query)
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

module.exports = router;
