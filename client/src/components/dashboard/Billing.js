import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import Spinner from "../layout/Spinner";
import { getverifiedProjectDeatils } from "../../actions/projects";
import { getBillingClient } from "../../actions/client";
import BillingBreakup from "./billingBreakup";

const Billing = ({
  auth: { isAuthenticated, user, users },
  project: { VerifiedProjects },
  client: { allBillingClient },
  getverifiedProjectDeatils,
  getBillingClient,
}) => {
  useEffect(() => {
    getverifiedProjectDeatils();
  }, [getverifiedProjectDeatils]);
  useEffect(() => {
    getBillingClient();
  }, [getBillingClient]);

  const [clientData, setClientData] = useState("");

  const billingClientOpt = [];
  allBillingClient.map((clientData) =>
    billingClientOpt.push({
      label: clientData.clientName,
      value: clientData._id,
    })
  );

  const onClientChange = (e) => {
    setClientData(e);
    let selDateData = {
      clientId: e.value,
    };
    getverifiedProjectDeatils(selDateData);
  };

  // Modal
  // const monthOpt = [];
  // allStatusVerification.map((projStatusData) =>
  //   projectStatusOpt.push({
  //     label: projStatusData.projectStatusType,
  //     value: projStatusData._id,
  //   })
  // );

  const onClickReset = () => {
    getverifiedProjectDeatils("");
    setClientData("");
  };

  const [showAllChangeModal, setshowModal] = useState(false);
  const handleModalClose = () => setshowModal(false);

  const onModalChange = (e) => {
    if (e) {
      handleModalClose();
    }
  };

  const [userDatas3, setUserDatas3] = useState(null);
  const handleBilling = (VerifiedProjects) => {
    setshowModal(true);
    setUserDatas3(VerifiedProjects);
  };

  const onBillSubmit = () => {
    let finalData = {
      billingList: AddedBillDetails,
    };
    console.log(finalData);
  };

  //start
  const [AddedBillDetails, AddBillDetails] = useState([]);
  const onCheckSelect = (e, VerifiedProjects) => {
    if (e.target.checked) {
      const addDataTransfer = {
        billProjectId: VerifiedProjects._id,
      };
      let temp = [];
      temp.push(...AddedBillDetails, addDataTransfer);
      AddBillDetails(temp);
    } else {
      const removeList = AddedBillDetails.filter(
        (AddedBillDetails) =>
          AddedBillDetails.billProjectId !== VerifiedProjects._id
      );
      AddBillDetails(removeList);
    }
  };

  let projectQty = 0;
  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className=" col-lg-2 col-md-11 col-sm-10 col-10">
              <h4 className="heading_color">Billing</h4>
            </div>
            <div className="col-lg-2 col-md-11 col-sm-10 col-10 py-2">
              <Select
                name="clientData"
                isSearchable={true}
                value={clientData}
                options={billingClientOpt}
                placeholder="Client"
                onChange={(e) => onClientChange(e)}
              />
            </div>
            <div className="col-lg-8 col-md-11 col-sm-12 col-11 py-2">
              <button
                className="btn btn_green_bg float-right"
                onClick={() => onClickReset()}
              >
                Refresh
              </button>
              <button
                className="btn btn_green_bg float-right"
                onClick={() => onBillSubmit()}
              >
                Bill
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12 text-center">
              <section className="body">
                <div className=" body-inner no-padding table-responsive fixTableHead">
                  <table
                    className="table table-bordered table-striped table-hover smll_row"
                    id="datatable2"
                  >
                    <thead>
                      <tr>
                        <th style={{ width: "1%" }}></th>
                        {/* SLAP UserGroupRights */}
                        {(user.userGroupName &&
                          user.userGroupName === "Administrator") ||
                        user.userGroupName === "Super Admin" ? (
                          <th style={{ width: "5%" }}>Client Name</th>
                        ) : (
                          <></>
                        )}
                        <th style={{ width: "6%" }}>Folder </th>
                        <th style={{ width: "6%" }}>Staff Name </th>
                        <th style={{ width: "25%" }}>Project Name</th>
                        <th style={{ width: "5%" }}>Project Date</th>
                        <th style={{ width: "2%" }}>Qty</th>
                      </tr>
                    </thead>
                    <tbody>
                      {VerifiedProjects &&
                        VerifiedProjects.map((VerifiedProjects, idx) => {
                          var projectDate = "";
                          if (VerifiedProjects.projectDate) {
                            var ED = VerifiedProjects.projectDate.split(/\D/g);
                            projectDate = [ED[2], ED[1], ED[0]].join("-");
                          }

                          projectQty += VerifiedProjects.projectQuantity;
                          return (
                            <tr key={idx}>
                              <td>
                                <input
                                  type="checkbox"
                                  id="checkVal"
                                  onChange={(e) =>
                                    onCheckSelect(e, VerifiedProjects)
                                  }
                                />
                              </td>
                              {/* SLAP UserGroupRights */}
                              {(user.userGroupName &&
                                user.userGroupName === "Administrator") ||
                              user.userGroupName === "Super Admin" ? (
                                <td>{VerifiedProjects.clientName}</td>
                              ) : (
                                <></>
                              )}
                              <td>{VerifiedProjects.clientFolderName}</td>
                              <td>{VerifiedProjects.staffName}</td>
                              <td>
                                <label>{VerifiedProjects.projectName}</label>
                                <img
                                  className="img_icon_size log float-left "
                                  onClick={() =>
                                    handleBilling(VerifiedProjects)
                                  }
                                  src={require("../../static/images/colortheme.png")}
                                  alt="Billing Breakup"
                                  title="Last change"
                                />
                              </td>
                              <td>{projectDate}</td>

                              <td>
                                {VerifiedProjects.projectQuantity}&nbsp;
                                {VerifiedProjects.projectUnconfirmed ===
                                  true && (
                                  <span style={{ color: "red" }}>*</span>
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
        </section>

        <div className="row col-md-12 col-lg-12 col-sm-12 col-12  bottmAlgmnt">
          <div className="col-lg-1 col-md-6 col-sm-6 col-12 align_right">
            Quantity:{projectQty}
          </div>
        </div>
      </div>

      <Modal
        show={showAllChangeModal}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <div className="col-lg-10 col-md-10 col-sm-10 col-10">
            <h3 className="modal-title text-center">Billing Breakup</h3>
          </div>
          <div className="col-lg-2 col-md-2 col-sm-2 col-2">
            <button onClick={handleModalClose} className="close">
              <img
                src={require("../../static/images/close.png")}
                alt="X"
                style={{ height: "20px", width: "20px" }}
              />
            </button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <BillingBreakup onModalChange={onModalChange} billing={userDatas3} />
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

Billing.propTypes = {
  auth: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  project: state.project,
  client: state.client,
});

export default connect(mapStateToProps, {
  getverifiedProjectDeatils,
  getBillingClient,
})(Billing);
