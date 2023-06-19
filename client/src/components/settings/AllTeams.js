import React, { useState, Fragment, useEffect } from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import AddTeam from "./AddTeam";
import EditTeam from "./EditTeam";
import { getALLTeamDetails } from "../../actions/settings";
import DeactiveTeam from "./DeactiveTeam";
const AllTeams = ({
  auth: { isAuthenticated, user, users },
  settings: { allTeamDetails },
  getALLTeamDetails,
}) => {
  useEffect(() => {
    getALLTeamDetails();
  }, [getALLTeamDetails]);

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
  const onUpdate = (allDepartment, idx) => {
    setShowEditModal(true);
    setUserDatas(allDepartment);
  };

  const [showDeactiveModal, setShowDeactiveModal] = useState(false);
  const handleDeactiveModalClose = () => setShowDeactiveModal(false);

  const onDeactiveModalChange = (e) => {
    if (e) {
      handleDeactiveModalClose();
    }
  };
  const [Datadeactive, setdeactive] = useState(null);
  const onDeactive = (allTeamDetails, idx) => {
    setShowDeactiveModal(true);
    setdeactive(allTeamDetails);
  };

  return !isAuthenticated || !user  ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className=" col-lg-5 col-md-11 col-sm-10 col-10">
              <h5 className="heading_color">All Teams </h5>
            </div>
            <div className="col-lg-7 col-md-11 col-sm-12 col-11 py-3">
              <Link
                to="#"
                className="btn btn_green_bg float-right"
                onClick={() => onClickHandler()}
              >
                Add Team
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
                        <th>Team Name</th>
                        <th>Description</th>
                        <th style={{ width: "10%" }}>Op</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allTeamDetails &&
                        allTeamDetails.map((allTeamDetails, idx) => {
                          return (
                            <tr key={idx}>
                              <td>{allTeamDetails.teamName}</td>
                              <td>{allTeamDetails.teamDescription}</td>

                              <td>
                                <img
                                  className="img_icon_size log"
                                  onClick={() =>
                                    onDeactive(allTeamDetails, idx)
                                  }
                                  src={require("../../static/images/delete.png")}
                                  alt="Deactivate"
                                  title="Deactivate"
                                />
                                &nbsp;
                                <img
                                  className="img_icon_size log"
                                  onClick={() => onUpdate(allTeamDetails, idx)}
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
              <h3 className="modal-title text-center">Add Team Details</h3>
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
            <AddTeam onAddModalChange={onAddModalChange} />
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
              <h3 className="modal-title text-center">Edit Team Details</h3>
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
            <EditTeam
              onEditModalChange={onEditModalChange}
              allTeamsdata={userDatas}
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
              <h3 className="modal-title text-center">Deactivate Team</h3>
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
            <DeactiveTeam
              onDeactiveModalChange={onDeactiveModalChange}
              teamdeactivedata={Datadeactive}
            />
          </Modal.Body>
        </Modal>
      </div>
    </Fragment>
  );
};

AllTeams.propTypes = {
  auth: PropTypes.object.isRequired,
  getALLTeamDetails: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  settings: state.settings,
});

export default connect(mapStateToProps, {
  getALLTeamDetails,
})(AllTeams);
