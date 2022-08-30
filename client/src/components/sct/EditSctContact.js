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

const EditSctContact = ({
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
    sctStaffName:
      allStaffdata && allStaffdata.sctStaffName
        ? allStaffdata.sctStaffName
        : "",
    sctStaffPhoneNumber:
      allStaffdata && allStaffdata.sctStaffPhoneNumber
        ? allStaffdata.sctStaffPhoneNumber
        : "",
    sctStaffEmailId:
      allStaffdata && allStaffdata.sctStaffEmailId
        ? allStaffdata.sctStaffEmailId
        : "",
    sctStaffDesignation:
      allStaffdata && allStaffdata.sctStaffDesignation
        ? allStaffdata.sctStaffDesignation
        : "",
    staffCountryCode:
      allStaffdata && allStaffdata.staffCountryCode
        ? allStaffdata.staffCountryCode
        : "",

    isSubmitted: false,
  });

  const {
    sctStaffName,
    sctStaffPhoneNumber,
    sctStaffEmailId,
    sctStaffDesignation,
  } = formData;

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
      sctStaffName: sctStaffName,
      sctStaffPhoneNumber: sctStaffPhoneNumber,
      sctStaffEmailId: sctStaffEmailId,
      sctStaffDesignation: sctStaffDesignation,
      // staffRegion: staffcountryname,
      // staffRegionId: staffcountryId,
      // staffCountryCode: staffCountryCode,
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
                name="sctStaffName"
                value={sctStaffName}
                className="form-control"
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <label className="label-control">EmailId:</label>
              <input
                type="text"
                name="sctStaffEmailId"
                value={sctStaffEmailId}
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
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <label
                className="label-control"
                // style={StateErrorStyle}
              >
                State* :
              </label>
              <Select
                name="stateName"
                // options={allstates}
                isSearchable={true}
                // value={state}
                placeholder="Select State"
                // onChange={(e) => onStateChange(e)}
                theme={(theme) => ({
                  ...theme,
                  height: 26,
                  minHeight: 26,
                  borderRadius: 1,
                  colors: {
                    ...theme.colors,
                    primary: "black",
                  },
                })}
              />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <label
                className="label-control"
                // style={DistrictErrorStyle}
              >
                District* :
              </label>
              <Select
                name="districtName"
                // options={alldistrict}
                isSearchable={true}
                //  value={district}
                placeholder="Select District"
                // onChange={(e) => ondistrictChange(e)}
                theme={(theme) => ({
                  ...theme,
                  height: 26,
                  minHeight: 26,
                  borderRadius: 1,
                  colors: {
                    ...theme.colors,
                    primary: "black",
                  },
                })}
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
                type="number"
                name="sctStaffPhoneNumber"
                value={sctStaffPhoneNumber}
                className="form-control"
                onChange={(e) => onInputChange(e)}
                style={{ marginLeft: "-6em", width: "22vh" }}
                onKeyDown={(e) =>
                  (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
                }
              />
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <label className="label-control">Designation :</label>
              <input
                type="text"
                name="sctStaffDesignation"
                value={sctStaffDesignation}
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
                value="Add"
                className="btn sub_form btn_continue blackbrd Save float-right"
              />
            )}
          </div>
        </div>
      </form>
    </Fragment>
  );
};

EditSctContact.propTypes = {
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
})(EditSctContact);
