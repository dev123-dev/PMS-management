import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Select from "react-select";

const ChangeProjectLifeCycle = ({
  auth: { isAuthenticated, user, users, loading },
  ProjectCycledata,
}) => {
  //formData
  const [formData, setFormData] = useState({
    Instructions: "",
    projectHour: "",
    projectMinutes: "",
    isSubmitted: false,
  });

  console.log(ProjectCycledata);
  const { Instructions, projectHour, projectMinutes } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onHourChange = (e) => {
    if (e.target.value < 13) {
      setFormData({
        ...formData,
        projectHour: e.target.value,
      });
    } else {
      setFormData({
        ...formData,
      });
    }
  };

  const onMinuteChange = (e) => {
    if (e.target.value < 60) {
      setFormData({
        ...formData,
        projectMinutes: e.target.value,
      });
    } else {
      setFormData({
        ...formData,
      });
    }
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
            <div className="col-lg-4 col-md-6 col-sm-6 col-12">
              <label className="label-control">Time :</label>

              <input
                type="number"
                name="projectHour"
                value={projectHour}
                min="1"
                max="12"
                className="form-control"
                onWheel={() => document.activeElement.blur()}
                onChange={(e) => onHourChange(e)}
                onKeyDown={(e) =>
                  (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
                }
              />
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 col-12 py-4">
              <label className="label-control"></label>

              <input
                type="number"
                name="projectMinutes"
                value={projectMinutes}
                min="1"
                max="60"
                className="form-control"
                onWheel={() => document.activeElement.blur()}
                onChange={(e) => onMinuteChange(e)}
                onKeyDown={(e) =>
                  (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()
                }
              />
            </div>
            <div className="col-lg-11 col-md-6 col-sm-6 col-12">
              <label className="label-control">Update Notes:</label>
              <textarea
                name="Instructions"
                id="Instructions"
                className="textarea form-control"
                rows="5"
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

export default connect(mapStateToProps, {})(ChangeProjectLifeCycle);
