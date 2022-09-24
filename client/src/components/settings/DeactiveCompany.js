import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import Spinner from "../layout/Spinner";
import { deactivateCompanyData } from "../../actions/settings";
const DeactiveCompany = ({
  auth: { isAuthenticated, user, users, loading },
  companydeactivedata,
  onDeactiveModalChange,
  deactivateCompanyData,
}) => {
  const [formData, setFormData] = useState({
    companyName:
      companydeactivedata && companydeactivedata.companyName
        ? companydeactivedata.companyName
        : "",
    companyDeactivateReason: "",
    isSubmitted: false,
  });

  const { companyName, companyDeactivateReason } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      recordId: companydeactivedata ? companydeactivedata._id : "",
      companyDeactivateReason: companyDeactivateReason.trim(),
      companyDeactivateById: user._id,
      companyDeactivateDateTime: new Date().toLocaleString(),
    };
    deactivateCompanyData(finalData);
    onDeactiveModalChange(true);
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <label className="label-control">
              Company Name : {companyName}
            </label>
          </div>

          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <label className="label-control">Deactive Reason :</label>
            <textarea
              name="companyDeactivateReason"
              id="companyDeactivateReason"
              className="textarea form-control"
              rows="3"
              placeholder="Deactive Reason"
              style={{ width: "100%" }}
              value={companyDeactivateReason}
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
            <input
              type="submit"
              name="Submit"
              value="Submit"
              className="btn sub_form btn_continue Save float-right"
            />
          )}
        </div>
      </form>
    </Fragment>
  );
};

DeactiveCompany.propTypes = {
  auth: PropTypes.object.isRequired,
  deactivateCompanyData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deactivateCompanyData })(
  DeactiveCompany
);
