import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import Spinner from "../layout/Spinner";
import Select from "react-select";
import { Link } from "react-router-dom";
import {
  getAllSctLead,
  getAllSctLeadDD,
  getSctLastmessage,
} from "../../actions/sct";
import EditSctLead from "./EditSctLead";
import DeactiveSctLead from "./DeactiveSctLead";
import SctLastMessageDetails from "./SctLastMessageDetails";
import AllSctContacts from "./AllSctContacts";
import AllSctStatusChange from "./AllSctStatusChange";
// import AllContacts from "./AllContacts";
// import AllStatuschange from "./AllStatuschange";
// import LastMessageDetails from "./LastMessageDetails";
// import EditLead from "./EditLead";
// import DeactiveLead from "./DeactiveLead";
import { getActiveCountry } from "../../actions/regions";

const AllSctLeads = ({
  auth: { isAuthenticated, user, users },
  sct: { getAllSctLeads, getAllSctLeadsDD, getAllSctLeadsEmp },
  regions: { activeCountry },
  getAllSctLead,
  getActiveCountry,
  getAllSctLeadDD,
  getSctLastmessage,
}) => {
  useEffect(() => {
    getAllSctLead();
  }, []);
  useEffect(() => {
    getAllSctLeadDD();
  }, []);
  useEffect(() => {
    getActiveCountry({ countryBelongsTo: "SCT" });
  }, []);
  console.log("getAllSctLeads", getAllSctLeads);
  console.log("getAllSctLeadsDD", getAllSctLeadsDD);
  console.log("getAllSctLeadsEmp", getAllSctLeadsEmp);

  const [filterData, setFilterData] = useState();

  const [showEditModal, setShowEditModal] = useState(false);
  const handleEditModalClose = () => setShowEditModal(false);

  const onEditModalChange = (e) => {
    if (e) {
      handleEditModalClose();
    }
  };
  const [showHide, setShowHide] = useState({
    showdateselectionSection: false,
  });

  const { showdateselectionSection } = showHide;

  const [userDatas, setUserDatas] = useState(null);
  const onUpdate = (getAllSctLeads, idx) => {
    setShowEditModal(true);
    setUserDatas(getAllSctLeads);
  };

  const [userDatadeactive, setUserDatadeactive] = useState(null);
  const onDeactive = (getAllSctLeads, idx) => {
    setShowDeactiveModal(true);
    setUserDatadeactive(getAllSctLeads);
  };

  const [showDeactiveModal, setShowDeactiveModal] = useState(false);
  const handleDeactiveModalClose = () => setShowDeactiveModal(false);

  const onDeactiveModalChange = (e) => {
    if (e) {
      handleDeactiveModalClose();
    }
  };
  const [colorData, setcolorData] = useState();
  const [searchDataVal, setsearchDataVal] = useState();
  const [leadData, setLeadData] = useState();
  const onClickHandler = (getAllSctLeads, idx) => {
    setcolorData(idx);
    setLeadData(getAllSctLeads);
    const searchData = {
      sctCallToId: getAllSctLeads._id,
    };
    setsearchDataVal(searchData);
    getSctLastmessage(searchData);
    setShowHide({
      ...showHide,
      showdateselectionSection: true,
    });
  };

  const ondivcloseChange = (e) => {
    if (e) {
      handledivModalClose();
      // setcolorData("");
    }
  };

  const handledivModalClose = () => setShowHide(false);

  const allcountry = [];
  activeCountry.map((country) =>
    allcountry.push({
      countryId: country._id,
      label: country.countryName,
      value: country.countryName,
    })
  );

  const [country, getcountryData] = useState();
  const [countryId, getcountryIdData] = useState(null);

  const oncountryChange = (e) => {
    getcountryData(e);
    getclientsData("");
    getempData("");
    getcountryIdData(e.countryId);
    getAllSctLead({ countryId: e.countryId });
    getAllSctLeadDD({ countryId: e.countryId });
    setFilterData({ countryId: e.countryId });
  };

  const allclient = [];
  getAllSctLeadsDD.map((clients) =>
    allclient.push({
      clientsId: clients._id,
      label: clients.sctCompanyName,
      value: clients.sctCompanyName,
    })
  );
  const [clients, getclientsData] = useState();
  const onclientsChange = (e) => {
    getclientsData(e);
    getAllSctLead({
      countryId: countryId,
      clientsId: e.clientsId,
    });
    setFilterData({
      countryId: countryId,
      clientsId: e.clientsId,
    });
  };

  const allemp = [{ empId: null, label: "All", value: null }];
  getAllSctLeadsEmp.map((emp) =>
    allemp.push({
      empId: emp._id,
      label: emp.sctLeadAssignedToName,
      value: emp.sctLeadAssignedToName,
    })
  );

  const [emp, getempData] = useState();
  const [empId, setempID] = useState();
  const onempChange = (e) => {
    getempData(e);
    setempID(e.empId);
    getAllSctLead({
      countryId: countryId,
      clientsId: clients ? clients.clientsId : null,
      assignedTo: e.empId,
    });
    getAllSctLeadDD({
      countryId: countryId,
      clientsId: clients ? clients.clientsId : null,
      assignedTo: e.empId,
      emp: true,
    });
    setFilterData({
      countryId: countryId,
      clientsId: clients ? clients.clientsId : null,
      assignedTo: e.empId,
    });
  };

  const onClickReset = () => {
    getcountryData("");
    getcountryIdData("");
    getclientsData("");
    getempData("");
    getAllSctLead();
    getAllSctLeadDD();
    setFilterData();
    ondivcloseChange(true);
    setcolorData("");
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className=" col-lg-2 col-md-11 col-sm-10 col-10">
              <h5 className="heading_color">All Leads</h5>
            </div>
            <div className=" col-lg-2 col-md-11 col-sm-10 col-10 py-2">
              <Select
                name="countryName"
                options={allcountry}
                isSearchable={true}
                value={country}
                placeholder="Select Region"
                onChange={(e) => oncountryChange(e)}
              />
            </div>

            <div className=" col-lg-2 col-md-11 col-sm-10 col-10 py-2">
              <Select
                name="companyName"
                options={allclient}
                isSearchable={true}
                value={clients}
                placeholder="Select Lead"
                onChange={(e) => onclientsChange(e)}
              />
            </div>
            <div className="col-lg-2 col-md-11 col-sm-10 col-10 py-2">
              {(user.userGroupName && user.userGroupName === "Administrator") ||
              user.userGroupName === "Super Admin" ||
              user.empCtAccess === "All" ? (
                <>
                  <Select
                    name="empFullName"
                    options={allemp}
                    isSearchable={true}
                    value={emp}
                    placeholder="Select Emp"
                    onChange={(e) => onempChange(e)}
                  />
                </>
              ) : (
                <></>
              )}
            </div>

            <div className="col-lg-4 col-md-11 col-sm-12 col-11 py-3">
              <button
                className="btn btn_green_bg float-right"
                onClick={() => onClickReset()}
              >
                Refresh
              </button>
              <Link className="btn btn_green_bg float-right" to="/add-sct-lead">
                Add Lead
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 col-md-12 col-sm-12 col-12 text-center ">
              <section className="body">
                <div className=" body-inner no-padding table-responsive fixTableHeadCT">
                  <table
                    className="table table-bordered table-striped hoverrow smll_row"
                    id="datatable2"
                  >
                    <thead>
                      <tr>
                        <th style={{ width: "3%" }}>Sl.No</th>
                        <th style={{ width: "15%" }}>Company </th>
                        <th style={{ width: "15%" }}>Website </th>
                        <th style={{ width: "13%" }}>Email</th>
                        <th style={{ width: "8%" }}>Region</th>
                        <th style={{ width: "13%" }}>Contact</th>
                        <th style={{ width: "8%" }}>Call Date</th>
                        <th style={{ width: "5%" }}>Op</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getAllSctLeads &&
                        getAllSctLeads.map((getAllSctLeads, idx) => {
                          var sctCallDate = "";
                          if (getAllSctLeads.sctCallDate) {
                            var ED = getAllSctLeads.sctCallDate.split(/\D/g);
                            sctCallDate = [ED[2], ED[1], ED[0]].join("-");
                          }
                          return (
                            <tr
                              key={idx}
                              className={
                                colorData === idx ? "seletedrowcolorchange" : ""
                              }
                              onClick={() =>
                                onClickHandler(getAllSctLeads, idx)
                              }
                            >
                              <td>{idx + 1}</td>
                              <td>{getAllSctLeads.sctCompanyName}</td>
                              <td>{getAllSctLeads.sctWebsite}</td>
                              <td>{getAllSctLeads.sctEmailId}</td>
                              <td>{getAllSctLeads.countryName}</td>
                              <td>
                                {getAllSctLeads.sctcountryCode
                                  ? "+" + getAllSctLeads.sctcountryCode
                                  : ""}
                                &nbsp;
                                {getAllSctLeads.sctPhone1}
                              </td>
                              <td>{sctCallDate}</td>
                              <td>
                                <img
                                  className="img_icon_size log"
                                  onClick={() =>
                                    onDeactive(getAllSctLeads, idx)
                                  }
                                  src={require("../../static/images/delete.png")}
                                  alt="Delete Project"
                                  title="Delete Project"
                                />{" "}
                                &emsp;
                                <img
                                  className="img_icon_size log"
                                  onClick={() => onUpdate(getAllSctLeads, idx)}
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
                <div className="row">
                  <div className="col-lg-12 col-md-6 col-sm-11 col-11 align_right">
                    <label>
                      No of Leads : {getAllSctLeads && getAllSctLeads.length}
                    </label>
                  </div>
                </div>
              </section>
            </div>
            <div className="row col-lg-4 col-md-12 col-sm-12 col-12 fixTableHead">
              <div className=" col-lg-12 col-md-6 col-sm-6 col-12 card-new no_padding sidePartHeight">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12 no_padding ">
                  <AllSctContacts
                    leadDataVal={leadData}
                    ondivcloseChange={ondivcloseChange}
                    from="lead"
                    filterData={filterData}
                    showdateselectionSection={showdateselectionSection}
                  />
                </div>
              </div>
              <div className=" col-lg-12 col-md-6 col-sm-6 col-12 card-new no_padding ">
                <div
                  className="col-lg-12 col-md-12 col-sm-12 col-12 no_padding "
                  style={{ height: "30vh" }}
                >
                  <label className="sidePartHeading ">Status</label>
                  {showdateselectionSection && (
                    <AllSctStatusChange
                      leadDataVal={leadData}
                      ondivcloseChange={ondivcloseChange}
                      from={leadData.dctLeadCategory}
                      filterData={filterData}
                    />
                  )}
                </div>
              </div>
              <div className=" col-lg-12 col-md-6 col-sm-6 col-12 card-new no_padding">
                <div
                  className="col-lg-12 col-md-12 col-sm-12 col-12 no_padding "
                  style={{ height: "23vh" }}
                >
                  <label className="sidePartHeading ">
                    Last Message Details
                  </label>
                  {showdateselectionSection && (
                    <SctLastMessageDetails
                      searchDataVal={searchDataVal}
                      ondivcloseChange={ondivcloseChange}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
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
            <h3 className="modal-title text-center">Edit Lead Details</h3>
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
          <EditSctLead
            onEditModalChange={onEditModalChange}
            alleditLeaddata={userDatas}
            filterData={filterData}
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
            <h3 className="modal-title text-center">Deactivate Lead</h3>
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
          <DeactiveSctLead
            onDeactiveModalChange={onDeactiveModalChange}
            Leaddeavtivedata={userDatadeactive}
            // filterData={filterData}
          />
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

AllSctLeads.propTypes = {
  auth: PropTypes.object.isRequired,
  sct: PropTypes.object.isRequired,
  regions: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  sct: state.sct,
  regions: state.regions,
});

export default connect(mapStateToProps, {
  getAllSctLead,
  getAllSctLeadDD,
  getActiveCountry,
  getSctLastmessage,
})(AllSctLeads);
