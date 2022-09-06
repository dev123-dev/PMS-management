import React, { useState, Fragment, useEffect } from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Select from "react-select";

import Spinner from "../layout/Spinner";
// import AddDepartment from "./AddDepartment";
// import EditDepartment from "./EditDepartment";
import { getALLDemos, demoTaken } from "../../actions/sct";
const AllDemos = ({
  auth: { isAuthenticated, user, users },
  sct: { allDemos, demoStates, demoLeads },
  getALLDemos,
  demoTaken,
}) => {
  useEffect(() => {
    getALLDemos();
  }, [getALLDemos]);

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const onDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const [showEditModal, setShowEditModal] = useState(false);
  const handleEditModalClose = () => setShowEditModal(false);
  const onEditModalChange = (e) => {
    if (e) {
      handleEditModalClose();
    }
  };

  const [userDatas, setUserDatas] = useState(null);
  const onClickVerify = (allDemos, idx) => {
    setUserDatas(allDemos);
    setShowEditModal(true);
  };

  const [showDemonottakenModal, setShowDemonottakenModal] = useState(false);
  const handleNotTakenModalClose = () => setShowDemonottakenModal(false);

  // const onDemonottakenModalChange = (e) => {
  //   if (e) {
  //     handleNotTakenModalClose();
  //   }
  // };
  // const [userDatademonottaken, setUserDatademonottaken] = useState(null);
  const onClickNotTaken = (allDemos, idx) => {
    setShowDemonottakenModal(true);
    setUserDatas(allDemos);
  };

  const onSubmitVeriy = (e, demosatval) => {
    e.preventDefault();
    const finalData = {
      recordId: userDatas ? userDatas._id : "",
      demoStatus: demosatval,
    };
    demoTaken(finalData);
    onEditModalChange(true);
    setUserDatas("");
  };

  const allstates = [];
  demoStates.map((state) =>
    allstates.push({
      sId: state._id,
      label: state.stateName,
      value: state.stateName,
    })
  );

  const [state, getStateData] = useState("");
  const [stateId, setStateID] = useState("");

  const onStateChange = (e) => {
    getStateData(e);
    setStateID(e.stateId);
    let filterData = {
      stateId: stateId,
    };
    getALLDemos(filterData);
  };

  const ClientsOpt = [];
  demoLeads.map((clientsData) =>
    ClientsOpt.push({
      clientId: clientsData._id,
      label: clientsData.sctClientName,
      value: clientsData.sctClientName,
    })
  );

  const [clientData, setClientData] = useState("");
  const [clientId, setClientId] = useState("");

  const onClientChange = (e) => {
    setClientData(e);
    setClientId(e.clientId);
  };
  const onClickReset = () => {};

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className=" col-lg-1 col-md-11 col-sm-10 col-10">
              <h5 className="heading_color">All Demos</h5>
            </div>
            <div className="col-lg-2 col-md-11 col-sm-10 col-10 py-2">
              <input
                type="date"
                placeholder="dd/mm/yyyy"
                className="form-control cpp-input datevalidation"
                name="selectedDate"
                value={selectedDate}
                onChange={(e) => onDateChange(e)}
                style={{
                  width: "100%",
                }}
                required
              />
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6 col-12 py-2">
              <Select
                name="stateName"
                options={allstates}
                isSearchable={true}
                value={state}
                placeholder="Select State"
                onChange={(e) => onStateChange(e)}
              />
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6 col-12 py-2">
              <Select
                name="clientData"
                isSearchable={true}
                value={clientData}
                options={ClientsOpt}
                placeholder="Select"
                onChange={(e) => onClientChange(e)}
              />
            </div>
            <div className="col-lg-5 col-md-11 col-sm-12 col-11 py-3">
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
                        <th>Company Name</th>

                        <th>Demo Date</th>
                        <th>Client </th>
                        <th>Email Id </th>
                        <th>Contact No </th>
                        <th>Demo time </th>
                        <th style={{ width: "14%" }}>Demo Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allDemos &&
                        allDemos.map((allDemos, idx) => {
                          var demoDate = "";
                          if (allDemos.demoDate) {
                            var ED = allDemos.demoDate.split(/\D/g);
                            demoDate = [ED[2], ED[1], ED[0]].join("-");
                          }
                          return (
                            <tr key={idx}>
                              <td className="headcolstatic">
                                {allDemos.output.sctCompanyName}
                              </td>
                              <td>{demoDate}</td>
                              <td>{allDemos.output.sctClientName}</td>
                              <td>{allDemos.output.sctEmailId}</td>
                              <td>{allDemos.output.sctPhone1}</td>
                              <td>
                                {allDemos.fromTime} to{allDemos.toTime}
                              </td>
                              <td>
                                {allDemos.demoStatus ? (
                                  allDemos.demoStatus
                                ) : (
                                  <>
                                    <button
                                      className="btn btn_green_bg"
                                      onClick={() =>
                                        onClickVerify(allDemos, idx)
                                      }
                                    >
                                      Taken
                                    </button>

                                    <button
                                      className="btn btn_green_bg"
                                      onClick={() =>
                                        onClickNotTaken(allDemos, idx)
                                      }
                                    >
                                      Not Taken
                                    </button>
                                  </>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-6 col-sm-11 col-11 align_right">
              <label>No of Demos : {allDemos && allDemos.length}</label>
            </div>
          </div>
        </section>
      </div>

      <Modal
        show={showEditModal}
        backdrop="static"
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <div className="col-lg-10">
            <h3 className="modal-title text-center">Verify Demo Taken</h3>
          </div>
          <div className="col-lg-1">
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
          <form className="row" onSubmit={(e) => onSubmitVeriy(e, "Taken")}>
            <div className="col-lg-12 col-md-11 col-sm-12 col-12 ">
              <label className="label-control colorRed">
                Are you sure you have Taken the Demo ?
              </label>
            </div>
            <div
              className="row col-lg-12 col-md-11 col-sm-12 col-12 Savebutton no_padding"
              size="lg"
            >
              <div className="col-lg-12 col-md-6 col-sm-12 col-12">
                <input
                  type="submit"
                  name="Submit"
                  value="Yes"
                  className="btn sub_form btn_continue blackbrd Save float-right"
                />
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <Modal
        show={showDemonottakenModal}
        backdrop="static"
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <div className="col-lg-10">
            <h3 className="modal-title text-center">Verify Demo Not Taken </h3>
          </div>
          <div className="col-lg-1">
            <button onClick={handleNotTakenModalClose} className="close">
              <img
                src={require("../../static/images/close.png")}
                alt="X"
                style={{ height: "20px", width: "20px" }}
              />
            </button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <form className="row" onSubmit={(e) => onSubmitVeriy(e, "NotTaken")}>
            <div className="col-lg-12 col-md-11 col-sm-12 col-12 ">
              <label className="label-control colorRed">
                Are you sure you have Not Taken the Demo ?
              </label>
            </div>
            <div
              className="row col-lg-12 col-md-11 col-sm-12 col-12 Savebutton no_padding"
              size="lg"
            >
              <div className="col-lg-12 col-md-6 col-sm-12 col-12">
                <input
                  type="submit"
                  name="Submit"
                  value="Yes"
                  className="btn sub_form btn_continue blackbrd Save float-right"
                />
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

AllDemos.propTypes = {
  auth: PropTypes.object.isRequired,
  getALLDemos: PropTypes.func.isRequired,
  demoTaken: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  sct: state.sct,
});

export default connect(mapStateToProps, { getALLDemos, demoTaken })(AllDemos);
