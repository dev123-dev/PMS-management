import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getAllDctCall, getAllDctCallEmp } from "../../actions/dct";
import Select from "react-select";
const DctCallsHistory = ({
  auth: { isAuthenticated, user },
  dct: { allDctCalls, allDctCallsEmp, allDctCallsClientCount },
  getAllDctCall,
  getAllDctCallEmp,
}) => {
  useEffect(() => {
    getAllDctCall();
  }, [getAllDctCall]);
  useEffect(() => {
    getAllDctCallEmp();
  }, [getAllDctCallEmp]);

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

  const allemp = [{ empId: null, label: "All", value: null }];
  allDctCallsEmp &&
    allDctCallsEmp.map((emp) =>
      allemp.push({
        empId: emp._id,
        label: emp.callFromName,
        value: emp.callFromName,
      })
    );

  const [emp, getempData] = useState();
  const onempChange = (e) => {
    getempData(e);
    getAllDctCall({ selectedDate: fromdate, assignedTo: e.empId });
  };

  const [fromdate, setfromdate] = useState(todayDateymd);
  const onDateChange = (e) => {
    setfromdate(e.target.value);
    getAllDctCall({ selectedDate: e.target.value });
    getAllDctCallEmp({ selectedDate: e.target.value });
    getempData("");
  };

  const onClickReset = () => {
    getempData("");
    setfromdate(todayDateymd);
    getAllDctCall();
    getAllDctCallEmp();
  };
  return !isAuthenticated || !user ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className=" col-lg-2 col-md-11 col-sm-10 col-10">
              <h4 className="heading_color">DCT Calls </h4>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-4 col-12 py-2">
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
            <div className=" col-lg-2 col-md-11 col-sm-10 col-10 py-2">
              {user.empCtAccess && user.empCtAccess === "All" ? (
                <Select
                  name="empFullName"
                  options={allemp}
                  isSearchable={true}
                  value={emp}
                  placeholder="Select Employee"
                  onChange={(e) => onempChange(e)}
                />
              ) : (
                // </div>
                <></>
              )}
            </div>
            <div className="col-lg-6 col-md-11 col-sm-12 col-11 py-2">
              <button
                className="btn btn_green_bg float-right"
                onClick={() => onClickReset()}
              >
                Refresh
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12 text-center">
              <section className="body">
                <div className=" body-inner no-padding table-responsive fixTableHead">
                  <table
                    className="table table-bordered table-striped table-hover"
                    id="datatable2"
                  >
                    <thead>
                      <tr>
                        <th>SNo</th>
                        <th>Call Taken Date</th>
                        <th>Call Taken Time</th>
                        <th>Company Name</th>
                        <th>Call To</th>
                        <th>Called Number</th>
                        <th>Call From</th>
                        <th>Called Status</th>
                        <th>Notes</th>
                        <th>Next Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allDctCalls &&
                        allDctCalls.map((allDctCalls, idx) => {
                          var callDates = "";
                          if (allDctCalls.callDate) {
                            var ED = allDctCalls.callDate.split(/\D/g);
                            callDates = [ED[2], ED[1], ED[0]].join("-");
                          }
                          var calltakenDate = "";
                          if (allDctCalls.callTakenDate) {
                            var ED1 = allDctCalls.callTakenDate.split(/\D/g);
                            calltakenDate = [ED1[2], ED1[1], ED1[0]].join("-");
                          }
                          return (
                            <tr key={idx}>
                              <td>{idx + 1}</td>
                              <td style={{ width: '8%' }}>{calltakenDate}</td>
                              <td style={{ width: '8%' }}>{allDctCalls.callEnteredDateTime.split(" ")[1]}</td>
                              <td style={{ width: '20%' }}>{allDctCalls.callToName}</td>
                              <td style={{ width: '10%' }}>{allDctCalls.callToStaffName}</td>
                              <td style={{ width: '7%' }}>{allDctCalls.callToNumber}</td>
                              <td style={{ width: '5%' }}>{allDctCalls.callComeFrom}</td>
                              <td style={{ width: '7%' }}>{allDctCalls.callStatus}</td>
                              <td>{allDctCalls.callNote}</td>
                              <td style={{ width: '8%' }}>{callDates}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-md-6 col-sm-11 col-11 align_right">
                    <label>
                      No of Calls : {allDctCalls && allDctCalls.length}
                    </label>
                  </div>
                  <div className="col-lg-12 col-md-6 col-sm-11 col-11 align_right">
                    <label>
                      No of Clients : {allDctCallsClientCount && allDctCallsClientCount.length}
                      { }
                    </label>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <div className="row col-md-12 col-lg-12 col-sm-12 col-12  ">
            <div className="col-lg-10 col-md-6 col-sm-6 col-12"></div>
            <div className="col-lg-2 col-md-6 col-sm-6 col-12 align_right">
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

DctCallsHistory.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  dct: state.dct,
});

export default connect(mapStateToProps, { getAllDctCall, getAllDctCallEmp })(
  DctCallsHistory
);
