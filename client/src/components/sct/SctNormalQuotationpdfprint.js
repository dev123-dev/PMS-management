import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { useHistory } from "react-router-dom";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import { ToWords } from "to-words";
const toWords = new ToWords();
const SctNormalQuotationpdfprint = ({
  auth: { isAuthenticated, user, users, loading },
}) => {
  const data = useHistory().location.data;
  let quotationDataLS = JSON.parse(localStorage.getItem("quotationDataLS"));
  let allCompanyData = JSON.parse(localStorage.getItem("allCompanyData"));
  //formData

  const [formData, setFormData] = useState({
    companyAddress: "",
    companyName: "",
    forName: "",
    forAddress: "",
    quotationNo: "",
    quotationDate: "",
    clientFromEmailId: "",
    clientFromPhone: "",
    GSTNo: "",
    PAN: "",
    insideState: false,
  });

  const {
    quotationNo,
    companyName,
    quotationDate,
    forName,
    forAddress,
    companyAddress,
    clientFromEmailId,
    clientFromPhone,
    GSTNo,
    PAN,
    insideState,
  } = formData;

  let compData = "";
  if (quotationDataLS && quotationDataLS.companyAddress && !companyAddress) {
    compData = allCompanyData.filter(
      (allCompanyData) => allCompanyData._id === quotationDataLS.companyId
    )[0];

    setFormData({
      ...formData,
      companyAddress: quotationDataLS.companyAddress
        ? quotationDataLS.companyAddress
        : "",
      companyName: quotationDataLS.companyName
        ? quotationDataLS.companyName
        : "",
      forName: quotationDataLS.forName ? quotationDataLS.forName : "",
      forAddress: quotationDataLS.forAddress ? quotationDataLS.forAddress : "",
      quotationNo: quotationDataLS.quotationNo
        ? quotationDataLS.quotationNo
        : "",
      quotationDate: quotationDataLS.quotationDate
        ? quotationDataLS.quotationDate
        : "",
      clientFromEmailId: quotationDataLS.clientFromEmailId
        ? quotationDataLS.clientFromEmailId
        : "",
      clientFromPhone: quotationDataLS.clientFromPhone
        ? quotationDataLS.clientFromPhone
        : "",
      GSTNo: compData && compData.companyGSTIn ? compData.companyGSTIn : "",
      PAN: compData && compData.companyPanNo ? compData.companyPanNo : "",
      insideState: quotationDataLS.insideState,
    });
  }

  var quotationDate1 = "";

  var ED = quotationDataLS.quotationDate.split(/\D/g);
  quotationDate1 = [ED[2], ED[1], ED[0]].join("-");

  const borderColor = "#3778C2";

  // const [startquotationDate, setquotationDate] = useState(quotationDate);
  const styles = StyleSheet.create({
    section: {
      // margin: 10,
      padding: 10,
      lineHeight: "1.6",
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
    // So Declarative and unDRY 👌
    row1: {
      width: "25%",
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

    letterHeader: {
      margin: "10px",
      backgroundColor: "#456792",
    },
    letterFooter: {
      height: "20px",
      margin: "10px",
      backgroundColor: "#456792",
      position: "relative",
      bottom: "50",
      left: "0",
    },

    headingQuo: {
      color: "#456792",
      fontWeight: "bold",
      fontSize: "18px",
      left: "43%",
    },

    logo: {
      width: 150,
      height: 50,
      left: 0,
      marginLeft: 10,
      marginRight: "auto",
    },
  });

  let totSubTot = 0;
  quotationDataLS &&
    quotationDataLS.item.map((row, i) => (totSubTot += Number(row.grandTotal)));

  return !isAuthenticated || !user  ? (
    <Spinner />
  ) : (
    <>
      <div className="" style={{ marginTop: "54px" }}></div>
      <PDFViewer style={styles.viewer}>
        {/* Start of the document*/}

        <Document>
          {/*render a single page*/}
          <Page size="A4" style={styles.page}>
            <View style={styles.letterHeader}>
              <Image
                style={styles.logo}
                src={require("../../static/images/pmLogo_wh.png")}
              />
            </View>
            <View>
              <Text style={styles.headingQuo}>Quotation</Text>
            </View>
            <View style={styles.section}>
              <Text>Quotation No #:{quotationNo}</Text>
              <Text>Quotation Date:{quotationDate1}</Text>
            </View>

            <View style={(styles.table, styles.section)}>
              <View style={[styles.row]}>
                <Text
                  style={{
                    width: "600px",
                    height: "100%",
                  }}
                >
                  From: {"\n"}
                  {companyName}
                  {"\n"}
                  {companyAddress}
                  {"\n"}
                  {GSTNo && " GSTIN :" + GSTNo}
                  {"\n"}
                  {PAN && "PAN :" + PAN}
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
                <Text style={styles.row1}>Item</Text>
                <Text style={styles.row2}>GST </Text>
                <Text style={styles.row3}>Qty</Text>
                <Text style={styles.row4}>Rate</Text>
                <Text style={styles.row5}>Amount</Text>
                {insideState ? (
                  <>
                    <Text style={styles.row6}>CGST</Text>
                    <Text style={styles.row7}>SGST</Text>
                  </>
                ) : (
                  <Text style={styles.row7}>IGST</Text>
                )}

                <Text style={styles.row8}>Total</Text>
                <Text style={styles.row8}>Discount</Text>
                <Text style={styles.row8}>Grand Total</Text>
              </View>
              {quotationDataLS &&
                quotationDataLS.item.map((row, i) => (
                  <View key={i} style={styles.row} wrap={false}>
                    <Text style={styles.row1}>{row.itemName}</Text>
                    <Text style={styles.row2}>{row.GSTPer}</Text>
                    <Text style={styles.row3}>{row.qty}</Text>
                    <Text style={styles.row4}>{row.baseRate}</Text>
                    <Text style={styles.row5}>{row.amt}</Text>
                    {insideState ? (
                      <>
                        <Text style={styles.row6}>{row.CGST}</Text>
                        <Text style={styles.row6}>{row.SGST}</Text>
                      </>
                    ) : (
                      <Text style={styles.row6}>{row.IGST}</Text>
                    )}
                    <Text style={styles.row6}>{row.totalAmt}</Text>
                    <Text style={styles.row6}>{row.discount}</Text>
                    <Text style={styles.row6}>{row.grandTotal}</Text>
                  </View>
                ))}
            </View>

            <View style={styles.section}>
              <Text style={{ textAlign: "right" }}>Sub Total: {totSubTot}</Text>
              <Text style={{ textAlign: "right" }}>
                Amount Chargeable (in words) &nbsp;: &nbsp;
                {toWords.convert(totSubTot, { currency: true })}
              </Text>
            </View>

            <View
              style={{
                position: "absolute",
                bottom: "30",
                left: "0",
                padding: "10",
              }}
            >
              <Text>Terms and Condition: </Text>
              <Text> 1. Applicable taxes will be extra.</Text>
              <Text> 2. Work will resume after full payment.</Text>
              <Text
                style={{
                  paddingBottom: "10",
                }}
              >
                For any enquiry, reach out via email at{" "}
                {clientFromEmailId
                  ? clientFromEmailId
                  : "joel@pinnaclemedia.in"}
                , call on{" "}
                {clientFromPhone ? clientFromPhone : "+91 99162 13542"}{" "}
              </Text>
              {/* <View style={styles.letterFooter}>.</View> */}
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </>
  );
};

SctNormalQuotationpdfprint.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(SctNormalQuotationpdfprint);
