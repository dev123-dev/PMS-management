import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { getReportClients } from "../../actions/client";
import { getClientsReport } from "../../actions/projects";
const ClientReport = ({
  auth: { isAuthenticated, user, users },
  client: { activeReportClients },
  project: { clientsReportData },
  getReportClients,
  getClientsReport,
}) => {
  useEffect(() => {
    getReportClients();
    getClientsReport();
  }, [getReportClients, getClientsReport]);

  const clientTypeVal = [
    { value: "Regular", label: "Regular Client" },
    { value: "Test", label: "Test Client" },
  ];

  var clientDiffrence = "";
  if (clientsReportData.length !== activeReportClients.length) {
    clientDiffrence = activeReportClients.filter(
      (allClients) =>
        !clientsReportData.some(({ clientId }) => clientId === allClients._id)
    );
  }

  const onClickReset = () => {
    getReportClients();
    getClientsReport();
    setclientType("");
    setClientData("");
    setMonthStartDate(new Date());
  };

  const [clientType, setclientType] = useState();
  const onClientTypeChange = (e) => {
    if (e) {
      setclientType(e);
      let finalData = {
        clientType: e.value,
      };
      getReportClients(finalData);
      getClientsReport(finalData);
    }
  };

  const activeClientsOpt = [];
  activeReportClients.map((clientsData) =>
    activeClientsOpt.push({
      clientId: clientsData._id,
      label: clientsData.clientName,
      value: clientsData.clientName,
    })
  );

  const [clientData, setClientData] = useState("");
  const [clientFilter, setClientFilter] = useState(false);
  const onClientChange = (e) => {
    if (e) {
      setClientData(e);
      let finalData = {
        clientId: e.clientId,
      };
      getClientsReport(finalData);
    }
    setClientFilter(true);
  };

  const [startMonthDate, setMonthStartDate] = useState(new Date());
  const yearChange = (dt) => {
    var getYear = new Date(dt).getFullYear();
    setMonthStartDate(dt);
    const finalData = {
      selectedY: getYear,
    };
    getClientsReport(finalData);
    setClientFilter(false);
  };

  let idVal = 0;
  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className="row col-lg-1 col-md-11 col-sm-10 col-10">
              <h5 className="heading_color">Client Report</h5>
            </div>

            <div className="col-lg-2 col-md-11 col-sm-10 col-10 py-2 ">
              <DatePicker
                className="form-control yearpicker"
                placeholder="yyyy"
                onChange={(date) => yearChange(date)}
                dateFormat="yyyy"
                selected={startMonthDate}
                style={{ textAlign: "center" }}
                showYearPicker
              />
            </div>
            <div className="col-lg-2 col-md-11 col-sm-10 col-10 py-2 ">
              <Select
                name="clientType"
                isSearchable={true}
                options={clientTypeVal}
                value={clientType}
                placeholder="Client Type"
                onChange={(e) => onClientTypeChange(e)}
              />
            </div>
            <div className="col-lg-2 col-md-11 col-sm-10 col-10 py-2 ">
              <Select
                name="clientData"
                isSearchable={true}
                value={clientData}
                options={activeClientsOpt}
                placeholder="Select"
                onChange={(e) => onClientChange(e)}
              />
            </div>
            <div className="col-lg-5 col-md-11 col-sm-12 col-11 py-3">
              {/* <button
                className="btn btn_green_bg float-right"
                onClick={() => onClickReset()}
              >
                Export
              </button> */}
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
                        <th>Sl No.</th>
                        <th>Client</th>
                        <th>Jan</th>
                        <th>Feb</th>
                        <th>Mar</th>
                        <th>Apr</th>
                        <th>May</th>
                        <th>Jun</th>
                        <th>Jul</th>
                        <th>Aug</th>
                        <th>Sep</th>
                        <th>Oct</th>
                        <th>Nov</th>
                        <th>Dec</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clientsReportData &&
                        clientsReportData.map((clientReport, idx) => {
                          let data = clientReport.data;
                          idVal++;
                          return (
                            <tr key={idx}>
                              <td>{idVal}</td>
                              <td>{clientReport.clientName}</td>
                              <td>{data["m1"]}</td>
                              <td>{data["m2"]}</td>
                              <td>{data["m3"]}</td>
                              <td>{data["m4"]}</td>
                              <td>{data["m5"]}</td>
                              <td>{data["m6"]}</td>
                              <td>{data["m7"]}</td>
                              <td>{data["m8"]}</td>
                              <td>{data["m9"]}</td>
                              <td>{data["m10"]}</td>
                              <td>{data["m11"]}</td>
                              <td>{data["m12"]}</td>
                              <td>
                                {Object.values(data).reduce((a, b) => a + b, 0)}
                              </td>
                            </tr>
                          );
                        })}

                      {!clientFilter &&
                        clientDiffrence &&
                        clientDiffrence.map((clientDiff, idx) => {
                          idVal++;
                          return (
                            <tr key={idx}>
                              <td>{idVal}</td>
                              <td>{clientDiff.clientName}</td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

ClientReport.propTypes = {
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  settings: state.settings,
  client: state.client,
  project: state.project,
});

export default connect(mapStateToProps, {
  getReportClients,
  getClientsReport,
})(ClientReport);
