import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
import {
  getverificationProjectDeatils,
  getAllProjectStatusVerification,
  getAllFolder,
  getSelectedClientfolderDeatils,
} from "../../actions/projects";
import { getVerificationFolder } from "../../actions/client";

import { getAllchanges, getUpdatedProjectStaus } from "../../actions/projects";
import { w3cwebsocket } from "websocket";

//client in websocket
//SLAP IP
const client = new w3cwebsocket("ws://192.168.6.44:8000");

const ClientMonthReport = ({
  auth: { isAuthenticated, user, users },
  project: { allFolderName },
  client: { activeVerfificationFolders },
  sct: { clientwise, clientwisesum },

  getverificationProjectDeatils,
  getAllProjectStatusVerification,
  getUpdatedProjectStaus,

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

  const MonthYear = [
    { label: "January", value: "1" },
    { label: "Febrery", value: "2" },
    { label: "March", value: "3" },
    { label: "April", value: "4" },
    { label: "May", value: "5" },
    { label: "June", value: "6" },
    { label: "July", value: "7" },
    { label: "August", value: "8" },
    { label: "September", value: "9" },
    { label: "October", value: "10" },
    { label: "November", value: "11" },
    { label: "December", value: "12" },
  ];
  let monthandyear =
    clientwise && clientwise[0] && clientwise[0].projectDate.split("-");
  let year = monthandyear && monthandyear[0];
  let month = monthandyear && monthandyear[1];
  if (month < 10) {
    let m = month.split("");
    month = m[1];
  }
  let monthLabel = MonthYear.filter((ele) => {
    if (ele.value === month) {
      return ele.label;
    }
  });
  let finalDateValue =
    monthLabel && monthLabel[0] && monthLabel[0].label + "-" + year;
  // let finalDateData =

  // clientwise && clientwise.map((ele)=>{

  // })
  const csvData = [["sl no.", "Project Date", "Project Name", "Qty"]];
  clientwise &&
    clientwise.map((client, i) => {
      var projectDate = "";
      var ED1 = client.projectDate.split(/\D/g);
      projectDate = [ED1[2], ED1[1], ED1[0]].join("-");
      csvData.push([
        i + 1,
        client.projectDate,
        client.projectName,
        client.projectQty,
      ]);
    });

  let clientTYPE = [
    { value: "Regular", label: "Regular" },
    { value: "Test", label: "Test" },
  ];

  const [clientType, setClientType] = useState({
    value: "Regular",
    label: "Regular",
  });

  const onTypeChange = (e) => {
    setClientType(e);
  };
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
  return !isAuthenticated || !user ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className=" col-lg-3 col-md-11 col-sm-10 col-10">
              <h4 className="heading_color">
                <b>
                  {" "}
                  {clientwise &&
                    clientwise[0] &&
                    "(" + clientwise[0].clientFolderName}
                  {" : "}
                  {finalDateValue + ")"}
                </b>{" "}
                Month Report
              </h4>
            </div>
            {/* <div className="col-lg-2 col-md-6 col-sm-6 col-12 mt-2">
              <Select
                name="sctProjectName"
                options={clientTYPE}
                isSearchable={true}
                value={clientType}
                placeholder=" Project"
                onChange={(e) => onTypeChange(e)}
                theme={(theme) => ({
                  ...theme,
                  height: 26,
                  minHeight: 26,
                  borderRadius: 1,
                  colors: {
                    ...theme.colors,
                    primary: "black",
                  },
                })}
              />
            </div> */}
            <div className="col-lg-9 col-md-11 col-sm-12 col-11 py-2 ">
              <Link
                className="btn btn_green_bg float-right"
                to="/client-report-detail"
              >
                Back
              </Link>
              <CSVLink
                className="secondlinebreak"
                data={csvData}
              // filename={fileName}
              >
                <button className="btn btn_green_bg float-right">Export</button>
              </CSVLink>
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
                        <th>SNo</th>
                        <th>Project Date</th>
                        <th>Project Name</th>
                        <th>Project Qty</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="freeze-row">
                        <td></td>
                        <td colSpan={2} style={{ marginLeft: "10%" }}>
                          Total
                        </td>

                        <td>
                          {clientwisesum &&
                            clientwisesum[0] &&
                            clientwisesum[0].total}
                        </td>
                      </tr>
                      {clientwise &&
                        clientwise.map((client, idx) => {
                          var projectDate = "";
                          if (client._id) {
                            var ED1 = client.projectDate.split(/\D/g);
                            projectDate = [ED1[2], ED1[1], ED1[0]].join("-");
                          }
                          if (client.clientTypeVal === clientType.value) {
                            return (
                              <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>{projectDate}</td>
                                <td>{client.projectName}</td>
                                <td>{client.projectQty}</td>
                              </tr>
                            );
                          }
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

ClientMonthReport.propTypes = {
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
  getSelectedClientfolderDeatils,

  getVerificationFolder,
})(ClientMonthReport);
