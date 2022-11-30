import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import Select from "react-select";
import {
  getSctClientDetails,
  getSctClientDetailsDD,
  getSctLastmessage,
  getProjectList,
} from "../../actions/sct";
import SctLastMessageDetails from "./SctLastMessageDetails";
import AllSctContacts from "./AllSctContacts";
import AllSctStatusChange from "./AllSctStatusChange";
import { getActiveCountry, getActiveState } from "../../actions/regions";

import EditSctClients from "./EditSctClients";
import DeactiveSctClient from "./DeactiveSctClient";
const AllSctRegularClients = ({
  auth: { isAuthenticated, user, users },
  sct: { sctClients, sctClientsDD, sctClientsEmp, projectList },
  regions: { activeCountry, activeState },
  getSctClientDetails,
  getActiveCountry,
  getActiveState,
  getSctClientDetailsDD,
  getSctLastmessage,
  getProjectList,
}) => {
  useEffect(() => {
    getSctClientDetails();
  }, []);
  useEffect(() => {
    getSctClientDetailsDD();
  }, []);
  useEffect(() => {
    getActiveCountry({ countryBelongsTo: "SCT" });
  }, []);
  useEffect(() => {
    getActiveState({ countryBelongsTo: "SCT" });
  }, []);
  useEffect(() => {
    getProjectList({});
  }, []);

  const [formData, setFormData] = useState({
    isSubmitted: false,
  });

  const { projectStatusData } = formData;

  const [filterData, setFilterData] = useState({ sctClientCategory: "RC" });

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
  const onUpdate = (sctClients, idx) => {
    setShowEditModal(true);
    setUserDatas(sctClients);
  };
  const onClickHandler2 = (sctClients, idx) => {
    localStorage.setItem("sctClientData", JSON.stringify(sctClients));
  };
  const [userDatadeactive, setUserDatadeactive] = useState(null);
  const onDeactive = (sctClients, idx) => {
    setShowDeactiveModal(true);
    setUserDatadeactive(sctClients);
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
  const onClickHandler = (sctClients, idx) => {
    setcolorData(idx);
    setLeadData(sctClients);
    const searchData = {
      sctCallToId: sctClients._id,
      sctLeadId: sctClients.sctLeadId ? sctClients.sctLeadId : null,
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
    getSctClientDetails({ countryId: e.countryId, sctClientCategory: "RC" });
    getSctClientDetailsDD({ countryId: e.countryId, sctClientCategory: "RC" });
    setFilterData({ countryId: e.countryId, sctClientCategory: "RC" });
  };

  const allprojects = [];
  projectList &&
    projectList.map((projects) =>
      allprojects.push({
        projectsId: projects._id,

        label: projects.sctProjectName,
        value: projects.sctProjectName,
      })
    );

  const [projects, getprojectsData] = useState();

  const [projectsId, setprojectsID] = useState();
  const [projectsName, setprojectsName] = useState();
  const onprojectsChange = (e) => {
    getprojectsData(e);
    getclientsData("");
    getempData("");
    setprojectsID(e.projectsId);
    let searchData = {
      projectsId: e.projectsId,
      sctClientCategory: "RC",
    };
    getSctClientDetails(searchData);
    getSctClientDetailsDD(searchData);
    setFilterData(searchData);
  };

  const allstates = [];
  activeState.map((state) =>
    allstates.push({
      stateId: state._id,
      label: state.stateName,
      value: state.stateName,
    })
  );

  const [state, getStateData] = useState("");

  const [stateId, setStateID] = useState("");
  const [stateName, setStateName] = useState("");

  const onStateChange = (e) => {
    getStateData(e);
    getclientsData("");
    getempData("");
    setStateID(e.stateId);
    let searchData = {
      projectsId: projectsId,
      stateId: e.stateId,
      sctClientCategory: "RC",
    };
    getSctClientDetails(searchData);
    getSctClientDetailsDD(searchData);
    setFilterData(searchData);
  };

  const allclient = [];
  sctClientsDD.map((clients) =>
    allclient.push({
      clientsId: clients._id,
      label: clients.sctCompanyName,
      value: clients.sctCompanyName,
    })
  );
  const [clients, getclientsData] = useState();
  const [clientsId, getclientsIdData] = useState();
  const onclientsChange = (e) => {
    getclientsData(e);
    getclientsIdData(e.clientsId);
    let searchData = {
      projectsId: projectsId,
      stateId: stateId,
      clientsId: e.clientsId,
      sctClientCategory: "RC",
    };
    getSctClientDetails(searchData);
    setFilterData(searchData);
  };

  const allemp = [{ empId: null, label: "All", value: null }];
  sctClientsEmp.map((emp) =>
    allemp.push({
      empId: emp._id,
      label: emp.sctClientAssignedToName,
      value: emp.sctClientAssignedToName,
    })
  );

  const [emp, getempData] = useState();
  const [empId, setempID] = useState();
  const onempChange = (e) => {
    getempData(e);
    setempID(e.empId);
    let searchData = {
      projectsId: projectsId,
      stateId: stateId,
      clientsId: clientsId,
      sctClientCategory: "RC",
      assignedTo: e.empId,
    };
    getSctClientDetails(searchData);
    getSctClientDetailsDD({
      ...searchData,
      emp: true,
    });
    setFilterData(searchData);
  };

  const onClickReset = () => {
    getcountryData("");
    getcountryIdData("");
    getclientsData("");
    getempData("");
    getSctClientDetails();
    getSctClientDetailsDD();
    setFilterData();
    ondivcloseChange(true);
    setcolorData("");
    getprojectsData("");
    getStateData("");
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className=" col-lg-2 col-md-11 col-sm-10 col-10">
              <h5 className="heading_color">Regular Clients </h5>
            </div>
            {/* <div className=" col-lg-2 col-md-11 col-sm-10 col-10 py-2">
              <Select
                name="countryName"
                options={allcountry}
                isSearchable={true}
                value={country}
                placeholder="Select Region"
                onChange={(e) => oncountryChange(e)}
              />
            </div> */}

            <div className="col-lg-2 col-md-6 col-sm-6 col-12 py-2">
              <Select
                name="sctProjectName"
                options={allprojects}
                isSearchable={true}
                value={projects}
                placeholder="Select Projects"
                onChange={(e) => onprojectsChange(e)}
                theme={(theme) => ({
                  ...theme,
                  height: 26,
                  minHeight: 26,
                  borderRadius: 1,
                  colors: {
                    ...theme.colors,
                    primary: "black",
                  },
                })}
              />
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6 col-12 py-2">
              <Select
                name="stateName"
                options={allstates}
                isSearchable={true}
                value={state}
                placeholder="Select State"
                onChange={(e) => onStateChange(e)}
              />
            </div>
            <div className=" col-lg-2 col-md-11 col-sm-10 col-10 py-2">
              <Select
                name="companyName"
                options={allclient}
                isSearchable={true}
                value={clients}
                placeholder="Select Client"
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

            <div className="col-lg-2 col-md-11 col-sm-12 col-11 py-2">
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
                    className="table table-bordered table-striped hoverrow smll_row"
                    id="datatable2"
                  >
                    <thead>
                      <tr>
                        {/* <th style={{ width: "3%" }}>Sl.No</th> */}
                        <th style={{ width: "15%" }}>Company </th>
                        <th style={{ width: "15%" }}>Website </th>
                        <th style={{ width: "13%" }}>Email</th>
                        <th style={{ width: "8%" }}>Region</th>
                        <th style={{ width: "13%" }}>Contact</th>
                        <th style={{ width: "8%" }}>Call Date</th>
                        <th style={{ width: "8%" }}>Call Date</th>
                        <th style={{ width: "5%" }}>Op</th>
                        <th style={{ width: "4%" }}>Docs</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sctClients &&
                        sctClients.map((sctClients, idx) => {
                          var sctCallDate = "";
                          if (sctClients.sctCallDate) {
                            var ED = sctClients.sctCallDate.split(/\D/g);
                            sctCallDate = [ED[2], ED[1], ED[0]].join("-");
                          }
                          return (
                            <tr
                              key={idx}
                              className={
                                colorData === idx ? "seletedrowcolorchange" : ""
                              }
                              onClick={() => onClickHandler(sctClients, idx)}
                            >
                              {/* <td>{idx + 1}</td> */}
                              <td>{sctClients.sctCompanyName}</td>
                              <td>
                                {" "}
                                <a
                                  href={sctClients.sctWebsite}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {sctClients.sctWebsite}
                                </a>
                              </td>
                              <td>{sctClients.sctEmailId}</td>
                              <td>{sctClients.countryName}</td>
                              <td>
                                {sctClients.sctcountryCode
                                  ? "+" + sctClients.sctcountryCode
                                  : ""}
                                &nbsp;
                                {sctClients.sctPhone1}
                              </td>
                              <td>{sctCallDate}</td>
                              <td>{sctClients.sctCallTime}</td>

                              <td>
                                <img
                                  className="img_icon_size log"
                                  onClick={() => onDeactive(sctClients, idx)}
                                  src={require("../../static/images/delete.png")}
                                  alt="Delete Project"
                                  title="Delete Project"
                                />{" "}
                                &emsp;
                                <img
                                  className="img_icon_size log"
                                  onClick={() => onUpdate(sctClients, idx)}
                                  src={require("../../static/images/edit_icon.png")}
                                  alt="Edit"
                                  title="Edit"
                                />
                              </td>

                              <td>
                                <Link
                                  onClick={() =>
                                    onClickHandler2(sctClients, idx)
                                  }
                                  to={{
                                    pathname: "/all-sct-documents",
                                    data: {
                                      sctdata: sctClients,
                                    },
                                  }}
                                >
                                  <img
                                    className="img_icon_size log"
                                    onClick={() => onDeactive(sctClients, idx)}
                                    src={require("../../static/images/documents.png")}
                                    alt="Documents"
                                    title="Documents"
                                  />
                                </Link>
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
                      No of Clients : {sctClients && sctClients.length}
                    </label>
                  </div>
                </div>
              </section>
            </div>
            <div className="row col-lg-4 col-md-12 col-sm-12 col-12 ">
              <div className=" col-lg-12 col-md-6 col-sm-6 col-12 card-new no_padding sidePartHeight">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12 no_padding ">
                  <AllSctContacts
                    leadDataVal={leadData}
                    ondivcloseChange={ondivcloseChange}
                    from="client"
                    filterData={filterData}
                    showdateselectionSection={showdateselectionSection}
                    page="AllSctRegularClients"
                  />
                </div>
              </div>
              <div className=" col-lg-12 col-md-6 col-sm-6 col-12 card-new no_padding ">
                <div
                  className="col-lg-12 col-md-12 col-sm-12 col-12 no_padding "
                  style={{ height: "33vh" }}
                >
                  <label className="sidePartHeading ">Status</label>
                  {showdateselectionSection && (
                    <AllSctStatusChange
                      leadDataVal={leadData}
                      ondivcloseChange={ondivcloseChange}
                      from="RegularClient"
                      filterData={filterData}
                      page="AllSctRegularClients"
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
            <h3 className="modal-title text-center">Edit Client Details</h3>
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
          <EditSctClients
            onEditModalChange={onEditModalChange}
            alleditClientdata={userDatas}
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
            <h3 className="modal-title text-center">Deactivate Client</h3>
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
          <DeactiveSctClient
            onDeactiveModalChange={onDeactiveModalChange}
            Clientdeactivedata={userDatadeactive}
            filterData={filterData}
          />
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

AllSctRegularClients.propTypes = {
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
  getSctClientDetails,
  getSctClientDetailsDD,
  getActiveCountry,
  getActiveState,
  getSctLastmessage,
  getProjectList,
})(AllSctRegularClients);
