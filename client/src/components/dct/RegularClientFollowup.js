import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Select from "react-select";
import {
  getDctClientDetails,
  getLastmessage,
  changeDeactivateLeadClientStatus
} from "../../actions/dct";
import Clock from "react-live-clock";
import AllContacts from "./AllContacts";
import AllStatuschange from "./AllStatuschange";
import LastMessageDetails from "./LastMessageDetails";
import { getActiveCountry } from "../../actions/regions";
import ClockTimeZone from "./ClockTimeZone";

// import DeactiveLead from "./DeactiveLead";
const RegularClientFollowup = ({
  auth: { isAuthenticated, user, users },
  dct: { dctClients, dctClientsEmp, dctClientsLoading, blnLeadClientDeactivated },
  regions: { activeCountry },
  getDctClientDetails,
  getActiveCountry,
  getLastmessage,
  changeDeactivateLeadClientStatus
}) => {
  useEffect(() => {
    getDctClientDetails({ dctClientCategory: "RC" });
  }, [getDctClientDetails]);

  useEffect(() => {
    getActiveCountry({ countryBelongsTo: "DCT" });
  }, []);

  useEffect(() => {
    if (colorData !== undefined) {
      sethighlightTimeZone(dctClients && dctClients.length !== 0 && dctClients[colorData].timezone ? dctClients[colorData].timezone : "");
    }
  }, [dctClients]);

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

  const [filterData, setFilterData] = useState({ dctClientCategory: "RC" });
  const [colorData, setcolorData] = useState();
  const [searchDataVal, setsearchDataVal] = useState();
  const [leadData, setLeadData] = useState();
  const [highlightTimeZone, sethighlightTimeZone] = useState("");
  const onClickHandler = (dctClients, idx) => {
    sethighlightTimeZone(
      dctClients.timezone && dctClients.timezone !== ""
        ? dctClients.timezone
        : ""
    );
    setLeadData(dctClients);
    setcolorData(idx);
    const searchData = {
      callToId: dctClients._id,
    };
    setsearchDataVal(searchData);
    getLastmessage(searchData);
    setShowHide({
      ...showHide,
      showdateselectionSection: true,
    });
  };

  const [showHide, setShowHide] = useState({
    showdateselectionSection: false,
  });

  const { showdateselectionSection } = showHide;
  const handledivModalClose = () => setShowHide(false);
  const ondivcloseChange = (e) => {
    if (e) {
      handledivModalClose();
    }
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
  const [Region, setShowRegion] = useState("");
  const oncountryChange = (e) => {
    getcountryData(e);
    setShowRegion(e.value);
    getclientsData("");
    getempData("");
    getcountryIdData(e.countryId);
    getDctClientDetails({ countryId: e.countryId, dctClientCategory: "RC" });
    setFilterData({ countryId: e.countryId, dctClientCategory: "RC" });
  };

  const allclient = [];
  dctClients.map((clients) =>
    allclient.push({
      clientsId: clients._id,
      label: clients.companyName,
      value: clients.companyName,
    })
  );
  const [clients, getclientsData] = useState();
  const onclientsChange = (e) => {
    getclientsData(e);
    getDctClientDetails({
      countryId: countryId,
      clientsId: e.clientsId,
      dctClientCategory: "RC",
    });
    setFilterData({
      countryId: countryId,
      clientsId: e.clientsId,
      dctClientCategory: "RC",
    });
  };

  const allemp = [];
  dctClientsEmp.map((emp) =>
    allemp.push({
      empId: emp._id,
      label: emp.dctClientAssignedToName,
      value: emp.dctClientAssignedToName,
    })
  );

  const [emp, getempData] = useState();
  const onempChange = (e) => {
    getempData(e);
    getDctClientDetails({
      countryId: countryId,
      clientsId: clients ? clients.clientsId : null,
      assignedTo: e.empId,
      dctClientCategory: "RC",
    });

    setFilterData({
      countryId: countryId,
      clientsId: clients ? clients.clientsId : null,
      assignedTo: e.empId,
      dctClientCategory: "RC",
    });
  };

  const onClickReset = () => {
    getcountryData("");
    getcountryIdData("");
    getclientsData("");
    getempData("");
    getDctClientDetails({ dctClientCategory: "RC" });

    setShowRegion("");
    sethighlightTimeZone("");

    setFilterData({ dctClientCategory: "RC" });
    ondivcloseChange(true);
    setcolorData();
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
              <ClockTimeZone Region={Region} highlightTimeZone={highlightTimeZone} />
            </div>
            <div className=" col-lg-2 col-md-11 col-sm-10 col-10">
              <h4 className="heading_color">Regular Client Follow Up</h4>
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
            <div className="col-lg-4 col-md-11 col-sm-12 col-11 py-2">
              {
                dctClientsLoading ? (<img
                  src={require("../../static/images/Refresh-Loader.gif")}
                  alt="Loading..." />) : (<></>)
              }
              <button
                className="btn btn_green_bg float-right"
                onClick={() => onClickReset()}
              >
                {
                  dctClientsLoading ? "Loading" : "Refresh"
                }
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 col-md-12 col-sm-12 col-12 text-center ">
              <section className="body">
                <div className=" body-inner no-padding table-responsive fixTableHeadCT">
                  <table
                    className="table table-bordered table-striped  smll_row"
                    id="datatable2"
                  >
                    <thead>
                      <tr>
                        <th style={{ width: "3%" }}>Sl.No</th>
                        <th style={{ width: "15%" }}>Company </th>
                        <th style={{ width: "15%" }}>Website </th>
                        <th style={{ width: "12%" }}>Email</th>
                        <th style={{ width: "8%" }}>Region</th>
                        <th style={{ width: "12%" }}>Contact</th>
                        <th style={{ width: "10%" }}>
                          &nbsp;&nbsp;&nbsp;CallDate&nbsp;&nbsp;&nbsp;
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dctClients &&
                        dctClients.map((dctClients, idx) => {
                          var callDates = "";
                          if (dctClients.dctCallDate) {
                            var ED = dctClients.dctCallDate.split(/\D/g);
                            callDates = [ED[2], ED[1], ED[0]].join("-");
                          }
                          return (
                            <tr
                              key={idx}
                              className={
                                colorData === idx ? "seletedrowcolorchange" : ""
                              }
                              onClick={() => onClickHandler(dctClients, idx)}
                            >
                              <td>{idx + 1}</td>
                              <td>
                                {/* <Link
                                  className="float-left ml-1"
                                  to="#"
                                  // onClick={() =>
                                  //   onClickHandler(dctClients, idx)
                                  // }
                                > */}
                                {dctClients.companyName}
                                {/* </Link> */}
                              </td>
                              <td>
                                <a
                                  href={dctClients.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {dctClients.website}
                                </a>
                              </td>
                              <td>{dctClients.emailId}</td>
                              <td>{dctClients.countryName}</td>
                              <td>
                                {dctClients.countryCode
                                  ? "+" + dctClients.countryCode
                                  : ""}
                                &nbsp;
                                {dctClients.phone1}
                              </td>
                              <td>{callDates}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-md-6 col-sm-11 col-11 align_right">
                    <label>
                      No of Regular Client Follow Up : {dctClients && dctClients.length}
                    </label>
                  </div>
                </div>
              </section>
            </div>
            <div className="row col-lg-4 col-md-12 col-sm-12 col-12 fixTableHead">
              <div className=" col-lg-12 col-md-6 col-sm-6 col-12 card-new no_padding sidePartHeightdct">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12 no_padding ">
                  {/* <label className="sidePartHeading ">Contacts</label> */}
                  {/* {showdateselectionSection && ( */}
                  <AllContacts
                    leadDataVal={leadData}
                    from="RegularClient"
                    ondivcloseChange={ondivcloseChange}
                    filterData={filterData}
                    showdateselectionSection={showdateselectionSection}
                  />
                  {/* )} */}
                </div>
              </div>
              <div className=" col-lg-12 col-md-6 col-sm-6 col-12 card-new no_padding statusTop ">
                <div
                  className="col-lg-12 col-md-12 col-sm-12 col-12 no_padding "
                  style={{ height: "33vh" }}
                >
                  <label className="sidePartHeading ">Status</label>
                  {showdateselectionSection && (
                    <AllStatuschange
                      leadDataVal={leadData}
                      from="RegularClient"
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
                      searchDataVal={searchDataVal}
                      from="RegularClient"
                      ondivcloseChange={ondivcloseChange}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

RegularClientFollowup.propTypes = {
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
  getDctClientDetails,
  getActiveCountry,
  getLastmessage,
  changeDeactivateLeadClientStatus
})(RegularClientFollowup);
