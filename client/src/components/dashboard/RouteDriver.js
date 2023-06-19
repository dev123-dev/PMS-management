/* eslint-disable no-lone-blocks */
import React, { Fragment, useEffect } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadUser } from "../../actions/auth";

const RouteDriver = ({ auth: { user }, loadUser }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  console.log("hit driver");
  // useEffect(() => {}, [user]);

  if (user && user.userGroupName && user.userGroupName !== "Sct Marketing") {
    return <Redirect to="/job-queue" />;
  }
  return <Fragment>loading...</Fragment>;
};

RouteDriver.propTypes = {
  auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser })(RouteDriver);
