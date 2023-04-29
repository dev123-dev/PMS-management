import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import {
  getAllSctCallCount1,
  getOverAllSummary,
  getAllFollowUp,
} from "../../actions/sct";
import Select from "react-select";
const SctDailyReport = ({
  auth: { isAuthenticated, user },
  sct: {
    sctCallsCount1,
    allFollowUp,
    allSummary,
    // allDemosTaken,
    // allDemosAddedToday,
    // allLeadEnteredToday,
  },
  getOverAllSummary,
  getAllFollowUp,
  getAllSctCallCount1,
}) => {
  // console.log("allFollowUp", allFollowUp);
  // console.log("sctCallsCount1", sctCallsCount1);

  ////////////////////////
  //let PipeLineData = [];
  // const [PipeLineData, setPipeLineData] = useState([]);
  //getAllSctCallCount1
  /////////////////

  const localAllSctCallCount1 = JSON.parse(
    localStorage.getItem("getAllSctCallCount1")
  );

  const localAllFollowUp = JSON.parse(localStorage.getItem("allfollowup"));

  let PipeLineData = [];
  const PotentialClient =
    localAllSctCallCount1 && localAllSctCallCount1.getAllSctCallsClient;

  const FollowUpClient =
    localAllFollowUp && localAllFollowUp.getAllSctCallsClient;
  let big;
  let small;

  // if (PotentialClient.length > FollowUpClient.length) {
    big = PotentialClient;
    small = FollowUpClient;
  } else {
    big = FollowUpClient;
    small = PotentialClient;
  }

  let res = [];
  let PotentialTot = [];

  let res1 = [];

  for (let i = 0; i < big.length; i++) {
    for (let j = 0; j < small.length; j++) {
      if (PotentialClient[i]._id === FollowUpClient[j]._id) {
        let tot =
          Number(PotentialClient[i].countClient) +
          Number(FollowUpClient[j].countClient);
        let sales =
          Number(PotentialClient[i].sctCallSalesValue) +
          Number(FollowUpClient[j].sctCallSalesValue);
        res.push({
          _id: PotentialClient[i]._id,
          sctCallFromName: PotentialClient[i].sctCallFromName,
          countClient: tot,
          sctCallSalesValue: sales,
        });
      }
    }
  }
  PotentialTot = PotentialClient.filter((objA) => {
    return !FollowUpClient.some((objB) => objA._id === objB._id);
  });

  PipeLineData = [...PotentialTot, ...res];

  // setPipeLineData([...PotentialTot, ...res]);

  useEffect(() => {
    getAllFollowUp();
  }, [getAllFollowUp]);

  useEffect(() => {
    getAllSctCallCount1();
  }, [getAllSctCallCount1]);

  useEffect(() => {
    getOverAllSummary();
  }, [getOverAllSummary]);

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
    const MonthYear = [
      { label: "January", value: 1 },
      { label: "Febrery", value: 2 },
      { label: "March", value: 3 },
      { label: "April", value: 4 },
      { label: "May", value: 5 },
      { label: "June", value: 6 },
      { label: "July", value: 7 },
      { label: "August", value: 8 },
      { label: "Septmber", value: 9 },
      { label: "October", value: 10 },
      { label: "November", value: 11 },
      { label: "December", value: 12 },
    ];
    let new_date = new Date(e.target.value);
    let month = new_date.getMonth() + 1;
    let year = new_date.getFullYear();

    let finaldata = MonthYear.filter((ele) => {
      if (ele.value === month) {
        return ele.label;
      }
    });
    let new_year = finaldata[0].label + "-" + year;
    console.log("new year", new_year);
    setsingledate(new_year);
    let finalData = {
      selDate: new_year,
      dateType: "Single Date",
      // folderId: projectData.folderId,
    };

    // setSelDateDataVal(selDateData);
    getAllSctCallCount1(finalData);
    getAllFollowUp(finalData);
    getOverAllSummary(finalData);
    // getDailyjobSheetFolder(selDateData);
  };

  const [fromdate, setfromdate] = useState("");
  const onDateChange = (e) => {
    const MonthYear = [
      { label: "January", value: 1 },
      { label: "Febrery", value: 2 },
      { label: "March", value: 3 },
      { label: "April", value: 4 },
      { label: "May", value: 5 },
      { label: "June", value: 6 },
      { label: "July", value: 7 },
      { label: "August", value: 8 },
      { label: "Septmber", value: 9 },
      { label: "October", value: 10 },
      { label: "November", value: 11 },
      { label: "December", value: 12 },
    ];
    let new_date = new Date(e.target.value);
    let month = new_date.getMonth() + 1;
    let year = new_date.getFullYear();
    let finaldata = MonthYear.filter((ele) => {
      if (ele.value === month) {
        return ele.label;
      }
    });
    let From_new_year = finaldata[0].label + "-" + year;
    setfromdate(From_new_year);
  };

  const [todate, settodate] = useState("");
  const onDateChange1 = (e) => {
    const MonthYear = [
      { label: "January", value: 1 },
      { label: "Febrery", value: 2 },
      { label: "March", value: 3 },
      { label: "April", value: 4 },
      { label: "May", value: 5 },
      { label: "June", value: 6 },
      { label: "July", value: 7 },
      { label: "August", value: 8 },
      { label: "Septmber", value: 9 },
      { label: "October", value: 10 },
      { label: "November", value: 11 },
      { label: "December", value: 12 },
    ];
    let new_date = new Date(e.target.value);
    let month = new_date.getMonth() + 1;
    let year = new_date.getFullYear();
    let finaldata = MonthYear.filter((ele) => {
      if (ele.value === month) {
        return ele.label;
      }
    });
    let To_new_year = finaldata[0].label + "-" + year;
    settodate(To_new_year);

    let finalData = {
      fromdate: fromdate,
      todate: e.target.value,
      dateType: "Multi Date",
      // folderId: projectData.folderId,
    };
    // setSelDateDataVal(selDateData);
    getAllSctCallCount1(finalData);
    getAllFollowUp(finalData);
    getOverAllSummary(finalData);
    // getDailyjobSheetFolder(selDateData);
  };

  // const alldemosentered = [];
  // allLeadEnteredToday &&
  //   allLeadEnteredToday.map((demos) =>
  //     alldemosentered.push({
  //       demosId: demos._id,
  //       label: demos.empFullName,
  //       value: demos.empFullName,
  //     })
  //   );
  let month = "";
  let count =
    allSummary &&
    allSummary.getAllSctCallsClient &&
    allSummary.getAllSctCallsClient.length;
  let salesv = 0;
  allSummary &&
    allSummary.getAllSctCallsClient &&
    allSummary.getAllSctCallsClient.filter((ele) => {
      month = ele.sctExpectedMonthYear;

      salesv += ele.sctCallSalesValue;
    });
  return !isAuthenticated || !user ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align">
        <div className="row col-lg-6 col-md-6 col-sm-12 col-12 no_padding">
          <div className="col-lg-11 col-md-11 col-sm-12 col-12">
            <h2 className="heading_color">CALL Report </h2>
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
                <div className="col-lg-3 col-md-11 col-sm-10 col-10 py-2">
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
                <div className=" col-lg-3 col-md-11 col-sm-10 col-10 py-2">
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
                        <h3>Potential Clients</h3>
                        <h3>
                          Clients :{" "}
                          {sctCallsCount1 &&
                            sctCallsCount1.getAllSctCallsClient &&
                            sctCallsCount1.getAllSctCallsClient.length}
                        </h3>
                        <h3>
                          Calls :{" "}
                          {sctCallsCount1 &&
                            sctCallsCount1.getAllSctCallsCount &&
                            sctCallsCount1.getAllSctCallsCount[0] &&
                            sctCallsCount1.getAllSctCallsCount[0].count}
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
                          {/* Today's Lead Entry :{" "}
                          {allLeadEnteredToday && allLeadEnteredToday.length} */}
                        </h3>
                      </center>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 col-12 py-2">
                    <div className="card card-content ">
                      <center>
                        <h3>DEMOS</h3>
                        {/* <h3>Demo Scheduled :{allDemos && allDemos.length}</h3> */}
                        <h3>
                          {/* Demo Taken : {allDemosTaken && allDemosTaken.length} */}
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
                          {/* Demos Scheduled Today :{" "}
                          {allDemosAddedToday && allDemosAddedToday.length} */}
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
                        <h3>Potential client</h3>
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
                              <th>Client</th>
                              <th>sales Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sctCallsCount1 &&
                              sctCallsCount1.getAllSctCallsClient &&
                              sctCallsCount1.getAllSctCallsClient.map(
                                (call, idx) => {
                                  return (
                                    <tr key={idx}>
                                      <td>{idx + 1}</td>
                                      <td>{call.sctCallFromName}</td>
                                      <td>{call.countClient}</td>
                                      <td>{call.sctCallSalesValue}</td>
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
                        <h3>Follow Up Client </h3>
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
                              <th>Client Count</th>
                              <th>Sales Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {allFollowUp &&
                              allFollowUp.getAllSctCallsClient &&
                              allFollowUp.getAllSctCallsClient.map(
                                (today, idx) => {
                                  return (
                                    <tr key={idx}>
                                      <td>{idx + 1}</td>
                                      <td>{today.sctCallFromName}</td>
                                      <td>{today.countClient}</td>
                                      <td>{today.sctCallSalesValue}</td>
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
                    <div className="card card-content ">
                      <center>
                        <h3>Pipe Line</h3>
                      </center>
                      <div style={{ padding: "0 15px 0 15px" }}>
                        <table
                          className="table table-bordered table-striped table-hover"
                          id="datatable2"
                        >
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Count</th>
                              <th>Total Sales</th>
                            </tr>
                          </thead>
                          <tbody>
                            {PipeLineData &&
                              PipeLineData.map((ele) => {
                                return (
                                  <tr>
                                    <td>{ele.sctCallFromName}</td>
                                    <td>{ele.countClient}</td>
                                    <td>{ele.sctCallSalesValue}</td>
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
                          Over All Summary
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
                              <th>Month</th>
                              <th>Count</th>
                              <th>Sales</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{month}</td>
                              <td>{count}</td>
                              <td>{salesv}</td>
                            </tr>
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
  getAllFollowUp,
  getAllSctCallCount1,
  getOverAllSummary,
})(SctDailyReport);
