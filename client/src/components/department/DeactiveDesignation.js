import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Spinner from "../layout/Spinner";

const DeactiveDesignation = ({
  auth: { isAuthenticated, user, users, loading },

  Designationdeactivedata,
  onDeactiveModalChange,
}) => {
  //formData
  const [formData, setFormData] = useState({
    designationName:
      Designationdeactivedata && Designationdeactivedata.designationName
        ? Designationdeactivedata.designationName
        : "",
    designationDesc:
      Designationdeactivedata && Designationdeactivedata.designationDesc
        ? Designationdeactivedata.designationDesc
        : "",

    isSubmitted: false,
  });

  const {
    designationName,
    designationDesc,
    designationDeactiveReason,
  } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    const finalData = {
      recordId: Designationdeactivedata ? Designationdeactivedata._id : "",
      designationDeactiveReason: designationDeactiveReason,
      designationDeactiveById: user._id,
      designationDeactiveDateTime: new Date().toLocaleString(),
    };

    console.log(finalData);
    // editDesignation(finalData);

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
          <div className="col-lg-8 col-md-12 col-sm-12 col-12">
            <label className="label-control">
              {" "}
              Designation Name: {designationName}
            </label>
          </div>
          <div className="col-lg-8 col-md-12 col-sm-12 col-12">
            <label className="label-control">
              Designation Description : {designationDesc}
            </label>
          </div>

          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <label className="label-control">Deactive Reason:</label>

            <textarea
              name="designationDeactiveReason"
              id="designationDeactiveReason"
              className="textarea form-control"
              rows="3"
              placeholder="Deactive Reason"
              style={{ width: "100%" }}
              value={designationDeactiveReason}
              onChange={(e) => onInputChange(e)}
              required
            ></textarea>
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

DeactiveDesignation.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(DeactiveDesignation);
