import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import {
  getSctEmpLeadAssignedDetails,
  SctTransferLeads,
} from "../../actions/sct";
import { getSctMarketingEmployee } from "../../actions/user";
import Select from "react-select";

const TransferSctLeads = ({
  auth: { isAuthenticated, user, users },
  user: { marketingEmployees },
  sct: { allSctEmpAssignedLeadData },
  getSctEmpLeadAssignedDetails,
  SctTransferLeads,
  getSctMarketingEmployee,
}) => {
  useEffect(() => {
    getSctMarketingEmployee();
  }, [getSctMarketingEmployee]);
  useEffect(() => {
    getSctEmpLeadAssignedDetails();
  }, [getSctEmpLeadAssignedDetails]);

  useEffect(() => {
    getSctMarketingEmployee();
  }, [getSctMarketingEmployee]);
  //formData

  const [formData, setFormData] = useState({
    isSubmitted: false,
  });

  const { isSubmitted } = formData;

  const [error, setError] = useState({
    InchargeIdChecker: false,
    InchargeIdErrorStyle: {},
  });
  const { InchargeIdChecker, InchargeIdErrorStyle } = error;

  const checkErrors = () => {
    if (!InchargeIdChecker) {
      setError({
        ...error,
        InchargeIdErrorStyle: { color: "#F00" },
      });
      return false;
    }

    return true;
  };

  const [error1, setError1] = useState({
    TransferToIdChecker: false,
    TransferToErrorStyle: {},
  });
  const { TransferToIdChecker, TransferToErrorStyle } = error1;

  const checkTransferErrors = () => {
    if (!TransferToIdChecker) {
      setError1({
        ...error1,
        TransferToErrorStyle: { color: "#F00" },
      });
      return false;
    }

    return true;
  };

  const allemp = [];
  marketingEmployees.map((emp) =>
    allemp.push({
      empId: emp._id,
      label: emp.empFullName,
      value: emp.empFullName,
    })
  );

  const [emp, getempData] = useState();
  const [empName, setempName] = useState();
  const [empId, setempID] = useState();
  const onempChange = (e) => {
    AddTransferDetails([]);
    setError({
      ...error,
      InchargeIdChecker: true,
      InchargeIdErrorStyle: { color: "#000" },
    });
    getempData(e);
    setempID(e.empId);

    var empId = "";

    var empName = "";
    empId = e.empId;
    empName = e.value;
    setempID(empId);
    setempName(empName);

    const finalData = {
      sctLeadAssignedToId: empId,
      empFullName: empName,
    };

    getSctEmpLeadAssignedDetails(finalData);
  };

  let allemp1 = [];
  marketingEmployees.map((emp1) =>
    allemp1.push({
      empId1: emp1._id,
      label: emp1.empFullName,
      value: emp1.empFullName,
    })
  );

  allemp1 = allemp1.filter((allemp1) => allemp1.empId1 !== empId);

  const [emp1, getempData1] = useState();
  const [empName1, setempName1] = useState();
  const [empId1, setempID1] = useState();
  const onempChange1 = (e) => {
    setError1({
      ...error1,
      TransferToIdChecker: true,
      TransferToErrorStyle: { color: "#000" },
    });
    getempData1(e);
    setempID1(e.empId1);

    var empId1 = "";
    var empName1 = "";
    empId1 = e.empId1;
    empName1 = e.value;
    setempID1(empId1);
    setempName1(empName1);

    const finalData = {
      sctLeadAssignedToId: empId1,
      empFullName: empName1,
    };
  };

  //sttrt
  const [addDataTransfer, setTransferFormDatas] = useState({
    transfercheckedId: "",
    // accessName: "",
    isChecked: 1,
  });

  const { transfercheckedId, isChecked } = addDataTransfer;

  const [AddedTransferDetails, AddTransferDetails] = useState([]);

  const onAccesscheckSelect = (e, allSctEmpAssignedLeadData) => {
    if (e.target.checked) {
      const addDataTransfer = {
        transfercheckedId: allSctEmpAssignedLeadData._id,
        accessStatus: isChecked,
      };
      setTransferFormDatas({
        ...addDataTransfer,
        transfercheckedId: "",
        // accessName: "",
        isChecked: 1,
      });
      let temp = [];
      temp.push(...AddedTransferDetails, addDataTransfer);
      AddTransferDetails(temp);
    } else {
      onRemoveChange(allSctEmpAssignedLeadData);
    }
  };

  const onRemoveChange = (allSctEmpAssignedLeadData) => {
    const removeList = AddedTransferDetails.filter(
      (AddTransferDetails) =>
        AddTransferDetails.transfercheckedId !== allSctEmpAssignedLeadData._id
    );

    AddTransferDetails(removeList);
  };

  const [isSelectAll, setSelectAll] = useState(false);
  const onSelectAll = (e) => {
    e.preventDefault();
    if (checkErrors()) {
      if (!isSelectAll === true) {
        let addedLocal = [];
        allSctEmpAssignedLeadData &&
          allSctEmpAssignedLeadData.map((allSctEmpAssignedLeadData, idx) => {
            const addDataTransfer = {
              transfercheckedId: allSctEmpAssignedLeadData._id,
            };
            let temp = [];
            temp.push(...addedLocal, addDataTransfer);
            addedLocal = temp;
          });
        AddTransferDetails(addedLocal);
      } else {
        AddTransferDetails([]);
      }
      setSelectAll(!isSelectAll);
    }
  };

  const [showAddModal, setShowAddModal] = useState(false);
  const handleAddModalClose = () => setShowAddModal(false);
  const onAddModalChange = (e) => {
    if (e) {
      handleAddModalClose();
    }
  };
  const onTransfer = (e) => {
    e.preventDefault();
    if (checkErrors()) {
      setShowAddModal(true);
      const finalData = {
        access: AddedTransferDetails,
      };

      setTransferFormDatas({
        ...addDataTransfer,
        transfercheckedId: "",
        // accessName: "",
        isChecked: 1,
      });
      SctTransferLeads(finalData);
      setFormData({
        ...formData,

        isSubmitted: true,
      });
    }
  };

  const onSubmitTransfer = (e) => {
    e.preventDefault();
    if (checkTransferErrors()) {
      const finalData = {
        sctLeadAssignedToId: empId,
        empFullName: empName,
        sctLeadTransferToName: empName1,
        sctLeadTransferToId: empId1,
        access: AddedTransferDetails,
        sctLeadTransferById: user._id,
        sctLeadTransferByName: user.empFullName,
        sctLeadTransferDateTime: new Date().toLocaleString("en-GB"),
      };

      setTransferFormDatas({
        ...addDataTransfer,
        transfercheckedId: "",
        // accessName: "",
        isChecked: 1,
      });
      SctTransferLeads(finalData);
      setFormData({
        ...formData,
        isSubmitted: true,
      });
      onAddModalChange(true);
      AddTransferDetails([]);
      getSctEmpLeadAssignedDetails(finalData);
    }
  };

  return !isAuthenticated || !user  ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className=" col-lg-2 col-md-11 col-sm-10 col-10">
              <h5 className="heading_color">Transfer Sct Leads</h5>
            </div>

            <div className="col-lg-10 col-md-11 col-sm-12 col-11 py-3 ">
              <Link
                className="btn btn_green_bg float-right"
                to="/all-sct-leads"
              >
                Back
              </Link>
            </div>
          </div>

          <div className="col-lg-6 col-md-12 col-sm-12 col-12 no_padding">
            <form className="row" onSubmit={(e) => onTransfer(e)}>
              <div className="row col-lg-12 col-md-12 col-sm-6 col-12">
                <div className="col-lg-4 col-md-6 col-sm-6 col-12 no_padding">
                  <label className="label-control" style={InchargeIdErrorStyle}>
                    Leads From* :
                  </label>
                  <Select
                    name="empFullName"
                    options={allemp}
                    isSearchable={true}
                    value={emp}
                    placeholder="Select Emp"
                    onChange={(e) => onempChange(e)}
                  />
                </div>

                <div className="col-md-10 col-lg-6 col-sm-12 col-12 transferTop">
                  <input
                    type="submit"
                    name="Submit"
                    value="Transfer"
                    className="btn sub_form btn_continue blackbrd Save "
                  />
                </div>
              </div>
            </form>
            <form className="row" onSubmit={(e) => onSelectAll(e)}>
              <div className="col-md-10 col-lg-6 col-sm-12 col-12">
                <input
                  type="submit"
                  name="Submit"
                  value="Select All"
                  className="btn sub_form btn_continue blackbrd Save "
                />
              </div>
            </form>
          </div>

          <div className="row py-3">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12 text-center">
              <section className="body">
                <div className=" body-inner no-padding table-responsive ">
                  <table
                    className="table table-bordered table-striped table-hover smll_row"
                    id="datatable2"
                  >
                    <thead>
                      <tr>
                        <th>Sl.No</th>
                        <th></th>
                        <th>Company</th>
                        <th>Website</th>
                        <th>Email</th>
                        <th>Region</th>
                        <th>Contact</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allSctEmpAssignedLeadData &&
                        allSctEmpAssignedLeadData.map(
                          (allSctEmpAssignedLeadData, idx) => {
                            let isChecked = false;
                            AddedTransferDetails &&
                              AddedTransferDetails.map((data) => {
                                if (
                                  data.transfercheckedId ===
                                  allSctEmpAssignedLeadData._id
                                ) {
                                  isChecked = true;
                                }
                                return <></>;
                              });
                            return (
                              <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>
                                  <input
                                    style={{
                                      height: "20px",
                                      width: "20px",
                                      borderRadius: "50%",
                                      display: "block",
                                    }}
                                    name="moduleaccessId"
                                    type="checkbox"
                                    className="moduleaccessclass"
                                    id="moduleaccessId"
                                    checked={isChecked}
                                    onChange={(e) =>
                                      onAccesscheckSelect(
                                        e,
                                        allSctEmpAssignedLeadData
                                      )
                                    }
                                  />
                                </td>
                                <td>
                                  {allSctEmpAssignedLeadData.sctCompanyName}
                                </td>
                                <td>{allSctEmpAssignedLeadData.sctWebsite}</td>
                                <td>{allSctEmpAssignedLeadData.sctEmailId}</td>
                                <td>{allSctEmpAssignedLeadData.countryName}</td>
                                <td>{allSctEmpAssignedLeadData.sctPhone1}</td>
                              </tr>
                            );
                          }
                        )}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>

      <Modal
        show={showAddModal}
        backdrop="static"
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <div className="col-lg-10">
            <h3 className="modal-title text-center">Transfer Lead</h3>
          </div>
          <div className="col-lg-1">
            <button onClick={handleAddModalClose} className="close">
              <img
                src={require("../../static/images/close.png")}
                alt="X"
                style={{ height: "20px", width: "20px" }}
              />
            </button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <form className="row" onSubmit={(e) => onSubmitTransfer(e)}>
            <div className="col-lg-12 col-md-12 col-sm-12 col-12 ">
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <label className="label-control" style={TransferToErrorStyle}>
                  Transfer To* :
                </label>
                <Select
                  name="empFullName1"
                  options={allemp1}
                  isSearchable={true}
                  value={emp1}
                  placeholder="Select Emp"
                  onChange={(e) => onempChange1(e)}
                />
              </div>
              <div className="col-lg-12 col-md-6 col-sm-6 col-12">
                <label className="label-control">
                  Are you sure you want to Transfer{" "}
                  {AddedTransferDetails.length} leads from {empName} to{" "}
                  {empName1} ?
                </label>
              </div>
              <div className="col-lg-12 col-md-6 col-sm-6 col-12">
                <input
                  type="submit"
                  name="Submit"
                  value="Transfer"
                  className="btn sub_form btn_continue blackbrd Save "
                />
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

TransferSctLeads.propTypes = {
  auth: PropTypes.object.isRequired,
  sct: PropTypes.object.isRequired,
  getSctEmpLeadAssignedDetails: PropTypes.func.isRequired,
  SctTransferLeads: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  settings: state.settings,
  client: state.client,
  regions: state.regions,
  sct: state.sct,
});

export default connect(mapStateToProps, {
  getSctEmpLeadAssignedDetails,
  SctTransferLeads,
  getSctMarketingEmployee,
})(TransferSctLeads);
