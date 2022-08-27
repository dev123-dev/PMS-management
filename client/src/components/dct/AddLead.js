import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { Redirect } from "react-router-dom";
import { addDctLeadDetails, getLeadsList } from "../../actions/dct";
import { getMarketingEmployee } from "../../actions/user";
import { getActiveCountry } from "../../actions/regions";

const AddLead = ({
  auth: { isAuthenticated, user, users, loading },
  user: { marketingEmployees },
  regions: { activeCountry },
  dct: { leadsList },
  addDctLeadDetails,
  getActiveCountry,
  getMarketingEmployee,
  getLeadsList,
}) => {
  useEffect(() => {
    getActiveCountry();
  }, [getActiveCountry]);
  useEffect(() => {
    getMarketingEmployee();
  }, [getMarketingEmployee]);
  useEffect(() => {
    getLeadsList();
  }, [getLeadsList]);

  // console.log("getLeadsList", leadsList);

  //formData
  const [formData, setFormData] = useState({
    companyName: "",
    website: "",
    emailId: "",
    phone1: "",
    phone2: "",
    countrycode: "",
    dctLeadAddress: "",
    clientName: "",
    importantPoints: "",
    isSubmitted: false,
  });

  const {
    companyName,
    website,
    emailId,
    phone1,
    phone2,
    clientName,
    dctLeadAddress,
    importantPoints,
    isSubmitted,
  } = formData;
  //
  //add staff start
  const [addData, setFormDatas] = useState({
    // idVal: 1,
    staffName: "",
    staffPhoneNumber: "",
    staffEmailId: "",
    staffDesignation: "",
    staffRegion: "",
    staffcountrycode: "",
  });

  const {
    staffName,
    staffPhoneNumber,
    staffEmailId,
    staffDesignation,
    staffRegion,
  } = addData;

  const [error1, setError1] = useState({
    nametypeIdChecker: false,
    nametypeIdErrorStyle: {},
  });
  const { nametypeIdChecker, nametypeIdErrorStyle } = error1;
  const checkErrorscontact = () => {
    if (!nametypeIdChecker) {
      setError1({
        ...error1,
        nametypeIdErrorStyle: { color: "#F00" },
      });
      return false;
    }

    return true;
  };
  const [AddedDetails, AddDetails] = useState([]);

  const onAdd = (e) => {
    const staffList = AddedDetails.filter(
      (AddDetails) => AddDetails.staffName === staffName
    );

    e.preventDefault();
    if (staffList.length === 0) {
      if (checkErrorscontact()) {
        const addData = {
          // id: idVal,
          staffName: staffName,
          staffPhoneNumber: staffPhoneNumber,
          staffEmailId: staffEmailId,
          staffDesignation: staffDesignation,
          staffRegion: staffcountryname,
          staffRegionId: staffcountryId,
          staffCountryCode: staffcountrycode,
        };
        setFormDatas({
          ...addData,
          staffName: "",
          staffPhoneNumber: "",
          staffEmailId: "",
          staffDesignation: "",
          staffRegion: "",
          staffCountryCode: "",
        });
        setstaffcountrycode("");
        getstaffcountryData("");
        let temp = [];
        temp.push(...AddedDetails, addData);
        AddDetails(temp);
      }
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
  activeCountry &&
    activeCountry.map((country) =>
      allcountry.push({
        countryId: country._id,
        countrycode: country.countryCode,
        label: country.countryName + " (" + country.countryCode + ")",
        value: country.countryName,
      })
    );

  const [country, getcountryData] = useState();
  const [countryId, setcountryID] = useState();
  const [countrycode, setcountrycode] = useState();
  const oncountryChange = (e) => {
    // //Required Validation Starts
    setError({
      ...error,
      countrytypeIdChecker: true,
      countrytypeIdErrorStyle: { color: "#000" },
    });
    // //Required Validation ends
    var countryId = "";
    var countrycode = "";
    getcountryData(e);
    countrycode = e.countrycode;
    countryId = e.countryId;
    setcountryID(countryId);
    setcountrycode(countrycode);
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
    setError({
      ...error,
      AssignedtypeIdChecker: true,
      AssignedtypeIdErrorStyle: { color: "#000" },
    });
    // //Required Validation ends
    var empId = "";
    var empName = "";
    getempData(e);
    empId = e.empId;
    empName = e.value;
    setempID(empId);
    setNameID(empName);
  };

  const allstaffcountry = [];
  activeCountry &&
    activeCountry.map((staffcountry) =>
      allstaffcountry.push({
        staffcountryId: staffcountry._id,
        staffcountrycode: staffcountry.countryCode,
        label: staffcountry.countryName + " (" + staffcountry.countryCode + ")",
        value: staffcountry.countryName,
      })
    );

  const [staffcountry, getstaffcountryData] = useState();
  const [staffcountryId, setstaffcountryID] = useState();
  const [staffcountrycode, setstaffcountrycode] = useState();
  const [staffcountryname, setstaffcountryname] = useState();
  const onstaffcountryChange = (e) => {
    // //Required Validation Starts
    // setError({
    //   ...error,
    //   sIdChecker: true,
    //   sIdErrorStyle: { color: "#000" },
    // });
    // //Required Validation ends
    var staffcountryId = "";
    var staffcountrycode = "";
    var staffcountryname = "";
    getstaffcountryData(e);
    staffcountrycode = e.staffcountrycode;
    staffcountryId = e.staffcountryId;
    staffcountryname = e.value;
    setstaffcountryname(staffcountryname);
    setstaffcountryID(staffcountryId);
    setstaffcountrycode(staffcountrycode);
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

  const [error, setError] = useState({
    countrytypeIdChecker: false,
    countrytypeIdErrorStyle: {},
    AssignedtypeIdChecker: false,
    AssignedtypeIdErrorStyle: {},

    repwdValChecker: false,
    repwdValResult: "",
    repwdValStyle: {},
    repwdInptErrStyle: {},
  });
  const {
    countrytypeIdChecker,
    countrytypeIdErrorStyle,
    AssignedtypeIdChecker,
    AssignedtypeIdErrorStyle,

    repwdValChecker,
    repwdValResult,
    repwdValStyle,
    repwdInptErrStyle,
  } = error;

  const checkErrors = () => {
    if (!countrytypeIdChecker) {
      setError({
        ...error,
        countrytypeIdErrorStyle: { color: "#F00" },
      });
      return false;
    }
    if (user.empCtAccess === "All") {
      if (!AssignedtypeIdChecker) {
        setError({
          ...error,
          AssignedtypeIdErrorStyle: { color: "#F00" },
        });
        return false;
      }
    }

    return true;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (checkErrors()) {
      const finalData = {
        companyName: companyName,
        website: website,
        clientName: clientName,
        emailId: emailId,
        phone1: phone1,
        phone2: phone2,
        dctLeadAddress: dctLeadAddress,
        importantPoints: importantPoints,
        countryId: countryId ? countryId : null,
        countryName: country.value ? country.value : null,
        dctLeadStatus: "Active",
        dctLeadCategory: "NL",
        dctCallDate: new Date().toISOString().split("T")[0],
        services: ServicesDetails,
        staffs: AddedDetails,
        dctLeadEnteredById: user._id,
        dctLeadEnteredByName: user.empFullName,
        dctLeadAssignedToId: empId,
        dctLeadAssignedToName: empName,
      };
      addDctLeadDetails(finalData);
      setFormData({
        ...formData,
        companyName: "",
        emailId: "",
        clientName: "",
        website: "",
        address: "",
        phone1: "",
        phone2: "",
        importantPoints: "",
        countryId: "",
        isSubmitted: true,
      });
    }
  };

  if (isSubmitted) {
    return <Redirect to="/all-leads" />;
  }
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onleadCheck = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    var arr = e.target.value.split(".");
    const listWebsite = leadsList.filter(
      (leadsList) => leadsList.website.split(".")[1] === arr[1]
    );
    if (e.target.value === "") {
      setError({
        ...error,
        repwdValChecker: false,
        repwdValResult: "",
        repwdValStyle: {},
        repwdInptErrStyle: {},
      });
    } else if (listWebsite.length > 0) {
      setError({
        ...error,
        repwdValChecker: true,
        repwdValResult: "Exist",
        repwdValStyle: { color: "#FF0000", marginTop: "30px" },
        repwdInptErrStyle: { border: "1px solid #FF0000" },
      });
    } else {
      setError({
        ...error,
        repwdValChecker: true,
        repwdValResult: "Not Exist",
        repwdValStyle: { color: "#43b90f", marginTop: "30px" },
        repwdInptErrStyle: { border: "1px solid #43b90f" },
      });
    }
  };

  const onInputChange2 = (e) => {
    setError1({
      ...error1,
      nametypeIdChecker: true,
      nametypeIdErrorStyle: { color: "#000" },
    });
    setFormDatas({ ...addData, [e.target.name]: e.target.value });
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
            <h2 className="heading_color">Add Lead</h2>
            <hr />
          </div>
          <section className="sub_reg">
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
                    <label className="label-control">Website Name* :</label>
                    <input
                      type="text"
                      name="website"
                      value={website}
                      style={repwdInptErrStyle}
                      className="form-control"
                      // onChange={(e) => onInputChange(e)}
                      onChange={(e) => onleadCheck(e)}
                      required
                    />
                    {repwdValChecker && (
                      <Fragment>
                        <span
                          className="form-input-info positioning"
                          style={repwdValStyle}
                        >
                          {repwdValResult}
                        </span>
                      </Fragment>
                    )}
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
                    <label className="label-control">Important Points :</label>
                    <input
                      type="text"
                      name="importantPoints"
                      value={importantPoints}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>

                  <div className="row col-lg-12 col-md-6 col-sm-6 col-12 no_padding">
                    {user.empCtAccess && user.empCtAccess === "All" ? (
                      <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                        <label
                          className="label-control"
                          style={AssignedtypeIdErrorStyle}
                        >
                          Assigned To :
                        </label>
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
                    <div className="col-lg-1 col-md-6 col-sm-6 col-12">
                      <label className="label-control">Services :</label>
                    </div>
                    <div className="col-lg-1 col-md-6 col-sm-6 col-12">
                      <label className="label-control">Imaging</label>
                      <input
                        type="checkbox"
                        id="serviceCheckbox"
                        value="Imaging"
                        onChange={(e) => onServicesChange(e)}
                      />
                    </div>
                    <div className="col-lg-1 col-md-6 col-sm-6 col-12">
                      <label className="label-control">CGI</label>
                      <input
                        type="checkbox"
                        id="serviceCheckbox"
                        value="CGI"
                        onChange={(e) => onServicesChange(e)}
                      />
                    </div>
                    <div className="col-lg-1 col-md-6 col-sm-6 col-12">
                      <label className="label-control">Video Editing</label>
                      <input
                        type="checkbox"
                        id="serviceCheckbox"
                        value="videoEditing"
                        onChange={(e) => onServicesChange(e)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6  col-md-6 col-sm-6 col-12 py-2">
                    <label className="label-control">Address :</label>
                    <textarea
                      name="dctLeadAddress"
                      id="dctLeadAddress"
                      className="textarea form-control"
                      rows="3"
                      placeholder=" Address"
                      style={{ width: "100%" }}
                      value={dctLeadAddress}
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
                    <label
                      className="label-control"
                      style={nametypeIdErrorStyle}
                    >
                      Staff Name*:
                    </label>
                    <input
                      type="text"
                      name="staffName"
                      value={staffName}
                      className="form-control"
                      onChange={(e) => onInputChange2(e)}
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
                  <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                    <label className="label-control">Region* :</label>
                    <Select
                      name="countryName"
                      options={allstaffcountry}
                      isSearchable={true}
                      value={staffcountry}
                      placeholder="Select Region"
                      onChange={(e) => onstaffcountryChange(e)}
                    />
                  </div>
                  <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                    <label className="label-control">Staff Phone:</label>
                    <input
                      type="number"
                      name="staffcountrycode"
                      value={staffcountrycode}
                      className="form-control"
                      style={{ width: "50px" }}
                      disabled
                    />
                  </div>

                  <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                    <label className="label-control">
                      <br />
                    </label>
                    <input
                      type="number"
                      name="staffPhoneNumber"
                      value={staffPhoneNumber}
                      className="form-control"
                      onChange={(e) => onInputChange1(e)}
                      style={{ marginLeft: "-6em", width: "22vh" }}
                      onKeyDown={(e) =>
                        (e.keyCode === 69 || e.keyCode === 190) &&
                        e.preventDefault()
                      }
                    />
                  </div>
                  {/* <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <label className="label-control">Staff Phone</label>
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
                  </div> */}

                  {/* <div className="col-lg-6 col-md-6 col-sm-6 col-12"> */}
                  <div className="col-lg-4 col-md-6 col-sm-6 col-12">
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
                        <th>Region</th>
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
                              <td>{AddDetail.staffRegion}</td>
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
                  to="/all-leads"
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

AddLead.propTypes = {
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  regions: PropTypes.object.isRequired,
  dct: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  settings: state.settings,
  client: state.client,
  regions: state.regions,
  dct: state.dct,
});

export default connect(mapStateToProps, {
  addDctLeadDetails,
  getActiveCountry,
  getMarketingEmployee,
  getLeadsList,
})(AddLead);
