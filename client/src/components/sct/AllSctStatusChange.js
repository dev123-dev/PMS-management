import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Select from "react-select";
import {
  addSctCalls,
  addSctClientCalls,
  addDemo,
  checkDemo,
  addSctClientDetails,
  getSctStaffsData,
} from "../../actions/sct";
import DemoSchedulesModal from "./DemoSchedulesModal";
import { Modal } from "react-bootstrap";

const AllSctStatusChange = ({
  auth: { isAuthenticated, user, users, loading },
  sct: { demoCheck },
  leadDataVal,
  sct: { sctStaffData },
  addSctCalls,
  addSctClientCalls,
  addDemo,
  ondivcloseChange,
  from,
  filterData,
  checkDemo,
  addSctClientDetails,
  page,
  getSctStaffsData,
}) => {
  useEffect(() => {
    checkDemo({ demoUserId: leadDataVal._id });
  }, [leadDataVal, checkDemo]);
  let staffFilter = { staffFrom: from, leadDataVal: leadDataVal };
  useEffect(() => {
    getSctStaffsData(staffFilter);
  }, [leadDataVal]);

  let passwrdTooltip = {
    marginLeft: "-12em",
    position: "absolute",
    marginTop: "1.5em",
    pointerEvents: "none",
    zIndex: "995",
    width: "270px",
  };

  //STATUS START
  let StatusMethods = [
    { value: "VoiceMail", label: "Voice Mail" },
    { value: "CallBack", label: "Call Back" },
    { value: "DND", label: "DND" },
    { value: "NI", label: "NI" },
    { value: "WrongNumber", label: "WrongNumber" },
    { value: "FollowUp", label: "Follow Up" },
    { value: "Demo", label: "Demo" },
    { value: "AdditionalDemo", label: "Additional Demo" },
    { value: "EngagedClient", label: "Engaged Client" },
    { value: "RegularClient", label: "Regular Client" },
    { value: "TrainingDemo", label: "Training Demo" },
  ];

  if (from === "FollowUp" || from === "F") {
    //ShowCategory("false");
    StatusMethods = StatusMethods.filter(
      (StatusMethods) =>
        StatusMethods.value !== "FollowUp" &&
        StatusMethods.value !== "TrainingDemo"
    );
  } else if (from === "EngagedClient") {
     //ShowCategory("true");
    StatusMethods = StatusMethods.filter(
      (StatusMethods) =>
        StatusMethods.value !== "EngagedClient" &&
        StatusMethods.value !== "FollowUp" &&
        StatusMethods.value !== "TrainingDemo"
    );
  } else if (from === "RegularClient") {
    StatusMethods = StatusMethods.filter(
      (StatusMethods) =>
        StatusMethods.value !== "EngagedClient" &&
        StatusMethods.value !== "FollowUp" &&
        StatusMethods.value !== "RegularClient" &&
        StatusMethods.value !== "Demo" &&
        StatusMethods.value !== "AdditionalDemo"
    );
  } else {
    StatusMethods = StatusMethods.filter(
      (StatusMethods) => StatusMethods.value !== "TrainingDemo"
    );
  }
  if (demoCheck > 0) {
    StatusMethods = StatusMethods.filter(
      (StatusMethods) => StatusMethods.value !== "Demo"
    );
  } else if (demoCheck === 0) {
    StatusMethods = StatusMethods.filter(
      (StatusMethods) => StatusMethods.value !== "AdditionalDemo"
    );
  }
  //STATUS END
  //Category

  let CategoryMethods = [
    { value: "Hot", label: "Hot" },
    { value: "Normal", label: "Normal" },
    { value: "Cool", label: "Cool" },
  ];

  //formData
  const [formData, setFormData] = useState({
    sctCallStatus: "",
    sctLeadsCategory: "",
    labeldata: "",
    sctCallNote: "",
    toTime: "",
    expectedMonth: "",
    salesValue: "",
    sctCallReasonForChange: "",
    sctCallSalesValue: "",
    sctExpectedMonthYear: "",
    fromTime: "",
    sctCallTime: "",
    sctcallToNumber: "",
    isSubmitted: false,
  });
  const {
    sctCallNote,
    sctCallStatus,
    sctCallReasonForChange,
    toTime,
    fromTime,
    sctCallTime,
    sctcallToNumber,
  } = formData;
  useEffect(() => {
    setStatusDate("");
    setsctLeadsCategory("");
    setsctLeadsCategory("");
    getstaffsData("");
    setSalesvalue(
      leadDataVal.sctCallSalesValue ? Number(leadDataVal.sctCallSalesValue) : ""
    );
    setExpectedDate(
      leadDataVal.sctExpectedMonth
        ? new Date(leadDataVal.sctExpectedMonth).toISOString().split("T")[0]
        : ""
    );
    setFormData({
      ...formData,
      sctCallTime: "",
      sctCallStatus: "",
      sctCallNote: "",
    });
  }, [leadDataVal]);

  //DATE START
  var todayDateymd = new Date().toISOString().split("T")[0];
  //for next month
  var d = new Date(todayDateymd);
  d.setMonth(d.getMonth() + 1);
  var nextmonth = d.toISOString().split("T")[0];
  //for next year
  var d1 = new Date(todayDateymd);
  d1.setFullYear(d1.getFullYear() + 1);
  var nextyear = d1.toISOString().split("T")[0];
  //next day
  var d2 = new Date(todayDateymd);
  d2.setDate(d2.getDate() + 1);
  var nextday = d2.toISOString().split("T")[0];
  //less than today
  var d3 = new Date(todayDateymd);
  d3.setDate(d3.getDate());
  var todaydate = d3.toISOString().split("T")[0];
  //DATE ENDS

  //Required Validation Starts
  const [error, setError] = useState({
    statusmodeIdChecker: false,
    statusmodeIdErrorStyle: {},
    stafftypeIdChecker: false,
    stafftypeIdErrorStyle: {},
    expectedDateChecker: false,
    expectedDateErrorStyle: {},
    salesValueChecker: false,
    salesValueErrorStyle: {},
  });
  const {
    statusmodeIdChecker,
    statusmodeIdErrorStyle,
    stafftypeIdChecker,
    stafftypeIdErrorStyle,
    expectedDateChecker,
    expectedDateErrorStyle,
    salesValueChecker,
    salesValueErrorStyle,
  } = error;

  const checkErrors = () => {
    // if (!statusmodeIdChecker) {
    //   setError({
    //     ...error,
    //     statusmodeIdErrorStyle: { color: "#F00" },
    //   });
    //   return false;
    // }
    if (!stafftypeIdChecker) {
      setError({
        ...error,
        stafftypeIdErrorStyle: { color: "#F00" },
      });
      return false;
    }
    // if (!expectedDateChecker) {
    //   setError({
    //     ...error,
    //     expectedDateErrorStyle: { color: "#F00" },
    //   });
    //   return false;
    // }
    // if (!salesValueChecker) {
    //   setError({
    //     ...error,
    //     salesValueErrorStyle: { color: "#F00" },
    //   });
    //   return false;
    // }
    return true;
  };

  const [showDemoScheduleModal, setShowDemoScheduleModal] = useState(false);
  const handleDemoScheduleModalClose = () => setShowDemoScheduleModal(false);

  const onDemoScheduleModalChange = (e) => {
    if (e) {
      handleDemoScheduleModalClose();
    }
  };
  const onCheckSchedule = () => {
    setShowDemoScheduleModal(true);
  };

  const allStaff = [];
  sctStaffData &&
    sctStaffData.sctStaffs &&
    sctStaffData.sctStaffs.map(
      (sctStaffs) =>
        sctStaffs.sctStaffStatus === "Active" &&
        allStaff.push({
          staffsId: sctStaffs._id,
          phone1: sctStaffData.sctPhone1,
          staffsNumber: sctStaffs.sctStaffPhoneNumber,
          label: sctStaffs.sctStaffName,
          value: sctStaffs.sctStaffName,
        })
    );

  const [sctStaffs, getstaffsData] = useState("");
  const [phone1, getphone1Data] = useState("");
  const [staffsNumber, getstaffsNumberData] = useState("");

  const onStaffChange = (e) => {
    setError({
      ...error,
      stafftypeIdChecker: true,
      stafftypeIdErrorStyle: { color: "#000" },
    });
    getstaffsData(e);
    var staffsNumber = "";
    var phone1 = "";
    staffsNumber = e.staffsNumber;
    phone1 = e.phone1;
    getphone1Data(phone1);
    getstaffsNumberData(staffsNumber);
  };

  const [startStatusDate, setStatusDate] = useState("");
  const onDateChange = (e) => {
    setStatusDate(e.target.value);
  };

  const [showHide, setShowHide] = useState({
    showdateselectionSection: true,
    showdemoselectionSection: false,
    showLeadCategory: false,
  });

  const {
    showdateselectionSection,
    showdemoselectionSection,
    showLeadCategory,
  } = showHide;

  const [showstatus, setstatus] = useState("");
  const [sctLeadsCategory, setsctLeadsCategory] = useState("");

  const onStatusTypeChange = (e) => {
    setStatusDate("");

    if (e.value === "CallBack") {
      setstatus("CallBack");
      setFormData({
        ...formData,
        sctCallStatus: e,
        sctCallTime: "",
      });
      setsctLeadsCategory("");
      setShowHide({
        ...showHide,
        showdateselectionSection: true,
        showdemoselectionSection: false,
        showLeadCategory: true,
      });
      setError({
        ...error,
        statusmodeIdChecker: true,
        statusmodeIdErrorStyle: { color: "#000" },
      });

      // setError({
      //   ...error,
      //   statusmodeIdChecker: true,
      //   statusmodeIdErrorStyle: { color: "#000" },
      // });
    } else {
      setstatus("false");

      // setError({
      //   ...error,
      //   expectedDateChecker: true,
      //   expectedDateErrorStyle: { color: "#000" },
      // });
      if (e) {
        setFormData({
          ...formData,
          sctCallStatus: e,
          sctCallTime: "",
        });
      }
      if (e.value === "DND") {
        setFormData({
          ...formData,
          sctCallStatus: e,
          sctCallTime: "",
        });
        setStatusDate(nextmonth);
        setShowHide({
          ...showHide,
          showdateselectionSection: true,
          showdemoselectionSection: false,
          showLeadCategory: false,
        });
      } else if (e.value === "NI") {
        setFormData({
          ...formData,
          sctCallStatus: e,
          sctCallTime: "",
        });
        setStatusDate(nextyear);
        setShowHide({
          ...showHide,
          showdateselectionSection: true,
          showdemoselectionSection: false,
          showLeadCategory: false,
        });
      } else if (e.value === "CallBack") {
        setFormData({
          ...formData,
          sctCallStatus: e,
          sctCallTime: "",
        });

        setStatusDate("");
        setShowHide({
          ...showHide,
          showdateselectionSection: true,
          showdemoselectionSection: false,
          showLeadCategory: true,
        });
      } else if (e.value === "WrongNumber") {
        setFormData({
          ...formData,
          sctCallStatus: e,
          sctCallTime: "",
        });
        setStatusDate("");
        setShowHide({
          ...showHide,
          showdateselectionSection: true,
          showdemoselectionSection: false,
          showLeadCategory: false,
        });
      } else if (e.value === "VoiceMail") {
        setFormData({
          ...formData,
          sctCallStatus: e,
        });
        setStatusDate(nextday);
        setShowHide({
          ...showHide,
          showdateselectionSection: true,
          showdemoselectionSection: false,
          showLeadCategory: false,
        });
      } else if (e.value === "FollowUp") {
        setstatus("FollowUp");
        //setsctLeadsCategory("");

        setFormData({
          ...formData,
          sctCallStatus: e,
          sctCallTime: "",
        });
        setStatusDate("");
        setShowHide({
          ...showHide,
          showdateselectionSection: true,
          showdemoselectionSection: false,
          showLeadCategory: false,
        });
      } else if (e.value === "RegularClient" || e.value === "EngagedClient") {
        setFormData({
          ...formData,
          sctCallStatus: e,
          sctCallTime: "",
        });
        setStatusDate("");
        setShowHide({
          ...showHide,
          showdateselectionSection: false,
          showdemoselectionSection: false,
          showLeadCategory: false,
        });
      } else {
        setFormData({
          ...formData,
          sctCallStatus: e,
          sctCallTime: "",
        });
        setStatusDate("");
        setShowHide({
          ...showHide,
          showdemoselectionSection: true,
          showdateselectionSection: false,
          showLeadCategory: false,
        });
      }
    }
  };

  const onLeadCategoryChange = (e) => {
    setsctLeadsCategory(e);
  };
  const [demoDate, setdemoDate] = useState("");
  const onDateChange1 = (e) => {
    setdemoDate(e.target.value);
  };
  const MonthYear = [
    { label: "January", value: 1 },
    { label: "Febrery", value: 2 },
    { label: "March", value: 3 },
    { label: "April", value: 4 },
    { label: "May", value: 5 },
    { label: "June", value: 6 },
    { label: "July", value: 7 },
    { label: "August", value: 8 },
    { label: "Septmber", value: 9 },
    { label: "October", value: 10 },
    { label: "November", value: 11 },
    { label: "December", value: 12 },
  ];
  const [MonthAndYear, setMonthYear] = useState(
    leadDataVal.sctExpectedMonthYear ? leadDataVal.sctExpectedMonthYear : ""
  );
  const [isExpectedDateChanged, setIsExpectedDateChnaged] = useState("");
  const [expectedDate, setExpectedDate] = useState(
    leadDataVal.sctExpectedMonth
      ? new Date(leadDataVal.sctExpectedMonth).toISOString().split("T")[0]
      : ""
  );

  const [newdate, setnewdate] = useState("");
  const onDateChange2 = (e) => {
    setnewdate(e.target.value);
    //setExpectedDate(e.target.value);
    if (e.target.value < expectedDate) {
      setError({
        ...error,
        expectedDateChecker: true,
        expectedDateErrorStyle: { color: "#FF0000" },
      });
    } else {
      setExpectedDate(e.target.value);
      setError({
        ...error,
        expectedDateChecker: false,
        expectedDateErrorStyle: { color: "#000000" },
      });
      setIsExpectedDateChnaged("true");
      const new_date = new Date(e.target.value);
      const year = new_date.getFullYear();
      let new_month = new_date.getMonth() + 1;
      const month = MonthYear.filter((ele) => {
        if (ele.value === new_month) {
          return ele.label;
        }
      });
      let final_data = month[0].label + "-" + year;
      setMonthYear(final_data);
    }
  };

  const [isSalesValueChanged, setIsSalesValueChanged] = useState();
  const [salesValue, setSalesvalue] = useState(
    leadDataVal.sctCallSalesValue ? Number(leadDataVal.sctCallSalesValue) : ""
  );
  let x = leadDataVal.sctCallSalesValue
    ? Number(leadDataVal.sctCallSalesValue)
    : "";
  useEffect(() => {
    if (salesValue < x) {
      setError({
        ...error,
        salesValueChecker: true,
        salesValueErrorStyle: { color: "#FF0000" },
      });
    } else {
      setError({
        ...error,
        salesValueChecker: false,
        salesValueErrorStyle: { color: "#000000" },
      });
    }
  }, [salesValue]);
  const onSalesvalueChange = (e) => {
    if (Number(e.target.value) < salesValue) {
      setSalesvalue(e.target.value);
      setError({
        ...error,
        salesValueChecker: true,
        salesValueErrorStyle: { color: "#FF0000" },
      });
    } else {
      setSalesvalue(e.target.value);

      setError({
        ...error,
        salesValueChecker: false,
        salesValueErrorStyle: { color: "#000000" },
      });
      setIsSalesValueChanged("true");
      // // setSalesvalue("");
    }
  };

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [reasonForChange, setReasonForChange] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();

    e.preventDefault();
    // setReasonForChange("false");
    let callCategoryVal = null,
      clientTypeVal = "",
      callComeFromVal = "Lead";

    if (from === "EngagedClient" || from === "RegularClient")
      callComeFromVal = "Client";
    if (sctCallStatus.value === "FollowUp") {
      callCategoryVal = "F";
    } else if (sctLeadsCategory !== "") {
      if (from === "EngagedClient") {
        callCategoryVal = "EC";
      } else if (from === "RegularClient") {
        callCategoryVal = "RC";
      } else {
        callCategoryVal = "PT";
      }
    } else if (sctCallStatus.value === "WrongNumber") {
      callCategoryVal = "W";
    } else if (sctCallStatus.value === "EngagedClient") {
      callCategoryVal = "EC";
      clientTypeVal = "Engaged";
    } else if (sctCallStatus.value === "RegularClient") {
      callCategoryVal = "RC";
      clientTypeVal = "Regular";
    } else if (sctCallStatus.value === "RegularClient") {
      callCategoryVal = "RC";
      clientTypeVal = "Regular";
    } else {
      if (leadDataVal.sctLeadCategory === "NL") callCategoryVal = "P";
      else {
        if (from === "EngagedClient" || from === "RegularClient")
          callCategoryVal = leadDataVal.sctClientCategory;
        else callCategoryVal = leadDataVal.sctLeadCategory;
      }
    }
    e.preventDefault();
    if (checkErrors()) {
      const finalData = {
        sctCallToId: leadDataVal._id,
        sctCallToName: leadDataVal.sctCompanyName,
        sctCallToStaffId: sctStaffs.staffsId,
        sctCallToStaffName: sctStaffs.value,
        sctCallFromId: user._id,
        sctCallFromName: user.userName,
        sctCallCategory: callCategoryVal,
        sctCallStatus: sctCallStatus.value,
        sctLeadsCategory: sctLeadsCategory
          ? sctLeadsCategory.value
          : leadDataVal.sctLeadsCategory
          ? leadDataVal.sctLeadsCategory
          : "",
        sctcallToNumber: staffsNumber ? staffsNumber : phone1,
        // !== "Demo"? sctCallStatus.value: leadDataVal.sctCallStatus
        sctCallDate: startStatusDate || demoDate || todayDateymd,
        sctExpectedMonth: expectedDate,
        sctExpectedMonthYear: MonthAndYear,
        sctCallReasonForChange: "",

        sctCallTime: sctCallTime,
        sctCallSalesValue: salesValue ? salesValue : 0,
        sctCallNote: sctCallNote?.trim(),
        sctCallComeFrom: callComeFromVal,
        sctCallTakenDate: new Date().toISOString().split("T")[0],
        sctCallEnteredDate: new Date().toLocaleString("en-GB"),
        sctCallDateTime: new Date().toLocaleString("en-GB"),
        filterData: filterData,
        page: page,
      };
      // console.log("finaldataaa", finalData);
      if (from === "EngagedClient" || from === "RegularClient") {
        addSctClientCalls(finalData);
      } else {
        addSctCalls(finalData);
      }

      if (
        sctCallStatus.value === "Demo" ||
        sctCallStatus.value === "AdditionalDemo" ||
        sctCallStatus.value === "TrainingDemo"
      ) {
        const demoData = {
          demoDate: demoDate,
          fromTime: fromTime,
          toTime: toTime,
          callDate: todayDateymd,
          demoCategory: sctCallStatus.value,
          demoEnteredById: user._id,
          clientId: leadDataVal._id,
          clientName: leadDataVal.sctClientName,
          sctDemoComeFrom: callComeFromVal,
          clientDetails: {
            sctCompanyName: leadDataVal.sctCompanyName,
            sctEmailId: leadDataVal.sctEmailId,
            sctPhone1: leadDataVal.sctPhone1,
            sctCallToStaffId: sctStaffs.staffsId ? sctStaffs.staffsId : null,
            sctCallToStaffName: sctStaffs.value,
            stateId: leadDataVal.stateId ? leadDataVal.stateId : null,
            stateName: leadDataVal.stateName,
          },
          demoEnteredByDateTime: new Date().toLocaleString("en-GB"),
        };
        addDemo(demoData);
      }
      if (
        (sctCallStatus.value === "EngagedClient" ||
          sctCallStatus.value === "RegularClient") &&
        leadDataVal.sctClientCategory !== "EC"
      ) {
        const transferData = {
          sctCompanyName: leadDataVal.sctCompanyName,
          sctClientName: leadDataVal.sctClientName,
          sctLeadId: leadDataVal._id,
          sctEmailId: leadDataVal.sctEmailId,
          sctPhone1: leadDataVal.sctPhone1,
          sctPhone2: leadDataVal.sctPhone2,
          sctWebsite: leadDataVal.sctWebsite,
          sctClientAddress: leadDataVal.sctLeadAddress,
          sctClientImportantPoints: leadDataVal.sctImportantPoints,
          projectsId: leadDataVal.projectsId ? leadDataVal.projectsId : null,
          projectsName: leadDataVal.projectsName
            ? leadDataVal.projectsName
            : null,
          countryId: leadDataVal.countryId ? leadDataVal.countryId : null,
          countryName: leadDataVal.countryName ? leadDataVal.countryName : null,
          sctcountryCode: leadDataVal.sctcountryCode,
          stateId: leadDataVal.stateId ? leadDataVal.stateId : null,
          stateName: leadDataVal.stateName,
          districtId: leadDataVal.districtId ? leadDataVal.districtId : null,
          sctClientStatus: "Active",
          sctClientCategory: callCategoryVal,
          sctCallDate: new Date().toISOString().split("T")[0],
          sctCallTime: sctCallTime,
          sctClientEnteredById: user._id,
          sctClientEnteredByName: user.empFullName,
          sctClientEnteredDateTime: new Date().toLocaleString("en-GB"),
          sctClientAssignedToId: leadDataVal.sctLeadAssignedToId,
          sctClientAssignedToName: leadDataVal.sctLeadAssignedToName,
          clientType: clientTypeVal,
          sctStaffs: leadDataVal.sctStaffs,
        };

        addSctClientDetails(transferData);
      }
      setFormData({
        ...formData,
        sctCallStatus: "",
        sctLeadsCategory: "",
        sctCallDate: "",
        sctCallNote: "",
        isSubmitted: true,
      });
      ondivcloseChange(true);
      setStatusDate("");
      getstaffsData("");
    }
  };

  const onReset = (e) => {
    setExpectedDate(
      leadDataVal.sctExpectedMonth
        ? new Date(leadDataVal.sctExpectedMonth).toISOString().split("T")[0]
        : ""
    );
    setError({
      ...error,
      expectedDateChecker: false,
      expectedDateErrorStyle: { color: "#000000" },

      salesValueChecker: false,
      salesValueErrorStyle: { color: "#000000" },
    });
    setSalesvalue(
      leadDataVal.sctCallSalesValue ? Number(leadDataVal.sctCallSalesValue) : ""
    );
    // setError({
    //   ...error,
    //   salesValueChecker: false,
    //   salesValueErrorStyle: { color: "#FF0000" },
    // });
  };
  let ED =
    leadDataVal && leadDataVal.sctExpectedMonth
      ? leadDataVal.sctExpectedMonth.split(/\D/g)
      : "";
  let sctExpectedMonthrevered = [ED[2], ED[1], ED[0]].join("-");

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <form className="row" onSubmit={(e) => onSubmit(e)}>
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12 fixTableHeadstatus ">
          <div className="col-lg-4 col-md-12 col-sm-12 col-12  ">
            <label style={statusmodeIdErrorStyle}>Status* :</label>
            <Select
              name="sctCallStatus"
              options={StatusMethods}
              className="statuschange "
              isSearchable={false}
              menuPlacement="bottom"
              value={sctCallStatus}
              placeholder="Select "
              onChange={(e) => onStatusTypeChange(e)}
              theme={(theme) => ({
                ...theme,
                height: 26,
                minHeight: 26,
                borderRadius: 1,
                colors: {
                  ...theme.colors,
                  primary: "black",
                },
              })}
            />
          </div>

          <div className="col-lg-4 col-md-12 col-sm-12 col-12 ">
            <label style={stafftypeIdErrorStyle}>Staff* :</label>

            <Select
              name="sctStaffName"
              options={allStaff}
              isSearchable={true}
              value={sctStaffs}
              placeholder="Select "
              onChange={(e) => onStaffChange(e)}
              required
            />
          </div>
          {showdateselectionSection && (
            <div className=" col-lg-4 col-md-12 col-sm-12 col-12 ">
              <label>{sctCallStatus && sctCallStatus.label} Date* :</label>
              <input
                type="date"
                placeholder="dd/mm/yyyy"
                className="form-control cpp-input datevalidation"
                name="sctCallDate"
                min={todaydate}
                value={startStatusDate}
                onChange={(e) => onDateChange(e)}
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                style={{
                  width: "100%",
                }}
                required
              />
            </div>
          )}
          {showLeadCategory && staffFilter.staffFrom !== "F" && from !== "EngagedClient"&& from !== "RegularClient" ? (
            <div className="col-lg-4 col-md-12 col-sm-12 col-12 notesTopSCT">
              <label className="label-control">Category :</label>
              <Select
                name="sctLeadsCategory"
                options={CategoryMethods}
                isSearchable={true}
                value={sctLeadsCategory}
                placeholder="Select "
                onChange={(e) => onLeadCategoryChange(e)}
              />
            </div>
          ) : (
            <></>
          )}

          {showdemoselectionSection && (
            <>
              <div className="col-lg-3 col-md-12 col-sm-12 col-12 ">
                <input
                  type="submit"
                  name="submit"
                  value="Schedules"
                  onClick={() => onCheckSchedule()}
                  className="btn sub_form btn_continue blackbrd "
                />
              </div>
              <div className=" col-lg-4 col-md-12 col-sm-12 col-12 ">
                <>
                  <label className="label-control">
                    {sctCallStatus && sctCallStatus.label} Date :
                  </label>

                  <input
                    type="date"
                    placeholder="dd/mm/yyyy"
                    className="form-control cpp-input datevalidation"
                    name="demoDate"
                    min={todaydate}
                    value={demoDate}
                    onChange={(e) => onDateChange1(e)}
                    onKeyDown={(e) => {
                      e.preventDefault();
                    }}
                    style={{
                      width: "100%",
                    }}
                    required
                  />
                </>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                <label className="label-control">From* :</label>

                <input
                  type="time"
                  className="form-control"
                  name="fromTime"
                  value={fromTime}
                  min="00:00"
                  max="24:00"
                  onChange={(e) => onInputChange(e)}
                  // required
                />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                <label className="label-control">To* :</label>

                <input
                  type="time"
                  className="form-control"
                  name="toTime"
                  value={toTime}
                  min="00:00"
                  max="24:00"
                  onChange={(e) => onInputChange(e)}
                  // required
                />
              </div>
            </>
          )}
          <div className="col-lg-4 col-md-6 col-sm-6 col-12 notesTopSCT">
            <label className="label-control">Call Time* :</label>
            <br />
            <input
              type="time"
              className="form-control"
              name="sctCallTime"
              value={sctCallTime}
              style={{ width: "100%" }}
              min="00:00"
              max="24:00"
              onChange={(e) => onInputChange(e)}
              // required
            />
          </div>

          {showstatus === "FollowUp" ||
          (showstatus === "CallBack" && sctLeadsCategory) ||
          (staffFilter.staffFrom === "F" && showstatus === "CallBack") ? (
            <>
              {" "}
              <div className="col-lg-4 col-md-12 col-sm-12 col-12 notesTopSCT">
                <label className="label-control" style={expectedDateErrorStyle}>
                  Expected Date (
                  {leadDataVal.sctExpectedMonth ? (
                    <>
                      {" "}
                      <img
                        className="img_icon_size log "
                        src={require("../../static/images/question3.png")}
                        alt="Reason"
                        title={
                          "Expected date must be greater than " +
                          sctExpectedMonthrevered
                        }
                      />
                    </>
                  ) : (
                    <>
                      <img
                        className="img_icon_size log "
                        src={require("../../static/images/question3.png")}
                        alt="Reason"
                        title={" Please select Expected date "}
                      />
                    </>
                  )}
                  ) :
                </label>
                {user && user.empCtAccess && user.empCtAccess === "All" ? (
                  <>
                    <input
                      type="date"
                      // placeholder="dd/mm/yyyy"
                      className="form-control cpp-input datevalidation datecorrect"
                      // min={todaydate}
                      min={expectedDate}
                      name="expectedMonth"
                      value={expectedDate}
                      onChange={(e) => onDateChange2(e)}
                      onKeyDown={(e) => {
                        e.preventDefault();
                      }}
                      style={{
                        width: "100%",
                      }}
                    />
                  </>
                ) : (
                  <>
                    {leadDataVal &&
                    Number(leadDataVal.sctCallSalesValue) > 0 ? (
                      <>
                        <input
                          type="date"
                          // placeholder="dd/mm/yyyy"
                          className="form-control cpp-input datevalidation datecorrect"
                          // min={todaydate}
                          min={expectedDate}
                          name="expectedMonth"
                          value={expectedDate}
                          disabled={true}
                          // onChange={(e) => onDateChange2(e)}
                          onKeyDown={(e) => {
                            e.preventDefault();
                          }}
                          style={{
                            width: "100%",
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <input
                          type="date"
                          // placeholder="dd/mm/yyyy"
                          className="form-control cpp-input datevalidation datecorrect"
                          // min={todaydate}
                          min={expectedDate}
                          name="expectedMonth"
                          value={expectedDate}
                          onChange={(e) => onDateChange2(e)}
                          onKeyDown={(e) => {
                            e.preventDefault();
                          }}
                          style={{
                            width: "100%",
                          }}
                        />
                      </>
                    )}
                  </>
                )}
              </div>
              <div className="col-lg-4 col-md-12 col-sm-12 col-12 notesTopSCT">
                <label className="label-control" style={salesValueErrorStyle}>
                  Sales Values (
                  {leadDataVal.sctCallSalesValue ? (
                    <>
                      {" "}
                      <img
                        className="img_icon_size log "
                        src={require("../../static/images/question3.png")}
                        alt="Reason"
                        title={
                          "Sales Value must be more than " +
                          leadDataVal.sctCallSalesValue
                        }
                      />
                    </>
                  ) : (
                    <>
                      <img
                        className="img_icon_size log "
                        src={require("../../static/images/question3.png")}
                        alt="Reason"
                        title={"Please add Sales Value"}
                      />
                    </>
                  )}
                  ) :
                </label>

                {user && user.empCtAccess && user.empCtAccess === "All" ? (
                  <>
                    <input
                      type="text"
                      className="form-control"
                      name="salesValue"
                      value={salesValue}
                      onChange={(e) => onSalesvalueChange(e)}
                    />
                  </>
                ) : (
                  <>
                    {leadDataVal &&
                    Number(leadDataVal.sctCallSalesValue) > 0 ? (
                      <>
                        <input
                          type="text"
                          className="form-control"
                          name="salesValue"
                          value={salesValue}
                          disabled={true}
                          // onChange={(e) => onSalesvalueChange(e)}
                        />
                      </>
                    ) : (
                      <>
                        <input
                          type="text"
                          className="form-control"
                          name="salesValue"
                          value={salesValue}
                          onChange={(e) => onSalesvalueChange(e)}
                        />
                      </>
                    )}
                  </>
                )}
                {/* <input
                  type="text"
                  className="form-control"
                  name="salesValue"
                  value={salesValue}
                  onChange={(e) => onSalesvalueChange(e)}
                /> */}
                {/* {leadDataVal.sctCallSalesValue ? (
                  <>
                    <div
                      className="cstm-hint text-white"
                      id="pass_admin_help"
                      style={{ top: "60px" }}
                    >
                      <img
                        src={require("../../static/images/help1.png")}
                        alt="help"
                        id="img_tool_admin"
                        className="pass_admin_help_icon_question"
                      />
                      <div
                        id="tooltipPassAdmin"
                        className="syle-hint"
                        style={passwrdTooltip}
                        data-hint={
                          "Sales Value must be more than " +
                          leadDataVal.sctCallSalesValue
                        }
                      ></div>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className="cstm-hint text-white"
                      id="pass_admin_help"
                      style={{ top: "60px" }}
                    >
                      <img
                        src={require("../../static/images/help1.png")}
                        alt="help"
                        id="img_tool_admin"
                        className="pass_admin_help_icon_question"
                      />
                      <div
                        id="tooltipPassAdmin"
                        className="syle-hint"
                        style={passwrdTooltip}
                        data-hint={"Please add Sales Value"}
                      ></div>
                    </div>
                  </>
                )} */}
              </div>
            </>
          ) : (
            <></>
          )}
          {showLeadCategory && showLeadCategory ? (
            <div className="col-lg-4 col-md-12 col-sm-12 col-12 notesTopSCT">
              <label className="label-control"> Notes* :</label>
              <textarea
                name="sctCallNote"
                id="sctCallNote"
                className="textarea form-control"
                rows="2"
                placeholder="Notes"
                style={{ width: "100%" }}
                value={sctCallNote}
                onChange={(e) => onInputChange(e)}
                required
              ></textarea>
            </div>
          ) : (
            <div className="col-lg-8 col-md-12 col-sm-12 col-12 notesTopSCT">
              <label className="label-control"> Notes* :</label>
              <textarea
                name="sctCallNote"
                id="sctCallNote"
                className="textarea form-control"
                rows="2"
                placeholder="Notes"
                style={{ width: "100%" }}
                value={sctCallNote}
                onChange={(e) => onInputChange(e)}
                required
              ></textarea>
            </div>
          )}

          <div className="col-lg-4 col-md-12 col-sm-12 col-12 notesTopSCT">
            {reasonForChange === "true" ? (
              <>
                {" "}
                <label className="label-control"> Reason* :</label>
                <textarea
                  name="sctCallReasonForChange"
                  id="sctCallNote"
                  className="textarea form-control"
                  rows="2"
                  placeholder="Notes"
                  style={{ width: "100%" }}
                  value={sctCallReasonForChange}
                  onChange={(e) => onInputChange(e)}
                  required
                ></textarea>
              </>
            ) : (
              <></>
            )}
          </div>
          {/* <div className=" col-lg-12">
            {expectedDateChecker ? (
              <>
                <span style={{ color: "red" }}>Date cannot be less</span>
                <br />
              </>
            ) : (
              <></>
            )}
          </div>

          <div className=" col-lg-12">
            {salesValueChecker ? (
              <>
                <span style={{ color: "red" }}>Sales value cannot be less</span>
              </>
            ) : (
              <></>
            )}
          </div> */}

          {showLeadCategory && showLeadCategory ? (
            <div className="col-lg-12 col-md-12 col-sm-12 col-12 ">
              <br />
              {loading ? (
                <button
                  className="btn sub_form btn_continue blackbrd Save float-right submitTopSCT"
                  disabled
                >
                  Loading...
                </button>
              ) : (
                <>
                  <input
                    type="submit"
                    name="Submit"
                    value="Submit"
                    className="btn sub_form btn_continue blackbrd Save float-right submitTopSCT"
                  />
                  <input
                    type="button"
                    name="reset"
                    value="Reset"
                    onClick={(e) => onReset(e)}
                    className="btn sub_form btn_continue blackbrd Save float-right submitTopSCT"
                  />
                </>
              )}
            </div>
          ) : (
            <div className="col-lg-12 col-md-12 col-sm-12 col-12 ">
              <br />
              {loading ? (
                <button
                  className="btn sub_form btn_continue blackbrd Save float-right submitTopSCT"
                  disabled
                >
                  Loading...
                </button>
              ) : (
                <>
                  <input
                    type="submit"
                    name="Submit"
                    value="Submit"
                    className="btn sub_form btn_continue blackbrd Save float-right submitTopSCT"
                  />
                  <input
                    type="button"
                    name="reset"
                    value="Reset"
                    onClick={(e) => onReset(e)}
                    className="btn sub_form btn_continue blackbrd Save float-right submitTopSCT"
                  />
                </>
              )}
            </div>
          )}
        </div>
      </form>
      <Modal
        show={showDemoScheduleModal}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <div className="col-lg-10">
            <h3 className="modal-title text-center">Demo Schedules</h3>
          </div>
          <div className="col-lg-1">
            <button onClick={handleDemoScheduleModalClose} className="close">
              <img
                src={require("../../static/images/close.png")}
                alt="X"
                style={{ height: "20px", width: "20px" }}
              />
            </button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <DemoSchedulesModal
            onDemoScheduleModalChange={onDemoScheduleModalChange}
          />
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

AllSctStatusChange.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  sct: state.sct,
});

export default connect(mapStateToProps, {
  addSctCalls,
  addDemo,
  checkDemo,
  addSctClientDetails,
  addSctClientCalls,
  getSctStaffsData,
})(AllSctStatusChange);
