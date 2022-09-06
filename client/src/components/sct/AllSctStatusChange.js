import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Select from "react-select";
import { addSctCalls, addDemo } from "../../actions/sct";
import DemoSchedulesModal from "./DemoSchedulesModal";
import { Modal } from "react-bootstrap";
const AllSctStatusChange = ({
  auth: { isAuthenticated, user, users, loading },
  leadDataVal,
  addSctCalls,
  addDemo,
  ondivcloseChange,
  from,
  filterData,
}) => {
  let StatusMethods = [
    { value: "VoiceMail", label: "Voice Mail" },
    { value: "CallBack", label: "Call Back" },
    { value: "DND", label: "DND" },
    { value: "NI", label: "NI" },
    { value: "FollowUp", label: "Follow Up" },
    { value: "Demo", label: "Demo" },
    { value: "AdditionalDemo", label: "Additional Demo" },
    { value: "EnagedClient", label: "Enaged Client" },
    { value: "RegularClient", label: "Regular Client" },
  ];
  if (from === "FollowUp" || from === "F") {
    StatusMethods = StatusMethods.filter(
      (StatusMethods) => StatusMethods.value !== "FollowUp"
    );
  } else if (from === "EnagedClient") {
    StatusMethods = StatusMethods.filter(
      (StatusMethods) =>
        StatusMethods.value !== "EnagedClient" &&
        StatusMethods.value !== "FollowUp"
    );
  } else if (from === "RegularClient") {
    StatusMethods = StatusMethods.filter(
      (StatusMethods) =>
        StatusMethods.value !== "EnagedClient" &&
        StatusMethods.value !== "FollowUp" &&
        StatusMethods.value !== "RegularClient"
    );
  }

  //formData
  const [formData, setFormData] = useState({
    sctCallStatus: "",
    labeldata: "",
    sctCallNote: "",
    toTime: "",
    fromTime: "",
    isSubmitted: false,
  });
  const { sctCallNote, sctCallStatus, toTime, fromTime } = formData;
  //For setting mindate as todays date
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  var todayDateymd = yyyy + "-" + mm + "-" + dd;
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
  //ends

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
  leadDataVal &&
    leadDataVal.sctStaffs &&
    leadDataVal.sctStaffs.map(
      (sctStaffs) =>
        sctStaffs.sctStaffStatus === "Active" &&
        allStaff.push({
          staffsId: sctStaffs._id,
          label: sctStaffs.sctStaffName,
          value: sctStaffs.sctStaffName,
        })
    );

  const [sctStaffs, getstaffsData] = useState("");
  const onStaffChange = (e) => {
    //  Required Validation starts
    setError({
      ...error,
      stafftypeIdChecker: true,
      stafftypeIdErrorStyle: { color: "#000" },
    });
    // Required Validation ends

    getstaffsData(e);
  };
  const [startStatusDate, setStatusDate] = useState("");
  const onDateChange = (e) => {
    setStatusDate(e.target.value);
  };

  const [showHide, setShowHide] = useState({
    showdateselectionSection: true,
    showdemoselectionSection: false,
  });

  const { showdateselectionSection, showdemoselectionSection } = showHide;

  const onStatusTypeChange = (e) => {
    //Required Validation starts
    setError({
      ...error,
      statusmodeIdChecker: true,
      statusmodeIdErrorStyle: { color: "#000" },
    });
    //Required Validation ends

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
      });
    } else if (e.value === "RegularClient" || e.value === "EnagedClient") {
      setFormData({
        ...formData,
        sctCallStatus: e,
      });
      setStatusDate("");
      setShowHide({
        ...showHide,
        showdateselectionSection: false,
        showdemoselectionSection: false,
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
    let callCategoryVal = null;
    let callComeFromVal = "Lead";
    if (from === "EnagedClient" || from === "RegularClient")
      callComeFromVal = "Client";

    if (sctCallStatus.value === "FollowUp") {
      callCategoryVal = "F";
    } else if (sctCallStatus.value === "EnagedClient") {
      callCategoryVal = "EC";
    } else if (sctCallStatus.value === "RegularClient") {
      callCategoryVal = "RC";
    } else {
      if (leadDataVal.sctLeadCategory === "NL") callCategoryVal = "P";
      else {
        if (from === "EnagedClient" || from === "RegularClient")
          callCategoryVal = leadDataVal.dctClientCategory;
        else callCategoryVal = leadDataVal.dctLeadCategory;
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
        sctCallStatus:
          sctCallStatus.value !== "Demo"
            ? sctCallStatus.value
            : leadDataVal.sctCallStatus,
        sctCallDate: startStatusDate || todayDateymd,
        sctCallNote: sctCallNote,
        sctCallComeFrom: callComeFromVal,
        sctCallTakenDate: new Date().toISOString().split("T")[0],
        sctCallEnteredDate: new Date().toLocaleString("en-GB"),
        filterData: filterData,
      };
      if (sctCallStatus.value === "Demo") {
        const finalData1 = {
          demoDate: demoDate,
          fromTime: fromTime,
          toTime: toTime,
          callDate: todayDateymd,
          demoEnteredById: user._id,
          ClientId: leadDataVal._id,
        };
        addDemo(finalData1);
      }
      addSctCalls(finalData);

      setFormData({
        ...formData,
        sctCallStatus: "",
        sctCallDate: "",
        sctCallNote: "",
        isSubmitted: true,
      });
      ondivcloseChange(true);
      setStatusDate("");
      getstaffsData("");
    }
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <form className="row" onSubmit={(e) => onSubmit(e)}>
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12 fixTableHeadstatus">
          <div className="col-lg-4 col-md-12 col-sm-12 col-12 ">
            <label
              // className="label-control"
              style={statusmodeIdErrorStyle}
            >
              Status :
            </label>
            <Select
              name="sctCallStatus"
              options={StatusMethods}
              isSearchable={false}
              value={sctCallStatus}
              placeholder="Select Status"
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
            <label
              //  className="label-control"
              style={stafftypeIdErrorStyle}
            >
              Staff :
            </label>

            <Select
              name="sctStaffName"
              options={allStaff}
              isSearchable={true}
              value={sctStaffs}
              placeholder="Select Staff"
              onChange={(e) => onStaffChange(e)}
              required
            />
          </div>
          {showdateselectionSection && (
            <div className=" col-lg-4 col-md-12 col-sm-12 col-12 ">
              <label>{sctCallStatus && sctCallStatus.label} Date</label>
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
          <div className="col-lg-8 col-md-12 col-sm-12 col-12 ">
            <label className="label-control"> Notes :</label>
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

          <div className="col-lg-4 col-md-12 col-sm-12 col-12 mt-5">
            <br />
            {loading ? (
              <button
                className="btn sub_form btn_continue blackbrd Save float-right"
                disabled
              >
                Loading...
              </button>
            ) : (
              <input
                type="submit"
                name="Submit"
                value="Submit"
                className="btn sub_form btn_continue blackbrd Save float-right"
              />
            )}
          </div>
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
});

export default connect(mapStateToProps, { addSctCalls, addDemo })(
  AllSctStatusChange
);
