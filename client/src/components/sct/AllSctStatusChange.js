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
    StatusMethods = StatusMethods.filter(
      (StatusMethods) =>
        StatusMethods.value !== "FollowUp" &&
        StatusMethods.value !== "TrainingDemo"
    );
  } else if (from === "EngagedClient") {
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
    fromTime: "",
    sctCallTime: "",
    sctcallToNumber: "",
    isSubmitted: false,
  });
  const {
    sctCallNote,
    sctCallStatus,
    sctLeadsCategory,
    toTime,
    expectedMonth,
    salesValue,
    fromTime,
    sctCallTime,
    sctcallToNumber,
  } = formData;

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
  });
  const {
    statusmodeIdChecker,
    statusmodeIdErrorStyle,
    stafftypeIdChecker,
    stafftypeIdErrorStyle,
  } = error;

  const checkErrors = () => {
    console.log("statusmodeIdChecker", statusmodeIdChecker);
    if (!statusmodeIdChecker) {
      setError({
        ...error,
        statusmodeIdErrorStyle: { color: "#F00" },
      });
      return false;
    }
    if (!stafftypeIdChecker) {
      setError({
        ...error,
        stafftypeIdErrorStyle: { color: "#F00" },
      });
      return false;
    }
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

  const onStatusTypeChange = (e) => {
    if (e.value === "CallBack") {
      setstatus("true");
      setFormData({
        ...formData,
        sctCallStatus: e,
      });
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
    } else {
      setstatus("false");

      setError({
        ...error,
        statusmodeIdChecker: true,
        statusmodeIdErrorStyle: { color: "#000" },
      });
      if (e) {
        setFormData({
          ...formData,
          sctCallStatus: e,
        });
      }
      if (e.value === "DND") {
        setFormData({
          ...formData,
          sctCallStatus: e,
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
        setFormData({
          ...formData,
          sctCallStatus: e,
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
    if (e) {
      setFormData({
        ...formData,
        sctLeadsCategory: e,
      });
    }
  };
  const [demoDate, setdemoDate] = useState("");
  const onDateChange1 = (e) => {
    setdemoDate(e.target.value);
  };
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    let callCategoryVal = null,
      clientTypeVal = "",
      callComeFromVal = "Lead";

    if (from === "EngagedClient" || from === "RegularClient")
      callComeFromVal = "Client";
    if (sctCallStatus.value === "FollowUp") {
      callCategoryVal = "F";
    }
    // else if (sctCallStatus.value === "CallBack") {
    //   callCategoryVal = "P";
    // }
    else if (sctCallStatus.value === "WrongNumber") {
      callCategoryVal = "W";
    } else if (sctCallStatus.value === "EngagedClient") {
      callCategoryVal = "EC";
      clientTypeVal = "Engaged";
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
        sctLeadsCategory: sctLeadsCategory ? sctLeadsCategory.value : "",
        sctcallToNumber: staffsNumber ? staffsNumber : phone1,
        // !== "Demo"? sctCallStatus.value: leadDataVal.sctCallStatus
        sctCallDate: startStatusDate || demoDate || todayDateymd,
        expectedMonth: expectedMonth,
        sctCallTime: sctCallTime,
        salesValue: salesValue,
        sctCallNote: sctCallNote?.trim(),
        sctCallComeFrom: callComeFromVal,
        sctCallTakenDate: new Date().toISOString().split("T")[0],
        sctCallEnteredDate: new Date().toLocaleString("en-GB"),
        sctCallDateTime: new Date().toLocaleString("en-GB"),
        filterData: filterData,
        page: page,
      };
      console.log("finalData", finalData);
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
  console.log("sctLeadsCategory", sctLeadsCategory);

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <form className="row" onSubmit={(e) => onSubmit(e)}>
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12 fixTableHeadstatus">
          <div className="col-lg-4 col-md-12 col-sm-12 col-12  ">
            <label style={statusmodeIdErrorStyle}>Status* :</label>
            <Select
              name="sctCallStatus"
              options={StatusMethods}
              isSearchable={false}
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
              <label>{sctCallStatus && sctCallStatus.label} Date*</label>
              <input
                type="date"
                placeholder="dd/mm/yyyy"
                className="form-control cpp-input datevalidation"
                name="sctCallDate"
                min={todaydate}
                value={startStatusDate}
                onChange={(e) => onDateChange(e)}
                style={{
                  width: "100%",
                }}
                required
              />
            </div>
          )}
          {showLeadCategory && (
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
                    {sctCallStatus && sctCallStatus.label} Date
                  </label>

                  <input
                    type="date"
                    placeholder="dd/mm/yyyy"
                    className="form-control cpp-input datevalidation"
                    name="demoDate"
                    min={todaydate}
                    value={demoDate}
                    onChange={(e) => onDateChange1(e)}
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
              min="00:00"
              max="24:00"
              onChange={(e) => onInputChange(e)}
              // required
            />
          </div>
          {showLeadCategory && showLeadCategory ? (
            <div className="col-lg-4 col-md-12 col-sm-12 col-12 notesTopSCT">
              <label className="label-control"> Notes* :</label>
              <textarea
                name="sctCallNote"
                id="sctCallNote"
                className="textarea form-control"
                rows="3"
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
                rows="3"
                placeholder="Notes"
                style={{ width: "100%" }}
                value={sctCallNote}
                onChange={(e) => onInputChange(e)}
                required
              ></textarea>
            </div>
          )}

          {showstatus === "true" ? (
            <>
              {" "}
              <div className="col-lg-4 col-md-12 col-sm-12 col-12 notesTopSCT">
                <label className="label-control"> Expected Month :</label>

                <input
                  type="date"
                  placeholder="dd/mm/yyyy"
                  className="form-control cpp-input datevalidation"
                  min={todaydate}
                  name="expectedMonth"
                  value={expectedMonth}
                  onChange={(e) => onInputChange(e)}
                  style={{
                    width: "100%",
                  }}
                />
              </div>
              <div className="col-lg-4 col-md-12 col-sm-12 col-12 notesTopSCT">
                <label className="label-control"> Sales Value:</label>
                <input
                  type="text"
                  className="form-control "
                  name="salesValue"
                  value={salesValue}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </>
          ) : (
            <></>
          )}

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
                <input
                  type="submit"
                  name="Submit"
                  value="Submit"
                  className="btn sub_form btn_continue blackbrd Save float-right submitTopSCT"
                />
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
                <input
                  type="submit"
                  name="Submit"
                  value="Submit"
                  className="btn sub_form btn_continue blackbrd Save float-right submitTopSCT"
                />
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
