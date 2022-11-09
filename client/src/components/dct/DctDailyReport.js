import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getAllDctCallCount, getAllDctLeadToday } from "../../actions/dct";
const DctDailyReport = ({
  auth: { isAuthenticated, user, users },
  dct: { dctCallsCount, dctCallsClientCount, allDctLeadEnteredToday },
  getAllDctCallCount,
  getAllDctLeadToday,
}) => {
  useEffect(() => {
    getAllDctCallCount();
  }, [getAllDctCallCount]);
  useEffect(() => {
    getAllDctLeadToday();
  }, [getAllDctLeadToday]);

  console.log("allDctLeadEnteredToday", allDctLeadEnteredToday);
  // console.log("dctCallsCount", dctCallsCount);

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align">
        <div className="col-lg-11 col-md-11 col-sm-12 col-12">
          <h2 className="heading_color">Dct Daily Report </h2>
        </div>
        <section className="sub_reg">
          {user.empCtAccess && user.empCtAccess === "Individual" ? (
            <>
              <Fragment>
                <div className="row col-lg-11 col-md-11 col-sm-12 col-12 py-5">
                  <div className="col-lg-6 col-md-6 col-sm-12 col-12 py-2">
                    <div className="card card-content ">
                      <center>
                        <h3>DCT CALLS</h3>
                        <h3>
                          Clients :
                          {dctCallsClientCount && dctCallsClientCount.length}
                        </h3>
                        <h3>
                          Calls :
                          {dctCallsCount &&
                            dctCallsCount[0] &&
                            dctCallsCount[0].count}
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
                          Today's Lead Entry :
                          {allDctLeadEnteredToday &&
                            allDctLeadEnteredToday.length}
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
                <div className="row col-lg-11 col-md-11 col-sm-12 col-12 py-5">
                  <div className="col-lg-6 col-md-6 col-sm-12 col-12 py-2">
                    <div className="card card-content ">
                      <center>
                        <h3>DCT CALLS</h3>
                        {/* <h3>
                          Clients :
                          {dctCallsClientCount && dctCallsClientCount.length}
                        </h3>
                        <h3>Calls :{dctCallsCount && dctCallsCount.length}</h3> */}
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
                            {dctCallsClientCount &&
                              dctCallsClientCount.map((call, idx) => {
                                return (
                                  <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{call.callFromName}</td>
                                    <td>{call.countCall}</td>
                                    <td>{call.countClient}</td>
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
                        <h3>Today's Lead Entry</h3>
                        {/* <h3>
                          Today's Lead Entry :
                          {allDctLeadEnteredToday &&
                            allDctLeadEnteredToday.length}
                        </h3> */}
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
                            {allDctLeadEnteredToday &&
                              allDctLeadEnteredToday.map((lead, idx) => {
                                return (
                                  <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{lead.dctLeadAssignedToName}</td>
                                    <td>{lead.count}</td>
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

DctDailyReport.propTypes = {
  auth: PropTypes.object.isRequired,
  dct: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  settings: state.settings,
  client: state.client,
  regions: state.regions,
  dct: state.dct,
});

export default connect(mapStateToProps, {
  getAllDctCallCount,
  getAllDctLeadToday,
})(DctDailyReport);
