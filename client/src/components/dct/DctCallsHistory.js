import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getAllDctCall, getAllDctCallEmp } from "../../actions/dct";
import Select from "react-select";
const DctCallsHistory = ({
  auth: { isAuthenticated, user, users },
  dct: { allDctCalls, allDctCallsEmp },
  getAllDctCall,
  getAllDctCallEmp,
}) => {
  useEffect(() => {
    getAllDctCall();
  }, [getAllDctCall]);
  useEffect(() => {
    getAllDctCallEmp();
  }, [getAllDctCallEmp]);
  console.log(allDctCalls, "allDctCalls");
  console.log(allDctCallsEmp, "allDctCallsEmp");

  // const allemp = [{ empId: null, label: "All", value: null }];
  // marketingEmployees.map((emp) =>
  //   allemp.push({
  //     empId: emp._id,
  //     label: emp.empFullName,
  //     value: emp.empFullName,
  //   })
  // );

  const [emp, getempData] = useState();
  const [empId, setempID] = useState();
  const onempChange = (e) => {
    // getempData(e);
    // setempID(e.empId);
    // getDctClientDetails({
    //   countryId: countryId,
    //   clientsId: clients ? clients.clientsId : null,
    //   assignedTo: e.empId,
    //   dctClientCategory: "RC",
    // });
    // getDctClientDetailsDD({
    //   countryId: countryId,
    //   clientsId: clients ? clients.clientsId : null,
    //   assignedTo: e.empId,
    //   dctClientCategory: "RC",
    // });
    // setFilterData({
    //   countryId: countryId,
    //   clientsId: clients ? clients.clientsId : null,
    //   assignedTo: e.empId,
    //   dctClientCategory: "RC",
    // });
  };

  const [fromdate, setfromdate] = useState("");
  const onDateChange = (e) => {
    setfromdate(e.target.value);
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className=" col-lg-2 col-md-11 col-sm-10 col-10">
              <h5 className="heading_color">DCT Calls </h5>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-4 col-12 py-2">
              {/* SLAP UserGroupRights */}

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
              <Select
                name="empFullName"
                //options={allemp}
                isSearchable={true}
                //value={emp}
                placeholder="Select Emp"
                //  onChange={(e) => onempChange(e)}
              />
            </div>
            <div className="col-lg-6 col-md-11 col-sm-12 col-11 py-3">
              <button
                className="btn btn_green_bg float-right"
                // onClick={() => onClickReset()}
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
                        <th style={{ width: "15%" }}>Company Name</th>
                        <th style={{ width: "15%" }}>Call To</th>
                        <th style={{ width: "25%" }}>Notes</th>
                        <th style={{ width: "6%" }}>Call Date</th>
                        <th style={{ width: "8%" }}>Call Taken Date</th>
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
                              <td>{allDctCalls.callToName}</td>
                              <td>{allDctCalls.callToStaffName}</td>
                              <td>{allDctCalls.callNote}</td>
                              <td>{callDates}</td>
                              <td>{calltakenDate}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>

          <div className="row col-md-12 col-lg-12 col-sm-12 col-12  ">
            <div className="col-lg-10 col-md-6 col-sm-6 col-12"></div>
            <div className="col-lg-2 col-md-6 col-sm-6 col-12 align_right">
              {/* <strong> No of Clients:{allClient.length}</strong> */}
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
