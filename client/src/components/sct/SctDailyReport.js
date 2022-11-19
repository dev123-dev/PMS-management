import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import {
  getAllSctCallCount,
  getALLDemosReport,
  getAllLeadToday,
} from "../../actions/sct";
import Select from "react-select";
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

  const DateMethods = [
    { value: "Single Date", label: "Single Date" },
    { value: "Multi Date", label: "Multi Date" },
  ];

  const [showHide, setShowHide] = useState({
    showdateSection: false,
    showdateSection1: true,
  });
  const { showdateSection, showdateSection1 } = showHide;

  const [formData, setFormData] = useState({
    Dateselectmode: DateMethods[0],

    isSubmitted: false,
  });
  const { Dateselectmode } = formData;
  const onDateModeChange = (e) => {
    // setprojectData("");
    if (e) {
      setFormData({
        ...formData,
        Dateselectmode: e,
      });
    }
    if (e.value === "Multi Date") {
      setShowHide({
        ...showHide,
        showdateSection: true,
        showdateSection1: false,
      });
    } else {
      setShowHide({
        ...showHide,
        showdateSection: false,
        showdateSection1: true,
      });
    }
  };

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [singledate, setsingledate] = useState(
    new Date().toISOString().split("T")[0]
  );
  //
  const onDateChange2 = (e) => {
    // setprojectData("");
    setsingledate(e.target.value);
    let finalData = {
      selDate: e.target.value,
      dateType: "Single Date",
      // folderId: projectData.folderId,
    };

    // setSelDateDataVal(selDateData);
    getAllSctCallCount(finalData);
    getAllLeadToday(finalData);
    getALLDemosReport(finalData);
    // getDailyjobSheetFolder(selDateData);
  };

  const [fromdate, setfromdate] = useState("");
  const onDateChange = (e) => {
    setfromdate(e.target.value);
  };

  const [todate, settodate] = useState("");
  const onDateChange1 = (e) => {
    settodate(e.target.value);

    let finalData = {
      fromdate: fromdate,
      todate: e.target.value,
      dateType: "Multi Date",
      // folderId: projectData.folderId,
    };
    // setSelDateDataVal(selDateData);
    getAllSctCallCount(finalData);
    getAllLeadToday(finalData);
    getALLDemosReport(finalData);
    // getDailyjobSheetFolder(selDateData);
  };

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
        <div className="row col-lg-6 col-md-6 col-sm-12 col-12 no_padding">
          <div className="col-lg-11 col-md-11 col-sm-12 col-12">
            <h2 className="heading_color">Sct Daily Report </h2>
          </div>
          <div className="row col-lg-12 col-md-6 col-sm-12 col-12 no_padding">
            <div className="col-lg-3 col-md-4 col-sm-4 col-12 py-2">
              <Select
                name="Dateselectmode"
                options={DateMethods}
                isSearchable={true}
                // defaultValue={DateMethods[0]}
                value={Dateselectmode}
                placeholder="Select"
                onChange={(e) => onDateModeChange(e)}
              />
            </div>
            {showdateSection && (
              <>
                <div className="col-lg-2 col-md-11 col-sm-10 col-10 py-2">
                  <input
                    type="date"
                    placeholder="dd/mm/yyyy"
                    className="form-control cpp-input datevalidation"
                    name="fromdate"
                    value={fromdate}
                    onChange={(e) => onDateChange(e)}
                    style={{
                      width: "110%",
                    }}
                    onKeyDown={(e) => {
                      e.preventDefault();
                    }}
                    required
                  />
                </div>
                <div className=" col-lg-2 col-md-11 col-sm-10 col-10 py-2">
                  <input
                    type="date"
                    placeholder="dd/mm/yyyy"
                    className="form-control cpp-input datevalidation"
                    name="todate"
                    value={todate}
                    onChange={(e) => onDateChange1(e)}
                    style={{
                      width: "110%",
                    }}
                    onKeyDown={(e) => {
                      e.preventDefault();
                    }}
                    required
                  />
                </div>
              </>
            )}
            {showdateSection1 && (
              <>
                <div className=" col-lg-3 col-md-11 col-sm-10 col-10 py-2">
                  <input
                    type="date"
                    placeholder="dd/mm/yyyy"
                    className="form-control cpp-input datevalidation"
                    name="singledate"
                    value={singledate}
                    onChange={(e) => onDateChange2(e)}
                    style={{
                      width: "100%",
                    }}
                    onKeyDown={(e) => {
                      e.preventDefault();
                    }}
                    required
                  />
                </div>
              </>
            )}
          </div>
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
                        <h3>Today's Lead Entry </h3>
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
                                    <td>{today.sctLeadEnteredByName}</td>
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
                          Demos Scheduled Today
                          {/* {allDemosAddedToday && allDemosAddedToday.length} */}
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
