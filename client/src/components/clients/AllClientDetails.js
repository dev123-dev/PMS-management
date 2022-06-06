import React, { useState, Fragment, useEffect } from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import Select from "react-select";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { getAllClients } from "../../actions/client";
import EditClientDetails from "./EditClientDetails";
const AllClientDetails = ({
  auth: { isAuthenticated, user, users },
  client: { allClient },
  getAllClients,
}) => {
  useEffect(() => {
    getAllClients();
  }, [getAllClients]);

  // console.log("allClient", allClient);

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
  const onUpdate = (allClient, idx) => {
    setShowEditModal(true);
    setUserDatas(allClient);
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-11 col-md-12 col-sm-12 col-12 no_padding">
            <div className="row col-lg-5 col-md-11 col-sm-10 col-10">
              <h5 className="heading_color">All Client Details </h5>
            </div>
          </div>
          <div className="row col-lg-12 col-md-11 col-sm-12 col-12 no_padding">
            <div className="col-lg-11 col-md-11 col-sm-12 col-11 py-3">
              <Link to="/add-client">
                <img
                  className="img_icon_size log float-right"
                  src={require("../../static/images/add-icon.png")}
                  alt="Add Staff"
                  title="Add Staff"
                />
              </Link>

              <Link to="/edit-Client">
                <img
                  className="img_icon_size log float-right"
                  src={require("../../static/images/add-icon.png")}
                  alt="Edit Staff"
                  title="Edit Staff"
                />
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-11 col-md-12 col-sm-12 col-12 text-center">
              <section className="body">
                <div className=" body-inner no-padding table-responsive">
                  <table
                    className="table table-bordered table-striped table-hover"
                    id="datatable2"
                  >
                    <thead>
                      <tr>
                        <th>Client Name</th>
                        <th>Belongs To</th>
                        <th>Folder Name</th>
                        <th>Email</th>
                        <th>Contact 1 </th>
                        <th>Contact 2</th>
                        <th>Currency</th>
                        <th>Mode of Pay</th>
                        <th>Country</th>
                        <th>Op</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allClient &&
                        allClient.map((allClient, idx) => {
                          return (
                            <tr key={idx}>
                              <td className="headcolstatic">
                                {allClient.clientName}
                              </td>
                              <td>{allClient.clientBelongsTo}</td>
                              <td>{allClient.clientFolderName}</td>
                              <td>{allClient.clientEmail}</td>
                              <td>{allClient.clientContactNo1}</td>
                              <td>{allClient.clientContactNo2}</td>
                              <td>{allClient.clientCurrency}</td>
                              <td>{allClient.clientCurrency}</td>
                              <td>{allClient.clientCountry}</td>
                              <td>
                                <>
                                  <img
                                    className="img_icon_size log"
                                    onClick={() => onUpdate(allClient, idx)}
                                    src={require("../../static/images/delete.png")}
                                    alt="Deactivate"
                                    title="Deactivate"
                                  />
                                  &nbsp;
                                  <img
                                    className="img_icon_size log"
                                    onClick={() => onUpdate(allClient, idx)}
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
          size="xl"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <div className="col-lg-10">
              <h3 className="modal-title text-center">
                Add Department Details
              </h3>
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
            {/* <AddDepartment
              onAddDistrictModalChange={onAddDistrictModalChange}
            /> */}
          </Modal.Body>
        </Modal>
      </div>

      <Modal
        show={showEditModal}
        backdrop="static"
        keyboard={false}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <div className="col-lg-10 col-md-10 col-sm-10 col-10">
            <h3 className="modal-title text-center">Edit Client Details</h3>
          </div>
          <div className="col-lg-2 col-md-2 col-sm-2 col-2">
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
          <EditClientDetails
            onEditModalChange={onEditModalChange}
            allClientdata={userDatas}
          />
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

AllClientDetails.propTypes = {
  auth: PropTypes.object.isRequired,
  getAllClients: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  client: state.client,
});

export default connect(mapStateToProps, { getAllClients })(AllClientDetails);