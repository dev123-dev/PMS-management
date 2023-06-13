import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
const SctClientCallHistory = ({
  auth: { isAuthenticated, user, users, loading },
  sct: { sctcallHistory },
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
              <th style={{ width: "6%" }}>Call Taken Date</th>
              <th style={{ width: "6%" }}>Next Call Date</th>
              <th style={{ width: "5%" }}>Status</th>
              <th style={{ width: "5%" }}>Category</th>
              <th style={{ width: "5%" }}>Prospect Type</th>
              <th style={{ width: "30%" }}>Notes</th>
              <th style={{ width: "6%" }}>By</th>
            </tr>
          </thead>
          <tbody>
            {sctcallHistory &&
              sctcallHistory.map((sctcallHistory, idx) => {
                var sctCallDate = "";
                if (sctcallHistory.sctCallDate) {
                  var ED = sctcallHistory.sctCallDate.split(/\D/g);
                  sctCallDate = [ED[2], ED[1], ED[0]].join("-");
                }
                var sctCallTakenDate = "";
                if (sctcallHistory.sctCallTakenDate) {
                  var ED1 = sctcallHistory.sctCallTakenDate.split(/\D/g);
                  sctCallTakenDate = [ED1[2], ED1[1], ED1[0]].join("-");
                }
                if (sctcallHistory.sctCallCategory === "F") {
                  var sctCallCategory = "Followup";
                } else if (sctcallHistory.sctCallCategory === "P") {
                  var sctCallCategory = "Prospects";
                } else if (sctcallHistory.sctCallCategory === "EC") {
                  var sctCallCategory = "EngagedClient";
                } else if (sctcallHistory.sctCallCategory === "PT") {
                  var sctCallCategory = "Potentialclient";
                } else if (sctcallHistory.sctCallCategory === "W") {
                  var sctCallCategory = "Prospects";
                } else {
                  var sctCallCategory = "RegularClient";
                }
                return (
                  <tr key={idx}>
                    <td>{sctcallHistory.sctCallToStaffName}</td>
                    <td>{sctCallTakenDate}</td>
                    <td>{sctCallDate}</td>
                    <td>{sctcallHistory.sctCallStatus}</td>
                    <td>{sctCallCategory}</td>
                    <td>{sctcallHistory.sctLeadsCategory}</td>
                    <td>{sctcallHistory.sctCallNote}</td>
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
  sct: state.sct,
});

export default connect(mapStateToProps, {})(SctClientCallHistory);
