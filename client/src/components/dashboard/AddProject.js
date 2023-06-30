import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import { Link } from "react-router-dom";
import FileBase64 from "react-file-base64";
import Spinner from "../layout/Spinner";
import Resizer from "react-image-file-resizer";
import FileSaver from "file-saver";
import {
  getActiveClientsFilter,
  getActiveStaffFilter,
  getEmployerDetails,
} from "../../actions/client";
import {
  getAllProjectStatus,
  addProject,
  getFile,
} from "../../actions/projects";
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
  project: { allProjectStatus, allFile },
  getActiveClientsFilter,
  getActiveStaffFilter,
  getAllProjectStatus,
  getEmployerDetails,
  addProject,
  getFile,
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

  //console.log("allFile", allFile);

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
  const [error, setError] = useState({
    // clientnameIdChecker: false,
    // clientnameIdErrorStyle: {},
    staffNameIdChecker: false,
    staffNameIdErrorStyle: {},
    projectNameChecker: false,
    projectNameErrorStyle: {},
    projectQtyChecker: false,
    projectQtyErrorStyle: {},
    projectdateChecker: false,
    projectdateErrorStyle: {},
    clientdateChecker: false,
    clientdateErrorStyle: {},
    projectInstrChecker: false,
    projectInstrErrorStyle: {},

    projectstatusChecker: true,
    projectstatusErrorStyle: {},
    empselectChecker: false,
    empselectErrorStyle: {},
  });
  const {
    staffNameIdChecker,
    staffNameIdErrorStyle,
    projectNameChecker,
    projectNameErrorStyle,
    projectQtyChecker,
    projectQtyErrorStyle,
    projectdateChecker,
    projectdateErrorStyle,
    clientdateChecker,
    clientdateErrorStyle,
    projectInstrChecker,
    projectInstrErrorStyle,
    ClientErrorStyle,
    projectstatusChecker,
    projectstatusErrorStyle,
    empselectChecker,
    empselectErrorStyle,
  } = error;

  const checkErrors = () => {
    if (!staffNameIdChecker) {
      setError({
        ...error,
        staffNameIdErrorStyle: { color: "#F00" },
      });
      return false;
    }
    if (!projectNameChecker) {
      setError({
        ...error,
        projectNameErrorStyle: { color: "#F00" },
      });
      return false;
    }
    if (!projectQtyChecker) {
      setError({
        ...error,
        projectQtyErrorStyle: { color: "#F00" },
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
    // if (review === true) {
    //   if (!clientdateChecker) {
    //     setError({
    //       ...error,
    //       clientdateErrorStyle: { color: "#F00" },
    //     });
    //     return false;
    //   }
    // }
    if (!projectInstrChecker) {
      setError({
        ...error,
        projectInstrErrorStyle: { color: "#F00" },
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
    if (review === true) {
      if (!empselectChecker) {
        setError({
          ...error,
          empselectErrorStyle: { color: "#F00" },
        });
        return false;
      }
    }
    return true;
  };
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
  ///////////////////////////////////////////////////////////////////////////////////////123
  //To store excel ,pdf and image
  const [showPreview, setShowPreview] = useState("false");
  const [fileSend, setFileSend] = useState("");
  const [fileType, setFileType] = useState("false");
  const checksize = async (file, index) => {
    // console.log("file e", file.type);

    if (file.type == "image/png" || file.type == "image/jpeg") {
      const resizeFile = (file) =>
        new Promise((resolve) => {
          Resizer.imageFileResizer(
            file,
            500,
            500,
            "JPEG",
            100,
            0,
            (uri) => {
              resolve(uri);
            },
            "base64"
          );
        });
      const base64 = await resizeFile(file);

      setFormDatas({
        ...addData,
        PhotoUpload: base64,
      });
      setFileType("");
      setShowPreview("false");
    } else if (file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = function (e) {
        const base64 = e.target.result;

        setFormDatas({
          ...addData,
          PhotoUpload: base64,
        });
      };
      reader.readAsDataURL(file);
      // setFileType("")
      setFileType(file.type);
      setShowPreview("true");
    } else {
      setFileType(file.type);
      setFileSend(file);
      setFormDatas({
        ...addData,
        PhotoUpload: "D:/extraaaa/" + file.name,
      });
      setShowPreview("true");

      // FileSaver.saveAs(blob, "hello world.xlsx");
      // var blob = new Blob([file], {
      //   type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
      // });
      // FileSaver.saveAs(blob, "D:\\extraaaa\\Book2.xlsx");
    }
  };

  const empdetailsopt = [];
  empdetails &&
    empdetails.map((emp) =>
      empdetailsopt.push({
        label: emp.empFullName,
        value: emp._id,
      })
    );

  // const [clientData, setClientData] = useState("");
  // const [clientId, setClientId] = useState("");

  // const [clientBelongsTo, setBelongsToVal] = useState("");
  const [clientFolderName, setFolderNameVal] = useState("");

  // const onClientChange = (e) => {
  //   //Required Validation starts
  //   // setError({
  //   //   ...error,
  //   //   clientnameIdChecker: true,
  //   //   clientnameIdErrorStyle: { color: "#000" },
  //   // });
  //   //Required Validation ends
  //   if (e) {
  //     setFormData({
  //       ...formData,
  //       clientId: clientId,
  //     });
  //     let clientVal = {
  //       clientId: e.clientId,
  //     };
  //     getActiveStaffFilter(clientVal);
  //   }
  //   setClientData(e);
  //   setClientId(e.clientId);
  //   // setBelongsToVal(e.belongsTo);

  //   setFolderNameVal(e.folderName);
  // };

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
    setError({
      ...error,
      empselectChecker: true,
      empselectErrorStyle: { color: "#000" },
    });
    setempdata(e);
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "projectName":
        if (value !== "") {
          setError({
            ...error,
            projectNameChecker: true,
            projectNameErrorStyle: { color: "#000" },
          });
          setFormData({ ...formData, [e.target.name]: value });
        } else {
          setError({
            ...error,
            projectNameChecker: false,
            projectNameErrorStyle: { color: "#f00" },
          });
          setFormData({ ...formData, [e.target.name]: "" });
        }
        break;
      case "qty":
        if (value !== "") {
          setError({
            ...error,
            projectQtyChecker: true,
            projectQtyErrorStyle: { color: "#000" },
          });
          setFormData({ ...formData, [e.target.name]: value });
        } else {
          setError({
            ...error,
            projectQtyChecker: false,
            projectQtyErrorStyle: { color: "#f00" },
          });
          setFormData({ ...formData, [e.target.name]: "" });
        }
        break;

      case "Instructions":
        if (value !== "") {
          setError({
            ...error,
            projectInstrChecker: true,
            projectInstrErrorStyle: { color: "#000" },
          });
          setFormData({ ...formData, [e.target.name]: value });
        } else {
          setError({
            ...error,
            projectInstrChecker: false,
            projectInstrErrorStyle: { color: "#f00" },
          });
          setFormData({ ...formData, [e.target.name]: "" });
        }
        break;

      default:
        break;
    }
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
    // setClientData("");
    // setBelongsToVal("");
    setFolderNameVal("");

    // activeClientFilter = [];

    setActiveClientName("");
    setActiveClientfolder("");
    getstaffData("");
  };

  // console.log("projectStatusType", projectStatusType);
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
  // console.log("ActiveClientId", ActiveClientId);
  //Required Validation Starts

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
        projectStatusType: review
          ? projectStatusOpt[26].label
          : projectStatusData.value || projectStatusType,
        projectStatusId: review
          ? projectStatusOpt[26].projStatusId
          : projectStatusData.projStatusId || projectStatusId,
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
        Reviewer: empdata.label ? empdata.label : "",
        ReviewerId: empdata.value ? empdata.value : null,
        screenshot: AddedDetails,
      };
      //console.log("finalDataaa", finalData);
      addProject(finalData);
      setFormData({
        ...formData,
        isSubmitted: true,
      });
    }
  };

  ///////////////////////////////////////////////////////////////////////123

  // const [fileType, setFileType] = useState("");

  const onRemoveChange = (imageNotes) => {
    const removeList = AddedDetails.filter(
      (AddDetails) => AddDetails.imageNotes !== imageNotes
    );
    AddDetails(removeList);
  };

  const [addData, setFormDatas] = useState({
    imageNotes: "",
    PhotoUpload: "",
    fileType: "",
  });

  const { imageNotes, PhotoUpload } = addData;
  const [AddedDetails, AddDetails] = useState([]);

  const onInputChange1 = (e) => {
    setFormDatas({ ...addData, [e.target.name]: e.target.value });
  };

  const onAdd = (e) => {
    e.preventDefault();

    if (addData && addData.imageNotes) {
      if (fileType) {
        //console.log("fileSend", fileSend);
        const formData = new FormData();
        formData.append("file", fileSend);
        // console.log("frm", formData.get("file"));
        getFile(formData);
      }

      const addData = {
        imageNotes: imageNotes,
        PhotoUpload: PhotoUpload,
        fileType: fileType,
      };
      setFormDatas({
        ...addData,
        imageNotes: "",
        PhotoUpload: "",
        fileType: "",
      });
      let temp = [];
      temp.push(...AddedDetails, addData);
      AddDetails(temp);
    }
  };

  // console.log("AddDetails", AddedDetails);

  //////////////////////

  if (isSubmitted) {
    return <Redirect to="/job-queue" />;
  }
  return !isAuthenticated || !user ? (
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
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12 pb-3 ">
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
                      style={projectNameErrorStyle}
                    >
                      Project Name<i className="text-danger">*</i> :
                    </label>
                    <input
                      type="text"
                      name="projectName"
                      autoComplete="off"
                      value={projectName}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
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
                    <label
                      className="label-control"
                      style={projectQtyErrorStyle}
                    >
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
                      name="projectDate"
                      label="Controlled picker"
                      autoComplete="off"
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
                      name="clientDate"
                      label="Controlled picker"
                      autoComplete="off"
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
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12 mt-5 py-4">
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
                <div className="row card-new mb-2">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <h5>Other Info</h5>
                  </div>
                  <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                    <div>
                      <label style={{ marginLeft: "10px" }}> Review ? :</label>

                      <input
                        style={{
                          height: "14px",
                          width: "14px",
                          borderRadius: "50%",
                          display: "block",
                          marginLeft: "10px",
                        }}
                        //value={review}
                        type="checkbox"
                        id="Unconfirmed"
                        onChange={handleOnOtherChange}
                        checked={review}
                      />
                    </div>
                  </div>

                  {review === true ? (
                    <>
                      <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                        <label
                          // className="label-control"
                          style={projectstatusErrorStyle}
                        >
                          Project Status<i className="text-danger">*</i> :
                        </label>
                        <Select
                          name="projectStatusData"
                          value={projectStatusOpt[26]}
                          isSearchable={true}
                          placeholder="Select"
                          //  onChange={(e) => onProjectStatusChange(e)}
                        />
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                        <label
                          // className="label-control"
                          style={empselectErrorStyle}
                        >
                          Select Employee<i className="text-danger">*</i> :
                        </label>
                        <Select
                          name="projectempData"
                          options={empdetailsopt}
                          isSearchable={true}
                          placeholder="Select Emp"
                          onChange={(e) => onReviewerChange(e)}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                        <label
                          // className="label-control"
                          style={projectstatusErrorStyle}
                        >
                          Project Status<i className="text-danger">*</i> :
                        </label>
                        <Select
                          name="projectStatusData"
                          value={projectStatusData || projectStatusOpt[1]}
                          options={projectStatusOpt}
                          isSearchable={true}
                          placeholder="Select"
                          onChange={(e) => onProjectStatusChange(e)}
                        />
                      </div>
                    </>
                  )}
                  <span className=" row col-lg-12 col-md-6 col-sm-6 col-12 ">
                    <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                      <label className="label-control">Deadline :</label>
                      <input
                        type="text"
                        name="deadline"
                        value={deadline}
                        className="form-control"
                        onChange={(e) => onInputChange(e)}
                      />
                    </div>

                    <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                      <label className="label-control">Output Format :</label>
                      <input
                        type="text"
                        name="outputformat"
                        value={outputformat}
                        className="form-control"
                        onChange={(e) => onInputChange(e)}
                      />
                    </div>
                  </span>

                  <div className="col-lg-12 col-md-11 col-sm-12 col-12 ">
                    <label
                      className="label-control"
                      style={projectInstrErrorStyle}
                    >
                      Project Instructions<i className="text-danger">*</i> :
                    </label>
                    <textarea
                      name="Instructions"
                      id="Instructions"
                      className="textarea form-control"
                      rows="3"
                      placeholder="Instructions"
                      style={{ width: "100%" }}
                      value={Instructions}
                      onChange={(e) => onInputChange(e)}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-12 ">
                {/* Screenshot */}
                <div
                  className="row card-new mb-3"
                  style={{ paddingBottom: "62px" }}
                >
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12 pb-3 ">
                    <h5>Screenshot</h5>
                    <div
                      className=" row col-lg-12 col-md-12 col-sm-12 col-12 card1 "
                      id="shadow-bck"
                      style={{ marginTop: "15px" }}
                    >
                      <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                        <label className="label-control">
                          Upload Screenshot :
                        </label>

                        <div className="row col-lg-6 col-md-12 col-sm-12 col-12">
                          <input
                            type="file"
                            multiple={false}
                            onChange={(e) => checksize(e.target.files[0], 1)}
                            // style={{ color: "transparent" }}
                          />

                          {/* <FileBase64
                            type="file"
                            multiple={false}
                            // onClick={(e) => checksize(e.target.files[0], 1)}
                            onDone={({ base64 },e) => {
                             checksize(e.target.files[0], 1),
                              setFormDatas({
                                ...addData,
                                PhotoUpload: base64,
                              });
                            }}
                          /> */}
                        </div>

                        {showPreview == "true" ? (
                          <></>
                        ) : (
                          <>
                            <div className=" row  form-group align_right">
                              <div className="col-lg-12 col-md-12 col-sm-12 col-12  ">
                                <img
                                  className="log_size "
                                  alt="Preview"
                                  src={`${PhotoUpload}`}
                                  style={{ height: "70px", width: "100px" }}
                                />
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                        <label className="label-control"> Image Notes* :</label>
                        <textarea
                          name="imageNotes"
                          id="imageNotes"
                          className="textarea form-control"
                          rows="2"
                          placeholder="Notes"
                          style={{ width: "100%" }}
                          value={imageNotes}
                          onChange={(e) => onInputChange1(e)}
                        ></textarea>
                      </div>

                      <div className="col-lg-4 col-md-6 col-sm-6 col-12 ">
                        <button
                          className="btn btn_green_bg"
                          style={{ marginTop: "80px" }}
                          onClick={(e) => onAdd(e)}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* END */}
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12 py-3">
                    <div className="row card-new py-3">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className=" body-inner no-padding  table-responsive">
                          <div className="fixTableHeadjoin">
                            <table
                              className="tabllll table table-bordered table-striped table-hover"
                              id="datatable2"
                            >
                              <thead>
                                <tr>
                                  <th style={{ width: "10%" }}>Sl no</th>
                                  <th style={{ width: "20%" }}>Image</th>
                                  <th style={{ width: "40%" }}>Image Notes</th>
                                  <th style={{ width: "5%" }}>Remove</th>
                                </tr>
                              </thead>
                              <tbody>
                                {AddedDetails &&
                                  AddedDetails.map((AddDetail, idx) => {
                                    return (
                                      <tr key={idx}>
                                        <td className="text-center">
                                          {idx + 1}
                                        </td>
                                        <td className="text-center">
                                          {" "}
                                          {AddDetail.fileType ===
                                            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                                          AddDetail.fileType === "text/csv" ||
                                          AddDetail.fileType ===
                                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
                                            <>
                                              <h6>Excel D:/extraa</h6>
                                            </>
                                          ) : (
                                            <>
                                              {AddDetail.fileType ===
                                              "application/pdf" ? (
                                                <>PDF</>
                                              ) : (
                                                <>
                                                  <img
                                                    className="log_size "
                                                    alt="Preview"
                                                    src={`${AddDetail.PhotoUpload}`}
                                                    style={{
                                                      height: "40px",
                                                      width: "70px",
                                                    }}
                                                  />
                                                </>
                                              )}
                                            </>
                                          )}
                                        </td>
                                        <td>{AddDetail.imageNotes}</td>

                                        <td className="text-center">
                                          {AddDetail.fileType ===
                                            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                                          AddDetail.fileType === "text/csv" ||
                                          AddDetail.fileType ===
                                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
                                            <></>
                                          ) : (
                                            <>
                                              <img
                                                className="img_icon_size log"
                                                onClick={() =>
                                                  onRemoveChange(
                                                    AddDetail.imageNotes
                                                  )
                                                }
                                                src={require("../../static/images/close-buttonRed.png")}
                                                alt="Remove"
                                                title="Remove"
                                              />
                                            </>
                                          )}
                                        </td>
                                      </tr>
                                    );
                                  })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
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
  getFile,
})(AddProject);
