import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Spinner from "../layout/Spinner";

const ViewScreenshot = ({
  auth: { isAuthenticated, user, users, loading },
  EditFeedbackData,
  allImageData,
  onViewModalChange,
  
  screenshotData,
}) => {
  //formData

  const [imag, setImag] = useState("");
  const [imagNotes, setimagNotes] = useState("");
  const onViewimage = (image) => {
    console.log("imagg", image);
    setImag(image.PhotoUpload);
    setimagNotes(image.imageNotes);
  };
  console.log("screenshotData", screenshotData);
  const onRefresh = () => {
    setImag("");
    setimagNotes("");
  };

  return !isAuthenticated || !user ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align">
     
        <div className=" row col-lg-12 col-md-12 col-sm-12 col-12 ">
          <div className=" col-lg-3 col-md-12 col-sm-12 col-12">
            <div
              style={{
                height: "800px",
                width: "240px",
                overflow: "scroll",
                maxHeight: "800px",
              }}
            >
              {screenshotData &&
                screenshotData.screenshot.map((image) => {
           
                  return (

                
                 
                    <img
                      className="log_size1 py-2"
                      alt="Preview"
                      src={`${image.PhotoUpload}`}
                      onClick={() => {
                        onViewimage(image);
                      }}
                    />
                 
                   
                  );
                })}
            </div>
          </div>
          <div
            className=" col-lg-9 col-md-12 col-sm-12 col-12"
            style={{ width: "100%", maxHeight: "800px", overflowY: "auto" }}
          >
            {imag != "" ? (
              <>
              <div className=" py-2">
                  <span style={{ fontWeight: "bold" }}>Notes : </span> <br></br>{" "}
                  <span style={{ fontSize: "20px" }}>{imagNotes}</span>
                </div>
                <img className="fillimag " alt="Preview" src={`${imag}`} />
                
              </>
            ) : (
              <>
                {screenshotData &&
                screenshotData.screenshot.map((image,idx) => {
                  if(idx===0){
                    return (
                   
                      <>
                        <div >
                        <span style={{ fontWeight: "bold" }}>Notes : </span> <br></br>{" "}
                        <span style={{ fontSize: "20px" }}>{image.imageNotes}</span>
                      </div>
                        <img
                        className="log_size2"
                          alt="Preview"
                          src={`${image.PhotoUpload}`}
                          // onClick={() => {
                          //   onViewimage(image);
                          // }}
                        />
                        </>
                      );

                  }
                  else{
                    return(<></>)
                  }
                
               
                })}
              </>
            )}{" "}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ViewScreenshot.propTypes = {
  auth: PropTypes.object.isRequired,
  EditFeedbackData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {  })(
  ViewScreenshot
);
