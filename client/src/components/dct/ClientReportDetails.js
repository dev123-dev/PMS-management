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
import {
  getYear,
  getFYclient,
  getMonthWiseClient,
  getClientDetails,
} from "../../actions/sct";
import { getVerificationFolder } from "../../actions/client";

import { getAllchanges, getUpdatedProjectStaus } from "../../actions/projects";
import { w3cwebsocket } from "websocket";
import { propTypes } from "react-bootstrap/esm/Image";
//client in websocket
//SLAP IP
const client = new w3cwebsocket("ws://192.168.6.44:8000");

const ClientReportDetails = ({
  auth: { isAuthenticated, user, users },
  project: { allfolder },
  client: { activeVerfificationFolders },
  sct: { FYclient, fyclientsum },

  getverificationProjectDeatils,
  getAllProjectStatusVerification,
  getUpdatedProjectStaus,
  getYear,
  getClientDetails,
  getFYclient,
  getAllFolder1,
  getMonthWiseClient,
  getVerificationFolder,
  getSelectedClientfolderDeatils,
}) => {

  function checkLeapYear(year) {
    //three conditions to find out the leap year
    if ((0 == year % 4 && 0 != year % 100) || 0 == year % 400) {
      return true;
      // console.log(year + ' is a leap year');
    } else {
      return false;
      //console.log(year + ' is not a leap year');
    }
  }

  const checkMonthDays = (monthNo, year) => {
    switch (monthNo) {
      case "01":
        return "31";
      case "02":
        return checkLeapYear(year.split("-")[1]) ? "29" : "28";
      case "03":
        return "31";
      case "04":
        return "30";
      case "05":
        return "31";
      case "06":
        return "30";
      case "07":
        return "31";
      case "08":
        return "31";
      case "09":
        return "30";
      case "10":
        return "31";
      case "11":
        return "30";
      case "12":
        return "31";

      default:
        break;
    }
  };

  const [startyear, setstartyear] = useState("");
  const [endyear, setendyear] = useState("");

  const handleGoToMember = (clientmonth, monthNo) => {
    let yr = "";

    if (Number(monthNo) >= 4) {
      console.log("T");
      yr += Year && Year.split("-")[0];
    } else {
      console.log("F");
      yr += Year && Year.split("-")[1];
    }
    console.log(yr);

    let start = yr + "-" + monthNo + "-" + "01";
    let end = yr + "-" + monthNo + "-" + checkMonthDays(monthNo, Year);
    let finalData = {
      clientFolderName: clientmonth._id,
      startDate: start,
      endDate: end,
    };

    console.log("finalData", finalData);
    getClientDetails(finalData);
    //};
  };

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
  const [Year, setYear] = useState(
    (financialyear && financialyear[0]._id) || "2023-2024"
  );
  // financialyear && financialyear[0]._id

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

  ///////////////////////

  ///////////////////////

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
    console.log("client", client);

    getMonthWiseClient({
      clientFolderName: client._id,
      startDate: startDate,
      endDate: endDate,
      finYear: client.finYear,
    });
  };

  //users
  return !isAuthenticated || !user ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className=" col-lg-2 col-md-11 col-sm-10 col-10">
              <h4 className="heading_color">Report Details</h4>
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
                        <th>
                          April{("-" + Year && Year?.slice(2, 4)) || "23"}
                        </th>
                        <th>May{("-" + Year && Year?.slice(2, 4)) || "23"}</th>
                        <th>June{("-" + Year && Year?.slice(2, 4)) || "23"}</th>
                        <th>July{("-" + Year && Year?.slice(2, 4)) || "23"}</th>
                        <th>Aug{("-" + Year && Year?.slice(2, 4)) || "23"}</th>
                        <th>Sept{("-" + Year && Year?.slice(2, 4)) || "23"}</th>
                        <th>Oct{("-" + Year && Year?.slice(2, 4)) || "23"}</th>
                        <th>Nov{("-" + Year && Year?.slice(2, 4)) || "23"}</th>
                        <th>Dec{("-" + Year && Year?.slice(2, 4)) || "23"}</th>
                        <th>Jan{("-" + Year && Year?.slice(7, 9)) || "24"}</th>
                        <th>Feb{("-" + Year && Year?.slice(7, 9)) || "24"}</th>
                        <th>Mar{("-" + Year && Year?.slice(7, 9)) || "24"}</th>
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
                                {/* Apr */}
                                <td>
                                  {client.finalData &&
                                    client.finalData.findIndex((val) =>
                                      val.includes("Apr")
                                    ) === -1
                                    ? "0"
                                    :
                                    <Link
                                      to="/client-month-report"
                                      className="btnLink"
                                      onClick={() =>
                                        handleGoToMember(client, "04")
                                      }
                                    >
                                      {client.finalData[
                                        client.finalData.findIndex((val) =>
                                          val.includes("Apr")
                                        )].split("-")[1]}
                                    </Link>
                                  }

                                </td>
                                {/* May */}
                                <td>
                                  {client.finalData &&
                                    client.finalData.findIndex((val) =>
                                      val.includes("May")
                                    ) === -1
                                    ? "0"
                                    : <Link
                                      to="/client-month-report"
                                      className="btnLink"
                                      onClick={() =>
                                        handleGoToMember(client, "05")
                                      }
                                    >
                                      {client.finalData[
                                        client.finalData.findIndex((val) =>
                                          val.includes("May")
                                        )].split("-")[1]}
                                    </Link>
                                  }
                                </td>
                                {/* June */}
                                <td>
                                  {client.finalData &&
                                    client.finalData.findIndex((val) =>
                                      val.includes("Jun")
                                    ) === -1
                                    ? "0"
                                    :
                                    <Link
                                      to="/client-month-report"
                                      className="btnLink"
                                      onClick={() =>
                                        handleGoToMember(client, "06")
                                      }
                                    >
                                      {
                                        client.finalData[
                                          client.finalData.findIndex((val) =>
                                            val.includes("Jun")
                                          )].split("-")[1]}
                                    </Link>
                                  }
                                </td>
                                {/* Jul */}
                                <td>
                                  {client.finalData &&
                                    client.finalData.findIndex((val) =>
                                      val.includes("Jul")
                                    ) === -1
                                    ? "0"
                                    :
                                    <Link
                                      to="/client-month-report"
                                      className="btnLink"
                                      onClick={() =>
                                        handleGoToMember(client, "07")
                                      }>
                                      {client.finalData[
                                        client.finalData.findIndex((val) =>
                                          val.includes("Jul")
                                        )].split("-")[1]}
                                    </Link>
                                  }
                                </td>
                                {/* Aug */}
                                <td>
                                  {client.finalData &&
                                    client.finalData.findIndex((val) =>
                                      val.includes("Aug")
                                    ) === -1
                                    ? "0"
                                    : <Link
                                      to="/client-month-report"
                                      className="btnLink"
                                      onClick={() =>
                                        handleGoToMember(client, "08")
                                      }
                                    >
                                      {client.finalData[
                                        client.finalData.findIndex((val) =>
                                          val.includes("Aug")
                                        )].split("-")[1]}
                                    </Link>
                                  }
                                </td>
                                {/* Sept */}
                                <td>
                                  {client.finalData &&
                                    client.finalData.findIndex((val) =>
                                      val.includes("Sept")
                                    ) === -1
                                    ? "0"
                                    :
                                    <Link
                                      to="/client-month-report"
                                      className="btnLink"
                                      onClick={() =>
                                        handleGoToMember(client, "09")
                                      }
                                    >
                                      {client.finalData[
                                        client.finalData.findIndex((val) =>
                                          val.includes("Sept")
                                        )].split("-")[1]}
                                    </Link>
                                  }
                                </td>
                                {/* Oct */}
                                <td>
                                  {client.finalData &&
                                    client.finalData.findIndex((val) =>
                                      val.includes("Oct")
                                    ) === -1
                                    ? "0"
                                    :
                                    <Link
                                      to="/client-month-report"
                                      className="btnLink"
                                      onClick={() =>
                                        handleGoToMember(client, "10")
                                      }
                                    >
                                      {client.finalData[
                                        client.finalData.findIndex((val) =>
                                          val.includes("Oct")
                                        )].split("-")[1]}
                                    </Link>
                                  }
                                </td>
                                {/* Nov */}
                                <td>
                                  {client.finalData &&
                                    client.finalData.findIndex((val) =>
                                      val.includes("Nov")
                                    ) === -1
                                    ? "0"
                                    :
                                    <Link
                                      to="/client-month-report"
                                      className="btnLink"
                                      onClick={() =>
                                        handleGoToMember(client, "11")
                                      }
                                    >
                                      {client.finalData[
                                        client.finalData.findIndex((val) =>
                                          val.includes("Nov")
                                        )
                                      ].split("-")[1]}
                                    </Link>
                                  }
                                </td>
                                {/* Dec */}
                                <td>
                                  {client.finalData &&
                                    client.finalData.findIndex((val) =>
                                      val.includes("Dec")
                                    ) === -1
                                    ? "0"
                                    :
                                    <Link
                                      to="/client-month-report"
                                      className="btnLink"
                                      onClick={() =>
                                        handleGoToMember(client, "12")
                                      }
                                    >
                                      {client.finalData[
                                        client.finalData.findIndex((val) =>
                                          val.includes("Dec")
                                        )].split("-")[1]}
                                    </Link>
                                  }
                                </td>

                                {/* Jan */}
                                <td>
                                  {client.finalData &&
                                    client.finalData.findIndex((val) =>
                                      val.includes("Jan")
                                    ) === -1
                                    ? "0"
                                    :
                                    <Link
                                      to="/client-month-report"
                                      className="btnLink"
                                      onClick={() =>
                                        handleGoToMember(client, "01")
                                      }
                                    >
                                      {client.finalData[
                                        client.finalData.findIndex((val) =>
                                          val.includes("Jan")
                                        )].split("-")[1]}
                                    </Link>
                                  }
                                </td>
                                {/* Feb */}
                                <td>
                                  {client.finalData &&
                                    client.finalData.findIndex((val) =>
                                      val.includes("Feb")
                                    ) === -1
                                    ? "0"
                                    :
                                    <Link
                                      to="/client-month-report"
                                      className="btnLink"
                                      onClick={() =>
                                        handleGoToMember(client, "02")
                                      }
                                    >
                                      {client.finalData[
                                        client.finalData.findIndex((val) =>
                                          val.includes("Feb")
                                        )].split("-")[1]}
                                    </Link>
                                  }
                                </td>
                                {/* Mar */}
                                <td>
                                  {client.finalData &&
                                    client.finalData.findIndex((val) =>
                                      val.includes("Mar")
                                    ) === -1
                                    ? "0"
                                    :
                                    <Link
                                      to="/client-month-report"
                                      className="btnLink"
                                      onClick={() =>
                                        handleGoToMember(client, "03")
                                      }
                                    >
                                      {client.finalData[
                                        client.finalData.findIndex((val) =>
                                          val.includes("Mar")
                                        )].split("-")[1]}
                                    </Link>
                                  }
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
        </section >
      </div >
    </Fragment >
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
  getClientDetails,
  getMonthWiseClient,
  getVerificationFolder,
})(ClientReportDetails);
