import React, { useState, Fragment, useEffect } from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import Select from "react-select";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import Pagination from "../layout/Pagination";

const AllStaffDetails = ({
  auth: { allUser, isAuthenticated, user, users },
}) => {
  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-11 col-md-12 col-sm-12 col-12 no_padding">
            <div className="row col-lg-5 col-md-11 col-sm-10 col-10">
              <h5 className="heading_color">All Staff Details </h5>
            </div>
          </div>
          <div className="row col-lg-12 col-md-11 col-sm-12 col-12 no_padding">
            <div className="col-lg-11 col-md-11 col-sm-12 col-11 py-3">
              <Link to="/add-Staff">
                <img
                  className="img_icon_size log float-right"
                  src={require("../../static/images/add-icon.png")}
                  alt="Add Staff"
                  title="Add Staff"
                />
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-11 col-md-12 col-sm-12 col-12 text-center py-2">
              <section className="body">
                <div className=" body-inner no-padding table-responsive">
                  <table
                    className="table table-bordered table-striped table-hover"
                    id="datatable2"
                  >
                    <thead>
                      <tr>
                        <th>Staff Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Staff Code</th>
                        <th>Joining Date Code</th>
                        <th>OP</th>
                      </tr>
                    </thead>
                    <tbody></tbody>
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

AllStaffDetails.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(AllStaffDetails);
