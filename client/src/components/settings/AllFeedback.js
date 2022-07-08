import React, { useState, Fragment, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getALLPaymentMode } from "../../actions/settings";
import AddFeedback from "./AddFeedback";
import EditFeedback from "./EditFeedback";
const AllFeedback = ({
  auth: { allUser, isAuthenticated, user, users },
  settings: { paymentMode },
  getALLPaymentMode,
}) => {
  useEffect(() => {
    getALLPaymentMode();
  }, [getALLPaymentMode]);

  //  console.log(paymentMode);
  const [showAddfeedbackModal, setShowAddFeedbackModal] = useState(false);
  const handleAddFeedbackModalClose = () => setShowAddFeedbackModal(false);
  const onClickHandler = () => {
    setShowAddFeedbackModal(true);
  };
  const onAddFeedbackModalChange = (e) => {
    if (e) {
      handleAddFeedbackModalClose();
    }
  };

  const [showEditModal, setShowEditModal] = useState(false);
  const handleEditModalClose = () => setShowEditModal(false);

  const onEditModalChange = (e) => {
    if (e) {
      handleEditModalClose();
    }
  };

  const [userDatas, setUserDatas] = useState(null);
  const onUpdate = (paymentMode, idx) => {
    setShowEditModal(true);
    setUserDatas(paymentMode);
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className="col-lg-5 col-md-11 col-sm-10 col-10">
              <h5 className="heading_color">All FeedBacks</h5>
            </div>
            <div className="col-lg-7 col-md-11 col-sm-12 col-11 py-3">
              {/* <img
                className="img_icon_size log float-right"
                onClick={() => onClickHandler()}
                src={require("../../static/images/add-icon.png")}
                alt="Add Department"
                title="Add Department"
              /> */}

              <Link
                to="#"
                className="btn btn_green_bg float-right"
                onClick={() => onClickHandler()}
              >
                Add Feedback
              </Link>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12 text-center">
              <section className="body">
                <div className=" body-inner no-padding table-responsive">
                  <table
                    className="table table-bordered table-striped table-hover"
                    id="datatable2"
                  >
                    <thead>
                      <tr>
                        <th>Problem</th>
                        <th>Given By</th>
                        <th>Changes</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>OP</th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        </section>
        <Modal
          show={showAddfeedbackModal}
          backdrop="static"
          keyboard={false}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <div className="col-lg-10">
              <h3 className="modal-title text-center">Add Feedback</h3>
            </div>
            <div className="col-lg-1">
              <button onClick={handleAddFeedbackModalClose} className="close">
                <img
                  src={require("../../static/images/close.png")}
                  alt="X"
                  style={{ height: "20px", width: "20px" }}
                />
              </button>
            </div>
          </Modal.Header>
          <Modal.Body>
            <AddFeedback onAddFeedbackModalChange={onAddFeedbackModalChange} />
          </Modal.Body>
        </Modal>

        <Modal
          show={showEditModal}
          backdrop="static"
          keyboard={false}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <div className="col-lg-10">
              <h3 className="modal-title text-center">Edit Feedback</h3>
            </div>
            <div className="col-lg-1">
              <button onClick={handleEditModalClose} className="close">
                <img
                  src={require("../../static/images/close.png")}
                  alt="X"
                  style={{ height: "20px", width: "20px" }}
                />
              </button>
            </div>
          </Modal.Header>
          <Modal.Body>
            <EditFeedback
              onEditModalChange={onEditModalChange}
              feedbackData={userDatas}
            />
          </Modal.Body>
        </Modal>
      </div>
    </Fragment>
  );
};

AllFeedback.propTypes = {
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  getALLPaymentMode: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  settings: state.settings,
});

export default connect(mapStateToProps, { getALLPaymentMode })(AllFeedback);
