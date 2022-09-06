import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import Select from "react-select";
const DemoSchedulesModal = ({
  auth: { isAuthenticated, user, users, loading },
  // sct: { sctcallHistory },
  // onClientCallHistoryModalChange,
}) => {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  var todayDateymd = yyyy + "-" + mm + "-" + dd;

  const [fromdate, setfromdate] = useState(todayDateymd);
  const onDateChange = (e) => {
    setfromdate(e.target.value);
  };
  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <section className="sub_reg">
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
          <div className=" col-lg-3 col-md-11 col-sm-10 col-10 py-2">
            <input
              type="date"
              placeholder="dd/mm/yyyy"
              className="form-control cpp-input datevalidation"
              name="fromdate"
              value={fromdate}
              onChange={(e) => onDateChange(e)}
              style={{
                width: "100%",
              }}
              required
            />
          </div>
          <div className="col-lg-2 col-md-12 col-sm-12 col-12 py-2">
            <input
              type="submit"
              name="submit"
              value="Check"
              //  onClick={() => onCheckSchedule()}
              className="form-control btn sub_form blackbrd "
            />
          </div>
        </div>
        <div className="row col-lg-12 col-md-11 col-sm-12 col-12 ">
          <table
            className="table table-bordered table-striped table-hover smll_row"
            id="datatable2"
          >
            <thead>
              <tr>
                <th style={{ width: "10%" }}>Client Name </th>
                <th style={{ width: "5%" }}>Demo Date</th>
                <th style={{ width: "5%" }}>From Time</th>
                <th style={{ width: "5%" }}>To Time</th>
              </tr>
            </thead>
            {/* <tbody>
            {sctcallHistory &&
              sctcallHistory.map((sctcallHistory, idx) => {
                var sctCallDate = "";
                if (sctcallHistory.callDate) {
                  var ED = sctcallHistory.callDate.split(/\D/g);
                  sctCallDate = [ED[2], ED[1], ED[0]].join("-");
                }
                if (sctcallHistory.sctCallCategory === "F") {
                  var sctCallCategory = "Followup";
                } else if (sctcallHistory.sctCallCategory === "P") {
                  var sctCallCategory = "Prospects";
                } else if (sctcallHistory.sctCallCategory === "TC") {
                  var sctCallCategory = "TestClient";
                } else {
                  var sctCallCategory = "RegularClient";
                }
                return (
                  <tr key={idx}>
                    <td>{sctcallHistory.sctCallToStaffName}</td>
                    <td>{sctCallDate}</td>
                    <td>{sctcallHistory.sctCallStatus}</td>
                    <td>{sctCallCategory}</td>
                    <td>
                      <Link to="#" title={sctcallHistory.sctCallNote}>
                        {sctcallHistory.sctCallNote}
                      </Link>
                    </td>

                    <td>{sctcallHistory.sctCallFromName}</td>
                  </tr>
                );
              })}
          </tbody> */}
          </table>
        </div>
      </section>
    </Fragment>
  );
};

DemoSchedulesModal.propTypes = {
  auth: PropTypes.object.isRequired,
  sct: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  sct: state.sct,
});

export default connect(mapStateToProps, {})(DemoSchedulesModal);
