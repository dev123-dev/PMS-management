import React, { Fragment, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import Spinner from "../layout/Spinner";
import Select from "react-select";
import { Link } from "react-router-dom";
import _debounce from "lodash/debounce";
import {
  getAllSctLead,
  getAllSctLeadDD,
  getSctLastmessage,
  addImportSctLeadData,
  getProjectList,
} from "../../actions/sct";
import EditSctLead from "./EditSctLead";
import DeactiveSctLead from "./DeactiveSctLead";
import SctLastMessageDetails from "./SctLastMessageDetails";
import AllSctContacts from "./AllSctContacts";
import AllSctStatusChange from "./AllSctStatusChange";
import { getActiveCountry, getActiveState } from "../../actions/regions";
import Pagination from "../layout/Pagination";

const AllSctLeads = ({
  auth: { isAuthenticated, user, users, loading },
  sct: {
    getAllSctLeads,
    getAllSctLeadsDD,
    getAllSctLeadsEmp,
    projectList,
    sctAllLeadsCount,
  },
  regions: { activeCountry, activeState },
  getAllSctLead,
  getActiveCountry,
  getActiveState,
  getAllSctLeadDD,
  getSctLastmessage,
  getProjectList,
  addImportSctLeadData,
}) => {
  // useEffect(() => {
  //   getAllSctLead();
  // }, [getAllSctLead]);
  // useEffect(() => {
  //   getAllSctLeadDD({ projectsId: projectsId, Pagedata: 0, recPerPage: 200 });
  // }, [getAllSctLeadDD]);
  useEffect(() => {
    getActiveCountry({ countryBelongsTo: "SCT" });
  }, [getActiveCountry]);
  useEffect(() => {
    getActiveState({ countryBelongsTo: "SCT" });
  }, [getActiveState]);
  useEffect(() => {
    getProjectList({});
  }, [getProjectList]);
  // comment
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

  const [country, getcountryData] = useState();
  const [countryId, getcountryIdData] = useState(null);

  const allcountry = [];
  activeCountry.map((country) =>
    allcountry.push({
      countryId: country._id,
      label: country.countryName,
      value: country.countryName,
    })
  );

  // const oncountryChange = (e) => {
  //   getcountryData(e);
  //   getclientsData("");
  //   getempData("");
  //   getcountryIdData(e.countryId);
  //   let searchData = {
  //     projectsId: projectsId,
  //     countryId: e.countryId,
  //     stateId: stateId,
  //     clientsId: clientsId,
  //     assignedTo: empId,
  //   };
  //   getAllSctLead(searchData);
  //   getAllSctLeadDD(searchData);
  //   setFilterData(searchData);
  // };

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
    getprojectsData(e);
    getclientsData("");
    getClientsNameData("");
    getClientsPhoneData("");
    getempData("");
    setprojectsID(e.projectsId);
    let searchData = {
      projectsId: e.projectsId,
      countryId: countryId,
      stateId: stateId,
      clientsId: clientsId,
      assignedTo: empId,
    };
    getAllSctLead(searchData);
    // getAllSctLeadDD(searchData);
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
    getStateData(e);
    getclientsData("");
    getclientsIdData("");
    getClientsNameData("");
    getClientsNameIdData("");
    getClientsPhoneData("");
    getClientsNameIdData("");
    getempData("");
    setempID("");
    setStateID(e.stateId);
    let searchData = {
      projectsId: projectsId,
      countryId: countryId,
      stateId: e.stateId,
      assignedTo: empId,
    };
    getAllSctLead(searchData);
    // getAllSctLeadDD(searchData);
    setFilterData(searchData);
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
  const [clientsId, getclientsIdData] = useState();

  const onclientsChange = (e) => {
    getClientsNameData("");
    getClientsPhoneData("");
    getclientsData(e);
    getclientsIdData(e.clientsId);
    setempID("");
    let searchData = {
      projectsId: projectsId,
      countryId: countryId,
      stateId: stateId,
      clientsId: e.clientsId,
    };
    getAllSctLead(searchData);
    setFilterData(searchData);
  };

  const allClientName = [];
  getAllSctLeadsDD &&
    getAllSctLeadsDD.map((clients) =>
      allClientName.push({
        clientsId: clients._id,
        label: clients.sctClientName,
        value: clients.sctClientName,
      })
    );

  const [clientsName, getClientsNameData] = useState();
  const [clientsNameId, getClientsNameIdData] = useState();

  const onClientNameChange = (e) => {
    getclientsData("");
    getClientsPhoneData("");
    getClientsNameData(e);
    getClientsNameIdData(e.clientsId);
    setempID("");
    let searchData = {
      projectsId: projectsId,
      countryId: countryId,
      stateId: stateId,
      clientsId: e.clientsId,
    };
    getAllSctLead(searchData);
    setFilterData(searchData);
  };

  const allClientPhone = [];
  getAllSctLeadsDD &&
    getAllSctLeadsDD.map((clients) =>
      allClientPhone.push({
        clientsId: clients._id,
        label: clients.sctPhone1,
        value: clients.sctPhone1,
      })
    );
  const [clientsPhone, getClientsPhoneData] = useState();
  const [clientsPhoneId, getClientsPhoneIdData] = useState();
  const onClientPhoneChange = (e) => {
    getclientsData("");
    getClientsNameData("");
    getClientsPhoneData(e);
    getClientsPhoneIdData(e.clientsId);
    setempID("");
    let searchData = {
      projectsId: projectsId,
      countryId: countryId,
      stateId: stateId,
      clientsId: e.clientsId,
    };
    getAllSctLead(searchData);
    setFilterData(searchData);
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
    let searchData = {
      projectsId: projectsId,
      countryId: countryId,
      stateId: stateId,
      clientsId: clientsId,
      assignedTo: e.empId,
    };
    getAllSctLead(searchData);
    // getAllSctLeadDD(searchData);
    setFilterData(searchData);
  };

  const onClickReset = () => {
    getAllSctLead();
    getcountryData("");
    getcountryIdData("");
    getclientsData("");
    getClientsNameData("");
    getClientsPhoneData("");
    getempData("");
    // getAllSctLeadDD();
    setprojectsID("");
    setStateID("");
    setFilterData();
    ondivcloseChange(true);
    setcolorData("");
    getprojectsData("");
    getStateData("");
  };

  const [showPathSettingModal, setShowPathModal] = useState(false);
  const handleShowPathModalClose = () => setShowPathModal(false);
  const onClickImport = () => {
    setShowPathModal(true);
  };

  const [formData, setFormData] = useState({
    batchCsvPath: "",
    isSubmitted: false,
  });

  const { batchCsvPath } = formData;

  const handleFile = (e) => {
    setFormData({
      ...formData,
      batchCsvPath: e.target.files[0].name,
    });
  };

  const onFileUpload = (e) => {
    e.preventDefault();
    const finalData = {
      filePathName: batchCsvPath,
    };
    addImportSctLeadData(finalData);
    handleShowPathModalClose();
  };

  //pagination code//////////////////////////////////
  const [currentData, setCurrentData] = useState(1);
  const [dataPerPage] = useState(200);

  const paginate = (nmbr) => {
    setCurrentData(nmbr);
  };

  useEffect(() => {
    getAllSctLead({
      Pagedata: currentData - 1,
      recPerPage: 200,
      projectsId: projectsId,
    });
  }, [currentData]);

  //End Pageinate
  useEffect(() => {}, [isAuthenticated, user, users]);

  ////////////// Phone srch
  const debounceFnPhone = useCallback(
    _debounce(handleDebounceFnPhone, 1000),
    []
  );

  function handleDebounceFnPhone(val, stateId, projectsId) {
    getAllSctLead({
      stateId: stateId,
      phone: val,
      projectsId: projectsId,
    });
  }

  const onPhoneSreach = (e) => {
    debounceFnPhone(e.target.value, stateId, projectsId);
  };

  /////////////////////////// Lead srch on type

  const debounceFnName = useCallback(_debounce(handleDebounceFnName, 1000), []);

  function handleDebounceFnName(val, stateId, projectsId) {
    getAllSctLead({
      stateId: stateId,
      clientName: val,
      projectsId: projectsId,
    });
  }

  const onclientsearch = (e) => {
    debounceFnName(e.target.value, stateId, projectsId);
  };

  /////////////////////

  //|| !users
  return !isAuthenticated || !user ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className=" col-lg-1 col-md-11 col-sm-10 col-10">
              <h4 className="heading_color">All Leads</h4>
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
                placeholder=" Project"
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
              {/* <Select
                name="companyName"
                options={allclient}
                isSearchable={true}
                value={clients}
                placeholder="Lead"
                onChange={(e) => onclientsChange(e)}
              /> */}

              <input
                type="text"
                name="companyName"
                placeholder="Leads"
                className="form-control"
                onChange={(e) => onclientsearch(e)}
              />
            </div>
            <div className=" col-lg-1 col-md-11 col-sm-10 col-10 py-2">
              <Select
                name="clientName"
                options={allClientName}
                isSearchable={true}
                value={clientsName}
                placeholder=" Client"
                onChange={(e) => onClientNameChange(e)}
              />
            </div>
            <div className=" col-lg-2 col-md-11 col-sm-10 col-10 py-2">
              {/* <Select
                name="clientPhone"
                options={allClientPhone}
                isSearchable={true}
                value={clientsPhone}
                placeholder=" Phone"
                onChange={(e) => onClientPhoneChange(e)}
              /> */}
              <input
                type="text"
                name="clientPhone"
                placeholder="Phone Number"
                className="form-control"
                onChange={(e) => onPhoneSreach(e)}
              />
            </div>
            <div className="col-lg-1 col-md-11 col-sm-10 col-10 py-2">
              {(user.userGroupName && user.userGroupName === "Administrator") ||
              user.userGroupName === "Super Admin" ||
              user.empCtAccess === "All" ? (
                <>
                  <Select
                    name="empFullName"
                    options={allemp}
                    isSearchable={true}
                    value={emp}
                    placeholder="Employee"
                    onChange={(e) => onempChange(e)}
                  />
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="col-lg-3 col-md-11 col-sm-12 col-11 py-2">
              <button
                className="btn btn_green_bg float-right"
                onClick={() => onClickReset()}
              >
                Refresh
              </button>
              {user.userGroupName && user.userGroupName === "Super Admin" && (
                <button
                  className="btn btn_green_bg float-right"
                  onClick={() => onClickImport()}
                >
                  Import
                </button>
              )}

              <Link className="btn btn_green_bg float-right" to="/add-sct-lead">
                Add Lead
              </Link>
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
                        {/* <th style={{ width: "10%" }}>Website </th> */}
                        {/* <th style={{ width: "10%" }}>Email</th> */}
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
                              {/* <td>{idx + 1}</td> */}
                              {/* <td>
                                <a
                                  href={getAllSctLeads.sctWebsite}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {getAllSctLeads.sctWebsite}
                                </a>
                              </td> */}
                              {/* <td>{getAllSctLeads.sctEmailId}</td> */}
                              {/* <td>{getAllSctLeads.countryName}</td> */}
                              {/* <td>{getAllSctLeads.sctCallTime}</td> */}
                              <td>{getAllSctLeads.sctCompanyName}</td>
                              <td>{getAllSctLeads.stateName}</td>
                              <td>
                                {getAllSctLeads.sctcountryCode
                                  ? "+" + getAllSctLeads.sctcountryCode
                                  : ""}
                                &nbsp;
                                {getAllSctLeads.sctPhone1}
                              </td>
                              <td>
                                {getAllSctLeads.sctPhone2 &&
                                getAllSctLeads.sctcountryCode
                                  ? "+" + getAllSctLeads.sctcountryCode
                                  : ""}
                                &nbsp;
                                {getAllSctLeads.sctPhone2}
                              </td>
                              <td>
                                {sctCallDate}&nbsp;{getAllSctLeads.sctCallTime}
                              </td>
                              <td>{getAllSctLeads.sctNotes}</td>
                              <td>{getAllSctLeads.sctLeadEnteredByName}</td>
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
                  <div className="col-lg-6 col-md-6 col-sm-11 col-11 no_padding">
                    {getAllSctLeads && getAllSctLeads.length !== 0 ? (
                      <Pagination
                        dataPerPage={dataPerPage}
                        totalData={sctAllLeadsCount}
                        paginate={paginate}
                        currentPage={currentData}
                      />
                    ) : (
                      <Fragment />
                    )}
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-11 col-11 align_right">
                    No of Leads : {sctAllLeadsCount}
                  </div>
                </div>
                {/* <div className="row">
                  <div className="col-lg-12 col-md-6 col-sm-11 col-11 align_right">
                    <label>
                      No of Leads : {getAllSctLeads && getAllSctLeads.length}
                    </label>
                  </div>
                </div> */}
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
                    page="AllLeads"
                  />
                </div>
              </div>
              <div className=" col-lg-12 col-md-6 col-sm-6 col-12 card-new no_padding statusTop">
                <div
                  className="col-lg-12 col-md-12 col-sm-12 col-12 no_padding "
                  style={{ height: "39vh" }}
                >
                  <label className="sidePartHeading ">&nbsp;&nbsp;Status</label>
                  {showdateselectionSection && (
                    <AllSctStatusChange
                      leadDataVal={leadData}
                      ondivcloseChange={ondivcloseChange}
                      from={leadData.dctLeadCategory}
                      filterData={filterData}
                      page="AllLeads"
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
                    &nbsp;&nbsp; Last Message Details
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
            ondivcloseChange={ondivcloseChange}
            onDeactiveModalChange={onDeactiveModalChange}
            Leaddeavtivedata={userDatadeactive}
            filterData={filterData}
          />
        </Modal.Body>
      </Modal>
      <Modal
        show={showPathSettingModal}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <div className="col-lg-10">
            <h3 className="modal-title text-center">Import Lead Details</h3>
          </div>
          <div className="col-lg-2">
            <button onClick={handleShowPathModalClose} className="close">
              <img
                src={require("../../static/images/close.png")}
                alt="X"
                style={{ height: "20px", width: "20px" }}
              />
            </button>
          </div>
        </Modal.Header>
        <form className="row" onSubmit={(e) => onFileUpload(e)}>
          <Modal.Body>
            <input
              type="file"
              accept=".csv"
              id="photo"
              className="visually-hidden"
              onChange={handleFile}
              required
            />

            <input
              type="submit"
              name="Submit"
              value="Submit"
              className="btn sub_form btn_continue blackbrd Save float-right"
            />
          </Modal.Body>
        </form>
      </Modal>
      {loading && <Spinner />}
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
  getActiveState,
  getSctLastmessage,
  addImportSctLeadData,
  getProjectList,
})(AllSctLeads);
