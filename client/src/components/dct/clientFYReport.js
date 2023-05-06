import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";

import {
  getverificationProjectDeatils,
  getAllProjectStatusVerification,
  getAllFolder,
  getSelectedClientfolderDeatils,
} from "../../actions/projects";
import { getVerificationFolder } from "../../actions/client";
import { getClientDetails } from "../../actions/sct";
import { getAllchanges, getUpdatedProjectStaus } from "../../actions/projects";
import { w3cwebsocket } from "websocket";

//client in websocket
//SLAP IP
const client = new w3cwebsocket("ws://192.168.6.38:8000");

const ClientFYReport = ({
  auth: { isAuthenticated, user, users },
  project: { allFolderName },
  sct: { FyClientMonthWiseReport },
  client: { activeVerfificationFolders },

  getverificationProjectDeatils,
  getAllProjectStatusVerification,
  getUpdatedProjectStaus,
  getAllFolder,
  getClientDetails,
  getVerificationFolder,
  getSelectedClientfolderDeatils,
}) => {
  useEffect(() => {
    client.onopen = () => {
      console.log("webSocket client connected");
    };

    client.onmessage = (message) => {
      getUpdatedProjectStaus();
    };
  }, []);
  useEffect(() => {
    getAllFolder();
  }, [getAllFolder]);
  useEffect(() => {
    getverificationProjectDeatils();
  }, [getverificationProjectDeatils]);
  useEffect(() => {
    getAllProjectStatusVerification();
  }, [getAllProjectStatusVerification]);
  useEffect(() => {
    getVerificationFolder();
  }, [getVerificationFolder]);
  // useEffect(() => {
  //   getVerificationClients();
  // }, [getVerificationClients]);
  useEffect(() => {
    getSelectedClientfolderDeatils({
      clientFolderName: allFolderName && allFolderName.clientFolderName,
    });
  }, [getSelectedClientfolderDeatils]);

  const onfolderClientChange = (e) => {
    setClientData1(e);
    // let selDateData = {
    //   folder: e.value,
    //   statusId: projectStatusData.value,
    //   dateVal: singledate,
    // };
  };

  const onClickReset = () => {
    setClientData1("");
  };

  const [clientData, setClientData1] = useState("");

  const activeClientsOpt = [];
  allFolderName &&
    allFolderName.map((clientsData) =>
      activeClientsOpt.push({
        label: clientsData._id,
        value: clientsData._id,
      })
    );

  const MonthYear = [
    { label: "Jan", value: 1 },
    { label: "Feb", value: 2 },
    { label: "Mar", value: 3 },
    { label: "Apr", value: 4 },
    { label: "May", value: 5 },
    { label: "Jun", value: 6 },
    { label: "Jul", value: 7 },
    { label: "Aug", value: 8 },
    { label: "Sep", value: 9 },
    { label: "Oct", value: 10 },
    { label: "Nov", value: 11 },
    { label: "Dec", value: 12 },
  ];

  const handleGoToAllMember = (clientmonth) => {
    let MonthWiseData = clientmonth._id;
    let date = new Date();
    var fDay = new Date(date.getFullYear(), date.getMonth() + 1);
    let data = MonthWiseData.split("-");
    let year = data[1];
    let month = data[0];
    const MonthValue = MonthYear.filter((ele) => {
      if (ele.label === month) {
        return ele.value;
      }
    });
    var lDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let firstDay = fDay.getDate();
    let lastDay = lDay.getDate();

    if (MonthValue[0].value < 10) {
      MonthValue[0].value = "0" + MonthValue[0].value;
    }
    if (firstDay < 10) {
      firstDay = "0" + fDay.getDate();
    }

    let startDate = year + "-" + MonthValue[0].value + "-" + firstDay;

    let endDate = year + "-" + MonthValue[0].value + "-" + lastDay;
    let finalData = {
      clientFolderName: clientmonth.clientFolderName,
      startDate: startDate,
      endDate: endDate,
    };
    getClientDetails(finalData);
    // setSubmitted(true);
  };
  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className=" col-lg-6 col-md-11 col-sm-10 col-10">
              <h4 className="heading_color">Client FY Report</h4>
            </div>

            <div className="col-lg-6 col-md-11 col-sm-12 col-11 py-2 ">
              <Link
                className="btn btn_green_bg float-right"
                to="/client-report-detail"
              >
                Back
              </Link>
              {/* <button
                className="btn btn_green_bg float-right"
                onClick={() => onClickReset()}
              >
                Refresh
              </button> */}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12 text-center">
              <section className="body">
                <div className=" body-inner no-padding table-responsive fixTableHead">
                  <table
                    className="table table-bordered table-striped table-hover smll_row"
                    id="datatable2"
                  >
                    <thead>
                      <tr>
                        <th>Sl no</th>
                        <th>Month-Year</th>
                        <th>Total Qty</th>
                      </tr>
                    </thead>
                    <tbody>
                      {FyClientMonthWiseReport &&
                        FyClientMonthWiseReport.map((clientmonth, idx) => {
                          var projectdate = "";
                          if (client.projectDate) {
                            var ED1 = client.projectDate.split(/\D/g);
                            projectdate = [ED1[2], ED1[1], ED1[0]].join("-");
                          }
                          return (
                            <tr key={idx}>
                              <td>{idx + 1}</td>
                              <td>
                                <Link
                                  to="/client-month-report"
                                  className="btnLink"
                                  onClick={() =>
                                    handleGoToAllMember(clientmonth)
                                  }
                                >
                                  {clientmonth._id}
                                </Link>
                              </td>

                              <td>{clientmonth.totProjQty}</td>
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

        <div className="row col-md-12 col-lg-12 col-sm-12 col-12 py-2 bottmAlgmnt">
          <div className="col-lg-10 col-md-6 col-sm-6 col-12"></div>
          {/* <div className="col-lg-1 col-md-6 col-sm-6 col-12 align_right">
            <span className="footerfont"> Projects:</span>
          </div>
          <div className="col-lg-1 col-md-6 col-sm-6 col-12 align_right">
            <span className="footerfont">Quantity:</span>
          </div> */}
        </div>
      </div>
    </Fragment>
  );
};

ClientFYReport.propTypes = {
  auth: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  getverificationProjectDeatils: PropTypes.func.isRequired,
  getAllchanges: PropTypes.func.isRequired,
  getVerificationFolder: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  project: state.project,
  client: state.client,
  sct: state.sct,
});

export default connect(mapStateToProps, {
  getAllchanges,
  getverificationProjectDeatils,
  getAllProjectStatusVerification,
  getUpdatedProjectStaus,
  getAllFolder,
  getClientDetails,
  getSelectedClientfolderDeatils,

  getVerificationFolder,
})(ClientFYReport);
