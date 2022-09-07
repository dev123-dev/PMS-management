import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { getActiveClientsFilter } from "../../actions/client";
import { getAllProjectStatus, addProject } from "../../actions/projects";
import { Redirect } from "react-router-dom";
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
  client: { activeClientFilter },
  project: { allProjectStatus },
  getActiveClientsFilter,
  getAllProjectStatus,
  onAddModalChange,
  addProject,
}) => {
  useEffect(() => {
    getAllProjectStatus();
  }, [getAllProjectStatus]);
  useEffect(() => {
    getActiveClientsFilter();
  }, [getActiveClientsFilter]);

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
  const projectStatusOpt = [];
  allProjectStatus.map((projStatusData) =>
    projectStatusOpt.push({
      projStatusId: projStatusData._id,
      label: projStatusData.projectStatusType,
      value: projStatusData.projectStatusType,
    })
  );
  const [clientData, setClientData] = useState("");
  const [clientId, setClientId] = useState("");
  // const [clientName, setClientName] = useState("");
  const [clientBelongsTo, setBelongsToVal] = useState("");
  const [clientFolderName, setFolderNameVal] = useState("");

  const onClientChange = (e) => {
    //Required Validation starts
    setError({
      ...error,
      clientnameIdChecker: true,
      clientnameIdErrorStyle: { color: "#000" },
    });
    //Required Validation ends

    setClientData(e);
    setClientId(e.clientId);
    setBelongsToVal(e.belongsTo);
    setFolderNameVal(e.folderName);
  };

  const [projectStatusData, setProjectStatusData] = useState(
    projectStatusOpt[1]
  );
  const onProjectStatusChange = (e) => {
    //Required Validation starts
    setError({
      ...error,
      projectstatusChecker: true,
      projectstatusErrorStyle: { color: "#000" },
    });
    //Required Validation ends
    setProjectStatusData(e);
  };

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
    projectTime: "",
    clientDate: "",
    clientTime: "",
    Instructions: "",
    inputpath: "",
    isSubmitted: false,
  });

  const {
    inputpath,
    projectName,
    qty,
    outputformat,
    priority,
    deadline,
    projectTime,
    clientTime,
    Instructions,
    clientType,
    isSubmitted,
  } = formData;

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
    setBelongsToVal("");
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

  //Required Validation Starts
  const [error, setError] = useState({
    clientnameIdChecker: false,
    clientnameIdErrorStyle: {},

    ClientIdChecker: true,
    ClientErrorStyle: {},
    projectstatusChecker: true,
    projectstatusErrorStyle: {},
  });
  const {
    clientnameIdChecker,
    clientnameIdErrorStyle,

    ClientIdChecker,
    ClientErrorStyle,
    projectstatusChecker,
    projectstatusErrorStyle,
  } = error;

  const checkErrors = () => {
    if (!ClientIdChecker) {
      setError({
        ...error,
        ClientErrorStyle: { color: "#F00" },
      });
      return false;
    }

    if (!clientnameIdChecker) {
      setError({
        ...error,
        clientnameIdErrorStyle: { color: "#F00" },
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

    return true;
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (checkErrors()) {
      const finalData = {
        projectName: projectName,
        clientId: clientId,
        clientName: clientData.value,
        parentClientId: clientData.belongsToId,
        parentClientName: clientBelongsTo,
        // projectLocation:
        inputpath: inputpath.trim(),
        clientFolderName: clientData.folderName,
        projectPriority: priority.value,
        // projectJobtype
        // projectHours
        projectNotes: Instructions,
        projectDeadline: deadline,
        projectStatusType: projectStatusData.value,
        projectStatusId: projectStatusData.projStatusId,
        // projectPrice:
        projectQuantity: qty,
        projectUnconfirmed: isChecked,
        // projectVendor
        clientTypeVal: clientType.value,
        projectTime: projectTime,
        projectDate: startprojectDate,
        clientTime: clientTime,
        outputformat: outputformat,
        clientDate: startclientDate,
        projectEnteredById: user._id,
        projectEnteredByName: user.empFullName,
        // projectEnteredDate:
        // projectEntryTime
        // clientType: clientType.value,
      };

      addProject(finalData);
      setFormData({
        ...formData,

        isSubmitted: true,
      });
    }
  };
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
            <h2 className="heading_color">Add New Project</h2>
            <hr />
          </div>
          <section className="sub_reg">
            <div className="row col-lg-12 col-md-11 col-sm-12 col-12 ">
              <div className="col-lg-6 col-md-12 col-sm-12 col-12 py-3">
                <div className="row card-new  py-3">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <h5>Client Info</h5>
                  </div>

                  <div className="col-lg-6 col-md-11 col-sm-12 col-12 ">
                    <label className="label-control" style={ClientErrorStyle}>
                      Client Type* :
                    </label>
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
                    <label
                      className="label-control"
                      style={clientnameIdErrorStyle}
                    >
                      Client Name* :
                    </label>
                    <Select
                      name="clientData"
                      isSearchable={true}
                      value={clientData}
                      options={activeClientsOpt}
                      placeholder="Select"
                      onChange={(e) => onClientChange(e)}
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <label className="label-control">Belongs to :</label>
                    <input
                      type="text"
                      name="clientBelongsTo"
                      value={clientBelongsTo}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                      disabled
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <label className="label-control">
                      Client folder Name :
                    </label>
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

              <div className="col-lg-6 col-md-12 col-sm-12 col-12 py-3">
                <div className="row card-new  py-3">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <h5>Project Dates</h5>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <label className="label-control">Project Date* :</label>
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
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
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
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <label className="label-control">Client Date* :</label>
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
                      required
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <label className="label-control">Client Time :</label>
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
              <div className="col-lg-6 col-md-12 col-sm-12 col-12 py-3">
                <div className="row card-new  py-3">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <h5>Project Info</h5>
                  </div>

                  <div className="col-lg-12 col-md-6 col-sm-6 col-12">
                    <label className="label-control">Project Name* :</label>
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
                  <div className="col-lg-5 col-md-6 col-sm-6 col-12">
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

              <div className="col-lg-6 col-md-12 col-sm-12 col-12 py-3">
                <div className="row card-new  py-3">
                  <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                    <label
                      className="label-control"
                      style={projectstatusErrorStyle}
                    >
                      Project Status* :
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
  addProject,
})(AddProject);
