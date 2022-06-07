import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import Spinner from "../layout/Spinner";

const EditProjectStatus = ({
  auth: { isAuthenticated, user, users, loading },
  allProjectStatusdata,
  onAddDistrictModalChange,
}) => {
  const [formData, setFormData] = useState({
    projectStatusType:
      allProjectStatusdata && allProjectStatusdata.projectStatusType
        ? allProjectStatusdata.projectStatusType
        : "",
    projectStatusCategory:
      allProjectStatusdata && allProjectStatusdata.projectStatusCategory
        ? allProjectStatusdata.projectStatusCategory
        : "",

    isSubmitted: false,
  });

  const { projectStatusType, projectStatusCategory } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // if (checkErrors()) {
    const finalData = {
      recordId: allProjectStatusdata ? allProjectStatusdata._id : "",
      projectStatusCategory: projectStatusCategory,
      projectStatusType: projectStatusType,
    };
    //console.log(finalData);

    // AddDistrict(finalData);

    // setFormData({
    //   ...formData,
    //   districtName: "",
    //   isSubmitted: true,
    // });
    // }
  };
  const StatusCategory = [
    { value: "Cash", label: "Cash" },
    { value: "Cheque", label: "Cheque" },
  ];

  const onStatuscatChange = (e) => {
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
      {/* <form onSubmit={(e) => onSubmit(e)}> */}
      <div className="row col-lg-12 col-md-12 col-sm-12 col-12">
        <div className="col-lg-6 col-md-12 col-sm-12 col-12">
          <label className="label-control">Status Name :</label>
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
          <label className="label-control">Project Status Category :</label>
          <Select
            name="projectStatusCategory"
            options={StatusCategory}
            isSearchable={false}
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
      {/* </form> */}
    </Fragment>
  );
};

EditProjectStatus.propTypes = {
  auth: PropTypes.object.isRequired,
  area: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(EditProjectStatus);
