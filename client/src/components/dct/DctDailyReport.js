import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getAllDctCallCount, getAllDctLeadToday } from "../../actions/dct";
import Select from "react-select";
const DctDailyReport = ({
  auth: { isAuthenticated, user, users },
  dct: { dctCallsSalesEmpCount, allDctLeadEnteredToday },
  getAllDctCallCount,
  getAllDctLeadToday,
}) => {
  let finalData = { fromDate: new Date().toISOString().split("T")[0], toDate: new Date().toISOString().split("T")[0] };
  useEffect(() => {
    setSingleDate(new Date().toISOString().split("T")[0]);
    getAllDctCallCount(finalData);
    getAllDctLeadToday(finalData);
  }, []);

  const DateMethods = [
    { value: "Single Date", label: "Single Date" },
    { value: "Multi Date", label: "Multi Date" },
  ];

  const [showDateFields, setShowDateFields] = useState({
    showSingleDate: true,
    showMultiDate: false
  });
  const { showSingleDate, showMultiDate } = showDateFields;

  const [dateSelectedFormat, setDateSelectedFormat] = useState(DateMethods[0]);
  const onDateModeChange = (e) => {
    if (e)
      setDateSelectedFormat(e);

    if (e.value === "Single Date") {
      setShowDateFields({
        ...showDateFields,
        showSingleDate: true,
        showMultiDate: false
      });
    } else {
      setShowDateFields({
        ...showDateFields,
        showSingleDate: false,
        showMultiDate: true
      })
    }
  }

  const [fromDate, setFromDate] = useState("");
  const onMultiFromDateChange = (e) => {
    setFromDate(e.target.value);
  }

  const [toDate, setToDate] = useState("");
  const onMultiToDateChange = (e) => {
    setToDate(e.target.value);

    finalData = {
      fromDate,
      toDate: e.target.value
    }

    getAllDctCallCount(finalData);
    getAllDctLeadToday(finalData);
  }

  const [singleDate, setSingleDate] = useState("");
  const onSingleDateChange = (e) => {
    setSingleDate(e.target.value);

    finalData = {
      fromDate: e.target.value,
      toDate: e.target.value
    }

    getAllDctCallCount(finalData);
    getAllDctLeadToday(finalData);
  }

  return !isAuthenticated || !user ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align">
        <div className="row col-lg-12 col-md-6 col-sm-12 col-12 no_padding">
          <div className="col-lg-2 col-md-11 col-sm-12 col-12">
            <h3 className="heading_color">Dct Daily Report </h3>
          </div>
          <div className="row col-lg-6 col-md-6 col-sm-12 col-12 no_padding">
            <div className="col-lg-3 col-md-4 col-sm-4 col-12 py-4">
              <Select
                name="SelectDateMode"
                options={DateMethods}
                isSearchable={true}
                value={dateSelectedFormat}
                placeholder="Select"
                onChange={(e) => onDateModeChange(e)}
              />
            </div>

            {showMultiDate && (
              <>
                <div className="col-lg-3 col-md-11 col-sm-10 col-10 py-4">
                  <input
                    type="date"
                    placeholder="dd/mm/yyyy"
                    className="form-control cpp-input datevalidation"
                    name="fromDate"
                    value={fromDate}
                    onChange={(e) => onMultiFromDateChange(e)}
                    style={{
                      width: "110%",
                    }}
                    onKeyDown={(e) => {
                      e.preventDefault();
                    }}
                  />
                </div>
                <div className=" col-lg-3 col-md-11 col-sm-10 col-10 py-4">
                  <input
                    type="date"
                    placeholder="dd/mm/yyyy"
                    className="form-control cpp-input datevalidation"
                    name="toDate"
                    value={toDate}
                    onChange={(e) => onMultiToDateChange(e)}
                    style={{
                      width: "110%",
                    }}
                    onKeyDown={(e) => {
                      e.preventDefault();
                    }}
                  />
                </div>
              </>
            )}
            {showSingleDate && (
              <>
                <div className=" col-lg-3 col-md-11 col-sm-10 col-10 py-4">
                  <input
                    type="date"
                    placeholder="dd/mm/yyyy"
                    className="form-control cpp-input datevalidation"
                    name="singleDate"
                    value={singleDate}
                    onChange={(e) => onSingleDateChange(e)}
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
          <Fragment>
            <div className="row col-lg-12 col-md-11 col-sm-12 col-12 py-5">
              <div className="col-lg-6 col-md-6 col-sm-12 col-12 py-2">
                <div className="card card-content ">
                  <center>
                    <h3>DCT CALLS</h3>
                  </center>
                  <div style={{ padding: "0 15px 0 15px" }}>
                    <table
                      className="table table-bordered table-striped table-hover"
                      id="datatable2"
                    >
                      <thead>
                        <tr>
                          <th width="15px">SNo</th>
                          <th>Name</th>
                          <th style={{ width: '7%' }}>P</th>
                          <th style={{ width: '7%' }}>F</th>
                          <th style={{ width: '7%' }}>TC</th>
                          <th style={{ width: '7%' }}>RC</th>
                          <th style={{ width: '7%' }}>IC</th>
                          <th style={{ width: '7%' }}>UW</th>
                          <th style={{ width: '7%' }}>SW</th>
                          <th style={{ width: '7%' }}>W</th>
                          <th>Total Calls</th>
                          <th>Clients Called</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dctCallsSalesEmpCount &&
                          dctCallsSalesEmpCount.map((callData, idx) => {
                            return (
                              <tr key={idx}>
                                <td align="center">{idx + 1}</td>
                                <td>{callData.callFromName}</td>
                                <td align="center">{callData.categories && callData.categories.length !== 0 ? callData.categories.find(category => category.callCategory === "P") ? callData.categories.find(category => category.callCategory === "P").totalCalls : "0" : "0"}</td>
                                <td align="center">{callData.categories && callData.categories.length !== 0 ? callData.categories.find(category => category.callCategory === "F") ? callData.categories.find(category => category.callCategory === "F").totalCalls : "0" : "0"}</td>
                                <td align="center">{callData.categories && callData.categories.length !== 0 ? callData.categories.find(category => category.callCategory === "TC") ? callData.categories.find(category => category.callCategory === "TC").totalCalls : "0" : "0"}</td>
                                <td align="center">{callData.categories && callData.categories.length !== 0 ? callData.categories.find(category => category.callCategory === "RC") ? callData.categories.find(category => category.callCategory === "RC").totalCalls : "0" : "0"}</td>
                                <td align="center">{callData.categories && callData.categories.length !== 0 ? callData.categories.find(category => category.callCategory === "IC") ? callData.categories.find(category => category.callCategory === "IC").totalCalls : "0" : "0"}</td>
                                <td align="center">{callData.categories && callData.categories.length !== 0 ? callData.categories.find(category => category.callCategory === "UW") ? callData.categories.find(category => category.callCategory === "UW").totalCalls : "0" : "0"}</td>
                                <td align="center">{callData.categories && callData.categories.length !== 0 ? callData.categories.find(category => category.callCategory === "SW") ? callData.categories.find(category => category.callCategory === "SW").totalCalls : "0" : "0"}</td>
                                <td align="center">{callData.categories && callData.categories.length !== 0 ? callData.categories.find(category => category.callCategory === "W") ? callData.categories.find(category => category.callCategory === "W").totalCalls : "0" : "0"}</td>
                                <td align="center">{callData.totalCallsTogether}</td>
                                <td align="center">{callData.totalClientCalls}</td>
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
                                <td align="center">{idx + 1}</td>
                                <td>{lead.dctLeadEnteredByName}</td>
                                <td align="center">{lead.count}</td>
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
    </Fragment >
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
