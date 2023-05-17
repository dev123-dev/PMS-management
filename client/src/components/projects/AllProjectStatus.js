import React, { useState, Fragment, useEffect } from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import { getAllProjectStatus } from "../../actions/projects";
import EditProjectStatus from "./EditProjectStatus";
import AddProjectStatus from "./AddProjectStatus";
import DeactiveProjectStatus from "./DeactiveProjectStatus";
const AllProjectStatus = ({
  auth: { allUser, isAuthenticated, user, users },
  project: { allProjectStatus },
  getAllProjectStatus,
}) => {
  useEffect(() => {
    getAllProjectStatus();
  }, [getAllProjectStatus]);

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

  const onEditModalChange = (e) => {
    if (e) {
      handleEditModalClose();
    }
  };
  const [userDatas, setUserDatas] = useState(null);
  const onUpdate = (allProjectStatus, idx) => {
    setShowEditModal(true);
    setUserDatas(allProjectStatus);
  };

  const [showDeactiveModal, setShowDeactiveModal] = useState(false);
  const handleDeactiveModalClose = () => setShowDeactiveModal(false);

  const onDeactiveModalChange = (e) => {
    if (e) {
      handleDeactiveModalClose();
    }
  };
  const [userDatadeactive, setUserDatadeactive] = useState(null);
  const onDeactive = (allProjectStatus, idx) => {
    setShowDeactiveModal(true);
    setUserDatadeactive(allProjectStatus);
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className="col-lg-6 col-md-11 col-sm-10 col-10">
              <h4 className="heading_color">All Project Status Details </h4>
            </div>
            <div className="col-lg-6 col-md-11 col-sm-12 col-11 py-2">
              <Link
                to="#"
                className="btn btn_green_bg float-right"
                onClick={() => onClickHandler()}
              >
                Add Project Status
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
                        <th>Project Status Name</th>
                        <th>Project Status Category</th>
                        <th>Op</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allProjectStatus &&
                        allProjectStatus.map((allProjectStatus, idx) => {
                          return (
                            <tr key={idx}>
                              <td className="headcolstatic">
                                {allProjectStatus.projectStatusType}
                              </td>
                              <td>{allProjectStatus.projectStatusCategory}</td>

                              <td>
                                {allProjectStatus.projectStatusStatus &&
                                allProjectStatus.projectStatusStatus !==
                                  "Deactive" ? (
                                  <img
                                    className="img_icon_size log"
                                    onClick={() =>
                                      onDeactive(allProjectStatus, idx)
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
                                  onClick={() =>
                                    onUpdate(allProjectStatus, idx)
                                  }
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
              <h3 className="modal-title text-center">Add Project Status</h3>
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
            <AddProjectStatus onAddModalChange={onAddModalChange} />
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
              <h3 className="modal-title text-center">Edit Project Status</h3>
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
            <EditProjectStatus
              onEditModalChange={onEditModalChange}
              allProjectStatusdata={userDatas}
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
                Deactivate Project Status
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
            <DeactiveProjectStatus
              onDeactiveModalChange={onDeactiveModalChange}
              allProjectStatusdeavtivedata={userDatadeactive}
            />
          </Modal.Body>
        </Modal>
      </div>
    </Fragment>
  );
};

AllProjectStatus.propTypes = {
  auth: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  getAllProjectStatus: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  project: state.project,
});

export default connect(mapStateToProps, { getAllProjectStatus })(
  AllProjectStatus
);
