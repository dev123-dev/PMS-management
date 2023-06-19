import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import {
  AddAmendmentHistory,
  updateProjectTrack,
} from "../../actions/projects";

const AmendAddDiscussion = ({
  auth: { isAuthenticated, user, users },
  AddAmendmentHistory,
  updateProjectTrack,
  ProjRestoreVal,
}) => {
  //formData
  const [formData, setFormData] = useState({
    projectStatusCategory: "",
    discussionPointsNotes: "",
    discussionPoint: "",
    radiodata: "",
    isSubmitted: false,
  });

  const { radiodata, discussionPointsNotes, isSubmitted } = formData;
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onRadioSelect = (radiodata) => {
    if (radiodata === "Resolved") {
      setFormData({
        ...formData,
        radiodata: "Resolved",
        major: "",
      });
    } else if (radiodata === "UnResolved") {
      setFormData({
        ...formData,
        Resolved: "",
        radiodata: "UnResolved",
      });
    } else {
      setFormData({
        ...formData,
        [radiodata]: 1,
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      projectId: ProjRestoreVal ? ProjRestoreVal.projectId : "",
      discussionPoints: discussionPointsNotes,
      amendmentType: radiodata,
      amendmentCounter: ProjRestoreVal.amendmentCounter,
      amendmentEnteredById: user._id,
      amendmentEnteredByName: user.empFullName,
    };
    AddAmendmentHistory(finalData);
    if (radiodata === "Resolved") {
      const updateData = {
        projectId: ProjRestoreVal ? ProjRestoreVal.projectId : "",
        amendmentType: radiodata,
      };
      updateProjectTrack(updateData);
    }

    setFormData({
      ...formData,
      projectId: "",
      projectName: "",
      discussionPointsNotes: "",
      radiodata: "",
    });
  };

  return !isAuthenticated || !user  ? (
    <Spinner />
  ) : (
    <Fragment>
      {/* <div className="container container_align ">
        <section className="sub_reg"> */}
      {/* <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding"> */}
      {/* <div className="col-lg-4 col-md-12 col-sm-12 col-12  "> */}
      <div className="col-lg-12 col-md-6 col-sm-6 col-12 py-2">
        <form onSubmit={(e) => onSubmit(e)}>
          <div
            className="row col-lg-12 col-md-6 col-sm-6 col-12 "
            style={{ height: "37vh" }}
          >
            <div className="col-lg-4 col-md-6 col-sm-6 col-12">
              <label className="label-control">Resolved : </label>
              &emsp;
              <input
                className="radiolevels"
                type="radio"
                id="Resolved"
                value="Resolved"
                name="radiolevels"
                onClick={() => onRadioSelect("Resolved")}
              />
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 col-12">
              <label className="label-control">Un-Resolved : </label>
              &emsp;
              <input
                className="radiolevels"
                type="radio"
                id="UnResolved"
                value="UnResolved"
                onClick={() => onRadioSelect("UnResolved")}
                name="radiolevels"
              />
            </div>
            <div className=" col-lg-12 col-md-6 col-sm-6 col-12 ">
              <label className="label-control">Discussion Points :</label>
              <textarea
                name="discussionPointsNotes"
                id="discussionPointsNotes"
                className="textarea form-control"
                rows="4"
                placeholder="Discussion Points Notes"
                value={discussionPointsNotes}
                style={{ width: "100%" }}
                onChange={(e) => onInputChange(e)}
                required
              ></textarea>
            </div>
            {/* {showhistory_submitSection && ( */}
            <div className="col-lg-12 col-md-6 col-sm-6 col-12 ">
              <input
                type="submit"
                name="Submit"
                value="Submit"
                className="btn sub_form btn_continue blackbrd Save float-right"
              />
            </div>
            {/* )} */}
          </div>
        </form>
        {/* </div> */}
        {/* </div> */}
        {/* </div>
        </section> */}
      </div>
    </Fragment>
  );
};

AmendAddDiscussion.propTypes = {
  auth: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  project: state.project,
  settings: state.settings,
});

export default connect(mapStateToProps, {
  AddAmendmentHistory,
  updateProjectTrack,
})(AmendAddDiscussion);
