import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { AddState } from "../../actions/area";
import Spinner from "../layout/Spinner";

const LastMessageDetails = ({
  auth: { isAuthenticated, user, users, loading },
  //   AddState,
}) => {
  //formData
  const [formData, setFormData] = useState({
    countryName: "",
    countryCode: "",
    isSubmitted: false,
  });
  const { countryName, countryCode } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      countryName: countryName,
      countryCode: countryCode,
      countryEnteredById: user._id,
      countryEnteredByName: user.userName,
      countryBelongsTo: "DCT",
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
      <form
        className="row col-lg-12 col-md-12 col-sm-12 col-12"
        onSubmit={(e) => onSubmit(e)}
        autoComplete="off"
      >
        <div className="col-lg-12 col-md-12 col-sm-12 col-12 ">
          {/* <strong>
            <label>Last Message Details</label>
          </strong> */}

          <h4>
            {" "}
            <b>Last Message Details </b>
          </h4>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-12 ">
          <input
            type="submit"
            name="submit"
            value="History"
            className="btn sub_form btn_continue  float-right"
          />
        </div>
      </form>
    </Fragment>
  );
};

LastMessageDetails.propTypes = {
  auth: PropTypes.object.isRequired,
  area: PropTypes.object.isRequired,
  //   AddState: PropTypes.func.isRequired,
  savedMessage: PropTypes.string,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  area: state.area,
  savedMessage: state.auth.savedMessage,
});

export default connect(mapStateToProps, {
  //   AddState,
})(LastMessageDetails);