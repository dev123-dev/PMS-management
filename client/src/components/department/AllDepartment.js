import React, { useState, Fragment, useEffect } from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import AddDepartment from "./AddDepartment";
import EditDepartment from "./EditDepartment";
import { getALLDepartment } from "../../actions/settings";
const AllDepartment = ({
  auth: { isAuthenticated, user, users },
  settings: { allDepartment },
  getALLDepartment,
}) => {
  useEffect(() => {
    getALLDepartment();
  }, [getALLDepartment]);

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
  const onUpdate = (allDepartment, idx) => {
    setShowEditModal(true);
    setUserDatas(allDepartment);
  };
  return !isAuthenticated || !user  ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className=" col-lg-5 col-md-11 col-sm-10 col-10">
              <h4 className="heading_color">All Department Details </h4>
            </div>
            <div className="col-lg-7 col-md-11 col-sm-12 col-11 py-2">
              {/* <img
                className="img_icon_size log float-right"
                onClick={() => onClickHandler()}
                src={require("../../static/images/add-icon.png")}
                alt="Add Department"
                title="Add Department"
              /> */}

              <Link
                to="#"
                className="btn btn_green_bg float-right"
                onClick={() => onClickHandler()}
              >
                Add Department
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
                        <th>Department Name</th>
                        <th>Department Description</th>
                        <th>Op</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allDepartment &&
                        allDepartment.map((allDepartment, idx) => {
                          return (
                            <tr key={idx}>
                              <td className="headcolstatic">
                                {allDepartment.departmentName}
                              </td>
                              <td>{allDepartment.departmentDesc}</td>
                              <td>
                                <img
                                  className="img_icon_size log"
                                  onClick={() => onUpdate(allDepartment, idx)}
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
                Add Department Details
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
            <AddDepartment onAddModalChange={onAddModalChange} />
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
                Edit Department Details
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
            <EditDepartment
              onEditModalChange={onEditModalChange}
              allDeptartmentdata={userDatas}
            />
          </Modal.Body>
        </Modal>
      </div>
    </Fragment>
  );
};

AllDepartment.propTypes = {
  auth: PropTypes.object.isRequired,
  getALLDepartment: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  settings: state.settings,
});

export default connect(mapStateToProps, { getALLDepartment })(AllDepartment);
