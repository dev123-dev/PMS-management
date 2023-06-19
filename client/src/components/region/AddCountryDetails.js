import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addCountryDetails } from "../../actions/regions";
import Spinner from "../layout/Spinner";

const AddCountryDetails = ({
  auth: { isAuthenticated, user, users, loading },
  addCountryDetails,
  onAddModalChange,
}) => {
  //formData
  const [formData, setFormData] = useState({
    countryName: "",
    countryCode: "",
    isSubmitted: false,
  });
  const { countryName, countryCode } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      countryName: countryName.charAt(0).toUpperCase() + countryName.slice(1),
      countryCode: countryCode,
      countryEnteredById: user._id,
      countryEnteredByName: user.userName,
      countryBelongsTo: "DCT",
    };

    addCountryDetails(finalData);
    onAddModalChange(true);
    setFormData({
      ...formData,
      countryName: "",
      countryCode: "",
      isSubmitted: true,
    });
  };

  return !isAuthenticated || !user  ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align">
        <form className="row" onSubmit={(e) => onSubmit(e)} autoComplete="off">
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
                required
              />
            </div>
          </div>

          <div className="col-md-10 col-lg-12 col-sm-12 col-12 text-left">
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
                name="Save"
                value="Submit"
                className="btn sub_form btn_continue Save float-right"
              />
            )}
          </div>
        </form>
      </div>
    </Fragment>
  );
};

AddCountryDetails.propTypes = {
  auth: PropTypes.object.isRequired,
  area: PropTypes.object.isRequired,
  addCountryDetails: PropTypes.func.isRequired,
  savedMessage: PropTypes.string,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  area: state.area,
  savedMessage: state.auth.savedMessage,
});

export default connect(mapStateToProps, {
  addCountryDetails,
})(AddCountryDetails);
