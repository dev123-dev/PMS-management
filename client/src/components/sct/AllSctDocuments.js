import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Select from "react-select";
import { Modal } from "react-bootstrap";
import {
  getPurchaseOrderPrint,
  uploadPOFile,
  uploadAgreement,
  getInvoicePrint,
  getSelectedClient,
} from "../../actions/sct";
const AllSctDocuments = ({
  auth: { isAuthenticated, user, users },
  sct: { selectedSctClient },
  sctClients,
  getPurchaseOrderPrint,
  uploadPOFile,
  uploadAgreement,
  getInvoicePrint,
  getSelectedClient,
}) => {
  let sctClientData = JSON.parse(localStorage.getItem("sctClientData"));
  useEffect(() => {
    getSelectedClient({ clientId: sctClientData._id });
  }, [getSelectedClient]);

  let documentCategory = [
    { value: "Quotation", label: "Quotation", cat: "Quotation" },
    { value: "PO", label: "PO", cat: "PO" },
    { value: "Invoice", label: "Invoice", cat: "Invoice" },
  ];

  if (
    selectedSctClient &&
    selectedSctClient.billingStatusCategory &&
    selectedSctClient.billingStatusCategory === "Quotation"
  ) {
    documentCategory = documentCategory.filter(
      (documentCategory) =>
        documentCategory.cat === "Quotation" || documentCategory.cat === "PO"
    );
  } else if (
    (selectedSctClient &&
      selectedSctClient.billingStatusCategory &&
      selectedSctClient.billingStatusCategory === "PO") ||
    (selectedSctClient && selectedSctClient.billingStatusCategory === "Invoice")
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

  const onUpload = () => {
    setShowUploadModal(true);
  };

  const [showUploadAgreementModal, setShowUploadAgreementModal] =
    useState(false);
  const handleUploadAgreementModalClose = () =>
    setShowUploadAgreementModal(false);

  const onUploadAgreementChange = (e) => {
    if (e) {
      handleUploadAgreementModalClose();
    }
  };
  const onUploadAgreement = () => {
    setShowUploadAgreementModal(true);
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
  const onClickInvoice = (sctClients) => {
    getInvoicePrint({ clientId: sctClients._id });
  };

  const [selectedFile, setFile] = useState();

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const onFileUpload = () => {
    let billingStatusCategory = selectedSctClient.billingStatusCategory,
      billingStatus = selectedSctClient.billingStatus;
    if (
      selectedSctClient &&
      selectedSctClient.billingStatusCategory !== "Invoice"
    ) {
      billingStatus = "POReceived";
      billingStatusCategory = "PO";
    }

    const formData = new FormData();
    formData.append("myFile", selectedFile);
    formData.append("clientId", selectedSctClient._id);
    formData.append("billingStatus", billingStatus);
    formData.append("billingStatusCategory", billingStatusCategory);
    const finalData = {
      cllientId: selectedSctClient._id,
      formData: formData,
    };
    uploadPOFile(finalData);
    onUploadChange(true);
  };

  const [agreementselectedFile, setagreementFile] = useState();
  const onAgreementFileChange = (event) => {
    setagreementFile(event.target.files[0]);
  };
  const onAgreementFileUpload = () => {
    const formData = new FormData();
    formData.append("myFile", agreementselectedFile);
    formData.append("clientId", selectedSctClient._id);
    const finalData = { cllientId: selectedSctClient._id, formData: formData };
    uploadAgreement(finalData);
    onUploadAgreementChange(true);
  };
  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <div className="row col-lg-12 col-md-11 col-sm-12 col-12">
          <div className="col-lg-8 col-md-11 col-sm-12 col-12">
            <h2 className="heading_color">
              All Documents
              {selectedSctClient && " of " + selectedSctClient.sctCompanyName}
            </h2>
          </div>
          <div className="col-lg-4 col-md-11 col-sm-12 col-12 py-2">
            <Link
              className="btn btn_green_bg float-right"
              to="/all-engaged-clients"
            >
              Back
            </Link>
          </div>
        </div>
        <div className="col-lg-2 col-md-11 col-sm-12 col-12 ">
          <Select
            className="dropdownofengagedclient"
            name="projectStatusData"
            value={projectStatusData}
            options={documentCategory}
            isSearchable={true}
            placeholder="Select"
            onChange={onSliderChange(sctClients)}
          />
        </div>
        {selectedSctClient && (
          <section className="sub_reg">
            <div className="row col-lg-11 col-md-11 col-sm-12 col-12 py-5">
              <div className="col-lg-4 col-md-6 col-sm-12 col-12 ">
                <div className="card card-content ">
                  <center>
                    <Link
                      to={{
                        pathname: "/generate-quotation",
                        data: {
                          sctdata: selectedSctClient,
                        },
                      }}
                    >
                      <img
                        className=" log"
                        src={require("../../static/images/quotation.png")}
                        alt="Generate Quotation"
                        title="Generate Quotation"
                      />
                      {selectedSctClient &&
                      selectedSctClient.quotationGenerated === 1 ? (
                        <h4>Revised Quotation</h4>
                      ) : (
                        <h4>Generate Quotation </h4>
                      )}
                    </Link>
                  </center>

                  {selectedSctClient &&
                  selectedSctClient.quotationGenerated === 1 ? (
                    <div style={{ marginTop: "-32px" }}>
                      <Link
                        onClick={() => onClickQuotation(selectedSctClient)}
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
                    </div>
                  ) : (
                    <Link to="#"></Link>
                  )}
                </div>
              </div>
              {docCat === "PO" || docCat === "Invoice" ? (
                <>
                  <div className="col-lg-4 col-md-6 col-sm-12 col-12 ">
                    <div className="card card-content ">
                      <center>
                        <Link
                          to={{
                            pathname: "/generate-PO",
                            data: {
                              sctdata: selectedSctClient,
                            },
                          }}
                        >
                          <img
                            className="log"
                            src={require("../../static/images/Po.png")}
                            alt="Send Po"
                          />
                          {selectedSctClient &&
                          selectedSctClient.POGenerated === 1 ? (
                            <h4>Revised Purchase Order</h4>
                          ) : (
                            <h4>Send Purchase Order</h4>
                          )}
                        </Link>
                      </center>
                      {selectedSctClient.POGenerated === 1 && (
                        <div style={{ marginTop: "-32px" }}>
                          <Link
                            onClick={() => onClickPO(selectedSctClient)}
                            to={{
                              pathname: "/print-PO-pdf",
                              data: {
                                data: selectedSctClient,
                              },
                            }}
                            target="_blank"
                            style={{ marginTop: "7px" }}
                          >
                            <img
                              className="img_icon_size log float-right"
                              src={require("../../static/images/print.png")}
                              alt="Print Po"
                              style={{ margin: "5px" }}
                            />
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                  {selectedSctClient.POGenerated === 1 && (
                    <div className="col-lg-4 col-md-6 col-sm-12 col-12 ">
                      <div className="card card-content ">
                        <center>
                          <Link to="#" onClick={() => onUpload()}>
                            <img
                              className=" log"
                              src={require("../../static/images/uploadPO.png")}
                              alt="Upload PO"
                              title="Upload PO"
                            />
                            <h4>Upload PO</h4>
                          </Link>
                        </center>

                        {selectedSctClient.POFile &&
                          selectedSctClient.POFile.filename && (
                            <div style={{ marginTop: "-32px" }}>
                              <Link
                                to={{
                                  pathname: require("../../static/files/" +
                                    selectedSctClient.POFile.filename),
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
                            </div>
                          )}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <></>
              )}
            </div>
            {docCat === "Invoice" && (
              <div className="row col-lg-11 col-md-11 col-sm-12 col-12 py-5">
                <div className="col-lg-4 col-md-6 col-sm-12 col-12 ">
                  <div className="card card-content ">
                    <center>
                      <Link
                        to={{
                          pathname: "/generate-Invoice",
                          data: {
                            sctdata: selectedSctClient,
                          },
                        }}
                      >
                        <img
                          className=" log"
                          src={require("../../static/images/invoice.png")}
                          alt="Send Invoice"
                          title="Send Invoice"
                        />
                        {selectedSctClient &&
                        selectedSctClient.invoiceGenerated === 1 ? (
                          <h4>Revised Invoice</h4>
                        ) : (
                          <h4>Send Invoice</h4>
                        )}
                      </Link>
                    </center>

                    {selectedSctClient &&
                      selectedSctClient.invoiceGenerated === 1 && (
                        <div style={{ marginTop: "-32px" }}>
                          <Link
                            onClick={() => onClickInvoice(selectedSctClient)}
                            to={{
                              pathname: "/generate-Invoice-Pdf-Print",
                              data: {
                                data: selectedSctClient,
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
                        </div>
                      )}
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 col-12 ">
                  <div className="card card-content ">
                    <center>
                      <Link
                        to={{
                          pathname: "/generate-Agreement",
                          data: {
                            sctdata: selectedSctClient,
                          },
                        }}
                      >
                        <img
                          className=" log"
                          src={require("../../static/images/Po.png")}
                          alt="Send T&C Agreement"
                          title="Send T&C Agreement"
                        />
                        <h4>Send T&C Agreement</h4>
                      </Link>
                    </center>
                    {selectedSctClient.generatedAgreementFile && (
                      <div style={{ marginTop: "-32px" }}>
                        <Link
                          to={{
                            pathname: require("../../static/agreement/" +
                              selectedSctClient.generatedAgreementFile),
                          }}
                          target="_blank"
                        >
                          <img
                            className="img_icon_size log float-right"
                            src={require("../../static/images/download.png")}
                            alt=""
                            style={{ margin: "5px" }}
                          />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 col-sm-12 col-12 ">
                  <div className="card card-content ">
                    <center>
                      <Link to="#" onClick={() => onUploadAgreement()}>
                        <img
                          className=" log"
                          src={require("../../static/images/uploadagreement.png")}
                          alt="Upload Agreement"
                          title="Upload Agreement"
                        />
                        <h4>Upload Agreement</h4>
                      </Link>
                    </center>
                    {selectedSctClient.agreementFile &&
                      selectedSctClient.agreementFile.filename && (
                        <div style={{ marginTop: "-32px" }}>
                          <Link
                            to={{
                              pathname: require("../../static/files/" +
                                selectedSctClient.agreementFile.filename),
                            }}
                            target="_blank"
                          >
                            <img
                              className="img_icon_size log float-right"
                              src={require("../../static/images/print.png")}
                              alt=""
                              style={{ margin: "5px" }}
                            />
                          </Link>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            )}
          </section>
        )}
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

      <Modal
        show={showUploadAgreementModal}
        backdrop="static"
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <div className="col-lg-10">
            <h3 className="modal-title text-center">Upload Agreement</h3>
          </div>
          <div className="col-lg-1">
            <button onClick={handleUploadAgreementModalClose} className="close">
              <img
                src={require("../../static/images/close.png")}
                alt="X"
                style={{ height: "20px", width: "20px" }}
              />
            </button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <input type="file" onChange={onAgreementFileChange} />
          <button onClick={onAgreementFileUpload}>Upload!</button>
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
  sct: state.sct,
});

export default connect(mapStateToProps, {
  getPurchaseOrderPrint,
  uploadPOFile,
  uploadAgreement,
  getInvoicePrint,
  getSelectedClient,
})(AllSctDocuments);
