import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { deactivateDctClient } from "../../actions/dct";

const DeactiveDctClient = ({
  auth: { isAuthenticated, user, users, loading },
  dctclientdeactivedata,
  onDeactiveModalChange,
  deactivateDctClient,
}) => {
  const [formData, setFormData] = useState({
    clientName:
      dctclientdeactivedata && dctclientdeactivedata.clientName
        ? dctclientdeactivedata.clientName
        : "",
    clientFolderName:
      dctclientdeactivedata && dctclientdeactivedata.clientFolderName
        ? dctclientdeactivedata.clientFolderName
        : "",
    emailId:
      dctclientdeactivedata && dctclientdeactivedata.emailId
        ? dctclientdeactivedata.emailId
        : "",

    dctClientDeactivateReason: "",
    isSubmitted: false,
  });

  const { clientName, clientFolderName, emailId, dctClientDeactivateReason } =
    formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      recordId: dctclientdeactivedata ? dctclientdeactivedata._id : "",
      dctClientDeactivateReason: dctClientDeactivateReason?.trim(),
      dctClientDeactivateById: user._id,
      dctClientStatus: "Deactive",
      dctClientDeactivateDateTime: new Date().toLocaleString(),
    };
    deactivateDctClient(finalData);
    onDeactiveModalChange(true);
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="col-lg-6 col-md-12 col-sm-12 col-12">
            <label className="label-control">Client Name : {clientName}</label>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 col-12">
            <label className="label-control">
              Folder Name : {clientFolderName}
            </label>
          </div>
          <div className="col-lg-8 col-md-12 col-sm-12 col-12">
            <label className="label-control">Client Email Id: {emailId}</label>
          </div>

          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <label className="label-control">Deactive Reason :</label>

            <textarea
              name="dctClientDeactivateReason"
              id="dctClientDeactivateReason"
              className="textarea form-control"
              rows="3"
              placeholder="Client Deactive Reason"
              style={{ width: "100%" }}
              value={dctClientDeactivateReason}
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

DeactiveDctClient.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deactivateDctClient })(
  DeactiveDctClient
);
