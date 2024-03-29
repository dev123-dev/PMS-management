import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Spinner from "../layout/Spinner";
import { editEmployeeDetails } from "../../actions/user";
import FileBase64 from "react-file-base64";
const EditEmployeeDetails = ({
  auth: { isAuthenticated, user, users },
  settings: { allDepartment, activeDesignation },
  onEditModalChange,
  allEmployeedata,
  editEmployeeDetails,
}) => {
  const ctAcessOpt = [
    { value: "None", label: "None" },
    { value: "All", label: "All" },
    { value: "Individual", label: "Individual" },
  ];
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
    userName:
      allEmployeedata && allEmployeedata.userName
        ? allEmployeedata.userName
        : "",
    password:
      allEmployeedata && allEmployeedata.password
        ? allEmployeedata.password
        : "",
    profilephoto:
      allEmployeedata && allEmployeedata.profilephoto
        ? allEmployeedata.profilephoto
        : "",
    empCtAccess:
      allEmployeedata && allEmployeedata.empCtAccess
        ? {
            value: allEmployeedata.empCtAccess,
            label: allEmployeedata.empCtAccess,
          }
        : "",

    isSubmitted: false,
  });

  const {
    empFullName,
    employeePhone,
    employeeAadharNo,
    employeePanNo,
    empCtAccess,
    employeeEmail,
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
    profilephoto,
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
  const onctAcesstypeChange = (e) => {
    if (e) {
      setFormData({
        ...formData,
        empCtAccess: e,
      });
    }
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

  const [department, getdepartmentData] = useState("");
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
  const [departmentId, setdepartmentId] = useState("");
  // base64String = "data:image/jpeg;base64......";
  const [photoSizeAlert, setPhotoSizeAlert] = useState(false);
  const [photoSize, setPhotoSize] = useState(false);

  const checksize = (base64) => {
    var stringLength = base64.length - "data:image/png;base64,".length;
    var sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812;
    var sizeInKb = sizeInBytes / 1000;

    setPhotoSize(sizeInKb.toFixed(2) + "KB");
    if (sizeInKb >= 70) {
      setPhotoSizeAlert(true);
    } else {
      setPhotoSizeAlert(false);
    }
  };

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
  const [designationId, setdesignationId] = useState("");
  const [designationName, setdesignationName] = useState("");

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

  const allusergroups = [];
  allUserGroupData &&
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

  const [usergroupsId, setusergroupsId] = useState("");
  const [userGroupName, setsetusergroupsName] = useState("");

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
      empFullName: empFullName?.trim(),
      empPhone: employeePhone,
      empAadharNo: employeeAadharNo,
      empPanNo: employeePanNo,
      empDOB: employeeDOBDate,
      empEmail: employeeEmail?.trim(),
      empJoiningDate: employeeDOJDate,
      departmentId: department.departmentId,
      departmentName: department.value,
      designationId: designation.designationId,
      designationName: designation.value,

      empAddress: empAddress?.trim(),
      empState: employeeState?.trim(),
      empPincode: employeePincode,
      empBankName: employeeBankName?.trim(),
      empIFSCCode: employeeIFSCcode,
      empAccountNo: employeeAccountNo,
      empBankBranch: employeeBranch?.trim(),
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
      profilephoto: profilephoto,
      empCtAccess: empCtAccess.value,
      allEmployeedata: allEmployeedata,
    };

    editEmployeeDetails(finalData);
    onEditModalChange(true);
    // setFormData({
    //   ...formData,
    //   districtName: "",
    //   isSubmitted: true,
    // });
    // }
  };
  const removeImage = () => {
    setFormData({
      ...formData,
      profilephoto: "",
    });
    setPhotoSizeAlert(false);
    setPhotoSize("");
  };
  // code for next previous tabing ends
  return !isAuthenticated || !user  ? (
    <Spinner />
  ) : (
    <Fragment>
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
                      <label>Employee Name* :</label>
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
                      <label>Employee Phone :</label>
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
                      <label>Adhaar Card No :</label>
                      <input
                        type="text"
                        name="employeeAadharNo"
                        value={employeeAadharNo}
                        className="form-control"
                        onChange={(e) => onInputChange(e)}
                      />
                    </div>
                    <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                      <label>Pan Card No :</label>
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
                    <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                      <label className="label-control">CT Access :</label>
                      <Select
                        name="empCtAccess"
                        options={ctAcessOpt}
                        isSearchable={false}
                        value={empCtAccess}
                        placeholder="Select Access Type"
                        onChange={(e) => onctAcesstypeChange(e)}
                      />
                    </div>
                    <div className=" col-lg-12 col-md-12 col-sm-12 col-12 py-3">
                      <label className="label-control">Profile Photo:</label>

                      <div className="row col-lg-12 col-md-12 col-sm-12 col-12">
                        <FileBase64
                          type="file"
                          multiple={false}
                          accept="image/*,capture=camera"
                          capture="”camera"
                          onDone={({ base64 }) => {
                            setFormData({
                              ...formData,
                              profilephoto: base64,
                            });
                            checksize(base64);
                          }}
                          // onDone={(base64) => checksize(base64)}
                        />

                        {/* <input
                          accept="image/*,capture=camera"
                          capture="”camera"
                          type="file"
                          onDone={({ base64 }) =>
                            setFormData({
                              ...formData,
                              profilephoto: base64,
                            })
                          }
                          onChange={(event) => handleCompressedUpload(event)}
                        /> */}

                        <img
                          className="photo_size"
                          alt="Preview"
                          src={`${profilephoto}`}
                        />
                        {photoSize ? photoSize : ""}
                      </div>
                      {profilephoto ? (
                        <button
                          className="btn btn_green_bg"
                          onClick={() => removeImage()}
                        >
                          Remove
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-lg-12 col-sm-12 col-12 text-left">
                  {photoSizeAlert ? (
                    <span className="float-right" style={{ color: "red" }}>
                      {photoSizeAlert
                        ? "Images size should be less than 70KB"
                        : ""}
                    </span>
                  ) : (
                    <input
                      type="submit"
                      name="submit"
                      value="Next"
                      className="btn sub_form btn_continue Save float-right"
                    />
                  )}
                </div>
              </form>
            </div>
          </TabPanel>
          <TabPanel tabId="2">
            <form onSubmit={(e) => NextBackBtn(2)}>
              <div className="row col-md-12 col-lg-12 col-sm-12 col-12 ">
                <div className=" col-lg-12 col-md-11 col-sm-12 col-12">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <h5>Area Info</h5>
                  </div>
                  <div className="row col-lg-12 col-md-11 col-sm-12 col-12">
                    <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                      <label>Employee Code :</label>
                      <input
                        type="text"
                        name="employeeCode"
                        value={employeeCode}
                        className="form-control"
                        onChange={(e) => onInputChange(e)}
                        disabled
                      />
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                      <label>Address : </label>
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

          <TabPanel tabId="3">
            <div className="row col-md-12 col-lg-12 col-sm-12 col-12 ">
              <div className=" col-lg-12 col-md-11 col-sm-12 col-12">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <h5>Bank Info</h5>
                </div>
                <div className="row col-lg-12 col-md-11 col-sm-12 col-12">
                  <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                    <label>Bank Name :</label>
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
                    <label>IFSC Code :</label>
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
                    <label>Account no :</label>
                    <input
                      type="text"
                      name="employeeAccountNo"
                      value={employeeAccountNo}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>
                  <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                    <label>Branch :</label>
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
                    <input
                      type="submit"
                      name="submit"
                      value="Update"
                      className="btn sub_form btn_continue Save float-right"
                    />

                    <button
                      className="btn sub_form btn_continue Save float-right"
                      onClick={() => NextBackBtn(1)}
                    >
                      Previous
                    </button>
                  </div>
                </form>
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
    </Fragment>
  );
};

EditEmployeeDetails.propTypes = {
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  settings: state.settings,
});

export default connect(mapStateToProps, {
  editEmployeeDetails,
})(EditEmployeeDetails);
