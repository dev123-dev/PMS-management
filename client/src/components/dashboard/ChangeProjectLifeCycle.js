import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Select from "react-select";

const ChangeProjectLifeCycle = ({
  auth: { isAuthenticated, user, users, loading },
  AddPaymentMode,
}) => {
  //formData
  const [formData, setFormData] = useState({
    Instructions: "",
    projectStatusCategory: "",
    isSubmitted: false,
  });

  const { Instructions, projectStatusCategory } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const StatusCategory = [
    { value: "01", label: "01" },
    { value: "02", label: "02" },
    { value: "03", label: "03" },
    { value: "04", label: "04" },
    { value: "05", label: "05" },
    { value: "06", label: "06" },
    { value: "07", label: "07" },
    { value: "08", label: "08" },
    { value: "09", label: "09" },
    { value: "10", label: "10" },
    { value: "11", label: "11" },
    { value: "12", label: "12" },
  ];

  const onStatuscatChange = (e) => {
    if (e) {
      setFormData({
        ...formData,
        projectStatusCategory: e,
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // if (checkErrors()) {
    const finalData = {
      Instructions: Instructions,
    };
    console.log(finalData);
    // AddPaymentMode(finalData);
    setFormData({
      ...formData,
      Instructions: "",
      isSubmitted: true,
    });
    // }
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      {" "}
      <div className="container container_align">
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="row col-lg-12 col-md-11 col-sm-12 col-12 ">
            <div className="col-lg-2 col-md-6 col-sm-6 col-12">
              <label className="label-control">Time :</label>

              <Select
                name="projectStatusCategory"
                options={StatusCategory}
                isSearchable={false}
                value={projectStatusCategory}
                placeholder="Select"
                onChange={(e) => onStatuscatChange(e)}
                theme={(theme) => ({
                  ...theme,
                  height: 26,
                  minHeight: 26,
                  borderRadius: 1,
                  colors: {
                    ...theme.colors,
                    primary: "black",
                  },
                })}
              />
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6 col-12 py-4">
              <label className="label-control"></label>
              <Select
                name="projectStatusCategory"
                options={StatusCategory}
                isSearchable={false}
                value={projectStatusCategory}
                placeholder="Select"
                onChange={(e) => onStatuscatChange(e)}
                theme={(theme) => ({
                  ...theme,
                  height: 26,
                  minHeight: 26,
                  borderRadius: 1,
                  colors: {
                    ...theme.colors,
                    primary: "black",
                  },
                })}
              />
            </div>
            <div className="col-lg-11 col-md-6 col-sm-6 col-12">
              <label className="label-control">Update Notes :</label>
              <textarea
                name="Instructions"
                id="Instructions"
                className="textarea form-control"
                rows="5"
                placeholder="Instructions"
                style={{ width: "100%" }}
                value={Instructions}
                onChange={(e) => onInputChange(e)}
                required
              ></textarea>
            </div>
          </div>

          <div
            className="row col-lg-12 col-md-11 col-sm-12 col-12 Savebutton no_padding"
            size="lg"
          >
            <div className="col-lg-8 col-md-6 col-sm-12 col-12">
              <label className="label-control colorRed">
                * Indicates mandatory fields,
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
                  value="Submit"
                  className="btn sub_form btn_continue blackbrd Save float-right"
                />
              )}
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

ChangeProjectLifeCycle.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(ChangeProjectLifeCycle);
