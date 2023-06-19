import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editTeam } from "../../actions/settings";
import Spinner from "../layout/Spinner";

const EditTeam = ({
  auth: { isAuthenticated, user, users, loading },
  onEditModalChange,
  allTeamsdata,
  editTeam,
}) => {
  //formData
  const [formData, setFormData] = useState({
    teamName:
      allTeamsdata && allTeamsdata.teamName ? allTeamsdata.teamName : "",
    teamDescription:
      allTeamsdata && allTeamsdata.teamDescription
        ? allTeamsdata.teamDescription
        : "",

    isSubmitted: false,
  });

  const { teamName, teamDescription } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Required Validation ends
  const onSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      recordId: allTeamsdata ? allTeamsdata._id : "",
      teamName: teamName?.trim(),
      teamDescription: teamDescription?.trim(),
      teamEditedById: user._id,
      teamEditedByName: user.empFullName,
      teamEditedDateTime: new Date().toLocaleString("en-GB"),
    };
    editTeam(finalData);
    onEditModalChange(true);
  };

  return !isAuthenticated || !user  ? (
    <Spinner />
  ) : (
    <Fragment>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="col-lg-8 col-md-12 col-sm-12 col-12">
            <label className="label-control"> Team Name * :</label>
            <input
              type="text"
              name="teamName"
              value={teamName}
              className="form-control"
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <label className="label-control"> Description :</label>
            <textarea
              name="teamDescription"
              id="teamDescription"
              className="textarea form-control"
              rows="3"
              placeholder="Team Description"
              style={{ width: "100%" }}
              value={teamDescription}
              onChange={(e) => onInputChange(e)}
            ></textarea>
          </div>
        </div>

        <div className="col-md-12 col-lg-12 col-sm-12 col-12 ">
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
              value="Update"
              className="btn sub_form btn_continue Save float-right"
            />
          )}
        </div>
      </form>
    </Fragment>
  );
};

EditTeam.propTypes = {
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  editTeam: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  settings: state.settings,
});

export default connect(mapStateToProps, { editTeam })(EditTeam);
