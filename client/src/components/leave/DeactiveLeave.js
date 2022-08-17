import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import { deactiveLeaveData } from "../../actions/user";
import Spinner from "../layout/Spinner";

const DeactiveLeave = ({
  auth: { isAuthenticated, user, users, loading },
  LeaveDeactiveData,
  onDeactiveModalChange,
  deactiveLeaveData,
}) => {
  // console.log(clientdeactivedata);
  const [formData, setFormData] = useState({
    leaveReason:
      LeaveDeactiveData && LeaveDeactiveData.leaveReason
        ? LeaveDeactiveData.leaveReason
        : "",
    empFullName:
      LeaveDeactiveData && LeaveDeactiveData.output.empFullName
        ? LeaveDeactiveData.output.empFullName
        : "",

    leaveDate:
      LeaveDeactiveData && LeaveDeactiveData.leaveDate
        ? LeaveDeactiveData.leaveDate
        : "",
    slVal:
      LeaveDeactiveData && LeaveDeactiveData.leaveType
        ? LeaveDeactiveData.leaveType
        : "",
    isSubmitted: false,
  });
  var leaveDate = "";
  if (LeaveDeactiveData.leaveDate) {
    var ED = LeaveDeactiveData.leaveDate.split(/\D/g);
    leaveDate = [ED[2], ED[1], ED[0]].join("-");
  }
  const { empFullName, leaveReason, leaveDeactiveReason } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // if (checkErrors()) {
    const finalData = {
      recordId: LeaveDeactiveData ? LeaveDeactiveData._id : "",
      leaveDeactiveReason: leaveDeactiveReason,
      leaveDeactiveById: user._id,
      leaveDeactiveDate: new Date().toLocaleString(),
    };
    // console.log(finalData);
    deactiveLeaveData(finalData);
    onDeactiveModalChange(true);
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="col-lg-6 col-md-12 col-sm-12 col-12">
            <label className="label-control">
              Employee Name : {empFullName}
            </label>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 col-12">
            <label className="label-control">Leave Date : {leaveDate}</label>
          </div>
          <div className="col-lg-8 col-md-12 col-sm-12 col-12">
            <label className="label-control">
              Leave Reason : {leaveReason}
            </label>
          </div>

          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <label className="label-control">Cancel Reason :</label>

            <textarea
              name="leaveDeactiveReason"
              id="leaveDeactiveReason"
              className="textarea form-control"
              rows="3"
              placeholder="Leave Cancel Reason"
              style={{ width: "100%" }}
              value={leaveDeactiveReason}
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
              name="Submit"
              value="Submit"
              className="btn sub_form btn_continue Save float-right"
            />
          )}
        </div>
      </form>
    </Fragment>
  );
};

DeactiveLeave.propTypes = {
  auth: PropTypes.object.isRequired,
  deactiveLeaveData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deactiveLeaveData })(DeactiveLeave);
