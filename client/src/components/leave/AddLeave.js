import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Select from "react-select";
import DatePicker, { DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
// import MultipleDatePicker from "react-multiple-datepicker";
import { getAllEmployee, getAllStaff, addLeaves } from "../../actions/user";
const DateMethods = [
  { value: "Single Date", label: "Single Date" },
  { value: "Multi Date", label: "Multi Date" },
];
const AddLeave = ({
  auth: { isAuthenticated, user, users, loading },
  settings: { allStaffName },
  getAllEmployee,
  onAddDistrictModalChange,
  user: { allEmployee },
  getAllStaff,
  addLeaves,
}) => {
  useEffect(() => {
    getAllEmployee();
  }, [getAllEmployee]);
  useEffect(() => {
    getAllStaff();
  }, [getAllStaff]);
  //formData
  const [formData, setFormData] = useState({
    empId: "",
    leaveReason: "",
    slVal: null,
    isSubmitted: false,
    Dateselectmode: DateMethods[0],
    leaveStartDate: "",
    leaveEndDate: "",
    leaveDate: "",
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

  const [showHide, setShowHide] = useState({
    showChequenoSection: false,
    showChequenoSection1: true,
  });
  const { showChequenoSection, showChequenoSection1 } = showHide;

  const onDateModeChange = (e) => {
    if (e) {
      setFormData({
        ...formData,
        Dateselectmode: e,
      });
    }
    if (e.value === "Multi Date") {
      setShowHide({
        ...showHide,
        showChequenoSection: true,
        showChequenoSection1: false,
      });
    } else {
      setShowHide({
        ...showHide,
        showChequenoSection: false,
        showChequenoSection1: true,
      });
    }
  };

  const {
    leaveReason,
    slVal,
    Dateselectmode,
    leaveStartDate,
    leaveEndDate,
    leaveDate,
  } = formData;

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

  const [staffData, setstaffData] = useState("");
  const [employeeId, setpaymentId] = useState("");
  const [employeename, setpaymentname] = useState("");
  const activeStaffsOpt = [];
  allStaffName &&
    allStaffName.map((staffsData) =>
      activeStaffsOpt.push({
        label: staffsData.empFullName,
        value: staffsData._id,
      })
    );
  const onStaffChange = (e) => {
    var employeeId = "";
    var employeename = "";
    setstaffData(e);
    employeeId = e.value;
    employeename = e.label;
    setpaymentId(employeeId);
    setpaymentname(employeename);
  };

  //Required Validation ends
  const onSubmit = (e) => {
    let leaveDateVals = [];
    if (showChequenoSection) {
      const d1 = new Date(leaveStartDate);
      const d2 = new Date(leaveEndDate);
      leaveDateVals = getDatesInRange(d1, d2);
    } else {
      const d1 = new Date(leaveDate);
      const d2 = new Date(leaveDate);
      leaveDateVals = getDatesInRange(d1, d2);
    }
    e.preventDefault();
    const finalData = {
      leaveDateVals: leaveDateVals,
      leaveType: slVal,
      leaveReason: leaveReason,
      empId: employeeId,
    };
    addLeaves(finalData);
    onAddDistrictModalChange(true);
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="col-lg-6 col-md-12 col-sm-12 col-12">
            <label className="label-control"> Staff Name * :</label>
            <Select
              name="staffData"
              isSearchable={true}
              value={staffData}
              options={activeStaffsOpt}
              placeholder="Select Staff"
              onChange={(e) => onStaffChange(e)}
              required
            />
          </div>
          {/* <DatePicker
            multiple
            onChange={(array) => {
              //Array of Dateobjecs
              alert("selected dates :\n" + array.join(",\n"));
            }}
          /> */}

          {/* <MultipleDatePicker
            onSubmit={(dates) => console.log("selected dates ", dates)}
            minDate={new Date()}
          /> */}
          {/* <div className="col-lg-6 col-md-12 col-sm-12 col-12">
            <label className="label-control"> Date * :</label>
            <br />

            <DatePicker
              value={dates}
              onChange={setDates}
              multiple
              sort
              format={format}
              calendarPosition="bottom-center"
              plugins={[<DatePanel />]}
            />

            <ul>
              {dates.map((date, index) => (
                <li key={index}>{date.format()}</li>
              ))}
            </ul>
          </div> */}
          <div className="col-lg-6 col-md-12 col-sm-12 col-12">
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
          </div>
          {showChequenoSection && (
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
          {showChequenoSection1 && (
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <label className="label-control">Leave Date* :</label>
              <br />
              <input
                type="date"
                placeholder="dd/mm/yyyy"
                className="form-control cpp-input datevalidation"
                name="leaveDate"
                value={leaveDate}
                onChange={(e) => onInputChange(e)}
                style={{
                  width: "75%",
                }}
                required
              />
            </div>
          )}

          <div className="row col-lg-12 col-md-9 col-sm-9 col-12 py-3">
            <div className="col-lg-6 col-md-4 col-sm-4 col-12">
              <center>
                <input
                  type="button"
                  onClick={() => onLeaveTypeSelect("fullDay")}
                  className="btn btn-round"
                  value="Full Day"
                  style={
                    slVal === "FullDay"
                      ? {
                          backgroundColor: "#5c87a3",
                          color: " #fff",
                          border: "3px solid #2a3855",
                        }
                      : { background: "white" }
                  }
                />
              </center>
            </div>
            <div className="col-lg-6 col-md-4 col-sm-4 col-12">
              <center>
                {" "}
                <input
                  type="button"
                  onClick={() => onLeaveTypeSelect("halfDay")}
                  className="btn btn-round"
                  value="Half Day"
                  style={
                    slVal === "HalfDay"
                      ? {
                          backgroundColor: "#5c87a3",
                          color: "#fff",
                          border: "3px solid #2a3855",
                        }
                      : { background: "white" }
                  }
                />
              </center>
            </div>
          </div>
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
              value="Add Leave"
              className="btn sub_form btn_continue Save float-right"
            />
          )}
        </div>
      </form>
    </Fragment>
  );
};

AddLeave.propTypes = {
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  getAllEmployee: PropTypes.func.isRequired,
  addLeaves: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  settings: state.settings,
});

export default connect(mapStateToProps, {
  getAllEmployee,
  getAllStaff,
  addLeaves,
})(AddLeave);
