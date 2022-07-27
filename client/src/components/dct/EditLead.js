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

const EditLead = ({
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
    // companyName:
    //   allClientdata && allClientdata.companyName
    //     ? allClientdata.companyName
    //     : "",
    companyName: "",
    website: "",
    emailId: "",
    phone1: "",
    phone2: "",
    address: "",
    importantPoints: "",
    isSubmitted: false,
  });

  const {
    companyName,
    website,
    emailId,
    phone1,
    phone2,
    address,
    importantPoints,
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
    // if (checkErrors()) {
    const finalData = {
      // recordId: clientdeactivedata ? clientdeactivedata._id : "",
      companyName: companyName,
      emailId: emailId,
      website: website,
      address: address,
      phone1: phone1,
      phone2: phone2,
      importantPoints: importantPoints,
    };
    console.log(finalData);
    // addProject(finalData);
    //   setFormData({
    //     ...formData,

    //     isSubmitted: true,
    //   });
    // }
  };
  if (isSubmitted) {
    return <Redirect to="/job-queue" />;
  }
  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align">
        <form className="row" onSubmit={(e) => onSubmit(e)}>
          <div className="col-lg-12 col-md-11 col-sm-12 col-12">
            <h2 className="heading_color">Edit Lead</h2>
            <hr />
          </div>
          <section className="sub_reg">
            <div className="row col-lg-12 col-md-11 col-sm-12 col-12 ">
              <div className="col-lg-12 col-md-12 col-sm-12 col-12 py-3">
                <div className="row card-new  py-3">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <h5>Company Info</h5>
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
                    <label className="label-control">Website Name* :</label>
                    <input
                      type="text"
                      name="website"
                      value={website}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                      required
                    />
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                    <label className="label-control">Email Id :</label>
                    <input
                      type="text"
                      name="emailId"
                      value={emailId}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                      required
                    />
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                    <label className="label-control">Phone 1 :</label>
                    <input
                      type="text"
                      name="phone1"
                      value={phone1}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                      required
                    />
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                    <label className="label-control">Phone 2 :</label>
                    <input
                      type="text"
                      name="phone2"
                      value={phone2}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                      required
                    />
                  </div>

                  <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                    <label className="label-control">Region :</label>
                    <input
                      type="text"
                      //name="clientFolderName"
                      //value={clientFolderName}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                    <label className="label-control">Address :</label>
                    <input
                      type="text"
                      name="address"
                      value={address}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                      required
                    />
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                    <label className="label-control">Important Points :</label>
                    <input
                      type="text"
                      name="importantPoints"
                      value={importantPoints}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                      required
                    />
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

EditLead.propTypes = {
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
})(EditLead);
