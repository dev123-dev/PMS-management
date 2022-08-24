import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { Redirect } from "react-router-dom";
import { addDctClientDetails } from "../../actions/dct";
import { getMarketingEmployee } from "../../actions/user";
import { getActiveCountry } from "../../actions/regions";
import { getALLPaymentMode } from "../../actions/settings";

const AddDctClients = ({
  auth: { isAuthenticated, user, users, loading },
  user: { marketingEmployees },
  settings: { paymentMode },
  regions: { activeCountry },
  addDctClientDetails,
  getALLPaymentMode,
  getActiveCountry,
  getMarketingEmployee,
}) => {
  useEffect(() => {
    getALLPaymentMode();
  }, [getALLPaymentMode]);
  useEffect(() => {
    getActiveCountry({ countryBelongsTo: "DCT" });
  }, [getActiveCountry]);
  useEffect(() => {
    getMarketingEmployee();
  }, [getMarketingEmployee]);

  const clientTypeVal = [
    { value: "Regular", label: "Regular Client" },
    { value: "Test", label: "Test Client" },
  ];
  //formData
  const [formData, setFormData] = useState({
    companyName: "",
    website: "",
    emailId: "",
    clientFolderName: "",
    clientEmail: "",
    billingEmail: "",
    clientCurrency: "",
    phone1: "",
    clientType: "",
    phone2: "",
    address: "",
    clientName: "",
    importantPoints: "",
    clientCompanyFounderName: "",
    isSubmitted: false,
  });

  const {
    clientCompanyFounderName,
    companyName,
    website,
    clientFolderName,
    emailId,
    clientEmail,
    billingEmail,
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

  const [country, getcountryData] = useState();
  const [countryId, setcountryID] = useState();

  const oncountryChange = (e) => {
    //Required Validation Starts
    setError({
      ...error,
      countrytypeIdChecker: true,
      countrytypeIdErrorStyle: { color: "#000" },
    });
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

  const [payment, getStateData] = useState("");
  const [paymentId, setpaymentId] = useState("");
  const [paymentModeName, setpaymentname] = useState("");
  const [error, setError] = useState({
    paymentmodeIdChecker: false,
    paymentmodeIdErrorStyle: {},
    clienttypeIdChecker: false,

    clienttypeIdErrorStyle: {},
    countrytypeIdChecker: false,
    countrytypeIdErrorStyle: {},
  });
  const {
    paymentmodeIdChecker,
    paymentmodeIdErrorStyle,
    clienttypeIdChecker,
    clienttypeIdErrorStyle,
    countrytypeIdChecker,
    countrytypeIdErrorStyle,
  } = error;

  const checkErrors = () => {
    if (!clienttypeIdChecker) {
      setError({
        ...error,
        clienttypeIdErrorStyle: { color: "#F00" },
      });
      return false;
    }
    if (!countrytypeIdChecker) {
      setError({
        ...error,
        countrytypeIdErrorStyle: { color: "#F00" },
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
  const onPayModeChange = (e) => {
    //Required Validation starts
    setError({
      ...error,
      paymentmodeIdChecker: true,
      paymentmodeIdErrorStyle: { color: "#000" },
    });
    //Required Validation ends

    var paymentId = "";
    var paymentModeName = "";
    getStateData(e);
    paymentId = e.paymentId;
    paymentModeName = e.value;
    setpaymentId(paymentId);
    setpaymentname(paymentModeName);
  };

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

  const allemp = [];
  marketingEmployees &&
    marketingEmployees.map((emp) =>
      allemp.push({
        empId: emp._id,
        label: emp.empFullName,
        value: emp.empFullName,
      })
    );

  const [emp, getempData] = useState();
  const [empId, setempID] = useState(user && user._id);
  const [empName, setNameID] = useState(user && user.empFullName);
  const onempChange = (e) => {
    // //Required Validation Starts
    // setError({
    //   ...error,
    //   sIdChecker: true,
    //   sIdErrorStyle: { color: "#000" },
    // });
    // //Required Validation ends
    var empId = "";
    var empName = "";
    getempData(e);
    empId = e.empId;
    empName = e.value;
    setempID(empId);
    setNameID(empName);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (checkErrors()) {
      const finalData = {
        companyName: companyName,
        website: website,
        clientName: clientName,
        clientCompanyFounderName: clientCompanyFounderName,
        emailId: emailId,
        clientEmail: clientEmail,
        clientType: clientType.value,
        billingEmail: billingEmail,
        clientCurrency: clientCurrency,
        clientFolderName: clientFolderName,
        phone1: phone1,
        phone2: phone2,
        paymentId: paymentId,
        paymentModeName: paymentModeName,
        address: address,
        importantPoints: importantPoints,
        countryId: countryId ? countryId : null,
        countryName: country.value ? country.value : null,
        dctClientStatus: "Active",
        dctClientCategory: clientType.value === "Test" ? "TC" : "RC",
        dctCallDate: new Date().toISOString().split("T")[0],
        services: ServicesDetails,
        staffs: AddedDetails,
        dctClientEnteredById: user._id,
        dctClientEnteredByName: user.empFullName,
        dctClientAssignedToId: empId,
        dctClientAssignedToName: empName,
      };
      addDctClientDetails(finalData);
      setFormData({
        ...formData,

        isSubmitted: true,
      });
    }
  };

  if (isSubmitted) {
    return <Redirect to="/all-dct-client" />;
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
      <div className="container container_align">
        <form className="row" onSubmit={(e) => onSubmit(e)}>
          <div className="col-lg-12 col-md-11 col-sm-12 col-12">
            {/* <h2 className="heading_color">Add DCT Clients</h2> */}
            <br />
          </div>
          <section className="sub_reg">
            <div className="row col-lg-12 col-md-11 col-sm-12 col-12 ">
              <div className="col-lg-12 col-md-12 col-sm-12 col-12 ">
                <div className="row card-new ">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <h2 className="heading_color">Add DCT Clients</h2>
                    <hr />
                    <h5>Company Info</h5>
                  </div>

                  <div className="col-lg-3 col-md-6 col-sm-6 col-12 ">
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
                    <label
                      className="label-control"
                      style={clienttypeIdErrorStyle}
                    >
                      Client Type* :
                    </label>
                    <Select
                      name="clientType"
                      options={clientTypeVal}
                      isSearchable={false}
                      value={clientType}
                      placeholder="Select Client Type"
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
                    <label className="label-control">
                      Client Folder Name* :
                    </label>
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
                    <label
                      className="label-control"
                      style={countrytypeIdErrorStyle}
                    >
                      Region* :
                    </label>
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
                    <label
                      className="label-control"
                      style={paymentmodeIdErrorStyle}
                    >
                      Mode of Payment* :
                    </label>

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
                  {(user.userGroupName &&
                    user.userGroupName === "Administrator") ||
                  user.userGroupName === "Super Admin" ? (
                    <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                      <label className="label-control">Assigned To :</label>
                      <Select
                        name="empFullName"
                        options={allemp}
                        isSearchable={true}
                        value={emp}
                        placeholder="Select"
                        onChange={(e) => onempChange(e)}
                        required
                      />
                    </div>
                  ) : (
                    <></>
                  )}
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
                  <div className="col-lg-3 col-md-6 col-sm-6 col-12"></div>

                  <div className="col-lg-1 col-md-6 col-sm-6 col-12">
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
                      placeholder="Important Points"
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
                  to="/all-dct-client"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </section>
        </form>
      </div>
    </Fragment>
  );
};

AddDctClients.propTypes = {
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  regions: PropTypes.object.isRequired,
  getALLPaymentMode: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  settings: state.settings,
  client: state.client,
  regions: state.regions,
});

export default connect(mapStateToProps, {
  addDctClientDetails,
  getALLPaymentMode,
  getActiveCountry,
  getMarketingEmployee,
})(AddDctClients);
