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
        <div className="col-lg-4 col-md-12 col-sm-12 col-12 ">
          <strong>
            <label>Status</label>
          </strong>
        </div>
        <div className="col-lg-8 col-md-11 col-sm-10 col-10 ">
          <Select
            name="projectStatusCategory"
            // options={StatusCategory}
            isSearchable={true}
            // value={projectStatusCategory}
            placeholder="Select"
            // onChange={(e) => onStatuscatChange(e)}
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
      </form>
    </Fragment>
  );
};

AllStatuschange.propTypes = {
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
})(AllStatuschange);
