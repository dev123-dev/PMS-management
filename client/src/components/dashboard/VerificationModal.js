import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { VerifyProject } from "../../actions/projects";
import { Link } from "react-router-dom";
const VerificationModal = ({
  auth: { isAuthenticated, user, users, loading },
  allVerifydata,
  onDeactiveModalChange,
  onEditModalChange,
  VerifyProject,
  loggedStaff,
  searchData,
}) => {
  //formData

  const [formData, setFormData] = useState({
    projectName:
      allVerifydata && allVerifydata.projectName
        ? allVerifydata.projectName
        : "",
    clientName:
      allVerifydata && allVerifydata.projectName
        ? allVerifydata.clientName
        : "",
    clientFolderName:
      allVerifydata && allVerifydata.projectName
        ? allVerifydata.clientFolderName
        : "",

    isSubmitted: false,
  });

  const { projectName, clientName, clientFolderName } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      recordId: allVerifydata ? allVerifydata._id : "",
      projectVerifiedById: user._id,
      searchData: searchData,
    };

    VerifyProject(finalData);
    onEditModalChange(true);
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="col-lg-8 col-md-12 col-sm-12 col-12">
            <label className="label-control">
              Project Name : {projectName}
            </label>
          </div>
          <div className="col-lg-8 col-md-12 col-sm-12 col-12">
            <label className="label-control">Client Name : {clientName}</label>
          </div>
          <div className="col-lg-8 col-md-12 col-sm-12 col-12">
            <label className="label-control">
              Folder Name : {clientFolderName}
            </label>
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
            <>
              <label className="label-control colorRed">
                Are you sure you want Verify the Project?
              </label>
              <br />
              <input
                type="submit"
                name="Submit"
                value="Submit"
                className="btn sub_form btn_continue blackbrd Save float-right"
              />
              <Link
                to="#"
                className="btn sub_form btn_continue blackbrd float-right"
                onClick={() => onEditModalChange(true)}
              >
                Cancel
              </Link>
            </>
          )}
        </div>
      </form>
    </Fragment>
  );
};

VerificationModal.propTypes = {
  auth: PropTypes.object.isRequired,
  VerifyProject: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  VerifyProject,
})(VerificationModal);
