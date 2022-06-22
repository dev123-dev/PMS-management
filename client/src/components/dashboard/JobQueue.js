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

//client in websocket
const client = new w3cwebsocket("ws://192.168.6.140:8000");

const JobQueue = ({
  auth: { isAuthenticated, user, users },
  project: { jobQueueProjects, allProjectStatus },
  getJobQueueProjectDeatils,
  AddProjectTrack,
  getAllchanges,
  getAllProjectStatus,
  getUpdatedProjectStaus,
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
    getJobQueueProjectDeatils();
  }, [getJobQueueProjectDeatils]);
  useEffect(() => {
    getAllProjectStatus();
  }, [getAllProjectStatus]);
  // getJobQueueProjectDeatils();

  // const [sliderValue, setSliderValue] = useState([]);

  function dhm(pDateTime, idx) {
    // let myInterval = setInterval(function () {
    // let newSliderArr = [...sliderValue];
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
    // newSliderArr[idx] =
    // days + " d : " + hours + " h : " + minutes + " m : " + sec + " s";
    // setSliderValue(newSliderArr);
    return days + " d : " + hours + " h : " + minutes + " m : " + sec + " s";
    // }, 5000);
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

  const [statusChangeValue, setStatusChange] = useState();
  const [statusValue, setStatusValue] = useState();
  const onSliderChange = (jobQueueProjects) => (e) => {
    if (
      e.label === "Downloaded" ||
      e.label === "Uploaded" ||
      e.label === "Amend_Uploaded"
    ) {
      setStatusValue(e);
      let finalData = {
        projectTrackStatusId: e.value,
        projectStatusType: e.label,
        projectId: jobQueueProjects._id,
      };
      // console.log("page", finalData);
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
    getJobQueueProjectDeatils("");
  };

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
  // const handleGoToAllLatestChange1 = (jobQueueProjects) => {
  //   const finalData = {
  //     projectId: jobQueueProjects._id,
  //   };

  //   getAllchanges(finalData);
  //   setSubmitted(true);
  // };
  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className=" col-lg-5 col-md-11 col-sm-10 col-10">
              <h5 className="heading_color">Job Queue</h5>
            </div>
            <div className="col-lg-7 col-md-11 col-sm-12 col-11 py-3">
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
                        {(user.userGroupName &&
                          user.userGroupName === "Administrator") ||
                        user.userGroupName === "Super Admin" ? (
                          <th style={{ width: "10%" }}>Client Name</th>
                        ) : (
                          <></>
                        )}
                        <th style={{ width: "5%" }}>Folder </th>
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
                        <th style={{ width: "2%" }}>OP</th>
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
                          let estimatedTimeVal = "";
                          if (jobQueueProjects.ptEstimatedTime) {
                            estimatedTimeVal =
                              jobQueueProjects.ptEstimatedTime.split(":");
                          }
                          return (
                            <tr key={idx}>
                              {(user.userGroupName &&
                                user.userGroupName === "Administrator") ||
                              user.userGroupName === "Super Admin" ? (
                                <td>
                                  {" "}
                                  <Link
                                    className="btnLink"
                                    onClick={() =>
                                      onhistory(jobQueueProjects, idx)
                                    }
                                  >
                                    {jobQueueProjects.clientName}
                                  </Link>
                                </td>
                              ) : (
                                <></>
                              )}
                              <td>{jobQueueProjects.clientFolderName}</td>
                              <td>
                                <Link
                                  // to="/AllLatestChange"
                                  onClick={() =>
                                    handleGoToAllLatestChange(jobQueueProjects)
                                  }
                                >
                                  {jobQueueProjects.projectName}
                                </Link>
                              </td>
                              <td>
                                {/* <input
                                  type="text"
                                  name="timerIndex"
                                  value={sliderValue[idx]}
                                  className="form-control"
                                  // onChange={(e) => onInputChange(e)}
                                /> */}
                                {dhm(
                                  jobQueueProjects.projectDate +
                                    ", " +
                                    jobQueueProjects.projectTime,
                                  idx
                                )}
                              </td>
                              <td>
                                {jobQueueProjects.ptEstimatedTime &&
                                  estimatedTimeVal[0] +
                                    " hr : " +
                                    estimatedTimeVal[1] +
                                    " min"}
                              </td>
                              <td>
                                {/* {jobQueueProjects.ptEstimatedDateTime &&
                                  dhm(jobQueueProjects.ptEstimatedDateTime)} */}
                              </td>
                              <td>{jobQueueProjects.projectPriority}</td>
                              <td>{jobQueueProjects.projectDeadline}</td>
                              <td>{jobQueueProjects.projectQuantity}</td>
                              <td>
                                <Select
                                  name="projectStatusData"
                                  value={{
                                    label: jobQueueProjects.projectStatusType,
                                    value: jobQueueProjects.projectStatusId,
                                  }}
                                  options={projectStatusOpt}
                                  isSearchable={true}
                                  placeholder="Select"
                                  onChange={onSliderChange(jobQueueProjects)}
                                />
                              </td>
                              <td>
                                {" "}
                                <Link
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
                                  className="btnLink"
                                  onClick={() => onnotes(jobQueueProjects, idx)}
                                >
                                  Notes
                                </Link>
                              </td>

                              <td>
                                <img
                                  className="img_icon_size log"
                                  onClick={() =>
                                    onUpdate(jobQueueProjects, idx)
                                  }
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
              </section>
            </div>
          </div>
        </section>

        <div className="row col-md-12 col-lg-12 col-sm-12 col-12  bottmAlgmnt">
          <div className="col-lg-10 col-md-6 col-sm-6 col-12">
            <label className="radio-inline ">
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
            </label>
          </div>
          <div className="col-lg-2 col-md-6 col-sm-6 col-12 align_right">
            Projects:{jobQueueProjects.length}
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

JobQueue.propTypes = {
  auth: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  getJobQueueProjectDeatils: PropTypes.object.isRequired,
  AddProjectTrack: PropTypes.object.isRequired,
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
  getUpdatedProjectStaus,
  // getUpdatedProjectStausForDailyJobSheet,
})(JobQueue);
