import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Select from "react-select";
import ChangeProjectLifeCycle from "./ChangeProjectLifeCycle";
import Spinner from "../layout/Spinner";
import EditProject from "./EditProject";
import JobHistory from "./JobHistory";
import {
  getDailyJobsheetProjectDeatils,
  getAllProjectStatus,
  AddProjectTrack,
  getUpdatedProjectStausForDailyJobSheet,
} from "../../actions/projects";

import { getAllClients } from "../../actions/client";
import JobNotes from "./JobNotes";
import AllLatestChange from "./AllLatestChange";
import { w3cwebsocket } from "websocket";
import { CSVLink, CSVDownload } from "react-csv";

//client in websocket
//SLAP IP
const client = new w3cwebsocket("ws://192.168.6.128:8000");

const DailyJobSheet = ({
  auth: { isAuthenticated, user, users },
  project: { dailyJobsheetProjects, allProjectStatus },
  client: { allClient },
  getDailyJobsheetProjectDeatils,
  AddProjectTrack,
  getAllProjectStatus,
  getUpdatedProjectStausForDailyJobSheet,
  getAllClients,
}) => {
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
  useEffect(() => {
    getAllClients();
  }, [getAllClients]);

  const [selDateDataVal, setSelDateDataVal] = useState();
  getDailyJobsheetProjectDeatils(selDateDataVal);

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
    return days + " d : " + hours + " h : " + minutes + " m : " + sec + " s";
  }
  // On change ProjectCycle
  const [showProjectCycleModal, setShowProjectCycleModal] = useState(false);
  const handleProjectCycleModalClose = () => setShowProjectCycleModal(false);

  const onProjectCycleModalChange = (e) => {
    if (e) {
      handleProjectCycleModalClose();
    }
  };

  // Modal
  const projectStatusOpt = [];
  allProjectStatus.map((projStatusData) =>
    projectStatusOpt.push({
      label: projStatusData.projectStatusType,
      value: projStatusData._id,
    })
  );
  const csvData = [
    [
      "Project Name",
      "Client Name",
      "Folder Name",
      "Notes",
      "Project Deadline",
      "Qty",
      "Project Date Time",
      "Entered By",
      "Client Date Time",
      "Project Status",
      "Client Type",
      "Project Working Status",
      "projectPriority",
    ],
  ];
  dailyJobsheetProjects.map((dailyJobsheetData) =>
    csvData.push([
      dailyJobsheetData.projectName,
      dailyJobsheetData.clientName,
      dailyJobsheetData.clientFolderName,
      dailyJobsheetData.projectNotes,
      dailyJobsheetData.projectDeadline,
      dailyJobsheetData.projectQuantity,
      dailyJobsheetData.projectDate + " : " + dailyJobsheetData.projectTime,
      dailyJobsheetData.projectEnteredByName,
      dailyJobsheetData.clientDate + " : " + dailyJobsheetData.clientTime,
      dailyJobsheetData.projectStatus,
      dailyJobsheetData.clientTypeVal,
      dailyJobsheetData.projectStatusType,
      dailyJobsheetData.projectPriority,
    ])
  );

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

  const onSliderChange = (dailyJobsheetProjects) => (e) => {
    if (
      e.label === "Downloaded" ||
      e.label === "Uploaded" ||
      e.label === "Amend_Uploaded"
    ) {
      let finalData = {
        projectTrackStatusId: e.value,
        projectStatusType: e.label,
        projectId: dailyJobsheetProjects._id,
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
    } else {
      let newStatusData = {
        statusId: e.value,
        value: e.label,
        projectId: dailyJobsheetProjects._id,
      };
      setStatusChange(newStatusData);
      setShowProjectCycleModal(true);
    }
  };
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

  const [showEditModal, setShowEditModal] = useState(false);
  const handleEditModalClose = () => setShowEditModal(false);

  const onClickReset = () => {
    getDailyJobsheetProjectDeatils("");
    setSelDateDataVal("");
    setsingledate(new Date().toISOString().split("T")[0]);
    setSelectedDate(new Date().toISOString().split("T")[0]);
    setShowHide({
      ...showHide,
      showChequenoSection: false,
      showChequenoSection1: true,
    });
  };

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
  const [formData, setFormData] = useState({
    radioselect: "",
    Dateselectmode: "",
    isSubmitted: false,
  });

  const { radioselect, Dateselectmode } = formData;
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
    setsingledate(e.target.value);
  };
  const [todate, settodate] = useState("");
  const onDateChange1 = (e) => {
    settodate(e.target.value);
  };

  const [fromdate, setfromdate] = useState("");
  const onDateChange = (e) => {
    setfromdate(e.target.value);
  };

  const onSearch = (e) => {
    let selDateData = {
      selDate: singledate,
      dateType: "Single Date",
    };
    setSelDateDataVal(selDateData);
    getDailyJobsheetProjectDeatils(selDateData);
  };

  const onSearchmultidate = (e) => {
    let selDateData = {
      fromdate: fromdate,
      todate: todate,
      dateType: "Multi Date",
    };
    setSelDateDataVal(selDateData);
    getDailyJobsheetProjectDeatils(selDateData);
  };
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

  const DateMethods = [
    { value: "Single Date", label: "Single Date" },
    { value: "Multi Date", label: "Multi Date" },
  ];

  const [showHide, setShowHide] = useState({
    showChequenoSection: false,
    showChequenoSection1: true,
  });
  const { showChequenoSection, showChequenoSection1 } = showHide;
  const onDateModeChange = (e) => {
    if (e) {
      setFormData({
        ...formData,
        Dateselectmode: e,
      });
    }
    if (e.value === "Multi Date") {
      setShowHide({
        ...showHide,
        showChequenoSection: true,
        showChequenoSection1: false,
      });
    } else {
      setShowHide({
        ...showHide,
        showChequenoSection: false,
        showChequenoSection1: true,
      });
    }
  };
  const [clientData, setClientData] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientName, setClientName] = useState("");

  const activeClientsOpt = [];
  allClient.map((clientsData) =>
    activeClientsOpt.push({
      clientId: clientsData._id,
      label: clientsData.clientName,
      value: clientsData.clientName,
    })
  );
  const onClientChange = (e) => {
    setClientData(e);
    setClientId(e.clientId);
    let selDateData = {
      selDate: singledate,
      fromdate: fromdate,
      todate: todate,
      dateType: Dateselectmode.value,
      clientId: e.clientId,
    };
    setSelDateDataVal(selDateData);
    getDailyJobsheetProjectDeatils(selDateData);
    console.log(setClientId);
  };

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
              <div className="col-lg-3 col-md-4 col-sm-4 col-12 py-3">
                {(user.userGroupName &&
                  user.userGroupName === "Administrator") ||
                user.userGroupName === "Super Admin" ? (
                  <Select
                    name="Dateselectmode"
                    options={DateMethods}
                    isSearchable={true}
                    defaultValue={DateMethods[0]}
                    value={DateMethods.value}
                    placeholder="Select"
                    onChange={(e) => onDateModeChange(e)}
                  />
                ) : (
                  <></>
                )}
              </div>
              {showChequenoSection && (
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
                      required
                    />
                  </div>
                  <div className="col-lg-1 col-md-11 col-sm-10 col-10 py-3">
                    <img
                      className="img_icon_size log"
                      onClick={() => onSearchmultidate()}
                      src={require("../../static/images/Search_Icon.png")}
                      alt="Search_Icon"
                      title="Search_Icon"
                    />
                  </div>
                </>
              )}
              {showChequenoSection1 && (
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
                      required
                    />
                  </div>
                  <div className="col-lg-1 col-md-11 col-sm-10 col-10 py-3">
                    <img
                      className="img_icon_size log"
                      onClick={() => onSearch()}
                      src={require("../../static/images/Search_Icon.png")}
                      alt="Search_Icon"
                      title="Search_Icon"
                    />
                  </div>
                </>
              )}
              <div className="col-lg-3 col-md-11 col-sm-10 col-10 py-3">
                <Select
                  name="clientData"
                  isSearchable={true}
                  value={clientData}
                  options={activeClientsOpt}
                  placeholder="Select"
                  onChange={(e) => onClientChange(e)}
                />
              </div>
            </div>

            {/* <CSVDownload data={dailyJobsheetProjects} target="_blank" />; */}

            <div className="col-lg-4 col-md-11 col-sm-12 col-11 py-3">
              <CSVLink data={csvData}>
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
                    className="table table-bordered table-striped table-hover"
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
                        <th style={{ width: "10%" }}>Project Name</th>
                        <th style={{ width: "10%" }}>Queue Duration</th>
                        <th style={{ width: "10%" }}>Estimated Time</th>
                        <th style={{ width: "10%" }}>Job Time</th>
                        <th style={{ width: "2%" }}>Priority</th>
                        <th style={{ width: "2%" }}>Deadline</th>
                        <th style={{ width: "2%" }}>Qty</th>
                        <th style={{ width: "13%" }}>Status</th>
                        <th style={{ width: "10%" }}>Latest Change</th>
                        <th style={{ width: "10%" }}>Job Notes</th>
                        {/* SLAP UserGroupRights */}
                        {(user.userGroupName &&
                          user.userGroupName === "Administrator") ||
                        user.userGroupName === "Super Admin" ||
                        user.userGroupName === "Clarical Admins" ? (
                          <th style={{ width: "2%" }}>OP</th>
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
                            let estimatedTimeVal = "";
                            if (dailyJobsheetProjects.ptEstimatedTime) {
                              estimatedTimeVal =
                                dailyJobsheetProjects.ptEstimatedTime.split(
                                  ":"
                                );
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
                                    <Link
                                      onClick={() =>
                                        handleGoToAllLatestChange(
                                          dailyJobsheetProjects
                                        )
                                      }
                                    >
                                      {dailyJobsheetProjects.projectName}
                                    </Link>
                                  ) : (
                                    <>
                                      <label>
                                        {dailyJobsheetProjects.projectName}
                                      </label>
                                    </>
                                  )}
                                </td>
                                <td>
                                  {dhm(
                                    dailyJobsheetProjects.projectDate +
                                      ", " +
                                      dailyJobsheetProjects.projectTime,
                                    idx
                                  )}
                                </td>
                                <td>
                                  {dailyJobsheetProjects.ptEstimatedTime &&
                                    estimatedTimeVal[0] +
                                      " hr : " +
                                      estimatedTimeVal[1] +
                                      " min"}
                                </td>
                                <td>
                                  {dailyJobsheetProjects.ptEstimatedDateTime &&
                                    dhm(
                                      dailyJobsheetProjects.ptEstimatedDateTime
                                    )}
                                </td>
                                <td>{dailyJobsheetProjects.projectPriority}</td>
                                <td>{dailyJobsheetProjects.projectDeadline}</td>
                                <td>{dailyJobsheetProjects.projectQuantity}</td>

                                <td>
                                  {/* SLAP UserGroupRights */}
                                  {(user.userGroupName &&
                                    user.userGroupName === "Administrator") ||
                                  user.userGroupName === "Super Admin" ||
                                  user.userGroupName === "Clarical Admins" ||
                                  user.userGroupName === "Quality Controller" ||
                                  user.userGroupName === "Distributors" ? (
                                    <Select
                                      name="projectStatusData"
                                      value={{
                                        label:
                                          dailyJobsheetProjects.projectStatusType,
                                        value:
                                          dailyJobsheetProjects.projectStatusId,
                                      }}
                                      options={projectStatusOpt}
                                      isSearchable={true}
                                      placeholder="Select"
                                      onChange={onSliderChange(
                                        dailyJobsheetProjects
                                      )}
                                    />
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
                                <td>
                                  <Link
                                    className="btnLink"
                                    onClick={() =>
                                      onhistory(dailyJobsheetProjects, idx)
                                    }
                                  >
                                    {dailyJobsheetProjects.projectStatusType}
                                  </Link>
                                </td>
                                <td>
                                  <Link
                                    className="btnLink"
                                    onClick={() =>
                                      onnotes(dailyJobsheetProjects, idx)
                                    }
                                  >
                                    Notes
                                  </Link>
                                </td>
                                {/* SLAP UserGroupRights */}
                                {(user.userGroupName &&
                                  user.userGroupName === "Administrator") ||
                                user.userGroupName === "Super Admin" ||
                                user.userGroupName === "Clarical Admins" ? (
                                  <td>
                                    <img
                                      className="img_icon_size log"
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
              <h3 className="modal-title text-center">Project Life Cycle</h3>
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
    </Fragment>
  );
};

DailyJobSheet.propTypes = {
  auth: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  getDailyJobsheetProjectDeatils: PropTypes.object.isRequired,
  AddProjectTrack: PropTypes.object.isRequired,
  getUpdatedProjectStausForDailyJobSheet: PropTypes.object.isRequired,
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
  getAllClients,
})(DailyJobSheet);
