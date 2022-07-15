import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getSelectedClientDeatils } from "../../actions/projects";
import { Link } from "react-router-dom";
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
  const [showHide, setShowHide] = useState({
    showStandardinstructionSection: false,
  });
  const [showHide1, setShowHide1] = useState({
    showProjectInstructionSection: false,
  });

  const { showStandardinstructionSection } = showHide;
  const { showProjectInstructionSection } = showHide1;
  const onstandardinstruction = () => {
    setShowHide({
      ...showHide,
      showStandardinstructionSection: true,
    });
    setShowHide1({
      ...showHide1,
      showProjectInstructionSection: false,
    });
  };

  const onprojectinstruction = () => {
    setShowHide1({
      ...showHide1,
      showProjectInstructionSection: true,
    });
    setShowHide({
      ...showHide,
      showStandardinstructionSection: false,
    });
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="row col-lg-12 col-md-12 col-sm-12 col-12">
        <div className="col-lg-6 col-md-12 col-sm-12 col-12">
          <Link
            to="#"
            className="btnLink"
            onClick={() => onstandardinstruction()}
          >
            Standard Instruction
          </Link>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12 col-12">
          <Link
            to="#"
            className="btnLink"
            onClick={() => onprojectinstruction()}
          >
            Project Instruction
          </Link>
        </div>
      </div>
      <div className="col-lg-12 col-md-12 col-sm-12 col-12">
        {showStandardinstructionSection && (
          <>
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
          </>
        )}
      </div>

      <br />
      {showProjectInstructionSection && (
        <div className=" col-lg-12 col-md-12 col-sm-12 col-12">
          <label className="label-control">Project Instruction :</label>
          <textarea
            className="textarea form-control"
            rows="10"
            placeholder="Project Instruction"
            style={{ width: "100%" }}
            readOnly
          >
            {allnotesdata.projectNotes}
          </textarea>
        </div>
      )}
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
