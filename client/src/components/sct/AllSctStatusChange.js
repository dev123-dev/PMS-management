import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Select from "react-select";
import { addDctCalls, addDctClientCalls } from "../../actions/dct";

const AllSctStatusChange = ({
  auth: { isAuthenticated, user, users, loading },
  leadDataVal,
  addDctCalls,
  addDctClientCalls,
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
    isSubmitted: false,
  });
  const { sctCallNote, sctCallStatus } = formData;
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

  const allStaff = [];
  leadDataVal &&
    leadDataVal.staffs &&
    leadDataVal.staffs.map(
      (staffs) =>
        staffs.staffStatus === "Active" &&
        allStaff.push({
          staffsId: staffs._id,
          label: staffs.sctStaffName,
          value: staffs.sctStaffName,
        })
    );

  const [staffs, getstaffsData] = useState("");
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
  });

  const { showdateselectionSection } = showHide;

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
      });
    } else {
      setFormData({
        ...formData,
        sctCallStatus: e,
      });
      setStatusDate("");
      setShowHide({
        ...showHide,
        showdateselectionSection: false,
      });
    }
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
      callCategoryVal = "TC";
    } else if (sctCallStatus.value === "RegularClient") {
      callCategoryVal = "RC";
    } else {
      if (leadDataVal.dctLeadCategory === "NL") callCategoryVal = "P";
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
        sctCallToName: leadDataVal.companyName,
        sctCallToStaffId: staffs.staffsId,
        sctCallToStaffName: staffs.value,
        sctCallFromId: user._id,
        sctCallFromName: user.userName,
        sctCallCategory: callCategoryVal,
        sctCallStatus: sctCallStatus.value,
        sctCallDate: startStatusDate || todayDateymd,
        sctCallNote: sctCallNote,
        sctCallComeFrom: callComeFromVal,
        sctCallTakenDate: new Date().toISOString().split("T")[0],
        sctCallEnteredDate: new Date().toLocaleString("en-GB"),
        filterData: filterData,
      };
      // console.log(finalData);
      if (from === "EnagedClient" || from === "RegularClient") {
        addDctClientCalls(finalData);
      } else {
        addDctCalls(finalData);
      }
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
              value={staffs}
              placeholder="Select Staff"
              onChange={(e) => onStaffChange(e)}
              required
            />
          </div>
          <div className=" col-lg-4 col-md-12 col-sm-12 col-12 ">
            {showdateselectionSection && (
              <>
                <label
                // className="label-control"
                >
                  {sctCallStatus && sctCallStatus.label} Date
                </label>

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
              </>
            )}
          </div>
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
    </Fragment>
  );
};

AllSctStatusChange.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addDctCalls, addDctClientCalls })(
  AllSctStatusChange
);
