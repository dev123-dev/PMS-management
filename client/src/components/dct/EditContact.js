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
  allleaddata,
  ondivcloseChange,
  onEditModalChange,
  editDctStaffDetails,
  editDctClientStaffDetails,
  from,
  filterData,
}) => {
  //formData
  useEffect(() => {
    getActiveCountry();
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
        staffcountrycode: staffcountry.countryCode,
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
  const [staffcountrycode, setstaffcountrycode] = useState(
    allStaffdata.staffCountryCode
  );
  const [staffcountryname, setstaffcountryname] = useState(
    allStaffdata.staffRegion
  );
  const onstaffcountryChange = (e) => {
    var staffcountryId = "";
    var staffcountrycode = "";
    var staffcountryname = "";
    getstaffcountryData(e);
    staffcountrycode = e.staffcountrycode;
    staffcountryId = e.staffcountryId;
    staffcountryname = e.value;
    setstaffcountryname(staffcountryname);
    setstaffcountryID(staffcountryId);
    setstaffcountrycode(staffcountrycode);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      staffId: allStaffdata ? allStaffdata._id : "",
      staffName: staffName,
      staffPhoneNumber: staffPhoneNumber,
      staffEmailId: staffEmailId,
      staffDesignation: staffDesignation,
      staffRegion: staffcountryname,
      staffRegionId: staffcountryId,
      staffcountrycode: staffcountrycode,
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
              <label className="label-control">EmailId:</label>
              <input
                type="text"
                name="staffEmailId"
                value={staffEmailId}
                className="form-control"
                onChange={(e) => onInputChange(e)}
              />
            </div>
            {/* <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <label className="label-control">Region* :</label>
              <Select
                name="countryName"
                options={allstaffcountry}
                isSearchable={true}
                value={staffcountry}
                placeholder="Select Region"
                onChange={(e) => onstaffcountryChange(e)}
              />
            </div> */}
            {/* <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <label className="label-control">Staff Phone:</label>
              <input
                type="number"
                name="staffcountrycode"
                value={staffcountrycode}
                className="form-control"
                style={{ width: "50px" }}
                disabled
              />
            </div> */}

            {/* <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <label className="label-control">
                <br />
              </label>
              <input
                type="number"
                name="staffPhoneNumber"
                value={staffPhoneNumber}
                className="form-control"
                onChange={(e) => onInputChange(e)}
                style={{ marginLeft: "-5em", width: "20vh" }}
                onKeyDown={(e) =>
                  (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
                }
              />
            </div> */}
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <label className="label-control">Staff Phone:</label>
              <input
                type="number"
                name="staffPhoneNumber"
                value={staffPhoneNumber}
                className="form-control"
                onChange={(e) => onInputChange(e)}
                onKeyDown={(e) =>
                  (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
                }
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
