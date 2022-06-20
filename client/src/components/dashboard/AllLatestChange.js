import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { getAllchanges } from "../../actions/projects";
const AllLatestChange = ({
  auth: { isAuthenticated, user, users },
  project: { getAllChangesData },
  getAllchanges,
}) => {
  let getAllChangesDetails = JSON.parse(
    localStorage.getItem("getAllChangesDetails")
  );
  console.log("getAllChangesDetails", getAllChangesDetails);
  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className=" col-lg-10 col-md-11 col-sm-10 col-10">
              <h5 className="heading_color">All Changes Details </h5>
            </div>
            <div className="col-lg-2 col-md-11 col-sm-12 col-12 py-2">
              <Link className="btn btn_green_bg float-right" to="/job-queue">
                Back
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
                        <th>Changed By</th>
                        <th>Date&Time</th>
                        <th>Status</th>
                        <th>Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getAllChangesDetails &&
                        getAllChangesDetails.map((getAllChangesData, idx) => {
                          return (
                            <tr key={idx}>
                              <td>
                                {
                                  getAllChangesData.output[0]
                                    .projectEnteredByName
                                }
                              </td>
                              <td>
                                {
                                  getAllChangesData.output[0]
                                    .projectEnteredDateTime
                                }
                              </td>
                              <td>{getAllChangesData.projectStatusType}</td>
                              <td>
                                {getAllChangesData.output[0].projectNotes}
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
    </Fragment>
  );
};

AllLatestChange.propTypes = {
  auth: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,

  AddProjectTrack: PropTypes.object.isRequired,
  getAllchanges: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  project: state.project,
  settings: state.settings,
});

export default connect(mapStateToProps, { getAllchanges })(AllLatestChange);
