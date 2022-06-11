import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { getActiveClientsFilter } from "../../actions/client";
import { getAllProjectStatus, addProject } from "../../actions/projects";

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
  onAddDistrictModalChange,
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
  const [clientData, setClientData] = useState();
  const [clientId, setClientId] = useState();
  // const [clientName, setClientName] = useState();
  const [clientBelongsTo, setBelongsToVal] = useState();
  const [clientFolderName, setFolderNameVal] = useState();

  const onClientChange = (e) => {
    setClientData(e);
    setClientId(e.clientId);
    setBelongsToVal(e.belongsTo);
    setFolderNameVal(e.folderName);
  };

  const [projectStatusData, setProjectStatusData] = useState();
  const onProjectStatusChange = (e) => {
    setProjectStatusData(e);
  };

  //formData
  const [formData, setFormData] = useState({
    clientType: "",
    clientName: "",
    projectName: "",
    qty: "",
    priority: "",
    deadline: "",
    projectStatus: "",
    projectDate: "",
    projectTime: "",
    clientDate: "",
    clientTime: "",
    Instructions: "",
    isSubmitted: false,
  });

  const {
    clientName,
    projectName,
    qty,
    priority,
    deadline,
    projectStatus,
    projectDate,
    projectTime,
    clientDate,
    clientTime,
    Instructions,
    clientType,
  } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onClientTypeChange = (e) => {
    //Required Validation starts
    // setError({
    //   ...error,
    //   TranscationIdChecker: true,
    //   TranscationIdErrorStyle: { color: "#000" },
    // });
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
  };

  const priorityToChange = (e) => {
    //Required Validation starts
    // setError({
    //   ...error,
    //   TranscationIdChecker: true,
    //   TranscationIdErrorStyle: { color: "#000" },
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

  const onSubmit = (e) => {
    e.preventDefault();
    // if (checkErrors()) {
    const finalData = {
      projectName: projectName,
      clientId: clientId,
      clientName: clientData.value,
      parentClientId: clientData.belongsToId,
      // projectLocation:
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
      // projectUnconfirmed
      // projectVendor
      projectTime: projectTime,
      projectDate: startprojectDate,
      clientTime: clientTime,
      clientDate: startclientDate,
      projectEnteredById: user._id,
      // projectEnteredDate:
      // projectEntryTime
      // clientType: clientType.value,
    };
    // console.log(finalData);
    addProject(finalData);
    // setFormData({
    //   ...formData,
    //   districtName: "",
    //   isSubmitted: true,
    // });
    // }
  };

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
                    <label className="label-control">Client Type :</label>
                    <Select
                      name="clientType"
                      options={clientTypeVal}
                      value={clientType}
                      isSearchable={false}
                      placeholder="Select"
                      onChange={(e) => onClientTypeChange(e)}
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <label className="label-control">Client Name :</label>
                    <Select
                      name="clientData"
                      value={clientData}
                      options={activeClientsOpt}
                      isSearchable={false}
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
                      min="09:00"
                      max="18:00"
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
                      min="09:00"
                      max="18:00"
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
                    />
                  </div>
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
                    <label className="label-control">Priority :</label>
                    <Select
                      name="priority"
                      value={priority}
                      options={priorityVal}
                      isSearchable={false}
                      placeholder="Select"
                      onChange={(e) => priorityToChange(e)}
                    />
                  </div>
                </div>
              </div>

              <div className="col-lg-6 col-md-12 col-sm-12 col-12 py-3">
                <div className="row card-new  py-3">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <label className="label-control">Project Status :</label>
                    <Select
                      name="projectStatusData"
                      value={projectStatusData}
                      options={projectStatusOpt}
                      isSearchable={false}
                      placeholder="Select"
                      onChange={(e) => onProjectStatusChange(e)}
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <label className="label-control">Deadline :</label>
                    <input
                      type="text"
                      name="deadline"
                      value={deadline}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>

                  <div className="col-lg-12 col-md-11 col-sm-12 col-12 ">
                    <label className="label-control">Instructions* :</label>
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
  getAllProjectStatus: PropTypes.object.isRequired,
  getActiveClientsFilter: PropTypes.object.isRequired,
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
