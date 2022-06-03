import React, { useState, Fragment, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";

import Spinner from "../layout/Spinner";
import { Modal } from "react-bootstrap";
const AddStaffAreainfo = ({
  auth: { isAuthenticated, user, users, loading },
}) => {
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
        <div className=" col-lg-12 col-md-11 col-sm-12 col-12">
          <div className=" card-new">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <h5>Area Info</h5>
            </div>
            <div className="row col-lg-12 col-md-11 col-sm-12 col-12">
              <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                <label className="label-control">Staff Code :</label>
                <input
                  type="text"
                  name="memberName"
                  value={memberName}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                <label className="label-control">Address:</label>
                <textarea
                  name="useraddr"
                  id="useraddr"
                  className="textarea form-control"
                  rows="3"
                  placeholder="Address"
                  //onChange={(e) => onInputChange2(e)}
                  style={{ width: "100%" }}
                  required
                ></textarea>
              </div>
              <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                <label className="label-control">State:</label>
                <input
                  type="text"
                  name="memberAadharNo"
                  value={memberAadharNo}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                <label className="label-control">Pincode:</label>
                <input
                  type="text"
                  name="memberPanNo"
                  value={memberPanNo}
                  className="form-control"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className="row col-lg-11 col-md-11 col-sm-12 col-12 Savebutton "
          size="lg"
        >
          <div className="col-lg-8 col-md-6 col-sm-12 col-12">
            <label className="label-control colorRed">
              * Indicates mandatory fields, Please fill mandatory fields before
              Submit
            </label>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 col-12">
            {loading ? (
              <button
                className="btn sub_form btn_continue Save float-right"
                disabled
              >
                Loading...
              </button>
            ) : (
              <input
                type="submit"
                name="Submit"
                value="Submit"
                className="btn sub_form btn_continue blackbrd Save float-right"
              />
            )}

            <Link
              className="btn sub_form btn_continue blackbrd float-right"
              to="/all-members"
            >
              Cancel
            </Link>
          </div>
        </div>
        {/* </section> */}
      </form>

      <Modal
        show={showUpdateModal}
        backdrop="static"
        keyboard={false}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <div className="col-lg-10">
            <h3 className="modal-title text-center">
              Preview of Add SHG Details
            </h3>
          </div>
          <div className="col-lg-2">
            <button onClick={handleUpdateModalClose} className="close">
              <img
                src={require("../../static/images/close.png")}
                alt="X"
                style={{ height: "20px", width: "20px" }}
              />
            </button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="container container_align">
            <section className="sub_reg">
              <div className="row col-lg-12 col-md-11 col-sm-12 col-12 ">
                <div className="col-lg-6 col-md-12 col-sm-12 col-12 py-3">
                  <div className="row card-new  pb-3">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                      <h5>Personal Info </h5>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                      <label className="label-control">
                        Member Name:{memberName}
                      </label>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                      <label className="label-control">
                        Member Phone:{memberPhone}
                      </label>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                      <label className="label-control">
                        Adhaar Card No:{memberAadharNo}
                      </label>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                      <label className="label-control">
                        Pan Card No:{memberPanNo}
                      </label>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                      <label className="label-control">
                        Address:{memberAddress}
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row col-lg-6 col-md-12 col-sm-12 col-12">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12 py-3 no_padding">
                    <div className="row card-new pb-3">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                        <h5>SHG Info </h5>
                      </div>

                      <div className="row ccol-lg-12 col-md-12 col-sm-12 col-12 no_padding ">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                          <label className="label-control">
                            Member SHG:{batchName}
                          </label>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                          <label className="label-control">
                            Member Code:{mCode}
                          </label>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                          <label className="label-control">
                            Joined Date:{startSelectedDate}
                          </label>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                          <label className="label-control">
                            Desgination:{memberDesg.value}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="row col-lg-12 col-md-11 col-sm-12 col-12 Savebutton no_padding"
                size="lg"
              >
                <div className="col-lg-12 col-md-6 col-sm-12 col-12">
                  {loading ? (
                    <button
                      className="btn sub_form btn_continue blackbrd Save float-right"
                      disabled
                    >
                      Loading...
                    </button>
                  ) : (
                    <button
                      variant="success"
                      className="btn sub_form btn_continue blackbrd Save float-right"
                      onClick={() => onSaveSubmit()}
                    >
                      Save
                    </button>
                  )}
                  <Link
                    className="btn sub_form btn_continue blackbrd float-right"
                    onClick={handleUpdateModalClose}
                  >
                    Cancel
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </Modal.Body>
      </Modal>
      {/* </div> */}
    </Fragment>
  );
};

AddStaffAreainfo.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  shg: state.shg,
});

export default connect(mapStateToProps, {})(AddStaffAreainfo);
