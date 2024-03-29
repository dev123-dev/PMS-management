import React, { Fragment, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import Spinner from "../layout/Spinner";
import Select from "react-select";
import { Link } from "react-router-dom";

import {
  getAllDctLead,
  getLastmessage,
  addImportDctLeadData,
  changeDeactivateLeadClientStatus,
} from "../../actions/dct";
import _debounce from "lodash/debounce";
import AllContacts from "./AllContacts";
import LastMessageDetails from "./LastMessageDetails";
import EditLead from "./EditLead";
import DeactiveLead from "./DeactiveLead";
import { getActiveCountry } from "../../actions/regions";
import Pagination from "../layout/Pagination";
import ClockTimeZone from "./ClockTimeZone";
import AllStatuschange from "./AllStatuschange";

const AllLeads = ({
  auth: { isAuthenticated, user, timeZone },
  dct: {
    getAllLeads,
    getAllLeadsEmp,
    getAllLeadsEnterdBy,
    dctAllLeadsCount,
    dctLeadsLoading,
    blnLeadClientDeactivated,
    lastMsg
  },
  regions: { activeCountry },
  getAllDctLead,
  addImportDctLeadData,
  getActiveCountry,
  getLastmessage,
  changeDeactivateLeadClientStatus,
}) => {
  // Pagination Initialization
  const [currentData, setCurrentData] = useState(1);
  const [dataPerPage] = useState(200); //Number of Records to Load Per Page

  const [country, setCountryData] = useState(null);
  const [emp, setEmpData] = useState(null);
  const [enteredPerson, setEnteredByData] = useState(null);
  const [filterData, setFilterData] = useState();

  var finalData = { Pagedata: 0, recPerPage: dataPerPage };

  useEffect(() => {
    getAllDctLead(finalData);
    setFilterData(finalData);
  }, []);

  useEffect(() => {
    if (colorData !== undefined && (colorData + 1) <= getAllLeads.length) {
      sethighlightTimeZone(
        getAllLeads &&
          getAllLeads.length !== 0 &&
          getAllLeads[colorData].timezone
          ? getAllLeads[colorData].timezone
          : ""
      );
    }
  }, [getAllLeads]);

  useEffect(() => {
    if (blnLeadClientDeactivated) {
      sethighlightTimeZone("");
      setcolorData();
      setShowHide({
        ...showHide,
        showdateselectionSection: false,
      });
      changeDeactivateLeadClientStatus();
    }
  }, [blnLeadClientDeactivated]);

  //Pagination Code Start
  const paginate = (nmbr) => {
    setCurrentData(nmbr);
    finalData = {
      countryId: country && country.countryId,
      clientName: txtCompName === "" ? null : txtCompName,
      assignedTo: emp && emp.empId,
      enteredBy: enteredPerson && enteredPerson.value,
      Pagedata: nmbr - 1,
      recPerPage: dataPerPage,
    };
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
        recPerPage: dataPerPage,
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
          recPerPage: dataPerPage,
        };
        getAllDctLead(finalData);
        setFilterData(finalData);
      }
    }
  }

  const [txtCompName, setTxtCompName] = useState("");
  const onClientSearch = (e) => {
    debounceFn(e, e && e.target.value, country, emp, enteredPerson); //Search for the specific client name
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

  const [Region, setShowRegion] = useState("");
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
      recPerPage: dataPerPage,
    };
    getAllDctLead(finalData);
    setFilterData(finalData);
    setShowRegion(e.value);
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
      recPerPage: dataPerPage,
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
      recPerPage: dataPerPage,
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

    setShowRegion("");
    sethighlightTimeZone("");

    finalData = {
      countryId: null,
      clientName: null,
      assignedTo: null,
      enteredBy: null,
      Pagedata: 0,
      recPerPage: dataPerPage,
    };
    getAllDctLead(finalData);
    setFilterData(finalData);
    ondivcloseChange(true);
    setcolorData();
  };

  useEffect(() => {
    getActiveCountry({ countryBelongsTo: "DCT" });
  }, [getActiveCountry]);

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
  const [colorData, setcolorData] = useState(); //Captures Row Index
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

  const getCallCategory = (category) => {
    let callCategory = "";
    if (category === "F") callCategory = "FollowUp";
    else if (category === "P") callCategory = "Prospect";
    else if (category === "TC") callCategory = "TestClient";
    else if (category === "W") callCategory = "WrongNumber";
    else if (category === "RC") callCategory = "RegularClient";
    else if (category === "IC") callCategory = "InactiveClient";
    else callCategory = "AllLeads";
    return callCategory;
  }
  console.log("colorData", colorData ? colorData : "");
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
              <ClockTimeZone
                Region={Region}
                highlightTimeZone={highlightTimeZone}
              />
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
              {dctLeadsLoading ? (
                <img
                  src={require("../../static/images/Refresh-Loader.gif")}
                  alt="Loading..."
                />
              ) : (
                <></>
              )}
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
                        {timeZone.filter((ele) => {
                          return Region === ele.value.split("-")[0] ? ele : "";
                        }).length !== 0 ? (
                          <th style={{ width: "8%" }}>Timezone</th>
                        ) : (
                          <></>
                        )}
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
                              {timeZone.filter((ele) => {
                                return Region === ele.value.split("-")[0]
                                  ? ele
                                  : "";
                              }).length !== 0 ? (
                                <td>
                                  {getAllLeads.timezone
                                    ? getAllLeads.timezone
                                    : ""}
                                </td>
                              ) : (
                                <></>
                              )}
                              <td>
                                {getAllLeads.countryCode
                                  ? "+" + getAllLeads.countryCode
                                  : ""}
                                &nbsp;
                                {getAllLeads.phone1}
                              </td>
                              <td>{callDates}</td>
                              <td>
                                {user.empCtAccess === "All" ? (
                                  <img
                                    className="img_icon_size log"
                                    onClick={() => onDeactive(getAllLeads, idx)}
                                    src={require("../../static/images/delete.png")}
                                    alt="Delete Lead"
                                    title="Delete Lead"
                                  />
                                ) : (
                                  <></>
                                )}{" "}
                                <img
                                  className="img_icon_size log"
                                  onClick={() => onUpdate(getAllLeads, idx)}
                                  src={require("../../static/images/edit_icon.png")}
                                  alt="Edit Lead"
                                  title="Edit Lead"
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
              {/* sidePartHeightLeadWrongNo */}
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
              <div className=" col-lg-12 col-md-6 col-sm-6 col-12 card-new no_padding statusTop">
                <div
                  className="col-lg-12 col-md-12 col-sm-12 col-12 no_padding "
                  style={{ height: "33vh" }}
                >
                  <label className="sidePartHeading ">Last Call Status {(lastMsg) ? " - " + getCallCategory(lastMsg.callCategory) : ""}</label>
                  {showdateselectionSection && (
                    <AllStatuschange
                      leadDataVal={leadData}
                      from={(lastMsg) ? getCallCategory(lastMsg.callCategory) : "AllLeads"}
                      ondivcloseChange={ondivcloseChange}
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
                  <label className="sidePartHeading ">Last Call History {(lastMsg) ? " - " + getCallCategory(lastMsg.callCategory) : ""}</label>
                  {showdateselectionSection && (
                    <LastMessageDetails
                      from="AllLeads"
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
  changeDeactivateLeadClientStatus,
})(AllLeads);
