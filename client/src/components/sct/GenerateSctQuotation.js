import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import { Link, useHistory } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { getALLCompanyDetails } from "../../actions/settings";
import { saveQuotation } from "../../actions/sct";
import { Redirect } from "react-router-dom";

const GenerateSctQuotation = ({
  auth: { isAuthenticated, user, users, loading },
  settings: { allCompanyDetails },
  sct: { activeClient },
  saveQuotation,
  getALLCompanyDetails,
}) => {
  const data = useHistory().location.data;
  let sctDataVal = data && data.sctdata;

  useEffect(() => {
    getALLCompanyDetails();
  }, [getALLCompanyDetails]);

  //formData
  const [formData, setFormData] = useState({
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

    quotationNo: "",
    quotationDate: "",
    isSubmitted: false,
  });

  const {
    quotationNo,
    sctClientAssignedToId,
    sctCompanyName,
    sctClientAssignedToName,
    sctClientAddress,

    isSubmitted,
  } = formData;

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
      companyType: company.companyType,
      companyid: company._id,
      label: company.companyName,
      value: company.companyName,
    })
  );
  const [companyaddress, setcompanyaddressData] = useState("");

  const [company, getcompanyData] = useState("");
  const [companyid, setcompanyId] = useState("");
  const [companyname, setcompanyname] = useState("");
  const [companyType, setcompanyType] = useState("");
  const onCompanyChange = (e) => {
    // //Required Validation starts
    setError({
      ...error,
      FrmCmpnyIdChecker: true,
      FrmCmpnyErrorStyle: { color: "#000" },
    });
    // //Required Validation ends
    if (e.value === "Domestic") {
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

    var companyid = "";
    var companyname = "";
    var companyaddress = "";
    getcompanyData(e);
    companyid = e.companyid;
    companyname = e.value;
    companyaddress = e.companyaddress;
    setcompanyId(companyid);
    setcompanyname(companyname);
    setcompanyaddressData(companyaddress);
  };

  //Required Validation Starts
  const [error, setError] = useState({
    FrmCmpnyErrorStyle: {},
    FrmCmpnyIdChecker: false,
    // paymentmodeIdChecker: false,
    // paymentmodeIdErrorStyle: {},
    // clienttypeIdChecker: false,

    // clienttypeIdErrorStyle: {},
  });
  const {
    FrmCmpnyErrorStyle,
    FrmCmpnyIdChecker,
    // paymentmodeIdChecker,
    // paymentmodeIdErrorStyle,
    // clienttypeIdChecker,
    // clienttypeIdErrorStyle,
  } = error;

  const checkErrors = () => {
    if (!FrmCmpnyIdChecker) {
      setError({
        ...error,
        FrmCmpnyErrorStyle: { color: "#F00" },
      });
      return false;
    }
    // if (!paymentmodeIdChecker) {
    //   setError({
    //     ...error,
    //     paymentmodeIdErrorStyle: { color: "#F00" },
    //   });
    //   return false;
    // }

    return true;
  };
  const [startquotationDate, setquotationDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const onDateChange = (e) => {
    setquotationDate(e.target.value);
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
      // setstaffCountryCode("");
      // getstaffcountryData("");
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
  const [finalDataVal, setFinalDataVal] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (checkErrors()) {
      const finalData = {
        clientId: sctDataVal ? sctDataVal._id : "",
        quotationId:
          sctDataVal && sctDataVal.quotation && sctDataVal.quotation[0]
            ? sctDataVal.quotation[0]._id
            : null,
        quotationGenerated: sctDataVal ? sctDataVal.quotationGenerated : "",
        quotation: sctDataVal ? sctDataVal.quotation : null,
        clientName: sctCompanyName,
        quotationNo: quotationNo,
        quotationDate: startquotationDate,
        clientFromId: sctClientAssignedToId,
        clientFrom: sctClientAssignedToName,
        companyId: companyid,
        companyName: companyname,
        companyAddress: companyaddress,
        forName: sctCompanyName,
        forAddress: sctClientAddress,
        clientEnteredById: user._id,
        item: AddedDetails,
      };
      saveQuotation(finalData);
      localStorage.setItem("quotationDataLS", JSON.stringify(finalData));
      setFinalDataVal(finalData);
      setFormData({
        ...formData,
        sctClientAssignedToName: "",
        sctCompanyName: "",
        sctClientAddress: "",
        quotationNo: "",
        companyName: "",
        companyaddress: "",
        startquotationDate: "",
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
              <h5 className="heading_color"> Quotation </h5>
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
                <label className="label-control">Quotation No:</label>
                <input
                  type="text"
                  name="quotationNo"
                  value={quotationNo}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6 col-12 py-2">
                <label className="label-control">Quotation Date :</label>
                <input
                  type="date"
                  placeholder="dd/mm/yyyy"
                  className="form-control cpp-input datevalidation"
                  name="quotationDate"
                  value={startquotationDate}
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
                  required
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
                    required
                    disabled
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
                    required
                    disabled
                  ></textarea>
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
                  type="Number"
                  name="qty"
                  value={qty}
                  className="form-control"
                  onChange={(e) => onInputChange1(e)}
                  onKeyDown={(e) =>
                    (e.keyCode === 69 || e.keyCode === 190) &&
                    e.preventDefault()
                  }
                />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                <label>Rate :</label>
                <input
                  type="Number"
                  name="rate"
                  value={rate}
                  className="form-control"
                  onChange={(e) => onInputChange1(e)}
                  onKeyDown={(e) =>
                    (e.keyCode === 69 || e.keyCode === 190) &&
                    e.preventDefault()
                  }
                />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                <label>Amount :</label>
                <input
                  type="Number"
                  name="amt"
                  value={qty * rate}
                  className="form-control"
                  onChange={(e) => onInputChange1(e)}
                  onKeyDown={(e) =>
                    (e.keyCode === 69 || e.keyCode === 190) &&
                    e.preventDefault()
                  }
                />
              </div>
              {showGSTSection && (
                <>
                  <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                    <label className="label-control">GST :</label>
                    <input
                      type="Number"
                      name="GST"
                      value={GST}
                      className="form-control"
                      onChange={(e) => onInputChange1(e)}
                      onKeyDown={(e) =>
                        (e.keyCode === 69 || e.keyCode === 190) &&
                        e.preventDefault()
                      }
                    />
                  </div>

                  <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                    <label className="label-control">CGST :</label>
                    <input
                      type="Number"
                      name="CGST"
                      value={CGST}
                      className="form-control"
                      onChange={(e) => onInputChange1(e)}
                      onKeyDown={(e) =>
                        (e.keyCode === 69 || e.keyCode === 190) &&
                        e.preventDefault()
                      }
                    />
                  </div>

                  <div className="col-lg-2 col-md-6 col-sm-6 col-12 ">
                    <label className="label-control">SGST :</label>
                    <input
                      type="Number"
                      name="SGST"
                      value={SGST}
                      className="form-control"
                      onChange={(e) => onInputChange1(e)}
                      onKeyDown={(e) =>
                        (e.keyCode === 69 || e.keyCode === 190) &&
                        e.preventDefault()
                      }
                    />
                  </div>
                  <div className="col-lg-2 col-md-6 col-sm-6 col-12 ">
                    <label className="label-control">IGST :</label>
                    <input
                      type="Number"
                      name="IGST"
                      value={IGST}
                      className="form-control"
                      onChange={(e) => onInputChange1(e)}
                      onKeyDown={(e) =>
                        (e.keyCode === 69 || e.keyCode === 190) &&
                        e.preventDefault()
                      }
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
                  type="Number"
                  name="discount"
                  value={discount}
                  className="form-control"
                  onChange={(e) => onInputChange1(e)}
                  onKeyDown={(e) =>
                    (e.keyCode === 69 || e.keyCode === 190) &&
                    e.preventDefault()
                  }
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
                        pathname: "/print-pdf",
                        data: {
                          data,
                          quotationData: finalDataVal,
                        },
                      }}
                      target="_blank"
                    >
                      Print
                    </Link>
                  ) : (
                    <input
                      type="submit"
                      name="Submit"
                      value="Submit"
                      className="btn sub_form btn_continue blackbrd Save float-right"
                    />
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

GenerateSctQuotation.propTypes = {
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  settings: state.settings,
  sct: state.sct,
});

export default connect(mapStateToProps, {
  saveQuotation,
  getALLCompanyDetails,
})(GenerateSctQuotation);
