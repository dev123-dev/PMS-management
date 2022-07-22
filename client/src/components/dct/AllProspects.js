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
  updateProjectTrack,
} from "../../actions/projects";
import AllContacts from "./AllContacts";
import AllStatuschange from "./AllStatuschange";
import LastMessageDetails from "./LastMessageDetails";

const AllProspects = ({
  auth: { isAuthenticated, user, users },
  project: { amendentHistory, amendentLastHistory, amendmentProjects },
  getAmendmentProjectDeatils,
  AddAmendmentHistory,
  getLastAmendmentHistoryDeatils,
  updateProjectTrack,
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

  let getLastAmendment = JSON.parse(
    localStorage.getItem("getLastAmendmentDetails")
  );
  // console.log("getLastAmendmentDetails", getLastAmendment);

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
  const [ProjLastchnage, setProjLastchnage] = useState(null);
  const [ProjRestore, setProjRestore] = useState();
  const onClickHandler = (amendmentProjects, idx) => {
    localStorage.removeItem("getLastAmendment");
    // setProjLastchnage(null);
    setShowHide({
      ...showHide,
      showhistory_submitSection: true,
    });
    setProjRestore(amendmentProjects);
    getLastAmendmentHistoryDeatils({ projectId: amendmentProjects.projectId });
  };
  if (getLastAmendment && !ProjLastchnage) {
    setProjLastchnage(
      getLastAmendment && getLastAmendment.discussionPoints
        ? getLastAmendment.discussionPoints
        : ""
    );
  }
  const [showHide, setShowHide] = useState({
    showhistory_submitSection: false,
  });
  const [showHide1, setShowHide1] = useState({
    showunresolvedSection: true,
  });
  console.log("ProjRestore", ProjRestore);
  const { showhistory_submitSection } = showHide;
  const { showunresolvedSection } = showHide1;
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
      projectId: ProjRestore ? ProjRestore.projectId : "",
      projectName: ProjRestore.projectName,
      discussionPoints: discussionPointsNotes,
      amendmentType: radiodata,
      amendmentCounter: ProjRestore.amendmentCounter,
      amendmentEnteredById: user._id,
      amendmentEnteredByName: user.empFullName,
    };
    AddAmendmentHistory(finalData);
    if (radiodata === "Resolved") {
      const updateData = {
        projectId: ProjRestore ? ProjRestore.projectId : "",
        amendmentType: radiodata,
      };
      // console.log(updateData);
      updateProjectTrack(updateData);
    }

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
      projectId: ProjRestore ? ProjRestore.projectId : "",
      amendmentCounter: ProjRestore.amendmentCounter,
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
              <h5 className="heading_color">All Prospects</h5>
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
                        <th style={{ width: "10%" }}>Sl.No</th>
                        <th style={{ width: "6%" }}>Company </th>
                        <th style={{ width: "15%" }}>Website </th>
                        <th style={{ width: "13%" }}>Email</th>
                        <th style={{ width: "13%" }}>Region</th>
                        <th style={{ width: "13%" }}>Contact</th>
                        <th style={{ width: "13%" }}>Op</th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              </section>
            </div>
            <div className="row col-lg-4 col-md-12 col-sm-12 col-12 ">
              <div className=" col-lg-12 col-md-6 col-sm-6 col-12 card-new">
                <AllContacts />
              </div>
              <div className=" col-lg-12 col-md-6 col-sm-6 col-12 card-new py-2">
                <AllStatuschange />
              </div>
              <div className=" col-lg-12 col-md-6 col-sm-6 col-12 card-new py-2">
                <LastMessageDetails />
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
          {/* <AmendHistory
            amenddata={userData}
            onHistoryModalChange={onHistoryModalChange}
          /> */}
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

AllProspects.propTypes = {
  auth: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  getAmendmentProjectDeatils: PropTypes.func.isRequired,
  AddAmendmentHistory: PropTypes.func.isRequired,
  getLastAmendmentHistoryDeatils: PropTypes.func.isRequired,
  updateProjectTrack: PropTypes.func.isRequired,
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
  updateProjectTrack,
})(AllProspects);
