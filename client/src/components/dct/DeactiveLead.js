import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
const DeactiveLead = ({
  auth: { isAuthenticated, user, users, loading },
  Leaddeavtivedata,
}) => {
  //formData
  const [formData, setFormData] = useState({
    clientName: "",
    isSubmitted: false,
  });

  const { isSubmitted } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const finalData = {
      recordId: Leaddeavtivedata ? Leaddeavtivedata._id : "",
      dctLeadDeactivateByDateTime: new Date().toLocaleString(),
      dctLeadDeactivateById: user._id,
      dctLeadStatus: "Deactive",
      // designationDeactiveReason:"",
    };
    console.log(finalData);
    //  addProject(finalData);
    setFormData({
      ...formData,
      isSubmitted: true,
    });
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <form className="row" onSubmit={(e) => onSubmit(e)}>
        <div className="row col-lg-12 col-md-11 col-sm-12 col-12 ">
          <div className="col-lg-12 col-md-11 col-sm-12 col-12 ">
            <label className="label-control">Deactive Reason :</label>
            <textarea
              name="clientAddress"
              id="clientAddress"
              className="textarea form-control"
              rows="3"
              placeholder="Lead Deactive Reason"
              style={{ width: "100%" }}
              //  value={clientAddress}
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
              to="/job-queue"
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

DeactiveLead.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(DeactiveLead);
