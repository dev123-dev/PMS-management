import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import { Link, useHistory } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { Redirect } from "react-router-dom";
import JobHistory from "./JobHistory";
import AllProjectsummaryHistory from "./AllProjectsummaryHistory";
import { getAllchanges, getLatestChanges } from "../../actions/projects";
const ProjectSummary = ({
  auth: { isAuthenticated, user, users },
  project: { clientJobSummary, allProjectStatus },
  getAllchanges,
  getLatestChanges,
}) => {
  const data = useHistory().location.data;
  //formData
  const [formData, setFormData] = useState({
    projectId: data && data.projectId ? data.projectId : "",
    clientName: data && data.clientName ? data.clientName : "",
    projectName: data && data.projectName ? data.projectName : "",
    projectQuantity: data && data.projectQuantity ? data.projectQuantity : "",
    clientFolderName:
      data && data.clientFolderName ? data.clientFolderName : "",
    projectNotes: data && data.projectNotes ? data.projectNotes : "",
    isSubmitted: false,
  });

  const {
    clientName,
    projectName,
    projectQuantity,
    clientFolderName,
    projectNotes,
    isSubmitted,
  } = formData;
  const [showAllChangeModal, setshowAllChangeModal] = useState(false);
  const handleAllChangeModalClose = () => setshowAllChangeModal(false);

  const onAllChange = (e) => {
    if (e) {
      handleAllChangeModalClose();
    }
  };

  const [userDatas3, setUserDatas3] = useState(null);
  const handleGoToAllLatestChange = (data) => {
    const finalData = {
      projectId: data._id,
    };
    getAllchanges(finalData);
    setshowAllChangeModal(true);
    setUserDatas3(data);
  };
  // Modal
  const projectStatusOpt = [];
  allProjectStatus.map((projStatusData) =>
    projectStatusOpt.push({
      projectStatusCategory: projStatusData.projectStatusCategory,
      label: projStatusData.projectStatusType,
      value: projStatusData._id,
    })
  );
  console.log(projectStatusOpt);

  let AIOpt = projectStatusOpt.filter(
    (projectStatusOpt) =>
      projectStatusOpt.projectStatusCategory === "Additional Instruction"
  );
  let AmendOpt = projectStatusOpt.filter(
    (projectStatusOpt) => projectStatusOpt.projectStatusCategory === "Amend"
  );
  let NormalOpt = projectStatusOpt.filter(
    (projectStatusOpt) =>
      projectStatusOpt.projectStatusCategory !== "Amend" ||
      projectStatusOpt.projectStatusCategory !== "Additional Instruction"
  );

  const [showhistoryModal, setshowhistoryModal] = useState(false);
  const handlehistoryModalClose = () => setshowhistoryModal(false);
  const onhistoryModalChange = (e) => {
    if (e) {
      handlehistoryModalClose();
    }
  };

  const [userDatas1, setUserDatas1] = useState(null);
  const onhistory = (clientJobSummary, idx) => {
    const finalData = {
      projectId: clientJobSummary._id,
    };
    localStorage.removeItem("getLatestChangesDetails");

    getLatestChanges(finalData);
    setshowhistoryModal(true);
    setUserDatas1(clientJobSummary);
  };

  if (!data) {
    return <Redirect to="/daily-job-sheet" />;
  }
  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className=" col-lg-2 col-md-11 col-sm-10 col-10">
              <h5 className="heading_color">Job Summary</h5>
            </div>

            <div className="col-lg-10 col-md-11 col-sm-12 col-11 py-3">
              <Link
                className="btn btn_green_bg float-right"
                to="/daily-job-sheet"
              >
                Back
              </Link>

              <button
                className="btn btn_green_bg float-right"
                onClick={() => handleGoToAllLatestChange(data)}
              >
                History
              </button>
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-12 ">
            <div className="row card-new ">
              <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                <label className="label-control">Client Name :</label>
                <input
                  type="text"
                  name="clientName"
                  value={clientName}
                  className="form-control"
                  disabled
                />
              </div>

              <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                <label className="label-control">Project Name:</label>
                <input
                  type="text"
                  name="projectName"
                  value={projectName}
                  className="form-control"
                  disabled
                />
              </div>

              <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                <label className="label-control">Project Qty :</label>
                <input
                  type="number"
                  name="projectQuantity"
                  value={projectQuantity}
                  className="form-control"
                  disabled
                />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                <label className="label-control">Folder Name:</label>
                <input
                  type="text"
                  name="clientFolderName"
                  value={clientFolderName}
                  className="form-control"
                  disabled
                />
              </div>

              <div className="col-lg-4 col-md-6 col-sm-6 col-12 py-2">
                <label className="label-control">Instructions:</label>
                <textarea
                  name="projectNotes"
                  id="projectNotes"
                  value={projectNotes}
                  className="textarea form-control"
                  rows="3"
                  placeholder="Important Points"
                  style={{ width: "100%" }}
                  disabled
                ></textarea>
              </div>
            </div>
          </div>
          <div className="row py-3">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12 text-center">
              <section className="body">
                <div className=" body-inner no-padding table-responsive ">
                  <table
                    className="table table-bordered table-striped table-hover smll_row"
                    id="datatable2"
                  >
                    <thead>
                      <tr>
                        <th>Sl</th>
                        <th>Qty</th>
                        <th>Type</th>
                        <th>Deadline</th>
                        <th>Pending Qty</th>
                        <th style={{ width: "25%" }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clientJobSummary &&
                        clientJobSummary.map((clientJobSummary, idx) => {
                          let PSC = clientJobSummary.projectStatusCategory;
                          console.log(PSC);
                          return (
                            <tr key={idx}>
                              <td>{idx + 1}</td>
                              <td>{clientJobSummary.projectQuantity}</td>
                              <td>{clientJobSummary.projectPriority}</td>
                              <td>{clientJobSummary.projectDeadline}</td>
                              <td>{clientJobSummary.projectDeadline}</td>
                              <td>
                                {/* SLAP UserGroupRights */}
                                {(user.userGroupName &&
                                  user.userGroupName === "Administrator") ||
                                user.userGroupName === "Super Admin" ||
                                user.userGroupName === "Clarical Admins" ||
                                user.userGroupName === "Quality Controller" ||
                                user.userGroupName === "Distributors" ||
                                user.userGroupName === "Marketing" ? (
                                  <>
                                    <img
                                      className="img_icon_size log float-left mt-2"
                                      onClick={() =>
                                        onhistory(clientJobSummary, idx)
                                      }
                                      src={require("../../static/images/colortheme.png")}
                                      alt="Last change"
                                      title="Last change"
                                    />

                                    <Select
                                      className="ml-4"
                                      name="projectStatusData"
                                      value={{
                                        label:
                                          clientJobSummary.projectStatusType,
                                        value: clientJobSummary.projectStatusId,
                                      }}
                                      options={
                                        PSC === "Additional Instruction"
                                          ? AIOpt
                                          : PSC === "Amend"
                                          ? AmendOpt
                                          : NormalOpt
                                      }
                                      isSearchable={true}
                                      placeholder="Select"
                                      // onChange={onSliderChange(
                                      //   clientJobSummary
                                      // )}
                                    />
                                  </>
                                ) : (
                                  <>
                                    <label>
                                      {clientJobSummary.projectStatusType}
                                    </label>
                                  </>
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
      </div>

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
          <AllProjectsummaryHistory
            onAllChange={onAllChange}
            AllChangedata={userDatas3}
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
    </Fragment>
  );
};

ProjectSummary.propTypes = {
  auth: PropTypes.object.isRequired,
  getAllchanges: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  project: state.project,
});

export default connect(mapStateToProps, { getAllchanges, getLatestChanges })(
  ProjectSummary
);
