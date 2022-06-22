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
} from "../../actions/projects";
import { AddProjectTrack } from "../../actions/projects";
import JobNotes from "./JobNotes";
import AllLatestChange from "./AllLatestChange";
const DailyJobSheet = ({
  auth: { isAuthenticated, user, users },
  project: { dailyJobsheetProjects, allProjectStatus },
  getDailyJobsheetProjectDeatils,
  AddProjectTrack,
  getAllProjectStatus,
}) => {
  useEffect(() => {
    getDailyJobsheetProjectDeatils();
  }, [getDailyJobsheetProjectDeatils]);
  useEffect(() => {
    getAllProjectStatus();
  }, [getAllProjectStatus]);

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
      };

      AddProjectTrack(finalData);
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
    setSelectedDate(new Date().toISOString().split("T")[0]);
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
  const onDateChange = (e) => {
    setSelectedDate(e.target.value);
    const selDateData = {
      selDate: e.target.value,
    };
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
  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className=" col-lg-2 col-md-11 col-sm-10 col-10">
              <h5 className="heading_color">Daily Job Sheet</h5>
            </div>
            <div className=" col-lg-2 col-md-11 col-sm-10 col-10 py-2">
              <input
                type="date"
                placeholder="dd/mm/yyyy"
                className="form-control cpp-input datevalidation"
                name="projectDate"
                value={selectedDate}
                onChange={(e) => onDateChange(e)}
                style={{
                  width: "75%",
                }}
                required
              />
            </div>

            <div className="col-lg-8 col-md-11 col-sm-12 col-11 py-3">
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
                        <th style={{ width: "2%" }}>OP</th>
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

                            return (
                              <tr key={idx}>
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
                                  <Link
                                    onClick={() =>
                                      handleGoToAllLatestChange(
                                        dailyJobsheetProjects
                                      )
                                    }
                                  >
                                    {dailyJobsheetProjects.projectName}
                                  </Link>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>{dailyJobsheetProjects.projectPriority}</td>
                                <td>{dailyJobsheetProjects.projectDeadline}</td>
                                <td>{dailyJobsheetProjects.projectQuantity}</td>
                                <td>
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
  getDailyJobsheetProjectDeatils: PropTypes.object.isRequired,
  AddProjectTrack: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  project: state.project,
});

export default connect(mapStateToProps, {
  getDailyJobsheetProjectDeatils,
  AddProjectTrack,
  getAllProjectStatus,
})(DailyJobSheet);
