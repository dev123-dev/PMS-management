import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { addDistrictDetails, getStates } from "../../actions/regions";
import Select from "react-select";

const AddDistrictDetails = ({
  auth: { isAuthenticated, user, users, loading },
  regions: { statesData },
  addDistrictDetails,
  getStates,
}) => {
  useEffect(() => {
    getStates();
  }, [getStates]);
  //formData
  const [formData, setFormData] = useState({
    districtName: "",
    isSubmitted: false,
  });
  console.log("statesData", statesData);
  const { districtName } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //Required Validation Starts
  const [error, setError] = useState({
    sIdChecker: false,
    sIdErrorStyle: {},
  });
  const { sIdChecker, sIdErrorStyle } = error;

  const checkErrors = () => {
    if (!sIdChecker) {
      setError({
        ...error,
        sIdErrorStyle: { color: "#F00" },
      });
      return false;
    }
    return true;
  };
  // const allstates = [];
  // statesData.map((state) =>
  //   allstates.push({
  //     stateId: state._id,
  //     label: state.stateName,
  //     value: state.stateName,
  //   })
  // );

  const [state, getStateData] = useState();
  const [stateId, setStateID] = useState();

  const onStateChange = (e) => {
    //Required Validation Starts
    setError({
      ...error,
      sIdChecker: true,
      sIdErrorStyle: { color: "#000" },
    });
    //Required Validation ends
    var stateId = "";
    getStateData(e);
    stateId = e.stateId;
    setStateID(stateId);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      districtName: districtName,
      districtEnteredById: user._id,
      districtEnteredByName: user.userName,
      districtBelongsTo: "DCT",
    };
    // console.log(finalData);
    addDistrictDetails(finalData);
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
              <label className="label-control" style={sIdErrorStyle}>
                State * :
              </label>
              <Select
                name="stateName"
                //  options={allstates}
                isSearchable={true}
                value={state}
                placeholder="Select State"
                onChange={(e) => onStateChange(e)}
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
  addDistrictDetails: PropTypes.func.isRequired,
  savedMessage: PropTypes.string,
  getStates: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  area: state.area,
  savedMessage: state.auth.savedMessage,
});

export default connect(mapStateToProps, {
  addDistrictDetails,
  getStates,
})(AddDistrictDetails);
