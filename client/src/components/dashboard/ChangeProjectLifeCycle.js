import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";

import {
  AddProjectTrack,
  AddAmendmentHistory,
  getLastAmendmentCounter,
} from "../../actions/projects";
import { w3cwebsocket } from "websocket";

const ChangeProjectLifeCycle = ({
  auth: { isAuthenticated, user, users, loading },
  ProjectCycledata,
  AddProjectTrack,
  // AddAmendmentHistory,
  onProjectCycleModalChange,
  getLastAmendmentCounter,
}) => {
  //formData
  const [formData, setFormData] = useState({
    Instructions: "",
    projectHour: "",
    projectMinutes: "",
    isSubmitted: false,
  });

  const { Instructions, projectHour, projectMinutes } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onHourChange = (e) => {
    if (e.target.value < 13) {
      setFormData({
        ...formData,
        projectHour: e.target.value,
      });
    } else {
      setFormData({
        ...formData,
      });
    }
  };

  const onMinuteChange = (e) => {
    if (e.target.value < 60) {
      setFormData({
        ...formData,
        projectMinutes: e.target.value,
      });
    } else {
      setFormData({
        ...formData,
      });
    }
  };

  const [showHide, setShowHide] = useState({
    showTimerSection:
      (ProjectCycledata && ProjectCycledata.value === "Working") ||
      ProjectCycledata.value === "Amend_Working" ||
      ProjectCycledata.value === "AI_Working" ||
      ProjectCycledata.value === "QC Estimate"
        ? true
        : false,
  });
  // console.log(ProjectCycledata);
  const { showTimerSection } = showHide;
  //client in websocket
  //SLAP IP
  const client = new w3cwebsocket("ws://192.168.6.159:8000");

  const onSubmit = (e) => {
    const amendmentProjectId = {
      pId: ProjectCycledata.projectId,
    };
    getLastAmendmentCounter(amendmentProjectId);

    e.preventDefault();
    let estimatedWorkTime = "";
    let ptEstimatedDateTimeVal = "";
    if (projectHour || projectMinutes) {
      estimatedWorkTime =
        (projectHour
          ? projectHour.length === 1
            ? "0" + projectHour
            : projectHour
          : "00") +
        ":" +
        (projectMinutes
          ? projectMinutes.length === 1
            ? "0" + projectMinutes
            : projectMinutes
          : "00");
      ptEstimatedDateTimeVal = new Date().toISOString();
    }

    // if (checkErrors()) {

    if (ProjectCycledata.value === "Amendment") {
      const amendmentData = {
        projectId: ProjectCycledata.projectId,
        projectTrackLatestChange: Instructions,
        ptEstimatedTime: estimatedWorkTime,
        projectStatusType: ProjectCycledata.value,
        projectTrackStatusId: ProjectCycledata && ProjectCycledata.statusId,
        ptEstimatedDateTime: ptEstimatedDateTimeVal,
        projectStatusChangedbyName: user.empFullName,
        projectStatusChangedById: user._id,
        amendmentCounter: "1",
        amendmentType: "UnResolved",
      };
      AddProjectTrack(amendmentData);
    } else if (
      ProjectCycledata.value === "Amend_Working" ||
      ProjectCycledata.value === "Amend_Pending" ||
      ProjectCycledata.value === "Amend_QC Pending" ||
      ProjectCycledata.value === "Amend_QC Estimate" ||
      ProjectCycledata.value === "Amend_QC DONE" ||
      ProjectCycledata.value === "Amend_Uploading"
    ) {
      const finalData = {
        projectId: ProjectCycledata.projectId,
        projectTrackLatestChange: Instructions,
        ptEstimatedTime: estimatedWorkTime,
        projectStatusType: ProjectCycledata.value,
        projectTrackStatusId: ProjectCycledata && ProjectCycledata.statusId,
        ptEstimatedDateTime: ptEstimatedDateTimeVal,
        projectStatusChangedbyName: user.empFullName,
        projectStatusChangedById: user._id,
        amendmentCounter: "1",
      };
      AddProjectTrack(finalData);
    } else {
      const finalData = {
        projectId: ProjectCycledata.projectId,
        projectTrackLatestChange: Instructions,
        ptEstimatedTime: estimatedWorkTime,
        projectStatusType: ProjectCycledata.value,
        projectTrackStatusId: ProjectCycledata && ProjectCycledata.statusId,
        ptEstimatedDateTime: ptEstimatedDateTimeVal,
        projectStatusChangedbyName: user.empFullName,
        projectStatusChangedById: user._id,
      };
      AddProjectTrack(finalData);
    }

    onProjectCycleModalChange(true);
    client.send(
      JSON.stringify({
        type: "message",
        msg: "/JobQueue",
        msg1: "/DailyJobSheet`",
      })
    );

    setFormData({
      ...formData,
      Instructions: "",
      projectHour: "",
      projectMinutes: "",
      isSubmitted: true,
    });

    // }
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      {" "}
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="row col-lg-12 col-md-11 col-sm-12 col-12 ">
          <div className="col-lg-12 col-md-6 col-sm-6 col-12">
            <label className="label-control">
              <strong> Status : {ProjectCycledata.value}</strong>
            </label>
          </div>
          {showTimerSection && (
            <>
              <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                <label className="label-control">Hour* :</label>

                <input
                  type="number"
                  name="projectHour"
                  value={projectHour}
                  min="0"
                  max="12"
                  className="form-control"
                  onWheel={() => document.activeElement.blur()}
                  onChange={(e) => onHourChange(e)}
                  onKeyDown={(e) =>
                    (e.keyCode === 69 || e.keyCode === 190) &&
                    e.preventDefault()
                  }
                  required
                />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                <label className="label-control">Minutes* : </label>

                <input
                  type="number"
                  name="projectMinutes"
                  value={projectMinutes}
                  min="0"
                  max="60"
                  className="form-control"
                  onWheel={() => document.activeElement.blur()}
                  onChange={(e) => onMinuteChange(e)}
                  onKeyDown={(e) =>
                    (e.keyCode === 69 || e.keyCode === 190) &&
                    e.preventDefault()
                  }
                  required
                />
              </div>
            </>
          )}
          <div className="col-lg-11 col-md-6 col-sm-6 col-12">
            <label className="label-control">Update Notes* :</label>
            <textarea
              name="Instructions"
              id="Instructions"
              className="textarea form-control"
              rows="5"
              placeholder="Instructions"
              style={{ width: "100%" }}
              value={Instructions}
              onChange={(e) => onInputChange(e)}
              required
            ></textarea>
          </div>
        </div>

        <div
          className="row col-lg-12 col-md-11 col-sm-12 col-12 Savebutton no_padding"
          size="lg"
        >
          <div className="col-lg-8 col-md-6 col-sm-12 col-12">
            <label className="label-control colorRed">
              * Indicates mandatory fields,
            </label>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 col-12">
            {loading ? (
              <button
                className="btn sub_form btn_continue blackbrd Save float-right"
                disabled
              >
                Loading...
              </button>
            ) : (
              <input
                type="submit"
                name="Submit"
                value="Submit"
                className="btn sub_form btn_continue blackbrd Save float-right"
              />
            )}
          </div>
        </div>
      </form>
    </Fragment>
  );
};

ChangeProjectLifeCycle.propTypes = {
  auth: PropTypes.object.isRequired,
  AddProjectTrack: PropTypes.func.isRequired,
  getLastAmendmentCounter: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  AddProjectTrack,
  getLastAmendmentCounter,
  // AddAmendmentHistory,
})(ChangeProjectLifeCycle);
