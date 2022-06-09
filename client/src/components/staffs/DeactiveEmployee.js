import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import Spinner from "../layout/Spinner";

const DeactiveEmployee = ({
  auth: { isAuthenticated, user, users, loading },
  allProjectStatusdeavtivedata,
  staffDeactivedata,
  onDeactiveModalChange,
  editProjectStatus,
}) => {
  // console.log(staffDeactivedata);
  const [formData, setFormData] = useState({
    empFullName:
      staffDeactivedata && staffDeactivedata.empFullName
        ? staffDeactivedata.empFullName
        : "",
    empPhone:
      staffDeactivedata && staffDeactivedata.empPhone
        ? staffDeactivedata.empPhone
        : "",
    empCode:
      staffDeactivedata && staffDeactivedata.empCode
        ? staffDeactivedata.empCode
        : "",

    projectStatusDeactiveReason: "",
    isSubmitted: false,
  });

  const { empFullName, empPhone, empCode, empDeactiveReason } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // if (checkErrors()) {
    const finalData = {
      recordId: staffDeactivedata ? staffDeactivedata._id : "",
      empDeactiveReason: empDeactiveReason,
      empDeactiveById: user._id,
      empDeactiveDateTime: new Date().toLocaleString(),
    };
    console.log(finalData);
    // editProjectStatus(finalData);

    // setFormData({
    //   ...formData,
    //   districtName: "",
    //   isSubmitted: true,
    // });
    // }
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
            <label className="label-control">Phone : {empPhone}</label>
          </div>
          <div className="col-lg-8 col-md-12 col-sm-12 col-12">
            <label className="label-control">Employee Code : {empCode}</label>
          </div>

          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <label className="label-control">Deactive Reason:</label>

            <textarea
              name="empDeactiveReason"
              id="empDeactiveReason"
              className="textarea form-control"
              rows="3"
              placeholder=" Deactive Reason"
              style={{ width: "100%" }}
              value={empDeactiveReason}
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

DeactiveEmployee.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(DeactiveEmployee);
