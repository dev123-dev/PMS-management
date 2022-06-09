import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { getDailyJobsheetProjectDeatils } from "../../actions/projects";

const DailyJobSheet = ({
  auth: { isAuthenticated, user, users },
  project: { dailyJobsheetProjects },
  getDailyJobsheetProjectDeatils,
}) => {
  useEffect(() => {
    getDailyJobsheetProjectDeatils();
  }, [getDailyJobsheetProjectDeatils]);
  // console.log("dailyJobsheetProjects", dailyJobsheetProjects);
  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className=" col-lg-5 col-md-11 col-sm-10 col-10">
              <h5 className="heading_color">Daily Job Sheet</h5>
            </div>
            <div className="col-lg-7 col-md-11 col-sm-12 col-11 py-3"></div>
          </div>
          <div className="row col-lg-12 col-md-11 col-sm-12 col-12 no_padding"></div>
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
                      {dailyJobsheetProjects &&
                        dailyJobsheetProjects.map(
                          (dailyJobsheetProjects, idx) => {
                            return (
                              <tr key={idx}>
                                <td>{dailyJobsheetProjects.clientName}</td>
                                <td>
                                  {dailyJobsheetProjects.clientFolderName}
                                </td>
                                <td>{dailyJobsheetProjects.projectName}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>{dailyJobsheetProjects.projectPriority}</td>
                                <td>{dailyJobsheetProjects.projectDeadline}</td>
                                <td>{dailyJobsheetProjects.projectQuantity}</td>
                                <td>
                                  {dailyJobsheetProjects.projectStatusType}
                                </td>
                                <td></td>
                                <td>{dailyJobsheetProjects.projectNotes}</td>
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
                          }
                        )}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

DailyJobSheet.propTypes = {
  auth: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  project: state.project,
});

export default connect(mapStateToProps, { getDailyJobsheetProjectDeatils })(
  DailyJobSheet
);
