import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { editUserGroup } from "../../actions/user";

const EditUserGroup = ({
  auth: { isAuthenticated, user, users, loading },
  userGroupsdata,
  editUserGroup,
  onEditModalChange,
  onAddModalChange,
}) => {
  //formData
  const [formData, setFormData] = useState({
    userGroupName:
      userGroupsdata && userGroupsdata.userGroupName
        ? userGroupsdata.userGroupName
        : "",
    isSubmitted: false,
  });

  const { userGroupName } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // if (checkErrors()) {
    const finalData = {
      recordId: userGroupsdata ? userGroupsdata._id : "",
      userGroupName: userGroupName,
      userGroupEditedById: user._id,
    };
    editUserGroup(finalData);
    onEditModalChange(true);
    // onAddModalChange(true);
    // setFormData({
    //   ...formData,
    //   districtName: "",
    //   isSubmitted: true,
    // });
    // }
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      {" "}
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="row col-lg-12 col-md-11 col-sm-12 col-12 ">
          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <label className="label-control">UserGroup Name* :</label>
            <input
              type="text"
              name="userGroupName"
              value={userGroupName}
              className="form-control"
              onChange={(e) => onInputChange(e)}
            />
          </div>
        </div>

        <div
          className="row col-lg-12 col-md-11 col-sm-12 col-12 Savebutton no_padding"
          size="lg"
        >
          <div className="col-lg-8 col-md-6 col-sm-12 col-12">
            <label className="label-control colorRed">
              * Indicates mandatory fields
            </label>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 col-12">
            {loading ? (
              <button
                className="btn sub_form btn_continue blackbrd Save float-right"
                disabled
              >
                Loading...
              </button>
            ) : (
              <input
                type="submit"
                name="Submit"
                value="Update"
                className="btn sub_form btn_continue blackbrd Save float-right"
              />
            )}
          </div>
        </div>
      </form>
    </Fragment>
  );
};

EditUserGroup.propTypes = {
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  editUserGroup: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps, { editUserGroup })(EditUserGroup);
