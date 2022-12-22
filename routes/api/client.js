const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const ClientDetails = require("../../models/Client");
const ClientHistoryDetails = require("../../models/ClientHistory");
const DctClients = require("../../models/dct/dctClients");
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
      chStandardInstruction: allClientdata.standardInstruction,
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
          standardInstruction: data.standardInstruction,
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
          clientDeactiveReason: data.clientDeactiveReason,
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

router.post("/get-client-filter", async (req, res) => {
  query = {
    dctClientStatus: {
      $eq: "Active",
    },
  };

  try {
    const getClientFilterDetails = await DctClients.find(query);
    res.json(getClientFilterDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-active-staff-filter", async (req, res) => {
  const { clientId } = req.body;
  let query = {};
  // if (staffTypeinfo) {
  query = {
    // clientStatus: {
    //   $eq: "Active",
    // },
    _id: {
      $eq: clientId,
    },
  };
  // } else {
  //   query = {
  //     // clientStatus: {
  //     //   $eq: "Active",
  //     // },
  //     clientType: {
  //       $eq: "Regular",
  //     },
  //   };
  // }
  try {
    const getActiveStaffFilterDetails = await DctClients.find(query);
    res.json(getActiveStaffFilterDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

// router.post("/get-dailyjobsheet-client", async (req, res) => {
//   const { selDate, fromdate, todate, dateType } = req.body;
//   let query = {};
//   if (dateType === "Multi Date") {
//     query = {
//       projectStatus: {
//         $eq: "Active",
//       },
//       projectDate: {
//         $gte: fromdate,
//         $lte: todate,
//       },
//     };
//   } else if (dateType === "Single Date") {
//     if (selDate) selDateVal = selDate;
//     else selDateVal = new Date().toISOString().split("T")[0];

//     query = {
//       projectStatus: {
//         $eq: "Active",
//       },
//       projectDate: {
//         $eq: selDateVal,
//       },
//     };
//   } else {
//     query = {
//       projectStatus: {
//         $eq: "Active",
//       },
//       projectDate: {
//         $eq: new Date().toISOString().split("T")[0],
//       },
//     };
//   }
//   try {
//     const getDJSClientDetails = await Project.aggregate([
//       {
//         $match: query,
//       },
//       { $group: { _id: "$clientId", clientName: { $first: "$clientName" } } },
//     ]).sort({ clientName: 1 });
//     res.json(getDJSClientDetails);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Internal Server Error.");
//   }
// });

router.post("/get-dailyjobsheet-folder", async (req, res) => {
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
    const getDJSFolderDetails = await Project.aggregate([
      {
        $match: query,
      },
      {
        $group: {
          _id: "$clientFolderName",
          clientFolderName: { $first: "$clientFolderName" },
        },
      },
    ]).sort({ clientFolderName: 1 });
    res.json(getDJSFolderDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

// router.post("/get-verification-client", async (req, res) => {
//   let query = {};
//   query = {
//     projectStatus: {
//       $eq: "Active",
//     },
//     projectVerificationStatus: { $ne: "Verified" },
//   };
//   try {
//     const getVerfClientDetails = await Project.aggregate([
//       {
//         $match: query,
//       },
//       { $group: { _id: "$clientId", clientName: { $first: "$clientName" } } },
//     ]);
//     res.json(getVerfClientDetails);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Internal Server Error.");
//   }
// });

router.post("/get-verification-folder", async (req, res) => {
  let query = {};
  query = {
    projectStatus: {
      $eq: "Active",
    },
    projectVerificationStatus: { $ne: "Verified" },
  };
  try {
    const getVerfFolderDetails = await Project.aggregate([
      {
        $match: query,
      },
      {
        $group: {
          _id: "$clientFolderName",
          clientFolderName: { $first: "$clientFolderName" },
        },
      },
    ]);
    res.json(getVerfFolderDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-Report-clients", async (req, res) => {
  const { clientType } = req.body;
  let query = {};
  if (clientType) {
    query = { clientType: clientType };
  }
  try {
    const getProjectClients = await ClientDetails.find(query);
    res.json(getProjectClients);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

router.post("/get-filter-dctclient-details", async (req, res) => {
  const { clientId } = req.body;
  let query = {};
  if (clientId) {
    query = {
      _id: {
        $eq: clientId,
      },
    };
  }

  try {
    const allclientDetails = await DctClients.find(query);
    res.json(allclientDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error.");
  }
});

module.exports = router;
