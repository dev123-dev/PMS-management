import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editDepartment } from "../../actions/settings";

import Spinner from "../layout/Spinner";

const JobNotes = ({
  auth: { isAuthenticated, user, users, loading },
  allnotesdata,
  onnotesModalChange,
}) => {
  console.log(allnotesdata);
  //formData
  const [formData, setFormData] = useState({
    projectNotes:
      allnotesdata && allnotesdata.projectNotes
        ? allnotesdata.projectNotes
        : "",

    isSubmitted: false,
  });

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className=" col-lg-12 col-md-12 col-sm-12 col-12">
        <textarea
          className="textarea form-control"
          rows="10"
          placeholder="Client Address"
          style={{ width: "100%" }}
          readOnly
        >
          {allnotesdata.projectNotes}
        </textarea>
      </div>
    </Fragment>
  );
};

JobNotes.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(JobNotes);
