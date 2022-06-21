import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Spinner from "../layout/Spinner";
import {
  AddEmployee,
  getALLUserGroups,
  getLastEnteredEmpCode,
} from "../../actions/user";
import { getALLDepartment, getActiveDesignation } from "../../actions/settings";
import FileBase64 from "react-file-base64";
import { Link, Redirect } from "react-router-dom";
const AddEmployeeDetails = ({
  auth: { isAuthenticated, user, users },
  user: { userGroups, lastEnteredEmpCode },
  settings: { allDepartment, activeDesignation },
  getALLDepartment,
  AddEmployee,
  getActiveDesignation,
  getALLUserGroups,
  getLastEnteredEmpCode,
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
  useEffect(() => {
    getLastEnteredEmpCode();
  }, [getLastEnteredEmpCode]);

  const [formData, setFormData] = useState({
    employeeName: "",
    employeePhone: "",
    employeeAadharNo: "",
    employeePanNo: "",
    employeeDOB: "",
    employeeEmail: "",
    employeeDOJ: "",
    employeeDepartment: "",
    employeeDesignation: "",
    employeeCode: "",
    empFullName: "",
    employeeAddr: "",
    employeeState: "",
    employeePincode: "",
    employeeBankName: "",
    employeeIFSCcode: "",
    employeeAccountNo: "",
    employeeBranch: "",
    employeePFNo: "",
    employeeESI: "",
    employeeUANNo: "",
    employeeBasic: "",
    employeeHRA: "",
    employeeDA: "",
    departmentId: "",
    cityallowance: "",
    Others: "",
    proinc: "",
    empCA: "",
    userName: "",
    profilephoto: "",
    isSubmitted: false,
  });

  const {
    empFullName,
    employeeName,
    employeePhone,
    employeeAadharNo,
    employeePanNo,
    employeeDOB,
    employeeEmail,
    employeeDOJ,
    employeeDepartment,
    employeeDesignation,
    employeeCode,
    employeeAddr,
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
    password,
    rePassword,
    userName,
    profilephoto,
    isSubmitted,
  } = formData;

  const [employeeDOJDate, setDOJDate] = useState("");
  const onDateChange = (e) => {
    setDOJDate(e.target.value);
  };

  const [employeeDOBDate, setDOBDDate] = useState("");
  const onDateChange1 = (e) => {
    setDOBDDate(e.target.value);
  };

  const [employeeDesigDate, setDesigDate] = useState("");
  const onDateChange2 = (e) => {
    setDesigDate(e.target.value);
  };

  const [employeePfDate, setPfDate] = useState("");
  const onDateChange3 = (e) => {
    setPfDate(e.target.value);
  };

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // code for next previous tabing starts
  const [tabIndex, setTabIndex] = useState(0);

  const NextBackBtn = (tabIndex) => {
    setTabIndex(tabIndex);
  };

  const [department, getdepartmentData] = useState();
  const [departmentId, setdepartmentId] = useState();
  const [designationName, setdesignationName] = useState();
  const onDepartmentChange = (e) => {
    //Required Validation starts
    setError({
      ...error,
      DepartmentIdChecker: true,
      DepartmentErrorStyle: { color: "#000" },
    });
    //Required Validation ends
    var departmentId = "";
    getdepartmentData(e);
    departmentId = e.departmentId;
    setdepartmentId(departmentId);
  };

  const alldesignation = [];
  activeDesignation.map((designation) =>
    alldesignation.push({
      designationId: designation._id,
      label: designation.designationName,
      value: designation.designationName,
    })
  );

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

  const [designation, getdesignationData] = useState();
  const [designationId, setdesignationId] = useState();
  const [color, setColor] = useState(null);

  const onDesigChange = (e) => {
    setError({
      ...error,
      DesignationIdChecker: true,
      DesignationErrorStyle: { color: "#000" },
    });

    var designationId = "";
    var designationName = "";
    getdesignationData(e);
    designationId = e.designationId;

    designationName = e.designationName;
    setdesignationId(designationId);
    setdesignationName(designationName);
  };

  const allusergroups = [];
  userGroups.map((usergroups) =>
    allusergroups.push({
      usergroupsId: usergroups._id,
      label: usergroups.userGroupName,
      value: usergroups.userGroupName,
    })
  );

  const [usergroups, getusergroupsData] = useState();
  const [usergroupsId, setusergroupsId] = useState();
  const [userGroupName, setsetusergroupsName] = useState();

  const onUsergroupChange = (e) => {
    setError({
      ...error,
      UserGroupIdChecker: true,
      UserGroupErrorStyle: { color: "#000" },
    });
    var usergroupsId = "";
    var userGroupName = "";
    getusergroupsData(e);
    usergroupsId = e.usergroupsId;

    userGroupName = e.userGroupName;
    setusergroupsId(usergroupsId);
    setsetusergroupsName(userGroupName);
  };

  const [error, setError] = useState({
    DepartmentIdChecker: false,
    DepartmentErrorStyle: {},

    DesignationIdChecker: false,
    DesignationErrorStyle: {},

    UserGroupIdChecker: false,
    UserGroupErrorStyle: {},

    passwordValChecker: false,
    passwordValResult: "",
    passwordValStyle: {},
    passwordInptErrStyle: {},

    repwdValChecker: false,
    repwdValResult: "",
    repwdValStyle: {},
    repwdInptErrStyle: {},
  });

  const {
    DepartmentIdChecker,
    DepartmentErrorStyle,
    DesignationIdChecker,
    DesignationErrorStyle,
    UserGroupIdChecker,
    UserGroupErrorStyle,

    passwordValChecker,
    passwordValResult,
    passwordValStyle,
    passwordInptErrStyle,

    repwdValChecker,
    repwdValResult,
    repwdValStyle,
    repwdInptErrStyle,
  } = error;

  let passwrdTooltip = {
    marginLeft: "-16em",
    position: "absolute",
    marginTop: "1.5em",
    pointerEvents: "none",
    zIndex: "999",
    width: "300px",
  };
  const onInputChange3 = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "password":
        if (value === "") {
          setError({
            ...error,
            passwordValChecker: true,
            passwordValResult: "REQUIRED",
            passwordValStyle: { color: "#FF0000", marginTop: "30px" },
            passwordInptErrStyle: { border: "1px solid #FF0000" },
          });
          setFormData({ ...formData, [e.target.name]: "" });
        } else {
          const pwdFilter = /^(?=.*\d)(?=.*[a-z])/;
          if (pwdFilter.test(value)) {
            setError({
              ...error,
              passwordValChecker: true,
              passwordValResult: "STRONG",
              passwordValStyle: { color: "#43b90f", marginTop: "30px" },
              passwordInptErrStyle: { border: "1px solid #43b90f" },
            });
          } else {
            setError({
              ...error,
              passwordValChecker: true,
              passwordValResult: "WEAK",
              passwordValStyle: { color: "#FF0000", marginTop: "30px" },
              passwordInptErrStyle: { border: "1px solid #FF0000" },
            });
          }
          setFormData({ ...formData, [e.target.name]: value });
        }
        break;

      case "rePassword":
        if (value === "") {
          setError({
            ...error,
            repwdValChecker: true,
            repwdValResult: "REQUIRED",
            repwdValStyle: { color: "#FF0000", marginTop: "30px" },
            repwdInptErrStyle: { border: "1px solid #FF0000" },
          });
          setFormData({ ...formData, [e.target.name]: "" });
        } else {
          if (value === formData.password) {
            setError({
              ...error,
              repwdValChecker: true,
              repwdValResult: "MATCHED",
              repwdValStyle: { color: "#43b90f", marginTop: "30px" },
              repwdInptErrStyle: { border: "1px solid #43b90f" },
            });
          } else {
            setError({
              ...error,
              repwdValChecker: true,
              repwdValResult: "DOES NOT MATCH",
              repwdValStyle: { color: "#FF0000", marginTop: "30px" },
              repwdInptErrStyle: { border: "1px solid #FF0000" },
            });
          }
          setFormData({ ...formData, [e.target.name]: value });
        }
        break;

      default:
        break;
    }
  };

  const checkErrors = (formData) => {
    if (!DepartmentIdChecker) {
      setError({
        ...error,
        DepartmentErrorStyle: { color: "#F00" },
      });
      return false;
    }

    if (!DesignationIdChecker) {
      setError({
        ...error,
        DesignationErrorStyle: { color: "#F00" },
      });
      return false;
    }

    if (!UserGroupIdChecker) {
      setError({
        ...error,
        UserGroupErrorStyle: { color: "#F00" },
      });
      return false;
    }

    if (formData && formData.password === "") {
      setError({
        ...error,
        passwordValChecker: true,
        passwordValResult: "REQUIRED",
        passwordValStyle: { color: "#FF0000", marginTop: "30px" },
        passwordInptErrStyle: { border: "1px solid #FF0000" },
      });
      return false;
    }
    if (formData && formData.rePassword !== formData.password) {
      setError({
        ...error,
        repwdValChecker: true,
        repwdValResult: "DOESNOT MATCH",
        // repwdValResult: "REQUIRED",
        repwdValStyle: { color: "#FF0000", marginTop: "30px" },
        repwdInptErrStyle: { border: "1px solid #FF0000" },
      });
      return false;
    }

    if (formData && formData.rePassword === "") {
      setError({
        ...error,
        repwdValChecker: true,
        repwdValResult: "REQUIRED",
        repwdValStyle: { color: "#FF0000", marginTop: "30px" },
        repwdInptErrStyle: { border: "1px solid #FF0000" },
      });
      return false;
    }

    return true;
  };
  // console.log(designationId);
  const onSubmit = (e) => {
    e.preventDefault();
    if (checkErrors()) {
      const finalData = {
        empFullName: empFullName,
        empPhone: employeePhone,
        empAadharNo: employeeAadharNo,
        empPanNo: employeePanNo,
        empDOB: employeeDOBDate,
        empEmail: employeeEmail,
        empJoiningDate: employeeDOJDate,
        departmentId: departmentId,
        departmentName: department.value,
        designationId: designationId,
        designationName: designation.value,
        empCode: currentEmpCode,
        empAddress: employeeAddr,
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
        empColorCode: color,
        empDesignationDate: employeeDesigDate,
        empPFDate: employeePfDate,
        cityallowance: cityallowance,
        Others: Others,
        proinc: proinc,
        password: password,
        userName: userName,
        empCA: empCA,
        usergroupsId: usergroupsId,
        userGroupName: usergroups.value,
        profilephoto: profilephoto,
        empEnteredById: user._id,
      };
      // console.log(finalData);
      AddEmployee(finalData);
      setFormData({
        ...formData,
        isSubmitted: true,
      });
    }
  };
  // console.log(lastEnteredEmpCode[0].empCode);
  let lastEnteredCodeData = JSON.parse(localStorage.getItem("lastEnteredCode"));
  console.log(lastEnteredCodeData);

  const [memberCounter, setMemberCounter] = useState("01");
  // const str = memberCounter.toString();

  const [empCode, setempCode] = useState();
  if (
    lastEnteredCodeData &&
    lastEnteredCodeData[0] &&
    lastEnteredCodeData[0]._id &&
    !empCode
  ) {
    setempCode(lastEnteredCodeData && lastEnteredCodeData[0].empCode);
  }
  if (
    lastEnteredCodeData &&
    lastEnteredCodeData[0] &&
    lastEnteredCodeData[0]._id &&
    empCode
  ) {
    var name = empCode;
    var new_str = name.substr(-2);
    var NewCode = Number(new_str) + 1;
    var str = name.slice(0, -2);

    if (NewCode > 99) {
      new_str = name.substr(-3);
      str = name.slice(0, -3);
      // console.log("new_str", new_str);
    }
    if (NewCode > 999) {
      new_str = name.substr(-4);
      str = name.slice(0, -4);
    }
  }
  const currentEmpCode = str + NewCode;

  // console.log(currentEmpCode);

  if (isSubmitted) {
    return <Redirect to="/all-staff" />;
  }
  // code for next previous tabing ends
  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <div className="row col-lg-12 col-md-11 col-sm-12 col-12">
          <div className=" col-lg-10 col-md-11 col-sm-12 col-12">
            <h2 className="heading_color">Add Employee Details </h2>
          </div>
          <div className="col-lg-2 col-md-11 col-sm-12 col-12 py-2">
            <Link className="btn btn_green_bg float-right" to="/all-staff">
              Back
            </Link>
          </div>
        </div>
        {/* <hr /> */}
        <section className="sub_reg">
          <Tabs selectedIndex={tabIndex}>
            <div className="row col-lg-12 col-md-11 col-sm-12 col-12">
              <TabList>
                <Tab tabfor="0">Staff Info</Tab>
                <Tab tabfor="1">Area Info</Tab>

                <Tab tabfor="2">Salary Info</Tab>
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
                        <label className="label-control">
                          Employee Name* :
                        </label>
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
                        <label className="label-control">
                          Employee Phone :
                        </label>
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
                        <label className="label-control">
                          Adhaar Card No :
                        </label>
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
                          name="employeeDOBDate"
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
                          name="employeeDOJDate"
                          value={employeeDOJDate}
                          onChange={(e) => onDateChange(e)}
                          style={{
                            width: "75%",
                          }}
                          required
                        />
                      </div>

                      <div className="col-lg-3 col-md-12 col-sm-12 col-12 ">
                        <label
                          className="label-control"
                          style={DepartmentErrorStyle}
                        >
                          Department* :
                        </label>
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
                        <label
                          className="label-control"
                          style={UserGroupErrorStyle}
                        >
                          Employee Group* :
                        </label>
                        <Select
                          name="userGroupName"
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
                        <label
                          className="label-control"
                          style={DesignationErrorStyle}
                        >
                          Designation* :
                        </label>

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
                          name="employeeDesigDate"
                          value={employeeDesigDate}
                          onChange={(e) => onDateChange2(e)}
                          style={{
                            width: "75%",
                          }}
                          required
                        />
                      </div>
                      <div className="col-lg-3 col-md-12 col-sm-12 col-12 ">
                        <label className="label-control">
                          Employee color :
                        </label>
                        <br />
                        <input
                          className="form-control"
                          type="color"
                          value={color}
                          onChange={(e) => setColor(e.target.value)}
                        />
                      </div>
                      <div className=" col-lg-12 col-md-12 col-sm-12 col-12 py-3">
                        <label className="label-control">Profile Photo:</label>

                        <div className="row col-lg-12 col-md-12 col-sm-12 col-12">
                          <FileBase64
                            type="file"
                            multiple={false}
                            onDone={({ base64 }) =>
                              setFormData({
                                ...formData,
                                profilephoto: base64,
                              })
                            }
                          />

                          <img
                            className="log_size"
                            alt="Preview"
                            src={`${profilephoto}`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row col-lg-11 col-md-11 col-sm-12 col-12">
                    <div className="col-lg-3 col-md-12 col-sm-12 col-12 ">
                      <label className="label-control">UserName* :</label>
                      <input
                        type="text"
                        name="userName"
                        value={userName}
                        className="form-control"
                        onChange={(e) => onInputChange(e)}
                        autoComplete="false"
                        required
                      />
                    </div>
                    <div className=" col-lg-3 col-md-9 col-sm-9 col-12 py-4">
                      <label> Password* :</label>
                      <div className="">
                        <input
                          type="password"
                          name="password"
                          className="form-control "
                          value={password}
                          style={passwordInptErrStyle}
                          onChange={(e) => onInputChange3(e)}
                          autoComplete="false"
                          required
                        />
                        {passwordValChecker && (
                          <span
                            className="form-input-info positioning"
                            style={passwordValStyle}
                          >
                            {passwordValResult}
                          </span>
                        )}
                        <div
                          className="cstm-hint"
                          id="pass_admin_help"
                          //   style={{ top: "100px" }}
                        >
                          <img
                            src={require("../../static/images/help1.png")}
                            alt="help"
                            id="img_tool_admin"
                            className="pass_admin_help_icon_question"
                          />
                          <div
                            id="tooltipPassAdmin"
                            className="syle-hint"
                            style={passwrdTooltip}
                            data-hint="Password  at least 1 uppercase and 1 lowercase, 1 digit, 1 symbol, length from 8 to 20"
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-3 col-md-9 col-sm-9 col-12 py-4">
                      <label className="">Confirm Password* :</label>

                      <div>
                        <input
                          type="password"
                          name="rePassword"
                          className="form-control "
                          value={rePassword}
                          style={repwdInptErrStyle}
                          onChange={(e) => onInputChange3(e)}
                          autoComplete="false"
                          required
                        />
                        {repwdValChecker && (
                          <Fragment>
                            <span
                              className="form-input-info positioning"
                              style={repwdValStyle}
                            >
                              {repwdValResult}
                            </span>
                          </Fragment>
                        )}
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
            <TabPanel tabId="1">
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
                          value={currentEmpCode}
                          className="form-control"
                          onChange={(e) => onInputChange(e)}
                          disabled
                        />
                      </div>
                      <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                        <label className="label-control">Address :</label>
                        <textarea
                          name="employeeAddr"
                          id="employeeAddr"
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
                          type="number"
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
            <TabPanel tabId="2">
              <div className="row col-md-12 col-lg-12 col-sm-12 col-12 ">
                <div className=" col-lg-12 col-md-11 col-sm-12 col-12">
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
                        type="number"
                        name="employeeESI"
                        value={employeeESI}
                        className="form-control"
                        onChange={(e) => onInputChange(e)}
                      />
                    </div>
                    <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                      <label className="label-control">UAN No :</label>
                      <input
                        type="number"
                        name="employeeUANNo"
                        value={employeeUANNo}
                        className="form-control"
                        onChange={(e) => onInputChange(e)}
                      />
                    </div>
                    <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                      <label className="label-control">Basic :</label>
                      <input
                        type="number"
                        name="employeeBasic"
                        value={employeeBasic}
                        className="form-control"
                        onChange={(e) => onInputChange(e)}
                      />
                    </div>
                    <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                      <label className="label-control">HRA :</label>
                      <input
                        type="number"
                        name="employeeHRA"
                        value={employeeHRA}
                        className="form-control"
                        onChange={(e) => onInputChange(e)}
                      />
                    </div>
                    <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                      <label className="label-control">DA :</label>
                      <input
                        type="number"
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
                    <div className="col-lg-8 col-md-6 col-sm-12 col-12">
                      <label className="label-control colorRed">
                        * Indicates mandatory fields, Please fill mandatory
                        fields before Submit
                      </label>
                    </div>
                  </form>
                </div>
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
  settings: PropTypes.object.isRequired,
  getALLDepartment: PropTypes.object.isRequired,
  getActiveDesignation: PropTypes.object.isRequired,
  AddEmployee: PropTypes.func.isRequired,
  getALLUserGroups: PropTypes.func.isRequired,
  getLastEnteredEmpCode: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  settings: state.settings,
});

export default connect(mapStateToProps, {
  getALLDepartment,
  AddEmployee,
  getActiveDesignation,
  getALLUserGroups,
  getLastEnteredEmpCode,
})(AddEmployeeDetails);
