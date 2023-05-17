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
  let PipeLineData = [];
  try {
    const localAllSctCallCount1 = JSON.parse(
      localStorage.getItem("getAllSctCallCount1")
    );
    const localAllFollowUp = JSON.parse(localStorage.getItem("allfollowup"));

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
              countClient: Number(obj1.countClient) + Number(obj2.countClient),
              sctCallSalesValue:
                obj1.sctCallSalesValue + obj2.sctCallSalesValue,
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
  } catch (err) {
    console.log(err);
  }

  useEffect(() => {
    getAllFollowUp({
      fromdate: new Date().toISOString().split("T")[0],
      todate: new Date().toISOString().split("T")[0],
    });
  }, [getAllFollowUp]);

  useEffect(() => {
    getAllSctCallCount1({
      fromdate: new Date().toISOString().split("T")[0],
      todate: new Date().toISOString().split("T")[0],
    });
  }, [getAllSctCallCount1]);

  useEffect(() => {
    getSummary({
      fromdate: new Date().toISOString().split("T")[0],
      todate: new Date().toISOString().split("T")[0],
    });
  }, [getSummary]);

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
      setFromDateValue("");
      setToDateValue("");
      setSelectedDate("");
    } else {
      setShowHide({
        ...showHide,
        showdateSection: false,
        showdateSection1: true,
      });
      setSelectedDate(new Date().toISOString().split("T")[0]);
      getAllFollowUp({
        fromdate: new Date().toISOString().split("T")[0],
        todate: new Date().toISOString().split("T")[0],
      });
      getAllSctCallCount1({
        fromdate: new Date().toISOString().split("T")[0],
        todate: new Date().toISOString().split("T")[0],
      });
      getSummary({
        fromdate: new Date().toISOString().split("T")[0],
        todate: new Date().toISOString().split("T")[0],
      });
    }
  };

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  //Single date normal
  const onDateChange2 = (e) => {
    setSelectedDate(e.target.value);

    getAllSctCallCount1({
      fromdate: e.target.value,
      todate: e.target.value,
    }); //Potential Record;
    getAllFollowUp({
      fromdate: e.target.value,
      todate: e.target.value,
    }); //Followup Record;
    getSummary({
      fromdate: e.target.value,
      todate: e.target.value,
    }); //Overall Record;
  };

  // const [fromdate, setfromdate] = useState("");
  const [FromDateValue, setFromDateValue] = useState("");

  //From date Multi Date
  const onDateChange = (e) => {
    setFromDateValue(e.target.value);
  };

  const [ToDateValue, setToDateValue] = useState("");

  //To date Multi Date
  const onDateChange1 = (e) => {
    setToDateValue(e.target.value);
    getAllSctCallCount1({
      fromdate: FromDateValue,
      todate: e.target.value,
    });
    getAllFollowUp({
      fromdate: FromDateValue,
      todate: e.target.value,
    });
    getSummary({
      fromdate: FromDateValue,
      todate: e.target.value,
    });
  };

  return !isAuthenticated || !user ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align">
        <div className="row col-lg-12 col-md-6 col-sm-12 col-12 no_padding">
          <div className="col-lg-2 col-md-11 col-sm-12 col-12">
            <h3 className="heading_color">MIS Report </h3>
          </div>

          <div className="row col-lg-6 col-md-6 col-sm-12 col-12 no_padding">
            <div className="col-lg-3 col-md-4 col-sm-4 col-12 py-4">
              <Select
                name="Dateselectmode"
                options={DateMethods}
                isSearchable={true}
                value={Dateselectmode}
                placeholder="Select"
                onChange={(e) => onDateModeChange(e)}
              />
            </div>
            {showdateSection && (
              <>
                <div className="col-lg-3 col-md-11 col-sm-10 col-10 py-4">
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

                  {/* <DatePicker
                    label="Controlled picker"
                    value={FromDateValue}
                    className="form-control"
                    placeholderText="dd-mm-yyyy"
                    onChange={(e) => onDateChange(e)}
                  /> */}
                </div>
                <div className=" col-lg-3 col-md-11 col-sm-10 col-10 py-4">
                  <input
                    type="date"
                    placeholder="dd/mm/yyyy"
                    value={ToDateValue}
                    className="form-control cpp-input datevalidation"
                    onChange={(e) => onDateChange1(e)}
                    name="todate"
                    style={{
                      width: "110%",
                    }}
                    onKeyDown={(e) => {
                      e.preventDefault();
                    }}
                  />
                  {/* <DatePicker
                    label="Controlled picker"
                    value={ToDateValue}
                    className="form-control"
                    placeholderText="dd-mm-yyyy"
                    onChange={(e) => onDateChange1(e)}
                    required
                  /> */}
                </div>
              </>
            )}
            {showdateSection1 && (
              <>
                <div className=" col-lg-3 col-md-11 col-sm-10 col-10 py-4">
                  <input
                    type="date"
                    placeholder="dd/mm/yyyy"
                    value={selectedDate}
                    className="form-control cpp-input datevalidation"
                    name="singledate"
                    style={{
                      width: "100%",
                    }}
                    onChange={(e) => onDateChange2(e)}
                    onKeyDown={(e) => {
                      e.preventDefault();
                    }}
                    required
                  />

                  {/* <DatePicker
                    label="Controlled picker"
                    value={selectedDate}
                    className="form-control"
                    placeholderText="dd-mm-yyyy"
                    onChange={(e) => onDateChange2(e)}
                    required
                  /> */}
                </div>
              </>
            )}
          </div>
        </div>
        <section className="sub_reg">
          <Fragment>
            <div className="row col-lg-12 col-md-11 col-sm-12 col-12 py-5">
              <div className="col-lg-6 col-md-6 col-sm-12 col-12 py-2">
                <div className="card card-content ">
                  <center>
                    <h3>Potential Clients</h3>
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
                <div className="card card-content " style={{ height: "100%" }}>
                  <center>
                    <h3>Follow-up Clients </h3>
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
                          <th>No. of Clients </th>
                          <th>Sales Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allFollowUp &&
                          allFollowUp.getAllSctCallsClient &&
                          allFollowUp.getAllSctCallsClient.map((today, idx) => {
                            return (
                              <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>{today.sctCallFromName}</td>
                                <td>{today.countClient}</td>
                                <td>{today.sctCallSalesValue}</td>
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
                    <h3>Pipeline Clients</h3>
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
                <div className="card card-content " style={{ height: "100%" }}>
                  <center>
                    <h3>Overall Summary</h3>
                  </center>
                  <div style={{ padding: "0 15px 0 15px" }}>
                    <table
                      className="table table-bordered table-striped table-hover"
                      id="datatable2"
                    >
                      <thead>
                        <tr>
                          <th width="15px">No.</th>
                          <th>Month-Year</th>
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
