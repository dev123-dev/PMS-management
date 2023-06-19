import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import Spinner from "../layout/Spinner";
import { getLastAmendmentHistoryDeatils } from "../../actions/projects";
import AmendHistory from "./AmendHistory";
const AmendLastDiscussion = ({
  auth: { isAuthenticated, user, users },
  project: { amendmentProjects },
  ProjLastchnageVal,
  ProjRestoreVal,
  setProjLastchnageFunc,
}) => {
  const onHistoryModalChange = (e) => {
    if (e) {
      handleHistoryModalClose();
    }
  };

  let getLastAmendment = JSON.parse(
    localStorage.getItem("getLastAmendmentDetails")
  );

  if (!ProjLastchnageVal) {
    setProjLastchnageFunc(
      getLastAmendment && getLastAmendment.discussionPoints
        ? getLastAmendment.discussionPoints
        : ""
    );
  }
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const handleHistoryModalClose = () => setShowHistoryModal(false);

  const [userData, setUserData] = useState(ProjRestoreVal);
  const onEdit = (e) => {
    setShowHistoryModal(true);
    const finalData = {
      projectId: ProjRestoreVal ? ProjRestoreVal.projectId : "",
      amendmentCounter: ProjRestoreVal.amendmentCounter,
    };
    setUserData(finalData);
  };
  return !isAuthenticated || !user  ? (
    <Spinner />
  ) : (
    <Fragment>
      <div
        className="row col-lg-12 col-md-6 col-sm-6 col-12  py-2"
        style={{ height: "40vh" }}
      >
        <div className="col-lg-12 col-md-6 col-sm-6 col-12 ">
          <button
            className="btn btn_green_bg float-right"
            onClick={() => onEdit(amendmentProjects)}
          >
            History
          </button>
        </div>
        <div className="col-lg-12 col-md-6 col-sm-6 col-12 ">
          <label className="label-control">Last Discussion :</label>
          <textarea
            className="textarea form-control"
            rows="4"
            placeholder=""
            style={{ width: "100%" }}
            value={ProjLastchnageVal}
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
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  project: state.project,
  settings: state.settings,
});

export default connect(mapStateToProps, {
  getLastAmendmentHistoryDeatils,
})(AmendLastDiscussion);
