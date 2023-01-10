import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import Spinner from "../layout/Spinner";
import VerificationModal from "./VerificationModal";
import {
  getverifiedProjectDeatils,
  getAllProjectStatusVerification,
} from "../../actions/projects";
import { getVerificationFolder } from "../../actions/client";
import { getAllchanges, getUpdatedProjectStaus } from "../../actions/projects";
import { w3cwebsocket } from "websocket";
import BillingBreakup from "./billingBreakup";
//client in websocket
//SLAP IP
const client = new w3cwebsocket("ws://192.168.6.159:8000");

const Billing = ({
  auth: { isAuthenticated, user, users },
  project: { VerifiedProjects, allStatusVerification },
  client: { activeVerfificationFolders },
  getverifiedProjectDeatils,
  getAllProjectStatusVerification,
  getUpdatedProjectStaus,
  getVerificationFolder,
}) => {
  useEffect(() => {
    client.onopen = () => {
      console.log("webSocket client connected");
    };
    client.onmessage = (message) => {
      getUpdatedProjectStaus();
    };
  }, []);
  useEffect(() => {
    getverifiedProjectDeatils();
  }, [getverifiedProjectDeatils]);
  useEffect(() => {
    getAllProjectStatusVerification();
  }, [getAllProjectStatusVerification]);
  useEffect(() => {
    getVerificationFolder();
  }, [getVerificationFolder]);

  const [folderData, setClientData] = useState("");
  const [projectStatusData, setProjectStatusData] = useState("");
  const [singledate, setsingledate] = useState("");
  const [searchData, setSearchData] = useState("");

  const activeFolderOpt = [];
  activeVerfificationFolders.map((folderData) =>
    activeFolderOpt.push({
      label: folderData.clientFolderName,
      value: folderData.clientFolderName,
    })
  );

  const onFolderChange = (e) => {
    setClientData(e);
    let selDateData = {
      folder: e.value,
      statusId: projectStatusData.value,
      dateVal: singledate,
    };
    setSearchData(selDateData);
    getverifiedProjectDeatils(selDateData);
  };

  // Modal
  const projectStatusOpt = [];
  allStatusVerification.map((projStatusData) =>
    projectStatusOpt.push({
      label: projStatusData.projectStatusType,
      value: projStatusData._id,
    })
  );

  const onDateChange2 = (e) => {
    setsingledate(e.target.value);
    let selDateData = {
      folder: folderData.value,
      statusId: projectStatusData.value,
      dateVal: e.target.value,
    };
    setSearchData(selDateData);
    getverifiedProjectDeatils(selDateData);
  };

  const [showEditModal, setShowEditModal] = useState(false);
  const handleEditModalClose = () => setShowEditModal(false);
  const onEditModalChange = (e) => {
    if (e) {
      handleEditModalClose();
    }
  };
  const onClickReset = () => {
    getverifiedProjectDeatils("");
    setSearchData("");
    setProjectStatusData("");
    setClientData("");
    setsingledate("");
  };

  const [loggedStaffData, setLoggedStaffData] = useState(null);
  const [userDatas, setUserDatas] = useState(null);
  const onClickVerify = (VerifiedProjects, idx) => {
    setUserDatas(VerifiedProjects);
    setShowEditModal(true);
    if (user) {
      setLoggedStaffData(user);
    }
  };

  const [showAllChangeModal, setshowModal] = useState(false);
  const handleModalClose = () => setshowModal(false);

  const onModalChange = (e) => {
    if (e) {
      handleModalClose();
    }
  };

  const [userDatas3, setUserDatas3] = useState(null);
  const handleBilling = (VerifiedProjects) => {
    setshowModal(true);
    setUserDatas3(VerifiedProjects);
  };

  let projectQty = 0;
  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className=" col-lg-2 col-md-11 col-sm-10 col-10">
              <h5 className="heading_color">Billing</h5>
            </div>
            <div className="col-lg-2 col-md-11 col-sm-10 col-10 py-2">
              <Select
                name="folderData"
                isSearchable={true}
                value={folderData}
                options={activeFolderOpt}
                placeholder="Select"
                onChange={(e) => onFolderChange(e)}
              />
            </div>

            {/* <div className=" col-lg-2 col-md-11 col-sm-10 col-10 py-2">
              <input
                type="date"
                placeholder="dd/mm/yyyy"
                className="form-control cpp-input datevalidation"
                name="singledate"
                value={singledate}
                onChange={(e) => onDateChange2(e)}
                style={{
                  width: "75%",
                }}
              />
            </div> */}
            <div className="col-lg-8 col-md-11 col-sm-12 col-11 py-2">
              <button
                className="btn btn_green_bg float-right"
                onClick={() => onClickReset()}
              >
                Refresh
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12 text-center">
              <section className="body">
                <div className=" body-inner no-padding table-responsive fixTableHead">
                  <table
                    className="table table-bordered table-striped table-hover smll_row"
                    id="datatable2"
                  >
                    <thead>
                      <tr>
                        <th style={{ width: "1%" }}></th>
                        {/* SLAP UserGroupRights */}
                        {(user.userGroupName &&
                          user.userGroupName === "Administrator") ||
                        user.userGroupName === "Super Admin" ? (
                          <th style={{ width: "5%" }}>Client Name</th>
                        ) : (
                          <></>
                        )}
                        <th style={{ width: "6%" }}>Folder </th>
                        <th style={{ width: "25%" }}>Project Name</th>
                        <th style={{ width: "5%" }}>Project Date</th>
                        <th style={{ width: "2%" }}>Qty</th>
                      </tr>
                    </thead>
                    <tbody>
                      {VerifiedProjects &&
                        VerifiedProjects.map((VerifiedProjects, idx) => {
                          var projectDate = "";
                          if (VerifiedProjects.projectDate) {
                            var ED = VerifiedProjects.projectDate.split(/\D/g);
                            projectDate = [ED[2], ED[1], ED[0]].join("-");
                          }

                          projectQty += VerifiedProjects.projectQuantity;
                          return (
                            <tr key={idx}>
                              <td>
                                <input type="checkbox" id="Unconfirmed" />
                              </td>
                              {/* SLAP UserGroupRights */}
                              {(user.userGroupName &&
                                user.userGroupName === "Administrator") ||
                              user.userGroupName === "Super Admin" ? (
                                <td>{VerifiedProjects.clientName}</td>
                              ) : (
                                <></>
                              )}
                              <td>{VerifiedProjects.clientFolderName}</td>
                              <td>
                                <label>{VerifiedProjects.projectName}</label>
                                <img
                                  className="img_icon_size log float-left "
                                  onClick={() =>
                                    handleBilling(VerifiedProjects)
                                  }
                                  src={require("../../static/images/colortheme.png")}
                                  alt="Billing Breakup"
                                  title="Last change"
                                />
                              </td>
                              <td>{projectDate}</td>

                              <td>
                                {VerifiedProjects.projectQuantity}&nbsp;
                                {VerifiedProjects.projectUnconfirmed ===
                                  true && (
                                  <span style={{ color: "red" }}>*</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        </section>

        <div className="row col-md-12 col-lg-12 col-sm-12 col-12  bottmAlgmnt">
          <div className="col-lg-1 col-md-6 col-sm-6 col-12 align_right">
            Quantity:{projectQty}
          </div>
        </div>
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
          <div className="col-lg-10">
            <h3 className="modal-title text-center">Verification Project</h3>
          </div>
          <div className="col-lg-1">
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
          <VerificationModal
            onEditModalChange={onEditModalChange}
            allVerifydata={userDatas}
            loggedStaff={loggedStaffData}
            searchData={searchData}
          />
        </Modal.Body>
      </Modal>

      <Modal
        show={showAllChangeModal}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <div className="col-lg-10 col-md-10 col-sm-10 col-10">
            <h3 className="modal-title text-center">Billing Breakup</h3>
          </div>
          <div className="col-lg-2 col-md-2 col-sm-2 col-2">
            <button onClick={handleModalClose} className="close">
              <img
                src={require("../../static/images/close.png")}
                alt="X"
                style={{ height: "20px", width: "20px" }}
              />
            </button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <BillingBreakup onModalChange={onModalChange} billing={userDatas3} />
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

Billing.propTypes = {
  auth: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  getverifiedProjectDeatils: PropTypes.func.isRequired,
  getAllchanges: PropTypes.func.isRequired,
  getVerificationFolder: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  project: state.project,
  client: state.client,
});

export default connect(mapStateToProps, {
  getAllchanges,
  getverifiedProjectDeatils,
  getAllProjectStatusVerification,
  getUpdatedProjectStaus,
  // getVerificationClients,
  getVerificationFolder,
})(Billing);
