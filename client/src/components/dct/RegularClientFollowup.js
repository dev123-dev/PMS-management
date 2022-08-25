import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Select from "react-select";
import { Link } from "react-router-dom";
import {
  getDctClientDetails,
  getDctClientDetailsDD,
  getLastmessage,
} from "../../actions/dct";
import AllContacts from "./AllContacts";
import AllStatuschange from "./AllStatuschange";
import LastMessageDetails from "./LastMessageDetails";
import { getActiveCountry } from "../../actions/regions";
import { getMarketingEmployee } from "../../actions/user";

// import DeactiveLead from "./DeactiveLead";
const RegularClientFollowup = ({
  auth: { isAuthenticated, user, users },
  user: { marketingEmployees },
  dct: { dctClients, dctClientsDD },
  regions: { activeCountry },
  getDctClientDetails,
  getDctClientDetailsDD,
  getActiveCountry,
  getLastmessage,
  getMarketingEmployee,
}) => {
  useEffect(() => {
    getDctClientDetails({ dctClientCategory: "RC" });
  }, [getDctClientDetails]);
  useEffect(() => {
    getDctClientDetailsDD({ dctClientCategory: "RC" });
  }, [getDctClientDetailsDD]);
  useEffect(() => {
    getActiveCountry({ countryBelongsTo: "DCT" });
  }, []);
  useEffect(() => {
    getMarketingEmployee();
  }, [getMarketingEmployee]);

  const [filterData, setFilterData] = useState({ dctClientCategory: "RC" });
  const [colorData, setcolorData] = useState();
  const [searchDataVal, setsearchDataVal] = useState();
  const [leadData, setLeadData] = useState();

  const onClickHandler = (dctClients, idx) => {
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
      setcolorData("");
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

  const oncountryChange = (e) => {
    getcountryData(e);
    getclientsData("");
    getcountryIdData(e.countryId);
    getDctClientDetails({ countryId: e.countryId, dctClientCategory: "RC" });
    getDctClientDetailsDD({ countryId: e.countryId, dctClientCategory: "RC" });
    setFilterData({ countryId: e.countryId, dctClientCategory: "RC" });
  };

  const allclient = [];
  dctClientsDD.map((clients) =>
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
    getDctClientDetails({
      countryId: countryId,
      clientsId: clients ? clients.clientsId : null,
      assignedTo: e.empId,
      dctClientCategory: "RC",
    });
    getDctClientDetailsDD({
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
    getclientsData("");
    getempData("");
    getDctClientDetails({ dctClientCategory: "RC" });
    getDctClientDetailsDD({ dctClientCategory: "RC" });
    setFilterData({ dctClientCategory: "RC" });
    ondivcloseChange(true);
    setcolorData("");
  };
  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className=" col-lg-2 col-md-11 col-sm-10 col-10">
              <h5 className="heading_color">Regular Client FollowUp</h5>
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
            <div className=" col-lg-4 col-md-11 col-sm-10 col-10 ">
              {(user.userGroupName && user.userGroupName === "Administrator") ||
              user.userGroupName === "Super Admin" ? (
                <div className=" col-lg-4 col-md-11 col-sm-10 col-10 py-2">
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
            </div>
            <div className="col-lg-2 col-md-11 col-sm-12 col-11 py-3">
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
                        <th style={{ width: "3%" }}>Sl.No</th>
                        <th style={{ width: "15%" }}>Company </th>
                        <th style={{ width: "15%" }}>Website </th>
                        <th style={{ width: "13%" }}>Email</th>
                        <th style={{ width: "8%" }}>Region</th>
                        <th style={{ width: "13%" }}>Contact</th>
                        <th style={{ width: "8%" }}>Call Date</th>
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
                                <Link
                                  className="float-left ml-1"
                                  to="#"
                                  // onClick={() =>
                                  //   onClickHandler(dctClients, idx)
                                  // }
                                >
                                  {dctClients.companyName}
                                </Link>
                              </td>
                              <td>{dctClients.website}</td>
                              <td>{dctClients.emailId}</td>
                              <td>{dctClients.countryName}</td>
                              <td>{dctClients.phone1}</td>
                              <td>{callDates}</td>
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
                    from="client"
                    ondivcloseChange={ondivcloseChange}
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
                      from="RegularClient"
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
  user: state.user,
  dct: state.dct,
  regions: state.regions,
});

export default connect(mapStateToProps, {
  getDctClientDetails,
  getDctClientDetailsDD,
  getActiveCountry,
  getLastmessage,
  getMarketingEmployee,
})(RegularClientFollowup);
