import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";

import { getAllchanges } from "../../actions/projects";
import { useLocation } from "react-router-dom";
import {
  getverificationProjectDeatils,
  getAllProjectStatusVerification,
  getAllClientFolders,
  getSelectedClientfolderDeatils,
} from "../../actions/projects";

import {
  getYear,
  getFYclient,
  getMonthWiseClient,
  getClientDetails,
  getSelectedClientFolderInGlobal,
  getSelectedFinancialYrInGlobal
} from "../../actions/sct";

const ClientReportDetails = ({
  auth: { isAuthenticated, user },
  project: { allfolder },
  sct: { FYclient, fyclientsum, finYears, selectedClientFolder, selectedFinancialYear },
  getYear,
  getClientDetails,
  getFYclient,
  getAllClientFolders,
  getMonthWiseClient,
  getSelectedClientFolderInGlobal,
  getSelectedFinancialYrInGlobal
}) => {
  const location = useLocation();
  // Access the data prop and extract the callFromHeader value
  const [callFromHeader, setCallFromHeader] = useState(
    location?.data?.callFromHeader
  ); //callFromHeader to determine if the call came from header

  const year = new Date().getFullYear();
  const month = new Date().getMonth();

  const defaultStartDate = (month >= 3 ? year : year - 1).toString() + "-" + "04" + "-" + "01";
  const defaultEndDate = (month >= 3 ? year + 1 : year).toString() + "-" + "03" + "-" + "31";
  const currFinYear = (month >= 3 ? year : year - 1).toString() + " - " + (month >= 3 ? year + 1 : year).toString();

  let resetYear = {
    label: currFinYear,
    value: currFinYear,
    startDate: defaultStartDate,
    endDate: defaultEndDate
  };

  const [clientData, setClientData] = useState("");
  const [selFinYear, setSelFinYear] = useState(callFromHeader ? resetYear : (selectedFinancialYear) ? selectedFinancialYear : resetYear);

  useEffect(() => {
    getYear();
    getAllClientFolders();            //Get all client folders 

    if (callFromHeader) {
      getInitialLoadingOfData();
    }
    else {
      if (selectedClientFolder)
        onfolderClientChange(selectedClientFolder);
      else {
        if (selectedFinancialYear)
          onYearChange(selectedFinancialYear);
        else {
          getInitialLoadingOfData();
        }
      }
    }
  }, []);

  //Separating Initial function 
  const getInitialLoadingOfData = () => {
    getSelectedClientFolderInGlobal(null);
    getSelectedFinancialYrInGlobal(resetYear);
    getFYclient({
      startDate: defaultStartDate,
      endDate: defaultEndDate,
      clientFolderName: "",
      finYear: currFinYear,
    });
  }

  function checkLeapYear(year) {
    if ((0 == year % 4 && 0 != year % 100) || 0 == year % 400) //three conditions to find out the leap year
      return true;
    else
      return false;
  }

  const checkMonthDays = (monthNo, selFYear) => {
    switch (monthNo) {
      case "01":
        return "31";
      case "02":
        return checkLeapYear(selFYear.value.split("-")[1]) ? "29" : "28";
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

  const handleClientSpecificMonthDetails = (clientmonth, monthNo) => {
    let yr = "";

    if (Number(monthNo) >= 4) {
      yr = selFinYear && selFinYear.value.split(" - ")[0];
    } else {
      yr = selFinYear && selFinYear.value.split(" - ")[1];
    }

    let start = yr + "-" + monthNo + "-" + "01";
    let end = yr + "-" + monthNo + "-" + checkMonthDays(monthNo, selFinYear);
    let finalData = {
      clientFolderName: clientmonth._id,
      startDate: start,
      endDate: end,
      finYear: selFinYear.value
    };
    getClientDetails(finalData);
  };

  const onfolderClientChange = (e) => {
    setClientData(e);
    getSelectedClientFolderInGlobal(e);
    getFYclient({
      startDate: selFinYear.startDate,
      endDate: selFinYear.endDate,
      clientFolderName: e.value,
      finYear: selFinYear.value,
    });
  };

  const onYearChange = (e) => {
    setSelFinYear(e);

    let selYear = {
      startDate: e.startDate,
      endDate: e.endDate,
      clientFolderName: "",
      finYear: e.value,
    };

    getSelectedFinancialYrInGlobal(e);
    getSelectedClientFolderInGlobal(null);
    getFYclient(selYear);
    setClientData("");
  };

  const onClickReset = () => {
    getFYclient(resetYear);
    setSelFinYear(resetYear);
    setClientData("");

    getSelectedClientFolderInGlobal(null);
    getSelectedFinancialYrInGlobal(resetYear);
  };

  const activeClientsOpt = [];
  allfolder &&
    allfolder.map((clientsData) =>
      activeClientsOpt.push({
        label: clientsData._id,
        value: clientsData._id,
      })
    );

  const getSelectedClientMonthwise = (client) => {
    getMonthWiseClient({
      clientFolderName: client._id,
      startDate: selFinYear.startDate,
      endDate: selFinYear.endDate,
      finYear: selFinYear.value,
    });
  };

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
                options={finYears}
                value={selFinYear}
                isSearchable={true}
                placeholder={selFinYear}
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
                          April{(" - " + (selFinYear && selFinYear.value?.slice(2, 4)).toString())}
                        </th>
                        <th>May{(" - " + (selFinYear && selFinYear.value?.slice(2, 4)).toString())}</th>
                        <th>June{(" - " + (selFinYear && selFinYear.value?.slice(2, 4)).toString())}</th>
                        <th>July{(" - " + (selFinYear && selFinYear.value?.slice(2, 4)).toString())}</th>
                        <th>Aug{(" - " + (selFinYear && selFinYear.value?.slice(2, 4)).toString())}</th>
                        <th>Sept{(" - " + (selFinYear && selFinYear.value?.slice(2, 4)).toString())}</th>
                        <th>Oct{(" - " + (selFinYear && selFinYear.value?.slice(2, 4)).toString())}</th>
                        <th>Nov{(" - " + (selFinYear && selFinYear.value?.slice(2, 4)).toString())}</th>
                        <th>Dec{(" - " + (selFinYear && selFinYear.value?.slice(2, 4)).toString())}</th>
                        <th>Jan{(" - " + (selFinYear && selFinYear.value?.slice(9, 11)).toString())}</th>
                        <th>Feb{(" - " + (selFinYear && selFinYear.value?.slice(9, 11)).toString())}</th>
                        <th>Mar{(" - " + (selFinYear && selFinYear.value?.slice(9, 11)).toString())}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr key={0} className="freeze-row">
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
                                    onClick={() => getSelectedClientMonthwise(client)}
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
                                        handleClientSpecificMonthDetails(client, "04")
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
                                        handleClientSpecificMonthDetails(client, "05")
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
                                        handleClientSpecificMonthDetails(client, "06")
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
                                        handleClientSpecificMonthDetails(client, "07")
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
                                        handleClientSpecificMonthDetails(client, "08")
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
                                        handleClientSpecificMonthDetails(client, "09")
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
                                        handleClientSpecificMonthDetails(client, "10")
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
                                        handleClientSpecificMonthDetails(client, "11")
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
                                        handleClientSpecificMonthDetails(client, "12")
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
                                        handleClientSpecificMonthDetails(client, "01")
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
                                        handleClientSpecificMonthDetails(client, "02")
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
                                        handleClientSpecificMonthDetails(client, "03")
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
  getAllClientFolders,
  getSelectedClientfolderDeatils,
  getYear,
  getFYclient,
  getClientDetails,
  getMonthWiseClient,
  getSelectedClientFolderInGlobal,
  getSelectedFinancialYrInGlobal
})(ClientReportDetails);
