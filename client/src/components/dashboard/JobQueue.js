import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";

const JobQueue = ({ auth: { isAuthenticated, user, users } }) => {
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
            </div>
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
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td> </td>
                      <td> </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td> </td>
                      <td> </td>

                      <td></td>
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

JobQueue.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(JobQueue);
