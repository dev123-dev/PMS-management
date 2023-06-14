const express = require("express");
const router = express.Router();
const config = require("config");
const auth = require("../../middleware/auth");
const mongoose = require("mongoose");
const enquiryHistory = require("../../models/enquiryHistory");
const enquiry = require("../../models/enquiryDetails");
const EmployeeDetails = require("../../models/EmpDetails");

//add
router.post("/add-enquiry-details", async (req, res) => {
  let data = req.body;
  // console.log(data)

  try {
    let enquiryDetails = new enquiry(data);
    await enquiryDetails.save();
  } catch (error) {
    console.log(error.message);
  }
});

//HISTORY

router.post("/add-enquiry-history", async (req, res) => {
  let data = req.body;
  try {
    let finalData = new enquiryHistory(data);
    await finalData.save();
  } catch (error) {
    console.log(error.message);
  }
});

//edit
router.post("/update-enquiry-details", async (req, res) => {
  let data = req.body;
  //console.log("123", data);

  try {
    let updateEnquiry = await enquiry.updateOne(
      {
        _id: mongoose.Types.ObjectId(data.clientId),
      },
      {
        $set: {
          enquiryStatus: data.radiodata,
          enquiryNotes: data.discussionPointNotes,
          enquiryType: data.enquiryType,
          enteredById: data.enteredById,
        },
      }
    );
    res.json(updateEnquiry);
  } catch (error) {
    console.log(error.message);
  }
});

//get all data
router.post("/get-enquiry-details", auth, async (req, res) => {
  const { userId, enquiryStatus, username } = req.body;
  const userInfo = await EmployeeDetails.findById(req.user.id).select(
    "-password"
  );
  console.log(userInfo)
  let query = {};
  //console.log(userInfo)
  // else{
  //  query={
  //   enteredById: {$eq :mongoose.Types.ObjectId(userId)}
  //  }
  // }
  if (userInfo.empCtAccess === "All" || userInfo.userGroupName ==="Clarical Admins") {
    if (enquiryStatus) {
      query = {
        // enteredById: mongoose.Types.ObjectId(userId),
        enquiryStatus: { $eq: enquiryStatus },
      };
    } else {
      query = {
        // enteredById: mongoose.Types.ObjectId(userId),
        enquiryStatus: { $eq: "UnResolved" },
      };
    }
  } else {
    if (enquiryStatus) {
     // console.log("inside if has status");
      query = {
        enteredById: { $eq: mongoose.Types.ObjectId(userId) },
        enquiryStatus: { $eq: enquiryStatus },
      };
    } else {
     // console.log("inside else no status");
      query = {
        enteredById: { $eq: mongoose.Types.ObjectId(userId) },
        enquiryStatus: { $eq: "UnResolved" },
      };
    }
  }
  if (userId) {
    query = {
      ...query,
       enteredById:{$eq :mongoose.Types.ObjectId(userId)}
    };
  }

 // console.log(query);
  try {
    let finalData = await enquiry.find(query);
    //console.log("reds",finalData)
    res.json(finalData);
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/get-Unresolved-Data", auth, async (req, res) => {
  const { userId, enquiryStatus } = req.body;

  const userInfo = await EmployeeDetails.findById(req.user.id).select(
    "-password"
  );

  let query = {};
  if (userInfo.empCtAccess === "All"|| userInfo.userGroupName === "Clarical Admins") {
    if (enquiryStatus) {
      query = {
        enquiryStatus: { $eq: "UnResolved" },
      };
    } else {
      query = {
        enquiryStatus: { $eq: "UnResolved" },
      };
    }
  } else {
    if (enquiryStatus) {
      query = {
        enteredById: mongoose.Types.ObjectId(userInfo._id),
        enquiryStatus: { $eq: "UnResolved" },
      };
    } else {
      query = {
        enteredById: mongoose.Types.ObjectId(userInfo._id),
        enquiryStatus: { $eq: "UnResolved" },
      };
    }
  }
  try {
    let AllEnquiryDetails = await enquiry.find(query);

    let findcount = await enquiry.count({
      enquiryStatus: { $eq: "UnResolved" },
    });

    let AllEnquiry = { _id: 0, showField: "All-".concat(findcount) };
    let GroupedEnquiryDetails = await enquiry.aggregate([
      {
        $match: {
          enquiryStatus: {
            $eq: "UnResolved",
          },
        },
      },
      {
        $group: {
          _id: "$enteredById",
          name: {
            $first: "$enteredBy",
          },
          count: {
            $count: {},
          },
        },
      },
      {
        $project:
          /**
           * specifications: The fields to
           *   include or exclude.
           */
          {
            showField: {
              $concat: [
                "$name",
                "-",
                {
                  $toString: "$count",
                },
              ],
            },
          },
      },
    ]);

    GroupedEnquiryDetails.push(AllEnquiry);
    res.json({
      res1: AllEnquiryDetails,
      res2: GroupedEnquiryDetails.reverse(),
    });
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/get-last-enquiry-details", async (req, res) => {
  let data = req.body;
  try {
    let finalResult = await enquiryHistory
      .find({ clientId: mongoose.Types.ObjectId(data.clientId) })
      .sort({ _id: -1 });
    res.json(finalResult);
    //console.log("finalResult",finalResult)
  } catch (error) {
    console.log(error.message);
  }
});

//get details

router.post("/edit-enquiry-details", async (req, res) => {
  let data = req.body;
 // console.log(data);
  try {
    let editEnquiry = await enquiry.updateOne(
      {
        _id: mongoose.Types.ObjectId(data._id),
      },
      {
        $set: {
          clientName: data.clientName,
          clientEmailId: data.clientEmailId,
          enquiryTo: data.enquiryTo,
          estimatedERD: data.estimatedERD,
          enquiryType: data.enquiryType,
          enquiryNotes: data.enquiryNotes,
          enteredBy: data.enteredBy,
        },
      }
    );
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/delete-enquiry-details", async (req, res) => {
  let data = req.body;
  try {
    let deleteEnquiry = await enquiry.updateOne(
      { _id: mongoose.Types.ObjectId(data.EnquiryId) },
      {
        $set: {
          enquiryDeactiveReason: data.enquiryDeactiveReason,
          enquiryStatus: "Deactive",
        },
      }
    );
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
