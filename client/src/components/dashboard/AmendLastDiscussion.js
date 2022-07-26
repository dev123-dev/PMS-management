import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import Spinner from "../layout/Spinner";
import Select from "react-select";
import { Link } from "react-router-dom";
import {
  getAllchanges,
  getAmendmentProjectDeatils,
  AddAmendmentHistory,
  getLastAmendmentHistoryDeatils,
  updateProjectTrack,
} from "../../actions/projects";
import AmendAddDiscussion from "./AmendAddDiscussion";
import AmendHistory from "./AmendHistory";
const AmendLastDiscussion = ({
  auth: { isAuthenticated, user, users },
  project: { amendentHistory, amendentLastHistory, amendmentProjects },
  getAmendmentProjectDeatils,
  AddAmendmentHistory,
  getLastAmendmentHistoryDeatils,
  updateProjectTrack,
}) => {
  useEffect(() => {
    getAmendmentProjectDeatils();
  }, [getAmendmentProjectDeatils]);
  //formData
  const [formData, setFormData] = useState({
    projectStatusCategory: "",
    discussionPointsNotes: "",
    discussionPoint: "",
    radiodata: "",
    isSubmitted: false,
  });

  let getLastAmendment = JSON.parse(
    localStorage.getItem("getLastAmendmentDetails")
  );
  // console.log("getLastAmendmentDetails", getLastAmendment);

  const StatusCategory = [
    { value: "Resolved", label: "Resolved" },
    { value: "UnResolved", label: "UnResolved" },
  ];
  const {
    radiodata,
    projectStatusCategory,
    discussionPointsNotes,
    isSubmitted,
  } = formData;
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onStatuscatChange = (e) => {
    if (e) {
      setFormData({
        ...formData,
        projectStatusCategory: e,
      });
    }
    if (e.value === "Resolved") {
      setShowHide1({
        ...showHide1,
        showunresolvedSection: false,
      });
    } else {
      setShowHide1({
        ...showHide1,
        showunresolvedSection: true,
      });
    }
    let setTypeData = e.value;
    getAmendmentProjectDeatils({ setTypeData: setTypeData });
  };
  const [ProjLastchnage, setProjLastchnage] = useState();
  const [ProjRestore, setProjRestore] = useState();
  const onClickHandler = (amendmentProjects, idx) => {
    localStorage.removeItem("getLastAmendment");
    // setProjLastchnage(null);
    setShowHide({
      ...showHide,
      showhistory_submitSection: true,
    });
    setProjRestore(amendmentProjects);
    if (amendmentProjects !== "") {
      const lastAmendment = {
        projectId: amendmentProjects.projectId,
        amendmentCounter: amendmentProjects.amendmentCounter,
      };
      getLastAmendmentHistoryDeatils(lastAmendment);
    }
    setProjLastchnage(
      getLastAmendment && getLastAmendment.discussionPoints
        ? getLastAmendment.discussionPoints
        : ""
    );
  };
  const [showHide, setShowHide] = useState({
    showhistory_submitSection: false,
  });
  const [showHide1, setShowHide1] = useState({
    showunresolvedSection: true,
  });
  // console.log("ProjRestore", ProjRestore);
  const { showhistory_submitSection } = showHide;
  const { showunresolvedSection } = showHide1;
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
      projectId: ProjRestore ? ProjRestore.projectId : "",
      projectName: ProjRestore.projectName,
      discussionPoints: discussionPointsNotes,
      amendmentType: radiodata,
      amendmentCounter: ProjRestore.amendmentCounter,
      amendmentEnteredById: user._id,
      amendmentEnteredByName: user.empFullName,
    };
    AddAmendmentHistory(finalData);
    if (radiodata === "Resolved") {
      const updateData = {
        projectId: ProjRestore ? ProjRestore.projectId : "",
        amendmentType: radiodata,
      };
      // console.log(updateData);
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

  const onHistoryModalChange = (e) => {
    if (e) {
      handleHistoryModalClose();
    }
  };

  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const handleHistoryModalClose = () => setShowHistoryModal(false);

  const [userData, setUserData] = useState(ProjRestore);
  const onEdit = (e) => {
    setShowHistoryModal(true);
    const finalData = {
      projectId: ProjRestore ? ProjRestore.projectId : "",
      amendmentCounter: ProjRestore.amendmentCounter,
    };
    setUserData(finalData);
  };
  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      {/* <div className="container container_align ">
        <section className="sub_reg"> */}
      {/* <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding"> */}
      {/* <div className="col-lg-4 col-md-12 col-sm-12 col-12  "> */}
      <div
        className="row col-lg-12 col-md-6 col-sm-6 col-12 card-new py-2"
        style={{ height: "40vh" }}
      >
        <div className="col-lg-12 col-md-6 col-sm-6 col-12 ">
          {/* {showhistory_submitSection && ( */}
          <button
            className="btn btn_green_bg float-right"
            onClick={() => onEdit(amendmentProjects)}
          >
            History
          </button>
          {/* )} */}
        </div>
        <div className="col-lg-12 col-md-6 col-sm-6 col-12 ">
          <label className="label-control">Last Discussion :</label>
          <textarea
            name="ProjLastchnage"
            id="ProjLastchnage"
            className="textarea form-control"
            rows="4"
            placeholder=""
            style={{ width: "100%" }}
            value={ProjLastchnage}
            onChange={(e) => onInputChange(e)}
            disabled
          ></textarea>
        </div>
      </div>
      <Modal
        show={showHistoryModal}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <div className="col-lg-10">
            <h3 className="modal-title text-center">Amendment History </h3>
          </div>
          <div className="col-lg-2">
            <button onClick={handleHistoryModalClose} className="close">
              <img
                src={require("../../static/images/close.png")}
                alt="X"
                style={{ height: "20px", width: "20px" }}
              />
            </button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <AmendHistory
            amenddata={userData}
            onHistoryModalChange={onHistoryModalChange}
          />
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

AmendLastDiscussion.propTypes = {
  auth: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  getAmendmentProjectDeatils: PropTypes.func.isRequired,
  AddAmendmentHistory: PropTypes.func.isRequired,
  getLastAmendmentHistoryDeatils: PropTypes.func.isRequired,
  updateProjectTrack: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  project: state.project,
  settings: state.settings,
});

export default connect(mapStateToProps, {
  getAmendmentProjectDeatils,
  AddAmendmentHistory,
  getLastAmendmentHistoryDeatils,
  updateProjectTrack,
})(AmendLastDiscussion);
