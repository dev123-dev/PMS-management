import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Select from "react-select";
const AllStatuschange = ({
  auth: { isAuthenticated, user, users, loading },
  ProjRestoreVal,
}) => {
  console.log("val", ProjRestoreVal);
  //formData
  const [formData, setFormData] = useState({
    callStatus: "",
    labeldata: "",
    callNote: "",
    isSubmitted: false,
  });
  const { callNote, callStatus, labeldata } = formData;
  //For setting mindate as todays date
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  var todayDateymd = yyyy + "-" + mm + "-" + dd;

  const StatusMethods = [
    { value: "VoiceMail", label: "VoiceMail" },
    { value: "CallBack", label: "CallBack" },
    { value: "DND", label: "DND" },
    { value: "NI", label: "NI" },
    { value: "FollowUp", label: "FollowUp" },
    { value: "TestClient", label: "TestClient" },
    { value: "RegularClient", label: "RegularClient" },
  ];

  const onStatusTypeChange = (e) => {
    //Required Validation starts
    // setError({
    //   ...error,
    //   TranscationIdChecker: true,
    //   TranscationIdErrorStyle: { color: "#000" },
    // });
    //Required Validation ends showVoiceMailSection1

    if (e) {
      setFormData({
        ...formData,
        callStatus: e,
      });
    }
  };
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [startStatusDate, setStatusDate] = useState("");
  const onDateChange = (e) => {
    setStatusDate(e.target.value);
  };

  const onSubmit = (e) => {};

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <form className="row" onSubmit={(e) => onSubmit(e)}>
        <div className="row col-lg-12 col-md-11 col-sm-10 col-10 ">
          <div className="col-lg-6 col-md-11 col-sm-10 col-10 ">
            <label className="label-control"> Status :</label>
            <Select
              name="callStatus"
              options={StatusMethods}
              isSearchable={false}
              value={callStatus}
              placeholder="Select Status"
              onChange={(e) => onStatusTypeChange(e)}
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
          <div className=" col-lg-4 col-md-11 col-sm-10 col-10 ">
            <label className="label-control">
              {callStatus && callStatus.label} Date
            </label>

            <input
              type="date"
              placeholder="dd/mm/yyyy"
              className="form-control cpp-input datevalidation"
              name="callDate"
              value={startStatusDate}
              onChange={(e) => onDateChange(e)}
              style={{
                width: "100%",
              }}
              required
            />
          </div>
          <div className="col-lg-8 col-md-11 col-sm-10 col-10 ">
            <label className="label-control"> Notes :</label>
            <textarea
              name="callNote"
              id="callNote"
              className="textarea form-control"
              rows="2"
              placeholder="Notes"
              style={{ width: "100%" }}
              value={callNote}
              onChange={(e) => onInputChange(e)}
            ></textarea>
          </div>

          <div className="col-lg-4 col-md-6 col-sm-12 col-12 py-5">
            <input
              type="submit"
              name="Submit"
              value="Submit"
              className="btn sub_form btn_continue blackbrd Save float-right"
            />
          </div>
        </div>
      </form>
    </Fragment>
  );
};

AllStatuschange.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(AllStatuschange);
