import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";

const AddDistrictDetails = ({
  savedMessage,
  auth: { isAuthenticated, user, users, loading },
  //   AddState,
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
    e.preventDefault();
    const finalData = {
      districtName: districtName,
      districtEnteredById: user._id,
      districtEnteredByName: user.userName,
      districtBelongsTo: "DCT",
    };
    console.log(finalData);
    // AddState(finalData);
    setFormData({
      ...formData,
      districtName: "",

      isSubmitted: true,
    });
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align">
        <form className="row" onSubmit={(e) => onSubmit(e)} autoComplete="off">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
              <label className="label-control"> District Name * :</label>
              <input
                type="text"
                name="districtName"
                value={districtName}
                className="form-control"
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
              <label className="label-control"> District Code * :</label>
              {/* <input
                type="Number"
                name="stateName"
                value={stateName}
                className="form-control"
                onChange={(e) => onInputChange(e)}
                onKeyDown={(e) =>
                  (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
                }
              /> */}
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

AddDistrictDetails.propTypes = {
  auth: PropTypes.object.isRequired,
  area: PropTypes.object.isRequired,
  //   AddState: PropTypes.func.isRequired,
  savedMessage: PropTypes.string,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  area: state.area,
  savedMessage: state.auth.savedMessage,
});

export default connect(mapStateToProps, {
  //   AddState,
})(AddDistrictDetails);
