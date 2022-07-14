import React, { useState, Fragment, useEffect } from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getAmendmentHistoryDeatils } from "../../actions/projects";

const AmendHistory = ({
  auth: { isAuthenticated, user, users },
  project: { amendentHistory },
  amenddata,
  getAmendmentHistoryDeatils,
}) => {
  useEffect(() => {
    getAmendmentHistoryDeatils(amenddata);
  }, [getAmendmentHistoryDeatils]);
  console.log("amendentHistory", amendentHistory);
  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="row">
        <div className="col-lg-11 col-md-12 col-sm-12 col-12 text-center">
          <section className="body">
            <div className=" body-inner no-padding table-responsive">
              <table
                className="table table-bordered table-striped table-hover"
                id="datatable2"
              >
                <thead>
                  <tr>
                    <th>Entered By Name </th>
                    <th>Date </th>
                    <th>Discussion Points</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </Fragment>
  );
};

AmendHistory.propTypes = {
  auth: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  getAmendmentHistoryDeatils: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  project: state.project,
});

export default connect(mapStateToProps, { getAmendmentHistoryDeatils })(
  AmendHistory
);
