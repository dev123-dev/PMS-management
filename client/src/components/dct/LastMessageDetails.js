import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Spinner from "../layout/Spinner";
import { Modal } from "react-bootstrap";
import ClientCallHistory from "./ClientCallHistory";
const LastMessageDetails = ({
  auth: { isAuthenticated, user, users, loading },
  //   AddState,
}) => {
  //formData
  const [formData, setFormData] = useState({
    countryName: "",
    countryCode: "",
    isSubmitted: false,
  });
  const { countryName, countryCode } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
    setShowClientCallHistoryModal(true);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const finalData = {};
    console.log(finalData);
    // AddState(finalData);
    setFormData({
      isSubmitted: true,
    });
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="row col-lg-12 col-md-11 col-sm-10 col-10 ">
        <div className="col-lg-12 col-md-12 col-sm-12 col-12 ">
          <input
            type="submit"
            name="submit"
            value="History"
            onClick={() => onClickHandler()}
            className="btn sub_form btn_continue blackbrd float-right"
          />
        </div>
        <div className="col-lg-8 col-md-11 col-sm-10 col-10 ">
          <label className="label-control"> Last Meeting Details :</label>
          <textarea
            //   name="callNote"
            // id="callNote"
            className="textarea form-control"
            rows="2"
            placeholder="Notes"
            style={{ width: "100%" }}
            // value={callNote}
            onChange={(e) => onInputChange(e)}
          ></textarea>
        </div>
      </div>
      <Modal
        show={showClientHistoryModal}
        backdrop="static"
        keyboard={false}
        size="md"
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
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  //   AddState,
})(LastMessageDetails);
