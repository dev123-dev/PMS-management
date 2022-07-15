import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getSelectedClientDeatils } from "../../actions/projects";

import Spinner from "../layout/Spinner";

const JobNotes = ({
  auth: { isAuthenticated, user, users, loading },
  project: { selectedClientData },
  allnotesdata,
  onnotesModalChange,
  getSelectedClientDeatils,
}) => {
  useEffect(() => {
    getSelectedClientDeatils({ clientId: allnotesdata.clientId });
  }, [getSelectedClientDeatils]);
  //formData
  // console.log("selectedClientData", selectedClientData.standardInstruction);
  const [formData, setFormData] = useState({
    projectNotes:
      allnotesdata && allnotesdata.projectNotes
        ? allnotesdata.projectNotes
        : "",
    standardInstruction:
      selectedClientData && selectedClientData.standardInstruction
        ? selectedClientData.standardInstruction
        : "",

    isSubmitted: false,
  });

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="col-lg-12 col-md-12 col-sm-12 col-12">
        <label className="label-control">Standard Instruction :</label>
        <textarea
          className="textarea form-control"
          rows="4"
          placeholder="Standard Instruction"
          style={{ width: "100%" }}
          readOnly
        >
          {selectedClientData.standardInstruction}
        </textarea>
      </div>
      <br />
      <div className=" col-lg-12 col-md-12 col-sm-12 col-12">
        <label className="label-control">Project Notes :</label>
        <textarea
          className="textarea form-control"
          rows="10"
          placeholder="Project Notes"
          style={{ width: "100%" }}
          readOnly
        >
          {allnotesdata.projectNotes}
        </textarea>
      </div>
    </Fragment>
  );
};

JobNotes.propTypes = {
  auth: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  project: state.project,
});

export default connect(mapStateToProps, { getSelectedClientDeatils })(JobNotes);
