import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Select from "react-select";
import { Link } from "react-router-dom";
import {
  getAllEmployee,
  getAllStaff,
  addLeaves,
  addCategory,
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
const AddLeave = ({
  auth: { isAuthenticated, user, users, loading },
  settings: { allStaffName },
  getAllEmployee,
  onAddLeaveModalChange,
  user: { allEmployee, leaveCatMode },
  getAllStaff,
  addLeaves,
  addCategory,
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
    empId: "",
    leaveReason: "",
    slVal: null,
    isSubmitted: false,
    Dateselectmode: DateMethods[0],
    leaveTypedaymode: LeaveTypeday[0],
    leaveStartDate: "",
    leaveEndDate: "",
    leaveDate: "",
    leavecategoryName: "",
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
    showMultidateSection: false,
    showSingledateSection: true,
    showCategorySection: false,
  });
  const { showMultidateSection, showSingledateSection, showCategorySection } =
    showHide;

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
        showMultidateSection: true,
        showSingledateSection: false,
      });
    } else {
      setShowHide({
        ...showHide,
        showMultidateSection: false,
        showSingledateSection: true,
      });
    }
  };

  const {
    leaveReason,
    Dateselectmode,
    leaveTypedaymode,
    leaveStartDate,
    leaveEndDate,
    leaveDate,
    leavecategoryName,
  } = formData;

  //Required Validation Starts
  const [error, setError] = useState({
    clienttypeIdChecker: false,

    clienttypeIdErrorStyle: {},
    leavetypeIdChecker: false,
    leavetypeIdErrorStyle: {},
  });
  const {
    clienttypeIdChecker,
    clienttypeIdErrorStyle,
    leavetypeIdChecker,
    leavetypeIdErrorStyle,
  } = error;

  const checkErrors = () => {
    if (!clienttypeIdChecker) {
      setError({
        ...error,
        clienttypeIdErrorStyle: { color: "#F00" },
      });
      return false;
    }
    if (!leavetypeIdChecker) {
      setError({
        ...error,
        leavetypeIdErrorStyle: { color: "#F00" },
      });
      return false;
    }

    return true;
  };

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const allleavecatmodes = [];
  leaveCatMode.map((leavecat) =>
    allleavecatmodes.push({
      leavecatId: leavecat._id,
      label: leavecat.leavecategoryName,
      value: leavecat.leavecategoryName,
    })
  );

  const [leavecat, getleavecatData] = useState("");
  const [leavecatId, setleavecatId] = useState("");
  const [leavecatname, setleavecatname] = useState("");

  const onLeaveCatModeChange = (e) => {
    //  Required Validation starts
    setError({
      ...error,
      leavetypeIdChecker: true,
      leavetypeIdErrorStyle: { color: "#000" },
    });
    // Required Validation ends
    var leavecatId = "";
    var leavecatname = "";
    getleavecatData(e);
    leavecatId = e.leavecatId;
    leavecatname = e.value;
    setleavecatId(leavecatId);
    setleavecatname(leavecatname);
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
    //  Required Validation starts
    setError({
      ...error,
      clienttypeIdChecker: true,
      clienttypeIdErrorStyle: { color: "#000" },
    });
    // Required Validation ends
    var employeeId = "";
    var employeename = "";
    setstaffData(e);
    employeeId = e.value;
    employeename = e.label;
    setpaymentId(employeeId);
    setpaymentname(employeename);
  };
  const onLeaveTypeModeChange = (e) => {
    if (e) {
      setFormData({
        ...formData,
        leaveTypedaymode: e,
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (checkErrors()) {
      let leaveDateVals = [];
      if (showMultidateSection) {
        const d1 = new Date(leaveStartDate);
        const d2 = new Date(leaveEndDate);
        leaveDateVals = getDatesInRange(d1, d2);
      } else {
        const d1 = new Date(leaveDate);
        const d2 = new Date(leaveDate);
        leaveDateVals = getDatesInRange(d1, d2);
      }

      const finalData = {
        leaveDateVals: leaveDateVals,
        leaveType: leaveTypedaymode.value,
        leaveReason: leaveReason?.trim(),
        empId: employeeId,
        leavecategoryName: leavecatname,
        leavecategoryId: leavecatId,
      };
      addLeaves(finalData);
      onAddLeaveModalChange(true);
    }
  };

  const onOpenCategory = () => {
    setShowHide({
      ...showHide,
      showCategorySection: true,
    });
  };

  const onAddCategory = (e) => {
    e.preventDefault();
    const finalData = {
      leavecategoryName: leavecategoryName,
    };
    addCategory(finalData);
    setFormData({
      ...formData,
      leavecategoryName: "",
    });
    setShowHide({
      ...showHide,
      showCategorySection: false,
    });
  };

  const onCloseDiv = () => {
    setShowHide({
      ...showHide,
      showCategorySection: false,
    });
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <form
        onSubmit={(e) => onSubmit(e)}
        className="row col-lg-12 col-md-12 col-sm-12 col-12"
      >
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="row col-lg-8 col-md-12 col-sm-12 col-12">
            <div className="col-lg-8 col-md-12 col-sm-12 col-12">
              <label className="label-control" style={clienttypeIdErrorStyle}>
                Staff Name * :
              </label>
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
            <div className="col-lg-4 col-md-12 col-sm-12 col-12">
              <label className="label-control">Leave Type</label>
              <Select
                name="leaveTypedaymode"
                options={LeaveTypeday}
                isSearchable={true}
                defaultValue={LeaveTypeday[0]}
                value={leaveTypedaymode}
                onChange={(e) => onLeaveTypeModeChange(e)}
              />
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 col-12">
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
            {showMultidateSection && (
              <>
                <div className="col-lg-4 col-md-6 col-sm-6 col-12">
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
                <div className="col-lg-4 col-md-6 col-sm-6 col-12">
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
            {showSingledateSection && (
              <div className="col-lg-4 col-md-6 col-sm-6 col-12">
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

            <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
              <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                <label className="label-control" style={leavetypeIdErrorStyle}>
                  Leave Category * :
                </label>
                <Select
                  name="leaveCatMode"
                  options={allleavecatmodes}
                  isSearchable={true}
                  value={leavecat}
                  placeholder="Select Mode"
                  onChange={(e) => onLeaveCatModeChange(e)}
                />
              </div>
              <div className="col-lg-4 col-md-12 col-sm-12 col-12 mt-2 pt-4">
                <input
                  type="button"
                  className="btn btn_green_bg"
                  style={{ marginTop: "20px" }}
                  value="Add Category"
                  onClick={() => onOpenCategory()}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-12 col-sm-12 col-12">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <label className="label-control"> Reason :</label>
              <textarea
                name="leaveReason"
                id="leaveReason"
                className="textarea form-control"
                rows="5"
                placeholder="Leave Reason"
                style={{ width: "100%" }}
                value={leaveReason}
                onChange={(e) => onInputChange(e)}
                required
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
        </div>
      </form>
      <form
        onSubmit={(e) => onAddCategory(e)}
        className="row col-lg-12 col-md-12 col-sm-12 col-12 mx-4"
      >
        {showCategorySection && (
          <div className="row col-lg-8 col-md-6 col-sm-6 col-12 card-new">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <h5>Add Leave Category </h5>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-6 col-12">
              <label className="label-control">Category Name:</label>
              <input
                type="text"
                name="leavecategoryName"
                value={leavecategoryName}
                className="form-control"
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12 py-2">
              <br />

              {loading ? (
                <button
                  className="btn sub_form btn_continue Save float-right"
                  disabled
                >
                  Loading...
                </button>
              ) : (
                <>
                  <input
                    type="submit"
                    name="submit"
                    value="Add Category"
                    className="btn sub_form btn_continue Save "
                  />
                  &nbsp;
                  <Link
                    to="#"
                    className="btn sub_form btn_continue blackbrd "
                    onClick={() => onCloseDiv()}
                  >
                    Cancel
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </form>
    </Fragment>
  );
};

AddLeave.propTypes = {
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  getAllEmployee: PropTypes.func.isRequired,
  addLeaves: PropTypes.func.isRequired,
  addCategory: PropTypes.func.isRequired,
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
  addLeaves,
  getALLLeaveCatMode,
  addCategory,
})(AddLeave);
