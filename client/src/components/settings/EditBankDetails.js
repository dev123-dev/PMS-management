import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { editCompanyBank } from "../../actions/settings";

const EditBankDetails = ({
  auth: { isAuthenticated, user, users, loading },
  editCompanyBank,
  editBankdata,
}) => {
  //formData

  const [formData, setFormData] = useState({
    accountNo:
      editBankdata && editBankdata.accountNo ? editBankdata.accountNo : "",
    IFSCCode:
      editBankdata && editBankdata.IFSCCode ? editBankdata.IFSCCode : "",
    bankName:
      editBankdata && editBankdata.bankName ? editBankdata.bankName : "",
    bankBranch:
      editBankdata && editBankdata.bankBranch ? editBankdata.bankBranch : "",

    isSubmitted: false,
  });

  const { accountNo, IFSCCode, bankName, bankBranch, defaultBank } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [isChecked, setIsChecked] = useState(
    editBankdata && editBankdata.defaultBank ? editBankdata.defaultBank : false
  );
  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const finalData = {
      recordId: editBankdata ? editBankdata._id : "",
      accountNo: accountNo,
      IFSCCode: IFSCCode,
      bankName: bankName,
      bankBranch: bankBranch,
      defaultBank: isChecked,
    };
    editCompanyBank(finalData);
    console.log(finalData);
    setFormData({
      ...formData,

      isSubmitted: true,
    });
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      {" "}
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="row col-lg-12 col-md-11 col-sm-12 col-12 ">
          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <label className="label-control">Bank Name :</label>
            <input
              type="text"
              name="bankName"
              value={bankName}
              className="form-control"
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <label className="label-control">Account No :</label>
            <input
              type="text"
              name="accountNo"
              value={accountNo}
              className="form-control"
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <label className="label-control">IFSC Code :</label>
            <input
              type="text"
              name="IFSCCode"
              value={IFSCCode}
              className="form-control"
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <label className="label-control">Branch :</label>
            <input
              type="text"
              name="bankBranch"
              value={bankBranch}
              className="form-control"
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 col-12">
            <label className="label-control">Default :</label>
            <input
              type="checkbox"
              id="default"
              checked={isChecked}
              onChange={handleOnChange}
            />
          </div>
        </div>

        <div
          className="row col-lg-12 col-md-11 col-sm-12 col-12 Savebutton no_padding"
          size="lg"
        >
          {/* <div className="col-lg-8 col-md-6 col-sm-12 col-12">
            <label className="label-control colorRed">
              * Indicates mandatory fields
            </label>
          </div> */}
          <div className="col-lg-12 col-md-6 col-sm-12 col-12">
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

EditBankDetails.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { editCompanyBank })(EditBankDetails);
