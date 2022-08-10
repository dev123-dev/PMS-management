import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { AddState } from "../../actions/area";
import Spinner from "../layout/Spinner";
import Select from "react-select";
const AllStatuschange = ({
  auth: { isAuthenticated, user, users, loading },
  //   AddState,
}) => {
  //formData
  const [formData, setFormData] = useState({
    clientType: "",
    countryName: "",
    countryCode: "",
    isSubmitted: false,
  });
  const { countryName, clientType } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      Notes: countryName,

      countryEnteredById: user._id,
      countryEnteredByName: user.userName,
    };
    console.log(finalData);
    // AddState(finalData);
    setFormData({
      ...formData,
      countryName: "",
      countryCode: "",
      isSubmitted: true,
    });
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <form className="row" onSubmit={(e) => onSubmit(e)}>
        <div className="row col-lg-12 col-md-11 col-sm-10 col-10 ">
          <div className="col-lg-6 col-md-11 col-sm-10 col-10 ">
            <label className="label-control"> Status :</label>
            <Select
              name="clientType"
              isSearchable={true}
              //  options={clientTypeVal}
              value={clientType}
              placeholder="Select"
              //   onChange={(e) => onClientTypeChange(e)}
            />
          </div>
          <div className=" col-lg-4 col-md-11 col-sm-10 col-10 ">
            <label className="label-control"> CallBack Date :</label>
            <input
              type="date"
              placeholder="dd/mm/yyyy"
              className="form-control cpp-input datevalidation"
              name="todate"
              //    value={todate}
              //   onChange={(e) => onDateChange1(e)}
              style={{
                width: "110%",
              }}
              required
            />
          </div>
          <div className="col-lg-8 col-md-11 col-sm-10 col-10 mb-5">
            <label className="label-control"> Notes :</label>
            <textarea
              name="Notes"
              id="Notes"
              className="textarea form-control"
              rows="2"
              placeholder="Notes"
              style={{ width: "100%" }}
              //  value={Notes}
              onChange={(e) => onInputChange(e)}
            ></textarea>
          </div>

          <div className="col-lg-12 col-md-6 col-sm-12 col-12">
            <input
              type="submit"
              name="Submit"
              value="Submit"
              className="btn sub_form btn_continue blackbrd Save float-right"
            />
          </div>
        </div>
      </form>
    </Fragment>
  );
};

AllStatuschange.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(AllStatuschange);
