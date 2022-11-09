import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { deactiveTeamData } from "../../actions/settings";

const DeactiveTeam = ({
  auth: { isAuthenticated, user, users, loading },
  teamdeactivedata,
  onDeactiveModalChange,
  deactiveTeamData,
}) => {
  //formData
  const [formData, setFormData] = useState({
    teamName:
      teamdeactivedata && teamdeactivedata.teamName
        ? teamdeactivedata.teamName
        : "",
    teamDescription:
      teamdeactivedata && teamdeactivedata.teamDescription
        ? teamdeactivedata.teamDescription
        : "",

    isSubmitted: false,
  });

  const { teamName, teamDescription, teamDeactiveReason } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      recordId: teamdeactivedata ? teamdeactivedata._id : "",
      teamDeactiveReason: teamDeactiveReason?.trim(),
      teamDeactiveById: user._id,
      teamDeactiveByName: user.fullName,
      teamDeactiveDateTime: new Date().toLocaleString("en-GB"),
    };
    deactiveTeamData(finalData);
    onDeactiveModalChange(true);
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <label className="label-control"> Team Name : {teamName}</label>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <label className="label-control">
              Designation Description : {teamDescription}
            </label>
          </div>

          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <label className="label-control">Deactive Reason* :</label>

            <textarea
              name="teamDeactiveReason"
              id="teamDeactiveReason"
              className="textarea form-control"
              rows="3"
              placeholder="Deactive Reason"
              style={{ width: "100%" }}
              value={teamDeactiveReason}
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

DeactiveTeam.propTypes = {
  auth: PropTypes.object.isRequired,
  deactiveTeamData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deactiveTeamData })(DeactiveTeam);
