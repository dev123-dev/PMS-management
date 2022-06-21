import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { getAllchanges } from "../../actions/projects";
const AllLatestChange = ({
  auth: { isAuthenticated, user, users },
  project: { getAllChangesData },
  AllChangedata,
  getAllchanges,
}) => {
  let getAllChangesDetails = JSON.parse(
    localStorage.getItem("getAllChangesDetails")
  );
  // console.log("getAllChangesDetails", getAllChangesDetails);
  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
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
                    <th>Date & Time</th>
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
                            {getAllChangesData.output[0].projectEnteredByName}
                          </td>
                          <td>
                            {getAllChangesData.output[0].projectEnteredDateTime}
                          </td>
                          <td>{getAllChangesData.projectStatusType}</td>
                          <td>{getAllChangesData.projectTrackLatestChange}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </section>
        </div>
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