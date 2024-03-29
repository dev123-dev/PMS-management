import React, { Fragment, useState, useEffect } from "react";
import { Container, Navbar, Nav, NavItem, Modal } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import Login from "../auth/Login";

import { getUnresolvedData } from "../../actions/sct";
import "react-datepicker/dist/react-datepicker.css";
import { w3cwebsocket } from "websocket";
import Dropdown from "rsuite/Dropdown";
import "rsuite/dist/rsuite.min.css";
const Header = ({
  auth: { isAuthenticated, loading, user },
  sct: { allUnResolved },
  logout,
  getUnresolvedData,
}) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  //const client = new w3cwebsocket("ws://192.168.6.44:8000");

  useEffect(() => {
    getUnresolvedData({
      userId: user && user._id,
      enquiryStatus: "UnResolved",
    });
  }, [user]);

  // const [unRes,setUnres]=useState(0);

  //  setUnres(allUnResolved.length);

  //const
  // let unResolvedCount = 0;
  // let oldDate = [];
  // let todayDate = new Date();
  //  console.log("old data",oldDate)

  //   let year = todayDate.getFullYear();
  //   let month = todayDate.getMonth() +1;
  //   let date = todayDate.getDate();

  //   if(month < 10 ){
  //     month = "0"+month
  //   }
  //   if(date < 10){
  //     date = "0"+date
  //   }
  //   let finalres = date+"-"+month+"-"+year;

  //     allUnResolved && allUnResolved.map((ele)=>{

  //       var ED =
  //       ele.estimatedERD &&
  //       ele.estimatedERD.split(/\D/g);
  //       var datestring = [
  //         ED && ED[2],
  //         ED && ED[1],
  //         ED && ED[0],
  //       ].join("-");
  //       oldDate.push(datestring)
  //     })

  //     oldDate && oldDate.map((ele)=>{
  //       if(ele <= finalres){
  //         unResolvedCount +=1
  //       }

  //     })

  const handleLogoutModalClose = () => setShowLogout(false);
  const handleLogoutModalShow = () => setShowLogout(true);
  //client in websocket
  //SLAP IP

  const client = new w3cwebsocket("ws://192.168.6.40:8000");
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
                <NavItem>
                  {!loading &&
                    isAuthenticated &&
                    user &&
                    user.userGroupName &&
                    user.userGroupName !== "Sct Marketing" ? (
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
                    ((user.userGroupName &&
                      user.userGroupName === "Administrator") ||
                      user.userGroupName === "Super Admin" ||
                      user.userGroupName === "Clarical Admins" ||
                      user.userGroupName === "Marketing") ? (
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
                      user.userGroupName === "Super Admin" ||
                      user.userGroupName === "Marketing") ? (
                    <NavLink
                      to="/all-Amendments"
                      activeStyle={{ color: "#ffd037", textDecoration: "none" }}
                    >
                      AM/AI
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

                <NavItem>
                  {!loading &&
                    isAuthenticated &&
                    user &&
                    ((user.userGroupName &&
                      user.userGroupName === "Administrator") ||
                      user.userGroupName === "Super Admin") ? (
                    <NavLink
                      to="/billing"
                      activeStyle={{ color: "#ffd037", textDecoration: "none" }}
                    >
                      Billing
                    </NavLink>
                  ) : (
                    <NavItem></NavItem>
                  )}
                </NavItem>
                {!loading &&
                  isAuthenticated &&
                  user &&
                  ((user.userGroupName &&
                    user.userGroupName === "Administrator") ||
                    user.userGroupName === "Super Admin" ||
                    user.userGroupName === "Dct Marketing" ||
                    user.userGroupName === "Marketing" ||
                    user.empCtAccess === "All") ? (
                  <Dropdown title="DCT">
                    <NavLink
                      to="/all-leads"
                      activeStyle={{ color: "#ffd037", textDecoration: "none" }}
                    >
                      <Dropdown.Item>All Leads</Dropdown.Item>
                    </NavLink>
                    <NavLink
                      to="/all-prospects"
                      activeStyle={{ color: "#ffd037", textDecoration: "none" }}
                    >
                      <Dropdown.Item>All Prospects</Dropdown.Item>
                    </NavLink>
                    <NavLink
                      to="/all-followup"
                      activeStyle={{ color: "#ffd037", textDecoration: "none" }}
                    >
                      <Dropdown.Item>All Followup</Dropdown.Item>
                    </NavLink>
                    <NavLink
                      to="/test-client-followup"
                      activeStyle={{ color: "#ffd037", textDecoration: "none" }}
                    >
                      <Dropdown.Item>Test Client Followup</Dropdown.Item>
                    </NavLink>
                    <NavLink
                      to="/regular-client-followup"
                      activeStyle={{ color: "#ffd037", textDecoration: "none" }}
                    >
                      <Dropdown.Item>Regular Client Followup</Dropdown.Item>
                    </NavLink>
                    {
                      (user.userGroupName === "Administrator" ||
                        user.userGroupName === "Super Admin" ||
                        user._id === "62adae375b6aaf82ce15a1d5") ? (<NavLink
                          to="/inactive-clients-followup"
                          activeStyle={{ color: "#ffd037", textDecoration: "none" }}
                        >
                          <Dropdown.Item>Inactive Client Followup</Dropdown.Item>
                        </NavLink>) : (<></>)
                    }
                    <NavLink
                      to={{
                        pathname: "/deactive-leads",
                        data: {
                          leadType: "Leads"
                        }
                      }}
                      activeStyle={{ color: "#ffd037", textDecoration: "none" }}
                    >
                      <Dropdown.Item>Deactive Leads</Dropdown.Item>
                    </NavLink>
                    <NavLink
                      to="/all-dct-wrong-numbers"
                      activeStyle={{ color: "#ffd037", textDecoration: "none" }}
                    >
                      <Dropdown.Item>All Wrong Numbers</Dropdown.Item>
                    </NavLink>
                    <NavLink
                      to="/dct-calls"
                      activeStyle={{ color: "#ffd037", textDecoration: "none" }}
                    >
                      <Dropdown.Item>Dct Calls History</Dropdown.Item>
                    </NavLink>

                    <NavLink
                      to="/transfer-dct-leads"
                      activeStyle={{ color: "#ffd037", textDecoration: "none" }}
                    >
                      <Dropdown.Item>Transfer Dct Leads</Dropdown.Item>
                    </NavLink>
                    <NavLink
                      to="/dct-daily-report"
                      activeStyle={{ color: "#ffd037", textDecoration: "none" }}
                    >
                      <Dropdown.Item> Dct Daily Report</Dropdown.Item>
                    </NavLink>
                  </Dropdown>
                ) : (
                  <></>
                )}

                {!loading &&
                  isAuthenticated &&
                  user &&
                  ((user.userGroupName &&
                    user.userGroupName === "Administrator") ||
                    user.userGroupName === "Super Admin" ||
                    user.userGroupName === "Sct Marketing" ||
                    user.userGroupName === "Marketing") ? (
                  <Dropdown title="SCT">
                    <NavLink
                      to="/all-sct-leads"
                      activeStyle={{ color: "#ffd037", textDecoration: "none" }}
                    >
                      <Dropdown.Item>All Leads</Dropdown.Item>
                    </NavLink>
                    <NavLink
                      to="/all-sct-prospects"
                      activeStyle={{ color: "#ffd037", textDecoration: "none" }}
                    >
                      <Dropdown.Item>All Prospects</Dropdown.Item>
                    </NavLink>
                    <NavLink
                      to="/all-sct-potentals"
                      activeStyle={{ color: "#ffd037", textDecoration: "none" }}
                    >
                      <Dropdown.Item>All Potentials</Dropdown.Item>
                    </NavLink>
                    <NavLink
                      to="/all-sct-followup"
                      activeStyle={{ color: "#ffd037", textDecoration: "none" }}
                    >
                      <Dropdown.Item>All Followup</Dropdown.Item>
                    </NavLink>
                    <NavLink
                      to="/all-engaged-clients"
                      activeStyle={{ color: "#ffd037", textDecoration: "none" }}
                    >
                      <Dropdown.Item>All Engaged Clients</Dropdown.Item>
                    </NavLink>
                    <NavLink
                      to="/all-regular-clients"
                      activeStyle={{ color: "#ffd037", textDecoration: "none" }}
                    >
                      <Dropdown.Item>All Regular Clients</Dropdown.Item>
                    </NavLink>
                    <NavLink
                      to="/all-demo"
                      activeStyle={{ color: "#ffd037", textDecoration: "none" }}
                    >
                      <Dropdown.Item>All Demo</Dropdown.Item>
                    </NavLink>
                    <NavLink
                      to="/all-wrong-numbers"
                      activeStyle={{ color: "#ffd037", textDecoration: "none" }}
                    >
                      <Dropdown.Item>All Wrong Numbers</Dropdown.Item>
                    </NavLink>
                    <NavLink
                      to="/sct-calls"
                      activeStyle={{ color: "#ffd037", textDecoration: "none" }}
                    >
                      <Dropdown.Item>Sct Calls History</Dropdown.Item>
                    </NavLink>
                    {user && user.empCtAccess === "All" && (
                      <NavLink
                        to="/potential-history"
                        activeStyle={{
                          color: "#ffd037",
                          textDecoration: "none",
                        }}
                      >
                        <Dropdown.Item> Potential History</Dropdown.Item>
                      </NavLink>
                    )}
                    {user && user.empCtAccess === "All" && (
                      <NavLink
                        to="/followup-history"
                        activeStyle={{
                          color: "#ffd037",
                          textDecoration: "none",
                        }}
                      >
                        <Dropdown.Item> Followup History</Dropdown.Item>
                      </NavLink>
                    )}

                    {user && user.empCtAccess === "All" && (
                      <NavLink
                        to="/transfer-sct-leads"
                        activeStyle={{
                          color: "#ffd037",
                          textDecoration: "none",
                        }}
                      >
                        <Dropdown.Item>Transfer Sct Leads</Dropdown.Item>
                      </NavLink>
                    )}
                    <NavLink
                      to="/sct-daily-report"
                      activeStyle={{ color: "#ffd037", textDecoration: "none" }}
                    >
                      <Dropdown.Item> Sct Daily Report</Dropdown.Item>
                    </NavLink>
                    <NavLink
                      to="/sct-call-report"
                      activeStyle={{ color: "#ffd037", textDecoration: "none" }}
                    >
                      <Dropdown.Item>MIS Report</Dropdown.Item>
                    </NavLink>
                  </Dropdown>
                ) : (
                  <></>
                )}

                {!loading &&
                  isAuthenticated &&
                  user &&
                  (user.userGroupName &&
                    (user.userGroupName === "Administrator" ||
                      user.userGroupName === "Super Admin" ||
                      user._id === "62adae375b6aaf82ce15a1d5")) ? (
                  <Dropdown title="Reports">
                    {
                      (user.userGroupName === "Administrator" ||
                        user.userGroupName === "Super Admin") ? (
                        <NavLink
                          to={{
                            pathname: "/client-report-detail",
                            data: {
                              callFromHeader: true
                            }
                          }}
                          activeStyle={{ color: "#ffd037", textDecoration: "none" }}
                        >
                          <Dropdown.Item>Client Report </Dropdown.Item>
                        </NavLink>
                      ) : (<></>)
                    }
                    <NavLink
                      to="/inactive-clients"
                      activeStyle={{ color: "#ffd037", textDecoration: "none" }}
                    >
                      <Dropdown.Item>Inactive Clients</Dropdown.Item>
                    </NavLink>
                  </Dropdown>
                ) : (
                  <NavItem></NavItem>
                )}

                <NavItem>
                  {!loading &&
                    isAuthenticated &&
                    user &&
                    ((user.userGroupName &&
                      user.userGroupName === "Administrator") ||
                      user.userGroupName === "Super Admin" ||
                      user.userGroupName === "Sct Marketing" ||
                      user.userGroupName === "Clarical Admins" ||
                      user.userGroupName === "Marketing") ? (
                    <NavLink
                      to="/all-Enquiry"
                      activeStyle={{ color: "#ffd037", textDecoration: "none" }}
                    >
                      Enquiry{" "}
                      <span>: {allUnResolved && allUnResolved.length}</span>
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
                        {/* <li>
                          <Link to="/all-clients">All Clients</Link>
                        </li> */}
                        {(user &&
                          user.userGroupName &&
                          user.userGroupName === "Administrator") ||
                          user.userGroupName === "Super Admin" ||
                          user.userGroupName === "Marketing" ||
                          user.userGroupName === "Sct Marketing" ||
                          user.userGroupName === "Dct Marketing" ? (
                          <>
                            <li>
                              <Link to="/all-Region">All Region</Link>
                            </li>
                            <li>
                              <Link to="/all-sct-projects">All Projects</Link>
                            </li>
                          </>
                        ) : (
                          <></>
                        )}

                        {(user &&
                          user.userGroupName &&
                          user.userGroupName === "Administrator") ||
                          user.userGroupName === "Super Admin" ||
                          user.userGroupName === "Marketing" ||
                          user.userGroupName === "Clarical Admins" ? (
                          <>
                            <li>
                              <Link to="/all-dct-client">All Dct Clients</Link>
                            </li>
                          </>
                        ) : (
                          <></>
                        )}

                        {(user &&
                          user.userGroupName &&
                          user.userGroupName === "Administrator") ||
                          user.userGroupName === "Super Admin" ||
                          user.userGroupName === "Clarical Admins" ? (
                          <li>
                            <Link to="/all-staff">All Staff</Link>
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
                            <li>
                              <Link to="/all-trash">Trash</Link>
                            </li>
                            <li>
                              <Link to="/all-company">Company </Link>
                            </li>
                          </Fragment>
                        ) : (
                          <></>
                        )}
                        <li>
                          <Link to="/all-leave">Leave Management</Link>
                        </li>
                        <li>
                          <Link to="/all-feedback">All Feedback</Link>
                        </li>
                        {/* <li>
                          <Link to="/client-report">Client Report</Link>
                        </li> */}
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
        {/* logout */}
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
  sct: state.sct,
});

export default connect(mapStateToProps, { logout, getUnresolvedData })(Header);
