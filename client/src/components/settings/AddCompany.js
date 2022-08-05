import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { AddCompanyDetails } from "../../actions/settings";
import Spinner from "../layout/Spinner";

const AddCompany = ({
  auth: { isAuthenticated, user, users, loading },
  onAddDistrictModalChange,
  AddCompanyDetails,
}) => {
  //formData
  const [formData, setFormData] = useState({
    companyName: "",
    companyWebsite: "",
    companyPhone1: "",
    companyPhone2: "",
    companyGSTIn: "",
    companyPanNo: "",
    companyRegisterNo: "",
    companyTradeLicenseNo: "",
    companyDescription: "",
    companyAddress: "",
    companyShortForm: "",
    isSubmitted: false,
  });

  const {
    companyName,
    companyWebsite,
    companyPhone1,
    companyPhone2,
    companyGSTIn,
    companyPanNo,
    companyRegisterNo,
    companyTradeLicenseNo,
    companyDescription,
    companyAddress,
    companyShortForm,
  } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Required Validation ends
  const onSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      companyName: companyName,
      companyWebsite: companyWebsite,
      companyPhone1: companyPhone1,
      companyPhone2: companyPhone2,
      companyGSTIn: companyGSTIn,
      companyPanNo: companyPanNo,
      companyRegisterNo: companyRegisterNo,
      companyTradeLicenseNo: companyTradeLicenseNo,
      companyDescription: companyDescription,
      companyAddress: companyAddress,
      companyShortForm: companyShortForm,
      departmentEnteredById: user._id,
      companyEnteredByName: user.FullName,
    };
    console.log(finalData);
    AddCompanyDetails(finalData);
    onAddDistrictModalChange(true);
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="col-lg-4 col-md-12 col-sm-12 col-12">
            <label className="label-control"> Company Name * :</label>
            <input
              type="text"
              name="companyName"
              value={companyName}
              className="form-control"
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <div className="col-lg-4 col-md-12 col-sm-12 col-12">
            <label className="label-control">Website :</label>
            <input
              type="text"
              name="companyWebsite"
              value={companyWebsite}
              className="form-control"
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="col-lg-4 col-md-12 col-sm-12 col-12">
            <label className="label-control">Phone1 :</label>

            <input
              type="Number"
              name="companyPhone1"
              value={companyPhone1}
              className="form-control"
              onChange={(e) => onInputChange(e)}
              onKeyDown={(e) =>
                (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
              }
            />
          </div>
          <div className="col-lg-4 col-md-12 col-sm-12 col-12">
            <label className="label-control"> Phone2 :</label>

            <input
              type="Number"
              name="companyPhone2"
              value={companyPhone2}
              className="form-control"
              onChange={(e) => onInputChange(e)}
              onKeyDown={(e) =>
                (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
              }
            />
          </div>
          <div className="col-lg-4 col-md-12 col-sm-12 col-12">
            <label className="label-control">GSTIn :</label>
            <input
              type="text"
              name="companyGSTIn"
              value={companyGSTIn}
              className="form-control"
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="col-lg-4 col-md-12 col-sm-12 col-12">
            <label className="label-control">PanNo :</label>
            <input
              type="text"
              name="companyPanNo"
              value={companyPanNo}
              className="form-control"
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="col-lg-4 col-md-12 col-sm-12 col-12">
            <label className="label-control">RegisterNo :</label>
            <input
              type="text"
              name="companyRegisterNo"
              value={companyRegisterNo}
              className="form-control"
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="col-lg-4 col-md-12 col-sm-12 col-12">
            <label className="label-control">Trade LicenseNo :</label>
            <input
              type="text"
              name="companyTradeLicenseNo"
              value={companyTradeLicenseNo}
              className="form-control"
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="col-lg-4 col-md-12 col-sm-12 col-12">
            <label className="label-control">Description :</label>
            <input
              type="text"
              name="companyDescription"
              value={companyDescription}
              className="form-control"
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="col-lg-4 col-md-12 col-sm-12 col-12">
            <label className="label-control">Short Form :</label>
            <input
              type="text"
              name="companyShortForm"
              value={companyShortForm}
              className="form-control"
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="col-lg-8 col-md-12 col-sm-12 col-12">
            <label className="label-control">Address :</label>

            <textarea
              name="companyAddress"
              id="companyAddress"
              className="textarea form-control"
              rows="3"
              placeholder="Company Address"
              style={{ width: "100%" }}
              value={companyAddress}
              onChange={(e) => onInputChange(e)}
            ></textarea>
          </div>
        </div>

        <div className="col-md-12 col-lg-12 col-sm-12 col-12 ">
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

AddCompany.propTypes = {
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  AddCompanyDetails: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  settings: state.settings,
});

export default connect(mapStateToProps, { AddCompanyDetails })(AddCompany);
