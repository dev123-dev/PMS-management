import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import Chat from "../../pages/Chat";
const ChatButton = ({ auth: { isAuthenticated, loading, user } }) => {
  const [error, setError] = useState({
    showchatbox: false,
  });

  const [chatBtnState, setchatboxBtnState] = useState(false);
  const { showchatbox } = error;

  function chatbox_visibility(e, id) {
    e.preventDefault();
    if (id === "chatbox") {
      if (chatBtnState === true) {
        setchatboxBtnState(false);
        setError({
          ...error,
          showchatbox: false,
        });
      } else {
        setchatboxBtnState(true);
        setError({
          ...error,
          showchatbox: true,
        });
      }
    }
  }
  return (
    <Fragment>
      {!loading && isAuthenticated && user ? (
        <>
          <Link
            className="ChatBtn"
            to="#"
            onClick={(e) => chatbox_visibility(e, "chatbox")}
          ></Link>
          {showchatbox && <Chat />}
        </>
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
