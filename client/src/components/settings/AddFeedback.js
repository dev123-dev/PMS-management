import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { AddFeedbackData } from "../../actions/settings";
import Select from "react-select";
const AddFeedback = ({
  auth: { isAuthenticated, user, users, loading },
  AddFeedbackData,
  onAddFeedbackModalChange,
}) => {
  //formData

  const ChangesCategory = [
    { value: "Design Level", label: "Design Level" },
    { value: "Work Level", label: "Work Level" },
  ];

  const priorityCategory = [
    { value: "Normal", label: "Normal" },
    { value: "Critical", label: "Critical" },
  ];

  const feedbackBelongs = [
    { value: "JT", label: "JT" },
    { value: "DCT", label: "DCT" },
    { value: "SCT", label: "SCT" },
    { value: "Billing", label: "Billing" },
  ];
  const [formData, setFormData] = useState({
    feedbackProblem: "",
    feedbackCategory: "",
    feedbackpriority: "",
    feedbackBelongsTo: feedbackBelongs[0],

    feedbacknotes: "",
    isSubmitted: false,
  });

  const {
    feedbackProblem,
    feedbackCategory,
    feedbackpriority,
    feedbackBelongsTo,
    feedbacknotes,
  } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Required Validation Starts
  const [error, setError] = useState({
    priorityIdChecker: false,
    feedbackpriorityIdErrorStyle: {},
    changestypeIdChecker: false,

    changestypeIdErrorStyle: {},
    // feedbackBelongsToIdChecker: false,
    // feedbackBelongsToIdErrorStyle: {},
  });
  const {
    priorityIdChecker,
    feedbackpriorityIdErrorStyle,
    changestypeIdChecker,
    changestypeIdErrorStyle,
    // feedbackBelongsToIdChecker,
    // feedbackBelongsToIdErrorStyle,
  } = error;

  const checkErrors = () => {
    if (!changestypeIdChecker) {
      setError({
        ...error,
        changestypeIdErrorStyle: { color: "#F00" },
      });
      return false;
    }
    if (!priorityIdChecker) {
      setError({
        ...error,
        feedbackpriorityIdErrorStyle: { color: "#F00" },
      });
      return false;
    }

    // if (!feedbackBelongsToIdChecker) {
    //   setError({
    //     ...error,
    //     feedbackBelongsToIdErrorStyle: { color: "#F00" },
    //   });
    //   return false;
    // }

    return true;
  };
  const onStatuscatChange = (e) => {
    //  Required Validation starts
    setError({
      ...error,
      changestypeIdChecker: true,
      changestypeIdErrorStyle: { color: "#000" },
    });
    // Required Validation ends
    if (e) {
      setFormData({
        ...formData,
        feedbackCategory: e,
      });
    }
  };
  const onfeedbackpriorityChange = (e) => {
    //Required Validation starts
    setError({
      ...error,
      priorityIdChecker: true,
      feedbackpriorityIdErrorStyle: { color: "#000" },
    });
    //Required Validation ends
    if (e) {
      setFormData({
        ...formData,
        feedbackpriority: e,
      });
    }
  };

  const onfeedbackBelongsChange = (e) => {
    //Required Validation starts
    // setError({
    //   ...error,
    //   feedbackBelongsToIdChecker: true,
    //   feedbackBelongsToIdErrorStyle: { color: "#000" },
    // });
    //Required Validation ends
    if (e) {
      setFormData({
        ...formData,
        feedbackBelongsTo: e,
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (checkErrors()) {
      const finalData = {
        feedbackProblem: feedbackProblem,
        feedbackCategory: feedbackCategory.value,
        feedbackPriority: feedbackpriority.value,
        feedbackBelongsTo: feedbackBelongsTo.value,
        feedbackNotes: feedbacknotes,
        feedbackStatus: "Pending",
        feedbackEnteredById: user._id,
        feedbackEnteredByName: user.empFullName,
        feedbackEnteredDate: new Date().toISOString().split("T")[0],
      };

      AddFeedbackData(finalData);

      onAddFeedbackModalChange(true);
    }
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      {" "}
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="row col-lg-12 col-md-11 col-sm-12 col-12 ">
          <div className="col-lg-12 col-md-6 col-sm-6 col-12">
            <label className="label-control">Problem* :</label>
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
            <label className="label-control" style={changestypeIdErrorStyle}>
              Changes In* :
            </label>
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
            <label
              className="label-control"
              style={feedbackpriorityIdErrorStyle}
            >
              Priority* :
            </label>
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
            <label
              className="label-control"
              // style={feedbackBelongsToIdErrorStyle}
            >
              Feedback Belongs To* :
            </label>
            <Select
              name="feedbackBelongsTo"
              options={feedbackBelongs}
              isSearchable={true}
              value={feedbackBelongsTo}
              placeholder="Select"
              onChange={(e) => onfeedbackBelongsChange(e)}
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
              name="feedbacknotes"
              id="feedbacknotes"
              className="textarea form-control"
              rows="4"
              placeholder="Notes"
              style={{ width: "100%" }}
              value={feedbacknotes}
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
                value="Submit"
                className="btn sub_form btn_continue blackbrd Save float-right"
              />
            )}
          </div>
        </div>
      </form>
    </Fragment>
  );
};

AddFeedback.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { AddFeedbackData })(AddFeedback);
