import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { editSctProject } from "../../actions/sct";
const EditSctProjects = ({
  auth: { isAuthenticated, user, users, loading },
  allSctProjectdata,
  onEditModalChange,
  editSctProject,
}) => {
  //formData
  const [formData, setFormData] = useState({
    sctProjectName:
      allSctProjectdata && allSctProjectdata.sctProjectName
        ? allSctProjectdata.sctProjectName
        : "",

    sctProjectDesc:
      allSctProjectdata && allSctProjectdata.sctProjectDesc
        ? allSctProjectdata.sctProjectDesc
        : "",

    isSubmitted: false,
  });

  const { sctProjectName, sctProjectDesc } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [startprojectDate, setprojectDate] = useState(
    allSctProjectdata && allSctProjectdata.sctProjectDate
      ? allSctProjectdata.sctProjectDate
      : ""
  );
  const onDateChange = (e) => {
    setprojectDate(e.target.value);
  };

  //Required Validation ends
  const onSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      recordId: allSctProjectdata ? allSctProjectdata._id : "",
      sctProjectName:
        sctProjectName.charAt(0).toUpperCase() + sctProjectName.slice(1),
      sctProjectDesc: sctProjectDesc?.trim(),
      sctProjectDate: startprojectDate,
      sctProjectEditedById: user._id,
    };

    editSctProject(finalData);
    onEditModalChange(true);
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="col-lg-6 col-md-12 col-sm-12 col-12">
            <label className="label-control"> Project Name * :</label>
            <input
              type="text"
              name="sctProjectName"
              value={sctProjectName}
              className="form-control"
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>

          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <label className="label-control">Project Date* :</label>
            <br />
            <input
              type="date"
              placeholder="dd/mm/yyyy"
              className="form-control cpp-input datevalidation"
              name="projectDate"
              value={startprojectDate}
              onChange={(e) => onDateChange(e)}
              style={{
                width: "75%",
              }}
              required
            />
          </div>
          <div className="col-lg-11 col-md-12 col-sm-12 col-12">
            <label className="label-control"> Project Description :</label>

            <textarea
              name="sctProjectDesc"
              id="sctProjectDesc"
              className="textarea form-control"
              rows="3"
              placeholder="Client Address"
              style={{ width: "100%" }}
              value={sctProjectDesc}
              onChange={(e) => onInputChange(e)}
            ></textarea>
          </div>
        </div>

        <div className="col-md-12 col-lg-12 col-sm-12 col-12 text-left">
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
      </form>
    </Fragment>
  );
};

EditSctProjects.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { editSctProject })(EditSctProjects);
