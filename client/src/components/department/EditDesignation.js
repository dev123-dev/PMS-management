import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";

import Spinner from "../layout/Spinner";

const EditDesignation = ({
  auth: { isAuthenticated, user, users, loading },
  allDeptartmentdata,
  onAddDistrictModalChange,
}) => {
  //formData
  const [formData, setFormData] = useState({
    designationName:
      allDeptartmentdata && allDeptartmentdata.designationName
        ? allDeptartmentdata.designationName
        : "",
    designationDesc:
      allDeptartmentdata && allDeptartmentdata.designationDesc
        ? allDeptartmentdata.designationDesc
        : "",

    isSubmitted: false,
  });

  const { designationName, designationDesc } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    const finalData = {
      recordId: allDeptartmentdata ? allDeptartmentdata._id : "",

      designationName: designationName,
      designationDesc: designationDesc,
      // designationEditedById:
    };

    console.log(finalData);
    //AddDistrict(finalData);

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
      {/* <form onSubmit={(e) => onSubmit(e)}> */}
      <div className="row col-lg-12 col-md-12 col-sm-12 col-12">
        <div className="col-lg-8 col-md-12 col-sm-12 col-12">
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
        <div className="col-lg-8 col-md-12 col-sm-12 col-12">
          <label className="label-control"> Designation Description * :</label>
          <input
            type="text"
            name="designationDesc"
            value={designationDesc}
            className="form-control"
            onChange={(e) => onInputChange(e)}
            required
          />
        </div>
      </div>

      <div className="col-md-12 col-lg-8 col-sm-12 col-12 text-left">
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

EditDesignation.propTypes = {
  auth: PropTypes.object.isRequired,
  area: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(EditDesignation);