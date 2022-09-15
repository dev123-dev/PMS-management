import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import { Link, useHistory } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { getALLCompanyDetails } from "../../actions/settings";
import { savePurchaseOrder } from "../../actions/sct";
import { Redirect } from "react-router-dom";
import SctQuotationpdfprint from "./SctQuotationpdfprint";
import AllDesignation from "../department/AllDesignation";

const GeneratePo = ({
  auth: { isAuthenticated, user, users, loading },
  settings: { allCompanyDetails },
  sct: { activeClient },

  savePurchaseOrder,
  getALLCompanyDetails,
}) => {
  const data = useHistory().location.data;
  useEffect(() => {
    getALLCompanyDetails();
  }, [getALLCompanyDetails]);

  //formData
  const [formData, setFormData] = useState({
    sctClientName:
      data && data.sctdata && data.sctdata.sctClientName
        ? data.sctdata.sctClientName
        : "",

    sctClientAddress:
      data && data.sctdata && data.sctdata.sctClientAddress
        ? data.sctdata.sctClientAddress
        : "",

    sctCompanyName:
      data && data.sctdata && data.sctdata.sctCompanyName
        ? data.sctdata.sctCompanyName
        : "",
    sctClientAssignedToName:
      data && data.sctdata && data.sctdata.sctClientAssignedToName
        ? data.sctdata.sctClientAssignedToName
        : "",
    sctClientAssignedToId:
      data && data.sctdata && data.sctdata.sctClientAssignedToId
        ? data.sctdata.sctClientAssignedToId
        : "",
    other: "",
    tax: "",
    shipping: "",
    PONo: "",
    quotationDate: "",
    workDesc: "",
    isSubmitted: false,
  });

  const {
    PONo,
    sctClientName,
    sctClientAssignedToId,
    sctCompanyName,
    sctClientAssignedToName,
    sctClientAddress,
    other,
    tax,
    shipping,
    // amount,
    workDesc,
    isSubmitted,
  } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const allcompanydata = [];
  allCompanyDetails.map((company) =>
    allcompanydata.push({
      companyaddress: company.companyAddress,
      companyid: company._id,
      label: company.companyName,
      value: company.companyName,
    })
  );
  const [companyaddress, setcompanyaddressData] = useState("");

  const [company, getcompanyData] = useState("");
  const [companyid, setcompanyId] = useState("");
  const [companyname, setcompanyname] = useState("");

  const onCompanyChange = (e) => {
    // //Required Validation starts
    // setError({
    //   ...error,
    //   paymentmodeIdChecker: true,
    //   paymentmodeIdErrorStyle: { color: "#000" },
    // });
    // //Required Validation ends

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
    paymentmodeIdChecker: false,
    paymentmodeIdErrorStyle: {},
    clienttypeIdChecker: false,

    clienttypeIdErrorStyle: {},
  });
  const {
    paymentmodeIdChecker,
    paymentmodeIdErrorStyle,
    clienttypeIdChecker,
    clienttypeIdErrorStyle,
  } = error;

  const checkErrors = () => {
    if (!clienttypeIdChecker) {
      setError({
        ...error,
        clienttypeIdErrorStyle: { color: "#F00" },
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
  const [PODate, setPODate] = useState(new Date().toISOString().split("T")[0]);
  const onDateChange = (e) => {
    setPODate(e.target.value);
  };

  const onInputChange1 = (e) => {
    setFormDatas({ ...addData, [e.target.name]: e.target.value });
  };

  const [addData, setFormDatas] = useState({
    itemName: "",
    itemPrice: "",
    itemOty: 1,
    itemTotal: "",
    itemDesc: "",
  });

  const { itemName, itemPrice, itemOty, itemDesc } = addData;

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
        itemPrice: itemPrice,
        itemOty: itemOty,
        itemTotal: itemOty * itemPrice,
        itemDesc: itemDesc,
      };
      setFormDatas({
        ...addData,
        itemName: "",
        itemPrice: "",
        itemOty: "",
        itemTotal: "",
        itemDesc: "",
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
    // if (checkErrors()) {
    const finalData = {
      clientId: data && data.sctdata ? data && data.sctdata._id : "",
      clientName: sctCompanyName,
      PONo: PONo,
      PODate: PODate,
      clientFromId: sctClientAssignedToId,
      clientFrom: sctClientAssignedToName,
      companyId: companyid,
      companyName: companyname,
      companyAddress: companyaddress,
      forName: sctCompanyName,
      forAddress: sctClientAddress,
      workDesc: workDesc,
      other: other,
      tax: tax,
      shipping: shipping,
      item: AddedDetails,
      POEnteredById: user._id,
      POEnteredByDateTime: new Date().toLocaleString("en-GB"),
    };
    savePurchaseOrder(finalData);
    setFinalDataVal(finalData);
    setFormData({
      ...formData,
      sctClientAssignedToName: "",
      sctCompanyName: "",
      sctClientAddress: "",
      PONo: "",
      companyName: "",
      companyaddress: "",
      PODate: "",
      other: "",
      tax: "",
      shipping: "",
      workDesc: "",
      isSubmitted: true,
    });
  };
  let totSubTot = 0;
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
              <h5 className="heading_color"> Purchase Order Request </h5>
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
              <div className="col-lg-4 col-md-6 col-sm-6 col-12 ">
                <label className="label-control">Purchase Order No:</label>
                <input
                  type="text"
                  name="PONo"
                  value={PONo}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6 col-12 ">
                <label className="label-control">Purchase Order Date :</label>
                <input
                  type="date"
                  placeholder="dd/mm/yyyy"
                  className="form-control cpp-input datevalidation"
                  name="quotationDate"
                  value={PODate}
                  onChange={(e) => onDateChange(e)}
                  style={{
                    width: "100%",
                  }}
                  required
                />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6 col-12 ">
                <label className="label-control">Client From :</label>
                <input
                  type="text"
                  name="sctClientAssignedToName"
                  value={sctClientAssignedToName}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>

              <div className="col-lg-12 col-md-6 col-sm-6 col-12 py-2">
                <label>Work Discription :</label>
                <textarea
                  name="workDesc"
                  id="workDesc"
                  className="textarea form-control"
                  rows="2"
                  style={{ width: "100%" }}
                  value={workDesc}
                  onChange={(e) => onInputChange(e)}
                ></textarea>
              </div>
              <br />
              <div className="row card-new col-lg-12 col-md-11 col-sm-12 col-12 ">
                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                  <label className="label-control">From* :</label>
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
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 col-12 ">
            <div className="row  card-new col-lg-12 col-md-12 col-sm-12 col-12">
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

              <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                <label>Qty :</label>
                <input
                  type="text"
                  name="itemOty"
                  value={itemOty}
                  className="form-control"
                  onChange={(e) => onInputChange1(e)}
                />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                <label>Rate :</label>
                <input
                  type="text"
                  name="itemPrice"
                  value={itemPrice}
                  className="form-control"
                  onChange={(e) => onInputChange1(e)}
                />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                <label className="label-control">Amount :</label>
                <input
                  type="text"
                  name="itemTotal"
                  value={itemOty * itemPrice}
                  className="form-control"
                  onChange={(e) => onInputChange1(e)}
                  disabled
                />
              </div>

              <div className="col-lg-8 col-md-6 col-sm-6 col-12 ">
                <label className="label-control">Discription :</label>

                <textarea
                  name="itemDesc"
                  id="itemDesc"
                  className="textarea form-control"
                  rows="3"
                  placeholder="Discription"
                  style={{ width: "100%" }}
                  value={itemDesc}
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
            <div className="row  card-new  col-lg-12 col-md-12 col-sm-12 col-12 py-2">
              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                <h5>Others</h5>
              </div>

              <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                <label>Tax :</label>
                <input
                  type="text"
                  name="tax"
                  value={tax}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>

              <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                <label>Shipping:</label>
                <input
                  type="text"
                  name="shipping"
                  value={shipping}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>

              <div className="col-lg-4 col-md-6 col-sm-6 col-12 ">
                <label>Other :</label>
                <input
                  type="text"
                  name="other"
                  value={other}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
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
                    <th>Description</th>
                    <th>Rate</th>
                    <th>Qty</th>
                    <th>Total Amount</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {AddedDetails &&
                    AddedDetails.map((AddDetail, idx) => {
                      totSubTot += Number(AddDetail.itemTotal);
                      return (
                        <tr key={idx}>
                          <td>{AddDetail.itemName}</td>
                          <td>{AddDetail.itemDesc}</td>
                          <td>{AddDetail.itemPrice}</td>
                          <td>{AddDetail.itemOty}</td>
                          <td>{AddDetail.itemTotal}</td>
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
                  <tr>
                    <td colSpan={4}>
                      <b>
                        <span className="float-right">Sub Total</span>
                      </b>
                    </td>
                    <td>
                      <b>{totSubTot}</b>
                    </td>
                    <td></td>
                  </tr>
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
                        pathname: "/print-PO-pdf",
                        data: {
                          data,
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

GeneratePo.propTypes = {
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  settings: state.settings,
  sct: state.sct,
});

export default connect(mapStateToProps, {
  savePurchaseOrder,
  getALLCompanyDetails,
})(GeneratePo);
