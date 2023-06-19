import React, { Fragment, useEffect } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadUser } from "../../actions/auth";

const RouteDriver = ({ auth: { user, isAuthenticated }, loadUser }) => {
  useEffect(() => {
    loadUser();
  }, []);

  if (isAuthenticated) {
    // eslint-disable-next-line no-lone-blocks
    {
      user && user.userGroupName && user.userGroupName === "Sct Marketing" ? (
        <></>
      ) : (
        <>
          return <Redirect to="/job-queue" />
        </>
      );
    }
  } else {
    return (
      <Fragment>
        <div className="" style={{ height: "450px" }}>
          loading...
        </div>
      </Fragment>
    );
  }
};

RouteDriver.propTypes = {
  auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser })(RouteDriver);
