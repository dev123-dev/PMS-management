import { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useLocation, Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Spinner from "../layout/Spinner";
import EditLead from "./EditLead";

import { getDeactiveLeadsClients, activateDctLeadOrClient } from "../../actions/dct";
import { set } from "mongoose";

const DeactiveLeadsClients = ({
    auth: { isAuthenticated, user },
    dct: { dctLeadsClients },
    getDeactiveLeadsClients,
    activateDctLeadOrClient
}) => {
    const location = useLocation();
    // Access the data prop and extract the leadType value
    const [leadType, setLeadType] = useState((location?.data?.leadType) ? location?.data?.leadType : localStorage.getItem("leadType"));  //leadType to detemine if the call is from Leads or Clients    

    const filterData = { leadType };

    useEffect(() => {
        localStorage.setItem("leadType", leadType);
        getDeactiveLeadsClients({ leadType });
    }, []);

    const [updateState, setUpdateState] = useState(false);
    useEffect(() => {
        console.log("Called", !updateState);
        setUpdateState(!updateState);
    }, [dctLeadsClients]);

    //On Restoring the Lead   
    const [showActivateModal, setShowDeactiveModal] = useState(false);
    const handleActivateModalClose = () => setShowDeactiveModal(false);

    const onClickActivate = (dctLeadClient, idx) => {
        setShowDeactiveModal(true);
    }

    //Edit Functionality
    const [showEditModal, setShowEditModal] = useState(false);
    const [selDctLeadClient, setSelDctLeadClient] = useState(null);
    const handleEditModalClose = () => setShowEditModal(false);
    const onEdit = (dctLeadClient, idx) => {
        setShowEditModal(true);
    }

    const onEditModalChange = (e) => {
        if (e) {
            handleEditModalClose();
        }
    };
    //End Edit Functionality

    //On Clicking Row
    const [selRowIdx, setSelRowIdx] = useState();
    const onClickHandler = (dctLeadClient, idx) => {
        setSelRowIdx(idx);
        setSelDctLeadClient(dctLeadClient);
    }

    const activateALeadOrClient = () => {
        activateDctLeadOrClient({ theLeadOrClientId: selDctLeadClient?._id, leadType: leadType });
        setShowDeactiveModal(false);
    }

    return !isAuthenticated || !user ? (
        <Spinner />
    ) : (
        <Fragment>
            <div className="container container_align_CT">
                <section className="sub_reg">
                    <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
                        <div className=" col-lg-1 col-md-11 col-sm-10 col-10 ">
                            <h4 className="heading_color">Deactive {leadType === "Leads" ? "Leads" : "Clients"}</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8 col-md-12 col-sm-12 col-12 text-center">
                            <section className="body">
                                <div className=" body-inner no-padding table-responsive fixTableHeadCT">
                                    <table
                                        className="table table-bordered table-striped hoverrow smll_row"
                                        id="datatable2"
                                    >
                                        <thead>
                                            <tr>
                                                <th>SNo</th>
                                                <th>Company</th>
                                                <th>Website</th>
                                                <th>Email</th>
                                                <th>Region</th>
                                                <th>Contact</th>
                                                <th>AssignedTo</th>
                                                <th>Deactive Reason</th>
                                                <th>Operation</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dctLeadsClients &&
                                                dctLeadsClients.map((dctLeadClient, idx) => {
                                                    return (
                                                        <tr
                                                            key={idx}
                                                            className={
                                                                selRowIdx === idx ? "seletedrowcolorchange" : ""
                                                            }
                                                            onClick={() => onClickHandler(dctLeadClient, idx)}
                                                        >
                                                            <td>{idx + 1}</td>
                                                            <td>{dctLeadClient.companyName}</td>
                                                            <td>
                                                                {" "}
                                                                <a
                                                                    href={dctLeadClient.website}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                >
                                                                    {dctLeadClient.website}
                                                                </a>
                                                            </td>
                                                            <td>{dctLeadClient.emailId}</td>
                                                            <td>{dctLeadClient.countryName}</td>
                                                            <td>
                                                                {dctLeadClient.countryCode
                                                                    ? "+" + dctLeadClient.countryCode
                                                                    : ""}
                                                                &nbsp;
                                                                {dctLeadClient.phone1}
                                                            </td>
                                                            <td>{dctLeadClient.dctLeadDeactiveReason ? dctLeadClient.dctLeadDeactiveReason : ""}</td>
                                                            <td>{dctLeadClient.dctLeadAssignedToName ? dctLeadClient.dctLeadAssignedToName : ""}</td>
                                                            <td>
                                                                <img
                                                                    className="img_icon_size log"
                                                                    onClick={() => onClickActivate(dctLeadClient, idx)}
                                                                    src={require("../../static/images/restoreeditlead/toggle-button.png")}
                                                                    alt="Activate Lead"
                                                                    title="Activate Lead"
                                                                    style={{ width: "24px" }}
                                                                />&nbsp;&nbsp;
                                                                <img
                                                                    className="img_icon_size log"
                                                                    onClick={() => onEdit(dctLeadClient, idx)}
                                                                    src={require("../../static/images/restoreeditlead/pencil.png")}
                                                                    alt="Edit Lead"
                                                                    title="Edit Lead"
                                                                    style={{ width: "16px" }}
                                                                />
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12 col-md-6 col-sm-11 col-11 align_right ">
                                        No of Deactive Clients :{" "} {dctLeadsClients.length}
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </section>
            </div>
            <Modal
                show={showActivateModal}
                backdrop="static"
                keyboard={false}
                size="l"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <div className="col-lg-10 col-md-10 col-sm-10 col-10">
                        <h3 className="modal-title text-center">Activate Lead</h3>
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                        <button onClick={handleActivateModalClose} className="close">
                            <img
                                src={require("../../static/images/close.png")}
                                alt="X"
                                style={{ height: "20px", width: "20px" }}
                            />
                        </button>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <p>Activating Lead - <b>{selDctLeadClient && selDctLeadClient.companyName ? selDctLeadClient.companyName : ""}</b></p>
                        <p>Are you sure you want to activate?</p>
                        <Link
                            className="btn sub_form btn_continue blackbrd Save float-right"
                            to="#"
                            onClick={activateALeadOrClient}
                        >
                            Submit
                        </Link>
                        <Link
                            className="btn sub_form btn_continue blackbrd float-right"
                            to="#"
                            onClick={handleActivateModalClose}
                        >
                            Cancel
                        </Link>

                    </div>
                </Modal.Body>
            </Modal>
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
                        <h3 className="modal-title text-center">Edit Lead Details</h3>
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
                    <EditLead
                        from="DeactiveLeads"
                        onEditModalChange={onEditModalChange}
                        alleditLeaddata={selDctLeadClient}
                        filterData={filterData}
                    />
                </Modal.Body>
            </Modal>
        </Fragment>
    )
}

DeactiveLeadsClients.propTypes = {
    auth: PropTypes.object.isRequired,
    dct: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    dct: state.dct
});

export default connect(mapStateToProps, {
    getDeactiveLeadsClients,
    activateDctLeadOrClient
})(DeactiveLeadsClients);