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
  getAllFolder1,
  getSelectedClientfolderDeatils,
} from "../../actions/projects";
import { getYear, getFYclient, getMonthWiseClient } from "../../actions/sct";
import { getVerificationFolder } from "../../actions/client";

import { getAllchanges, getUpdatedProjectStaus } from "../../actions/projects";
import { w3cwebsocket } from "websocket";
import { propTypes } from "react-bootstrap/esm/Image";
//client in websocket
//SLAP IP
const client = new w3cwebsocket("ws://192.168.6.40:8000");

const ClientReportDetails = ({
  auth: { isAuthenticated, user, users },
  project: { allfolder },
  client: { activeVerfificationFolders },
  sct: { FYclient, fyclientsum },

  getverificationProjectDeatils,
  getAllProjectStatusVerification,
  getUpdatedProjectStaus,
  getYear,
  getFYclient,
  getAllFolder1,
  getMonthWiseClient,
  getVerificationFolder,
  getSelectedClientfolderDeatils,
}) => {
  let defaultStartDate = new Date().getFullYear() + "-" + "04" + "-" + "01";
  let defaultEndDate = new Date().getFullYear() + 1 + "-" + "03" + "-" + "31";
  let ClientFolderName = "";

  let financialyear = JSON.parse(localStorage.getItem("financialYear"));

  useEffect(() => {
    getYear();
    getFYclient({
      startDate: defaultStartDate,
      endDate: defaultEndDate,
      clientFolderName: ClientFolderName,
      finYear: financialyear && financialyear[0]._id,
    });
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
    getAllFolder1();
  }, [getAllFolder1]);

  const [clientData, setClientData1] = useState("");
  const [Year, setYear] = useState(financialyear && financialyear[0]._id);
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setendDate] = useState(defaultEndDate);
  const onfolderClientChange = (e) => {
    setClientData1(e);

    getFYclient({
      startDate: startDate,
      endDate: endDate,
      clientFolderName: e.value,
      finYear: Year,
    });
  };

  const onYearChange = (e) => {
    setYear(e.label);
    
    
    setStartDate(e.value.startDate);
    setendDate(e.value.endDate);
    let selYear = {
      startDate: e.value.startDate,
      endDate: e.value.endDate,
      clientFolderName: "",
      finYear: Year,
    };
    getFYclient(selYear);
    setClientData1("");
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
    // setYear("");
    getFYclient({
      startDate: defaultStartDate,
      endDate: defaultEndDate,
      clientFolderName: ClientFolderName,
      finYear: Year,
    });
    setClientData1("");
  };

  const activeClientsOpt = [];
  allfolder &&
    allfolder.map((clientsData) =>
      activeClientsOpt.push({
        label: clientsData._id,
        value: clientsData._id,
      })
    );

  const handleGoToAllMember = (client) => {
    getMonthWiseClient({
      clientFolderName: client._id,
      startDate: startDate,
      endDate: endDate,
      finYear: client.finYear,
    });
  };

  

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className=" col-lg-2 col-md-11 col-sm-10 col-10">
              <h4 className="heading_color">Client Report Details</h4>
            </div>

            <div className="col-lg-2 col-md-11 col-sm-10 col-10 py-2">
              <Select
                name="projectStatusData"
                options={year}
                value={Year}
                isSearchable={true}
                placeholder={Year}
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

            <div className="col-lg-6 col-md-11 col-sm-12 col-11 py-2 float-right">
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
                    className="table table-bordered table-striped table-hover smll_row"
                    id="datatable2"
                  >
                    <thead>
                      <tr>
                        <th style={{ width: "3%" }}>Sl no</th>
                        <th style={{ width: "9%" }}>Client Name</th>
                        <th>April{"-"+Year.split("-")[0]}</th>
                        <th>May{"-"+Year.split("-")[0]}</th>
                        <th>June{"-"+Year.split("-")[0]}</th>
                        <th>July{"-"+Year.split("-")[0]}</th>
                        <th>Aug{"-"+Year.split("-")[0]}</th>
                        <th>Sept{"-"+Year.split("-")[0]}</th>
                        <th>Oct{"-"+Year.split("-")[0]}</th>
                        <th>Nov{"-"+Year.split("-")[0]}</th>
                        <th>Dec{"-"+Year.split("-")[0]}</th>
                        <th>Jan{"-"+Year.split("-")[1]}</th>
                        <th>Feb{"-"+Year.split("-")[1]}</th>
                        <th>Mar{"-"+Year.split("-")[1]}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="freeze-row">
                        <td></td>
                        <td>Total</td>
                        <td>
                          {(
                            fyclientsum &&
                            fyclientsum.filter((val) => {
                              return val._id === "Apr";
                            })
                          ).length === 0
                            ? "0"
                            : (fyclientsum &&
                                fyclientsum.filter((val) => {
                                  return val._id === "Apr";
                                }))[0].totalCount}
                        </td>
                        <td>
                          {" "}
                          {(
                            fyclientsum &&
                            fyclientsum.filter((val) => {
                              return val._id === "May";
                            })
                          ).length === 0
                            ? "0"
                            : (fyclientsum &&
                                fyclientsum.filter((val) => {
                                  return val._id === "May";
                                }))[0].totalCount}
                        </td>
                        <td>
                          {" "}
                          {(
                            fyclientsum &&
                            fyclientsum.filter((val) => {
                              return val._id === "Jun";
                            })
                          ).length === 0
                            ? "0"
                            : (fyclientsum &&
                                fyclientsum.filter((val) => {
                                  return val._id === "Jun";
                                }))[0].totalCount}
                        </td>
                        <td>
                          {" "}
                          {(
                            fyclientsum &&
                            fyclientsum.filter((val) => {
                              return val._id === "Jul";
                            })
                          ).length === 0
                            ? "0"
                            : (fyclientsum &&
                                fyclientsum.filter((val) => {
                                  return val._id === "Jul";
                                }))[0].totalCount}
                        </td>
                        <td>
                          {" "}
                          {(
                            fyclientsum &&
                            fyclientsum.filter((val) => {
                              return val._id === "Aug";
                            })
                          ).length === 0
                            ? "0"
                            : (fyclientsum &&
                                fyclientsum.filter((val) => {
                                  return val._id === "Aug";
                                }))[0].totalCount}
                        </td>
                        <td>
                          {" "}
                          {(
                            fyclientsum &&
                            fyclientsum.filter((val) => {
                              return val._id === "Sept";
                            })
                          ).length === 0
                            ? "0"
                            : (fyclientsum &&
                                fyclientsum.filter((val) => {
                                  return val._id === "Sept";
                                }))[0].totalCount}
                        </td>
                        <td>
                          {" "}
                          {(
                            fyclientsum &&
                            fyclientsum.filter((val) => {
                              return val._id === "Oct";
                            })
                          ).length === 0
                            ? "0"
                            : (fyclientsum &&
                                fyclientsum.filter((val) => {
                                  return val._id === "Oct";
                                }))[0].totalCount}
                        </td>
                        <td>
                          {" "}
                          {(
                            fyclientsum &&
                            fyclientsum.filter((val) => {
                              return val._id === "Nov";
                            })
                          ).length === 0
                            ? "0"
                            : (fyclientsum &&
                                fyclientsum.filter((val) => {
                                  return val._id === "Nov";
                                }))[0].totalCount}
                        </td>
                        <td>
                          {" "}
                          {(
                            fyclientsum &&
                            fyclientsum.filter((val) => {
                              return val._id === "Dec";
                            })
                          ).length === 0
                            ? "0"
                            : (fyclientsum &&
                                fyclientsum.filter((val) => {
                                  return val._id === "Dec";
                                }))[0].totalCount}
                        </td>

                        <td>
                          {" "}
                          {(
                            fyclientsum &&
                            fyclientsum.filter((val) => {
                              return val._id === "Jan";
                            })
                          ).length === 0
                            ? "0"
                            : (fyclientsum &&
                                fyclientsum.filter((val) => {
                                  return val._id === "Jan";
                                }))[0].totalCount}
                        </td>
                        <td>
                          {" "}
                          {(
                            fyclientsum &&
                            fyclientsum.filter((val) => {
                              return val._id === "Feb";
                            })
                          ).length === 0
                            ? "0"
                            : (fyclientsum &&
                                fyclientsum.filter((val) => {
                                  return val._id === "Feb";
                                }))[0].totalCount}
                        </td>

                        <td>
                          {" "}
                          {(
                            fyclientsum &&
                            fyclientsum.filter((val) => {
                              return val._id === "Mar";
                            })
                          ).length === 0
                            ? "0"
                            : (fyclientsum &&
                                fyclientsum.filter((val) => {
                                  return val._id === "Mar";
                                }))[0].totalCount}
                        </td>
                      </tr>

                      {FYclient &&
                        FYclient.map((client, idx) => {
                          return (
                            <React.Fragment>
                              {/* <tr>1</tr> */}
                              <tr key={idx}>
                                <td>{idx + 1}</td>

                                <td>
                                  <Link
                                    to="/client-fy-report"
                                    className="btnLink"
                                    onClick={() => handleGoToAllMember(client)}
                                  >
                                    {client._id}
                                  </Link>
                                </td>
                                {/* apr */}
                                <td>
                                  {client.finalData &&
                                    (client.finalData.findIndex((val) =>
                                      val.includes("Apr")
                                    ) === -1
                                      ? "0"
                                      : client.finalData[
                                          client.finalData.findIndex((val) =>
                                            val.includes("Apr")
                                          )
                                        ].split("-")[1])}
                                </td>
                                {/* May */}
                                <td>
                                  {client.finalData &&
                                    (client.finalData.findIndex((val) =>
                                      val.includes("May")
                                    ) === -1
                                      ? "0"
                                      : client.finalData[
                                          client.finalData.findIndex((val) =>
                                            val.includes("May")
                                          )
                                        ].split("-")[1])}
                                </td>
                                {/* June */}
                                <td>
                                  {client.finalData &&
                                    (client.finalData.findIndex((val) =>
                                      val.includes("Jun")
                                    ) === -1
                                      ? "0"
                                      : client.finalData[
                                          client.finalData.findIndex((val) =>
                                            val.includes("Jun")
                                          )
                                        ].split("-")[1])}
                                </td>
                                {/* jul */}
                                <td>
                                  {client.finalData &&
                                    (client.finalData.findIndex((val) =>
                                      val.includes("Jul")
                                    ) === -1
                                      ? "0"
                                      : client.finalData[
                                          client.finalData.findIndex((val) =>
                                            val.includes("Jul")
                                          )
                                        ].split("-")[1])}
                                </td>
                                {/* aug */}
                                <td>
                                  {client.finalData &&
                                    (client.finalData.findIndex((val) =>
                                      val.includes("Aug")
                                    ) === -1
                                      ? "0"
                                      : client.finalData[
                                          client.finalData.findIndex((val) =>
                                            val.includes("Aug")
                                          )
                                        ].split("-")[1])}
                                </td>
                                {/* sept */}
                                <td>
                                  {client.finalData &&
                                    (client.finalData.findIndex((val) =>
                                      val.includes("Sept")
                                    ) === -1
                                      ? "0"
                                      : client.finalData[
                                          client.finalData.findIndex((val) =>
                                            val.includes("Sept")
                                          )
                                        ].split("-")[1])}
                                </td>
                                {/* oct */}
                                <td>
                                  {client.finalData &&
                                    (client.finalData.findIndex((val) =>
                                      val.includes("Oct")
                                    ) === -1
                                      ? "0"
                                      : client.finalData[
                                          client.finalData.findIndex((val) =>
                                            val.includes("Oct")
                                          )
                                        ].split("-")[1])}
                                </td>
                                {/* nov */}
                                <td>
                                  {client.finalData &&
                                    (client.finalData.findIndex((val) =>
                                      val.includes("Nov")
                                    ) === -1
                                      ? "0"
                                      : client.finalData[
                                          client.finalData.findIndex((val) =>
                                            val.includes("Nov")
                                          )
                                        ].split("-")[1])}
                                </td>
                                {/* dec */}
                                <td>
                                  {client.finalData &&
                                    (client.finalData.findIndex((val) =>
                                      val.includes("Dec")
                                    ) === -1
                                      ? "0"
                                      : client.finalData[
                                          client.finalData.findIndex((val) =>
                                            val.includes("Dec")
                                          )
                                        ].split("-")[1])}
                                </td>

                                {/* Jan */}
                                <td>
                                  {client.finalData &&
                                    (client.finalData.findIndex((val) =>
                                      val.includes("Jan")
                                    ) === -1
                                      ? "0"
                                      : client.finalData[
                                          client.finalData.findIndex((val) =>
                                            val.includes("Jan")
                                          )
                                        ].split("-")[1])}
                                </td>
                                {/* feb */}

                                <td>
                                  {client.finalData &&
                                    (client.finalData.findIndex((val) =>
                                      val.includes("Feb")
                                    ) === -1
                                      ? "0"
                                      : client.finalData[
                                          client.finalData.findIndex((val) =>
                                            val.includes("Feb")
                                          )
                                        ].split("-")[1])}
                                </td>
                                {/* mar */}
                                <td>
                                  {client.finalData &&
                                    (client.finalData.findIndex((val) =>
                                      val.includes("Mar")
                                    ) === -1
                                      ? "0"
                                      : client.finalData[
                                          client.finalData.findIndex((val) =>
                                            val.includes("Mar")
                                          )
                                        ].split("-")[1])}
                                </td>
                              </tr>
                            </React.Fragment>
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
  getAllFolder1,
  getSelectedClientfolderDeatils,
  getYear,
  getFYclient,
  getMonthWiseClient,
  getVerificationFolder,
})(ClientReportDetails);
