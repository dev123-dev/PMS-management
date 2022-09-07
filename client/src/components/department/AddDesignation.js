import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import { AddNewDesignation } from "../../actions/settings";

import Spinner from "../layout/Spinner";

const AddDesignation = ({
  auth: { isAuthenticated, user, users, loading },
  onAddModalChange,
  AddNewDesignation,
}) => {
  //formData
  const [formData, setFormData] = useState({
    designationName: "",
    designationDesc: "",
    isSubmitted: false,
  });

  const { designationName, designationDesc } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Required Validation ends
  const onSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      designationName: designationName,
      designationDesc: designationDesc,
      designationEnteredById: user._id,
    };
    AddNewDesignation(finalData);
    onAddModalChange(true);

    // setFormData({
    //   ...formData,
    //   districtName: "",
    //   isSubmitted: true,
    // });
    // getStateData("");
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="col-lg-10 col-md-12 col-sm-12 col-12">
            <label className="label-control"> Designation Name * :</label>
            <input
              type="text"
              name="designationName"
              value={designationName}
              className="form-control"
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <div className="col-lg-10 col-md-12 col-sm-12 col-12">
            <label className="label-control"> Designation Description :</label>
            <input
              type="text"
              name="designationDesc"
              value={designationDesc}
              className="form-control"
              onChange={(e) => onInputChange(e)}
            />
          </div>
        </div>

        <div className="col-md-12 col-lg-10 col-sm-12 col-12 text-left">
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

AddDesignation.propTypes = {
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  AddNewDesignation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  settings: state.settings,
});

export default connect(mapStateToProps, { AddNewDesignation })(AddDesignation);
