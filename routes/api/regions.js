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
    const updateCountryDetails = await Country.updateOne(
      { _id: data.recordId },
      {
        $set: {
          countryName: data.countryName,
          countryCode: data.countryCode,
          countryEditedById: data.countryEditedById,
          countryEditedDateTime: new Date().toLocaleString("en-GB"),
        },
      }
    );
    res.json(updateCountryDetails);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

router.post("/edit-state-details", async (req, res) => {
  try {
    let data = req.body;
    const updateStateDetails = await State.updateOne(
      { _id: data.recordId },
      {
        $set: {
          stateName: data.stateName,
          stateEditedById: data.stateEditedById,
          stateEditedDateTime: new Date().toLocaleString("en-GB"),
        },
      }
    );
    res.json(updateStateDetails);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

router.post("/edit-districts-details", async (req, res) => {
  try {
    let data = req.body;
    const updateDistrictsDetails = await District.updateOne(
      { _id: data.recordId },
      {
        $set: {
          districtName: data.districtName,
          districtEditedById: data.districtEditedById,
          districtEditedDateTime: new Date().toLocaleString("en-GB"),
        },
      }
    );
    res.json(updateDistrictsDetails);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

//DEACTIVATE

router.post("/deactive-country-details", async (req, res) => {
  try {
    let data = req.body;
    const deactiveCountryDetails = await Country.updateOne(
      { _id: data.recordId },
      {
        $set: {
          countryStatus: data.countryStatus,
          countryDeactvateReason: data.countryDeactvateReason,
          countryDeactivateById: data.countryDeactivateById,
          countryDeactivateDateTime: new Date().toLocaleString("en-GB"),
        },
      }
    );
    res.json(deactiveCountryDetails);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});
router.post("/deactive-state-details", async (req, res) => {
  try {
    let data = req.body;
    const deactiveStateDetails = await State.updateOne(
      { _id: data.recordId },
      {
        $set: {
          stateStatus: data.stateStatus,
          stateDeactivateReason: data.stateDeactivateReason,
          stateDeactiveById: data.stateDeactiveById,
          stateDeactivateDateTime: new Date().toLocaleString("en-GB"),
        },
      }
    );
    res.json(deactiveStateDetails);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

router.post("/deactive-districts-details", async (req, res) => {
  try {
    let data = req.body;
    const deactiveDistrictsDetails = await District.updateOne(
      { _id: data.recordId },
      {
        $set: {
          districtStatus: data.districtStatus,
          districtDeactivateReason: data.districtDeactivateReason,
          districtDeactivateById: data.districtDeactivateById,
          districtDeactivateDateTime: new Date().toLocaleString("en-GB"),
        },
      }
    );
    res.json(deactiveDistrictsDetails);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

//SELECT

router.get("/get-all-countries", async (req, res) => {
  try {
    const getAllCountries = await Country.find({
      countryStatus: {
        $eq: "Active",
      },
    });
    res.json(getAllCountries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.get("/get-all-states", async (req, res) => {
  try {
    const getAllStates = await State.find({
      stateStatus: {
        $eq: "Active",
      },
    });
    res.json(getAllStates);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.get("/get-all-districts", async (req, res) => {
  try {
    query = {
      districtStatus: {
        $eq: "Active",
      },
    };
    const getAllDistricts = await District.aggregate([
      {
        $lookup: {
          from: "states",
          localField: "stateId",
          foreignField: "_id",
          as: "output",
        },
      },
      { $match: query },
      { $unwind: "$output" },
    ]);
    res.json(getAllDistricts);
    console.log(getAllDistricts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-active-country", async (req, res) => {
  // const { institutionId } = req.body;
  try {
    const getActiveCountry = await Country.find({
      countryStatus: {
        $eq: "Active",
      },
    });
    res.json(getActiveCountry);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-active-state", async (req, res) => {
  // const { institutionId } = req.body;
  try {
    const getActiveState = await State.find({
      stateStatus: {
        $eq: "Active",
      },
    });
    res.json(getActiveState);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-active-districs", async (req, res) => {
  // const { institutionId } = req.body;
  try {
    const getActiveDistrics = await District.find({
      districtStatus: {
        $eq: "Active",
      },
    });
    res.json(getActiveDistrics);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-state", async (req, res) => {
  let query = {};
  query = {
    stateStatus: {
      $eq: "Active",
    },
  };
  try {
    const stateDetails = await State.find(query);
    res.json(stateDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

module.exports = router;
