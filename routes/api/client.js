const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const ClientDetails = require("../../models/Client");
const ClientHistoryDetails = require("../../models/ClientHistory");
const Project = require("../../models/Project");

//ADD
router.post("/add-client", async (req, res) => {
  let data = req.body;
  try {
    let clientDetails = new ClientDetails(data);
    output = await clientDetails.save();
    res.send(output);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/edit-client", async (req, res) => {
  try {
    let data = req.body;
    let allClientdata = data.allClientdata;
    const historyData = {
      chId: allClientdata._id,
      chName: allClientdata.clientName,
      chCompanyName: allClientdata.clientCompanyName,
      chCompanyFounderName: allClientdata.clientCompanyFounderName,
      chWebsite: allClientdata.clientWebsite,
      chBelongsToId: allClientdata.clientBelongsToId,
      chBelongsToName: allClientdata.clientBelongsToName,
      chEmail: allClientdata.clientEmail,
      chBillingEmail: allClientdata.clientBillingEmail,
      chContactNo1: allClientdata.clientContactNo1,
      chContactNo2: allClientdata.clientContactNo2,
      chAddress: allClientdata.clientAddress,
      chCountry: allClientdata.clientCountry,
      chFolderName: allClientdata.clientFolderName,
      chCurrency: allClientdata.clientCurrency,
      chPaymentId: allClientdata.PaymentId,
      chpaymentModeName: allClientdata.paymentModeName,
      chclientType: allClientdata.clientType,
    };
    let clientHistoryDetails = new ClientHistoryDetails(historyData);
    await clientHistoryDetails.save();
    const updateClientDetails = await ClientDetails.updateOne(
      { _id: data.recordId },
      {
        $set: {
          clientName: data.clientName,
          clientCompanyName: data.clientCompanyName,
          clientCompanyFounderName: data.clientCompanyFounderName,
          clientWebsite: data.clientWebsite,
          clientEmail: data.clientEmail,
          clientBillingEmail: data.clientBillingEmail,
          clientContactNo1: data.clientContactNo1,
          clientContactNo2: data.clientContactNo2,
          clientFolderName: data.clientFolderName,
          clientBelongsToId: data.clientBelongsToId,
          clientBelongsToName: data.clientBelongsToName,
          clientType: data.clientType,
          clientAddress: data.clientAddress,
          clientCountry: data.clientCountry,
          clientCurrency: data.clientCurrency,
          paymentId: data.paymentId,
          paymentModeName: data.paymentModeName,
        },
      }
    );
    res.json(updateClientDetails);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

//DEACTIVATE

router.post("/deactive-client", async (req, res) => {
  try {
    let data = req.body;
    const deactiveClientDetails = await ClientDetails.updateOne(
      { _id: data.recordId },
      {
        $set: {
          clientStatus: "Deactive",
          clientDeactiveById: data.clientDeactiveById,
          clientDeactiveDate: data.clientDeactiveDate,
          clientDeactiveDateTime: Date.now(),
        },
      }
    );
    res.json(deactiveClientDetails);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

//SELECT

router.post("/get-all-client", async (req, res) => {
  try {
    const getClientDetails = await ClientDetails.find({});
    res.json(getClientDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.get("/get-active-client", async (req, res) => {
  try {
    const getActiveClientDetails = await ClientDetails.find({
      clientStatus: {
        $eq: "Active",
      },
    });
    res.json(getActiveClientDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-active-client-filter", async (req, res) => {
  const { clientTypeinfo } = req.body;
  let query = {};
  if (clientTypeinfo) {
    query = {
      clientStatus: {
        $eq: "Active",
      },
      clientType: {
        $eq: clientTypeinfo,
      },
    };
  } else {
    query = {
      clientStatus: {
        $eq: "Active",
      },
      clientType: {
        $eq: "Regular",
      },
    };
  }
  try {
    const getActiveClientFilterDetails = await ClientDetails.find(query);
    res.json(getActiveClientFilterDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-dailyjobsheet-client", async (req, res) => {
  const { selDate, fromdate, todate, dateType } = req.body;
  let query = {};
  if (dateType === "Multi Date") {
    query = {
      projectStatus: {
        $eq: "Active",
      },
      projectDate: {
        $gte: fromdate,
        $lte: todate,
      },
    };
  } else if (dateType === "Single Date") {
    if (selDate) selDateVal = selDate;
    else selDateVal = new Date().toISOString().split("T")[0];

    query = {
      projectStatus: {
        $eq: "Active",
      },
      projectDate: {
        $eq: selDateVal,
      },
    };
  } else {
    query = {
      projectStatus: {
        $eq: "Active",
      },
      projectDate: {
        $eq: new Date().toISOString().split("T")[0],
      },
    };
  }
  try {
    const getDJSClientDetails = await Project.aggregate([
      {
        $match: query,
      },
      { $group: { _id: "$clientId", clientName: { $first: "$clientName" } } },
    ]);
    res.json(getDJSClientDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});
module.exports = router;
