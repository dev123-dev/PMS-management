import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import { deactivateSctLeadDetails } from "../../actions/sct";

const DeactiveSctLead = ({
  auth: { isAuthenticated, user, users, loading },
  Leaddeavtivedata,
  onDeactiveModalChange,
  ondivcloseChange,
  deactivateSctLeadDetails,
  filterData,
}) => {
  //formData
  const [formData, setFormData] = useState({
    sctCompanyName:
      Leaddeavtivedata && Leaddeavtivedata.sctCompanyName
        ? Leaddeavtivedata.sctCompanyName
        : "",

    sctWebsite:
      Leaddeavtivedata && Leaddeavtivedata.sctWebsite
        ? Leaddeavtivedata.sctWebsite
        : "",
    sctLeadDeactiveReason: "",
  });

  const { sctLeadDeactiveReason, sctWebsite, sctCompanyName } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      recordId: Leaddeavtivedata ? Leaddeavtivedata._id : "",
      sctLeadDeactivateByDateTime: new Date().toLocaleString("en-GB"),
      sctLeadDeactivateById: user._id,
      sctLeadStatus: "Deactive",
      sctLeadDeactiveReason: sctLeadDeactiveReason?.trim(),
      filterData: filterData,
    };
    deactivateSctLeadDetails(finalData);
    onDeactiveModalChange(true);
    ondivcloseChange(true);
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <form className="row" onSubmit={(e) => onSubmit(e)}>
        <div className="row col-lg-12 col-md-11 col-sm-12 col-12 ">
          <div className="col-lg-12 col-md-11 col-sm-12 col-12 ">
            <label className="label-control">
              Company Name : {sctCompanyName}
            </label>
          </div>
          <div className="col-lg-12 col-md-11 col-sm-12 col-12 ">
            <label className="label-control">Website : {sctWebsite}</label>
          </div>
          <div className="col-lg-12 col-md-11 col-sm-12 col-12 ">
            <label className="label-control">Deactive Reason :</label>
            <textarea
              name="sctLeadDeactiveReason"
              id="sctLeadDeactiveReason"
              className="textarea form-control"
              rows="3"
              placeholder="Lead Deactive Reason"
              style={{ width: "100%" }}
              value={sctLeadDeactiveReason}
              onChange={(e) => onInputChange(e)}
              required
            ></textarea>
          </div>
        </div>

        <div
          className="row col-lg-12 col-md-11 col-sm-12 col-12 Savebutton no_padding"
          size="lg"
        >
          <div className="col-lg-8 col-md-6 col-sm-12 col-12">
            <label className="label-control colorRed">
              * Indicates mandatory fields.
            </label>
          </div>
          <div className="col-lg-12 col-md-6 col-sm-12 col-12">
            {loading ? (
              <button
                className="btn sub_form btn_continue blackbrd Save float-right"
                disabled
              >
                Loading...
              </button>
            ) : (
              <input
                type="submit"
                name="Submit"
                value="Submit"
                className="btn sub_form btn_continue blackbrd Save float-right"
              />
            )}
            <Link
              className="btn sub_form btn_continue blackbrd float-right"
              // to="/job-queue"
              onClick={() => onDeactiveModalChange(true)}
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

DeactiveSctLead.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  deactivateSctLeadDetails,
})(DeactiveSctLead);
