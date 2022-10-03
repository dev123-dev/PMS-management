import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { editDctClientInstructionDetails } from "../../actions/dct";

const EditInstructions = ({
  auth: { isAuthenticated, user, users, loading },
  allInstructiondata,
  allleaddata,
  onEditInstructionModalChange,
  editDctClientInstructionDetails,
  from,
  filterData,
  // staffFilter,
}) => {
  //formData

  const [formData, setFormData] = useState({
    instructionName:
      allInstructiondata && allInstructiondata.instructionName
        ? allInstructiondata.instructionName
        : "",
    instructionDiscription:
      allInstructiondata && allInstructiondata.instructionDiscription
        ? allInstructiondata.instructionDiscription
        : "",

    isSubmitted: false,
  });

  const { instructionName, instructionDiscription } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      instructionId: allInstructiondata ? allInstructiondata._id : "",
      instructionName:
        instructionName.charAt(0).toUpperCase() + instructionName.slice(1), //to make first letter capital
      instructionDiscription: instructionDiscription,
      filterData: filterData,
    };
    editDctClientInstructionDetails(finalData);
    onEditInstructionModalChange(true);
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <form className="row" onSubmit={(e) => onSubmit(e)}>
        <div className="row col-lg-12 col-md-11 col-sm-12 col-12 ">
          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
            <label className="label-control">Instructions Name*:</label>
            <input
              type="text"
              name="instructionName"
              value={instructionName}
              className="form-control"
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="col-lg-12 col-md-6 col-sm-6 col-12">
            <label className="label-control">Instructions :</label>
            <textarea
              name="instructionDiscription"
              id="instructionDiscription"
              className="textarea form-control"
              rows="3"
              placeholder="Instructions"
              style={{ width: "100%" }}
              value={instructionDiscription}
              onChange={(e) => onInputChange(e)}
            ></textarea>
          </div>
        </div>

        <div
          className="row col-lg-12 col-md-11 col-sm-12 col-12 Savebutton no_padding"
          size="lg"
        >
          <div className="col-lg-8 col-md-6 col-sm-12 col-12">
            <label className="label-control colorRed">
              * Indicates mandatory fields.
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

EditInstructions.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  editDctClientInstructionDetails,
})(EditInstructions);
