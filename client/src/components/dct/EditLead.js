import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import { Link, Redirect } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { getActiveCountry } from "../../actions/regions";

const EditLead = ({
  auth: { isAuthenticated, user, users, loading },
  regions: { activeCountry },
  alleditLeaddata,
  getActiveCountry,
}) => {
  useEffect(() => {
    getActiveCountry();
  }, [getActiveCountry]);
  // console.log("alleditLeaddata", alleditLeaddata);

  //formData
  const [formData, setFormData] = useState({
    companyName:
      alleditLeaddata && alleditLeaddata.companyName
        ? alleditLeaddata.companyName
        : "",
    clientName:
      alleditLeaddata && alleditLeaddata.clientName
        ? alleditLeaddata.clientName
        : "",
    website:
      alleditLeaddata && alleditLeaddata.website ? alleditLeaddata.website : "",
    emailId:
      alleditLeaddata && alleditLeaddata.emailId ? alleditLeaddata.emailId : "",
    phone1:
      alleditLeaddata && alleditLeaddata.phone1 ? alleditLeaddata.phone1 : "",
    phone2:
      alleditLeaddata && alleditLeaddata.phone2 ? alleditLeaddata.phone2 : "",
    dctLeadAddress:
      alleditLeaddata && alleditLeaddata.dctLeadAddress
        ? alleditLeaddata.dctLeadAddress
        : "",
    importantPoints:
      alleditLeaddata && alleditLeaddata.importantPoints
        ? alleditLeaddata.importantPoints
        : "",

    isSubmitted: false,
  });

  const {
    companyName,
    website,
    emailId,
    phone1,
    clientName,
    phone2,
    dctLeadAddress,
    importantPoints,
    isSubmitted,
  } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const allcountry = [];
  activeCountry &&
    activeCountry.map((country) =>
      allcountry.push({
        countryId: country._id,
        label: country.countryName,
        value: country.countryName,
      })
    );

  const [country, getcountryData] = useState(
    alleditLeaddata
      ? allcountry.length !== 0
        ? allcountry &&
          allcountry.filter((x) => x.countryId === alleditLeaddata.countryId)[0]
        : ""
      : ""
  );
  const [countryId, setcountryID] = useState(alleditLeaddata.countryId);

  const oncountryChange = (e) => {
    var countryId = "";
    getcountryData(e);
    countryId = e.countryId;
    setcountryID(countryId);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    // if (checkErrors()) {
    const finalData = {
      recordId: alleditLeaddata ? alleditLeaddata._id : "",
      companyName: companyName,
      emailId: emailId,
      website: website,
      dctLeadAddress: dctLeadAddress,
      phone1: phone1,
      clientName: clientName,
      phone2: phone2,
      importantPoints: importantPoints,
      countryId: countryId,
      dctLeadEditedById: user._id,
    };
    console.log(finalData);
    // addProject(finalData);
    //   setFormData({
    //     ...formData,

    //     isSubmitted: true,
    //   });
    // }
  };
  if (isSubmitted) {
    return <Redirect to="/job-queue" />;
  }
  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align">
        <form className="row" onSubmit={(e) => onSubmit(e)}>
          <section className="sub_reg">
            <div className="row col-lg-12 col-md-11 col-sm-12 col-12 ">
              <div className="col-lg-12 col-md-12 col-sm-12 col-12 ">
                <div className="row card-new ">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <h5>Company Info</h5>
                  </div>

                  <div className="col-lg-3 col-md-11 col-sm-12 col-12 ">
                    <label className="label-control">Company Name* :</label>
                    <input
                      type="text"
                      name="companyName"
                      value={companyName}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                      required
                    />
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                    <label className="label-control">Website Name* :</label>
                    <input
                      type="text"
                      name="website"
                      value={website}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                      required
                    />
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                    <label className="label-control">Email Id :</label>
                    <input
                      type="text"
                      name="emailId"
                      value={emailId}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                      required
                    />
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                    <label className="label-control">Phone 1 :</label>
                    <input
                      type="text"
                      name="phone1"
                      value={phone1}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                      required
                    />
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                    <label className="label-control">Phone 2 :</label>
                    <input
                      type="text"
                      name="phone2"
                      value={phone2}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                      required
                    />
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                    <label className="label-control">Client Name:</label>
                    <input
                      type="text"
                      name="clientName"
                      value={clientName}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                    <label className="label-control">Region :</label>
                    <Select
                      name="countryName"
                      options={allcountry}
                      isSearchable={true}
                      value={country}
                      placeholder="Select Region"
                      onChange={(e) => oncountryChange(e)}
                    />
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                    <label className="label-control">Important Points :</label>
                    <input
                      type="text"
                      name="importantPoints"
                      value={importantPoints}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                      required
                    />
                  </div>
                  <div className="row col-lg-12 col-md-6 col-sm-6 col-12">
                    <div className="col-lg-1 col-md-6 col-sm-6 col-12">
                      <label className="label-control">Services :</label>
                    </div>
                    <div className="col-lg-1 col-md-6 col-sm-6 col-12">
                      <label className="label-control">Imaging</label>
                      <input
                        type="checkbox"
                        id="Unconfirmed"
                        // onChange={handleOnChange}
                      />
                    </div>
                    <div className="col-lg-1 col-md-6 col-sm-6 col-12">
                      <label className="label-control">CGI</label>
                      <input
                        type="checkbox"
                        id="Unconfirmed"
                        // onChange={handleOnChange}
                      />
                    </div>
                    <div className="col-lg-1 col-md-6 col-sm-6 col-12">
                      <label className="label-control">Video Editing</label>
                      <input
                        type="checkbox"
                        id="Unconfirmed"
                        // onChange={handleOnChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12 py-2">
                    <label className="label-control">Address :</label>

                    <textarea
                      name="dctLeadAddress"
                      on
                      id="dctLeadAddress"
                      className="textarea form-control"
                      rows="3"
                      placeholder=" Address"
                      style={{ width: "100%" }}
                      value={dctLeadAddress}
                      onChange={(e) => onInputChange(e)}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="row col-lg-12 col-md-11 col-sm-12 col-12 Savebutton no_padding"
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
                  to="/job-queue"
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

EditLead.propTypes = {
  auth: PropTypes.object.isRequired,
  regions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  regions: state.regions,
});

export default connect(mapStateToProps, { getActiveCountry })(EditLead);
