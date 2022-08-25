import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Select from "react-select";
import ChangeProjectLifeCycle from "./ChangeProjectLifeCycle";
import Spinner from "../layout/Spinner";
import EditProject from "./EditProject";
import {
  getJobQueueProjectDeatils,
  getAllProjectStatus,
  getAllFolder,
  getLatestChanges,
} from "../../actions/projects";
import JobHistory from "./JobHistory";
import JobNotes from "./JobNotes";
import {
  AddProjectTrack,
  getAllchanges,
  getUpdatedProjectStaus,
  // getUpdatedProjectStausForDailyJobSheet,
} from "../../actions/projects";
import AllLatestChange from "./AllLatestChange";
import { w3cwebsocket } from "websocket";
import DeactiveProject from "./DeactiveProject";
//client in websocket
//SLAP IP
const client = new w3cwebsocket("ws://192.168.6.159:8000");

const JobQueue = ({
  auth: { isAuthenticated, user, users },
  project: { jobQueueProjects, allProjectStatus, allFolderName },
  getJobQueueProjectDeatils,
  AddProjectTrack,
  getAllchanges,
  getAllProjectStatus,
  getAllFolder,
  getUpdatedProjectStaus,
  getLatestChanges,
  // getUpdatedProjectStausForDailyJobSheet,
}) => {
  useEffect(() => {
    client.onopen = () => {
      console.log("webSocket client connected");
    };
    // client.onmessage = (message) => {
    //   getUpdatedProjectStaus();
    //   // getUpdatedProjectStausForDailyJobSheet();
    // };
  }, []);
  useEffect(() => {
    getJobQueueProjectDeatils();
  }, [getJobQueueProjectDeatils]);
  useEffect(() => {
    getAllProjectStatus();
  }, [getAllProjectStatus]);
  useEffect(() => {
    getAllFolder();
  }, [getAllFolder]);

  const [filterData, setFilterData] = useState("");
  getJobQueueProjectDeatils(filterData);

  // const [sliderValue, setSliderValue] = useState([]);
  const StatusCategory = [
    { value: "Amend", label: "Amend" },
    { value: "Normal", label: "Normal" },
    { value: "Dont Work", label: "Dont Work" },
    { value: "Additional Instruction", label: "Additional Instruction" },
  ];
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
  const [showProjectCycleModal, setShowProjectCycleModal] = useState(false);
  const handleProjectCycleModalClose = () => setShowProjectCycleModal(false);

  const onProjectCycleModalChange = (e) => {
    if (e) {
      handleProjectCycleModalClose();
    }
  };

  const [clientData, setClientData] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientFolderName, setClientName] = useState("");

  const activeClientsOpt = [];
  allFolderName &&
    allFolderName.map((clientsData) =>
      activeClientsOpt.push({
        label: clientsData._id,
        value: clientsData._id,
      })
    );
  const onClientChange = (e) => {
    setClientData(e);
    const finalData = {
      folderNameSearch: e.value,
      statusCategory: statusData.value,
    };
    setFilterData(finalData);
    getJobQueueProjectDeatils(finalData);
  };

  // Modal
  const projectStatusOpt = [];
  allProjectStatus.map((projStatusData) =>
    projectStatusOpt.push({
      label: projStatusData.projectStatusType,
      value: projStatusData._id,
    })
  );

  const [statusChangeValue, setStatusChange] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const onSliderChange = (jobQueueProjects) => (e) => {
    if (
      e.label === "Downloaded" ||
      e.label === "Uploaded" ||
      e.label === "QC DONE"
    ) {
      setStatusValue(e);
      let finalData = {
        projectTrackStatusId: e.value,
        projectStatusType: e.label,
        projectId: jobQueueProjects._id,
        projectStatusChangedbyName: user.empFullName,
        projectStatusChangedById: user._id,
      };

      AddProjectTrack(finalData);
      client.send(
        JSON.stringify({
          type: "message",
          msg: "/JobQueue",
        })
      );
      // setStatusChange(finalData);
      // setShowProjectCycleModal(false);
    } else if (e.label === "Amend_Uploaded") {
      setStatusValue(e);
      let finalData = {
        projectTrackStatusId: e.value,
        projectStatusType: e.label,
        projectId: jobQueueProjects._id,
        projectStatusChangedbyName: user.empFullName,
        projectStatusChangedById: user._id,
        amendmentCounter: "1",
      };

      AddProjectTrack(finalData);
      client.send(
        JSON.stringify({
          type: "message",
          msg: "/JobQueue",
        })
      );
    } else {
      setStatusValue(e);
      let newStatusData = {
        statusId: e.value,
        value: e.label,
        projectId: jobQueueProjects._id,
      };
      setStatusChange(newStatusData);
      setShowProjectCycleModal(true);
    }
  };

  const onRadioProjCatTypeChange = (e) => {
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

  const [showEditModal, setShowEditModal] = useState(false);
  const handleEditModalClose = () => setShowEditModal(false);

  const onEditModalChange = (e) => {
    if (e) {
      handleEditModalClose();
    }
  };
  const [userDatas, setUserDatas] = useState(null);
  const onUpdate = (jobQueueProjects, idx) => {
    localStorage.removeItem("activeClientData");
    setShowEditModal(true);
    setUserDatas(jobQueueProjects);
  };
  const [formData, setFormData] = useState({
    radioselect: "",
    projectStatusCategory: "",
    isSubmitted: false,
  });

  const [showhistoryModal, setshowhistoryModal] = useState(false);
  const handlehistoryModalClose = () => setshowhistoryModal(false);

  const onhistoryModalChange = (e) => {
    if (e) {
      handlehistoryModalClose();
    }
  };

  const [userDatas1, setUserDatas1] = useState(null);
  const onhistory = (jobQueueProjects, idx) => {
    const finalData = {
      projectId: jobQueueProjects._id,
    };
    localStorage.removeItem("getLatestChangesDetails");

    getLatestChanges(finalData);
    setshowhistoryModal(true);
    setUserDatas1(jobQueueProjects);
  };

  const [showAllChangeModal, setshowAllChangeModal] = useState(false);
  const handleAllChangeModalClose = () => setshowAllChangeModal(false);

  const onAllChange = (e) => {
    if (e) {
      handleAllChangeModalClose();
    }
  };

  const [userDatas3, setUserDatas3] = useState(null);
  const handleGoToAllLatestChange = (jobQueueProjects, idx) => {
    const finalData = {
      projectId: jobQueueProjects._id,
    };
    getAllchanges(finalData);
    setshowAllChangeModal(true);
    setUserDatas3(jobQueueProjects);
  };

  const [shownotesModal, setshownotesModal] = useState(false);
  const handlenotesModalClose = () => setshownotesModal(false);

  const onnotesModalChange = (e) => {
    if (e) {
      handlenotesModalClose();
    }
  };

  const [userDatas2, setUserDatas2] = useState(null);
  const onnotes = (jobQueueProjects, idx) => {
    setshownotesModal(true);
    setUserDatas2(jobQueueProjects);
  };
  const { projectStatusCategory } = formData;

  // const [isSubmitted, setSubmitted] = useState(false);
  // const handleGoToAllLatestChange = (jobQueueProjects) => {
  //   const finalData = {
  //     projectId: jobQueueProjects._id,
  //   };

  //   getAllchanges(finalData);
  //   setSubmitted(true);
  // };
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
  const customStyles = {
    option: (provided, state) => ({
      ...provided,

      borderBottom: "1px  black",
      color: "red",
      // padding: 20,
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      width: 200,
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };
  const [statusData, setstatusData] = useState("");
  const onStatuscatChange = (e) => {
    if (e) {
      setFormData({
        ...formData,
        projectStatusCategory: e,
      });
    }
    setstatusData(e);
    const finalData = {
      statusCategory: e.value,
      folderNameSearch: clientData.value,
    };
    setFilterData(finalData);
    getJobQueueProjectDeatils(finalData);
  };

  const onClickReset = () => {
    getJobQueueProjectDeatils("");
    setClientData("");
    setFilterData("");
    setFormData({
      ...formData,
      projectStatusCategory: "",
    });
  };

  const onstatusTypeSelect = (statusType) => {
    const finalData = {
      statusType: statusType,
    };
    setFilterData(finalData);
    getJobQueueProjectDeatils(finalData);
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className=" col-lg-1 col-md-11 col-sm-10 col-10">
              <h5 className="heading_color">Job Queue</h5>
            </div>
            <div className="col-lg-2 col-md-11 col-sm-10 col-10 py-2">
              <Select
                name="clientData"
                isSearchable={true}
                value={clientData}
                options={activeClientsOpt}
                placeholder="Select Folder"
                onChange={(e) => onClientChange(e)}
              />
            </div>
            <div className="col-lg-2 col-md-11 col-sm-10 col-10 py-2">
              <Select
                name="projectStatusCategory"
                options={StatusCategory}
                isSearchable={true}
                value={projectStatusCategory}
                placeholder="Select Status Category"
                onChange={(e) => onStatuscatChange(e)}
              />
            </div>

            <div className="col-lg-7 col-md-11 col-sm-12 col-11 py-3">
              <button
                className="btn btn_green_bg float-right"
                onClick={() => onClickReset()}
              >
                Refresh
              </button>
              {(user.userGroupName && user.userGroupName === "Administrator") ||
              user.userGroupName === "Super Admin" ||
              user.userGroupName === "Clarical Admins" ? (
                <Link
                  className="btn btn_green_bg float-right"
                  to="/add-Project"
                >
                  Add Project
                </Link>
              ) : (
                <></>
              )}
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
                          <th style={{ width: "10%" }}>Client Name</th>
                        ) : (
                          <></>
                        )}

                        <th style={{ width: "6%" }}>Folder </th>
                        <th style={{ width: "6%" }}>Path</th>
                        <th style={{ width: "20%" }}>Project Name</th>

                        <th style={{ width: "12%" }}>Queue Duration</th>
                        <th style={{ width: "10%" }}>Estimated Time</th>
                        <th style={{ width: "10%" }}>Job Time</th>
                        {/* <th style={{ width: "2%" }}>Priority</th> */}
                        <th style={{ width: "2%" }}>Deadline</th>
                        <th style={{ width: "3%" }}>Qty</th>
                        <th style={{ width: "8%" }}>Output Format</th>
                        <th style={{ width: "13%" }}>Status</th>
                        {/* <th style={{ width: "5%" }}>Latest Change</th>
                        <th style={{ width: "5%" }}>Job Notes</th> */}
                        {/* SLAP UserGroupRights */}
                        {(user.userGroupName &&
                          user.userGroupName === "Administrator") ||
                        user.userGroupName === "Super Admin" ||
                        user.userGroupName === "Clarical Admins" ||
                        user.userGroupName === "Quality Controller" ||
                        user.userGroupName === "Distributors" ? (
                          <th style={{ width: "3%" }}>OP</th>
                        ) : (
                          <></>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {jobQueueProjects &&
                        jobQueueProjects.map((jobQueueProjects, idx) => {
                          projectQty += jobQueueProjects.projectQuantity;
                          let statusType = jobQueueProjects.projectStatusType;
                          if (statusType === "Downloading") downloadingQty += 1;
                          if (statusType === "Working") WorkingQty += 1;
                          if (statusType === "Pending") PendingQty += 1;
                          if (statusType === "QC Pending") QCPendingQty += 1;
                          if (statusType === "QC Estimate") QCEstimateQty += 1;
                          if (statusType === "Uploading") UploadingQty += 1;
                          let estimatedTimeVal = "",
                            jobTime = "",
                            timeOut = false;
                          if (jobQueueProjects.ptEstimatedTime) {
                            estimatedTimeVal =
                              jobQueueProjects.ptEstimatedTime.split(":");
                            jobTime = dhm(jobQueueProjects.ptEstimatedDateTime);
                            if (
                              Number(jobTime[1]) >=
                              Number(
                                estimatedTimeVal[0] + "" + estimatedTimeVal[1]
                              )
                            ) {
                              timeOut = true;
                            }
                          }

                          return (
                            <tr key={idx}>
                              {/* SLAP UserGroupRights */}
                              {(user.userGroupName &&
                                user.userGroupName === "Administrator") ||
                              user.userGroupName === "Super Admin" ? (
                                <td>{jobQueueProjects.clientName}</td>
                              ) : (
                                <></>
                              )}
                              <td>
                                <b>{jobQueueProjects.clientFolderName}</b>
                              </td>
                              <td
                              // onClick={() => {
                              //   navigator.clipboard.writeText(
                              //     jobQueueProjects.inputpath
                              //   );
                              // }}
                              >
                                <button
                                  className="btn btn_green_bg "
                                  onClick={() => {
                                    navigator.clipboard.writeText(
                                      jobQueueProjects.inputpath
                                    );
                                    window.alert("Path Copied");
                                  }}
                                >
                                  Copy
                                </button>
                              </td>
                              <td>
                                {/* SLAP UserGroupRights */}
                                {(user.userGroupName &&
                                  user.userGroupName === "Administrator") ||
                                user.userGroupName === "Super Admin" ||
                                user.userGroupName === "Clarical Admins" ? (
                                  <>
                                    <img
                                      className="img_icon_size log float-left "
                                      onClick={() =>
                                        handleGoToAllLatestChange(
                                          jobQueueProjects
                                        )
                                      }
                                      src={require("../../static/images/colortheme.png")}
                                      alt="Last change"
                                      title="Last change"
                                    />
                                  </>
                                ) : (
                                  <></>
                                )}
                                <Link
                                  className="float-left ml-3"
                                  to="#"
                                  onClick={() => onnotes(jobQueueProjects, idx)}
                                >
                                  {jobQueueProjects.projectName}
                                </Link>
                              </td>

                              <td>
                                {
                                  dhm(
                                    jobQueueProjects.projectDate +
                                      ", " +
                                      jobQueueProjects.projectTime
                                  )[0]
                                }
                              </td>
                              <td>
                                {jobQueueProjects.ptEstimatedTime &&
                                  estimatedTimeVal[0] +
                                    " hr : " +
                                    estimatedTimeVal[1] +
                                    " min"}
                              </td>
                              <td>
                                {timeOut ? (
                                  <span style={{ color: "red" }}>
                                    {jobQueueProjects.ptEstimatedDateTime &&
                                      jobTime[0]}
                                  </span>
                                ) : (
                                  <span>
                                    {jobQueueProjects.ptEstimatedDateTime &&
                                      jobTime[0]}
                                  </span>
                                )}
                              </td>
                              {/* <td>{jobQueueProjects.projectPriority}</td> */}
                              <td>{jobQueueProjects.projectDeadline}</td>
                              <td>
                                {jobQueueProjects.projectQuantity}&nbsp;
                                {jobQueueProjects.projectUnconfirmed ===
                                  true && (
                                  <span style={{ color: "red" }}>*</span>
                                )}
                              </td>
                              <td>{jobQueueProjects.outputformat}</td>
                              <td>
                                {/* SLAP UserGroupRights */}
                                {(user.userGroupName &&
                                  user.userGroupName === "Administrator") ||
                                user.userGroupName === "Super Admin" ||
                                user.userGroupName === "Clarical Admins" ||
                                user.userGroupName === "Quality Controller" ||
                                user.userGroupName === "Distributors" ? (
                                  <>
                                    <img
                                      className="img_icon_size log float-left mt-2"
                                      onClick={() =>
                                        onhistory(jobQueueProjects, idx)
                                      }
                                      src={require("../../static/images/colortheme.png")}
                                      alt="Last change"
                                      title="Last change"
                                    />

                                    <Select
                                      className="ml-4"
                                      styles={{
                                        control: (base) => ({
                                          ...base,
                                          background: "#456792",
                                        }),
                                        singleValue: (base) => ({
                                          ...base,
                                          color: "#fff",
                                        }),
                                        input: (base) => ({
                                          ...base,
                                          color: "#fff",
                                        }),
                                      }}
                                      name="projectStatusData"
                                      value={{
                                        label:
                                          jobQueueProjects.projectStatusType,
                                        value: jobQueueProjects.projectStatusId,
                                      }}
                                      options={projectStatusOpt}
                                      isSearchable={true}
                                      placeholder="Select"
                                      onChange={onSliderChange(
                                        jobQueueProjects
                                      )}
                                    />
                                  </>
                                ) : (
                                  <>
                                    <label>
                                      {jobQueueProjects.projectStatusType}
                                    </label>
                                  </>
                                )}
                              </td>
                              {/* <td>
                                {" "}
                                <Link
                                  to="#"
                                  className="btnLink"
                                  onClick={() =>
                                    onhistory(jobQueueProjects, idx)
                                  }
                                >
                                  {jobQueueProjects.projectStatusType}
                                </Link>
                              </td>
                              <td>
                                {" "}
                                <Link
                                  to="#"
                                  className="btnLink"
                                  onClick={() => onnotes(jobQueueProjects, idx)}
                                >
                                  Notes
                                </Link>
                              </td> */}
                              {/* SLAP UserGroupRights */}
                              {(user.userGroupName &&
                                user.userGroupName === "Administrator") ||
                              user.userGroupName === "Super Admin" ||
                              user.userGroupName === "Clarical Admins" ||
                              user.userGroupName === "Quality Controller" ||
                              user.userGroupName === "Distributors" ? (
                                <td>
                                  {(user.userGroupName &&
                                    user.userGroupName === "Administrator") ||
                                  user.userGroupName === "Super Admin" ||
                                  user.userGroupName === "Clarical Admins" ? (
                                    <img
                                      className="img_icon_size log"
                                      onClick={() =>
                                        onDeactive(jobQueueProjects, idx)
                                      }
                                      src={require("../../static/images/delete.png")}
                                      alt="Delete Project"
                                      title="Delete Project"
                                    />
                                  ) : (
                                    <></>
                                  )}
                                  <img
                                    className="img_icon_size log ml-2"
                                    onClick={() =>
                                      onUpdate(jobQueueProjects, idx)
                                    }
                                    src={require("../../static/images/edit_icon.png")}
                                    alt="Edit"
                                    title="Edit"
                                  />
                                  <br />
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
            <Link
              to="#"
              className="btnLink"
              onClick={() => onstatusTypeSelect("Downloading")}
            >
              Downloading:{downloadingQty}
            </Link>
            &emsp;
            <Link
              to="#"
              className="btnLink"
              onClick={() => onstatusTypeSelect("Working")}
            >
              Working : {WorkingQty}
            </Link>
            &emsp;
            <Link
              to="#"
              className="btnLink"
              onClick={() => onstatusTypeSelect("Pending")}
            >
              Pending : {PendingQty}
            </Link>
            &emsp;
            <Link
              to="#"
              className="btnLink"
              onClick={() => onstatusTypeSelect("QC Pending")}
            >
              QC Pending: {QCPendingQty}
            </Link>
            &emsp;
            <Link
              to="#"
              className="btnLink"
              onClick={() => onstatusTypeSelect("QC Estimate")}
            >
              QC Estimate : {QCEstimateQty}
            </Link>
            &emsp;
            <Link
              to="#"
              className="btnLink"
              onClick={() => onstatusTypeSelect("Uploading")}
            >
              Uploading: {UploadingQty}
            </Link>
          </div>
          <div className="col-lg-1 col-md-6 col-sm-6 col-12 align_right">
            Projects:{jobQueueProjects.length}
          </div>
          <div className="col-lg-1 col-md-6 col-sm-6 col-12 align_right">
            Quantity:{projectQty}
          </div>
        </div>

        <Modal
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
        </Modal>
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
      </Modal>

      <Modal
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
      </Modal>

      <Modal
        show={shownotesModal}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <div className="col-lg-11 col-md-10 col-sm-10 col-10">
            <h3 className="modal-title text-center">Project Notes </h3>
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
      </Modal>

      <Modal
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
      </Modal>
    </Fragment>
  );
};

JobQueue.propTypes = {
  auth: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  getJobQueueProjectDeatils: PropTypes.func.isRequired,
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
  getJobQueueProjectDeatils,
  getAllProjectStatus,
  getAllFolder,
  getUpdatedProjectStaus,
  getLatestChanges,
  // getUpdatedProjectStausForDailyJobSheet,
})(JobQueue);
