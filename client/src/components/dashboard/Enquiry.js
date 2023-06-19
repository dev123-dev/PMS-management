import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import Spinner from "../layout/Spinner";
import EditEnquiry from "./EditEnquiry";
import Select from "react-select";
import {
  getEnquiryDetails,
  AddenquiryHistory,
  getLastEnquiryHistoryDeatils,
  updateEnquiry,
  deleteEnquiry,
  getUnresolvedData,
} from "../../actions/sct";
import AddEnquiry from "../dashboard/AddEnquiry";
const Enquiry = ({
  auth: { isAuthenticated, user, users },
  sct: { allEnquiry, historyDetails, namewithcountdropdown },
  getEnquiryDetails,
  AddenquiryHistory,
  updateEnquiry,
  deleteEnquiry,
  getLastEnquiryHistoryDeatils,
  getUnresolvedData,
}) => {
  useEffect(() => {
    getEnquiryDetails({
      userId: user && user._id,
      enquiryStatus: "UnResolved",
    });
  }, []);

  // useEffect(()=>{
  //   getLastEnquiryHistoryDeatils()
  // })

  const [formData, setFormData] = useState({
    enquiryId: "",
    radiodata: "",
    enteredbyname: "",
    discussionPointNotes: "",
    enquiryDeactiveReason: "",
    isSubmitted: false,
  });

  const {
    enquiryId,
    radiodata,
    discussionPointNotes,
    enteredbyname,
    isSubmitted,
    enquiryDeactiveReason,
  } = formData;

  const onInputchange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const StatusCategory = [
    { value: "Resolved", label: "Resolved" },
    { value: "UnResolved", label: "UnResolved" },
  ];
  // const { projectStatusCategory } = formData;
  const [showHide2, setShowHide2] = useState({
    showonclickSection: false,
  });
  //deactivate modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [EnquiryId, setEnquiryId] = useState("");

  let todayDate = new Date();

  let year = todayDate.getFullYear();
  let month = todayDate.getMonth() + 1;
  let date = todayDate.getDate();

  if (month < 10) {
    month = "0" + month;
  }
  if (date < 10) {
    date = "0" + date;
  }
  let finalres = date + "-" + month + "-" + year;

  //deactivate
  const onDeactive = (e) => {
    e.preventDefault();
    const finalData = {
      EnquiryId: EnquiryId,
      enquiryDeactiveReason: enquiryDeactiveReason,

      DeactiveById: user && user._id,
      DeactiveByName: user && user.userName,
      DeactiveByDateTime: new Date().toLocaleString("en-GB"),
    };

    deleteEnquiry(finalData);
    getEnquiryDetails({
      userId: user && user._id,
      enquiryStatus: "UnResolved",
    });

    handleClose();
    getUnresolvedData({
      userId: user && user._id,
      enquiryStatus: "UnResolved",
    });
  };

  //refresh
  const onClickReset = () => {
    getEnquiryDetails({
      userId: user && user._id,
      enquiryStatus: "UnResolved",
    });
    getUnresolvedData({
      userId: user && user._id,
      enquiryStatus: "UnResolved",
    });
    window.location.reload();
  };

  //on Delete
  const onDelete = (id) => {
    setEnquiryId(id);
    handleShow();
  };

  //Edit Modal
  const [EnquiryData, setEnquiryData] = useState(null);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const handleUpdateModalClose = () => {
    setShowUpdateModal(false);
  };
  //on Edit
  const onedit = (data) => {
    setShowUpdateModal(true);
    setEnquiryData(data);
  };

  //radioSelect start

  const onRadioSelect = (radiodata) => {
    if (radiodata === "Resolved") {
      setFormData({
        ...formData,
        radiodata: "Resolved",
      });
    } else if (radiodata === "UnResolved") {
      setFormData({
        ...formData,
        radiodata: "UnResolved",
      });
    } else {
      setFormData({
        ...formData,
        radiodata: "UnResolved",
      });
    }
  };

  //radioselect end

  const { showonclickSection } = showHide2;

  const onStatuscatChange = (e) => {
    getEnquiryDetails({ enquiryStatus: e.value, userId: user && user._id });
  };
  const [oldData, setOldData] = useState("");

  const onClickHandler = (allEnquiryData, idx) => {
    setcolorData(idx);
    setShowHide2({
      showonclickSection: true,
    });
    setOldData(allEnquiryData);
    setFormData({
      ...formData,
      enquiryId: allEnquiryData._id,
    });
    getLastEnquiryHistoryDeatils({ clientId: allEnquiryData._id });
  };

  let nameFilter = [];
  let TotalCount = 0;

  allEnquiry &&
    allEnquiry.map((ele) => {
      TotalCount += 1;
    });

  let tounq = allEnquiry.map((ele) => ele.enteredBy);
  let unqi = [...new Set(tounq)];

  // console.log("nonunq", [...new Set(tounq)]);
  namewithcountdropdown &&
    namewithcountdropdown.map((ele) => {
      nameFilter.push({
        label: ele.showField,
        value: ele._id,
      });
    });

  const [username, setusername] = useState({
    label:
      namewithcountdropdown &&
      namewithcountdropdown[0] &&
      namewithcountdropdown[0]._id,
    value:
      namewithcountdropdown &&
      namewithcountdropdown[0] &&
      namewithcountdropdown[0]._id,
  });

  const onnameChange = (e) => {
    let data = e.label.split("-")[0];
    let finalres = {
      label: data,
      value: data,
    };
    setusername(finalres);
    getEnquiryDetails({ username: data, enquiryStatus: "UnResolved" });
  };

  const [colorData, setcolorData] = useState();

  const onSubmit = (e) => {
    e.preventDefault();

    let finalData = {
      clientId: oldData._id,

      radiodata: radiodata ? radiodata : "UnResolved",

      discussionPointNotes: discussionPointNotes,
      clientName: oldData.clientName,
      enquiryTo: oldData.enquiryTo,
      enquiryType: oldData.enquiryType,
      enteredBy: oldData.enteredBy,
      enteredById: oldData.enteredById,
    };
    AddenquiryHistory(finalData);
    updateEnquiry(finalData);
    getEnquiryDetails({
      userId: user && user._id,
      enquiryStatus: "UnResolved",
    });
    getUnresolvedData({
      userId: user && user._id,
      enquiryStatus: "UnResolved",
    });
    getLastEnquiryHistoryDeatils({ clientId: oldData._id });
    setFormData({
      ...formData,
      enquiryId: "",
      discussionPointNotes: "",
      radiodata: "",
    });
  };

  const [showHistoryTable, setshowHistoryTable] = useState(false);
  const buttonOnclickClose = () => setshowHistoryTable(false);

  const onHistoryClick = (e) => {
    setshowHistoryTable(true);
    getUnresolvedData({
      userId: user && user._id,
      enquiryStatus: "UnResolved",
    });
  };

  return !isAuthenticated || !user  ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className=" col-lg-3 col-md-11 col-sm-10 col-10">
              <h4 className="heading_color">All Enquiry</h4>
            </div>
            <div className=" col-lg-2 col-md-11 col-sm-10 col-10 py-2">
              <Select
                name="projectStatusCategory"
                options={StatusCategory}
                isSearchable={true}
                defaultValue={{ label: "UnResolved", value: 0 }}
                // value={projectStatusCategory}
                placeholder="Select"
                onChange={(e) => onStatuscatChange(e)}
                theme={(theme) => ({
                  ...theme,
                  height: 26,
                  minHeight: 26,
                  borderRadius: 1,
                  colors: {
                    ...theme.colors,
                    primary: "black",
                  },
                })}
              />
            </div>
            {(user && user.empCtAccess && user.empCtAccess === "All") ||
            (user &&
              user.userGroupName &&
              user.userGroupName === "Clarical Admins") ? (
              <>
                {" "}
                <div className=" col-lg-2 col-md-11 col-sm-10 col-10 py-2">
                  <Select
                    name="enteredbyname"
                    options={nameFilter}
                    isSearchable={true}
                    value={username}
                    placeholder="Select"
                    onChange={(e) => onnameChange(e)}
                    theme={(theme) => ({
                      ...theme,
                      height: 26,
                      minHeight: 26,
                      borderRadius: 1,
                      colors: {
                        ...theme.colors,
                        primary: "black",
                      },
                    })}
                  />
                </div>
              </>
            ) : (
              <>
                <div className=" col-lg-2 col-md-11 col-sm-10 col-10 py-2">
                  {/* //need this blank for allignment purpose */}
                </div>
              </>
            )}

            <div className="col-lg-1 col-md-11 col-sm-12 col-11 py-2">
              <AddEnquiry />

              {/* <button
                className="btn btn_green_bg float-right"
                // onClick={() => onClickReset()}
              >
                Add Enquiry
              </button> */}
            </div>
            <div className="col-lg-4 col-md-11 col-sm-12 col-11 py-2">
              <button
                className="btn btn_green_bg float-right"
                onClick={() => onClickReset()}
              >
                Refresh
              </button>
            </div>
          </div>
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className="col-lg-8 col-md-12 col-sm-12 col-12 text-center">
              <section className="body">
                <div className=" body-inner no-padding table-responsive fixTableHead">
                  <table
                    className="table table-bordered table-striped hoverrow smll_row"
                    id="datatable2"
                  >
                    <thead>
                      <tr>
                        {/* <th style={{ width: "10%" }}>Client Name</th> */}
                        <th style={{ width: "9%" }}>Client Name </th>
                        <th style={{ width: "15%" }}>Email ID</th>
                        <th style={{ width: "10%" }}>EnquiryTo</th>
                        <th style={{ width: "10%" }}>Notes</th>
                        <th style={{ width: "10%" }}>DCT/SCT</th>
                        <th style={{ width: "10%" }}>Entered Date</th>
                        <th style={{ width: "7%" }}>Entered By</th>
                        <th style={{ width: "10%" }}>Estimated ERD</th>
                        <th style={{ width: "7%" }}>Status</th>
                        <th style={{ width: "5%" }}>OP</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allEnquiry &&
                        allEnquiry.map((allEnquiryData, idx) => {
                          var ED =
                            allEnquiryData.estimatedERD &&
                            allEnquiryData.estimatedERD.split(/\D/g);
                          var estimatedERD = [
                            ED && ED[2],
                            ED && ED[1],
                            ED && ED[0],
                          ].join("-");
                          var EDT =
                            allEnquiryData.enteredDateTime &&
                            allEnquiryData.enteredDateTime.split(/\D/g);
                          var enteredDateTime = [
                            EDT && EDT[2],
                            EDT && EDT[1],
                            EDT && EDT[0],
                          ].join("-");
                          if (allEnquiryData.enteredBy === username.value) {
                            return (
                              <tr
                                key={idx}
                                className={
                                  colorData === idx
                                    ? "seletedrowcolorchange"
                                    : ""
                                }
                                onClick={() =>
                                  onClickHandler(allEnquiryData, idx)
                                }
                              >
                                <td>
                                  <b>{allEnquiryData.clientName}</b>
                                </td>
                                <td>{allEnquiryData.clientEmailId}</td>
                                <td>{allEnquiryData.enquiryTo}</td>

                                <td>{allEnquiryData.enquiryNotes}</td>
                                <td>{allEnquiryData.enquiryType}</td>
                                <td>{enteredDateTime}</td>
                                <td>{allEnquiryData.enteredBy}</td>
                                <td>{estimatedERD}</td>
                                <td>{allEnquiryData.enquiryStatus}</td>
                                <td>
                                  <img
                                    className="img_icon_size log"
                                    onClick={() => onedit(allEnquiryData)}
                                    src={require("../../static/images/edit_icon.png")}
                                    alt="Edit"
                                    title="Edit Category"
                                  />
                                  &nbsp;
                                  <img
                                    className="img_icon_size log"
                                    onClick={() => onDelete(allEnquiryData._id)}
                                    src={require("../../static/images/delete.png")}
                                    alt="Delete User"
                                    title="Delete Category"
                                  />
                                </td>
                              </tr>
                            );
                          } else if (username.value === "All") {
                            return (
                              <tr
                                key={idx}
                                className={
                                  colorData === idx
                                    ? "seletedrowcolorchange"
                                    : ""
                                }
                                onClick={() =>
                                  onClickHandler(allEnquiryData, idx)
                                }
                              >
                                <td>
                                  <b>{allEnquiryData.clientName}</b>
                                </td>
                                <td>{allEnquiryData.clientEmailId}</td>
                                <td>{allEnquiryData.enquiryTo}</td>

                                <td>{allEnquiryData.enquiryNotes}</td>
                                <td>{allEnquiryData.enquiryType}</td>
                                <td>{enteredDateTime}</td>
                                <td>{allEnquiryData.enteredBy}</td>
                                {estimatedERD < finalres ? (
                                  <td style={{ background: "#dda6a6" }}>
                                    {estimatedERD}
                                  </td>
                                ) : (
                                  <td>{estimatedERD}</td>
                                )}
                                {/* <td>{estimatedERD}</td> */}
                                <td>{allEnquiryData.enquiryStatus}</td>
                                <td>
                                  <img
                                    className="img_icon_size log"
                                    onClick={() => onedit(allEnquiryData)}
                                    src={require("../../static/images/edit_icon.png")}
                                    alt="Edit"
                                    title="Edit Category"
                                  />
                                  &nbsp;
                                  <img
                                    className="img_icon_size log"
                                    onClick={() => onDelete(allEnquiryData._id)}
                                    src={require("../../static/images/delete.png")}
                                    alt="Delete User"
                                    title="Delete Category"
                                  />
                                </td>
                              </tr>
                            );
                          }
                        })}
                    </tbody>
                  </table>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-md-6 col-sm-11 col-11 align_right">
                    {/* <label>Count :{allEnquiry && allEnquiry.length}</label> */}
                  </div>
                </div>
              </section>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 col-12  ">
              <div className=" col-lg-12 col-md-6 col-sm-6 col-12 card-new no_padding sidePart2divHeight">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12 no_padding ">
                  <label className="sidePartHeading ">Enquiry Status</label>
                  {showonclickSection && (
                    <div className="col-lg-12 col-md-6 col-sm-6 col-12 py-2">
                      <form onSubmit={(e) => onSubmit(e)}>
                        <div
                          className="row col-lg-12 col-md-6 col-sm-6 col-12 "
                          style={{ height: "37vh" }}
                        >
                          <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                            <label className="label-control">Resolved : </label>
                            &emsp;
                            <input
                              className="radiolevels"
                              type="radio"
                              id="Resolved"
                              value="Resolved"
                              name="radiolevels"
                              onClick={() => onRadioSelect("Resolved")}
                            />
                          </div>
                          <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                            <label className="label-control">
                              Un-Resolved :{" "}
                            </label>
                            &emsp;
                            <input
                              className="radiolevels"
                              type="radio"
                              id="UnResolved"
                              value="UnResolved"
                              onClick={() => onRadioSelect("UnResolved")}
                              name="radiolevels"
                            />
                          </div>
                          <div className=" col-lg-12 col-md-6 col-sm-6 col-12 ">
                            <label className="label-control">
                              Discussion Points :
                            </label>
                            <textarea
                              name="discussionPointNotes"
                              id="discussionPointNotes"
                              className="textarea form-control"
                              rows="4"
                              placeholder="Discussion Points Notes"
                              value={discussionPointNotes}
                              style={{ width: "100%" }}
                              onChange={(e) => onInputchange(e)}
                              required
                            ></textarea>
                          </div>
                          {/* {showhistory_submitSection && ( */}
                          <div className="col-lg-12 col-md-6 col-sm-6 col-12 ">
                            <input
                              type="submit"
                              name="Submit"
                              value="Submit"
                              className="btn sub_form btn_continue blackbrd Save float-right"
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
              <div className=" col-lg-12 col-md-6 col-sm-6 col-12 card-new no_padding sidePart2divHeight">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12 no_padding ">
                  <label className="sidePartHeading ">Last Discussion</label>

                  <div
                    className="row col-lg-12 col-md-6 col-sm-6 col-12  py-2"
                    style={{ height: "40vh" }}
                  >
                    <div className="col-lg-12 col-md-6 col-sm-6 col-12 ">
                      <button
                        className="btn btn_green_bg float-right"
                        onClick={() => onHistoryClick()}
                      >
                        History
                      </button>
                    </div>
                    <div className="col-lg-12 col-md-6 col-sm-6 col-12 ">
                      <label className="label-control">Last Discussion :</label>
                      <textarea
                        className="textarea form-control"
                        rows="4"
                        placeholder=""
                        style={{ width: "100%" }}
                        value={
                          historyDetails &&
                          historyDetails[0] &&
                          historyDetails[0].discussionPointNotes
                            ? historyDetails &&
                              historyDetails[0] &&
                              historyDetails[0].discussionPointNotes
                            : ""
                        }
                        disabled
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Modal
        show={showHistoryTable}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <div className="col-lg-10">
            <h3 className="modal-title text-center">Enquiry History </h3>
          </div>
          <div className="col-lg-2">
            <button onClick={buttonOnclickClose} className="close">
              <img
                src={require("../../static/images/close.png")}
                alt="X"
                style={{ height: "20px", width: "20px" }}
              />
            </button>
          </div>
        </Modal.Header>

        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12 text-center">
            <section className="body">
              <div className=" body-inner no-padding table-responsive">
                <table
                  className="table table-bordered table-striped table-hover"
                  id="datatable2"
                >
                  <thead>
                    <tr>
                      <th>Entered By Name </th>
                      <th>Date </th>
                      <th>Discussion Points</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historyDetails &&
                      historyDetails.map((enquiryHistory, idx) => {
                        return (
                          <tr key={idx}>
                            <td>{enquiryHistory.enteredBy}</td>
                            <td>
                              {new Date(
                                enquiryHistory.enteredDateTime
                              ).toLocaleString("en-GB")}
                            </td>
                            <td>{enquiryHistory.discussionPointNotes}</td>

                            <td>{enquiryHistory.radiodata}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </Modal>

      {/* edit modal */}
      <Modal
        show={showUpdateModal}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <div className="col-lg-10">
            <h3 className="modal-title text-center">Edit Enquiry</h3>
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
          <EditEnquiry
            EnquiryData={EnquiryData}
            closeedit={handleUpdateModalClose}
          />
        </Modal.Body>
      </Modal>

      {/*DEACTIVATE MODAL */}

      <Modal
        show={show}
        centered
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header>
          <div className="col-lg-10 ">
            <h3 className="modal-title text-center">DEACTIVATE</h3>
          </div>
          <div className="col-lg-1">
            <button onClick={handleClose} className="close">
              <img
                src={require("../../static/images/close.png")}
                alt="X"
                style={{ height: "20px", width: "20px" }}
              />
            </button>
          </div>
        </Modal.Header>
        <Modal.Body>
          {/*  */}
          <form onSubmit={(e) => onDeactive(e)}>
            <div className="row col-lg-12 col-md-9 col-sm-9 col-12 ">
              <div className="col-lg-12 col-md-4 col-sm-4 col-12">
                <label>
                  Reason for deactivation<span style={{ color: "red" }}>*</span>
                  :
                </label>
              </div>
              <div className="col-lg-12 col-md-4 col-sm-4 col-12 text-center">
                <textarea
                  rows="3"
                  name="enquiryDeactiveReason"
                  onChange={(e) => onInputchange(e)}
                  id="enquiryDeactiveReason"
                  className="textarea form-control "
                  required
                  style={{ border: "1px solid black" }}
                ></textarea>
              </div>
              <div className="col-lg-12 col-md-4 col-sm-4 col-12 py-2">
                <label>Are you sure you want to Deactivate?</label>
              </div>
              <div className=" col-lg-12 col-md-9 col-sm-9 col-12 text-right">
                <button
                  className="btn sub_form btn_continue blackbrd Save float-right"
                  type="submit"
                >
                  {" "}
                  Deactivate
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

Enquiry.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  sct: state.sct,
});

export default connect(mapStateToProps, {
  getEnquiryDetails,
  updateEnquiry,
  AddenquiryHistory,
  deleteEnquiry,
  getLastEnquiryHistoryDeatils,
  getUnresolvedData,
})(Enquiry);
