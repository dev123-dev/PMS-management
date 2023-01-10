import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getAllchanges } from "../../actions/projects";
const billingBreakup = ({
  auth: { isAuthenticated, user, users },
  billing,
}) => {
  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
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
                    <th>Quality</th>
                    <th>Price</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {billing && billing.billingData.length > 0 ? (
                    billing.billingData.map((billing, idx) => {
                      return (
                        <tr key={idx}>
                          <td>{billing.qty}</td>
                          <td>{billing.price}</td>
                          <td>{billing.description}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={3}>No Data Available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </Fragment>
  );
};

billingBreakup.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { getAllchanges })(billingBreakup);
