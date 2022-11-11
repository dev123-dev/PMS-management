import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getAllSctCall, getAllSctCallEmp } from "../../actions/sct";
import Select from "react-select";
const SctCallsHistory = ({
  auth: { isAuthenticated, user, users },
  sct: { allSctCalls, allSctCallsEmp },
  getAllSctCall,
  getAllSctCallEmp,
}) => {
  useEffect(() => {
    getAllSctCall();
  }, [getAllSctCall]);

  useEffect(() => {
    getAllSctCallEmp();
  }, [getAllSctCallEmp]);

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
  };

  const [fromdate, setfromdate] = useState(todayDateymd);
  const onDateChange = (e) => {
    setfromdate(e.target.value);
    getAllSctCall({ selectedDate: e.target.value });
    getAllSctCallEmp({ selectedDate: e.target.value });
    getempData("");
  };

  const onClickReset = () => {
    getempData("");
    setfromdate(todayDateymd);
    getAllSctCall();
    getAllSctCallEmp();
  };
  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className=" col-lg-2 col-md-11 col-sm-10 col-10">
              <h5 className="heading_color">Sct Calls </h5>
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
                // <div className=" col-lg-4 col-md-11 col-sm-10 col-10 py-2">
                <Select
                  name="empFullName"
                  options={allemp}
                  isSearchable={true}
                  value={emp}
                  placeholder="Select Emp"
                  onChange={(e) => onempChange(e)}
                />
              ) : (
                // </div>
                <></>
              )}
            </div>
            <div className="col-lg-6 col-md-11 col-sm-12 col-11 py-3">
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
                        <th style={{ width: "4%" }}>Sl No.</th>
                        <th style={{ width: "8%" }}>Call Taken Date</th>
                        <th style={{ width: "8%" }}>Call Taken Time</th>
                        <th style={{ width: "15%" }}>Company Name</th>
                        <th style={{ width: "15%" }}>Call To</th>
                        <th style={{ width: "25%" }}>Notes</th>
                        <th style={{ width: "6%" }}>Next Date</th>
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
                              <td>{sctCallTakenDate}</td>
                              <td>
                                {allSctCalls.sctCallDateTime.split(" ")[1]}
                              </td>
                              <td>{allSctCalls.sctCallToName}</td>
                              <td>{allSctCalls.sctCallToStaffName}</td>
                              <td>{allSctCalls.sctCallNote}</td>
                              <td>{sctCallDate}</td>
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
})(SctCallsHistory);
