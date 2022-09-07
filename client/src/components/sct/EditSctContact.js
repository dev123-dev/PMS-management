import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Select from "react-select";
import {
  editSctStaffDetails,
  // editSctClientStaffDetails,
} from "../../actions/sct";
import {
  getActiveCountry,
  getActiveState,
  getActiveDistricts,
} from "../../actions/regions";

const EditSctContact = ({
  auth: { isAuthenticated, user, users, loading },
  allStaffdata,
  getActiveCountry,
  getActiveState,
  getActiveDistricts,
  regions: { activeCountry, activeState, activeDistricts },
  allleaddata,
  ondivcloseChange,
  onEditModalChange,
  editSctStaffDetails,
  // editSctClientStaffDetails,
  from,
  filterData,
}) => {
  //formData
  useEffect(() => {
    getActiveCountry({ countryBelongsTo: "SCT" });
  }, [getActiveCountry]);
  useEffect(() => {
    getActiveState();
  }, [getActiveState]);
  useEffect(() => {
    getActiveDistricts();
  }, [getActiveDistricts]);
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
            (x) => x.staffcountryId === allStaffdata.sctstaffRegionId
          )[0]
        : ""
      : ""
  );
  const [staffcountryId, setstaffcountryID] = useState(
    allStaffdata.sctstaffRegionId
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

  const allstaffstates = [];
  activeState.map((staffstate) =>
    allstaffstates.push({
      sId: staffstate._id,
      label: staffstate.stateName,
      value: staffstate.stateName,
    })
  );

  const [staffstate, getstaffStateData] = useState(
    allStaffdata
      ? allstaffstates.length !== 0
        ? allstaffstates &&
          allstaffstates.filter(
            (x) => x.sId === allStaffdata.sctstaffStateId
          )[0]
        : ""
      : ""
  );

  const [staffstateId, setstaffStateID] = useState("");
  const [staffstateName, setstaffStateName] = useState("");

  const onstaffStateChange = (e) => {
    getstaffdistrictData("");
    // //Required Validation starts
    // setError({
    //   ...error,
    //   StateIdChecker: true,
    //   StateErrorStyle: { color: "#000" },
    // });
    //Required Validation end

    var staffstateId = "";
    var staffstateName = "";
    getstaffStateData(e);

    staffstateId = e.sId;
    staffstateName = e.value;

    setstaffStateID(staffstateId);
    setstaffStateName(staffstateName);
    let stateVal = {
      staffstateId: staffstateId,
    };
    getActiveDistricts(stateVal);
  };

  const allstaffdistrict = [];

  activeDistricts.map((staffdistrict) =>
    allstaffdistrict.push({
      districtId: staffdistrict._id,
      label: staffdistrict.districtName,
      value: staffdistrict.districtName,
    })
  );

  const [staffdistrict, getstaffdistrictData] = useState(
    allStaffdata
      ? allstaffdistrict.length !== 0
        ? allstaffdistrict &&
          allstaffdistrict.filter(
            (x) => x.districtId === allStaffdata.sctstaffDistrictId
          )[0]
        : ""
      : ""
  );
  const [staffdistrictId, setstaffdistrictID] = useState();
  const [staffdistrictName, setstaffdistrictName] = useState();

  const onstaffdistrictChange = (e) => {
    // setError({
    //   ...error,
    //   DistrictIdChecker: true,
    //   DistrictErrorStyle: { color: "#000" },
    // });

    var staffdistrictId = "";
    var staffdistrictName = "";
    getstaffdistrictData(e);

    staffdistrictId = e.districtId;
    staffdistrictName = e.value;

    setstaffdistrictID(staffdistrictId);
    setstaffdistrictName(staffdistrictName);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      sctStaffId: allStaffdata ? allStaffdata._id : "",
      sctStaffName: sctStaffName,
      sctStaffPhoneNumber: sctStaffPhoneNumber,
      sctStaffEmailId: sctStaffEmailId,
      sctstaffRegion: staffcountryname,
      sctstaffRegionId: staffcountryId,
      sctstaffCountryCode: staffCountryCode,
      sctstaffStateId: staffstateId,
      sctstaffDistrictId: staffdistrictId,
      // filterData: filterData,
    };

    if (from === "client") {
      // editSctClientStaffDetails(finalData);
    } else {
      editSctStaffDetails(finalData);
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
                options={allstaffstates}
                isSearchable={true}
                value={staffstate}
                placeholder="Select State"
                onChange={(e) => onstaffStateChange(e)}
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
                options={allstaffdistrict}
                isSearchable={true}
                value={staffdistrict}
                placeholder="Select District"
                onChange={(e) => onstaffdistrictChange(e)}
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
  editSctStaffDetails,
  getActiveCountry,
  // editSctClientStaffDetails,
  getActiveState,
  getActiveDistricts,
})(EditSctContact);
