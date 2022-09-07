import React, { useState, Fragment, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import AddDesignation from "./AddDesignation";
import EditDesignation from "./EditDesignation";
import { getALLDesignation } from "../../actions/settings";
import DeactiveDesignation from "./DeactiveDesignation";
const AllDesignation = ({
  auth: { isAuthenticated, user, users },
  settings: { allDesignation },
  getALLDesignation,
}) => {
  useEffect(() => {
    getALLDesignation();
  }, [getALLDesignation]);

  const [showAddModal, setShowAddModal] = useState(false);
  const handleAddModalClose = () => setShowAddModal(false);
  const onClickHandler = () => {
    setShowAddModal(true);
  };
  const onAddModalChange = (e) => {
    if (e) {
      handleAddModalClose();
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
  const onUpdate = (allDeptartment, idx) => {
    setShowEditModal(true);
    setUserDatas(allDeptartment);
  };

  const [showDeactiveModal, setShowDeactiveModal] = useState(false);
  const handleDeactiveModalClose = () => setShowDeactiveModal(false);
  const onDeactiveModalChange = (e) => {
    if (e) {
      handleDeactiveModalClose();
    }
  };
  const [userDatadeactive, setUserDatadeactive] = useState(null);
  const onDeactive = (allDeptartment, idx) => {
    setShowDeactiveModal(true);
    setUserDatadeactive(allDeptartment);
  };
  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className=" col-lg-5 col-md-11 col-sm-10 col-10">
              <h5 className="heading_color">All Designation Details </h5>
            </div>
            <div className="col-lg-7 col-md-11 col-sm-12 col-11 py-3">
              {/* <img
                className="img_icon_size log float-right"
                onClick={() => onClickHandler()}
                src={require("../../static/images/add-icon.png")}
                alt="Add Designation"
                title="Add Designation"
              /> */}

              <Link
                to="#"
                className="btn btn_green_bg float-right"
                onClick={() => onClickHandler()}
              >
                Add Designation
              </Link>
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
                        <th>Designation Name</th>
                        <th>Designation Description</th>
                        <th>Op</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allDesignation &&
                        allDesignation.map((allDesignation, idx) => {
                          return (
                            <tr key={idx}>
                              <td className="headcolstatic">
                                {allDesignation.designationName}
                              </td>
                              <td>{allDesignation.designationDesc}</td>
                              <td>
                                {allDesignation.designationStatus &&
                                allDesignation.designationStatus !==
                                  "Deactive" ? (
                                  <img
                                    className="img_icon_size log"
                                    onClick={() =>
                                      onDeactive(allDesignation, idx)
                                    }
                                    src={require("../../static/images/delete.png")}
                                    alt="Deactivate"
                                    title="Deactivate"
                                  />
                                ) : (
                                  <Fragment></Fragment>
                                )}
                                &nbsp;
                                <img
                                  className="img_icon_size log"
                                  onClick={() => onUpdate(allDesignation, idx)}
                                  src={require("../../static/images/edit_icon.png")}
                                  alt="Edit"
                                  title="Edit"
                                />
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
          show={showAddModal}
          backdrop="static"
          keyboard={false}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <div className="col-lg-10">
              <h3 className="modal-title text-center">
                Add Designation Details
              </h3>
            </div>
            <div className="col-lg-1">
              <button onClick={handleAddModalClose} className="close">
                <img
                  src={require("../../static/images/close.png")}
                  alt="X"
                  style={{ height: "20px", width: "20px" }}
                />
              </button>
            </div>
          </Modal.Header>
          <Modal.Body>
            <AddDesignation onAddModalChange={onAddModalChange} />
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
              <h3 className="modal-title text-center">
                Edit Designation Details
              </h3>
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
            <EditDesignation
              onEditModalChange={onEditModalChange}
              allDeptartmentdata={userDatas}
            />
          </Modal.Body>
        </Modal>

        <Modal
          show={showDeactiveModal}
          backdrop="static"
          keyboard={false}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <div className="col-lg-10">
              <h3 className="modal-title text-center">
                Deactivate Designation
              </h3>
            </div>
            <div className="col-lg-1">
              <button onClick={handleDeactiveModalClose} className="close">
                <img
                  src={require("../../static/images/close.png")}
                  alt="X"
                  style={{ height: "20px", width: "20px" }}
                />
              </button>
            </div>
          </Modal.Header>
          <Modal.Body>
            <DeactiveDesignation
              onDeactiveModalChange={onDeactiveModalChange}
              Designationdeactivedata={userDatadeactive}
            />
          </Modal.Body>
        </Modal>
      </div>
    </Fragment>
  );
};

AllDesignation.propTypes = {
  auth: PropTypes.object.isRequired,
  getALLDesignation: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  settings: state.settings,
});

export default connect(mapStateToProps, { getALLDesignation })(AllDesignation);
