import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { Modal } from "react-bootstrap";
import ClientCallHistory from "./ClientCallHistory";
import { getCallHistory } from "../../actions/dct";

const LastMessageDetails = ({
  auth: { isAuthenticated, user, users, loading },
  dct: { lastMsg },
  getCallHistory,
  searchDataVal,

  //   AddState,
}) => {
  //formData
  console.log(lastMsg, "lastMsg");
  const [showClientHistoryModal, setShowClientCallHistoryModal] =
    useState(false);
  const handleClientCallHistoryModalClose = () =>
    setShowClientCallHistoryModal(false);

  const onClientCallHistoryModalChange = (e) => {
    if (e) {
      handleClientCallHistoryModalClose();
    }
  };
  const onClickHandler = () => {
    getCallHistory(searchDataVal);
    setShowClientCallHistoryModal(true);
  };
  var callDate = "";
  var ED = lastMsg.callDate.split(/\D/g);
  callDate = [ED[2], ED[1], ED[0]].join("-");
  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="row col-lg-12 col-md-11 col-sm-10 col-10 fixTableHeadhistory">
        <div className="col-lg-4 col-md-11 col-sm-10 col-10 ">
          <label>Staff Name : {lastMsg.callToStaffName}</label>
        </div>
        <div className="col-lg-4 col-md-11 col-sm-10 col-10 ">
          <label>Call Date : {callDate}</label>
        </div>
        <div className="col-lg-4 col-md-11 col-sm-10 col-10 ">
          <label>Status : {lastMsg.callStatus}</label>
        </div>
        <div className="col-lg-9 col-md-11 col-sm-10 col-10 ">
          <label className="label-control mt-1"> Last Meeting Details :</label>
          <textarea
            className="textarea form-control"
            rows="2"
            placeholder="Notes"
            style={{ width: "100%" }}
            value={lastMsg && lastMsg.callNote}
            disabled
            // editable={false}
          ></textarea>
        </div>
        <div className="col-lg-3 col-md-12 col-sm-12 col-12 mt-3">
          <input
            type="submit"
            name="submit"
            value="History"
            onClick={() => onClickHandler()}
            className="btn sub_form btn_continue blackbrd float-right"
          />
        </div>
      </div>
      <Modal
        show={showClientHistoryModal}
        backdrop="static"
        keyboard={false}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <div className="col-lg-10">
            <h3 className="modal-title text-center">Client Call History</h3>
          </div>
          <div className="col-lg-1">
            <button
              onClick={handleClientCallHistoryModalClose}
              className="close"
            >
              <img
                src={require("../../static/images/close.png")}
                alt="X"
                style={{ height: "20px", width: "20px" }}
              />
            </button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <ClientCallHistory
            onClientCallHistoryModalChange={onClientCallHistoryModalChange}
          />
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

LastMessageDetails.propTypes = {
  auth: PropTypes.object.isRequired,
  dct: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  dct: state.dct,
});

export default connect(mapStateToProps, {
  getCallHistory,
})(LastMessageDetails);
