import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { AddState } from "../../actions/dct";
import Spinner from "../layout/Spinner";

const AllContacts = ({
  auth: { isAuthenticated, user, users, loading },
  leadDataVal,
  //   AddState,
}) => {
  console.log("contact", leadDataVal);
  //formData
  const [formData, setFormData] = useState({
    countryName: "",
    countryCode: "",
    isSubmitted: false,
  });
  const { countryName, countryCode } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      countryName: countryName,
      countryCode: countryCode,
      countryEnteredById: user._id,
      countryEnteredByName: user.userName,
      countryBelongsTo: "DCT",
    };
    console.log(finalData);
    // AddState(finalData);
    setFormData({
      ...formData,
      countryName: "",
      countryCode: "",
      isSubmitted: true,
    });
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      {/* <form
        className="row col-lg-12 col-md-12 col-sm-12 col-12"
        onSubmit={(e) => onSubmit(e)}
        autoComplete="off"
      > */}
      <div className="col-lg-12 col-md-12 col-sm-12 col-12 no_padding ">
        <table
          className="table table-bordered table-striped table-hover smll_row"
          id="datatable2"
        >
          <thead>
            <tr>
              <th style={{ width: "15%" }}>Staff Name </th>
              <th style={{ width: "13%" }}>Phone No</th>
              <th style={{ width: "13%" }}>Designation</th>
              <th style={{ width: "6%" }}>Op</th>
            </tr>
          </thead>
          <tbody>
            {leadDataVal &&
              leadDataVal.staffs &&
              leadDataVal.staffs.map((staff, idx) => {
                return (
                  <tr key={idx}>
                    <td>{staff.staffName}</td>
                    <td>{staff.staffPhoneNumber}</td>
                    <td>{staff.staffDesignation}</td>
                    <td></td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {/* </form> */}
    </Fragment>
  );
};

AllContacts.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  //   AddState,
})(AllContacts);
