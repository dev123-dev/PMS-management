import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
const ClientCallHistory = ({
  auth: { isAuthenticated, user, users, loading },
  onClientCallHistoryModalChange,
}) => {
  //formData
  const [formData, setFormData] = useState({
    dctLeadDeactiveReason: "",
    isSubmitted: false,
  });

  const { dctLeadDeactiveReason, isSubmitted } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //   const onSubmit = (e) => {
  //     e.preventDefault();

  //     const finalData = {
  //       recordId: Leaddeavtivedata ? Leaddeavtivedata._id : "",
  //       dctLeadDeactivateByDateTime: new Date().toLocaleString(),
  //       dctLeadDeactivateById: user._id,
  //       dctLeadStatus: "Deactive",
  //       dctLeadDeactiveReason: dctLeadDeactiveReason,
  //     };
  //     console.log(finalData);
  //     //  addProject(finalData);
  //     setFormData({
  //       ...formData,
  //       isSubmitted: true,
  //     });
  //   };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      {/* <form className="row" onSubmit={(e) => onSubmit(e)}> */}
      <div className="row col-lg-12 col-md-11 col-sm-12 col-12 ">
        <div className="col-lg-12 col-md-11 col-sm-12 col-12 ">
          <label className="label-control"> Reason :</label>
        </div>
      </div>

      {/* </form> */}
    </Fragment>
  );
};

ClientCallHistory.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(ClientCallHistory);
