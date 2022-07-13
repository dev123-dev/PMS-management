import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { getAllchanges } from "../../actions/projects";
const Amendments = ({
  auth: { isAuthenticated, user, users },
  project: { jobQueueProjects },
}) => {
  //formData
  const [formData, setFormData] = useState({
    Notes: "",
    isSubmitted: false,
  });

  const { Notes, isSubmitted } = formData;
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className=" col-lg-1 col-md-11 col-sm-10 col-10">
              <h5 className="heading_color">Amendments</h5>
            </div>
          </div>
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className="col-lg-8 col-md-12 col-sm-12 col-12 text-center">
              <section className="body">
                <div className=" body-inner no-padding table-responsive fixTableHead">
                  <table
                    className="table table-bordered table-striped table-hover smll_row"
                    id="datatable2"
                  >
                    <thead>
                      <tr>
                        <th style={{ width: "10%" }}>Client Name</th>
                        <th style={{ width: "6%" }}>Folder </th>
                        <th style={{ width: "25%" }}>Project Name</th>
                        <th style={{ width: "12%" }}>Queue Duration</th>
                        <th style={{ width: "10%" }}>Estimated Time</th>
                        <th style={{ width: "10%" }}>Job Time</th>
                        <th style={{ width: "2%" }}>Deadline</th>
                        <th style={{ width: "3%" }}>Qty</th>
                        <th style={{ width: "13%" }}>Status</th>
                        <th style={{ width: "10%" }}>OP</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobQueueProjects &&
                        jobQueueProjects.map((jobQueueProjects, idx) => {
                          return (
                            <tr key={idx}>
                              <td>{jobQueueProjects.clientName}</td>

                              <td>
                                <b>{jobQueueProjects.clientFolderName}</b>
                              </td>
                              <td>{jobQueueProjects.projectName}</td>
                              <td></td>
                              <td></td>
                              <td></td>

                              <td>{jobQueueProjects.projectDeadline}</td>
                              <td>
                                {jobQueueProjects.projectQuantity}&nbsp;
                                {jobQueueProjects.projectUnconfirmed ===
                                  true && (
                                  <span style={{ color: "red" }}>*</span>
                                )}
                              </td>
                              <td></td>
                              <td></td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 col-12  ">
              <div className="col-lg-12 col-md-6 col-sm-6 col-12 card-new py-2">
                <div className="row col-lg-12 col-md-6 col-sm-6 col-12 ">
                  <div className=" col-lg-12 col-md-6 col-sm-6 col-12 ">
                    <label className="label-control">Notes :</label>
                    <textarea
                      name="Notes"
                      id="Notes"
                      className="textarea form-control"
                      rows="4"
                      placeholder="Notes"
                      style={{ width: "100%" }}
                      value={Notes}
                      onChange={(e) => onInputChange(e)}
                      required
                    ></textarea>
                  </div>
                  <div className="col-lg-12 col-md-6 col-sm-6 col-12 ">
                    <input
                      type="submit"
                      name="Submit"
                      value="Submit"
                      className="btn sub_form btn_continue blackbrd Save float-right"
                    />
                  </div>
                </div>
              </div>

              <div className="col-lg-12 col-md-6 col-sm-6 col-12 card-new py-2">
                <div className="col-lg-12 col-md-6 col-sm-6 col-12 ">
                  <label className="label-control">Old Notes :</label>
                  <textarea
                    name="Notes"
                    id="Notes"
                    className="textarea form-control"
                    rows="4"
                    placeholder="Notes"
                    style={{ width: "100%" }}
                    value={Notes}
                    onChange={(e) => onInputChange(e)}
                    disabled
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

Amendments.propTypes = {
  auth: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  project: state.project,
  settings: state.settings,
});

export default connect(mapStateToProps, {})(Amendments);
