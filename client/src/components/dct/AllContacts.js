import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import Spinner from "../layout/Spinner";
import EditContact from "./EditContact";
import { addNewDctStaffDetails } from "../../actions/dct";

const AllContacts = ({
  auth: { isAuthenticated, user, users, loading },
  leadDataVal,
  addNewDctStaffDetails,
}) => {
  console.log("contact", leadDataVal);
  //formData

  const [formData, setFormData] = useState({
    staffName: "",
    staffPhoneNumber: "",
    staffEmailId: "",
    staffDesignation: "",

    isSubmitted: false,
  });

  const { staffName, staffPhoneNumber, staffEmailId, staffDesignation } =
    formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [showEditModal, setShowEditModal] = useState(false);
  const handleEditModalClose = () => setShowEditModal(false);

  const onEditModalChange = (e) => {
    if (e) {
      handleEditModalClose();
    }
  };

  const [userDatas, setUserDatas] = useState(null);
  const [userDatas1, setUserDatas1] = useState(leadDataVal && leadDataVal._id);
  const onUpdate = (staff, idx) => {
    setShowEditModal(true);
    setUserDatas(staff);
    setUserDatas1(leadDataVal);
  };

  const [userDatadeactive, setUserDatadeactive] = useState(null);
  const onAddstaff = (leadDataVal, idx) => {
    setshowStaffAddModal(true);
    setUserDatadeactive(leadDataVal);
  };

  const [showStaffAddModal, setshowStaffAddModal] = useState(false);
  const handleAddModalClose = () => setshowStaffAddModal(false);

  const onAddModalChange = (e) => {
    if (e) {
      handleAddModalClose();
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      recordId: leadDataVal ? leadDataVal._id : "",
      staffName: staffName,
      staffPhoneNumber: staffPhoneNumber,
      staffEmailId: staffEmailId,
      staffDesignation: staffDesignation,
    };
    addNewDctStaffDetails(finalData);
    onAddModalChange(true);
    setFormData({
      ...formData,
      recordId: "",
      staffName: "",
      staffPhoneNumber: "",
      staffEmailId: "",
      staffDesignation: "",
      isSubmitted: true,
    });
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding ">
        <div className=" col-lg-12 col-md-12 col-sm-12 col-12 no_padding ">
          <button
            className="btn btn_green_bg float-right"
            onClick={() => onAddstaff()}
          >
            Add Staff
          </button>
        </div>
        <table
          className="table table-bordered table-striped table-hover smll_row"
          id="datatable2"
        >
          <thead>
            <tr>
              <th style={{ width: "15%" }}>Staff Name </th>
              <th style={{ width: "13%" }}>Phone No</th>
              <th style={{ width: "13%" }}>Designation</th>
              <th style={{ width: "6%" }}>Op</th>
            </tr>
          </thead>
          <tbody>
            {leadDataVal &&
              leadDataVal.staffs &&
              leadDataVal.staffs.map((staff, idx) => {
                return (
                  <tr key={idx}>
                    <td>{staff.staffName}</td>
                    <td>{staff.staffPhoneNumber}</td>
                    <td>{staff.staffDesignation}</td>
                    <td>
                      <img
                        className="img_icon_size log"
                        onClick={() => onUpdate(staff, idx)}
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
            <h3 className="modal-title text-center">Edit Staff Details</h3>
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
          <EditContact
            onEditModalChange={onEditModalChange}
            allStaffdata={userDatas}
            allleaddata={userDatas1}
          />
        </Modal.Body>
      </Modal>

      <Modal
        show={showStaffAddModal}
        backdrop="static"
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <div className="col-lg-10">
            <h3 className="modal-title text-center">Add Staff</h3>
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
          <form className="row" onSubmit={(e) => onSubmit(e)}>
            <div className="row col-lg-12 col-md-11 col-sm-12 col-12 ">
              <div className="row card-new  pb-3">
                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                  <label className="label-control">Staff Name :</label>
                  <input
                    type="text"
                    name="staffName"
                    value={staffName}
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                  <label className="label-control">Phone Number :</label>
                  <input
                    type="text"
                    name="staffPhoneNumber"
                    value={staffPhoneNumber}
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                  <label className="label-control">EmailId:</label>
                  <input
                    type="text"
                    name="staffEmailId"
                    value={staffEmailId}
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                  <label className="label-control">Designation :</label>
                  <input
                    type="text"
                    name="staffDesignation"
                    value={staffDesignation}
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
            </div>

            <div
              className="row col-lg-12 col-md-11 col-sm-12 col-12 Savebutton no_padding"
              size="lg"
            >
              <div className="col-lg-8 col-md-6 col-sm-12 col-12">
                <label className="label-control colorRed">
                  * Indicates mandatory fields.
                </label>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 col-12">
                {loading ? (
                  <button
                    className="btn sub_form btn_continue blackbrd Save float-right"
                    disabled
                  >
                    Loading...
                  </button>
                ) : (
                  <input
                    type="submit"
                    name="Submit"
                    value="Add"
                    className="btn sub_form btn_continue blackbrd Save float-right"
                  />
                )}
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      {/* </form> */}
    </Fragment>
  );
};

AllContacts.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addNewDctStaffDetails,
})(AllContacts);
