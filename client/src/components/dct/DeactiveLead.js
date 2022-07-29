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

const DeactiveLead = ({
  auth: { isAuthenticated, user, users, loading },
  settings: { paymentMode },
  Leaddeavtivedata,
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
    isSubmitted: false,
  });

  const {
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
        clientName: clientData.value,
        parentClientId: clientData.belongsToId,
        parentClientName: clientBelongsTo,
        clientFolderName: clientData.folderName,
        projectPriority: priority.value,
        projectStatusType: projectStatusData.value,
        projectStatusId: projectStatusData.projStatusId,
        projectEnteredById: user._id,
        projectEnteredByName: user.empFullName,
      };
      // console.log(finalData);
      //  addProject(finalData);
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
      {/* <div className="container container_align"> */}
      <form className="row" onSubmit={(e) => onSubmit(e)}>
        {/* <div className="col-lg-12 col-md-11 col-sm-12 col-12">
            <h2 className="heading_color">Deactive Lead</h2>
            <hr />
          </div> */}
        {/* <section className="sub_reg"> */}
        <div className="row col-lg-12 col-md-11 col-sm-12 col-12 ">
          <div className="col-lg-12 col-md-11 col-sm-12 col-12 ">
            <label className="label-control">Deactive Reason :</label>
            <textarea
              name="clientAddress"
              id="clientAddress"
              className="textarea form-control"
              rows="3"
              placeholder="Lead Deactive Reason"
              style={{ width: "100%" }}
              //  value={clientAddress}
              onChange={(e) => onInputChange(e)}
              required
            ></textarea>
          </div>
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
            <Link
              className="btn sub_form btn_continue blackbrd float-right"
              to="/job-queue"
            >
              Cancel
            </Link>
          </div>
        </div>
        {/* </section> */}
      </form>
      {/* </div> */}
    </Fragment>
  );
};

DeactiveLead.propTypes = {
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
})(DeactiveLead);
