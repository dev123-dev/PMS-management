import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import Select from "react-select";
import { getDemoSchedules } from "../../actions/sct";

const DemoSchedulesModal = ({
  auth: { isAuthenticated, user, users, loading },
  sct: { scheduledDemos },
  getDemoSchedules,
}) => {
  useEffect(() => {
    getDemoSchedules(new Date().toISOString().split("T")[0]);
  }, [getDemoSchedules]);

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const onDateChange = (e) => {
    setSelectedDate(e.target.value);
    getDemoSchedules(e.target.value);
  };

  const onCheckSchedule = (e) => {
    let selDateData = {
      selDate: selectedDate,
    };
    // SelDateDataVal(selDateData);
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
              name="selectedDate"
              value={selectedDate}
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
              onClick={() => onCheckSchedule()}
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
            <tbody>
              {scheduledDemos &&
                scheduledDemos.map((scheduledDemos, idx) => {
                  var demoDate = "";
                  if (scheduledDemos.demoDate) {
                    var ED = scheduledDemos.demoDate.split(/\D/g);
                    demoDate = [ED[2], ED[1], ED[0]].join("-");
                  }
                  return (
                    <tr key={idx}>
                      <td>{scheduledDemos.clientName}</td>
                      <td>{demoDate}</td>
                      <td>{scheduledDemos.fromTime}</td>
                      <td>{scheduledDemos.toTime}</td>
                    </tr>
                  );
                })}
            </tbody>
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

export default connect(mapStateToProps, { getDemoSchedules })(
  DemoSchedulesModal
);
