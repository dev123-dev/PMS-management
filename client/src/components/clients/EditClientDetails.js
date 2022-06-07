import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";

const EditClientDetails = ({
  auth: { isAuthenticated, user, users, loading },
  allClientdata,

  onAddDistrictModalChange,
}) => {
  //formData
  console.log(allClientdata);
  const [formData, setFormData] = useState({
    clientName:
      allClientdata && allClientdata.clientName ? allClientdata.clientName : "",
    clientEmail:
      allClientdata && allClientdata.clientEmail
        ? allClientdata.clientEmail
        : "",
    clientContactNo1:
      allClientdata && allClientdata.clientContactNo1
        ? allClientdata.clientContactNo1
        : "",

    clientContactNo2:
      allClientdata && allClientdata.clientContactNo2
        ? allClientdata.clientContactNo2
        : "",

    clientAddress:
      allClientdata && allClientdata.clientAddress
        ? allClientdata.clientAddress
        : "",

    clientCountry:
      allClientdata && allClientdata.clientCountry
        ? allClientdata.clientCountry
        : "",
    clientBelongsTo:
      allClientdata && allClientdata.clientBelongsTo
        ? allClientdata.clientBelongsTo
        : "",
    clientFolderName:
      allClientdata && allClientdata.clientFolderName
        ? allClientdata.clientFolderName
        : "",
    clientCurrency:
      allClientdata && allClientdata.clientCurrency
        ? allClientdata.clientCurrency
        : "",

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
      recordId: allClientdata ? allClientdata._id : "",
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
      <form className="row" onSubmit={(e) => onSubmit(e)}>
        <div className="row col-lg-12 col-md-11 col-sm-12 col-12 ">
          <div className="col-lg-6 col-md-12 col-sm-12 col-12 py-3">
            <div className="row card-new  pb-3">
              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                <h5>Client Info </h5>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <label className="label-control">Client Name:</label>
                <input
                  type="text"
                  name="clientName"
                  value={clientName}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <label className="label-control">Production Email:</label>
                <input
                  type="text"
                  //   name="batchBankIFSC"
                  //  value={batchBankIFSC}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <label className="label-control">Billing Email :</label>
                <input
                  type="text"
                  name="clientEmail"
                  value={clientEmail}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <label className="label-control">Client Contact 1:</label>
                <input
                  type="text"
                  name="clientContactNo1"
                  value={clientContactNo1}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <label className="label-control">Client Contact 2:</label>
                <input
                  type="text"
                  name="clientContactNo2"
                  value={clientContactNo2}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <label className="label-control">Client Folder Name:</label>
                <input
                  type="text"
                  name="clientFolderName"
                  value={clientFolderName}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <label className="label-control">Belongs To:</label>
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
          </div>

          <div className="row col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12 py-3 no_padding">
              <div className="row card-new pb-3">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <h5>Other Info </h5>
                </div>

                <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding ">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <label className="label-control">Address:</label>
                    <input
                      type="text"
                      name="clientAddress"
                      value={clientAddress}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <label className="label-control">Country:</label>
                    <input
                      type="text"
                      name="clientCountry"
                      value={clientCountry}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <label className="label-control">Currency:</label>
                    <input
                      type="text"
                      name="clientCurrency"
                      value={clientCurrency}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <label className="label-control">Mode of Payment:</label>
                    <Select
                      name="usergroup"
                      //  options={UserGroups}
                      isSearchable={false}
                      placeholder="Select"
                      // onChange={(e) => onPaymentModeChange(e)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="row col-lg-12 col-md-11 col-sm-12 col-12 Savebutton no_padding"
          size="lg"
        >
          <div className="col-lg-8 col-md-6 col-sm-12 col-12">
            <label className="label-control colorRed">
              * Indicates mandatory fields, Please fill mandatory fields before
              Submit
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
      </form>
    </Fragment>
  );
};

EditClientDetails.propTypes = {
  auth: PropTypes.object.isRequired,
  area: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(EditClientDetails);
