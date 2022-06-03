const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const ClientDetails = require("../../models/Client");

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

module.exports = router;
