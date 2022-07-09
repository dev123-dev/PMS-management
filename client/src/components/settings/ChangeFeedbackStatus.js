import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import Spinner from "../layout/Spinner";
import { deactiveProjectStatus } from "../../actions/projects";
import { EditFeedbackStatusData } from "../../actions/settings";

const ChangeFeedbackStatus = ({
  auth: { isAuthenticated, user, users, loading },
  feedbackData1,
  onStatusModalChange,
  EditFeedbackStatusData,
}) => {
  const [formData, setFormData] = useState({
    projectStatusType:
      feedbackData1 && feedbackData1.projectStatusType
        ? feedbackData1.projectStatusType
        : "",
    projectStatusCategory:
      feedbackData1 && feedbackData1.projectStatusCategory
        ? feedbackData1.projectStatusCategory
        : "",
    projectStatusDeactiveReason: "",
    isSubmitted: false,
  });

  const { projectStatusType, projectStatusCategory, feedbackStatusNotes } =
    formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const finalData = {
      recordId: feedbackData1.recordId,
      feedbackStatus: feedbackData1.feedbackStatus,
      feedbackStatusNotes: feedbackStatusNotes,
      feedbackEditedById: user._id,
    };

    EditFeedbackStatusData(finalData);
    onStatusModalChange(true);
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <label className="label-control">Notes* : </label>

            <textarea
              name="feedbackStatusNotes"
              id="feedbackStatusNotes"
              className="textarea form-control"
              rows="3"
              placeholder="Project Status Deactive Reason"
              style={{ width: "100%" }}
              value={feedbackStatusNotes}
              onChange={(e) => onInputChange(e)}
              required
            ></textarea>
          </div>
        </div>

        <div className="col-md-12 col-lg-12 col-sm-12 col-12 text-left">
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
              name="Submit"
              value="Submit"
              className="btn sub_form btn_continue Save float-right"
            />
          )}
        </div>
      </form>
    </Fragment>
  );
};

ChangeFeedbackStatus.propTypes = {
  auth: PropTypes.object.isRequired,
  deactiveProjectStatus: PropTypes.func.isRequired,
  EditFeedbackStatusData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  deactiveProjectStatus,
  EditFeedbackStatusData,
})(ChangeFeedbackStatus);
