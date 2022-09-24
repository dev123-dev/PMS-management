import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import {
  editSctLeadDetails,
  getSctLeadsList,
  getProjectList,
} from "../../actions/sct";
import { getSctMarketingEmployee } from "../../actions/user";
import {
  getActiveCountry,
  getActiveState,
  // getActiveDistricts,
} from "../../actions/regions";

const EditSctLead = ({
  auth: { isAuthenticated, user, users, loading },
  user: { marketingEmployees },
  regions: { activeCountry, activeState, activeDistricts },
  sct: { projectList, sctLeadsList },
  alleditLeaddata,
  editSctLeadDetails,
  onEditModalChange,
  getActiveCountry,
  getSctMarketingEmployee,
  getSctLeadsList,
  getProjectList,
  getActiveState,
  // getActiveDistricts,
  filterData,
}) => {
  useEffect(() => {
    getActiveState();
  }, [getActiveState]);
  // useEffect(() => {
  //   getActiveDistricts();
  // }, [getActiveDistricts]);
  useEffect(() => {
    getActiveCountry({ countryBelongsTo: "SCT" });
  }, [getActiveCountry]);
  useEffect(() => {
    getSctMarketingEmployee();
  }, [getSctMarketingEmployee]);
  useEffect(() => {
    getProjectList();
  }, [getProjectList]);
  useEffect(() => {
    getSctLeadsList();
  }, [getSctLeadsList]);

  //formData
  const [formData, setFormData] = useState({
    sctCompanyName:
      alleditLeaddata && alleditLeaddata.sctCompanyName
        ? alleditLeaddata.sctCompanyName
        : "",
    sctClientName:
      alleditLeaddata && alleditLeaddata.sctClientName
        ? alleditLeaddata.sctClientName
        : "",
    sctWebsite:
      alleditLeaddata && alleditLeaddata.sctWebsite
        ? alleditLeaddata.sctWebsite
        : "",
    sctEmailId:
      alleditLeaddata && alleditLeaddata.sctEmailId
        ? alleditLeaddata.sctEmailId
        : "",
    sctPhone1:
      alleditLeaddata && alleditLeaddata.sctPhone1
        ? alleditLeaddata.sctPhone1
        : "",
    sctPhone2:
      alleditLeaddata && alleditLeaddata.sctPhone2
        ? alleditLeaddata.sctPhone2
        : "",
    sctLeadAddress:
      alleditLeaddata && alleditLeaddata.sctLeadAddress
        ? alleditLeaddata.sctLeadAddress
        : "",
    sctImportantPoints:
      alleditLeaddata && alleditLeaddata.sctImportantPoints
        ? alleditLeaddata.sctImportantPoints
        : "",

    countrycode: "",
  });

  const {
    sctCompanyName,
    sctWebsite,
    sctEmailId,
    sctPhone1,
    sctPhone2,
    sctClientName,
    sctLeadAddress,
    sctImportantPoints,
  } = formData;

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

  const [country, getcountryData] = useState(
    alleditLeaddata && alleditLeaddata
      ? allcountry &&
          allcountry.filter((x) => x.countryId === alleditLeaddata.countryId)[0]
      : ""
  );
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
  const allprojects = [];
  projectList &&
    projectList.map((projects) =>
      allprojects.push({
        projectsId: projects._id,

        label: projects.sctProjectName,
        value: projects.sctProjectName,
      })
    );

  const [projects, getprojectsData] = useState(
    alleditLeaddata && alleditLeaddata
      ? allprojects &&
          allprojects.filter(
            (x) => x.projectsId === alleditLeaddata.projectsId
          )[0]
      : ""
  );

  const [projectsId, setprojectsID] = useState(
    alleditLeaddata && alleditLeaddata.projectsId
  );
  const [projectsName, setprojectsName] = useState(
    alleditLeaddata && alleditLeaddata.projectsName
  );
  const onprojectsChange = (e) => {
    // //Required Validation Starts
    // setError({
    //   ...error,
    //   countrytypeIdChecker: true,
    //   countrytypeIdErrorStyle: { color: "#000" },
    // });
    // //Required Validation ends
    var projectsId = "";
    var projectsName = "";

    getprojectsData(e);

    projectsId = e.projectsId;
    projectsName = e.value;
    setprojectsID(projectsId);
    setprojectsName(projectsName);
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

  const [emp, getempData] = useState(
    alleditLeaddata && alleditLeaddata
      ? allemp &&
          allemp.filter(
            (x) => x.empId === alleditLeaddata.sctLeadAssignedToId
          )[0]
      : ""
  );
  const [empId, setempID] = useState(
    alleditLeaddata && alleditLeaddata.sctLeadAssignedToId
  );
  const [empName, setNameID] = useState(
    alleditLeaddata && alleditLeaddata.sctLeadAssignedToName
  );
  const onempChange = (e) => {
    // //Required Validation Starts
    // setError({
    //   ...error,
    //   AssignedtypeIdChecker: true,
    //   AssignedtypeIdErrorStyle: { color: "#000" },
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

  const allstates = [];
  activeState.map((state) =>
    allstates.push({
      sId: state._id,
      label: state.stateName,
      value: state.stateName,
    })
  );

  const [state, getStateData] = useState(
    alleditLeaddata && alleditLeaddata
      ? allstates &&
          allstates.filter((x) => x.sId === alleditLeaddata.stateId)[0]
      : ""
  );

  const [stateId, setStateID] = useState(
    alleditLeaddata && alleditLeaddata.stateId
  );
  const [stateName, setStateName] = useState("");

  const onStateChange = (e) => {
    // getdistrictData("");
    //Required Validation starts
    setError({
      ...error,
      StateIdChecker: true,
      StateErrorStyle: { color: "#000" },
    });
    //Required Validation end

    var stateId = "";
    var stateName = "";
    getStateData(e);

    stateId = e.sId;
    stateName = e.value;

    setStateID(stateId);
    setStateName(stateName);
    let stateVal = {
      stateId: stateId,
    };
    //  getActiveDistricts(stateVal);
  };

  // const alldistrict = [];

  // activeDistricts.map((district) =>
  //   alldistrict.push({
  //     districtId: district._id,
  //     label: district.districtName,
  //     value: district.districtName,
  //   })
  // );

  // const [district, getdistrictData] = useState(
  //   alleditLeaddata && alleditLeaddata
  //     ? alldistrict &&
  //         alldistrict.filter(
  //           (x) => x.districtId === alleditLeaddata.districtId
  //         )[0]
  //     : ""
  // );
  // const [districtId, setdistrictID] = useState(
  //   alleditLeaddata && alleditLeaddata.districtId
  // );
  // const [districtName, setdistrictName] = useState();

  // const ondistrictChange = (e) => {
  //   setError({
  //     ...error,
  //     DistrictIdChecker: true,
  //     DistrictErrorStyle: { color: "#000" },
  //   });

  //   var districtId = "";
  //   var districtName = "";
  //   getdistrictData(e);

  //   districtId = e.districtId;
  //   districtName = e.value;

  //   setdistrictID(districtId);
  //   setdistrictName(districtName);
  // };

  const [error, setError] = useState({
    // countrytypeIdChecker: false,
    // countrytypeIdErrorStyle: {},
    // AssignedtypeIdChecker: false,
    // AssignedtypeIdErrorStyle: {},

    websiteValChecker: false,
    websiteValResult: "",
    websiteValStyle: {},
    websiteInptErrStyle: {},
  });
  const {
    // countrytypeIdChecker,
    // countrytypeIdErrorStyle,
    // AssignedtypeIdChecker,
    // AssignedtypeIdErrorStyle,

    websiteValChecker,
    websiteValResult,
    websiteValStyle,
    websiteInptErrStyle,
  } = error;

  // const checkErrors = () => {
  //   if (!countrytypeIdChecker) {
  //     setError({
  //       ...error,
  //       countrytypeIdErrorStyle: { color: "#F00" },
  //     });
  //     return false;
  //   }
  //   if (user.empCtAccess === "All") {
  //     if (!AssignedtypeIdChecker) {
  //       setError({
  //         ...error,
  //         AssignedtypeIdErrorStyle: { color: "#F00" },
  //       });
  //       return false;
  //     }
  //   }

  //   return true;
  // };

  const onSubmit = (e) => {
    e.preventDefault();
    // if (checkErrors()) {
    const finalData = {
      recordId: alleditLeaddata ? alleditLeaddata._id : "",
      sctCompanyName:
        sctCompanyName.charAt(0).toUpperCase() + sctCompanyName.slice(1),
      sctClientName:
        sctClientName.charAt(0).toUpperCase() + sctClientName.slice(1),
      sctEmailId: sctEmailId.trim(),
      sctPhone1: sctPhone1,
      sctPhone2: sctPhone2,
      sctWebsite: sctWebsite.trim(),
      sctLeadAddress: sctLeadAddress.trim(),
      sctImportantPoints: sctImportantPoints.trim(),
      countryId: countryId,
      countryName: country ? country.value : null,
      sctcountryCode: countrycode,
      projectsId: projectsId,
      projectsName: projects ? projects.value : null,
      stateId: stateId,
      stateName: stateName,
      //  districtId: districtId,
      sctLeadAssignedToId: empId,
      sctLeadAssignedToName: empName,
      sctLeadEditedById: user._id,
      sctLeadEditedDateTime: new Date().toLocaleString("en-GB"),
      filterData: filterData,
    };

    editSctLeadDetails(finalData);
    onEditModalChange(true);
    setFormData({
      ...formData,
      sctCompanyName: "",
      sctEmailId: "",
      sctClientName: "",
      sctWebsite: "",
      address: "",
      sctPhone1: "",
      sctPhone2: "",
      sctImportantPoints: "",
      countryId: "",
    });
    // }
  };

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onleadCheck = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    let data = e.target.value;
    var ret = data.replace("https://", "");
    ret = ret.replace("http://", "");
    ret = ret.replace("www.", "");
    var arr = ret.split(".");
    const listWebsite = sctLeadsList.filter(
      (sctLeadsList) =>
        sctLeadsList.sctWebsite
          .replace("https://", "")
          .replace("http://", "")
          .replace("www.", "")
          .split(".")[0] === arr[0]
    );
    if (e.target.value === "") {
      setError({
        ...error,
        websiteValChecker: false,
        websiteValResult: "",
        websiteValStyle: {},
        websiteInptErrStyle: {},
      });
    } else if (listWebsite.length > 0) {
      setError({
        ...error,
        websiteValChecker: true,
        websiteValResult: "Exist",
        websiteValStyle: { color: "#FF0000", marginTop: "7px" },
        websiteInptErrStyle: { border: "1px solid #FF0000" },
      });
    } else {
      setError({
        ...error,
        websiteValChecker: true,
        websiteValResult: "Not Exist",
        websiteValStyle: { color: "#43b90f", marginTop: "7px" },
        websiteInptErrStyle: { border: "1px solid #43b90f" },
      });
    }
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      {/* <div className="container container_align"> */}
      <form className="row" onSubmit={(e) => onSubmit(e)}>
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-11 col-sm-12 col-12 ">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12 ">
              <div className="row card-new ">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <h5>Company Info</h5>
                </div>

                <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                  <label
                  //  className="label-control"
                  >
                    Website :
                  </label>
                  <input
                    type="text"
                    name="sctWebsite"
                    value={sctWebsite}
                    style={websiteInptErrStyle}
                    className="form-control"
                    onChange={(e) => onleadCheck(e)}
                    // required
                  />
                  {websiteValChecker && (
                    <Fragment>
                      <span
                        className="form-input-info positioning"
                        style={websiteValStyle}
                      >
                        {websiteValResult}
                      </span>
                    </Fragment>
                  )}
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 col-12 ">
                  <label
                  // className="label-control"
                  >
                    Company Name* :
                  </label>
                  <input
                    type="text"
                    name="sctCompanyName"
                    value={sctCompanyName}
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                    required
                  />
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                  <label
                  // className="label-control"
                  >
                    Email Id* :
                  </label>
                  <input
                    type="text"
                    name="sctEmailId"
                    value={sctEmailId}
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                    required
                  />
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                  <label
                  // className="label-control"
                  >
                    Client Name:
                  </label>
                  <input
                    type="text"
                    name="sctClientName"
                    value={sctClientName}
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                  <label className="label-control">Phone 1* :</label>
                  <input
                    type="number"
                    name="sctPhone1"
                    value={sctPhone1}
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                    onKeyDown={(e) =>
                      (e.keyCode === 69 || e.keyCode === 190) &&
                      e.preventDefault()
                    }
                    required
                  />
                </div>
                <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                  <label className="label-control">Phone 2 :</label>
                  <input
                    type="number"
                    name="sctPhone2"
                    value={sctPhone2}
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                    onKeyDown={(e) =>
                      (e.keyCode === 69 || e.keyCode === 190) &&
                      e.preventDefault()
                    }
                  />
                </div>

                <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                  <label
                    className="label-control"
                    //  style={countrytypeIdErrorStyle}
                  >
                    Country*:
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
                <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                  <label
                    className="label-control"
                    // style={StateErrorStyle}
                  >
                    State* :
                  </label>
                  <Select
                    name="stateName"
                    options={allstates}
                    isSearchable={true}
                    value={state}
                    placeholder="Select State"
                    onChange={(e) => onStateChange(e)}
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
                {/* <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                  <label className="label-control">District* :</label>
                  <Select
                    name="districtName"
                    options={alldistrict}
                    isSearchable={true}
                    value={district}
                    placeholder="Select District"
                    onChange={(e) => ondistrictChange(e)}
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
                </div> */}
                <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                  <label
                    className="label-control"
                    // style={StateErrorStyle}
                  >
                    Lead of :
                  </label>
                  <Select
                    name="sctProjectName"
                    options={allprojects}
                    isSearchable={true}
                    value={projects}
                    placeholder="Select Projects"
                    onChange={(e) => onprojectsChange(e)}
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
                {user.empCtAccess && user.empCtAccess === "All" ? (
                  <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                    <label
                      className="label-control"
                      //style={AssignedtypeIdErrorStyle}
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
                <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                  <label className="label-control">Important Points :</label>
                  <textarea
                    name="sctImportantPoints"
                    id="sctImportantPoints"
                    className="textarea form-control"
                    rows="3"
                    placeholder="Important Points"
                    style={{ width: "100%" }}
                    value={sctImportantPoints}
                    onChange={(e) => onInputChange(e)}
                  ></textarea>
                </div>
                <div className="col-lg-6  col-md-6 col-sm-6 col-12 ">
                  <label className="label-control">Address :</label>
                  <textarea
                    name="sctLeadAddress"
                    id="sctLeadAddress"
                    className="textarea form-control"
                    rows="3"
                    placeholder=" Address"
                    style={{ width: "100%" }}
                    value={sctLeadAddress}
                    onChange={(e) => onInputChange(e)}
                  ></textarea>
                  <br />
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
                // to="/all-leads"
                onClick={() => onEditModalChange(true)}
              >
                Cancel
              </Link>
            </div>
          </div>
        </section>
      </form>
      {/* </div> */}
    </Fragment>
  );
};

EditSctLead.propTypes = {
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  regions: PropTypes.object.isRequired,
  dct: PropTypes.object.isRequired,
  sct: PropTypes.object.isRequired,
  // getStates: PropTypes.func.isRequired,
  // getDistrict: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  settings: state.settings,
  client: state.client,
  regions: state.regions,
  dct: state.dct,
  sct: state.sct,
});

export default connect(mapStateToProps, {
  // addDctLeadDetails,
  getActiveCountry,
  getSctMarketingEmployee,
  getSctLeadsList,
  getActiveState,
  // getActiveDistricts,
  getProjectList,
  editSctLeadDetails,
})(EditSctLead);
