const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const ClientDetails = require("../../models/Client");

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

    const updateEmployeeDetails = await EmployeeDetails.updateOne(
      { _id: data.recordId },
      {
        $set: {
          clientName: data.clientName,
          clientEmail: data.clientEmail,
          clientContactNo1: data.clientContactNo1,
          clientContactNo2: data.clientContactNo2,
          clientAddress: data.clientAddress,
          clientCountry: data.clientCountry,
          clientBelongsTo: data.clientBelongsTo,
          clientFolderName: data.clientFolderName,
          clientCurrency: data.clientCurrency,
          clientModeofPaymentId: data.clientModeofPaymentId,
          testClient: data.testClient,
        },
      }
    );
    res.json(updateEmployeeDetails);
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

router.post("/get-active-client", async (req, res) => {
  try {
    const getClientDetails = await ClientDetails.find({
      clientStatus: {
        $eq: "Active",
      },
    });
    res.json(getClientDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

module.exports = router;
