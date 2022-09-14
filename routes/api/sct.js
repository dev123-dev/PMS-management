const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const mongoose = require("mongoose");
const SctLeads = require("../../models/sct/sctLeads");
const SctCalls = require("../../models/sct/sctCalls");
const SctClients = require("../../models/sct/sctClients");
const Demo = require("../../models/sct/demo");
const EmployeeDetails = require("../../models/EmpDetails");
const SctProjects = require("../../models/sct/SctProjects");
const Quotation = require("../../models/sct/quotation");
const PurchaseOrder = require("../../models/sct/purchaseOrder");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: "./client/src/static/files",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

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

router.post(
  "/upload-po-file",
  upload.single("myFile"),
  async (req, res, next) => {
    console.log(req.file.originalname + " file successfully uploaded !!");
    const data = req.body;
    const uploadPo = await SctClients.updateOne(
      { _id: data.clientId },
      {
        $set: {
          poFileName: req.file.name,
          POFile: req.file,
        },
      }
    );
    res.sendStatus(200);
  }
);

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
            sctStaffRegion: data.sctStaffRegion,
            sctStaffRegionId: data.sctStaffRegionId,
            sctStaffCountryCode: data.sctStaffCountryCode,
            sctStaffStateId: data.sctStaffStateId,
            sctStaffDistrictId: data.sctStaffDistrictId,
          },
        },
      }
    );
    res.json(addNewSctLeads);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

router.post("/add-new-sct-client-staff", async (req, res) => {
  try {
    let data = req.body;
    const updateSctClientStaff = await SctClients.updateOne(
      { _id: data.recordId },
      {
        $push: {
          sctStaffs: {
            _id: new mongoose.Types.ObjectId(),
            sctStaffName: data.sctStaffName,
            sctStaffPhoneNumber: data.sctStaffPhoneNumber,
            sctStaffEmailId: data.sctStaffEmailId,
            sctStaffDesignation: data.sctStaffDesignation,
            sctStaffRegion: data.sctStaffRegion,
            sctStaffRegionId: data.sctStaffRegionId,
            sctStaffCountryCode: data.sctStaffCountryCode,
            sctStaffStateId: data.sctStaffStateId,
            sctStaffDistrictId: data.sctStaffDistrictId,
          },
        },
      }
    );
    res.json(updateSctClientStaff);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

router.post("/add-quotation", async (req, res) => {
  let data = req.body;
  try {
    if (data.quotationGenerated === 0) {
      const updateQuotationStatus = await SctClients.updateOne(
        { _id: data.clientId },
        {
          $set: {
            quotationGenerated: 1,
            billingStatus: "Quotation",
            billingStatusCategory: "Quotation",
          },
          $push: {
            quotation: {
              _id: new mongoose.Types.ObjectId(),
              clientId: data.clientId,
              clientName: data.clientName,
              quotationNo: data.quotationNo,
              quotationDate: data.quotationDate,
              clientFromId: data.clientFromId,
              clientFrom: data.clientFrom,
              companyId: data.companyId,
              companyName: data.companyName,
              companyAddress: data.companyAddress,
              forName: data.forName,
              forAddress: data.forAddress,
              item: data.item,
            },
          },
        }
      );
      res.json(updateQuotationStatus);
    } else {
      let clientQuotation = data.quotation[0];
      delete clientQuotation._id;
      let AddQuotation = new Quotation(clientQuotation);
      output = await AddQuotation.save();
      const updateQuotationStatus = await SctClients.updateOne(
        { "quotation._id": data.quotationId },
        {
          $set: {
            "quotation.$.quotationNo": data.quotationNo,
            "quotation.$.quotationDate": data.quotationDate,
            "quotation.$.clientFromId": data.clientFromId,
            "quotation.$.clientFrom": data.clientFrom,
            "quotation.$.companyId": data.companyId,
            "quotation.$.companyName": data.companyName,
            "quotation.$.companyAddress": data.companyAddress,
            "quotation.$.forName": data.forName,
            "quotation.$.forAddress": data.forAddress,
            "quotation.$.item": data.item,
          },
        }
      );
      const updateBillingStatus = await SctClients.updateOne(
        { _id: data.clientId },
        {
          $set: {
            billingStatus: "RevisedQuotation",
            billingStatusCategory: "Quotation",
          },
        }
      );
      res.json(updateQuotationStatus);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/add-purchase-order", async (req, res) => {
  let data = req.body;
  try {
    const expireOldPO = await PurchaseOrder.updateMany(
      { clientId: data.clientId, status: "Active" },
      {
        $set: {
          status: "Expired",
        },
      }
    );
    let AddPurchaseOrder = new PurchaseOrder(data);
    output = await AddPurchaseOrder.save();
    const updatePurchaseOrderStatus = await SctClients.updateOne(
      { _id: data.clientId },
      {
        $set: {
          POGenerated: 1,
          POId: output._id,
        },
      }
    );
    res.json(updatePurchaseOrderStatus);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
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
          sctcountryCode: data.sctcountryCode,
          stateId: data.stateId,
          stateName: data.stateName,
          districtId: data.districtId,
          projectsName: data.projectsName,
          projectsId: data.projectsId,
          sctLeadAssignedToId: data.sctLeadAssignedToId,
          sctLeadAssignedToName: data.sctLeadAssignedToName,
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
          "sctStaffs.$.sctStaffRegion": data.sctStaffRegion,
          "sctStaffs.$.sctStaffRegionId": data.sctStaffRegionId,
          "sctStaffs.$.sctStaffCountryCode": data.sctStaffCountryCode,
          "sctStaffs.$.sctStaffStateId": data.sctStaffStateId,
          "sctStaffs.$.sctStaffDistrictId": data.sctStaffDistrictId,
        },
      }
    );
    res.json(updateSctStaff);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

router.post("/edit-sct-client-staff", async (req, res) => {
  try {
    let data = req.body;
    const updateSctClientStaff = await SctClients.updateOne(
      { "sctStaffs._id": data.sctStaffId },
      {
        $set: {
          "sctStaffs.$.sctStaffName": data.sctStaffName,
          "sctStaffs.$.sctStaffPhoneNumber": data.sctStaffPhoneNumber,
          "sctStaffs.$.sctStaffEmailId": data.sctStaffEmailId,
          "sctStaffs.$.sctStaffDesignation": data.sctStaffDesignation,
          "sctStaffs.$.sctStaffRegion": data.sctStaffRegion,
          "sctStaffs.$.sctStaffRegionId": data.sctStaffRegionId,
          "sctStaffs.$.sctStaffCountryCode": data.sctStaffCountryCode,
          "sctStaffs.$.sctStaffStateId": data.sctStaffStateId,
          "sctStaffs.$.sctStaffDistrictId": data.sctStaffDistrictId,
        },
      }
    );
    res.json(updateSctClientStaff);
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
      { "sctStaffs._id": data.sctStaffId },
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

router.post("/deactivate-sct-client-staff", async (req, res) => {
  try {
    let data = req.body;
    const deactivateSctStaffs = await SctClients.updateOne(
      { "sctStaffs._id": data.sctStaffId },
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

router.post("/update-sct-leads-status", async (req, res) => {
  try {
    let data = req.body;
    const updateSctLeads = await SctLeads.updateOne(
      { _id: data.sctCallToId },
      {
        $set: {
          sctLeadCategory: data.sctCallCategory,
          sctLeadCategoryStatus: data.sctCallStatus,
          sctCallDate: data.sctCallDate,
        },
      }
    );
    res.json(updateSctLeads);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

router.post("/update-sct-clients-status", async (req, res) => {
  try {
    let data = req.body;
    const updateSctClientsStatus = await SctClients.updateOne(
      { _id: data.sctCallToId },
      {
        $set: {
          sctClientCategory: data.sctCallCategory,
          sctClientCategoryStatus: data.sctCallStatus,
          sctCallDate: data.sctCallDate,
        },
      }
    );
    res.json(updateSctClientsStatus);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

//*********************************\SELECT/*********************************\\
//LEAD
//FOLLOWUP,PROSPECTS
router.post("/get-sct-Leads", auth, async (req, res) => {
  let { countryId, clientsId, sctLeadCategory, assignedTo } = req.body;

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
  var todayDate = new Date().toISOString().split("T")[0];
  let catCondition = [];
  if (sctLeadCategory == "P" || sctLeadCategory == "NL") {
    catCondition = [{ sctLeadCategory: "P" }, { sctLeadCategory: "NL" }];
  } else if (sctLeadCategory == "F") {
    catCondition = [{ sctLeadCategory: "F" }, { sctLeadCategory: "F" }];
  }
  let query = {};
  if (countryId) {
    if (clientsId) {
      query = {
        sctLeadStatus: "Active",
        countryId: mongoose.Types.ObjectId(countryId),
        _id: mongoose.Types.ObjectId(clientsId),
        $or: catCondition,
        sctCallDate: { $lte: todayDate },
        sctLeadAssignedToId,
      };
    } else {
      query = {
        sctLeadStatus: "Active",
        countryId: mongoose.Types.ObjectId(countryId),
        $or: catCondition,
        sctCallDate: { $lte: todayDate },
        sctLeadAssignedToId,
      };
    }
  } else {
    if (clientsId) {
      query = {
        sctLeadStatus: "Active",
        _id: mongoose.Types.ObjectId(clientsId),
        $or: catCondition,
        sctCallDate: { $lte: todayDate },
        sctLeadAssignedToId,
      };
    } else {
      query = {
        sctLeadStatus: "Active",
        $or: catCondition,
        sctCallDate: { $lte: todayDate },
        sctLeadAssignedToId,
      };
    }
  }
  try {
    const getSctLeadsDetails = await SctLeads.find(query).sort({
      sctCallDate: -1,
      sctLeadCategory: -1,
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
          { sctLeadCategory: { $ne: "EC" } },
          { sctLeadCategory: { $ne: "RC" } },
        ],
        sctLeadAssignedToId,
      };
    } else {
      query = {
        sctLeadStatus: "Active",
        countryId: mongoose.Types.ObjectId(countryId),
        $and: [
          { sctLeadCategory: { $ne: "EC" } },
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
          { sctLeadCategory: { $ne: "EC" } },
          { sctLeadCategory: { $ne: "RC" } },
        ],
        sctLeadAssignedToId,
      };
    } else {
      query = {
        sctLeadStatus: "Active",
        $and: [
          { sctLeadCategory: { $ne: "EC" } },
          { sctLeadCategory: { $ne: "RC" } },
        ],
        sctLeadAssignedToId,
      };
    }
  }
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

//CLIENT
//ENGAGED CLIENTS,REGULAR CLIENTS
router.post("/get-sct-clients", auth, async (req, res) => {
  let { countryId, clientsId, sctClientCategory, assignedTo } = req.body;
  const userInfo = await EmployeeDetails.findById(req.user.id).select(
    "-password"
  );
  let sctClientAssignedToId = "";
  if (userInfo.empCtAccess !== "All")
    sctClientAssignedToId = mongoose.Types.ObjectId(userInfo._id);
  else {
    if (assignedTo) {
      sctClientAssignedToId = mongoose.Types.ObjectId(assignedTo);
    } else {
      sctClientAssignedToId = { $ne: null };
    }
  }
  var todayDate = new Date().toISOString().split("T")[0];
  let query = {};
  if (countryId) {
    if (clientsId) {
      query = {
        sctClientStatus: "Active",
        countryId: mongoose.Types.ObjectId(countryId),
        _id: mongoose.Types.ObjectId(clientsId),
        sctClientCategory: sctClientCategory,
        sctCallDate: { $lte: todayDate },
        sctClientAssignedToId,
      };
    } else {
      query = {
        sctClientStatus: "Active",
        countryId: mongoose.Types.ObjectId(countryId),
        sctClientCategory: sctClientCategory,
        sctCallDate: { $lte: todayDate },
        sctClientAssignedToId,
      };
    }
  } else {
    if (clientsId) {
      query = {
        sctClientStatus: "Active",
        _id: mongoose.Types.ObjectId(clientsId),
        sctClientCategory: sctClientCategory,
        sctCallDate: { $lte: todayDate },
        sctClientAssignedToId,
      };
    } else {
      query = {
        sctClientStatus: "Active",
        sctClientCategory: sctClientCategory,
        sctCallDate: { $lte: todayDate },
        sctClientAssignedToId,
      };
    }
  }
  try {
    const getSctClientDetails = await SctClients.find(query).sort({
      sctCallDate: -1,
      sctClientCategory: -1,
    });

    const getSctClientEmp = await SctClients.aggregate([
      {
        $match: query,
      },
      {
        $group: {
          _id: "$sctClientAssignedToId",
          sctClientAssignedToName: { $first: "$sctClientAssignedToName" },
        },
      },
    ]).sort({ _id: 1 });
    res.json({ result1: getSctClientDetails, result2: getSctClientEmp });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

//*****************************************************/

router.post("/get-sct-last-message", async (req, res) => {
  const { sctCallToId } = req.body;
  let query = {};
  query = {
    sctCallToId: {
      $eq: sctCallToId,
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

router.post("/add-sct-calls", async (req, res) => {
  let data = req.body;
  try {
    let AddSctCallsDetails = new SctCalls(data);
    output = await AddSctCallsDetails.save();
    res.send(output);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-call-history", async (req, res) => {
  const { sctCallToId } = req.body;
  let query = {};
  query = {
    sctCallToId: {
      $eq: sctCallToId,
    },
  };
  try {
    const getLastMsgData = await SctCalls.find(query).sort({
      _id: -1,
    });

    res.json(getLastMsgData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/add-sct-project", async (req, res) => {
  let data = req.body;

  try {
    let SctProjectsDetails = new SctProjects(data);
    output = await SctProjectsDetails.save();
    res.send(output);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.get("/get-all-sct-projects", async (req, res) => {
  try {
    const allSctProjects = await SctProjects.find();
    res.json(allSctProjects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/edit-sct-project", async (req, res) => {
  try {
    let data = req.body;
    const UpdateSctProjects = await SctProjects.updateOne(
      { _id: data.recordId },
      {
        $set: {
          sctProjectName: data.sctProjectName,
          sctProjectDesc: data.sctProjectDesc,
          sctProjectDate: data.sctProjectDate,
          sctProjectEditedById: data.sctProjectEditedById,
          sctProjectEditedDateTime: new Date().toLocaleString("en-GB"),
        },
      }
    );
    res.json(UpdateSctProjects);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

router.post("/get-sct-project", async (req, res) => {
  // const { institutionId } = req.body;
  try {
    const getProjectList = await SctProjects.find();
    res.json(getProjectList);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/add-demo", async (req, res) => {
  let data = req.body;

  try {
    let SctDemoDetails = new Demo(data);
    output = await SctDemoDetails.save();
    res.send(output);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-all-demos", async (req, res) => {
  const { stateId, clientId, demoDate } = req.body;
  let query = { demoDate: new Date().toISOString().split("T")[0] };
  if (stateId) {
    if (clientId)
      query = {
        "output.stateId": mongoose.Types.ObjectId(stateId),
        "output._id": mongoose.Types.ObjectId(clientId),
        demoDate: demoDate,
      };
    else
      query = {
        "output.stateId": mongoose.Types.ObjectId(stateId),
        demoDate: demoDate,
      };
  } else if (clientId) {
    query = {
      "output._id": mongoose.Types.ObjectId(clientId),
      demoDate: demoDate,
    };
  }
  try {
    const allDemos = await Demo.aggregate([
      {
        $lookup: {
          from: "sctleads",
          localField: "clientId",
          foreignField: "_id",
          as: "output",
        },
      },
      { $unwind: "$output" },
      { $match: query },
      { $sort: { demoStatus: -1 } },
    ]);
    res.json(allDemos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-all-demos-state", async (req, res) => {
  const { demoDate } = req.body;
  let query = { demoDate: new Date().toISOString().split("T")[0] };
  if (demoDate) {
    let query = { demoDate: demoDate };
  }
  try {
    const allDemoStates = await Demo.aggregate([
      {
        $lookup: {
          from: "sctleads",
          localField: "clientId",
          foreignField: "_id",
          as: "output",
        },
      },
      { $unwind: "$output" },
      { $match: query },
      {
        $group: {
          _id: "$output.stateId",
          stateName: { $first: "$output.stateName" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    res.json(allDemoStates);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-all-demos-leads", async (req, res) => {
  const { stateId, demoDate } = req.body;
  let query = { demoDate: new Date().toISOString().split("T")[0] };

  if (stateId) {
    query = {
      "output.stateId": mongoose.Types.ObjectId(stateId),
      demoDate: demoDate,
    };
  }
  try {
    const allDemoLeads = await Demo.aggregate([
      {
        $lookup: {
          from: "sctleads",
          localField: "clientId",
          foreignField: "_id",
          as: "output",
        },
      },
      { $unwind: "$output" },
      { $match: query },
      {
        $group: {
          _id: "$output._id",
          sctClientName: { $first: "$output.sctClientName" },
        },
      },
    ]);
    res.json(allDemoLeads);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/demo-taken-verify", async (req, res) => {
  try {
    let data = req.body;
    const updateDemoDetails = await Demo.updateOne(
      { _id: data.recordId },
      {
        $set: {
          demoStatus: data.demoStatus,
        },
      }
    );
    res.json(updateDemoDetails);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

router.post("/get-demo-schedules", auth, async (req, res) => {
  const { selectedDate } = req.body;
  let selDate = new Date().toISOString().split("T")[0];
  if (selectedDate) selDate = selectedDate;
  try {
    const schedulesDemos = await Demo.find({
      demoDate: selDate,
      demoEnteredById: req.user.id,
    });
    res.json(schedulesDemos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-all-sct-calls", auth, async (req, res) => {
  let { selectedDate, assignedTo } = req.body;
  const userInfo = await EmployeeDetails.findById(req.user.id).select(
    "-password"
  );
  var dateVal = new Date().toISOString().split("T")[0];
  let sctCallFromId = "",
    query = {};

  if (userInfo.empCtAccess !== "All") sctCallFromId = userInfo._id;
  else {
    if (assignedTo) sctCallFromId = assignedTo;
    else sctCallFromId = { $ne: null };
  }
  if (selectedDate) {
    dateVal = selectedDate;
  }

  if (selectedDate) {
    query = {
      sctCallTakenDate: dateVal,
      sctCallFromId,
    };
  } else {
    query = {
      sctCallTakenDate: dateVal,
      sctCallFromId,
    };
  }
  try {
    const getAllSctCallsDetails = await SctCalls.find(query).sort({
      _id: -1,
    });
    res.json(getAllSctCallsDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-all-sct-calls-emp", auth, async (req, res) => {
  let { selectedDate } = req.body;
  const userInfo = await EmployeeDetails.findById(req.user.id).select(
    "-password"
  );
  var dateVal = new Date().toISOString().split("T")[0];
  let sctCallFromId = "",
    query = {};

  if (userInfo.empCtAccess !== "All") sctCallFromId = userInfo._id;
  else {
    sctCallFromId = { $ne: null };
  }
  if (selectedDate) {
    dateVal = selectedDate;
  }

  if (selectedDate) {
    query = {
      sctCallTakenDate: dateVal,
      sctCallFromId,
    };
  } else {
    query = {
      sctCallTakenDate: dateVal,
      sctCallFromId,
    };
  }
  try {
    const getAllSctCallsDetails = await SctCalls.aggregate([
      {
        $match: query,
      },
      {
        $group: {
          _id: "$sctCallFromId",
          sctCallFromName: { $first: "$sctCallFromName" },
        },
      },
    ]).sort({ _id: 1 });
    res.json(getAllSctCallsDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/check-demo", async (req, res) => {
  const { demoUserId } = req.body;
  try {
    const checkForDemo = await Demo.find({ clientId: demoUserId }).count();
    res.json(checkForDemo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/check-regenerate", async (req, res) => {
  const { clientId } = req.body;
  try {
    const checkQuotation = await Quotation.findOne({ clientId: clientId })
      .sort({ _id: -1 })
      .limit(1);
    res.json(checkQuotation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/edit-sct-Clients", async (req, res) => {
  try {
    let data = req.body;
    const updateSctClients = await SctClients.updateOne(
      { _id: data.recordId },
      {
        $set: {
          sctCompanyName: data.sctCompanyName,
          sctClientName: data.sctClientName,
          sctEmailId: data.sctEmailId,
          sctBillingEmail: data.sctBillingEmail,
          sctPhone1: data.sctPhone1,
          sctPhone2: data.sctPhone2,
          sctWebsite: data.sctWebsite,
          sctClientAddress: data.sctClientAddress,
          sctClientImportantPoints: data.sctClientImportantPoints,
          countryId: data.countryId,
          countryName: data.countryName,
          sctcountryCode: data.sctcountryCode,
          stateId: data.stateId,
          stateName: data.stateName,
          districtId: data.districtId,
          projectsName: data.projectsName,
          projectsId: data.projectsId,
          sctClientAssignedToId: data.sctClientAssignedToId,
          sctClientAssignedToName: data.sctClientAssignedToName,
          sctClientEditedById: data.sctClientEditedById,
          sctClientEditedDateTime: data.sctClientEditedDateTime,
        },
      }
    );
    res.json(updateSctClients);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

router.post("/deactivate-sct-Clients", async (req, res) => {
  try {
    let data = req.body;
    const deactiveSctClients = await SctClients.updateOne(
      { _id: data.recordId },
      {
        $set: {
          sctClientStatus: data.sctClientStatus,
          sctClientDeactivateDateTime: data.sctClientDeactivateDateTime,
          sctClientDeactivateById: data.sctClientDeactivateById,
          sctClientDeactivateReason: data.sctClientDeactivateReason,
        },
      }
    );
    res.json(deactiveSctClients);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

router.post("/po-print", async (req, res) => {
  const { clientId } = req.body;
  try {
    const printPO = await PurchaseOrder.findOne({
      clientId: clientId,
      status: "Active",
    })
      .sort({ _id: -1 })
      .limit(1);
    res.json(printPO);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post(
  "/upload-po-file",
  upload.single("myFile"),
  async (req, res, next) => {
    console.log(req.file.originalname + " file successfully uploaded !!");
    const data = req.body;
    const uploadPo = await SctClients.updateOne(
      { _id: data.clientId },
      {
        $set: {
          poFileName: req.file.name,
          POFile: req.file,
        },
      }
    );
    res.sendStatus(200);
  }
);

router.post("/selected-client", async (req, res) => {
  const data = req.body;
  console.log("data.clientId", data.clientId);
  try {
    const selectedSctClients = await SctClients.findOne({ _id: data.clientId });
    res.json(selectedSctClients);
    console.log(selectedSctClients);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});
module.exports = router;
