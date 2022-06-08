import React, { useState, Fragment, useEffect } from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getALLPaymentMode } from "../../actions/settings";
import AddPaymentMethod from "./AddPaymentMethod";
import EditPaymentMethod from "./EditPaymentMethod";
const AllPaymentMethods = ({
  auth: { allUser, isAuthenticated, user, users },
  settings: { paymentMode },
  getALLPaymentMode,
}) => {
  useEffect(() => {
    getALLPaymentMode();
  }, [getALLPaymentMode]);

  console.log(paymentMode);
  const [showAllDistrictModal, setShowAddDistrictModal] = useState(false);
  const handleAddDistrictModalClose = () => setShowAddDistrictModal(false);
  const onClickHandler = () => {
    setShowAddDistrictModal(true);
  };
  const onAddDistrictModalChange = (e) => {
    if (e) {
      handleAddDistrictModalClose();
    }
  };

  const [showEditModal, setShowEditModal] = useState(false);
  const handleEditModalClose = () => setShowEditModal(false);
  const onClickHandler1 = () => {
    setShowEditModal(true);
  };
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
              <h5 className="heading_color">All Payment Methods </h5>
            </div>
            <div className="col-lg-7 col-md-11 col-sm-12 col-11 py-3">
              <img
                className="img_icon_size log float-right"
                onClick={() => onClickHandler()}
                src={require("../../static/images/add-icon.png")}
                alt="Add Department"
                title="Add Department"
              />
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
                        <th>Payment Method </th>
                        <th>Op</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentMode &&
                        paymentMode.map((paymentMode, idx) => {
                          return (
                            <tr key={idx}>
                              <td>{paymentMode.paymentMode}</td>

                              <td>
                                <>
                                  <img
                                    className="img_icon_size log"
                                    onClick={() => onUpdate(paymentMode, idx)}
                                    src={require("../../static/images/delete.png")}
                                    alt="Deactivate"
                                    title="Deactivate"
                                  />
                                  &nbsp;
                                  <img
                                    className="img_icon_size log"
                                    onClick={() => onUpdate(paymentMode, idx)}
                                    src={require("../../static/images/edit_icon.png")}
                                    alt="Edit"
                                    title="Edit"
                                  />
                                </>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        </section>
        <Modal
          show={showAllDistrictModal}
          backdrop="static"
          keyboard={false}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <div className="col-lg-10">
              <h3 className="modal-title text-center">Add Payment Method</h3>
            </div>
            <div className="col-lg-2">
              <button onClick={handleAddDistrictModalClose} className="close">
                <img
                  src={require("../../static/images/close.png")}
                  alt="X"
                  style={{ height: "20px", width: "20px" }}
                />
              </button>
            </div>
          </Modal.Header>
          <Modal.Body>
            <AddPaymentMethod
              onAddDistrictModalChange={onAddDistrictModalChange}
            />
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
              <h3 className="modal-title text-center">Edit Payment Method</h3>
            </div>
            <div className="col-lg-2">
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
            <EditPaymentMethod
              onEditModalChange={onEditModalChange}
              paymentModeData={userDatas}
            />
          </Modal.Body>
        </Modal>
      </div>
    </Fragment>
  );
};

AllPaymentMethods.propTypes = {
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  getALLPaymentMode: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  settings: state.settings,
});

export default connect(mapStateToProps, { getALLPaymentMode })(
  AllPaymentMethods
);
