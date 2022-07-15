import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { EditFeedbackData } from "../../actions/settings";
import Select from "react-select";
const EditFeedback = ({
  auth: { isAuthenticated, user, users, loading },
  feedbackData,
  onEditModalChange,
  EditFeedbackData,
}) => {
  //formData
  const [formData, setFormData] = useState({
    feedbackProblem:
      feedbackData && feedbackData.feedbackProblem
        ? feedbackData.feedbackProblem
        : "",
    feedbackNotes:
      feedbackData && feedbackData.feedbackNotes
        ? feedbackData.feedbackNotes
        : "",

    feedbackCategory:
      feedbackData && feedbackData.feedbackCategory
        ? {
            value: feedbackData.feedbackCategory,
            label: feedbackData.feedbackCategory,
          }
        : "",
    feedbackPriority:
      feedbackData && feedbackData.feedbackPriority
        ? {
            value: feedbackData.feedbackPriority,
            label: feedbackData.feedbackPriority,
          }
        : "",
    feedbackStatus:
      feedbackData && feedbackData.feedbackStatus
        ? {
            value: feedbackData.feedbackStatus,
            label: feedbackData.feedbackStatus,
          }
        : "",

    isSubmitted: false,
  });

  const {
    feedbackProblem,
    feedbackCategory,
    feedbackPriority,
    feedbackNotes,
    feedbackStatus,
  } = formData;

  const ChangesCategory = [
    { value: "Design Level", label: "Design Level" },
    { value: "Work Level", label: "Work Level" },
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
        feedbackPriority: e,
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
      feedbackProblem: feedbackProblem,
      feedbackCategory: feedbackCategory.value,
      feedbackPriority: feedbackPriority.value,
      feedbackNotes: feedbackNotes,
      feedbackStatus: feedbackStatus.value,
      feedbackEditedById: user._id,
    };
    // console.log(finalData);
    EditFeedbackData(finalData);

    onEditModalChange(true);
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      {" "}
      <form onSubmit={(e) => onUpdate(e)}>
        <div className="row col-lg-12 col-md-11 col-sm-12 col-12 ">
          <div className="col-lg-12 col-md-6 col-sm-6 col-12">
            <label className="label-control">Problem*:</label>
            <input
              type="text"
              name="feedbackProblem"
              value={feedbackProblem}
              className="form-control"
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <label className="label-control">Changes In* :</label>
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
            <label className="label-control">Priority* :</label>
            <Select
              name="feedbackPriority"
              options={priorityCategory}
              isSearchable={true}
              value={feedbackPriority}
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
          <div className="col-lg-12 col-md-6 col-sm-6 col-12">
            <label className="label-control">Notes* :</label>
            <textarea
              name="feedbackNotes"
              id="feedbackNotes"
              className="textarea form-control"
              rows="4"
              placeholder="Notes"
              style={{ width: "100%" }}
              value={feedbackNotes}
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
              * Indicates mandatory fields
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
  EditFeedbackData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { EditFeedbackData })(EditFeedback);
