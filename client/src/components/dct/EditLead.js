import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { getActiveCountry } from "../../actions/regions";
import { editDctLeadDetails } from "../../actions/dct";
import { getMarketingEmployee } from "../../actions/user";

const EditLead = ({
  auth: { isAuthenticated, user, users, loading },
  user: { marketingEmployees },
  regions: { activeCountry },
  alleditLeaddata,
  getActiveCountry,
  editDctLeadDetails,
  onEditModalChange,
  getMarketingEmployee,
  filterData,
}) => {
  useEffect(() => {
    getActiveCountry();
  }, [getActiveCountry]);
  useEffect(() => {
    getMarketingEmployee();
  }, [getMarketingEmployee]);

  //formData
  const [formData, setFormData] = useState({
    companyName:
      alleditLeaddata && alleditLeaddata.companyName
        ? alleditLeaddata.companyName
        : "",
    clientName:
      alleditLeaddata && alleditLeaddata.clientName
        ? alleditLeaddata.clientName
        : "",
    website:
      alleditLeaddata && alleditLeaddata.website ? alleditLeaddata.website : "",
    emailId:
      alleditLeaddata && alleditLeaddata.emailId ? alleditLeaddata.emailId : "",
    phone1:
      alleditLeaddata && alleditLeaddata.phone1 ? alleditLeaddata.phone1 : "",
    phone2:
      alleditLeaddata && alleditLeaddata.phone2 ? alleditLeaddata.phone2 : "",
    dctLeadAddress:
      alleditLeaddata && alleditLeaddata.dctLeadAddress
        ? alleditLeaddata.dctLeadAddress
        : "",
    importantPoints:
      alleditLeaddata && alleditLeaddata.importantPoints
        ? alleditLeaddata.importantPoints
        : "",
    isSubmitted: false,
  });
  const {
    companyName,
    website,
    emailId,
    phone1,
    clientName,
    phone2,
    dctLeadAddress,
    importantPoints,
    isSubmitted,
  } = formData;

  const [ImagingChecked, setImagingChecked] = useState(false);
  const [CGIChecked, setCGIChecked] = useState(false);
  const [videoEditingChecked, setVideoEditingChecked] = useState(false);
  const [isCheck, setIsCheck] = useState(false);

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const allcountry = [];
  activeCountry &&
    activeCountry.map((country) =>
      allcountry.push({
        countryId: country._id,
        label: country.countryName,
        value: country.countryName,
      })
    );

  const [country, getcountryData] = useState(
    alleditLeaddata
      ? allcountry.length !== 0
        ? allcountry &&
          allcountry.filter((x) => x.countryId === alleditLeaddata.countryId)[0]
        : ""
      : ""
  );
  const [countryId, setcountryID] = useState(alleditLeaddata.countryId);

  if (alleditLeaddata && alleditLeaddata.services && !isCheck) {
    let i = 0,
      servicesVal = "";
    for (i = 0; i < alleditLeaddata.services.length; i++) {
      servicesVal = alleditLeaddata.services[i];
      if (servicesVal === "Imaging") {
        setImagingChecked(true);
      }
      if (servicesVal === "CGI") {
        setCGIChecked(true);
      }
      if (servicesVal === "videoEditing") {
        setVideoEditingChecked(true);
      }
      if (alleditLeaddata.services.length - 1 === i) {
        setIsCheck(true);
      }
    }
  }
  const oncountryChange = (e) => {
    var countryId = "";
    getcountryData(e);
    countryId = e.countryId;
    setcountryID(countryId);
  };

  const allemp = [];
  marketingEmployees.map((emp) =>
    allemp.push({
      empId: emp._id,
      label: emp.empFullName,
      value: emp.empFullName,
    })
  );

  const [emp, getempData] = useState(
    alleditLeaddata && alleditLeaddata
      ? allemp &&
          allemp.filter(
            (x) => x.empId === alleditLeaddata.dctLeadAssignedToId
          )[0]
      : ""
  );
  const [empId, setempID] = useState(
    alleditLeaddata && alleditLeaddata.dctLeadAssignedToId
  );
  const [empName, setNameID] = useState(
    alleditLeaddata && alleditLeaddata.dctLeadAssignedToName
  );
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

  const [ServicesDetails, SetServiceDetails] = useState(
    alleditLeaddata && alleditLeaddata.services
  );

  const onServicesChange = (e) => {
    let funcVal = e.target.value;
    if (funcVal === "Imaging") {
      setImagingChecked(ImagingChecked === true ? false : true);
    } else if (funcVal === "CGI") {
      setCGIChecked(CGIChecked === true ? false : true);
    } else if (funcVal === "videoEditing") {
      setVideoEditingChecked(videoEditingChecked === true ? false : true);
    }

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
      recordId: alleditLeaddata ? alleditLeaddata._id : "",
      companyName: companyName,
      website: website,
      clientName: clientName,
      emailId: emailId,
      phone1: phone1,
      phone2: phone2,
      dctLeadAddress: dctLeadAddress,
      importantPoints: importantPoints,
      countryId: countryId,
      countryName: country.value,
      services: ServicesDetails,
      dctLeadAssignedToId: empId,
      dctLeadAssignedToName: empName,
      dctLeadEditedById: user._id,
      dctLeadEditedDateTime: new Date().toLocaleString("en-GB"),
      filterData: filterData,
    };
    editDctLeadDetails(finalData);
    onEditModalChange(true);
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align">
        <form className="row" onSubmit={(e) => onSubmit(e)}>
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
                    <label className="label-control">Email Id :</label>
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
                      type="text"
                      name="phone1"
                      value={phone1}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                      required
                    />
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                    <label className="label-control">Phone 2 :</label>
                    <input
                      type="text"
                      name="phone2"
                      value={phone2}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                      required
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
                    <label className="label-control">Region :</label>
                    <Select
                      name="countryName"
                      options={allcountry}
                      isSearchable={true}
                      value={country}
                      placeholder="Select Region"
                      onChange={(e) => oncountryChange(e)}
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
                      required
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

                    <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                      <label className="label-control">Imaging</label>
                      <input
                        type="checkbox"
                        id="serviceCheckbox"
                        name="setImagingChecked"
                        checked={ImagingChecked}
                        value="Imaging"
                        onChange={(e) => onServicesChange(e)}
                      />
                    </div>
                    <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                      <label className="label-control">CGI</label>
                      <input
                        type="checkbox"
                        id="serviceCheckbox"
                        name="setCGIChecked"
                        checked={CGIChecked}
                        value="CGI"
                        onChange={(e) => onServicesChange(e)}
                      />
                    </div>
                    <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                      <label className="label-control">Video Editing</label>
                      <input
                        type="checkbox"
                        id="serviceCheckbox"
                        name="setVideoEditingChecked"
                        checked={videoEditingChecked}
                        value="videoEditing"
                        onChange={(e) => onServicesChange(e)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12 py-2">
                    <label className="label-control">Address :</label>

                    <textarea
                      name="dctLeadAddress"
                      on
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
                  // to="/job-queue"
                  onClick={() => onEditModalChange(true)}
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

EditLead.propTypes = {
  auth: PropTypes.object.isRequired,
  regions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  regions: state.regions,
});

export default connect(mapStateToProps, {
  getActiveCountry,
  editDctLeadDetails,
  getMarketingEmployee,
})(EditLead);
