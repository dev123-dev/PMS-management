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
  addDctCalls,
  addDctClientCalls,
  ondivcloseChange,
  from,
  page,
  filterData,
  getStaffsData,
}) => {
  let staffFilter = { staffFrom: from, leadDataVal: leadDataVal };
  useEffect(() => {
    getStaffsData(staffFilter);
  }, [leadDataVal]);
  //Category

  let CategoryMethods = [
    { value: "Hot", label: "Hot" },
    { value: "Normal", label: "Normal" },
    { value: "Cool", label: "Cool" },
  ];

  let StatusMethods = [
    { value: "VoiceMail", label: "Voice Mail" },
    { value: "CallBack", label: "Call Back" },
    { value: "DND", label: "DND" },
    { value: "NI", label: "NI" },
    { value: "WrongNumber", label: "WrongNumber" },
    { value: "FollowUp", label: "Follow Up" },
    { value: "TestClient", label: "Test Client" },
    { value: "RegularClient", label: "Regular Client" },
  ];

  let StatusMethodsforwrongnumber = [{ value: "CallBack", label: "Call Back" }];

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
    dctLeadsCategory: "",
    labeldata: "",
    callNote: "",
    isSubmitted: false,
  });
  const { callNote, callStatus, dctLeadsCategory } = formData;
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
  const [staffs, getstaffsData] = useState("");
  const [phone1, getphone1Data] = useState("");
  const [staffsNumber, getstaffsNumberData] = useState("");

  const onStaffChange = (e) => {
    //  Required Validation starts
    setError({
      ...error,
      stafftypeIdChecker: true,
      stafftypeIdErrorStyle: { color: "#000" },
    });
    // Required Validation ends

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
    showLeadCategory: false,
  });

  const { showdateselectionSection, showLeadCategory } = showHide;

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
        showLeadCategory: false,
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
        showLeadCategory: false,
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
        showLeadCategory: true,
      });
    } else if (e.value === "WrongNumber") {
      setFormData({
        ...formData,
        callStatus: e,
      });
      setStatusDate("");
      setShowHide({
        ...showHide,
        showdateselectionSection: true,
        showLeadCategory: false,
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
        showLeadCategory: false,
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
        showLeadCategory: false,
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
        showLeadCategory: false,
      });
    }
  };

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onLeadCategoryChange = (e) => {
    if (e) {
      setFormData({
        ...formData,
        dctLeadsCategory: e,
      });
    }
  };

  const onSubmit = (e) => {
    let callCategoryVal = null;
    let callComeFromVal = "Lead";
    if (from === "TestClient" || from === "RegularClient")
      callComeFromVal = "Client";
    if (callStatus.value === "FollowUp") {
      callCategoryVal = "F";
    } else if (dctLeadsCategory !== "") {
      if (from === "TestClient") {
        callCategoryVal = "TC";
      } else if (from === "RegularClient") {
        callCategoryVal = "RC";
      } else if (from === "FollowUp") {
        callCategoryVal = "F";
      } else {
        callCategoryVal = "PT";
      }
      // } else if (callStatus.value === "WrongNumber") {
      //   callCategoryVal = "W";
    } else if (callStatus.value === "TestClient") {
      callCategoryVal = "TC";
      // clientTypeVal = "Engaged";
    } else if (callStatus.value === "RegularClient") {
      callCategoryVal = "RC";
      // clientTypeVal = "Regular";
    } else if (callStatus.value === "RegularClient") {
      callCategoryVal = "RC";
      // clientTypeVal = "Regular";
    } else if (callStatus.value === "WrongNumber") {
      callCategoryVal = "W";
    } else if (callStatus.value === "CallBack") {
      if (from === "W") {
        callCategoryVal = "P";
      }
    }

    // else if (callStatus.value === "CallBack") {
    //   callCategoryVal = "P";
    // }
    else if (callStatus.value === "TestClient") {
      callCategoryVal = "TC";
    } else if (callStatus.value === "RegularClient") {
      callCategoryVal = "RC";
    } else {
      if (leadDataVal.dctLeadCategory === "NL") callCategoryVal = "P";
      else {
        if (from === "TestClient" || from === "RegularClient")
          callCategoryVal = leadDataVal.dctClientCategory;
        else callCategoryVal = leadDataVal.dctLeadCategory;
      }
    }
    console.log("callCategoryVal", callCategoryVal);
    console.log("callStatus.value", callStatus.value);
    console.log("from", from);
    e.preventDefault();
    if (checkErrors()) {
      const finalData = {
        callToId: leadDataVal._id,
        callToName: leadDataVal.companyName,
        callToNumber: staffsNumber ? staffsNumber : phone1,
        callToStaffId: staffs.staffsId,
        callToStaffName: staffs.value,
        callFromId: user._id,
        callFromName: user.userName,
        callCategory: callCategoryVal,
        callStatus: callStatus.value,
        // dctLeadsCategory: dctLeadsCategory ? dctLeadsCategory.value : "",
        dctLeadsCategory: dctLeadsCategory
          ? dctLeadsCategory.value
          : leadDataVal.dctLeadsCategory
          ? leadDataVal.dctLeadsCategory
          : "",
        callDate: startStatusDate || todayDateymd,
        callNote: callNote?.trim(),
        callComeFrom: callComeFromVal,
        callTakenDate: new Date().toISOString().split("T")[0],
        callEnteredDateTime: new Date().toLocaleString("en-GB"),
        filterData: filterData,
      };
      //console.log("finaldata", finalData);
      if (from === "TestClient" || from === "RegularClient") {
        addDctClientCalls(finalData);
      } else {
        addDctCalls(finalData);
      }
      setFormData({
        ...formData,
        callStatus: "",
        dctLeadsCategory: "",
        callDate: "",
        callNote: "",
        isSubmitted: true,
      });
      ondivcloseChange(true);
      setStatusDate("");
      getstaffsData("");
    }
  };

  useEffect(() => {
    setStatusDate("");
    getstaffsData("");
    setFormData({
      ...formData,
      callStatus: "",
      dctLeadsCategory: "",
      callDate: "",
      callNote: "",
    });
  }, [leadDataVal]);

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <form className="row" onSubmit={(e) => onSubmit(e)}>
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12 fixTableHeadstatusDCT">
          <div className="col-lg-4 col-md-12 col-sm-12 col-12 headingTop">
            <label className="label-control" style={statusmodeIdErrorStyle}>
              Status :
            </label>
            {page === "AllWrongNumber" ? (
              <>
                {" "}
                <Select
                  name="callStatus"
                  options={StatusMethodsforwrongnumber}
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
            <label className="label-control" style={stafftypeIdErrorStyle}>
              Staff :
            </label>

            <Select
              name="staffName"
              options={allStaff}
              isSearchable={true}
              value={staffs}
              placeholder="Select"
              onChange={(e) => onStaffChange(e)}
              required
            />
          </div>
          <div className=" col-lg-4 col-md-12 col-sm-12 col-12 headingTop ">
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

          {showLeadCategory &&
          from !== "FollowUp" &&
          from !== "TestClient" &&
          from !== "RegularClient" &&
          from !== "W" ? (
            <div className="col-lg-4 col-md-12 col-sm-12 col-12 notesTop">
              <label className="label-control">Category :</label>
              <Select
                name="dctLeadsCategory"
                options={CategoryMethods}
                isSearchable={true}
                value={dctLeadsCategory}
                placeholder="Select"
                onChange={(e) => onLeadCategoryChange(e)}
              />
            </div>
          ) : (
            <></>
          )}
          {showLeadCategory && showLeadCategory ? (
            <div className="col-lg-5 col-md-12 col-sm-12 col-12 notesTop">
              <label className="label-control"> Notes :</label>
              <textarea
                name="callNote"
                id="callNote"
                className="textarea "
                rows="3"
                cols="5"
                placeholder="Notes"
                style={{ width: "100%" }}
                value={callNote}
                onChange={(e) => onInputChange(e)}
                required
              ></textarea>
            </div>
          ) : (
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
          )}
          {showLeadCategory && showLeadCategory ? (
            <div className="col-lg-3 col-md-12 col-sm-12 col-12 mt-5">
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
          ) : (
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
          )}
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
