import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Select from "react-select";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { getPurchaseOrderPrint, uploadPOFile } from "../../actions/sct";
const AllSctDocuments = ({
  auth: { isAuthenticated, user, users },
  sctClients,
  getPurchaseOrderPrint,
  uploadPOFile,
}) => {
  let sctClientData = JSON.parse(localStorage.getItem("sctClientData"));
  console.log("sctClientData", sctClientData);

  let documentCategory = [
    { value: "Quotation", label: "Quotation", cat: "Quotation" },
    { value: "PO", label: "PO", cat: "PO" },
    { value: "Invoice", label: "Invoice", cat: "Invoice" },
    // { value: "RevisedQuotation", label: "Revised Quotation", cat: "Quotation" },
    // { value: "SendPO", label: "Send PO", cat: "PO" },
    // { value: "POReceived", label: "PO Received", cat: "PO" },
    // { value: "GenerateInvoice", label: "Generate Invoice", cat: "Invoice" },
    // { value: "RevisedInvoice", label: "Revised Invoice", cat: "Invoice" },
    // { value: "PaymentReceived", label: "Payment Received", cat: "Invoice" },
  ];

  if (
    sctClientData &&
    sctClientData.billingStatusCategory &&
    sctClientData.billingStatusCategory === "Quotation"
  ) {
    documentCategory = documentCategory.filter(
      (documentCategory) =>
        documentCategory.cat === "Quotation" || documentCategory.cat === "PO"
    );
  } else if (
    sctClientData &&
    sctClientData.billingStatusCategory &&
    sctClientData.billingStatusCategory === "PO"
  ) {
    documentCategory = documentCategory.filter(
      (documentCategory) =>
        documentCategory.cat === "Quotation" ||
        documentCategory.cat === "PO" ||
        documentCategory.cat === "Invoice"
    );
  } else {
    documentCategory = documentCategory.filter(
      (documentCategory) => documentCategory.cat === "Quotation"
    );
  }

  const [formData, setFormData] = useState({
    projectStatusData: documentCategory[0],
    docCat: documentCategory[0],
    isSubmitted: false,
  });

  const { projectStatusData, docCat } = formData;
  const onSliderChange = (sctClients, idx) => (e) => {
    if (e) {
      setFormData({
        ...formData,
        projectStatusData: e,
        docCat: e.cat,
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

  const onClickQuotation = (sctClients) => {
    localStorage.setItem(
      "quotationDataLS",
      JSON.stringify(sctClients.quotation[0])
    );
  };

  const onClickPO = (sctClients) => {
    getPurchaseOrderPrint({ clientId: sctClients._id });
  };

  const [selectedFile, setFile] = useState();

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const onFileUpload = () => {
    const formData = new FormData();
    formData.append("myFile", selectedFile);
    formData.append("clientId", sctClientData._id);
    // axios.post("http://localhost:2001/api/sct/upload-po-file", formData, {
    //   headers: {
    //     "content-type": "multipart/form-data",
    //   },
    // });
    uploadPOFile(formData);
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <div className="col-lg-11 col-md-11 col-sm-12 col-12">
          <h2 className="heading_color">All Documents </h2>
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
            options={documentCategory}
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
                        sctdata: sctClientData,
                      },
                    }}
                  >
                    <img
                      className=" log"
                      src={require("../../static/images/quotation.png")}
                      alt="Generate Quotation"
                      title="Generate Quotation"
                    />
                    {sctClientData && sctClientData.quotationGenerated === 1 ? (
                      <h4>Revised Quotation</h4>
                    ) : (
                      <h4>Generate Quotation </h4>
                    )}
                  </Link>
                  {sctClientData && sctClientData.quotationGenerated === 1 ? (
                    <Link
                      onClick={() => onClickQuotation(sctClientData)}
                      to={{
                        pathname: "/print-pdf",
                      }}
                      target="_blank"
                    >
                      <img
                        className="img_icon_size log float-right"
                        src={require("../../static/images/print.png")}
                        alt="Print Quatation"
                        style={{ margin: "5px" }}
                      />
                    </Link>
                  ) : (
                    <Link to="#"></Link>
                  )}
                </center>
              </div>
            </div>
            {(sctClientData && sctClientData.billingStatusCategory === "PO") ||
              (docCat === "PO" && (
                <>
                  <div className="col-lg-4 col-md-6 col-sm-12 col-12 ">
                    <div className="card card-content ">
                      <center>
                        <Link
                          to={{
                            pathname: "/generate-PO",
                            data: {
                              sctdata: sctClientData,
                            },
                          }}
                        >
                          <img
                            className="log"
                            src={require("../../static/images/Po.png")}
                            alt="Send Po"
                          />
                          {sctClientData && sctClientData.POGenerated === 1 ? (
                            <h4>Revised Purchase Order</h4>
                          ) : (
                            <h4>Send Purchase Order</h4>
                          )}
                        </Link>
                      </center>
                      <div>
                        {sctClientData.POGenerated === 1 && (
                          <>
                            <Link
                              onClick={() => onClickPO(sctClientData)}
                              to={{
                                pathname: "/print-PO-pdf",
                                data: {
                                  data: sctClientData,
                                },
                              }}
                              target="_blank"
                            >
                              <img
                                className="img_icon_size log float-right"
                                src={require("../../static/images/print.png")}
                                alt="Print Po"
                                style={{ margin: "5px" }}
                              />
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  {sctClientData.POGenerated === 1 && (
                    <div className="col-lg-4 col-md-6 col-sm-12 col-12 ">
                      <div className="card card-content ">
                        <center>
                          <Link to="#" onClick={() => onUpdate()}>
                            <img
                              className=" log"
                              src={require("../../static/images/uploadPO.png")}
                              alt="Upload PO"
                              title="Upload PO"
                            />
                            <h4>Upload PO</h4>
                          </Link>
                        </center>
                        <div>
                          {sctClientData.POFile &&
                            sctClientData.POFile.filename && (
                              <Link
                                to={{
                                  pathname: require("../../static/files/" +
                                    sctClientData.POFile.filename),
                                }}
                                target="_blank"
                              >
                                <img
                                  className="img_icon_size log float-right"
                                  src={require("../../static/images/print.png")}
                                  alt="Print Po"
                                  style={{ margin: "5px" }}
                                />
                              </Link>
                            )}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ))}
          </div>
          {(sctClientData &&
            sctClientData.billingStatusCategory === "Invoice") ||
            (docCat === "Invoice" && (
              <div className="row col-lg-11 col-md-11 col-sm-12 col-12 py-5">
                <div className="col-lg-4 col-md-6 col-sm-12 col-12 ">
                  <div className="card card-content ">
                    <center>
                      <Link
                        to={{
                          pathname: "/generate-Invoice",
                          data: {
                            sctdata: sctClientData,
                          },
                        }}
                      >
                        <img
                          className=" log"
                          ///  src={require("../../static/images/invoice.png")}
                          src={require("../../static/images/Po.png")}
                          alt="Send Invoice"
                          title="Send Invoice"
                        />
                        <h4>Send Invoice</h4>
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
                          src={require("../../static/images/Po.png")}
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
                      <Link to="/profit-loss-report">
                        <img
                          className=" log"
                          // src={require("../../static/images/profitloss.jfif")}
                          src={require("../../static/images/Po.png")}
                          alt="Upload Agreement"
                          title="Upload Agreement"
                        />
                        <h4>Upload Agreement</h4>
                      </Link>
                    </center>
                  </div>
                </div>
              </div>
            ))}
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
          <input type="file" onChange={onFileChange} />
          <button onClick={onFileUpload}>Upload!</button>
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

export default connect(mapStateToProps, {
  getPurchaseOrderPrint,
  uploadPOFile,
})(AllSctDocuments);
