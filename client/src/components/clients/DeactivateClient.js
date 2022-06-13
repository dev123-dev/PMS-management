import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import { deactiveClient } from "../../actions/client";
import Spinner from "../layout/Spinner";

const DeactivateClient = ({
  auth: { isAuthenticated, user, users, loading },
  allProjectStatusdeavtivedata,
  clientdeactivedata,
  deactiveClient,
  editProjectStatus,
}) => {
  // console.log(clientdeactivedata);
  const [formData, setFormData] = useState({
    clientName:
      clientdeactivedata && clientdeactivedata.clientName
        ? clientdeactivedata.clientName
        : "",
    clientFolderName:
      clientdeactivedata && clientdeactivedata.clientFolderName
        ? clientdeactivedata.clientFolderName
        : "",
    clientEmail:
      clientdeactivedata && clientdeactivedata.clientEmail
        ? clientdeactivedata.clientEmail
        : "",
    // clientFolderName:
    //   clientdeactivedata && clientdeactivedata.clientFolderName
    //     ? clientdeactivedata.clientFolderName
    //     : "",
    projectStatusDeactiveReason: "",
    isSubmitted: false,
  });

  const { clientName, clientFolderName, clientEmail, clientDeactiveReason } =
    formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // if (checkErrors()) {
    const finalData = {
      recordId: clientdeactivedata ? clientdeactivedata._id : "",
      clientDeactiveReason: clientDeactiveReason,
      clientDeactiveById: user._id,
      clientDeactiveDate: new Date().toLocaleString(),
    };
    deactiveClient(finalData);

    // setFormData({
    //   ...formData,
    //   districtName: "",
    //   isSubmitted: true,
    // });
    // }
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
            <label className="label-control">
              Client Email : {clientEmail}
            </label>
          </div>

          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <label className="label-control">Deactive Reason :</label>

            <textarea
              name="clientDeactiveReason"
              id="clientDeactiveReason"
              className="textarea form-control"
              rows="3"
              placeholder="Project Status Deactive Reason"
              style={{ width: "100%" }}
              value={clientDeactiveReason}
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

DeactivateClient.propTypes = {
  auth: PropTypes.object.isRequired,
  deactiveClient: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deactiveClient })(DeactivateClient);
