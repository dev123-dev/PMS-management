import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { AddSctNewProject } from "../../actions/sct";
import Spinner from "../layout/Spinner";

const AddSctProject = ({
  auth: { isAuthenticated, user, users, loading },
  onAddProjectModalChange,
  AddSctNewProject,
}) => {
  //formData
  const [formData, setFormData] = useState({
    sctProjectName: "",
    sctProjectDesc: "",

    isSubmitted: false,
  });

  const { sctProjectName, sctProjectDesc } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [startprojectDate, setprojectDate] = useState("");
  const onDateChange = (e) => {
    setprojectDate(e.target.value);
  };

  //Required Validation ends
  const onSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      sctProjectName:
        sctProjectName.charAt(0).toUpperCase() + sctProjectName.slice(1),
      sctProjectDesc: sctProjectDesc?.trim(),
      sctProjectDate: startprojectDate,
      sctProjectEnteredById: user._id,
    };

    AddSctNewProject(finalData);
    onAddProjectModalChange(true);
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="col-lg-6 col-md-12 col-sm-12 col-12">
            <label className="label-control"> Project Name * :</label>
            <input
              type="text"
              name="sctProjectName"
              value={sctProjectName}
              className="form-control"
              onChange={(e) => onInputChange(e)}
              required
            />
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
          <div className="col-lg-11 col-md-12 col-sm-12 col-12">
            <label className="label-control"> Project Description :</label>

            <textarea
              name="sctProjectDesc"
              id="sctProjectDesc"
              className="textarea form-control"
              rows="3"
              placeholder="Client Address"
              style={{ width: "100%" }}
              value={sctProjectDesc}
              onChange={(e) => onInputChange(e)}
              required
            ></textarea>
          </div>
        </div>

        <div className="col-md-12 col-lg-11 col-sm-12 col-12 text-left">
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
      </form>
    </Fragment>
  );
};

AddSctProject.propTypes = {
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  AddSctNewProject: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  settings: state.settings,
});

export default connect(mapStateToProps, { AddSctNewProject })(AddSctProject);
