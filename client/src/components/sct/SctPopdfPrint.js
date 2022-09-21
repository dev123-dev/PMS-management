import React, { useState, Fragment } from "react";
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
} from "@react-pdf/renderer";

const SctPopdfPrint = ({
  auth: { isAuthenticated, user, users, loading },
  sct: { poPrint },
}) => {
  const data = useHistory().location.data;
  let poPrintLS = JSON.parse(localStorage.getItem("poPrintLS"));

  //formData

  const [formData, setFormData] = useState({
    companyAddress: "",
    companyName: "",
    forName: "",
    forAddress: "",
    PONo: "",
    workDesc: "",
    amount: "",
    PODate: "",
  });

  const {
    PONo,
    companyName,
    forName,
    forAddress,
    workDesc,
    amount,
    companyAddress,
    PODate,
  } = formData;

  if (poPrintLS && poPrintLS.PONo && !PONo) {
    setFormData({
      ...formData,
      companyAddress: poPrintLS.companyAddress ? poPrintLS.companyAddress : "",
      companyName: poPrintLS.companyName ? poPrintLS.companyName : "",
      forName: poPrintLS.forName ? poPrintLS.forName : "",
      forAddress: poPrintLS.forAddress ? poPrintLS.forAddress : "",
      PONo: poPrintLS.PONo ? poPrintLS.PONo : "",
      workDesc: poPrintLS.workDesc ? poPrintLS.workDesc : "",
      amount: poPrintLS.amount ? poPrintLS.amount : "",
      PODate: poPrintLS.PODate ? poPrintLS.PODate : "",
    });
  }

  var purchaseOrderDate = "";
  var ED = PODate.split(/\D/g);
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
      width: "27%",
    },
    row2: {
      width: "32%",
    },
    row3: {
      width: "15%",
    },
    row4: {
      width: "10%",
    },
    row5: {
      width: "6%",
      textAlign: "right",
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
    total: {
      marginLeft: "85%",
    },
    // space: {
    //   height: "2px",
    // },
  });

  // if (!data || data === undefined) {
  //   return <Redirect to="/all-engaged-clients" />;
  // }
  let totSubTot = 0;
  poPrintLS &&
    poPrintLS.item.map((row, i) => (totSubTot += Number(row.itemTotal)));

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
              <Text>Purchase Order</Text>
            </View>
            <View style={styles.section}>
              <Text>Purchase Order No #:{PONo}</Text>
              <Text>Purchase Order Date:{purchaseOrderDate}</Text>
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

            <View style={{ margin: "10px" }}>
              <Text>Dear Sir/Mam : </Text>
              <Text>
                On behalf of , We would like to place an order for the following
                from your company. Please refer to the attachment for the order
                list.
              </Text>
            </View>

            {/* <View style={(styles.table, styles.section)}>
              <View style={[styles.row, styles.bold, styles.header]}>
                <Text style={{ width: "80%" }}>
                  Description of Work : {workDesc}
                </Text>
                <Text style={styles.row2}>Amount : {amount} </Text>
              </View>
            </View> */}
            <View style={(styles.table, styles.section)}>
              <View style={[styles.row, styles.bold, styles.header]}>
                <Text style={styles.row1}>Item Name</Text>
                <Text style={styles.row2}>Description</Text>
                <Text style={styles.row3}>Rate</Text>
                <Text style={styles.row4}>Qty</Text>
                <Text style={styles.row5}>Total</Text>
              </View>
              {poPrintLS &&
                poPrintLS.item.map((row, i) => (
                  <View key={i} style={styles.row} wrap={false}>
                    <Text style={styles.row1}>{row.itemName}</Text>
                    <Text style={styles.row2}>{row.itemDesc}</Text>
                    <Text style={styles.row3}>{row.itemPrice}</Text>
                    <Text style={styles.row4}>{row.itemOty}</Text>
                    <Text style={styles.row5}>{row.itemTotal}</Text>
                  </View>
                ))}
            </View>
            <View wrap={false}>
              <Text style={styles.total}>Sub Total: {totSubTot}</Text>
            </View>
            <View style={styles.row} wrap={false}>
              <Text style={styles.total}>Tax : {poPrintLS.tax}</Text>
            </View>
            <View style={styles.row} wrap={false}>
              <Text style={styles.total}>Shipping : {poPrintLS.shipping}</Text>
            </View>
            <View style={styles.row} wrap={false}>
              <Text style={styles.total}>
                Total : {totSubTot + poPrintLS.tax + poPrintLS.shipping}
              </Text>
            </View>

            <View
              style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                padding: "10",
              }}
            >
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

SctPopdfPrint.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  sct: state.sct,
});

export default connect(mapStateToProps, {})(SctPopdfPrint);
