import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Spinner from "../layout/Spinner";
import AddStaffInfo from "./AddStaffInfo";
import AddStaffAreainfo from "./AddStaffAreainfo";
import AddSalaryInfo from "./AddSalaryInfo";
const AddEmployeeDetails = ({ auth: { isAuthenticated, user, users } }) => {
  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <div className="col-lg-11 col-md-11 col-sm-12 col-12">
          <h2 className="heading_color">Add Employee Details </h2>
          <hr />
        </div>
        <section className="sub_reg">
          <Tabs>
            <div className="row col-lg-11 col-md-11 col-sm-12 col-12">
              <TabList>
                <Tab>Staff Info</Tab>
                <Tab>Area Info</Tab>

                <Tab>Salary Info</Tab>
                {/* <Tab>District</Tab> */}
              </TabList>
            </div>

            <TabPanel>
              <div className=" col-md-12 col-lg-12 col-sm-12 col-12 ">
                <AddStaffInfo />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="row col-md-12 col-lg-12 col-sm-12 col-12 ">
                <AddStaffAreainfo />
              </div>
            </TabPanel>

            <TabPanel>
              <div className="row col-md-12 col-lg-12 col-sm-12 col-12 ">
                <AddSalaryInfo />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="row col-md-12 col-lg-12 col-sm-12 col-12 ">
                {/* <AllDistricts /> */}
              </div>
            </TabPanel>
          </Tabs>
        </section>
      </div>
    </Fragment>
  );
};

AddEmployeeDetails.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(AddEmployeeDetails);
