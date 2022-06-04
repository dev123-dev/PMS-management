import React, { useState, Fragment, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";

import Spinner from "../layout/Spinner";
import { Modal } from "react-bootstrap";
const AddSalaryInfo = ({ auth: { isAuthenticated, user, users, loading } }) => {
  //formData

  const [formData, setFormData] = useState({
    memberName: "",
    memberPhone: "",
    memberAddress: "",
    memberAadharNo: "",
    memberPanNo: "",
    memberDesg: "",

    memberJoiningDate: "",
    memberCode: "",
    isSubmitted: false,
  });

  const {
    memberName,
    memberPhone,
    memberAddress,
    memberAadharNo,
    memberPanNo,
    memberDesg,
    memberCode,
    isSubmitted,
  } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  let addBatchInfo = JSON.parse(localStorage.getItem("selBatchInfo"));

  const [startSelectedDate, setJoinDate] = useState("");
  const onDateChange = (e) => {
    setJoinDate(e.target.value);
  };

  const MemDesigMethods = [
    { value: "Member", label: "Member" },
    { value: "Secretary", label: "Secretary" },
    { value: "Treasurer", label: "Treasurer" },
    { value: "President", label: "President" },
  ];
  const onMemDesigChange = (e) => {
    setError({
      ...error,
      DesgIdChecker: true,
      DesgErrorStyle: { color: "#000" },
    });

    if (e) {
      setFormData({
        ...formData,
        memberDesg: e,
      });
    }
  };

  //Required Validation Starts
  const [error, setError] = useState({
    DesgIdChecker: false,
    DesgErrorStyle: {},
  });
  const { DesgIdChecker, DesgErrorStyle } = error;

  const checkErrors = () => {
    if (!DesgIdChecker) {
      setError({
        ...error,
        DesgErrorStyle: { color: "#F00" },
      });
      return false;
    }

    return true;
  };

  const [batch, getbatchData] = useState();

  const [batchId, setbatchId] = useState();

  const [batchName, setbatchName] = useState();

  const [batchCode, setbatchCode] = useState();
  const [memberCounter, setMemberCounter] = useState();

  if (addBatchInfo && addBatchInfo[0] && addBatchInfo[0]._id && !batchId) {
    setbatchId(addBatchInfo[0] && addBatchInfo[0]._id);
    setbatchName(addBatchInfo[0] && addBatchInfo[0].batchName);
    setbatchCode(addBatchInfo[0] && addBatchInfo[0].batchCode);
    setMemberCounter(addBatchInfo[0] && addBatchInfo[0].memberCounter);
  }

  const mCode = batchCode + memberCounter;

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const handleUpdateModalClose = () => setShowUpdateModal(false);

  const [userData, setUserData] = useState(null);
  const onEdit = (e) => {
    setShowUpdateModal(true);
    setUserData(e);
  };
  const onUpdateModalChange = (e) => {
    if (e) {
      handleUpdateModalClose();
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //Required Validation Starts
    if (checkErrors()) {
      const finalData = {
        memberName: memberName,
        memberPhone: memberPhone,
        memberAddress: memberAddress,
        memberAadharNo: memberAadharNo,
        memberPanNo: memberPanNo,
        memberDesg: memberDesg.value,
        memberJoiningDate: startSelectedDate,
        memberCode: mCode,
        institutionId: user.institutionId,
        batchId: batchId,
        batchName: batchName,
        memberCounter: memberCounter,
      };
      setShowUpdateModal(true);
      setUserData(finalData);
    }
  };

  const onSaveSubmit = () => {
    const finalData = {
      memberName: memberName,
      memberPhone: memberPhone,
      memberAddress: memberAddress,
      memberAadharNo: memberAadharNo,
      memberPanNo: memberPanNo,
      memberDesg: memberDesg.value,
      memberJoiningDate: startSelectedDate,
      memberCode: mCode,
      institutionId: user.institutionId,
      batchId: batchId,
      batchName: batchName,
      memberCounter: memberCounter,
    };

    // AddMember(finalData);
    setFormData({
      ...formData,
      memberName: "",
      memberPhone: "",
      memberAddress: "",
      memberAadharNo: "",
      memberPanNo: "",
      memberDesg: "",
      memberJoiningDate: "",
      memberCode: "",
      isSubmitted: true,
    });
    setJoinDate("");
  };
  if (isSubmitted) {
    return <Redirect to="/all-members" />;
  }

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      {/* <div className="container container_align"> */}
      <form onSubmit={(e) => onSubmit(e)}>
        {/* <section className="sub_reg"> */}

        {/* </section> */}
      </form>

      {/* </div> */}
    </Fragment>
  );
};

AddSalaryInfo.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  shg: state.shg,
});

export default connect(mapStateToProps, {})(AddSalaryInfo);
