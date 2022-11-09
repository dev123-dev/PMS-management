import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import {
  getAllSctCallCount,
  getALLDemosReport,
  getAllLeadToday,
} from "../../actions/sct";
const SctDailyReport = ({
  auth: { isAuthenticated, user },
  sct: {
    sctCallsCount,
    allDemos,
    allDemosTaken,
    allDemosAddedToday,
    allLeadEnteredToday,
  },
  getALLDemosReport,
  getAllLeadToday,
  getAllSctCallCount,
}) => {
  useEffect(() => {
    getAllLeadToday();
  }, [getAllLeadToday]);
  useEffect(() => {
    getAllSctCallCount();
  }, [getAllSctCallCount]);
  useEffect(() => {
    getALLDemosReport();
  }, [getALLDemosReport]);

  const alldemosentered = [];
  allLeadEnteredToday &&
    allLeadEnteredToday.map((demos) =>
      alldemosentered.push({
        demosId: demos._id,
        label: demos.empFullName,
        value: demos.empFullName,
      })
    );

  return !isAuthenticated || !user ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align">
        <div className="col-lg-11 col-md-11 col-sm-12 col-12">
          <h2 className="heading_color">Sct Daily Report </h2>
        </div>
        <section className="sub_reg">
          {user.empCtAccess && user.empCtAccess === "Individual" ? (
            <>
              <Fragment>
                <div className="row col-lg-12 col-md-11 col-sm-12 col-12 py-5">
                  <div className="col-lg-6 col-md-6 col-sm-12 col-12 py-2">
                    <div className="card card-content ">
                      <center>
                        <h3>SCT CALLS</h3>
                        <h3>
                          Clients :{" "}
                          {sctCallsCount &&
                            sctCallsCount.getAllSctCallsClient &&
                            sctCallsCount.getAllSctCallsClient.length}
                        </h3>
                        <h3>
                          Calls :{" "}
                          {sctCallsCount &&
                            sctCallsCount.getAllSctCallsCount &&
                            sctCallsCount.getAllSctCallsCount[0] &&
                            sctCallsCount.getAllSctCallsCount[0].count}
                        </h3>
                      </center>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 col-12 py-2">
                    <div
                      className="card card-content "
                      style={{ height: "100%" }}
                    >
                      <center>
                        <h3>LEADS</h3>
                        <h3>
                          Today's Lead Entry :{" "}
                          {allLeadEnteredToday && allLeadEnteredToday.length}
                        </h3>
                      </center>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 col-12 py-2">
                    <div className="card card-content ">
                      <center>
                        <h3>DEMOS</h3>
                        <h3>Demo Scheduled :{allDemos && allDemos.length}</h3>
                        <h3>
                          Demo Taken : {allDemosTaken && allDemosTaken.length}
                        </h3>
                      </center>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 col-12 py-2">
                    <div
                      className="card card-content "
                      style={{ height: "100%" }}
                    >
                      <center>
                        <h3>
                          Demos Scheduled Today :{" "}
                          {allDemosAddedToday && allDemosAddedToday.length}
                        </h3>
                      </center>
                    </div>
                  </div>
                </div>
              </Fragment>
            </>
          ) : (
            <>
              <Fragment>
                <div className="row col-lg-12 col-md-11 col-sm-12 col-12 py-5">
                  <div className="col-lg-6 col-md-6 col-sm-12 col-12 py-2">
                    <div className="card card-content ">
                      <center>
                        <h3>SCT CALLS</h3>
                      </center>
                      <div style={{ padding: "0 15px 0 15px" }}>
                        <table
                          className="table table-bordered table-striped table-hover"
                          id="datatable2"
                        >
                          <thead>
                            <tr>
                              <th width="15px">No.</th>
                              <th>Name</th>
                              <th>Calls</th>
                              <th>Client</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sctCallsCount &&
                              sctCallsCount.getAllSctCallsClient &&
                              sctCallsCount.getAllSctCallsClient.map(
                                (call, idx) => {
                                  return (
                                    <tr key={idx}>
                                      <td>{idx + 1}</td>
                                      <td>{call.sctCallFromName}</td>
                                      <td>{call.countCall}</td>
                                      <td>{call.countClient}</td>
                                    </tr>
                                  );
                                }
                              )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 col-12 py-2">
                    <div
                      className="card card-content "
                      style={{ height: "100%" }}
                    >
                      <center>
                        <h3>Today's Lead Entry : </h3>
                      </center>

                      {/*className="table-responsive fixTableHead" */}
                      <div style={{ padding: "0 15px 0 15px" }}>
                        <table
                          className="table table-bordered table-striped table-hover"
                          id="datatable2"
                        >
                          <thead>
                            <tr>
                              <th width="15px">No.</th>
                              <th>Name</th>
                              <th>Count</th>
                            </tr>
                          </thead>
                          <tbody>
                            {allLeadEnteredToday &&
                              allLeadEnteredToday.map((today, idx) => {
                                return (
                                  <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{today.sctLeadAssignedToName}</td>
                                    <td>{today.count}</td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 col-12 py-2">
                    <div className="card card-content ">
                      <center>
                        <h3>DEMOS</h3>
                      </center>
                      <div style={{ padding: "0 15px 0 15px" }}>
                        <table
                          className="table table-bordered table-striped table-hover"
                          id="datatable2"
                        >
                          <thead>
                            <tr>
                              <th width="15px">No.</th>
                              <th>Name</th>
                              <th>Scheduled</th>
                              <th>Taken</th>
                            </tr>
                          </thead>
                          <tbody>
                            {allDemos &&
                              allDemos.map((allDemos, idx) => {
                                let takenCount = 0;
                                allDemosTaken &&
                                  allDemosTaken.map((allDemosTaken, idx) => {
                                    if (allDemosTaken._id === allDemos._id) {
                                      takenCount = allDemosTaken.count;
                                    }
                                  });
                                return (
                                  <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{allDemos.empName}</td>
                                    <td>{allDemos.count}</td>
                                    <td>{takenCount}</td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 col-12 py-2">
                    <div
                      className="card card-content "
                      style={{ height: "100%" }}
                    >
                      <center>
                        <h3>
                          Demos Scheduled Today :{" "}
                          {allDemosAddedToday && allDemosAddedToday.length}
                        </h3>
                      </center>
                      <div style={{ padding: "0 15px 0 15px" }}>
                        <table
                          className="table table-bordered table-striped table-hover"
                          id="datatable2"
                        >
                          <thead>
                            <tr>
                              <th width="15px">No.</th>
                              <th>Name</th>
                              <th>Count</th>
                            </tr>
                          </thead>
                          <tbody>
                            {allDemosAddedToday &&
                              allDemosAddedToday.map((today, idx) => {
                                return (
                                  <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{today.empName}</td>
                                    <td>{today.count}</td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            </>
          )}
        </section>
      </div>
    </Fragment>
  );
};

SctDailyReport.propTypes = {
  auth: PropTypes.object.isRequired,
  sct: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  sct: state.sct,
});

export default connect(mapStateToProps, {
  getAllLeadToday,
  getAllSctCallCount,
  getALLDemosReport,
})(SctDailyReport);
