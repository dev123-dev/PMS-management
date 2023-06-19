import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { Modal } from "react-bootstrap";
import SctClientCallHistory from "./SctClientCallHistory";
import { getCallHistory } from "../../actions/sct";
import { Link } from "react-router-dom";

const SctLastMessageDetails = ({
  auth: { isAuthenticated, user, users, loading },
  sct: { sctLastMsg },
  getCallHistory,
  searchDataVal,

  //   AddState,
}) => {
  //formData

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
  var sctCallDate = "";

  var ED =
    sctLastMsg && sctLastMsg.sctCallDate && sctLastMsg.sctCallDate.split(/\D/g);
  if (ED) {
    sctCallDate = [ED[2], ED[1], ED[0]].join("-");
  }

  return !isAuthenticated || !user  ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="row col-lg-12 col-md-11 col-sm-10 col-10 fixTableHeadhistory">
        <div className="col-lg-4 col-md-11 col-sm-10 col-10 ">
          <label>
            St. Name : {sctLastMsg && sctLastMsg.sctCallToStaffName}
          </label>
        </div>
        <div className="col-lg-4 col-md-11 col-sm-10 col-10 ">
          <label>Cl Date : {sctCallDate} </label>
        </div>
        <div className="col-lg-4 col-md-11 col-sm-10 col-10 ">
          <label>Status : {sctLastMsg && sctLastMsg.sctCallStatus}</label>
        </div>
        <div className="col-lg-9 col-md-11 col-sm-10 col-10 ">
          <label className="label-control mt-1"> Last Meeting Details :</label>
          <Link
            className="linkoflastmesge"
            to="#"
            title={sctLastMsg && sctLastMsg.sctCallNote}
          >
            <textarea
              className="textarea form-control"
              rows="2"
              placeholder="Notes"
              style={{ width: "90%" }}
              value={sctLastMsg && sctLastMsg.sctCallNote}
              disabled
              // editable={false}
            ></textarea>
          </Link>
        </div>
        <div className="col-lg-3 col-md-12 col-sm-12 col-12 mt-4">
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
          <SctClientCallHistory
            onClientCallHistoryModalChange={onClientCallHistoryModalChange}
          />
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

SctLastMessageDetails.propTypes = {
  auth: PropTypes.object.isRequired,
  sct: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  sct: state.sct,
});

export default connect(mapStateToProps, {
  getCallHistory,
})(SctLastMessageDetails);
