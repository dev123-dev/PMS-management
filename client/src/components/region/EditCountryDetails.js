import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { EditCountryData } from "../../actions/regions";
import Spinner from "../layout/Spinner";

const EditCountryDetails = ({
  auth: { isAuthenticated, user, users, loading },
  editcountrydata,
  EditCountryData,
  onUpdateModalChange,
  districts,
}) => {
  //   useEffect(() => {
  //     getStates();
  //   }, [getStates]);

  //formData
  const [formData, setFormData] = useState({
    countryName:
      editcountrydata && editcountrydata.countryName
        ? editcountrydata.countryName
        : "",
    countryCode:
      editcountrydata && editcountrydata.countryCode
        ? editcountrydata.countryCode
        : "",
    isSubmitted: false,
  });
  const { countryName, countryCode } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onUpdate = (e) => {
    //e.preventDefault();
    // if (checkErrors()) {
    const finalData = {
      recordId: editcountrydata ? editcountrydata._id : "",
      countryName: countryName,
      countryCode: countryCode,
      countryEditedById: user._id,
      countryEditedDateTime: new Date().toLocaleString(),
    };
    // console.log(finalData);
    EditCountryData(finalData);
    onUpdateModalChange(true);
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align">
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="col-lg-6 col-md-12 col-sm-12 col-12">
            <label className="label-control"> Country Name * :</label>
            <input
              type="text"
              name="countryName"
              value={countryName}
              className="form-control"
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 col-12">
            <label className="label-control"> Country Code * :</label>
            <input
              type="Number"
              name="countryCode"
              value={countryCode}
              className="form-control"
              onChange={(e) => onInputChange(e)}
              onKeyDown={(e) =>
                (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
              }
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
            <button
              variant="success"
              className="btn sub_form btn_continue Save float-right"
              onClick={() => onUpdate()}
            >
              Update
            </button>
          )}
        </div>
      </div>
    </Fragment>
  );
};

EditCountryDetails.propTypes = {
  auth: PropTypes.object.isRequired,
  regions: PropTypes.object.isRequired,
  EditCountryData: PropTypes.func.isRequired,
  //   getStates: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  regions: state.regions,
});

export default connect(mapStateToProps, {
  //   getStates,
  EditCountryData,
})(EditCountryDetails);
