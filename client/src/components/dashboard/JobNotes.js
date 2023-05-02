import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getSelectedClientDeatils,
  getSelectedprojectDeatils,
} from "../../actions/projects";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";

const JobNotes = ({
  auth: { isAuthenticated, user, users, loading },
  project: { selectedClientData, selectedProjectData },
  allnotesdata,

  onnotesModalChange,
  getSelectedClientDeatils,
  getSelectedprojectDeatils,
}) => {
  useEffect(() => {
    getSelectedClientDeatils({ clientId: allnotesdata.clientId });
  }, [getSelectedClientDeatils]);
  useEffect(() => {
    getSelectedprojectDeatils({
      projectName: allnotesdata.projectName,
      clientId: allnotesdata.clientId,
    });
  }, [getSelectedprojectDeatils]);
  //formData

  const [formData, setFormData] = useState({
    projectNotes:
      allnotesdata && allnotesdata.projectNotes
        ? allnotesdata.projectNotes
        : "",
    standardInstruction:
      selectedClientData && selectedClientData.standardInstruction
        ? selectedClientData.standardInstruction
        : "",
    ProjecthistoryInstruction:
      selectedProjectData && selectedProjectData.projectNotes
        ? selectedProjectData.projectNotes
        : "",

    isSubmitted: false,
  });
  const [showHide, setShowHide] = useState({
    showStandardinstructionSection: false,
  });
  const [showHide1, setShowHide1] = useState({
    showProjectInstructionSection: true,
  });
  const [showHide2, setShowHide2] = useState({
    showProjecthistoryInstructionSection: true,
  });

  const { showStandardinstructionSection } = showHide;
  const { showProjectInstructionSection } = showHide1;
  const { showProjecthistoryInstructionSection } = showHide2;
  // const onstandardinstruction = () => {
  //   setShowHide({
  //     ...showHide,
  //     showStandardinstructionSection: true,
  //   });
  //   setShowHide1({
  //     ...showHide1,
  //     showProjectInstructionSection: false,
  //   });
  // };

  const onprojectinstruction = () => {
    setShowHide1({
      ...showHide1,
      showProjectInstructionSection: true,
    });
    setShowHide2({
      ...showHide2,
      showProjecthistoryInstructionSection: false,
    });
  };
  const onprojecthistoryinstruction = () => {
    setShowHide2({
      ...showHide2,
      showProjecthistoryInstructionSection: true,
    });
    setShowHide1({
      ...showHide1,
      showProjectInstructionSection: false,
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
            onClick={() => onprojectinstruction()}
          >
            Project Instruction
          </Link>
        </div>
        {/* <div className="col-lg-6 col-md-12 col-sm-12 col-12">
          <Link
            to="#"
            className="btnLink"
            onClick={() => onstandardinstruction()}
          >
            Standard Instruction
          </Link>
        </div> */}
        <div className="col-lg-6 col-md-12 col-sm-12 col-12">
          <Link
            to="#"
            className="btnLink"
            onClick={() => onprojecthistoryinstruction()}
            //onClick={() => onstandardinstruction()}
          >
            Project History
          </Link>
        </div>
      </div>
      {showStandardinstructionSection && (
        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
          <label className="label-control">Standard Instruction :</label>
          <textarea
            className="textarea form-control"
            rows="4"
            placeholder="Standard Instruction"
            style={{ width: "100%", resize: "vertical", overflow: "auto" }}
            readOnly
          >
            {selectedClientData.standardInstruction}
          </textarea>
        </div>
      )}
      {showProjectInstructionSection && (
        <div className=" col-lg-12 col-md-12 col-sm-12 col-12">
          <label className="label-control">Project Instruction :</label>
          <textarea
            className="textarea form-control"
            rows="10"
            placeholder="Project Instruction"
            style={{ width: "100%", resize: "vertical", overflow: "auto" }}
            readOnly
          >
            {allnotesdata.projectNotes}
          </textarea>
        </div>
      )}
      {showProjecthistoryInstructionSection &&
        showProjectInstructionSection !==
          showProjecthistoryInstructionSection && (
          <div className=" col-lg-12 col-md-12 col-sm-12 col-12">
            <label className="label-control">
              Project Instruction history :
            </label>

            <table
              className="table table-bordered table-striped table-hover"
              id="datatable2"
            >
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {selectedProjectData &&
                  selectedProjectData.map((getprojecthistory, idx) => {
                    if (
                      allnotesdata.projectNotes !==
                      getprojecthistory.projectNotes
                    ) {
                      return (
                        <tr key={idx}>
                          <td>{getprojecthistory.projectEnteredDateTime}</td>
                          <td>{getprojecthistory.projectNotes}</td>
                        </tr>
                      );
                    }
                  })}
              </tbody>
            </table>
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

export default connect(mapStateToProps, {
  getSelectedClientDeatils,
  getSelectedprojectDeatils,
})(JobNotes);
