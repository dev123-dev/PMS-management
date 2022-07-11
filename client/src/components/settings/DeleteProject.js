import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { deleteProjectData } from "../../actions/settings";
import { Link } from "react-router-dom";

const DeleteProject = ({
  auth: { isAuthenticated, user, users, loading },
  Projectdeletedata,
  onDeactiveModalChange,
  deleteProjectData,
}) => {
  //formData
  //console.log("data", Projectdeletedata);
  const [formData, setFormData] = useState({
    projectName:
      Projectdeletedata && Projectdeletedata.projectName
        ? Projectdeletedata.projectName
        : "",
    clientName:
      Projectdeletedata && Projectdeletedata.projectName
        ? Projectdeletedata.clientName
        : "",
    clientFolderName:
      Projectdeletedata && Projectdeletedata.projectName
        ? Projectdeletedata.clientFolderName
        : "",

    isSubmitted: false,
  });

  const { projectName, clientName, clientFolderName } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      recordId: Projectdeletedata ? Projectdeletedata._id : "",
      projectDeleteById: user._id,
      projectDeleteDateTime: Date.now(),
    };
    console.log(finalData);
    deleteProjectData(finalData);
    onDeactiveModalChange(true);
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
                Are you sure you want delete this Project permanently ?
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
                onClick={() => onDeactiveModalChange(true)}
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

DeleteProject.propTypes = {
  auth: PropTypes.object.isRequired,
  deleteProjectData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  deleteProjectData,
})(DeleteProject);
