import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { Link, useHistory, Redirect } from "react-router-dom";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
const SctQuotationpdfprint = ({
  auth: { isAuthenticated, user, users, loading },
}) => {
  const data = useHistory().location.data;
  let quotationDataLS = JSON.parse(localStorage.getItem("quotationDataLS"));
  //formData

  const [formData, setFormData] = useState({
    companyAddress: "",
    companyName: "",
    forName: "",
    forAddress: "",
    quotationNo: "",
    quotationDate: "",
    isSubmitted: false,
  });

  const {
    quotationNo,
    companyName,
    quotationDate,
    forName,
    forAddress,
    companyAddress,
    isSubmitted,
  } = formData;

  if (quotationDataLS && quotationDataLS.companyAddress && !companyAddress) {
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
    });
  }

  const [startquotationDate, setquotationDate] = useState(quotationDate);
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

    viewer: {
      width: window.innerWidth, //the pdf viewer will take up all of the width and height
      height: window.innerHeight,
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
    // So Declarative and unDRY 👌
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
    // space: {
    //   height: "2px",
    // },
  });

  // if (!data || data === undefined) {
  //   return <Redirect to="/all-engaged-clients" />;
  // }
  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <PDFViewer style={styles.viewer}>
      {/* Start of the document*/}

      <Document>
        {/*render a single page*/}
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>Quotation</Text>
          </View>
          <View style={styles.section}>
            <Text>Quotation No #:{quotationNo}</Text>
            <Text>Quotation Date:{startquotationDate}</Text>
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
            <View style={[styles.row]}>
              <Text
                style={{
                  // border: "1 px solid black",
                  width: "600px",
                }}
              >
                Country of Supply:
              </Text>
              <Text
                style={{
                  // border: "1 px solid black",
                  width: "600px",
                }}
              >
                Place of Supply:
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
              <Text style={styles.row6}>CGST</Text>
              <Text style={styles.row7}>SGST</Text>
              <Text style={styles.row8}>Total</Text>
              <Text style={styles.row8}>Discount</Text>
              <Text style={styles.row8}>Grand Total</Text>
            </View>
            {quotationDataLS &&
              quotationDataLS.item.map((row, i) => (
                <View key={i} style={styles.row} wrap={false}>
                  <Text style={styles.row1}>{row.itemName}</Text>
                  <Text style={styles.row2}>{row.GST}</Text>
                  <Text style={styles.row3}>{row.qty}</Text>
                  <Text style={styles.row4}>{row.rate}</Text>
                  <Text style={styles.row5}>{row.Amount}</Text>
                  <Text style={styles.row6}>{row.CGST}</Text>
                  <Text style={styles.row6}>{row.SGST}</Text>
                  <Text style={styles.row6}>{row.totalAmt}</Text>
                  <Text style={styles.row6}>{row.discount}</Text>
                  <Text style={styles.row6}>{row.grandTotal}</Text>
                </View>
              ))}
          </View>

          <View style={(styles.section, styles.space)}>
            <Text>Terms and Condition: </Text>
            <Text> 1. Applicable taxes will be extra.</Text>
            <Text> 2. Work will resume after full payment.</Text>
          </View>

          <View style={{ paddingTop: "20px" }}>
            <Text>
              For any enquiry, reach out via email at joel@pinnaclemedia.in,
              call on +91 99162 13542{" "}
            </Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

SctQuotationpdfprint.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(SctQuotationpdfprint);
