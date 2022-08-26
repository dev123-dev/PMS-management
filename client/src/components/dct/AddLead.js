import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { Redirect } from "react-router-dom";
import { addDctLeadDetails } from "../../actions/dct";
import { getMarketingEmployee } from "../../actions/user";
import { getActiveCountry } from "../../actions/regions";

const AddLead = ({
  auth: { isAuthenticated, user, users, loading },
  user: { marketingEmployees },
  regions: { activeCountry },
  addDctLeadDetails,
  getActiveCountry,
  getMarketingEmployee,
}) => {
  useEffect(() => {
    getActiveCountry();
  }, [getActiveCountry]);
  useEffect(() => {
    getMarketingEmployee();
  }, [getMarketingEmployee]);

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
  });

  const { staffName, staffPhoneNumber, staffEmailId, staffDesignation } =
    addData;
  // idVal

  const [AddedDetails, AddDetails] = useState([]);

  const onAdd = (e) => {
    const staffList = AddedDetails.filter(
      (AddDetails) => AddDetails.staffName === staffName
    );

    e.preventDefault();
    if (staffList.length === 0) {
      // if (checkErrors()) {
      const addData = {
        // id: idVal,
        staffName: staffName,
        staffPhoneNumber: staffPhoneNumber,
        staffEmailId: staffEmailId,
        staffDesignation: staffDesignation,
      };
      setFormDatas({
        ...addData,
        // id: "",
        staffName: "",
        staffPhoneNumber: "",
        staffEmailId: "",
        staffDesignation: "",
        // idVal: idVal + 1,
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
  activeCountry &&
    activeCountry.map((country) =>
      allcountry.push({
        countryId: country._id,
        countrycode: country.countryCode,
        label: country.countryName,
        value: country.countryName,
      })
    );

  const [country, getcountryData] = useState();
  const [countryId, setcountryID] = useState();
  const [countrycode, setcountrycode] = useState();
  const oncountryChange = (e) => {
    // //Required Validation Starts
    // setError({
    //   ...error,
    //   sIdChecker: true,
    //   sIdErrorStyle: { color: "#000" },
    // });
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
    var empId = "";
    var empName = "";
    getempData(e);
    empId = e.empId;
    empName = e.value;
    setempID(empId);
    setNameID(empName);
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
  const onSubmit = (e) => {
    e.preventDefault();
    // if (checkErrors()) {
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
  };

  if (isSubmitted) {
    return <Redirect to="/all-leads" />;
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
                  <div className="col-lg-6  col-md-6 col-sm-6 col-12">
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
                    <label className="label-control">Staff Name:</label>
                    <input
                      type="text"
                      name="staffName"
                      value={staffName}
                      className="form-control"
                      onChange={(e) => onInputChange1(e)}
                    />
                  </div>
                  <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                    <label className="label-control">Staff Phone:</label>
                    <input
                      type="number"
                      name="countrycode"
                      value={countrycode}
                      className="form-control"
                      style={{ width: "50px" }}
                    />
                  </div>

                  <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                    <label className="label-control">
                      <br />
                    </label>
                    <input
                      type="number"
                      name="staffPhoneNumber"
                      value={staffPhoneNumber}
                      className="form-control"
                      onChange={(e) => onInputChange1(e)}
                      style={{ marginLeft: "-5em", width: "37vh" }}
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
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  settings: state.settings,
  client: state.client,
  regions: state.regions,
});

export default connect(mapStateToProps, {
  addDctLeadDetails,
  getActiveCountry,
  getMarketingEmployee,
})(AddLead);
