import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { getALLPaymentMode } from "../../actions/settings";
import { getActiveClients } from "../../actions/client";

const AddProject = ({
  auth: { isAuthenticated, user, users, loading },
  settings: { paymentMode },
  client: { activeClient },
  getALLPaymentMode,
  getActiveClients,
  onAddDistrictModalChange,
}) => {
  useEffect(() => {
    getALLPaymentMode();
  }, [getALLPaymentMode]);
  useEffect(() => {
    getActiveClients();
  }, [getActiveClients]);

  console.log(paymentMode);
  console.log(activeClient);

  //formData
  const [formData, setFormData] = useState({
    clientType: "",
    clientName: "",
    clientEmail: "",
    clientContactNo1: "",
    clientContactNo2: "",
    clientAddress: "",
    clientCountry: "",
    clientBelongsTo: "",
    clientFolderName: "",
    clientCurrency: "",
    isSubmitted: false,
  });

  const {
    clientName,
    clientEmail,
    clientContactNo1,
    clientContactNo2,
    clientAddress,
    clientCountry,
    clientBelongsTo,
    clientFolderName,
    clientCurrency,
  } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // if (checkErrors()) {
    const finalData = {
      clientName: clientName,
      clientEmail: clientEmail,
      clientContactNo1: clientContactNo1,
      clientContactNo2: clientContactNo2,
      clientAddress: clientAddress,
      clientCountry: clientCountry,
      clientCurrency: clientCurrency,
      clientBelongsTo: clientBelongsTo,
      clientFolderName: clientFolderName,
    };
    console.log(finalData);
    // AddDistrict(finalData);
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
      {" "}
      <div className="container container_align">
        <form className="row" onSubmit={(e) => onSubmit(e)}>
          <div className="col-lg-12 col-md-11 col-sm-12 col-12">
            <h2 className="heading_color">Add New Project</h2>
            <hr />
          </div>
          <section className="sub_reg">
            <div className="row col-lg-12 col-md-11 col-sm-12 col-12 ">
              <div className="row col-lg-12 col-md-6 col-sm-6 col-12">
                <div className="col-lg-3 col-md-11 col-sm-12 col-12 ">
                  <label className="label-control">Client Type:</label>
                  <Select
                    name="clientBelongsTo"
                    value={clientBelongsTo}
                    //  options={clientBelongsTo}
                    isSearchable={false}
                    placeholder="Select"
                    // onChange={(e) => clientBelongsToChange(e)}
                  />
                </div>
              </div>

              <div className="row col-lg-12 col-md-6 col-sm-6 col-12">
                <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                  <label className="label-control">Client Name:</label>
                  <Select
                    name="clientName"
                    value={clientName}
                    //  options={clientBelongsTo}
                    isSearchable={false}
                    placeholder="Select"
                    // onChange={(e) => clientBelongsToChange(e)}
                  />
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                  <label className="label-control">Belongs to:</label>
                  <input
                    type="text"
                    name="clientEmail"
                    value={clientEmail}
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                  <label className="label-control">Client folder Name:</label>
                  <input
                    type="text"
                    name="clientFolderName"
                    value={clientFolderName}
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="row col-lg-12 col-md-6 col-sm-6 col-12">
                <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                  <label className="label-control">Project Name*:</label>
                  <input
                    type="text"
                    // name="batchBankAccountNumber"
                    // value={batchBankAccountNumber}
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                  <label className="label-control">Qty:</label>
                  <input
                    type="text"
                    name="clientContactNo1"
                    value={clientContactNo1}
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                  <label className="label-control">Priority:</label>
                  <Select
                    name="clientBelongsTo"
                    value={clientBelongsTo}
                    //  options={clientBelongsTo}
                    isSearchable={false}
                    placeholder="Select"
                    // onChange={(e) => clientBelongsToChange(e)}
                  />
                </div>
                <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                  <label className="label-control">Deadline:</label>
                  <input
                    type="text"
                    name="clientFolderName"
                    value={clientFolderName}
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>

              <div className="row col-lg-12 col-md-6 col-sm-6 col-12">
                <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                  <label className="label-control">Project Status:</label>
                  <Select
                    name="clientBelongsTo"
                    value={clientBelongsTo}
                    //  options={clientBelongsTo}
                    isSearchable={false}
                    placeholder="Select"
                    // onChange={(e) => clientBelongsToChange(e)}
                  />
                </div>
              </div>

              <div className="row col-lg-12 col-md-6 col-sm-6 col-12">
                <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                  <label className="label-control">Project Date:</label>
                  <input
                    type="text"
                    name="clientFolderName"
                    value={clientFolderName}
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                  <label className="label-control">Project Time:</label>
                  <input
                    type="text"
                    name="clientFolderName"
                    value={clientFolderName}
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                  <label className="label-control">Client Date:</label>
                  <input
                    type="text"
                    name="clientFolderName"
                    value={clientFolderName}
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                  <label className="label-control">Client Time:</label>
                  <input
                    type="text"
                    name="clientFolderName"
                    value={clientFolderName}
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>

              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <label className="label-control">Instructions:</label>
                <textarea
                  name="useraddr"
                  id="useraddr"
                  className="textarea form-control"
                  rows="3"
                  placeholder="Address"
                  style={{ width: "100%" }}
                  required
                ></textarea>
              </div>
            </div>

            <div
              className="row col-lg-12 col-md-11 col-sm-12 col-12 Savebutton no_padding"
              size="lg"
            >
              <div className="col-lg-8 col-md-6 col-sm-12 col-12">
                <label className="label-control colorRed">
                  * Indicates mandatory fields, Please fill mandatory fields
                  before Submit
                </label>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 col-12">
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
                <Link
                  className="btn sub_form btn_continue blackbrd float-right"
                  to="/all-batches"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </section>
        </form>
      </div>
    </Fragment>
  );
};

AddProject.propTypes = {
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  getALLPaymentMode: PropTypes.object.isRequired,
  getActiveClients: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  settings: state.settings,
  client: state.client,
});

export default connect(mapStateToProps, {
  getALLPaymentMode,
  getActiveClients,
})(AddProject);
