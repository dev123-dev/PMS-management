import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { AddPaymentMode } from "../../actions/settings";
const ChangeProjectLifeCycle = ({
  auth: { isAuthenticated, user, users, loading },
  AddPaymentMode,
}) => {
  //formData
  const [formData, setFormData] = useState({
    Instructions: "",
    isSubmitted: false,
  });

  const { Instructions } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // if (checkErrors()) {
    const finalData = {
      Instructions: Instructions,
    };
    console.log(finalData);
    // AddPaymentMode(finalData);
    setFormData({
      ...formData,
      Instructions: "",
      isSubmitted: true,
    });
    // }
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      {" "}
      <div className="container container_align">
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="row col-lg-12 col-md-11 col-sm-12 col-12 ">
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <label className="label-control">Update Notes:</label>
              <textarea
                name="Instructions"
                id="Instructions"
                className="textarea form-control"
                rows="3"
                placeholder="Instructions"
                style={{ width: "100%" }}
                value={Instructions}
                onChange={(e) => onInputChange(e)}
                required
              ></textarea>
            </div>
          </div>

          <div
            className="row col-lg-12 col-md-11 col-sm-12 col-12 Savebutton no_padding"
            size="lg"
          >
            <div className="col-lg-8 col-md-6 col-sm-12 col-12">
              <label className="label-control colorRed">
                * Indicates mandatory fields,
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
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

ChangeProjectLifeCycle.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { AddPaymentMode })(
  ChangeProjectLifeCycle
);
