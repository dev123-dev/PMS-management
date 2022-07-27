import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import { getStates, EditDistrictData } from "../../actions/regions";
import Spinner from "../layout/Spinner";

const EditDistrictDetails = ({
  auth: { isAuthenticated, user, users, loading },
  EditDistrictData,
  getStates,
  onUpdateModalChange,
  districts,
  statesDataVal,
}) => {
  //formData
  const [formData, setFormData] = useState({
    districtName:
      districts && districts.districtName ? districts.districtName : "",
    isSubmitted: false,
  });
  const { districtName } = formData;
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const allstates = [];
  statesDataVal &&
    statesDataVal.map((state) => {
      allstates.push({
        stateId: state._id,
        label: state.stateName,
        value: state.stateName,
      });
    });

  const [state, setStateData] = useState(
    districts
      ? allstates.length !== 0
        ? allstates &&
          allstates.filter((x) => x.stateId === districts.stateId)[0]
        : ""
      : ""
  );
  const [stateId, setStateID] = useState(districts.stateId);

  const onStateChange = (e) => {
    var stateId = "";
    setStateData(e);
    stateId = e.stateId;
    setStateID(stateId);
  };

  const onUpdate = (e) => {
    // e.preventDefault();
    const finalData = {
      recordId: districts ? districts._id : "",
      stateId: stateId,
      districtName: districtName,
      districtEditedById: user._id,
      districtEditedDateTime: user.userName,
    };
    // console.log(finalData);
    EditDistrictData(finalData);
    onUpdateModalChange(true);
    // setFormData({
    //   ...formData,
    //   stateName: "",
    //   isSubmitted: true,
    // });
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align">
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
            <label className="label-control">State * :</label>
            <Select
              name="stateName"
              options={allstates}
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

EditDistrictDetails.propTypes = {
  auth: PropTypes.object.isRequired,
  regions: PropTypes.object.isRequired,
  EditDistrictData: PropTypes.func.isRequired,
  getStates: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  regions: state.regions,
});

export default connect(mapStateToProps, {
  getStates,
  EditDistrictData,
})(EditDistrictDetails);
