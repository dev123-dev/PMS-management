import React, { Fragment, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login, removeError } from "../../actions/auth";
import { w3cwebsocket } from "websocket";

const Login = ({
  login,
  isAuthenticated,
  errorResponse,
  removeError,
  loading,
}) => {
  useEffect(() => {
    removeError();
  }, [removeError]);

  let modalTitle = { marginTop: "-30px", marginBottom: "20px" };

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const { userName, password } = formData;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "userName":
        if (value === "") {
          setError({
            ...error,
            userNameValChecker: true,
            userNameValResult: "Please Enter Your userName",
            userNameValStyle: { color: "#FF0000" },
            userNameInptErrStyle: { borderBottom: "1px solid #FF0000" },
          });
          setFormData({ ...formData, [e.target.name]: "" });
        } else {
          setError({
            ...error,
            userNameValChecker: false,
            userNameInptErrStyle: { borderBottom: "1px solid #0086dc" },
          });
          setFormData({ ...formData, [e.target.name]: value });
        }
        break;
      case "password":
        if (value === "") {
          setError({
            ...error,
            passwordValChecker: true,
            passwordValResult: "Please Enter Your Password",
            passwordValStyle: { color: "#FF0000" },
            passwordInptErrStyle: { borderBottom: "1px solid #FF0000" },
          });
          setFormData({ ...formData, [e.target.name]: "" });
        } else {
          setError({
            ...error,
            passwordValChecker: false,

            passwordInptErrStyle: { borderBottom: "1px solid #0086dc" },
          });
          setFormData({ ...formData, [e.target.name]: value });
        }
        break;
      default:
        break;
    }
  };

  const [error, setError] = useState({
    userNameValChecker: false,
    userNameValResult: "",
    userNameValStyle: {},
    userNameInptErrStyle: {},

    passwordValChecker: false,
    passwordValResult: "",
    passwordValStyle: {},
    passwordInptErrStyle: {},
  });

  const {
    userNameValChecker,
    userNameValResult,
    userNameValStyle,
    userNameInptErrStyle,

    passwordValChecker,
    passwordValResult,
    passwordValStyle,
    passwordInptErrStyle,
  } = error;

  const checkErrors = (formData) => {
    if (formData && formData.userName === "") {
      setError({
        ...error,
        userNameValChecker: true,
        userNameValResult: "Please Enter Your userName",
        userNameValStyle: { color: "#FF0000" },
        userNameInptErrStyle: { borderBottom: "1px solid #FF0000" },
      });
      return false;
    } else {
      const userNameFilter = /^([a-zA-Z])*$/;
      if (!userNameFilter.test(formData && formData.userName)) {
        setError({
          ...error,
          userNameValChecker: true,
          userNameValResult: "Please Enter Valid userName",
          userNameValStyle: { color: "#FF0000" },
          userNameInptErrStyle: { borderBottom: "1px solid #FF0000" },
        });
        return false;
      }
    }
    if (formData && formData.password === "") {
      setError({
        ...error,
        passwordValChecker: true,
        passwordValResult: "Please Enter Your Password",
        passwordValStyle: { color: "#FF0000" },
        passwordInptErrStyle: { borderBottom: "1px solid #FF0000" },
      });
      return false;
    }
    return true;
  };
  //client in websocket
  const client = new w3cwebsocket("ws://192.168.6.128:8000");
  const onSubmit = async (e) => {
    e.preventDefault();
    if (checkErrors(formData)) {
      login(userName, password);
    }
    client.send(
      JSON.stringify({
        type: "message",
        msg: "../../pages/Chat.jsx",
      })
    );
    setFormData({ ...formData, submitted: true });
  };

  if (isAuthenticated) {
    return <Redirect to="/route-driver" />;
  }

  return (
    <Fragment>
      <div className="col-md-12 col-lg-12 col-sm-12 col-12 py-5">
        <div className="modal-header">
          {loading ? (
            <h2 className="modal-title " id="myModalLabel" style={modalTitle}>
              Please Wait
            </h2>
          ) : (
            <h2 className="modal-title " id="myModalLabel" style={modalTitle}>
              SIGN IN
            </h2>
          )}
        </div>
        {errorResponse && <p style={{ color: "red" }}>{errorResponse}</p>}
        {/* <!-- form --> */}
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group form_top">
            <input
              type="text"
              name="userName"
              value={userName}
              style={userNameInptErrStyle}
              className="form-control form_contct"
              onChange={(e) => onInputChange(e)}
            />
            {userNameValChecker && (
              <span style={userNameValStyle}>
                {userNameValResult}
                <br />
              </span>
            )}
            <label className="pop_up">
              <span className="label-content">User Name *</span>
            </label>
          </div>

          <div className="form-group form_top">
            <input
              type="password"
              name="password"
              value={password}
              style={passwordInptErrStyle}
              className="form-control form_contct"
              onChange={(e) => onInputChange(e)}
              autoComplete="false"
            />
            {passwordValChecker && (
              <span style={passwordValStyle}>
                {passwordValResult}
                <br />
              </span>
            )}
            <label className="pop_up">Password *</label>
          </div>
          <div className="col-md-12 col-sm-12 col-lg-12 col-12 text-center">
            <button className="btn contact_reg">SIGN IN</button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  otpAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
  errorResponse: PropTypes.string,
  removeError: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  otpAuthenticated: state.auth.otpAuthenticated,
  loading: state.auth.loading,
  errorResponse: state.auth.errorResponse,
});

export default connect(mapStateToProps, {
  login,
  removeError,
})(Login);
