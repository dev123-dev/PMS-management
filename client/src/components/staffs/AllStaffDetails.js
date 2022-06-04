import React, { useState, Fragment, useEffect } from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import Select from "react-select";
import { connect } from "react-redux";

import Spinner from "../layout/Spinner";
import Pagination from "../layout/Pagination";

const AllStaffDetails = ({
  auth: { allUser, isAuthenticated, user, users },
}) => {
  const [showAllDistrictModal, setShowAddDistrictModal] = useState(false);
  const handleAddDistrictModalClose = () => setShowAddDistrictModal(false);
  const onClickHandler = () => {
    setShowAddDistrictModal(true);
  };

  const onAddDistrictModalChange = (e) => {
    if (e) {
      handleAddDistrictModalClose();
    }
  };
  const onUpdateModalChange = (e) => {
    if (e) {
      handleUpdateModalClose();
    }
  };

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const handleUpdateModalClose = () => setShowUpdateModal(false);

  const [userData, setUserData] = useState(null);
  const onEdit = (districts, idx) => {
    setShowUpdateModal(true);
    setUserData(districts);
  };

  //pagination code
  const [currentData, setCurrentData] = useState(1);
  const [dataPerPage] = useState(8);
  //Get Current Data
  const indexOfLastData = currentData * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;

  //change page
  const paginate = (nmbr) => {
    setCurrentData(nmbr);
  };
  //pagination code ends

  const [institution, getinstitutionData] = useState();

  const [institutionId, setinstitutionId] = useState();
  const [institutionName, setinstitutionName] = useState();

  const onInstitutionChange = (e) => {
    var institutionId = "";
    var institutionName = "";
    getinstitutionData(e);

    institutionId = e.institutionId;
    institutionName = e.value;

    setinstitutionId(institutionId);
    setinstitutionName(institutionName);
    const changeData = {
      institutionIdVal: e.institutionId,
    };
  };
  const [showDeactiveModal, setShowDeactiveModal] = useState(false);
  const handleDeactiveModalClose = () => setShowDeactiveModal(false);

  const onDeactiveModalChange = (e) => {
    if (e) {
      handleDeactiveModalClose();
    }
  };
  const [userDatas, setUserDatas] = useState(null);
  const onUpdate = (districtData, idx) => {
    setShowDeactiveModal(true);
    setUserDatas(districtData);
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-11 col-md-12 col-sm-12 col-12 no_padding">
            <div className="row col-lg-5 col-md-11 col-sm-10 col-10">
              <h5 className="heading_color">All Staff Details </h5>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-11 col-md-12 col-sm-12 col-12 text-center py-2">
              <section className="body">
                <div className=" body-inner no-padding table-responsive">
                  <table
                    className="table table-bordered table-striped table-hover"
                    id="datatable2"
                  >
                    <thead>
                      <tr>
                        <th>Staff Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Staff Code</th>
                        <th>Joining Date Code</th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

AllStaffDetails.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(AllStaffDetails);
