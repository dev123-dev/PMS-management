import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import Spinner from "../layout/Spinner";

import {
  getverificationProjectDeatils,
  getAllProjectStatusVerification,
  getAllFolder,
  getSelectedClientfolderDeatils,
} from "../../actions/projects";
import { getYear, getFYclient } from "../../actions/sct";
import { getVerificationFolder } from "../../actions/client";

import { getAllchanges, getUpdatedProjectStaus } from "../../actions/projects";
import { w3cwebsocket } from "websocket";
import { propTypes } from "react-bootstrap/esm/Image";
//client in websocket
//SLAP IP
const client = new w3cwebsocket("ws://192.168.6.38:8000");

const ClientReportDetails = ({
  auth: { isAuthenticated, user, users },
  project: { allFolderName },
  client: { activeVerfificationFolders },

  getverificationProjectDeatils,
  getAllProjectStatusVerification,
  getUpdatedProjectStaus,
  getYear,
  getFYclient,
  getVerificationFolder,
  getSelectedClientfolderDeatils,
}) => {
  let financialyear = JSON.parse(localStorage.getItem("financialYear"));

  console.log("financialyear", financialyear);
  useEffect(() => {
    getYear();
  }, []);
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

  const [clientData, setClientData1] = useState("");
  const [Year, setYear] = useState("");

  const onfolderClientChange = (e) => {
    setClientData1(e);
    // let selDateData = {
    //   folder: e.value,
    //   statusId: projectStatusData.value,
    //   dateVal: singledate,
    // };
  };

  const onYearChange = (e) => {
    setYear(e);
    let selYear = {
      startDate: e.value.startDate,
      endDate: e.value.endDate,
    };
    getFYclient(selYear);

    // let selDateData = {
    //   folder: e.value,
    //   statusId: projectStatusData.value,
    //   dateVal: singledate,
    // };
  };

  const year = [];
  financialyear &&
    financialyear.map((ele) =>
      year.push({
        value: {
          startDate: ele.startDate,
          endDate: ele.endDate,
        },

        label: ele._id,
      })
    );

  const onClickReset = () => {
    setYear("");

    setClientData1("");
  };

  const activeClientsOpt = [];
  allFolderName &&
    allFolderName.map((clientsData) =>
      activeClientsOpt.push({
        label: clientsData._id,
        value: clientsData._id,
      })
    );
  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className=" col-lg-2 col-md-11 col-sm-10 col-10">
              <h5 className="heading_color">Client Report Details</h5>
            </div>

            <div className="col-lg-2 col-md-11 col-sm-10 col-10 py-2">
              <Select
                name="projectStatusData"
                options={year}
                value={Year}
                isSearchable={true}
                placeholder="Select"
                onChange={(e) => onYearChange(e)}
              />
            </div>
            <div className="col-lg-2 col-md-11 col-sm-10 col-10 py-2">
              <Select
                name="clientData"
                isSearchable={true}
                value={clientData}
                options={activeClientsOpt}
                placeholder="Select Folder"
                onChange={(e) => onfolderClientChange(e)}
              />
            </div>

            <div className="col-lg-4 col-md-11 col-sm-12 col-11 py-3">
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
                  <br />
                  <table
                    className="table table-bordered table-striped table-hover smll_row"
                    id="datatable2"
                  >
                    <thead>
                      <tr>
                        <th>Sl no</th>
                        <th>Client Name</th>
                        <th>Client Type</th>
                        <th>Project Name</th>
                        <th>Project date</th>
                        <th>Project QTY</th>
                      </tr>
                    </thead>
                    <tbody>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        </section>

        <div className="row col-md-12 col-lg-12 col-sm-12 col-12  bottmAlgmnt">
          <div className="col-lg-10 col-md-6 col-sm-6 col-12"></div>
          <div className="col-lg-1 col-md-6 col-sm-6 col-12 align_right">
            <span className="footerfont"> Projects:</span>
          </div>
          <div className="col-lg-1 col-md-6 col-sm-6 col-12 align_right">
            <span className="footerfont">Quantity:</span>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ClientReportDetails.propTypes = {
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
  getYear,
  getFYclient,
  getVerificationFolder,
})(ClientReportDetails);
