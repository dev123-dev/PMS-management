import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Chat from "../../pages/Chat";
const ChatButton = ({ auth: { isAuthenticated, loading, user } }) => {
  const [error, setError] = useState({
    showchatbox: false,
    moveChatBtn: { left: "0.5%" },
  });

  const [chatBtnState, setchatboxBtnState] = useState(false);
  const { showchatbox, moveChatBtn } = error;

  function chatbox_visibility(e, id) {
    e.preventDefault();
    if (id === "chatbox") {
      if (chatBtnState === true) {
        setchatboxBtnState(false);
        setError({
          ...error,
          showchatbox: false,
          moveChatBtn: { left: "0.5%" },
        });
      } else {
        setchatboxBtnState(true);
        setError({
          ...error,
          showchatbox: true,
          moveChatBtn: { left: "401px", transition: "left 100ms" },
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
            style={moveChatBtn}
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
