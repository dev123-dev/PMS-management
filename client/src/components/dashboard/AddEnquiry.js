import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Fragment } from "react";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Select from "react-select";
import {
    getAmendmentProjectDeatils,
    getLastAmendmentHistoryDeatils,
    
  } from "../../actions/projects";

const AddEnquiry = ({
    auth: { isAuthenticated, user, users },
    project: { amendmentProjects },
    getAmendmentProjectDeatils,
    getLastAmendmentHistoryDeatils,
}) => {

  const [show, setshow] = useState("");
  const handleClose = () => setshow("false");



  const [formData, setformData] = useState({
    clientName: "",
    emailId: "",
    category: "",
    EstimatedDate:"",
    notes:"",
    radiodata:"",
  });
  const { clientName, emailId ,category,EstimatedDate,notes,radiodata} = formData;
  const onRadioSelect = (radiodata) => {
    console.log("radiodata",radiodata)
    if (radiodata === "SCT") {
        setformData({
        ...formData,
        radiodata: "SCT",
        major: "",
      });
    } else if (radiodata === "DCT") {
        setformData({
        ...formData,
        SCT: "",
        radiodata: "DCT",
      });
    }
    //  else {
    //     setformData({
    //     ...formData,
    //     [radiodata]: 1,
    //   });
    // }
  };


  const onEnquiryChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  console.log("user",user)
  // Modal show
  const [showAddModal, setShowAddModal] = useState(false);
  const handleAddClose = () => setShowAddModal(false);
  const handleOpen = () => setShowAddModal(true);

  //onSubmit
  const onSubmit = (e) => {
    e.preventDefault();
    const finalData = {
        clientName:clientName,
        clientEmailId:emailId,
        enquiryType:category,
        estimatedERD:EstimatedDate,
        enteredById:user && user._id,
        enquiryStatus:"UnResolved",
        enquiryType:radiodata,
        enquiryNotes:notes,



    };

    console.log("finaldata",finalData)

    // AddEnquiry(finalData);
 

    setformData({
      ...formData,
      clientName: "",
      emailId: "",
      category: "",
      EstimatedDate:"",
      notes:"",
      radiodata:"",
    });
 
    handleAddClose();
  };

  return !isAuthenticated || !user || !users ? (
    <Fragment></Fragment>
  ) : (
    <Fragment>
   
       <button
                className="btn btn_green_bg float-right"
                onClick={handleOpen}
              >
                Add Enquiry
              </button>

      <br />


      <Modal
        show={showAddModal}
   
        backdrop="static"
        keyboard={false}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header >
          <div className="col-lg-10 col-md-10">
            <h3 className="modal-title text-center">ADD Enquiry </h3>
          </div>
          <div className="col-lg-1 col-md-2 ">
            <button onClick={() => handleAddClose()} className="close">
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
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="container ">
              <section className="body">
                <div className="body-inner">
                  <div className="row form-group">
                    <div className="control-group col-md-6 col-lg-6 col-sm-6 col-xs-6">
                      <label className="control-label">
                        Client Name <span style={{ color: "red" }}>*</span>
                      </label>
                      <div className="controls">
                        <input
                          name="clientName"
                          id="clientName"
                          type="text"
                          className="form-control"
                          onChange={(e) => onEnquiryChange(e)}
                          required
                        />
                        <span
                          id="category_result"
                          className="form-input-info"
                        ></span>
                      </div>
                    </div>
                    <div className="control-group col-md-6 col-lg-6 col-sm-6 col-xs-6">
                      <label className="control-label">
                        Email Id <span style={{ color: "red" }}>*</span>
                      </label>
                      <div className="controls">
                        <input
                          name="emailId"
                          id="emailId"
                          type="email"
                          className="form-control"
                          onChange={(e) => onEnquiryChange(e)}
                          required
                        />
                    
                      </div>
                    </div>
                  </div>
                  <div className="row form-group">
                  <div className="control-group col-md-6 col-lg-6 col-sm-6 col-xs-6">
                      <label className="control-label">Category</label>
                      <div className="controls">
                        <input
                          name="category"
                          id="category"
                          type="text"
                          className="form-control"
                          onChange={(e) => onEnquiryChange(e)}
                        />
                     
                      </div>
                    </div>
                  
                    <div className="control-group col-md-6 col-lg-6 col-sm-6 col-xs-6">
                      <label className="control-label">
                       Estimated ERD <span style={{ color: "red" }}></span>
                      </label>
                      <div className="controls">
                        <input
                          name="EstimatedDate"
                          id="EstimatedDate"
                          type="date"
                          className="form-control"
                          onChange={(e) => onEnquiryChange(e)}
                         required
                        />
                       
                      </div>
                    </div>
                  

                    <div className="control-group col-md-6 col-lg-6 col-sm-6 col-xs-6">
                      <label className="control-label">Notes</label>
                      <div className="controls">
                        
                        <textarea  name="notes"
                          id="notes"
                          type="text"
                          className="form-control"
                          onChange={(e) => onEnquiryChange(e)}  required></textarea>
                         
                     
                      </div>
                    </div>
                    <div className="control-group col-md-6 col-lg-6 col-sm-6 col-xs-6">
                      <label className="control-label">Type : </label>
                      
                     
              &emsp;

              {user && user.empCtAccess !="Individual" ?(<><input
                className="radiolevels"
                type="radio"
                id="DCT"
                value="DCT"
                name="radiolevels"
               onClick={() => onRadioSelect("DCT")}
              /><label className="label-control">DCT </label>
                       </>):(<></>)}
                       &emsp;
              <input
                className="radiolevels"
                type="radio"
                id="SCT"
                value="SCT"
                name="radiolevels"
                onClick={() => onRadioSelect("SCT")}
              /> <label className="label-control">SCT </label>
               
           
              
                     
                     
                    </div>

                  </div>

                  <div className="controls ">
                    <div className="control-group col-md-12 col-lg-12 col-sm-12 col-xs-12 text-left">
                      <br />
                      <label className="control-label" style={{ color: "red" }}>
                        * Indicates mandatory fields, Please fill mandatory
                        fields before Submit.
                      </label>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <button className="btn sub_form btn_continue blackbrd Save float-right">
                    ADD
                  </button>
                </div>
              </section>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    project: state.project,
    settings: state.settings,

});
export default connect(mapStateToProps, {   getAmendmentProjectDeatils,
    getLastAmendmentHistoryDeatils,})(
  AddEnquiry
);
