import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import Spinner from "../layout/Spinner";
import Select from "react-select";
import {
  getSctLeadDetails,
  getSctLeadDetailsDD,
  getSctLastmessage,
  getProjectList,
} from "../../actions/sct";
import EditSctLead from "./EditSctLead";
import DeactiveSctLead from "./DeactiveSctLead";
import SctLastMessageDetails from "./SctLastMessageDetails";
import AllSctContacts from "./AllSctContacts";
import AllSctStatusChange from "./AllSctStatusChange";
import { getActiveCountry, getActiveState } from "../../actions/regions";
import { CSVLink } from "react-csv";
const AllSctWrongNumbers = ({
  auth: { isAuthenticated, user, users, loading },
  sct: { allSctLeads, allSctLeadsDD, allSctLeadsEmp, projectList },
  regions: { activeCountry, activeState },
  getSctLeadDetails,
  getActiveCountry,
  getActiveState,
  getSctLeadDetailsDD,
  getSctLastmessage,
  getProjectList,
}) => {
  useEffect(() => {
    getSctLeadDetails();
  }, [getSctLeadDetails]);
  useEffect(() => {
    getSctLeadDetailsDD();
  }, [getSctLeadDetailsDD]);
  useEffect(() => {
    getActiveCountry({ countryBelongsTo: "SCT" });
  }, [getActiveCountry]);
  useEffect(() => {
    getActiveState({ countryBelongsTo: "SCT" });
  }, [getActiveState]);

  useEffect(() => {
    getProjectList({ countryBelongsTo: "SCT" });
  }, [getProjectList]);

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
    }
  };

  const handledivModalClose = () => setShowHide(false);

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
    setprojectsID(e.projectsId);
    let searchData = {
      projectsId: e.projectsId,
      sctLeadCategory: "W",
    };
    getSctLeadDetails(searchData);
    getSctLeadDetailsDD(searchData);
    setFilterData(searchData);
  };

  const onClickReset = () => {
    getSctLeadDetails();
    getSctLeadDetailsDD();
    setFilterData();
    ondivcloseChange(true);
    setcolorData("");
    getprojectsData("");
  };

  const csvData = [
    [
      "Leads of",
      "Company",
      "Client Name",
      "Country",
      "State",
      "Contact",
      "Contact2",
    ],
  ];
  allSctLeads &&
    allSctLeads.map((allLeadsData) =>
      csvData.push([
        allLeadsData.projectsName,
        allLeadsData.sctCompanyName,
        allLeadsData.sctClientName,
        allLeadsData.countryName,
        allLeadsData.stateName,
        allLeadsData.sctPhone1,
        allLeadsData.sctPhone2,
        "\n",
      ])
    );

  const fileName = ["SCT Wrong Number Reports"];
  return !isAuthenticated || !user  ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className=" col-lg-2 col-md-11 col-sm-10 col-10">
              <h4 className="heading_color">All Sct Wrong Numbers</h4>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6 col-12 py-2">
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

            <div className="col-lg-8 col-md-11 col-sm-12 col-11 py-2">
              <button
                className="btn btn_green_bg float-right"
                onClick={() => onClickReset()}
              >
                Refresh
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
                <div className=" body-inner no-padding table-responsive fixTableHead">
                  <table
                    className="table table-bordered table-striped hoverrow smll_row"
                    id="datatable2"
                  >
                    <thead>
                      <tr>
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
                          return (
                            <tr
                              key={idx}
                              className={
                                colorData === idx ? "seletedrowcolorchange" : ""
                              }
                              onClick={() => onClickHandler(allSctLeads, idx)}
                            >
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
                        })}
                    </tbody>
                  </table>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-md-6 col-sm-11 col-11 align_right">
                    <label>
                      No of Leads : {allSctLeads && allSctLeads.length}
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
                  style={{ height: "39vh" }}
                >
                  <label className="sidePartHeading ">&nbsp;&nbsp;Status</label>
                  {showdateselectionSection && (
                    <AllSctStatusChange
                      leadDataVal={leadData}
                      ondivcloseChange={ondivcloseChange}
                      from={leadData.sctLeadCategory}
                      filterData={filterData}
                      page="AllSctProspects"
                      page1="AllWrongNumber"
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

AllSctWrongNumbers.propTypes = {
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
  getActiveState,
  getProjectList,
})(AllSctWrongNumbers);
