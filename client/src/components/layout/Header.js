import React, { Fragment, useState } from "react";
import { Container, Navbar, Nav, NavItem, Modal } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import Login from "../auth/Login";
import "react-datepicker/dist/react-datepicker.css";
import { w3cwebsocket } from "websocket";

const Header = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const handleLogoutModalClose = () => setShowLogout(false);
  const handleLogoutModalShow = () => setShowLogout(true);
  //client in websocket
  //SLAP IP
  const client = new w3cwebsocket("ws://192.168.6.216:8000");
  const LogoutModalClose = () => {
    handleLogoutModalClose();
    logout();
    client.send(
      JSON.stringify({
        type: "message",
        msg: "../../pages/Chat.jsx",
      })
    );
  };

  const openSecondLevelMenu2 = () => {
    const menu = document.getElementById("second-level-menu2");
    if (window.innerWidth <= 992) {
      if (menu) {
        if (menu.style.display === "block") {
          menu.style.display = "none";
        } else {
          menu.style.display = "block";
        }
      } else {
        menu.style.display = "none";
      }
    }
  };

  // console.log(user);
  return (
    <Fragment>
      <header>
        <Container id="header_navbar">
          <Navbar
            className="navbar_height top_menu"
            expand="lg"
            fixed="top"
            style={{ padding: "0px 1em" }}
          >
            <Navbar.Brand>
              <img
                className="log_size"
                alt="Pinnacle Media"
                src={require("../../static/images/pmLogo_wh.png")}
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto navbar_Collapse_content">
                {/* <NavItem>
                  {!loading && isAuthenticated && user ? (
                    <Link to="/tenant-add-details">Rent Details</Link>
                  ) : (
                    <NavItem></NavItem>
                  )}
                </NavItem> */}
                <NavItem>
                  {!loading && isAuthenticated && user ? (
                    <NavLink
                      to="/job-queue"
                      activeStyle={{ color: "#ffd037", textDecoration: "none" }}
                    >
                      Job Queue
                    </NavLink>
                  ) : (
                    <NavItem></NavItem>
                  )}
                </NavItem>

                <NavItem>
                  {/* SLAP UserGroupRights */}
                  {!loading &&
                  isAuthenticated &&
                  user &&
                  user.userGroupName &&
                  user.userGroupName !== "Graphic Artists" &&
                  user.userGroupName !== "Software" &&
                  user.userGroupName !== "Quality Controller" ? (
                    <NavLink
                      to="/daily-job-sheet"
                      activeStyle={{ color: "#ffd037", textDecoration: "none" }}
                    >
                      Daily Job Sheet
                    </NavLink>
                  ) : (
                    <NavItem></NavItem>
                  )}
                </NavItem>

                <NavItem>
                  {!loading &&
                  isAuthenticated &&
                  user &&
                  ((user.userGroupName &&
                    user.userGroupName === "Administrator") ||
                    user.userGroupName === "Super Admin") ? (
                    <NavLink
                      to="/job-verification"
                      activeStyle={{ color: "#ffd037", textDecoration: "none" }}
                    >
                      Job Verification
                    </NavLink>
                  ) : (
                    <NavItem></NavItem>
                  )}
                </NavItem>
              </Nav>
              {!loading && isAuthenticated && user ? (
                <Nav>
                  <ul className="top-level-menu text-right">
                    <li>
                      <Link
                        to="#"
                        onClick={() => openSecondLevelMenu2()}
                        className="navbar-right"
                      >
                        {user.empFullName}&nbsp;
                        <i className="fa fa-caret-down" />
                      </Link>

                      <ul className="dropdown-menu second-level-menu ">
                        {(user &&
                          user.userGroupName &&
                          user.userGroupName === "Administrator") ||
                        user.userGroupName === "Super Admin" ||
                        user.userGroupName === "Clarical Admins" ? (
                          <li>
                            <Link to="/all-clients">All Clients</Link>
                          </li>
                        ) : (
                          <></>
                        )}
                        {/* SLAP UserGroupRights */}
                        {(user &&
                          user.userGroupName &&
                          user.userGroupName === "Administrator") ||
                        user.userGroupName === "Super Admin" ? (
                          <Fragment>
                            {" "}
                            <li>
                              <Link to="/all-staff">All Staff</Link>
                            </li>
                            <li>
                              <Link to="/all-department">All Departments</Link>
                            </li>
                            <li>
                              <Link to="/all-designation">All Designation</Link>
                            </li>
                            <li>
                              <Link to="/all-payment-methods">
                                All Payment Method
                              </Link>
                            </li>
                            <li>
                              <Link to="/all-project-status">
                                All Project Status
                              </Link>
                            </li>
                            <li>
                              <Link to="/all-usergroups">Groups</Link>
                            </li>
                            <li>
                              <Link to="/change-password">Change Password</Link>
                            </li>
                          </Fragment>
                        ) : (
                          <></>
                        )}
                        <li>
                          <Link to="/all-feedback">All Feedback</Link>
                        </li>
                        <li>
                          <Link to="#" onClick={() => handleLogoutModalShow()}>
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </Nav>
              ) : (
                <Fragment>
                  <Nav>
                    <NavItem>
                      {/* <Link to="#" onClick={() => handleLoginModalShow()}>
                        LOGIN
                      </Link> */}
                    </NavItem>

                    <Modal
                      show={showLogin}
                      backdrop="static"
                      keyboard={false}
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                    >
                      <Modal.Header></Modal.Header>
                      <Modal.Body>
                        {/* <button
                          onClick={() => handleLoginModalClose()}
                          className="close"
                        >
                          <img
                            src={require("../../static/images/close.png")}
                            alt="X"
                          />
                        </button> */}
                        <Login />
                      </Modal.Body>
                    </Modal>
                  </Nav>
                </Fragment>
              )}
            </Navbar.Collapse>
          </Navbar>
        </Container>

        {/* Logout Modal */}
        <Modal
          show={showLogout}
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="logout-modal"
        >
          <Modal.Header className="confirmbox-heading">
            <h4 className="mt-0">Confirmation</h4>
          </Modal.Header>
          <Modal.Body>
            <h5>Are you sure you want to logout?</h5>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn_green_bg"
              onClick={() => LogoutModalClose()}
            >
              YES
            </button>
            <button
              className="btn btn_green_bg"
              onClick={() => handleLogoutModalClose()}
            >
              NO
            </button>
          </Modal.Footer>
        </Modal>
      </header>
    </Fragment>
  );
};
Header.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);
