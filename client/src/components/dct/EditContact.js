import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import {
  editDctStaffDetails,
  editDctClientStaffDetails,
} from "../../actions/dct";

const EditContact = ({
  auth: { isAuthenticated, user, users, loading },
  allStaffdata,
  allleaddata,
  ondivcloseChange,
  onEditModalChange,
  editDctStaffDetails,
  editDctClientStaffDetails,
  from,
  filterData,
}) => {
  //formData

  const [formData, setFormData] = useState({
    staffName:
      allStaffdata && allStaffdata.staffName ? allStaffdata.staffName : "",
    staffPhoneNumber:
      allStaffdata && allStaffdata.staffPhoneNumber
        ? allStaffdata.staffPhoneNumber
        : "",
    staffEmailId:
      allStaffdata && allStaffdata.staffEmailId
        ? allStaffdata.staffEmailId
        : "",
    staffDesignation:
      allStaffdata && allStaffdata.staffDesignation
        ? allStaffdata.staffDesignation
        : "",

    isSubmitted: false,
  });

  const { staffName, staffPhoneNumber, staffEmailId, staffDesignation } =
    formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      staffId: allStaffdata ? allStaffdata._id : "",
      staffName: staffName,
      staffPhoneNumber: staffPhoneNumber,
      staffEmailId: staffEmailId,
      staffDesignation: staffDesignation,
      filterData: filterData,
    };
    if (from === "client") {
      editDctClientStaffDetails(finalData);
    } else {
      editDctStaffDetails(finalData);
    }
    onEditModalChange(true);
    ondivcloseChange(true);
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <form className="row" onSubmit={(e) => onSubmit(e)}>
        <div className="row col-lg-12 col-md-11 col-sm-12 col-12 ">
          <div className="row card-new  pb-3">
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <label className="label-control">Staff Name :</label>
              <input
                type="text"
                name="staffName"
                value={staffName}
                className="form-control"
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <label className="label-control">Phone Number :</label>
              <input
                type="text"
                name="staffPhoneNumber"
                value={staffPhoneNumber}
                className="form-control"
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <label className="label-control">EmailId:</label>
              <input
                type="text"
                name="staffEmailId"
                value={staffEmailId}
                className="form-control"
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <label className="label-control">Designation :</label>
              <input
                type="text"
                name="staffDesignation"
                value={staffDesignation}
                className="form-control"
                onChange={(e) => onInputChange(e)}
              />
            </div>
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
                value="Update"
                className="btn sub_form btn_continue blackbrd Save float-right"
              />
            )}
          </div>
        </div>
      </form>
    </Fragment>
  );
};

EditContact.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  editDctStaffDetails,
  editDctClientStaffDetails,
})(EditContact);
