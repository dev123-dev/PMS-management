import React, { useState, Fragment, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getAllFeedback, EditFeedbackStatusData } from "../../actions/settings";
import AddFeedback from "./AddFeedback";
import EditFeedback from "./EditFeedback";
import Select from "react-select";
import ChangeFeedbackStatus from "./ChangeFeedbackStatus";
const AllFeedback = ({
  auth: { allUser, isAuthenticated, user, users },
  settings: { allFeedback },
  getAllFeedback,
  EditFeedbackStatusData,
}) => {
  useEffect(() => {
    getAllFeedback();
  }, [getAllFeedback]);
  const priorityCategory = [
    { value: "Pending", label: "Pending" },
    { value: "Done", label: "Done" },
    { value: "Cancel", label: "Cancel" },
  ];

  const feedbackBelongs = [
    { value: "JT", label: "JT" },
    { value: "DCT", label: "DCT" },
    { value: "SCT", label: "SCT" },
    { value: "Billing", label: "Billing" },
  ];

  const [formData, setFormData] = useState({
    feedbackpriority: "",
    projectStatusCategory: "",
    projectStatusData: priorityCategory[0],
    feedbackBelongsTo: "",
    // feedbackBelongsTo: feedbackBelongs[0],
    isSubmitted: false,
  });
  // const onInputChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };
  const { projectStatusData, feedbackBelongsTo } = formData;

  const [showAddfeedbackModal, setShowAddFeedbackModal] = useState(false);
  const handleAddFeedbackModalClose = () => setShowAddFeedbackModal(false);
  const onClickHandler = () => {
    setShowAddFeedbackModal(true);
  };
  const onAddFeedbackModalChange = (e) => {
    if (e) {
      handleAddFeedbackModalClose();
    }
  };

  const [showEditModal, setShowEditModal] = useState(false);
  const handleEditModalClose = () => setShowEditModal(false);

  const onEditModalChange = (e) => {
    if (e) {
      handleEditModalClose();
    }
  };

  const [userDatas, setUserDatas] = useState(null);
  const onUpdate = (paymentMode, idx) => {
    setShowEditModal(true);
    setUserDatas(paymentMode);
  };

  // const onfeedbackpriorityChange = (e) => {
  //   if (e) {
  //     setFormData({
  //       ...formData,
  //       feedbackpriority: e,
  //     });
  //   }
  // };

  const onStatuscatChange1 = (e) => {
    if (e) {
      setFormData({
        ...formData,
        projectStatusData: e,
      });
    }

    const finalData = {
      feedbackStatus: e.value,
    };

    getAllFeedback(finalData);
  };

  const onfeedbackBelongsChange = (e) => {
    if (e) {
      setFormData({
        ...formData,
        feedbackBelongsTo: e,
      });
    }
    const finalData = {
      feedbackBelongsTo: e.value,
    };

    getAllFeedback(finalData);
  };

  const [showStatusModal, setShowStatusModal] = useState(false);
  const handleStatusModalClose = () => setShowStatusModal(false);

  const onStatusModalChange = (e) => {
    if (e) {
      handleStatusModalClose();
    }
  };

  const [userDatas1, setUserDatas1] = useState(null);

  const [statusValue, setStatusValue] = useState("");
  const onSliderChange = (allFeedback) => (e) => {
    setStatusValue(e);
    setShowStatusModal(true);

    // setUserDatas1(allFeedback);
    let finalData = {
      recordId: allFeedback ? allFeedback._id : "",
      feedbackStatus: e.label,
      feedbackEditedById: user._id,
    };
    setUserDatas1(finalData);
  };

  const onClickReset = () => {
    getAllFeedback("");
    setFormData({
      ...formData,
      feedbackBelongsTo: "",
    });
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className="col-lg-2 col-md-11 col-sm-10 col-10">
              <h5 className="heading_color">All FeedBacks</h5>
            </div>
            <div className="col-lg-2 col-md-11 col-sm-10 col-10 py-2">
              <Select
                name="feedbackBelongsTo"
                options={feedbackBelongs}
                isSearchable={true}
                value={feedbackBelongsTo}
                placeholder="Select"
                onChange={(e) => onfeedbackBelongsChange(e)}
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
            <div className="col-lg-2 col-md-11 col-sm-10 col-10 py-2">
              <Select
                name="projectStatusData"
                options={priorityCategory}
                isSearchable={true}
                value={projectStatusData}
                placeholder="Select Status Category"
                onChange={(e) => onStatuscatChange1(e)}
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

            <div className="col-lg-6 col-md-11 col-sm-12 col-11 py-3">
              <button
                className="btn btn_green_bg float-right"
                onClick={() => onClickReset()}
              >
                Refresh
              </button>
              <Link
                to="#"
                className="btn btn_green_bg float-right"
                onClick={() => onClickHandler()}
              >
                Add Feedback
              </Link>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12 text-center">
              <section className="body">
                <div className=" body-inner no-padding table-responsive fixTableHead">
                  <table
                    className="table table-bordered table-striped table-hover"
                    id="datatable2"
                  >
                    <thead>
                      <tr>
                        <th>Problem</th>
                        <th>Given By</th>
                        <th>Changes</th>
                        <th>Belongs To</th>
                        <th>Priority</th>
                        <th>Notes</th>
                        {(user.userGroupName &&
                          user.userGroupName === "Administrator") ||
                        user.userGroupName === "Super Admin" ? (
                          <>
                            {projectStatusData.value === "Pending" ? (
                              <th>OP</th>
                            ) : (
                              <></>
                            )}
                          </>
                        ) : (
                          <></>
                        )}
                        {user.designationName &&
                        user.designationName === "Super Admin" ? (
                          <th style={{ width: "12%" }}>Status</th>
                        ) : (
                          <></>
                        )}
                      </tr>
                    </thead>
                    {/* SLAP UserGroupRights  */}
                    <tbody>
                      {allFeedback &&
                        allFeedback.map((allFeedback, idx) => {
                          return (
                            <tr key={idx}>
                              <td>{allFeedback.feedbackProblem}</td>
                              <td>{allFeedback.feedbackEnteredByName}</td>
                              <td>{allFeedback.feedbackCategory}</td>
                              <td>{allFeedback.feedbackBelongsTo}</td>
                              <td>{allFeedback.feedbackPriority}</td>

                              <td>{allFeedback.feedbackNotes}</td>
                              {(user.userGroupName &&
                                user.userGroupName === "Administrator") ||
                              user.userGroupName === "Super Admin" ? (
                                <>
                                  {allFeedback.feedbackStatus &&
                                  allFeedback.feedbackStatus === "Pending" ? (
                                    <td>
                                      <img
                                        className="img_icon_size log"
                                        onClick={() =>
                                          onUpdate(allFeedback, idx)
                                        }
                                        src={require("../../static/images/edit_icon.png")}
                                        alt="Edit"
                                        title="Edit"
                                      />
                                    </td>
                                  ) : (
                                    <></>
                                  )}
                                </>
                              ) : (
                                <></>
                              )}

                              {user.designationName &&
                              user.designationName === "Super Admin" ? (
                                <td>
                                  <Select
                                    styles={{
                                      control: (base) => ({
                                        ...base,
                                        background: "#456792",
                                      }),
                                      singleValue: (base) => ({
                                        ...base,
                                        color: "#fff",
                                      }),
                                      input: (base) => ({
                                        ...base,
                                        color: "#fff",
                                      }),
                                    }}
                                    name="projectStatusData"
                                    value={{
                                      label: allFeedback.feedbackStatus,
                                      value: allFeedback.feedbackStatus,
                                    }}
                                    options={priorityCategory}
                                    isSearchable={true}
                                    placeholder="Select"
                                    onChange={onSliderChange(allFeedback)}
                                  />
                                </td>
                              ) : (
                                <></>
                              )}
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        </section>
        <Modal
          show={showAddfeedbackModal}
          backdrop="static"
          keyboard={false}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <div className="col-lg-10">
              <h3 className="modal-title text-center">Add Feedback</h3>
            </div>
            <div className="col-lg-1">
              <button onClick={handleAddFeedbackModalClose} className="close">
                <img
                  src={require("../../static/images/close.png")}
                  alt="X"
                  style={{ height: "20px", width: "20px" }}
                />
              </button>
            </div>
          </Modal.Header>
          <Modal.Body>
            <AddFeedback onAddFeedbackModalChange={onAddFeedbackModalChange} />
          </Modal.Body>
        </Modal>

        <Modal
          show={showEditModal}
          backdrop="static"
          keyboard={false}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <div className="col-lg-10">
              <h3 className="modal-title text-center">Edit Feedback</h3>
            </div>
            <div className="col-lg-1">
              <button onClick={handleEditModalClose} className="close">
                <img
                  src={require("../../static/images/close.png")}
                  alt="X"
                  style={{ height: "20px", width: "20px" }}
                />
              </button>
            </div>
          </Modal.Header>
          <Modal.Body>
            <EditFeedback
              onEditModalChange={onEditModalChange}
              feedbackData={userDatas}
            />
          </Modal.Body>
        </Modal>

        <Modal
          show={showStatusModal}
          backdrop="static"
          keyboard={false}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <div className="col-lg-10">
              <h3 className="modal-title text-center"> Feedback</h3>
            </div>
            <div className="col-lg-1">
              <button onClick={handleStatusModalClose} className="close">
                <img
                  src={require("../../static/images/close.png")}
                  alt="X"
                  style={{ height: "20px", width: "20px" }}
                />
              </button>
            </div>
          </Modal.Header>

          <Modal.Body>
            <ChangeFeedbackStatus
              onStatusModalChange={onStatusModalChange}
              feedbackData1={userDatas1}
            />
          </Modal.Body>
        </Modal>
      </div>
    </Fragment>
  );
};

AllFeedback.propTypes = {
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  getAllFeedback: PropTypes.func.isRequired,
  EditFeedbackStatusData: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  settings: state.settings,
});

export default connect(mapStateToProps, {
  getAllFeedback,
  EditFeedbackStatusData,
})(AllFeedback);
