import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Select from "react-select";
import { Modal } from "react-bootstrap";
import FileBase64 from "react-file-base64";
const AllSctDocuments = ({
  auth: { isAuthenticated, user, users },
  sctClients,
}) => {
  const priorityCategory = [
    { value: "Quotation", label: "Quotation" },
    { value: "RevisedQuotation", label: "Revised Quotation" },
    { value: "SendPO", label: "Send PO" },
    { value: "POReceived", label: "PO Received" },
    { value: "GenerateInvoice", label: "Generate Invoice" },
    { value: "RevisedInvoice", label: "Revised Invoice" },
    { value: "PaymentReceived", label: "Payment Received" },
  ];
  const [formData, setFormData] = useState({
    projectStatusData: priorityCategory[0],

    isSubmitted: false,
  });

  const { projectStatusData } = formData;
  const onSliderChange = (sctClients, idx) => (e) => {
    if (e) {
      setFormData({
        ...formData,
        projectStatusData: e,
      });
    }

    // if (e.value === "POReceived") {
    //   setShowUploadModal(true);
    // } else {
    //   setShowUploadModal(false);
    // }
  };

  const [showUploadModal, setShowUploadModal] = useState(false);
  const handleUploadModalClose = () => setShowUploadModal(false);

  const onUploadChange = (e) => {
    if (e) {
      handleUploadModalClose();
    }
  };

  const onUpdate = () => {
    setShowUploadModal(true);
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <div className="col-lg-11 col-md-11 col-sm-12 col-12">
          <h2 className="heading_color">All Reports </h2>
          <hr />
        </div>
        <div className="col-lg-2 col-md-11 col-sm-12 col-12">
          <Select
            className="dropdownofengagedclient"
            name="projectStatusData"
            // value={{
            //   label: allFeedback.feedbackStatus,
            //   value: allFeedback.feedbackStatus,
            // }}
            value={projectStatusData}
            options={priorityCategory}
            isSearchable={true}
            placeholder="Select"
            onChange={onSliderChange(sctClients)}
          />
        </div>
        <section className="sub_reg">
          <div className="row col-lg-11 col-md-11 col-sm-12 col-12 py-5">
            <div className="col-lg-4 col-md-6 col-sm-12 col-12 ">
              <div className="card card-content ">
                <center>
                  <Link
                    to={{
                      pathname: "/generate-quotation",
                      data: {
                        sctdata: sctClients,
                      },
                    }}
                  >
                    <img
                      className=" log"
                      src={require("../../static/images/quotation.png")}
                      alt="Generate Quotation"
                      title="Generate Quotation"
                    />
                    <h4>Generate Quotation </h4>
                  </Link>
                </center>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-12 col-12 ">
              <div className="card card-content ">
                <center>
                  <Link
                    to={{
                      pathname: "/generate-PO",
                      data: {
                        sctdata: sctClients,
                      },
                    }}
                  >
                    <img
                      className="log"
                      src={require("../../static/images/Po.png")}
                      alt="Send Po"
                      title="Send Po"
                    />
                    <h4>Send Purchase Order</h4>
                  </Link>
                </center>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 col-12 ">
              <div className="card card-content ">
                <center>
                  <Link
                    to={{
                      pathname: "/generate-Invoice",
                      data: {
                        sctdata: sctClients,
                      },
                    }}
                  >
                    <img
                      className=" log"
                      ///  src={require("../../static/images/invoice.png")}
                      alt="Send Invoice"
                      title="Send Invoice"
                    />
                    <h4>Send Invoice</h4>
                  </Link>
                </center>
              </div>
            </div>
          </div>
          <div className="row col-lg-11 col-md-11 col-sm-12 col-12 py-5">
            <div className="col-lg-4 col-md-6 col-sm-12 col-12 ">
              <div className="card card-content ">
                <center>
                  <Link to="/profit-loss-report">
                    <img
                      className=" log"
                      // src={require("../../static/images/profitloss.jfif")}
                      alt="Send T&C Agreement"
                      title="Send T&C Agreement"
                    />
                    <h4>Send T&C Agreement</h4>
                  </Link>
                </center>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 col-12 ">
              <div className="card card-content ">
                <center>
                  <Link to="#" onClick={() => onUpdate()}>
                    <img
                      className=" log"
                      src={require("../../static/images/Po.png")}
                      alt="Upload PO"
                      title="Upload PO"
                    />
                    <h4>Upload PO</h4>
                  </Link>
                </center>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 col-12 ">
              <div className="card card-content ">
                <center>
                  <Link to="/profit-loss-report">
                    <img
                      className=" log"
                      // src={require("../../static/images/profitloss.jfif")}
                      alt="Upload Agreement"
                      title="Upload Agreement"
                    />
                    <h4>Upload Agreement</h4>
                  </Link>
                </center>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Modal
        show={showUploadModal}
        backdrop="static"
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <div className="col-lg-10">
            <h3 className="modal-title text-center">Upload Received PO</h3>
          </div>
          <div className="col-lg-1">
            <button onClick={handleUploadModalClose} className="close">
              <img
                src={require("../../static/images/close.png")}
                alt="X"
                style={{ height: "20px", width: "20px" }}
              />
            </button>
          </div>
        </Modal.Header>
        <Modal.Body>
          {/* <form className="row" onSubmit={(e) => onSubmitVeriy(e, "Taken")}> */}
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 py-3">
            <label className="label-control">Upload here:</label>

            <div className="row col-lg-12 col-md-12 col-sm-12 col-12">
              <FileBase64
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setFormData({
                    ...formData,
                    institutionLogo: base64,
                  })
                }
              />
            </div>
          </div>
          <div
            className="row col-lg-12 col-md-11 col-sm-12 col-12 Savebutton no_padding"
            size="lg"
          >
            <div className="col-lg-12 col-md-6 col-sm-12 col-12">
              <input
                type="submit"
                name="Submit"
                value="Upload"
                className="btn sub_form btn_continue blackbrd Save float-right"
              />
            </div>
          </div>
          {/* </form> */}
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

AllSctDocuments.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(AllSctDocuments);
