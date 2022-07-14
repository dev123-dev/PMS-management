import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editDepartment } from "../../actions/settings";
import { getLatestChanges } from "../../actions/projects";
import Spinner from "../layout/Spinner";

const JobHistory = ({
  auth: { isAuthenticated, user, users, loading },
  project: { getLatestChangesValue },
  allDeptartmentdata,
  onEditModalChange,
  allProjectdata,
  editDepartment,
  getLatestChanges,
}) => {
  let getLatestChangesDetails = JSON.parse(
    localStorage.getItem("getLatestChangesDetails")
  );
  // console.log(getLatestChangesDetails);
  //formData
  const [formData, setFormData] = useState({
    projectName: "",
    projectEnteredByName: "",
    projectEnteredDateTime: "",
    projectTrackLatestChange: "",
    isSubmitted: false,
  });
  const {
    projectName,
    projectEnteredByName,
    projectEnteredDateTime,
    projectTrackLatestChange,
  } = formData;

  if (getLatestChangesDetails && !projectName) {
    setFormData({
      ...formData,
      projectName:
        getLatestChangesDetails &&
        getLatestChangesDetails[0].output &&
        getLatestChangesDetails[0].output.projectName
          ? getLatestChangesDetails[0].output.projectName
          : "",
      projectTrackLatestChange:
        getLatestChangesDetails &&
        getLatestChangesDetails[0].output &&
        getLatestChangesDetails[0].output.projectTrackLatestChange
          ? getLatestChangesDetails[0].output.projectTrackLatestChange
          : "",

      projectEnteredByName:
        getLatestChangesDetails &&
        getLatestChangesDetails[0].projectStatusChangedbyName
          ? getLatestChangesDetails[0].projectStatusChangedbyName
          : "",

      projectEnteredDateTime:
        getLatestChangesDetails &&
        getLatestChangesDetails[0].projectTrackDateTime
          ? getLatestChangesDetails[0].projectTrackDateTime
          : "",
      projectTrackLatestChange:
        getLatestChangesDetails &&
        getLatestChangesDetails[0].projectTrackLatestChange
          ? getLatestChangesDetails[0].projectTrackLatestChange
          : "",
    });
  }

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="row col-lg-12 col-md-12 col-sm-12 col-12">
        <div className="col-lg-8 col-md-12 col-sm-12 col-12">
          <label className="label-control">
            Project Name : <strong> {projectName}</strong>
          </label>
        </div>
        <div className="col-lg-8 col-md-12 col-sm-12 col-12">
          <label className="label-control">
            Last Changed By : <strong>{projectEnteredByName}</strong>
          </label>
        </div>
        <div className="col-lg-8 col-md-12 col-sm-12 col-12">
          <label className="label-control">
            Date&Time :{" "}
            <strong>
              {new Date(projectEnteredDateTime).toLocaleString("en-GB")}
            </strong>
          </label>
        </div>

        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
          <label className="label-control"> Notes : </label>
          <textarea
            name="projectTrackLatestChange"
            id="projectTrackLatestChange"
            value={projectTrackLatestChange}
            className="textarea form-control"
            rows="3"
            style={{ width: "100%" }}
            readOnly
          >
            {projectTrackLatestChange}
          </textarea>
        </div>
      </div>
    </Fragment>
  );
};

JobHistory.propTypes = {
  auth: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  getLatestChanges: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  project: state.project,
});

export default connect(mapStateToProps, { editDepartment, getLatestChanges })(
  JobHistory
);
