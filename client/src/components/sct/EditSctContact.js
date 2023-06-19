import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Select from "react-select";
import {
  editSctStaffDetails,
  editSctClientStaffDetails,
} from "../../actions/sct";
import {
  getActiveCountry,
  getActiveState,
  // getActiveDistricts,
} from "../../actions/regions";

const EditSctContact = ({
  auth: { isAuthenticated, user, users, loading },
  allStaffdata,
  getActiveCountry,
  getActiveState,
  // getActiveDistricts,
  regions: { activeCountry, activeState, activeDistricts },
  allleaddata,
  ondivcloseChange,
  onEditModalChange,
  editSctStaffDetails,
  editSctClientStaffDetails,
  from,
  filterData,
  staffFilter,
  page,
}) => {
  //formData
  useEffect(() => {
    getActiveCountry({ countryBelongsTo: "SCT" });
  }, [getActiveCountry]);
  useEffect(() => {
    getActiveState();
  }, [getActiveState]);
  // useEffect(() => {
  //   getActiveDistricts({
  //     stateId: allStaffdata.sctStaffStateId ? allStaffdata.sctStaffStateId : "",
  //   });
  // }, [getActiveDistricts]);
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
            (x) => x.staffcountryId === allStaffdata.sctStaffRegionId
          )[0]
        : ""
      : ""
  );
  const [staffcountryId, setstaffcountryID] = useState(
    allStaffdata && allStaffdata.sctStaffRegionId
  );
  const [staffCountryCode, setstaffCountryCode] = useState(
    allStaffdata && allStaffdata.sctStaffCountryCode
  );
  const [staffcountryname, setstaffcountryname] = useState(
    allStaffdata && allStaffdata.sctStaffRegion
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
            (x) => x.sId === allStaffdata.sctStaffStateId
          )[0]
        : ""
      : ""
  );

  const [staffstateId, setstaffStateID] = useState(
    allStaffdata && allStaffdata.sctStaffStateId
  );

  const onstaffStateChange = (e) => {
    //  getstaffdistrictData("");
    var staffstateId = "";
    getstaffStateData(e);
    staffstateId = e.sId;
    setstaffStateID(staffstateId);
    let stateVal = {
      staffstateId: staffstateId,
    };
    //  getActiveDistricts(stateVal);
  };

  // const [staffdistrict, getstaffdistrictData] = useState();
  // const [staffdistrictId, setstaffdistrictID] = useState(
  //   allStaffdata.sctStaffDistrictId ? allStaffdata.sctStaffDistrictId : null
  // );

  // const allstaffdistrict = [];
  // activeDistricts.map((staffdistrict) =>
  //   allstaffdistrict.push({
  //     districtId: staffdistrict._id,
  //     label: staffdistrict.districtName,
  //     value: staffdistrict.districtName,
  //   })
  // );
  // if (activeDistricts && !staffdistrict && allstaffdistrict.length > 0) {
  //   getstaffdistrictData(
  //     allstaffdistrict.length !== 0
  //       ? allstaffdistrict &&
  //           allstaffdistrict.filter(
  //             (x) => x.districtId === allStaffdata.sctStaffDistrictId
  //           )[0]
  //       : ""
  //   );
  // }

  // const onstaffdistrictChange = (e) => {
  //   var staffdistrictId = "";
  //   getstaffdistrictData(e);
  //   staffdistrictId = e.districtId;
  //   setstaffdistrictID(staffdistrictId);
  // };

  const onSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      sctStaffId: allStaffdata ? allStaffdata._id : "",
      sctStaffName:
        sctStaffName.charAt(0).toUpperCase() + sctStaffName.slice(1),
      sctStaffPhoneNumber: sctStaffPhoneNumber,
      sctStaffEmailId: sctStaffEmailId?.trim(),
      sctStaffDesignation: sctStaffDesignation?.trim(),
      sctStaffRegion: staffcountryname,
      sctStaffRegionId: staffcountryId,
      sctStaffCountryCode: staffCountryCode,
      sctStaffStateId: staffstateId,
      //  sctStaffDistrictId: staffdistrictId,
      filterData: filterData,
      staffFilter: staffFilter,
      page: page,
    };

    if (from === "client") {
      editSctClientStaffDetails(finalData);
    } else {
      editSctStaffDetails(finalData);
    }
    onEditModalChange(true);
    // ondivcloseChange(true);
  };

  return !isAuthenticated || !user  ? (
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
            {/* <div className="col-lg-6 col-md-6 col-sm-6 col-12">
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
            </div> */}
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <label className="label-control">Staff Phone:</label>
              <input
                type="number"
                name="staffCountryCode"
                value={staffCountryCode}
                className="form-control"
                maxLength="12"
                minLength={10}
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
                value="Edit"
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
  editSctClientStaffDetails,
  getActiveState,
  // getActiveDistricts,
})(EditSctContact);
