const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../../middleware/auth");
const DctLeads = require("../../models/dct/dctLeads");
const DctCalls = require("../../models/dct/dctCalls");
const DctClients = require("../../models/dct/dctClients");
const EmployeeDetails = require("../../models/EmpDetails");
const csvtojson = require("csvtojson");
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
          countryCode: data.countryCode,
          services: data.services,
          dctLeadEditedById: data.dctLeadEditedById,
          dctLeadEditedDateTime: data.dctLeadEditedDateTime,
          dctLeadAssignedToId: data.dctLeadAssignedToId,
          dctLeadAssignedToName: data.dctLeadAssignedToName,
        },
      }
    );

    //UFTR
    await DctCalls.updateMany(
      { callToId: data.recordId },
      { $set: { callToName: data.companyName } }
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
          countryCode: data.countryCode,
          dctClientStatus: data.dctClientStatus,
          dctClientCategory: data.dctClientCategory,
          dctCallDate: data.dctCallDate,
          services: data.services,
          dctClientEditedById: data.dctClientEditedById,
          dctClientEditedDateTime: data.dctClientEditedDateTime,
          dctClientAssignedToId: data.dctClientAssignedToId,
          dctClientAssignedToName: data.dctClientAssignedToName,
        },
      }
    );

    //UFTR
    await DctCalls.updateMany(
      { callToId: data.recordId },
      { $set: { callToName: data.companyName } }
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
            staffRegion: data.staffRegion,
            staffRegionId: data.staffRegionId,
            staffCountryCode: data.staffCountryCode,
          },
        },
      }
    );
    res.json(updateDctLeads);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

router.post("/add-new-dct-client-staff", async (req, res) => {
  try {
    let data = req.body;
    const updateDctClientStaff = await DctClients.updateOne(
      { _id: data.recordId },
      {
        $push: {
          staffs: {
            _id: new mongoose.Types.ObjectId(),
            staffName: data.staffName,
            staffPhoneNumber: data.staffPhoneNumber,
            staffEmailId: data.staffEmailId,
            staffDesignation: data.staffDesignation,
            staffRegion: data.staffRegion,
            staffRegionId: data.staffRegionId,
            staffCountryCode: data.staffCountryCode,
          },
        },
      }
    );
    res.json(updateDctClientStaff);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

router.post("/add-new-dctclient-instruction", async (req, res) => {
  try {
    let data = req.body;
    const updateDctClientInstruction = await DctClients.updateOne(
      { _id: data.recordId },
      {
        $push: {
          instructions: {
            _id: new mongoose.Types.ObjectId(),
            instructionName: data.instructionName,
            instructionDiscription: data.instructionDiscription,
          },
        },
      }
    );
    res.json(updateDctClientInstruction);
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
          "staffs.$.staffRegion": data.staffRegion,
          "staffs.$.staffRegionId": data.staffRegionId,
          "staffs.$.staffCountryCode": data.staffCountryCode,
        },
      }
    );
    //UFTR
    await DctCalls.updateMany(
      { callToStaffId: data.staffId },
      { $set: { callToStaffName: data.staffName } }
    );
    res.json(updateDctLeads);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

router.post("/edit-dct-client-staff", async (req, res) => {
  try {
    let data = req.body;
    const updateDctClientStaff = await DctClients.updateOne(
      { "staffs._id": data.staffId },
      {
        $set: {
          "staffs.$.staffName": data.staffName,
          "staffs.$.staffPhoneNumber": data.staffPhoneNumber,
          "staffs.$.staffEmailId": data.staffEmailId,
          "staffs.$.staffDesignation": data.staffDesignation,
          "staffs.$.staffRegion": data.staffRegion,
          "staffs.$.staffRegionId": data.staffRegionId,
          "staffs.$.staffCountryCode": data.staffCountryCode,
        },
      }
    );
    //UFTR
    await DctCalls.updateMany(
      { callToStaffId: data.staffId },
      { $set: { callToStaffName: data.staffName } }
    );
    res.json(updateDctClientStaff);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

router.post("/edit-dctclient-instruction-details", async (req, res) => {
  try {
    let data = req.body;
    const updateDctClientInstrution = await DctClients.updateOne(
      { "instructions._id": data.instructionId },
      {
        $set: {
          "instructions.$.instructionName": data.instructionName,
          "instructions.$.instructionDiscription": data.instructionDiscription,
        },
      }
    );

    res.json(updateDctClientInstrution);
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
          dctLeadsCategory: data.dctLeadsCategory,
          dctCallDate: data.callDate,
        },
      }
    );
    res.json(updateDctLeads);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

router.post("/update-dct-clients-status", async (req, res) => {
  try {
    let data = req.body;
    const updateDctClientsStatus = await DctClients.updateOne(
      { _id: data.callToId },
      {
        $set: {
          dctClientCategory: data.callCategory,
          dctClientCategoryStatus: data.callStatus,
          dctCallDate: data.callDate,
        },
      }
    );
    res.json(updateDctClientsStatus);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});
//DEACTIVE
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
          "staffs.$.staffDeactiveReason": data.staffDeactiveReason,
        },
      }
    );
    res.json(deactivateDctStaffs);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

router.post("/deactivate-dct-client-staff", async (req, res) => {
  try {
    let data = req.body;
    const deactivateDctStaffs = await DctClients.updateOne(
      { "staffs._id": data.staffId },
      {
        $set: {
          "staffs.$.staffStatus": data.staffStatus,
          "staffs.$.staffDeactivateById": data.staffDeactivateById,
          "staffs.$.staffDeactiveByDateTime": data.staffDeactiveByDateTime,
          "staffs.$.staffDeactiveReason": data.staffDeactiveReason,
        },
      }
    );
    res.json(deactivateDctStaffs);
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
          dctClientDeactivateDateTime: data.dctClientDeactivateDateTime,
          dctClientDeactivateById: data.dctClientDeactivateById,
          dctClientStatus: data.dctClientStatus,
          dctClientDeactivateReason: data.dctClientDeactivateReason,
        },
      }
    );
    res.json(updateDctClients);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

//*********************************\SELECT/*********************************\\
//LEAD
//FOLLOWUP,PROSPECTS
router.post("/get-dct-Leads", auth, async (req, res) => {
  let { countryId, clientsId, dctLeadCategory, assignedTo, dctLeadsCategory } =
    req.body;

  const userInfo = await EmployeeDetails.findById(req.user.id).select(
    "-password"
  );
  let dctLeadAssignedToId = "";
  if (userInfo.empCtAccess !== "All")
    dctLeadAssignedToId = mongoose.Types.ObjectId(userInfo._id);
  else {
    if (assignedTo) {
      dctLeadAssignedToId = mongoose.Types.ObjectId(assignedTo);
    } else {
      dctLeadAssignedToId = { $ne: null };
    }
  }
  var todayDate = new Date().toISOString().split("T")[0];
  let catCondition = [];
  if (dctLeadCategory == "P" || dctLeadCategory == "NL") {
    catCondition = [{ dctLeadCategory: "P" }, { dctLeadCategory: "NL" }];
  } else if (dctLeadCategory == "W") {
    catCondition = [{ dctLeadCategory: "W" }, { dctLeadCategory: "W" }];
  } else if (dctLeadCategory == "F") {
    catCondition = [{ dctLeadCategory: "F" }, { dctLeadCategory: "F" }];
  }
  let query = {};
  if (countryId) {
    if (clientsId) {
      query = {
        dctLeadStatus: "Active",
        countryId: mongoose.Types.ObjectId(countryId),
        _id: mongoose.Types.ObjectId(clientsId),
        $or: catCondition,
        dctCallDate: { $lte: todayDate },
        dctLeadAssignedToId,
      };
    } else {
      query = {
        dctLeadStatus: "Active",
        countryId: mongoose.Types.ObjectId(countryId),
        $or: catCondition,
        dctCallDate: { $lte: todayDate },
        dctLeadAssignedToId,
      };
    }
  } else {
    if (clientsId) {
      query = {
        dctLeadStatus: "Active",
        _id: mongoose.Types.ObjectId(clientsId),
        $or: catCondition,
        dctCallDate: { $lte: todayDate },
        dctLeadAssignedToId,
      };
    } else {
      query = {
        dctLeadStatus: "Active",
        $or: catCondition,
        dctCallDate: { $lte: todayDate },
        dctLeadAssignedToId,
      };
    }
  }
  if (dctLeadsCategory) {
    query = {
      ...query,
      dctLeadsCategory: dctLeadsCategory,
    };
  }
  try {
    const getDctLeadsDetails = await DctLeads.find(query).sort({
      dctCallDate: -1,
      dctLeadCategory: -1,
    });
    const getDctLeadsEmp = await DctLeads.aggregate([
      {
        $match: query,
      },
      {
        $group: {
          _id: "$dctLeadAssignedToId",
          dctLeadAssignedToName: { $first: "$dctLeadAssignedToName" },
        },
      },
    ]).sort({ _id: 1 });
    res.json({ result1: getDctLeadsDetails, result2: getDctLeadsEmp });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});
//ALL LEADS
router.post("/get-all-dct-Leads", auth, async (req, res) => {
  let { countryId, clientsId, assignedTo } = req.body;
  const userInfo = await EmployeeDetails.findById(req.user.id).select(
    "-password"
  );
  let dctLeadAssignedToId = "";
  if (userInfo.empCtAccess !== "All")
    dctLeadAssignedToId = mongoose.Types.ObjectId(userInfo._id);
  else {
    if (assignedTo) {
      dctLeadAssignedToId = mongoose.Types.ObjectId(assignedTo);
    } else {
      dctLeadAssignedToId = { $ne: null };
    }
  }

  let query = {};
  if (countryId) {
    if (clientsId) {
      query = {
        dctLeadStatus: "Active",
        countryId: mongoose.Types.ObjectId(countryId),
        _id: mongoose.Types.ObjectId(clientsId),
        $and: [
          { dctLeadCategory: { $ne: "TC" } },
          { dctLeadCategory: { $ne: "RC" } },
        ],
        dctLeadAssignedToId,
      };
    } else {
      query = {
        dctLeadStatus: "Active",
        countryId: mongoose.Types.ObjectId(countryId),
        $and: [
          { dctLeadCategory: { $ne: "TC" } },
          { dctLeadCategory: { $ne: "RC" } },
        ],
        dctLeadAssignedToId,
      };
    }
  } else {
    if (clientsId) {
      query = {
        dctLeadStatus: "Active",
        _id: mongoose.Types.ObjectId(clientsId),
        $and: [
          { dctLeadCategory: { $ne: "TC" } },
          { dctLeadCategory: { $ne: "RC" } },
        ],
        dctLeadAssignedToId,
      };
    } else {
      query = {
        dctLeadStatus: "Active",
        $and: [
          { dctLeadCategory: { $ne: "TC" } },
          { dctLeadCategory: { $ne: "RC" } },
        ],
        dctLeadAssignedToId,
      };
    }
  }

  try {
    const getDctLeadsDetails = await DctLeads.find(query).sort({
      _id: -1,
    });
    const getDctLeadsEmp = await DctLeads.aggregate([
      {
        $match: query,
      },
      {
        $group: {
          _id: "$dctLeadAssignedToId",
          dctLeadAssignedToName: { $first: "$dctLeadAssignedToName" },
        },
      },
    ]).sort({ _id: 1 });
    res.json({ result1: getDctLeadsDetails, result2: getDctLeadsEmp });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-skill-details", auth, async (req, res) => {
  const { dctLeadAssignedToId } = req.body;
  let query = {};
  query = {
    dctLeadAssignedToId: {
      $eq: dctLeadAssignedToId,
    },
  };
  try {
    const allSkillDetails = await DctLeads.find(query);
    res.json(allSkillDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/transfer-lead", async (req, res) => {
  try {
    let data = req.body;
    let i = 0;

    for (i = 0; i < data.access.length; i++) {
      await DctLeads.updateOne(
        { _id: data.access[i].transfercheckedId },
        {
          $set: {
            dctLeadAssignedToId: data.dctLeadTransferToId,
            dctLeadAssignedToName: data.dctLeadTransferToName,
            dctLeadTransferByName: data.dctLeadTransferByName,
            dctLeadTransferById: data.dctLeadTransferById,
            dctLeadTransferDateTime: data.dctLeadTransferDateTime,
          },
        }
      );
    }
    console.log("success");
    // res.json({ status: "success" });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});
//CLIENT
//TEST CLIENTS,REGULAR CLIENTS
router.post("/get-dct-clients", auth, async (req, res) => {
  let { countryId, clientsId, dctClientCategory, assignedTo } = req.body;
  const userInfo = await EmployeeDetails.findById(req.user.id).select(
    "-password"
  );
  let dctClientAssignedToId = "";
  if (userInfo.empCtAccess !== "All")
    dctClientAssignedToId = mongoose.Types.ObjectId(userInfo._id);
  else {
    if (assignedTo) {
      dctClientAssignedToId = mongoose.Types.ObjectId(assignedTo);
    } else {
      dctClientAssignedToId = { $ne: null };
    }
  }
  var todayDate = new Date().toISOString().split("T")[0];
  let query = {};
  if (countryId) {
    if (clientsId) {
      query = {
        dctClientStatus: "Active",
        countryId: mongoose.Types.ObjectId(countryId),
        _id: mongoose.Types.ObjectId(clientsId),
        dctClientCategory: dctClientCategory,
        dctCallDate: { $lte: todayDate },
        dctClientAssignedToId,
      };
    } else {
      query = {
        dctClientStatus: "Active",
        countryId: mongoose.Types.ObjectId(countryId),
        dctClientCategory: dctClientCategory,
        dctCallDate: { $lte: todayDate },
        dctClientAssignedToId,
      };
    }
  } else {
    if (clientsId) {
      query = {
        dctClientStatus: "Active",
        _id: mongoose.Types.ObjectId(clientsId),
        dctClientCategory: dctClientCategory,
        dctCallDate: { $lte: todayDate },
        dctClientAssignedToId,
      };
    } else {
      query = {
        dctClientStatus: "Active",
        dctClientCategory: dctClientCategory,
        dctCallDate: { $lte: todayDate },
        dctClientAssignedToId,
      };
    }
  }

  try {
    const getDctClientDetails = await DctClients.find(query).sort({
      dctCallDate: -1,
      dctClientCategory: -1,
    });

    const getDctClientEmp = await DctClients.aggregate([
      {
        $match: query,
      },
      {
        $group: {
          _id: "$dctClientAssignedToId",
          dctClientAssignedToName: { $first: "$dctClientAssignedToName" },
        },
      },
    ]).sort({ _id: 1 });
    res.json({ result1: getDctClientDetails, result2: getDctClientEmp });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});
//ALL CLIENTS
router.post("/get-all-dct-clients", auth, async (req, res) => {
  let { countryId, clientsId, assignedTo } = req.body;
  const userInfo = await EmployeeDetails.findById(req.user.id).select(
    "-password"
  );
  let dctClientAssignedToId = "";
  if (userInfo.empCtAccess !== "All")
    dctClientAssignedToId = mongoose.Types.ObjectId(userInfo._id);
  else {
    if (assignedTo) {
      dctClientAssignedToId = mongoose.Types.ObjectId(assignedTo);
    } else {
      dctClientAssignedToId = { $ne: null };
    }
  }

  let query = {};
  if (countryId) {
    if (clientsId) {
      query = {
        dctClientStatus: "Active",
        countryId: mongoose.Types.ObjectId(countryId),
        _id: mongoose.Types.ObjectId(clientsId),
        dctClientAssignedToId,
      };
    } else {
      query = {
        dctClientStatus: "Active",
        countryId: mongoose.Types.ObjectId(countryId),
        dctClientAssignedToId,
      };
    }
  } else {
    if (clientsId) {
      query = {
        dctClientStatus: "Active",
        _id: mongoose.Types.ObjectId(clientsId),
        dctClientAssignedToId,
      };
    } else {
      query = {
        dctClientStatus: "Active",
        dctClientAssignedToId,
      };
    }
  }
  try {
    const getAllDctClientsDetails = await DctClients.find(query).sort({
      _id: -1,
    });
    res.json(getAllDctClientsDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});
//********************************************************
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

router.post("/get-all-dct-calls", auth, async (req, res) => {
  let { selectedDate, assignedTo } = req.body;
  const userInfo = await EmployeeDetails.findById(req.user.id).select(
    "-password"
  );
  var dateVal = new Date().toISOString().split("T")[0];
  let callFromId = "",
    query = {};

  if (userInfo.empCtAccess !== "All") callFromId = userInfo._id;
  else {
    if (assignedTo) callFromId = assignedTo;
    else callFromId = { $ne: null };
  }
  if (selectedDate) {
    dateVal = selectedDate;
  }

  if (selectedDate) {
    query = {
      callTakenDate: dateVal,
      callFromId,
    };
  } else {
    query = {
      callTakenDate: dateVal,
      callFromId,
    };
  }
  try {
    const getAllDctCallsDetails = await DctCalls.find(query).sort({
      _id: -1,
    });
    res.json(getAllDctCallsDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-all-dct-calls-emp", auth, async (req, res) => {
  let { selectedDate } = req.body;
  const userInfo = await EmployeeDetails.findById(req.user.id).select(
    "-password"
  );
  var dateVal = new Date().toISOString().split("T")[0];
  let callFromId = "",
    query = {};

  if (userInfo.empCtAccess !== "All") callFromId = userInfo._id;
  else {
    callFromId = { $ne: null };
  }
  if (selectedDate) {
    dateVal = selectedDate;
  }

  if (selectedDate) {
    query = {
      callTakenDate: dateVal,
      callFromId,
    };
  } else {
    query = {
      callTakenDate: dateVal,
      callFromId,
    };
  }
  try {
    const getAllDctCallsDetails = await DctCalls.aggregate([
      {
        $match: query,
      },
      {
        $group: {
          _id: "$callFromId",
          callFromName: { $first: "$callFromName" },
        },
      },
    ]).sort({ _id: 1 });
    res.json(getAllDctCallsDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-leads-list", async (req, res) => {
  try {
    const getLeadsListData = await DctLeads.find(
      {
        dctLeadStatus: "Active",
      },
      {
        website: 1,
      }
    );
    res.json(getLeadsListData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-selected-lead", async (req, res) => {
  let { leadId } = req.body;
  try {
    const getSelectedLeadData = await DctLeads.findOne({
      _id: leadId,
    });
    res.json(getSelectedLeadData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-lead-staffs-data", async (req, res) => {
  let { leadDataVal } = req.body;
  let query = {};
  if (leadDataVal) {
    query = {
      _id: leadDataVal._id,
    };
  }
  try {
    const getLeadStaffData = await DctLeads.findOne(query);
    res.json(getLeadStaffData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-client-staffs-data", async (req, res) => {
  let { leadDataVal } = req.body;
  let query = {};
  if (leadDataVal) {
    query = {
      _id: leadDataVal._id,
    };
  }
  try {
    const getClientsStaffData = await DctClients.findOne(query);
    res.json(getClientsStaffData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-client-instruction-data", async (req, res) => {
  let { leadDataVal } = req.body;
  let query = {};
  if (leadDataVal) {
    query = {
      _id: leadDataVal._id,
    };
  }
  try {
    const getClientsStaffData = await DctClients.findOne(query);
    res.json(getClientsStaffData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-all-dct-calls-count", auth, async (req, res) => {
  let { selectedDate, assignedTo } = req.body;
  const userInfo = await EmployeeDetails.findById(req.user.id).select(
    "-password"
  );
  var dateVal = new Date().toISOString().split("T")[0];
  let callFromId = "",
    query = {};

  if (userInfo.empCtAccess !== "All") callFromId = userInfo._id;
  else {
    if (assignedTo) callFromId = mongoose.Types.ObjectId(assignedTo);
    else callFromId = { $ne: null };
  }

  if (selectedDate) {
    dateVal = selectedDate;
  }

  if (selectedDate) {
    query = {
      callTakenDate: dateVal,
      callFromId,
    };
  } else {
    query = {
      callTakenDate: dateVal,
      callFromId,
    };
  }
  try {
    let getAllDctCallsClient = [];
    const getAllDctCallsCount = await DctCalls.aggregate([
      {
        $match: query,
      },
      {
        $group: {
          _id: "$callFromId",
          callFromName: { $first: "$callFromName" },
          count: { $sum: 1 },
        },
      },
    ]);
    if (userInfo.empCtAccess === "All") {
      getAllDctCallsClient = await DctCalls.aggregate([
        {
          $match: query,
        },
        {
          $group: {
            _id: {
              callFromId: "$callFromId",
              callToId: "$callToId",
            },
            callFromId: { $first: "$callFromId" },
            callFromName: { $first: "$callFromName" },
            count: { $sum: 1 },
          },
        },
        {
          $group: {
            _id: "$callFromId",
            callFromName: { $first: "$callFromName" },
            countClient: { $sum: 1 },
            countCall: { $sum: "$count" },
          },
        },
      ]);
    } else {
      getAllDctCallsClient = await DctCalls.aggregate([
        {
          $match: query,
        },
        {
          $group: {
            _id: "$callToId",
            callFromName: { $first: "$callFromName" },
            countVal: { $sum: 1 },
          },
        },
      ]);
    }
    res.json({
      getAllDctCallsCount: getAllDctCallsCount,
      getAllDctCallsClient: getAllDctCallsClient,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-all-today-dct-lead-entered", auth, async (req, res) => {
  const { demoDate, assignedTo } = req.body;
  const userInfo = await EmployeeDetails.findById(req.user.id).select(
    "-password"
  );
  let dctLeadEnteredById = "";
  if (userInfo.empCtAccess !== "All")
    dctLeadEnteredById = mongoose.Types.ObjectId(userInfo._id);
  else {
    if (assignedTo) {
      dctLeadEnteredById = mongoose.Types.ObjectId(assignedTo);
    } else {
      dctLeadEnteredById = { $ne: null };
    }
  }
  try {
    let allDctLeadEnteredToday = [];
    if (userInfo.empCtAccess === "All") {
      allDctLeadEnteredToday = await DctLeads.aggregate([
        {
          $match: {
            dctLeadEnteredDate: new Date().toISOString().split("T")[0],
            dctLeadEnteredById,
          },
        },
        {
          $group: {
            _id: "$dctLeadEnteredById",
            dctLeadEnteredByName: { $first: "$dctLeadEnteredByName" },
            count: { $sum: 1 },
          },
        },
      ]);
    } else {
      allDctLeadEnteredToday = await DctLeads.aggregate([
        {
          $match: {
            dctLeadEnteredDate: new Date().toISOString().split("T")[0],
            dctLeadEnteredById,
          },
        },
      ]);
    }
    res.json({
      allDctLeadEnteredToday: allDctLeadEnteredToday,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/add-import-dct-lead-data", async (req, res) => {
  let filePath = "C:/PMSExcelImport/";
  let data = req.body;
  let pathName = filePath + data.filePathName;
  csvtojson()
    .fromFile(pathName)
    .then((csvData) => {
      DctLeads.insertMany(csvData)
        .then(function () {
          console.log("Data inserted");
          res.json({ success: "success" });
        })
        .catch(function (error) {
          console.log(error);
        });
    });
});

module.exports = router;
