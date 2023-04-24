import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import DatePicker from "react-datepicker";
import {
  getActiveClientsFilter,
  getActiveStaffFilter,
} from "../../actions/client";
import { getAllProjectStatus, EditProjectData } from "../../actions/projects";

const clientTypeVal = [
  { value: "Regular", label: "Regular Client" },
  { value: "Test", label: "Test Client" },
];

const priorityVal = [
  { value: "Low", label: "Low" },
  { value: "Mid", label: "Mid" },
  { value: "High", label: "High" },
];

const EditProject = ({
  auth: { isAuthenticated, user, users, loading },
  project: { allProjectStatus },
  getActiveClientsFilter,
  client: { activeClientFilter, activeStaffFilter },
  getAllProjectStatus,
  allProjectdata,
  onEditModalChange,
  EditProjectData,
  getActiveStaffFilter,
}) => {
  useEffect(() => {
    getAllProjectStatus();
  }, [getAllProjectStatus]);
  useEffect(() => {
    let clientTypeVal = {
      clientTypeinfo: allProjectdata && allProjectdata.clientTypeVal,
    };
    getActiveClientsFilter(clientTypeVal);
  }, [getActiveClientsFilter]);

  useEffect(() => {
    getActiveStaffFilter();
  }, [getActiveStaffFilter]);

  //formData
  const [formData, setFormData] = useState({
    projectName:
      allProjectdata && allProjectdata.projectName
        ? allProjectdata.projectName
        : "",
    clientId:
      allProjectdata && allProjectdata.clientId ? allProjectdata.clientId : "",
    clientName:
      allProjectdata && allProjectdata.clientName
        ? allProjectdata.clientName
        : "",
    parentClientId:
      allProjectdata && allProjectdata.parentClientId
        ? allProjectdata.parentClientId
        : "",
    parentClientName:
      allProjectdata && allProjectdata.parentClientId
        ? allProjectdata.parentClientId
        : "",
    projectDate:
      allProjectdata && allProjectdata.projectDate
        ? allProjectdata.projectDate
        : "",
    deadline:
      allProjectdata && allProjectdata.projectDeadline
        ? allProjectdata.projectDeadline
        : "",
    inputpath:
      allProjectdata && allProjectdata.inputpath
        ? allProjectdata.inputpath
        : "",

    qty:
      allProjectdata && allProjectdata.projectQuantity
        ? allProjectdata.projectQuantity
        : "",

    projectStatus:
      allProjectdata && allProjectdata.projectStatus
        ? allProjectdata.projectStatus
        : "",

    projectTime:
      allProjectdata && allProjectdata.projectTime
        ? allProjectdata.projectTime
        : "",
    clientDate:
      allProjectdata && allProjectdata.clientDate
        ? allProjectdata.clientDate
        : "",

    clientTime:
      allProjectdata && allProjectdata.clientTime
        ? allProjectdata.clientTime
        : "",
    Instructions:
      allProjectdata && allProjectdata.projectNotes
        ? allProjectdata.projectNotes
        : "",

    priority:
      allProjectdata && allProjectdata.projectPriority
        ? {
            value: allProjectdata.projectPriority,
            label: allProjectdata.projectPriority,
          }
        : "",
    clientType:
      allProjectdata && allProjectdata.clientTypeVal
        ? {
            value: allProjectdata.clientTypeVal,
            label: allProjectdata.clientTypeVal,
          }
        : "",
    outputformat:
      allProjectdata && allProjectdata.outputformat
        ? allProjectdata.outputformat
        : "",

    isSubmitted: false,
  });

  const {
    projectName,
    qty,
    priority,
    inputpath,

    deadline,
    projectTime,
    outputformat,
    clientTime,
    Instructions,
    clientType,
  } = formData;

  const projectStatusOpt = [];
  allProjectStatus.map((projStatusData) =>
    projectStatusOpt.push({
      projectStatusId: projStatusData._id,
      label: projStatusData.projectStatusType,
      value: projStatusData.projectStatusType,
    })
  );

  let activeClientData = JSON.parse(localStorage.getItem("activeClientData"));
  const activeClientsOpt = [];

  activeClientData &&
    activeClientData.map((clientsData) =>
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

  const [clientData, setClientData] = useState("");
  if (
    clientData === "" &&
    allProjectdata &&
    activeClientsOpt &&
    activeClientsOpt.length > 0
  ) {
    setClientData(
      allProjectdata
        ? activeClientsOpt &&
            activeClientsOpt.filter(
              (x) => x.value === allProjectdata.clientName
            )
        : ""
    );
  }

  const [clientBelongsTo, setBelongsToVal] = useState(
    allProjectdata && allProjectdata.parentClientName
      ? allProjectdata.parentClientName
      : ""
  );

  const [clientBelongsToId, setBelongsToValId] = useState(
    allProjectdata && allProjectdata.parentClientId
      ? allProjectdata.parentClientId
      : ""
  );

  const [clientFolderName, setFolderNameVal] = useState(
    allProjectdata && allProjectdata.clientFolderName
      ? allProjectdata.clientFolderName
      : ""
  );
  const [clientId, setClientId] = useState(
    allProjectdata && allProjectdata.clientId ? allProjectdata.clientId : ""
  );
  const [clientName, setClientName] = useState(
    allProjectdata && allProjectdata.clientName ? allProjectdata.clientName : ""
  );
  const onClientChange = (e) => {
    //Required Validation starts
    setError({
      ...error,

      clientnameIdErrorStyle: { color: "#000" },
    });

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
    setClientName(e.clientName);
    setBelongsToValId(e.belongsToId);
    setBelongsToVal(e.belongsTo);
    setFolderNameVal(e.folderName);
  };

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onClientTypeChange = (e) => {
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
    setClientData(null);
    setBelongsToVal("");
    setFolderNameVal("");
  };
  const [startprojectDate, setprojectDate] = useState(
    allProjectdata && allProjectdata.projectDate
      ? allProjectdata.projectDate
      : ""
  );
  var newDate1 = startprojectDate;

  var calDate1 = new Date(newDate1);
  var dd = calDate1.getDate();
  var mm = calDate1.getMonth() + 1;
  var yyyy = calDate1.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }
  // var clientdate1 = yyyy1 + "-" + mm2 + "-" + dd1;
  var projectEndDate = dd + "-" + mm + "-" + yyyy;
  // SetstartclientShow(clientEndDate);
  // var clientdate1 =

  const [startprojectShow, setprojectShow] = useState(projectEndDate);

  const onDateChange = (e) => {
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

  const [startclientDate, setclientDate] = useState(
    allProjectdata && allProjectdata.clientDate ? allProjectdata.clientDate : ""
  );
  var newDate = startclientDate;

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
  // var clientdate1 = yyyy1 + "-" + mm2 + "-" + dd1;
  var clientEndDate = dd1 + "-" + mm2 + "-" + yyyy1;
  // SetstartclientShow(clientEndDate);
  // var clientdate1 =

  const [startclientShow, SetstartclientShow] = useState(clientEndDate);

  const onDateChange1 = (e) => {
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
  const priorityToChange = (e) => {
    if (e) {
      setFormData({
        ...formData,
        priority: e,
      });
    }
  };

  // const [startprojectDate, setprojectDate] = useState(
  //   allProjectdata && allProjectdata.projectDate
  //     ? allProjectdata.projectDate
  //     : ""
  // );

  // const allstaffs = [];
  // activeStaffFilter[0] &&
  //   activeStaffFilter[0].staffs.map((staff) =>
  //     allstaffs.push({
  //       sId: staff._id,
  //       label: staff.staffName,
  //       value: staff.staffName,
  //     })
  //   );

  const allstaffs =
    activeStaffFilter[0] &&
    activeStaffFilter[0].staffs.map((staff) => ({
      sId: staff._id,
      label: staff.staffName,
      value: staff.staffName,
    }));

  //console.log("na", allProjectdata.staffName);

  // const [staff, getstaffData] = useState(
  //   allProjectdata && allProjectdata
  //     ? allstaffs &&
  //         allstaffs.filter((x) => x.sId === allProjectdata.staffId)[0]
  //     : ""
  // );
  const [staff, getstaffData] = useState({
    label: allProjectdata && allProjectdata.staffName,
    value: allProjectdata && allProjectdata.staffName,
  });

  const [staffId, setstaffID] = useState(
    allProjectdata && allProjectdata.staffId
  );

  // const [staffName, setstaffName] = useState(
  //   allProjectdata && allProjectdata.staffName
  // );
  const [ActiveClientId, setActiveClientId] = useState(
    allProjectdata && allProjectdata.clientId ? allProjectdata.clientId : ""
  );
  const [staffName, setstaffName] = useState(
    allProjectdata && allProjectdata.staffName
  );

  const [ActiveClientName, setActiveClientName] = useState(
    allProjectdata && allProjectdata.clientName ? allProjectdata.clientName : ""
  );

  const [ActiveClientFolder, setActiveClientfolder] = useState(
    allProjectdata && allProjectdata.clientFolderName
      ? allProjectdata.clientFolderName
      : ""
  );
  const onStaffChange = (e) => {
    setActiveClientId(e.clientId);
    setActiveClientName(e.clientName);
    setActiveClientName(e.clientName);

    // console.log(e, "E");
    setActiveClientfolder(e.clientFolderName);
    var staffId = "";
    var staffName = "";
    getstaffData(e);

    staffId = e.sId;
    staffName = e.value;

    setstaffID(staffId);
    setstaffName(staffName);
  };

  // const onDateChange = (e) => {
  //   setprojectDate(e.target.value);
  // };

  // const [startclientDate, setclientDate] = useState(
  //   allProjectdata && allProjectdata.clientDate ? allProjectdata.clientDate : ""
  // );
  // const onDateChange1 = (e) => {
  //   setclientDate(e.target.value);
  // };
  const [isChecked, setIsChecked] = useState(
    allProjectdata && allProjectdata.projectUnconfirmed
      ? allProjectdata.projectUnconfirmed
      : false
  );

  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };
  //Required Validation Starts
  const [error, setError] = useState({
    clientnameIdErrorStyle: {},
  });
  const { clientnameIdErrorStyle } = error;

  const checkErrors = () => {
    if (!clientData) {
      setError({
        ...error,
        clientnameIdErrorStyle: { color: "#F00" },
      });
      return false;
    }

    return true;
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (checkErrors()) {
      const finalData = {
        recordId: allProjectdata ? allProjectdata._id : "",
        projectName: projectName?.trim(),
        clientId: ActiveClientId, //clientId,
        clientName: ActiveClientName, //clientData.value, //
        inputpath: inputpath?.trim(),
        // clientName: clientData[0] ? clientData[0].value : clientData.value,
        // parentClientId: clientBelongsToId ? clientBelongsToId : null,
        // parentClientName: clientBelongsTo ? clientBelongsTo : null,
        clientFolderName: ActiveClientFolder,
        projectPriority: priority.value || "",
        staffName: staffName,
        staffId: staffId,
        projectNotes: Instructions?.trim(),
        projectDeadline: deadline?.trim(),
        projectQuantity: qty,
        projectUnconfirmed: isChecked,
        outputformat: outputformat?.trim(),
        clientTypeVal: clientType.value,
        projectTime: projectTime,
        projectDate: startprojectDate,
        clientTime: clientTime,
        clientDate: startclientDate,
        projectEditedById: user._id,
      };
      console.log(finalData);
      EditProjectData(finalData);
      onEditModalChange(true);
    }
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      {" "}
      <form className="row" onSubmit={(e) => onSubmit(e)}>
        <section className="sub_reg">
          {(user.userGroupName && user.userGroupName === "Administrator") ||
          user.userGroupName === "Super Admin" ||
          user.userGroupName === "Clarical Admins" ? (
            <div className="row col-lg-12 col-md-11 col-sm-12 col-12 ">
              <div className="col-lg-6 col-md-12 col-sm-12 col-12 py-3">
                <div
                  className="row card-new "
                  style={{ paddingBottom: "120px" }}
                >
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <h5>Client Info</h5>
                  </div>

                  <div className="col-lg-6 col-md-11 col-sm-12 col-12">
                    <label>Client Type* :</label>
                    <Select
                      name="clientType"
                      options={clientTypeVal}
                      value={clientType}
                      isSearchable={true}
                      placeholder="Select"
                      onChange={(e) => onClientTypeChange(e)}
                    />
                  </div>
                  <div
                    className="col-lg-6 col-md-6 col-sm-6 col-12"
                    style={{ postion: "Relative", top: "-29px" }}
                  >
                    <label className="label-control">Staff Name* :</label>
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
                    <label style={clientnameIdErrorStyle}>Client Name* :</label>
                    {/* <Select
                      name="clientData"
                      value={clientData}
                      options={activeClientsOpt}
                      isSearchable={true}
                      placeholder="Select"
                      onChange={(e) => onClientChange(e)}
                    /> */}
                    <input
                      type="text"
                      name="clientFolderName"
                      value={ActiveClientName}
                      className="form-control"
                      //onChange={(e) => onInputChange(e)}
                      disabled
                    />
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
                  <div
                    className="col-lg-6 col-md-6 col-sm-6 col-12"
                    style={{ postion: "Relative", top: "-25px" }}
                  >
                    <label className="label-control">
                      Client folder Name :
                    </label>
                    <input
                      type="text"
                      name="ActiveClientFolder"
                      value={ActiveClientFolder}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="col-lg-6 col-md-12 col-sm-12 col-12 py-3">
                {/* // prj Info */}

                <div className="row card-new  py-2">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12 py-1">
                    <h5>Project Info</h5>
                  </div>

                  <div className="col-lg-12 col-md-6 col-sm-6 col-12">
                    <label>Project Name* :</label>
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
                    <label className="label-control">Qty* :</label>

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
                      checked={isChecked}
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="col-lg-5 col-md-6 col-sm-6 col-12 pb-4">
                    <label className="label-control">Priority :</label>
                    <Select
                      name="priority"
                      options={priorityVal}
                      value={priority}
                      isSearchable={true}
                      placeholder="Select"
                      onChange={(e) => priorityToChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 col-12 py-3">
                {/* // prj DAte */}
                <div className="row card-new  py-3">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <h5>Project Dates</h5>
                  </div>

                  <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                    <label>Project Date* :</label>
                    <br />
                    {/* <input
                      type="date"
                      placeholder="dd/mm/yyyy"
                      className="form-control cpp-input datevalidation"
                      name="projectDate"
                      value={startprojectDate}
                      onChange={(e) => onDateChange(e)}
                      style={{
                        width: "100%",
                      }}
                      required
                    /> */}
                    <DatePicker
                      label="Controlled picker"
                      value={startprojectShow}
                      placeholderText="dd-mm-yyyy"
                      onChange={(newValue) => onDateChange(newValue)}
                      required
                    />
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
                      max="23:00"
                      onChange={(e) => onInputChange(e)}
                      // required
                    />
                  </div> */}
                  <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                    <label>Client Date* :</label>
                    <br />
                    {/* <input
                      type="date"
                      placeholder="dd/mm/yyyy"
                      className="form-control cpp-input datevalidation"
                      name="clientDate"
                      value={startclientDate}
                      onChange={(e) => onDateChange1(e)}
                      style={{
                        width: "100%",
                      }}
                      required
                    /> */}
                    <DatePicker
                      label="Controlled picker"
                      value={startclientShow}
                      placeholderText="dd-mm-yyyy"
                      onChange={(newValue) => onDateChange1(newValue)}
                      required
                    />
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                    <label>Client Time :</label>
                    <input
                      type="time"
                      name="clientTime"
                      value={clientTime}
                      className="form-control"
                      min="00:00"
                      max="23:00"
                      onChange={(e) => onInputChange(e)}
                      // required
                    />
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12 ">
                    <label className="label-control colorRed">
                      * Client Date & Client Time is Mail Date & Mail Time.
                      <br />* Before 2:00 PM Project Date should be previous
                      Date. After 2:00 PM Project Date should be Today’s Date
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 col-md-12 col-sm-12 col-12 py-3">
                <div className="row card-new  py-4">
                  {/* <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                        <label
                          className="label-control"
                          
                        >
                          Project Status* :
                        </label>
                        <Select
                          name="projectStatusData"
                          value={projectStatusData}
                          options={projectStatusOpt}
                          isSearchable={false}
                          placeholder="Select"
                          onChange={(e) => onProjectStatusChange(e)}
                        />
                      </div> */}
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <label>Deadline :</label>
                    <input
                      type="text"
                      name="deadline"
                      value={deadline}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <label>Output Format :</label>
                    <input
                      type="text"
                      name="outputformat"
                      value={outputformat}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>

                  <div className="col-lg-12 col-md-11 col-sm-12 col-12 ">
                    <label className="label-control">
                      Project Instructions* :
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
          ) : (
            <></>
          )}
          {(user.designationName &&
            user.designationName === "Shift Incharge & QC") ||
          user.designationName === "Shift & Distribution Incharge" ||
          user.designationName === "Quality Controller & Training" ||
          user.designationName === "Qc Incharge" ||
          user.designationName === "Sr. Graphic Artist" ? (
            <div className="row col-lg-12 col-md-6 col-sm-6 col-12">
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <label className="label-control">Qty* :</label>

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
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <label className="label-control">Unconfirmed :</label>
                <input
                  type="checkbox"
                  id="Unconfirmed"
                  checked={isChecked}
                  onChange={handleOnChange}
                />
              </div>
            </div>
          ) : (
            <></>
          )}
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
              <Link
                to="#"
                className="btn sub_form btn_continue blackbrd float-right"
                onClick={() => onEditModalChange(true)}
              >
                Cancel
              </Link>
            </div>
          </div>
        </section>
      </form>
    </Fragment>
  );
};

EditProject.propTypes = {
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  getAllProjectStatus: PropTypes.func.isRequired,
  getActiveClientsFilter: PropTypes.func.isRequired,
  EditProjectData: PropTypes.func.isRequired,
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
  EditProjectData,
  getActiveStaffFilter,
})(EditProject);
