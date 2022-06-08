import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { getActiveClientsFilter } from "../../actions/client";
import { getAllProjectStatus } from "../../actions/projects";

const AddProject = ({
  auth: { isAuthenticated, user, users, loading },
  settings: { paymentMode },
  client: { activeClientFilter },
  project: { allProjectStatus },
  getActiveClientsFilter,
  getAllProjectStatus,
  onAddDistrictModalChange,
}) => {
  useEffect(() => {
    getAllProjectStatus();
  }, [getAllProjectStatus]);
  useEffect(() => {
    getActiveClientsFilter();
  }, [getActiveClientsFilter]);

  console.log(allProjectStatus);
  console.log(activeClientFilter);

  const clientTypeVal = [
    { value: "Regular", label: "Regular Client" },
    { value: "Test", label: "Test Client" },
  ];

  //formData
  const [formData, setFormData] = useState({
    clientBelongsTo: "",
    clientType: "",
    clientName: "",
    clientFolderName: "",
    projectName: "",
    qty: "",
    priority: "",
    deadline: "",
    projectStatus: "",
    projectDate: "",
    projectTime: "",
    clientDate: "",
    Instructions: "",
    isSubmitted: false,
  });

  const {
    clientBelongsTo,
    clientName,
    clientFolderName,
    projectName,
    qty,
    priority,
    deadline,
    projectStatus,
    projectDate,
    projectTime,
    clientDate,
    clienTime,
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
      let clientTypeVal = e.value;
      getActiveClientsFilter(clientTypeVal);
    }
    // let finalData = {
    //   clientTypeVal: clientType,
    // };
    // console.log(finalData);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // if (checkErrors()) {
    const finalData = {};
    console.log(finalData);
    // AddDistrict(finalData);
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
              <div className="row col-lg-12 col-md-6 col-sm-6 col-12">
                <div className="col-lg-3 col-md-11 col-sm-12 col-12 ">
                  <label className="label-control">Client Type:</label>
                  <Select
                    name="clientType"
                    options={clientTypeVal}
                    value={clientType}
                    isSearchable={false}
                    placeholder="Select"
                    onChange={(e) => onClientTypeChange(e)}
                  />
                </div>
              </div>

              <div className="row col-lg-12 col-md-6 col-sm-6 col-12">
                <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                  <label className="label-control">Client Name:</label>
                  <Select
                    name="clientName"
                    value={clientName}
                    //  options={clientBelongsTo}
                    isSearchable={false}
                    placeholder="Select"
                    // onChange={(e) => clientBelongsToChange(e)}
                  />
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                  <label className="label-control">Belongs to:</label>
                  <input
                    type="text"
                    name="clientBelongsTo"
                    value={clientBelongsTo}
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                  <label className="label-control">Client folder Name:</label>
                  <input
                    type="text"
                    name="clientFolderName"
                    value={clientFolderName}
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="row col-lg-12 col-md-6 col-sm-6 col-12">
                <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                  <label className="label-control">Project Name*:</label>
                  <input
                    type="text"
                    name="projectName"
                    value={projectName}
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                  <label className="label-control">Qty:</label>
                  <input
                    type="text"
                    name="qty"
                    value={qty}
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                  <label className="label-control">Priority:</label>
                  <Select
                    name="priority"
                    value={priority}
                    //  options={clientBelongsTo}
                    isSearchable={false}
                    placeholder="Select"
                    // onChange={(e) => clientBelongsToChange(e)}
                  />
                </div>
                <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                  <label className="label-control">Deadline:</label>
                  <input
                    type="text"
                    name="deadline"
                    value={deadline}
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>

              <div className="row col-lg-12 col-md-6 col-sm-6 col-12">
                <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                  <label className="label-control">Project Status:</label>
                  <Select
                    name="projectStatus"
                    value={projectStatus}
                    //  options={clientBelongsTo}
                    isSearchable={false}
                    placeholder="Select"
                    // onChange={(e) => clientBelongsToChange(e)}
                  />
                </div>
              </div>

              <div className="row col-lg-12 col-md-6 col-sm-6 col-12">
                <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                  <label className="label-control">Project Date:</label>
                  <input
                    type="text"
                    name="projectDate"
                    value={projectDate}
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                  <label className="label-control">Project Time:</label>
                  <input
                    type="text"
                    name="projectTime"
                    value={projectTime}
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                  <label className="label-control">Client Date:</label>
                  <input
                    type="text"
                    name="clientDate"
                    value={clientDate}
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                  <label className="label-control">Client Time:</label>
                  <input
                    type="text"
                    name="clienTime"
                    value={clienTime}
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>

              <div className="row col-lg-6 col-md-6 col-sm-6 col-12">
                <label className="label-control">Instructions:</label>
                <textarea
                  name="Instructions"
                  id="Instructions"
                  className="textarea form-control"
                  rows="3"
                  placeholder="Address"
                  style={{ width: "100%" }}
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
                  to="/all-batches"
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
})(AddProject);
