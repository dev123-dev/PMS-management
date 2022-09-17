import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { Link, useHistory, Redirect } from "react-router-dom";
import { ToWords } from "to-words";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
const toWords = new ToWords();

const SctInvoicePdfPrint = ({
  auth: { isAuthenticated, user, users, loading },
}) => {
  const data = useHistory().location.data;
  let invoicePrintLS = JSON.parse(localStorage.getItem("invoicePrintLS"));
  console.log(invoicePrintLS, "invoicePrintLS");
  //formData

  const [formData, setFormData] = useState({
    invoiceNo: "",
    companyName: "",
    companyName: "",
    forName: "",
    accountNo: "",
    bankName: "",
    IFSCCode: "",
    forAddress: "",
    PONo: "",
    workDesc: "",
    amount: "",
    quotationDate: "",
    isSubmitted: false,
  });

  const {
    invoiceNo,
    companyName,
    quotationDate,
    forName,
    forAddress,
    bankName,
    IFSCCode,
    workDesc,
    amount,
    clientName,
    accountNo,
    companyAddress,
    isSubmitted,
  } = formData;

  if (invoicePrintLS && invoicePrintLS.invoiceNo && !invoiceNo) {
    setFormData({
      ...formData,
      companyAddress: invoicePrintLS.companyAddress
        ? invoicePrintLS.companyAddress
        : "",
      companyName: invoicePrintLS.companyAddress
        ? invoicePrintLS.companyName
        : "",
      forName: invoicePrintLS.forName ? invoicePrintLS.forName : "",
      forAddress: invoicePrintLS.forAddress ? invoicePrintLS.forAddress : "",
      invoiceNo: invoicePrintLS.invoiceNo ? invoicePrintLS.invoiceNo : "",

      accountNo: invoicePrintLS.bank.accountNo
        ? invoicePrintLS.bank.accountNo
        : "",
      bankName: invoicePrintLS.bank.bankName
        ? invoicePrintLS.bank.bankName
        : "",
      IFSCCode: invoicePrintLS.bank.IFSCCode
        ? invoicePrintLS.bank.IFSCCode
        : "",
    });
  }

  const [startpurchaseOrderDate, setpurchaseorderDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  var purchaseOrderDate = "";
  var ED = startpurchaseOrderDate.split(/\D/g);
  purchaseOrderDate = [ED[2], ED[1], ED[0]].join("-");

  const styles = StyleSheet.create({
    section: {
      // margin: 10,
      padding: 10,
    },
    viewer: {
      width: window.innerWidth, //the pdf viewer will take up all of the width and height
      height: window.innerHeight,
    },
    page: {
      backgroundColor: "transparent",
      color: "black",
      fontSize: "10px",
    },

    right: {},
    rowcard: {},
    table: {
      width: "100%",
    },

    row: {
      // display: "flex",
      flexDirection: "row",
      borderTop: "1px solid #EEE",
      paddingTop: 8,
      paddingBottom: 8,
    },
    header: {
      borderTop: "none",
    },
    bold: {
      fontWeight: "bold",
    },
    row1: {
      width: "17%",
    },
    row2: {
      width: "15%",
    },
    row3: {
      width: "15%",
    },
    row4: {
      width: "10%",
    },
    row5: {
      width: "17%",
    },
    row6: {
      width: "17%",
    },
    row7: {
      width: "17%",
    },
    row8: {
      width: "17%",
    },
    linespace: { lineHeight: "1.6" },
  });

  let totSubTot = 0;
  invoicePrintLS &&
    invoicePrintLS.item.map((row, i) => (totSubTot = Number(row.totalAmt)));

  // if (!data || data === undefined) {
  //   return <Redirect to="/all-engaged-clients" />;
  // }
  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <>
      <div className="" style={{ marginTop: "54px" }}></div>
      <PDFViewer style={styles.viewer}>
        {/* Start of the document*/}

        <Document>
          {/*render a single page*/}
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text>Invoice</Text>
            </View>
            <View style={styles.section}>
              <Text>Invoice No #:{invoiceNo}</Text>
              <Text>Invoice Date:{purchaseOrderDate}</Text>
            </View>

            <View style={(styles.table, styles.section)}>
              <View style={[styles.row]}>
                <Text
                  style={{
                    // border: "1 px solid black",
                    width: "600px",
                    height: "100%",
                  }}
                >
                  From: {"\n"}
                  {companyName}
                  {"\n"}
                  {companyAddress}
                </Text>

                <Text
                  style={{
                    paddingLeft: "10px",
                    // border: "1 px solid black",
                    width: "600px",
                    height: "100%",
                  }}
                >
                  To:{"\n"}
                  {forName} {"\n"}
                  {forAddress}
                </Text>
              </View>
            </View>

            <View style={(styles.table, styles.section)}>
              <View style={[styles.row, styles.bold, styles.header]}>
                <Text style={styles.row1}>Item Name</Text>
                <Text style={styles.row2}>Description</Text>
                <Text style={styles.row4}>Qty</Text>
                <Text style={styles.row4}>Rate</Text>

                <Text style={styles.row3}>Dis</Text>
                <Text style={styles.row5}>Total</Text>
              </View>
              {invoicePrintLS &&
                invoicePrintLS.item.map((row, i) => (
                  <View key={i} style={styles.row} wrap={false}>
                    <Text style={styles.row1}>{row.itemName}</Text>
                    <Text style={styles.row2}>{row.desc}</Text>
                    <Text style={styles.row4}>{row.qty}</Text>
                    <Text style={styles.row4}>{row.rate}</Text>
                    {/* <Text style={styles.row5}>{row.Amount}</Text>
                    <Text style={styles.row6}>{row.CGST}</Text>
                    <Text style={styles.row6}>{row.SGST}</Text>*/}

                    <Text style={styles.row3}>{row.discount}</Text>
                    <Text style={styles.row5}>{row.totalAmt}</Text>
                  </View>
                ))}
            </View>
            <View style={styles.section}>
              <Text>{totSubTot}</Text>
              <Text>
                Amount Chargreable (in words) &nbsp;: &nbsp;
                {toWords.convert(totSubTot, { currency: true })}
              </Text>
            </View>
            <View style={(styles.table, styles.section)}>
              <View style={styles.linespace}>
                <Text>Beneficary Name : {companyName}</Text>
                <Text>Ac No : {accountNo} </Text>
                <Text>Bank Name : {bankName} </Text>
                <Text>IFSC Code: {IFSCCode} </Text>
                <Text>Properitorship's PAN : {amount} </Text>
              </View>
            </View>

            <Text
              style={{
                position: "absolute",
                bottom: "60",
                left: "80%",
                padding: "10",
              }}
            >
              ------------------------------{"\n"}
              Authorised Signatory
            </Text>
            <View
              style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                padding: "10",
              }}
            >
              <Text>
                Declaration
                {"\n"}
                We declare that this invoice shows the actual price of the
                Services/goods described and that all particulars are true and
                correct.
              </Text>
              <Text style={{ textAlign: "center " }}>
                {"\n"}This is a Computer Generated Invoice
              </Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </>
  );
};

SctInvoicePdfPrint.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  sct: state.sct,
});

export default connect(mapStateToProps, {})(SctInvoicePdfPrint);
