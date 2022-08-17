import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { deactiveDistrictsData } from "../../actions/regions";
import { Link } from "react-router-dom";
const DeactiveDistrict = ({
  auth: { isAuthenticated, user, users, loading },
  districtdeactivedata,
  onDeactiveModalChange,
  deactiveDistrictsData,
}) => {
  //formData
  //console.log("data", districtdeactivedata);
  const [formData, setFormData] = useState({
    districtDeactivateReason: "",
    districtName:
      districtdeactivedata && districtdeactivedata.districtName
        ? districtdeactivedata.districtName
        : "",
    stateName:
      districtdeactivedata && districtdeactivedata.output.stateName
        ? districtdeactivedata.output.stateName
        : "",
    clientFolderName:
      districtdeactivedata && districtdeactivedata.projectName
        ? districtdeactivedata.clientFolderName
        : "",

    isSubmitted: false,
  });

  const { districtName, stateName, districtDeactivateReason } = formData;
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      recordId: districtdeactivedata ? districtdeactivedata._id : "",
      districtStatus: "Deactive",
      districtDeactivateReason: districtDeactivateReason,
      districtDeactivateById: user._id,
      districtDeactivateDateTime: new Date().toLocaleString(),
    };
    // console.log(finalData);
    deactiveDistrictsData(finalData);
    onDeactiveModalChange(true);
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="col-lg-6 col-md-12 col-sm-12 col-12">
            <label className="label-control">
              District Name : {districtName}
            </label>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 col-12">
            <label className="label-control">State Name : {stateName}</label>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <label className="label-control">Deactivate Reason:</label>

            <textarea
              name="districtDeactivateReason"
              id="districtDeactivateReason"
              className="textarea form-control"
              rows="3"
              placeholder=" Deactive Reason"
              style={{ width: "100%" }}
              value={districtDeactivateReason}
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
                Are you sure you want Deactive the District?
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

DeactiveDistrict.propTypes = {
  auth: PropTypes.object.isRequired,
  deactiveDistrictsData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  deactiveDistrictsData,
})(DeactiveDistrict);
