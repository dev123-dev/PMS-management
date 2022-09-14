import React, { useState, Fragment, useEffect } from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import Select from "react-select";
import {
  getAllEmployee,
  getAllStaff,
  getFilterEmpDetails,
  getALLLeaves,
  getLeavesStaff,
} from "../../actions/user";
import AddLeave from "./AddLeave";
import EditLeave from "./EditLeave";
import DeactiveLeave from "./DeactiveLeave";
// import EditEmployeeDetails from "./EditEmployeeDetails";
// import DeactiveEmployee from "./DeactiveEmployee";
// import EditPassword from "./EditPassword";
const AllLeave = ({
  auth: { allUser, isAuthenticated, user, users },
  settings: { allStaffName },
  user: { allEmployee, leaves, staffLeaves },
  getAllEmployee,
  getFilterEmpDetails,
  getAllStaff,
  getALLLeaves,
  getLeavesStaff,
}) => {
  useEffect(() => {
    getAllEmployee();
  }, [getAllEmployee]);
  useEffect(() => {
    getAllStaff();
  }, [getAllStaff]);
  useEffect(() => {
    getFilterEmpDetails();
  }, [getFilterEmpDetails]);
  useEffect(() => {
    getALLLeaves();
  }, [getALLLeaves]);
  useEffect(() => {
    getLeavesStaff();
  }, [getLeavesStaff]);

  const [showEditModal, setShowEditModal] = useState(false);
  const handleEditModalClose = () => setShowEditModal(false);

  const onEditModalChange = (e) => {
    if (e) {
      handleEditModalClose();
    }
  };

  const [userDatas, setUserDatas] = useState(null);
  const onUpdate = (leaves, idx) => {
    setShowEditModal(true);
    setUserDatas(leaves);
  };

  const [showDeactiveModal, setShowDeactiveModal] = useState(false);
  const handleDeactiveModalClose = () => setShowDeactiveModal(false);

  const onDeactiveModalChange = (e) => {
    if (e) {
      handleDeactiveModalClose();
    }
  };
  const [userLeavedeactive, setUserDatadeactive] = useState(null);
  const onDeactive = (leaves, idx) => {
    setShowDeactiveModal(true);
    setUserDatadeactive(leaves);
  };

  //changepwd

  // const [showChangePwdModal, setShowChangePwdModal] = useState(false);
  // const handleChangePwdModalClose = () => setShowChangePwdModal(false);
  // const onChangePwdModalChange = (e) => {
  //   if (e) {
  //     handleChangePwdModalClose();
  //   }
  // };
  // const [userDataChangePwd, setUserDataChangePwd] = useState(null);
  // const onChangePwd = (allEmployee, idx) => {
  //   setShowChangePwdModal(true);
  //   setUserDataChangePwd(allEmployee);
  // };
  const [staffData, setstaffData] = useState("");

  const onClickReset = () => {
    getFilterEmpDetails("");
    setstaffData("");

    getALLLeaves("");
    setFormData({
      Dateselectmode: DateMethods[0],
    });
    getLeavesStaff("");
    setSelDateDataVal("");
    setsingledate(new Date().toISOString().split("T")[0]);
    setSelectedDate(new Date().toISOString().split("T")[0]);
    setShowHide({
      ...showHide,
      showdateSection: false,
      showdateSection1: true,
    });
  };

  const [showAllDistrictModal, setShowAddDistrictModal] = useState(false);
  const handleAddDistrictModalClose = () => setShowAddDistrictModal(false);
  const onClickHandler = () => {
    setShowAddDistrictModal(true);
  };
  const onAddLeaveModalChange = (e) => {
    if (e) {
      handleAddDistrictModalClose();
    }
  };

  const DateMethods = [
    { value: "Single Date", label: "Single Date" },
    { value: "Multi Date", label: "Multi Date" },
  ];
  const [formData, setFormData] = useState({
    radioselect: "",
    Dateselectmode: DateMethods[0],
    isSubmitted: false,
  });
  const { Dateselectmode } = formData;
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [singledate, setsingledate] = useState(
    new Date().toISOString().split("T")[0]
  );
  //
  const [selDateDataVal, setSelDateDataVal] = useState();
  const onDateChange2 = (e) => {
    setstaffData("");
    setsingledate(e.target.value);
  };
  const [todate, settodate] = useState("");
  const onDateChange1 = (e) => {
    settodate(e.target.value);
  };
  const onSearchmultidate = (e) => {
    let selDateData = {
      fromdate: fromdate,
      todate: todate,
      dateType: "Multi Date",
    };
    setSelDateDataVal(selDateData);
    getALLLeaves(selDateData);
    getLeavesStaff(selDateData);
  };

  const [fromdate, setfromdate] = useState("");
  const onDateChange = (e) => {
    setfromdate(e.target.value);
  };

  const activeStaffsOpt = [];
  allStaffName &&
    staffLeaves.map((staffsData) =>
      activeStaffsOpt.push({
        label: staffsData.empFullName,
        value: staffsData._id,
      })
    );
  const onStaffChange = (e) => {
    setstaffData(e);
    const finalData = {
      selDate: singledate,
      fromdate: fromdate,
      todate: todate,
      dateType: Dateselectmode.value ? Dateselectmode.value : "Single Date",
      empId: e.value,
    };
    getFilterEmpDetails(finalData);

    getALLLeaves(finalData);
  };

  const onSearch = (e) => {
    let selDateData = {
      selDate: singledate,
      dateType: "Single Date",
    };
    setSelDateDataVal(selDateData);
    getALLLeaves(selDateData);
    getLeavesStaff(selDateData);
  };

  const [showHide, setShowHide] = useState({
    showdateSection: false,
    showdateSection1: true,
  });
  const { showdateSection, showdateSection1 } = showHide;
  const onDateModeChange = (e) => {
    setstaffData("");
    setsingledate(new Date().toISOString().split("T")[0]);
    setSelectedDate(new Date().toISOString().split("T")[0]);
    if (e) {
      setFormData({
        ...formData,
        Dateselectmode: e,
      });
    }
    if (e.value === "Multi Date") {
      setShowHide({
        ...showHide,
        showdateSection: true,
        showdateSection1: false,
      });
    } else {
      setShowHide({
        ...showHide,
        showdateSection: false,
        showdateSection1: true,
      });
    }
  };
  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className="col-lg-2 col-md-11 col-sm-10 col-10">
              <h5 className="heading_color">Leave Management</h5>
            </div>

            <div className="row col-lg-6 col-md-6 col-sm-12 col-12 no_padding">
              <div className="col-lg-3 col-md-4 col-sm-4 col-12 py-2">
                {/* SLAP UserGroupRights */}

                {(user.userGroupName &&
                  user.userGroupName === "Administrator") ||
                user.userGroupName === "Super Admin" ||
                user.userGroupName === "Clarical Admins" ? (
                  <>
                    <Select
                      name="Dateselectmode"
                      options={DateMethods}
                      isSearchable={true}
                      // defaultValue={DateMethods[0]}
                      value={Dateselectmode}
                      placeholder="Select"
                      onChange={(e) => onDateModeChange(e)}
                    />
                  </>
                ) : (
                  <></>
                )}
              </div>
              {showdateSection && (
                <>
                  <div className="col-lg-2 col-md-11 col-sm-10 col-10 py-2">
                    <input
                      type="date"
                      placeholder="dd/mm/yyyy"
                      className="form-control cpp-input datevalidation"
                      name="fromdate"
                      value={fromdate}
                      onChange={(e) => onDateChange(e)}
                      style={{
                        width: "110%",
                      }}
                      required
                    />
                  </div>
                  <div className=" col-lg-2 col-md-11 col-sm-10 col-10 py-2">
                    <input
                      type="date"
                      placeholder="dd/mm/yyyy"
                      className="form-control cpp-input datevalidation"
                      name="todate"
                      value={todate}
                      onChange={(e) => onDateChange1(e)}
                      style={{
                        width: "110%",
                      }}
                      required
                    />
                  </div>
                  <div className="col-lg-1 col-md-11 col-sm-10 col-10 py-3">
                    <img
                      className="img_icon_size log"
                      onClick={() => onSearchmultidate()}
                      src={require("../../static/images/Search_Icon.png")}
                      alt="Search_Icon"
                      title="Search_Icon"
                    />
                  </div>
                </>
              )}
              {showdateSection1 && (
                <>
                  <div className=" col-lg-3 col-md-11 col-sm-10 col-10 py-2">
                    <input
                      type="date"
                      placeholder="dd/mm/yyyy"
                      className="form-control cpp-input datevalidation"
                      name="singledate"
                      value={singledate}
                      onChange={(e) => onDateChange2(e)}
                      style={{
                        width: "100%",
                      }}
                      required
                    />
                  </div>
                  <div className="col-lg-1 col-md-11 col-sm-10 col-10 py-3">
                    <img
                      className="img_icon_size log"
                      onClick={() => onSearch()}
                      src={require("../../static/images/Search_Icon.png")}
                      alt="Search_Icon"
                      title="Search_Icon"
                    />
                  </div>
                </>
              )}
              <div className="col-lg-3 col-md-11 col-sm-10 col-10 py-2">
                <Select
                  name="staffData"
                  isSearchable={true}
                  value={staffData}
                  options={activeStaffsOpt}
                  placeholder="Select Staff"
                  onChange={(e) => onStaffChange(e)}
                />
              </div>
            </div>

            <div className="col-lg-4 col-md-11 col-sm-12 col-11 py-3">
              <button
                className="btn btn_green_bg float-right"
                onClick={() => onClickReset()}
              >
                Refresh
              </button>
              {(user.userGroupName && user.userGroupName === "Administrator") ||
              user.userGroupName === "Super Admin" ||
              user.userGroupName === "Clarical Admins" ? (
                <Link
                  className="btn btn_green_bg float-right"
                  to="#"
                  onClick={() => onClickHandler()}
                >
                  Add Leave
                </Link>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12 text-center">
              <section className="body">
                <div className=" body-inner no-padding table-responsive fixTableHead">
                  <table
                    className="table table-bordered table-striped table-hover"
                    id="datatable2"
                  >
                    <thead>
                      <tr>
                        <th>Sl No.</th>
                        <th>Staff Name</th>
                        <th>Leave Category</th>
                        {user.departmentName &&
                        user.departmentName !== "Imaging" ? (
                          <th>Reason</th>
                        ) : (
                          <></>
                        )}
                        <th>Leave Type</th>
                        <th>Date</th>
                        <th>Department</th>
                        {(user.userGroupName &&
                          user.userGroupName === "Administrator") ||
                        user.userGroupName === "Super Admin" ||
                        user.userGroupName === "Clarical Admins" ? (
                          <th>OP</th>
                        ) : (
                          <></>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {leaves &&
                        leaves.map((leaves, idx) => {
                          var leaveDate = "";
                          if (leaves.leaveDate) {
                            var ED = leaves.leaveDate.split(/\D/g);
                            leaveDate = [ED[2], ED[1], ED[0]].join("-");
                          }
                          return (
                            <tr key={idx}>
                              <td>{idx + 1}</td>
                              <td>{leaves.output.empFullName}</td>
                              <td>{leaves.leavecategoryName}</td>
                              {user.departmentName &&
                              user.departmentName !== "Imaging" ? (
                                <td>{leaves.leaveReason}</td>
                              ) : (
                                <></>
                              )}
                              <td>{leaves.leaveType}</td>

                              <td>{leaveDate}</td>
                              <td>{leaves.output.departmentName}</td>
                              {(user.userGroupName &&
                                user.userGroupName === "Administrator") ||
                              user.userGroupName === "Super Admin" ||
                              user.userGroupName === "Clarical Admins" ? (
                                <td>
                                  <img
                                    className="img_icon_size log"
                                    onClick={() => onUpdate(leaves, idx)}
                                    src={require("../../static/images/edit_icon.png")}
                                    alt="Edit"
                                    title="Edit"
                                  />
                                  &emsp;
                                  <img
                                    className="img_icon_size log"
                                    onClick={() => onDeactive(leaves, idx)}
                                    src={require("../../static/images/delete.png")}
                                    alt="Deactivate"
                                    title="Deactivate"
                                  />
                                </td>
                              ) : (
                                <></>
                              )}
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>

          <div className="row col-md-12 col-lg-12 col-sm-12 col-12  ">
            <div className="col-lg-10 col-md-6 col-sm-6 col-12"></div>
            <div className="col-lg-2 col-md-6 col-sm-6 col-12 align_right">
              <strong>Absenties:{leaves.length}</strong>
            </div>
          </div>
        </section>

        <Modal
          show={showAllDistrictModal}
          backdrop="static"
          keyboard={false}
          size="xl"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <div className="col-lg-10">
              <h3 className="modal-title text-center">Add Leave Details</h3>
            </div>
            <div className="col-lg-1">
              <button onClick={handleAddDistrictModalClose} className="close">
                <img
                  src={require("../../static/images/close.png")}
                  alt="X"
                  style={{ height: "20px", width: "20px" }}
                />
              </button>
            </div>
          </Modal.Header>
          <Modal.Body>
            <AddLeave onAddLeaveModalChange={onAddLeaveModalChange} />
          </Modal.Body>
        </Modal>
        <Modal
          show={showEditModal}
          backdrop="static"
          keyboard={false}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <div className="col-lg-10 col-md-10 col-sm-10 col-10">
              <h3 className="modal-title text-center">Edit Leave Details</h3>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-2 col-2">
              <button onClick={handleEditModalClose} className="close">
                <img
                  src={require("../../static/images/close.png")}
                  alt="X"
                  style={{ height: "20px", width: "20px" }}
                />
              </button>
            </div>
          </Modal.Header>
          <Modal.Body>
            <EditLeave
              onEditModalChange={onEditModalChange}
              allLeavedata={userDatas}
            />
          </Modal.Body>
        </Modal>

        <Modal
          show={showDeactiveModal}
          backdrop="static"
          keyboard={false}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <div className="col-lg-10">
              <h3 className="modal-title text-center">Deactivate Leave</h3>
            </div>
            <div className="col-lg-1">
              <button onClick={handleDeactiveModalClose} className="close">
                <img
                  src={require("../../static/images/close.png")}
                  alt="X"
                  style={{ height: "20px", width: "20px" }}
                />
              </button>
            </div>
          </Modal.Header>
          <Modal.Body>
            <DeactiveLeave
              onDeactiveModalChange={onDeactiveModalChange}
              LeaveDeactiveData={userLeavedeactive}
            />
          </Modal.Body>
        </Modal>
      </div>
    </Fragment>
  );
};

AllLeave.propTypes = {
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  getAllEmployee: PropTypes.func.isRequired,
  getFilterEmpDetails: PropTypes.func.isRequired,
  getALLLeaves: PropTypes.func.isRequired,
  getLeavesStaff: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  settings: state.settings,
});

export default connect(mapStateToProps, {
  getAllEmployee,
  getAllStaff,
  getFilterEmpDetails,
  getALLLeaves,
  getLeavesStaff,
})(AllLeave);
