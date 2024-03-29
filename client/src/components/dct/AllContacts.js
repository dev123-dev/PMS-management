import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import Spinner from "../layout/Spinner";
import Select from "react-select";
import EditContact from "./EditContact";
import {
  addNewDctStaffDetails,
  addNewDctClientStaffDetails,
  deactivateDctStaffDetails,
  deactivateDctClientStaffDetails,
  getStaffsData,
} from "../../actions/dct";
import { getActiveCountry } from "../../actions/regions";

const AllContacts = ({
  auth: { isAuthenticated, user, users, loading },
  regions: { activeCountry },
  dct: { staffData },
  leadDataVal,
  addNewDctStaffDetails,
  addNewDctClientStaffDetails,
  deactivateDctStaffDetails,
  deactivateDctClientStaffDetails,
  ondivcloseChange,
  getActiveCountry,
  showdateselectionSection,
  from,
  filterData,
  getStaffsData,
}) => {
  useEffect(() => {
    getActiveCountry({ countryBelongsTo: "DCT" });
  }, [getActiveCountry]);

  let staffFilter = { from: from, leadDataId: leadDataVal && leadDataVal._id }
  useEffect(() => {
    getStaffsData(staffFilter);
  }, [leadDataVal]);

  const [formData, setFormData] = useState({
    staffName: "",
    staffPhoneNumber: "",
    staffEmailId: "",
    staffDesignation: "",
    staffDeactiveReason: "",
    isSubmitted: false,
  });

  const {
    staffName,
    staffPhoneNumber,
    staffEmailId,
    staffDesignation,
    staffDeactiveReason,
  } = formData;

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

  const [userDataadd, setUserDataadd] = useState(null);
  const onAddstaff = (leadDataVal, idx) => {
    setshowStaffAddModal(true);
    setUserDataadd(leadDataVal);
  };

  const [showStaffAddModal, setshowStaffAddModal] = useState(false);
  const handleAddModalClose = () => {
    resetAddStaffData();
    setshowStaffAddModal(false);
  }

  const onAddModalChange = (e) => {
    if (e) {
      handleAddModalClose();
    }
  };

  const [userDatadeactive, setUserDatadeactive] = useState(null);
  const onDeactive = (staff, idx) => {
    setShowDeactiveModal(true);
    setUserDatadeactive(staff);
  };

  const [showDeactiveModal, setShowDeactiveModal] = useState(false);
  const handleDeactiveModalClose = () => setShowDeactiveModal(false);

  const onDeactiveModalChange = (e) => {
    if (e) {
      handleDeactiveModalClose();
    }
  };

  const allstaffcountry = [];
  activeCountry &&
    activeCountry.map((staffcountry) =>
      allstaffcountry.push({
        staffcountryId: staffcountry._id,
        staffCountryCode: staffcountry.countryCode,
        label: staffcountry.countryName + " (" + staffcountry.countryCode + ")",
        value: staffcountry.countryName,
      })
    );

  const [staffcountry, getstaffcountryData] = useState("");
  const [staffcountryId, setstaffcountryID] = useState();
  const [staffCountryCode, setstaffCountryCode] = useState();
  const [staffcountryname, setstaffcountryname] = useState();
  const onstaffcountryChange = (e) => {
    // Extract the needed properties from the selected option
    const staffCountryCode = e?.staffCountryCode || '';
    const staffcountryId = e?.staffcountryId || '';
    const staffcountryname = e?.value || '';

    getstaffcountryData(e);
    setstaffcountryname(staffcountryname);
    setstaffcountryID(staffcountryId);
    setstaffCountryCode(staffCountryCode);
  };

  //add staff
  const onSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      recordId: leadDataVal ? leadDataVal._id : "",
      staffName: staffName.charAt(0).toUpperCase() + staffName.slice(1),
      staffPhoneNumber: staffPhoneNumber,
      staffEmailId: staffEmailId?.trim(),
      staffDesignation: staffDesignation?.trim(),
      staffRegion: staffcountryname,
      staffRegionId: staffcountryId,
      staffCountryCode: staffCountryCode,
      filterData: filterData,
      staffFilter: staffFilter,
    };
    if (from === "TestClient" || from === "RegularClient" || from === "Inactive" || from === "InactiveClient") {
      addNewDctClientStaffDetails(finalData);
    } else {
      addNewDctStaffDetails(finalData);
    }

    onAddModalChange(true);
    resetAddStaffData();
  };

  const resetAddStaffData = () => {
    setFormData({
      ...formData,
      recordId: "",
      staffName: "",
      staffRegion: "",
      staffCountryCode: "",
      staffPhoneNumber: "",
      staffEmailId: "",
      staffDesignation: "",
      isSubmitted: true,
    });
    setstaffCountryCode("");
    getstaffcountryData("");
    // ondivcloseChange(true);
  }

  const onSubmitDeactive = (e) => {
    e.preventDefault();
    const finalData = {
      recordId: leadDataVal ? leadDataVal._id : "",
      staffId: userDatadeactive ? userDatadeactive._id : "",
      staffDeactivateById: user._id,
      staffDeactiveByDateTime: new Date().toLocaleString("en-GB"),
      staffStatus: "Deactive",
      staffDeactiveReason: staffDeactiveReason,
      filterData: filterData,
      staffFilter: staffFilter,
    };
    if (from === "TestClient" || from === "RegularClient" || from === "Inactive" || from === "InactiveClient") {
      deactivateDctClientStaffDetails(finalData);
    } else {
      deactivateDctStaffDetails(finalData);
    }
    onDeactiveModalChange(true);
    setFormData({
      ...formData,
      recordId: "",
      staffName: "",
      staffPhoneNumber: "",
      staffEmailId: "",
      staffDesignation: "",
      staffDeactiveReason: "",
      isSubmitted: true,
    });
  };

  const onKeyDown = (e) => {
    // Allow only numbers, backspace, and arrow keys
    if (!/^\d$/.test(e.key) && e.key !== "Backspace" && e.key !== "ArrowLeft" && e.key !== "ArrowRight") {
      e.preventDefault();
    }
  };

  return !isAuthenticated || !user ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding ">
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding ">
          <div className="col-lg-11 col-md-12 col-sm-12 col-12 no_padding ">
            <label className="sidePartHeading"> Contacts</label>
          </div>

          <div
            className="col-lg-1 col-md-12 col-sm-12 col-12 "
            style={{
              height: "30px",
              width: "20px",
              backgroundColor: "#456792",
            }}
          >
            {showdateselectionSection ? (
              <img
                src={require("../../static/images/add-icon-wh.png")}
                alt="X"
                style={{
                  height: "20px",
                  width: "20px",
                  backgroundColor: "#456792",
                }}
                onClick={() => onAddstaff()}
              />
            ) : (<></>)}
          </div>
        </div>

        {showdateselectionSection && (
          <>
            <div className="col-lg-12 col-md-11 col-sm-11 col-11 text-center ">
              <section className="body">
                <div className="body-inner table-responsive fixTableHeadcontact">
                  <div className="fixTableHeadcontactdct">
                    <table
                      className="table table-bordered table-striped table-hover smll_row scrollhor "
                      id="datatable2"
                    >
                      <thead>
                        <tr>
                          <th style={{ width: "11%" }}>St Name </th>
                          <th style={{ width: "10%" }}>Phone No</th>
                          <th style={{ width: "8%" }}>Designation</th>
                          <th style={{ width: "10%" }}>Email</th>
                          <th style={{ width: "7%" }}>Op</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          staffData &&
                          staffData.staffs &&
                          staffData.staffs.map((staff, idx) => {
                            if (staff.staffStatus === "Active")
                              return (
                                <tr key={idx}>
                                  <td>{staff.staffName}</td>
                                  <td>
                                    {staff.staffCountryCode
                                      ? "+" + staff.staffCountryCode
                                      : ""}
                                    &nbsp;
                                    {staff.staffPhoneNumber}
                                  </td>
                                  <td>{staff.staffDesignation}</td>
                                  <td>{staff.staffEmailId}</td>
                                  <td>
                                    <img
                                      className="img_icon_size log"
                                      onClick={() => onDeactive(staff, idx)}
                                      src={require("../../static/images/delete.png")}
                                      alt="Delete Staff"
                                      style={{ height: "17px", width: "14px" }}
                                      title="Delelte Staff"
                                    />

                                    <img
                                      className="img_icon_size log"
                                      onClick={() => onUpdate(staff, idx)}
                                      src={require("../../static/images/edit_icon.png")}
                                      alt="Edit"
                                      title="Edit"
                                      style={{
                                        height: "17px",
                                        width: "14px",
                                        marginLeft: "2px",
                                      }}
                                    />
                                  </td>
                                </tr>)
                          })
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            </div>
          </>
        )}
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
            ondivcloseChange={ondivcloseChange}
            from={from}
            filterData={filterData}
            staffFilter={staffFilter}
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
                  <label className="label-control">Staff Name* :</label>
                  <input
                    type="text"
                    name="staffName"
                    value={staffName}
                    className="form-control"
                    autoComplete="off"
                    onChange={(e) => onInputChange(e)}
                    required
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                  <label className="label-control">Email-Id:</label>
                  <input
                    type="email"
                    name="staffEmailId"
                    value={staffEmailId}
                    className="form-control"
                    autoComplete="off"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                  <label className="label-control">Region :</label>
                  <Select
                    name="countryName"
                    options={allstaffcountry}
                    isSearchable={true}
                    value={staffcountry}
                    placeholder="Select Region"
                    onChange={(e) => onstaffcountryChange(e)}
                  />
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                  <label className="label-control">Staff Phone:</label>
                  <input
                    type="number"
                    name="staffCountryCode"
                    value={staffCountryCode}
                    className="form-control"
                    style={{ width: "50px" }}
                    disabled
                  />
                </div>

                <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                  <label className="label-control">
                    <br />
                  </label>
                  <input
                    type="text"
                    name="staffPhoneNumber"
                    value={staffPhoneNumber}
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                    style={{ marginLeft: "-6em", width: "22vh" }}
                    maxLength="12"
                    autoComplete="off"
                    onKeyDown={onKeyDown}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                  <label className="label-control">Designation :</label>
                  <input
                    type="text"
                    name="staffDesignation"
                    value={staffDesignation}
                    className="form-control"
                    autoComplete="off"
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
          <form className="row" onSubmit={(e) => onSubmitDeactive(e)}>
            <div className="col-lg-12 col-md-11 col-sm-12 col-12 ">
              <label className="label-control">Deactive Staff Reason :</label>
              <textarea
                name="staffDeactiveReason"
                id="staffDeactiveReason"
                className="textarea form-control"
                rows="3"
                placeholder="Staff Deactive Reason"
                style={{ width: "100%" }}
                value={staffDeactiveReason}
                onChange={(e) => onInputChange(e)}
                required
              ></textarea>
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
              <div className="col-lg-12 col-md-6 col-sm-12 col-12">
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
                    value="Submit"
                    className="btn sub_form btn_continue blackbrd Save float-right"
                  />
                )}
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

AllContacts.propTypes = {
  auth: PropTypes.object.isRequired,
  regions: PropTypes.object.isRequired,
  dct: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  regions: state.regions,
  dct: state.dct,
});

export default connect(mapStateToProps, {
  addNewDctStaffDetails,
  addNewDctClientStaffDetails,
  deactivateDctStaffDetails,
  getActiveCountry,
  deactivateDctClientStaffDetails,
  getStaffsData,
})(AllContacts);
