import React, { useState, Fragment, useEffect } from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import Select from "react-select";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import AddDepartment from "./AddDepartment";
import EditDepartment from "./EditDepartment";
import { getALLDepartment } from "../../actions/settings";
const AllDepartment = ({
  auth: { isAuthenticated, user, users },
  settings: { allDeptartment },
  getALLDepartment,
}) => {
  useEffect(() => {
    getALLDepartment();
  }, [getALLDepartment]);

  console.log("allDeptartment", allDeptartment);

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
  const onUpdate = (allDeptartment, idx) => {
    setShowEditModal(true);
    setUserDatas(allDeptartment);
  };
  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-11 col-md-12 col-sm-12 col-12 no_padding">
            <div className="row col-lg-5 col-md-11 col-sm-10 col-10">
              <h5 className="heading_color">All Department Details </h5>
            </div>
          </div>
          <div className="row col-lg-12 col-md-11 col-sm-12 col-12 no_padding">
            <div className="col-lg-11 col-md-11 col-sm-12 col-11 py-3">
              <img
                className="img_icon_size log float-right"
                onClick={() => onClickHandler()}
                src={require("../../static/images/add-icon.png")}
                alt="Add Department"
                title="Add Department"
              />

              <img
                className="img_icon_size log float-right"
                onClick={() => onClickHandler1()}
                // src={require("../../static/images/add-icon.png")}
                alt="Edit Department"
                title="Edit Department"
              />
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
                        <th>Department Name</th>
                        <th>Op</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allDeptartment &&
                        allDeptartment.map((allDeptartment, idx) => {
                          return (
                            <tr key={idx}>
                              <td className="headcolstatic">
                                {allDeptartment.departmentName}
                              </td>

                              <td>
                                <>
                                  <img
                                    className="img_icon_size log"
                                    onClick={() =>
                                      onUpdate(allDeptartment, idx)
                                    }
                                    src={require("../../static/images/delete.png")}
                                    alt="Deactivate"
                                    title="Deactivate"
                                  />
                                  &nbsp;
                                  <img
                                    className="img_icon_size log"
                                    onClick={() =>
                                      onUpdate(allDeptartment, idx)
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
            <AddDepartment
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
              <h3 className="modal-title text-center">
                Edit Department Details
              </h3>
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
