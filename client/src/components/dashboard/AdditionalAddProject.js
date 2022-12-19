import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import {
  getActiveClientsFilter,
  getActiveStaffFilter,
} from "../../actions/client";
import { getAllProjectStatus, addProject } from "../../actions/projects";
import { Redirect } from "react-router-dom";

const priorityVal = [
  { value: "Low", label: "Low" },
  { value: "Mid", label: "Mid" },
  { value: "High", label: "High" },
];

const AdditionalAddProject = ({
  auth: { isAuthenticated, user, users, loading },
  settings: { paymentMode },
  client: { activeClientFilter, activeStaffFilter },
  project: { allProjectStatus },
  getActiveClientsFilter,
  getActiveStaffFilter,
  getAllProjectStatus,
  addProject,
  ProjectCycledata,
  onProjectCycleModalChange,
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

  // var today = new Date();
  // var dd = today.getDate();
  // var mm = today.getMonth() + 1;
  // var yyyy = today.getFullYear();
  // if (dd < 10) {
  //   dd = "0" + dd;
  // }
  // if (mm < 10) {
  //   mm = "0" + mm;
  // }

  // var todayDateymd = yyyy + "-" + mm + "-" + dd;

  //formData
  const [formData, setFormData] = useState({
    projectName:
      ProjectCycledata && ProjectCycledata.jobQueueProjects.projectName
        ? ProjectCycledata.jobQueueProjects.projectName
        : "",
    inputpath:
      ProjectCycledata && ProjectCycledata.jobQueueProjects.inputpath
        ? ProjectCycledata.jobQueueProjects.inputpath
        : "",
    projectDeadline:
      ProjectCycledata && ProjectCycledata.jobQueueProjects.projectDeadline
        ? ProjectCycledata.jobQueueProjects.projectDeadline
        : "",
    clientName:
      ProjectCycledata && ProjectCycledata.jobQueueProjects.clientName
        ? ProjectCycledata.jobQueueProjects.clientName
        : "",

    clientFolderName:
      ProjectCycledata && ProjectCycledata.jobQueueProjects.clientFolderName
        ? ProjectCycledata.jobQueueProjects.clientFolderName
        : "",

    clientId:
      ProjectCycledata && ProjectCycledata.jobQueueProjects.clientId
        ? ProjectCycledata.jobQueueProjects.clientId
        : "",
    clientTypeVal:
      ProjectCycledata && ProjectCycledata.jobQueueProjects.clientTypeVal
        ? ProjectCycledata.jobQueueProjects.clientTypeVal
        : "",
    projectId:
      ProjectCycledata && ProjectCycledata.projectId
        ? ProjectCycledata.projectId
        : "",

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

    isSubmitted: false,
  });

  const {
    projectId,
    clientId,
    clientTypeVal,
    inputpath,
    clientName,
    clientFolderName,
    projectName,
    qty,
    outputformat,
    priority,
    deadline,
    // projectTime,
    clientTime,
    Instructions,
    isSubmitted,
  } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const activeClientsOpt = [];
  // activeClientFilter.map((clientsData) =>
  //   activeClientsOpt.push({
  //     clientId: clientsData._id,
  //     belongsToId: clientsData.clientBelongsToId,
  //     belongsTo: clientsData.clientBelongsToName,
  //     // folderName: clientsData.clientFolderName,
  //     label: clientsData.clientName,
  //     value: clientsData.clientName,
  //   })
  // );
  let projectStatusOpt = [];
  allProjectStatus.map((projStatusData) =>
    projectStatusOpt.push({
      projStatusId: projStatusData._id,
      projectStatusCategory: projStatusData.projectStatusCategory,
      label: projStatusData.projectStatusType,
      value: projStatusData.projectStatusType,
    })
  );

  if (ProjectCycledata && ProjectCycledata.value === "New AI") {
    projectStatusOpt = projectStatusOpt.filter(
      (projectStatusOpt) =>
        projectStatusOpt.projectStatusCategory === "Additional Instruction"
    );
  } else {
    projectStatusOpt = projectStatusOpt.filter(
      (projectStatusOpt) => projectStatusOpt.projectStatusCategory === "Amend"
    );
  }

  // const [clientData, setClientData] = useState("");
  // const [clientId, setClientId] = useState("");
  // const [clientBelongsTo, setBelongsToVal] = useState("");
  // const [clientFolderName, setFolderNameVal] = useState("");

  // const onClientChange = (e) => {
  //   //Required Validation starts
  //   setError({
  //     ...error,
  //     clientnameIdChecker: true,
  //     clientnameIdErrorStyle: { color: "#000" },
  //   });
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
  // };

  const [projectStatusData, setProjectStatusData] = useState(
    projectStatusOpt[0]
  );

  const onProjectStatusChange = (e) => {
    //Required Validation starts
    // setError({
    //   ...error,
    //   projectstatusChecker: true,
    //   projectstatusErrorStyle: { color: "#000" },
    // });
    //Required Validation ends
    setProjectStatusData(e);
  };

  // const onClientTypeChange = (e) => {
  //   //Required Validation starts
  //   setError({
  //     ...error,
  //     ClientIdChecker: true,
  //     ClientErrorStyle: { color: "#000" },
  //   });
  //   //Required Validation ends
  //   if (e) {
  //     setFormData({
  //       ...formData,
  //       clientType: e,
  //     });
  //     let clientTypeVal = {
  //       clientTypeinfo: e.value,
  //     };
  //     getActiveClientsFilter(clientTypeVal);
  //   }
  //   setClientData("");
  //   // setBelongsToVal("");
  //   //setFolderNameVal("");
  // };

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

  const onDateChange = (e) => {
    setprojectDate(e.target.value);
  };

  const [startclientDate, setclientDate] = useState("");
  const onDateChange1 = (e) => {
    setclientDate(e.target.value);
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  // const allstaffs = [];
  // activeStaffFilter[0] &&
  //   activeStaffFilter[0].staffs.map((staff) =>
  //     allstaffs.push({
  //       sId: staff._id,
  //       label: staff.staffName,
  //       value: staff.staffName,
  //     })
  //   );

  // const [staff, getstaffData] = useState("");

  // const [staffId, setstaffID] = useState("");
  // const [staffName, setstaffName] = useState("");

  // const onStaffChange = (e) => {
  //   //Required Validation starts
  //   // setError({
  //   //   ...error,
  //   //   StateIdChecker: true,
  //   //   StateErrorStyle: { color: "#000" },
  //   // });
  //   //Required Validation end

  //   var staffId = "";
  //   var staffName = "";
  //   getstaffData(e);

  //   staffId = e.sId;
  //   staffName = e.value;

  //   setstaffID(staffId);
  //   setstaffName(staffName);
  // };

  //Required Validation Starts
  // const [error, setError] = useState({
  //   clientnameIdChecker: false,
  //   clientnameIdErrorStyle: {},

  //   ClientIdChecker: true,
  //   ClientErrorStyle: {},
  //   projectstatusChecker: true,
  //   projectstatusErrorStyle: {},
  // });
  // const {
  //   clientnameIdChecker,
  //   clientnameIdErrorStyle,

  //   ClientIdChecker,
  //   ClientErrorStyle,
  //   projectstatusChecker,
  //   projectstatusErrorStyle,
  // } = error;

  // const checkErrors = () => {
  //   if (!ClientIdChecker) {
  //     setError({
  //       ...error,
  //       ClientErrorStyle: { color: "#F00" },
  //     });
  //     return false;
  //   }

  //   if (!clientnameIdChecker) {
  //     setError({
  //       ...error,
  //       clientnameIdErrorStyle: { color: "#F00" },
  //     });
  //     return false;
  //   }

  //   if (!projectstatusChecker) {
  //     setError({
  //       ...error,
  //       projectstatusErrorStyle: { color: "#F00" },
  //     });
  //     return false;
  //   }

  //   return true;
  // };
  const date = new Date();
  const projectEnteredTime =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

  const onSubmit = (e) => {
    e.preventDefault();
    // if (checkErrors()) {
    const finalData = {
      projectName: projectName,
      clientId: clientId,
      clientName: clientName,
      projectBelongsToId: projectId,
      // parentClientId: clientData.belongsToId,
      //  parentClientName: clientBelongsTo,
      inputpath: inputpath?.trim(),
      clientFolderName: clientFolderName,
      projectPriority: priority.value,
      projectNotes: Instructions?.trim(),
      projectDeadline: deadline?.trim(),
      projectStatusType: projectStatusData.value,
      projectStatusId: projectStatusData.projStatusId,
      projectQuantity: qty,
      projectUnconfirmed: isChecked,
      clientTypeVal: clientTypeVal,
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

    addProject(finalData);
    onProjectCycleModalChange(true);
    // setFormData({
    //   ...formData,
    //   isSubmitted: true,
    // });
    // }
  };
  if (isSubmitted) {
    return <Redirect to="/daily-job-sheet" />;
  }
  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <form className="row" onSubmit={(e) => onSubmit(e)}>
        {/* <div className="col-lg-12 col-md-11 col-sm-12 col-12">
            <h2 className="heading_color">Add New Project</h2>
            <hr />
          </div> */}
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-11 col-sm-12 col-12 ">
            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="row card-new  py-3">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <h5>Client Info</h5>
                </div>

                {/* <div className="col-lg-6 col-md-11 col-sm-12 col-12 ">
                  <label style={ClientErrorStyle}>Client Type* :</label>
                  <Select
                    name="clientType"
                    isSearchable={true}
                    options={clientTypeVal}
                    value={clientType || clientTypeVal[0]}
                    placeholder="Select"
                    onChange={(e) => onClientTypeChange(e)}
                  />
                </div> */}
                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                  <label
                  // style={clientnameIdErrorStyle}
                  >
                    Client Name* :
                  </label>
                  <input
                    type="text"
                    name="clientName"
                    value={clientName}
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
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
                  <label>Staff Name* :</label>
                  <Select
                    name="stateName"
                    options={allstaffs}
                    isSearchable={true}
                    value={staff}
                    placeholder="Select Staff"
                    onChange={(e) => onStaffChange(e)}
                  />
                </div> */}
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
                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                  <label>Client folder Name :</label>
                  <input
                    type="text"
                    name="clientFolderName"
                    value={clientFolderName}
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-12 col-sm-12 col-12 ">
              <div className="row card-new  py-3">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <h5>Date Info</h5>
                </div>

                <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                  <label>Project Date* :</label>
                  <br />
                  <input
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
                      max="24:00"
                      onChange={(e) => onInputChange(e)}
                      // required
                    />
                  </div> */}
                <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                  <label>Client Date* :</label>
                  <br />
                  <input
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
                    max="24:00"
                    onChange={(e) => onInputChange(e)}
                    // required
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="row card-new">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <h5>Project Info</h5>
                </div>

                <div className="col-lg-12 col-md-6 col-sm-6 col-12">
                  <label
                  //  className="label-control"
                  >
                    Project Name* :
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
                  <label className="label-control">Input* :</label>
                  <input
                    type="text"
                    name="inputpath"
                    value={inputpath}
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                    required
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

            <div className="col-lg-6 col-md-12 col-sm-12 col-12 ">
              <div className="row card-new">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <h5>Other Info</h5>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                  <label>Project Status* :</label>
                  <input
                    type="text"
                    name="projectStatusData"
                    value={projectStatusOpt[0].value}
                    className="form-control"
                    disabled
                  />
                  {/* <Select
                    name="projectStatusData"
                    value={projectStatusData || projectStatusOpt[0]}
                    options={projectStatusOpt}
                    isSearchable={true}
                    placeholder="Select"
                    onChange={(e) => onProjectStatusChange(e)}
                    editable="false"
                  /> */}
                </div>
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
                to="/job-queue"
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

AdditionalAddProject.propTypes = {
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
})(AdditionalAddProject);
