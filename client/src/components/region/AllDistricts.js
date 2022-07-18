import React, { useState, Fragment, useEffect } from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getAllDistricts } from "../../actions/regions";
import AddDistrictDetails from "./AddDistrictDetails";
import EditDistrictDetails from "./EditDistrictDetails";
import DeactiveDistrict from "./DeactiveDistrict";
const AllDistricts = ({
  auth: { allUser, isAuthenticated, user, users },
  regions: { allDistrics },
  getAllDistricts,
}) => {
  useEffect(() => {
    getAllDistricts();
  }, [getAllDistricts]);

  console.log("allDistrics", allDistrics);
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

  const onUpdateModalChange = (e) => {
    if (e) {
      handleUpdateModalClose();
    }
  };

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const handleUpdateModalClose = () => setShowUpdateModal(false);

  const [userData, setUserData] = useState(null);
  const onEdit = (districts, idx) => {
    setShowUpdateModal(true);
    setUserData(districts);
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
          <div className="row col-lg-11 col-md-12 col-sm-12 col-12 no_padding">
            <div className="row col-lg-5 col-md-11 col-sm-10 col-10">
              <h5 className="heading_color">All District Details </h5>
            </div>
            <div className="col-lg-7 col-md-1 col-sm-1 col-1 ">
              <button
                className="btn btn_green_bg float-right"
                onClick={() => onClickHandler()}
              >
                Add District
              </button>

              <button
                className="btn btn_green_bg float-right"
                onClick={() => onEdit()}
              >
                Edit District
              </button>
              <button
                className="btn btn_green_bg float-right"
                onClick={() => onDeactive()}
              >
                Deactive District
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-11 col-md-12 col-sm-12 col-12 text-center py-2">
              <section className="body">
                <div className=" body-inner no-padding table-responsive">
                  <table
                    className="table table-bordered table-striped table-hover"
                    id="datatable2"
                  >
                    <thead>
                      <tr>
                        <th>District </th>
                        <th>State</th>
                        <th>Op</th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
      <Modal
        show={showAllDistrictModal}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <div className="col-lg-10">
            <h3 className="modal-title text-center">Add Country Details</h3>
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
          <AddDistrictDetails
            onAddDistrictModalChange={onAddDistrictModalChange}
          />
        </Modal.Body>
      </Modal>
      <Modal
        show={showUpdateModal}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <div className="col-lg-10">
            <h3 className="modal-title text-center">Edit District Details </h3>
          </div>
          <div className="col-lg-2">
            <button onClick={handleUpdateModalClose} className="close">
              <img
                src={require("../../static/images/close.png")}
                alt="X"
                style={{ height: "20px", width: "20px" }}
              />
            </button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <EditDistrictDetails
            districts={userData}
            onUpdateModalChange={onUpdateModalChange}
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
            <h3 className="modal-title text-center">Deactivate District</h3>
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
          <DeactiveDistrict
            onDeactiveModalChange={onDeactiveModalChange}
            allProjectStatusdeavtivedata={userDatadeactive}
          />
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

AllDistricts.propTypes = {
  auth: PropTypes.object.isRequired,
  getAllDistricts: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  regions: state.regions,
});

export default connect(mapStateToProps, { getAllDistricts })(AllDistricts);
