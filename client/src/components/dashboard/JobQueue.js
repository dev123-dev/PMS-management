import React, { Fragment, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Select from "react-select";
import ChangeProjectLifeCycle from "./ChangeProjectLifeCycle";
import Spinner from "../layout/Spinner";
import EditProject from "./EditProject";
import axios from "axios";
import { CSVLink } from "react-csv";
import { allUsersRoute, host, sendMessageRoute } from "../../utils/APIRoutes";
import {
  getJobQueueProjectDeatils,
  getAllProjectStatus,
  getAllFolder,
  getLatestChanges,
  updateMsgSent,
} from "../../actions/projects";
import JobHistory from "./JobHistory";
import JobNotes from "./JobNotes";
import {
  AddProjectTrack,
  getAllchanges,
  getUpdatedProjectStaus,
  // getUpdatedProjectStausForDailyJobSheet,
} from "../../actions/projects";
import { getAllFollowUp, getAllSctCallCount1 } from "../../actions/sct";
import AllLatestChange from "./AllLatestChange";
import { w3cwebsocket } from "websocket";
import DeactiveProject from "./DeactiveProject";
import { io } from "socket.io-client";

//client in websocket
//SLAP IP
const client = new w3cwebsocket("ws://192.168.6.39:8000");

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
  getAllFollowUp,
  getAllSctCallCount1,
  // getUpdatedProjectStausForDailyJobSheet,
  updateMsgSent,
}) => {
  const socket = useRef();
  //const activeClientsOpt = [];
  const [clientData, setClientData] = useState("");
  useEffect(() => {
    getAllFollowUp();
    // console.log("localgetAllSctCallCount1", localAllSctCallCount1);
  }, []);

  useEffect(() => {
    getAllSctCallCount1();
  }, []);

  useEffect(() => {
    client.onopen = () => {
      console.log("webSocket client connected");
    };
    client.onmessage = (message) => {
      // if (clientData === "") {
      getUpdatedProjectStaus();
      // } else {
      // }
      // window.location.reload();
      // getUpdatedProjectStausForDailyJobSheet();
    };
  }, [clientData]);

  useEffect(() => {
    getJobQueueProjectDeatils();
  }, []);
  useEffect(() => {
    getAllProjectStatus();
  }, []);
  useEffect(() => {
    getAllFolder();
  }, []);

  const [contacts, setContacts] = useState([]);
  useEffect(async () => {
    const data = await axios.get(`${allUsersRoute}/${user._id}`);
    setContacts(data.data);
  }, []);
  useEffect(() => {
    if (user) {
      socket.current = io(host);
      socket.current.emit("add-user", user._id);
    }
  }, []);

  const [filterData, setFilterData] = useState("");
  // getJobQueueProjectDeatils(filterData);

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
    let hr = hours < 10 ? "0" + hours : hours;
    let mt = minutes < 10 ? "0" + minutes : minutes;
    return [
      days + " d : " + hours + " h : " + minutes + " m : " + sec + " s",
      hr + "" + mt,
    ];
  }
  const timeOutMsg = async (jobQueueProjects) => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    let msg = "5 mins remaining in" + jobQueueProjects.projectName + " Project";
    for (let i = 0; i < contacts.length; i++) {
      socket.current.emit("send-msg", {
        to: contacts[i]._id,
        from: data._id,
        msg,
      });
      // await axios.post(sendMessageRoute, {
      //   from: data._id,
      //   to: contacts[i]._id,
      //   message: msg,
      // });
    }
    updateMsgSent({ recordId: jobQueueProjects._id, timeOutMsgSent: 1 });
  };

  // On change ProjectCycle
  const [showProjectCycleModal, setShowProjectCycleModal] = useState(false);
  const handleProjectCycleModalClose = () => setShowProjectCycleModal(false);

  const onProjectCycleModalChange = (e) => {
    if (e) {
      handleProjectCycleModalClose();
    }
  };

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

  // const LocalallFolderName = JSON.parse(localStorage.getItem("AllFolderName"));
  // //console.log(LocalallFolderName);

  // const [activeClientsOpt, setactiveClientsOpt1] = useState(
  //   LocalallFolderName &&
  //     LocalallFolderName.map((clientsData) => ({
  //       label: clientsData && clientsData._id,
  //       value: clientsData && clientsData._id,
  //     }))
  // );

  const onClientChange = (e) => {
    // const getAllButSelected = activeClientsOpt.filter(
    //   (ele) => ele.label !== e.label
    // );

    // setactiveClientsOpt1([e, ...getAllButSelected]);

    setClientData(e);
    const finalData = {
      folderNameSearch: e.value,
      statusCategory: statusData.value,
    };

    var clientFolderName = "";
    clientFolderName = e.value;
    setClientName(clientFolderName);

    setFilterData(finalData);
    //cvonsole.log(e)
    getJobQueueProjectDeatils(finalData);
  };

  // const onClientChange = (e) => {
  //   setClientData(e);
  //   const finalData = {
  //     folderNameSearch: e.value,
  //     statusCategory: statusData.value,
  //   };

  //   var clientFolderName = "";
  //   clientFolderName = e.value;
  //   setClientName(clientFolderName);

  //   setFilterData(finalData);
  //   //cvonsole.log(e)
  //   getJobQueueProjectDeatils(finalData);
  // };

  // Modal
  let projectStatusOpt = [];
  allProjectStatus.map((projStatusData) =>
    projectStatusOpt.push({
      projectStatusCategory: projStatusData.projectStatusCategory,
      label: projStatusData.projectStatusType,
      value: projStatusData._id,
    })
  );

  // projectStatusOpt = projectStatusOpt.filter(
  //   (projectStatusOpt) =>
  //     projectStatusOpt.projectStatusCategory !== "Additional Instruction" &&
  //     projectStatusOpt.projectStatusCategory !== "Amend"
  // );

  let AIOpt = projectStatusOpt.filter(
    (projectStatusOpt) =>
      projectStatusOpt.projectStatusCategory === "Additional Instruction"
  );

  let AmendOpt = projectStatusOpt.filter(
    (projectStatusOpt) => projectStatusOpt.projectStatusCategory === "Amend"
  );
  let NormalOpt = projectStatusOpt.filter(
    (projectStatusOpt) =>
      projectStatusOpt.projectStatusCategory !== "Amend" &&
      projectStatusOpt.projectStatusCategory !== "Additional Instruction"
  );

  let allAI = [],
    allAmend = [];
  allProjectStatus.map((aps) => {
    if (aps.projectStatusCategory === "Additional Instruction")
      allAI.push(aps.projectStatusType);
    else if (aps.projectStatusCategory === "Amend")
      allAmend.push(aps.projectStatusType);
  });

  const [statusChangeValue, setStatusChange] = useState("");
  const [statusValue, setStatusValue] = useState("");
  ///////////////////////
  const onSliderChange = (jobQueueProjects) => async (e) => {
    if (
      e.label === "Downloaded" ||
      e.label === "Uploading" ||
      e.label === "Uploaded" ||
      e.label === "QC DONE" ||
      e.label === "Amend_Uploading" ||
      e.label === "Amend_Uploaded" ||
      e.label === "AI_Uploading" ||
      e.label === "AI_Uploaded"
    ) {
      setStatusValue(e);
      let finalData = {
        projectTrackStatusId: e.value,
        projectStatusType: e.label,
        projectId: jobQueueProjects._id,
        projectStatusChangedbyName: user.empFullName,
        projectTrackDateTime: new Date().toLocaleString("en-GB"),
        projectStatusChangedById: user._id,
      };
      AddProjectTrack(finalData);
      client.send(
        JSON.stringify({
          type: "message",
          msg: "/JobQueue",
        })
      );
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      let msg = "";
      if (e.label === "Downloaded") {
        msg =
          jobQueueProjects.clientFolderName +
          " - " +
          jobQueueProjects.projectName +
          " - " +
          jobQueueProjects.projectQuantity +
          " images downloaded. Please have a look.";
      } else if (e.label === "QC DONE") {
        msg =
          jobQueueProjects.clientFolderName +
          " - " +
          jobQueueProjects.projectName +
          " - " +
          jobQueueProjects.projectQuantity +
          " images QC DONE. Please upload.";
      }
      if (msg !== "") {
        for (let i = 0; i < contacts.length; i++) {
          socket.current.emit("send-msg", {
            to: contacts[i]._id,
            from: data._id,
            msg,
          });
          await axios.post(sendMessageRoute, {
            from: data._id,
            to: contacts[i]._id,
            message: msg,
          });
        }
      }
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
        projectTrackDateTime: new Date().toLocaleString("en-GB"),
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
        jobQueueProjects: jobQueueProjects,
      };
      setStatusChange(newStatusData);
      setShowProjectCycleModal(true);
    }
    const finalData = {
      folderNameSearch: clientFolderName,
    };

    if (clientData) {
      // getJobQueueProjectDeatils(finalData);
    }
  };
  //////////////////////////
  let projectQty = 0,
    downloadingQty = 0,
    WorkingQty = 0,
    PendingQty = 0,
    QCPendingQty = 0,
    QCEstimateQty = 0,
    UploadingQty = 0,
    QCDoneQty = 0;

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
    window.location.reload();
  };

  const onstatusTypeSelect = (statusType) => {
    const finalData = {
      statusType: statusType,
    };
    setFilterData(finalData);
    getJobQueueProjectDeatils(finalData);
  };

  const csvData = [
    [
      "Client Name",
      "Folder Name",
      "Staff Name",
      "Project Name",
      "Project Date ",
      "Status",
      "Qty",
      "Price",
      "Notes",
      // "Folder Name",
      // "Project Deadline",
      // "Entered By",
      // "Client Date Time",
      // "Project Status",
      // "Client Type",
      // "Project Working Status",
      // "projectPriority",
    ],
  ];

  jobQueueProjects.map((JobqueuesheetData) =>
    csvData.push([
      JobqueuesheetData.clientName,
      JobqueuesheetData.clientFolderName,
      JobqueuesheetData.staffName,
      JobqueuesheetData.projectName,
      JobqueuesheetData.projectDate,
      JobqueuesheetData.projectStatusType,
      JobqueuesheetData.projectQuantity,
      "",
      JobqueuesheetData.projectNotes.replaceAll("\n", " "),
      // dailyJobsheetData.clientFolderName,
      // dailyJobsheetData.projectDeadline,
      // dailyJobsheetData.projectEnteredByName,
      // dailyJobsheetData.clientDate + " : " + dailyJobsheetData.clientTime,
      // dailyJobsheetData.projectStatus,
      // dailyJobsheetData.clientTypeVal,
      // dailyJobsheetData.projectStatusType,
      // dailyJobsheetData.projectPriority,
    ])
  );
  const fileName = [clientFolderName ? clientFolderName : "Client Report"];

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div
            className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding"
            //  style={{ postion: "fixed" }}
          >
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
              {(user.userGroupName && user.userGroupName === "Administrator") ||
              user.userGroupName === "Super Admin" ||
              user.userGroupName === "Clarical Admins" ? (
                <CSVLink data={csvData} filename={fileName}>
                  <button className="btn btn_green_bg float-right">
                    Export
                  </button>
                </CSVLink>
              ) : (
                <></>
              )}
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
                    className="table table-bordered table-striped table-hover smll_row "
                    id="datatable2"
                    // style={{ marginBottom: "200px" }}
                  >
                    <thead>
                      <tr>
                        {/* SLAP UserGroupRights */}
                        {(user.userGroupName &&
                          user.userGroupName === "Administrator") ||
                        user.userGroupName === "Super Admin" ||
                        user.userGroupName === "Clarical Admins" ? (
                          <>
                            <th style={{ width: "8%" }}>Client Name</th>
                            <th style={{ width: "6%" }}>Staff Name</th>
                          </>
                        ) : (
                          <></>
                        )}

                        <th style={{ width: "4%" }}>Folder </th>
                        <th style={{ width: "6%" }}>Path</th>
                        <th style={{ width: "1%" }}></th>
                        <th style={{ width: "20%" }}>Project Name</th>

                        <th style={{ width: "12%" }}>Queue Duration</th>
                        <th style={{ width: "6%" }}>Estimated Time</th>
                        <th style={{ width: "10%" }}>Job Time</th>
                        <th style={{ width: "2%" }}>Deadline</th>
                        <th style={{ width: "3%" }}>Qty</th>
                        <th style={{ width: "5%" }}>Output Format</th>
                        <th style={{ width: "13%" }}>Status</th>
                        {/* <th style={{ width: "2%" }}>Target</th> */}
                        {/* <th style={{ width: "5%" }}>Latest Change</th>
                        <th style={{ width: "5%" }}>Job Notes</th> */}
                        {/* SLAP UserGroupRights */}
                        {(user.userGroupName &&
                          user.userGroupName === "Administrator") ||
                        user.userGroupName === "Super Admin" ||
                        user.userGroupName === "Clarical Admins" ||
                        user.userGroupName === "Quality Controller" ||
                        user.userGroupName === "Distributors" ? (
                          <th style={{ width: "4%" }}>OP</th>
                        ) : (
                          <></>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {jobQueueProjects &&
                        jobQueueProjects.map((JobQueueProject, idx) => {
                          let PST = JobQueueProject.projectStatusType;
                          projectQty += JobQueueProject.projectQuantity;
                          let statusType = JobQueueProject.projectStatusType;
                          if (statusType === "Downloading") downloadingQty += 1;
                          if (statusType === "Working") WorkingQty += 1;
                          if (statusType === "Pending") PendingQty += 1;
                          if (statusType === "QC Pending") QCPendingQty += 1;
                          if (statusType === "QC Estimate") QCEstimateQty += 1;
                          if (statusType === "Uploading") UploadingQty += 1;
                          if (statusType === "QC DONE") QCDoneQty += 1;
                          let estimatedTimeVal = "",
                            jobTime = "",
                            timeOut = false;
                          if (JobQueueProject.ptEstimatedTime) {
                            estimatedTimeVal =
                              JobQueueProject.ptEstimatedTime.split(":");
                            jobTime = dhm(JobQueueProject.ptEstimatedDateTime);
                            if (
                              Number(jobTime[1]) >=
                              Number(
                                estimatedTimeVal[0] + "" + estimatedTimeVal[1]
                              )
                            ) {
                              timeOut = true;
                            }

                            // if (
                            //   Number(
                            //     estimatedTimeVal[0] + "" + estimatedTimeVal[1]
                            //   ) -
                            //     Number(jobTime[1]) ===
                            //     5 &&
                            //   JobQueueProject.timeOutMsgSent === 0
                            // ) {
                            //   timeOutMsg(JobQueueProject);
                            // }
                          }

                          if (clientFolderName === "") {
                            return (
                              <tr key={idx}>
                                {/* SLAP UserGroupRights */}
                                {(user.userGroupName &&
                                  user.userGroupName === "Administrator") ||
                                user.userGroupName === "Super Admin" ||
                                user.userGroupName === "Clarical Admins" ? (
                                  <>
                                    <td>{JobQueueProject.clientName}</td>
                                    <td>{JobQueueProject.staffName}</td>
                                  </>
                                ) : (
                                  <></>
                                )}

                                <td>
                                  <b>{JobQueueProject.clientFolderName}</b>
                                </td>
                                <td
                                // onClick={() => {
                                //   navigator.clipboard.writeText(
                                //     JobQueueProject.inputpath
                                //   );
                                // }}
                                >
                                  <button
                                    className="btn btn_green_bg "
                                    onClick={() => {
                                      navigator.clipboard.writeText(
                                        JobQueueProject.inputpath
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
                                            JobQueueProject
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
                                </td>
                                <td>
                                  {" "}
                                  <Link
                                    className="float-left ml-3 aTagActiveRemoveClrBlk"
                                    to="#"
                                    onClick={() =>
                                      onnotes(JobQueueProject, idx)
                                    }
                                  >
                                    {JobQueueProject.projectName}
                                  </Link>
                                </td>
                                <td>
                                  {
                                    dhm(
                                      JobQueueProject.clientDate +
                                        ", " +
                                        JobQueueProject.clientTime
                                    )[0]
                                  }
                                </td>
                                <td>
                                  {JobQueueProject.ptEstimatedTime &&
                                    estimatedTimeVal[0] +
                                      " hr : " +
                                      estimatedTimeVal[1] +
                                      " min"}
                                </td>
                                <td>
                                  {timeOut ? (
                                    <span style={{ color: "red" }}>
                                      {JobQueueProject.ptEstimatedDateTime &&
                                        jobTime[0]}
                                    </span>
                                  ) : (
                                    <span>
                                      {JobQueueProject.ptEstimatedDateTime &&
                                        jobTime[0]}
                                    </span>
                                  )}
                                </td>

                                <td>{JobQueueProject.projectDeadline}</td>
                                <td>
                                  {JobQueueProject.projectQuantity}&nbsp;
                                  {JobQueueProject.projectUnconfirmed ===
                                    true && (
                                    <span style={{ color: "red" }}>*</span>
                                  )}
                                </td>
                                <td>{JobQueueProject.outputformat}</td>

                                <td>
                                  {idx === jobQueueProjects.length - 1 ||
                                  idx === jobQueueProjects.length - 2 ||
                                  idx === jobQueueProjects.length - 3 ||
                                  idx === jobQueueProjects.length - 4 ||
                                  idx === jobQueueProjects.length - 5 ||
                                  idx === jobQueueProjects.length - 6 ? (
                                    <>
                                      {/* SLAP UserGroupRights */}
                                      {(user.userGroupName &&
                                        user.userGroupName ===
                                          "Administrator") ||
                                      user.userGroupName === "Super Admin" ||
                                      user.userGroupName ===
                                        "Clarical Admins" ||
                                      user.userGroupName ===
                                        "Quality Controller" ||
                                      user.userGroupName === "Distributors" ||
                                      user.userGroupName === "Marketing" ? (
                                        <>
                                          <img
                                            className="img_icon_size log float-left mt-2"
                                            onClick={() =>
                                              onhistory(JobQueueProject, idx)
                                            }
                                            src={require("../../static/images/colortheme.png")}
                                            alt="Last change"
                                            title="Last change"
                                          />

                                          <Select
                                            className="ml-4"
                                            menuPlacement="top"
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
                                                JobQueueProject.projectStatusType,
                                              value:
                                                JobQueueProject.projectStatusId,
                                            }}
                                            options={
                                              allAI.includes(PST)
                                                ? AIOpt
                                                : allAmend.includes(PST)
                                                ? AmendOpt
                                                : NormalOpt
                                            }
                                            isSearchable={true}
                                            placeholder="Select"
                                            onChange={onSliderChange(
                                              JobQueueProject
                                            )}
                                          />
                                        </>
                                      ) : (
                                        <>
                                          <label>
                                            {JobQueueProject.projectStatusType}
                                          </label>
                                        </>
                                      )}
                                    </>
                                  ) : (
                                    <>
                                      {/* SLAP UserGroupRights */}
                                      {(user.userGroupName &&
                                        user.userGroupName ===
                                          "Administrator") ||
                                      user.userGroupName === "Super Admin" ||
                                      user.userGroupName ===
                                        "Clarical Admins" ||
                                      user.userGroupName ===
                                        "Quality Controller" ||
                                      user.userGroupName === "Distributors" ||
                                      user.userGroupName === "Marketing" ? (
                                        <>
                                          <img
                                            className="img_icon_size log float-left mt-2"
                                            onClick={() =>
                                              onhistory(JobQueueProject, idx)
                                            }
                                            src={require("../../static/images/colortheme.png")}
                                            alt="Last change"
                                            title="Last change"
                                          />

                                          <Select
                                            className="ml-4"
                                            menuPlacement="auto"
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
                                                JobQueueProject.projectStatusType,
                                              value:
                                                JobQueueProject.projectStatusId,
                                            }}
                                            options={
                                              allAI.includes(PST)
                                                ? AIOpt
                                                : allAmend.includes(PST)
                                                ? AmendOpt
                                                : NormalOpt
                                            }
                                            isSearchable={true}
                                            placeholder="Select"
                                            onChange={onSliderChange(
                                              JobQueueProject
                                            )}
                                          />
                                        </>
                                      ) : (
                                        <>
                                          <label>
                                            {JobQueueProject.projectStatusType}
                                          </label>
                                        </>
                                      )}
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
                                {/* <td>
        <Link
          to={{
            pathname: "/add-daily-target",
            data: {
              targetdata: jobQueueProjects,
            },
          }}
        >
          <img
            className="img_icon_size log"
            src={require("../../static/images/target.jpg")}
            alt="Add Daily Target"
            title="Add Daily Target"
          />
        </Link>
      </td> */}
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
                                          onDeactive(JobQueueProject, idx)
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
                                        onUpdate(JobQueueProject, idx)
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
                          }
                          if (
                            clientFolderName ===
                            JobQueueProject.clientFolderName
                          ) {
                            return (
                              <tr key={idx}>
                                {/* SLAP UserGroupRights */}
                                {(user.userGroupName &&
                                  user.userGroupName === "Administrator") ||
                                user.userGroupName === "Super Admin" ||
                                user.userGroupName === "Clarical Admins" ? (
                                  <>
                                    <td>{JobQueueProject.clientName}</td>
                                    <td>{JobQueueProject.staffName}</td>
                                  </>
                                ) : (
                                  <></>
                                )}

                                <td>
                                  <b>{JobQueueProject.clientFolderName}</b>
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
                                        JobQueueProject.inputpath
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
                                            JobQueueProject
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
                                </td>
                                <td>
                                  {" "}
                                  <Link
                                    className="float-left ml-3 aTagActiveRemoveClrBlk"
                                    to="#"
                                    onClick={() =>
                                      onnotes(JobQueueProject, idx)
                                    }
                                  >
                                    {JobQueueProject.projectName}
                                  </Link>
                                </td>
                                <td>
                                  {
                                    dhm(
                                      JobQueueProject.clientDate +
                                        ", " +
                                        JobQueueProject.clientTime
                                    )[0]
                                  }
                                </td>
                                <td>
                                  {JobQueueProject.ptEstimatedTime &&
                                    estimatedTimeVal[0] +
                                      " hr : " +
                                      estimatedTimeVal[1] +
                                      " min"}
                                </td>
                                <td>
                                  {timeOut ? (
                                    <span style={{ color: "red" }}>
                                      {JobQueueProject.ptEstimatedDateTime &&
                                        jobTime[0]}
                                    </span>
                                  ) : (
                                    <span>
                                      {JobQueueProject.ptEstimatedDateTime &&
                                        jobTime[0]}
                                    </span>
                                  )}
                                </td>

                                <td>{JobQueueProject.projectDeadline}</td>
                                <td>
                                  {JobQueueProject.projectQuantity}&nbsp;
                                  {JobQueueProject.projectUnconfirmed ===
                                    true && (
                                    <span style={{ color: "red" }}>*</span>
                                  )}
                                </td>
                                <td>{JobQueueProject.outputformat}</td>
                                <td>
                                  {jobQueueProjects.length > 4 &&
                                  (idx === jobQueueProjects.length - 1 ||
                                    idx === jobQueueProjects.length - 2 ||
                                    idx === jobQueueProjects.length - 3 ||
                                    idx === jobQueueProjects.length - 4 ||
                                    idx === jobQueueProjects.length - 5 ||
                                    idx === jobQueueProjects.length - 6) ? (
                                    <>
                                      {/* SLAP UserGroupRights */}
                                      {(user.userGroupName &&
                                        user.userGroupName ===
                                          "Administrator") ||
                                      user.userGroupName === "Super Admin" ||
                                      user.userGroupName ===
                                        "Clarical Admins" ||
                                      user.userGroupName ===
                                        "Quality Controller" ||
                                      user.userGroupName === "Distributors" ||
                                      user.userGroupName === "Marketing" ? (
                                        <>
                                          <img
                                            className="img_icon_size log float-left mt-2"
                                            onClick={() =>
                                              onhistory(JobQueueProject, idx)
                                            }
                                            src={require("../../static/images/colortheme.png")}
                                            alt="Last change"
                                            title="Last change"
                                          />

                                          <Select
                                            className="ml-4"
                                            menuPlacement="top"
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
                                                JobQueueProject.projectStatusType,
                                              value:
                                                JobQueueProject.projectStatusId,
                                            }}
                                            options={
                                              allAI.includes(PST)
                                                ? AIOpt
                                                : allAmend.includes(PST)
                                                ? AmendOpt
                                                : NormalOpt
                                            }
                                            isSearchable={true}
                                            placeholder="Select"
                                            onChange={onSliderChange(
                                              JobQueueProject
                                            )}
                                          />
                                        </>
                                      ) : (
                                        <>
                                          <label>
                                            {JobQueueProject.projectStatusType}
                                          </label>
                                        </>
                                      )}
                                    </>
                                  ) : (
                                    <>
                                      {" "}
                                      {/* SLAP UserGroupRights */}
                                      {(user.userGroupName &&
                                        user.userGroupName ===
                                          "Administrator") ||
                                      user.userGroupName === "Super Admin" ||
                                      user.userGroupName ===
                                        "Clarical Admins" ||
                                      user.userGroupName ===
                                        "Quality Controller" ||
                                      user.userGroupName === "Distributors" ||
                                      user.userGroupName === "Marketing" ? (
                                        <>
                                          <img
                                            className="img_icon_size log float-left mt-2"
                                            onClick={() =>
                                              onhistory(JobQueueProject, idx)
                                            }
                                            src={require("../../static/images/colortheme.png")}
                                            alt="Last change"
                                            title="Last change"
                                          />

                                          <Select
                                            className="ml-4"
                                            menuPlacement="auto"
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
                                                JobQueueProject.projectStatusType,
                                              value:
                                                JobQueueProject.projectStatusId,
                                            }}
                                            options={
                                              allAI.includes(PST)
                                                ? AIOpt
                                                : allAmend.includes(PST)
                                                ? AmendOpt
                                                : NormalOpt
                                            }
                                            isSearchable={true}
                                            placeholder="Select"
                                            onChange={onSliderChange(
                                              JobQueueProject
                                            )}
                                          />
                                        </>
                                      ) : (
                                        <>
                                          <label>
                                            {JobQueueProject.projectStatusType}
                                          </label>
                                        </>
                                      )}
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
                                {/* <td>
        <Link
          to={{
            pathname: "/add-daily-target",
            data: {
              targetdata: jobQueueProjects,
            },
          }}
        >
          <img
            className="img_icon_size log"
            src={require("../../static/images/target.jpg")}
            alt="Add Daily Target"
            title="Add Daily Target"
          />
        </Link>
      </td> */}
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
                                          onDeactive(JobQueueProject, idx)
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
                                        onUpdate(JobQueueProject, idx)
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
                          }
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
              className="btnLinkjob"
              onClick={() => onstatusTypeSelect("Downloading")}
            >
              <span className="footerfont">
                {" "}
                Downloading : {downloadingQty}
              </span>
            </Link>
            &emsp;
            <Link
              to="#"
              className="btnLinkjob"
              onClick={() => onstatusTypeSelect("Working")}
            >
              <span className="footerfont"> Working : {WorkingQty}</span>
            </Link>
            &emsp;
            <Link
              to="#"
              className="btnLinkjob"
              onClick={() => onstatusTypeSelect("Pending")}
            >
              <span className="footerfont"> Pending : {PendingQty}</span>
            </Link>
            &emsp;
            <Link
              to="#"
              className="btnLinkjob"
              onClick={() => onstatusTypeSelect("QC Pending")}
            >
              <span className="footerfont">QC Pending : {QCPendingQty}</span>
            </Link>
            &emsp;
            <Link
              to="#"
              className="btnLinkjob"
              onClick={() => onstatusTypeSelect("QC Estimate")}
            >
              <span className="footerfont"> QC Estimate : {QCEstimateQty}</span>
            </Link>
            &emsp;
            <Link
              to="#"
              className="btnLinkjob"
              onClick={() => onstatusTypeSelect("Uploading")}
            >
              <span className="footerfont"> Uploading : {UploadingQty}</span>
            </Link>
            &emsp;
            <Link
              to="#"
              className="btnLinkjob"
              onClick={() => onstatusTypeSelect("QC DONE")}
            >
              <span className="footerfont"> QC Done : {QCDoneQty}</span>
            </Link>
          </div>
          <div className="col-lg-1 col-md-6 col-sm-6 col-12 align_right">
            <span className="footerfont">
              Projects : {jobQueueProjects.length}
            </span>
          </div>
          <div className="col-lg-1 col-md-6 col-sm-6 col-12 align_right">
            <span className="footerfont">Quantity : {projectQty}</span>
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
              contacts={contacts}
              socket={socket}
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
        size="xl"
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
  sct: state.sct,
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
  getAllFollowUp,
  getAllSctCallCount1,
  // getUpdatedProjectStausForDailyJobSheet,
  updateMsgSent,
})(JobQueue);
