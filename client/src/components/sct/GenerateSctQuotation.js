import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import { Link, useHistory } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { getALLPaymentMode } from "../../actions/settings";
import { getActiveClients, AddClient } from "../../actions/client";
import { Redirect } from "react-router-dom";

const GenerateSctQuotation = ({
  auth: { isAuthenticated, user, users, loading },
  settings: { paymentMode },
  client: { activeClient },
  getALLPaymentMode,
  getActiveClients,
  onAddDistrictModalChange,
  AddClient,
}) => {
  const data = useHistory().location.data;
  console.log("useHistory", data);
  useEffect(() => {
    getALLPaymentMode();
  }, [getALLPaymentMode]);
  useEffect(() => {
    getActiveClients();
  }, [getActiveClients]);

  //formData
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientBillingEmail: "",
    clientContactNo1: "",
    clientContactNo2: "",
    clientAddress: "",
    clientCountry: "",
    clientBelongsTo: "",
    clientFolderName: "",
    clientCurrency: "",
    clientType: "",
    clientCompanyName: "",
    clientCompanyFounderName: "",
    clientWebsite: "",
    standardInstruction: "",
    isSubmitted: false,
  });

  const {
    clientName,
    clientEmail,
    clientBillingEmail,
    clientContactNo1,
    clientContactNo2,
    clientAddress,
    clientCountry,
    clientBelongsTo,
    clientFolderName,
    clientCurrency,
    clientType,
    clientCompanyName,
    clientCompanyFounderName,
    PaymentMode,
    clientWebsite,
    standardInstruction,
    isSubmitted,
  } = formData;

  const onClientTypeChange = (e) => {
    //  Required Validation starts
    setError({
      ...error,
      clienttypeIdChecker: true,
      clienttypeIdErrorStyle: { color: "#000" },
    });
    // Required Validation ends

    if (e) {
      setFormData({
        ...formData,
        clientType: e,
      });
    }
  };

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const allpaymentmodes = [];
  paymentMode.map((payment) =>
    allpaymentmodes.push({
      paymentId: payment._id,
      label: payment.paymentModeName,
      value: payment.paymentModeName,
    })
  );

  const [payment, getStateData] = useState("");
  const [paymentId, setpaymentId] = useState("");
  const [paymentname, setpaymentname] = useState("");

  const onPayModeChange = (e) => {
    //Required Validation starts
    setError({
      ...error,
      paymentmodeIdChecker: true,
      paymentmodeIdErrorStyle: { color: "#000" },
    });
    //Required Validation ends

    var paymentId = "";
    var paymentname = "";
    getStateData(e);
    paymentId = e.paymentId;
    paymentname = e.value;
    setpaymentId(paymentId);
    setpaymentname(paymentname);
  };

  const [clients, getclientsData] = useState("");
  const [clientsId, setclientsId] = useState("");
  const [clientsName, setclientsName] = useState("");

  const allclientBelongsTo = [];
  activeClient.map((clients) =>
    allclientBelongsTo.push({
      clientsId: clients._id,
      label: clients.clientName,
      value: clients.clientName,
    })
  );

  const onBelongstoChange = (e) => {
    var clientsId = "";
    var clientsName = "";
    getclientsData(e);
    clientsId = e.clientsId;
    clientsName = e.value;
    setclientsId(clientsId);
    setclientsName(clientsName);
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
  const onSubmit = (e) => {
    e.preventDefault();
    if (checkErrors()) {
      // if (checkErrors()) {
      const finalData = {
        clientName: clientName,
        clientBelongsToId: clientsId ? clientsId : null,
        clientBelongsToName: clientsName,
        clientEmail: clientEmail,
        clientBillingEmail: clientBillingEmail,
        clientContactNo1: clientContactNo1,
        clientContactNo2: clientContactNo2,
        clientAddress: clientAddress,
        clientCountry: clientCountry,
        clientCurrency: clientCurrency,
        clientFolderName: clientFolderName,
        clientType: clientType.value,
        clientCompanyName: clientCompanyName,
        paymentId: paymentId,
        paymentModeName: paymentname,
        clientCompanyFounderName: clientCompanyFounderName,
        clientWebsite: clientWebsite,
        standardInstruction: standardInstruction,
        clientEnteredById: user._id,
      };

      AddClient(finalData);
      setFormData({
        ...formData,

        isSubmitted: true,
      });
    }
  };
  if (isSubmitted) {
    return <Redirect to="/all-clients" />;
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
              <h5 className="heading_color"> Quotation </h5>
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
          <div className="col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="row card-new ">
              <div className="col-lg-4 col-md-6 col-sm-6 col-12 py-2">
                <label className="label-control">Quotation No:</label>
                <input
                  type="text"
                  name="clientCompanyFounderName"
                  value={clientCompanyFounderName}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6 col-12 py-2">
                <label className="label-control">Quotation Date :</label>
                <input
                  type="date"
                  placeholder="dd/mm/yyyy"
                  className="form-control cpp-input datevalidation"
                  name="projectDate"
                  // value={startprojectDate}
                  //onChange={(e) => onDateChange(e)}
                  style={{
                    width: "100%",
                  }}
                  required
                />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6 col-12 py-2">
                <label className="label-control">Client From :</label>
                <Select
                  name="clientName"
                  options={allclientBelongsTo}
                  isSearchable={true}
                  value={clients}
                  placeholder="Select Mode"
                  onChange={(e) => onBelongstoChange(e)}
                />
              </div>
              <br />
              <div className="row card-new col-lg-12 col-md-11 col-sm-12 col-12 ">
                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                  <label className="label-control">From* :</label>
                  <Select
                    name="clientName"
                    options={allclientBelongsTo}
                    isSearchable={true}
                    value={clients}
                    placeholder="Select Mode"
                    onChange={(e) => onBelongstoChange(e)}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                  <label className="label-control">For :</label>
                  <input
                    type="text"
                    name="clientEmail"
                    value={clientEmail}
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>

                <div className="col-lg-6 col-md-6 col-sm-6 col-12  py-2">
                  <textarea
                    name="clientAddress"
                    id="clientAddress"
                    className="textarea form-control"
                    rows="4"
                    placeholder="From Address"
                    style={{ width: "100%" }}
                    value={clientAddress}
                    onChange={(e) => onInputChange(e)}
                  ></textarea>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-12  py-2">
                  <textarea
                    name="clientAddress"
                    id="clientAddress"
                    className="textarea form-control"
                    rows="4"
                    placeholder="To Address"
                    style={{ width: "100%" }}
                    value={clientAddress}
                    onChange={(e) => onInputChange(e)}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 col-12 ">
            {/* <form onSubmit={(e) =>Add(e)}> */}
            <div className="row card-new ">
              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                <h5>Item Info</h5>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                <label>Item :</label>
                <input
                  type="text"
                  name="clientCompanyFounderName"
                  value={clientCompanyFounderName}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                <label>GST :</label>
                <input
                  type="text"
                  name="clientCompanyFounderName"
                  value={clientCompanyFounderName}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                <label>Rate :</label>
                <input
                  type="text"
                  name="clientCompanyFounderName"
                  value={clientCompanyFounderName}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                <label className="label-control">Qty :</label>
                <input
                  type="text"
                  name="clientCompanyFounderName"
                  value={clientCompanyFounderName}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                <label className="label-control">Amt :</label>
                <input
                  type="text"
                  name="clientCompanyFounderName"
                  value={clientCompanyFounderName}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                <label className="label-control">CGST :</label>
                <input
                  type="text"
                  name="clientCompanyFounderName"
                  value={clientCompanyFounderName}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>

              <div className="col-lg-4 col-md-6 col-sm-6 col-12 ">
                <label className="label-control">SGST :</label>
                <input
                  type="text"
                  name="clientCompanyFounderName"
                  value={clientCompanyFounderName}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>

              <div className="col-lg-4 col-md-6 col-sm-6 col-12 ">
                <label className="label-control">Discount :</label>
                <input
                  type="text"
                  name="clientCompanyFounderName"
                  value={clientCompanyFounderName}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                <label className="label-control"></label>
                <button
                  variant="success"
                  className="btn sub_form btn_continue Save "
                  //   onClick={(e) => onAdd(e)}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-12 py-2">
            <div
              className="row card-new"
              style={{ height: "340px", overflowY: "scroll" }}
            >
              <table
                className="tabllll table table-bordered table-striped table-hover"
                id="datatable2"
              >
                <thead>
                  <tr>
                    <th>Staff Name</th>
                    <th>Region</th>
                    <th>Phone Number</th>
                    <th>Email Id</th>
                    <th>Designation</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {AddedDetails &&
                    AddedDetails.map((AddDetail, idx) => {
                      return ( */}
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  {/* );
                    })} */}
                </tbody>
              </table>
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
                <input
                  type="submit"
                  name="Submit"
                  value="Submit"
                  className="btn sub_form btn_continue blackbrd Save float-right"
                />
              )}
              <Link
                className="btn sub_form btn_continue blackbrd float-right"
                to="/all-engaged-clients"
              >
                Cancel
              </Link>
            </div>
          </div>
          {/* </section> */}
        </form>
      </div>
    </Fragment>
  );
};

GenerateSctQuotation.propTypes = {
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  AddClient: PropTypes.func.isRequired,
  getALLPaymentMode: PropTypes.func.isRequired,
  getActiveClients: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  settings: state.settings,
  client: state.client,
});

export default connect(mapStateToProps, {
  getALLPaymentMode,
  getActiveClients,
  AddClient,
})(GenerateSctQuotation);
