import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
const ClientCallHistory = ({
  auth: { isAuthenticated, user, users, loading },
  dct: { callHistory },
  onClientCallHistoryModalChange,
}) => {
  //formData
  const [formData, setFormData] = useState({
    isSubmitted: false,
  });
  console.log("callHistory", callHistory);
  const { isSubmitted } = formData;

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
              <th style={{ width: "13%" }}>Call Date</th>
              <th style={{ width: "13%" }}>Status</th>
              <th style={{ width: "6%" }}>Notes</th>
              <th style={{ width: "6%" }}>Call By</th>
            </tr>
          </thead>
          <tbody>
            {callHistory &&
              callHistory.map((callHistory, idx) => {
                return (
                  <tr key={idx}>
                    <td>{callHistory.callToStaffName}</td>

                    <td>
                      {new Date(callHistory.callDate).toLocaleString("en-GB")}
                    </td>
                    <td>{callHistory.callStatus}</td>
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
