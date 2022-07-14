import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
// import { getStates, editDistrictDetails } from "../../actions/area";
import Spinner from "../layout/Spinner";

const EditDistrictDetails = ({
  auth: { isAuthenticated, user, users, loading },
  //   getStates,
  //   editDistrictDetails,
  districts,
}) => {
  //   useEffect(() => {
  //     getStates();
  //   }, [getStates]);

  //formData
  const [formData, setFormData] = useState({
    stateName: "",
    isSubmitted: false,
  });
  const { stateName } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
              name="stateName"
              value={stateName}
              className="form-control"
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 col-12">
            <label className="label-control"> District Code * :</label>
            <input
              type="Number"
              name="stateName"
              value={stateName}
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
              // onClick={() => onUpdate(districts)}
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
  area: PropTypes.object.isRequired,
  //   editDistrictDetails: PropTypes.func.isRequired,
  //   getStates: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  area: state.area,
});

export default connect(mapStateToProps, {
  //   getStates,
  //   editDistrictDetails,
})(EditDistrictDetails);
