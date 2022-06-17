import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editDepartment } from "../../actions/settings";

import Spinner from "../layout/Spinner";

const JobHistory = ({
  auth: { isAuthenticated, user, users, loading },
  allDeptartmentdata,
  onEditModalChange,
  allProjectdata,
  editDepartment,
}) => {
  //formData
  const [formData, setFormData] = useState({
    projectName:
      allProjectdata && allProjectdata.projectName
        ? allProjectdata.projectName
        : "",

    projectEnteredByName:
      allProjectdata && allProjectdata.projectEnteredByName
        ? allProjectdata.projectEnteredByName
        : "",

    projectEnteredDateTime:
      allProjectdata && allProjectdata.projectEnteredDateTime
        ? allProjectdata.projectEnteredDateTime
        : "",

    isSubmitted: false,
  });
  console.log(allProjectdata);
  const {
    projectName,
    projectEnteredByName,
    projectEnteredDateTime,
  } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      recordId: allProjectdata ? allProjectdata._id : "",
    };

    console.log(finalData);
    editDepartment(finalData);
    onEditModalChange(true);
    // setFormData({
    //   ...formData,
    //   districtName: "",
    //   isSubmitted: true,
    // });
    // getStateData("");
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="col-lg-8 col-md-12 col-sm-12 col-12">
            <label className="label-control">
              Project Name : <strong> {projectName}</strong>
            </label>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 col-12">
            <label className="label-control">
              Last Changed By :<strong>{projectEnteredByName}</strong>
            </label>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 col-12">
            <label className="label-control">
              Date&Time :<strong>{projectEnteredDateTime}</strong>
            </label>
          </div>

          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <label className="label-control"> Notes :</label>
            <textarea
              name="clientAddress"
              id="clientAddress"
              className="textarea form-control"
              rows="3"
              style={{ width: "100%" }}
              onChange={(e) => onInputChange(e)}
              disabled
            ></textarea>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

JobHistory.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { editDepartment })(JobHistory);
