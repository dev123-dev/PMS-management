import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Fragment } from "react";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Select from "react-select";
import {
  getEnquiryDetails,
  editEnquiryDetails,
  getUnresolvedData,
} from "../../actions/sct";

const EditEnquiry = ({
  auth: { isAuthenticated, user, users },
  EnquiryData,
  closeedit,
  sct: { allEntity },
  getEnquiryDetails,
  editEnquiryDetails,
  getUnresolvedData,
}) => {
  const [formData, setFormData] = useState({
    clientName: EnquiryData.clientName,
    clientEmailId: EnquiryData.clientEmailId,
    enquiryTo: EnquiryData.enquiryTo,
    estimatedERD: EnquiryData.estimatedERD,

    enquiryStatus: EnquiryData.enquiryStatus,
    radiodata: EnquiryData.enquiryType,
    enquiryNotes: EnquiryData.enquiryNotes,
  });

  // const [checkDCT,setcheckDCT]=useState("")
  // const [checkSCT,setcheckSCT]=useState("")
  //   useEffect(()=>{
  //     if(EnquiryData.enquiryType==="DCT"){
  //       setcheckDCT("true")
  //       console.log("inside")
  //   }
  //   else
  //   {console.log("else")
  //       setcheckSCT("true")

  //   }
  //   },[])

  const [estimatedDate, setEstimatedDate] = useState(
    EnquiryData.estimatedERD
      ? new Date(EnquiryData.estimatedERD).toISOString().split("T")[0]
      : ""
  );

  const onEstimatedDatechange = (e) => {
    setEstimatedDate(e.target.value);
  };

  const {
    clientName,
    clientEmailId,
    enquiryTo,
    radiodata,
    estimatedERD,
    enquiryStatus,
    enquiryType,
    enquiryNotes,
  } = formData;
  const onEnquiryChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log("EnquiryData", EnquiryData);
  const [radio, setradio] = useState(EnquiryData.enquiryType);

  const onRadioSelect = (radiodata) => {
    console.log("radiodata inside", radiodata);
    if (radiodata === "SCT") {
      setFormData({
        ...formData,
        radiodata: "SCT",
      });
    } else if (radiodata === "DCT") {
      setFormData({
        ...formData,

        radiodata: "DCT",
      });
    }
    setradio(radiodata);
  };

  // on submit
  const onUpdate = (e) => {
    e.preventDefault();
    const finalData = {
      _id: EnquiryData._id,
      clientName: clientName,
      clientEmailId: clientEmailId,
      enquiryTo: enquiryTo,
      estimatedERD: estimatedDate,

      enquiryStatus: enquiryStatus,
      enquiryType: radiodata,
      enquiryNotes: enquiryNotes,

      enteredById: user && user._id,
      enteredBy: user && user.userName,

      //   EditByDateTime: new Date().toLocaleString("en-GB"),
    };
    editEnquiryDetails(finalData);
    getUnresolvedData({ userId: user && user._id });
    getEnquiryDetails({ userId: user && user._id,enquiryStatus :"" });
    closeedit();
  };

  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <Fragment>
      {/*  */}
      <form onSubmit={(e) => onUpdate(e)}>
        {/* <form> */}
        <div className="container ">
          <section className="body">
            <div className="body-inner">
              <div className="row form-group">
                <div className="control-group col-md-6 col-lg-6 col-sm-6 col-xs-6">
                  <label className="control-label">
                    Client Name <span style={{ color: "red" }}>*</span>
                  </label>
                  <div className="controls">
                    <input
                      name="clientName"
                      id="clientName"
                      type="text"
                      value={clientName}
                      className="form-control"
                      onChange={(e) => onEnquiryChange(e)}
                      required
                    />
                    <span
                      id="category_result"
                      className="form-input-info"
                    ></span>
                  </div>
                </div>
                <div className="control-group col-md-6 col-lg-6 col-sm-6 col-xs-6">
                  <label className="control-label">
                    Email Id <span style={{ color: "red" }}>*</span>
                  </label>
                  <div className="controls">
                    <input
                      name="clientEmailId"
                      id="clientEmailId"
                      type="email"
                      value={clientEmailId}
                      className="form-control"
                      onChange={(e) => onEnquiryChange(e)}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row form-group py-2">
                <div className="control-group col-md-6 col-lg-6 col-sm-6 col-xs-6">
                  <label className="control-label">
                    EnquiryTo <span style={{ color: "red" }}>*</span>
                  </label>
                  <div className="controls">
                    <input
                      name="enquiryTo"
                      id="enquiryTo"
                      value={enquiryTo}
                      type="text"
                      className="form-control"
                      onChange={(e) => onEnquiryChange(e)}
                    />
                  </div>
                </div>

                <div className="control-group col-md-6 col-lg-6 col-sm-6 col-xs-6">
                  <label className="control-label">
                    Estimated ERD <span style={{ color: "red" }}>*</span>
                  </label>
                  <div className="controls">
                    <input
                      name="estimatedERD"
                      id="estimatedERD"
                      type="date"
                      value={estimatedDate}
                      //   className="form-control"
                      onChange={(e) => onEstimatedDatechange(e)}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row form-group py-2">
                <div className="control-group col-md-6 col-lg-6 col-sm-6 col-xs-6">
                  <label className="control-label">
                    Type : <span style={{ color: "red" }}>*</span>
                  </label>
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  {user && user.empCtAccess != "Individual" ? (
                    <>
                      <input
                        className="radiolevels"
                        type="radio"
                        id="DCT"
                        value="DCT"
                        name="radiolevels"
                        checked={radio === "DCT"}
                        required
                        // checked={checkDCT=="true"}
                        onClick={() => onRadioSelect("DCT")}
                      />{" "}
                      &nbsp;
                      <label className="label-control">DCT </label>
                    </>
                  ) : (
                    <></>
                  )}
                  &emsp;
                  <input
                    className="radiolevels"
                    type="radio"
                    id="SCT"
                    value="SCT"
                    name="radiolevels"
                    checked={radio === "SCT"}
                    onClick={() => onRadioSelect("SCT")}
                  />{" "}
                  &nbsp;
                  <label className="label-control"> SCT </label>
                </div>
              </div>

              <div className=" row control-group col-md-6 col-lg-12 col-sm-6 col-xs-6">
                <label className="control-label">
                  Notes <span style={{ color: "red" }}>*</span>
                </label>{" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {/* <div className="col-lg-12 col-md-4 col-sm-4 col-12 text-right"> */}
                <textarea
                  rows="3"
                  name="enquiryNotes"
                  value={enquiryNotes}
                  onChange={(e) => onEnquiryChange(e)}
                  id="enquiryNotes"
                  className="textarea form-control"
                  required
                ></textarea>
                {/* </div> */}
              </div>

              <div className="controls ">
                <div className="control-group col-md-12 col-lg-12 col-sm-12 col-xs-12 text-left">
                  <br />
                  <label className="control-label" style={{ color: "red" }}>
                    * Indicates mandatory fields, Please fill mandatory fields
                    before Submit.
                  </label>
                </div>
              </div>
            </div>
            <div className="text-right">
              <button className="btn sub_form btn_continue blackbrd Save float-right">
                {" "}
                UPDATE
              </button>
            </div>
          </section>
        </div>
      </form>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  sct: state.sct,
});

export default connect(mapStateToProps, {
  getEnquiryDetails,
  editEnquiryDetails,
  getUnresolvedData,
})(EditEnquiry);
