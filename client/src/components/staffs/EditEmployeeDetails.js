import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Select from "react-select";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Spinner from "../layout/Spinner";
import { editEmployeeDetails, getALLUserGroups } from "../../actions/user";
import { getALLDepartment, getActiveDesignation } from "../../actions/settings";

const EditEmployeeDetails = ({
  auth: { isAuthenticated, user, users },
  settings: { allDepartment, activeDesignation },
  getALLDepartment,
  onEditModalChange,
  getActiveDesignation,
  allEmployeedata,
  editEmployeeDetails,
  getALLUserGroups,
}) => {
  useEffect(() => {
    getALLDepartment();
  }, [getALLDepartment]);
  useEffect(() => {
    getActiveDesignation();
  }, [getActiveDesignation]);
  useEffect(() => {
    getALLUserGroups();
  }, [getALLUserGroups]);
  // console.log(allEmployeedata);
  // console.log("allDeptartment", allDepartment);

  const [formData, setFormData] = useState({
    empFullName:
      allEmployeedata && allEmployeedata.empFullName
        ? allEmployeedata.empFullName
        : "",

    employeePhone:
      allEmployeedata && allEmployeedata.empPhone
        ? allEmployeedata.empPhone
        : "",

    employeeAadharNo:
      allEmployeedata && allEmployeedata.empAadharNo
        ? allEmployeedata.empAadharNo
        : "",

    employeePanNo:
      allEmployeedata && allEmployeedata.empPanNo
        ? allEmployeedata.empPanNo
        : "",

    empDOB:
      allEmployeedata && allEmployeedata.empDOB ? allEmployeedata.empDOB : "",

    employeeEmail:
      allEmployeedata && allEmployeedata.empEmail
        ? allEmployeedata.empEmail
        : "",
    empJoiningDate:
      allEmployeedata && allEmployeedata.empJoiningDate
        ? allEmployeedata.empJoiningDate
        : "",
    empDesignationDate:
      allEmployeedata && allEmployeedata.empDesignationDate
        ? allEmployeedata.empDesignationDate
        : "",

    employeeDepartment:
      allEmployeedata && allEmployeedata.employeeDepartment
        ? allEmployeedata.employeeDepartment
        : "",

    employeeDesignation:
      allEmployeedata && allEmployeedata.employeeDesignation
        ? allEmployeedata.employeeDesignation
        : "",

    employeeCode:
      allEmployeedata && allEmployeedata.empCode ? allEmployeedata.empCode : "",

    empAddress:
      allEmployeedata && allEmployeedata.empAddress
        ? allEmployeedata.empAddress
        : "",

    employeeState:
      allEmployeedata && allEmployeedata.empState
        ? allEmployeedata.empState
        : "",

    employeePincode:
      allEmployeedata && allEmployeedata.empPincode
        ? allEmployeedata.empPincode
        : "",

    employeeBankName:
      allEmployeedata && allEmployeedata.empBankName
        ? allEmployeedata.empBankName
        : "",

    employeeIFSCcode:
      allEmployeedata && allEmployeedata.empIFSCCode
        ? allEmployeedata.empIFSCCode
        : "",
    employeeAccountNo:
      allEmployeedata && allEmployeedata.empAccountNo
        ? allEmployeedata.empAccountNo
        : "",

    employeeBranch:
      allEmployeedata && allEmployeedata.empBankBranch
        ? allEmployeedata.empBankBranch
        : "",

    employeePFNo:
      allEmployeedata && allEmployeedata.empPFNo ? allEmployeedata.empPFNo : "",

    employeeESI:
      allEmployeedata && allEmployeedata.empESICNo
        ? allEmployeedata.empESICNo
        : "",
    employeeUANNo:
      allEmployeedata && allEmployeedata.empUANNo
        ? allEmployeedata.empUANNo
        : "",
    employeeBasic:
      allEmployeedata && allEmployeedata.empBasic
        ? allEmployeedata.empBasic
        : "",

    employeeHRA:
      allEmployeedata && allEmployeedata.empHRA ? allEmployeedata.empHRA : "",
    employeeDA:
      allEmployeedata && allEmployeedata.empDA ? allEmployeedata.empDA : "",
    proinc:
      allEmployeedata && allEmployeedata.proinc ? allEmployeedata.proinc : "",
    empCA:
      allEmployeedata && allEmployeedata.empCA ? allEmployeedata.empCA : "",
    Others:
      allEmployeedata && allEmployeedata.Others ? allEmployeedata.Others : "",
    cityallowance:
      allEmployeedata && allEmployeedata.cityallowance
        ? allEmployeedata.cityallowance
        : "",

    isSubmitted: false,
  });

  const {
    employeeName,
    empFullName,
    employeePhone,
    employeeAadharNo,
    employeePanNo,
    employeeDOB,
    employeeEmail,
    employeeDOJ,
    employeeDepartment,
    employeeDesignation,
    employeeCode,
    empAddress,
    employeeState,
    employeePincode,
    employeeBankName,
    employeeIFSCcode,
    employeeAccountNo,
    employeeBranch,
    employeePFNo,
    employeeESI,
    employeeUANNo,
    employeeBasic,
    employeeHRA,
    employeeDA,
    cityallowance,
    Others,
    proinc,
    empCA,

    isSubmitted,
  } = formData;

  const [color, setColor] = useState(
    allEmployeedata && allEmployeedata.empColorCode
      ? allEmployeedata.empColorCode
      : ""
  );

  const [employeeDOJDate, setDOJDate] = useState(
    allEmployeedata && allEmployeedata.empJoiningDate
      ? allEmployeedata.empJoiningDate
      : ""
  );
  const onDateChange = (e) => {
    setDOJDate(e.target.value);
  };

  const [employeeDOBDate, setDOBDDate] = useState(
    allEmployeedata && allEmployeedata.empDOB ? allEmployeedata.empDOB : ""
  );
  const onDateChange1 = (e) => {
    setDOBDDate(e.target.value);
  };

  const [employeeDesigDate, setDesigDate] = useState(
    allEmployeedata && allEmployeedata.empDesignationDate
      ? allEmployeedata.empDesignationDate
      : ""
  );
  const onDateChange2 = (e) => {
    setDesigDate(e.target.value);
  };

  const [employeePfDate, setPfDate] = useState(
    allEmployeedata && allEmployeedata.empPFDate
      ? allEmployeedata.empPFDate
      : ""
  );
  const onDateChange3 = (e) => {
    setPfDate(e.target.value);
  };

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const activeDepartment = [];
  let allDepartmentData = JSON.parse(localStorage.getItem("allDepartmentData"));

  allDepartmentData &&
    allDepartmentData.map((department) =>
      activeDepartment.push({
        departmentId: department._id,
        label: department.departmentName,
        value: department.departmentName,
      })
    );

  const [department, getdepartmentData] = useState();
  if (!department && activeDepartment.length > 0) {
    getdepartmentData(
      allEmployeedata
        ? activeDepartment &&
            activeDepartment.filter(
              (x) => x.departmentId === allEmployeedata.departmentId
            )[0]
        : ""
    );
  }
  const [departmentId, setdepartmentId] = useState();

  const onDepartmentChange = (e) => {
    var departmentId = "";
    getdepartmentData(e);
    departmentId = e.departmentId;
    setdepartmentId(departmentId);
  };

  let allDesignationData = JSON.parse(
    localStorage.getItem("allDesignationData")
  );

  const alldesignation = [];

  allDesignationData &&
    allDesignationData.map((designation) =>
      alldesignation.push({
        designationId: designation._id,
        label: designation.designationName,
        value: designation.designationName,
      })
    );

  const [designation, getdesignationData] = useState("");
  if (!designation && alldesignation.length > 0) {
    getdesignationData(
      allEmployeedata
        ? alldesignation &&
            alldesignation.filter(
              (x) => x.designationId === allEmployeedata.designationId
            )[0]
        : ""
    );
  }
  const [designationId, setdesignationId] = useState();
  const [designationName, setdesignationName] = useState();

  const onDesigChange = (e) => {
    var designationId = "";
    var designationName = "";
    getdesignationData(e);
    designationId = e.designationId;

    designationName = e.designationName;
    setdesignationId(designationId);
    setdesignationName(designationName);
  };

  let allUserGroupData = JSON.parse(localStorage.getItem("allUserGroupData"));
  //console.log(allUserGroupData);

  const allusergroups = [];
  allUserGroupData.map((usergroups) =>
    allusergroups.push({
      usergroupsId: usergroups._id,
      label: usergroups.userGroupName,
      value: usergroups.userGroupName,
    })
  );

  const [usergroups, getusergroupsData] = useState(
    allEmployeedata
      ? allusergroups &&
          allusergroups.filter(
            (x) => x.usergroupsId === allEmployeedata.usergroupsId
          )[0]
      : ""
  );

  const [usergroupsId, setusergroupsId] = useState();
  const [userGroupName, setsetusergroupsName] = useState();

  const onUsergroupChange = (e) => {
    var usergroupsId = "";
    var userGroupName = "";
    getusergroupsData(e);
    usergroupsId = e.usergroupsId;

    userGroupName = e.userGroupName;
    setusergroupsId(usergroupsId);
    setsetusergroupsName(userGroupName);
  };

  // code for next previous tabing starts
  const [tabIndex, setTabIndex] = useState(0);

  const NextBackBtn = (tabIndex) => {
    setTabIndex(tabIndex);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // if (checkErrors()) {
    const finalData = {
      recordId: allEmployeedata ? allEmployeedata._id : "",
      empFullName: empFullName,
      empPhone: employeePhone,
      empAadharNo: employeeAadharNo,
      empPanNo: employeePanNo,
      empDOB: employeeDOBDate,
      empEmail: employeeEmail,
      empJoiningDate: employeeDOJDate,
      departmentId: department.departmentId,
      departmentName: department.value,
      designationId: designation.designationId,
      designationName: designation.value,
      empCode: employeeCode,
      empAddress: empAddress,
      empState: employeeState,
      empPincode: employeePincode,
      empBankName: employeeBankName,
      empIFSCCode: employeeIFSCcode,
      empAccountNo: employeeAccountNo,
      empBankBranch: employeeBranch,
      empPFNo: employeePFNo,
      empESICNo: employeeESI,
      empUANNo: employeeUANNo,
      empBasic: employeeBasic,
      empHRA: employeeHRA,
      empDA: employeeDA,
      empCA: empCA,
      empColorCode: color,
      empDesignationDate: employeeDesigDate,
      empPFDate: employeePfDate,
      cityallowance: cityallowance,
      Others: Others,
      proinc: proinc,
      usergroupsId: usergroups.usergroupsId,
      userGroupName: usergroups.value,
      empEditedById: user._id,
      allEmployeedata: allEmployeedata,
    };
    // console.log("finalData", finalData);
    editEmployeeDetails(finalData);
    onEditModalChange(true);
    // setFormData({
    //   ...formData,
    //   districtName: "",
    //   isSubmitted: true,
    // });
    // }
  };
  // code for next previous tabing ends
  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      {/* <div className="container container_align "> */}
      {/* <div className="col-lg-12 col-md-11 col-sm-12 col-12">
          <h2 className="heading_color">Add Employee Details </h2>
          <hr />
        </div> */}
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
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <h5>Personal Info</h5>
                  </div>
                  <div className="row col-lg-12 col-md-11 col-sm-12 col-12">
                    <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                      <label className="label-control">Employee Name* :</label>
                      <input
                        type="text"
                        name="empFullName"
                        value={empFullName}
                        className="form-control"
                        onChange={(e) => onInputChange(e)}
                        required
                      />
                    </div>
                    <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                      <label className="label-control">Employee Phone :</label>
                      <input
                        type="number"
                        name="employeePhone"
                        value={employeePhone}
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
                      <label className="label-control">Adhaar Card No :</label>
                      <input
                        type="text"
                        name="employeeAadharNo"
                        value={employeeAadharNo}
                        className="form-control"
                        onChange={(e) => onInputChange(e)}
                      />
                    </div>
                    <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                      <label className="label-control">Pan Card No :</label>
                      <input
                        type="text"
                        name="employeePanNo"
                        value={employeePanNo}
                        className="form-control"
                        onChange={(e) => onInputChange(e)}
                      />
                    </div>
                    <div className="col-lg-3 col-md-12 col-sm-12 col-12 py-3">
                      <label> DoB* :</label>
                      <br />
                      <input
                        type="date"
                        placeholder="dd/mm/yyyy"
                        className="form-control cpp-input datevalidation"
                        name="empDOB"
                        value={employeeDOBDate}
                        onChange={(e) => onDateChange1(e)}
                        style={{
                          width: "75%",
                        }}
                        required
                      />
                    </div>

                    <div className="col-lg-3 col-md-12 col-sm-12 col-12 ">
                      <label className="label-control">Email :</label>
                      <input
                        type="text"
                        name="employeeEmail"
                        value={employeeEmail}
                        className="form-control"
                        onChange={(e) => onInputChange(e)}
                      />
                    </div>
                    <div className="col-lg-3 col-md-12 col-sm-12 col-12 py-3">
                      <label> DoJ* :</label>
                      <br />
                      <input
                        type="date"
                        placeholder="dd/mm/yyyy"
                        className="form-control cpp-input datevalidation"
                        name="empJoiningDate"
                        value={employeeDOJDate}
                        onChange={(e) => onDateChange(e)}
                        style={{
                          width: "75%",
                        }}
                        required
                      />
                    </div>
                    <div className="col-lg-3 col-md-12 col-sm-12 col-12 ">
                      <label className="label-control">Department* :</label>
                      <Select
                        name="departmentName"
                        options={activeDepartment}
                        isSearchable={true}
                        value={department}
                        placeholder="Select Mode"
                        onChange={(e) => onDepartmentChange(e)}
                        theme={(theme) => ({
                          ...theme,
                          height: 26,
                          minHeight: 26,
                          borderRadius: 1,
                          colors: {
                            ...theme.colors,
                            primary: "black",
                          },
                        })}
                      />
                    </div>
                    <div className="col-lg-3 col-md-12 col-sm-12 col-12 ">
                      <label className="label-control">Emp Group* :</label>
                      <Select
                        name="departmentName"
                        options={allusergroups}
                        isSearchable={true}
                        value={usergroups}
                        placeholder="Select UserGroup"
                        onChange={(e) => onUsergroupChange(e)}
                        theme={(theme) => ({
                          ...theme,
                          height: 26,
                          minHeight: 26,
                          borderRadius: 1,
                          colors: {
                            ...theme.colors,
                            primary: "black",
                          },
                        })}
                      />
                    </div>
                    <div className="col-lg-3 col-md-12 col-sm-12 col-12 ">
                      <label className="label-control">Designation* :</label>
                      <Select
                        name="designationName"
                        options={alldesignation}
                        isSearchable={true}
                        value={designation}
                        placeholder="Select Desig"
                        onChange={(e) => onDesigChange(e)}
                        theme={(theme) => ({
                          ...theme,
                          height: 26,
                          minHeight: 26,
                          borderRadius: 1,
                          colors: {
                            ...theme.colors,
                            primary: "black",
                          },
                        })}
                      />
                    </div>
                    <div className="col-lg-3 col-md-12 col-sm-12 col-12 py-3">
                      <label> Designation Date* :</label>
                      <br />
                      <input
                        type="date"
                        placeholder="dd/mm/yyyy"
                        className="form-control cpp-input datevalidation"
                        name="empDesignationDate"
                        value={employeeDesigDate}
                        onChange={(e) => onDateChange2(e)}
                        style={{
                          width: "75%",
                        }}
                        required
                      />
                    </div>
                    <div className="col-lg-3 col-md-12 col-sm-12 col-12 ">
                      <label className="label-control">Emp color :</label>
                      <br />
                      <input
                        className="form-control"
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        disabled
                      />
                    </div>
                  </div>
                  {/* </div> */}
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
                  {/* <div className=" card-new"> */}
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <h5>Area Info</h5>
                  </div>
                  <div className="row col-lg-12 col-md-11 col-sm-12 col-12">
                    <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                      <label className="label-control">Employee Code :</label>
                      <input
                        type="text"
                        name="employeeCode"
                        value={employeeCode}
                        className="form-control"
                        onChange={(e) => onInputChange(e)}
                        // required
                      />
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                      <label className="label-control">Address : </label>
                      <textarea
                        name="empAddress"
                        id="empAddress"
                        value={empAddress}
                        className="textarea form-control"
                        rows="3"
                        placeholder="Address"
                        onChange={(e) => onInputChange(e)}
                        style={{ width: "100%" }}
                        //   required
                      ></textarea>
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                      <label className="label-control">State :</label>
                      <input
                        type="text"
                        name="employeeState"
                        value={employeeState}
                        className="form-control"
                        onChange={(e) => onInputChange(e)}
                      />
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                      <label className="label-control">Pincode :</label>
                      <input
                        type="text"
                        name="employeePincode"
                        value={employeePincode}
                        className="form-control"
                        onChange={(e) => onInputChange(e)}
                      />
                    </div>
                  </div>
                  {/* </div> */}
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
                {/* <div className=" card-new"> */}
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <h5>Bank Info</h5>
                </div>
                <div className="row col-lg-12 col-md-11 col-sm-12 col-12">
                  <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                    <label className="label-control">Bank Name :</label>
                    <input
                      type="text"
                      name="employeeBankName"
                      value={employeeBankName}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                      required
                    />
                  </div>
                  <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                    <label className="label-control">IFSC Code :</label>
                    <input
                      type="text"
                      name="employeeIFSCcode"
                      value={employeeIFSCcode}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                      required
                    />
                  </div>
                  <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                    <label className="label-control">Account no :</label>
                    <input
                      type="text"
                      name="employeeAccountNo"
                      value={employeeAccountNo}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                  <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                    <label className="label-control">Branch :</label>
                    <input
                      type="text"
                      name="employeeBranch"
                      value={employeeBranch}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                  <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                    <label className="label-control">PF No :</label>
                    <input
                      type="text"
                      name="employeePFNo"
                      value={employeePFNo}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>

                  <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                    <label className="label-control">City Allowance :</label>
                    <input
                      type="text"
                      name="cityallowance"
                      value={cityallowance}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>

                  <div className="col-lg-3 col-md-12 col-sm-12 col-12 py-3">
                    <label> PF Date :</label>
                    <br />
                    <input
                      type="date"
                      placeholder="dd/mm/yyyy"
                      className="form-control cpp-input datevalidation"
                      name="employeePfDate"
                      value={employeePfDate}
                      onChange={(e) => onDateChange3(e)}
                      style={{
                        width: "75%",
                      }}

                      // required
                    />
                  </div>
                  <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                    <label className="label-control">ESI :</label>
                    <input
                      type="text"
                      name="employeeESI"
                      value={employeeESI}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                  <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                    <label className="label-control">UAN No :</label>
                    <input
                      type="text"
                      name="employeeUANNo"
                      value={employeeUANNo}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                  <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                    <label className="label-control">Basic :</label>
                    <input
                      type="text"
                      name="employeeBasic"
                      value={employeeBasic}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                  <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                    <label className="label-control">HRA :</label>
                    <input
                      type="text"
                      name="employeeHRA"
                      value={employeeHRA}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                  <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                    <label className="label-control">DA :</label>
                    <input
                      type="text"
                      name="employeeDA"
                      value={employeeDA}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>

                  <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                    <label className="label-control">CA :</label>
                    <input
                      type="number"
                      name="empCA"
                      value={empCA}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>

                  <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                    <label className="label-control">Others :</label>
                    <input
                      type="number"
                      name="Others"
                      value={Others}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                  <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                    <label className="label-control">Pro Inc :</label>
                    <input
                      type="number"
                      name="proinc"
                      value={proinc}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                </div>
                <form className="row" onSubmit={(e) => onSubmit(e)}>
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
                </form>
                {/* </div> */}
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
      {/* </div> */}
    </Fragment>
  );
};

EditEmployeeDetails.propTypes = {
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  getALLDepartment: PropTypes.object.isRequired,
  getActiveDesignation: PropTypes.object.isRequired,
  editEmployeeDetails: PropTypes.object.isRequired,
  getALLUserGroups: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  settings: state.settings,
});

export default connect(mapStateToProps, {
  getALLDepartment,
  getActiveDesignation,
  editEmployeeDetails,
  getALLUserGroups,
})(EditEmployeeDetails);
