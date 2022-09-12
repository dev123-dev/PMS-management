import React, { useState, Fragment, useEffect } from "react";
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
import AllDesignation from "../department/AllDesignation";

const SctInvoicePdfPrint = ({
  auth: { isAuthenticated, user, users, loading },
  sct: { poPrint },
}) => {
  const data = useHistory().location.data;

  let getRegenerate = JSON.parse(localStorage.getItem("getRegenerate"));
  console.log(poPrint, "poPrint");

  //formData

  const [formData, setFormData] = useState({
    sctClientName:
      data && data.sctdata && data.sctdata.sctClientName
        ? data.sctdata.sctClientName
        : "",

    sctClientAddress:
      data && data.data.sctdata && data.data.sctdata.sctClientAddress
        ? data.data.sctdata.sctClientAddress
        : "",

    sctCompanyName:
      data && data.data.sctdata && data.data.sctdata.sctCompanyName
        ? data.data.sctdata.sctCompanyName
        : "",
    sctClientAddress:
      data && data.data.sctdata && data.data.sctdata.sctClientAddress
        ? data.data.sctdata.sctClientAddress
        : "",
    companyAddress: "",
    companyName: "",
    forName: "",
    forAddress: "",
    PONo: "",
    workDesc: "",
    amount: "",
    sctClientAssignedToName:
      data && data.sctdata && data.sctdata.sctClientAssignedToName
        ? data.sctdata.sctClientAssignedToName
        : "",
    sctClientAssignedToId:
      data && data.sctdata && data.sctdata.sctClientAssignedToId
        ? data.sctdata.sctClientAssignedToId
        : "",

    quotationDate: "",
    isSubmitted: false,
  });

  const {
    sctCompanyName,
    sctClientAddress,
    PONo,
    companyName,
    quotationDate,
    forName,
    forAddress,
    workDesc,
    amount,
    sctClientName,
    sctClientAssignedToId,
    clientName,
    sctClientAssignedToName,

    companyAddress,
    isSubmitted,
  } = formData;

  if (poPrint && poPrint.PONo && !PONo) {
    setFormData({
      ...formData,
      companyAddress: poPrint.companyAddress ? poPrint.companyAddress : "",
      companyName: poPrint.companyName ? poPrint.companyName : "",
      forName: poPrint.forName ? poPrint.forName : "",
      forAddress: poPrint.forAddress ? poPrint.forAddress : "",
      PONo: poPrint.PONo ? poPrint.PONo : "",
      workDesc: poPrint.workDesc ? poPrint.workDesc : "",
      amount: poPrint.amount ? poPrint.amount : "",
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

  if (!data || data === undefined) {
    return <Redirect to="/all-engaged-clients" />;
  }
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
              <Text>Invoice No #:{PONo}</Text>
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
                <Text style={{ width: "80%" }}>
                  Description of Work : {workDesc}
                </Text>
                <Text style={styles.row2}>Amount : {amount} </Text>
              </View>
            </View>
            {/* <View style={(styles.table, styles.section)}>
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

          */}

            {/* <View style={(styles.section, styles.space)}>
            <Text>Terms and Condition: </Text>
            <Text> 1. Applicable taxes will be extra.</Text>
            <Text> 2. Work will resume after full payment.</Text>
          </View> */}

            <View style={{ paddingTop: "20px", margin: "10px" }}>
              <Text>
                For any enquiry, reach out via email at joel@pinnaclemedia.in,
                call on +91 99162 13542{" "}
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
