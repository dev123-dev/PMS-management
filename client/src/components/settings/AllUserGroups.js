import React, { useState, Fragment, useEffect } from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { getALLUserGroups } from "../../actions/user";
import AddUserGroup from "./AddUserGroup";
import EditUserGroup from "./EditUserGroup";
const AllUserGroups = ({
  auth: { allUser, isAuthenticated, user, users },
  user: { userGroups },
  getALLUserGroups,
}) => {
  useEffect(() => {
    getALLUserGroups();
  }, [getALLUserGroups]);

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
  const onUpdate = (userGroups, idx) => {
    setShowEditModal(true);
    setUserDatas(userGroups);
  };
  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className="col-lg-6 col-md-11 col-sm-10 col-10">
              <h5 className="heading_color">All Groups</h5>
            </div>
            <div className="col-lg-6 col-md-11 col-sm-12 col-11 py-3">
              {/* <img
                className="img_icon_size log float-right"
                onClick={() => onClickHandler()}
                src={require("../../static/images/add-icon.png")}
                alt="Add UserGroup"
                title="Add UserGroup"
              /> */}

              <Link
                to="#"
                className="btn btn_green_bg float-right"
                onClick={() => onClickHandler()}
              >
                Add User Group
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
                        <th>User Group Name</th>
                        <th>Op</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userGroups &&
                        userGroups.map((userGroups, idx) => {
                          return (
                            <tr key={idx}>
                              <td className="headcolstatic">
                                {userGroups.userGroupName}
                              </td>

                              <td>
                                <img
                                  className="img_icon_size log"
                                  onClick={() => onUpdate(userGroups, idx)}
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
              <h3 className="modal-title text-center">Add User Group</h3>
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
            <AddUserGroup
              onAddModalChange={onAddModalChange}
              userGroupsdata={userDatas}
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
              <h3 className="modal-title text-center">Edit User Group</h3>
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
            <EditUserGroup
              onEditModalChange={onEditModalChange}
              userGroupsdata={userDatas}
            />
          </Modal.Body>
        </Modal>
      </div>
    </Fragment>
  );
};

AllUserGroups.propTypes = {
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getALLUserGroups: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps, { getALLUserGroups })(AllUserGroups);
