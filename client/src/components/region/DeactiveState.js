import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { deactiveStateData } from "../../actions/regions";
import { Link } from "react-router-dom";
const DeactiveState = ({
  auth: { isAuthenticated, user, users, loading },
  Projectdeavtivedata,
  onDeactiveModalChange,
  statedeavtivedata,
  deactiveStateData,
}) => {
  //formData
  //console.log("data", statedeavtivedata);
  const [formData, setFormData] = useState({
    stateName:
      statedeavtivedata && statedeavtivedata.stateName
        ? statedeavtivedata.stateName
        : "",

    isSubmitted: false,
  });

  const { stateName, stateDeactivateReason } = formData;
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      recordId: statedeavtivedata ? statedeavtivedata._id : "",
      stateDeactivateReason: stateDeactivateReason,
      stateStatus: "Deactive",
      stateDeactiveById: user._id,
      stateDeactivateDateTime: new Date().toLocaleString(),
    };
    console.log(finalData);
    deactiveStateData(finalData);
    onDeactiveModalChange(true);
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="col-lg-8 col-md-12 col-sm-12 col-12">
            <label className="label-control">State Name : {stateName}</label>
          </div>

          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <label className="label-control">Deactivate Reason:</label>

            <textarea
              name="stateDeactivateReason"
              id="stateDeactivateReason"
              className="textarea form-control"
              rows="3"
              placeholder=" Deactive Reason"
              style={{ width: "100%" }}
              value={stateDeactivateReason}
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
            <>
              <label className="label-control colorRed">
                Are you sure you want Deactive the State?
              </label>
              <br />
              <input
                type="submit"
                name="Submit"
                value="Submit"
                className="btn sub_form btn_continue blackbrd Save float-right"
              />
              <Link
                to="#"
                className="btn sub_form btn_continue blackbrd float-right"
                onClick={() => onDeactiveModalChange(true)}
              >
                Cancel
              </Link>
            </>
          )}
        </div>
      </form>
    </Fragment>
  );
};

DeactiveState.propTypes = {
  auth: PropTypes.object.isRequired,
  deactiveStateData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  deactiveStateData,
})(DeactiveState);
