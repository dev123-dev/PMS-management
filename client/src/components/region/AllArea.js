import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Spinner from "../layout/Spinner";
import AllStates from "./AllStates";
import AllDistricts from "./AllDistricts";
import AllCountry from "./AllCountry";
import AllSctCountry from "./AllSctCountry";

const AllArea = ({ auth: { isAuthenticated, user, users } }) => {
  return !isAuthenticated || !user  ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <div className="col-lg-11 col-md-11 col-sm-12 col-12">
          <h2 className="heading_color">All Area </h2>
          <hr />
        </div>
        <section className="sub_reg">
          <Tabs>
            <div className="row col-lg-11 col-md-11 col-sm-12 col-12">
              <TabList>
                {(user &&
                  user.userGroupName &&
                  user.userGroupName === "Marketing") ||
                user.userGroupName === "Dct Marketing" ||
                user.userGroupName === "Administrator" ||
                user.userGroupName === "Super Admin" ? (
                  <Tab>Dct Country</Tab>
                ) : (
                  <></>
                )}
                {(user &&
                  user.userGroupName &&
                  user.userGroupName === "Marketing") ||
                user.userGroupName === "Sct Marketing" ||
                user.userGroupName === "Administrator" ||
                user.userGroupName === "Super Admin" ? (
                  <>
                    <Tab>Sct Country</Tab>
                    <Tab>State</Tab>
                    {/* <Tab>District</Tab> */}
                  </>
                ) : (
                  <></>
                )}
              </TabList>
            </div>
            {(user &&
              user.userGroupName &&
              user.userGroupName === "Marketing") ||
            user.userGroupName === "Dct Marketing" ||
            user.userGroupName === "Administrator" ||
            user.userGroupName === "Super Admin" ? (
              <TabPanel>
                <div className=" col-md-12 col-lg-12 col-sm-12 col-12 ">
                  <AllCountry />
                </div>
              </TabPanel>
            ) : (
              <></>
            )}
            {(user &&
              user.userGroupName &&
              user.userGroupName === "Marketing") ||
            user.userGroupName === "Sct Marketing" ||
            user.userGroupName === "Administrator" ||
            user.userGroupName === "Super Admin" ? (
              <>
                <TabPanel>
                  <div className=" col-md-12 col-lg-12 col-sm-12 col-12 ">
                    <AllSctCountry />
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="row col-md-12 col-lg-12 col-sm-12 col-12 ">
                    <AllStates />
                  </div>
                </TabPanel>
                {/* <TabPanel>
                  <div className="row col-md-12 col-lg-12 col-sm-12 col-12 ">
                    <AllDistricts />
                  </div>
                </TabPanel> */}
              </>
            ) : (
              <></>
            )}
          </Tabs>
        </section>
      </div>
    </Fragment>
  );
};

AllArea.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  shg: state.shg,
});

export default connect(mapStateToProps, {})(AllArea);
