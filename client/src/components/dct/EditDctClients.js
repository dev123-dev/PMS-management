/* eslint-disable no-undef */
import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { Redirect } from "react-router-dom";
import { editDctClientsDetails } from "../../actions/dct";
import { getActiveCountry } from "../../actions/regions";
import { getALLPaymentMode } from "../../actions/settings";

const EditDctClients = ({
  auth: { isAuthenticated, user, users, loading },
  settings: { paymentMode },
  regions: { activeCountry },
  editDctClientsDetails,
  getALLPaymentMode,
  getActiveCountry,
  onEditModalChange,
  alldctClientdata,
}) => {
  useEffect(() => {
    getALLPaymentMode();
  }, [getALLPaymentMode]);
  useEffect(() => {
    getActiveCountry();
  }, [getActiveCountry]);

  const clientTypeVal = [
    { value: "Regular", label: "Regular Client" },
    { value: "Test", label: "Test Client" },
  ];
  //formData
  const [formData, setFormData] = useState({
    clientName:
      alldctClientdata && alldctClientdata.clientName
        ? alldctClientdata.clientName
        : "",
    emailId:
      alldctClientdata && alldctClientdata.emailId
        ? alldctClientdata.emailId
        : "",
    billingEmail:
      alldctClientdata && alldctClientdata.billingEmail
        ? alldctClientdata.billingEmail
        : "",
    phone1:
      alldctClientdata && alldctClientdata.phone1
        ? alldctClientdata.phone1
        : "",

    importantPoints:
      alldctClientdata && alldctClientdata.importantPoints
        ? alldctClientdata.importantPoints
        : "",

    clientEmail:
      alldctClientdata && alldctClientdata.clientEmail
        ? alldctClientdata.clientEmail
        : "",

    phone2:
      alldctClientdata && alldctClientdata.phone2
        ? alldctClientdata.phone2
        : "",

    address:
      alldctClientdata && alldctClientdata.address
        ? alldctClientdata.address
        : "",

    clientCountry:
      alldctClientdata && alldctClientdata.clientCountry
        ? alldctClientdata.clientCountry
        : "",

    clientFolderName:
      alldctClientdata && alldctClientdata.clientFolderName
        ? alldctClientdata.clientFolderName
        : "",
    clientCurrency:
      alldctClientdata && alldctClientdata.clientCurrency
        ? alldctClientdata.clientCurrency
        : "",
    companyName:
      alldctClientdata && alldctClientdata.companyName
        ? alldctClientdata.companyName
        : "",
    clientCompanyFounderName:
      alldctClientdata && alldctClientdata.clientCompanyFounderName
        ? alldctClientdata.clientCompanyFounderName
        : "",
    website:
      alldctClientdata && alldctClientdata.website
        ? alldctClientdata.website
        : "",

    clientType:
      alldctClientdata && alldctClientdata.clientType
        ? {
            value: alldctClientdata.clientType,
            label: alldctClientdata.clientType,
          }
        : "",

    paymentModeName:
      alldctClientdata && alldctClientdata.paymentModeName
        ? alldctClientdata.paymentModeName
        : "",

    standardInstruction:
      alldctClientdata && alldctClientdata.standardInstruction
        ? alldctClientdata.standardInstruction
        : "",

    isSubmitted: false,
  });

  const {
    clientCompanyFounderName,
    companyName,
    website,
    emailId,
    clientEmail,
    billingEmail,
    clientFolderName,
    clientCurrency,
    phone1,
    clientType,
    phone2,
    clientName,
    address,
    importantPoints,
    isSubmitted,
  } = formData;

  //add staff start
  const [addData, setFormDatas] = useState({
    staffName: "",
    staffPhoneNumber: "",
    staffEmailId: "",
    staffDesignation: "",
  });

  const { staffName, staffPhoneNumber, staffEmailId, staffDesignation } =
    addData;

  const [AddedDetails, AddDetails] = useState([]);

  const onAdd = (e) => {
    const staffList = AddedDetails.filter(
      (AddDetails) => AddDetails.staffName === staffName
    );

    e.preventDefault();
    if (staffList.length === 0) {
      const addData = {
        staffName: staffName,
        staffPhoneNumber: staffPhoneNumber,
        staffEmailId: staffEmailId,
        staffDesignation: staffDesignation,
      };
      setFormDatas({
        ...addData,

        staffName: "",
        staffPhoneNumber: "",
        staffEmailId: "",
        staffDesignation: "",
      });
      let temp = [];
      temp.push(...AddedDetails, addData);
      AddDetails(temp);
    }
  };
  const onRemoveChange = (staffName) => {
    const removeList = AddedDetails.filter(
      (AddDetails) => AddDetails.staffName !== staffName
    );
    AddDetails(removeList);
  };
  //add staff end
  const allcountry = [];
  activeCountry.map((country) =>
    allcountry.push({
      countryId: country._id,
      label: country.countryName,
      value: country.countryName,
    })
  );

  const [country, getcountryData] = useState(
    alldctClientdata
      ? allcountry &&
          allcountry.filter(
            (x) => x.countryId === alldctClientdata.countryId
          )[0]
      : ""
  );
  const [countryId, setcountryID] = useState(alldctClientdata.countryId);

  const oncountryChange = (e) => {
    //Required Validation Starts
    // setError({
    //   ...error,
    //   countrytypeIdChecker: true,
    //   countrytypeIdErrorStyle: { color: "#000" },
    // });
    //Required Validation ends
    var countryId = "";
    getcountryData(e);
    countryId = e.countryId;
    setcountryID(countryId);
  };

  const [ServicesDetails, SetServiceDetails] = useState([]);

  const onServicesChange = (e) => {
    let temp = [];
    const staffList = ServicesDetails.filter(
      (ServicesDetails) => ServicesDetails === e.target.value
    );
    if (staffList.length === 0) {
      temp.push(...ServicesDetails, e.target.value);
      SetServiceDetails(temp);
    } else {
      const removeList = ServicesDetails.filter(
        (ServicesDetails) => ServicesDetails !== e.target.value
      );
      SetServiceDetails(removeList);
    }
  };
  const allpaymentmodes = [];
  paymentMode.map((payment) =>
    allpaymentmodes.push({
      paymentId: payment._id,
      label: payment.paymentModeName,
      value: payment.paymentModeName,
    })
  );

  const [payment, getStateData] = useState(
    alldctClientdata
      ? allpaymentmodes &&
          allpaymentmodes.filter(
            (x) => x.paymentId === alldctClientdata.paymentId
          )[0]
      : ""
  );
  const [paymentId, setpaymentId] = useState(alldctClientdata.paymentId);
  const [paymentModeName, setpaymentname] = useState(
    alldctClientdata.paymentModeName
  );

  const onPayModeChange = (e) => {
    //Required Validation starts
    // setError({
    //   ...error,
    //   paymentmodeIdChecker: true,
    //   paymentmodeIdErrorStyle: { color: "#000" },
    // });
    //Required Validation ends

    var paymentId = "";
    var paymentModeName = "";
    getStateData(e);
    paymentId = e.paymentId;
    paymentModeName = e.value;
    setpaymentId(paymentId);
    setpaymentname(paymentModeName);
  };

  // const [error, setError] = useState({
  //   paymentmodeIdChecker: false,
  //   paymentmodeIdErrorStyle: {},
  //   clienttypeIdChecker: false,

  //   clienttypeIdErrorStyle: {},
  //   countrytypeIdChecker: false,
  //   countrytypeIdErrorStyle: {},
  // });
  // const {
  //   paymentmodeIdChecker,
  //   paymentmodeIdErrorStyle,
  //   clienttypeIdChecker,
  //   clienttypeIdErrorStyle,
  //   countrytypeIdChecker,
  //   countrytypeIdErrorStyle,
  // } = error;

  // const checkErrors = () => {
  //   if (!clienttypeIdChecker) {
  //     setError({
  //       ...error,
  //       clienttypeIdErrorStyle: { color: "#F00" },
  //     });
  //     return false;
  //   }
  //   if (!countrytypeIdChecker) {
  //     setError({
  //       ...error,
  //       countrytypeIdErrorStyle: { color: "#F00" },
  //     });
  //     return false;
  //   }
  //   if (!paymentmodeIdChecker) {
  //     setError({
  //       ...error,
  //       paymentmodeIdErrorStyle: { color: "#F00" },
  //     });
  //     return false;
  //   }

  //   return true;
  // };

  const onClientTypeChange = (e) => {
    //  Required Validation starts
    // setError({
    //   ...error,
    //   clienttypeIdChecker: true,
    //   clienttypeIdErrorStyle: { color: "#000" },
    // });
    // Required Validation ends

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
      recordId: alldctClientdata ? alldctClientdata._id : "",
      companyName: companyName,
      website: website,
      clientName: clientName,
      clientCompanyFounderName: clientCompanyFounderName,
      emailId: emailId,
      clientEmail: clientEmail,
      clientType: clientType.value,
      billingEmail: billingEmail,
      clientCurrency: clientCurrency,
      phone1: phone1,
      phone2: phone2,
      paymentId: paymentId,
      clientFolderName: clientFolderName,
      paymentModeName: paymentModeName,
      address: address,
      importantPoints: importantPoints,
      countryId: countryId ? countryId : null,
      countryName: country.value ? country.value : null,
      dctClientStatus: "Active",
      dctClientCategory: "TC",
      dctCallDate: new Date().toISOString().split("T")[0],
      services: ServicesDetails,
      staffs: AddedDetails,
      dctClientEditedById: user._id,
      dctClientEditedDateTime: new Date().toLocaleString("en-GB"),
    };
    console.log(finalData);
    editDctClientsDetails(finalData);
    onEditModalChange(true);
    // }
  };

  if (isSubmitted) {
    return <Redirect to="/all-prospects" />;
  }
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onInputChange1 = (e) => {
    setFormDatas({ ...addData, [e.target.name]: e.target.value });
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      {/* <div className="container container_align"> */}
      <form className="row" onSubmit={(e) => onSubmit(e)}>
        {/* <section className="sub_reg"> */}
        <div className="row col-lg-12 col-md-11 col-sm-12 col-12 ">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12 ">
            <div className="row card-new ">
              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                <h5>Company Info</h5>
              </div>

              <div className="col-lg-3 col-md-11 col-sm-12 col-12 ">
                <label className="label-control">Company Name* :</label>
                <input
                  type="text"
                  name="companyName"
                  value={companyName}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                <label className="label-control">Website* :</label>
                <input
                  type="text"
                  name="website"
                  value={website}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                <label className="label-control">Client Type* :</label>
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

              <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                <label className="label-control">Founder Name* :</label>
                <input
                  type="text"
                  name="clientCompanyFounderName"
                  value={clientCompanyFounderName}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>

              <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                <label className="label-control">Email Id* :</label>
                <input
                  type="text"
                  name="emailId"
                  value={emailId}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                <label className="label-control">Production Email :</label>
                <input
                  type="text"
                  name="clientEmail"
                  value={clientEmail}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                <label className="label-control">Billing Email :</label>
                <input
                  type="text"
                  name="billingEmail"
                  value={billingEmail}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                <label className="label-control">Phone 1 :</label>
                <input
                  type="number"
                  name="phone1"
                  value={phone1}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  onKeyDown={(e) =>
                    (e.keyCode === 69 || e.keyCode === 190) &&
                    e.preventDefault()
                  }
                />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                <label className="label-control">Phone 2 :</label>
                <input
                  type="number"
                  name="phone2"
                  value={phone2}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  onKeyDown={(e) =>
                    (e.keyCode === 69 || e.keyCode === 190) &&
                    e.preventDefault()
                  }
                />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                <label className="label-control">Client Name:</label>
                <input
                  type="text"
                  name="clientName"
                  value={clientName}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col-12">
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
              <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                <label className="label-control">Region* :</label>
                <Select
                  name="countryName"
                  options={allcountry}
                  isSearchable={true}
                  value={country}
                  placeholder="Select Region"
                  onChange={(e) => oncountryChange(e)}
                  required
                />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                <label className="label-control">Mode of Payment* :</label>

                <Select
                  name="paymentMode"
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
              <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                <label className="label-control">Currency :</label>
                <input
                  type="text"
                  name="clientCurrency"
                  value={clientCurrency}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-12"></div>
              <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                <label className="label-control">Services :</label>
              </div>
              <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                <label className="label-control">Imaging</label>
                <input
                  type="checkbox"
                  id="Unconfirmed"
                  value="Imaging"
                  onChange={(e) => onServicesChange(e)}
                />
              </div>
              <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                <label className="label-control">CGI</label>
                <input
                  type="checkbox"
                  id="Unconfirmed"
                  value="CGI"
                  onChange={(e) => onServicesChange(e)}
                />
              </div>
              <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                <label className="label-control">Video Editing</label>
                <input
                  type="checkbox"
                  id="Unconfirmed"
                  value="videoEditing"
                  onChange={(e) => onServicesChange(e)}
                />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-12 py-2">
                <label className="label-control">Important Points :</label>
                <textarea
                  name="importantPoints"
                  id="importantPoints"
                  className="textarea form-control"
                  rows="3"
                  placeholder="importantPoints"
                  style={{ width: "100%" }}
                  value={importantPoints}
                  onChange={(e) => onInputChange(e)}
                ></textarea>
              </div>

              <div className="col-lg-6 col-md-6 col-sm-6 col-12 py-2">
                <label className="label-control">Address :</label>
                <textarea
                  name="address"
                  id="address"
                  className="textarea form-control"
                  rows="3"
                  placeholder=" Address"
                  style={{ width: "100%" }}
                  value={address}
                  onChange={(e) => onInputChange(e)}
                ></textarea>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-12 col-sm-12 col-12 py-3">
            {/* <form onSubmit={(e) =>Add(e)}> */}
            <div className="row card-new  py-3">
              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                <h5>Contact Info</h5>
              </div>

              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <label className="label-control">Staff Name:</label>
                <input
                  type="text"
                  name="staffName"
                  value={staffName}
                  className="form-control"
                  onChange={(e) => onInputChange1(e)}
                />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <label className="label-control">Phone Number :</label>
                <input
                  type="number"
                  name="staffPhoneNumber"
                  value={staffPhoneNumber}
                  className="form-control"
                  onChange={(e) => onInputChange1(e)}
                  onKeyDown={(e) =>
                    (e.keyCode === 69 || e.keyCode === 190) &&
                    e.preventDefault()
                  }
                />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <label className="label-control">Email Id :</label>
                <input
                  type="text"
                  name="staffEmailId"
                  value={staffEmailId}
                  className="form-control"
                  onChange={(e) => onInputChange1(e)}
                />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <label className="label-control">Designation :</label>
                <input
                  type="text"
                  name="staffDesignation"
                  value={staffDesignation}
                  className="form-control"
                  onChange={(e) => onInputChange1(e)}
                />
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                {/* <input
                        type="submit"
                        name="Submit"
                        value="ADD"
                        className="btn sub_form btn_continue blackbrd Save float-right"
                      /> */}

                <button
                  variant="success"
                  className="btn sub_form btn_continue Save float-right"
                  onClick={(e) => onAdd(e)}
                >
                  Add
                </button>
              </div>
            </div>
            {/* </form> */}
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 col-12 py-3">
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
                    <th>Phone Number</th>
                    <th>Email Id</th>
                    <th>Designation</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {AddedDetails &&
                    AddedDetails.map((AddDetail, idx) => {
                      return (
                        <tr key={idx}>
                          <td>{AddDetail.staffName}</td>
                          <td>{AddDetail.staffPhoneNumber}</td>
                          <td>{AddDetail.staffEmailId}</td>
                          <td>{AddDetail.staffDesignation}</td>
                          <td>
                            <img
                              className="img_icon_size log"
                              onClick={() =>
                                onRemoveChange(AddDetail.staffName)
                              }
                              src={require("../../static/images/close-buttonRed.png")}
                              alt="Remove"
                              title="Remove"
                            />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
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
            <Link
              className="btn sub_form btn_continue blackbrd float-right"
              to="/job-queue"
            >
              Cancel
            </Link>
          </div>
        </div>
        {/* </section> */}
      </form>
      {/* </div> */}
    </Fragment>
  );
};

EditDctClients.propTypes = {
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  regions: PropTypes.object.isRequired,
  getALLPaymentMode: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  settings: state.settings,
  client: state.client,
  regions: state.regions,
});

export default connect(mapStateToProps, {
  editDctClientsDetails,
  getALLPaymentMode,
  getActiveCountry,
})(EditDctClients);
