import React, { useState, Fragment, useEffect } from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getTrash, restoreProjectData } from "../../actions/settings";
import DeleteProject from "./DeleteProject";
import { Link } from "react-router-dom";
const Trash = ({
  auth: { allUser, isAuthenticated, user, users },
  settings: { allDeletedProjects },
  getTrash,
  restoreProjectData,
}) => {
  useEffect(() => {
    getTrash();
  }, [getTrash]);

  const [ProjDelete, setProjdelete] = useState(null);
  const onDeactive = (allDeletedProjects, idx) => {
    setShowDeactiveModal(true);
    setProjdelete(allDeletedProjects);
  };

  const [showDeactiveModal, setShowDeactiveModal] = useState(false);
  const handleDeactiveModalClose = () => setShowDeactiveModal(false);

  const onDeactiveModalChange = (e) => {
    if (e) {
      handleDeactiveModalClose();
    }
  };

  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const handleRestoreModalClose = () => setShowRestoreModal(false);
  const [ProjRestore, setProjRestore] = useState(null);
  const onClickHandler = (allDeletedProjects, idx) => {
    setProjRestore(allDeletedProjects);
    setShowRestoreModal(true);
  };

  const onRestoreModalChange = (e) => {
    if (e) {
      handleRestoreModalClose();
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      recordId: ProjRestore ? ProjRestore._id : "",
      projectEditedById: user._id,
      projectEditedDateTime: Date.now(),
      projectDeleteById: null,
      projectDeleteDateTime: null,
    };

    restoreProjectData(finalData);
    onRestoreModalChange(true);
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
                    <tbody>
                      {allDeletedProjects &&
                        allDeletedProjects.map((allDeletedProjects, idx) => {
                          return (
                            <tr key={idx}>
                              <td>{allDeletedProjects.clientName}</td>
                              <td>{allDeletedProjects.clientFolderName}</td>
                              <td>{allDeletedProjects.projectName}</td>
                              <td>{allDeletedProjects.projectDeadline}</td>
                              <td>{allDeletedProjects.projectQuantity}</td>
                              <td>{allDeletedProjects.projectStatusType}</td>

                              <td>
                                <img
                                  className="img_icon_size log"
                                  onClick={() =>
                                    onDeactive(allDeletedProjects, idx)
                                  }
                                  src={require("../../static/images/delete.png")}
                                  alt="Delete"
                                  title="Delete"
                                />

                                <Link
                                  to="#"
                                  className="btn btn_green_bg ml-2"
                                  onClick={() =>
                                    onClickHandler(allDeletedProjects, idx)
                                  }
                                >
                                  Restore
                                </Link>
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
          show={showDeactiveModal}
          backdrop="static"
          keyboard={false}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <div className="col-lg-10">
              <h3 className="modal-title text-center">Delete Project</h3>
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
            <DeleteProject
              onDeactiveModalChange={onDeactiveModalChange}
              Projectdeletedata={ProjDelete}
            />
          </Modal.Body>
        </Modal>

        <Modal
          show={showRestoreModal}
          backdrop="static"
          keyboard={false}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <div className="col-lg-10">
              <h3 className="modal-title text-center">Restore</h3>
            </div>
            <div className="col-lg-1">
              <button onClick={handleRestoreModalClose} className="close">
                <img
                  src={require("../../static/images/close.png")}
                  alt="X"
                  style={{ height: "20px", width: "20px" }}
                />
              </button>
            </div>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="col-md-12 col-lg-12 col-sm-12 col-12 text-left">
                <>
                  <label className="label-control colorRed">
                    Are you sure you want Restore this Project?
                  </label>
                  <br />
                  <input
                    type="submit"
                    name="Submit"
                    value="Submit"
                    className="btn sub_form btn_continue blackbrd Save float-right"
                  />
                  <Link
                    to="#"
                    className="btn sub_form btn_continue blackbrd float-right"
                    onClick={() => onRestoreModalChange(true)}
                  >
                    Cancel
                  </Link>
                </>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </Fragment>
  );
};

Trash.propTypes = {
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  getTrash: PropTypes.func.isRequired,
  restoreProjectData: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  settings: state.settings,
});

export default connect(mapStateToProps, {
  getTrash,
  restoreProjectData,
})(Trash);
