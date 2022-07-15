import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import Spinner from "../layout/Spinner";
import Select from "react-select";
import { Link } from "react-router-dom";
import {
  getAllchanges,
  getAmendmentProjectDeatils,
  AddAmendmentHistory,
  getLastAmendmentHistoryDeatils,
} from "../../actions/projects";

import AmendHistory from "./AmendHistory";
const Amendments = ({
  auth: { isAuthenticated, user, users },
  project: { amendentHistory, amendentLastHistory, amendmentProjects },
  getAmendmentProjectDeatils,
  AddAmendmentHistory,
  getLastAmendmentHistoryDeatils,
}) => {
  useEffect(() => {
    getAmendmentProjectDeatils();
  }, [getAmendmentProjectDeatils]);
  //formData
  const [formData, setFormData] = useState({
    projectStatusCategory: "",
    discussionPointsNotes: "",
    discussionPoint: "",
    radiodata: "",
    isSubmitted: false,
  });

  // console.log("last", amendentLastHistory);
  const StatusCategory = [
    { value: "Resolved", label: "Resolved" },
    { value: "UnResolved", label: "UnResolved" },
  ];
  const {
    radiodata,
    projectStatusCategory,
    discussionPointsNotes,
    isSubmitted,
  } = formData;
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onStatuscatChange = (e) => {
    if (e) {
      setFormData({
        ...formData,
        projectStatusCategory: e,
      });
    }
    let setTypeData = e.value;
    getAmendmentProjectDeatils({ setTypeData: setTypeData });
  };
  const [ProjLastchnage, setProjLastchnage] = useState(null);
  const [ProjRestore, setProjRestore] = useState(null);
  const onClickHandler = (amendmentProjects, idx) => {
    setShowHide({
      ...showHide,
      showhistory_submitSection: true,
    });
    setProjRestore(amendmentProjects);
    setProjLastchnage(
      amendentLastHistory && amendentLastHistory.discussionPoints
        ? amendentLastHistory.discussionPoints
        : ""
    );
    // console.log(amendmentProjects._id);
    getLastAmendmentHistoryDeatils({ projectId: amendmentProjects._id });
  };
  const [showHide, setShowHide] = useState({
    showhistory_submitSection: false,
  });
  const { showhistory_submitSection } = showHide;
  const onRadioSelect = (radiodata) => {
    if (radiodata === "Resolved") {
      setFormData({
        ...formData,
        radiodata: "Resolved",
        major: "",
      });
    } else if (radiodata === "UnResolved") {
      setFormData({
        ...formData,
        Resolved: "",
        radiodata: "UnResolved",
      });
    } else {
      setFormData({
        ...formData,
        [radiodata]: 1,
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      projectId: ProjRestore ? ProjRestore._id : "",
      projectName: ProjRestore.projectName,
      discussionPoints: discussionPointsNotes,
      amendmentType: radiodata,
      amendmentEnteredById: user._id,
      amendmentEnteredByName: user.empFullName,
    };

    AddAmendmentHistory(finalData);
    setFormData({
      ...formData,
      projectId: "",
      projectName: "",
      discussionPointsNotes: "",
      radiodata: "",
    });
  };

  const onHistoryModalChange = (e) => {
    if (e) {
      handleHistoryModalClose();
    }
  };

  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const handleHistoryModalClose = () => setShowHistoryModal(false);

  const [userData, setUserData] = useState(ProjRestore);
  const onEdit = (e) => {
    setShowHistoryModal(true);
    const finalData = {
      projectId: ProjRestore ? ProjRestore._id : "",
    };
    setUserData(finalData);
  };
  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className=" col-lg-1 col-md-11 col-sm-10 col-10">
              <h5 className="heading_color">Amendments</h5>
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
          </div>
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className="col-lg-8 col-md-12 col-sm-12 col-12 text-center">
              <section className="body">
                <div className=" body-inner no-padding table-responsive fixTableHead">
                  <table
                    className="table table-bordered table-striped table-hover smll_row"
                    id="datatable2"
                  >
                    <thead>
                      <tr>
                        <th style={{ width: "10%" }}>Client Name</th>
                        <th style={{ width: "6%" }}>Folder </th>
                        <th style={{ width: "25%" }}>Project Name</th>
                        <th style={{ width: "13%" }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {amendmentProjects &&
                        amendmentProjects.map((amendmentProjects, idx) => {
                          return (
                            <tr key={idx}>
                              <td>
                                <Link
                                  className="float-left ml-3"
                                  to="#"
                                  onClick={() =>
                                    onClickHandler(amendmentProjects, idx)
                                  }
                                >
                                  {amendmentProjects.clientName}
                                </Link>
                              </td>
                              <td>
                                <b>{amendmentProjects.clientFolderName}</b>
                              </td>
                              <td>{amendmentProjects.projectName}</td>

                              <td>{amendmentProjects.projectStatusType}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 col-12  ">
              <div className="col-lg-12 col-md-6 col-sm-6 col-12 card-new py-2">
                <form onSubmit={(e) => onSubmit(e)}>
                  <div className="row col-lg-12 col-md-6 col-sm-6 col-12 ">
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
              </div>

              <div className="row col-lg-12 col-md-6 col-sm-6 col-12 card-new py-2">
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
              </div>
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
            <h3 className="modal-title text-center">Amendment History </h3>
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

Amendments.propTypes = {
  auth: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  getAmendmentProjectDeatils: PropTypes.func.isRequired,
  AddAmendmentHistory: PropTypes.func.isRequired,
  getLastAmendmentHistoryDeatils: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  project: state.project,
  settings: state.settings,
});

export default connect(mapStateToProps, {
  getAmendmentProjectDeatils,
  AddAmendmentHistory,
  getLastAmendmentHistoryDeatils,
})(Amendments);
