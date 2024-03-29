import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import {
  getAllSctCall,
  getAllSctCallEmp,
  getAllSctCallClientCount,
} from "../../actions/sct";
import Select from "react-select";
const SctCallsHistory = ({
  auth: { isAuthenticated, user, users },
  sct: { allSctCalls, allSctCallsEmp, sctCallsClientCount },
  getAllSctCall,
  getAllSctCallEmp,
  getAllSctCallClientCount,
}) => {
  useEffect(() => {
    getAllSctCall();
  }, [getAllSctCall]);

  useEffect(() => {
    getAllSctCallEmp();
  }, [getAllSctCallEmp]);

  useEffect(() => {
    getAllSctCallClientCount();
  }, [getAllSctCallClientCount]);

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
  allSctCallsEmp &&
    allSctCallsEmp.map((emp) =>
      allemp.push({
        empId: emp._id,
        label: emp.sctCallFromName,
        value: emp.sctCallFromName,
      })
    );

  const [emp, getempData] = useState();
  const onempChange = (e) => {
    getempData(e);
    getAllSctCall({ selectedDate: fromdate, assignedTo: e.empId });
    getAllSctCallClientCount({ selectedDate: fromdate, assignedTo: e.empId });
  };

  const [fromdate, setfromdate] = useState(todayDateymd);
  const onDateChange = (e) => {
    setfromdate(e.target.value);
    getAllSctCall({ selectedDate: e.target.value });
    getAllSctCallEmp({ selectedDate: e.target.value });
    getAllSctCallClientCount({ selectedDate: e.target.value });
    getempData("");
  };

  const onClickReset = () => {
    getempData("");
    setfromdate(todayDateymd);
    getAllSctCall();
    getAllSctCallEmp();
    getAllSctCallClientCount();
  };
  return !isAuthenticated || !user ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className=" col-lg-2 col-md-11 col-sm-10 col-10">
              <h4 className="heading_color">Sct Calls </h4>
            </div>
            <div className="col-lg-1 col-md-4 col-sm-4 col-12 py-2">
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
            <div className=" col-lg-1 col-md-11 col-sm-10 col-10 py-2">
              {user.empCtAccess && user.empCtAccess === "All" ? (
                // <div className=" col-lg-4 col-md-11 col-sm-10 col-10 py-2">
                <Select
                  name="empFullName"
                  options={allemp}
                  isSearchable={true}
                  value={emp}
                  placeholder="Employee"
                  onChange={(e) => onempChange(e)}
                />
              ) : (
                // </div>
                <></>
              )}
            </div>
            <div className="col-lg-8 col-md-11 col-sm-12 col-11 py-2">
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
                      {allSctCalls &&
                        allSctCalls.map((allSctCalls, idx) => {
                          var sctCallDate = "";
                          if (allSctCalls.sctCallDate) {
                            var ED = allSctCalls.sctCallDate.split(/\D/g);
                            sctCallDate = [ED[2], ED[1], ED[0]].join("-");
                          }
                          var sctCallTakenDate = "";
                          if (allSctCalls.sctCallTakenDate) {
                            var ED1 = allSctCalls.sctCallTakenDate.split(/\D/g);
                            sctCallTakenDate = [ED1[2], ED1[1], ED1[0]].join(
                              "-"
                            );
                          }
                          return (
                            <tr key={idx}>
                              <td>{idx + 1}</td>
                              <td style={{ width: '8%' }}>{sctCallTakenDate}</td>
                              <td style={{ width: '8%' }}>{allSctCalls.sctCallDateTime.split(" ")[1]}</td>
                              <td style={{ width: '20%' }}>{allSctCalls.sctCallToName}</td>
                              <td style={{ width: '10%' }}>{allSctCalls.sctCallToStaffName}</td>
                              <td style={{ width: '7%' }}>{allSctCalls.sctcallToNumber}</td>
                              <td style={{ width: '5%' }}>{allSctCalls.sctCallComeFrom}</td>
                              <td style={{ width: '7%' }}>{allSctCalls.sctCallStatus}</td>
                              <td>{allSctCalls.sctCallNote}</td>
                              <td style={{ width: '8%' }}>{sctCallDate}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-md-6 col-sm-11 col-11 align_right">
                    <label>
                      No of Calls : {allSctCalls && allSctCalls.length}
                    </label>
                  </div>
                  <div className="col-lg-12 col-md-6 col-sm-11 col-11 align_right">
                    <label>
                      No of Clients :{" "}
                      {sctCallsClientCount && sctCallsClientCount.length}
                    </label>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

SctCallsHistory.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  sct: state.sct,
});

export default connect(mapStateToProps, {
  getAllSctCall,
  getAllSctCallEmp,
  getAllSctCallClientCount,
})(SctCallsHistory);
