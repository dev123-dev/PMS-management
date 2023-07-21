import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Select from "react-select";
import {
  addDctCalls,
  addDctClientCalls,
  getStaffsData,
} from "../../actions/dct";

const AllStatuschange = ({
  auth: { isAuthenticated, user, users, loading },
  dct: { staffData },
  leadDataVal,
  ondivcloseChange,
  from,
  page,
  filterData,
  getStaffsData,
}) => {

  // When a Client is Selected *leadDataVal* gets the new selected client, useEffect is Triggered
  useEffect(() => {
    resetStatusData();
    getStaffsData({ staffFrom: from, leadDataId: leadDataVal._id }); // Joel 18-07-2023 Only need to pass Lead Id not the whole Lead Object to get Staff Data
  }, [leadDataVal]);

  let StatusMethods = [
    { value: "VoiceMail", label: "Voice Mail" },
    { value: "CallBack", label: "Call Back" },
    { value: "DND", label: "DND" },
    { value: "NI", label: "NI" },
    { value: "WrongNumber", label: "Wrong No" },
    { value: "FollowUp", label: "Follow Up" },
    { value: "TestClient", label: "Test Client" },
    { value: "RegularClient", label: "Regular Client" },
  ];

  let StatusMethodsForWrongNumber = [{ value: "CallBack", label: "Call Back" }];

  // Status Filter based on Follow Up, Test Client and Regular Client
  if (from === "FollowUp") {
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

  const [formData, setFormData] = useState({
    callStatus: "",
    callToStaff: "",
    nextCallDate: "",
    callNote: "",
    isSubmitted: false
  });
  const { callStatus, callToStaff, nextCallDate, callNote } = formData;

  // Next Month
  var d = new Date();
  d.setMonth(d.getMonth() + 1);
  var nextmonth = d.toISOString().split("T")[0];
  // End Next Month

  // Next Year
  var d1 = new Date();
  d1.setFullYear(d1.getFullYear() + 1);
  var nextyear = d1.toISOString().split("T")[0];
  // End Next Year

  // Next Day 
  var d2 = new Date();
  d2.setDate(d2.getDate() + 1);
  var nextday = d2.toISOString().split("T")[0];
  // End Next Day

  // Today's Date
  var d3 = new Date();
  d3.setDate(d3.getDate());
  var todaydate = d3.toISOString().split("T")[0];
  // End Today's Date

  //Required Validation Starts
  const [error, setError] = useState({
    callStatusSelectedChecker: false,
    callStatusErrorStyle: {},
    callStaffSelectedChecker: false,
    callStaffErrorStyle: {},
  });
  const {
    callStatusSelectedChecker,
    callStatusErrorStyle,
    callStaffSelectedChecker,
    callStaffErrorStyle,
  } = error;

  const checkErrors = () => {
    if (!callStatusSelectedChecker) {
      setError({
        ...error,
        callStatusErrorStyle: { color: "#F00" },
      });
      return false;
    }
    if (!callStaffSelectedChecker) {
      setError({
        ...error,
        callStaffErrorStyle: { color: "#F00" },
      });
      return false;
    }
    return true;
  };
  // Required Validation Ends

  const allStaff = [];
  staffData &&
    staffData.staffs &&
    staffData.staffs.map(
      (staffs) =>
        staffs.staffStatus === "Active" &&
        allStaff.push({
          staffsId: staffs._id,
          phone1: staffData.phone1,
          staffsNumber: staffs.staffPhoneNumber,
          label: staffs.staffName,
          value: staffs.staffName,
        })
    );

  const onStaffChange = (e) => {
    //  Required Validation Starts
    setError({
      ...error,
      callStaffSelectedChecker: true,
      callStaffErrorStyle: { color: "#000" },
    });
    // Required Validation Ends   

    setFormData({
      ...formData,
      callToStaff: e
    });
  };

  const onDateChange = (e) => {
    setFormData({
      ...formData,
      nextCallDate: e.target.value
    });
  };

  const [showHide, setShowHide] = useState({
    showDateSelectionSection: true
  });

  const { showDateSelectionSection } = showHide;

  const onStatusTypeChange = (e) => {
    //Required Validation starts
    setError({
      ...error,
      callStatusSelectedChecker: true,
      callStatusErrorStyle: { color: "#000" },
    });
    //Required Validation ends 

    switch (e.value) {
      case "DND":
        setFormData({
          ...formData,
          callStatus: e,
          nextCallDate: nextmonth
        });
        setShowHide({
          ...showHide,
          showDateSelectionSection: true
        });
        break;
      case "NI":
        setFormData({
          ...formData,
          callStatus: e,
          nextCallDate: nextyear
        });
        setShowHide({
          ...showHide,
          showDateSelectionSection: true
        });
        break;
      case "CallBack":
        setFormData({
          ...formData,
          callStatus: e,
          nextCallDate: ""
        });
        setShowHide({
          ...showHide,
          showDateSelectionSection: true
        });
        break;
      case "WrongNumber":
        setFormData({
          ...formData,
          callStatus: e,
          nextCallDate: ""
        });
        setShowHide({
          ...showHide,
          showDateSelectionSection: true
        });
        break;
      case "VoiceMail":
        setFormData({
          ...formData,
          callStatus: e,
          nextCallDate: nextday
        });
        setShowHide({
          ...showHide,
          showDateSelectionSection: true
        });
        break;
      case "FollowUp":
        setFormData({
          ...formData,
          callStatus: e,
          nextCallDate: ""
        });
        setShowHide({
          ...showHide,
          showDateSelectionSection: true
        });
        break;
      default:
        setFormData({
          ...formData,
          callStatus: e,
          nextCallDate: ""
        });
        setShowHide({
          ...showHide,
          showDateSelectionSection: false
        });
        break;
    }
  };

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let callComeFromVal = from;
    let callCategoryVal = "";

    if (callStatus.value === "VoiceMail" ||
      callStatus.value === "CallBack" ||
      callStatus.value === "DND" ||
      callStatus.value === "NI") {
      if (callComeFromVal === "Prospect")
        callCategoryVal = "P";
      else if (callComeFromVal === "FollowUp")
        callCategoryVal = "F";
      else if (callComeFromVal === "WrongNumber")
        callCategoryVal = "W";
      else if (callComeFromVal === "TestClient")
        callCategoryVal = "TC";
      else if (callComeFromVal === "RegularClient")
        callCategoryVal = "RC";
    }
    else if (callStatus.value === "WrongNumber")
      callCategoryVal = "W"
    else if (callStatus.value === "FollowUp") {
      callCategoryVal = "F"
    }
    else if (callStatus.value === "TestClient")
      callCategoryVal = "TC"
    else if (callStatus.value === "RegularClient")
      callCategoryVal = "RC"

    if (checkErrors()) {
      const finalData = {
        callToId: leadDataVal._id,
        callToName: leadDataVal.companyName,
        callToNumber: callToStaff.staffsNumber !== "" ? callToStaff.staffsNumber : callToStaff.phone1,
        callToStaffId: callToStaff.staffsId,
        callToStaffName: callToStaff.value,
        callFromId: user._id,
        callFromName: user.userName,
        callCategory: callCategoryVal,
        callStatus: callStatus.value,
        dctLeadsCategory: "",
        callDate: nextCallDate,
        callNote: callNote?.trim(),
        callComeFrom: callComeFromVal,
        callTakenDate: new Date().toISOString().split("T")[0],
        callEnteredDateTime: new Date().toLocaleString("en-GB"),
        filterData: filterData,
      };

      if (from === "TestClient" || from === "RegularClient") {
        addDctClientCalls(finalData);
      } else {
        addDctCalls(finalData);
      }

      ondivcloseChange(true);
      resetStatusData();
    }
  };

  const resetStatusData = () => {
    setFormData({
      ...formData,
      callStatus: "",
      callToSatff: "",
      nextCallDate: "",
      callNote: "",
    });
  }

  return !isAuthenticated || !user ? (
    <Spinner />
  ) : (
    <Fragment>
      <form className="row" onSubmit={(e) => onSubmit(e)}>
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12 fixTableHeadstatusDCT">
          <div className="col-lg-4 col-md-12 col-sm-12 col-12 headingTop">
            <label className="label-control" style={callStatusErrorStyle}>
              Status :
            </label>
            {page === "AllWrongNumber" ? (
              <>
                {" "}
                <Select
                  name="callStatus"
                  options={StatusMethodsForWrongNumber}
                  isSearchable={false}
                  value={callStatus}
                  placeholder="Select"
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
              </>
            ) : (
              <>
                {" "}
                <Select
                  name="callStatus"
                  options={StatusMethods}
                  isSearchable={false}
                  value={callStatus}
                  placeholder="Select"
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
              </>
            )}
          </div>

          <div className="col-lg-4 col-md-12 col-sm-12 col-12 headingTop">
            <label className="label-control" style={callStaffErrorStyle}>
              Staff :
            </label>

            <Select
              name="staffName"
              options={allStaff}
              isSearchable={true}
              value={callToStaff}
              placeholder="Select"
              onChange={(e) => onStaffChange(e)}
              required
            />
          </div>
          <div className=" col-lg-4 col-md-12 col-sm-12 col-12 headingTop ">
            {showDateSelectionSection && (
              <>
                <label className="label-control">
                  {callStatus.label} Date :
                </label>

                <input
                  type="date"
                  placeholder="dd/mm/yyyy"
                  className="form-control cpp-input datevalidation"
                  name="callDate"
                  min={todaydate}
                  value={nextCallDate}
                  onChange={(e) => onDateChange(e)}
                  style={{
                    width: "100%",
                  }}
                  required
                />
              </>
            )}
          </div>


          <div className="col-lg-8 col-md-12 col-sm-12 col-12 notesTop">
            <label className="label-control"> Notes :</label>
            <textarea
              name="callNote"
              id="callNote"
              className="textarea "
              rows="3"
              placeholder="Notes"
              style={{ width: "100%" }}
              value={callNote}
              onChange={(e) => onInputChange(e)}
              required
            ></textarea>
          </div>

          <div className="col-lg-4 col-md-12 col-sm-12 col-12 mt-5">
            <br />
            {loading ? (
              <button
                className="btn sub_form btn_continue blackbrd Save float-right submitTop"
                disabled
              >
                Loading...
              </button>
            ) : (
              <input
                type="submit"
                name="Submit"
                value="Submit"
                className="btn sub_form btn_continue blackbrd Save float-right submitTop"
              />
            )}
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
  dct: state.dct,
});

export default connect(mapStateToProps, {
  addDctCalls,
  addDctClientCalls,
  getStaffsData,
})(AllStatuschange);
