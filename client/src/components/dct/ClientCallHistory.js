import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";

const ClientCallHistory = ({
  auth: { isAuthenticated, user, users, loading },
  dct: { callHistory },
  onClientCallHistoryModalChange,
}) => {
  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="row col-lg-12 col-md-11 col-sm-12 col-12 ">
        <table
          className="table table-bordered table-striped table-hover smll_row"
          id="datatable2"
        >
          <thead>
            <tr>
              <th style={{ width: "15%" }}>Staff Name </th>
              <th style={{ width: "15%" }}>Call Date</th>
              <th style={{ width: "13%" }}>Status</th>
              <th style={{ width: "13%" }}>Category</th>
              <th style={{ width: "20%" }}>Notes</th>
              <th style={{ width: "6%" }}>By</th>
            </tr>
          </thead>
          <tbody>
            {callHistory &&
              callHistory.map((callHistory, idx) => {
                var callDates = "";
                if (callHistory.callDate) {
                  var ED = callHistory.callDate.split(/\D/g);
                  callDates = [ED[2], ED[1], ED[0]].join("-");
                }
                if (callHistory.callCategory === "F") {
                  var callCategory = "Followup";
                } else if (callHistory.callCategory === "P") {
                  var callCategory = "Prospects";
                } else if (callHistory.callCategory === "TC") {
                  var callCategory = "TestClient";
                } else {
                  var callCategory = "RegularClient";
                }
                return (
                  <tr key={idx}>
                    <td>{callHistory.callToStaffName}</td>
                    <td>{callDates}</td>
                    <td>{callHistory.callStatus}</td>
                    <td>{callCategory}</td>
                    <td>{callHistory.callNote}</td>
                    <td>{callHistory.callFromName}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

ClientCallHistory.propTypes = {
  auth: PropTypes.object.isRequired,
  dct: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  dct: state.dct,
});

export default connect(mapStateToProps, {})(ClientCallHistory);
