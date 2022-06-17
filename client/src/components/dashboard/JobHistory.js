import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editDepartment } from "../../actions/settings";

import Spinner from "../layout/Spinner";

const JobHistory = ({
  auth: { isAuthenticated, user, users, loading },
  allDeptartmentdata,
  onEditModalChange,
  editDepartment,
}) => {
  //formData
  const [formData, setFormData] = useState({
    departmentName:
      allDeptartmentdata && allDeptartmentdata.departmentName
        ? allDeptartmentdata.departmentName
        : "",
    departmentDesc:
      allDeptartmentdata && allDeptartmentdata.departmentDesc
        ? allDeptartmentdata.departmentDesc
        : "",

    isSubmitted: false,
  });

  const { departmentName, departmentDesc } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      recordId: allDeptartmentdata ? allDeptartmentdata._id : "",
      departmentName: departmentName,
      departmentDesc: departmentDesc,
      departmentEditedById: user._id,
    };

    console.log(finalData);
    editDepartment(finalData);
    onEditModalChange(true);
    // setFormData({
    //   ...formData,
    //   districtName: "",
    //   isSubmitted: true,
    // });
    // getStateData("");
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="col-lg-6 col-md-12 col-sm-12 col-12">
            <label className="label-control"> Last Changed By :</label>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 col-12">
            <label className="label-control"> Time :</label>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 col-12">
            <label className="label-control"> Status :</label>
          </div>

          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <label className="label-control"> Notes :</label>
            <textarea
              name="clientAddress"
              id="clientAddress"
              className="textarea form-control"
              rows="3"
              placeholder="Client Address"
              style={{ width: "100%" }}
              onChange={(e) => onInputChange(e)}
              disabled
            ></textarea>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

JobHistory.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { editDepartment })(JobHistory);
