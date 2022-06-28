import React, { useState, Fragment, useEffect } from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { getAllEmployee } from "../../actions/user";
import EditEmployeeDetails from "./EditEmployeeDetails";
import DeactiveEmployee from "./DeactiveEmployee";
import EditPassword from "./EditPassword";
const AllStaffDetails = ({
  auth: { allUser, isAuthenticated, user, users },
  user: { allEmployee },
  getAllEmployee,
}) => {
  useEffect(() => {
    getAllEmployee();
  }, [getAllEmployee]);
  // console.log(allEmployee);

  const [showEditModal, setShowEditModal] = useState(false);
  const handleEditModalClose = () => setShowEditModal(false);

  const onEditModalChange = (e) => {
    if (e) {
      handleEditModalClose();
    }
  };

  const [userDatas, setUserDatas] = useState(null);
  const onUpdate = (allEmployee, idx) => {
    setShowEditModal(true);
    setUserDatas(allEmployee);
  };

  const [showDeactiveModal, setShowDeactiveModal] = useState(false);
  const handleDeactiveModalClose = () => setShowDeactiveModal(false);
  const onClickHandler2 = () => {
    setShowDeactiveModal(true);
  };
  const onDeactiveModalChange = (e) => {
    if (e) {
      handleDeactiveModalClose();
    }
  };
  const [userDatadeactive, setUserDatadeactive] = useState(null);
  const onDeactive = (allEmployee, idx) => {
    setShowDeactiveModal(true);
    setUserDatadeactive(allEmployee);
  };

  //changepwd

  const [showChangePwdModal, setShowChangePwdModal] = useState(false);
  const handleChangePwdModalClose = () => setShowChangePwdModal(false);
  const onChangePwdModalChange = (e) => {
    if (e) {
      handleChangePwdModalClose();
    }
  };
  const [userDataChangePwd, setUserDataChangePwd] = useState(null);
  const onChangePwd = (allEmployee, idx) => {
    setShowChangePwdModal(true);
    setUserDataChangePwd(allEmployee);
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className="row col-lg-5 col-md-11 col-sm-10 col-10">
              <h5 className="heading_color">All Staff Details </h5>
            </div>
            <div className="col-lg-7 col-md-11 col-sm-12 col-11 py-3">
              {/* <Link to="/add-Staff">
                <img
                  className="img_icon_size log float-right"
                  src={require("../../static/images/add-icon.png")}
                  alt="Add Staff"
                  title="Add Staff"
                />
              </Link> */}
              <Link className="btn btn_green_bg float-right" to="/add-Staff">
                Add Staff
              </Link>
              {/* <Link to="/edit-Staff">
                <img
                  className="img_icon_size log float-right"
                  src={require("../../static/images/add-icon.png")}
                  alt="Edit Staff"
                  title="Edit Staff"
                />
              </Link> */}
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
                        <th>Sl No.</th>
                        <th>Staff Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Staff Code</th>
                        <th>Joining Date </th>
                        <th>OP</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allEmployee &&
                        allEmployee.map((allEmployee, idx) => {
                          var empJoiningDate = "";
                          if (allEmployee.empJoiningDate) {
                            var ED = allEmployee.empJoiningDate.split(/\D/g);
                            empJoiningDate = [ED[2], ED[1], ED[0]].join("-");
                          }
                          return (
                            <tr key={idx}>
                              <td>{idx + 1}</td>
                              <td>{allEmployee.empFullName}</td>
                              <td>{allEmployee.empPhone}</td>
                              <td>{allEmployee.empAddress}</td>
                              <td>{allEmployee.empCode}</td>
                              <td>{empJoiningDate}</td>

                              <td>
                                <>
                                  <img
                                    className="img_icon_size log"
                                    onClick={() => onDeactive(allEmployee, idx)}
                                    src={require("../../static/images/delete.png")}
                                    alt="Deactivate"
                                    title="Deactivate"
                                  />
                                  &nbsp;
                                  <img
                                    className="img_icon_size log"
                                    onClick={() => onUpdate(allEmployee, idx)}
                                    src={require("../../static/images/edit_icon.png")}
                                    alt="Edit"
                                    title="Edit"
                                  />
                                  <img
                                    className="img_icon_size log"
                                    onClick={() =>
                                      onChangePwd(allEmployee, idx)
                                    }
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

          <div className="row col-md-12 col-lg-12 col-sm-12 col-12  ">
            <div className="col-lg-10 col-md-6 col-sm-6 col-12"></div>
            <div className="col-lg-2 col-md-6 col-sm-6 col-12 align_right">
              <strong> No of Staff:{allEmployee.length}</strong>
            </div>
          </div>
        </section>
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
              <h3 className="modal-title text-center">Edit Staff Details</h3>
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
            <EditEmployeeDetails
              onEditModalChange={onEditModalChange}
              allEmployeedata={userDatas}
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
              <h3 className="modal-title text-center">Deactivate Staff</h3>
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
            <DeactiveEmployee
              onDeactiveModalChange={onDeactiveModalChange}
              staffDeactivedata={userDatadeactive}
            />
          </Modal.Body>
        </Modal>

        <Modal
          show={showChangePwdModal}
          backdrop="static"
          keyboard={false}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <div className="col-lg-10">
              <h3 className="modal-title text-center">Change Password</h3>
            </div>
            <div className="col-lg-1">
              <button onClick={handleChangePwdModalClose} className="close">
                <img
                  src={require("../../static/images/close.png")}
                  alt="X"
                  style={{ height: "20px", width: "20px" }}
                />
              </button>
            </div>
          </Modal.Header>
          <Modal.Body>
            <EditPassword
              onChangePwdModalChange={onChangePwdModalChange}
              staffChangePwddata={userDataChangePwd}
            />
          </Modal.Body>
        </Modal>
      </div>
    </Fragment>
  );
};

AllStaffDetails.propTypes = {
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getAllEmployee: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps, { getAllEmployee })(AllStaffDetails);
