import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";

const EditUserGroup = ({
  auth: { isAuthenticated, user, users, loading },

  onAddDistrictModalChange,
}) => {
  //formData
  const [formData, setFormData] = useState({
    districtName: "",
    isSubmitted: false,
  });

  const { districtName } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    //   e.preventDefault();
    //   if (checkErrors()) {
    //     const finalData = {
    //       districtName: districtName,
    //       stateId: stateId,
    //       districtEnteredById: user._id,
    //       districtEnteredByName: user.userName,
    //       institutionId: user.institutionId,
    //       userData: user,
    //     };
    //     AddDistrict(finalData);
    //     setFormData({
    //       ...formData,
    //       districtName: "",
    //       isSubmitted: true,
    //     });
    //     getStateData("");
    //   }
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      {" "}
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="row col-lg-11 col-md-11 col-sm-12 col-12 ">
          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <label className="label-control">UserGroup Name:</label>
            <input
              type="text"
              // name="batchBankName"
              // value={batchBankName}
              className="form-control"
              onChange={(e) => onInputChange(e)}
            />
          </div>
        </div>

        <div
          className="row col-lg-11 col-md-11 col-sm-12 col-12 Savebutton no_padding"
          size="lg"
        >
          <div className="col-lg-8 col-md-6 col-sm-12 col-12">
            <label className="label-control colorRed">
              * Indicates mandatory fields,
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
          </div>
        </div>
      </form>
    </Fragment>
  );
};

EditUserGroup.propTypes = {
  auth: PropTypes.object.isRequired,
  area: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(EditUserGroup);
