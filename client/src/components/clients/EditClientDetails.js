import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import Spinner from "../layout/Spinner";
import { getALLPaymentMode } from "../../actions/settings";
import { getActiveClients, EditClient } from "../../actions/client";

const EditClientDetails = ({
  auth: { isAuthenticated, user, users, loading },
  // settings: { paymentMode },
  client: { activeClient },
  allClientdata,
  onEditModalChange,
  getALLPaymentMode,
  getActiveClients,
  EditClient,
}) => {
  useEffect(() => {
    getALLPaymentMode();
  }, [getALLPaymentMode]);
  useEffect(() => {
    getActiveClients();
  }, [getActiveClients]);
  //formData

  const clientTypeVal = [
    { value: "Regular", label: "Regular Client" },
    { value: "Test", label: "Test Client" },
  ];
  const [formData, setFormData] = useState({
    clientName:
      allClientdata && allClientdata.clientName ? allClientdata.clientName : "",
    clientEmail:
      allClientdata && allClientdata.clientEmail
        ? allClientdata.clientEmail
        : "",
    clientBillingEmail:
      allClientdata && allClientdata.clientBillingEmail
        ? allClientdata.clientBillingEmail
        : "",
    clientContactNo1:
      allClientdata && allClientdata.clientContactNo1
        ? allClientdata.clientContactNo1
        : "",

    clientContactNo2:
      allClientdata && allClientdata.clientContactNo2
        ? allClientdata.clientContactNo2
        : "",

    clientAddress:
      allClientdata && allClientdata.clientAddress
        ? allClientdata.clientAddress
        : "",

    clientCountry:
      allClientdata && allClientdata.clientCountry
        ? allClientdata.clientCountry
        : "",

    clientFolderName:
      allClientdata && allClientdata.clientFolderName
        ? allClientdata.clientFolderName
        : "",
    clientCurrency:
      allClientdata && allClientdata.clientCurrency
        ? allClientdata.clientCurrency
        : "",
    clientCompanyName:
      allClientdata && allClientdata.clientCompanyName
        ? allClientdata.clientCompanyName
        : "",
    clientCompanyFounderName:
      allClientdata && allClientdata.clientCompanyFounderName
        ? allClientdata.clientCompanyFounderName
        : "",
    clientWebsite:
      allClientdata && allClientdata.clientWebsite
        ? allClientdata.clientWebsite
        : "",

    clientType:
      allClientdata && allClientdata.clientType
        ? {
            value: allClientdata.clientType,
            label: allClientdata.clientType,
          }
        : "",

    paymentModeName:
      allClientdata && allClientdata.paymentModeName
        ? allClientdata.paymentModeName
        : "",

    standardInstruction:
      allClientdata && allClientdata.standardInstruction
        ? allClientdata.standardInstruction
        : "",

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
    clientType,
    clientFolderName,
    clientCurrency,
    clientCompanyName,
    clientCompanyFounderName,
    clientWebsite,
    standardInstruction,
  } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  let allPaymentModeData = JSON.parse(
    localStorage.getItem("allPaymentModeData")
  );
  // const allpaymentmodes = [];
  // allPaymentModeData &&
  //   allPaymentModeData.map((payment) =>
  //     allpaymentmodes.push({
  //       paymentId: payment._id,
  //       label: payment.paymentModeName,
  //       value: payment.paymentModeName,
  //     })
  //   );
  // const [paymentMode, setpaymentMode] = useState(
  //   allClientdata
  //     ? allpaymentmodes &&
  //         allpaymentmodes.filter(
  //           (x) => x.paymentId === allClientdata.paymentId
  //         )[0]
  //     : ""
  // );

  // if (!paymentMode && allpaymentmodes.length > 0) {
  //   setpaymentMode(
  //     allpaymentmodes && allClientdata
  //       ? allpaymentmodes &&
  //           allpaymentmodes.filter(
  //             (x) => x.value === allClientdata.paymentModeName
  //           )[0]
  //       : ""
  //   );
  // }
  // const [payment, getStateData] = useState(
  //   allClientdata
  //     ? allpaymentmodes &&
  //         allpaymentmodes.filter(
  //           (x) => x.paymentId === allClientdata.paymentId
  //         )[0]
  //     : ""
  // );

  // const [paymentId, setpaymentId] = useState("");
  // const [paymentModeName, setpaymentname] = useState("");

  // const onPayModeChange = (e) => {
  //   var paymentId = "";
  //   var paymentModeName = "";
  //   getStateData(e);
  //   paymentId = e.paymentId;
  //   paymentModeName = e.paymentModeName;
  //   setpaymentId(paymentId);
  //   setpaymentname(paymentModeName);

  // };

  ///////////////////////////////////////////////////////////////

  const allpaymentmodes = [];
  allPaymentModeData &&
    allPaymentModeData.map((payment) =>
      allpaymentmodes.push({
        paymentId: payment._id,
        label: payment.paymentModeName,
        value: payment.paymentModeName,
      })
    );

  const [payment, getStateData] = useState(
    allClientdata
      ? allpaymentmodes &&
          allpaymentmodes.filter(
            (x) => x.paymentId === allClientdata.paymentId
          )[0]
      : ""
  );

  const [paymentId, setpaymentId] = useState(allClientdata.paymentId);
  const [paymentModeName, setpaymentname] = useState(
    allClientdata.paymentModeName
  );

  const onPayModeChange = (e) => {
    var paymentId = "";
    var paymentModeName = "";
    getStateData(e);
    paymentId = e.paymentId;
    paymentModeName = e.value;
    setpaymentId(paymentId);
    setpaymentname(paymentModeName);
  };

  let allClientBelongsToData = JSON.parse(
    localStorage.getItem("allClientBelongsToData")
  );
  const allclientBelongsTo = [];
  allClientBelongsToData &&
    allClientBelongsToData.map((clients) =>
      allclientBelongsTo.push({
        clientsId: clients._id,
        label: clients.clientName,
        value: clients.clientName,
      })
    );

  const [clients, getclientsData] = useState(
    allClientdata
      ? allclientBelongsTo &&
          allclientBelongsTo.filter(
            (x) => x.value === allClientdata.clientBelongsToName
          )[0]
      : ""
  );
  const [clientsId, setclientsId] = useState(allClientdata.clientBelongsToId);
  const [clientsName, setclientsName] = useState(
    allClientdata.clientBelongsToName
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

  const onClientTypeChange = (e) => {
    //Required Validation starts
    // setError({
    //   ...error,
    //   TranscationIdChecker: true,
    //   TranscationIdErrorStyle: { color: "#000" },
    // });
    //Required Validation ends

    if (e) {
      setFormData({
        ...formData,
        clientType: e,
      });
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    // if (checkErrors()) {
    const finalData = {
      recordId: allClientdata ? allClientdata._id : "",
      clientName: clientName,
      clientCompanyName: clientCompanyName,
      clientCompanyFounderName: clientCompanyFounderName,
      clientWebsite: clientWebsite,
      clientEmail: clientEmail,
      clientBillingEmail: clientBillingEmail,
      clientContactNo1: clientContactNo1,
      clientContactNo2: clientContactNo2,
      clientFolderName: clientFolderName,
      clientBelongsToId: clientsId,
      clientBelongsToName: clientsName,
      clientType: clientType.value,
      clientAddress: clientAddress,
      clientCountry: clientCountry,
      clientCurrency: clientCurrency,
      paymentId: paymentId,
      paymentModeName: paymentModeName,
      standardInstruction: standardInstruction,
      allClientdata: allClientdata,
    };

    EditClient(finalData);
    onEditModalChange(true);
  };

  return !isAuthenticated || !user  ? (
    <Spinner />
  ) : (
    <Fragment>
      {" "}
      <form className="row" onSubmit={(e) => onSubmit(e)}>
        <div className="row col-lg-12 col-md-11 col-sm-12 col-12 ">
          <div className="col-lg-6 col-md-12 col-sm-12 col-12 py-3">
            <div className="row card-new  pb-3">
              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                <h5>Client Info </h5>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <label className="label-control">Client Name :</label>
                <input
                  type="text"
                  name="clientName"
                  value={clientName}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <label className="label-control">Company Name :</label>
                <input
                  type="text"
                  name="clientCompanyName"
                  value={clientCompanyName}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <label className="label-control">Founder Name :</label>
                <input
                  type="text"
                  name="clientCompanyFounderName"
                  value={clientCompanyFounderName}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <label className="label-control">Company Website :</label>
                <input
                  type="text"
                  name="clientWebsite"
                  value={clientWebsite}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <label className="label-control">Production Email :</label>
                <input
                  type="text"
                  name="clientEmail"
                  value={clientEmail}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <label className="label-control">Billing Email :</label>
                <input
                  type="text"
                  name="clientBillingEmail"
                  value={clientBillingEmail}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <label className="label-control">Client Contact 1 :</label>
                <input
                  type="Number"
                  name="clientContactNo1"
                  value={clientContactNo1}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  onKeyDown={(e) =>
                    (e.keyCode === 69 || e.keyCode === 190) &&
                    e.preventDefault()
                  }
                />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <label className="label-control">Client Contact 2 :</label>
                <input
                  type="Number"
                  name="clientContactNo2"
                  value={clientContactNo2}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  onKeyDown={(e) =>
                    (e.keyCode === 69 || e.keyCode === 190) &&
                    e.preventDefault()
                  }
                />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <label className="label-control">Client Folder Name* :</label>
                <input
                  type="text"
                  name="clientFolderName"
                  value={clientFolderName}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <label className="label-control">Belongs To :</label>
                <Select
                  name="clientName"
                  options={allclientBelongsTo}
                  isSearchable={true}
                  value={clients}
                  placeholder="Select Mode"
                  onChange={(e) => onBelongstoChange(e)}
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
                <label
                  className="label-control"
                  // style={TranscationIdErrorStyle}
                >
                  Client Type :
                </label>
                <Select
                  name="clientType"
                  options={clientTypeVal}
                  isSearchable={false}
                  value={clientType}
                  placeholder="Select Meeting Type"
                  onChange={(e) => onClientTypeChange(e)}
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
            </div>
          </div>

          <div className="row col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12 py-3 no_padding">
              <div className="row card-new pb-3">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <h5>Other Info </h5>
                </div>

                <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding ">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <label className="label-control">Address :</label>
                    <textarea
                      name="clientAddress"
                      id="clientAddress"
                      className="textarea form-control"
                      rows="3"
                      placeholder="Client Address"
                      style={{ width: "100%" }}
                      value={clientAddress}
                      onChange={(e) => onInputChange(e)}
                    ></textarea>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <label className="label-control">Country :</label>
                    <input
                      type="text"
                      name="clientCountry"
                      value={clientCountry}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <label className="label-control">Currency :</label>
                    <input
                      type="text"
                      name="clientCurrency"
                      value={clientCurrency}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <label className="label-control">Mode of Payment :</label>

                    <Select
                      name="paymentModeName"
                      options={allpaymentmodes}
                      isSearchable={true}
                      value={payment}
                      placeholder="Select Mode"
                      onChange={(e) => onPayModeChange(e)}
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
                </div>
              </div>

              <div className="row py-1"></div>
              <div className="row card-new pb-3 ">
                <div className="col-lg-12 col-md-6 col-sm-6 col-12">
                  <label className="label-control">
                    Standard Instruction :
                  </label>
                  <textarea
                    name="standardInstruction"
                    id="standardInstruction"
                    className="textarea form-control"
                    rows="5"
                    placeholder="Standard Instruction"
                    style={{ width: "100%" }}
                    value={standardInstruction}
                    onChange={(e) => onInputChange(e)}
                  ></textarea>
                </div>
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
              * Indicates mandatory fields, Please fill mandatory fields before
              Submit
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
                value="Update"
                className="btn sub_form btn_continue blackbrd Save float-right"
              />
            )}
          </div>
        </div>
      </form>
    </Fragment>
  );
};

EditClientDetails.propTypes = {
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  EditClient: PropTypes.func.isRequired,
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
  EditClient,
})(EditClientDetails);
