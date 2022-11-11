import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { Redirect } from "react-router-dom";
import {
  addSctLeadDetails,
  getProjectList,
  getSctLeadsList,
} from "../../actions/sct";
import { getSctMarketingEmployee } from "../../actions/user";
import {
  getActiveCountry,
  getActiveState,
  // getActiveDistricts,
  // getActiveStaffDistricts,
} from "../../actions/regions";

const AddSctLeads = ({
  auth: { isAuthenticated, user, users, loading },
  user: { marketingEmployees },
  regions: {
    activeCountry,
    activeState,
    // activeDistricts,
    // activeStaffDistricts,
  },
  sct: { projectList, sctLeadsList },
  getActiveState,
  // getActiveDistricts,
  // getActiveStaffDistricts,
  addSctLeadDetails,
  getActiveCountry,
  getProjectList,
  getSctMarketingEmployee,
  getSctLeadsList,
}) => {
  useEffect(() => {
    getActiveState();
  }, [getActiveState]);
  useEffect(() => {
    getActiveCountry({ countryBelongsTo: "SCT" });
  }, [getActiveCountry]);
  useEffect(() => {
    getSctMarketingEmployee();
  }, [getSctMarketingEmployee]);
  useEffect(() => {
    getSctLeadsList();
  }, [getSctLeadsList]);
  useEffect(() => {
    getProjectList();
  }, [getProjectList]);

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }

  var todayDateymd = yyyy + "-" + mm + "-" + dd;
  //formData
  const [formData, setFormData] = useState({
    sctCompanyName: "",
    sctWebsite: "",
    sctEmailId: "",
    sctPhone1: "",
    sctPhone2: "",
    countrycode: "",
    sctLeadAddress: "",
    sctClientName: "",
    sctImportantPoints: "",
    isSubmitted: false,
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
    isSubmitted,
  } = formData;
  //
  //add staff start
  const [addData, setFormDatas] = useState({
    // idVal: 1,
    sctStaffName: "",
    sctStaffPhoneNumber: "",
    sctStaffEmailId: "",
    sctStaffDesignation: "",
    staffCountryCode: "",
  });

  const {
    sctStaffName,
    sctStaffPhoneNumber,
    sctStaffEmailId,
    sctStaffDesignation,
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
  //to add staff to the grid
  const onAdd = (e) => {
    const staffList = AddedDetails.filter(
      (AddDetails) => AddDetails.sctStaffName === sctStaffName
    );

    e.preventDefault();
    if (staffList.length === 0) {
      if (checkErrorscontact()) {
        const addData = {
          sctStaffName:
            sctStaffName.charAt(0).toUpperCase() + sctStaffName.slice(1),
          sctStaffPhoneNumber: sctStaffPhoneNumber,
          sctStaffEmailId: sctStaffEmailId?.trim(),
          sctStaffDesignation: sctStaffDesignation?.trim(),
          sctStaffRegion: staffcountryname,
          staffstateName: staffstateName,
          // staffdistrictName: staffdistrictName,
          sctStaffRegionId: staffcountryId ? staffcountryId : null,
          sctStaffStateId: staffstateId ? staffstateId : null,
          // sctStaffDistrictId: staffdistrictId ? staffdistrictId : null,
          sctStaffCountryCode: staffCountryCode,
        };
        setFormDatas({
          ...addData,
          sctStaffName: "",
          sctStaffPhoneNumber: "",
          sctStaffEmailId: "",
          sctStaffDesignation: "",
          sctStaffStateId: "",
          // sctStaffDistrictId: "",
          sctStaffCountryCode: "",
        });
        setstaffCountryCode("");
        getstaffcountryData("");
        getstaffStateData("");
        // getstaffdistrictData("");
        let temp = [];
        temp.push(...AddedDetails, addData);
        AddDetails(temp);
      }
    }
  };
  const onRemoveChange = (sctStaffName) => {
    const removeList = AddedDetails.filter(
      (AddDetails) => AddDetails.sctStaffName !== sctStaffName
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

  const allprojects = [];
  projectList &&
    projectList.map((projects) =>
      allprojects.push({
        projectsId: projects._id,

        label: projects.sctProjectName,
        value: projects.sctProjectName,
      })
    );

  const [projects, getprojectsData] = useState();
  const [projectsId, setprojectsID] = useState();

  const onprojectsChange = (e) => {
    //Required Validation Starts
    setError({
      ...error,
      ProjectIdChecker: true,
      ProjectErrorStyle: { color: "#000" },
    });
    //Required Validation ends
    var projectsId = "";
    getprojectsData(e);
    projectsId = e.projectsId;
    setprojectsID(projectsId);
    setProjectMatch(true);
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
        staffCountryCode: staffcountry.countryCode,
        label: staffcountry.countryName + " (" + staffcountry.countryCode + ")",
        value: staffcountry.countryName,
      })
    );

  const [staffcountry, getstaffcountryData] = useState();
  const [staffcountryId, setstaffcountryID] = useState();
  const [staffCountryCode, setstaffCountryCode] = useState();
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
    var staffCountryCode = "";
    var staffcountryname = "";
    getstaffcountryData(e);
    staffCountryCode = e.staffCountryCode;
    staffcountryId = e.staffcountryId;
    staffcountryname = e.value;
    setstaffcountryname(staffcountryname);
    setstaffcountryID(staffcountryId);
    setstaffCountryCode(staffCountryCode);
  };

  const allstates = [];
  activeState.map((state) =>
    allstates.push({
      sId: state._id,
      label: state.stateName,
      value: state.stateName,
    })
  );

  const [state, getStateData] = useState("");

  const [stateId, setStateID] = useState("");
  const [stateName, setStateName] = useState("");

  const onStateChange = (e) => {
    //  getdistrictData("");
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
    // getActiveDistricts(stateVal);
  };

  // const alldistrict = [];

  // activeDistricts.map((district) =>
  //   alldistrict.push({
  //     districtId: district._id,
  //     label: district.districtName,
  //     value: district.districtName,
  //   })
  // );

  // const [district, getdistrictData] = useState();
  // const [districtId, setdistrictID] = useState();

  // const ondistrictChange = (e) => {
  //   setError({
  //     ...error,
  //     DistrictIdChecker: true,
  //     DistrictErrorStyle: { color: "#000" },
  //   });

  //   var districtId = "";
  //   getdistrictData(e);
  //   districtId = e.districtId;
  //   setdistrictID(districtId);
  // };

  const allstaffstates = [];
  activeState.map((staffstate) =>
    allstaffstates.push({
      sId: staffstate._id,
      label: staffstate.stateName,
      value: staffstate.stateName,
    })
  );

  const [staffstate, getstaffStateData] = useState("");

  const [staffstateId, setstaffStateID] = useState("");
  const [staffstateName, setstaffStateName] = useState("");

  const onstaffStateChange = (e) => {
    //  getstaffdistrictData("");
    //Required Validation starts
    setError({
      ...error,
      StateIdChecker: true,
      StateErrorStyle: { color: "#000" },
    });
    //Required Validation end

    var staffstateId = "";
    var staffstateName = "";
    getstaffStateData(e);

    staffstateId = e.sId;
    staffstateName = e.value;

    setstaffStateID(staffstateId);
    setstaffStateName(staffstateName);
    let stateVal = {
      stateId: staffstateId,
    };
    // getActiveStaffDistricts(stateVal);
  };

  // const allstaffdistrict = [];

  // activeStaffDistricts.map((staffdistrict) =>
  //   allstaffdistrict.push({
  //     districtId: staffdistrict._id,
  //     label: staffdistrict.districtName,
  //     value: staffdistrict.districtName,
  //   })
  // );

  // const [staffdistrict, getstaffdistrictData] = useState();
  // const [staffdistrictId, setstaffdistrictID] = useState();
  // const [staffdistrictName, setstaffdistrictName] = useState();

  // const onstaffdistrictChange = (e) => {
  //   setError({
  //     ...error,
  //     DistrictIdChecker: true,
  //     DistrictErrorStyle: { color: "#000" },
  //   });

  //   var staffdistrictId = "";
  //   var staffdistrictName = "";
  //   getstaffdistrictData(e);

  //   staffdistrictId = e.districtId;
  //   staffdistrictName = e.value;

  //   setstaffdistrictID(staffdistrictId);
  //   setstaffdistrictName(staffdistrictName);
  // };

  //validation starts

  const [error, setError] = useState({
    countrytypeIdChecker: false,
    countrytypeIdErrorStyle: {},
    AssignedtypeIdChecker: false,
    AssignedtypeIdErrorStyle: {},
    ProjectErrorStyle: {},
    ProjectIdChecker: false,
    websiteValChecker: false,
    websiteValResult: "",
    websiteValStyle: {},
    websiteInptErrStyle: {},
    companyNameValChecker: false,
    companyNameValResult: "",
    companyNameValStyle: {},
    companyNameInptErrStyle: {},
  });
  const {
    countrytypeIdChecker,
    countrytypeIdErrorStyle,
    AssignedtypeIdChecker,
    AssignedtypeIdErrorStyle,
    ProjectIdChecker,
    ProjectErrorStyle,
    websiteValChecker,
    websiteValResult,
    websiteValStyle,
    websiteInptErrStyle,
    companyNameValChecker,
    companyNameValResult,
    companyNameValStyle,
    companyNameInptErrStyle,
  } = error;

  //for validation of dropdown
  const checkErrors = () => {
    if (!ProjectIdChecker) {
      setError({
        ...error,
        ProjectErrorStyle: { color: "#F00" },
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

  //add
  const onSubmit = (e) => {
    e.preventDefault();
    if (checkErrors()) {
      const finalData = {
        sctCompanyName: sctCompanyName.trim(),
        sctWebsite: sctWebsite?.trim(),
        sctClientName: sctClientName.trim(),
        sctEmailId: sctEmailId?.trim(),
        sctPhone1: sctPhone1,
        sctPhone2: sctPhone2,
        sctLeadAddress: sctLeadAddress?.trim(),
        sctImportantPoints: sctImportantPoints?.trim(),
        countryId: countryId ? countryId : null,
        countryName: country.value ? country.value : null,
        sctcountryCode: countrycode,
        stateId: stateId ? stateId : null,
        stateName: stateName,
        //  districtId: districtId ? districtId : null,
        projectsId: projectsId ? projectsId : null,
        projectsName: projects.value ? projects.value : null,
        sctLeadStatus: "Active",
        sctLeadCategory: "NL",
        sctCallDate: new Date().toISOString().split("T")[0],
        sctStaffs: AddedDetails,
        sctLeadEnteredById: user._id,
        sctLeadEnteredByName: user.empFullName,
        sctLeadAssignedToId: empId,
        sctLeadAssignedToName: empName,
        sctLeadEnteredDate: todayDateymd,
        sctLeadEnteredDateTime: new Date().toLocaleString("en-GB"),
      };
      addSctLeadDetails(finalData);
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
        isSubmitted: true,
      });
    }
  };

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onleadCheck = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    let listWebsite = [];
    if (e.target.name === "sctWebsite") {
      let data = e.target.value;
      var ret = data.replace("https://", "");
      ret = ret.replace("http://", "");
      ret = ret.replace("www.", "");
      var arr = ret.split(".");
      listWebsite = sctLeadsList.filter(
        (sctLeadsList) =>
          sctLeadsList.sctWebsite
            .replace("https://", "")
            .replace("http://", "")
            .replace("www.", "")
            .split(".")[0] === arr[0]
      );
    }

    if (e.target.value === "") {
      setError({
        ...error,
        websiteValChecker: false,
        websiteValResult: "",
        websiteValStyle: {},
        websiteInptErrStyle: {},
      });
    }

    if (listWebsite.length > 0) {
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

  const [companyMatch, setCompanyMatch] = useState(false);
  const [emailIdMatch, setEmailIdMatch] = useState(false);
  const [projectMatch, setProjectMatch] = useState(true);

  const onleadCheckNew = (e) => {
    if (projectsId) {
      setProjectMatch(true);
      setFormData({ ...formData, [e.target.name]: e.target.value });

      let listCompanyName = [];
      if (e.target.name === "sctCompanyName") {
        if (e.target.value === "") setCompanyMatch(false);
        listCompanyName = sctLeadsList.filter(
          (sctLeadsList) =>
            sctLeadsList.sctCompanyName.toUpperCase() ===
              e.target.value.toUpperCase() &&
            sctLeadsList.projectsId === projectsId
        );
        if (listCompanyName.length > 0) setCompanyMatch(true);
        else setCompanyMatch(false);
      }
      // sctLeadsList.sctCompanyName.includes(e.target.value);
      let listEmail = [];
      if (e.target.name === "sctEmailId") {
        if (e.target.value === "") setEmailIdMatch(false);
        listEmail = sctLeadsList.filter(
          (sctLeadsList) =>
            sctLeadsList.sctEmailId.toUpperCase() ===
              e.target.value.toUpperCase() &&
            sctLeadsList.projectsId === projectsId
        );
        if (listEmail.length > 0) setEmailIdMatch(true);
        else setEmailIdMatch(false);
      }
    } else setProjectMatch(false);
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

  if (isSubmitted) {
    return <Redirect to="/all-sct-leads" />;
  }
  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align">
        <form className="row" onSubmit={(e) => onSubmit(e)}>
          <div className="col-lg-12 col-md-11 col-sm-12 col-12">
            {/* <h2 className="heading_color">Add Lead</h2>
            <hr /> */}
            <br />
          </div>
          <section className="sub_reg">
            <div className="row col-lg-12 col-md-11 col-sm-12 col-12 ">
              <div className="col-lg-12 col-md-12 col-sm-12 col-12 ">
                <div className="row card-new ">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <h2 className="heading_color">Add Lead</h2>
                    <hr />
                    <h5>
                      Company Info
                      <span className="warningMsg">
                        {projectMatch ? (
                          <>
                            {companyMatch ? " Company " : ""}
                            {emailIdMatch
                              ? companyMatch
                                ? "and EmailId"
                                : " EmailId "
                              : ""}
                            {companyMatch || emailIdMatch ? " Match Found" : ""}
                          </>
                        ) : (
                          "Please select Project First"
                        )}
                      </span>
                    </h5>
                  </div>
                  <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                    <label style={ProjectErrorStyle}>Lead of :</label>
                    <Select
                      name="sctProjectName"
                      options={allprojects}
                      isSearchable={true}
                      value={projects}
                      placeholder="Select Projects"
                      onChange={(e) => onprojectsChange(e)}
                    />
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
                      style={companyNameInptErrStyle}
                      onChange={(e) => onleadCheckNew(e)}
                      // onChange={(e) => onInputChange(e)}
                      required
                    />
                    {companyNameValChecker && (
                      <Fragment>
                        <span
                          className="form-input-info positioning"
                          style={companyNameValStyle}
                        >
                          {companyNameValResult}
                        </span>
                      </Fragment>
                    )}
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
                      onChange={(e) => onleadCheckNew(e)}
                      required
                    />
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                    <label>Website :</label>
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
                  <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                    <label className="label-control">Client Name:</label>
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
                      type="text"
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
                      type="text"
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
                      style={countrytypeIdErrorStyle}
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
                      State :
                    </label>
                    <Select
                      name="stateName"
                      options={allstates}
                      isSearchable={true}
                      value={state}
                      placeholder="Select State"
                      onChange={(e) => onStateChange(e)}
                    />
                  </div>
                  {/* <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                    <label className="label-control">District :</label>
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

                  {user.empCtAccess && user.empCtAccess === "All" ? (
                    <div className="col-lg-2 col-md-6 col-sm-6 col-12">
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
                  <div className="col-lg-3  col-md-6 col-sm-6 col-12 ">
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
                  </div>
                </div>
              </div>

              <div className="col-lg-6 col-md-12 col-sm-12 col-12 py-3">
                {/* <form onSubmit={(e) =>Add(e)}> */}
                <div className="row card-new ">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <h5>Contact Info</h5>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <label
                      // className="label-control"
                      style={nametypeIdErrorStyle}
                    >
                      Staff Name*:
                    </label>
                    <input
                      type="text"
                      name="sctStaffName"
                      value={sctStaffName}
                      className="form-control"
                      onChange={(e) => onInputChange2(e)}
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <label
                    // className="label-control"
                    >
                      Email Id :
                    </label>
                    <input
                      type="text"
                      name="sctStaffEmailId"
                      value={sctStaffEmailId}
                      className="form-control"
                      onChange={(e) => onInputChange1(e)}
                    />
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                    <label className="label-control">Country :</label>
                    <Select
                      name="countryName"
                      options={allstaffcountry}
                      isSearchable={true}
                      value={staffcountry}
                      placeholder="Select Country"
                      onChange={(e) => onstaffcountryChange(e)}
                    />
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                    <label
                      className="label-control"
                      // style={StateErrorStyle}
                    >
                      State :
                    </label>
                    <Select
                      name="stateName"
                      options={allstaffstates}
                      isSearchable={true}
                      value={staffstate}
                      placeholder="Select State"
                      onChange={(e) => onstaffStateChange(e)}
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
                  {/* <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                    <label className="label-control">District :</label>
                    <Select
                      name="districtName"
                      options={allstaffdistrict}
                      isSearchable={true}
                      value={staffdistrict}
                      placeholder="Select District"
                      onChange={(e) => onstaffdistrictChange(e)}
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
                    <label className="label-control">Staff Phone:</label>
                    <input
                      type="text"
                      name="staffCountryCode"
                      value={staffCountryCode}
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
                      type="text"
                      name="sctStaffPhoneNumber"
                      value={sctStaffPhoneNumber}
                      className="form-control"
                      onChange={(e) => onInputChange1(e)}
                      style={{ marginLeft: "-6em", width: "22vh" }}
                      onKeyDown={(e) =>
                        (e.keyCode === 69 || e.keyCode === 190) &&
                        e.preventDefault()
                      }
                    />
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                    <label className="label-control">Designation :</label>
                    <input
                      type="text"
                      name="sctStaffDesignation"
                      value={sctStaffDesignation}
                      className="form-control"
                      onChange={(e) => onInputChange1(e)}
                    />
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12">
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
                              <td>{AddDetail.sctStaffName}</td>
                              <td>
                                {AddDetail.sctStaffRegion},
                                {AddDetail.staffstateName}
                                {/* {AddDetail.staffdistrictName} */}
                              </td>
                              <td>{AddDetail.sctStaffPhoneNumber}</td>
                              <td>{AddDetail.sctStaffEmailId}</td>
                              <td>{AddDetail.sctStaffDesignation}</td>
                              <td>
                                <img
                                  className="img_icon_size log"
                                  onClick={() =>
                                    onRemoveChange(AddDetail.sctStaffName)
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
                  to="/all-sct-leads"
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

AddSctLeads.propTypes = {
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  regions: PropTypes.object.isRequired,
  dct: PropTypes.object.isRequired,
  sct: PropTypes.object.isRequired,
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
  addSctLeadDetails,
  getActiveCountry,
  getProjectList,
  getSctMarketingEmployee,
  getSctLeadsList,
  getActiveState,
  // getActiveDistricts,
  // getActiveStaffDistricts,
})(AddSctLeads);
