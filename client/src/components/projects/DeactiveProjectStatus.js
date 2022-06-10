import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import Spinner from "../layout/Spinner";

const DeactiveProjectStatus = ({
  auth: { isAuthenticated, user, users, loading },
  allProjectStatusdeavtivedata,
  onDeactiveModalChange,
  editProjectStatus,
}) => {
  // console.log(allProjectStatusdeavtivedata);
  const [formData, setFormData] = useState({
    projectStatusType:
      allProjectStatusdeavtivedata &&
      allProjectStatusdeavtivedata.projectStatusType
        ? allProjectStatusdeavtivedata.projectStatusType
        : "",
    projectStatusCategory:
      allProjectStatusdeavtivedata &&
      allProjectStatusdeavtivedata.projectStatusCategory
        ? allProjectStatusdeavtivedata.projectStatusCategory
        : "",
    projectStatusDeactiveReason: "",
    isSubmitted: false,
  });

  const {
    projectStatusType,
    projectStatusCategory,
    projectStatusDeactiveReason,
  } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // if (checkErrors()) {
    const finalData = {
      recordId: allProjectStatusdeavtivedata
        ? allProjectStatusdeavtivedata._id
        : "",
      projectStatusDeactiveReason: projectStatusDeactiveReason,
      projectStatusDeactiveById: user._id,
      projectStatusDeactiveDateTime: new Date().toLocaleString(),
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
              Status Name : {projectStatusType}
            </label>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 col-12">
            <label className="label-control">
              Project Status Category : {projectStatusCategory}
            </label>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <label className="label-control">Deactive Reason : </label>

            <textarea
              name="projectStatusDeactiveReason"
              id="projectStatusDeactiveReason"
              className="textarea form-control"
              rows="3"
              placeholder="Project Status Deactive Reason"
              style={{ width: "100%" }}
              value={projectStatusDeactiveReason}
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

DeactiveProjectStatus.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(DeactiveProjectStatus);
