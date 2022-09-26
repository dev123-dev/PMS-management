import React, { useState, Fragment, useEffect } from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import AddSctProject from "./AddSctProject";
import { getALLSctProjects } from "../../actions/sct";
import EditSctProjects from "./EditSctProjects";

const AllSctProjects = ({
  auth: { isAuthenticated, user, users },
  sct: { allSctProject },
  getALLSctProjects,
}) => {
  useEffect(() => {
    getALLSctProjects();
  }, [getALLSctProjects]);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const handleAddProjectModalClose = () => setShowAddProjectModal(false);
  const onClickHandler = () => {
    setShowAddProjectModal(true);
  };
  const onAddProjectModalChange = (e) => {
    if (e) {
      handleAddProjectModalClose();
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
  const onUpdate = (allSctProject, idx) => {
    setShowEditModal(true);
    setUserDatas(allSctProject);
  };

  const [showUploadModal, setShowUploadModal] = useState(false);
  const handleUploadModalClose = () => setShowUploadModal(false);

  const onUploadChange = (e) => {
    if (e) {
      handleUploadModalClose();
    }
  };

  const onUpload = () => {
    setShowUploadModal(true);
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className=" col-lg-5 col-md-11 col-sm-10 col-10">
              <h5 className="heading_color">All Project Details </h5>
            </div>
            <div className="col-lg-7 col-md-11 col-sm-12 col-11 py-3">
              {user.userGroupName && user.userGroupName !== "Sct Marketing" ? (
                <Link
                  to="#"
                  className="btn btn_green_bg float-right"
                  onClick={() => onClickHandler()}
                >
                  Add SCT Project
                </Link>
              ) : (
                <></>
              )}
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
                        <th>Project Name</th>
                        <th>Project Description</th>
                        <th>Project Formation Date</th>
                        {user.userGroupName &&
                        user.userGroupName !== "Sct Marketing" ? (
                          <th>Op</th>
                        ) : (
                          <></>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {allSctProject &&
                        allSctProject.map((allSctProject, idx) => {
                          var sctProjectDate = "";
                          if (allSctProject.sctProjectDate) {
                            var ED = allSctProject.sctProjectDate.split(/\D/g);
                            sctProjectDate = [ED[2], ED[1], ED[0]].join("-");
                          }
                          return (
                            <tr key={idx}>
                              <td>{allSctProject.sctProjectName}</td>
                              <td>{allSctProject.sctProjectDesc}</td>
                              <td>{sctProjectDate}</td>
                              {user.userGroupName &&
                              user.userGroupName !== "Sct Marketing" ? (
                                <td>
                                  <img
                                    className="img_icon_size log"
                                    onClick={() => onUpdate(allSctProject, idx)}
                                    src={require("../../static/images/edit_icon.png")}
                                    alt="Edit"
                                    title="Edit"
                                  />
                                  <img
                                    className="img_icon_size log"
                                    onClick={() => onUpload()}
                                    src={require("../../static/images/uploadicon.jpg")}
                                    alt="Edit"
                                    title="Edit"
                                  />
                                </td>
                              ) : (
                                <></>
                              )}
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
          show={showAddProjectModal}
          backdrop="static"
          keyboard={false}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <div className="col-lg-10">
              <h3 className="modal-title text-center">Add Project Details</h3>
            </div>
            <div className="col-lg-1">
              <button onClick={handleAddProjectModalClose} className="close">
                <img
                  src={require("../../static/images/close.png")}
                  alt="X"
                  style={{ height: "20px", width: "20px" }}
                />
              </button>
            </div>
          </Modal.Header>
          <Modal.Body>
            <AddSctProject onAddProjectModalChange={onAddProjectModalChange} />
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
              <h3 className="modal-title text-center">Edit Project Details</h3>
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
            <EditSctProjects
              onEditModalChange={onEditModalChange}
              allSctProjectdata={userDatas}
            />
          </Modal.Body>
        </Modal>

        <Modal
          show={showUploadModal}
          backdrop="static"
          keyboard={false}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <div className="col-lg-10">
              <h3 className="modal-title text-center">Upload Agreement</h3>
            </div>
            <div className="col-lg-1">
              <button onClick={handleUploadModalClose} className="close">
                <img
                  src={require("../../static/images/close.png")}
                  alt="X"
                  style={{ height: "20px", width: "20px" }}
                />
              </button>
            </div>
          </Modal.Header>
          <Modal.Body>
            <input type="file" />
            <button>Upload!</button>
          </Modal.Body>
        </Modal>
      </div>
    </Fragment>
  );
};

AllSctProjects.propTypes = {
  auth: PropTypes.object.isRequired,
  sct: PropTypes.object.isRequired,
  getALLSctProjects: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  sct: state.sct,
});

export default connect(mapStateToProps, { getALLSctProjects })(AllSctProjects);
