import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { deactiveProjectData } from "../../actions/projects";
import { Link } from "react-router-dom";
const DeactiveCountry = ({
  auth: { isAuthenticated, user, users, loading },
  Projectdeavtivedata,
  onDeactiveModalChange,
  deactiveProjectData,
}) => {
  //formData
  // console.log("data", Projectdeavtivedata);
  const [formData, setFormData] = useState({
    countryName: "",
    countryCode: "",
    // clientName:
    //   clientdeactivedata && clientdeactivedata.clientName
    //     ? clientdeactivedata.clientName
    //     : "",
    isSubmitted: false,
  });

  const { countryName, countryCode, countryDeactivateReason } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      recordId: Projectdeavtivedata ? Projectdeavtivedata._id : "",
      countryName: countryName,
      countryCode: countryCode,
      countryDeactivateReason: countryDeactivateReason,
      countryDeactivateById: user._id,
      countryDeactivateDateTime: Date.now(),
    };
    console.log(finalData);
    // console.log(finalData);
    // deactiveProjectData(finalData);
    // onDeactiveModalChange(true);
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="col-lg-8 col-md-12 col-sm-12 col-12">
            <label className="label-control">
              Country Name : {countryName}
            </label>
          </div>
          <div className="col-lg-8 col-md-12 col-sm-12 col-12">
            <label className="label-control">
              Country Code : {countryCode}
            </label>
          </div>
          <div className="col-lg-8 col-md-12 col-sm-12 col-12">
            <label className="label-control">Deactivate Reason:</label>

            <textarea
              name="countryDeactivateReason"
              id="countryDeactivateReason"
              className="textarea form-control"
              rows="3"
              placeholder=" Deactive Reason"
              style={{ width: "100%" }}
              value={countryDeactivateReason}
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
                Are you sure you want Deactive the Country?
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

DeactiveCountry.propTypes = {
  auth: PropTypes.object.isRequired,
  deactiveProjectData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  deactiveProjectData,
})(DeactiveCountry);
