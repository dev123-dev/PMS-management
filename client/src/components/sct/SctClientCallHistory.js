import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
const SctClientCallHistory = ({
  auth: { isAuthenticated, user, users, loading },
  sct: { sctcallHistory },
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
              <th style={{ width: "10%" }}>Staff Name </th>
              <th style={{ width: "5%" }}>Call Date</th>
              <th style={{ width: "5%" }}>Status</th>
              <th style={{ width: "5%" }}>Category</th>
              <th style={{ width: "30%" }}>Notes</th>
              <th style={{ width: "6%" }}>By</th>
            </tr>
          </thead>
          <tbody>
            {sctcallHistory &&
              sctcallHistory.map((sctcallHistory, idx) => {
                var sctCallDate = "";
                if (sctcallHistory.callDate) {
                  var ED = sctcallHistory.callDate.split(/\D/g);
                  sctCallDate = [ED[2], ED[1], ED[0]].join("-");
                }
                if (sctcallHistory.callCategory === "F") {
                  var callCategory = "Followup";
                } else if (sctcallHistory.callCategory === "P") {
                  var callCategory = "Prospects";
                } else if (sctcallHistory.callCategory === "TC") {
                  var callCategory = "TestClient";
                } else {
                  var callCategory = "RegularClient";
                }
                return (
                  <tr key={idx}>
                    <td>{sctcallHistory.sctCallToStaffName}</td>
                    <td>{sctCallDate}</td>
                    <td>{sctcallHistory.sctCallStatus}</td>
                    <td>{callCategory}</td>
                    <td>
                      <Link to="#" title={sctcallHistory.sctCallNote}>
                        {sctcallHistory.sctCallNote}
                      </Link>
                    </td>

                    <td>{sctcallHistory.sctCallFromName}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

SctClientCallHistory.propTypes = {
  auth: PropTypes.object.isRequired,
  sct: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  sct: state.dct,
});

export default connect(mapStateToProps, {})(SctClientCallHistory);
