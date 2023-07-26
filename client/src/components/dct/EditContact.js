import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Select from "react-select";
import {
  editDctStaffDetails,
  editDctClientStaffDetails,
} from "../../actions/dct";
import { getActiveCountry } from "../../actions/regions";

const EditContact = ({
  auth: { isAuthenticated, user, users, loading },
  allStaffdata,
  getActiveCountry,
  regions: { activeCountry },
  onEditModalChange,
  editDctStaffDetails,
  editDctClientStaffDetails,
  from,
  filterData,
  staffFilter,
}) => {
  //formData
  useEffect(() => {
    getActiveCountry({ countryBelongsTo: "DCT" });
  }, [getActiveCountry]);
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
    staffCountryCode:
      allStaffdata && allStaffdata.staffCountryCode
        ? allStaffdata.staffCountryCode
        : "",

    isSubmitted: false,
  });

  const { staffName, staffPhoneNumber, staffEmailId, staffDesignation } =
    formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const allstaffcountry = [];
  activeCountry &&
    activeCountry.map((staffcountry) =>
      allstaffcountry.push({
        staffcountryId: staffcountry._id,
        staffCountryCode: staffcountry.countryCode,
        label: staffcountry.countryName + " (" + staffcountry.countryCode + ")",
        value: staffcountry.countryName,
      })
    );

  const [staffcountry, getstaffcountryData] = useState(
    allStaffdata
      ? allstaffcountry.length !== 0
        ? allstaffcountry &&
        allstaffcountry.filter(
          (x) => x.staffcountryId === allStaffdata.staffRegionId
        )[0]
        : ""
      : ""
  );
  const [staffcountryId, setstaffcountryID] = useState(
    allStaffdata.staffRegionId
  );
  const [staffCountryCode, setstaffCountryCode] = useState(
    allStaffdata.staffCountryCode
  );
  const [staffcountryname, setstaffcountryname] = useState(
    allStaffdata.staffRegion
  );
  const onstaffcountryChange = (e) => {
    var staffcountryId = "";
    var staffCountryCode = "";
    var staffcountryname = "";
    getstaffcountryData(e);
    staffCountryCode = e.staffCountryCode;
    staffcountryId = e.staffcountryId;
    staffcountryname = e.value;
    setstaffcountryname(staffcountryname);
    setstaffcountryID(staffcountryId);
    setstaffCountryCode(staffCountryCode);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      staffId: allStaffdata ? allStaffdata._id : "",
      staffName: staffName.charAt(0).toUpperCase() + staffName.slice(1), //to make first letter capital
      staffPhoneNumber: staffPhoneNumber,
      staffEmailId: staffEmailId?.trim(), //to trim and ? if there is no value inputed
      staffDesignation: staffDesignation?.trim(),
      staffRegion: staffcountryname,
      staffRegionId: staffcountryId,
      staffCountryCode: staffCountryCode,
      filterData: filterData,
      staffFilter: staffFilter,
    };

    if (from === "TestClient" || from === "RegularClient" || from === "Inactive" || from === "InactiveClient") {
      editDctClientStaffDetails(finalData);
    } else {
      editDctStaffDetails(finalData);
    }
    onEditModalChange(true);
    // ondivcloseChange(true);
  };

  const onKeyDown = (e) => {
    // Allow only numbers, backspace, and arrow keys
    if (!/^\d$/.test(e.key) && e.key !== "Backspace" && e.key !== "ArrowLeft" && e.key !== "ArrowRight") {
      e.preventDefault();
    }
  };

  return !isAuthenticated || !user ? (
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
                autoComplete="off"
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <label className="label-control">Email Id:</label>
              <input
                type="email"
                name="staffEmailId"
                value={staffEmailId}
                autoComplete="off"
                className="form-control"
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <label className="label-control">Region* :</label>
              <Select
                name="countryName"
                options={allstaffcountry}
                isSearchable={true}
                value={staffcountry}
                placeholder="Select Region"
                onChange={(e) => onstaffcountryChange(e)}
              />
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <label className="label-control">Staff Phone:</label>
              <input
                type="number"
                name="staffCountryCode"
                value={staffCountryCode}
                className="form-control"
                style={{ width: "50px" }}
                disabled
              />
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <label className="label-control">
                <br />
              </label>
              <input
                type="text"
                name="staffPhoneNumber"
                value={staffPhoneNumber}
                className="form-control"
                autoComplete="off"
                maxLength={12}
                onChange={(e) => onInputChange(e)}
                style={{ marginLeft: "-5em", width: "20vh" }}
                onKeyDown={onKeyDown}
              />
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <label className="label-control">Designation :</label>
              <input
                type="text"
                name="staffDesignation"
                value={staffDesignation}
                className="form-control"
                autoComplete="off"
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
  regions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  regions: state.regions,
});

export default connect(mapStateToProps, {
  editDctStaffDetails,
  getActiveCountry,
  editDctClientStaffDetails,
})(EditContact);
