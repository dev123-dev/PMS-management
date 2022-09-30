import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import Spinner from "../layout/Spinner";
import { addProjectStatus } from "../../actions/projects";

const StatusCategory = [
  { value: "Amend", label: "Amend" },
  { value: "Normal", label: "Normal" },
  { value: "Dont Work", label: "Dont Work" },
  { value: "Additional Instruction", label: "Additional Instruction" },
];
const AddProjectStatus = ({
  auth: { isAuthenticated, user, users, loading },
  addProjectStatus,
  onAddModalChange,
}) => {
  //formData
  const [formData, setFormData] = useState({
    projectStatusType: "",
    projectStatusCategory: "",
    isSubmitted: false,
  });

  const { projectStatusType, projectStatusCategory } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [error, setError] = useState({
    projectStatusCategoryIdChecker: false,
    projectStatusCategoryErrorStyle: {},
  });

  const { projectStatusCategoryIdChecker, projectStatusCategoryErrorStyle } =
    error;
  const checkErrors = (formData) => {
    if (!projectStatusCategoryIdChecker) {
      setError({
        ...error,
        projectStatusCategoryErrorStyle: { color: "#F00" },
      });
      return false;
    }
    return true;
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (checkErrors()) {
      const finalData = {
        projectStatusCategory: projectStatusCategory.value,
        projectStatusType: projectStatusType?.trim(),
        projectStutusEnteredById: user._id,
      };
      addProjectStatus(finalData);
      onAddModalChange(true);
    }
  };

  const onStatuscatChange = (e) => {
    //Required Validation starts
    setError({
      ...error,
      projectStatusCategoryIdChecker: true,
      projectStatusCategoryErrorStyle: { color: "#000" },
    });
    //Required Validation ends
    if (e) {
      setFormData({
        ...formData,
        projectStatusCategory: e,
      });
    }
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="col-lg-6 col-md-12 col-sm-12 col-12">
            <label className="label-control">Status Name* :</label>
            <input
              type="text"
              name="projectStatusType"
              value={projectStatusType}
              className="form-control"
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 col-12">
            <label
              className="label-control"
              style={projectStatusCategoryErrorStyle}
            >
              Project Status Category* :
            </label>
            <Select
              name="projectStatusCategory"
              options={StatusCategory}
              isSearchable={true}
              value={projectStatusCategory}
              placeholder="Select"
              onChange={(e) => onStatuscatChange(e)}
              theme={(theme) => ({
                ...theme,
                height: 26,
                minHeight: 26,
                borderRadius: 1,
                colors: {
                  ...theme.colors,
                  primary: "black",
                },
              })}
            />
          </div>
        </div>

        <div className="col-md-12 col-lg-12 col-sm-12 col-12 text-left">
          {loading ? (
            <button
              className="btn sub_form btn_continue Save float-right"
              disabled
            >
              Loading...
            </button>
          ) : (
            <input
              type="submit"
              name="Submit"
              value="Submit"
              className="btn sub_form btn_continue Save float-right"
            />
          )}
        </div>
      </form>
    </Fragment>
  );
};

AddProjectStatus.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addProjectStatus })(AddProjectStatus);
