import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { Modal } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import Select from "react-select";
// import ChangeProjectLifeCycle from "./ChangeProjectLifeCycle";
import Spinner from "../layout/Spinner";
// import EditProject from "./EditProject";
import {
  getverificationProjectDeatils,
  getAllProjectStatus,
  getAllFolder,
  getLatestChanges,
} from "../../actions/projects";
// import JobHistory from "./JobHistory";
// import JobNotes from "./JobNotes";
import {
  AddProjectTrack,
  getAllchanges,
  getUpdatedProjectStaus,
  // getUpdatedProjectStausForDailyJobSheet,
} from "../../actions/projects";
// import AllLatestChange from "./AllLatestChange";
import { w3cwebsocket } from "websocket";
// import DeactiveProject from "./DeactiveProject";
//client in websocket
//SLAP IP
const client = new w3cwebsocket("ws://192.168.6.216:8000");

const ProjectVerification = ({
  auth: { isAuthenticated, user, users },
  project: { unVerifiedProjects, allProjectStatus, allFolderName },
  getverificationProjectDeatils,
  // AddProjectTrack,
  //  getAllchanges,
  getAllProjectStatus,
  getAllFolder,
  getUpdatedProjectStaus,
  // getLatestChanges,
  // getUpdatedProjectStausForDailyJobSheet,
}) => {
  useEffect(() => {
    client.onopen = () => {
      console.log("webSocket client connected");
    };
    client.onmessage = (message) => {
      getUpdatedProjectStaus();
      // getUpdatedProjectStausForDailyJobSheet();
    };
  }, []);
  useEffect(() => {
    getverificationProjectDeatils();
  }, [getverificationProjectDeatils]);
  useEffect(() => {
    getAllProjectStatus();
  }, [getAllProjectStatus]);
  useEffect(() => {
    getAllFolder();
  }, [getAllFolder]);
  // console.log(user);
  const [filterData, setFilterData] = useState("");
  getverificationProjectDeatils(filterData);

  // const [sliderValue, setSliderValue] = useState([]);

  function dhm(pDateTime) {
    let pStartDate = new Date(pDateTime);
    let pEndDate = new Date();
    let ms = Math.abs(pStartDate - pEndDate);
    const days = Math.floor(ms / (24 * 60 * 60 * 1000));
    const daysms = ms % (24 * 60 * 60 * 1000);
    const hours = Math.floor(daysms / (60 * 60 * 1000));
    const hoursms = ms % (60 * 60 * 1000);
    const minutes = Math.floor(hoursms / (60 * 1000));
    const minutesms = ms % (60 * 1000);
    const sec = Math.floor(minutesms / 1000);
    return [
      days + " d : " + hours + " h : " + minutes + " m : " + sec + " s",
      hours.length === 1
        ? "0" + hours
        : hours + "" + minutes.length === 1
        ? "0" + minutes
        : minutes,
    ];
  }

  // On change ProjectCycle
  // const [showProjectCycleModal, setShowProjectCycleModal] = useState(false);
  // const handleProjectCycleModalClose = () => setShowProjectCycleModal(false);

  // const onProjectCycleModalChange = (e) => {
  //   if (e) {
  //     handleProjectCycleModalClose();
  //   }
  // };
  // console.log(allFolderName);
  // const [clientData, setClientData] = useState("");
  // const [clientId, setClientId] = useState("");
  // const [clientFolderName, setClientName] = useState("");

  // const activeClientsOpt = [];
  // allFolderName &&
  //   allFolderName.map((clientsData) =>
  //     activeClientsOpt.push({
  //       label: clientsData._id,
  //       value: clientsData._id,
  //     })
  //   );
  // const onClientChange = (e) => {
  //   setClientData(e);
  //   const finalData = {
  //     folderNameSearch: e.value,
  //   };
  //   setFilterData(finalData);
  //   getverificationProjectDeatils(finalData);
  // };

  // Modal
  // const projectStatusOpt = [];
  // allProjectStatus.map((projStatusData) =>
  //   projectStatusOpt.push({
  //     label: projStatusData.projectStatusType,
  //     value: projStatusData._id,
  //   })
  // );

  // const [statusChangeValue, setStatusChange] = useState("");
  // const [statusValue, setStatusValue] = useState("");
  // const onSliderChange = (unVerifiedProjects) => (e) => {
  //   if (
  //     e.label === "Downloaded" ||
  //     e.label === "Uploaded" ||
  //     e.label === "Amend_Uploaded" ||
  //     e.label === "QC DONE"
  //   ) {
  //     setStatusValue(e);
  //     let finalData = {
  //       projectTrackStatusId: e.value,
  //       projectStatusType: e.label,
  //       projectId: unVerifiedProjects._id,
  //       projectStatusChangedbyName: user.empFullName,
  //       projectStatusChangedById: user._id,
  //     };

  //     AddProjectTrack(finalData);
  //     client.send(
  //       JSON.stringify({
  //         type: "message",
  //         msg: "/JobQueue",
  //       })
  //     );
  //   } else {
  //     setStatusValue(e);
  //     let newStatusData = {
  //       statusId: e.value,
  //       value: e.label,
  //       projectId: unVerifiedProjects._id,
  //     };
  //     setStatusChange(newStatusData);
  //     setShowProjectCycleModal(true);
  //   }
  // };

  const onRadioProjCatTypeChange = (e) => {
    // console.log(e.target.value);
    // if (e.target.value === "student") {
    //   setFormData({ ...formData, userRole: e.target.value });
    // } else {
    //   setFormData({ ...formData, userRole: e.target.value });
    // }
  };
  let projectQty = 0,
    downloadingQty = 0,
    WorkingQty = 0,
    PendingQty = 0,
    QCPendingQty = 0,
    QCEstimateQty = 0,
    UploadingQty = 0;

  // const [showEditModal, setShowEditModal] = useState(false);
  // const handleEditModalClose = () => setShowEditModal(false);

  const onClickReset = () => {
    getverificationProjectDeatils("");
    // setClientData("");
    setFilterData("");
  };

  // const onEditModalChange = (e) => {
  //   if (e) {
  //     handleEditModalClose();
  //   }
  // };
  // const [userDatas, setUserDatas] = useState(null);
  // const onUpdate = (unVerifiedProjects, idx) => {
  //   localStorage.removeItem("activeClientData");
  //   setShowEditModal(true);
  //   setUserDatas(unVerifiedProjects);
  // };
  const [formData, setFormData] = useState({
    radioselect: "",
    isSubmitted: false,
  });

  // const [showhistoryModal, setshowhistoryModal] = useState(false);
  // const handlehistoryModalClose = () => setshowhistoryModal(false);

  // const onhistoryModalChange = (e) => {
  //   if (e) {
  //     handlehistoryModalClose();
  //   }
  // };

  // const [userDatas1, setUserDatas1] = useState(null);
  // const onhistory = (unVerifiedProjects, idx) => {
  //   const finalData = {
  //     projectId: unVerifiedProjects._id,
  //   };
  //   getLatestChanges(finalData);
  //   setshowhistoryModal(true);
  //   setUserDatas1(unVerifiedProjects);
  // };

  // const [showAllChangeModal, setshowAllChangeModal] = useState(false);
  // const handleAllChangeModalClose = () => setshowAllChangeModal(false);

  // const onAllChange = (e) => {
  //   if (e) {
  //     handleAllChangeModalClose();
  //   }
  // };

  // const [userDatas3, setUserDatas3] = useState(null);
  // const handleGoToAllLatestChange = (unVerifiedProjects, idx) => {
  //   const finalData = {
  //     projectId: unVerifiedProjects._id,
  //   };
  //   getAllchanges(finalData);
  //   setshowAllChangeModal(true);
  //   setUserDatas3(unVerifiedProjects);
  // };

  // const [shownotesModal, setshownotesModal] = useState(false);
  // const handlenotesModalClose = () => setshownotesModal(false);

  // const onnotesModalChange = (e) => {
  //   if (e) {
  //     handlenotesModalClose();
  //   }
  // };

  // const [userDatas2, setUserDatas2] = useState(null);
  // const onnotes = (unVerifiedProjects, idx) => {
  //   setshownotesModal(true);
  //   setUserDatas2(unVerifiedProjects);
  // };
  const { radioselect } = formData;
  const onstatuscategrorySelect = (statuscategrory) => {
    if (statuscategrory === "Normal") {
      setFormData({
        ...formData,
        radioselect: "Normal",
      });
    } else if (statuscategrory === "Amendment") {
      setFormData({
        ...formData,
        radioselect: "Amendment",
      });
    } else if (statuscategrory === "Additional Instruction") {
      setFormData({
        ...formData,
        radioselect: "Additional Instruction",
      });
    } else if (statuscategrory === "Don't Work") {
      setFormData({
        ...formData,
        radioselect: "Don't Work",
      });
    } else {
      setFormData({
        ...formData,
        radioselect: "",
      });
    }
  };
  // console.log(radioselect);

  // const [isSubmitted, setSubmitted] = useState(false);
  // const handleGoToAllLatestChange = (unVerifiedProjects) => {
  //   const finalData = {
  //     projectId: unVerifiedProjects._id,
  //   };

  //   getAllchanges(finalData);
  //   setSubmitted(true);
  // };
  // const [userDatadeactive, setUserDatadeactive] = useState(null);
  // const onDeactive = (unVerifiedProjects, idx) => {
  //   setShowDeactiveModal(true);
  //   setUserDatadeactive(unVerifiedProjects);
  // };

  // const [showDeactiveModal, setShowDeactiveModal] = useState(false);
  // const handleDeactiveModalClose = () => setShowDeactiveModal(false);

  // const onDeactiveModalChange = (e) => {
  //   if (e) {
  //     handleDeactiveModalClose();
  //   }
  // };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className=" col-lg-3 col-md-11 col-sm-10 col-10">
              <h5 className="heading_color">Job Verification</h5>
            </div>
            {/* <div className="col-lg-2 col-md-11 col-sm-10 col-10 py-2">
              <Select
                name="clientData"
                isSearchable={true}
                value={clientData}
                options={activeClientsOpt}
                placeholder="Select"
                onChange={(e) => onClientChange(e)}
              />
            </div> */}
            <div className="col-lg-9 col-md-11 col-sm-12 col-11 py-3">
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
                    className="table table-bordered table-striped table-hover"
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
                        {/* <th style={{ width: "10%" }}>Queue Duration</th> */}
                        {/* <th style={{ width: "10%" }}>Estimated Time</th> */}
                        {/* <th style={{ width: "10%" }}>Job Time</th> */}
                        <th style={{ width: "2%" }}>Priority</th>
                        <th style={{ width: "2%" }}>Deadline</th>
                        <th style={{ width: "2%" }}>Qty</th>
                        <th style={{ width: "13%" }}>Status</th>
                        {/* <th style={{ width: "5%" }}>Latest Change</th>
                        <th style={{ width: "5%" }}>Job Notes</th> */}
                        {/* SLAP UserGroupRights */}
                        {(user.userGroupName &&
                          user.userGroupName === "Administrator") ||
                        user.userGroupName === "Super Admin" ||
                        user.userGroupName === "Clarical Admins" ||
                        user.userGroupName === "Quality Controller" ? (
                          <th style={{ width: "10%" }}>OP</th>
                        ) : (
                          <></>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {unVerifiedProjects &&
                        unVerifiedProjects.map((unVerifiedProjects, idx) => {
                          projectQty += unVerifiedProjects.projectQuantity;
                          let statusType = unVerifiedProjects.projectStatusType;
                          if (statusType === "Downloading") downloadingQty += 1;
                          if (statusType === "Working") WorkingQty += 1;
                          if (statusType === "Pending") PendingQty += 1;
                          if (statusType === "QC Pending") QCPendingQty += 1;
                          if (statusType === "QC Estimate") QCEstimateQty += 1;
                          if (statusType === "Uploading") UploadingQty += 1;
                          // let estimatedTimeVal = "",
                          //   jobTime = "",
                          //   timeOut = false;
                          // if (unVerifiedProjects.ptEstimatedTime) {
                          //   estimatedTimeVal =
                          //     unVerifiedProjects.ptEstimatedTime.split(":");
                          //   jobTime = dhm(unVerifiedProjects.ptEstimatedDateTime);
                          //   if (
                          //     Number(jobTime[1]) >=
                          //     Number(
                          //       estimatedTimeVal[0] + "" + estimatedTimeVal[1]
                          //     )
                          //   ) {
                          //     timeOut = true;
                          //   }
                          // }

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
                                {/* SLAP UserGroupRights */}
                                {/* {(user.userGroupName &&
                                  user.userGroupName === "Administrator") ||
                                user.userGroupName === "Super Admin" ||
                                user.userGroupName === "Clarical Admins" ? (
                                  <Link
                                    to="#"
                                    onClick={() =>
                                      handleGoToAllLatestChange(
                                        unVerifiedProjects
                                      )
                                    }
                                  >
                                    {unVerifiedProjects.projectName}
                                  </Link>
                                ) : (
                                  <> */}
                                <label>{unVerifiedProjects.projectName}</label>
                                {/* </>
                                )} */}
                              </td>
                              {/* <td>
                                {
                                  dhm(
                                    unVerifiedProjects.projectDate +
                                      ", " +
                                      unVerifiedProjects.projectTime
                                  )[0]
                                }
                              </td>
                              <td>
                                {unVerifiedProjects.ptEstimatedTime &&
                                  estimatedTimeVal[0] +
                                    " hr : " +
                                    estimatedTimeVal[1] +
                                    " min"}
                              </td>
                              <td>
                                {timeOut ? (
                                  <span style={{ color: "red" }}>
                                    {unVerifiedProjects.ptEstimatedDateTime &&
                                      jobTime[0]}
                                  </span>
                                ) : (
                                  <span>
                                    {unVerifiedProjects.ptEstimatedDateTime &&
                                      jobTime[0]}
                                  </span>
                                )}
                              </td> */}
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
                              {/* <td>
                                {" "}
                                <Link
                                  to="#"
                                  className="btnLink"
                                  onClick={() =>
                                    onhistory(unVerifiedProjects, idx)
                                  }
                                >
                                  {unVerifiedProjects.projectStatusType}
                                </Link>
                              </td>
                              <td>
                                {" "}
                                <Link
                                  to="#"
                                  className="btnLink"
                                  onClick={() => onnotes(unVerifiedProjects, idx)}
                                >
                                  Notes
                                </Link>
                              </td> */}
                              {/* SLAP UserGroupRights */}
                              {(user.userGroupName &&
                                user.userGroupName === "Administrator") ||
                              user.userGroupName === "Super Admin" ||
                              user.userGroupName === "Clarical Admins" ||
                              user.userGroupName === "Quality Controller" ? (
                                <td></td>
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
            {/* <label className="radio-inline ">
              <input
                type="radio"
                name="ProjCatType"
                className="radio_style"
                value="Normal"
                //onChange={(e) => onRadioProjCatTypeChange(e)}
                onClick={() => onstatuscategrorySelect("Normal")}
              />{" "}
              Normal
            </label>

            <label className="radio-inline ">
              <input
                type="radio"
                name="ProjCatType"
                className="radio_style"
                value="Amendment"
                //  onChange={(e) => onRadioProjCatTypeChange(e)}
                onClick={() => onstatuscategrorySelect("Amendment")}
              />{" "}
              Amendment
            </label>
            <label className="radio-inline ">
              <input
                type="radio"
                name="ProjCatType"
                className="radio_style"
                value="Additional Instruction"
                //onChange={(e) => onRadioProjCatTypeChange(e)}
                onClick={() =>
                  onstatuscategrorySelect("Additional Instruction")
                }
              />{" "}
              Additional Instruction
            </label>
            <label className="radio-inline ">
              <input
                type="radio"
                name="ProjCatType"
                className="radio_style"
                value="Don't Work"
                // onChange={(e) => onRadioProjCatTypeChange(e)}
                onClick={() => onstatuscategrorySelect("Don't Work")}
              />{" "}
              Don't Work
            </label> */}
          </div>
          <div className="col-lg-2 col-md-6 col-sm-6 col-12 align_right">
            Projects:{unVerifiedProjects.length}
          </div>
          <div className="col-lg-10 col-md-6 col-sm-6 col-12">
            <label>Downloading:{downloadingQty} &emsp;</label>
            <label>Working : {WorkingQty}&emsp;</label>
            <label>Pending : {PendingQty}&emsp;</label>
            <label>QC Pending: {QCPendingQty}&emsp;</label>
            <label>QC Estimate : {QCEstimateQty}&emsp;</label>
            <label>Uploading: {UploadingQty}&emsp;</label>
          </div>
          <div className="col-lg-2 col-md-6 col-sm-6 col-12 align_right">
            Quantity:{projectQty}
          </div>
        </div>

        {/* <Modal
          show={showProjectCycleModal}
          backdrop="static"
          keyboard={false}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <div className="col-lg-10">
              <center>
                <h3 className="modal-title text-center">Project Life Cycle</h3>
              </center>
            </div>
            <div className="col-lg-">
              <button onClick={handleProjectCycleModalClose} className="close">
                <img
                  src={require("../../static/images/close.png")}
                  alt="X"
                  style={{ height: "20px", width: "20px" }}
                />
              </button>
            </div>
          </Modal.Header>
          <Modal.Body>
            <ChangeProjectLifeCycle
              onProjectCycleModalChange={onProjectCycleModalChange}
              ProjectCycledata={statusChangeValue}
            />
          </Modal.Body>
        </Modal> */}
      </div>

      {/* <Modal
        show={showEditModal}
        backdrop="static"
        keyboard={false}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <div className="col-lg-10">
            <h3 className="modal-title text-center">Edit Project Details</h3>
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
          <EditProject
            onEditModalChange={onEditModalChange}
            allProjectdata={userDatas}
          />
        </Modal.Body>
      </Modal> */}

      {/* <Modal
        show={showhistoryModal}
        backdrop="static"
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <div className="col-lg-10 col-md-10 col-sm-10 col-10">
            <h3 className="modal-title text-center">Latest Changes </h3>
          </div>
          <div className="col-lg-2 col-md-2 col-sm-2 col-2">
            <button onClick={handlehistoryModalClose} className="close">
              <img
                src={require("../../static/images/close.png")}
                alt="X"
                style={{ height: "20px", width: "20px" }}
              />
            </button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <JobHistory
            onhistoryModalChange={onhistoryModalChange}
            allProjectdata={userDatas1}
          />
        </Modal.Body>
      </Modal> */}

      {/* <Modal
        show={shownotesModal}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <div className="col-lg-11 col-md-10 col-sm-10 col-10">
            <h3 className="modal-title text-center">Notes </h3>
          </div>
          <div className="col-lg-1 col-md-2 col-sm-2 col-2">
            <button onClick={handlenotesModalClose} className="close">
              <img
                src={require("../../static/images/close.png")}
                alt="X"
                style={{ height: "20px", width: "20px" }}
              />
            </button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <JobNotes
            onnotesModalChange={onnotesModalChange}
            allnotesdata={userDatas2}
          />
        </Modal.Body>
      </Modal> */}

      {/* <Modal
        show={showAllChangeModal}
        backdrop="static"
        keyboard={false}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <div className="col-lg-10 col-md-10 col-sm-10 col-10">
            <h3 className="modal-title text-center">All Latest Changes </h3>
          </div>
          <div className="col-lg-2 col-md-2 col-sm-2 col-2">
            <button onClick={handleAllChangeModalClose} className="close">
              <img
                src={require("../../static/images/close.png")}
                alt="X"
                style={{ height: "20px", width: "20px" }}
              />
            </button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <AllLatestChange
            onAllChange={onAllChange}
            AllChangedata={userDatas3}
          />
        </Modal.Body>
      </Modal> */}

      {/* <Modal
        show={showDeactiveModal}
        backdrop="static"
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <div className="col-lg-10">
            <h3 className="modal-title text-center">Deactivate Project</h3>
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
          <DeactiveProject
            onDeactiveModalChange={onDeactiveModalChange}
            Projectdeavtivedata={userDatadeactive}
          />
        </Modal.Body>
      </Modal> */}
    </Fragment>
  );
};

ProjectVerification.propTypes = {
  auth: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  getverificationProjectDeatils: PropTypes.func.isRequired,
  AddProjectTrack: PropTypes.func.isRequired,
  getAllchanges: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  project: state.project,
});

export default connect(mapStateToProps, {
  AddProjectTrack,
  getAllchanges,
  getverificationProjectDeatils,
  getAllProjectStatus,
  getAllFolder,
  getUpdatedProjectStaus,
  getLatestChanges,
  // getUpdatedProjectStausForDailyJobSheet,
})(ProjectVerification);
