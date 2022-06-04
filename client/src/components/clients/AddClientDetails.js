import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";

const AddClientDetails = ({
  auth: { isAuthenticated, user, users, loading },

  onAddDistrictModalChange,
}) => {
  //formData
  const [formData, setFormData] = useState({
    districtName: "",
    isSubmitted: false,
  });

  const { districtName } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    //   e.preventDefault();
    //   if (checkErrors()) {
    //     const finalData = {
    //       districtName: districtName,
    //       stateId: stateId,
    //       districtEnteredById: user._id,
    //       districtEnteredByName: user.userName,
    //       institutionId: user.institutionId,
    //       userData: user,
    //     };
    //     AddDistrict(finalData);
    //     setFormData({
    //       ...formData,
    //       districtName: "",
    //       isSubmitted: true,
    //     });
    //     getStateData("");
    //   }
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align">
        <form className="row" onSubmit={(e) => onSubmit(e)}>
          <div className="col-lg-11 col-md-11 col-sm-12 col-12">
            <h2 className="heading_color">Add Client Details </h2>
            <hr />
          </div>
          <section className="sub_reg">
            <div className="row col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="row card-new pb-3">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <h5>Bank Info </h5>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                  <label className="label-control">Bank Name:</label>
                  <input
                    type="text"
                    // name="batchBankName"
                    // value={batchBankName}
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                  <label className="label-control">IFSC Code:</label>
                  <input
                    type="text"
                    //   name="batchBankIFSC"
                    //  value={batchBankIFSC}
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                  <label className="label-control">Account Number:</label>
                  <input
                    type="text"
                    // name="batchBankAccountNumber"
                    // value={batchBankAccountNumber}
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                  <label className="label-control">Branch:</label>
                  <input
                    type="text"
                    //    name="batchBankBranch"
                    //    value={batchBankBranch}
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
            </div>

            <div
              className="row col-lg-11 col-md-11 col-sm-12 col-12 Savebutton no_padding"
              size="lg"
            >
              <div className="col-lg-8 col-md-6 col-sm-12 col-12">
                <label className="label-control colorRed">
                  * Indicates mandatory fields, Please fill mandatory fields
                  before Submit
                </label>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 col-12">
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
                  to="/all-batches"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </section>
        </form>
      </div>
    </Fragment>
  );
};

AddClientDetails.propTypes = {
  auth: PropTypes.object.isRequired,
  area: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(AddClientDetails);
