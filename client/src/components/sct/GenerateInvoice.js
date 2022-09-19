import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import { Link, useHistory } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { getALLCompanyDetails } from "../../actions/settings";
import { saveInvoice } from "../../actions/sct";
import { Redirect } from "react-router-dom";

const GenerateInvoice = ({
  auth: { isAuthenticated, user, users, loading },
  settings: { allCompanyDetails },
  saveInvoice,
  getALLCompanyDetails,
}) => {
  const data = useHistory().location.data;
  let sctDataVal = data && data.sctdata;

  useEffect(() => {
    getALLCompanyDetails();
  }, [getALLCompanyDetails]);

  const paymentTypeVal = [
    { value: "Cash", label: "Cash" },
    { value: "NEFT", label: "NEFT" },
  ];

  //formData
  const [formData, setFormData] = useState({
    sctClientName:
      sctDataVal && sctDataVal.sctClientName ? sctDataVal.sctClientName : "",

    sctClientAddress:
      sctDataVal && sctDataVal.sctClientAddress
        ? sctDataVal.sctClientAddress
        : "",

    sctCompanyName:
      sctDataVal && sctDataVal.sctCompanyName ? sctDataVal.sctCompanyName : "",
    sctClientAssignedToName:
      sctDataVal && sctDataVal.sctClientAssignedToName
        ? sctDataVal.sctClientAssignedToName
        : "",
    sctClientAssignedToId:
      sctDataVal && sctDataVal.sctClientAssignedToId
        ? sctDataVal.sctClientAssignedToId
        : "",
    modeOfPayment: "",
    invoiceNo: "",
    invoiceDate: "",
    isSubmitted: false,
  });

  const {
    invoiceNo,
    sctClientAssignedToId,
    sctCompanyName,
    sctClientAssignedToName,
    sctClientAddress,
    modeOfPayment,
    isSubmitted,
  } = formData;

  const onPaymentModeChange = (e) => {
    setError({
      ...error,
      paymentmodeIdChecker: true,
      paymentmodeIdErrorStyle: { color: "#000" },
    });
    if (e) {
      setFormData({
        ...formData,
        modeOfPayment: e,
      });
    }
  };

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [showHide1, setShowHide1] = useState({
    showGSTSection: true,
  });
  const { showGSTSection } = showHide1;

  const allcompanydata = [];
  allCompanyDetails.map((company) =>
    allcompanydata.push({
      companyaddress: company.companyAddress,
      companyid: company._id,
      label: company.companyName,
      value: company.companyName,
      bank: company.bank,
    })
  );
  const [companyaddress, setcompanyaddressData] = useState("");
  const [company, getcompanyData] = useState("");
  const [companyid, setcompanyId] = useState("");
  const [companyname, setcompanyname] = useState("");
  const [bankList, setBankList] = useState();

  let allcompanyBank = [];
  const onCompanyChange = (e) => {
    setError({
      ...error,
      FrmCmpnyIdChecker: true,
      FrmCmpnyErrorStyle: { color: "#000" },
    });
    if (e.value === "pinnacle media") {
      setShowHide1({
        ...showHide1,
        showGSTSection: false,
      });
    } else {
      setShowHide1({
        ...showHide1,
        showGSTSection: true,
      });
    }
    getcompanyData(e);
    setcompanyId(e.companyid);
    setcompanyname(e.value);
    setcompanyaddressData(e.companyaddress);
    setBankList(e.bank);
    getSelectedBank("");
  };

  const [selectedBank, getSelectedBank] = useState();
  bankList &&
    bankList.map((bank) =>
      allcompanyBank.push({
        bankId: bank._id,
        label: bank.bankName,
        value: bank.bankName,
        default: bank.defaultBank,
        bankData: bank,
      })
    );

  if (bankList && !selectedBank && allcompanyBank) {
    getSelectedBank(
      allcompanyBank &&
        allcompanyBank.filter(
          (allcompanyBank) => allcompanyBank.default === true
        )
    );
  }
  const onBankChange = (e) => {
    setError({
      ...error,
      BankIdChecker: true,
      BankErrorStyle: { color: "#000" },
    });
    getSelectedBank(e);
  };
  //Required Validation Starts
  const [error, setError] = useState({
    FrmCmpnyErrorStyle: {},
    FrmCmpnyIdChecker: false,
    paymentmodeIdChecker: false,
    paymentmodeIdErrorStyle: {},
    BankIdChecker: false,
    BankErrorStyle: {},
  });
  const {
    FrmCmpnyErrorStyle,
    FrmCmpnyIdChecker,
    paymentmodeIdChecker,
    paymentmodeIdErrorStyle,
    BankIdChecker,
    BankErrorStyle,
  } = error;

  const checkErrors = () => {
    if (!FrmCmpnyIdChecker) {
      setError({
        ...error,
        FrmCmpnyErrorStyle: { color: "#F00" },
      });
      return false;
    }
    if (!BankIdChecker) {
      setError({
        ...error,
        BankErrorStyle: { color: "#F00" },
      });
      return false;
    }
    if (!paymentmodeIdChecker) {
      setError({
        ...error,
        paymentmodeIdErrorStyle: { color: "#F00" },
      });
      return false;
    }
    return true;
  };

  const [startinvoiceDate, setinvoiceDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const onDateChange = (e) => {
    setinvoiceDate(e.target.value);
  };

  //add staff start
  const [addData, setFormDatas] = useState({
    itemName: "",
    GST: "",
    rate: "",
    qty: 1,
    amt: "",
    CGST: "",
    SGST: "",
    IGST: "",
    totalAmt: "",
    discount: "",
    grandTotal: "",
    desc: "",
  });

  const {
    itemName,
    GST,
    rate,
    qty,
    amt,
    CGST,
    SGST,
    IGST,
    totalAmt,
    discount,
    grandTotal,
    desc,
  } = addData;

  const [AddedDetails, AddDetails] = useState([]);
  const [amount, setAmount] = useState();

  const onAdd = (e) => {
    const staffList = AddedDetails.filter(
      (AddDetails) => AddDetails.itemName === itemName
    );

    e.preventDefault();
    if (staffList.length === 0) {
      // if (checkErrorscontact()) {
      const addData = {
        itemName: itemName,
        GST: GST,
        rate: rate,
        qty: qty,
        amt: qty * rate,
        SGST: SGST,
        CGST: CGST,
        IGST: IGST,
        totalAmt:
          Number(qty * rate) +
          (Number(qty * rate) * Number(GST)) / 100 +
          (Number(qty * rate) * Number(SGST)) / 100 +
          (Number(qty * rate) * Number(CGST)) / 100 +
          (Number(qty * rate) * Number(IGST)) / 100,
        discount: discount,
        grandTotal:
          Number(qty * rate) +
          (Number(qty * rate) * Number(GST)) / 100 +
          (Number(qty * rate) * Number(SGST)) / 100 +
          (Number(qty * rate) * Number(CGST)) / 100 +
          (Number(qty * rate) * Number(IGST)) / 100 -
          Number(discount),
        desc: desc,
      };
      setFormDatas({
        ...addData,
        itemName: "",
        GST: "",
        rate: "",
        qty: "",
        amt: "",
        CGST: "",
        SGST: "",
        IGST: "",
        totalAmt: "",
        discount: "",
        grandTotal: "",
        desc: "",
      });
      let temp = [];
      temp.push(...AddedDetails, addData);
      AddDetails(temp);
      // }
    }
  };
  const onRemoveChange = (itemName) => {
    const removeList = AddedDetails.filter(
      (AddDetails) => AddDetails.itemName !== itemName
    );
    AddDetails(removeList);
  };
  //add staff end

  const onSubmit = (e) => {
    e.preventDefault();
    if (checkErrors()) {
      const finalData = {
        clientId: sctDataVal ? sctDataVal._id : "",
        clientName: sctCompanyName,
        invoiceNo: invoiceNo,
        invoiceDate: startinvoiceDate,
        clientFromId: sctClientAssignedToId,
        clientFrom: sctClientAssignedToName,
        companyId: companyid,
        companyName: companyname,
        companyAddress: companyaddress,
        forName: sctCompanyName,
        forAddress: sctClientAddress,
        clientEnteredById: user._id,
        modeOfPayment: modeOfPayment.value ? modeOfPayment.value : null,
        item: AddedDetails,
        bank:
          selectedBank && selectedBank.bankData ? selectedBank.bankData : null,
        invoiceEnteredById: user._id,
        invoiceEnteredByDateTime: new Date().toLocaleString("en-GB"),
      };
      saveInvoice(finalData);
      setFormData({
        ...formData,
        sctClientAssignedToName: "",
        sctCompanyName: "",
        sctClientAddress: "",
        invoiceNo: "",
        companyName: "",
        companyaddress: "",
        startinvoiceDate: "",
        isSubmitted: true,
      });
    }
  };

  const onInputChange1 = (e) => {
    setFormDatas({ ...addData, [e.target.name]: e.target.value });
  };

  // if (isSubmitted) {
  //   return <Redirect to="/all-clients" />;
  // }

  if (!data) {
    return <Redirect to="/all-engaged-clients" />;
  }
  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      {" "}
      <div className="container container_align">
        <form className="row" onSubmit={(e) => onSubmit(e)}>
          <div className="row col-lg-12 col-md-11 col-sm-12 col-12">
            <div className=" col-lg-4 col-md-11 col-sm-10 col-10">
              <h5 className="heading_color"> Invoice </h5>
            </div>

            <div className="col-lg-8 col-md-11 col-sm-12 col-12 py-2">
              <Link
                className="btn btn_green_bg float-right"
                to="/all-engaged-clients"
              >
                Back
              </Link>
            </div>
          </div>
          <hr />

          <div className="col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="row card-new ">
              <div className="col-lg-4 col-md-6 col-sm-6 col-12 py-2">
                <label className="label-control">Invoice No:</label>
                <input
                  type="text"
                  name="invoiceNo"
                  value={invoiceNo}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6 col-12 py-2">
                <label className="label-control">Invoice Date :</label>
                <input
                  type="date"
                  placeholder="dd/mm/yyyy"
                  className="form-control cpp-input datevalidation"
                  name="invoiceDate"
                  value={startinvoiceDate}
                  onChange={(e) => onDateChange(e)}
                  style={{
                    width: "100%",
                  }}
                  required
                />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6 col-12 py-2">
                <label className="label-control">Client From :</label>
                <input
                  type="text"
                  name="sctClientAssignedToName"
                  value={sctClientAssignedToName}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  disabled
                />
              </div>
              <br />
              <div className="row card-new col-lg-12 col-md-11 col-sm-12 col-12 ">
                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                  <label className="label-control" style={FrmCmpnyErrorStyle}>
                    From* :
                  </label>
                  <Select
                    name="companyName"
                    options={allcompanydata}
                    isSearchable={true}
                    value={company}
                    placeholder="Select Company"
                    onChange={(e) => onCompanyChange(e)}
                    theme={(theme) => ({
                      ...theme,
                      height: 26,
                      minHeight: 26,
                      borderRadius: 1,
                      colors: {
                        ...theme.colors,
                        primary: "black",
                      },
                    })}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                  <label className="label-control">For :</label>
                  <input
                    type="text"
                    name="sctCompanyName"
                    value={sctCompanyName}
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                  />
                </div>

                <div className="col-lg-6 col-md-6 col-sm-6 col-12  py-2">
                  <textarea
                    name="companyaddress"
                    id="companyaddress"
                    className="textarea form-control"
                    rows="5"
                    placeholder="From Address"
                    style={{ width: "100%" }}
                    value={companyaddress}
                    onChange={(e) => onInputChange(e)}
                  ></textarea>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-12  py-2">
                  <textarea
                    name="sctClientAddress"
                    id="sctClientAddress"
                    className="textarea form-control"
                    rows="5"
                    placeholder="To Address"
                    style={{ width: "100%" }}
                    value={sctClientAddress}
                    onChange={(e) => onInputChange(e)}
                  ></textarea>
                </div>
              </div>
              <div className="row card-new col-lg-12 col-md-11 col-sm-12 col-12 py-2">
                <div className="col-lg-6 col-md-6 col-sm-6 col-12 ">
                  <label style={BankErrorStyle}>Bank :</label>

                  <Select
                    name="selBank"
                    options={allcompanyBank}
                    isSearchable={true}
                    value={selectedBank}
                    placeholder="Select Bank"
                    onChange={(e) => onBankChange(e)}
                  />
                </div>
                <div className="col-lg-6 col-md-11 col-sm-12 col-12 ">
                  <label style={paymentmodeIdErrorStyle}>Payment Mode:</label>
                  <Select
                    name="modeOfPayment"
                    isSearchable={true}
                    options={paymentTypeVal}
                    value={modeOfPayment}
                    placeholder="Select"
                    onChange={(e) => onPaymentModeChange(e)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 col-12 ">
            <div className="row card-new ">
              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                <h5>Item Info</h5>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                <label>Item :</label>
                <input
                  type="text"
                  name="itemName"
                  value={itemName}
                  className="form-control"
                  onChange={(e) => onInputChange1(e)}
                />
              </div>

              <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                <label>Qty :</label>
                <input
                  type="text"
                  name="qty"
                  value={qty}
                  className="form-control"
                  onChange={(e) => onInputChange1(e)}
                />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                <label>Rate :</label>
                <input
                  type="text"
                  name="rate"
                  value={rate}
                  className="form-control"
                  onChange={(e) => onInputChange1(e)}
                />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                <label>Amount :</label>
                <input
                  type="text"
                  name="amt"
                  value={qty * rate}
                  className="form-control"
                  onChange={(e) => onInputChange1(e)}
                  disabled
                />
              </div>
              {showGSTSection && (
                <>
                  <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                    <label className="label-control">GST :</label>
                    <input
                      type="text"
                      name="GST"
                      value={GST}
                      className="form-control"
                      onChange={(e) => onInputChange1(e)}
                    />
                  </div>

                  <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                    <label className="label-control">CGST :</label>
                    <input
                      type="text"
                      name="CGST"
                      value={CGST}
                      className="form-control"
                      onChange={(e) => onInputChange1(e)}
                    />
                  </div>

                  <div className="col-lg-2 col-md-6 col-sm-6 col-12 ">
                    <label className="label-control">SGST :</label>
                    <input
                      type="text"
                      name="SGST"
                      value={SGST}
                      className="form-control"
                      onChange={(e) => onInputChange1(e)}
                    />
                  </div>
                  <div className="col-lg-2 col-md-6 col-sm-6 col-12 ">
                    <label className="label-control">IGST :</label>
                    <input
                      type="text"
                      name="IGST"
                      value={IGST}
                      className="form-control"
                      onChange={(e) => onInputChange1(e)}
                    />
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6 col-12 ">
                    <label className="label-control">Total Amount :</label>
                    <input
                      type="text"
                      name="totalAmt"
                      value={
                        Number(qty * rate) +
                        (Number(qty * rate) * Number(GST)) / 100 +
                        (Number(qty * rate) * Number(SGST)) / 100 +
                        (Number(qty * rate) * Number(CGST)) / 100 +
                        (Number(qty * rate) * Number(IGST)) / 100
                      }
                      className="form-control"
                      onChange={(e) => onInputChange1(e)}
                      disabled
                    />
                  </div>
                </>
              )}
              <div className="col-lg-3 col-md-6 col-sm-6 col-12 ">
                <label className="label-control">Discount :</label>
                <input
                  type="text"
                  name="discount"
                  value={discount}
                  className="form-control"
                  onChange={(e) => onInputChange1(e)}
                />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col-12 ">
                <label className="label-control">Grand Total :</label>
                <input
                  type="text"
                  name="grandTotal"
                  value={
                    Number(qty * rate) +
                    (Number(qty * rate) * Number(GST)) / 100 +
                    (Number(qty * rate) * Number(SGST)) / 100 +
                    (Number(qty * rate) * Number(CGST)) / 100 +
                    (Number(qty * rate) * Number(IGST)) / 100 -
                    Number(discount)
                  }
                  className="form-control"
                  onChange={(e) => onInputChange1(e)}
                />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-12 ">
                <label className="label-control">Description :</label>

                <textarea
                  name="desc"
                  id="desc"
                  className="textarea form-control"
                  rows="3"
                  placeholder="Description"
                  style={{ width: "100%" }}
                  value={desc}
                  onChange={(e) => onInputChange1(e)}
                ></textarea>
              </div>
              <div className="col-lg-12 col-md-6 col-sm-6 col-12">
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
                    <th>Item Name</th>
                    <th>Rate</th>
                    <th>Qty</th>
                    <th>Amount</th>
                    {showGSTSection && (
                      <>
                        <th>GST</th>
                        <th>CGST</th>
                        <th>SGST</th>
                        <th>IGST</th>
                        <th>Total Amt</th>
                      </>
                    )}
                    <th>Discount</th>
                    <th>Grand Total</th>
                    <th>Description</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {AddedDetails &&
                    AddedDetails.map((AddDetail, idx) => {
                      return (
                        <tr key={idx}>
                          <td>{AddDetail.itemName}</td>
                          <td>{AddDetail.rate}</td>
                          <td>{AddDetail.qty}</td>
                          <td>{AddDetail.amt}</td>
                          {showGSTSection && (
                            <>
                              <td>{AddDetail.GST}</td>
                              <td>{AddDetail.CGST}</td>
                              <td>{AddDetail.SGST}</td>
                              <td>{AddDetail.IGST}</td>
                              <td>{AddDetail.totalAmt}</td>
                            </>
                          )}
                          <td>{AddDetail.discount}</td>
                          <td>{AddDetail.grandTotal}</td>
                          <td>{AddDetail.desc}</td>

                          <td>
                            <img
                              className="img_icon_size log"
                              onClick={() => onRemoveChange(AddDetail.itemName)}
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
                <>
                  {isSubmitted ? (
                    <Link
                      className="btn sub_form btn_continue blackbrd  Save float-right"
                      style={{ backgroundColor: "#007bff", color: "white" }}
                      to={{
                        pathname: "/generate-Invoice-Pdf-Print",
                        data: {
                          data,
                        },
                      }}
                    >
                      Print
                    </Link>
                  ) : (
                    <>
                      <input
                        type="submit"
                        name="Submit"
                        value="Submit"
                        className="btn sub_form btn_continue blackbrd Save float-right"
                      />
                    </>
                  )}
                </>
              )}
              <Link
                className="btn sub_form btn_continue blackbrd float-right"
                to="/all-engaged-clients"
              >
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

GenerateInvoice.propTypes = {
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  settings: state.settings,
  sct: state.sct,
});

export default connect(mapStateToProps, {
  saveInvoice,
  getALLCompanyDetails,
})(GenerateInvoice);
