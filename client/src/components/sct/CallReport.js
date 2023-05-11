import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import {
  getAllSctCallCount1,
  getAllFollowUp,
  getSummary,
} from "../../actions/sct";
import Select from "react-select";

const CallReport = ({
  auth: { isAuthenticated, user },
  sct: { sctCallsCount1, allFollowUp, onlySummary },
  getSummary,
  getAllFollowUp,
  getAllSctCallCount1,
}) => {
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

  if (PotentialClient.length >= FollowUpClient.length) {
    big = PotentialClient;
    small = FollowUpClient;
  } else {
    big = FollowUpClient;
    small = PotentialClient;
  }

  let res = [];

  if (PotentialClient.length > 0) {
    big.map((obj1) => {
      small.some((obj2) => {
        if (obj1._id === obj2._id) {
          res.push({
            ...obj1,
            countClient: obj1.countClient + obj2.countClient,
            sctCallSalesValue: obj1.sctCallSalesValue + obj2.sctCallSalesValue,
            sctExpectedMonthYear: obj1.sctExpectedMonthYear,
          });
        }
      });
    });
  }

  let resBigU = big.filter((obj1) => {
    return !small.some((obj2) => obj1._id === obj2._id);
  });
  let resSmallU = small.filter((obj1) => {
    return !big.some((obj2) => obj1._id === obj2._id);
  });

  PipeLineData = [...res, ...resBigU, ...resSmallU];

  let sumMonth = PipeLineData.filter(
    (ele, i) => ele.sctExpectedMonthYear && ele.sctExpectedMonthYear != ""
  );

  var totSales = 0;
  var totClient = 0;
  var sctExpectedMonthYear = "";
  PipeLineData.map((ele) => {
    totSales += ele.sctCallSalesValue;
    totClient += ele.countClient;
    sctExpectedMonthYear = ele.sctExpectedMonthYear;
  });

  // setPipeLineData([...PotentialTot, ...res]);

  let defaultStartDate = new Date().getFullYear() + "-" + "04" + "-" + "01";
  let defaultEndDate = new Date().getFullYear() + 1 + "-" + "03" + "-" + "31";
  let ClientFolderName = "";
  useEffect(() => {
    getAllFollowUp();
  }, [getAllFollowUp]);

  useEffect(() => {
    getAllSctCallCount1();
  }, [getAllSctCallCount1]);

  useEffect(() => {
    getSummary({ selDate: "", dateType: "Single Date" });
  }, []);

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
    setSelectedDate(e.target.value);
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
    setsingledate(new_year);
    let finalData = {
      selDate: e.target.value,
      dateType: "Single Date",
      // folderId: projectData.folderId,
    };

    // setSelDateDataVal(selDateData);
    getAllSctCallCount1(finalData);
    getAllFollowUp(finalData);
    getSummary(finalData);
  };

  const [fromdate, setfromdate] = useState("");
  const [FromDateValue, setFromDateValue] = useState("");

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
    setFromDateValue(e.target.value);
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
  const [ToDateValue, setToDateValue] = useState("");

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
    setToDateValue(e.target.value);
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
      fromdate: FromDateValue,
      todate: e.target.value,
      dateType: "Multi Date",
      // folderId: projectData.folderId,
    };
    // setSelDateDataVal(selDateData);
    getAllSctCallCount1(finalData);
    getAllFollowUp(finalData);
    getSummary(finalData);
  };

  return !isAuthenticated || !user ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align">
        <div className="row col-lg-6 col-md-6 col-sm-12 col-12 no_padding">
          <div className="col-lg-11 col-md-11 col-sm-12 col-12">
            <h2 className="heading_color">MIS Report </h2>
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
                    value={FromDateValue}
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
                    value={ToDateValue}
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
                    value={selectedDate}
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
                        <h3 className="callreport">Potential Clients</h3>
                        {/* <h3>
                          Clients :{" "}
                          {sctCallsCount1 &&
                            sctCallsCount1.getAllSctCallsClient &&
                            sctCallsCount1.getAllSctCallsClient.length}
                        </h3>
                        <h3>
                          Sales value :{" "}
                          {sctCallsCount1 &&
                            sctCallsCount1.getAllSctCallsClient[0] &&
                            sctCallsCount1.getAllSctCallsClient[0]
                              .sctCallSalesValue}
                        </h3> */}
                        <div style={{ padding: "0 15px 0 15px" }}>
                          <table
                            className="table table-bordered table-striped table-hover"
                            id="datatable2"
                          >
                            <thead>
                              <tr>
                                <th width="15px">No.</th>
                                <th>Name</th>
                                <th> No. of Clients</th>
                                <th>Sales Value</th>
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
                      </center>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 col-12 py-2">
                    <div
                      className="card card-content "
                      style={{ height: "100%" }}
                    >
                      <center>
                        <h3 className="callreport">Follow Up Clients</h3>
                        {/* <h3>
                          <h3>
                            Clients :{" "}
                            {allFollowUp &&
                              allFollowUp.getAllSctCallsClient &&
                              allFollowUp.getAllSctCallsClient.length}
                          </h3>
                          <h3>
                            Sales value :{" "}
                            {allFollowUp &&
                              allFollowUp.getAllSctCallsClient[0] &&
                              allFollowUp.getAllSctCallsClient[0]
                                .sctCallSalesValue}
                          </h3>
                        </h3> */}
                        <div style={{ padding: "0 15px 0 15px" }}>
                          <table
                            className="table table-bordered table-striped table-hover"
                            id="datatable2"
                          >
                            <thead>
                              <tr>
                                <th width="15px">No.</th>
                                <th>Name</th>
                                <th> No. of Clients </th>
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
                      </center>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12 col-12 py-2">
                    <div
                      className="card card-content "
                      style={{ height: "100%" }}
                    >
                      <center>
                        <h3 className="callreport">Pipeline Clients</h3>
                        {/* <h3 className="callreport">Pipeline Clients</h3>
                        <h3>Clients : {PipeLineData && PipeLineData.length}</h3>
                        <h3>
                          Sales value :{" "}
                          {PipeLineData &&
                            PipeLineData[0] &&
                            PipeLineData[0].sctCallSalesValue}
                        </h3> */}
                        <div style={{ padding: "0 15px 0 15px" }}>
                          <table
                            className="table table-bordered table-striped table-hover"
                            id="datatable2"
                          >
                            <thead>
                              <tr>
                                <th width="15px">No.</th>
                                <th>Name</th>
                                <th> Total Clients</th>
                                <th>Total Sales</th>
                              </tr>
                            </thead>
                            <tbody>
                              {PipeLineData &&
                                PipeLineData.map((ele, idx) => {
                                  return (
                                    <tr>
                                      <td>{idx + 1}</td>
                                      <td>{ele.sctCallFromName}</td>
                                      <td>{ele.countClient}</td>
                                      <td>{ele.sctCallSalesValue}</td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </table>
                        </div>
                      </center>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12 col-12 py-2">
                    <div
                      className="card card-content "
                      style={{ height: "100%" }}
                    >
                      <center>
                        <h3 className="callreport">
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
                              <th width="15px">No.</th>
                              <th>Month</th>
                              <th>Total Clients</th>
                              <th>Total Sales</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* <tr>
                              <td>{sctExpectedMonthYear}</td>
                              <td>{totClient}</td>
                              <td>{totSales}</td>
                            </tr> */}
                            {onlySummary &&
                              onlySummary.map((ele, idx) => {
                                return (
                                  <tr>
                                    <td>{idx + 1}</td>
                                    <td>{ele._id}</td>
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
                              <th>No. of Clients</th>
                              <th>Sales Value</th>
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
                              <th>No. of Clients </th>
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
                              <th width="15px">No.</th>
                              <th>Name</th>
                              <th>Total Clients</th>
                              <th>Total Sales</th>
                            </tr>
                          </thead>
                          <tbody>
                            {PipeLineData &&
                              PipeLineData.map((ele, idx) => {
                                return (
                                  <tr>
                                    <td>{idx + 1}</td>
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
                              <th width="15px">No.</th>
                              <th>Month</th>
                              <th>Total Clients</th>
                              <th>Total Sales</th>
                            </tr>
                          </thead>

                          <tbody>
                            {onlySummary &&
                              onlySummary.map((ele, idx) => {
                                return (
                                  <tr>
                                    <td>{idx + 1}</td>
                                    <td>{ele._id}</td>
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
                </div>
              </Fragment>
            </>
          )}
        </section>
      </div>
    </Fragment>
  );
};

CallReport.propTypes = {
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
  getSummary,
})(CallReport);
