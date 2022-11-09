import React, { useState, Fragment, useEffect } from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { getALLCompanyDetails } from "../../actions/settings";
import DeactiveCompany from "./DeactiveCompany";
const AllCompany = ({
  auth: { isAuthenticated, user, users },
  settings: { allCompanyDetails },
  getALLCompanyDetails,
}) => {
  useEffect(() => {
    getALLCompanyDetails();
  }, [getALLCompanyDetails]);

  const [showDeactiveModal, setShowDeactiveModal] = useState(false);
  const handleDeactiveModalClose = () => setShowDeactiveModal(false);

  const onDeactiveModalChange = (e) => {
    if (e) {
      handleDeactiveModalClose();
    }
  };
  const [Datadeactive, setdeactive] = useState(null);
  const onDeactive = (allCompanyDetails, idx) => {
    setShowDeactiveModal(true);
    setdeactive(allCompanyDetails);
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className=" col-lg-5 col-md-11 col-sm-10 col-10">
              <h5 className="heading_color">All Company Details </h5>
            </div>
            <div className="col-lg-7 col-md-11 col-sm-12 col-11 py-3">
              <Link to="/add-company" className="btn btn_green_bg float-right">
                Add Company
              </Link>
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
                        <th>Website</th>
                        <th>Phone1</th>
                        <th>Phone2</th>
                        <th>GSTIn</th>
                        <th>RegisterNo</th>
                        <th>TradeLicenseNo</th>
                        <th>Description</th>
                        <th>Address</th>
                        <th>Op</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allCompanyDetails &&
                        allCompanyDetails.map((allCompanyDetails, idx) => {
                          return (
                            <tr key={idx}>
                              <td>{allCompanyDetails.companyName}</td>
                              <td>{allCompanyDetails.companyWebsite}</td>
                              <td>{allCompanyDetails.companyPhone1}</td>
                              <td>{allCompanyDetails.companyPhone2}</td>
                              <td>{allCompanyDetails.companyGSTIn}</td>
                              <td>{allCompanyDetails.companyRegisterNo}</td>
                              <td>{allCompanyDetails.companyTradeLicenseNo}</td>
                              <td>{allCompanyDetails.companyDescription}</td>
                              <td>{allCompanyDetails.companyAddress}</td>
                              <td>
                                <img
                                  className="img_icon_size log"
                                  onClick={() =>
                                    onDeactive(allCompanyDetails, idx)
                                  }
                                  src={require("../../static/images/delete.png")}
                                  alt="Deactivate"
                                  title="Deactivate"
                                />
                                &nbsp;
                                <Link
                                  className="btn btn_green_bg float-right"
                                  to={{
                                    pathname: "/edit-company",
                                    data: {
                                      editcompanydatas: allCompanyDetails,
                                    },
                                  }}
                                >
                                  Edit
                                </Link>
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
              <h3 className="modal-title text-center">Deactivate Company</h3>
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
            <DeactiveCompany
              onDeactiveModalChange={onDeactiveModalChange}
              companydeactivedata={Datadeactive}
            />
          </Modal.Body>
        </Modal>
      </div>
    </Fragment>
  );
};

AllCompany.propTypes = {
  auth: PropTypes.object.isRequired,
  getALLCompanyDetails: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  settings: state.settings,
});

export default connect(mapStateToProps, {
  getALLCompanyDetails,
})(AllCompany);
