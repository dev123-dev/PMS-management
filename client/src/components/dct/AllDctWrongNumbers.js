import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import Spinner from "../layout/Spinner";
import Select from "react-select";
import Clock from "react-live-clock";
import {
  getDctLeadDetails,
  getLastmessage,
} from "../../actions/dct";
import AllContacts from "./AllContacts";
import LastMessageDetails from "./LastMessageDetails";
import EditLead from "./EditLead";
import DeactiveLead from "./DeactiveLead";
import { getActiveCountry } from "../../actions/regions";
import { CSVLink } from "react-csv";
const AllDctWrongNumbers = ({
  auth: { isAuthenticated, user, users },
  dct: { allLeads, dctLeadsLoading },
  regions: { activeCountry },
  getDctLeadDetails,
  getActiveCountry,
  getLastmessage,
}) => {
  useEffect(() => {
    getDctLeadDetails({ dctLeadCategory: "W" });
  }, []);
  useEffect(() => {
    getActiveCountry({ countryBelongsTo: "DCT" });
  }, []);
  //formData
  const [showHide1, setShowHide1] = useState({
    showUSSection: false,
    showAUDSection: false,
    showUKSection: false,
  });
  const { showUSSection, showAUDSection, showUKSection } = showHide1;
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
  const onClickHandler = (allLeads, idx) => {
    setLeadData(allLeads);
    setcolorData(idx);
    const searchData = {
      callToId: allLeads._id,
    };
    setsearchDataVal(searchData);
    getLastmessage(searchData);

    // }
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

  //to hide and unide the timezones according to region selected
  const oncountryChange = (e) => {
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
    getcountryData(e);
    getcountryIdData(e.countryId);
    getDctLeadDetails({ countryId: e.countryId, dctLeadCategory: "W" });
    setFilterData({ countryId: e.countryId, dctLeadCategory: "W" });
  };

  const onClickReset = () => {
    getcountryData("");
    getcountryIdData("");
    getDctLeadDetails({ dctLeadCategory: "W" });

    setFilterData({ dctLeadCategory: "W" });
    ondivcloseChange(true);
    setcolorData("");
  };
  const csvData = [
    [
      "Company",
      "Website",
      "Client Name",
      "Email",
      "Region",
      "Contact",
      "Contact2",
    ],
  ];

  allLeads &&
    allLeads.map((allLeadsData) =>
      csvData.push([
        allLeadsData.companyName,
        allLeadsData.website,
        allLeadsData.clientName,
        allLeadsData.emailId,
        allLeadsData.countryName,
        allLeadsData.phone1,
        allLeadsData.phone2,
        "\n",
      ])
    );

  const fileName = ["DCT Wrong Number Reports"];
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
                    ticking={true}
                    timezone={"US/Pacific"}
                    format={"DD/MM/YYYY, h:mm:ss a"}
                  />
                  &emsp;&emsp; MST :
                  <Clock
                    ticking={true}
                    timezone={"US/Mountain"}
                    format={" DD/MM/YYYY, h:mm:ss a"}
                  />{" "}
                  &emsp;&emsp; EST :
                  <Clock
                    ticking={true}
                    timezone={"US/Eastern"}
                    format={" DD/MM/YYYY, h:mm:ss a"}
                  />{" "}
                  &emsp;&emsp; CST :
                  <Clock
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
                    ticking={true}
                    timezone={"Australia/Sydney"}
                    format={" DD/MM/YYYY, h:mm:ss a"}
                  />
                  &emsp; &emsp;Perth :
                  <Clock
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

            <div className=" col-lg-2 col-md-11 col-sm-10 col-10">
              <h4 className="heading_color">All Wrong Numbers</h4>
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

            <div className="col-lg-8 col-md-11 col-sm-12 col-11 py-2">
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
              <CSVLink
                className="secondlinebreak"
                data={csvData}
                filename={fileName}
              >
                <button className="btn btn_green_bg float-right">Export</button>
              </CSVLink>
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
                        <th style={{ width: "10%" }}>Email</th>
                        <th style={{ width: "8%" }}>Region</th>
                        <th style={{ width: "13%" }}>Contact</th>
                        <th style={{ width: "8%" }}>
                          &nbsp;&nbsp;CallDate&nbsp;&nbsp;&nbsp;&nbsp;
                        </th>
                        <th style={{ width: "8%" }}>
                          &nbsp;&nbsp;Op&nbsp;&nbsp;&nbsp;&nbsp;
                        </th>
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
                              onClick={() => onClickHandler(allLeads, idx)}
                            >
                              <td>{idx + 1}</td>
                              <td>
                                {allLeads.companyName}
                              </td>
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
                                  alt="Delete Project"
                                  title="Delete Project"
                                />{" "}
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
              <div className=" col-lg-12 col-md-6 col-sm-6 col-12 card-new no_padding sidePartHeightLeadWrongNo">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12 no_padding ">
                  <AllContacts
                    leadDataVal={leadData}
                    ondivcloseChange={ondivcloseChange}
                    from="WrongNumber"
                    filterData={filterData}
                    showdateselectionSection={showdateselectionSection}
                  />
                </div>
              </div>
              <div className=" col-lg-12 col-md-6 col-sm-6 col-12 card-new no_padding lastMessageLeadWrongNo">
                <div
                  className="col-lg-12 col-md-12 col-sm-12 col-12 no_padding "
                  style={{ height: "18vh" }}
                >
                  <label className="sidePartHeading ">
                    Last Call History
                  </label>
                  {showdateselectionSection && (
                    <LastMessageDetails
                      from="WrongNumber"
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
            from="WrongNumber"
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
            from="WrongNumber"
            onDeactiveModalChange={onDeactiveModalChange}
            Leaddeavtivedata={userDatadeactive}
            filterData={filterData}
          />
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

AllDctWrongNumbers.propTypes = {
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
})(AllDctWrongNumbers);
