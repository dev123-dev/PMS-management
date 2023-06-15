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
const Invoice = require("../../models/sct/invoice");
const Agreement = require("../../models/sct/agreement");
const multer = require("multer");
const csvtojson = require("csvtojson");
const Project = require("../../models/Project");
const Company = require("../../models/settings/company");
const sctCalls = require("../../models/sct/sctCalls");

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
            billingStatus: data.billingStatus,
            billingStatusCategory: data.billingStatusCategory,
            quotationEnteredByDateTime: data.quotationEnteredByDateTime,
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
              clientFromEmailId: data.clientFromEmailId,
              clientFromPhone: data.clientFromPhone,
              insideState: data.insideState,
            },
          },
        }
      );
      const updateQuotationCounter = await Company.updateOne(
        { _id: data.companyId },
        {
          $set: {
            quotationNoCounter: data.counter,
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
            "quotation.$.clientFromEmailId": data.clientFromEmailId,
            "quotation.$.clientFromPhone": data.clientFromPhone,
            "quotation.$.insideState": data.insideState,
          },
        }
      );
      const updateBillingStatus = await SctClients.updateOne(
        { _id: data.clientId },
        {
          $set: {
            billingStatus: data.billingStatus,
            billingStatusCategory: data.billingStatusCategory,
            quotationEnteredByDateTime: data.quotationEnteredByDateTime,
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
          billingStatus: data.billingStatus,
          billingStatusCategory: data.billingStatusCategory,
        },
      }
    );
    res.json(updatePurchaseOrderStatus);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/add-invoice", async (req, res) => {
  let data = req.body;
  try {
    const expireOldInvoice = await Invoice.updateMany(
      { clientId: data.clientId, status: "Active" },
      {
        $set: {
          status: "Expired",
        },
      }
    );
    let AddInvoice = new Invoice(data);
    output = await AddInvoice.save();
    const updateClientInvoiceStatus = await SctClients.updateOne(
      { _id: data.clientId },
      {
        $set: {
          invoiceGenerated: 1,
          invoiceId: output._id,
          billingStatus: "GenerateInvoice",
          billingStatusCategory: "Invoice",
        },
      }
    );
    res.json(updateClientInvoiceStatus);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/add-agreement", async (req, res) => {
  let data = req.body;
  try {
    const expireOldAgreement = await Agreement.updateMany(
      { clientId: data.clientId, status: "Active" },
      {
        $set: {
          status: "Expired",
        },
      }
    );
    let AddAgreement = new Agreement(data);
    output = await AddAgreement.save();
    const updateClientAgreementStatus = await SctClients.updateOne(
      { _id: data.clientId },
      {
        $set: {
          agreementGenerated: 1,
          agreementId: output._id,
          billingStatus: "GenerateAgreement",
          billingStatusCategory: "Invoice",
        },
      }
    );
    res.json(updateClientAgreementStatus);
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
          sctNotes: data.sctNotes,
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
          "sctStaffs.$.sctStaffDeactiveReason": data.sctStaffDeactiveReason,
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
          "sctStaffs.$.sctStaffDeactiveReason": data.sctStaffDeactiveReason,
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
          sctLeadsCategory: data.sctLeadsCategory,
          sctCallDate: data.sctCallDate,
          sctCallTime: data.sctCallTime,
          sctExpectedMonth: data.sctExpectedMonth,
          sctExpectedMonthYear: data.sctExpectedMonthYear,
          sctCallSalesValue: data.sctCallSalesValue,
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
          sctCallTime: data.sctCallTime,
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
  let {
    stateId,
    countryId,
    clientsId,
    sctLeadCategory,
    assignedTo,
    projectsId,
    MonthDate,
    sctLeadsCategory,
  } = req.body;

  const userInfo = await EmployeeDetails.findById(req.user.id).select(
    "-password"
  );
  let sctLeadAssignedToId = "";
  if (userInfo.empCtAccess !== "All")
    sctLeadAssignedToId = mongoose.Types.ObjectId(userInfo._id);
  else {
    if (assignedTo) sctLeadAssignedToId = mongoose.Types.ObjectId(assignedTo);
    else sctLeadAssignedToId = { $ne: null };
  }
  var todayDate = new Date().toISOString().split("T")[0];
  let catCondition = [];
  let condition = [];
  if (sctLeadCategory == "P" || sctLeadCategory == "NL") {
    catCondition = [{ sctLeadCategory: "P" }, { sctLeadCategory: "NL" }];
    condition = { sctLeadsCategory: { $eq: "" } };
  } else if (sctLeadCategory == "PT") {
    catCondition = [{ sctLeadCategory: "PT" }];
    condition = { sctLeadsCategory: { $ne: "" } };
  } else if (sctLeadCategory == "W") {
    catCondition = [{ sctLeadCategory: "W" }, { sctLeadCategory: "W" }];
  } else if (sctLeadCategory == "F") {
    catCondition = [{ sctLeadCategory: "F" }, { sctLeadCategory: "F" }];
  } else if (sctLeadCategory == "EC") {
    catCondition = [{ sctLeadCategory: "EC" }, { sctLeadCategory: "EC" }];
  }
  let query = {
    sctLeadStatus: "Active",
    condition,
    $or: catCondition,
    sctCallDate: { $lte: todayDate },
    sctLeadAssignedToId,
  };
  if (projectsId) {
    query = {
      ...query,
      projectsId: mongoose.Types.ObjectId(projectsId),
    };
  }
  if (sctLeadsCategory) {
    query = {
      ...query,
      sctLeadsCategory: sctLeadsCategory,
    };
  }

  if (stateId) {
    query = {
      ...query,
      stateId: mongoose.Types.ObjectId(stateId),
    };
  }
  if (clientsId) {
    query = {
      ...query,
      _id: mongoose.Types.ObjectId(clientsId),
    };
  }
  if (MonthDate) {
    query = {
      sctLeadAssignedToId,
      sctLeadStatus: "Active",
      sctCallDate: { $eq: MonthDate },
    };
  }
  try {
    let getSctLeadsDetails = (getSctLeadsEmp = []);
    if (sctLeadCategory) {
      getSctLeadsDetails = await SctLeads.find(query).sort({
        sctCallDate: -1,
        sctLeadCategory: -1,
      });
      getSctLeadsEmp = await SctLeads.aggregate([
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
    }
    if (MonthDate) {
      getSctLeadsDetails = await SctLeads.aggregate([
        {
          $match: query,
        },
      ]);
    }

    res.json({
      result1: getSctLeadsDetails,
      result2: getSctLeadsEmp,
      // result3: sctPotential,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

//ALL LEADS
router.post("/get-all-sct-Leads", auth, async (req, res) => {
  let { stateId, clientsId, assignedTo, projectsId, DD, empId } = req.body;
  const userInfo = await EmployeeDetails.findById(req.user.id).select(
    "-password"
  );
  let sctLeadAssignedToId = "";
  if (userInfo.empCtAccess !== "All")
    sctLeadAssignedToId = mongoose.Types.ObjectId(userInfo._id);
  else {
    if (assignedTo) sctLeadAssignedToId = mongoose.Types.ObjectId(assignedTo);
    else sctLeadAssignedToId = { $ne: null };
  }

  let query = {
    sctLeadStatus: "Active",
    $and: [
      // { sctLeadCategory: { $ne: "EC" } },
      { sctLeadCategory: { $ne: "RC" } },
    ],
    sctLeadAssignedToId,
  };

  if (stateId) {
    query = {
      ...query,
      stateId: mongoose.Types.ObjectId(stateId),
    };
  }

  if (clientsId) {
    query = {
      ...query,
      _id: mongoose.Types.ObjectId(clientsId),
    };
  }

  if (projectsId) {
    query = {
      ...query,
      projectsId: mongoose.Types.ObjectId(projectsId),
    };
  }
  try {
    let getSctLeadsDetails = (getSctLeadsEmp = []);
    if (projectsId) {
      if (DD) {
        getSctLeadsDetails = await SctLeads.find(query, {
          _id: 1,
          sctCompanyName: 1,
          sctClientName: 1,
          sctPhone1: 1,
        }).sort({
          _id: -1,
        });
        getSctLeadsEmp = await SctLeads.aggregate([
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
      } else {
        getSctLeadsDetails = await SctLeads.find(query).sort({
          _id: -1,
        });
      }
    }
    res.json({ result1: getSctLeadsDetails, result2: getSctLeadsEmp });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

//CLIENT
//ENGAGED CLIENTS,REGULAR CLIENTS
router.post("/get-sct-clients", auth, async (req, res) => {
  let {
    stateId,
    countryId,
    clientsId,
    sctClientCategory,
    assignedTo,
    projectsId,
  } = req.body;
  const userInfo = await EmployeeDetails.findById(req.user.id).select(
    "-password"
  );
  let sctClientAssignedToId = "";
  if (userInfo.empCtAccess !== "All")
    sctClientAssignedToId = mongoose.Types.ObjectId(userInfo._id);
  else {
    if (assignedTo) sctClientAssignedToId = mongoose.Types.ObjectId(assignedTo);
    else sctClientAssignedToId = { $ne: null };
  }
  var todayDate = new Date().toISOString().split("T")[0];
  let query = {
    sctClientStatus: "Active",
    sctClientCategory: sctClientCategory,
    sctCallDate: { $lte: todayDate },
    sctClientAssignedToId,
  };

  if (projectsId) {
    query = {
      ...query,
      projectsId: mongoose.Types.ObjectId(projectsId),
    };
  }

  if (stateId) {
    query = {
      ...query,
      stateId: mongoose.Types.ObjectId(stateId),
    };
  }

  if (clientsId) {
    query = {
      ...query,
      _id: mongoose.Types.ObjectId(clientsId),
    };
  }

  try {
    let getSctClientDetails = (getSctClientEmp = []);
    if (projectsId) {
      getSctClientDetails = await SctClients.find(query).sort({
        sctCallDate: -1,
        sctClientCategory: -1,
      });

      getSctClientEmp = await SctClients.aggregate([
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
    }
    res.json({ result1: getSctClientDetails, result2: getSctClientEmp });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

//*****************************************************/

router.post("/get-sct-last-message", async (req, res) => {
  const { sctCallToId, sctLeadId } = req.body;
  let query = {};
  if (sctLeadId) {
    query = {
      $or: [{ sctCallToId: sctCallToId }, { sctCallToId: sctLeadId }],
    };
  } else {
    query = {
      sctCallToId: sctCallToId,
    };
  }
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
  const { sctCallToId, sctLeadId } = req.body;
  let query = {};
  if (sctLeadId) {
    query = {
      $or: [{ sctCallToId: sctCallToId }, { sctCallToId: sctLeadId }],
    };
  } else {
    query = {
      sctCallToId: sctCallToId,
    };
  }

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
  try {
    const getProjectList = await SctProjects.find();
    res.json(getProjectList);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-selected-project", async (req, res) => {
  const { projectId } = req.body;
  try {
    const getProjectList = await SctProjects.findOne({ _id: projectId });
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

router.post("/update-demo", async (req, res) => {
  try {
    let data = req.body;
    const updateDemo = await Demo.updateOne(
      { _id: data.recordId },
      {
        $set: {
          demoDate: data.newDemoDate,
          fromTime: data.fromTime,
          toTime: data.toTime,
        },
      }
    );
    res.json(updateDemo);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

router.post("/get-all-demos", auth, async (req, res) => {
  const {
    stateId,
    clientId,
    demoDateVal,
    fromdate,
    todate,
    dateType,
    assignedTo,
  } = req.body;
  const userInfo = await EmployeeDetails.findById(req.user.id).select(
    "-password"
  );
  let demoEnteredById = "";
  if (userInfo.empCtAccess !== "All")
    demoEnteredById = mongoose.Types.ObjectId(userInfo._id);
  else {
    if (assignedTo) {
      demoEnteredById = mongoose.Types.ObjectId(assignedTo);
    } else {
      demoEnteredById = { $ne: null };
    }
  }

  let demoDate = new Date().toISOString().split("T")[0];
  if (dateType === "Multi Date") {
    demoDate = {
      $gte: fromdate,
      $lte: todate,
    };
  } else if (demoDateVal) {
    demoDate = demoDateVal;
  }

  let query = { demoDate: demoDate };
  if (stateId) {
    if (clientId)
      query = {
        "clientDetails.stateId": mongoose.Types.ObjectId(stateId),
        clientId: mongoose.Types.ObjectId(clientId),
        demoDate: demoDate,
        demoEnteredById,
      };
    else
      query = {
        "clientDetails.stateId": mongoose.Types.ObjectId(stateId),
        demoDate: demoDate,
        demoEnteredById,
      };
  } else if (clientId) {
    query = {
      clientId: mongoose.Types.ObjectId(clientId),
      demoDate: demoDate,
      demoEnteredById,
    };
  } else if (demoDate) {
    query = {
      demoDate: demoDate,
      demoEnteredById,
    };
  }

  try {
    const allDemos = await Demo.aggregate([
      { $match: query },
      { $sort: { demoStatus: -1 } },
    ]);
    res.json({
      allDemos: allDemos,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-all-demos-report", auth, async (req, res) => {
  const { assignedTo, selDate, dateType, fromdate, todate } = req.body;
  const userInfo = await EmployeeDetails.findById(req.user.id).select(
    "-password"
  );
  let demoEnteredById = "";
  if (userInfo.empCtAccess !== "All")
    demoEnteredById = mongoose.Types.ObjectId(userInfo._id);
  else {
    if (assignedTo) {
      demoEnteredById = mongoose.Types.ObjectId(assignedTo);
    } else {
      demoEnteredById = { $ne: null };
    }
  }
  var demoDate = new Date().toISOString().split("T")[0];
  if (selDate) {
    demoDate = selDate;
  }
  let query = {};
  if (dateType === "Multi Date") {
    query = {
      demoDate: {
        $gte: fromdate,
        $lte: todate,
      },
      demoEnteredById,
    };
  } else {
    query = {
      demoDate: demoDate,
      demoEnteredById,
    };
  }

  try {
    let allDemos = (allDemosTaken = allDemosAddedToday = []);
    if (dateType === "Multi Date") {
      if (userInfo.empCtAccess === "All") {
        allDemos = await Demo.aggregate([
          { $match: query },
          {
            $lookup: {
              from: "empdetails",
              localField: "demoEnteredById",
              foreignField: "_id",
              as: "output",
            },
          },
          { $unwind: "$output" },
          {
            $group: {
              _id: "$demoEnteredById",
              empName: { $first: "$output.userName" },
              count: { $sum: 1 },
            },
          },
          { $sort: { demoStatus: -1 } },
        ]);

        allDemosTaken = await Demo.aggregate([
          { $match: query },
          { $match: { demoStatus: "Taken", demoEnteredById } },
          {
            $lookup: {
              from: "empdetails",
              localField: "demoEnteredById",
              foreignField: "_id",
              as: "output",
            },
          },
          { $unwind: "$output" },
          {
            $group: {
              _id: "$demoEnteredById",
              empName: { $first: "$output.userName" },
              count: { $sum: 1 },
            },
          },
        ]);
        allDemosAddedToday = await Demo.aggregate([
          {
            $match: {
              callDate: {
                $gte: fromdate,
                $lte: todate,
              },
              demoEnteredById,
            },
          },
          {
            $lookup: {
              from: "empdetails",
              localField: "demoEnteredById",
              foreignField: "_id",
              as: "output",
            },
          },

          { $unwind: "$output" },
          {
            $group: {
              _id: "$demoEnteredById",
              empName: { $first: "$output.userName" },
              count: { $sum: 1 },
            },
          },
        ]);
      } else {
        allDemos = await Demo.aggregate([
          { $match: query },
          { $sort: { demoStatus: -1 } },
        ]);
        allDemosTaken = await Demo.aggregate([
          { $match: query },
          { $match: { demoStatus: "Taken", demoEnteredById } },
        ]);
        allDemosAddedToday = await Demo.aggregate([
          {
            $match: {
              callDate: demoDate,
              demoEnteredById,
            },
          },
        ]);
      }
    } else {
      if (userInfo.empCtAccess === "All") {
        allDemos = await Demo.aggregate([
          { $match: query },
          {
            $lookup: {
              from: "empdetails",
              localField: "demoEnteredById",
              foreignField: "_id",
              as: "output",
            },
          },
          { $unwind: "$output" },
          {
            $group: {
              _id: "$demoEnteredById",
              empName: { $first: "$output.userName" },
              count: { $sum: 1 },
            },
          },
          { $sort: { demoStatus: -1 } },
        ]);

        allDemosTaken = await Demo.aggregate([
          { $match: query },
          { $match: { demoStatus: "Taken", demoEnteredById } },
          {
            $lookup: {
              from: "empdetails",
              localField: "demoEnteredById",
              foreignField: "_id",
              as: "output",
            },
          },
          { $unwind: "$output" },
          {
            $group: {
              _id: "$demoEnteredById",
              empName: { $first: "$output.userName" },
              count: { $sum: 1 },
            },
          },
        ]);
        allDemosAddedToday = await Demo.aggregate([
          {
            $match: {
              callDate: demoDate,
              demoEnteredById,
            },
          },
          {
            $lookup: {
              from: "empdetails",
              localField: "demoEnteredById",
              foreignField: "_id",
              as: "output",
            },
          },

          { $unwind: "$output" },
          {
            $group: {
              _id: "$demoEnteredById",
              empName: { $first: "$output.userName" },
              count: { $sum: 1 },
            },
          },
        ]);
      } else {
        allDemos = await Demo.aggregate([
          { $match: query },
          { $sort: { demoStatus: -1 } },
        ]);
        allDemosTaken = await Demo.aggregate([
          { $match: query },
          { $match: { demoStatus: "Taken", demoEnteredById } },
        ]);
        allDemosAddedToday = await Demo.aggregate([
          {
            $match: {
              callDate: demoDate,
              demoEnteredById,
            },
          },
        ]);
      }
    }

    res.json({
      allDemos: allDemos,
      allDemosTaken: allDemosTaken,
      allDemosAddedToday: allDemosAddedToday,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-all-today-lead-entered", auth, async (req, res) => {
  const { selDate, fromdate, todate, dateType, demoDate, assignedTo } =
    req.body;
  const userInfo = await EmployeeDetails.findById(req.user.id).select(
    "-password"
  );
  let sctLeadEnteredById = "",
    dateVal = new Date().toISOString().split("T")[0];
  if (userInfo.empCtAccess !== "All")
    sctLeadEnteredById = mongoose.Types.ObjectId(userInfo._id);
  else {
    if (assignedTo) {
      sctLeadEnteredById = mongoose.Types.ObjectId(assignedTo);
    } else {
      sctLeadEnteredById = { $ne: null };
    }
  }
  if (selDate) dateVal = selDate;
  try {
    let allLeadEnteredToday = [];
    if (dateType === "Multi Date") {
      if (userInfo.empCtAccess === "All") {
        allLeadEnteredToday = await SctLeads.aggregate([
          {
            $match: {
              sctLeadEnteredDate: {
                $gte: fromdate,
                $lte: todate,
              },
              sctLeadEnteredById,
            },
          },
          {
            $group: {
              _id: "$sctLeadEnteredById",
              sctLeadEnteredByName: { $first: "$sctLeadEnteredByName" },
              count: { $sum: 1 },
            },
          },
        ]);
      } else {
        allLeadEnteredToday = await SctLeads.aggregate([
          {
            $match: {
              sctLeadEnteredDate: {
                $gte: fromdate,
                $lte: todate,
              },
              sctLeadEnteredById,
            },
          },
        ]);
      }
    } else {
      if (userInfo.empCtAccess === "All") {
        allLeadEnteredToday = await SctLeads.aggregate([
          {
            $match: {
              sctLeadEnteredDate: dateVal,
              sctLeadEnteredById,
            },
          },
          {
            $group: {
              _id: "$sctLeadEnteredById",
              sctLeadEnteredByName: { $first: "$sctLeadEnteredByName" },
              count: { $sum: 1 },
            },
          },
        ]);
      } else {
        allLeadEnteredToday = await SctLeads.aggregate([
          {
            $match: {
              sctLeadEnteredDate: dateVal,
              sctLeadEnteredById,
            },
          },
        ]);
      }
    }

    res.json({
      allLeadEnteredToday: allLeadEnteredToday,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-all-demos-state", async (req, res) => {
  const { demoDateVal, fromdate, todate, dateType } = req.body;
  let demoDate = new Date().toISOString().split("T")[0];
  if (dateType === "Multi Date") {
    demoDate = {
      $gte: fromdate,
      $lte: todate,
    };
  } else if (demoDateVal) {
    demoDate = demoDateVal;
  }

  let query = { demoDate: demoDate };
  try {
    const allDemoStates = await Demo.aggregate([
      { $match: query },
      {
        $group: {
          _id: "$clientDetails.stateId",
          stateName: { $first: "$clientDetails.stateName" },
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
  const { stateId, demoDateVal, fromdate, todate, dateType } = req.body;
  let demoDate = new Date().toISOString().split("T")[0];
  if (dateType === "Multi Date") {
    demoDate = {
      $gte: fromdate,
      $lte: todate,
    };
  } else if (demoDateVal) {
    demoDate = demoDateVal;
  }
  let query = { demoDate: demoDate };

  if (stateId) {
    query = {
      "clientDetails.stateId": mongoose.Types.ObjectId(stateId),
      demoDate: demoDate,
    };
  }
  try {
    const allDemoLeads = await Demo.aggregate([
      { $match: query },
      {
        $group: {
          _id: "$clientId",
          sctClientName: { $first: "$clientName" },
        },
      },
      { $sort: { _id: 1 } },
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
    if (assignedTo) {
      sctCallFromId = assignedTo;
    } else {
      sctCallFromId = { $ne: null };
    }
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

//client report details page start
router.post("/get-client-report-details", auth, async (req, res) => {
  let { ClientFolderName, FromYear, ToYear, assignedTo } = req.body;
  const userInfo = await EmployeeDetails.findById(req.user.id).select(
    "-password"
  );
  if (userInfo.empCtAccess !== "All") sctCallFromId = userInfo._id;
  else {
    if (assignedTo) sctCallFromId = mongoose.Types.ObjectId(assignedTo);
    else sctCallFromId = { $ne: null };
  }

  if (YearWiseData) {
    query = {
      projectDate: {
        $ne: null,
        $ne: "",
      },
      clientFolderName: ClientFolderName,
      projectDate: {
        $gte: "",
        $lte: "",
      },
    };
  }

  if (ClientId) {
    query = {
      projectDate: {
        $ne: null,
        $ne: "",
      },
      clientFolderName: ClientFolderName,
      projectDate: {
        $gte: "",
        $lte: "",
      },
    };
  }
  try {
    let ProjectDetails = [];

    ProjectDetails = await Project.aggregate([
      {
        $match: {
          query,
        },
      },
      {
        $addFields: {
          projectDate: {
            $toDate: "$projectDate",
          },
        },
      },
      {
        $addFields: {
          month: {
            $month: "$projectDate",
          },
        },
      },
      {
        $project: {
          totProjQty: {
            $sum: "$projectQuantity",
          },
        },
      },
    ]).sort({});
  } catch (error) {
    console.log(eror.message);
  }
});

//client report detail page end

//Financial year feteching code start
router.get("/get-Year", auth, async (req, res) => {
  let query = {
    projectDate: {
      $ne: null,
      $ne: "",
    },
  };
  try {
    let financialYear = [];
    financialYear = await Project.aggregate([
      {
        $match: query,
      },
      //2nd
      {
        $addFields:
          /**
           * newField: The new field name.
           * expression: The new field expression.
           */
          {
            projectDate: {
              $toDate: "$projectDate",
            },
          },
      },
      //3rd adding new field financial year and extracting year
      {
        $addFields:
          /**
           * newField: The new field name.
           * expression: The new field expression.
           */
          {
            financialYear: {
              $cond: [
                {
                  $gte: [
                    {
                      $month: "$projectDate",
                    },

                    ,
                  ],
                },
                {
                  $concat: [
                    {
                      $toString: {
                        $year: "$projectDate",
                      },
                    },
                    "-",
                    {
                      $toString: {
                        $add: [
                          {
                            $year: "$projectDate",
                          },
                          1,
                        ],
                      },
                    },
                  ],
                },
                {
                  $concat: [
                    {
                      $toString: {
                        $subtract: [
                          {
                            $year: "$projectDate",
                          },
                          1,
                        ],
                      },
                    },
                    "-",
                    {
                      $toString: {
                        $year: "$projectDate",
                      },
                    },
                  ],
                },
              ],
            },
          },
      },
      //4th
      {
        $group:
          /**
           * _id: The id of the group.
           * fieldN: The first field name.
           */
          {
            _id: "$financialYear",
            totQty: {
              $sum: 1,
            },
          },
      },
      //5th
      {
        $sort:
          /**
           * specifications: The fields to
           *   include or exclude.
           */
          {
            _id: -1,
          },
      },
      //6th
      {
        $addFields:
          /**
           * newField: The new field name.
           * expression: The new field expression.
           */
          {
            startDate: {
              $concat: [
                {
                  $substr: ["$_id", 0, 4],
                },
                "-04-01",
              ],
            },
            endDate: {
              $concat: [
                {
                  $substr: ["$_id", 5, 4],
                },
                "-03-31",
              ],
            },
          },
      },
    ]);
    res.json(financialYear);
  } catch (error) {
    console.log(error.mesage);
  }
});
//Financial year feteching code end

//MOnth wise report start
router.post("/get-Month-wise-Report", auth, async (req, res) => {
  let { startDate, endDate, clientFolderName, finYear } = req.body;
  // if(clientFolderName)

  try {
    let MonthWiseData = await Project.aggregate([
      {
        $match: {
          projectDate: {
            $ne: null,
            $ne: "",
          },
        },
      },
      {
        $addFields: {
          projectDate: {
            $toDate: "$projectDate",
          },
        },
      },
      {
        $match: {
          clientFolderName: {
            $eq: clientFolderName,
          },
          projectDate: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $addFields: {
          month: {
            $month: "$projectDate",
          },
          year: {
            $year: "$projectDate",
          },
        },
      },
      {
        $addFields: {
          monthName: {
            $switch: {
              branches: [
                {
                  case: {
                    $eq: ["$month", 1],
                  },
                  then: {
                    $concat: [
                      "Jan",
                      "-",
                      {
                        $toString: "$year",
                      },
                    ],
                  },
                },
                {
                  case: {
                    $eq: ["$month", 2],
                  },
                  then: {
                    $concat: [
                      "Feb",
                      "-",
                      {
                        $toString: "$year",
                      },
                    ],
                  },
                },
                {
                  case: {
                    $eq: ["$month", 3],
                  },
                  then: {
                    $concat: [
                      "Mar",
                      "-",
                      {
                        $toString: "$year",
                      },
                    ],
                  },
                },
                {
                  case: {
                    $eq: ["$month", 4],
                  },
                  then: {
                    $concat: [
                      "Apr",
                      "-",
                      {
                        $toString: "$year",
                      },
                    ],
                  },
                },
                {
                  case: {
                    $eq: ["$month", 5],
                  },
                  then: {
                    $concat: [
                      "May",
                      "-",
                      {
                        $toString: "$year",
                      },
                    ],
                  },
                },
                {
                  case: {
                    $eq: ["$month", 6],
                  },
                  then: {
                    $concat: [
                      "Jun",
                      "-",
                      {
                        $toString: "$year",
                      },
                    ],
                  },
                },
                {
                  case: {
                    $eq: ["$month", 7],
                  },
                  then: {
                    $concat: [
                      "Jul",
                      "-",
                      {
                        $toString: "$year",
                      },
                    ],
                  },
                },
                {
                  case: {
                    $eq: ["$month", 8],
                  },
                  then: {
                    $concat: [
                      "Aug",
                      "-",
                      {
                        $toString: "$year",
                      },
                    ],
                  },
                },
                {
                  case: {
                    $eq: ["$month", 9],
                  },
                  then: {
                    $concat: [
                      "Sep",
                      "-",
                      {
                        $toString: "$year",
                      },
                    ],
                  },
                },
                {
                  case: {
                    $eq: ["$month", 10],
                  },
                  then: {
                    $concat: [
                      "Oct",
                      "-",
                      {
                        $toString: "$year",
                      },
                    ],
                  },
                },
                {
                  case: {
                    $eq: ["$month", 11],
                  },
                  then: {
                    $concat: [
                      "Nov",
                      "-",
                      {
                        $toString: "$year",
                      },
                    ],
                  },
                },
                {
                  case: {
                    $eq: ["$month", 12],
                  },
                  then: {
                    $concat: [
                      "Dec",
                      "-",
                      {
                        $toString: "$year",
                      },
                    ],
                  },
                },
              ],
              default: "Invalid month",
            },
          },
        },
      },
      {
        $addFields:
          /**
           * newField: The new field name.
           * expression: The new field expression.
           */
          {
            monthOrdNo: {
              $switch: {
                branches: [
                  {
                    case: {
                      $eq: ["$month", 4],
                    },
                    then: 1,
                  },
                  {
                    case: {
                      $eq: ["$month", 5],
                    },
                    then: 2,
                  },
                  {
                    case: {
                      $eq: ["$month", 6],
                    },
                    then: 3,
                  },
                  {
                    case: {
                      $eq: ["$month", 7],
                    },
                    then: 4,
                  },
                  {
                    case: {
                      $eq: ["$month", 8],
                    },
                    then: 5,
                  },
                  {
                    case: {
                      $eq: ["$month", 9],
                    },
                    then: 6,
                  },
                  {
                    case: {
                      $eq: ["$month", 10],
                    },
                    then: 7,
                  },
                  {
                    case: {
                      $eq: ["$month", 11],
                    },
                    then: 8,
                  },
                  {
                    case: {
                      $eq: ["$month", 12],
                    },
                    then: 9,
                  },
                  {
                    case: {
                      $eq: ["$month", 1],
                    },
                    then: 10,
                  },
                  {
                    case: {
                      $eq: ["$month", 2],
                    },
                    then: 11,
                  },
                  {
                    case: {
                      $eq: ["$month", 3],
                    },
                    then: 12,
                  },
                ],
                default: "Invalid no",
              },
            },
          },
      },
      {
        $lookup: {
          from: "projectstatuses",
          localField: "projectStatusId",
          foreignField: "_id",
          as: "status",
        },
      },
      {
        $match: {
          "status.projectStatusCategory": {
            $nin: ["Dont Work", "Amend", "Additional Instruction"],
          },
        },
      },
      {
        $group:
          /**
           * _id: The id of the group.
           * fieldN: The first field name.
           */
          {
            _id: "$monthName",
            totProjQty: {
              $sum: "$projectQuantity",
            },
            monthOrdNo: {
              $first: "$monthOrdNo",
            },
            clientFolderName: {
              $first: "$clientFolderName",
            },
          },
      },
      {
        $project: {
          _id: "$_id",
          totProjQty: "$totProjQty",
          monthOrdNo: "$monthOrdNo",
          clientFolderName: "$clientFolderName",
          finYear: finYear,
        },
      },
      {
        $sort:
          /**
           * Provide any number of field/order pairs.
           */
          {
            monthOrdNo: 1,
          },
      },
    ]);

    res.json(MonthWiseData);
  } catch (error) {
    console.log(error.message);
  }
});
//Month wise report end

//Client details start
router.post("/get-client-report", auth, async (req, res) => {
  let { startDate, endDate, clientFolderName } = req.body;

  console.log("xxx", req.body);
  try {
    let ProjectDetails = await Project.aggregate([
      {
        $match: {
          projectDate: {
            $ne: "",
          },
        },
      },
      {
        $addFields: {
          projectDateObj: {
            $toDate: "$projectDate",
          },
        },
      },
      {
        $match: {
          clientFolderName: {
            $eq: clientFolderName,
          },
          projectDateObj: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $lookup: {
          from: "projectstatuses",
          localField: "projectStatusId",
          foreignField: "_id",
          as: "status",
        },
      },
      {
        $match: {
          "status.projectStatusCategory": {
            $nin: ["Dont Work", "Amend", "Additional Instruction"],
          },
        },
      },
      {
        $project: {
          projectDateObj: "$projectDateObj",
          projectDate: "$projectDate",
          projectQty: "$projectQuantity",
          projectName: "$projectName",
          clientFolderName: "$clientFolderName",
        },
      },
      {
        $sort: {
          projectDateObj: 1,
        },
      },
    ]);

    console.log(ProjectDetails);
    res.json(ProjectDetails);
  } catch (error) {
    console.log(error.message);
  }
});
//Client details end
//Get Financial client Details start
router.post("/get-FY-Client", auth, async (req, res) => {
  let { startDate, endDate, clientFolderName, finYear } = req.body;
  let query = {};
  if (clientFolderName) {
    query = {
      clientFolderName: { $eq: clientFolderName },
    };
  } else {
    query = {
      clientFolderName: { $ne: "" },
    };
  }
  try {
    //////////////////////////////new code overall summary///////////////////////////////
    let projectDetails = await Project.aggregate([
      {
        $match: {
          projectStatus: {
            $ne: "Trash",
          },
        },
      },
      {
        $lookup: {
          from: "projectstatuses",
          localField: "projectStatusId",
          foreignField: "_id",
          as: "status",
        },
      },
      {
        $match: {
          "status.projectStatusCategory": {
            $nin: ["Dont Work", "Amend", "Additional Instruction"],
          },
          //query,
        },
      },
      // {
      //   $match: query,
      // },
      {
        $addFields: {
          projectDate: {
            $toDate: "$projectDate",
          },
        },
      },
      {
        $match: {
          projectDate: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $match: {
          _id: {
            $ne: "",
          },
          projectBelongsToId: {
            $eq: null,
          },
          //query,
        },
      },
      {
        $group: {
          _id: {
            clientFolderName: "$clientFolderName",
            month: {
              $month: "$projectDate",
            },
            year: {
              $year: "$projectDate",
            },
          },
          totalQty: {
            $sum: "$projectQuantity",
          },
        },
      },
      {
        $addFields: {
          monthOrder: {
            $switch: {
              branches: [
                {
                  case: {
                    $eq: ["$_id.month", 1],
                  },
                  then: 10,
                },
                {
                  case: {
                    $eq: ["$_id.month", 2],
                  },
                  then: 11,
                },
                {
                  case: {
                    $eq: ["$_id.month", 3],
                  },
                  then: 12,
                },
                {
                  case: {
                    $eq: ["$_id.month", 4],
                  },
                  then: 1,
                },
                {
                  case: {
                    $eq: ["$_id.month", 5],
                  },
                  then: 2,
                },
                {
                  case: {
                    $eq: ["$_id.month", 6],
                  },
                  then: 3,
                },
                {
                  case: {
                    $eq: ["$_id.month", 7],
                  },
                  then: 4,
                },
                {
                  case: {
                    $eq: ["$_id.month", 8],
                  },
                  then: 5,
                },
                {
                  case: {
                    $eq: ["$_id.month", 9],
                  },
                  then: 6,
                },
                {
                  case: {
                    $eq: ["$_id.month", 10],
                  },
                  then: 7,
                },
                {
                  case: {
                    $eq: ["$_id.month", 11],
                  },
                  then: 8,
                },
                {
                  case: {
                    $eq: ["$_id.month", 12],
                  },
                  then: 9,
                },
              ],
              default: "Invalid month",
            },
          },
        },
      },
      {
        $sort: {
          monthOrder: 1,
        },
      },
      {
        $addFields: {
          monthName: {
            $switch: {
              branches: [
                {
                  case: {
                    $eq: ["$_id.month", 1],
                  },
                  then: "Jan",
                },
                {
                  case: {
                    $eq: ["$_id.month", 2],
                  },
                  then: "Feb",
                },
                {
                  case: {
                    $eq: ["$_id.month", 3],
                  },
                  then: "Mar",
                },
                {
                  case: {
                    $eq: ["$_id.month", 4],
                  },
                  then: "Apr",
                },
                {
                  case: {
                    $eq: ["$_id.month", 5],
                  },
                  then: "May",
                },
                {
                  case: {
                    $eq: ["$_id.month", 6],
                  },
                  then: "Jun",
                },
                {
                  case: {
                    $eq: ["$_id.month", 7],
                  },
                  then: "Jul",
                },
                {
                  case: {
                    $eq: ["$_id.month", 8],
                  },
                  then: "Aug",
                },
                {
                  case: {
                    $eq: ["$_id.month", 9],
                  },
                  then: "Sept",
                },
                {
                  case: {
                    $eq: ["$_id.month", 10],
                  },
                  then: "Oct",
                },
                {
                  case: {
                    $eq: ["$_id.month", 11],
                  },
                  then: "Nov",
                },
                {
                  case: {
                    $eq: ["$_id.month", 12],
                  },
                  then: "Dec",
                },
              ],
              default: "Invalid month",
            },
          },
        },
      },
      {
        $group: {
          _id: "$_id.clientFolderName",
          finalData: {
            $push: {
              $concat: [
                "$monthName",
                "-",
                {
                  $toString: "$totalQty",
                },
              ],
            },
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);
    /////////////////for overall total count
    let projectDetailsSum = await Project.aggregate([
      {
        $match: {
          projectStatus: {
            $ne: "Trash",
          },
          _id: {
            $ne: "",
          },
          projectBelongsToId: {
            $eq: null,
          },
        },
      },
      {
        $match: query,
      },
      {
        $addFields: {
          projectDate: {
            $toDate: "$projectDate",
          },
        },
      },
      {
        $match: {
          projectDate: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },

      {
        $group: {
          _id: {
            clientFolderName: "$clientFolderName",
            month: {
              $month: "$projectDate",
            },
            year: {
              $year: "$projectDate",
            },
          },
          totalQty: {
            $sum: "$projectQuantity",
          },
        },
      },
      {
        $addFields: {
          monthName: {
            $switch: {
              branches: [
                {
                  case: {
                    $eq: ["$_id.month", 1],
                  },
                  then: "Jan",
                },
                {
                  case: {
                    $eq: ["$_id.month", 2],
                  },
                  then: "Feb",
                },
                {
                  case: {
                    $eq: ["$_id.month", 3],
                  },
                  then: "Mar",
                },
                {
                  case: {
                    $eq: ["$_id.month", 4],
                  },
                  then: "Apr",
                },
                {
                  case: {
                    $eq: ["$_id.month", 5],
                  },
                  then: "May",
                },
                {
                  case: {
                    $eq: ["$_id.month", 6],
                  },
                  then: "Jun",
                },
                {
                  case: {
                    $eq: ["$_id.month", 7],
                  },
                  then: "Jul",
                },
                {
                  case: {
                    $eq: ["$_id.month", 8],
                  },
                  then: "Aug",
                },
                {
                  case: {
                    $eq: ["$_id.month", 9],
                  },
                  then: "Sept",
                },
                {
                  case: {
                    $eq: ["$_id.month", 10],
                  },
                  then: "Oct",
                },
                {
                  case: {
                    $eq: ["$_id.month", 11],
                  },
                  then: "Nov",
                },
                {
                  case: {
                    $eq: ["$_id.month", 12],
                  },
                  then: "Dec",
                },
              ],
              default: "Invalid month",
            },
          },
        },
      },
      {
        $group: {
          _id: "$monthName",
          totalCount: {
            $sum: "$totalQty",
          },
        },
      },
    ]);

    res.json({
      projectDetails: projectDetails,
      projectDetailsSum: projectDetailsSum,
    });
  } catch (error) {
    console.log(error.message);
  }
});
//Get Financial Client Details end

//sct all clients count and list start

router.post("/get-all-sct-calls-count", auth, async (req, res) => {
  let { selDate, dateType, fromdate, todate, assignedTo } = req.body;

  const userInfo = await EmployeeDetails.findById(req.user.id).select(
    "-password"
  );

  var dateVal = new Date().toISOString().split("T")[0];

  if (selDate) dateVal = selDate;
  let sctCallFromId = "",
    query = {};

  if (userInfo.empCtAccess !== "All") sctCallFromId = userInfo._id;
  else {
    if (assignedTo) sctCallFromId = mongoose.Types.ObjectId(assignedTo);
    else sctCallFromId = { $ne: null };
  }

  if (dateType === "Multi Date") {
    query = {
      sctCallFromId,
      sctCallTakenDate: {
        $gte: fromdate,
        $lte: todate,
      },
    };
  } else {
    query = {
      sctCallTakenDate: dateVal,
      sctCallFromId,
    };
  }
  try {
    const getAllSctCallsCount = await SctCalls.aggregate([
      {
        $match: query,
      },
      {
        $group: {
          _id: "$sctCallFromId",
          sctCallFromName: { $first: "$sctCallFromName" },
          count: { $sum: 1 },
        },
      },
    ]);
    let getAllSctCallsClient = [];
    if (userInfo.empCtAccess === "All") {
      getAllSctCallsClient = await SctCalls.aggregate([
        {
          $match: query,
        },
        {
          $group: {
            _id: {
              sctCallFromId: "$sctCallFromId",
              sctCallToId: "$sctCallToId",
            },
            sctCallFromId: { $first: "$sctCallFromId" },
            sctCallFromName: { $first: "$sctCallFromName" },
            count: { $sum: 1 },
          },
        },
        {
          $group: {
            _id: "$sctCallFromId",
            sctCallFromName: { $first: "$sctCallFromName" },
            countClient: { $sum: 1 },
            countCall: { $sum: "$count" },
            sctLeadsCategory: { $first: "$sctLeadsCategory" },
          },
        },
      ]);
    } else {
      getAllSctCallsClient = await SctCalls.aggregate([
        {
          $match: query,
        },
        {
          $group: {
            _id: "$sctCallToId",
            sctCallFromName: { $first: "$sctCallFromName" },
            countClient: { $sum: 1 },
            sctLeadsCategory: { $first: "$sctLeadsCategory" },
          },
        },
        // {
        //   $project: {},
        // },
      ]);
    }
    res.json({
      getAllSctCallsCount: getAllSctCallsCount,
      getAllSctCallsClient: getAllSctCallsClient,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

////get monthwise potential summary start
//--------------------------------------------------------------------------------------------------------------

//sct call count
router.post("/get-sct-potential-clients", auth, async (req, res) => {
  let { selDate, dateType, fromdate, todate, MonthDate, assignedTo } = req.body;

  const userInfo = await EmployeeDetails.findById(req.user.id).select(
    "-password"
  );

  var dateVal = new Date().toISOString().split("T")[0];

  if (MonthDate) dateVal = MonthDate;
  let sctCallFromId = "",
    query = {};

  if (userInfo.empCtAccess !== "All") sctCallFromId = userInfo._id;
  else {
    if (assignedTo) sctCallFromId = mongoose.Types.ObjectId(assignedTo);
    else sctCallFromId = { $ne: null };
  }

  if (dateType === "Multi Date") {
    query = {
      sctCallFromId,
      sctCallCategory: { $eq: "PT" },
      sctLeadsCategory: { $ne: "" },
      sctCallTakenDate: {
        $gte: fromdate,
        $lte: todate,
      },
    };
  } else {
    query = {
      sctCallCategory: { $eq: "PT" },
      sctLeadsCategory: { $ne: "" },
      sctCallTakenDate: dateVal,
      sctCallFromId,
    };
  }
  try {
    let getAllSctCallsClient = [];
    if (userInfo.empCtAccess === "All") {
      getAllSctCallsClient = await SctCalls.find(query);
      // {
      //   $group: {
      //     _id: {
      //       sctCallFromId: "$sctCallFromId",
      //       sctCallToId: "$sctCallToId",
      //     },
      //     sctCallFromId: { $first: "$sctCallFromId" },
      //     sctCallFromName: { $first: "$sctCallFromName" },
      //     count: { $sum: 1 },
      //   },
      // },
      // {
      //   $group: {
      //     _id: "$sctCallFromId",
      //     sctCallFromName: { $first: "$sctCallFromName" },
      //     // countClient: { $sum: 1 },
      //     // countCall: { $sum: "$count" },
      //     // sctLeadsCategory: { $first: "$sctLeadsCategory" },
      //   },
      // },
    } else {
      getAllSctCallsClient = await SctCalls.find(query);

      // {
      //   $group: {
      //     _id: "$sctCallToId",
      //     sctCallFromName: { $first: "$sctCallFromName" },
      //     // countClient: { $sum: 1 },
      //     // sctLeadsCategory: { $first: "$sctLeadsCategory" },
      //   },
      // },
    }
    res.json({
      getAllSctCallsClient: getAllSctCallsClient,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

//sct followup start
router.post("/get-sct-FollowUp-clients", auth, async (req, res) => {
  let { MonthDate, dateType, fromdate, todate, assignedTo } = req.body;
  const userInfo = await EmployeeDetails.findById(req.user.id).select(
    "-password"
  );
  var dateVal = new Date().toISOString().split("T")[0];

  if (MonthDate) dateVal = MonthDate;
  let sctCallFromId = "",
    query = {};

  if (userInfo.empCtAccess !== "All") sctCallFromId = userInfo._id;
  else {
    if (assignedTo) sctCallFromId = mongoose.Types.ObjectId(assignedTo);
    else sctCallFromId = { $ne: null };
  }

  if (dateType === "Multi Date") {
    query = {
      sctCallFromId,
      sctCallCategory: { $eq: "F" },
      sctLeadsCategory: { $eq: "" },
      sctCallTakenDate: {
        $gte: fromdate,
        $lte: todate,
      },
    };
  } else {
    query = {
      sctCallCategory: { $eq: "F" },
      sctLeadsCategory: { $eq: "" },
      sctCallTakenDate: dateVal,
      sctCallFromId,
    };
  }
  try {
    let getAllSctCallsClient = [];
    if (userInfo.empCtAccess === "All") {
      getAllSctCallsClient = await SctCalls.find(query);
      // {
      //   $group: {
      //     _id: {
      //       sctCallFromId: "$sctCallFromId",
      //       sctCallToId: "$sctCallToId",
      //     },
      //     sctCallFromId: { $first: "$sctCallFromId" },
      //     sctCallFromName: { $first: "$sctCallFromName" },
      //     count: { $sum: 1 },
      //   },
      // },
      // {
      //   $group: {
      //     _id: "$sctCallFromId",
      //     sctCallFromName: { $first: "$sctCallFromName" },
      //     // countClient: { $sum: 1 },
      //     // countCall: { $sum: "$count" },
      //     // sctLeadsCategory: { $first: "$sctLeadsCategory" },
      //   },
      // },
    } else {
      getAllSctCallsClient = await SctCalls.find(query);

      // {
      //   $group: {
      //     _id: "$sctCallToId",
      //     sctCallFromName: { $first: "$sctCallFromName" },
      //     // countClient: { $sum: 1 },
      //     // sctLeadsCategory: { $first: "$sctLeadsCategory" },
      //   },
      // },
    }
    res.json({
      getAllSctCallsClient: getAllSctCallsClient,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});
//sct followup end

//summary data start
router.post("/get-over-all-summary", auth, async (req, res) => {
  let { selDate, dateType, fromdate, todate, assignedTo } = req.body;
  const userInfo = await EmployeeDetails.findById(req.user.id).select(
    "-password"
  );

  var dateVal = new Date().toISOString().split("T")[0];

  if (selDate) dateVal = selDate;
  let sctCallFromId = "",
    query = {};

  if (userInfo.empCtAccess !== "All") sctCallFromId = userInfo._id;
  else {
    if (assignedTo) sctCallFromId = mongoose.Types.ObjectId(assignedTo);
    else sctCallFromId = { $ne: null };
  }

  if (dateType === "Multi Date") {
    query = {
      $and: [
        // sctCallFromId,
        {
          $or: [
            { sctCallCategory: { $eq: "F" } },
            { sctCallCategory: { $eq: "P" } },
          ],
        },
        {
          sctCallTakenDate: {
            $gte: fromdate,
            $lte: todate,
          },
        },
      ],

      // sctCallCategory: {

      // },
    };
  } else {
    query = {
      $and: [
        //sctCallFromId,
        {
          $or: [
            { sctCallCategory: { $eq: "F" } },
            { sctCallCategory: { $eq: "P" } },
          ],
        },
        {
          sctCallTakenDate: dateVal,
        },
      ],

      //sctCallFromId,
    };
  }
  try {
    const getAllSctCallsCount = await SctCalls.aggregate([
      {
        $match: query,
      },
      {
        $group: {
          _id: "$sctCallFromId",
          sctCallFromName: { $first: "$sctCallFromName" },
          count: { $sum: 1 },
        },
      },
    ]);
    let getAllSctCallsClient = [];
    if (userInfo.empCtAccess === "All") {
      getAllSctCallsClient = await SctCalls.aggregate([
        {
          $match: query,
        },
        {
          $project: {
            sctCallCategory: "$sctCallCategory",
            sctLeadsCategory: "$sctLeadsCategory",
            sctExpectedMonthYear: "$sctExpectedMonthYear",
            sctCallFromId: "$sctCallFromId",
            sctCallFromName: "$sctCallFromName",
            sctCallSalesValue: "$sctCallSalesValue",
          },
        },
        // {
        //   $group: {
        //     _id: "$sctCallFromId",
        //     sctExpectedMonthYear: { $first: "$sctExpectedMonthYear" },
        //     sctCallFromName: { $first: "$sctCallFromName" },
        //     sctCallSalesValue: { $first: "$sctCallSalesValue" },
        //   },
        // },
        //   //   $group: {
        //   //     _id: {
        //   //       sctCallFromId: "$sctCallFromId",
        //   //       sctCallToId: "$sctCallToId",
        //   //     },
        //   //     sctCallFromId: { $first: "$sctCallFromId" },
        //   //     sctCallFromName: { $first: "$sctCallFromName" },
        //   //     sctExpectedMonthYear: { $first: "$sctExpectedMonthYear" },
        //   //     countClient: { $: "$countClient" },

        //   //     count: { $sum: 1 },
        //   //   },
        //   // },
        //   // {
        //   //   $group: {
        //   //     _id: "$sctCallFromId",
        //   //     sctCallFromName: { $first: "$sctCallFromName" },
        //   //     countClient: { $first: "$countClient" },
        //   //     countCall: { $sum: "$count" },
        //   //     sctExpectedMonthYear: { $first: "$sctExpectedMonthYear" },
        //   //   },
        //   // },
        // },
      ]);
    } else {
      getAllSctCallsClient = await SctCalls.aggregate([
        {
          $match: query,
        },
        // {
        //   $group: {
        //     _id: "$sctCallToId",
        //     sctCallFromName: { $first: "$sctCallFromName" },
        //     countClient: { $first: "$countClient" },
        //     sctExpectedMonthYear: { $last: "$sctExpectedMonthYear" },
        //   },
        // },
      ]);
    }
    res.json({
      getAllSctCallsCount: getAllSctCallsCount,
      getAllSctCallsClient: getAllSctCallsClient,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});
//summary data end

//summary for callReport start
router.post("/get-summary", auth, async (req, res) => {
  let { fromdate, todate } = req.body;
  const userInfo = await EmployeeDetails.findById(req.user.id).select(
    "-password"
  );
  let query;
  if (userInfo.empCtAccess !== "All") query = { sctCallFromId: userInfo._id };
  else query = { sctCallFromId: { $ne: null } };

  try {
    getAllSctCalls = await SctCalls.aggregate([
      {
        $match: {
          $or: [
            {
              sctExpectedMonth: {
                $ne: "",
              },
            },
          ],
        },
      },
      {
        $match: query,
      },
      {
        $addFields: {
          sctCallTakenDate: {
            $toDate: "$sctCallTakenDate",
          },
          month: {
            $month: {
              $toDate: "$sctExpectedMonth",
            },
          },
          year: {
            $year: {
              $toDate: "$sctExpectedMonth",
            },
          },
        },
      },
      {
        $match: {
          sctCallTakenDate: {
            $gte: new Date(fromdate),
            $lte: new Date(todate),
          },
        },
      },
      {
        $group: {
          _id: {
            sctCallFromId: "$sctCallFromId",
            sctCallToId: "$sctCallToId",
          },
          lastRecord: {
            $last: "$$ROOT",
          },
        },
      },
      {
        $match: {
          $or: [
            {
              "lastRecord.sctCallCategory": "F",
            },
            {
              "lastRecord.sctCallCategory": "PT",
            },
          ],
        },
      },
      {
        $group: {
          _id: {
            monthRecord: "$lastRecord.month",
            yearRecord: "$lastRecord.year",
          },
          countClient: {
            $sum: 1,
          },
          sctCallSalesValue: {
            $sum: "$lastRecord.sctCallSalesValue",
          },
        },
      },
      {
        $addFields: {
          ExpMthYear: {
            $switch: {
              branches: [
                {
                  case: {
                    $eq: ["$_id.monthRecord", 1],
                  },
                  then: {
                    $concat: [
                      "Jan",
                      "-",
                      {
                        $toString: "$_id.yearRecord",
                      },
                    ],
                  },
                },
                {
                  case: {
                    $eq: ["$_id.monthRecord", 2],
                  },
                  then: {
                    $concat: [
                      "Feb",
                      "-",
                      {
                        $toString: "$_id.yearRecord",
                      },
                    ],
                  },
                },
                {
                  case: {
                    $eq: ["$_id.monthRecord", 3],
                  },
                  then: {
                    $concat: [
                      "Mar",
                      "-",
                      {
                        $toString: "$_id.yearRecord",
                      },
                    ],
                  },
                },
                {
                  case: {
                    $eq: ["$_id.monthRecord", 4],
                  },
                  then: {
                    $concat: [
                      "Apr",
                      "-",
                      {
                        $toString: "$_id.yearRecord",
                      },
                    ],
                  },
                },
                {
                  case: {
                    $eq: ["$_id.monthRecord", 5],
                  },
                  then: {
                    $concat: [
                      "May",
                      "-",
                      {
                        $toString: "$_id.yearRecord",
                      },
                    ],
                  },
                },
                {
                  case: {
                    $eq: ["$_id.monthRecord", 6],
                  },
                  then: {
                    $concat: [
                      "Jun",
                      "-",
                      {
                        $toString: "$_id.yearRecord",
                      },
                    ],
                  },
                },
                {
                  case: {
                    $eq: ["$_id.monthRecord", 7],
                  },
                  then: {
                    $concat: [
                      "Jul",
                      "-",
                      {
                        $toString: "$_id.yearRecord",
                      },
                    ],
                  },
                },
                {
                  case: {
                    $eq: ["$_id.monthRecord", 8],
                  },
                  then: {
                    $concat: [
                      "Aug",
                      "-",
                      {
                        $toString: "$_id.yearRecord",
                      },
                    ],
                  },
                },
                {
                  case: {
                    $eq: ["$_id.monthRecord", 9],
                  },
                  then: {
                    $concat: [
                      "Sep",
                      "-",
                      {
                        $toString: "$_id.yearRecord",
                      },
                    ],
                  },
                },
                {
                  case: {
                    $eq: ["$_id.monthRecord", 10],
                  },
                  then: {
                    $concat: [
                      "Oct",
                      "-",
                      {
                        $toString: "$_id.yearRecord",
                      },
                    ],
                  },
                },
                {
                  case: {
                    $eq: ["$_id.monthRecord", 11],
                  },
                  then: {
                    $concat: [
                      "Nov",
                      "-",
                      {
                        $toString: "$_id.yearRecord",
                      },
                    ],
                  },
                },
                {
                  case: {
                    $eq: ["$_id.monthRecord", 12],
                  },
                  then: {
                    $concat: [
                      "Dec",
                      "-",
                      {
                        $toString: "$_id.yearRecord",
                      },
                    ],
                  },
                },
              ],
              default: "Invalid month",
            },
          },
        },
      },
      {
        $project: {
          _id: "$ExpMthYear",
          monthRecord: "$_id.monthRecord",
          yearRecord: "$_id.yearRecord",
          sctCallSalesValue: "$sctCallSalesValue",
          countClient: "$countClient",
        },
      },
      {
        $sort: {
          yearRecord: 1,
          monthRecord: 1,
        },
      },
    ]);
    res.json(getAllSctCalls);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});
//summary for callReport end

//sct call with client sales value start
router.post("/get-all-sct-calls-count-1", auth, async (req, res) => {
  let { fromdate, todate } = req.body;
  const userInfo = await EmployeeDetails.findById(req.user.id).select(
    "-password"
  );

  let query;
  if (userInfo.empCtAccess !== "All") query = { sctCallFromId: userInfo._id };
  else query = { sctCallFromId: { $ne: null } };

  try {
    const getAllSctCalls = await SctCalls.aggregate([
      {
        $match: query,
      },
      {
        $addFields: {
          sctCallTakenDate: {
            $toDate: "$sctCallTakenDate",
          },
        },
      },
      {
        $match: {
          sctCallTakenDate: {
            $gte: new Date(fromdate),
            $lte: new Date(todate),
          },
          sctCallCategory: "PT",
          sctCallSalesValue: {
            $gt: 0,
          },
        },
      },
      {
        $group: {
          _id: {
            sctCallFromId: "$sctCallFromId",
            sctCallToId: "$sctCallToId",
          },
          lastRecord: {
            $last: "$$ROOT",
          },
        },
      },
      {
        $group: {
          _id: "$_id.sctCallFromId",
          countClient: {
            $sum: 1,
          },
          sctCallSalesValue: {
            $sum: "$lastRecord.sctCallSalesValue",
          },
          sctCallFromName: {
            $last: "$lastRecord.sctCallFromName",
          },
        },
      },
      {
        $sort: {
          sctCallFromName: 1,
        },
      },
    ]);
    res.json({
      getAllSctCallsClient: getAllSctCalls,
    });
  } catch (err) {
    console.error("Sct Potential Count", err.message);
    res.status(500).send("Internal Server Error.");
  }
});

//sct call with client sales value end

//followup start

router.post("/get-all-sct-FollowUp", auth, async (req, res) => {
  let { fromdate, todate } = req.body;
  const userInfo = await EmployeeDetails.findById(req.user.id).select(
    "-password"
  );

  let query;
  if (userInfo.empCtAccess !== "All") query = { sctCallFromId: userInfo._id };
  else query = { sctCallFromId: { $ne: null } };

  try {
    getAllSctCalls = await SctCalls.aggregate([
      {
        $match: query,
      },
      {
        $addFields: {
          sctCallTakenDate: {
            $toDate: "$sctCallTakenDate",
          },
        },
      },
      {
        $match: {
          sctCallTakenDate: {
            $gte: new Date(fromdate),
            $lte: new Date(todate),
          },
          sctCallCategory: "F",
          sctCallSalesValue: {
            $gt: 0,
          },
        },
      },
      {
        $group: {
          _id: {
            sctCallFromId: "$sctCallFromId",
            sctCallToId: "$sctCallToId",
          },
          lastRecord: {
            $last: "$$ROOT",
          },
        },
      },
      {
        $group: {
          _id: "$_id.sctCallFromId",
          countClient: {
            $sum: 1,
          },
          sctCallSalesValue: {
            $sum: "$lastRecord.sctCallSalesValue",
          },
          sctCallFromName: {
            $last: "$lastRecord.sctCallFromName",
          },
        },
      },
      {
        $sort: {
          sctCallFromName: 1,
        },
      },
    ]);
    res.json({
      getAllSctCallsClient: getAllSctCalls,
    });
  } catch (err) {
    console.error("All Followup", err.message);
    res.status(500).send("Internal Server Error.");
  }
});

//followup end

router.post("/check-demo", async (req, res) => {
  const { demoUserId } = req.body;
  try {
    const checkForDemo = await Demo.find({
      clientId: demoUserId,
      demoStatus: "Taken",
    }).count();
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
          sctClientGstNo: data.sctClientGstNo,
          sctClientPanNo: data.sctClientPanNo,
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

router.post("/invoice-print", async (req, res) => {
  const { clientId } = req.body;
  try {
    const printInvoice = await Invoice.findOne({
      clientId: clientId,
      status: "Active",
    })
      .sort({ _id: -1 })
      .limit(1);
    res.json(printInvoice);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post(
  "/upload-po-file",
  upload.single("myFile"),
  async (req, res, next) => {
    const data = req.body;
    const uploadPo = await SctClients.updateOne(
      { _id: data.clientId },
      {
        $set: {
          POFile: req.file,
          // billingStatus: "POReceived",
          // billingStatusCategory: "PO",
          billingStatus: data.billingStatus,
          billingStatusCategory: data.billingStatusCategory,
        },
      }
    );
    res.sendStatus(200);
  }
);

router.post("/selected-client", async (req, res) => {
  const data = req.body;
  try {
    const selectedSctClients = await SctClients.findOne({ _id: data.clientId });
    res.json(selectedSctClients);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post(
  "/upload-agreement-file",
  upload.single("myFile"),
  async (req, res, next) => {
    const data = req.body;
    const uploadAgreement = await SctClients.updateOne(
      { _id: data.clientId },
      {
        $set: {
          agreementFile: req.file,
          billingStatus: "AgreementReceived",
          billingStatusCategory: "Invoice",
        },
      }
    );
    res.sendStatus(200);
  }
);

router.post("/get-lead-staffs-data", async (req, res) => {
  let { leadDataVal } = req.body;
  let query = {};
  if (leadDataVal) {
    query = {
      _id: leadDataVal._id,
    };
  }
  try {
    const getLeadStaffData = await SctLeads.findOne(query);
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
    const getClientsStaffData = await SctClients.findOne(query);
    res.json(getClientsStaffData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-sct-leads-list", async (req, res) => {
  try {
    const getLeadsListData = await SctLeads.find(
      {
        sctLeadStatus: "Active",
      },
      {
        sctWebsite: 1,
        sctCompanyName: 1,
        projectsId: 1,
        sctEmailId: 1,
      }
    );
    res.json(getLeadsListData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-sct-leads-details", auth, async (req, res) => {
  const { sctLeadAssignedToId } = req.body;
  let query = {};
  query = {
    sctLeadAssignedToId: {
      $eq: sctLeadAssignedToId,
    },
  };
  try {
    const allSctLeadDetails = await SctLeads.find(query);
    res.json(allSctLeadDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/sct-transfer-lead", async (req, res) => {
  try {
    let data = req.body;
    let i = 0;

    for (i = 0; i < data.access.length; i++) {
      await SctLeads.updateOne(
        { _id: data.access[i].transfercheckedId },
        {
          $set: {
            sctLeadAssignedToId: data.sctLeadTransferToId,
            sctLeadAssignedToName: data.sctLeadTransferToName,
            sctLeadTransferByName: data.sctLeadTransferByName,
            sctLeadTransferById: data.sctLeadTransferById,
            sctLeadTransferDateTime: data.sctLeadTransferDateTime,
          },
        }
      );
    }
    res.json({ status: "success" });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

router.post("/add-import-sct-lead-data", async (req, res) => {
  let filePath = "D:/PMSExcelImport/";
  let data = req.body;
  let pathName = filePath + data.filePathName;
  csvtojson()
    .fromFile(pathName)
    .then((csvData) => {
      SctLeads.insertMany(csvData)
        .then(function () {
          console.log("Data inserted");
          res.json({ success: "success" });
        })
        .catch(function (error) {
          console.log(error);
        });
    });
});

router.post("/get-all-sct-calls-client-count", auth, async (req, res) => {
  let { selectedDate, assignedTo } = req.body;
  const userInfo = await EmployeeDetails.findById(req.user.id).select(
    "-password"
  );
  var dateVal = new Date().toISOString().split("T")[0];
  let sctCallFromId = "",
    query = {};

  if (userInfo.empCtAccess !== "All") sctCallFromId = userInfo._id;
  else {
    if (assignedTo) sctCallFromId = mongoose.Types.ObjectId(assignedTo);
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
    const getAllSctCallsDetails = await SctCalls.aggregate([
      {
        $match: query,
      },
      {
        $group: {
          _id: "$sctCallToId",
        },
      },
    ]);
    res.json(getAllSctCallsDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

// router.post("/get-all-demos", auth, async (req, res) => {
//   const { stateId, clientId, demoDate } = req.body;
//   const userInfo = await EmployeeDetails.findById(req.user.id).select(
//     "-password"
//   );
//   let query = {
//     demoDate: new Date().toISOString().split("T")[0],
//     demoEnteredById: mongoose.Types.ObjectId(userInfo._id),
//   };
//   if (stateId) {
//     if (clientId)
//       query = {
//         "clientDetails.stateId": mongoose.Types.ObjectId(stateId),
//         clientId: mongoose.Types.ObjectId(clientId),
//         demoDate: demoDate,
//         demoEnteredById: mongoose.Types.ObjectId(userInfo._id),
//       };
//     else
//       query = {
//         "clientDetails.stateId": mongoose.Types.ObjectId(stateId),
//         demoDate: demoDate,
//         demoEnteredById: mongoose.Types.ObjectId(userInfo._id),
//       };
//   } else if (clientId) {
//     query = {
//       clientId: mongoose.Types.ObjectId(clientId),
//       demoDate: demoDate,
//       demoEnteredById: mongoose.Types.ObjectId(userInfo._id),
//     };
//   } else if (demoDate) {
//     query = {
//       demoDate: demoDate,
//       demoEnteredById: mongoose.Types.ObjectId(userInfo._id),
//     };
//   }
//   try {
//     const allDemos = await Demo.aggregate([
//       { $match: query },
//       { $sort: { demoStatus: -1 } },
//     ]);
//     res.json(allDemos);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Internal Server Error.");
//   }
// });

// router.post("/get-all-demos-state", auth, async (req, res) => {
//   const { demoDate } = req.body;
//   const userInfo = await EmployeeDetails.findById(req.user.id).select(
//     "-password"
//   );
//   let query = {
//     demoDate: new Date().toISOString().split("T")[0],
//     demoEnteredById: mongoose.Types.ObjectId(userInfo._id),
//   };
//   if (demoDate) {
//     query = {
//       demoDate: demoDate,
//       demoEnteredById: mongoose.Types.ObjectId(userInfo._id),
//     };
//   }
//   try {
//     const allDemoStates = await Demo.aggregate([
//       { $match: query },
//       {
//         $group: {
//           _id: "$clientDetails.stateId",
//           stateName: { $first: "$clientDetails.stateName" },
//         },
//       },
//       { $sort: { _id: 1 } },
//     ]);
//     res.json(allDemoStates);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Internal Server Error.");
//   }
// });

// router.post("/get-all-demos-leads", auth, async (req, res) => {
//   const { stateId, demoDate } = req.body;
//   const userInfo = await EmployeeDetails.findById(req.user.id).select(
//     "-password"
//   );
//   let query = {
//     demoDate: new Date().toISOString().split("T")[0],
//     demoEnteredById: mongoose.Types.ObjectId(userInfo._id),
//   };

//   if (stateId) {
//     query = {
//       "clientDetails.stateId": mongoose.Types.ObjectId(stateId),
//       demoDate: demoDate,
//       demoEnteredById: mongoose.Types.ObjectId(userInfo._id),
//     };
//   }
//   try {
//     const allDemoLeads = await Demo.aggregate([
//       { $match: query },
//       {
//         $group: {
//           _id: "$clientId",
//           sctClientName: { $first: "$clientName" },
//         },
//       },
//       { $sort: { _id: 1 } },
//     ]);
//     res.json(allDemoLeads);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Internal Server Error.");
//   }
// });

module.exports = router;
