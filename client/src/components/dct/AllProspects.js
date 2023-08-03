import React, { Fragment, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import Spinner from "../layout/Spinner";
import Select from "react-select";
import {
  getDctLeadDetails,
  getLastmessage,
  changeDeactivateLeadClientStatus
} from "../../actions/dct";
import AllContacts from "./AllContacts";
import AllStatuschange from "./AllStatuschange";
import LastMessageDetails from "./LastMessageDetails";
import EditLead from "./EditLead";
import DeactiveLead from "./DeactiveLead";
import { getActiveCountry } from "../../actions/regions";
import ClockTimeZone from "./ClockTimeZone";

const AllProspects = ({
  auth: { isAuthenticated, user, timeZone },
  dct: { allLeads, allLeadsEmp, allLeadsEnterdBy, dctLeadsLoading, blnLeadClientDeactivated },
  regions: { activeCountry },
  getDctLeadDetails,
  getActiveCountry,
  getLastmessage,
  changeDeactivateLeadClientStatus
}) => {
  useEffect(() => {
    getDctLeadDetails({ dctLeadCategory: "P" });
  }, [getDctLeadDetails]);

  useEffect(() => {
    getActiveCountry({ countryBelongsTo: "DCT" });
  }, [getActiveCountry]);

  // Create a ref for the selected row
  const selectedRowRef = useRef(null);

  // Function to scroll the selected row into view
  const scrollToSelectedRow = () => {
    if (selectedRowRef.current) {
      selectedRowRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'start' });
    }
  };

  useEffect(() => {
    if (colorData !== undefined && (colorData + 1) <= allLeads.length) {
      sethighlightTimeZone(allLeads && allLeads.length !== 0 && allLeads[colorData].timezone ? allLeads[colorData].timezone : "");
      scrollToSelectedRow();
    }
    else {
      sethighlightTimeZone("");
    }
  }, [allLeads]);

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

  const [filterData, setFilterData] = useState({ dctLeadCategory: "P" });

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
  const [highlightTimeZone, sethighlightTimeZone] = useState("");
  const onClickHandler = (allLeads, idx) => {
    sethighlightTimeZone(
      allLeads.timezone && allLeads.timezone !== ""
        ? allLeads.timezone
        : ""
    );
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

  const ondivcloseChange = (e) => {
    if (e) {
      handledivModalClose();
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

  //to hide and unide the timezones according to region selected
  const [Region, setShowRegion] = useState("");
  const oncountryChange = (e) => {
    getEnterByData("");
    setShowRegion(e.value);
    getcountryData(e);
    getclientsData("");
    getempData("");
    getcountryIdData(e.countryId);
    getDctLeadDetails({ countryId: e.countryId, dctLeadCategory: "P" });
    setFilterData({ countryId: e.countryId, dctLeadCategory: "P" });
  };

  const allclient = [];
  allLeads.map((clients) =>
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
      dctLeadCategory: "P",
    });
    setFilterData({
      countryId: countryId,
      clientsId: e.clientsId,
      dctLeadCategory: "P",
    });
  };

  const allemp = [];
  allLeadsEmp.map((emp) =>
    allemp.push({
      empId: emp._id,
      label: emp.dctLeadAssignedToName,
      value: emp.dctLeadAssignedToName,
    })
  );

  const [emp, getempData] = useState();
  const [empId, setempID] = useState();
  const onempChange = (e) => {
    getEnterByData("");
    getempData(e);
    setempID(e.empId);
    getDctLeadDetails({
      countryId: countryId,
      clientsId: clients ? clients.clientsId : null,
      assignedTo: e.empId,
      dctLeadCategory: "P",
    });

    setFilterData({
      countryId: countryId,
      clientsId: clients ? clients.clientsId : null,
      assignedTo: e.empId,
      dctLeadCategory: "P",
    });
  };

  const allEnteredBy = [];
  allLeadsEnterdBy.map((enterdBy) =>
    allEnteredBy.push({
      label: enterdBy,
      value: enterdBy,
    })
  );
  const [enterBy, getEnterByData] = useState();
  const onEnteredByChange = (e) => {
    getEnterByData(e);
    getDctLeadDetails({
      countryId: countryId,
      clientsId: clients ? clients.clientsId : null,
      assignedTo: empId,
      dctLeadCategory: "P",
      enteredBy: e.value,
    });
    setFilterData({
      countryId: countryId,
      clientsId: clients ? clients.clientsId : null,
      assignedTo: empId,
      enteredBy: e.value,
      dctLeadCategory: "P",
    });
  };

  const onClickReset = () => {
    getcountryData("");
    getcountryIdData("");
    getclientsData("");
    getEnterByData("");
    getempData("");
    getDctLeadDetails({ dctLeadCategory: "P" });

    setShowRegion("");
    sethighlightTimeZone("");

    setFilterData({ dctLeadCategory: "P" });
    ondivcloseChange(true);
    setcolorData();
    selectedRowRef.current = null;
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
              <ClockTimeZone
                Region={Region}
                highlightTimeZone={highlightTimeZone}
              />

            </div>

            <div className=" col-lg-1 col-md-11 col-sm-10 col-10">
              <h4 className="heading_color">All Prospects</h4>
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
            <div className=" col-lg-2 col-md-11 col-sm-10 col-10 py-2">
              {(user.userGroupName && user.userGroupName === "Administrator") ||
                user.userGroupName === "Super Admin" ||
                user.empCtAccess === "All" ? (
                // <div className=" col-lg-4 col-md-11 col-sm-10 col-10 py-2">
                <Select
                  name="empFullName"
                  options={allemp}
                  isSearchable={true}
                  value={emp}
                  placeholder="Select Employee"
                  onChange={(e) => onempChange(e)}
                />
              ) : (
                // </div>
                <></>
              )}
            </div>
            <div className="col-lg-2 col-md-11 col-sm-10 col-10 py-2">
              {(user.userGroupName && user.userGroupName === "Administrator") ||
                user.userGroupName === "Super Admin" ||
                user.empCtAccess === "All" ? (
                <>
                  <Select
                    name="enteredByFullName"
                    options={allEnteredBy}
                    isSearchable={true}
                    value={enterBy}
                    placeholder="Select Entered By"
                    onChange={(e) => onEnteredByChange(e)}
                  />
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="col-lg-3 col-md-11 col-sm-12 col-11 py-2">
              {
                dctLeadsLoading ? (<img
                  src={require("../../static/images/Refresh-Loader.gif")}
                  alt="Loading..." />) : (<></>)
              }
              <button
                className="btn btn_green_bg float-right"
                onClick={() => onClickReset()}
              >
                {
                  dctLeadsLoading ? "Loading" : "Refresh"
                }
              </button>
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
                        <th style={{ width: "13%" }}>Website </th>
                        <th style={{ width: "11%" }}>Email</th>
                        <th style={{ width: "8%" }}>Region</th>
                        {(timeZone.filter((ele) => {
                          return Region === ele.value.split('-')[0] ? ele : ""
                        }).length !== 0) ? (<th style={{ width: "8%" }}>Timezone</th>) : (<></>)
                        }
                        <th style={{ width: "13%" }}>Contact</th>
                        <th style={{ width: "10%" }}>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CallDate&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </th>
                        <th style={{ width: "5%" }}>Operation</th>
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
                              ref={colorData == idx ? selectedRowRef : null}
                              onClick={() => onClickHandler(allLeads, idx)}
                            >
                              <td>{idx + 1}</td>
                              <td>{allLeads.companyName}</td>
                              <td>
                                {" "}
                                <a
                                  href={allLeads.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {allLeads.website}
                                </a>
                              </td>
                              <td>{allLeads.emailId}</td>
                              <td>{allLeads.countryName}</td>
                              {(timeZone.filter((ele) => {
                                return Region === ele.value.split('-')[0] ? ele : ""
                              }).length !== 0) ? (<td>{allLeads.timezone ? allLeads.timezone : ""}</td>) : (<></>)
                              }
                              <td>
                                {allLeads.countryCode
                                  ? "+" + allLeads.countryCode
                                  : ""}
                                &nbsp;
                                {allLeads.phone1}
                              </td>
                              <td>{callDates}</td>
                              <td>
                                <img
                                  className="img_icon_size log"
                                  onClick={() => onDeactive(allLeads, idx)}
                                  src={require("../../static/images/delete.png")}
                                  alt="Delete Lead"
                                  title="Delete Lead"
                                  style={{ width: "20px" }}
                                />{" "}
                                <img
                                  className="img_icon_size log"
                                  onClick={() => onUpdate(allLeads, idx)}
                                  src={require("../../static/images/edit_icon.png")}
                                  alt="Edit Lead"
                                  title="Edit Lead"
                                  style={{ width: "20px" }}
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
                      No of Prospects : {allLeads && allLeads.length}
                    </label>
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
                    from="Prospect"
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
                  <label className="sidePartHeading ">Status</label>
                  {showdateselectionSection && (
                    <AllStatuschange
                      leadDataVal={leadData}
                      from="Prospect"
                      ondivcloseChange={ondivcloseChange}
                      filterData={filterData}
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
                    Last Call History
                  </label>
                  {showdateselectionSection && (
                    <LastMessageDetails
                      from="Prospect"
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
            from="Prospect"
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
            from="Prospect"
            onDeactiveModalChange={onDeactiveModalChange}
            Leaddeavtivedata={userDatadeactive}
            filterData={filterData}
          />
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

AllProspects.propTypes = {
  auth: PropTypes.object.isRequired,
  dct: PropTypes.object.isRequired,
  regions: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  dct: state.dct,
  regions: state.regions,
});

export default connect(mapStateToProps, {
  getDctLeadDetails,
  getActiveCountry,
  getLastmessage,
  changeDeactivateLeadClientStatus
})(AllProspects);
