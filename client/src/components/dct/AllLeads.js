import React, { Fragment, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import Spinner from "../layout/Spinner";
import Select from "react-select";
import { Link } from "react-router-dom";
import Clock from "react-live-clock";
import {
  getAllDctLead,
  getLastmessage,
  addImportDctLeadData,
} from "../../actions/dct";
import _debounce from "lodash/debounce";
import AllContacts from "./AllContacts";
import LastMessageDetails from "./LastMessageDetails";
import EditLead from "./EditLead";
import DeactiveLead from "./DeactiveLead";
import { getActiveCountry } from "../../actions/regions";
import Pagination from "../layout/Pagination";

const AllLeads = ({
  auth: { isAuthenticated, user, users },
  dct: {
    getAllLeads,
    getAllLeadsEmp,
    getAllLeadsEnterdBy,
    dctAllLeadsCount,
    dctLeadsLoading
  },
  regions: { activeCountry },
  getAllDctLead,
  addImportDctLeadData,
  getActiveCountry,
  getLastmessage,
}) => {
  // Pagination Initialization
  const [currentData, setCurrentData] = useState(1);
  const [dataPerPage] = useState(200);  //Number of Records to Load Per Page

  const [country, setCountryData] = useState(null);
  const [emp, setEmpData] = useState(null);
  const [enteredPerson, setEnteredByData] = useState(null);
  const [filterData, setFilterData] = useState();

  var finalData = { Pagedata: 0, recPerPage: dataPerPage };

  useEffect(() => {
    getAllDctLead(finalData);
    setFilterData(finalData);
  }, []);

  //Pagination Code Start 
  const paginate = (nmbr) => {
    setCurrentData(nmbr);
    finalData = {
      countryId: country && country.countryId,
      clientName: txtCompName === "" ? null : txtCompName,
      assignedTo: emp && emp.empId,
      enteredBy: enteredPerson && enteredPerson.value,
      Pagedata: nmbr - 1,
      recPerPage: dataPerPage
    }
    getAllDctLead(finalData);
    setFilterData(finalData);
  };
  //Pagination Code Ends

  // Handles Client Search on every Key Stroke
  const debounceFn = useCallback(_debounce(handleDebounceFn, 1000), []);

  function handleDebounceFn(e, val, country, emp, enteredPerson) {
    if (val) {
      setCurrentData(1);
      finalData = {
        countryId: country && country.countryId,
        clientName: val,
        assignedTo: emp && emp.empId,
        enteredBy: enteredPerson && enteredPerson.value,
        Pagedata: 0,
        recPerPage: dataPerPage
      };
      getAllDctLead(finalData);
      setFilterData(finalData);
    } else {
      if (e) {
        setCurrentData(1);
        finalData = {
          countryId: country && country.countryId,
          clientName: "",
          assignedTo: emp && emp.empId,
          enteredBy: enteredPerson && enteredPerson.value,
          Pagedata: 0,
          recPerPage: dataPerPage
        };
        getAllDctLead(finalData);
        setFilterData(finalData);
      }
    }
  }

  const [txtCompName, setTxtCompName] = useState("");
  const onClientSearch = (e) => {
    debounceFn(e, e && e.target.value, country, emp, enteredPerson);  //Search for the specific client name
    setTxtCompName(e && e.target.value);
  };

  // Capture Change In Country  
  const allcountry = [];
  activeCountry.map((country) =>
    allcountry.push({
      countryId: country._id,
      label: country.countryName,
      value: country.countryName,
    })
  );

  const oncountryChange = (e) => {
    //Empty all Company Name, Employee, Entered By data
    setEnteredByData("");
    setEmpData("");
    setTxtCompName("");
    //Empty all Company Name, Employee, Entered By data

    setCountryData(e);
    setCurrentData(1);
    finalData = {
      clientName: null,
      assignedTo: null,
      enteredBy: null,
      countryId: e && e.countryId,
      Pagedata: 0,
      recPerPage: dataPerPage
    };
    getAllDctLead(finalData);
    setFilterData(finalData);

    if (e.value === "US") {
      setShowHide1({
        ...showHide1,
        showUSSection: true,
        showAUDSection: false,
        showUKSection: false,
      });
    } else if (e.value === "AUS") {
      setShowHide1({
        ...showHide1,
        showUSSection: false,
        showAUDSection: true,
        showUKSection: false,
      });
    } else if (e.value === "UK") {
      setShowHide1({
        ...showHide1,
        showUSSection: false,
        showAUDSection: false,
        showUKSection: true,
      });
    } else {
      setShowHide1({
        ...showHide1,
        showUSSection: false,
        showAUDSection: false,
        showUKSection: false,
      });
    }
  };
  // End Capture Change In Country

  const allemp = [];
  getAllLeadsEmp.map((emp) =>
    allemp.push({
      empId: emp._id,
      label: emp.dctLeadAssignedToName,
      value: emp.dctLeadAssignedToName,
    })
  );

  const onEmpChange = (e) => {
    setCurrentData(1);
    setEmpData(e);
    finalData = {
      countryId: country && country.countryId,
      clientName: txtCompName === "" ? null : txtCompName,
      assignedTo: e && e.empId,
      enteredBy: enteredPerson && enteredPerson.value,
      Pagedata: 0,
      recPerPage: dataPerPage
    };
    getAllDctLead(finalData);
    setFilterData(finalData);
  };

  const allEnteredBy = [];
  getAllLeadsEnterdBy.map((enterdBy) =>
    allEnteredBy.push({
      label: enterdBy,
      value: enterdBy,
    })
  );

  const onEnteredByChange = (e) => {
    setCurrentData(1);
    setEnteredByData(e);
    finalData = {
      countryId: country && country.countryId,
      clientName: txtCompName === "" ? null : txtCompName,
      assignedTo: emp & emp.empId,
      enteredBy: e && e.value,
      Pagedata: 0,
      recPerPage: dataPerPage
    };
    getAllDctLead(finalData);
    setFilterData(finalData);
  };

  const onClickReset = () => {
    setTxtCompName("");
    onClientSearch("");
    setEmpData(null);
    setCountryData(null);
    setEnteredByData(null);
    setCurrentData(1);
    finalData = {
      countryId: null,
      clientName: null,
      assignedTo: null,
      enteredBy: null,
      Pagedata: 0,
      recPerPage: dataPerPage
    };
    getAllDctLead(finalData);
    setFilterData(finalData);

    setShowHide1(false);
    ondivcloseChange(true);
    setcolorData("");
  };

  useEffect(() => {
    getActiveCountry({ countryBelongsTo: "DCT" });
  }, [getActiveCountry]);

  const [showHide1, setShowHide1] = useState({
    showUSSection: false,
    showAUDSection: false,
    showUKSection: false,
  });

  const { showUSSection, showAUDSection, showUKSection } = showHide1;

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
  const onUpdate = (getAllLeads, idx) => {
    setShowEditModal(true);
    setUserDatas(getAllLeads);
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

  const [highlightTimeZone, sethighlightTimeZone] = useState("");
  const onClickHandler = (getAllLeads, idx) => {
    sethighlightTimeZone(
      getAllLeads.timezone && getAllLeads.timezone !== ""
        ? getAllLeads.timezone
        : ""
    );
    setcolorData(idx);
    //console.log("Get Selected Leads", getAllLeads);
    setLeadData(getAllLeads);
    const searchData = {
      callToId: getAllLeads._id,
    };
    setsearchDataVal(searchData);
    getLastmessage(searchData);
    setShowHide({
      ...showHide,
      showdateselectionSection: true,
    });
  };

  const ondivcloseChange = (e) => {
    if (e) {
      handledivModalClose();
    }
  };

  const handledivModalClose = () => setShowHide(false);

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
    addImportDctLeadData(finalData);
    handleShowPathModalClose();
  };

  return !isAuthenticated || !user ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align_CT ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div
              className="row col-lg-12 col-md-11 col-sm-10 col-10"
              style={{ minHeight: "54px" }}
            >
              {showUSSection && (
                <h6>
                  PST :&nbsp;
                  <Clock
                    style={
                      highlightTimeZone && highlightTimeZone === "PST"
                        ? { backgroundColor: "yellow" }
                        : { backgroundColor: "white" }
                    }
                    ticking={true}
                    timezone={"US/Pacific"}
                    format={"DD/MM/YYYY, h:mm:ss a"}
                  />
                  &emsp;&emsp; MST :
                  <Clock
                    style={
                      highlightTimeZone && highlightTimeZone === "MST"
                        ? { backgroundColor: "yellow" }
                        : { backgroundColor: "white" }
                    }
                    ticking={true}
                    timezone={"US/Mountain"}
                    format={" DD/MM/YYYY, h:mm:ss a"}
                  />{" "}
                  &emsp;&emsp; EST :
                  <Clock
                    style={
                      highlightTimeZone && highlightTimeZone === "EST"
                        ? { backgroundColor: "yellow" }
                        : { backgroundColor: "white" }
                    }
                    ticking={true}
                    timezone={"US/Eastern"}
                    format={" DD/MM/YYYY, h:mm:ss a"}
                  />{" "}
                  &emsp;&emsp; CST :
                  <Clock
                    style={
                      highlightTimeZone && highlightTimeZone === "CST"
                        ? { backgroundColor: "yellow" }
                        : { backgroundColor: "white" }
                    }
                    ticking={true}
                    timezone={"US/Central"}
                    format={" DD/MM/YYYY, h:mm:ss a"}
                  />
                </h6>
              )}
              {showAUDSection && (
                <h6>
                  Sydney :
                  <Clock
                    style={
                      highlightTimeZone && highlightTimeZone === "Sydney"
                        ? { backgroundColor: "yellow" }
                        : { backgroundColor: "white" }
                    }
                    ticking={true}
                    timezone={"Australia/Sydney"}
                    format={" DD/MM/YYYY, h:mm:ss a"}
                  />
                  &emsp; &emsp;Perth :
                  <Clock
                    style={
                      highlightTimeZone && highlightTimeZone === "Perth"
                        ? { backgroundColor: "yellow" }
                        : { backgroundColor: "white" }
                    }
                    ticking={true}
                    timezone={"Australia/Perth"}
                    format={" DD/MM/YYYY, h:mm:ss a"}
                  />
                </h6>
              )}
              {showUKSection && (
                <h6>
                  UK :
                  <Clock
                    ticking={true}
                    timezone={"Europe/London"}
                    format={" DD/MM/YYYY, h:mm:ss a"}
                  />
                </h6>
              )}
            </div>
            <div className=" col-lg-1 col-md-11 col-sm-10 col-10 ">
              <h4 className="heading_color">All Leads</h4>
            </div>
            <div className=" col-lg-2 col-md-11 col-sm-10 col-10 py-2">
              <Select
                name="countryName"
                options={allcountry}
                isSearchable={true}
                value={country}
                placeholder="Select Country"
                onChange={(e) => oncountryChange(e)}
              />
            </div>

            <div className=" col-lg-2 col-md-11 col-sm-10 col-10 py-2">
              <input
                type="Text"
                value={txtCompName}
                placeholder="Type Company Name"
                name="companyName"
                autoComplete="off"
                className="form-control shadow-none"
                onChange={(e) => onClientSearch(e)}
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
                    placeholder="Select Employee"
                    onChange={(e) => onEmpChange(e)}
                  />
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="col-lg-2 col-md-11 col-sm-10 col-10 py-2 ">
              {(user.userGroupName && user.userGroupName === "Administrator") ||
                user.userGroupName === "Super Admin" ||
                user.empCtAccess === "All" ? (
                <>
                  <Select
                    name="enteredByFullName"
                    options={allEnteredBy}
                    isSearchable={true}
                    value={enteredPerson}
                    placeholder="Select Entered By"
                    onChange={(e) => onEnteredByChange(e)}
                  />
                </>
              ) : (
                <></>
              )}
            </div>

            <div className="col-lg-3 col-md-11 col-sm-12 col-11 py-2 align_right">
              {
                dctLeadsLoading ? (<img
                  src={require("../../static/images/Refresh-Loader.gif")}
                  alt="Loading..." />) : (<></>)
              }
              {user.userGroupName && user.userGroupName === "Super Admin" && (
                <button
                  className="btn btn_green_bg "
                  onClick={() => onClickImport()}
                >
                  Import
                </button>
              )}

              <Link className="btn btn_green_bg " to="/add-lead">
                Add Lead
              </Link>
              <button
                className="btn btn_green_bg "
                onClick={() => onClickReset()}
              >
                {dctLeadsLoading ? "Loading" : "Refresh"}
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 col-md-12 col-sm-12 col-12 text-center">
              <section className="body">
                <div className=" body-inner no-padding table-responsive fixTableHeadCT">
                  <table
                    className="table table-bordered table-striped hoverrow smll_row"
                    id="datatable2"
                  >
                    <thead>
                      <tr>
                        <th style={{ width: "15%" }}>Company </th>
                        <th style={{ width: "13%" }}>Website </th>
                        <th style={{ width: "11%" }}>Email</th>
                        <th style={{ width: "8%" }}>Region</th>
                        <th style={{ width: "13%" }}>Contact</th>
                        <th style={{ width: "10%" }}>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CallDate&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </th>
                        <th style={{ width: "5%" }}>Operation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getAllLeads &&
                        getAllLeads.map((getAllLeads, idx) => {
                          var callDates = "";
                          if (getAllLeads.dctCallDate) {
                            var ED = getAllLeads.dctCallDate.split(/\D/g);
                            callDates = [ED[2], ED[1], ED[0]].join("-");
                          }
                          return (
                            <tr
                              key={idx}
                              className={
                                colorData === idx ? "seletedrowcolorchange" : ""
                              }
                              onClick={() => onClickHandler(getAllLeads, idx)}
                            >
                              {/* <td>{idx + 1}</td> */}
                              <td>{getAllLeads.companyName}</td>
                              <td>
                                <a
                                  href={getAllLeads.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {getAllLeads.website}
                                </a>
                              </td>
                              <td>{getAllLeads.emailId}</td>
                              <td>{getAllLeads.countryName}</td>
                              <td>
                                {getAllLeads.countryCode
                                  ? "+" + getAllLeads.countryCode
                                  : ""}
                                &nbsp;
                                {getAllLeads.phone1}
                              </td>
                              <td>{callDates}</td>
                              <td>
                                <img
                                  className="img_icon_size log"
                                  onClick={() => onDeactive(getAllLeads, idx)}
                                  src={require("../../static/images/delete.png")}
                                  alt="Delete Project"
                                  title="Delete Project"
                                />{" "}
                                <img
                                  className="img_icon_size log"
                                  onClick={() => onUpdate(getAllLeads, idx)}
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
                    {getAllLeads && getAllLeads.length !== 0 ? (
                      <Pagination
                        dataPerPage={dataPerPage}
                        totalData={dctAllLeadsCount}
                        paginate={paginate}
                        currentPage={currentData}
                      />
                    ) : (
                      <Fragment />
                    )}
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-11 col-11 align_right">
                    No of Leads : {dctAllLeadsCount}
                  </div>
                </div>
              </section>
            </div>
            <div className="row col-lg-4 col-md-12 col-sm-12 col-12 fixTableHead">
              <div className=" col-lg-12 col-md-6 col-sm-6 col-12 card-new no_padding sidePartHeight">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12 no_padding ">
                  <AllContacts
                    leadDataVal={leadData}
                    ondivcloseChange={ondivcloseChange}
                    from="AllLeads"
                    filterData={filterData}
                    showdateselectionSection={showdateselectionSection}
                  />
                </div>
              </div>
              <div className=" col-lg-12 col-md-6 col-sm-6 col-12 card-new no_padding lastMessage">
                <div
                  className="col-lg-12 col-md-12 col-sm-12 col-12 no_padding "
                  style={{ height: "17vh" }}
                >
                  <label className="sidePartHeading ">
                    Last Call History
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
            from="AllLeads"
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
          <DeactiveLead
            from="AllLeads"
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
        size="m"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <div className="col-lg-10">
            <h3 className="modal-title text-center">Import DCT Leads</h3>
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
    </Fragment>
  );
};

AllLeads.propTypes = {
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
  getAllDctLead,
  getActiveCountry,
  getLastmessage,
  addImportDctLeadData,
})(AllLeads);
