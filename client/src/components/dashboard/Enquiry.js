import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import Spinner from "../layout/Spinner";
import Select from "react-select";
import {
  getAmendmentProjectDeatils,
  getLastAmendmentHistoryDeatils,
  updateProjectTrack,
} from "../../actions/projects";
import AddEnquiry from "../dashboard/AddEnquiry";
import AmendLastDiscussion from "./AmendLastDiscussion";
import AmendAddDiscussion from "./AmendAddDiscussion";
import AmendHistory from "./AmendHistory";
const Enquiry = ({
  auth: { isAuthenticated, user, users },
  sct: { allEnquiry },
  project: { amendmentProjects },
  getAmendmentProjectDeatils,
  getLastAmendmentHistoryDeatils,
}) => {
  useEffect(() => {
    getAmendmentProjectDeatils();
  }, [getAmendmentProjectDeatils]);
  //formData
  const [formData, setFormData] = useState({
    projectStatusCategory: "",
    isSubmitted: false,
  });

  const StatusCategory = [
    { value: "Resolved", label: "Resolved" },
    { value: "UnResolved", label: "UnResolved" },
  ];
  const { projectStatusCategory } = formData;
  const [showHide2, setShowHide2] = useState({
    showonclickSection: false,
  });

  console.log("allEnquiry", allEnquiry);

  const { showonclickSection } = showHide2;

  const onStatuscatChange = (e) => {
    if (e) {
      setFormData({
        ...formData,
        projectStatusCategory: e,
      });
    }
    if (e.value === "Resolved") {
      setShowHide1({
        ...showHide1,
        showunresolvedSection: false,
      });
    } else {
      setShowHide1({
        ...showHide1,
        showunresolvedSection: true,
      });
    }
    let setTypeData = e.value;
    getAmendmentProjectDeatils({ setTypeData: setTypeData });
  };
  const [ProjLastchnage, setProjLastchnage] = useState();
  const [ProjRestore, setProjRestore] = useState();

  const onClickHandler = (amendmentProjects, idx) => {
    setcolorData(idx);
    localStorage.removeItem("getLastAmendmentDetails");
    setProjLastchnage(null);
    setProjRestore(amendmentProjects);
    if (amendmentProjects !== "") {
      const lastAmendment = {
        projectId: amendmentProjects.projectId,
        amendmentCounter: amendmentProjects.amendmentCounter,
      };
      getLastAmendmentHistoryDeatils(lastAmendment);
    }
    setShowHide({
      ...showHide,
      showhistory_submitSection: true,
    });
    setShowHide2({
      ...showHide2,
      showonclickSection: true,
    });
  };

  //   console.log("allEnquiry",allEnquiry)

  const [showHide, setShowHide] = useState({
    showhistory_submitSection: false,
  });
  const [showHide1, setShowHide1] = useState({
    showunresolvedSection: true,
  });
  const [colorData, setcolorData] = useState();
  const { showhistory_submitSection } = showHide;
  const { showunresolvedSection } = showHide1;

  const onHistoryModalChange = (e) => {
    if (e) {
      handleHistoryModalClose();
    }
  };

  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const handleHistoryModalClose = () => setShowHistoryModal(false);
  const [userData, setUserData] = useState(ProjRestore);

  return !isAuthenticated || !user || !users ? (
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
                value={projectStatusCategory}
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

            <div className="col-lg-3 col-md-11 col-sm-12 col-11 py-2">
              <AddEnquiry />

              {/* <button
                className="btn btn_green_bg float-right"
                // onClick={() => onClickReset()}
              >
                Add Enquiry
              </button> */}
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


                          
                          return (
                            <tr
                              key={idx}
                              //   className={
                              //     colorData === idx ? "seletedrowcolorchange" : ""
                              //   }
                              //   onClick={() =>
                              //     onClickHandler(amendmentProjects, idx)
                              //   }
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
                              <td></td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-md-6 col-sm-11 col-11 align_right">
                    <label>
                      Count :
                      {/* {amendmentProjects && amendmentProjects.length} */}
                    </label>
                  </div>
                </div>
              </section>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 col-12  ">
              <div className=" col-lg-12 col-md-6 col-sm-6 col-12 card-new no_padding sidePart2divHeight">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12 no_padding ">
                  <label className="sidePartHeading ">Enquiry Status</label>
                  {showonclickSection && (
                    <AmendAddDiscussion ProjRestoreVal={ProjRestore} />
                  )}
                </div>
              </div>
              <div className=" col-lg-12 col-md-6 col-sm-6 col-12 card-new no_padding sidePart2divHeight">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12 no_padding ">
                  <label className="sidePartHeading ">Last Discussion</label>
                  {showonclickSection && (
                    <AmendLastDiscussion
                      ProjLastchnageVal={ProjLastchnage}
                      ProjRestoreVal={ProjRestore}
                      setProjLastchnageFunc={setProjLastchnage}
                    />
                  )}
                </div>
              </div>

              {/* <div className="col-lg-12 col-md-6 col-sm-6 col-12 card-new py-2">
                {showunresolvedSection && (
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
                        <label className="label-control">Un-Resolved : </label>
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
                          name="discussionPointsNotes"
                          id="discussionPointsNotes"
                          className="textarea form-control"
                          rows="4"
                          placeholder="discussionPointsNotes"
                          value={discussionPointsNotes}
                          style={{ width: "100%" }}
                          onChange={(e) => onInputChange(e)}
                          required
                        ></textarea>
                      </div>
                      {showhistory_submitSection && (
                        <div className="col-lg-12 col-md-6 col-sm-6 col-12 ">
                          <input
                            type="submit"
                            name="Submit"
                            value="Submit"
                            className="btn sub_form btn_continue blackbrd Save float-right"
                          />
                        </div>
                      )}
                    </div>
                  </form>
                )}
              </div> */}

              {/* <div
                className="row col-lg-12 col-md-6 col-sm-6 col-12 card-new py-2"
                style={{ height: "40vh" }}
              >
                <div className="col-lg-12 col-md-6 col-sm-6 col-12 ">
                  {showhistory_submitSection && (
                    <button
                      className="btn btn_green_bg float-right"
                      onClick={() => onEdit(amendmentProjects)}
                    >
                      History
                    </button>
                  )}
                </div>
                <div className="col-lg-12 col-md-6 col-sm-6 col-12 ">
                  <label className="label-control">Last Discussion :</label>
                  <textarea
                    name="ProjLastchnage"
                    id="ProjLastchnage"
                    className="textarea form-control"
                    rows="4"
                    placeholder=""
                    style={{ width: "100%" }}
                    value={ProjLastchnage}
                    onChange={(e) => onInputChange(e)}
                    disabled
                  ></textarea>
                </div>
              </div> */}
            </div>
          </div>
        </section>
      </div>
      <Modal
        show={showHistoryModal}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <div className="col-lg-10">
            <h3 className="modal-title text-center">EnquiryHistory </h3>
          </div>
          <div className="col-lg-2">
            <button onClick={handleHistoryModalClose} className="close">
              <img
                src={require("../../static/images/close.png")}
                alt="X"
                style={{ height: "20px", width: "20px" }}
              />
            </button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <AmendHistory
            amenddata={userData}
            onHistoryModalChange={onHistoryModalChange}
          />
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

Enquiry.propTypes = {
  auth: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  getAmendmentProjectDeatils: PropTypes.func.isRequired,
  getLastAmendmentHistoryDeatils: PropTypes.func.isRequired,
  updateProjectTrack: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  sct: state.sct,
  project: state.project,
  settings: state.settings,
});

export default connect(mapStateToProps, {
  getAmendmentProjectDeatils,
  getLastAmendmentHistoryDeatils,
  updateProjectTrack,
})(Enquiry);
