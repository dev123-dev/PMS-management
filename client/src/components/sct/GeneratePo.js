import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import { Link, useHistory } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { getALLCompanyDetails } from "../../actions/settings";
import { saveQuatation } from "../../actions/sct";
import { Redirect } from "react-router-dom";
import SctQuotationpdfprint from "./SctQuotationpdfprint";
import AllDesignation from "../department/AllDesignation";
// import {
//   Document,
//   Page,
//   Text,
//   Image,
//   View,
//   StyleSheet,
//   PDFViewer,
// } from "@react-pdf/renderer";

const GeneratePo = ({
  auth: { isAuthenticated, user, users, loading },
  settings: { allCompanyDetails },
  sct: { activeClient },

  saveQuatation,
  getALLCompanyDetails,
}) => {
  const data = useHistory().location.data;
  useEffect(() => {
    getALLCompanyDetails();
  }, [getALLCompanyDetails]);

  //formData
  const [formData, setFormData] = useState({
    sctClientName:
      data && data.sctdata && data.sctdata.sctClientName
        ? data.sctdata.sctClientName
        : "",

    sctClientAddress:
      data && data.sctdata && data.sctdata.sctClientAddress
        ? data.sctdata.sctClientAddress
        : "",

    sctCompanyName:
      data && data.sctdata && data.sctdata.sctCompanyName
        ? data.sctdata.sctCompanyName
        : "",
    sctClientAssignedToName:
      data && data.sctdata && data.sctdata.sctClientAssignedToName
        ? data.sctdata.sctClientAssignedToName
        : "",
    sctClientAssignedToId:
      data && data.sctdata && data.sctdata.sctClientAssignedToId
        ? data.sctdata.sctClientAssignedToId
        : "",

    quotationNo: "",
    quotationDate: "",
    isSubmitted: false,
  });

  const {
    quotationNo,

    sctClientName,
    sctClientAssignedToId,
    sctCompanyName,
    sctClientAssignedToName,
    sctClientAddress,

    isSubmitted,
  } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const allcompanydata = [];
  allCompanyDetails.map((company) =>
    allcompanydata.push({
      companyaddress: company.companyAddress,
      companyid: company._id,
      label: company.companyName,
      value: company.companyName,
    })
  );
  const [companyaddress, setcompanyaddressData] = useState("");

  const [company, getcompanyData] = useState("");
  const [companyid, setcompanyId] = useState("");
  const [companyname, setcompanyname] = useState("");

  const onCompanyChange = (e) => {
    // //Required Validation starts
    // setError({
    //   ...error,
    //   paymentmodeIdChecker: true,
    //   paymentmodeIdErrorStyle: { color: "#000" },
    // });
    // //Required Validation ends

    var companyid = "";
    var companyname = "";
    var companyaddress = "";
    getcompanyData(e);
    companyid = e.companyid;
    companyname = e.value;
    companyaddress = e.companyaddress;
    setcompanyId(companyid);
    setcompanyname(companyname);
    setcompanyaddressData(companyaddress);
  };

  //Required Validation Starts
  const [error, setError] = useState({
    paymentmodeIdChecker: false,
    paymentmodeIdErrorStyle: {},
    clienttypeIdChecker: false,

    clienttypeIdErrorStyle: {},
  });
  const {
    paymentmodeIdChecker,
    paymentmodeIdErrorStyle,
    clienttypeIdChecker,
    clienttypeIdErrorStyle,
  } = error;

  const checkErrors = () => {
    if (!clienttypeIdChecker) {
      setError({
        ...error,
        clienttypeIdErrorStyle: { color: "#F00" },
      });
      return false;
    }
    if (!paymentmodeIdChecker) {
      setError({
        ...error,
        paymentmodeIdErrorStyle: { color: "#F00" },
      });
      return false;
    }

    return true;
  };
  const [startquotationDate, setquotationDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const onDateChange = (e) => {
    setquotationDate(e.target.value);
  };

  //add staff end
  const [finalDataVal, setFinalDataVal] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();
    // if (checkErrors()) {
    const finalData = {
      clientId: data && data.sctdata ? data && data.sctdata._id : "",
      clientName: sctCompanyName,
      quotationNo: quotationNo,
      quotationDate: startquotationDate,
      clientFromId: sctClientAssignedToId,
      clientFrom: sctClientAssignedToName,
      companyId: companyid,
      companyName: companyname,
      companyAddress: companyaddress,
      forName: sctCompanyName,
      forAddress: sctClientAddress,
      clientEnteredById: user._id,
    };
    saveQuatation(finalData);
    setFinalDataVal(finalData);
    setFormData({
      ...formData,
      sctClientAssignedToName: "",
      sctCompanyName: "",
      sctClientAddress: "",
      quotationNo: "",
      companyName: "",
      companyaddress: "",
      startquotationDate: "",
      isSubmitted: true,
    });
  };

  if (!data) {
    return <Redirect to="/all-engaged-clients" />;
  }
  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      {" "}
      <div className="container container_align">
        <form className="row" onSubmit={(e) => onSubmit(e)}>
          <div className="row col-lg-12 col-md-11 col-sm-12 col-12">
            <div className=" col-lg-4 col-md-11 col-sm-10 col-10">
              <h5 className="heading_color"> Purchase Order Request </h5>
            </div>

            <div className="col-lg-8 col-md-11 col-sm-12 col-12 py-2">
              <Link
                className="btn btn_green_bg float-right"
                to="/all-engaged-clients"
              >
                Back
              </Link>
            </div>
          </div>
          <hr />

          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="row card-new ">
              <div className="col-lg-4 col-md-6 col-sm-6 col-12 py-2">
                <label className="label-control">Purchase Order No:</label>
                <input
                  type="text"
                  name="quotationNo"
                  value={quotationNo}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6 col-12 py-2">
                <label className="label-control">Purchase Order Date :</label>
                <input
                  type="date"
                  placeholder="dd/mm/yyyy"
                  className="form-control cpp-input datevalidation"
                  name="quotationDate"
                  value={startquotationDate}
                  onChange={(e) => onDateChange(e)}
                  style={{
                    width: "100%",
                  }}
                  required
                />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6 col-12 py-2">
                <label className="label-control">Client From :</label>
                <input
                  type="text"
                  name="sctClientAssignedToName"
                  value={sctClientAssignedToName}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="col-lg-8 col-md-6 col-sm-6 col-12 py-2">
                <label className="label-control">Work Discription :</label>
                <textarea
                  name="sctClientAddress"
                  id="sctClientAddress"
                  className="textarea form-control"
                  rows="5"
                  placeholder="To Address"
                  style={{ width: "100%" }}
                  value={sctClientAddress}
                  onChange={(e) => onInputChange(e)}
                ></textarea>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6 col-12 py-2">
                <label className="label-control">Amount:</label>
                <input
                  type="text"
                  name="sctClientAssignedToName"
                  value={sctClientAssignedToName}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <br />
              <div className="row card-new col-lg-12 col-md-11 col-sm-12 col-12 ">
                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                  <label className="label-control">From* :</label>
                  <Select
                    name="companyName"
                    options={allcompanydata}
                    isSearchable={true}
                    value={company}
                    placeholder="Select Company"
                    onChange={(e) => onCompanyChange(e)}
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
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                  <label className="label-control">For :</label>
                  <input
                    type="text"
                    name="sctCompanyName"
                    value={sctCompanyName}
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>

                <div className="col-lg-6 col-md-6 col-sm-6 col-12  py-2">
                  <textarea
                    name="companyaddress"
                    id="companyaddress"
                    className="textarea form-control"
                    rows="5"
                    placeholder="From Address"
                    style={{ width: "100%" }}
                    value={companyaddress}
                    onChange={(e) => onInputChange(e)}
                  ></textarea>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-12  py-2">
                  <textarea
                    name="sctClientAddress"
                    id="sctClientAddress"
                    className="textarea form-control"
                    rows="5"
                    placeholder="To Address"
                    style={{ width: "100%" }}
                    value={sctClientAddress}
                    onChange={(e) => onInputChange(e)}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <div
            className="row col-lg-12 col-md-11 col-sm-12 col-12 Savebutton no_padding"
            size="lg"
          >
            <div className="col-lg-8 col-md-6 col-sm-12 col-12">
              <label className="label-control colorRed">
                * Indicates mandatory fields, Please fill mandatory fields
                before Submit
              </label>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 col-12">
              {loading ? (
                <button
                  className="btn sub_form btn_continue blackbrd Save float-right"
                  disabled
                >
                  Loading...
                </button>
              ) : (
                <>
                  {/* {isSubmitted ? ( */}
                  <Link
                    className="btn sub_form btn_continue blackbrd Save float-right"
                    // style={{ backgroundColor: "##007bff", color: "black" }}
                    to={{
                      pathname: "/print-PO-pdf",
                      data: {
                        data,
                      },
                    }}
                  >
                    Print
                  </Link>
                  {/* ) : ( */}
                  <input
                    type="submit"
                    name="Submit"
                    value="Submit"
                    className="btn sub_form btn_continue blackbrd Save float-right"
                  />
                  {/* )} */}
                </>
              )}
              <Link
                className="btn sub_form btn_continue blackbrd float-right"
                to="/all-engaged-clients"
              >
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

GeneratePo.propTypes = {
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  settings: state.settings,
  sct: state.sct,
});

export default connect(mapStateToProps, {
  saveQuatation,
  getALLCompanyDetails,
})(GeneratePo);
