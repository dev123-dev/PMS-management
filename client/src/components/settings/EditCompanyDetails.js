import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { EditCompanyData, addNewBank } from "../../actions/settings";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import Spinner from "../layout/Spinner";
import { useHistory } from "react-router-dom";
import { Redirect, Link } from "react-router-dom";
import EditBankDetails from "./EditBankDetails";
import FileBase64 from "react-file-base64";
const EditCompanyDetails = ({
  auth: { isAuthenticated, user, users, loading },
  EditCompanyData,
  addNewBank,
}) => {
  //formData

  const editcompanydatas = useHistory().location.data.editcompanydatas;
  const bankTypeVal = [
    { value: "Domestic", label: "Domestic" },
    { value: "International", label: "International" },
  ];
  const [formData, setFormData] = useState({
    companyName:
      editcompanydatas && editcompanydatas.companyName
        ? editcompanydatas.companyName
        : "",
    companyWebsite:
      editcompanydatas && editcompanydatas.companyWebsite
        ? editcompanydatas.companyWebsite
        : "",
    companyLogo:
      editcompanydatas && editcompanydatas.companyLogo
        ? editcompanydatas.companyLogo
        : "",
    companyPhone1:
      editcompanydatas && editcompanydatas.companyPhone1
        ? editcompanydatas.companyPhone1
        : "",

    companyPhone2:
      editcompanydatas && editcompanydatas.companyPhone2
        ? editcompanydatas.companyPhone2
        : "",
    companyGSTIn:
      editcompanydatas && editcompanydatas.companyGSTIn
        ? editcompanydatas.companyGSTIn
        : "",
    companyPanNo:
      editcompanydatas && editcompanydatas.companyPanNo
        ? editcompanydatas.companyPanNo
        : "",
    abbreviation:
      editcompanydatas && editcompanydatas.abbreviation
        ? editcompanydatas.abbreviation
        : "",
    quotationNoCounter:
      editcompanydatas && editcompanydatas.quotationNoCounter
        ? editcompanydatas.quotationNoCounter
        : "",
    invoiceNoCounter:
      editcompanydatas && editcompanydatas.invoiceNoCounter
        ? editcompanydatas.invoiceNoCounter
        : "",

    companyRegisterNo:
      editcompanydatas && editcompanydatas.companyRegisterNo
        ? editcompanydatas.companyRegisterNo
        : "",
    companyTradeLicenseNo:
      editcompanydatas && editcompanydatas.companyTradeLicenseNo
        ? editcompanydatas.companyTradeLicenseNo
        : "",
    companyDescription:
      editcompanydatas && editcompanydatas.companyDescription
        ? editcompanydatas.companyDescription
        : "",
    companyAddress:
      editcompanydatas && editcompanydatas.companyAddress
        ? editcompanydatas.companyAddress
        : "",
    companyShortForm:
      editcompanydatas && editcompanydatas.companyShortForm
        ? editcompanydatas.companyShortForm
        : "",
    companyType:
      editcompanydatas && editcompanydatas.companyType
        ? {
            value: editcompanydatas.companyType,
            label: editcompanydatas.companyType,
          }
        : "",

    isSubmitted: false,
  });

  const {
    companyName,
    companyWebsite,
    companyPhone1,
    companyPhone2,
    companyGSTIn,
    companyPanNo,
    abbreviation,
    companyLogo,
    quotationNoCounter,
    invoiceNoCounter,
    companyRegisterNo,
    companyTradeLicenseNo,
    companyDescription,
    companyAddress,
    companyShortForm,
    companyType,
    isSubmitted,
  } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onBankTypeChange = (e) => {
    if (e) {
      setFormData({
        ...formData,
        companyType: e,
      });
    }
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
    // companyType: "",
    defaultBank: "",
  });

  const { accountNo, IFSCCode, bankName, bankBranch, defaultBank } = addData;

  const [AddedDetails, AddDetails] = useState([]);
  const [amount, setAmount] = useState();

  const onAdd = (e) => {
    const bankList = AddedDetails.filter(
      (AddDetails) => AddDetails.accountNo === accountNo
    );

    e.preventDefault();
    if (bankList.length === 0) {
      // if (checkErrorscontact()) {
      const addData = {
        recordId: editcompanydatas ? editcompanydatas._id : "",
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
      // setstaffCountryCode("");
      // getstaffcountryData("");
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
  //add  end

  const onInputChange1 = (e) => {
    setFormDatas({ ...addData, [e.target.name]: e.target.value });
  };

  const [showEditModal, setShowEditModal] = useState(false);
  const handleEditModalClose = () => setShowEditModal(false);

  const onEditModalChange = (e) => {
    if (e) {
      handleEditModalClose();
    }
  };

  const [userDatas, setUserDatas] = useState(null);
  const onUpdate = (userGroups, idx) => {
    setShowEditModal(true);
    setUserDatas(userGroups);
  };
  //Required Validation ends
  const onSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      recordId: editcompanydatas ? editcompanydatas._id : "",
      companyName: companyName?.trim(),
      companyWebsite: companyWebsite?.trim(),
      companyPhone1: companyPhone1,
      companyPhone2: companyPhone2,
      abbreviation: abbreviation,
      quotationNoCounter: quotationNoCounter,
      invoiceNoCounter: invoiceNoCounter,
      companyGSTIn: companyGSTIn?.trim(),
      companyPanNo: companyPanNo?.trim(),
      companyRegisterNo: companyRegisterNo?.trim(),
      companyTradeLicenseNo: companyTradeLicenseNo?.trim(),
      companyDescription: companyDescription?.trim(),
      companyAddress: companyAddress?.trim(),
      companyLogo: companyLogo,
      companyShortForm: companyShortForm?.trim(),
      companyType: companyType.value,
      companyEditedById: user._id,
      companyEditedDateTime: new Date().toLocaleString(),
    };
    EditCompanyData(finalData);
    for (let i = 0; i < AddedDetails.length; i++) {
      addNewBank(AddedDetails[i]);
    }
    setFormData({
      ...formData,

      isSubmitted: true,
    });
  };
  if (isSubmitted) {
    return <Redirect to="/all-company" />;
  }
  if (!editcompanydatas) {
    return <Redirect to="/all-company" />;
  }

  return !isAuthenticated || !user  ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align">
        <form className="row" onSubmit={(e) => onSubmit(e)}>
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <h2 className="heading_color">Edit Company</h2>
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
              <div className="col-lg-3 col-md-11 col-sm-12 col-12 ">
                <label className="label-control">Bank Type* :</label>
                <Select
                  name="companyType"
                  isSearchable={true}
                  options={bankTypeVal}
                  value={companyType}
                  placeholder="Select"
                  onChange={(e) => onBankTypeChange(e)}
                />
              </div>
              <div className="col-lg-2 col-md-12 col-sm-12 col-12">
                <label className="label-control">Short Form :</label>
                <input
                  type="text"
                  name="companyShortForm"
                  value={companyShortForm}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="col-lg-5 col-md-12 col-sm-12 col-12">
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
              <div className="col-lg-5 col-md-12 col-sm-12 col-12">
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
              <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                <label className="label-control">Abbreviation :</label>
                <input
                  type="text"
                  name="abbreviation"
                  value={abbreviation}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                <label className="label-control">Quotation No Counter :</label>
                <input
                  type="text"
                  name="quotationNoCounter"
                  value={quotationNoCounter}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                <label className="label-control">Invoice No Counter :</label>
                <input
                  type="text"
                  name="invoiceNoCounter"
                  value={invoiceNoCounter}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="row col-lg-12 col-md-4 col-sm-4 col-12 py-3">
                <label className="label-control">Company Logo :</label>

                <div className="row col-lg-12 col-md-12 col-sm-12 col-12">
                  <FileBase64
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) =>
                      setFormData({
                        ...formData,
                        companyLogo: base64,
                      })
                    }
                  />
                  <img
                    className="log_size"
                    alt="Pinnacle Media"
                    src={`${companyLogo}`}
                  />
                </div>
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
                  type="text"
                  name="accountNo"
                  value={accountNo}
                  className="form-control"
                  onChange={(e) => onInputChange1(e)}
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
              {/* <div className="col-lg-3 col-md-11 col-sm-12 col-12 ">
                <label className="label-control">Bank Type* :</label>
                <Select
                  name="companyType"
                  isSearchable={true}
                  options={bankTypeVal}
                  value={companyType || bankTypeVal[0]}
                  placeholder="Select"
                  onChange={(e) => onBankTypeChange(e)}
                />
              </div> */}
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
                <label className="label-control"></label>
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
            <div className="row card-new">
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
                    {/* <th>Bank Type</th> */}
                    <th>OP</th>
                  </tr>
                </thead>
                <tbody>
                  {editcompanydatas &&
                    editcompanydatas.bank &&
                    editcompanydatas.bank.map((bank, idx) => {
                      return (
                        <tr key={idx}>
                          <td>{bank.accountNo}</td>
                          <td>{bank.IFSCCode}</td>
                          <td>{bank.bankName}</td>
                          <td>{bank.bankBranch}</td>
                          {/* <td>{bank.companyType}</td> */}
                          <td>
                            {" "}
                            <img
                              className="img_icon_size log"
                              onClick={() => onUpdate(bank, idx)}
                              src={require("../../static/images/edit_icon.png")}
                              alt="Edit"
                              title="Edit"
                            />
                          </td>
                        </tr>
                      );
                    })}
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

      <Modal
        show={showEditModal}
        backdrop="static"
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <div className="col-lg-10">
            <h3 className="modal-title text-center">Edit Bank Details</h3>
          </div>
          <div className="col-lg-1">
            <button onClick={handleEditModalClose} className="close">
              <img
                src={require("../../static/images/close.png")}
                alt="X"
                style={{ height: "20px", width: "20px" }}
              />
            </button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <EditBankDetails
            onEditModalChange={onEditModalChange}
            editBankdata={userDatas}
          />
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

EditCompanyDetails.propTypes = {
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  EditCompanyData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  settings: state.settings,
});

export default connect(mapStateToProps, { EditCompanyData, addNewBank })(
  EditCompanyDetails
);
