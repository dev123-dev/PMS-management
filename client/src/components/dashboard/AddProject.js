import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import {
  getActiveClientsFilter,
  getActiveStaffFilter,
  getEmployerDetails,
} from "../../actions/client";
import { getAllProjectStatus, addProject } from "../../actions/projects";
import { Redirect } from "react-router-dom";
import DatePicker from "react-datepicker";
const clientTypeVal = [
  { value: "Regular", label: "Regular Client" },
  { value: "Test", label: "Test Client" },
];

const priorityVal = [
  { value: "Low", label: "Low" },
  { value: "Mid", label: "Mid" },
  { value: "High", label: "High" },
];

const AddProject = ({
  auth: { isAuthenticated, user, users, loading },

  settings: { paymentMode },
  client: { activeClientFilter, activeStaffFilter, empdetails },
  project: { allProjectStatus },
  getActiveClientsFilter,
  getActiveStaffFilter,
  getAllProjectStatus,
  getEmployerDetails,
  addProject,
}) => {
  useEffect(() => {
    getAllProjectStatus();
  }, [getAllProjectStatus]);
  useEffect(() => {
    getActiveClientsFilter();
  }, [getActiveClientsFilter]);
  useEffect(() => {
    getActiveStaffFilter();
  }, [getActiveStaffFilter]);

  useEffect(() => {
    getEmployerDetails();
  }, [getEmployerDetails]);

  console.log("empdetails", empdetails);

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
    clientType: clientTypeVal[0],
    clientName: "",
    projectName: "",
    qty: "",
    outputformat: "",
    priority: "",
    deadline: "",
    projectStatus: "",
    projectDate: "",
    // projectTime: "",
    clientDate: "",
    clientTime: "",
    Instructions: "",
    inputpath: "",
    review: false,
    isSubmitted: false,
  });

  const {
    inputpath,
    projectName,
    qty,
    outputformat,
    priority,
    deadline,
    // projectTime,
    clientTime,
    Instructions,
    clientType,
    review,
    isSubmitted,
  } = formData;

  const activeClientsOpt = [];
  activeClientFilter.map((clientsData) =>
    activeClientsOpt.push({
      clientId: clientsData._id,
      belongsToId: clientsData.clientBelongsToId,
      belongsTo: clientsData.clientBelongsToName,
      folderName: clientsData.clientFolderName,
      label: clientsData.clientName,
      value: clientsData.clientName,
    })
  );
  const Activestaff = activeClientFilter
    .map((ele) =>
      ele.staffs.map((ele1) => {
        return {
          ...ele1,
          clientName: ele.clientName,
          clientId: ele._id,
          clientFolderName: ele.clientFolderName,
        };
      })
    )
    .flat(1);
  //.flat(1);

  const selectStaff = Activestaff.map((ele) => {
    return {
      sId: ele._id,
      label: ele.staffName,
      value: ele.staffName,
      clientId: ele._id,
      clientName: ele.clientName,
      clientFolderName: ele.clientFolderName,
    };
  });
  // console.log("228", activeClientFilter[3]);
  const projectStatusOpt = [];
  // console.log(projectStatusOpt[1], "projectStatusOpt[1]");
  // console.log(projectStatusOpt, "projectStatusOpt");
  let activeProjectStatus = JSON.parse(
    localStorage.getItem("activeProjectStatus")
  );
  // console.log(activeProjectStatus);
  activeProjectStatus &&
    activeProjectStatus.map((projStatusData) =>
      projectStatusOpt.push({
        projStatusId: projStatusData._id,
        label: projStatusData.projectStatusType,
        value: projStatusData.projectStatusType,
      })
    );

  const empdetailsopt = [];
  empdetails &&
    empdetails.map((emp) =>
      empdetailsopt.push({
        empId: emp._id,
        label: emp.empFullName,
        value: emp.empFullName,
      })
    );

  const [clientData, setClientData] = useState("");
  const [clientId, setClientId] = useState("");

  // const [clientBelongsTo, setBelongsToVal] = useState("");
  const [clientFolderName, setFolderNameVal] = useState("");

  const onClientChange = (e) => {
    //Required Validation starts
    // setError({
    //   ...error,
    //   clientnameIdChecker: true,
    //   clientnameIdErrorStyle: { color: "#000" },
    // });
    //Required Validation ends
    if (e) {
      setFormData({
        ...formData,
        clientId: clientId,
      });
      let clientVal = {
        clientId: e.clientId,
      };
      getActiveStaffFilter(clientVal);
    }
    setClientData(e);
    setClientId(e.clientId);
    // setBelongsToVal(e.belongsTo);

    setFolderNameVal(e.folderName);
  };

  const [projectStatusData, setProjectStatusData] = useState(
    projectStatusOpt[1]
  );

  const [projectStatusId, setprojectStatusId] = useState("");
  const [projectStatusType, setprojectStatusType] = useState("");
  const onProjectStatusChange = (e) => {
    //Required Validation starts
    setError({
      ...error,
      projectstatusChecker: true,
      projectstatusErrorStyle: { color: "#000" },
    });
    //Required Validation ends
    setProjectStatusData(e);
    var projectStatusId = "";
    var projectStatusType = "";

    projectStatusId = e.projStatusId;
    projectStatusType = e.value;
    setprojectStatusId(projectStatusId);
    setprojectStatusType(projectStatusType);
  };

  const [empdata, setempdata] = useState("");

  const onReviewerChange = (e) => {
    setempdata(e);
  };

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onClientTypeChange = (e) => {
    //Required Validation starts
    setError({
      ...error,
      ClientIdChecker: true,
      ClientErrorStyle: { color: "#000" },
    });
    //Required Validation ends
    if (e) {
      setFormData({
        ...formData,
        clientType: e,
      });
      let clientTypeVal = {
        clientTypeinfo: e.value,
      };
      getActiveClientsFilter(clientTypeVal);
    }
    setClientData("");
    // setBelongsToVal("");
    setFolderNameVal("");
  };

  const priorityToChange = (e) => {
    //Required Validation starts
    // setError({
    //   ...error,
    //   ClientIdChecker: true,
    //   ClientErrorStyle: { color: "#000" },
    // });
    //Required Validation ends
    if (e) {
      setFormData({
        ...formData,
        priority: e,
      });
    }
  };
  const [startprojectDate, setprojectDate] = useState("");
  const [startprojectShow, setprojectShow] = useState("");

  const onDateChange = (e) => {
    setError({
      ...error,
      projectdateChecker: true,
      projectdateErrorStyle: { color: "#000" },
    });

    var newDate = e;
    var calDate = new Date(newDate);
    var dd1 = calDate.getDate();
    var mm2 = calDate.getMonth() + 1;
    var yyyy1 = calDate.getFullYear();
    if (dd1 < 10) {
      dd1 = "0" + dd1;
    }

    if (mm2 < 10) {
      mm2 = "0" + mm2;
    }
    var clientEndDate = yyyy1 + "-" + mm2 + "-" + dd1;
    setprojectDate(clientEndDate);
    var clientEndDate = dd1 + "-" + mm2 + "-" + yyyy1;
    setprojectShow(clientEndDate);
  };

  const handleOnOtherChange = () => {
    setFormData({
      ...formData,
      review: !review,
    });
    //setProjectStatusData(projectStatusOpt || projectStatusOpt[1]);
  };

  const [startclientDate, setclientDate] = useState("");
  const [startclientShow, SetstartclientShow] = useState("");

  const onDateChange1 = (e) => {
    setError({
      ...error,
      clientdateChecker: true,
      clientdateErrorStyle: { color: "#000" },
    });
    var newDate = e;
    var calDate = new Date(newDate);
    var dd1 = calDate.getDate();
    var mm2 = calDate.getMonth() + 1;
    var yyyy1 = calDate.getFullYear();
    if (dd1 < 10) {
      dd1 = "0" + dd1;
    }

    if (mm2 < 10) {
      mm2 = "0" + mm2;
    }
    var clientEndDate = yyyy1 + "-" + mm2 + "-" + dd1;
    setclientDate(clientEndDate);
    var clientEndDate = dd1 + "-" + mm2 + "-" + yyyy1;
    SetstartclientShow(clientEndDate);
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  const allstaffs = [];
  activeStaffFilter[0] &&
    activeStaffFilter[0].staffs.map((staff) =>
      allstaffs.push({
        sId: staff._id,
        label: staff.staffName,
        value: staff.staffName,
      })
    );
  // //validation for select project date
  // const [errors, setErrors] = useState({
  //   projectdateChecker: false,
  //   projectdateErrorStyle: {},
  // });
  // const { projectdateChecker, projectdateErrorStyle } = errors;

  // const checkError = () => {
  //   if (!projectdateChecker) {
  //     setErrors({
  //       ...errors,
  //       projectdateErrorStyle: { color: "#F00" },
  //     });
  //     return false;
  //   }

  //   return true;
  // };
  // //validation for select client date
  // const [errors1, setErrors1] = useState({
  //   clientdateChecker: false,
  //   clientdateErrorStyle: {},
  // });
  // const { clientdateChecker, clientdateErrorStyle } = errors1;

  // const checkError1 = () => {
  //   if (!clientdateChecker) {
  //     setErrors({
  //       ...errors,
  //       clientdateErrorStyle: { color: "#F00" },
  //     });
  //     return false;
  //   }

  //   return true;
  // };

  const [staff, getstaffData] = useState("");

  const [staffId, setstaffID] = useState("");
  const [staffName, setstaffName] = useState("");

  const [ActiveClientId, setActiveClientId] = useState(null);
  const [ActiveClientName, setActiveClientName] = useState("");
  const [ActiveClientFolder, setActiveClientfolder] = useState("");
  const onStaffChange = (e) => {
    //console.log(e);

    setError({
      ...error,
      staffNameIdChecker: true,
      staffNameIdErrorStyle: { color: "#000" },
    });

    setActiveClientId(e.clientId);
    setActiveClientName(e.clientName);
    setActiveClientfolder(e.clientFolderName);

    //Required Validation end

    var staffId = "";
    var staffName = "";
    getstaffData(e);

    staffId = e.sId;
    staffName = e.value;

    setstaffID(staffId);
    setstaffName(staffName);
  };
  console.log("ActiveClientId", ActiveClientId);
  //Required Validation Starts

  const [error, setError] = useState({
    // clientnameIdChecker: false,
    // clientnameIdErrorStyle: {},
    staffNameIdChecker: false,
    staffNameIdErrorStyle: {},
    // ClientIdChecker: true,
    // ClientErrorStyle: {},
    projectstatusChecker: true,
    projectstatusErrorStyle: {},

    projectdateChecker: false,
    projectdateErrorStyle: {},

    clientdateChecker: false,
    clientdateErrorStyle: {},
  });
  const {
    // clientnameIdChecker,
    // clientnameIdErrorStyle,
    staffNameIdChecker,
    staffNameIdErrorStyle,
    projectdateChecker,
    projectdateErrorStyle,
    clientdateChecker,

    clientdateErrorStyle,
    ClientErrorStyle,
    projectstatusChecker,
    projectstatusErrorStyle,
  } = error;

  const checkErrors = () => {
    // if (!ClientIdChecker) {
    //   setError({
    //     ...error,
    //     ClientErrorStyle: { color: "#F00" },
    //   });
    //   return false;
    // }

    // if (!clientnameIdChecker) {
    //   setError({
    //     ...error,
    //     clientnameIdErrorStyle: { color: "#F00" },
    //   });
    //   return false;
    // }

    if (!staffNameIdChecker) {
      setError({
        ...error,
        staffNameIdErrorStyle: { color: "#F00" },
      });
      return false;
    }

    if (!projectstatusChecker) {
      setError({
        ...error,
        projectstatusErrorStyle: { color: "#F00" },
      });
      return false;
    }
    if (!projectdateChecker) {
      setError({
        ...error,
        projectdateErrorStyle: { color: "#F00" },
      });
      return false;
    }
    if (!clientdateChecker) {
      setError({
        ...error,
        clientdateErrorStyle: { color: "#F00" },
      });
      return false;
    }

    return true;
  };
  const date = new Date();
  const projectEnteredTime =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

  const onSubmit = (e) => {
    e.preventDefault();
    if (checkErrors()) {
      const finalData = {
        projectName: projectName?.trim(),
        clientId: ActiveClientId, //clientId,
        clientName: ActiveClientName, //clientData.value, //
        clientFolderName: ActiveClientFolder, //ActiveClientFolder
        staffName: staffName,
        staffId: staffId,
        // parentClientId: clientData.belongsToId,
        //  parentClientName: clientBelongsTo,
        inputpath: inputpath?.trim(),

        projectPriority: priority.value || "",
        projectNotes: Instructions?.trim(),
        projectDeadline: deadline?.trim(),
        projectStatusType: projectStatusData.value || projectStatusType,
        projectStatusId: projectStatusData.projStatusId || projectStatusId,
        projectQuantity: qty,
        projectUnconfirmed: isChecked,
        clientTypeVal: clientType.value,

        //   projectTime: projectTime,
        projectDate: startprojectDate,
        projectTime: projectEnteredTime,
        //  projectDate: todayDateymd,
        clientTime: clientTime,
        outputformat: outputformat?.trim(),
        clientDate: startclientDate,
        projectEnteredById: user._id,
        projectEnteredByName: user.empFullName,
      };
      // console.log("finalData", finalData);
      addProject(finalData);
      setFormData({
        ...formData,
        isSubmitted: true,
      });
    }
  };
  console.log("projectStatusOpt", projectStatusOpt);
  if (isSubmitted) {
    return <Redirect to="/job-queue" />;
  }
  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      {" "}
      <div className="container container_align">
        <form className="row" onSubmit={(e) => onSubmit(e)}>
          <div className="col-lg-12 col-md-11 col-sm-12 col-12">
            <h2 className="heading_color">Add New Project </h2>
            <hr />
          </div>
          <section className="sub_reg">
            <div className="row col-lg-12 col-md-11 col-sm-12 col-12 ">
              <div className="col-lg-6 col-md-12 col-sm-12 col-12 ">
                {/* Client INFO */}
                <div
                  className="row card-new mb-3"
                  style={{ paddingBottom: "62px" }}
                >
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12 pb-3">
                    <h5>Client Info</h5>
                  </div>

                  <div className="col-lg-6 col-md-11 col-sm-12 col-12 ">
                    <label>
                      Client Type<i className="text-danger">*</i> :
                    </label>
                    {/* style={ClientErrorStyle} */}
                    <Select
                      name="clientType"
                      isSearchable={true}
                      options={clientTypeVal}
                      value={clientType || clientTypeVal[0]}
                      placeholder="Select"
                      onChange={(e) => onClientTypeChange(e)}
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <label style={staffNameIdErrorStyle}>
                      Staff Name<i className="text-danger">*</i> :
                    </label>
                    {/* <Select selectStaff
                      name="stateName"
                      options={allstaffs}
                      isSearchable={true}
                      value={staff}
                      placeholder="Select Staff"
                      onChange={(e) => onStaffChange(e)}
                    /> */}
                    <Select
                      name="stateName"
                      options={selectStaff}
                      isSearchable={true}
                      value={staff}
                      placeholder="Select Staff"
                      onChange={(e) => onStaffChange(e)}
                    />
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <label>Client Name:</label>
                    {/* style={clientnameIdErrorStyle} */}
                    <input
                      type="text"
                      name="ActiveClientName"
                      value={ActiveClientName}
                      className="form-control"
                      // onChange={(e) => onInputChange(e)}
                      disabled
                    />
                    {/* <Select
                      name="clientData"
                      isSearchable={true}
                      value={clientData}
                      options={activeClientsOpt}
                      placeholder="Select"
                      onChange={(e) => onClientChange(e)}
                    /> */}
                  </div>

                  {/* <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <label className="label-control">Belongs to :</label>
                    <input
                      type="text"
                      name="clientBelongsTo"
                      value={clientBelongsTo}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                      disabled
                    />
                  </div> */}
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12 pb-5">
                    <label>Client folder Name :</label>
                    <input
                      type="text"
                      name="clientFolderName"
                      value={ActiveClientFolder}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                      disabled
                    />
                  </div>
                </div>
                {/* END */}
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 col-12 ">
                {/* project INFO */}
                <div className="row card-new mb-1 pb-1">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <h5>Project Info</h5>
                  </div>

                  <div className="col-lg-12 col-md-6 col-sm-6 col-12 ">
                    <label
                    //  className="label-control"
                    >
                      Project Name<i className="text-danger">*</i> :
                    </label>
                    <input
                      type="text"
                      name="projectName"
                      value={projectName}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                      required
                    />
                  </div>
                  <div className="col-lg-12 col-md-6 col-sm-6 col-12">
                    <label className="label-control">Input :</label>
                    <input
                      type="text"
                      name="inputpath"
                      value={inputpath}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                    <label className="label-control">
                      Qty<i className="text-danger">*</i> :
                    </label>
                    <input
                      type="Number"
                      name="qty"
                      value={qty}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                      onKeyDown={(e) =>
                        (e.keyCode === 69 || e.keyCode === 190) &&
                        e.preventDefault()
                      }
                      required
                    />
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                    <label className="label-control">Unconfirmed :</label>
                    <input
                      type="checkbox"
                      id="Unconfirmed"
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="col-lg-5 col-md-6 col-sm-6 col-12 py-1">
                    <label className="label-control">Priority :</label>
                    <Select
                      name="priority"
                      value={priority}
                      options={priorityVal}
                      isSearchable={true}
                      placeholder="Select"
                      onChange={(e) => priorityToChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                {/* date info */}
                <div className="row card-new pb-5">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12 pb-1">
                    <h5>Date Info</h5>
                  </div>

                  <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                    <label style={projectdateErrorStyle}>
                      Project Date<i className="text-danger">*</i>:
                    </label>
                    <br />
                    <DatePicker
                      label="Controlled picker"
                      value={startprojectShow}
                      placeholderText="dd-mm-yyyy"
                      onChange={(newValue) => onDateChange(newValue)}
                    />
                    {/* <input
                      type="date"
                      placeholder="dd/mm/yyyy"
                      className="form-control cpp-input datevalidation"
                      name="projectDate"
                      value={startprojectDate}
                      onChange={(e) => onDateChange(e)}
                      style={{
                        width: "75%",
                      }}
                      required
                    /> */}
                  </div>
                  {/* <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <label className="label-control">Project Time* :</label>
                    <br />
                    <input
                      type="time"
                      className="form-control"
                      name="projectTime"
                      value={projectTime}
                      min="00:00"
                      max="24:00"
                      onChange={(e) => onInputChange(e)}
                      // required
                    />
                  </div> */}
                  <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                    <label style={clientdateErrorStyle}>
                      Client Date<i className="text-danger">*</i>:
                    </label>
                    <br />

                    <DatePicker
                      label="Controlled picker"
                      value={startclientShow}
                      placeholderText="dd-mm-yyyy"
                      onChange={(newValue) => onDateChange1(newValue)}
                    />
                    {/* <input
                      type="date"
                      placeholder="dd/mm/yyyy"
                      className="form-control cpp-input datevalidation"
                      name="clientDate"
                      value={startclientDate}
                      onChange={(e) => onDateChange1(e)}
                      style={{
                        width: "75%",
                      }}
                      onKeyDown={(e) => {
                        e.preventDefault();
                      }}
                      required
                    /> */}
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                    <label>Client Time :</label>
                    <input
                      type="time"
                      name="clientTime"
                      value={clientTime}
                      className="form-control"
                      min="00:00"
                      max="24:00"
                      onChange={(e) => onInputChange(e)}
                      // required
                    />
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12 mt-5">
                    <label className="label-control colorRed">
                      * Client Date & Client Time is Mail Date & Mail Time.
                      <br />* Before 2:00 PM Project Date should be previous
                      Date. After 2:00 PM Project Date should be Today’s Date
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 col-12 ">
                {/* Other Info */}
                <div className="row card-new mt-1">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <h5>Other Info</h5>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <span>
                      Review ? :
                      <input
                        style={{
                          height: "20px",
                          width: "20px",
                          borderRadius: "50%",
                          display: "block",
                        }}
                        //value={review}
                        type="checkbox"
                        id="Unconfirmed"
                        onChange={handleOnOtherChange}
                        checked={review}
                      />
                    </span>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                    <label
                      // className="label-control"
                      style={projectstatusErrorStyle}
                    >
                      Project Status<i className="text-danger">*</i> :
                    </label>
                    <Select
                      name="projectStatusData"
                      value={
                        review === true
                          ? projectStatusOpt[28]
                          : projectStatusData || projectStatusOpt[1]
                      }
                      // value={projectStatusData || projectStatusOpt[5]}
                      options={projectStatusOpt}
                      isSearchable={true}
                      placeholder="Select"
                      onChange={(e) => onProjectStatusChange(e)}
                    />
                  </div>
                  {review === true ? (
                    <>
                      <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                        <label
                          // className="label-control"
                          style={projectstatusErrorStyle}
                        >
                          Select Employee<i className="text-danger">*</i> :
                        </label>
                        <Select
                          name="projectempData"
                          options={empdetailsopt}
                          // value={
                          //   review === true
                          //     ? projectStatusOpt[28]
                          //     : projectStatusData || projectStatusOpt[1]
                          // }
                          // // value={projectStatusData || projectStatusOpt[5]}
                          // options={projectStatusOpt}
                          isSearchable={true}
                          placeholder="Select Emp"
                          onChange={(e) => onReviewerChange(e)}
                        />
                      </div>
                    </>
                  ) : (
                    <></>
                  )}

                  <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                    <label
                    //  className="label-control"
                    >
                      Deadline :
                    </label>
                    <input
                      type="text"
                      name="deadline"
                      value={deadline}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>

                  <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                    <label
                    // className="label-control"
                    >
                      Output Format :
                    </label>
                    <input
                      type="text"
                      name="outputformat"
                      value={outputformat}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>

                  <div className="col-lg-12 col-md-11 col-sm-12 col-12 py-2">
                    <label className="label-control">
                      Project Instructions<i className="text-danger">*</i> :
                    </label>
                    <textarea
                      name="Instructions"
                      id="Instructions"
                      className="textarea form-control"
                      rows="4"
                      placeholder="Instructions"
                      style={{ width: "100%" }}
                      value={Instructions}
                      onChange={(e) => onInputChange(e)}
                      required
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
                {console.log(loading) ? (
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
                  to="/job-queue"
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

AddProject.propTypes = {
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  getAllProjectStatus: PropTypes.func.isRequired,
  getActiveClientsFilter: PropTypes.func.isRequired,
  getActiveStaffFilter: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  settings: state.settings,
  client: state.client,
  project: state.project,
});

export default connect(mapStateToProps, {
  getAllProjectStatus,
  getActiveClientsFilter,
  getActiveStaffFilter,
  addProject,
  getEmployerDetails,
})(AddProject);
