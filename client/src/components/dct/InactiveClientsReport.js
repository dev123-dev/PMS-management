
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useEffect, useState } from "react";

import { getInactiveClients } from "../../actions/dct"
import Spinner from "../layout/Spinner";
import AllContacts from "./AllContacts";

const InactiveClientsReport = ({ auth: { isAuthenticated, user }, dct: { dctInactiveClients }, getInactiveClients }) => {
    const [selRowIdx, setSelRowIdx] = useState("");
    const [selInactiveClientStaff, setSelInactiveClientStaff] = useState("");
    const [filterData, setFilterData] = useState("");

    const [showHide, setShowHide] = useState({
        showdateselectionSection: false,
    });

    const { showdateselectionSection } = showHide;

    const ondivcloseChange = (e) => {
        if (e) {
            handledivModalClose();
        }
    };

    const handledivModalClose = () => setShowHide(false);

    useEffect(() => {
        getInactiveClients();
    }, [])

    const onClickHandler = (dctInactiveClient, idx) => {
        setSelRowIdx(idx);
        setSelInactiveClientStaff(dctInactiveClient.staffs);
        setShowHide({
            ...showHide,
            showdateselectionSection: true,
        });
    }

    return !isAuthenticated || !user ? (
        <Spinner />
    ) : (
        <div className="container container_align_CT ">
            <section className="sub_reg">
                <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
                    <div className=" col-lg-2 col-md-11 col-sm-10 col-10">
                        <h4 className="heading_color">Inactive Client Details (last 30 days)</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-8 col-md-12 col-sm-12 col-12 text-center ">
                        <section className="body">
                            <div className=" body-inner no-padding table-responsive fixTableHeadCT">
                                <table
                                    className="table table-bordered table-striped hoverrow smll_row"
                                    id="datatable2"
                                >
                                    <thead>
                                        <tr>
                                            <th style={{ width: "15%" }}>Company </th>
                                            <th style={{ width: "13%" }}>Website </th>
                                            <th style={{ width: "11%" }}>Email</th>
                                            <th style={{ width: "8%" }}>Region</th>
                                            <th style={{ width: "13%" }}>Contact</th>
                                        </tr>
                                    </thead>
                                    <tbody>{dctInactiveClients &&
                                        dctInactiveClients.map((dctInactiveClient, idx) => {
                                            
                                            return (
                                                <tr
                                                    key={idx}
                                                    className={
                                                        selRowIdx === idx ? "seletedrowcolorchange" : ""
                                                    }
                                                    onClick={() => onClickHandler(dctInactiveClient, idx)}
                                                >
                                                    <td>{dctInactiveClient.companyName}</td>
                                                    <td>
                                                        <a
                                                            href={dctInactiveClient.website}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            {dctInactiveClient.website}
                                                        </a>
                                                    </td>
                                                    <td>{dctInactiveClient.emailId}</td>
                                                    <td>{dctInactiveClient.countryName}</td>
                                                    <td>
                                                        {dctInactiveClient.countryCode
                                                            ? "+" + dctInactiveClient.countryCode
                                                            : ""}
                                                        &nbsp;
                                                        {dctInactiveClient.phone1}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                    </tbody>
                                </table>

                            </div>
                        </section>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-11 col-11">
                        No of Inactive Clients : {dctInactiveClients.length}
                    </div>
                </div>
                <div className="row col-lg-4 col-md-12 col-sm-12 col-12 fixTableHead">
                    <div className=" col-lg-12 col-md-6 col-sm-6 col-12 card-new no_padding sidePartHeight">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-12 no_padding ">
                            <AllContacts
                                inactiveClientStaff={selInactiveClientStaff}
                                ondivcloseChange={ondivcloseChange}
                                from="Inactive"
                                filterData={filterData}
                                showdateselectionSection={showdateselectionSection}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>


    )
}

InactiveClientsReport.propTypes = {
    auth: PropTypes.object.isRequired,
    dct: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    dct: state.dct,
    auth: state.auth
})

export default connect(mapStateToProps, {
    getInactiveClients
})(InactiveClientsReport);