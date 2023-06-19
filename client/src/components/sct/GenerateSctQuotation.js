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
    clientFromEmailId: "",
    clientFromPhone: "",
    quotationDate: "",
    isSubmitted: false,
  });

  const {
    sctClientAssignedToId,
    sctCompanyName,
    sctClientAssignedToName,
    sctClientAddress,
    clientFromEmailId,
    clientFromPhone,
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
      abbreviation: company.abbreviation ? company.abbreviation : "",
      quotationNoCounter: company.quotationNoCounter,
      label: company.companyName,
      value: company.companyName,
    })
  );
  var currentQuotationNo = "",
    counter = "";
  var fiscalyearstart = "",
    fiscalyearend = "";

  const [quotNumber, setQuotNumber] = useState("");
  const [quotLoad, setQuotLoad] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleOnChange = () => {
    let change = !isChecked;
    setIsChecked(change);
    setFormDatas({
      ...addData,
      CGST: change ? GST / 2 : "",
      SGST: change ? GST / 2 : "",
      IGST: !change ? GST : "",
    });
  };

  const [companyaddress, setcompanyaddressData] = useState("");
  const [company, getcompanyData] = useState("");
  const [companyid, setcompanyId] = useState("");
  const [companyname, setcompanyname] = useState("");
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
    getcompanyData(e);
    setcompanyId(e.companyid ? e.companyid : "");
    setcompanyname(e.value ? e.value : "");
    setcompanyaddressData(e.companyaddress ? e.companyaddress : "");

    var today = new Date();
    if (today.getMonth() + 1 <= 3) {
      fiscalyearstart = today.getFullYear() - 1;
      fiscalyearend = today.getFullYear();
    } else {
      fiscalyearstart = today.getFullYear();
      fiscalyearend = today.getFullYear() + 1;
    }

    var counter = e.quotationNoCounter ? e.quotationNoCounter : 0;
    counter = counter + 1;
    currentQuotationNo =
      e.abbreviation +
      "/" +
      fiscalyearstart +
      "-" +
      fiscalyearend +
      "/" +
      counter;
    setQuotNumber(currentQuotationNo);
  };

  const [error, setError] = useState({
    FrmCmpnyErrorStyle: {},
    FrmCmpnyIdChecker: false,
  });
  const { FrmCmpnyErrorStyle, FrmCmpnyIdChecker } = error;

  const checkErrors = () => {
    if (!FrmCmpnyIdChecker) {
      setError({
        ...error,
        FrmCmpnyErrorStyle: { color: "#F00" },
      });
      return false;
    }

    return true;
  };
  const [startquotationDate, setquotationDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const onDateChange = (e) => {
    setquotationDate(e.target.value);
  };

  if (
    sctDataVal &&
    sctDataVal.quotationGenerated === 1 &&
    sctDataVal.quotation &&
    sctDataVal.quotation[0] &&
    !quotLoad &&
    allcompanydata
  ) {
    let quot = sctDataVal.quotation[0];
    setQuotNumber(quot.quotationNo);
    let quotComp = quot
      ? allcompanydata &&
        allcompanydata.filter((x) => x.companyid === quot.companyId)[0]
      : "";
    getcompanyData(quotComp);
    setcompanyId(quotComp.companyid ? quotComp.companyid : "");
    setcompanyname(quotComp.value ? quotComp.value : "");
    setcompanyaddressData(
      quotComp.companyaddress ? quotComp.companyaddress : ""
    );
    setIsChecked(quot.insideState ? quot.insideState : false);
    setError({
      ...error,
      FrmCmpnyIdChecker: true,
    });
    setQuotLoad(true);
    setFormData({
      ...formData,
      clientFromEmailId: quot.clientFromEmailId,
      clientFromPhone: quot.clientFromPhone,
    });
  }

  //add staff start
  const [addData, setFormDatas] = useState({
    itemName: "",
    GST: "",
    rate: "",
    qty: 1,
    CGST: "",
    SGST: "",
    IGST: "",
    totalAmt: "",
    discount: "",
    grandTotal: "",
    desc: "",
  });

  const { itemName, GST, rate, qty, CGST, SGST, IGST, discount, desc } =
    addData;

  const [AddedDetails, AddDetails] = useState([]);

  const onAdd = (e) => {
    if (itemName) {
      const staffList = AddedDetails.filter(
        (AddDetails) => AddDetails.itemName === itemName
      );
      e.preventDefault();
      if (staffList.length === 0) {
        // if (checkErrorscontact()) {
        const addData = {
          itemName: itemName,
          GST: Math.round(
            (qty *
              (rate / parseFloat("1." + ("0" + GST).slice(-2))).toFixed(2) *
              GST) /
              100
          ),
          GSTPer: GST,
          rate: rate,
          baseRate: (rate / parseFloat("1." + ("0" + GST).slice(-2))).toFixed(
            2
          ),
          qty: qty,
          amt: Math.round(
            qty * (rate / parseFloat("1." + ("0" + GST).slice(-2))).toFixed(2)
          ),
          SGST: Math.round(
            (qty *
              (rate / parseFloat("1." + ("0" + GST).slice(-2))).toFixed(2) *
              SGST) /
              100
          ),
          CGST: Math.round(
            (qty *
              (rate / parseFloat("1." + ("0" + GST).slice(-2))).toFixed(2) *
              CGST) /
              100
          ),
          IGST: Math.round(
            (qty *
              (rate / parseFloat("1." + ("0" + GST).slice(-2))).toFixed(2) *
              IGST) /
              100
          ),
          totalAmt: Math.round(
            Number(
              qty * (rate / parseFloat("1." + ("0" + GST).slice(-2))).toFixed(2)
            ) +
              (Number(
                qty *
                  (rate / parseFloat("1." + ("0" + GST).slice(-2))).toFixed(2)
              ) *
                Number(GST)) /
                100
          ),
          discount: discount,
          grandTotal: Math.round(
            Number(
              qty * (rate / parseFloat("1." + ("0" + GST).slice(-2))).toFixed(2)
            ) +
              (Number(
                qty *
                  (rate / parseFloat("1." + ("0" + GST).slice(-2))).toFixed(2)
              ) *
                Number(GST)) /
                100 -
              Number(discount)
          ),
          desc: desc,
        };
        setFormDatas({
          ...addData,
          itemName: "",
          GST: "",
          rate: "",
          baseRate: "",
          qty: "",
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
    let billingStatusCategory = sctDataVal.billingStatusCategory,
      billingStatus = sctDataVal.billingStatus;
    if (
      sctDataVal &&
      sctDataVal.billingStatusCategory !== "PO" &&
      sctDataVal.billingStatusCategory !== "Invoice"
    ) {
      if (sctDataVal.quotationGenerated === 0) billingStatus = "Quotation";
      else billingStatus = "RevisedQuotation";
      billingStatusCategory = "Quotation";
    }

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
        clientFromEmailId: clientFromEmailId,
        clientFromPhone: clientFromPhone,
        quotationNo: quotNumber ? quotNumber : "",
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
        quotationEnteredByDateTime: new Date().toLocaleString("en-GB"),
        billingStatusCategory: billingStatusCategory,
        billingStatus: billingStatus,
        counter: counter,
        insideState: isChecked,
      };
      saveQuotation(finalData);
      localStorage.setItem("quotationDataLS", JSON.stringify(finalData));
      setFinalDataVal(finalData);
      setFormData({
        ...formData,
        sctClientAssignedToName: "",
        sctCompanyName: "",
        sctClientAddress: "",
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

  const onGstChange = (e) => {
    if (e.target.name === "GST") {
      setFormDatas({
        ...addData,
        CGST: isChecked ? GST / 2 : "",
        SGST: isChecked ? GST / 2 : "",
        IGST: !isChecked ? GST : "",
      });
    }
  };

  if (!data) {
    return <Redirect to="/all-sct-documents" />;
  }
  return !isAuthenticated || !user ? (
    <Spinner />
  ) : (
    <Fragment>
      {" "}
      <div className="container container_align">
        <form className="row" onSubmit={(e) => onSubmit(e)}>
          <div className="row col-lg-12 col-md-11 col-sm-12 col-12">
            <div className=" col-lg-4 col-md-11 col-sm-10 col-10">
              <h5 className="heading_color">
                {" "}
                {sctDataVal.quotationGenerated && "Revised "}Quotation{" "}
              </h5>
            </div>

            <div className="col-lg-8 col-md-11 col-sm-12 col-12 py-2">
              <Link
                className="btn btn_green_bg float-right"
                to="/all-sct-documents"
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
                  value={quotNumber ? quotNumber : ""}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  required
                  disabled
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
              <div className="col-lg-5 col-md-6 col-sm-6 col-12 py-2">
                <label>Contact Email :</label>
                <input
                  type="text"
                  name="clientFromEmailId"
                  value={clientFromEmailId}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>
              <div className="col-lg-5 col-md-6 col-sm-6 col-12 py-2">
                <label>Contact Phone :</label>
                <input
                  type="text"
                  name="clientFromPhone"
                  value={clientFromPhone}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
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
                <div className="col-lg-6 col-md-6 col-sm-6 col-12 pb-3"></div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-12 pb-3">
                  Inside Karnataka{" "}
                  <input
                    type="checkbox"
                    id="insideState"
                    checked={isChecked}
                    onChange={handleOnChange}
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
              <div className="col-lg-2 col-md-6 col-sm-6 col-12">
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
              <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                <label>Base Rate :</label>
                <input
                  type="Number"
                  name="baseRate"
                  value={(
                    rate / parseFloat("1." + ("0" + GST).slice(-2))
                  ).toFixed(2)}
                  className="form-control"
                  onChange={(e) => onInputChange1(e)}
                  onKeyDown={(e) =>
                    (e.keyCode === 69 || e.keyCode === 190) &&
                    e.preventDefault()
                  }
                  disabled
                />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                <label className="label-control">Amount :</label>
                <input
                  type="Number"
                  name="amt"
                  value={Math.round(
                    qty *
                      (rate / parseFloat("1." + ("0" + GST).slice(-2))).toFixed(
                        2
                      )
                  )}
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
                    <label className="label-control">GST % :</label>
                    <input
                      type="Number"
                      name="GST"
                      value={GST}
                      className="form-control"
                      onChange={(e) => onInputChange1(e)}
                      onKeyUp={(e) => onGstChange(e)}
                    />
                  </div>

                  <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                    <label className="label-control">CGST % :</label>
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
                      disabled
                    />
                  </div>

                  <div className="col-lg-2 col-md-6 col-sm-6 col-12 ">
                    <label className="label-control">SGST % :</label>
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
                      disabled
                    />
                  </div>
                  <div className="col-lg-2 col-md-6 col-sm-6 col-12 ">
                    <label className="label-control">IGST % :</label>
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
                      disabled
                    />
                  </div>

                  <div className="col-lg-4 col-md-6 col-sm-6 col-12 ">
                    <label className="label-control">Total Amount :</label>
                    <input
                      type="text"
                      name="totalAmt"
                      value={Math.round(
                        Number(
                          qty *
                            (
                              rate / parseFloat("1." + ("0" + GST).slice(-2))
                            ).toFixed(2)
                        ) +
                          (Number(
                            qty *
                              (
                                rate / parseFloat("1." + ("0" + GST).slice(-2))
                              ).toFixed(2)
                          ) *
                            Number(GST)) /
                            100
                      )}
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
                  value={Math.round(
                    Number(
                      qty *
                        (
                          rate / parseFloat("1." + ("0" + GST).slice(-2))
                        ).toFixed(2)
                    ) +
                      (Number(
                        qty *
                          (
                            rate / parseFloat("1." + ("0" + GST).slice(-2))
                          ).toFixed(2)
                      ) *
                        Number(GST)) /
                        100 -
                      Number(discount)
                  )}
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
                    <th>Base Rate</th>
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
                          <td>{AddDetail.baseRate}</td>
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
                        pathname: "/print-Normal-Quotation-pdf",
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
                to="/all-sct-documents"
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
