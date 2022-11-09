import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { AddNewTeam } from "../../actions/settings";
import Spinner from "../layout/Spinner";

const AddTeam = ({
  auth: { isAuthenticated, user, users, loading },
  onAddModalChange,
  AddNewTeam,
}) => {
  //formData
  const [formData, setFormData] = useState({
    teamName: "",
    teamDescription: "",
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
      teamName: teamName?.trim(),
      teamDescription: teamDescription?.trim(),
      teamEnteredById: user._id,
      teamEnteredByName: user.empFullName,
      teamEnteredDateTime: new Date().toLocaleString("en-GB"),
    };
    AddNewTeam(finalData);
    onAddModalChange(true);
  };

  return !isAuthenticated || !user || !users ? (
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

AddTeam.propTypes = {
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  AddNewTeam: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  settings: state.settings,
});

export default connect(mapStateToProps, { AddNewTeam })(AddTeam);
