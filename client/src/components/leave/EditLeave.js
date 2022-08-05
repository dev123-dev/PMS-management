import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Select from "react-select";

import {
  getAllEmployee,
  getAllStaff,
  editLeaveDetails,
  getALLLeaveCatMode,
} from "../../actions/user";
const DateMethods = [
  { value: "Single Date", label: "Single Date" },
  { value: "Multi Date", label: "Multi Date" },
];
const LeaveTypeday = [
  { value: "FullDay", label: "FullDay" },
  { value: "HalfDay", label: "HalfDay" },
];
const EditLeave = ({
  auth: { isAuthenticated, user, users, loading },
  //   settings: { allStaffName },
  getAllEmployee,
  editLeaveDetails,
  user: { allEmployee, leaveCatMode },
  allLeavedata,
  getAllStaff,
  onEditModalChange,
  getALLLeaveCatMode,
}) => {
  useEffect(() => {
    getAllEmployee();
  }, [getAllEmployee]);
  useEffect(() => {
    getAllStaff();
  }, [getAllStaff]);
  useEffect(() => {
    getALLLeaveCatMode();
  }, [getALLLeaveCatMode]);

  //formData
  const [formData, setFormData] = useState({
    leaveReason:
      allLeavedata && allLeavedata.leaveReason ? allLeavedata.leaveReason : "",
    empFullName:
      allLeavedata && allLeavedata.output.empFullName
        ? allLeavedata.output.empFullName
        : "",

    leaveTypedaymode:
      allLeavedata && allLeavedata.leaveType
        ? {
            value: allLeavedata.leaveType,
            label: allLeavedata.leaveType,
          }
        : "",

    // slVal: null,
    // isSubmitted: false,
    //Dateselectmode: DateMethods[0],
  });
  const format = "YYYY-MM-DD";
  // const [dates, setDates] = useState([]);

  //======================
  function getDatesInRange(startDate, endDate) {
    const date = new Date(startDate.getTime());

    const dates = [];

    while (date <= endDate) {
      dates.push(new Date(date).toISOString().split("T")[0]);
      date.setDate(date.getDate() + 1);
    }

    return dates;
  }

  //========================

  // const [showHide, setShowHide] = useState({
  //   showChequenoSection: false,
  //   showChequenoSection1: true,
  // });
  // const { showChequenoSection, showChequenoSection1 } = showHide;

  // const onDateModeChange = (e) => {
  //   if (e) {
  //     setFormData({
  //       ...formData,
  //       Dateselectmode: e,
  //     });
  //   }
  //   if (e.value === "Multi Date") {
  //     setShowHide({
  //       ...showHide,
  //       showChequenoSection: true,
  //       showChequenoSection1: false,
  //     });
  //   } else {
  //     setShowHide({
  //       ...showHide,
  //       showChequenoSection: false,
  //       showChequenoSection1: true,
  //     });
  //   }
  // };

  const {
    empFullName,
    leaveReason,
    // slVal,
    // Dateselectmode,
    leaveTypedaymode,
    leaveStartDate,
    leaveEndDate,
  } = formData;
  const [leaveDate, setleaveDate] = useState(
    allLeavedata && allLeavedata.leaveDate ? allLeavedata.leaveDate : ""
  );
  const onDateChange = (e) => {
    setleaveDate(e.target.value);
  };
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [error, setError] = useState({
    nextBtnStyle: { opacity: "0.5", pointerEvents: "none" },
  });

  const { nextBtnStyle } = error;
  const onLeaveTypeSelect = (leaveType) => {
    if (leaveType === "fullDay") {
      setFormData({
        ...formData,
        slVal: "FullDay",
      });
    } else if (leaveType === "halfDay") {
      setFormData({
        ...formData,
        slVal: "HalfDay",
      });
    }
    setError({
      ...error,
      nextBtnStyle: { opacity: "1" },
    });
  };
  //   let activeClientData = JSON.parse(localStorage.getItem("activeClientData"));
  let allStaffName = JSON.parse(localStorage.getItem("allStaffName"));
  const activeStaffsOpt = [];
  allStaffName &&
    allStaffName.map((staffsData) =>
      activeStaffsOpt.push({
        employeeId: staffsData._id,
        label: staffsData.empFullName,
        value: staffsData._id,
      })
    );
  const [staffData, setstaffData] = useState(
    allLeavedata
      ? activeStaffsOpt &&
          activeStaffsOpt.filter((x) => x.employeeId === allLeavedata.empId)[0]
      : ""
  );
  const [employeeId, setpaymentId] = useState(allLeavedata.empId);
  const [employeename, setpaymentname] = useState();
  const onLeaveTypeModeChange = (e) => {
    if (e) {
      setFormData({
        ...formData,
        leaveTypedaymode: e,
      });
    }
  };
  const onStaffChange = (e) => {
    var employeeId = "";
    var employeename = "";
    setstaffData(e);
    employeeId = e.value;
    employeename = e.label;
    setpaymentId(employeeId);
    setpaymentname(employeename);
  };

  const allleavecatmodes = [];
  leaveCatMode.map((leavecat) =>
    allleavecatmodes.push({
      leavecatId: leavecat._id,
      label: leavecat.leavecategoryName,
      value: leavecat.leavecategoryName,
    })
  );

  const [leavecat, getleavecatData] = useState(
    allLeavedata
      ? allleavecatmodes &&
          allleavecatmodes.filter(
            (x) => x.value === allLeavedata.leavecategoryName
          )
      : ""
  );
  const [leavecatId, setleavecatId] = useState("");
  const [leavecatname, setleavecatname] = useState("");

  const onLeaveCatModeChange = (e) => {
    var leavecatId = "";
    var leavecatname = "";
    getleavecatData(e);
    leavecatId = e.leavecatId;
    leavecatname = e.value;
    setleavecatId(leavecatId);
    setleavecatname(leavecatname);
  };

  //Required Validation ends
  const onSubmit = (e) => {
    // let leaveDateVals = [];
    // if (showChequenoSection) {
    //   const d1 = new Date(leaveStartDate);
    //   const d2 = new Date(leaveEndDate);
    //   leaveDateVals = getDatesInRange(d1, d2);
    // } else {
    //   const d1 = new Date(leaveDate);
    //   const d2 = new Date(leaveDate);
    //   leaveDateVals = getDatesInRange(d1, d2);
    // }
    e.preventDefault();
    const finalData = {
      recordId: allLeavedata ? allLeavedata._id : "",

      leaveDate: leaveDate,
      leaveType: leaveTypedaymode.value,
      leaveReason: leaveReason,
      leavecategoryName: leavecatname,
      leavecategoryId: leavecatId,
      leaveEditedById: user._id,
      leaveEditedDateTime: new Date().toLocaleString(),
    };

    editLeaveDetails(finalData);
    onEditModalChange(true);
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="col-lg-6 col-md-12 col-sm-12 col-12">
            <label className="label-control"> Staff Name * :</label>

            <input
              type="text"
              name="empFullName"
              value={empFullName}
              className="form-control"
              onChange={(e) => onInputChange(e)}
              disabled
            />
          </div>

          <div className="col-lg-6 col-md-12 col-sm-12 col-12">
            <label className="label-control">Leave Type</label>
            <Select
              name="leaveTypedaymode"
              options={LeaveTypeday}
              isSearchable={true}
              value={leaveTypedaymode}
              onChange={(e) => onLeaveTypeModeChange(e)}
            />
          </div>

          {/* <div className="col-lg-6 col-md-12 col-sm-12 col-12">
            <label className="label-control">&nbsp;</label>
            <Select
              name="Dateselectmode"
              options={DateMethods}
              isSearchable={true}
              defaultValue={DateMethods[0]}
              value={Dateselectmode}
              placeholder="Select"
              onChange={(e) => onDateModeChange(e)}
            />
          </div> */}
          {/* {showChequenoSection && (
            <>
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <label className="label-control">From Date* :</label>
                <br />
                <input
                  type="date"
                  placeholder="dd/mm/yyyy"
                  className="form-control cpp-input datevalidation"
                  name="leaveStartDate"
                  value={leaveStartDate}
                  onChange={(e) => onInputChange(e)}
                  style={{
                    width: "75%",
                  }}
                  required
                />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <label className="label-control">To Date* :</label>
                <br />
                <input
                  type="date"
                  placeholder="dd/mm/yyyy"
                  className="form-control cpp-input datevalidation"
                  name="leaveEndDate"
                  value={leaveEndDate}
                  onChange={(e) => onInputChange(e)}
                  style={{
                    width: "75%",
                  }}
                  required
                />
              </div>
            </>
          )}
          {showChequenoSection1 && ( */}
          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <label className="label-control">Leave Date* :</label>
            <br />
            <input
              type="date"
              placeholder="dd/mm/yyyy"
              className="form-control cpp-input datevalidation"
              name="leaveDate"
              value={leaveDate}
              onChange={(e) => onDateChange(e)}
              // onChange={(e) => onInputChange(e)}
              style={{
                width: "75%",
              }}
              required
            />
          </div>
          {/* )} */}

          <div className="col-lg-6 col-md-12 col-sm-12 col-12">
            <label className="label-control"> Leave Category * :</label>

            <Select
              name="leaveCatMode"
              options={allleavecatmodes}
              isSearchable={true}
              value={leavecat}
              placeholder="Select Mode"
              onChange={(e) => onLeaveCatModeChange(e)}
            />
          </div>

          <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3"></div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <label className="label-control"> Reason :</label>
            <textarea
              name="leaveReason"
              id="leaveReason"
              className="textarea form-control"
              rows="3"
              placeholder="Leave Reason"
              style={{ width: "100%" }}
              value={leaveReason}
              onChange={(e) => onInputChange(e)}
            ></textarea>
          </div>
        </div>

        <div className="col-md-12 col-lg-12 col-sm-12 col-12 text-left">
          {loading ? (
            <button
              className="btn sub_form btn_continue Save float-right"
              disabled
            >
              Loading...
            </button>
          ) : (
            <input
              type="submit"
              name="submit"
              value="Edit Leave"
              className="btn sub_form btn_continue Save float-right"
            />
          )}
        </div>
      </form>
    </Fragment>
  );
};

EditLeave.propTypes = {
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  getAllEmployee: PropTypes.func.isRequired,
  editLeaveDetails: PropTypes.func.isRequired,
  getALLLeaveCatMode: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  settings: state.settings,
});

export default connect(mapStateToProps, {
  getAllEmployee,
  getAllStaff,
  editLeaveDetails,
  getALLLeaveCatMode,
})(EditLeave);
