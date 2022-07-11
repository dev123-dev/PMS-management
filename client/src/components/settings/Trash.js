import React, { useState, Fragment, useEffect } from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getAllFeedback, EditFeedbackStatusData } from "../../actions/settings";
import AddFeedback from "./AddFeedback";

const Trash = ({
  auth: { allUser, isAuthenticated, user, users },
  settings: { allFeedback },
  getAllFeedback,
  EditFeedbackStatusData,
}) => {
  useEffect(() => {
    getAllFeedback();
  }, [getAllFeedback]);

  console.log(user);
  const [formData, setFormData] = useState({
    feedbackpriority: "",
    projectStatusCategory: "",

    isSubmitted: false,
  });

  const { projectStatusData } = formData;

  const [showAddfeedbackModal, setShowAddFeedbackModal] = useState(false);
  const handleAddFeedbackModalClose = () => setShowAddFeedbackModal(false);

  const onAddFeedbackModalChange = (e) => {
    if (e) {
      handleAddFeedbackModalClose();
    }
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className="col-lg-2 col-md-11 col-sm-10 col-10">
              <h5 className="heading_color">Trash</h5>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12 text-center">
              <section className="body">
                <div className=" body-inner no-padding table-responsive fixTableHead">
                  <table
                    className="table table-bordered table-striped table-hover"
                    id="datatable2"
                  >
                    <thead>
                      <tr>
                        <th style={{ width: "10%" }}>Client Name</th>
                        <th style={{ width: "6%" }}>Folder </th>
                        <th style={{ width: "25%" }}>Project Name</th>
                        <th style={{ width: "2%" }}>Deadline</th>
                        <th style={{ width: "3%" }}>Qty</th>
                        <th style={{ width: "13%" }}>Status</th>
                        <th style={{ width: "10%" }}>OP</th>
                      </tr>
                    </thead>
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
      </div>
    </Fragment>
  );
};

Trash.propTypes = {
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  getAllFeedback: PropTypes.func.isRequired,
  EditFeedbackStatusData: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  settings: state.settings,
});

export default connect(mapStateToProps, {
  getAllFeedback,
  EditFeedbackStatusData,
})(Trash);
