import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Select from "react-select";
import { addDctCalls, addDctClientCalls } from "../../actions/dct";

const AllStatuschange = ({
  auth: { isAuthenticated, user, users, loading },
  leadDataVal,
  addDctCalls,
  addDctClientCalls,
  ondivcloseChange,
  from,
  filterData,
}) => {
  let StatusMethods = [
    { value: "VoiceMail", label: "VoiceMail" },
    { value: "CallBack", label: "Call Back" },
    { value: "DND", label: "DND" },
    { value: "NI", label: "NI" },
    { value: "FollowUp", label: "Follow Up" },
    { value: "TestClient", label: "Test Client" },
    { value: "RegularClient", label: "Regular Client" },
  ];
  if (from === "FollowUp" || from === "F") {
    StatusMethods = StatusMethods.filter(
      (StatusMethods) => StatusMethods.value !== "FollowUp"
    );
  } else if (from === "TestClient") {
    StatusMethods = StatusMethods.filter(
      (StatusMethods) =>
        StatusMethods.value !== "TestClient" &&
        StatusMethods.value !== "FollowUp"
    );
  } else if (from === "RegularClient") {
    StatusMethods = StatusMethods.filter(
      (StatusMethods) =>
        StatusMethods.value !== "TestClient" &&
        StatusMethods.value !== "FollowUp" &&
        StatusMethods.value !== "RegularClient"
    );
  }

  //formData
  const [formData, setFormData] = useState({
    callStatus: "",
    labeldata: "",
    callNote: "",
    isSubmitted: false,
  });
  const { callNote, callStatus } = formData;
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
    leadDataVal.staffs.map((staffs) =>
      allStaff.push({
        staffsId: staffs._id,
        label: staffs.staffName,
        value: staffs.staffName,
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
        callStatus: e,
      });
    }
    if (e.value === "DND") {
      setFormData({
        ...formData,
        callStatus: e,
      });
      setStatusDate(nextmonth);
      setShowHide({
        ...showHide,
        showdateselectionSection: true,
      });
    } else if (e.value === "NI") {
      setFormData({
        ...formData,
        callStatus: e,
      });
      setStatusDate(nextyear);
      setShowHide({
        ...showHide,
        showdateselectionSection: true,
      });
    } else if (e.value === "CallBack") {
      setFormData({
        ...formData,
        callStatus: e,
      });
      setStatusDate("");
      setShowHide({
        ...showHide,
        showdateselectionSection: true,
      });
    } else if (e.value === "VoiceMail") {
      setFormData({
        ...formData,
        callStatus: e,
      });
      setStatusDate(nextday);
      setShowHide({
        ...showHide,
        showdateselectionSection: true,
      });
    } else if (e.value === "FollowUp") {
      setFormData({
        ...formData,
        callStatus: e,
      });
      setStatusDate("");
      setShowHide({
        ...showHide,
        showdateselectionSection: true,
      });
    } else {
      setFormData({
        ...formData,
        callStatus: e,
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
    if (callStatus.value === "FollowUp") {
      callCategoryVal = "F";
    } else if (callStatus.value === "TestClient") {
      callCategoryVal = "TC";
    } else if (callStatus.value === "RegularClient") {
      callCategoryVal = "RC";
    } else {
      if (leadDataVal.dctLeadCategory === "NL") callCategoryVal = "P";
      else callCategoryVal = leadDataVal.dctLeadCategory;
    }
    e.preventDefault();
    if (checkErrors()) {
      const finalData = {
        callToId: leadDataVal._id,
        callToName: leadDataVal.companyName,
        callToStaffId: staffs.staffsId,
        callToStaffName: staffs.value,
        callFromId: user._id,
        callFromName: user.userName,
        callCategory: callCategoryVal,
        callStatus: callStatus.value,
        callDate: startStatusDate || todayDateymd,
        callNote: callNote,
        callEnteredDate: new Date().toLocaleString("en-GB"),
        filterData: filterData,
      };
      // console.log(finalData);
      if (from === "TestClient" || from === "RegularClient") {
        addDctClientCalls(finalData);
      } else {
        addDctCalls(finalData);
      }
      setFormData({
        ...formData,
        callStatus: "",
        callDate: "",
        callNote: "",
        isSubmitted: true,
      });
      setStatusDate("");
      getstaffsData("");
      ondivcloseChange(true);
    }
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <form className="row" onSubmit={(e) => onSubmit(e)}>
        <div className="row col-lg-12 col-md-11 col-sm-10 col-10 ">
          <div className="col-lg-4 col-md-11 col-sm-10 col-10 ">
            <label className="label-control" style={statusmodeIdErrorStyle}>
              {" "}
              Status :
            </label>
            <Select
              name="callStatus"
              options={StatusMethods}
              isSearchable={false}
              value={callStatus}
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

          <div className="col-lg-4 col-md-11 col-sm-10 col-10 ">
            <label className="label-control" style={stafftypeIdErrorStyle}>
              Staff :
            </label>

            <Select
              name="staffName"
              options={allStaff}
              isSearchable={true}
              value={staffs}
              placeholder="Select Staff"
              onChange={(e) => onStaffChange(e)}
              required
            />
          </div>
          <div className=" col-lg-4 col-md-11 col-sm-10 col-10 ">
            {showdateselectionSection && (
              <>
                <label className="label-control">
                  {callStatus && callStatus.label} Date
                </label>

                <input
                  type="date"
                  placeholder="dd/mm/yyyy"
                  className="form-control cpp-input datevalidation"
                  name="callDate"
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
          <div className="col-lg-8 col-md-11 col-sm-10 col-10 ">
            <label className="label-control"> Notes :</label>
            <textarea
              name="callNote"
              id="callNote"
              className="textarea form-control"
              rows="3"
              placeholder="Notes"
              style={{ width: "100%" }}
              value={callNote}
              onChange={(e) => onInputChange(e)}
              required
            ></textarea>
          </div>

          <div className="col-lg-4 col-md-6 col-sm-12 col-12 mt-5">
            <br />
            <input
              type="submit"
              name="Submit"
              value="Submit"
              className="btn sub_form btn_continue blackbrd Save float-right"
            />
          </div>
        </div>
      </form>
    </Fragment>
  );
};

AllStatuschange.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addDctCalls, addDctClientCalls })(
  AllStatuschange
);
