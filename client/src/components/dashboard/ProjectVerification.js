import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import Spinner from "../layout/Spinner";
import VerificationModal from "./VerificationModal";
import {
  getverificationProjectDeatils,
  getAllProjectStatusVerification,
} from "../../actions/projects";
import { getVerificationFolder } from "../../actions/client";
// getVerificationClients,
import {
  AddProjectTrack,
  getAllchanges,
  getUpdatedProjectStaus,
} from "../../actions/projects";
import { w3cwebsocket } from "websocket";
//client in websocket
//SLAP IP
const client = new w3cwebsocket("ws://192.168.6.159:8000");

const ProjectVerification = ({
  auth: { isAuthenticated, user, users },
  project: { unVerifiedProjects, allStatusVerification },
  client: { activeVerfificationFolders },
  // activeVerfificationClients
  getverificationProjectDeatils,
  getAllProjectStatusVerification,
  getUpdatedProjectStaus,
  // getVerificationClients,
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
    getverificationProjectDeatils();
  }, [getverificationProjectDeatils]);
  useEffect(() => {
    getAllProjectStatusVerification();
  }, [getAllProjectStatusVerification]);
  useEffect(() => {
    getVerificationFolder();
  }, [getVerificationFolder]);
  // useEffect(() => {
  //   getVerificationClients();
  // }, [getVerificationClients]);

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
    getverificationProjectDeatils(selDateData);
  };
  const onProjectStatusChange = (e) => {
    setProjectStatusData(e);
    let selDateData = {
      folder: folderData.value,
      statusId: e.value,
      dateVal: singledate,
    };
    setSearchData(selDateData);
    getverificationProjectDeatils(selDateData);
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
    getverificationProjectDeatils(selDateData);
  };

  const [showEditModal, setShowEditModal] = useState(false);
  const handleEditModalClose = () => setShowEditModal(false);
  const onEditModalChange = (e) => {
    if (e) {
      handleEditModalClose();
    }
  };
  const onClickReset = () => {
    getverificationProjectDeatils("");
    setSearchData("");
    setProjectStatusData("");
    setClientData("");
    setsingledate("");
  };

  const [loggedStaffData, setLoggedStaffData] = useState(null);
  const [userDatas, setUserDatas] = useState(null);
  const onClickVerify = (unVerifiedProjects, idx) => {
    setUserDatas(unVerifiedProjects);
    setShowEditModal(true);
    if (user) {
      setLoggedStaffData(user);
    }
  };
  let projectQty = 0,
    downloadingQty = 0,
    WorkingQty = 0,
    PendingQty = 0,
    QCPendingQty = 0,
    QCEstimateQty = 0,
    UploadingQty = 0;
  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className=" col-lg-2 col-md-11 col-sm-10 col-10">
              <h5 className="heading_color">Job Verification</h5>
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
            <div className="col-lg-2 col-md-11 col-sm-10 col-10 py-2">
              <Select
                name="projectStatusData"
                options={projectStatusOpt}
                value={projectStatusData}
                isSearchable={true}
                placeholder="Select"
                onChange={(e) => onProjectStatusChange(e)}
              />
            </div>
            <div className=" col-lg-2 col-md-11 col-sm-10 col-10 py-2">
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
            </div>
            <div className="col-lg-4 col-md-11 col-sm-12 col-11 py-3">
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
                        <th style={{ width: "2%" }}>Priority</th>
                        <th style={{ width: "2%" }}>Deadline</th>
                        <th style={{ width: "2%" }}>Qty</th>
                        <th style={{ width: "5%" }}>Status</th>
                        {/* SLAP UserGroupRights */}
                        {(user.userGroupName &&
                          user.userGroupName === "Administrator") ||
                        user.userGroupName === "Super Admin" ||
                        user.userGroupName === "Clarical Admins" ||
                        user.userGroupName === "Quality Controller" ? (
                          <th style={{ width: "5%" }}>OP</th>
                        ) : (
                          <></>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {unVerifiedProjects &&
                        unVerifiedProjects.map((unVerifiedProjects, idx) => {
                          var projectDate = "";
                          if (unVerifiedProjects.projectDate) {
                            var ED =
                              unVerifiedProjects.projectDate.split(/\D/g);
                            projectDate = [ED[2], ED[1], ED[0]].join("-");
                          }

                          projectQty += unVerifiedProjects.projectQuantity;
                          let statusType = unVerifiedProjects.projectStatusType;
                          if (statusType === "Downloading") downloadingQty += 1;
                          if (statusType === "Working") WorkingQty += 1;
                          if (statusType === "Pending") PendingQty += 1;
                          if (statusType === "QC Pending") QCPendingQty += 1;
                          if (statusType === "QC Estimate") QCEstimateQty += 1;
                          if (statusType === "Uploading") UploadingQty += 1;

                          return (
                            <tr key={idx}>
                              {/* SLAP UserGroupRights */}
                              {(user.userGroupName &&
                                user.userGroupName === "Administrator") ||
                              user.userGroupName === "Super Admin" ? (
                                <td>{unVerifiedProjects.clientName}</td>
                              ) : (
                                <></>
                              )}
                              <td>{unVerifiedProjects.clientFolderName}</td>
                              <td>
                                <label>{unVerifiedProjects.projectName}</label>
                              </td>
                              <td>{projectDate}</td>
                              <td>{unVerifiedProjects.projectPriority}</td>
                              <td>{unVerifiedProjects.projectDeadline}</td>
                              <td>
                                {unVerifiedProjects.projectQuantity}&nbsp;
                                {unVerifiedProjects.projectUnconfirmed ===
                                  true && (
                                  <span style={{ color: "red" }}>*</span>
                                )}
                              </td>
                              <td>
                                <label>
                                  {unVerifiedProjects.projectStatusType}
                                </label>
                              </td>
                              {/* SLAP UserGroupRights */}
                              {(user.userGroupName &&
                                user.userGroupName === "Administrator") ||
                              user.userGroupName === "Super Admin" ||
                              user.userGroupName === "Clarical Admins" ||
                              user.userGroupName === "Quality Controller" ? (
                                <td>
                                  <button
                                    className="btn btn_green_bg"
                                    onClick={() =>
                                      onClickVerify(unVerifiedProjects, idx)
                                    }
                                  >
                                    Verify
                                  </button>
                                </td>
                              ) : (
                                <></>
                              )}
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
          <div className="col-lg-10 col-md-6 col-sm-6 col-12">
            {/* <label>Downloading:{downloadingQty} &emsp;</label>
            <label>Working : {WorkingQty}&emsp;</label>
            <label>Pending : {PendingQty}&emsp;</label>
            <label>QC Pending: {QCPendingQty}&emsp;</label>
            <label>QC Estimate : {QCEstimateQty}&emsp;</label>
            <label>Uploading: {UploadingQty}&emsp;</label> */}
          </div>
          <div className="col-lg-1 col-md-6 col-sm-6 col-12 align_right">
            Projects:{unVerifiedProjects.length}
          </div>
          <div className="col-lg-1 col-md-6 col-sm-6 col-12 align_right">
            Quantity:{projectQty}
          </div>
        </div>
      </div>

      <Modal
        show={showEditModal}
        backdrop="static"
        keyboard={false}
        size="md"
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
    </Fragment>
  );
};

ProjectVerification.propTypes = {
  auth: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  getverificationProjectDeatils: PropTypes.func.isRequired,
  AddProjectTrack: PropTypes.func.isRequired,
  getAllchanges: PropTypes.func.isRequired,
  getVerificationFolder: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  project: state.project,
  client: state.client,
});

export default connect(mapStateToProps, {
  AddProjectTrack,
  getAllchanges,
  getverificationProjectDeatils,
  getAllProjectStatusVerification,
  getUpdatedProjectStaus,
  // getVerificationClients,
  getVerificationFolder,
})(ProjectVerification);
