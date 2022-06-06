import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Select from "react-select";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Spinner from "../layout/Spinner";
import AddStaffInfo from "./AddStaffInfo";
import AddStaffAreainfo from "./AddStaffAreainfo";
import AddSalaryInfo from "./AddSalaryInfo";
const EditEmployeeDetails = ({ auth: { isAuthenticated, user, users } }) => {
  const [formData, setFormData] = useState({
    memberName: "",
    memberPhone: "",
    memberAddress: "",
    memberAadharNo: "",
    memberPanNo: "",
    memberDesg: "",

    memberJoiningDate: "",
    memberCode: "",
    isSubmitted: false,
  });

  const {
    memberName,
    memberPhone,
    memberAddress,
    memberAadharNo,
    memberPanNo,
    memberDesg,
    memberCode,
    isSubmitted,
  } = formData;
  const [startSelectedDate, setJoinDate] = useState("");
  const onDateChange = (e) => {
    setJoinDate(e.target.value);
  };

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // code for next previous tabing starts
  const [tabIndex, setTabIndex] = useState(0);

  const NextBackBtn = (tabIndex) => {
    setTabIndex(tabIndex);
  };
  // code for next previous tabing ends
  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <div className="col-lg-12 col-md-11 col-sm-12 col-12">
          <h2 className="heading_color">Edit Employee Details </h2>
          <hr />
        </div>
        <section className="sub_reg">
          <Tabs selectedIndex={tabIndex}>
            <div className="row col-lg-12 col-md-11 col-sm-12 col-12">
              <TabList>
                <Tab tabfor="0">Staff Info</Tab>
                <Tab tabfor="2">Area Info</Tab>

                <Tab tabfor="3">Salary Info</Tab>
              </TabList>
            </div>

            <TabPanel tabId="0">
              <div className=" col-md-12 col-lg-12 col-sm-12 col-12 ">
                <form onSubmit={(e) => NextBackBtn(1)}>
                  <div className=" col-lg-12 col-md-11 col-sm-12 col-12">
                    <div className=" card-new">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                        <h5>Personal Info</h5>
                      </div>
                      <div className="row col-lg-12 col-md-11 col-sm-12 col-12">
                        <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                          <label className="label-control">
                            Employee Name:
                          </label>
                          <input
                            type="text"
                            name="memberName"
                            value={memberName}
                            className="form-control"
                            onChange={(e) => onInputChange(e)}
                            //required
                          />
                        </div>
                        <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                          <label className="label-control">
                            Employee Phone*:
                          </label>
                          <input
                            type="number"
                            name="memberPhone"
                            value={memberPhone}
                            className="form-control"
                            onWheel={() => document.activeElement.blur()}
                            onChange={(e) => onInputChange(e)}
                            onKeyDown={(e) =>
                              (e.keyCode === 69 || e.keyCode === 190) &&
                              e.preventDefault()
                            }
                          />
                        </div>
                        <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                          <label className="label-control">
                            Adhaar Card No*:
                          </label>
                          <input
                            type="text"
                            name="memberAadharNo"
                            value={memberAadharNo}
                            className="form-control"
                            onChange={(e) => onInputChange(e)}
                          />
                        </div>
                        <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                          <label className="label-control">Pan Card No:</label>
                          <input
                            type="text"
                            name="memberPanNo"
                            value={memberPanNo}
                            className="form-control"
                            onChange={(e) => onInputChange(e)}
                          />
                        </div>
                        <div className="col-lg-3 col-md-12 col-sm-12 col-12 py-3">
                          <label> DoB</label>
                          <br />
                          <input
                            type="date"
                            placeholder="dd/mm/yyyy"
                            className="form-control cpp-input datevalidation"
                            name="instistartDate"
                            value={startSelectedDate}
                            onChange={(e) => onDateChange(e)}
                            style={{
                              width: "75%",
                            }}
                            /// required
                          />
                        </div>

                        <div className="col-lg-3 col-md-12 col-sm-12 col-12 ">
                          <label className="label-control">Email :</label>
                          <input
                            type="text"
                            // name="memberAadharNo"
                            // value={memberAadharNo}
                            className="form-control"
                            onChange={(e) => onInputChange(e)}
                          />
                        </div>
                        <div className="col-lg-3 col-md-12 col-sm-12 col-12 py-3">
                          <label> DoJ</label>
                          <br />
                          <input
                            type="date"
                            placeholder="dd/mm/yyyy"
                            className="form-control cpp-input datevalidation"
                            //   name="instistartDate"
                            //   value={startSelectedDate}
                            //   onChange={(e) => onDateChange(e)}
                            style={{
                              width: "75%",
                            }}
                            // required
                          />
                        </div>
                        <div className="col-lg-3 col-md-12 col-sm-12 col-12 ">
                          <label className="label-control">Department :</label>
                          <Select
                            name="districtName"
                            //  options={alldistrict}
                            isSearchable={true}
                            // value={district}
                            placeholder="Select Department"
                            // onChange={(e) => ondistrictChange(e)}
                          />
                        </div>
                        <div className="col-lg-3 col-md-12 col-sm-12 col-12 ">
                          <label className="label-control">Designation :</label>
                          <Select
                            name="districtName"
                            //  options={alldistrict}
                            isSearchable={true}
                            // value={district}
                            placeholder="Select Department"
                            // onChange={(e) => ondistrictChange(e)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12 col-lg-12 col-sm-12 col-12 text-left">
                    <input
                      type="submit"
                      name="submit"
                      value="Next"
                      className="btn sub_form btn_continue Save float-right"
                    />
                  </div>
                </form>
              </div>
            </TabPanel>
            <TabPanel tabId="2">
              <form onSubmit={(e) => NextBackBtn(2)}>
                <div className="row col-md-12 col-lg-12 col-sm-12 col-12 ">
                  <div className=" col-lg-12 col-md-11 col-sm-12 col-12">
                    <div className=" card-new">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                        <h5>Area Info</h5>
                      </div>
                      <div className="row col-lg-12 col-md-11 col-sm-12 col-12">
                        <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                          <label className="label-control">Staff Code :</label>
                          <input
                            type="text"
                            name="memberName"
                            value={memberName}
                            className="form-control"
                            onChange={(e) => onInputChange(e)}
                            // required
                          />
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                          <label className="label-control">Address:</label>
                          <textarea
                            name="useraddr"
                            id="useraddr"
                            className="textarea form-control"
                            rows="3"
                            placeholder="Address"
                            //onChange={(e) => onInputChange2(e)}
                            style={{ width: "100%" }}
                            //   required
                          ></textarea>
                        </div>
                        <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                          <label className="label-control">State:</label>
                          <input
                            type="text"
                            name="memberAadharNo"
                            value={memberAadharNo}
                            className="form-control"
                            onChange={(e) => onInputChange(e)}
                          />
                        </div>
                        <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                          <label className="label-control">Pincode:</label>
                          <input
                            type="text"
                            name="memberPanNo"
                            value={memberPanNo}
                            className="form-control"
                            onChange={(e) => onInputChange(e)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <input
                    type="submit"
                    name="submit"
                    value="Next"
                    className="btn sub_form btn_continue Save float-right"
                  />
                  <button
                    className="btn sub_form btn_continue Save float-right"
                    onClick={() => NextBackBtn(0)}
                  >
                    Previous
                  </button>
                </div>
              </form>
            </TabPanel>

            <TabPanel tabId="3">
              <div className="row col-md-12 col-lg-12 col-sm-12 col-12 ">
                <div className=" col-lg-12 col-md-11 col-sm-12 col-12">
                  <div className=" card-new">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                      <h5>Bank Info</h5>
                    </div>
                    <div className="row col-lg-12 col-md-11 col-sm-12 col-12">
                      <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                        <label className="label-control">Bank Name :</label>
                        <input
                          type="text"
                          name="memberName"
                          value={memberName}
                          className="form-control"
                          onChange={(e) => onInputChange(e)}
                          required
                        />
                      </div>
                      <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                        <label className="label-control">IFSC Code:</label>
                        <input
                          type="text"
                          name="memberName"
                          value={memberName}
                          className="form-control"
                          onChange={(e) => onInputChange(e)}
                          required
                        />
                      </div>
                      <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                        <label className="label-control">Account no:</label>
                        <input
                          type="text"
                          name="memberAadharNo"
                          value={memberAadharNo}
                          className="form-control"
                          onChange={(e) => onInputChange(e)}
                        />
                      </div>
                      <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                        <label className="label-control">Branch:</label>
                        <input
                          type="text"
                          name="memberPanNo"
                          value={memberPanNo}
                          className="form-control"
                          onChange={(e) => onInputChange(e)}
                        />
                      </div>
                      <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                        <label className="label-control">PF No:</label>
                        <input
                          type="text"
                          name="memberPanNo"
                          value={memberPanNo}
                          className="form-control"
                          onChange={(e) => onInputChange(e)}
                        />
                      </div>
                      <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                        <label className="label-control">ESI:</label>
                        <input
                          type="text"
                          name="memberPanNo"
                          value={memberPanNo}
                          className="form-control"
                          onChange={(e) => onInputChange(e)}
                        />
                      </div>
                      <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                        <label className="label-control">UAN No:</label>
                        <input
                          type="text"
                          name="memberPanNo"
                          value={memberPanNo}
                          className="form-control"
                          onChange={(e) => onInputChange(e)}
                        />
                      </div>
                      <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                        <label className="label-control">Basic:</label>
                        <input
                          type="text"
                          name="memberPanNo"
                          value={memberPanNo}
                          className="form-control"
                          onChange={(e) => onInputChange(e)}
                        />
                      </div>
                      <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                        <label className="label-control">HRA:</label>
                        <input
                          type="text"
                          name="memberPanNo"
                          value={memberPanNo}
                          className="form-control"
                          onChange={(e) => onInputChange(e)}
                        />
                      </div>
                      <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                        <label className="label-control">DA:</label>
                        <input
                          type="text"
                          name="memberPanNo"
                          value={memberPanNo}
                          className="form-control"
                          onChange={(e) => onInputChange(e)}
                        />
                      </div>
                    </div>
                    {/* <form className="row" onSubmit={(e) => onSubmit(e)}> */}
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                      {/* {loading ? (
                          <button
                            className="btn sub_form btn_continue blackbrd Save float-right"
                            disabled
                          >
                            Loading...
                          </button>
                        ) : ( */}
                      <input
                        type="submit"
                        name="Save"
                        value="Submit"
                        className="btn sub_form btn_continue Save float-right"
                      />
                      {/* )} */}
                      <button
                        className="btn sub_form btn_continue Save float-right"
                        onClick={() => NextBackBtn(1)}
                      >
                        Previous
                      </button>
                    </div>
                    {/* </form> */}
                  </div>
                </div>
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

EditEmployeeDetails.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(EditEmployeeDetails);
