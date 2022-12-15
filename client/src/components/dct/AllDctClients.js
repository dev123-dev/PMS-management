import React, { useState, Fragment, useEffect } from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Select from "react-select";
import Spinner from "../layout/Spinner";
import { getAllDctClient } from "../../actions/dct";
import {
  getClientsFilter,
  getFilterDCTClientDetails,
} from "../../actions/client";
import DeactiveDctClient from "./DeactiveDctClient";
const AllDctClients = ({
  auth: { isAuthenticated, user, users },
  dct: { allDctClients, allDctClientsDD },
  client: { allfilterClients },
  getClientsFilter,
  getFilterDCTClientDetails,
  getAllDctClient,
}) => {
  useEffect(() => {
    getAllDctClient();
  }, [getAllDctClient]);
  useEffect(() => {
    getClientsFilter();
  }, [getClientsFilter]);
  useEffect(() => {
    getFilterDCTClientDetails();
  }, [getFilterDCTClientDetails]);

  const [formData, setFormData] = useState({
    isSubmitted: false,
  });

  const {} = formData;

  const [showDeactiveModal, setShowDeactiveModal] = useState(false);
  const handleDeactiveModalClose = () => setShowDeactiveModal(false);

  const onDeactiveModalChange = (e) => {
    if (e) {
      handleDeactiveModalClose();
    }
  };
  const [userDatadeactive, setUserDatadeactive] = useState(null);
  const onDeactive = (allDctClients, idx) => {
    setShowDeactiveModal(true);
    setUserDatadeactive(allDctClients);
  };

  const activeClientsOpt = [];
  allfilterClients.map((clientsData) =>
    activeClientsOpt.push({
      clientId: clientsData._id,
      label: clientsData.clientName,
      value: clientsData.clientName,
    })
  );
  const [clientData, setClientData] = useState("");
  const [clientId, setClientId] = useState("");

  const onClientChange = (e) => {
    setClientData(e);
    const finalData = {
      clientId: e.clientId,
    };

    getFilterDCTClientDetails(finalData);
  };

  const onClickReset = () => {
    getFilterDCTClientDetails("");
    setClientData("");
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className=" col-lg-2 col-md-11 col-sm-10 col-10">
              <h5 className="heading_color">All DCT Client Details </h5>
            </div>
            <div className="col-lg-2 col-md-11 col-sm-12 col-11 py-3">
              <Select
                name="clientData"
                isSearchable={true}
                value={clientData}
                options={activeClientsOpt}
                placeholder="Select"
                onChange={(e) => onClientChange(e)}
              />
            </div>
            <div className="col-lg-8 col-md-11 col-sm-12 col-11 py-3">
              <Link
                className="btn btn_green_bg float-right"
                to="/add-dct-client"
              >
                Add client
              </Link>
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
                        <th>Company Name</th>
                        <th>Client Name</th>
                        <th>Folder Name</th>
                        <th>Email</th>
                        <th>Contact 1 </th>
                        <th>Contact 2</th>
                        <th>Currency</th>
                        <th>Mode of Pay</th>
                        <th>Country</th>
                        <th>Op</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allDctClients &&
                        allDctClients.map((allDctClients, idx) => {
                          return (
                            <tr key={idx}>
                              <td>{idx + 1}</td>
                              <td>{allDctClients.companyName}</td>
                              <td>{allDctClients.clientName}</td>

                              <td>{allDctClients.clientFolderName}</td>
                              <td>{allDctClients.emailId}</td>
                              <td>
                                {allDctClients.countryCode
                                  ? "+" + allDctClients.countryCode
                                  : ""}
                                &nbsp;
                                {allDctClients.phone1}
                              </td>
                              <td>
                                {allDctClients.countryCode
                                  ? "+" + allDctClients.countryCode
                                  : ""}
                                &nbsp;
                                {allDctClients.phone2}
                              </td>
                              <td>{allDctClients.clientCurrency}</td>
                              <td>{allDctClients.paymentModeName}</td>
                              <td>{allDctClients.countryName}</td>
                              <td>
                                <>
                                  <img
                                    className="img_icon_size log"
                                    onClick={() =>
                                      onDeactive(allDctClients, idx)
                                    }
                                    src={require("../../static/images/delete.png")}
                                    alt="Deactivate"
                                    title="Deactivate"
                                  />
                                  &nbsp;
                                  <Link
                                    className="btn btn_green_bg float-right"
                                    to={{
                                      pathname: "/edit-dct-client",
                                      data: {
                                        dctdata: allDctClients,
                                      },
                                    }}
                                  >
                                    Edit
                                  </Link>
                                </>
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

          <div className="row col-md-12 col-lg-12 col-sm-12 col-12  ">
            <div className="col-lg-10 col-md-6 col-sm-6 col-12"></div>
            <div className="col-lg-2 col-md-6 col-sm-6 col-12 align_right">
              {/* <strong> No of Clients:{allClient.length}</strong> */}
            </div>
          </div>
        </section>
      </div>

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
            <h3 className="modal-title text-center">Deactivate Client</h3>
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
          <DeactiveDctClient
            onDeactiveModalChange={onDeactiveModalChange}
            dctclientdeactivedata={userDatadeactive}
          />
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

AllDctClients.propTypes = {
  auth: PropTypes.object.isRequired,
  getClientsFilter: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  dct: state.dct,
  client: state.client,
});

export default connect(mapStateToProps, {
  getAllDctClient,
  getClientsFilter,
  getFilterDCTClientDetails,
})(AllDctClients);
