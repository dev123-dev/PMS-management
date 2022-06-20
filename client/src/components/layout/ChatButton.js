import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

const ChatButton = ({ auth: { isAuthenticated, loading, user } }) => {
  // console.log(user);
  return (
    <Fragment>
      {!loading && isAuthenticated && user ? (
        <Link className="ChatBtn" to="/chat">
          {/*  */}
        </Link>
      ) : (
        <></>
      )}
    </Fragment>
  );
};
ChatButton.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ChatButton);
