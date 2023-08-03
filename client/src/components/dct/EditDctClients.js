/* eslint-disable no-undef */
import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { connect } from "react-redux";
import Select from "react-select";
import { Link, useHistory } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { Redirect } from "react-router-dom";
import {
  editDctClientsDetails,
  deactivateDctClientStaffDetails,
  addNewDctClientStaffDetails,
  addNewDctClientInstructionDetails,
  getStaffsData,
  getInstructionData,
} from "../../actions/dct";
import { getMarketingEmployee } from "../../actions/user";
import { getActiveCountry } from "../../actions/regions";
import { getALLPaymentMode } from "../../actions/settings";
import { Modal } from "react-bootstrap";
import EditContact from "./EditContact";
import EditInstructions from "./EditInstructions";
const EditDctClients = ({
  auth: { isAuthenticated, user, users, loading },
  user: { marketingEmployees },
  settings: { paymentMode },
  regions: { activeCountry },
  dct: { staffData, instructionData },
  editDctClientsDetails,
  getALLPaymentMode,
  getActiveCountry,
  deactivateDctClientStaffDetails,
  addNewDctClientStaffDetails,
  addNewDctClientInstructionDetails,
  getMarketingEmployee,
  getStaffsData,
  getInstructionData,
}) => {
  const data = useHistory().location.data;

  useEffect(() => {
    getALLPaymentMode();
  }, [getALLPaymentMode]);
  useEffect(() => {
    getActiveCountry({ countryBelongsTo: "DCT" });
  }, [getActiveCountry]);
  useEffect(() => {
    getMarketingEmployee();
  }, [getMarketingEmployee]);

  let staffFilter = {
    from: "AllClients",
    leadDataId: data && data.dctdata._id,
  };
  useEffect(() => {
    getStaffsData(staffFilter);
  }, [getStaffsData]);

  let instructionFilter = {
    from: "AllClients",
    leadDataId: data && data.dctdata._id,
  };
  useEffect(() => {
    getInstructionData(instructionFilter);
  }, [getInstructionData]);

  const clientTypeVal = [
    { value: "Regular", label: "Regular Client" },
    { value: "Test", label: "Test Client" },
  ];

  //formData
  const [formData, setFormData] = useState({
    clientName:
      data && data.dctdata && data.dctdata.clientName
        ? data.dctdata.clientName
        : "",
    emailId:
      data && data.dctdata && data.dctdata.emailId ? data.dctdata.emailId : "",
    billingEmail:
      data && data.dctdata && data.dctdata.billingEmail
        ? data.dctdata.billingEmail
        : "",
    phone1:
      data && data.dctdata && data.dctdata.phone1 ? data.dctdata.phone1 : "",

    importantPoints:
      data && data.dctdata && data.dctdata.importantPoints
        ? data.dctdata.importantPoints
        : "",

    clientEmail:
      data && data.dctdata && data.dctdata.clientEmail
        ? data.dctdata.clientEmail
        : "",

    phone2:
      data && data.dctdata && data.dctdata.phone2 ? data.dctdata.phone2 : "",

    address:
      data && data.dctdata && data.dctdata.address ? data.dctdata.address : "",

    clientCountry:
      data && data.dctdata && data.dctdata.clientCountry
        ? data.dctdata.clientCountry
        : "",

    clientFolderName:
      data && data.dctdata && data.dctdata.clientFolderName
        ? data.dctdata.clientFolderName
        : "",
    clientCurrency:
      data && data.dctdata && data.dctdata.clientCurrency
        ? data.dctdata.clientCurrency
        : "",
    companyName:
      data && data.dctdata && data.dctdata.companyName
        ? data.dctdata.companyName
        : "",
    clientCompanyFounderName:
      data && data.dctdata && data.dctdata.clientCompanyFounderName
        ? data.dctdata.clientCompanyFounderName
        : "",
    website:
      data && data.dctdata && data.dctdata.website ? data.dctdata.website : "",

    clientType:
      data && data.dctdata && data.dctdata.clientType
        ? {
            value: data.dctdata.clientType,
            label: data.dctdata.clientType,
          }
        : "",

    paymentModeName:
      data && data.dctdata && data.dctdata.paymentModeName
        ? data.dctdata.paymentModeName
        : "",

    standardInstruction:
      data && data.dctdata && data.dctdata.standardInstruction
        ? data.dctdata.standardInstruction
        : "",
    staffDeactiveReason: "",
    isSubmitted: false,
  });

  const {
    staffDeactiveReason,
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
  // code for next previous tabing starts

  const [ImagingChecked, setImagingChecked] = useState(false);
  const [CGIChecked, setCGIChecked] = useState(false);
  const [videoEditingChecked, setVideoEditingChecked] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  if (data && data.dctdata && data.dctdata.services && !isCheck) {
    let i = 0,
      servicesVal = "";
    for (i = 0; i < data.dctdata.services.length; i++) {
      servicesVal = data.dctdata.services[i];
      if (servicesVal === "Imaging") {
        setImagingChecked(true);
      }
      if (servicesVal === "CGI") {
        setCGIChecked(true);
      }
      if (servicesVal === "videoEditing") {
        setVideoEditingChecked(true);
      }
      if (data.dctdata.services.length - 1 === i) {
        setIsCheck(true);
      }
    }
  }

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

  const [staffcountry, getstaffcountryData] = useState(
    data && data.dctdata
      ? allstaffcountry.length !== 0
        ? allstaffcountry &&
          allstaffcountry.filter(
            (x) => x.staffcountryId === data && data.dctdata.staffRegionId
          )[0]
        : ""
      : ""
  );
  const [staffcountryId, setstaffcountryID] = useState(
    data && data.dctdata.staffRegionId
  );
  const [staffCountryCode, setstaffCountryCode] = useState(
    data && data.dctdata.staffCountryCode
  );
  const [staffcountryname, setstaffcountryname] = useState(
    data && data.dctdata.staffRegion
  );
  const onstaffcountryChange = (e) => {
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

  //add staff start
  const [addData, setFormDatas] = useState({
    staffName: "",
    staffPhoneNumber: "",
    staffEmailId: "",
    staffDesignation: "",
    staffRegion: "",
    staffCountryCode: "",
  });

  const { staffName, staffPhoneNumber, staffEmailId, staffDesignation } =
    addData;

  const [AddedDetails, AddDetails] = useState([]);
  const [AddedInstructionDetails, AddInstructionDetails] = useState([]);
  const [addDataInstruction, setInstructionFormDatas] = useState({
    instructionName: "",
    instructionDiscription: "",
  });

  const { instructionName, instructionDiscription } = addDataInstruction;

  const [error1, setError1] = useState({
    nametypeIdChecker: false,
    nametypeIdErrorStyle: {},
  });
  const { nametypeIdChecker, nametypeIdErrorStyle } = error1;

  const [errorInstruction, setErrorInstruction] = useState({
    InstructionnametypeIdChecker: false,
    InstructionnametypeIdErrorStyle: {},
  });
  const { InstructionnametypeIdChecker, InstructionnametypeIdErrorStyle } =
    errorInstruction;
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

  const checkErrorsinstruction = () => {
    if (!InstructionnametypeIdChecker) {
      setErrorInstruction({
        ...errorInstruction,
        InstructionnametypeIdErrorStyle: { color: "#F00" },
      });
      return false;
    }

    return true;
  };

  const onInputChange2 = (e) => {
    setErrorInstruction({
      ...errorInstruction,
      InstructionnametypeIdChecker: true,
      InstructionnametypeIdErrorStyle: { color: "#000" },
    });
    setInstructionFormDatas({
      ...addDataInstruction,
      [e.target.name]: e.target.value,
    });
  };
  const onAdd = (e) => {
    const staffList = AddedDetails.filter(
      (AddDetails) => AddDetails.staffName === staffName
    );

    e.preventDefault();
    if (staffList.length === 0) {
      if (checkErrorscontact()) {
        const addData = {
          recordId:
            data && data.dctdata && data.dctdata._id ? data.dctdata._id : "",
          staffName: staffName.charAt(0).toUpperCase() + staffName.slice(1),
          staffPhoneNumber: staffPhoneNumber,
          staffEmailId: staffEmailId?.trim(),
          staffDesignation: staffDesignation?.trim(),
          staffRegion: staffcountryname ? staffcountryname : "",
          staffRegionId: staffcountryId ? staffcountryId : null,
          staffCountryCode: staffCountryCode,
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
        setstaffCountryCode("");
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

  //add instruction start

  const onAddInstructions = (e) => {
    const InstructionList = AddedInstructionDetails.filter(
      (AddInstructionDetails) =>
        AddInstructionDetails.instructionName === instructionName
    );

    e.preventDefault();
    if (InstructionList.length === 0) {
      if (checkErrorsinstruction()) {
        const addDataInstruction = {
          recordId:
            data && data.dctdata && data.dctdata._id ? data.dctdata._id : "",
          instructionName: instructionName,
          instructionDiscription: instructionDiscription,
        };
        setInstructionFormDatas({
          ...addDataInstruction,
          instructionName: "",
          instructionDiscription: "",
        });

        let temp = [];
        temp.push(...AddedInstructionDetails, addDataInstruction);
        AddInstructionDetails(temp);
      }
    }
  };

  const onRemoveInstructionsChange = (instructionName) => {
    const removeList = AddedInstructionDetails.filter(
      (AddInstructionDetails) =>
        AddInstructionDetails.instructionName !== instructionName
    );
    AddInstructionDetails(removeList);
  };
  //add instruction end
  const allcountry = [];
  activeCountry.map((country) =>
    allcountry.push({
      countryId: country._id,
      countrycode: country.countryCode,
      label: country.countryName + " (" + country.countryCode + ")",
      value: country.countryName,
    })
  );

  const [country, getcountryData] = useState(
    data && data.dctdata
      ? allcountry &&
          allcountry.filter((x) => x.countryId === data.dctdata.countryId)[0]
      : ""
  );
  const [countryId, setcountryID] = useState(data && data.dctdata.countryId);
  const [countryName, setcountryName] = useState(
    data && data.dctdata.countryName
  );
  const [countrycode, setcountrycode] = useState(
    data && data.dctdata.countrycode
  );
  const oncountryChange = (e) => {
    var countryId = "";
    var countrycode = "";
    var countryName = "";
    countrycode = e.countrycode;

    getcountryData(e);
    countryId = e.countryId;
    countryName = e.value;
    setcountryID(countryId);
    setcountrycode(countrycode);
    setcountryName(countryName);
  };

  const [ServicesDetails, SetServiceDetails] = useState(
    data && data.dctdata && data.dctdata.services
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
  const allpaymentmodes = [];
  paymentMode.map((payment) =>
    allpaymentmodes.push({
      paymentId: payment._id,
      label: payment.paymentModeName,
      value: payment.paymentModeName,
    })
  );

  const [payment, getStateData] = useState(
    data && data.dctdata
      ? allpaymentmodes &&
          allpaymentmodes.filter(
            (x) => x.paymentId === data.dctdata.paymentId
          )[0]
      : ""
  );
  const [paymentId, setpaymentId] = useState(data && data.dctdata.paymentId);
  const [paymentModeName, setpaymentname] = useState(
    data && data.dctdata.paymentModeName
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

  const onClientTypeChange = (e) => {
    if (e) {
      setFormData({
        ...formData,
        clientType: e,
      });
    }
  };

  const [showEditModal, setShowEditModal] = useState(false);
  const handleEditModalClose = () => setShowEditModal(false);

  const onEditModalChange = (e) => {
    if (e) {
      handleEditModalClose();
    }
  };

  const [userDatas, setUserDatas] = useState(null);
  const [userDatas1, setUserDatas1] = useState(
    data && data.dctdata && data.dctdata._id
  );
  const onUpdate = (staff, idx) => {
    setShowEditModal(true);
    setUserDatas(staff);
    setUserDatas1(data.dctdata);
  };

  const [showInstructionEditModal, setshowInstructionEditModal] =
    useState(false);
  const handleEditInstructionModalClose = () =>
    setshowInstructionEditModal(false);

  const onEditInstructionModalChange = (e) => {
    if (e) {
      handleEditInstructionModalClose();
    }
  };

  const [intructionDatas, setintructionDatas] = useState(null);
  const [intructionDatas1, setintructionDatas1] = useState(
    data && data.dctdata && data.dctdata._id
  );
  const onUpdateinstructions = (instructions, idx) => {
    setshowInstructionEditModal(true);
    setintructionDatas(instructions);
    setintructionDatas1(data.dctdata);
  };

  const [userDatadeactive, setUserDatadeactive] = useState(null);
  const onDeactive = (staff, idx) => {
    setShowDeactiveModal(true);
    setUserDatadeactive(staff);
  };

  const [showDeactiveModal, setShowDeactiveModal] = useState(false);
  const handleDeactiveModalClose = () => setShowDeactiveModal(false);

  const onDeactiveModalChange = (e) => {
    if (e) {
      handleDeactiveModalClose();
    }
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
    data && data.dctdata && data.dctdata
      ? allemp &&
          allemp.filter(
            (x) => x.empId === data.dctdata.dctClientAssignedToId
          )[0]
      : ""
  );
  const [empId, setempID] = useState(
    data && data.dctdata && data.dctdata.dctClientAssignedToId
  );
  const [empName, setNameID] = useState(
    data && data.dctdata && data.dctdata.dctClientAssignedToName
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

  const onSubmitDeactive = (e) => {
    e.preventDefault();
    const finalData = {
      recordId: data.dctdata ? data.dctdata._id : "",
      staffId: userDatadeactive ? userDatadeactive._id : "",
      staffDeactivateById: user._id,
      staffDeactiveByDateTime: new Date().toLocaleString("en-GB"),
      staffStatus: "Deactive",
      staffDeactiveReason: staffDeactiveReason,
      staffFilter: staffFilter,
    };
    deactivateDctClientStaffDetails(finalData);
    onDeactiveModalChange(true);
    // ondivcloseChange(true);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      recordId: data.dctdata ? data.dctdata._id : "",
      companyName: companyName.charAt(0).toUpperCase() + companyName.slice(1),
      website: website?.trim(),
      clientName: clientName.charAt(0).toUpperCase() + clientName.slice(1),
      clientCompanyFounderName: clientCompanyFounderName?.trim(),
      emailId: emailId?.trim(),
      clientEmail: clientEmail?.trim(),
      clientType: clientType.value ? clientType.value : "",
      billingEmail: billingEmail?.trim(),
      clientCurrency: clientCurrency?.trim(),
      phone1: phone1,
      phone2: phone2,
      paymentId: paymentId ? paymentId : null,
      clientFolderName: clientFolderName?.trim(),
      paymentModeName: paymentModeName ? paymentModeName : "",
      address: address?.trim(),
      importantPoints: importantPoints?.trim(),
      countryId: countryId ? countryId : null,
      countryName: countryName ? countryName : "",
      countryCode: countrycode,
      dctClientStatus: "Active",
      dctClientCategory: clientType.value === "Test" ? "TC" : "RC",
      dctCallDate: new Date().toISOString().split("T")[0],
      services: ServicesDetails,
      dctClientEditedById: user._id,
      dctClientEditedDateTime: new Date().toLocaleString("en-GB"),
      dctClientAssignedToId: empId ? empId : null,
      dctClientAssignedToName: empName ? empName : "",
      staffFilter: staffFilter,
    };

    editDctClientsDetails(finalData);
    let i = 0;
    for (i = 0; i < AddedDetails.length; i++) {
      addNewDctClientStaffDetails(AddedDetails[i]);
    }
    let j = 0;
    for (j = 0; j < AddedInstructionDetails.length; j++) {
      addNewDctClientInstructionDetails(AddedInstructionDetails[j]);
    }

    setFormData({
      ...formData,

      isSubmitted: true,
    });
  };
  const [tabIndex, setTabIndex] = useState(0);

  const NextBackBtn = (tabIndex) => {
    setTabIndex(tabIndex);
  };
  if (!data) {
    return <Redirect to="/all-dct-client" />;
  }
  if (isSubmitted) {
    return <Redirect to="/all-dct-client" />;
  }

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onInputChange1 = (e) => {
    setError1({
      ...error1,
      nametypeIdChecker: true,
      nametypeIdErrorStyle: { color: "#000" },
    });
    setFormDatas({ ...addData, [e.target.name]: e.target.value });
  };

  return !isAuthenticated || !user ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align">
        <div className="row col-lg-12 col-md-11 col-sm-12 col-12">
          <div className="col-lg-10 col-md-11 col-sm-12 col-12">
            <h2 className="heading_color">Edit DCT Client </h2>
          </div>
          <div className="col-lg-2 col-md-11 col-sm-12 col-12 py-2">
            <Link className="btn btn_green_bg float-right" to="/all-dct-client">
              Back
            </Link>
          </div>
        </div>

        <section className="sub_reg">
          <Tabs selectedIndex={tabIndex}>
            <div className="row col-lg-11 col-md-11 col-sm-12 col-12">
              <TabList>
                <Tab tabfor="0">Company Info</Tab>
                <Tab tabfor="1">Contact Details</Tab>
                <Tab tabfor="2">Instructions</Tab>
              </TabList>
            </div>

            <TabPanel tabId="0">
              <div className="row card-new ">
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
                    type="email"
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
                    type="email"
                    name="billingEmail"
                    value={billingEmail}
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                  <label className="label-control">Phone 1* :</label>
                  <input
                    type="number"
                    name="phone1"
                    value={phone1}
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                    maxLength="12"
                    minLength={10}
                    onKeyDown={(e) =>
                      (e.keyCode === 69 || e.keyCode === 190) &&
                      e.preventDefault()
                    }
                    required
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
                    maxLength="12"
                    minLength={10}
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
                <div className="col-lg-6 col-md-6 col-sm-6 col-12 no_padding">
                  {user.empCtAccess && user.empCtAccess === "All" ? (
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
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
                </div>

                <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                  <label className="label-control">Services :</label>
                </div>
                <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                  <label className="label-control">Imaging</label>
                  <input
                    type="checkbox"
                    id="Unconfirmed"
                    checked={ImagingChecked}
                    value="Imaging"
                    onChange={(e) => onServicesChange(e)}
                  />
                </div>
                <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                  <label className="label-control">CGI</label>
                  <input
                    type="checkbox"
                    id="Unconfirmed"
                    checked={CGIChecked}
                    value="CGI"
                    onChange={(e) => onServicesChange(e)}
                  />
                </div>
                <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                  <label className="label-control">Video Editing</label>
                  <input
                    type="checkbox"
                    id="Unconfirmed"
                    checked={videoEditingChecked}
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
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <input
                    type="submit"
                    name="submit"
                    onClick={(e) => NextBackBtn(1)}
                    value="Next"
                    className="btn sub_form btn_continue Save float-right"
                  />
                </div>
              </div>
            </TabPanel>
            <TabPanel tabId="1">
              <div className="row col-lg-12 col-md-11 col-sm-12 col-12 ">
                <div className="col-lg-6 col-md-12 col-sm-12 col-12 py-3">
                  <div className="row card-new  py-3">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                      <h5>Contact Info</h5>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                      <label
                        className="label-control"
                        style={nametypeIdErrorStyle}
                      >
                        Staff Name:
                      </label>
                      <input
                        type="text"
                        name="staffName"
                        value={staffName}
                        className="form-control"
                        onChange={(e) => onInputChange1(e)}
                      />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                      <label className="label-control">Email Id :</label>
                      <input
                        type="email"
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
                      <button
                        variant="success"
                        className="btn sub_form btn_continue Save float-right"
                        onClick={(e) => onAdd(e)}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 col-12 py-3">
                  <div style={{ height: "350px" }}>
                    <div
                      className="row card-new"
                      style={{ overflowY: "scroll", maxHeight: "340px" }}
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
                            <th>Op</th>
                          </tr>
                        </thead>
                        <tbody>
                          {staffData &&
                            staffData.staffs &&
                            staffData.staffs.map((staff, idx) => {
                              if (staff.staffStatus === "Active")
                                return (
                                  <tr key={idx}>
                                    <td>{staff.staffName}</td>
                                    <td>{staff.staffRegion}</td>
                                    <td>{staff.staffPhoneNumber}</td>
                                    <td>{staff.staffEmailId}</td>
                                    <td>{staff.staffDesignation}</td>
                                    <td>
                                      <img
                                        className="img_icon_size log"
                                        onClick={() => onDeactive(staff, idx)}
                                        src={require("../../static/images/delete.png")}
                                        alt="Delete Staff"
                                        title="Delelte Staff"
                                      />
                                      &nbsp;
                                      <img
                                        className="img_icon_size log"
                                        onClick={() => onUpdate(staff, idx)}
                                        src={require("../../static/images/edit_icon.png")}
                                        alt="Edit"
                                        title="Edit"
                                      />
                                    </td>
                                  </tr>
                                );
                            })}
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
                                      className="img_icon log"
                                      onClick={() =>
                                        onRemoveChange(AddDetail.staffName)
                                      }
                                      src={require("../../static/images/redCross.png")}
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
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <input
                      type="submit"
                      name="submit"
                      value="Next"
                      onClick={() => NextBackBtn(2)}
                      className="btn sub_form btn_continue Save float-right"
                    />
                    <button
                      className="btn sub_form btn_continue Save float-right"
                      onClick={() => NextBackBtn(0)}
                    >
                      Previous
                    </button>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel tabId="2">
              <div className="row col-md-12 col-lg-12 col-sm-12 col-12 ">
                <div className="col-lg-6 col-md-12 col-sm-12 col-12 py-3">
                  <div className="row card-new  py-3">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                      <h5>Instructions</h5>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                      <label
                        className="label-control"
                        style={InstructionnametypeIdErrorStyle}
                      >
                        Instructions Name:
                      </label>
                      <input
                        type="text"
                        name="instructionName"
                        value={instructionName}
                        className="form-control"
                        onChange={(e) => onInputChange2(e)}
                      />
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                      <label className="label-control">Instructions :</label>
                      <textarea
                        name="instructionDiscription"
                        id="instructionDiscription"
                        className="textarea form-control"
                        rows="3"
                        placeholder="Instructions"
                        style={{ width: "100%" }}
                        value={instructionDiscription}
                        onChange={(e) => onInputChange2(e)}
                      ></textarea>
                    </div>

                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                      <button
                        variant="success"
                        className="btn sub_form btn_continue Save float-right"
                        onClick={(e) => onAddInstructions(e)}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 col-12 py-3">
                  <div className="row card-new">
                    <table
                      className="tabllll table table-bordered table-striped table-hover"
                      id="datatable2"
                    >
                      <thead>
                        <tr>
                          <th>Instructions Name</th>
                          <th>Instructions </th>
                          <th>Remove </th>
                        </tr>
                      </thead>
                      <tbody>
                        {instructionData &&
                          instructionData.instructions &&
                          instructionData.instructions.map(
                            (instructions, idx) => {
                              return (
                                <tr key={idx}>
                                  <td>{instructions.instructionName}</td>
                                  <td>{instructions.instructionDiscription}</td>

                                  <td>
                                    <img
                                      className="img_icon_size log"
                                      onClick={() =>
                                        onUpdateinstructions(instructions, idx)
                                      }
                                      src={require("../../static/images/edit_icon.png")}
                                      alt="Edit"
                                      title="Edit"
                                    />
                                  </td>
                                </tr>
                              );
                            }
                          )}

                        {AddedInstructionDetails &&
                          AddedInstructionDetails.map(
                            (AddedInstructionDetail, idx) => {
                              return (
                                <tr key={idx}>
                                  <td>
                                    {AddedInstructionDetail.instructionName}
                                  </td>
                                  <td>
                                    {
                                      AddedInstructionDetail.instructionDiscription
                                    }
                                  </td>

                                  <td>
                                    <img
                                      className="img_icon_size log"
                                      onClick={() =>
                                        onRemoveInstructionsChange(
                                          AddedInstructionDetail.instructionName
                                        )
                                      }
                                      src={require("../../static/images/close-buttonRed.png")}
                                      alt="Remove"
                                      title="Remove"
                                    />
                                  </td>
                                </tr>
                              );
                            }
                          )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <form className="row" onSubmit={(e) => onSubmit(e)}>
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <input
                    type="submit"
                    name="Save"
                    value="Submit"
                    className="btn sub_form btn_continue Save float-right"
                  />
                  <button
                    className="btn sub_form btn_continue Save float-right"
                    onClick={() => NextBackBtn(1)}
                  >
                    Previous
                  </button>
                </div>
                <div className="col-lg-8 col-md-6 col-sm-12 col-12">
                  <label className="label-control colorRed">
                    * Indicates mandatory fields, Please fill mandatory fields
                    before Submit
                  </label>
                </div>
              </form>
            </TabPanel>
          </Tabs>
        </section>

        <Modal
          show={showEditModal}
          backdrop="static"
          keyboard={false}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <div className="col-lg-10">
              <h3 className="modal-title text-center">Edit Staff Details</h3>
            </div>
            <div className="col-lg-1">
              <button onClick={handleEditModalClose} className="close">
                <img
                  src={require("../../static/images/close.png")}
                  alt="X"
                  style={{ height: "20px", width: "20px" }}
                />
              </button>
            </div>
          </Modal.Header>
          <Modal.Body>
            <EditContact
              onEditModalChange={onEditModalChange}
              allStaffdata={userDatas}
              allleaddata={userDatas1}
              from={
                data && data.dctdata.clientType === "Test"
                  ? "TestClient"
                  : "RegularClient"
              }
              staffFilter={staffFilter}
            />
          </Modal.Body>
        </Modal>

        <Modal
          show={showDeactiveModal}
          backdrop="static"
          keyboard={false}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <div className="col-lg-10">
              <h3 className="modal-title text-center">Deactivate Lead</h3>
            </div>
            <div className="col-lg-1">
              <button onClick={handleDeactiveModalClose} className="close">
                <img
                  src={require("../../static/images/close.png")}
                  alt="X"
                  style={{ height: "20px", width: "20px" }}
                />
              </button>
            </div>
          </Modal.Header>
          <Modal.Body>
            <form className="row" onSubmit={(e) => onSubmitDeactive(e)}>
              <div className="col-lg-12 col-md-11 col-sm-12 col-12 ">
                <label className="label-control">Deactive Staff Reason :</label>
                <textarea
                  name="staffDeactiveReason"
                  id="staffDeactiveReason"
                  className="textarea form-control"
                  rows="3"
                  placeholder="Staff Deactive Reason"
                  style={{ width: "100%" }}
                  value={staffDeactiveReason}
                  onChange={(e) => onInputChange(e)}
                  required
                ></textarea>
              </div>
              <div
                className="row col-lg-12 col-md-11 col-sm-12 col-12 Savebutton no_padding"
                size="lg"
              >
                <div className="col-lg-8 col-md-6 col-sm-12 col-12">
                  <label className="label-control colorRed">
                    * Indicates mandatory fields.
                  </label>
                </div>
                <div className="col-lg-12 col-md-6 col-sm-12 col-12">
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
                </div>
              </div>
            </form>
          </Modal.Body>
        </Modal>

        <Modal
          show={showInstructionEditModal}
          backdrop="static"
          keyboard={false}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <div className="col-lg-10">
              <h3 className="modal-title text-center">
                Edit Instruction Details
              </h3>
            </div>
            <div className="col-lg-1">
              <button
                onClick={handleEditInstructionModalClose}
                className="close"
              >
                <img
                  src={require("../../static/images/close.png")}
                  alt="X"
                  style={{ height: "20px", width: "20px" }}
                />
              </button>
            </div>
          </Modal.Header>
          <Modal.Body>
            <EditInstructions
              onEditInstructionModalChange={onEditInstructionModalChange}
              allInstructiondata={intructionDatas}
              allleaddata={intructionDatas1}
              from={
                data && data.dctdata.clientType === "Test"
                  ? "TestClient"
                  : "RegularClient"
              }
              instructionFilter={instructionFilter}
            />
          </Modal.Body>
        </Modal>
      </div>
    </Fragment>
  );
};

EditDctClients.propTypes = {
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  regions: PropTypes.object.isRequired,
  getALLPaymentMode: PropTypes.func.isRequired,
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
  editDctClientsDetails,
  getALLPaymentMode,
  getActiveCountry,
  deactivateDctClientStaffDetails,
  addNewDctClientStaffDetails,
  addNewDctClientInstructionDetails,
  getMarketingEmployee,
  getStaffsData,
  getInstructionData,
})(EditDctClients);
