import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import Spinner from "../layout/Spinner";
import Select from "react-select";
import { Link } from "react-router-dom";
import { getDctClientDetails, getDctClientDetailsDD } from "../../actions/dct";
import AllContacts from "./AllContacts";
import AllStatuschange from "./AllStatuschange";
import LastMessageDetails from "./LastMessageDetails";
import EditLead from "./EditLead";
import { getActiveCountry } from "../../actions/regions";

// import DeactiveLead from "./DeactiveLead";
const TestClientFollowup = ({
  auth: { isAuthenticated, user, users },
  dct: { dctClients, dctClientsDD },
  regions: { activeCountry },
  getDctClientDetails,
  getDctClientDetailsDD,
  getActiveCountry,
}) => {
  useEffect(() => {
    getDctClientDetails({ dctClientCategory: "TC" });
  }, [getDctClientDetails]);
  useEffect(() => {
    getDctClientDetailsDD({ dctClientCategory: "TC" });
  }, [getDctClientDetailsDD]);
  useEffect(() => {
    getActiveCountry({ countryBelongsTo: "DCT" });
  }, []);
  console.log(activeCountry);

  const [showEditModal, setShowEditModal] = useState(false);
  const handleEditModalClose = () => setShowEditModal(false);

  const onEditModalChange = (e) => {
    if (e) {
      handleEditModalClose();
    }
  };

  const [userDatas, setUserDatas] = useState(null);
  // const onUpdate = (allLeads, idx) => {
  //   setShowEditModal(true);
  //   setUserDatas(allLeads);
  // };

  // const [userDatadeactive, setUserDatadeactive] = useState(null);
  // const onDeactive = (jobQueueProjects, idx) => {
  //   setShowDeactiveModal(true);
  //   setUserDatadeactive(jobQueueProjects);
  // };

  const [showDeactiveModal, setShowDeactiveModal] = useState(false);
  const handleDeactiveModalClose = () => setShowDeactiveModal(false);

  const onDeactiveModalChange = (e) => {
    if (e) {
      handleDeactiveModalClose();
    }
  };

  const [searchDataVal, setsearchDataVal] = useState();
  const [leadData, setLeadData] = useState();
  const onClickHandler = (dctClients, idx) => {
    setLeadData(dctClients);

    const searchData = {
      callToId: dctClients._id,
    };
    setsearchDataVal(searchData);
    //getLastmessage(searchData);
  };

  // const allcountry = [];
  // activeCountry.map((country) =>
  //   allcountry.push({
  //     countryId: country._id,
  //     label: country.countryName,
  //     value: country.countryName,
  //   })
  // );

  // const [country, getcountryData] = useState();
  // const [countryId, getcountryIdData] = useState(null);

  // const oncountryChange = (e) => {
  //   getcountryData(e);
  //   getclientsData("");
  //   getcountryIdData(e.countryId);
  //   getDctClientDetails({ countryId: e.countryId, dctLeadCategory: "F" });
  //   getDctClientDetailsDD({ countryId: e.countryId, dctLeadCategory: "F" });
  // };

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
      //countryId: countryId,
      clientsId: e.clientsId,
      dctLeadCategory: "F",
    });
  };

  // const onClickReset = () => {
  //   getcountryData("");
  //   getclientsData("");
  //  getDctClientDetails({ dctLeadCategory: "TC" });
  //   getDctClientDetailsDD({ dctLeadCategory: "TC" });
  // };
  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className=" col-lg-2 col-md-11 col-sm-10 col-10">
              <h5 className="heading_color">Test Client FollowUp</h5>
            </div>
            <div className=" col-lg-2 col-md-11 col-sm-10 col-10 py-2">
              <Select
                name="countryName"
                //   options={allcountry}
                isSearchable={true}
                //   value={country}
                placeholder="Select Region"
                //   onChange={(e) => oncountryChange(e)}
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
            <div className="col-lg-6 col-md-11 col-sm-12 col-11 py-3">
              <button
                className="btn btn_green_bg float-right"
                //  onClick={() => onClickReset()}
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
                    className="table table-bordered table-striped table-hover smll_row"
                    id="datatable2"
                  >
                    <thead>
                      <tr>
                        <th style={{ width: "10%" }}>Sl.No</th>
                        <th style={{ width: "6%" }}>Company </th>
                        <th style={{ width: "15%" }}>Website </th>
                        <th style={{ width: "13%" }}>Email</th>
                        <th style={{ width: "13%" }}>Region</th>
                        <th style={{ width: "13%" }}>Contact</th>
                        <th style={{ width: "13%" }}>Op</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dctClients &&
                        dctClients.map((dctClients, idx) => {
                          return (
                            <tr key={idx}>
                              <td>{idx + 1}</td>
                              <td>
                                {" "}
                                <Link
                                  className="float-left ml-3"
                                  to="#"
                                  onClick={() =>
                                    onClickHandler(dctClients, idx)
                                  }
                                >
                                  {dctClients.companyName}
                                </Link>
                              </td>
                              <td>{dctClients.website}</td>
                              <td>{dctClients.emailId}</td>
                              <td>{dctClients.website}</td>
                              <td>{dctClients.phone1}</td>

                              <td>
                                {/* <img
                                  className="img_icon_size log"
                                  onClick={() => onDeactive(dctClients, idx)}
                                  src={require("../../static/images/delete.png")}
                                  alt="Delete Project"
                                  title="Delete Project"
                                />{" "}
                                &emsp;
                                <img
                                  className="img_icon_size log"
                                  onClick={() => onUpdate(dctClients, idx)}
                                  src={require("../../static/images/edit_icon.png")}
                                  alt="Edit"
                                  title="Edit"
                                /> */}
                              </td>
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
                  <label className="sidePartHeading ">Contacts</label>
                  <AllContacts leadDataVal={leadData} />
                </div>
              </div>
              <div className=" col-lg-12 col-md-6 col-sm-6 col-12 card-new  no_padding ">
                <div
                  className="col-lg-12 col-md-12 col-sm-12 col-12 no_padding "
                  style={{ height: "30vh" }}
                >
                  <label className="sidePartHeading ">Status</label>
                  <AllStatuschange leadDataVal={leadData} from="TestClient" />
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
                  <LastMessageDetails searchDataVal={searchDataVal} />
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
            onEditModalChange={onEditModalChange}
            alleditLeaddata={userDatas}
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
          {/* <DeactiveLead
            onDeactiveModalChange={onDeactiveModalChange}
            Leaddeavtivedata={userDatadeactive}
          /> */}
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

TestClientFollowup.propTypes = {
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
  getDctClientDetailsDD,
  getActiveCountry,
})(TestClientFollowup);
