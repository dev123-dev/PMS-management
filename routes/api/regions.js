const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const Country = require("../../models/regions/country");
const State = require("../../models/regions/state");
const District = require("../../models/regions/district");

router.post("/add-country-details", async (req, res) => {
  let data = req.body;
  try {
    let AddCountryDetails = new Country(data);
    output = await AddCountryDetails.save();
    res.send(output);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/add-state-details", async (req, res) => {
  let data = req.body;
  try {
    let AddStateDetails = new State(data);
    output = await AddStateDetails.save();
    res.send(output);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/add-districts-details", async (req, res) => {
  let data = req.body;
  console.log;
  try {
    let AddDistrictDetails = new District(data);
    output = await AddDistrictDetails.save();
    res.send(output);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});
module.exports = router;
