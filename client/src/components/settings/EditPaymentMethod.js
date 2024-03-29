import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { EditPaymentMode } from "../../actions/settings";

const EditPaymentMethod = ({
  auth: { isAuthenticated, user, users, loading },
  paymentModeData,
  onEditModalChange,
  onAddModalChange,
  EditPaymentMode,
}) => {
  //formData
  const [formData, setFormData] = useState({
    paymentModeName:
      paymentModeData && paymentModeData.paymentModeName
        ? paymentModeData.paymentModeName
        : "",
    isSubmitted: false,
  });

  const { paymentModeName } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      recordId: paymentModeData ? paymentModeData._id : "",
      paymentModeName: paymentModeName?.trim(),
      paymentModeEditedById: user._id,
    };
    EditPaymentMode(finalData);
    setFormData({
      ...formData,
      isSubmitted: true,
    });
    onEditModalChange(true);
  };

  return !isAuthenticated || !user  ? (
    <Spinner />
  ) : (
    <Fragment>
      {" "}
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="row col-lg-12 col-md-11 col-sm-12 col-12 ">
          <div className="col-lg-8 col-md-6 col-sm-6 col-12">
            <label className="label-control">Payment Method Name* :</label>
            <input
              type="text"
              name="paymentModeName"
              value={paymentModeName}
              className="form-control"
              onChange={(e) => onInputChange(e)}
            />
          </div>
        </div>

        <div
          className="row col-lg-12 col-md-11 col-sm-12 col-12 Savebutton no_padding"
          size="lg"
        >
          <div className="col-lg-8 col-md-6 col-sm-12 col-12">
            <label className="label-control colorRed">
              * Indicates mandatory fields
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
                value="Update"
                className="btn sub_form btn_continue blackbrd Save float-right"
              />
            )}
          </div>
        </div>
      </form>
    </Fragment>
  );
};

EditPaymentMethod.propTypes = {
  auth: PropTypes.object.isRequired,
  EditPaymentMode: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { EditPaymentMode })(EditPaymentMethod);
