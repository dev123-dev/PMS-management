const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const Country = require("../../models/regions/country");
const State = require("../../models/regions/state");
const District = require("../../models/regions/district");

//ADD

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

//EDIT
router.post("/edit-country-details", async (req, res) => {
  try {
    let data = req.body;
    const updateCountryDetails = await ProjectStatus.updateOne(
      { _id: data.recordId },
      {
        $set: {
          countryName: data.countryName,
        },
      }
    );
    res.json(updateCountryDetails);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

//SELECT

router.get("/get-all-countries", async (req, res) => {
  try {
    const getAllCountries = await Country.find({});
    res.json(getAllCountries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.get("/get-all-states", async (req, res) => {
  try {
    const getAllStates = await State.find({});
    res.json(getAllStates);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.get("/get-all-districts", async (req, res) => {
  try {
    const getAllDistricts = await District.find({});
    res.json(getAllDistricts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

module.exports = router;
