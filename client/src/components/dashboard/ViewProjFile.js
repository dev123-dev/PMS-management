import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Spinner from "../layout/Spinner";
import axios from "axios";
import * as XLSX from "xlsx";
// import PdfPreview from "./PdfPreview";
import { getAllFiles } from "../../actions/projects";
const ViewProjFile = ({
  auth: { isAuthenticated, user, users, loading },
  project: { allExcelFiles },

  allImageData,
  onViewModalChange,
  getAllFiles,

  screenshotData,
}) => {
  //formData

  const [fileType, setFileType] = useState("");
  // const checksize = async (file, index) => {
  //   // console.log(file.type, file.size);
  //   console.log("file", file);
  //   const resizeFile = (file) =>
  //     new Promise((resolve) => {
  //       Resizer.imageFileResizer(
  //         file,
  //         100,
  //         100,
  //         "JPEG",
  //         90,
  //         0,
  //         (uri) => {
  //           resolve(uri);
  //         },
  //         "base64"
  //       );
  //     });
  //   const base64 = await resizeFile(file); //.then((img) => console.log("img", img));

  //   const type = base64.split(";")[0].split("/")[1];
  //   setFileType(type);
  //   var stringLength = base64.length - "data:image/png;base64,".length;
  //   var sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812;
  //   var sizeInKb = sizeInBytes / 1000;
  //   // console.log("sizeInKb", sizeInKb);
  //   setPhotoSize(sizeInKb.toFixed(2) + "KB");
  //   if (sizeInKb >= 70) {
  //     if (index === 1) {
  //       setFormData({
  //         ...formData,
  //         meetingPhotoUpload1: "",
  //       });
  //       setPhotoSizeAlert(true);
  //     }

  //     if (index === 2) {
  //       setFormData({
  //         ...formData,
  //         meetingPhotoUpload2: "",
  //       });
  //       setPhotoSizeAlert1(true);
  //     }
  //     if (index === 3) {
  //       setFormData({
  //         ...formData,
  //         meetingPhotoUpload3: "",
  //       });
  //       setPhotoSizeAlert2(true);
  //     }
  //     if (index === 4) {
  //       setFormData({
  //         ...formData,
  //         meetingPhotoUpload4: "",
  //       });
  //       setPhotoSizeAlert3(true);
  //     }
  //     if (index === 5) {
  //       setFormData({
  //         ...formData,
  //         meetingPhotoUpload5: "",
  //       });
  //       setPhotoSizeAlert4(true);
  //     }
  //     if (index === 6) {
  //       setFormData({
  //         ...formData,
  //         meetingPhotoUpload6: "",
  //       });
  //       setPhotoSizeAlert5(true);
  //     }
  //     if (index === 7) {
  //       setFormData({
  //         ...formData,
  //         meetingPhotoUpload7: "",
  //       });
  //       setPhotoSizeAlert6(true);
  //     }
  //   } else {
  //     if (index === 1) {
  //       setFormData({
  //         ...formData,
  //         meetingPhotoUpload1: base64,
  //       });
  //       setPhotoSizeAlert(false);
  //     }
  //     if (index === 2) {
  //       setFormData({
  //         ...formData,
  //         meetingPhotoUpload2: base64,
  //       });
  //       setPhotoSizeAlert1(false);
  //     }

  //     if (index === 3) {
  //       setFormData({
  //         ...formData,
  //         meetingPhotoUpload3: base64,
  //       });
  //       setPhotoSizeAlert2(false);
  //     }

  //     if (index === 4) {
  //       setFormData({
  //         ...formData,
  //         meetingPhotoUpload4: base64,
  //       });
  //       setPhotoSizeAlert3(false);
  //     }

  //     if (index === 5) {
  //       setFormData({
  //         ...formData,
  //         meetingPhotoUpload5: base64,
  //       });
  //       setPhotoSizeAlert4(false);
  //     }

  //     if (index === 6) {
  //       setFormData({
  //         ...formData,
  //         meetingPhotoUpload6: base64,
  //       });
  //       setPhotoSizeAlert5(false);
  //     }

  //     if (index === 7) {
  //       setFormData({
  //         ...formData,
  //         meetingPhotoUpload7: base64,
  //       });
  //       setPhotoSizeAlert6(false);
  //     }
  //   }
  // };

  // console.log("allExcelFiles", allExcelFiles);

  const imageData = [];
  screenshotData.screenshot.map((ele) => {
    if (
      ele.PhotoUpload.split(";")[0].split("/")[1] === "png" ||
      ele.PhotoUpload.split(";")[0].split("/")[1] === "jpeg" ||
      ele.PhotoUpload.split(";")[0].split("/")[1] === "jpg"
    ) {
      imageData.push(ele);
    }
  });

  const pdfData = [];
  screenshotData.screenshot.map((ele) => {
    if (ele.PhotoUpload.split(";")[0].split("/")[1] === "pdf") {
      pdfData.push(ele);
    }
  });

  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get("/api/projects/files");
        setFiles(response.data);
      } catch (error) {
        console.error("Error retrieving file list:", error);
      }
    };

    fetchFiles();
  }, []);

  //console.log("files", files);

  //for excel

  // useEffect(() => {
  //   screenshotData.forEach(({ laced, name }) => {
  //     if(    laced.PhotoUpload.split(";")[0].split("/")[1] ===
  //     "vnd.openxmlformats-officedocument.spreadsheetml.sheet"){

  //       alert("ggg")
  //       // if (laced) {
  //       //   setLaced((prevLaced) => ({
  //       //     ...prevLaced,
  //       //     status: true,
  //       //     name,
  //       //   }))
  //       // }
  //     }

  //   })
  // }, [screenshotData])

  // submit state
  const [excelData, setExcelData] = useState(null);
  const excelData1 = [];
  screenshotData.screenshot.map((ele) => {
    if (
      ele.PhotoUpload.split(";")[0].split("/")[1] ===
      "vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      // let selectedFile = image.PhotoUpload;
      let selectedFile = `${ele.PhotoUpload}`;
      // console.log("selectedFile", selectedFile);
      // const typeExcel =
      //   image.PhotoUpload.split(";")[0].split("/")[1];
      // console.log("typeExcel", typeExcel);
      // setExcelFile(selectedFile);

      if (selectedFile && selectedFile !== null) {
        // console.log("jjjj");

        const newSlpit = selectedFile.split(",")[1];
        // console.log("newSlpit",newSlpit)

        const workbook = XLSX.read(newSlpit, { type: "base64" });

        // console.log("workbook1", workbook);
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
        //console.log("data", data);

        // setExcelData(data.slice(0, 20));
      }
      // console.log("ExcelData", excelData);

      excelData1.push(ele);
    }
  });
  // console.log("excelData1", excelData1);

  ///////////////////////////////////////////////////////////////123

  // onchange states
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);

  /////////////////////////////////////////////////
  const [imageShow, setImageShow] = useState("true");
  const onShowImage = () => {
    setImageShow("true");
    setExcelShow("false");
    setPdfShow("false");
  };

  const [pdfShow, setPdfShow] = useState("");
  const onShowPdf = () => {
    setPdfShow("true");
    setImageShow("false");
    setExcelShow("false");
  };

  const [excelShow, setExcelShow] = useState("");
  const onShowExcel = () => {
    getAllFiles();
    setExcelShow("true");
    setImageShow("false");
    setPdfShow("false");
  };

  const [imag, setImag] = useState("");
  const [imagNotes, setimagNotes] = useState("");
  const onViewimage = (image) => {
    // console.log("imagg", image);
    setImag(image.PhotoUpload);
    setimagNotes(image.imageNotes);
  };
  //console.log("screenshotData", screenshotData);

  // let fileTypes = [
  //   "application/vnd.ms-excel",
  //   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  //   "text/csv",
  //   "vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  // ];

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align">
        <div className=" row col-lg-12 col-md-12 col-sm-12 col-12 ">
          <button className="btn btn_green_bg" onClick={(e) => onShowImage(e)}>
            Image
          </button>
          <button
            className="btn btn_green_bg"
            style={{ marginLeft: "10px" }}
            onClick={(e) => onShowPdf(e)}
          >
            PDF
          </button>
          <button
            className="btn btn_green_bg"
            style={{ marginLeft: "10px" }}
            onClick={(e) => onShowExcel(e)}
          >
            Excel
          </button>
        </div>

        {imageShow === "true" ? (
          <>
            <div className=" row col-lg-12 col-md-12 col-sm-12 col-12 pt-3">
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
                    screenshotData.screenshot &&
                    screenshotData.screenshot.map((image) => {
                      let type = image.PhotoUpload.split(";")[0].split("/")[1];
                      // console.log("type", type);

                      return (
                        <>
                          {type == "png" || type == "jpeg" ? (
                            <img
                              className="log_size1 py-2"
                              alt="Preview"
                              src={`${image.PhotoUpload}`}
                              onClick={() => {
                                onViewimage(image);
                              }}
                            />
                          ) : (
                            <></>
                          )}

                          {/* <>
                            <object
                              style={{
                                border: "1px solid green",
                                margin: "10px ",
                              }}
                              className="log_size1 py-2"
                              data={`${image.PhotoUpload}`}
                              onClick={() => {
                                onViewimage(image);
                              }}
                              width="100%"
                              height="100%"
                            ></object>
                          </>
                        ) : (
                          <></>
                        )}
                    */}
                        </>
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
                      <span style={{ fontWeight: "bold" }}>Notes : </span>{" "}
                      <br></br>{" "}
                      <span style={{ fontSize: "20px" }}>{imagNotes}</span>
                    </div>
                    <img className="fillimag " alt="Preview" src={`${imag}`} />
                  </>
                ) : (
                  <>
                    {imageData &&
                      imageData.map((image, idx) => {
                        if (idx === 0) {
                          return (
                            <>
                              <div>
                                <span style={{ fontWeight: "bold" }}>
                                  Notes :{" "}
                                </span>{" "}
                                <br></br>{" "}
                                <span style={{ fontSize: "20px" }}>
                                  {image.imageNotes}
                                </span>
                              </div>
                              <img
                                className="log_size2 "
                                alt="Preview"
                                src={`${image.PhotoUpload}`}
                              />
                              {/* <object
                                className="log_size2"
                                data={`${image.PhotoUpload}`}

                                // //  type="application/pdf"
                                //   width="100%" height="100%"
                              ></object> */}
                              {/* <img
                        className="log_size2"
                          alt="Preview"
                          src={`${image.PhotoUpload}`}
                          // onClick={() => {
                          //   onViewimage(image);
                          // }}
                        /> */}
                            </>
                          );
                        } else {
                          return <></>;
                        }
                      })}
                  </>
                )}{" "}
              </div>
            </div>
          </>
        ) : (
          <></>
        )}

        {pdfShow === "true" ? (
          <>
            <div className=" row col-lg-12 col-md-12 col-sm-12 col-12 py-4">
              <h1>PDF</h1>
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  overflow: "scroll",
                  maxWidth: "100%",
                  overflowY: "auto",
                }}
              >
                {pdfData &&
                  pdfData.map((image) => {
                    return (
                      <>
                        <object
                          style={{
                            margin: "10px ",
                          }}
                          className="log_size2 py-2"
                          data={`${image.PhotoUpload}`}
                          onClick={() => {
                            onViewimage(image);
                          }}
                          width="70%"
                          height="70%"
                        ></object>
                        <div>
                          {" "}
                          -----------------------------------------------------------------------------------------------------------------------------------------------------------
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>
          </>
        ) : (
          <></>
        )}

        {/* 
        excel */}
        {excelShow == "true" ? (
          <>
            <div className=" row col-lg-12 col-md-12 col-sm-12 col-12 py-4">
              <ul>
                {allExcelFiles &&
                  allExcelFiles.map((file, index) => (
                    <li key={index}>
                      <a href="/D:/extraaa/file.xlsx" download={{ file }}>
                        {file}
                      </a>
                    </li>
                  ))}
              </ul>

              {/* <h1>Excel</h1>
              <div
                style={{
                  height: "600px",
                  width: "100%",
                  overflow: "scroll",
                  maxWidth: "100%",
                }}
              >
                     
              

                      <>
                        <div className="viewer">
                          {excelData?(
          <div className="table-responsive">
            <table className="table">

              <thead>
                <tr>
                  {Object.keys(excelData[0]).map((key)=>(
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {excelData.map((individualExcelData, index)=>(
                  <tr key={index}>
                    {Object.keys(individualExcelData).map((key)=>(
                      <td key={key}>{individualExcelData[key]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        ):(
          <div>No File is uploaded yet!</div>
        )}
                        </div>

                        <div>
                          {" "}
                          -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                        </div>
                      </>
               */}

              {/* {excelData1 &&
                  excelData1.map((image) => {

                    console.log("imageee", image);

                    // let fileTypes = [
                    //   "application/vnd.ms-excel",
                    //   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    //   "text/csv",
                    //   "vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    // ];

                    // let selectedFile = image.PhotoUpload;
                    let selectedFile = `${image.PhotoUpload}`;
                    // console.log("selectedFile", selectedFile);
                    // const typeExcel =
                    //   image.PhotoUpload.split(";")[0].split("/")[1];
                    // console.log("typeExcel", typeExcel);
                    // setExcelFile(selectedFile);

                   

                    if (selectedFile && selectedFile !== null) {
                      console.log("jjjj");

                      const newSlpit=selectedFile.split(',')[1];
                      // console.log("newSlpit",newSlpit)
                  
                      const workbook = XLSX.read(
                        newSlpit,
                        { type: "base64" }
                      );
                
                 

                      console.log("workbook", workbook);
                      const worksheetName = workbook.SheetNames[0];
                      const worksheet = workbook.Sheets[worksheetName];
                      const data = XLSX.utils.sheet_to_json(worksheet);
                      setExcelData(data.slice(0, 20));
                    }
                    console.log("excelData", excelData);

                    return (
                      <>
                        <div className="viewer">
                          {excelData?(
          <div className="table-responsive">
            <table className="table">

              <thead>
                <tr>
                  {Object.keys(excelData[0]).map((key)=>(
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {excelData.map((individualExcelData, index)=>(
                  <tr key={index}>
                    {Object.keys(individualExcelData).map((key)=>(
                      <td key={key}>{individualExcelData[key]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        ):(
          <div>No File is uploaded yet!</div>
        )}
                        </div>

                        <div>
                          {" "}
                          -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                        </div>
                      </>
                    );
                  })} */}
              {/* </div> */}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </Fragment>
  );
};

ViewProjFile.propTypes = {
  auth: PropTypes.object.isRequired,
  //   EditFeedbackData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  project: state.project,
});

export default connect(mapStateToProps, {
  getAllFiles,
})(ViewProjFile);
