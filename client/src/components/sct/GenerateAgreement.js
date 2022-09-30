import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import { Link, useHistory } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { getALLCompanyDetails } from "../../actions/settings";
import { saveAgreement, getSelectedProject } from "../../actions/sct";
import { Redirect } from "react-router-dom";

const GenerateAgreement = ({
  auth: { isAuthenticated, user, users, loading },
  settings: { allCompanyDetails },
  sct: { selectedProject },
  saveAgreement,
  getALLCompanyDetails,
  getSelectedProject,
}) => {
  const data = useHistory().location.data;
  let sctDataVal = data && data.sctdata;

  useEffect(() => {
    getALLCompanyDetails();
  }, [getALLCompanyDetails]);
  useEffect(() => {
    getSelectedProject({ projectId: sctDataVal && sctDataVal.projectsId });
  }, [getSelectedProject]);
  let AgreementFile = JSON.parse(
    localStorage.getItem("generatedAgreementFileLS")
  );
  //formData
  const [formData, setFormData] = useState({
    sctClientAddress:
      sctDataVal && sctDataVal.sctClientAddress
        ? sctDataVal.sctClientAddress
        : "",

    sctCompanyName:
      sctDataVal && sctDataVal.sctCompanyName ? sctDataVal.sctCompanyName : "",
    sctClientAssignedToName:
      sctDataVal && sctDataVal.sctClientAssignedToName
        ? sctDataVal.sctClientAssignedToName
        : "",
    sctClientAssignedToId:
      sctDataVal && sctDataVal.sctClientAssignedToId
        ? sctDataVal.sctClientAssignedToId
        : "",

    quotationNo: "",
    quotationDate: "",
    fromName: "",
    fromDesg: "",
    toName: "",
    toDesg: "",
    agreementDateInWords: "",
    isSubmitted: false,
  });

  const {
    quotationNo,
    sctClientAssignedToId,
    sctCompanyName,
    sctClientAssignedToName,
    sctClientAddress,
    fromName,
    fromDesg,
    toName,
    agreementDateInWords,
    toDesg,
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
    //Required Validation starts
    setError({
      ...error,
      FrmCmpnyIdChecker: true,
      FrmCmpnyErrorStyle: { color: "#000" },
    });
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
    FrmCmpnyErrorStyle: {},
    FrmCmpnyIdChecker: false,
  });
  const { FrmCmpnyErrorStyle, FrmCmpnyIdChecker } = error;

  const checkErrors = () => {
    if (!FrmCmpnyIdChecker) {
      setError({
        ...error,
        FrmCmpnyErrorStyle: { color: "#F00" },
      });
      return false;
    }

    return true;
  };
  const [startagreementDate, setagreementDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const onDateChange = (e) => {
    setagreementDate(e.target.value);
  };
  //add staff end
  const [finalDataVal, setFinalDataVal] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      checkErrors() &&
      selectedProject.agreementTemplate &&
      selectedProject.agreementTemplate.filename
    ) {
      const finalData = {
        clientId: sctDataVal ? sctDataVal._id : "",
        clientName: sctCompanyName,
        clientAddress: sctClientAddress,
        agreementDate: startagreementDate,
        agreementDateInWords: agreementDateInWords,
        companyId: companyid,
        companyName: companyname,
        companyAddress: companyaddress,
        agreementTemplate: selectedProject.agreementTemplate.filename,
        fromName: fromName,
        fromDesg: fromDesg,
        toName: toName,
        toDesg: toDesg,
        status: "Active",
        agreementEnteredById: user._id,
        agreementEnteredByDateTime: new Date().toLocaleString("en-GB"),
      };
      // console.log(finalData);
      saveAgreement(finalData);
      setFormData({
        ...formData,
        isSubmitted: true,
      });
    }
  };

  if (!data) {
    return <Redirect to="/all-sct-documents" />;
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
              <h5 className="heading_color">Generate Agreement</h5>
            </div>

            <div className="col-lg-8 col-md-11 col-sm-12 col-12 py-2">
              <Link
                className="btn btn_green_bg float-right"
                to="/all-sct-documents"
              >
                Back
              </Link>
            </div>
            <span className="warningMsg">
              {selectedProject &&
              selectedProject.agreementTemplate &&
              selectedProject.agreementTemplate.filename
                ? ""
                : "Agreement Template not found. Contact Admin"}
            </span>
          </div>
          <hr />

          <div className="col-lg-8 col-md-12 col-sm-12 col-12">
            <div className="row card-new ">
              <div className="col-lg-4 col-md-6 col-sm-6 col-12 py-2">
                <label className="label-control">Agreement No:</label>
                <input
                  type="text"
                  name="quotationNo"
                  value={quotationNo}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col-12 py-2">
                <label className="label-control">Agreement Date :</label>
                <input
                  type="date"
                  placeholder="dd/mm/yyyy"
                  className="form-control cpp-input datevalidation"
                  name="quotationDate"
                  value={startagreementDate}
                  onChange={(e) => onDateChange(e)}
                  style={{
                    width: "100%",
                  }}
                  required
                />
              </div>{" "}
              <div className="col-lg-3 col-md-6 col-sm-6 col-12 py-2">
                <label className="label-control">
                  Agreement Date in words:
                </label>
                <input
                  type="text"
                  name="agreementDateInWords"
                  value={agreementDateInWords}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>
              <br />
              {/* <div className="row card-new col-lg-12 col-md-11 col-sm-12 col-12 "> */}
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <label className="label-control" style={FrmCmpnyErrorStyle}>
                  From* :
                </label>
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
                  required
                  disabled
                />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
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
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <textarea
                  name="sctClientAddress"
                  id="sctClientAddress"
                  className="textarea form-control"
                  rows="5"
                  placeholder="To Address"
                  style={{ width: "100%" }}
                  value={sctClientAddress}
                  onChange={(e) => onInputChange(e)}
                  required
                ></textarea>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col-12 py-2">
                <label className="label-control">From Name :</label>
                <input
                  type="text"
                  name="fromName"
                  value={fromName}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col-12 py-2">
                <label className="label-control">From Designation:</label>
                <input
                  type="text"
                  name="fromDesg"
                  value={fromDesg}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col-12 py-2">
                <label className="label-control">To Name :</label>
                <input
                  type="text"
                  name="toName"
                  value={toName}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col-12 py-2">
                <label className="label-control">To Designation:</label>
                <input
                  type="text"
                  name="toDesg"
                  value={toDesg}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>
            </div>
          </div>
          {/* </div> */}

          <div
            className="row col-lg-8 col-md-11 col-sm-12 col-12 Savebutton no_padding"
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
                  {isSubmitted &&
                  !loading &&
                  AgreementFile &&
                  AgreementFile.generatedAgreementFile ? (
                    <Link
                      className="btn sub_form btn_continue blackbrd  Save float-right"
                      style={{ backgroundColor: "#007bff", color: "white" }}
                      to={{
                        pathname: require("../../static/agreement/" +
                          AgreementFile.generatedAgreementFile),
                      }}
                      target="_blank"
                    >
                      Download
                    </Link>
                  ) : (
                    <input
                      type="submit"
                      name="Submit"
                      value="Submit"
                      className="btn sub_form btn_continue blackbrd Save float-right"
                    />
                  )}
                </>
              )}
              <Link
                className="btn sub_form btn_continue blackbrd float-right"
                to="/all-sct-documents"
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

GenerateAgreement.propTypes = {
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  settings: state.settings,
  sct: state.sct,
});

export default connect(mapStateToProps, {
  saveAgreement,
  getALLCompanyDetails,
  getSelectedProject,
})(GenerateAgreement);
