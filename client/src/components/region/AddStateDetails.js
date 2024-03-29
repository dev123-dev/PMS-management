import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addStateDetails } from "../../actions/regions";
import Spinner from "../layout/Spinner";

const AddStateDetails = ({
  savedMessage,
  auth: { isAuthenticated, user, users, loading },
  addStateDetails,
  onAddModalChange,
}) => {
  //formData
  const [formData, setFormData] = useState({
    stateName: "",
    isSubmitted: false,
  });
  const { stateName } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      stateName: stateName.charAt(0).toUpperCase() + stateName.slice(1),
      stateEnteredById: user._id,
      stateEnteredByName: user.userName,
      stateBelongsTo: "SCT",
    };

    addStateDetails(finalData);
    onAddModalChange(true);
    setFormData({
      ...formData,
      stateName: "",
      isSubmitted: true,
    });
  };

  return !isAuthenticated || !user  ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align">
        <form className="row" onSubmit={(e) => onSubmit(e)} autoComplete="off">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
              <label className="label-control"> State Name * :</label>
              <input
                type="text"
                name="stateName"
                value={stateName}
                className="form-control"
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            {/* <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                <label className="label-control"> State Code * :</label>
                <input
                  type="Number"
                  name="stateName"
                  value={stateName}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  onKeyDown={(e) =>
                    (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
                  }
                />
              </div> */}
          </div>

          <div className="col-md-10 col-lg-12 col-sm-12 col-12 text-left">
            {loading ? (
              <button
                className="btn sub_form btn_continue Save float-right"
                disabled
              >
                Loading...
              </button>
            ) : (
              <input
                type="submit"
                name="Save"
                value="Submit"
                className="btn sub_form btn_continue Save float-right"
              />
            )}
          </div>
        </form>
      </div>
    </Fragment>
  );
};

AddStateDetails.propTypes = {
  auth: PropTypes.object.isRequired,
  area: PropTypes.object.isRequired,
  addStateDetails: PropTypes.func.isRequired,
  savedMessage: PropTypes.string,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  area: state.area,
  savedMessage: state.auth.savedMessage,
});

export default connect(mapStateToProps, {
  addStateDetails,
})(AddStateDetails);
