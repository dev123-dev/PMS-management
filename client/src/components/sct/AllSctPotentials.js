import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import Spinner from "../layout/Spinner";
import Select from "react-select";
import DatePicker from "react-datepicker";
import {
  getSctLeadDetails,
  getSctLeadDetailsDD,
  getSctLastmessage,
  getPotentialClients,
  getProjectList,
} from "../../actions/sct";
import EditSctLead from "./EditSctLead";
import DeactiveSctLead from "./DeactiveSctLead";
import SctLastMessageDetails from "./SctLastMessageDetails";
import AllSctContacts from "./AllSctContacts";
import AllSctStatusChange from "./AllSctStatusChange";

import { getActiveCountry, getActiveState } from "../../actions/regions";

const AllSctPotentials = ({
  auth: { isAuthenticated, user, users, loading },
  sct: {
    allSctLeads,
    allSctLeadsDD,
    allSctLeadsEmp,
    projectList,
    MonthWiseData,
  },
  regions: { activeCountry, activeState },
  getSctLeadDetails,
  getPotentialClients,
  getActiveCountry,
  getActiveState,
  getSctLeadDetailsDD,
  getSctLastmessage,
  getProjectList,
}) => {
  console.log("MonthWiseData", MonthWiseData);
  useEffect(() => {
    getSctLeadDetails();
    getPotentialClients();
  }, []);
  useEffect(() => {
    getSctLeadDetailsDD();
  }, []);
  useEffect(() => {
    getActiveCountry({ countryBelongsTo: "SCT" });
  }, []);
  useEffect(() => {
    getActiveState({ countryBelongsTo: "SCT" });
  }, []);

  useEffect(() => {
    getProjectList({ countryBelongsTo: "SCT" });
  }, []);

  let CategoryMethods = [
    { value: "Hot", label: "Hot" },
    { value: "Normal", label: "Normal" },
    { value: "Cool", label: "Cool" },
  ];
  const [filterData, setFilterData] = useState({ sctLeadCategory: "P" });

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
  const onUpdate = (allSctLeads, idx) => {
    setShowEditModal(true);
    setUserDatas(allSctLeads);
  };

  const [userDatadeactive, setUserDatadeactive] = useState(null);
  const onDeactive = (allSctLeads, idx) => {
    setShowDeactiveModal(true);
    setUserDatadeactive(allSctLeads);
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
  const onClickHandler = (allSctLeads, idx) => {
    setcolorData(idx);
    setLeadData(allSctLeads);
    const searchData = {
      sctCallToId: allSctLeads._id,
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
    getSctLeadDetails({ countryId: e.countryId, sctLeadCategory: "P" });
    getSctLeadDetailsDD({ countryId: e.countryId, sctLeadCategory: "P" });
    setFilterData({ countryId: e.countryId, sctLeadCategory: "P" });
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
  const onprojectsChange = (e) => {
    getLeadCategoryData("");
    getprojectsData(e);
    getClientsPhoneData("");
    getclientsData("");
    getempData("");
    setprojectsID(e.projectsId);
    let searchData = {
      projectsId: e.projectsId,
      sctLeadCategory: "P",
    };
    getSctLeadDetails(searchData);
    getSctLeadDetailsDD(searchData);
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

  const onStateChange = (e) => {
    getLeadCategoryData("");
    getStateData(e);
    getclientsData("");
    getClientsPhoneData("");
    getempData("");
    setStateID(e.stateId);
    let searchData = {
      projectsId: projectsId,
      stateId: e.stateId,
      sctLeadCategory: "P",
    };
    getSctLeadDetails(searchData);
    getSctLeadDetailsDD(searchData);
    setFilterData(searchData);
  };
  //   const allclient = [];
  //   //   console.log(allSctLeadsDD);
  //   allSctLeadsDD.map((clients) =>
  //     allclient.push({
  //       clientsId: clients._id,
  //       label: clients.sctCompanyName,
  //       value: clients.sctCompanyName,
  //     })
  //   );
  const [leadCategory, getLeadCategoryData] = useState();
  //   const [clientsId, getclientsIdData] = useState();
  const onLeadCategoryChange = (e) => {
    getcountryData("");
    getcountryIdData("");
    getClientsPhoneData("");
    getclientsData("");
    getempData("");
    getLeadCategoryData(e);
    if (e) {
      let searchData = {
        projectsId: projectsId,
        sctLeadsCategory: e.value,
        sctLeadCategory: "P",
      };
      getSctLeadDetails(searchData);
      setFilterData(searchData);
    }
  };
  // const [clients, getclientsData] = useState();
  // const [clientsId, getclientsIdData] = useState();
  // const onclientsChange = (e) => {
  //   // getclientsData(e);
  //   // getclientsIdData(e.clientsId);
  //   let searchData = {
  //     projectsId: projectsId,
  //     stateId: stateId,
  //     clientsId: e.clientsId,
  //     sctLeadCategory: "P",
  //   };
  //   getSctLeadDetails(searchData);
  //   setFilterData(searchData);
  // };

  const allemp = [{ empId: null, label: "All", value: null }];
  allSctLeadsEmp.map((emp) =>
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
    let searchData = {
      projectsId: projectsId,
      stateId: stateId,
      clientsId: clientsId,
      sctLeadCategory: "P",
      assignedTo: e.empId,
    };
    getSctLeadDetails(searchData);
    getSctLeadDetailsDD(searchData);
    setFilterData(searchData);
  };

  const onClickReset = () => {
    getcountryData("");
    getcountryIdData("");
    getClientsPhoneData("");
    getclientsData("");
    getempData("");
    getSctLeadDetails();
    getSctLeadDetailsDD();
    setFilterData();
    ondivcloseChange(true);
    setcolorData("");
    getprojectsData("");
    getLeadCategoryData("");
    getStateData("");
  };

  //comment
  const [count, setCount] = useState(0);

  // let count = 0;
  // if (allSctLeads.sctLeadsCategory !== "") {
  //   count = allSctLeads.length;
  // }
  // console.log("count", count);
  const allclient = [];
  allSctLeadsDD.map((clients) =>
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
    getClientsPhoneData("");
    getclientsIdData(e.clientsId);
    let searchData = {
      projectsId: projectsId,
      stateId: stateId,
      clientsId: e.clientsId,
      sctLeadCategory: "P",
    };
    getSctLeadDetails(searchData);
    setFilterData(searchData);
  };
  const allClientPhone = [];
  allSctLeadsDD &&
    allSctLeadsDD.map((clients) =>
      allClientPhone.push({
        clientsId: clients._id,
        label: clients.sctPhone1,
        value: clients.sctPhone1,
      })
    );
  const [clientsPhone, getClientsPhoneData] = useState();
  const [clientPhoneId, getClientsPhoneIdData] = useState();

  const onClientPhoneChange = (e) => {
    getClientsPhoneData(e);
    getclientsData("");
    getempData("");
    getClientsPhoneIdData(e.clientsId);
    setempID("");
    let searchData = {
      projectsId: projectsId,
      stateId: stateId,
      clientsId: e.clientsId,
      sctLeadCategory: "P",
    };
    getSctLeadDetails(searchData);
    setFilterData(searchData);
  };

  const [startclientDate1, setclientDate1] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [startclientShow1, SetstartclientShow1] = useState("");

  // const MonthYear = [
  //   { label: "January", value: 1 },
  //   { label: "Febrery", value: 2 },
  //   { label: "March", value: 3 },
  //   { label: "April", value: 4 },
  //   { label: "May", value: 5 },
  //   { label: "June", value: 6 },
  //   { label: "July", value: 7 },
  //   { label: "August", value: 8 },
  //   { label: "Septmber", value: 9 },
  //   { label: "October", value: 10 },
  //   { label: "November", value: 11 },
  //   { label: "December", value: 12 },
  // ];
  // const onDateChangesingle = (e) => {
  //   var newDate = e;
  //   var calDate = new Date(newDate);
  //   var dd1 = calDate.getDate();
  //   var mm2 = calDate.getMonth() + 1;
  //   var yyyy1 = calDate.getFullYear();
  //   if (dd1 < 10) {
  //     dd1 = "0" + dd1;
  //   }

  //   if (mm2 < 10) {
  //     mm2 = "0" + mm2;
  //   }

  //   let finalDate = dd1 + "-" + mm2 + "-" + yyyy1;
  //   SetstartclientShow1(finalDate);
  //   let last_variable = yyyy1 + "-" + mm2 + "-" + dd1;
  //   // console.log(last_variable, "last_variable");
  //   getPotentialClients({ MonthDate: last_variable });
  // };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className=" col-lg-2 col-md-11 col-sm-10 col-10">
              <h5 className="heading_color">All Sct Potentials</h5>
            </div>
            {/* <div className=" col-lg-1 col-md-11 col-sm-10 col-10 py-2">
              <DatePicker
                label="Controlled picker"
                value={startclientShow1}
                className=" form-control"
                placeholderText="dd-mm-yyyy"
                onChange={(newValue) => onDateChangesingle(newValue)}
              />
            </div> */}
            <div className="col-lg-1 col-md-6 col-sm-6 col-12 py-2">
              <Select
                name="sctProjectName"
                options={allprojects}
                isSearchable={true}
                value={projects}
                placeholder="Projects"
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
            <div className="col-lg-1 col-md-6 col-sm-6 col-12 py-2">
              <Select
                name="stateName"
                options={allstates}
                isSearchable={true}
                value={state}
                placeholder="State"
                onChange={(e) => onStateChange(e)}
              />
            </div>
            <div className=" col-lg-1 col-md-11 col-sm-10 col-10 py-2">
              <Select
                name="companyName"
                options={allclient}
                isSearchable={true}
                value={clients}
                placeholder="Select Lead"
                onChange={(e) => onclientsChange(e)}
              />
            </div>

            <div className=" col-lg-2 col-md-11 col-sm-10 col-10 py-2">
              <Select
                name="sctLeadsCategory"
                options={CategoryMethods}
                isSearchable={true}
                value={leadCategory}
                placeholder="Select Leads Category"
                onChange={(e) => onLeadCategoryChange(e)}
              />
            </div>
            <div className=" col-lg-1 col-md-11 col-sm-10 col-10 py-2">
              <Select
                name="clientPhone"
                options={allClientPhone}
                isSearchable={true}
                value={clientsPhone}
                placeholder="Phone"
                onChange={(e) => onClientPhoneChange(e)}
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
                    placeholder=" Select Emp"
                    onChange={(e) => onempChange(e)}
                  />
                </>
              ) : (
                <></>
              )}
            </div>

            <div className="col-lg-1 col-md-11 col-sm-12 col-11 py-2">
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
                        {/* <th style={{ width: "8%" }}>Website </th>
                        <th style={{ width: "8%" }}>Email</th> */}
                        {/* <th style={{ width: "8%" }}>Region</th> */}
                        {/* <th style={{ width: "8%" }}>Call Time</th> */}
                        <th style={{ width: "10%" }}>Company </th>
                        <th style={{ width: "8%" }}>State</th>
                        <th style={{ width: "8%" }}>Contact</th>
                        <th style={{ width: "8%" }}>Contact 2</th>
                        <th style={{ width: "15%" }}>Call Date & Time</th>
                        <th style={{ width: "2%" }}>Notes</th>
                        <th style={{ width: "8%" }}>Entered By</th>
                        <th style={{ width: "5%" }}>Op</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allSctLeads &&
                        allSctLeads.map((allSctLeads, idx) => {
                          var sctCallDate = "";
                          if (allSctLeads.sctCallDate) {
                            var ED = allSctLeads.sctCallDate.split(/\D/g);
                            sctCallDate = [ED[2], ED[1], ED[0]].join("-");
                          }
                          if (allSctLeads.sctLeadsCategory !== "") {
                            //setCount(idx + 1);
                            return (
                              <tr
                                key={idx}
                                className={
                                  colorData === idx
                                    ? "seletedrowcolorchange"
                                    : ""
                                }
                                onClick={() => onClickHandler(allSctLeads, idx)}
                              >
                                {/* <td>{idx + 1}</td> */}
                                {/* <td>{allSctLeads.countryName}</td> */}
                                {/* <td>
                                  {" "}
                                  <a
                                    href={allSctLeads.sctWebsite}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {allSctLeads.sctWebsite}
                                  </a>
                                </td>
                                <td>{allSctLeads.sctEmailId}</td> */}
                                {/* <td>{allSctLeads.sctCallTime}</td> */}
                                <td>{allSctLeads.sctCompanyName}</td>

                                <td>{allSctLeads.stateName}</td>
                                <td>
                                  {allSctLeads.sctcountryCode
                                    ? "+" + allSctLeads.sctcountryCode
                                    : ""}
                                  &nbsp;
                                  {allSctLeads.sctPhone1}
                                </td>
                                <td>
                                  {allSctLeads.sctPhone2 &&
                                  allSctLeads.sctcountryCode
                                    ? "+" + allSctLeads.sctcountryCode
                                    : ""}
                                  &nbsp;
                                  {allSctLeads.sctPhone2}
                                </td>
                                <td>
                                  {" "}
                                  {sctCallDate}&nbsp;{allSctLeads.sctCallTime}
                                </td>

                                <td>{allSctLeads.sctNotes}</td>
                                <td>{allSctLeads.sctLeadEnteredByName}</td>
                                <td>
                                  <img
                                    className="img_icon_size log"
                                    onClick={() => onDeactive(allSctLeads, idx)}
                                    src={require("../../static/images/delete.png")}
                                    alt="Delete Project"
                                    title="Delete Project"
                                  />{" "}
                                  &emsp;
                                  <img
                                    className="img_icon_size log"
                                    onClick={() => onUpdate(allSctLeads, idx)}
                                    src={require("../../static/images/edit_icon.png")}
                                    alt="Edit"
                                    title="Edit"
                                  />
                                </td>
                              </tr>
                            );
                          }
                        })}
                    </tbody>
                  </table>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-md-6 col-sm-11 col-11 align_right">
                    <label>No of Leads : {count}</label>
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
                    from="lead"
                    filterData={filterData}
                    showdateselectionSection={showdateselectionSection}
                    page="AllSctProspects"
                  />
                </div>
              </div>
              <div className=" col-lg-12 col-md-6 col-sm-6 col-12 card-new no_padding statusTop">
                <div
                  className="col-lg-12 col-md-12 col-sm-12 col-12 no_padding "
                  style={{ height: "37vh" }}
                >
                  <label className="sidePartHeading ">Status</label>
                  {showdateselectionSection && (
                    <AllSctStatusChange
                      leadDataVal={leadData}
                      ondivcloseChange={ondivcloseChange}
                      from={leadData.sctLeadCategory}
                      filterData={filterData}
                      page="AllSctProspects"
                    />
                  )}
                </div>
              </div>
              <div className=" col-lg-12 col-md-6 col-sm-6 col-12 card-new no_padding lastMessage">
                <div
                  className="col-lg-12 col-md-12 col-sm-12 col-12 no_padding "
                  style={{ height: "18vh" }}
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
            filterData={filterData}
          />
        </Modal.Body>
      </Modal>
      {loading && <Spinner />}
    </Fragment>
  );
};

AllSctPotentials.propTypes = {
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
  getSctLeadDetails,
  getSctLeadDetailsDD,
  getActiveCountry,
  getSctLastmessage,
  getPotentialClients,
  getActiveState,
  getProjectList,
})(AllSctPotentials);
