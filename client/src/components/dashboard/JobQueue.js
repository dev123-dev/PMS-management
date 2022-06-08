import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { getJobQueueProjectDeatils } from "../../actions/projects";

const JobQueue = ({
  auth: { isAuthenticated, user, users },
  project: { jobQueueProjects },
  getJobQueueProjectDeatils,
}) => {
  useEffect(() => {
    getJobQueueProjectDeatils();
  }, [getJobQueueProjectDeatils]);

  console.log("jobQueueProjects", jobQueueProjects);
  const onRadioProjCatTypeChange = (e) => {
    console.log(e.target.value);
    // if (e.target.value === "student") {
    //   setFormData({ ...formData, userRole: e.target.value });
    // } else {
    //   setFormData({ ...formData, userRole: e.target.value });
    // }
  };
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
              <Link to="/add-Project">
                <img
                  className="img_icon_size log float-right"
                  src={require("../../static/images/add-icon.png")}
                  alt="Add Project"
                  title="Add Project"
                />
              </Link>

              <Link to="/change-project-life-cycle">
                <img
                  className="img_icon_size log float-right"
                  src={require("../../static/images/add-icon.png")}
                  alt="Add Update"
                  title="Add Update"
                />
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12 text-center py-2">
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
                          return (
                            <tr key={idx}>
                              <td>{jobQueueProjects.departmentName}</td>
                              <td>{jobQueueProjects.clientFolderName}</td>
                              <td>{jobQueueProjects.projectName}</td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td>{jobQueueProjects.projectPriority}</td>
                              <td>{jobQueueProjects.projectDeadline}</td>
                              <td>{jobQueueProjects.projectQuantity}</td>
                              <td>{jobQueueProjects.projectStatusType}</td>
                              <td></td>
                              <td>{jobQueueProjects.projectNotes}</td>
                              <td></td>
                              {/* <td>
                                <>
                                  <img
                                    className="img_icon_size log"
                                    onClick={() => onUpdate(allDepartment, idx)}
                                    src={require("../../static/images/delete.png")}
                                    alt="Deactivate"
                                    title="Deactivate"
                                  />
                                  &nbsp;
                                  <img
                                    className="img_icon_size log"
                                    onClick={() => onUpdate(allDepartment, idx)}
                                    src={require("../../static/images/edit_icon.png")}
                                    alt="Edit"
                                    title="Edit"
                                  />
                                </>
                              </td> */}
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

        <div className="row col-md-12 col-lg-12 col-sm-12 col-12 top_radio no_padding bottmAlgmnt">
          <div className="col-lg-10 col-md-6 col-sm-6 col-12">
            <label className="radio-inline ">
              <input
                type="radio"
                name="ProjCatType"
                className="radio_style"
                value="Normal"
                onChange={(e) => onRadioProjCatTypeChange(e)}
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
              />{" "}
              Don't Work
            </label>
          </div>
          <div className="col-lg-2 col-md-6 col-sm-6 col-12">Projects:</div>
          <div className="col-lg-10 col-md-6 col-sm-6 col-12">
            <label>Downloading:0 &emsp;</label>
            <label>Working :0&emsp;</label>
            <label>Pending : 0&emsp;</label>
            <label>QC Pending:0&emsp;</label>
            <label>QC Estimate :0&emsp;</label>
            <label>Working:0&emsp;</label>
          </div>
          <div className="col-lg-2 col-md-6 col-sm-6 col-12">Quantity:</div>
        </div>
      </div>
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

export default connect(mapStateToProps, { getJobQueueProjectDeatils })(
  JobQueue
);
