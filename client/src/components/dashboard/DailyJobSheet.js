import React, { Fragment, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Select from "react-select";
import ChangeProjectLifeCycle from "./ChangeProjectLifeCycle";
import Spinner from "../layout/Spinner";
import EditProject from "./EditProject";
import JobHistory from "./JobHistory";
import axios from "axios";
import { allUsersRoute, host, sendMessageRoute } from "../../utils/APIRoutes";
import {
  getDailyJobsheetProjectDeatils,
  getAllProjectStatus,
  AddProjectTrack,
  getUpdatedProjectStausForDailyJobSheet,
  updateMsgSent,
} from "../../actions/projects";

import {
  // getDailyjobSheetClients,
  getDailyjobSheetFolder,
} from "../../actions/client";
import JobNotes from "./JobNotes";
import AllLatestChange from "./AllLatestChange";
import { w3cwebsocket } from "websocket";
import { CSVLink } from "react-csv";
// CSVDownload
import DeactiveProject from "./DeactiveProject";
import { io } from "socket.io-client";
import AdditionalAddProject from "./AdditionalAddProject";
//client in websocket
//SLAP IP
const client = new w3cwebsocket("ws://159:8000");

const DailyJobSheet = ({
  auth: { isAuthenticated, user, users },
  project: { dailyJobsheetProjects, allProjectStatus },
  client: { activeDailyJobSheetFolder },
  // activeDailyJobSheetClients
  getDailyJobsheetProjectDeatils,
  AddProjectTrack,
  getAllProjectStatus,
  getUpdatedProjectStausForDailyJobSheet,
  // getDailyjobSheetClients,
  getDailyjobSheetFolder,
  updateMsgSent,
}) => {
  const socket = useRef();
  useEffect(() => {
    client.onopen = () => {
      console.log("webSocket client connected");
    };
    client.onmessage = (message) => {
      getUpdatedProjectStausForDailyJobSheet();
      setSelectedDate(new Date().toISOString().split("T")[0]);
    };
  }, []);
  useEffect(() => {
    getDailyJobsheetProjectDeatils();
  }, [getDailyJobsheetProjectDeatils]);
  useEffect(() => {
    getAllProjectStatus();
  }, [getAllProjectStatus]);
  // useEffect(() => {
  //   getDailyjobSheetClients();
  // }, [getDailyjobSheetClients]);
  useEffect(() => {
    getDailyjobSheetFolder();
  }, [getDailyjobSheetFolder]);

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

  const [selDateDataVal, setSelDateDataVal] = useState();
  getDailyJobsheetProjectDeatils(selDateDataVal);

  const [projectData, setprojectData] = useState("");
  const [folderId, setfolderId] = useState("");
  const [clientName1, setClientName] = useState("");

  const activeFolderOpt = [];
  activeDailyJobSheetFolder &&
    activeDailyJobSheetFolder.map((folderData) =>
      activeFolderOpt.push({
        folderId: folderData._id,
        label: folderData.clientFolderName,
        value: folderData.clientFolderName,
      })
    );
  const onProjectChange = (e) => {
    setprojectData(e);
    setfolderId(e.folderId);

    var clientName1 = "";
    clientName1 = e.value;
    setClientName(clientName1);

    let selDateData = {
      selDate: singledate,
      fromdate: fromdate,
      todate: todate,
      dateType: Dateselectmode.value ? Dateselectmode.value : "Single Date",
      folderId: e.folderId,
    };
    setSelDateDataVal(selDateData);
    getDailyJobsheetProjectDeatils(selDateData);
  };

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

  const timeOutMsg = async (dailyJobsheetProjects) => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    let msg =
      "5 mins remaining in" + dailyJobsheetProjects.projectName + " Project";
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
    updateMsgSent({ recordId: dailyJobsheetProjects._id, timeOutMsgSent: 1 });
  };
  // On change ProjectCycle
  const [showProjectCycleModal, setShowProjectCycleModal] = useState(false);
  const handleProjectCycleModalClose = () => setShowProjectCycleModal(false);

  const onProjectCycleModalChange = (e) => {
    if (e) {
      handleProjectCycleModalClose();
    }
  };

  const DateMethods = [
    { value: "Single Date", label: "Single Date" },
    { value: "Multi Date", label: "Multi Date" },
  ];

  // Modal
  const projectStatusOpt = [
    { value: "New Amend", label: "New Amend" },
    { value: "New AI", label: "New AI" },
  ];
  // allProjectStatus.map((projStatusData) =>
  //   projectStatusOpt.push({
  //     label: projStatusData.projectStatusType,
  //     value: projStatusData._id,
  //   })
  // );
  const csvData = [
    [
      "Client Name",
      "Folder Name",
      "Project Name",
      "Project Date ",
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

  dailyJobsheetProjects.map((dailyJobsheetData) =>
    csvData.push([
      dailyJobsheetData.clientName,
      dailyJobsheetData.clientFolderName,
      dailyJobsheetData.projectName,
      dailyJobsheetData.projectDate,
      dailyJobsheetData.projectQuantity,
      "",
      dailyJobsheetData.projectNotes,
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

  const [formData, setFormData] = useState({
    radioselect: "",
    Dateselectmode: DateMethods[0],
    projectStatusData: "",
    isSubmitted: false,
  });
  const [statusChangeValue, setStatusChange] = useState();
  // const onSliderChange = (dailyJobsheetProjects) => (e) => {
  //   let newStatusData = {
  //     statusId: e.value,
  //     value: e.label,
  //     projectId: dailyJobsheetProjects._id,
  //   };

  //   setStatusChange(newStatusData);

  //   setShowProjectCycleModal(true);
  // };

  const onSliderChange = (dailyJobsheetProjects) => async (e) => {
    // if (
    //   e.label === "Downloaded" ||
    //   e.label === "Uploaded" ||
    //   e.label === "Uploading" ||
    //   e.label === "Amend_Uploaded" ||
    //   e.label === "QC DONE"
    // ) {
    //   let finalData = {
    //     projectTrackStatusId: e.value,
    //     projectStatusType: e.label,
    //     projectId: dailyJobsheetProjects._id,
    //     projectTrackDateTime: new Date().toLocaleString("en-GB"),
    //     projectStatusChangedbyName: user.empFullName,
    //     projectStatusChangedById: user._id,
    //   };

    //   AddProjectTrack(finalData);
    //   client.send(
    //     JSON.stringify({
    //       type: "message",
    //       msg: "/JobQueue",
    //     })
    //   );
    //   const data = await JSON.parse(
    //     localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    //   );
    //   let msg = "";
    //   if (e.label === "Downloaded") {
    //     msg =
    //       dailyJobsheetProjects.clientFolderName +
    //       " - " +
    //       dailyJobsheetProjects.projectName +
    //       " - " +
    //       dailyJobsheetProjects.projectQuantity +
    //       " images downloaded. Please have a look.";
    //   } else if (e.label === "QC DONE") {
    //     msg =
    //       dailyJobsheetProjects.clientFolderName +
    //       " - " +
    //       dailyJobsheetProjects.projectName +
    //       " - " +
    //       dailyJobsheetProjects.projectQuantity +
    //       " images QC DONE. Please upload.";
    //   }
    //   if (msg !== "") {
    //     for (let i = 0; i < contacts.length; i++) {
    //       socket.current.emit("send-msg", {
    //         to: contacts[i]._id,
    //         from: data._id,
    //         msg,
    //       });
    //       await axios.post(sendMessageRoute, {
    //         from: data._id,
    //         to: contacts[i]._id,
    //         message: msg,
    //       });
    //     }
    //   }

    // } else {
    let newStatusData = {
      statusId: e.value,
      value: e.label,
      projectId: dailyJobsheetProjects._id,
      jobQueueProjects: dailyJobsheetProjects,
    };

    setStatusChange(newStatusData);
    setShowProjectCycleModal(true);
    // }
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
  const onUpdate = (dailyJobsheetProjects, idx) => {
    setShowEditModal(true);
    setUserDatas(dailyJobsheetProjects);
  };

  const { radioselect, Dateselectmode, projectStatusData } = formData;
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

  const [shownotesModal, setshownotesModal] = useState(false);
  const handlenotesModalClose = () => setshownotesModal(false);

  const onnotesModalChange = (e) => {
    if (e) {
      handlenotesModalClose();
    }
  };

  const [userDatas2, setUserDatas2] = useState(null);
  const onnotes = (dailyJobsheetProjects, idx) => {
    setshownotesModal(true);
    setUserDatas2(dailyJobsheetProjects);
  };

  const [showhistoryModal, setshowhistoryModal] = useState(false);
  const handlehistoryModalClose = () => setshowhistoryModal(false);

  const onhistoryModalChange = (e) => {
    if (e) {
      handlehistoryModalClose();
    }
  };

  const [userDatas1, setUserDatas1] = useState(null);
  const onhistory = (dailyJobsheetProjects, idx) => {
    setshowhistoryModal(true);
    setUserDatas1(dailyJobsheetProjects);
  };

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [singledate, setsingledate] = useState(
    new Date().toISOString().split("T")[0]
  );
  //
  const onDateChange2 = (e) => {
    // setprojectData("");
    setsingledate(e.target.value);
    let selDateData = {
      selDate: e.target.value,
      dateType: "Single Date",
      folderId: projectData.folderId,
    };

    setSelDateDataVal(selDateData);
    getDailyJobsheetProjectDeatils(selDateData);
    getDailyjobSheetFolder(selDateData);
  };

  const [fromdate, setfromdate] = useState("");
  const onDateChange = (e) => {
    setfromdate(e.target.value);
  };

  const [todate, settodate] = useState("");
  const onDateChange1 = (e) => {
    settodate(e.target.value);

    let selDateData = {
      fromdate: fromdate,
      todate: e.target.value,
      dateType: "Multi Date",
      folderId: projectData.folderId,
    };
    setSelDateDataVal(selDateData);
    getDailyJobsheetProjectDeatils(selDateData);
    getDailyjobSheetFolder(selDateData);
  };

  // const onSearch = (e) => {
  //   let selDateData = {
  //     selDate: singledate,
  //     dateType: "Single Date",
  //     folderId: projectData.folderId,
  //   };

  //   setSelDateDataVal(selDateData);
  //   getDailyJobsheetProjectDeatils(selDateData);
  //   getDailyjobSheetFolder(selDateData);
  // };

  // const onSearchmultidate = (e) => {
  //   let selDateData = {
  //     fromdate: fromdate,
  //     todate: todate,
  //     dateType: "Multi Date",
  //     folderId: projectData.folderId,
  //   };
  //   setSelDateDataVal(selDateData);
  //   getDailyJobsheetProjectDeatils(selDateData);
  //   getDailyjobSheetFolder(selDateData);
  // };
  const [showAllChangeModal, setshowAllChangeModal] = useState(false);
  const handleAllChangeModalClose = () => setshowAllChangeModal(false);

  const onAllChange = (e) => {
    if (e) {
      handleAllChangeModalClose();
    }
  };

  const [userDatas3, setUserDatas3] = useState(null);
  const handleGoToAllLatestChange = (dailyJobsheetProjects, idx) => {
    setshowAllChangeModal(true);
    setUserDatas3(dailyJobsheetProjects);
  };

  const [showHide, setShowHide] = useState({
    showdateSection: false,
    showdateSection1: true,
  });
  const { showdateSection, showdateSection1 } = showHide;
  const onDateModeChange = (e) => {
    setprojectData("");
    if (e) {
      setFormData({
        ...formData,
        Dateselectmode: e,
      });
    }
    if (e.value === "Multi Date") {
      setShowHide({
        ...showHide,
        showdateSection: true,
        showdateSection1: false,
      });
    } else {
      setShowHide({
        ...showHide,
        showdateSection: false,
        showdateSection1: true,
      });
    }
  };

  const [userDatadeactive, setUserDatadeactive] = useState(null);
  const onDeactive = (dailyJobsheetProjects, idx) => {
    setShowDeactiveModal(true);
    setUserDatadeactive(dailyJobsheetProjects);
  };

  const [showDeactiveModal, setShowDeactiveModal] = useState(false);
  const handleDeactiveModalClose = () => setShowDeactiveModal(false);

  const onDeactiveModalChange = (e) => {
    if (e) {
      handleDeactiveModalClose();
    }
  };

  const onClickReset = () => {
    getDailyJobsheetProjectDeatils("");
    setFormData({
      Dateselectmode: DateMethods[0],
    });
    // getDailyjobSheetClients("");
    getDailyjobSheetFolder("");
    setSelDateDataVal("");
    setprojectData("");
    setsingledate(new Date().toISOString().split("T")[0]);
    setSelectedDate(new Date().toISOString().split("T")[0]);
    setShowHide({
      ...showHide,
      showdateSection: false,
      showdateSection1: true,
    });
  };

  const fileName = [clientName1 ? clientName1 : "Client Report"];

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className="col-lg-2 col-md-11 col-sm-10 col-10">
              <h5 className="heading_color">Daily Job Sheet</h5>
            </div>

            <div className="row col-lg-6 col-md-6 col-sm-12 col-12 no_padding">
              <div className="col-lg-3 col-md-4 col-sm-4 col-12 py-2">
                {/* SLAP UserGroupRights */}

                {(user.userGroupName &&
                  user.userGroupName === "Administrator") ||
                user.userGroupName === "Super Admin" ||
                user.userGroupName === "Clarical Admins" ? (
                  <>
                    <Select
                      name="Dateselectmode"
                      options={DateMethods}
                      isSearchable={true}
                      // defaultValue={DateMethods[0]}
                      value={Dateselectmode}
                      placeholder="Select"
                      onChange={(e) => onDateModeChange(e)}
                    />
                  </>
                ) : (
                  <></>
                )}
              </div>
              {showdateSection && (
                <>
                  <div className="col-lg-2 col-md-11 col-sm-10 col-10 py-2">
                    <input
                      type="date"
                      placeholder="dd/mm/yyyy"
                      className="form-control cpp-input datevalidation"
                      name="fromdate"
                      value={fromdate}
                      onChange={(e) => onDateChange(e)}
                      style={{
                        width: "110%",
                      }}
                      onKeyDown={(e) => {
                        e.preventDefault();
                      }}
                      required
                    />
                  </div>
                  <div className=" col-lg-2 col-md-11 col-sm-10 col-10 py-2">
                    <input
                      type="date"
                      placeholder="dd/mm/yyyy"
                      className="form-control cpp-input datevalidation"
                      name="todate"
                      value={todate}
                      onChange={(e) => onDateChange1(e)}
                      style={{
                        width: "110%",
                      }}
                      onKeyDown={(e) => {
                        e.preventDefault();
                      }}
                      required
                    />
                  </div>
                  {/* <div className="col-lg-1 col-md-11 col-sm-10 col-10 py-3">
                    <img
                      className="img_icon_size log"
                      onClick={() => onSearchmultidate()}
                      src={require("../../static/images/Search_Icon.png")}
                      alt="Search_Icon"
                      title="Search_Icon"
                    />
                  </div> */}
                </>
              )}
              {showdateSection1 && (
                <>
                  <div className=" col-lg-3 col-md-11 col-sm-10 col-10 py-2">
                    <input
                      type="date"
                      placeholder="dd/mm/yyyy"
                      className="form-control cpp-input datevalidation"
                      name="singledate"
                      value={singledate}
                      onChange={(e) => onDateChange2(e)}
                      style={{
                        width: "100%",
                      }}
                      onKeyDown={(e) => {
                        e.preventDefault();
                      }}
                      required
                    />
                  </div>
                  {/* <div className="col-lg-1 col-md-11 col-sm-10 col-10 py-3">
                    <img
                      className="img_icon_size log"
                      onClick={() => onSearch()}
                      src={require("../../static/images/Search_Icon.png")}
                      alt="Search_Icon"
                      title="Search_Icon"
                    />
                  </div> */}
                </>
              )}
              <div className="col-lg-3 col-md-11 col-sm-10 col-10 py-2">
                <Select
                  name="projectData"
                  isSearchable={true}
                  value={projectData}
                  options={activeFolderOpt}
                  placeholder="Select"
                  onChange={(e) => onProjectChange(e)}
                />
              </div>
            </div>

            {/* <CSVDownload data={dailyJobsheetProjects} target="_blank" />; */}

            <div className="col-lg-4 col-md-11 col-sm-12 col-11 py-3">
              <CSVLink
                className="secondlinebreak"
                data={csvData}
                filename={fileName}
              >
                <button className="btn btn_green_bg float-right">Export</button>
              </CSVLink>
              <button
                className="btn btn_green_bg float-right"
                onClick={() => onClickReset()}
              >
                Refresh
              </button>

              <Link className="btn btn_green_bg float-right" to="/add-Project">
                Add Project
              </Link>
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
                        <th style={{ width: "5%" }}>Folder</th>
                        <th style={{ width: "15%" }}>Project Name</th>
                        <th style={{ width: "5%" }}>History</th>
                        {/* <th style={{ width: "12%" }}>Queue Duration</th> */}
                        <th style={{ width: "10%" }}>Estimated Time</th>
                        <th style={{ width: "10%" }}>Job Time</th>
                        {/* <th style={{ width: "2%" }}>Priority</th> */}
                        <th style={{ width: "2%" }}>Deadline</th>
                        <th style={{ width: "3%" }}>Qty</th>
                        <th style={{ width: "8%" }}>Output Format</th>
                        <th style={{ width: "13%" }}>Status</th>
                        {/* <th style={{ width: "10%" }}>Latest Change</th>
                        <th style={{ width: "10%" }}>Job Notes</th> */}
                        {/* SLAP UserGroupRights */}
                        {(user.userGroupName &&
                          user.userGroupName === "Administrator") ||
                        user.userGroupName === "Super Admin" ||
                        user.userGroupName === "Clarical Admins" ? (
                          <th style={{ width: "3%" }}>OP</th>
                        ) : (
                          <></>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {dailyJobsheetProjects &&
                        dailyJobsheetProjects.map(
                          (dailyJobsheetProjects, idx) => {
                            projectQty += dailyJobsheetProjects.projectQuantity;
                            // clients += dailyJobsheetProjects.clientName.length;

                            let statusType =
                              dailyJobsheetProjects.projectStatusType;
                            if (statusType === "Downloading")
                              downloadingQty += 1;
                            if (statusType === "Working") WorkingQty += 1;
                            if (statusType === "Pending") PendingQty += 1;
                            if (statusType === "QC Pending") QCPendingQty += 1;
                            if (statusType === "QC Estimate")
                              QCEstimateQty += 1;
                            if (statusType === "Uploading") UploadingQty += 1;
                            let estimatedTimeVal = "",
                              jobTime = "",
                              timeOut = false;
                            if (dailyJobsheetProjects.ptEstimatedTime) {
                              estimatedTimeVal =
                                dailyJobsheetProjects.ptEstimatedTime.split(
                                  ":"
                                );
                              jobTime = dhm(
                                dailyJobsheetProjects.ptEstimatedDateTime
                              );
                              if (
                                Number(jobTime[1]) >=
                                Number(
                                  estimatedTimeVal[0] + "" + estimatedTimeVal[1]
                                )
                              ) {
                                timeOut = true;
                              }
                              if (
                                Number(
                                  estimatedTimeVal[0] + "" + estimatedTimeVal[1]
                                ) -
                                  Number(jobTime[1]) ===
                                  5 &&
                                dailyJobsheetProjects.timeOutMsgSent === 0
                              ) {
                                timeOutMsg(dailyJobsheetProjects);
                              }
                            }
                            return (
                              <tr key={idx}>
                                {/* SLAP UserGroupRights */}
                                {(user.userGroupName &&
                                  user.userGroupName === "Administrator") ||
                                user.userGroupName === "Super Admin" ? (
                                  <td>{dailyJobsheetProjects.clientName}</td>
                                ) : (
                                  <></>
                                )}
                                <td>
                                  {dailyJobsheetProjects.clientFolderName}
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
                                            dailyJobsheetProjects
                                          )
                                        }
                                        src={require("../../static/images/colortheme.png")}
                                        alt="Last change"
                                        title="Last change"
                                      />
                                      <Link
                                        className="float-left ml-3 aTagActiveRemoveClrBlk"
                                        to="#"
                                        onClick={() =>
                                          onnotes(dailyJobsheetProjects, idx)
                                        }
                                      >
                                        {dailyJobsheetProjects.projectName}
                                      </Link>
                                    </>
                                  ) : (
                                    <>
                                      <label>
                                        <b>
                                          {dailyJobsheetProjects.projectName}
                                        </b>
                                      </label>
                                    </>
                                  )}
                                </td>
                                <td>
                                  <center>
                                    <Link
                                      className="btn btn_green_bg"
                                      to={{
                                        pathname: "/project-summary",
                                        data: {
                                          jobsheetdata: dailyJobsheetProjects,
                                        },
                                      }}
                                    >
                                      View
                                    </Link>
                                  </center>
                                </td>
                                {/* <td>
                                  {
                                    dhm(
                                      dailyJobsheetProjects.clientDate +
                                        ", " +
                                        dailyJobsheetProjects.clientTime
                                    )[0]
                                  }
                                </td> */}
                                <td>
                                  {dailyJobsheetProjects.ptEstimatedTime &&
                                    estimatedTimeVal[0] +
                                      " hr : " +
                                      estimatedTimeVal[1] +
                                      " min"}
                                </td>
                                <td>
                                  {timeOut ? (
                                    <span style={{ color: "red" }}>
                                      {dailyJobsheetProjects.ptEstimatedDateTime &&
                                        jobTime[0]}
                                    </span>
                                  ) : (
                                    <span>
                                      {dailyJobsheetProjects.ptEstimatedDateTime &&
                                        jobTime[0]}
                                    </span>
                                  )}
                                </td>
                                {/* <td>{dailyJobsheetProjects.projectPriority}</td> */}
                                <td>{dailyJobsheetProjects.projectDeadline}</td>
                                <td>
                                  {dailyJobsheetProjects.projectQuantity}&nbsp;
                                  {dailyJobsheetProjects.projectUnconfirmed ===
                                    true && (
                                    <span style={{ color: "red" }}>*</span>
                                  )}
                                </td>
                                <td>{dailyJobsheetProjects.outputformat}</td>

                                <td>
                                  {/* SLAP UserGroupRights */}
                                  {(user.userGroupName &&
                                    user.userGroupName === "Administrator") ||
                                  user.userGroupName === "Super Admin" ||
                                  user.userGroupName === "Clarical Admins" ? (
                                    <>
                                      <img
                                        className="img_icon_size log float-left mt-2"
                                        onClick={() =>
                                          onhistory(dailyJobsheetProjects, idx)
                                        }
                                        src={require("../../static/images/colortheme.png")}
                                        alt="Last change"
                                        title="Last change"
                                      />
                                      <Select
                                        className="ml-4"
                                        styles={{
                                          placeholder: (defaultStyles) => {
                                            //for placeholder color "select"
                                            return {
                                              ...defaultStyles,
                                              color: "#ffffff",
                                            };
                                          },
                                          control: (base) => ({
                                            //for background
                                            ...base,
                                            color: "#fff",
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
                                        // value={{
                                        //   label:
                                        //     dailyJobsheetProjects.projectStatusType,
                                        //   value:
                                        //     dailyJobsheetProjects.projectStatusId,
                                        // }}
                                        value={projectStatusData}
                                        options={projectStatusOpt}
                                        isSearchable={true}
                                        placeholder="Select"
                                        onChange={onSliderChange(
                                          dailyJobsheetProjects
                                        )}
                                      />
                                    </>
                                  ) : (
                                    <>
                                      <label>
                                        {
                                          dailyJobsheetProjects.projectStatusType
                                        }
                                      </label>
                                    </>
                                  )}
                                </td>
                                {/* <td>
                                  <Link
                                    to="#"
                                    className="btnLink"
                                    onClick={() =>
                                      onhistory(dailyJobsheetProjects, idx)
                                    }
                                  >
                                    {dailyJobsheetProjects.projectStatusType}
                                  </Link>
                                </td> */}
                                {/* <td>
                                  <Link
                                    to="#"
                                    className="btnLink"
                                    onClick={() =>
                                      onnotes(dailyJobsheetProjects, idx)
                                    }
                                  >
                                    Notes
                                  </Link>
                                </td> */}
                                {/* SLAP UserGroupRights */}
                                {(user.userGroupName &&
                                  user.userGroupName === "Administrator") ||
                                user.userGroupName === "Super Admin" ||
                                user.userGroupName === "Clarical Admins" ? (
                                  <td>
                                    {(user.userGroupName &&
                                      user.userGroupName === "Administrator") ||
                                    user.userGroupName === "Super Admin" ||
                                    user.userGroupName === "Clarical Admins" ? (
                                      <img
                                        className="img_icon_size log"
                                        onClick={() =>
                                          onDeactive(dailyJobsheetProjects, idx)
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
                                        onUpdate(dailyJobsheetProjects, idx)
                                      }
                                      src={require("../../static/images/edit_icon.png")}
                                      alt="Edit"
                                      title="Edit"
                                    />
                                  </td>
                                ) : (
                                  <></>
                                )}
                              </tr>
                            );
                          }
                        )}
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
          <div className="col-lg-2 col-md-6 col-sm-6 col-12 align_right">
            {/* Clients:{clients}&nbsp; */}
            Quantity:{projectQty}
          </div>
        </div>

        <Modal
          show={showProjectCycleModal}
          backdrop="static"
          keyboard={false}
          size="xl"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <div className="col-lg-10">
              <h3 className="modal-title text-center">Add Project Details</h3>
            </div>
            <div className="col-lg-1">
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
            <AdditionalAddProject
              onProjectCycleModalChange={onProjectCycleModalChange}
              ProjectCycledata={statusChangeValue}
              // contacts={contacts}
              // socket={socket}
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
          <div className="col-lg-2 col-md-2 col-sm-2 col-2">
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

DailyJobSheet.propTypes = {
  auth: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  getDailyJobsheetProjectDeatils: PropTypes.func.isRequired,
  AddProjectTrack: PropTypes.func.isRequired,
  getUpdatedProjectStausForDailyJobSheet: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  project: state.project,
  client: state.client,
});

export default connect(mapStateToProps, {
  getDailyJobsheetProjectDeatils,
  AddProjectTrack,
  getAllProjectStatus,
  getUpdatedProjectStausForDailyJobSheet,
  // getDailyjobSheetClients,
  getDailyjobSheetFolder,
  updateMsgSent,
})(DailyJobSheet);
