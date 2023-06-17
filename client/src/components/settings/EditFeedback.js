import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { EditFeedbackData,deleteScreenshot,getAllFeedback,
  getExistingscreenshot 
} from "../../actions/settings";
import Select from "react-select";
import FileBase64 from "react-file-base64";
import { Modal } from "react-bootstrap";
import EditScreenshot from "./ViewScreenshot";
const EditFeedback = ({
  auth: { isAuthenticated, user, users, loading, },
  settings:{allScreenshot,},
  feedbackData,
  onEditModalChange,
  EditFeedbackData,
  getAllFeedback,
  deleteScreenshot,
  getExistingscreenshot,
}) => {
  // const[refresh,setrefresh]=useState(false)
  // useEffect(() => {
   
  //   getAllFeedback();
  //   // EditFeedbackData({ recordId: feedbackData ? feedbackData._id : "",});
    
  // }, [refresh]);


  //formData
  const [formData, setFormData] = useState({
    feedbackProblem:
      feedbackData && feedbackData.feedbackProblem
        ? feedbackData.feedbackProblem
        : "",
    feedbackNotes:
      feedbackData && feedbackData.feedbackNotes
        ? feedbackData.feedbackNotes
        : "",

    feedbackCategory:
      feedbackData && feedbackData.feedbackCategory
        ? {
            value: feedbackData.feedbackCategory,
            label: feedbackData.feedbackCategory,
          }
        : "",
    feedbackPriority:
      feedbackData && feedbackData.feedbackPriority
        ? {
            value: feedbackData.feedbackPriority,
            label: feedbackData.feedbackPriority,
          }
        : "",
    feedbackStatus:
      feedbackData && feedbackData.feedbackStatus
        ? {
            value: feedbackData.feedbackStatus,
            label: feedbackData.feedbackStatus,
          }
        : "",

    feedbackBelongsTo:
      feedbackData && feedbackData.feedbackBelongsTo
        ? {
            value: feedbackData.feedbackBelongsTo,
            label: feedbackData.feedbackBelongsTo,
          }
        : "",

    isSubmitted: false,
  });


const screenshotDetails={
  imageId: feedbackData._id,
  
}


  useEffect(()=>{
    getExistingscreenshot(screenshotDetails)
  },[getExistingscreenshot])
  


  const {
    feedbackProblem,
    feedbackCategory,
    feedbackPriority,
    feedbackNotes,
    feedbackStatus,
    feedbackBelongsTo,
  } = formData;

  const ChangesCategory = [
    { value: "Design Level", label: "Design Level" },
    { value: "Work Level", label: "Work Level" },
  ];

  const priorityCategory = [
    { value: "Normal", label: "Normal" },
    { value: "Critical", label: "Critical" },
  ];

  const feedbackBelongs = [
    { value: "JT", label: "JT" },
    { value: "DCT", label: "DCT" },
    { value: "SCT", label: "SCT" },
    { value: "Billing", label: "Billing" },
  ];
  const onStatuscatChange = (e) => {
    if (e) {
      setFormData({
        ...formData,
        feedbackCategory: e,
      });
    }
  };

  const onfeedbackpriorityChange = (e) => {
    if (e) {
      setFormData({
        ...formData,
        feedbackPriority: e,
      });
    }
  };

  const onfeedbackBelongsChange = (e) => {
    if (e) {
      setFormData({
        ...formData,
        feedbackBelongsTo: e,
      });
    }
  };

  /////////////////////////////////////////////////////////123


 

  //edit modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [userImageData, setUserImageData] = useState(null);
  const handleEditModalClose = () => setShowEditModal(false);
  // const onEditModalChange = (e) => {
  //   if (e) {
  //     handleEditModalClose();
  //   }
  // };
  const onUpdateBank = (image, idx) => {
    setShowEditModal(true);
    setUserImageData(image);
    // setUserDatas1(data.dctdata);
  };

  const onRemoveChange = (imageNotes) => {
    const removeList = AddedDetails.filter(
      (AddDetails) => AddDetails.imageNotes !== imageNotes
    );
    AddDetails(removeList);
  };

  const [addData, setFormDatas] = useState({
    imageNotes: "",
    PhotoUpload: "",
  });

  const { imageNotes, PhotoUpload } = addData;
  const [AddedDetails, AddDetails] = useState([]);

  const onInputChange1 = (e) => {
    setFormDatas({ ...addData, [e.target.name]: e.target.value });
  };




  const onDelete = (image) => {
    // setrefresh(true)
    deleteScreenshot({
     screenshotId : image._id,
     feedbackId:feedbackData._id,
     PhotoUpload: image.PhotoUpload,
      imageNotes: image.imageNotes,
     
    });
    // onEditModalChange(true);
   
  };

  const onAdd = (e) => {
    // const loanList = AddedDetails.filter(
    //   (AddDetails) => AddDetails.imageNotes === imageNotes
    // );

    var screenshotDetails = feedbackData.screenshot;
    const existingscreenshotList = screenshotDetails.filter(
      (screenshotDetail) => screenshotDetail.imageNotes === imageNotes
    );

    e.preventDefault();
    // if (loanList.length === 0) {
    if (addData && addData.imageNotes) {
      const addData = {
        imageNotes: imageNotes,
        PhotoUpload: PhotoUpload,
      };
      setFormDatas({
        ...addData,
        imageNotes: "",
        PhotoUpload: "",
      });
      let temp = [];
      temp.push(...AddedDetails, addData);
      AddDetails(temp);
      // setError({
      //   ...error,
      //   bankErrorStyle: { color: "#000" },
      // });
    }
    // }
  };



  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onUpdate = (e) => {
    e.preventDefault();
    // if (checkErrors()) {
    const finalData = {
      recordId: feedbackData ? feedbackData._id : "",
      feedbackProblem: feedbackProblem?.trim(),
      feedbackCategory: feedbackCategory.value,
      feedbackPriority: feedbackPriority.value,
      feedbackBelongsTo: feedbackBelongsTo.value,
      feedbackNotes: feedbackNotes?.trim(),
      feedbackStatus: feedbackStatus.value,
      feedbackEditedById: user._id,
      screenshot: AddedDetails,
    };

    // console.log("final edit", finalData);
    EditFeedbackData(finalData);
    onEditModalChange(true);
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      {" "}
      <form onSubmit={(e) => onUpdate(e)}>
        <div className="row col-lg-12 col-md-11 col-sm-12 col-12 ">
          <div className="col-lg-4 col-md-6 col-sm-6 col-12">
            <label className="label-control">Problem*:</label>
            <input
              type="text"
              name="feedbackProblem"
              value={feedbackProblem}
              className="form-control"
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 col-12">
            <label className="label-control">Changes In* :</label>
            <Select
              name="feedbackCategory"
              options={ChangesCategory}
              isSearchable={true}
              value={feedbackCategory}
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
          <div className="col-lg-4 col-md-6 col-sm-6 col-12">
            <label className="label-control">Priority* :</label>
            <Select
              name="feedbackPriority"
              options={priorityCategory}
              isSearchable={true}
              value={feedbackPriority}
              placeholder="Select"
              onChange={(e) => onfeedbackpriorityChange(e)}
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
          <div className="col-lg-4 col-md-6 col-sm-6 col-12">
            <label className="label-control">Feedback Belongs To* :</label>
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
          <div className="col-lg-4 col-md-6 col-sm-6 col-12">
            <label className="label-control">Notes* :</label>
            <textarea
              name="feedbackNotes"
              id="feedbackNotes"
              className="textarea form-control"
              rows="4"
              placeholder="Notes"
              style={{ width: "100%" }}
              value={feedbackNotes}
              onChange={(e) => onInputChange(e)}
            ></textarea>
          </div>

          <div className="col-lg-4 col-md-6 col-sm-6 col-12"></div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div
              className=" row col-lg-12 col-md-12 col-sm-12 col-12 card1 "
              id="shadow-bck"
              style={{ marginTop: "15px" }}
            >
              <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                <label className="label-control">Upload Screenshot :</label>

                <div className="row col-lg-6 col-md-12 col-sm-12 col-12">
                  <FileBase64
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) => {
                      setFormDatas({
                        ...addData,
                        PhotoUpload: base64,
                      });
                    }}
                  />
                </div>
                <div className=" row  form-group align_right">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12  ">
                    <img
                      className="log_size "
                      alt="Preview"
                      src={`${PhotoUpload}`}
                      style={{ height: "70px", width: "100px" }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                <label className="label-control"> Image Notes * :</label>
                <textarea
                  name="imageNotes"
                  id="imageNotes"
                  className="textarea form-control"
                  rows="2"
                  placeholder="Notes"
                  style={{ width: "100%" }}
                  value={imageNotes}
                  onChange={(e) => onInputChange1(e)}
                 
                ></textarea>
              </div>

              <div className="col-lg-4 col-md-6 col-sm-6 col-12 ">
                <button
                  className="btn btn_green_bg"
                  style={{ marginTop: "80px" }}
                  onClick={(e) => onAdd(e)}
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          <div className="col-lg-12 col-md-12 col-sm-12 col-12 py-3">
            <div className="row card-new py-3">
              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                <div className=" body-inner no-padding  table-responsive">
                  <div className="fixTableHeadjoin">
                    <table
                      className="tabllll table table-bordered table-striped table-hover"
                      id="datatable2"
                    >
                      <thead>
                        <tr>
                          <th style={{ width: "20%" }}>Image</th>
                          <th style={{ width: "40%" }}>Image Notes</th>
                          <th style={{ width: "5%" }}>Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allScreenshot &&
                          allScreenshot.screenshot &&
                          allScreenshot.screenshot.map((image, idx) => {
                            // if (staff.staffStatus === "Active")
                            return (
                              <tr key={idx}>
                                <td className="text-center">
                                  {" "}
                                  <img
                                    className="log_size "
                                    alt="Preview"
                                    src={`${image.PhotoUpload}`}
                                    style={{ height: "40px", width: "70px" }}
                                  />
                                </td>

                                <td>{image.imageNotes}</td>

                                <td className="text-center">
                                  {/* <img
                                    className="img_icon_size log"
                                    onClick={() => onUpdateBank(image, idx)}
                                    src={require("../../static/images/edit_icon.png")}
                                    alt="Edit"
                                    title="Edit"
                                  />{" "}
                                  &nbsp; */}
                                  <img
                                    className="img_icon_size log"
                                    onClick={() =>
                                      onDelete(image,idx)
                                    }
                                    src={require("../../static/images/delete.png")}
                                    alt="Remove"
                                    title="Remove"
                                  />
                                </td>
                              </tr>
                            );
                          })}

                        {AddedDetails &&
                          AddedDetails.map((AddDetail, idx) => {
                            return (
                              <tr key={idx}>
                                <td className="text-center">
                                  {" "}
                                  <img
                                    className="log_size "
                                    alt="Preview"
                                    src={`${AddDetail.PhotoUpload}`}
                                    style={{ height: "40px", width: "70px" }}
                                  />
                                </td>
                                <td>{AddDetail.imageNotes}</td>

                                <td className="text-center">
                                  {/* <img
                                    className="img_icon_size log"
                                    onClick={() => onUpdateBank(bank, idx)}
                                    src={require("../../static/images/edit_icon.png")}
                                    alt="Edit"
                                    title="Edit"
                                  />{" "}
                                  &nbsp; */}
                                  <img
                                    className="img_icon_size log"
                                    onClick={() =>
                                      onRemoveChange(AddDetail.imageNotes)
                                    }
                                    src={require("../../static/images/delete.png")}
                                    alt="Remove"
                                    title="Remove"
                                  />
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                      {/* <tbody>
                        {AddedDetails &&
                          AddedDetails.map((AddDetail, idx) => {
                            return (
                              <tr key={idx}>
                                <td className="text-center">{idx + 1}</td>
                                <td className="text-center">
                                  {" "}
                                  <img
                                    className="log_size "
                                    alt="Preview"
                                    src={`${AddDetail.PhotoUpload}`}
                                    style={{ height: "40px", width: "70px" }}
                                  />
                                </td>
                                <td>{AddDetail.imageNotes}</td>

                                <td className="text-center">
                                  <img
                                    className="img_icon_size log"
                                    onClick={() =>
                                      onRemoveChange(AddDetail.imageNotes)
                                    }
                                    src={require("../../static/images/close-buttonRed.png")}
                                    alt="Remove"
                                    title="Remove"
                                  />
                                </td>
                              </tr>
                            );
                          })}
                      </tbody> */}
                    </table>
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
          <div className="col-lg-8 col-md-6 col-sm-12 col-12">
            <label className="label-control colorRed">
              * Indicates mandatory fields
            </label>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 col-12">
            {loading ? (
              <button
                className="btn sub_form btn_continue blackbrd Save float-right"
                disabled
              >
                Loading...
              </button>
            ) : (
              <input
                type="submit"
                name="Submit"
                value="Update"
                className="btn sub_form btn_continue blackbrd Save float-right"
              />
            )}
          </div>
        </div>
      </form>
      {/* edit modal */}
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
            <h3 className="modal-title text-center">Edit ScreenShot </h3>
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
          <EditScreenshot
            onEditModalChange={onEditModalChange}
            allImageData={userImageData}
            // batchData={batchesdata}
          />
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

EditFeedback.propTypes = {
  auth: PropTypes.object.isRequired,
   EditFeedbackData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  settings:state.settings,
});

export default connect(mapStateToProps, { EditFeedbackData,deleteScreenshot,getAllFeedback ,getExistingscreenshot
})(EditFeedback);
