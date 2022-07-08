import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { EditPaymentMode } from "../../actions/settings";
import Select from "react-select";
const EditFeedback = ({
  auth: { isAuthenticated, user, users, loading },
  feedbackData,
  onEditModalChange,
  onAddDistrictModalChange,
  EditPaymentMode,
}) => {
  //formData
  const [formData, setFormData] = useState({
    problem: feedbackData && feedbackData.problem ? feedbackData.problem : "",
    feedbacknotes:
      feedbackData && feedbackData.feedbacknotes
        ? feedbackData.feedbacknotes
        : "",

    feedbackCategory:
      feedbackData && feedbackData.feedbackCategory
        ? {
            value: feedbackData.feedbackCategory,
            label: feedbackData.feedbackCategory,
          }
        : "",
    feedbackpriority:
      feedbackData && feedbackData.feedbackpriority
        ? {
            value: feedbackData.feedbackpriority,
            label: feedbackData.feedbackpriority,
          }
        : "",

    isSubmitted: false,
  });

  const { problem, feedbackCategory, feedbackpriority, feedbacknotes } =
    formData;

  const ChangesCategory = [
    { value: "Design Level", label: "Design Level" },
    { value: "Code Level", label: "Code Level" },
  ];

  const priorityCategory = [
    { value: "Normal", label: "Normal" },
    { value: "Critical", label: "Critical" },
  ];

  const onStatuscatChange = (e) => {
    if (e) {
      setFormData({
        ...formData,
        feedbackCategory: e,
      });
    }
  };
  const onfeedbackpriorityChange = (e) => {
    if (e) {
      setFormData({
        ...formData,
        feedbackpriority: e,
      });
    }
  };
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onUpdate = (e) => {
    e.preventDefault();
    // if (checkErrors()) {
    const finalData = {
      recordId: feedbackData ? feedbackData._id : "",
      problem: problem,
      feedbackCategory: feedbackCategory,
      feedbackpriority: feedbackpriority,
      feedbackEnteredById: user._id,
    };
    // console.log(finalData);
    EditPaymentMode(finalData);

    onEditModalChange(true);
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      {" "}
      <form onSubmit={(e) => onUpdate(e)}>
        <div className="row col-lg-12 col-md-11 col-sm-12 col-12 ">
          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <label className="label-control">Problem :</label>
            <input
              type="text"
              name="problem"
              value={problem}
              className="form-control"
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <label className="label-control">Changes In :</label>
            <Select
              name="feedbackCategory"
              options={ChangesCategory}
              isSearchable={true}
              value={feedbackCategory}
              placeholder="Select"
              onChange={(e) => onStatuscatChange(e)}
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
            <label className="label-control">Priority :</label>
            <Select
              name="feedbackpriority"
              options={priorityCategory}
              isSearchable={true}
              value={feedbackpriority}
              placeholder="Select"
              onChange={(e) => onfeedbackpriorityChange(e)}
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
            <label className="label-control">Notes :</label>
            <textarea
              name="feedbacknotes"
              id="feedbacknotes"
              className="textarea form-control"
              rows="3"
              placeholder="Notes"
              style={{ width: "100%" }}
              value={feedbacknotes}
              onChange={(e) => onInputChange(e)}
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
                value="Update"
                className="btn sub_form btn_continue blackbrd Save float-right"
              />
            )}
          </div>
        </div>
      </form>
    </Fragment>
  );
};

EditFeedback.propTypes = {
  auth: PropTypes.object.isRequired,
  EditPaymentMode: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { EditPaymentMode })(EditFeedback);
