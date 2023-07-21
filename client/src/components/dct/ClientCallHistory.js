import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
const ClientCallHistory = ({
  auth: { isAuthenticated, user, users, loading },
  dct: { callHistory },
  onClientCallHistoryModalChange,
}) => {
  return !isAuthenticated || !user ? (
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
              <th style={{ width: "10%" }}>Staff Name </th>
              <th style={{ width: "6%" }}>Call Taken Date</th>
              <th style={{ width: "5%" }}>Status</th>
              <th style={{ width: "5%" }}>Category</th>
              <th style={{ width: "6%" }}>Next Call Date</th>
              <th style={{ width: "25%" }}>Notes</th>
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
                var callTakenDate = "";
                if (callHistory.callTakenDate) {
                  var ED1 = callHistory.callTakenDate.split(/\D/g);
                  callTakenDate = [ED1[2], ED1[1], ED1[0]].join("-");
                }
                var callCategory = "";
                if (callHistory.callCategory === "F") {
                  callCategory = "Followup";
                } else if (callHistory.callCategory === "P") {
                  callCategory = "Prospect";
                } else if (callHistory.callCategory === "TC") {
                  callCategory = "TestClient";
                } else if (callHistory.callCategory === "W") {
                  callCategory = "WrongNumber";
                } else if (callHistory.callCategory === "RC") {
                  callCategory = "RegularClient";
                }
                return (
                  <tr key={idx}>
                    <td>{callHistory.callToStaffName}</td>
                    <td>{callTakenDate}</td>
                    <td>{callHistory.callStatus}</td>
                    <td>{callCategory}</td>
                    <td>{callDates}</td>
                    <td>
                      <Link
                        to="#"
                        className="linkoflastmesge"
                        title={callHistory.callNote}
                      >
                        {callHistory.callNote}
                      </Link>
                    </td>

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
