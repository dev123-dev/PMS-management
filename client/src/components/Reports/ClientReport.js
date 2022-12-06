import React, { useState, Fragment, useEffect } from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import Select from "react-select";
import DatePicker from "react-datepicker";
import {
  getAllEmployee,
  getAllStaff,
  getFilterEmpDetails,
} from "../../actions/user";
import {
  getActiveClientsFilter,
  getActiveStaffFilter,
} from "../../actions/client";
const ClientReport = ({
  auth: { allUser, isAuthenticated, user, users },

  client: { activeClientFilter, activeStaffFilter },

  getActiveClientsFilter,
  getActiveStaffFilter,
  getAllProjectStatus,
}) => {
  useEffect(() => {
    getActiveClientsFilter();
  }, [getActiveClientsFilter]);
  // useEffect(() => {
  //   getActiveStaffFilter();
  // }, [getActiveStaffFilter]);

  const clientTypeVal = [
    { value: "Regular", label: "Regular Client" },
    { value: "Test", label: "Test Client" },
  ];
  const [showEditModal, setShowEditModal] = useState(false);
  const handleEditModalClose = () => setShowEditModal(false);

  const onEditModalChange = (e) => {
    if (e) {
      handleEditModalClose();
    }
  };

  const [userDatas, setUserDatas] = useState(null);
  // const onUpdate = (allEmployee, idx) => {
  //   setShowEditModal(true);
  //   setUserDatas(allEmployee);
  // };

  const [staffData, setstaffData] = useState("");

  const onClickReset = () => {
    getFilterEmpDetails("");
    setstaffData("");
  };

  //formData
  const [formData, setFormData] = useState({
    clientType: "",
    isSubmitted: false,
  });

  const { clientType, isSubmitted } = formData;
  const onClientTypeChange = (e) => {
    if (e) {
      setFormData({
        ...formData,
        clientType: e,
      });
      let clientTypeVal = {
        clientTypeinfo: e.value,
      };
      getActiveClientsFilter(clientTypeVal);
    }
    setClientData("");
    setFolderNameVal("");
  };

  const activeClientsOpt = [];
  activeClientFilter.map((clientsData) =>
    activeClientsOpt.push({
      clientId: clientsData._id,
      belongsToId: clientsData.clientBelongsToId,
      belongsTo: clientsData.clientBelongsToName,
      folderName: clientsData.clientFolderName,
      label: clientsData.clientName,
      value: clientsData.clientName,
    })
  );

  // const projectStatusOpt = [];
  // allProjectStatus.map((projStatusData) =>
  //   projectStatusOpt.push({
  //     projStatusId: projStatusData._id,
  //     label: projStatusData.projectStatusType,
  //     value: projStatusData.projectStatusType,
  //   })
  // );
  const [clientData, setClientData] = useState("");
  const [clientId, setClientId] = useState("");
  // const [clientBelongsTo, setBelongsToVal] = useState("");
  const [clientFolderName, setFolderNameVal] = useState("");
  const onClientChange = (e) => {
    if (e) {
      setFormData({
        ...formData,
        clientId: clientId,
      });
      let clientVal = {
        clientId: e.clientId,
      };
      getActiveStaffFilter(clientVal);
    }
    setClientData(e);
    setClientId(e.clientId);
    // setBelongsToVal(e.belongsTo);

    setFolderNameVal(e.folderName);
  };
  const [startMonthDate, setMonthStartDate] = useState(new Date());
  const monthYearChange = (dt) => {};

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className="row col-lg-1 col-md-11 col-sm-10 col-10">
              <h5 className="heading_color">Client Report</h5>
            </div>

            <div className="col-lg-2 col-md-11 col-sm-10 col-10 py-2 ">
              <DatePicker
                className="form-control yearpicker"
                placeholder="yyyy"
                //   maxDate={subMonths(new Date(), -1)}
                onChange={(date) => monthYearChange(date)}
                dateFormat="yyyy"
                selected={startMonthDate}
                style={{ textAlign: "center" }}
                showYearPicker
              />
            </div>
            <div className="col-lg-2 col-md-11 col-sm-10 col-10 py-2 ">
              <Select
                name="clientType"
                isSearchable={true}
                options={clientTypeVal}
                value={clientType || clientTypeVal[0]}
                placeholder="Client Type"
                onChange={(e) => onClientTypeChange(e)}
              />
            </div>
            <div className="col-lg-2 col-md-11 col-sm-10 col-10 py-2 ">
              <Select
                name="clientData"
                isSearchable={true}
                value={clientData}
                options={activeClientsOpt}
                placeholder="Select"
                onChange={(e) => onClientChange(e)}
              />
            </div>
            <div className="col-lg-5 col-md-11 col-sm-12 col-11 py-3">
              <button
                className="btn btn_green_bg float-right"
                onClick={() => onClickReset()}
              >
                Export
              </button>
              <button
                className="btn btn_green_bg float-right"
                onClick={() => onClickReset()}
              >
                Refresh
              </button>
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
                        <th>Client</th>
                        <th>January</th>
                        <th>Febraury</th>
                        <th>March</th>
                        <th>April</th>
                        <th>May</th>
                        <th>June</th>
                        <th>July</th>
                        <th>August</th>
                        <th>September</th>
                        <th>October</th>
                        <th>November</th>
                        <th>December</th>
                      </tr>
                    </thead>
                  </table>
                </div>
              </section>
            </div>
          </div>

          <div className="row col-md-12 col-lg-12 col-sm-12 col-12  ">
            <div className="col-lg-10 col-md-6 col-sm-6 col-12"></div>
            <div className="col-lg-2 col-md-6 col-sm-6 col-12 align_right">
              {/* <strong> No of Clients:{allEmployee.length}</strong> */}
            </div>
          </div>
        </section>
        <Modal
          show={showEditModal}
          backdrop="static"
          keyboard={false}
          size="xl"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <div className="col-lg-10 col-md-10 col-sm-10 col-10">
              <h3 className="modal-title text-center">Edit Staff Details</h3>
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
          <Modal.Body></Modal.Body>
        </Modal>
      </div>
    </Fragment>
  );
};

ClientReport.propTypes = {
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  // getAllProjectStatus: PropTypes.func.isRequired,
  getActiveClientsFilter: PropTypes.func.isRequired,
  // getActiveStaffFilter: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  settings: state.settings,
  client: state.client,
});

export default connect(mapStateToProps, {
  getAllEmployee,
  getAllStaff,
  getFilterEmpDetails,

  // getAllProjectStatus,
  getActiveClientsFilter,
  // getActiveStaffFilter,
})(ClientReport);
