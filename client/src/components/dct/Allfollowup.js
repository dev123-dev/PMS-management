import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import Spinner from "../layout/Spinner";
import Select from "react-select";
import { Link } from "react-router-dom";
import {
  getDctLeadDetails,
  getDctLeadDetailsDD,
  getLastmessage,
} from "../../actions/dct";
import AllContacts from "./AllContacts";
import AllStatuschange from "./AllStatuschange";
import LastMessageDetails from "./LastMessageDetails";
import EditLead from "./EditLead";
import DeactiveLead from "./DeactiveLead";
import { getActiveCountry } from "../../actions/regions";
import { getMarketingEmployee } from "../../actions/user";

const Allfollowup = ({
  auth: { isAuthenticated, user, users },
  user: { marketingEmployees },
  dct: { allLeads, allLeadsDD },
  regions: { activeCountry },
  getDctLeadDetails,
  getActiveCountry,
  getDctLeadDetailsDD,
  getLastmessage,
  getMarketingEmployee,
}) => {
  useEffect(() => {
    getDctLeadDetails({ dctLeadCategory: "F" });
  }, []);
  useEffect(() => {
    getDctLeadDetailsDD({ dctLeadCategory: "F" });
  }, []);
  useEffect(() => {
    getActiveCountry({ countryBelongsTo: "DCT" });
  }, []);
  useEffect(() => {
    getMarketingEmployee();
  }, [getMarketingEmployee]);

  // console.log("marketingEmployees", marketingEmployees);

  const [filterData, setFilterData] = useState({ dctLeadCategory: "F" });

  const [showHide, setShowHide] = useState({
    showdateselectionSection: false,
  });

  const { showdateselectionSection } = showHide;
  const [showEditModal, setShowEditModal] = useState(false);
  const handleEditModalClose = () => setShowEditModal(false);

  const onEditModalChange = (e) => {
    if (e) {
      handleEditModalClose();
    }
  };

  const [userDatas, setUserDatas] = useState(null);
  const onUpdate = (allLeads, idx) => {
    setShowEditModal(true);
    setUserDatas(allLeads);
  };

  const [userDatadeactive, setUserDatadeactive] = useState(null);
  const onDeactive = (jobQueueProjects, idx) => {
    setShowDeactiveModal(true);
    setUserDatadeactive(jobQueueProjects);
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
  const onClickHandler = (allLeads, idx) => {
    setLeadData(allLeads);
    setcolorData(idx);
    const searchData = {
      callToId: allLeads._id,
    };
    setsearchDataVal(searchData);
    getLastmessage(searchData);
    setShowHide({
      ...showHide,
      showdateselectionSection: true,
    });
  };
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
    getcountryIdData(e.countryId);
    getDctLeadDetails({ countryId: e.countryId, dctLeadCategory: "F" });
    getDctLeadDetailsDD({ countryId: e.countryId, dctLeadCategory: "F" });
    setFilterData({ countryId: e.countryId, dctLeadCategory: "F" });
  };

  const allclient = [];
  allLeadsDD.map((clients) =>
    allclient.push({
      clientsId: clients._id,
      label: clients.companyName,
      value: clients.companyName,
    })
  );
  const [clients, getclientsData] = useState();
  const onclientsChange = (e) => {
    getclientsData(e);
    getDctLeadDetails({
      countryId: countryId,
      clientsId: e.clientsId,
      dctLeadCategory: "F",
    });
  };
  const ondivcloseChange = (e) => {
    if (e) {
      handledivModalClose();
    }
  };

  const handledivModalClose = () => setShowHide(false);

  const allemp = [{ empId: null, label: "All", value: null }];
  marketingEmployees.map((emp) =>
    allemp.push({
      empId: emp._id,
      label: emp.empFullName,
      value: emp.empFullName,
    })
  );

  const [emp, getempData] = useState();
  const [empId, setempID] = useState();
  const onempChange = (e) => {
    getempData(e);
    setempID(e.empId);
    getDctLeadDetails({
      countryId: countryId,
      clientsId: clients ? clients.clientsId : null,
      assignedTo: e.empId,
      dctLeadCategory: "F",
    });
    getDctLeadDetailsDD({
      countryId: countryId,
      clientsId: clients ? clients.clientsId : null,
      assignedTo: e.empId,
      dctLeadCategory: "F",
    });
    setFilterData({
      countryId: countryId,
      clientsId: clients ? clients.clientsId : null,
      assignedTo: e.empId,
      dctLeadCategory: "F",
    });
  };

  const onClickReset = () => {
    getcountryData("");
    getclientsData("");
    getempData("");
    getDctLeadDetails({ dctLeadCategory: "F" });
    getDctLeadDetailsDD({ dctLeadCategory: "F" });
    setFilterData({ dctLeadCategory: "F" });
    ondivcloseChange(true);
  };
  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className=" col-lg-2 col-md-11 col-sm-10 col-10">
              <h5 className="heading_color">All FollowUp</h5>
            </div>
            <div className=" col-lg-2 col-md-11 col-sm-10 col-10 py-2">
              <Select
                name="countryName"
                options={allcountry}
                isSearchable={true}
                value={country}
                placeholder="Select Region"
                onChange={(e) => oncountryChange(e)}
                required
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
                required
              />
            </div>
            {(user.userGroupName && user.userGroupName === "Administrator") ||
            user.userGroupName === "Super Admin" ? (
              <div className=" col-lg-2 col-md-11 col-sm-10 col-10 py-2">
                <Select
                  name="empFullName"
                  options={allemp}
                  isSearchable={true}
                  value={emp}
                  placeholder="Select Emp"
                  onChange={(e) => onempChange(e)}
                />
              </div>
            ) : (
              <></>
            )}

            <div className="col-lg-4 col-md-11 col-sm-12 col-11 py-3">
              <button
                className="btn btn_green_bg float-right"
                onClick={() => onClickReset()}
              >
                Refresh
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 col-md-12 col-sm-12 col-12 text-center ">
              <section className="body">
                <div className=" body-inner no-padding table-responsive fixTableHead">
                  <table
                    className="table table-bordered table-striped  smll_row"
                    id="datatable2"
                  >
                    <thead>
                      <tr>
                        <th style={{ width: "10%" }}>Sl.No</th>
                        <th style={{ width: "6%" }}>Company </th>
                        <th style={{ width: "15%" }}>Website </th>
                        <th style={{ width: "13%" }}>Email</th>
                        <th style={{ width: "13%" }}>Region</th>
                        <th style={{ width: "13%" }}>Contact</th>
                        <th style={{ width: "13%" }}>Call Date</th>
                        <th style={{ width: "13%" }}>Op</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allLeads &&
                        allLeads.map((allLeads, idx) => {
                          var callDates = "";
                          if (allLeads.dctCallDate) {
                            var ED = allLeads.dctCallDate.split(/\D/g);
                            callDates = [ED[2], ED[1], ED[0]].join("-");
                          }
                          return (
                            <tr
                              key={idx}
                              className={
                                colorData === idx ? "seletedrowcolorchange" : ""
                              }
                            >
                              <td>{idx + 1}</td>
                              <td>
                                <Link
                                  className="float-left ml-3"
                                  to="#"
                                  onClick={() => onClickHandler(allLeads, idx)}
                                >
                                  {allLeads.companyName}
                                </Link>
                              </td>
                              <td>{allLeads.website}</td>
                              <td>{allLeads.emailId}</td>
                              <td>{allLeads.countryName}</td>
                              <td>{allLeads.phone1}</td>
                              <td>{callDates}</td>
                              <td>
                                <img
                                  className="img_icon_size log"
                                  onClick={() => onDeactive(allLeads, idx)}
                                  src={require("../../static/images/delete.png")}
                                  alt="Delete Project"
                                  title="Delete Project"
                                />{" "}
                                &emsp;
                                <img
                                  className="img_icon_size log"
                                  onClick={() => onUpdate(allLeads, idx)}
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
            <div className="row col-lg-4 col-md-12 col-sm-12 col-12 ">
              <div className=" col-lg-12 col-md-6 col-sm-6 col-12 card-new no_padding sidePartHeight">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12 no_padding ">
                  {/* <label className="sidePartHeading ">Contacts</label> */}
                  {/* {showdateselectionSection && ( */}
                  <AllContacts
                    leadDataVal={leadData}
                    ondivcloseChange={ondivcloseChange}
                    from="lead"
                    filterData={filterData}
                    showdateselectionSection={showdateselectionSection}
                  />
                  {/* )} */}
                </div>
              </div>
              <div className=" col-lg-12 col-md-6 col-sm-6 col-12 card-new  no_padding ">
                <div
                  className="col-lg-12 col-md-12 col-sm-12 col-12 no_padding "
                  style={{ height: "30vh" }}
                >
                  <label className="sidePartHeading ">Status</label>
                  {showdateselectionSection && (
                    <AllStatuschange
                      leadDataVal={leadData}
                      from="FollowUp"
                      ondivcloseChange={ondivcloseChange}
                      filterData={filterData}
                    />
                  )}
                </div>
              </div>
              <div className=" col-lg-12 col-md-6 col-sm-6 col-12 card-new no_padding ">
                <div
                  className="col-lg-12 col-md-12 col-sm-12 col-12 no_padding "
                  style={{ height: "23vh" }}
                >
                  <label className="sidePartHeading ">
                    Last Message Details
                  </label>
                  {showdateselectionSection && (
                    <LastMessageDetails
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
          <EditLead
            onEditModalChange={onEditModalChange}
            alleditLeaddata={userDatas}
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
          <DeactiveLead
            onDeactiveModalChange={onDeactiveModalChange}
            Leaddeavtivedata={userDatadeactive}
          />
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

Allfollowup.propTypes = {
  auth: PropTypes.object.isRequired,
  dct: PropTypes.object.isRequired,
  regions: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  dct: state.dct,
  regions: state.regions,
});

export default connect(mapStateToProps, {
  getDctLeadDetails,
  getDctLeadDetailsDD,
  getActiveCountry,
  getLastmessage,
  getMarketingEmployee,
})(Allfollowup);
