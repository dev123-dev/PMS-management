import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { EditStateData } from "../../actions/regions";
import Spinner from "../layout/Spinner";

const EditStateDetails = ({
  auth: { isAuthenticated, user, users, loading },
  stateeditdata,
  EditStateData,
  districts,
  onUpdateModalChange,
}) => {
  //   useEffect(() => {
  //     getStates();
  //   }, [getStates]);
  // console.log(stateeditdata);
  //formData
  const [formData, setFormData] = useState({
    stateName:
      stateeditdata && stateeditdata.stateName ? stateeditdata.stateName : "",
  });
  const { stateName } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onUpdate = (e) => {
    // e.preventDefault();
    const finalData = {
      recordId: stateeditdata ? stateeditdata._id : "",
      stateName: stateName,
      stateEditedById: user._id,
      stateEditedDateTime: user.userName,
    };
    // console.log(finalData);
    EditStateData(finalData);
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
            <label className="label-control"> State Name * :</label>
            <input
              type="text"
              name="stateName"
              value={stateName}
              className="form-control"
              onChange={(e) => onInputChange(e)}
              required
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

EditStateDetails.propTypes = {
  auth: PropTypes.object.isRequired,
  regions: PropTypes.object.isRequired,
  EditStateData: PropTypes.func.isRequired,
  //   getStates: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  regions: state.regions,
});

export default connect(mapStateToProps, {
  //   getStates,
  EditStateData,
})(EditStateDetails);
