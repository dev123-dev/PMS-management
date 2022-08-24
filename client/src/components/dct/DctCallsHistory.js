import React, { useState, Fragment, useEffect } from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { getAllDctClient } from "../../actions/dct";
import DeactiveDctClient from "./DeactiveDctClient";
import Select from "react-select";
const DctCallsHistory = ({
  auth: { isAuthenticated, user, users },
  dct: { allDctClients, allDctClientsDD },
  getAllDctClient,
}) => {
  useEffect(() => {
    getAllDctClient();
  }, [getAllDctClient]);

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
                        <th>Sl No.</th>
                        <th>Company Name</th>
                        <th>Client Name</th>
                        <th>Folder Name</th>
                        <th>Email</th>
                        <th>Contact 1 </th>
                        <th>Contact 2</th>
                        <th>Currency</th>
                        <th>Mode of Pay</th>
                        <th>Country</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allDctClients &&
                        allDctClients.map((allDctClients, idx) => {
                          return (
                            <tr key={idx}>
                              <td>{idx + 1}</td>
                              <td>{allDctClients.companyName}</td>
                              <td>{allDctClients.clientName}</td>

                              <td>{allDctClients.clientFolderName}</td>
                              <td>{allDctClients.emailId}</td>
                              <td>{allDctClients.phone1}</td>
                              <td>{allDctClients.phone2}</td>
                              <td>{allDctClients.clientCurrency}</td>
                              <td>{allDctClients.paymentModeName}</td>
                              <td>{allDctClients.countryName}</td>
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

export default connect(mapStateToProps, { getAllDctClient })(DctCallsHistory);
