import React, { useState, Fragment, useEffect } from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import Spinner from "../layout/Spinner";
import { getALLDemos, demoTaken } from "../../actions/sct";
import ResheduleDemo from "./ResheduleDemo";
import DemoSchedulesModal from "./DemoSchedulesModal";
const AllDemos = ({
  auth: { isAuthenticated, user, users },
  sct: { allDemos, demoStates, demoLeads },
  getALLDemos,
  demoTaken,
}) => {
  useEffect(() => {
    getALLDemos();
  }, [getALLDemos]);
  const DateMethods = [
    { value: "Single Date", label: "Single Date" },
    { value: "Multi Date", label: "Multi Date" },
  ];
  const [formData, setFormData] = useState({
    Dateselectmode: DateMethods[0],
  });

  const { Dateselectmode, isSubmitted } = formData;
  const [projectData, setprojectData] = useState("");
  const [showHide, setShowHide] = useState({
    showdateSection: false,
    showdateSection1: true,
  });
  const { showdateSection, showdateSection1 } = showHide;
  const onDateModeChange = (e) => {
    setprojectData("");
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
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const onDateChange = (e) => {
    setSelectedDate(e.target.value);
    let filterData = {
      demoDateVal: e.target.value,
      dateType: Dateselectmode ? Dateselectmode.value : "",
      clientId: clientId,
      stateId: stateId,
    };
    getALLDemos(filterData);
  };

  const [fromdate, setfromdate] = useState("");
  const onDateChangefrom = (e) => {
    setfromdate(e.target.value);
  };

  const [todate, settodate] = useState("");
  const onDateChange1 = (e) => {
    settodate(e.target.value);
    let filterData = {
      fromdate: fromdate,
      todate: e.target.value,
      dateType: Dateselectmode ? Dateselectmode.value : "",
      clientId: clientId,
      stateId: stateId,
    };
    getALLDemos(filterData);
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

  const onDemonottakenModalChange = (e) => {
    if (e) {
      handleNotTakenModalClose();
    }
  };
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
    onDemonottakenModalChange(true);
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
    setStateID(e.sId);
    let filterData = {
      demoDateVal: selectedDate,
      fromdate: fromdate,
      todate: todate,
      dateType: Dateselectmode ? Dateselectmode.value : "",
      clientId: clientId,
      stateId: e.sId,
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
    let filterData = {
      demoDateVal: selectedDate,
      fromdate: fromdate,
      todate: todate,
      dateType: Dateselectmode ? Dateselectmode.value : "",
      clientId: e.clientId,
      stateId: stateId,
    };
    getALLDemos(filterData);
  };
  const onClickReset = () => {
    getStateData("");
    setClientData("");
    getALLDemos("");
    setSelectedDate(new Date().toISOString().split("T")[0]);
    setSelectedDate(new Date().toISOString().split("T")[0]);
    setfromdate("");
    settodate("");
    setFormData({
      ...formData,
      Dateselectmode: DateMethods[0],
    });
    setShowHide({
      ...showHide,
      showdateSection: false,
      showdateSection1: true,
    });
  };

  const [showDemoScheduleModal, setShowDemoScheduleModal] = useState(false);
  const handleDemoScheduleModalClose = () => setShowDemoScheduleModal(false);

  const onDemoScheduleModalChange = (e) => {
    if (e) {
      handleDemoScheduleModalClose();
    }
  };
  const onCheckSchedule = () => {
    setShowDemoScheduleModal(true);
  };

  const onResheduleModalChange = (e) => {
    if (e) {
      handleResheduleModalClose();
    }
  };

  const [showResheduleModal, setShowResheduleModal] = useState(false);
  const handleResheduleModalClose = () => setShowResheduleModal(false);
  const [resheduleData, setResheduleData] = useState(null);

  const onClickReshedule = (allDemos, idx) => {
    setShowResheduleModal(true);
    setResheduleData(allDemos);
  };
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
              <Select
                name="Dateselectmode"
                options={DateMethods}
                isSearchable={true}
                value={Dateselectmode}
                placeholder="Select"
                onChange={(e) => onDateModeChange(e)}
              />
            </div>
            {showdateSection && (
              <>
                <div className="col-lg-1 col-md-11 col-sm-10 col-10 py-2">
                  <input
                    type="date"
                    placeholder="dd/mm/yyyy"
                    className="form-control cpp-input datevalidation"
                    name="fromdate"
                    value={fromdate}
                    onChange={(e) => onDateChangefrom(e)}
                    style={{
                      width: "110%",
                    }}
                    required
                  />
                </div>
                <div className=" col-lg-1 col-md-11 col-sm-10 col-10 py-2">
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
              </>
            )}
            {showdateSection1 && (
              <>
                <div className=" col-lg-2 col-md-11 col-sm-10 col-10 py-2">
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
              </>
            )}
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
            <div className="col-lg-1 col-md-6 col-sm-6 col-12 py-2 ml-5">
              <input
                type="submit"
                name="submit"
                value="Schedules"
                onClick={() => onCheckSchedule()}
                className="btn btn_green_bg float-right"
              />
            </div>
            <div className="col-lg-1 col-md-6 col-sm-6 col-12 py-2">
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
                        <th style={{ width: "7%" }}>Company Name</th>
                        <th style={{ width: "7%" }}>Client </th>
                        <th style={{ width: "5%" }}>Demo Date</th>
                        <th style={{ width: "10%" }}>Email Id </th>
                        <th style={{ width: "8%" }}>Contact No </th>
                        <th style={{ width: "5%" }}>State </th>
                        <th style={{ width: "5%" }}>Demo time </th>
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
                              <td>
                                {allDemos.clientDetails &&
                                  allDemos.clientDetails.sctCompanyName}
                              </td>
                              <td>{allDemos.clientName}</td>
                              <td>{demoDate}</td>

                              <td>
                                {allDemos.clientDetails &&
                                  allDemos.clientDetails.sctEmailId}
                              </td>
                              <td>
                                {allDemos.clientDetails &&
                                  allDemos.clientDetails.sctPhone1}
                              </td>
                              <td>
                                {allDemos.clientDetails &&
                                  allDemos.clientDetails.stateName}
                              </td>
                              <td>
                                {allDemos.fromTime} to {allDemos.toTime}
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
                                    <button
                                      className="btn btn_green_bg"
                                      onClick={() =>
                                        onClickReshedule(allDemos, idx)
                                      }
                                    >
                                      Reshedule
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
          <Modal
            show={showDemoScheduleModal}
            backdrop="static"
            keyboard={false}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header>
              <div className="col-lg-10">
                <h3 className="modal-title text-center">Demo Schedules</h3>
              </div>
              <div className="col-lg-1">
                <button
                  onClick={handleDemoScheduleModalClose}
                  className="close"
                >
                  <img
                    src={require("../../static/images/close.png")}
                    alt="X"
                    style={{ height: "20px", width: "20px" }}
                  />
                </button>
              </div>
            </Modal.Header>
            <Modal.Body>
              <DemoSchedulesModal
                onDemoScheduleModalChange={onDemoScheduleModalChange}
              />
            </Modal.Body>
          </Modal>
          <Modal
            show={showResheduleModal}
            backdrop="static"
            keyboard={false}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header>
              <div className="col-lg-10">
                <h3 className="modal-title text-center">
                  Reshedule Demo Details{" "}
                </h3>
              </div>
              <div className="col-lg-2">
                <button onClick={handleResheduleModalClose} className="close">
                  <img
                    src={require("../../static/images/close.png")}
                    alt="X"
                    style={{ height: "20px", width: "20px" }}
                  />
                </button>
              </div>
            </Modal.Header>
            <Modal.Body>
              <ResheduleDemo
                allDemos={resheduleData}
                onResheduleModalChange={onResheduleModalChange}
              />
            </Modal.Body>
          </Modal>
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
          <form className="row" onSubmit={(e) => onSubmitVeriy(e, "Not Taken")}>
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
