import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import Spinner from "../layout/Spinner";
import Select from "react-select";
import { Link } from "react-router-dom";
import {
  getSctClientDetails,
  getSctClientDetailsDD,
  getSctLastmessage,
} from "../../actions/sct";
import FileBase64 from "react-file-base64";
import SctLastMessageDetails from "./SctLastMessageDetails";
import AllSctContacts from "./AllSctContacts";
import AllSctStatusChange from "./AllSctStatusChange";
import { getActiveCountry } from "../../actions/regions";
import EditSctClients from "./EditSctClients";
import DeactiveSctClient from "./DeactiveSctClient";
const AllSctRegularClients = ({
  auth: { isAuthenticated, user, users },
  sct: { sctClients, sctClientsDD, sctClientsEmp },
  regions: { activeCountry },
  getSctClientDetails,
  getActiveCountry,
  getSctClientDetailsDD,
  getSctLastmessage,
}) => {
  useEffect(() => {
    getSctClientDetails({ sctClientCategory: "RC" });
  }, []);
  useEffect(() => {
    getSctClientDetailsDD({ sctClientCategory: "RC" });
  }, []);
  useEffect(() => {
    getActiveCountry({ countryBelongsTo: "SCT" });
  }, []);

  const priorityCategory = [
    { value: "Quotation", label: "Quotation" },
    { value: "RevisedQuotation", label: "Revised Quotation" },
    { value: "SendPO", label: "Send PO" },
    { value: "POReceived", label: "PO Received" },
  ];
  const [formData, setFormData] = useState({
    projectStatusData: priorityCategory[0],

    isSubmitted: false,
  });

  const onSliderChange = (sctClients, idx) => (e) => {
    if (e) {
      setFormData({
        ...formData,
        projectStatusData: e,
      });
    }

    if (e.value === "POReceived") {
      setShowEditModal(true);
    } else {
      setShowEditModal(false);
    }
  };

  const { projectStatusData } = formData;

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
  const onUpdate = (sctClients, idx) => {
    setShowEditModal(true);
    setUserDatas(sctClients);
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

  const allclient = [];
  sctClientsDD.map((clients) =>
    allclient.push({
      clientsId: clients._id,
      label: clients.sctCompanyName,
      value: clients.sctCompanyName,
    })
  );
  const [clients, getclientsData] = useState();
  const onclientsChange = (e) => {
    getclientsData(e);
    getSctClientDetails({
      countryId: countryId,
      clientsId: e.clientsId,
      sctClientCategory: "RC",
    });
    setFilterData({
      countryId: countryId,
      clientsId: e.clientsId,
      sctClientCategory: "RC",
    });
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
    getSctClientDetails({
      countryId: countryId,
      clientsId: clients ? clients.clientsId : null,
      assignedTo: e.empId,
      sctClientCategory: "RC",
    });
    getSctClientDetailsDD({
      countryId: countryId,
      clientsId: clients ? clients.clientsId : null,
      assignedTo: e.empId,
      sctClientCategory: "RC",
      emp: true,
    });
    setFilterData({
      countryId: countryId,
      clientsId: clients ? clients.clientsId : null,
      assignedTo: e.empId,
      sctClientCategory: "RC",
    });
  };

  const onClickReset = () => {
    getcountryData("");
    getcountryIdData("");
    getclientsData("");
    getempData("");
    getSctClientDetails({ sctClientCategory: "RC" });
    getSctClientDetailsDD({ sctClientCategory: "RC" });
    setFilterData({ sctClientCategory: "RC" });
    ondivcloseChange(true);
    setcolorData("");
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className=" col-lg-3 col-md-11 col-sm-10 col-10">
              <h5 className="heading_color">Regular Clients </h5>
            </div>
            <div className=" col-lg-2 col-md-11 col-sm-10 col-10 py-2">
              <Select
                name="countryName"
                options={allcountry}
                isSearchable={true}
                value={country}
                placeholder="Select Region"
                onChange={(e) => oncountryChange(e)}
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

            <div className="col-lg-3 col-md-11 col-sm-12 col-11 py-3">
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
                        <th style={{ width: "5%" }}>Op</th>
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
                              <td>{sctClients.sctWebsite}</td>
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
                      from="EngagedClient"
                      filterData={filterData}
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
            // filterData={filterData}
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
  getSctLastmessage,
})(AllSctRegularClients);
