import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Select from "react-select";
import DatePicker, { DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import MultipleDatePicker from "react-multiple-datepicker";

import { getAllEmployee, getAllStaff, addLeaves } from "../../actions/user";
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
  });
  const format = "MM/DD/YYYY";
  const [dates, setDates] = useState([]);
  console.log(dates);

  // new DateObject().set({ day: 4, format }),
  //   new DateObject().set({ day: 25, format }),
  //   new DateObject().set({ day: 20, format }),

  const { leaveReason, slVal } = formData;

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

  // console.log(dates);
  //Required Validation ends
  const onSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      // dates: dates,
      leaveType: slVal,
      leaveReason: leaveReason,
      empId: employeeId,
    };
    console.log(finalData);
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
            />
          </div>
          {/* <DatePicker
            multiple
            onChange={(array) => {
              //Array of Dateobjecs
              alert("selected dates :\n" + array.join(",\n"));
            }}
          /> */}

          <MultipleDatePicker
            onSubmit={(dates) => console.log("selected dates ", dates)}
            // onChange={(date) => setSelectedDate(date)}
            minDate={new Date()}
          />
          <div className="col-lg-6 col-md-12 col-sm-12 col-12">
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
          </div>
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
