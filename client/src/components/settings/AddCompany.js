import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { AddCompanyDetails } from "../../actions/settings";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Select from "react-select";
const AddCompany = ({
  auth: { isAuthenticated, user, users, loading },
  // onAddModalChange,
  AddCompanyDetails,
}) => {
  const bankTypeVal = [
    { value: "Domestic", label: "Domestic" },
    { value: "International", label: "International" },
  ];

  //formData

  const [formData, setFormData] = useState({
    companyName: "",
    companyWebsite: "",
    companyPhone1: "",
    companyPhone2: "",
    companyGSTIn: "",
    companyPanNo: "",
    companyRegisterNo: "",
    companyTradeLicenseNo: "",
    companyDescription: "",
    companyAddress: "",
    companyShortForm: "",
    companyType: "",
    isSubmitted: false,
  });

  const {
    companyName,
    companyWebsite,
    companyPhone1,
    companyPhone2,
    companyGSTIn,
    companyPanNo,
    companyRegisterNo,
    companyTradeLicenseNo,
    companyDescription,
    companyAddress,
    companyShortForm,
    companyType,
    isSubmitted,
  } = formData;
  //Required Validation Starts
  const [error, setError] = useState({
    BankIdChecker: true,
    BankErrorStyle: {},
  });
  const { BankIdChecker, BankErrorStyle } = error;

  const checkErrors = () => {
    if (!BankIdChecker) {
      setError({
        ...error,
        BankErrorStyle: { color: "#F00" },
      });
      return false;
    }

    return true;
  };

  const onBankTypeChange = (e) => {
    //Required Validation starts
    setError({
      ...error,
      BankIdChecker: true,
      BankErrorStyle: { color: "#000" },
    });
    //Required Validation ends
    if (e) {
      setFormData({
        ...formData,
        companyType: e,
      });
    }
  };
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [isChecked, setIsChecked] = useState(false);
  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };
  //add staff start
  const [addData, setFormDatas] = useState({
    accountNo: "",
    IFSCCode: "",
    bankName: "",
    bankBranch: "",
    defaultBank: "",
  });

  const { accountNo, IFSCCode, bankName, bankBranch, defaultBank } = addData;

  const [AddedDetails, AddDetails] = useState([]);

  const onAdd = (e) => {
    const bankList = AddedDetails.filter(
      (AddDetails) => AddDetails.accountNo === accountNo
    );

    e.preventDefault();
    if (bankList.length === 0) {
      // if (checkErrors()) {
      const addData = {
        accountNo: accountNo,
        IFSCCode: IFSCCode?.trim(),
        bankName: bankName?.trim(),
        bankBranch: bankBranch?.trim(),
        defaultBank: isChecked,
      };
      setFormDatas({
        ...addData,
        accountNo: "",
        IFSCCode: "",
        bankName: "",
        bankBranch: "",
        defaultBank: "",
      });
      setIsChecked(false);
      let temp = [];
      temp.push(...AddedDetails, addData);
      AddDetails(temp);
      // }
    }
  };
  const onRemoveChange = (accountNo) => {
    const removeList = AddedDetails.filter(
      (AddDetails) => AddDetails.accountNo !== accountNo
    );
    AddDetails(removeList);
  };
  //add staff end

  const onInputChange1 = (e) => {
    setFormDatas({ ...addData, [e.target.name]: e.target.value });
  };
  console.log(user);
  //Required Validation ends
  const onSubmit = (e) => {
    e.preventDefault();
    if (checkErrors()) {
      const finalData = {
        companyName: companyName?.trim(),
        companyWebsite: companyWebsite?.trim(),
        companyPhone1: companyPhone1,
        companyPhone2: companyPhone2,
        companyGSTIn: companyGSTIn?.trim(),
        companyPanNo: companyPanNo?.trim(),
        companyRegisterNo: companyRegisterNo?.trim(),
        companyTradeLicenseNo: companyTradeLicenseNo?.trim(),
        companyDescription: companyDescription?.trim(),
        companyAddress: companyAddress?.trim(),
        companyType: companyType.value ? companyType : bankTypeVal[0].value,
        companyShortForm: companyShortForm?.trim(),
        bank: AddedDetails,
        departmentEnteredById: user._id,
        companyEnteredByName: user.empFullName,
      };
      AddCompanyDetails(finalData);
      setFormData({
        ...formData,
        isSubmitted: true,
      });
    }
  };

  if (isSubmitted) {
    return <Redirect to="/all-company" />;
  }

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align">
        <form className="row" onSubmit={(e) => onSubmit(e)}>
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <h2 className="heading_color">Add Company</h2>
            <hr />
          </div>

          <div className="col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="row card-new ">
              <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                <label className="label-control">Company Name* :</label>
                <input
                  type="text"
                  name="companyName"
                  value={companyName}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                <label className="label-control">Website :</label>
                <input
                  type="text"
                  name="companyWebsite"
                  value={companyWebsite}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                <label className="label-control">Phone1 :</label>
                <input
                  type="Number"
                  name="companyPhone1"
                  value={companyPhone1}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  onKeyDown={(e) =>
                    (e.keyCode === 69 || e.keyCode === 190) &&
                    e.preventDefault()
                  }
                />
              </div>
              <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                <label className="label-control"> Phone2 :</label>
                <input
                  type="Number"
                  name="companyPhone2"
                  value={companyPhone2}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  onKeyDown={(e) =>
                    (e.keyCode === 69 || e.keyCode === 190) &&
                    e.preventDefault()
                  }
                />
              </div>
              <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                <label className="label-control">GSTIn :</label>
                <input
                  type="text"
                  name="companyGSTIn"
                  value={companyGSTIn}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                <label className="label-control">PanNo :</label>
                <input
                  type="text"
                  name="companyPanNo"
                  value={companyPanNo}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                <label className="label-control">RegisterNo :</label>
                <input
                  type="text"
                  name="companyRegisterNo"
                  value={companyRegisterNo}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                <label className="label-control">Trade LicenseNo :</label>
                <input
                  type="text"
                  name="companyTradeLicenseNo"
                  value={companyTradeLicenseNo}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="col-lg-4 col-md-11 col-sm-12 col-12 ">
                <label className="label-control" style={BankErrorStyle}>
                  Bank Type* :
                </label>
                <Select
                  name="companyType"
                  isSearchable={true}
                  options={bankTypeVal}
                  value={companyType || bankTypeVal[0]}
                  placeholder="Select"
                  onChange={(e) => onBankTypeChange(e)}
                />
              </div>
              <div className="col-lg-2 col-md-12 col-sm-12 col-12 py-2">
                <label className="label-control">Short Form :</label>
                <input
                  type="text"
                  name="companyShortForm"
                  value={companyShortForm}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="col-lg-5 col-md-12 col-sm-12 col-12 py-2">
                <label className="label-control">Description :</label>
                <textarea
                  name="companyDescription"
                  id="companyDescription"
                  className="textarea form-control"
                  rows="3"
                  placeholder="Company Description"
                  style={{ width: "100%" }}
                  value={companyDescription}
                  onChange={(e) => onInputChange(e)}
                ></textarea>
              </div>
              <div className="col-lg-5 col-md-12 col-sm-12 col-12 py-2">
                <label className="label-control">Address :</label>
                <textarea
                  name="companyAddress"
                  id="companyAddress"
                  className="textarea form-control"
                  rows="3"
                  placeholder="Company Address"
                  style={{ width: "100%" }}
                  value={companyAddress}
                  onChange={(e) => onInputChange(e)}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 col-12 ">
            <div className="row card-new ">
              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                <h5>Bank Info</h5>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                <label className="label-control">Bank Name :</label>
                <input
                  type="text"
                  name="bankName"
                  value={bankName}
                  className="form-control"
                  onChange={(e) => onInputChange1(e)}
                />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                <label className="label-control">Account No :</label>
                <input
                  type="Number"
                  name="accountNo"
                  value={accountNo}
                  className="form-control"
                  onChange={(e) => onInputChange1(e)}
                  onKeyDown={(e) =>
                    (e.keyCode === 69 || e.keyCode === 190) &&
                    e.preventDefault()
                  }
                />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                <label className="label-control">IFSC Code :</label>
                <input
                  type="text"
                  name="IFSCCode"
                  value={IFSCCode}
                  className="form-control"
                  onChange={(e) => onInputChange1(e)}
                />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                <label className="label-control">Branch :</label>
                <input
                  type="text"
                  name="bankBranch"
                  value={bankBranch}
                  className="form-control"
                  onChange={(e) => onInputChange1(e)}
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
              <div className="col-lg-12 col-md-6 col-sm-6 col-12 ">
                <button
                  variant="success"
                  className="btn sub_form btn_continue Save float-right"
                  onClick={(e) => onAdd(e)}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-12 py-2">
            <div
              className="row card-new"
              // style={{ height: "340px", overflowY: "scroll" }}
            >
              <table
                className="tabllll table table-bordered table-striped table-hover"
                id="datatable2"
              >
                <thead>
                  <tr>
                    <th>Account No</th>
                    <th>IFSC Code</th>
                    <th>Bank Name</th>
                    <th>Branch</th>
                    <th>Bank Type</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {AddedDetails &&
                    AddedDetails.map((AddDetail, idx) => {
                      return (
                        <tr key={idx}>
                          <td>{AddDetail.accountNo}</td>
                          <td>{AddDetail.IFSCCode}</td>
                          <td>{AddDetail.bankName}</td>
                          <td>{AddDetail.bankBranch}</td>
                          {/* <td>{AddDetail.companyType}</td> */}
                          <td>
                            <img
                              className="img_icon_size log"
                              onClick={() =>
                                onRemoveChange(AddDetail.accountNo)
                              }
                              src={require("../../static/images/close-buttonRed.png")}
                              alt="Remove"
                              title="Remove"
                            />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-md-12 col-lg-12 col-sm-12 col-12 ">
            {loading ? (
              <button
                className="btn sub_form btn_continue Save float-right"
                disabled
              >
                Loading...
              </button>
            ) : (
              <>
                <input
                  type="submit"
                  name="Submit"
                  value="Submit"
                  className="btn sub_form btn_continue Save float-right"
                />
                <Link
                  to="/all-company"
                  className="btn sub_form btn_continue Save float-right"
                >
                  Cancel
                </Link>
              </>
            )}
          </div>
        </form>
      </div>
    </Fragment>
  );
};

AddCompany.propTypes = {
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  AddCompanyDetails: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  settings: state.settings,
});

export default connect(mapStateToProps, { AddCompanyDetails })(AddCompany);
