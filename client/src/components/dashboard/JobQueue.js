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

const JobQueue = ({
  auth: { isAuthenticated, user, users },
  project: { jobQueueProjects, allProjectStatus },
  getJobQueueProjectDeatils,
  getAllProjectStatus,
}) => {
  useEffect(() => {
    getJobQueueProjectDeatils();
  }, [getJobQueueProjectDeatils]);
  useEffect(() => {
    getAllProjectStatus();
  }, [getAllProjectStatus]);

  function dhm(pDate, pTime) {
    let pStartDate = new Date(pDate + "," + pTime);
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

  const [statusChangeValue, setStatusChange] = useState();
  const [statusValue, setStatusValue] = useState();
  const onSliderChange = (jobQueueProjects) => (e) => {
    setStatusValue(e);
    let newStatusData = {
      statusId: e.value,
      value: e.label,
      projectId: jobQueueProjects._id,
    };

    setStatusChange(newStatusData);
    // console.log("statusChangeValue", statusChangeValue);
    setShowProjectCycleModal(true);
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
    setShowEditModal(true);
    setUserDatas(jobQueueProjects);
  };
  const [formData, setFormData] = useState({
    radioselect: "",
    isSubmitted: false,
  });

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
  console.log(radioselect);

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
                <div className=" body-inner no-padding table-responsive">
                  <table
                    className="table table-bordered table-striped table-hover"
                    id="datatable2"
                  >
                    <thead>
                      <tr>
                        <th>Client Name</th>
                        <th>Folder Name</th>
                        <th>Project Name</th>
                        <th>Queue Duration</th>
                        <th>Estimated Time</th>
                        <th>Job Time</th>
                        <th>Priority</th>
                        <th>Deadline</th>
                        <th>Qty</th>
                        <th>Status</th>
                        <th>Latest Change</th>
                        <th>Job Notes</th>
                        <th>OP</th>
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

                          return (
                            <tr key={idx}>
                              <td>{jobQueueProjects.clientName}</td>
                              <td>{jobQueueProjects.clientFolderName}</td>
                              <td>{jobQueueProjects.projectName}</td>
                              <td>
                                {dhm(
                                  jobQueueProjects.projectDate,
                                  jobQueueProjects.projectTime
                                )}
                              </td>
                              <td></td>
                              <td></td>
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
                                  isSearchable={false}
                                  placeholder="Select"
                                  onChange={onSliderChange(jobQueueProjects)}
                                />
                              </td>
                              <td>{jobQueueProjects.projectStatusType}</td>
                              <td>{jobQueueProjects.projectNotes}</td>
                              {/* <td></td> */}
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
            {/* <label className="radio-inline ">
              <input
                type="radio"
                name="ProjCatType"
                className="radio_style"
                value="Normal"
                onChange={(e) => onRadioProjCatTypeChange(e)}
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
                onChange={(e) => onRadioProjCatTypeChange(e)}
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
                onChange={(e) => onRadioProjCatTypeChange(e)}
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
                onChange={(e) => onRadioProjCatTypeChange(e)}
                onClick={() => onstatuscategrorySelect("Don't Work")}
              />{" "}
              Don't Work
            </label> */}
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
              <h3 className="modal-title text-center">Project Life Cycle</h3>
            </div>
            <div className="col-lg-2">
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
          <div className="col-lg-2">
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
    </Fragment>
  );
};

JobQueue.propTypes = {
  auth: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  getJobQueueProjectDeatils: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  project: state.project,
});

export default connect(mapStateToProps, {
  getJobQueueProjectDeatils,
  getAllProjectStatus,
})(JobQueue);
