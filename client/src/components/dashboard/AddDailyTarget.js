import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import Spinner from "../layout/Spinner";
import { Redirect } from "react-router-dom";
import { Link, useHistory } from "react-router-dom";
import { getALLTeams } from "../../actions/settings";
const AddDailyTarget = ({
  auth: { isAuthenticated, user, users, loading },
  settings: { activeTeams },
  getALLTeams,
}) => {
  const data = useHistory().location.data;
  useEffect(() => {
    getALLTeams();
  }, [getALLTeams]);
  //formData
  const [formData, setFormData] = useState({
    projectName:
      data && data.targetdata && data.targetdata.projectName
        ? data.targetdata.projectName
        : "",
    projectQuantity:
      data && data.targetdata && data.targetdata.projectQuantity
        ? data.targetdata.projectQuantity
        : "",

    isSubmitted: false,
  });

  const { projectName, projectQuantity, isSubmitted } = formData;
  const targetTypeVal = [
    { value: "Day", label: "Day" },
    { value: "Night", label: "Night" },
  ];
  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const allactiveTeams = [];
  activeTeams.map((teams) =>
    allactiveTeams.push({
      teamId: teams._id,
      label: teams.teamName,
      value: teams.teamName,
    })
  );
  const [teams, getteamsData] = useState("");
  const [teamsId, setteamsId] = useState("");
  const [teamsName, setteamsname] = useState("");
  const onTeamChange = (e) => {
    //Required Validation starts
    // setError({
    //   ...error,
    //   paymentmodeIdChecker: true,
    //   paymentmodeIdErrorStyle: { color: "#000" },
    // });
    //Required Validation ends

    var teamsId = "";
    var teamsName = "";
    getteamsData(e);
    teamsId = e.teamsId;
    teamsName = e.value;

    setteamsId(teamsId);
    setteamsname(teamsName);

    setFormDatas({
      ...addData,
      teamsName: teamsName,
    });
  };
  const onTargetChange = (e) => {
    //Required Validation starts
    // setError({
    //   ...error,
    //   ClientIdChecker: true,
    //   ClientErrorStyle: { color: "#000" },
    // });
    //Required Validation ends
    if (e) {
      setFormDatas({
        ...addData,
        targetType: e,
      });
    }
  };
  const onInputChange1 = (e) => {
    setError1({
      ...error1,
      nametypeIdChecker: true,
      nametypeIdErrorStyle: { color: "#000" },
    });
    setFormDatas({ ...addData, [e.target.name]: e.target.value });
  };

  const handleOnChange = () => {
    setFormDatas({
      ...addData,
      isChecked: !isChecked,
    });
  };
  const [addData, setFormDatas] = useState({
    isChecked: false,
    staffName: "",
    estimatedTime: "",
    targetType: "",
    qty: "",
  });

  const { staffName, estimatedTime, targetType, qty, isChecked } = addData;

  const [error1, setError1] = useState({
    nametypeIdChecker: false,
    nametypeIdErrorStyle: {},
  });
  const { nametypeIdChecker, nametypeIdErrorStyle } = error1;
  const checkErrorscontact = () => {
    if (!nametypeIdChecker) {
      setError1({
        ...error1,
        nametypeIdErrorStyle: { color: "#F00" },
      });
      return false;
    }

    return true;
  };
  const [AddedDetails, AddDetails] = useState([]);
  const onAdd = (e) => {
    // const projectList = AddedDetails.filter(
    //   (AddDetails) => AddDetails.staffName === staffName
    // );

    // e.preventDefault();
    // if (projectList.length === 0) {
    //   if (checkErrorscontact()) {
    const addData = {
      staffName: staffName.charAt(0).toUpperCase() + staffName.slice(1),
      estimatedTime: estimatedTime,
      targetType: targetType.value,
      qty: qty,
      teamsName: teamsName,
      teamsId: teamsId,
      isChecked: isChecked,
    };

    setFormDatas({
      ...addData,
      staffName: "",
      estimatedTime: "",
      targetType: "",
      qty: "",
      teamsName: "",
      teamsId: "",
      payment: "",
      isChecked: false,
    });
    getteamsData("");
    setteamsId("");
    setteamsname("");
    let temp = [];
    temp.push(...AddedDetails, addData);
    AddDetails(temp);
    //   }
    // }
  };

  const onRemoveChange = (staffName) => {
    const removeList = AddedDetails.filter(
      (AddDetails) => AddDetails.staffName !== staffName
    );
    AddDetails(removeList);
  };

  if (!data) {
    return <Redirect to="/job-queue" />;
  }
  return !isAuthenticated || !user ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align">
        {/* <form className="row" onSubmit={(e) => onSubmit(e)}> */}

        <section className="sub_reg">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <h3 className="heading_color">Add Daily Target</h3>
          </div>
          <div className="row col-lg-12 col-md-11 col-sm-12 col-12 ">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12 ">
              <div className="row card-new ">
                <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                  <label className="label-control">Project Name:</label>
                  <input
                    type="text"
                    name="projectName"
                    value={projectName}
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                    disabled
                  />
                </div>

                <div className="col-lg-1 col-md-6 col-sm-6 col-12">
                  <label className="label-control">Total Qty* :</label>
                  <input
                    type="number"
                    name="projectQuantity"
                    value={projectQuantity}
                    className="form-control"
                    onChange={(e) => onInputChange(e)}
                    onKeyDown={(e) =>
                      (e.keyCode === 69 || e.keyCode === 190) &&
                      e.preventDefault()
                    }
                    disabled
                  />
                </div>
                <div className="col-lg-1 col-md-6 col-sm-6 col-12">
                  <label
                    className="label-control"
                    // style={StateErrorStyle}
                  >
                    Estimated Qty :
                  </label>
                  <input
                    type="number"
                    name="qty"
                    value={qty}
                    className="form-control"
                    onChange={(e) => onInputChange1(e)}
                    required
                  />
                </div>
                <div className="col-lg-1 col-md-6 col-sm-6 col-12">
                  <label className="label-control">Remaining Qty :</label>
                  <input
                    type="number"
                    // name="Remaining"
                    // value={Remaining}
                    className="form-control"
                    disabled
                  />
                </div>

                <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                  <label className="label-control">Assigned To:</label>
                  <Select
                    name="teamName"
                    options={allactiveTeams}
                    isSearchable={true}
                    value={teams}
                    placeholder="Select Team"
                    onChange={(e) => onTeamChange(e)}
                  />
                </div>

                <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                  <label className="label-control">Target Set For:</label>
                  <Select
                    name="targetType"
                    isSearchable={true}
                    options={targetTypeVal}
                    value={targetType}
                    placeholder="Select"
                    onChange={(e) => onTargetChange(e)}
                  />
                </div>

                <div className="col-lg-1 col-md-6 col-sm-6 col-12">
                  <label className="label-control">Estimated Time :</label>
                  <input
                    type="time"
                    name="estimatedTime"
                    value={estimatedTime}
                    className="form-control"
                    min="00:00"
                    max="24:00"
                    onChange={(e) => onInputChange1(e)}
                    // required
                  />
                </div>
                <div className="col-lg-1 col-md-6 col-sm-6 col-12">
                  <label className="label-control">Effect JobQueue :</label>
                  <input
                    type="checkbox"
                    id="Unconfirmed"
                    onChange={handleOnChange}
                  />
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <button
                    variant="success"
                    className="btn sub_form btn_continue Save float-right"
                    onClick={(e) => onAdd(e)}
                  >
                    Add
                  </button>
                </div>
                <div className="col-lg-12 col-md-6 col-sm-6 col-12 py-2"></div>
              </div>
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 col-12 py-3">
              <div className="row card-new">
                <table
                  className="tabllll table table-bordered table-striped table-hover"
                  id="datatable2"
                >
                  <thead>
                    <tr>
                      <th>Assigned To</th>
                      <th>Target for</th>
                      <th>Estimated Qty</th>
                      <th>Effected</th>
                      <th>Estimated Time</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {AddedDetails &&
                      AddedDetails.map((AddDetail, idx) => {
                        return (
                          <tr key={idx}>
                            <td>{AddDetail.teamsName}</td>
                            <td>{AddDetail.targetType}</td>
                            <td>{AddDetail.qty}</td>
                            <td>{AddDetail.isChecked}</td>
                            <td>{AddDetail.estimatedTime}</td>
                            <td>
                              <img
                                className="img_icon_size log"
                                onClick={() =>
                                  onRemoveChange(AddDetail.staffName)
                                }
                                src={require("../../static/images/close-buttonRed.png")}
                                alt="Remove"
                                title="Remove"
                              />
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div
            className="row col-lg-12 col-md-11 col-sm-12 col-12 Savebutton no_padding"
            size="lg"
          >
            <div className="col-lg-8 col-md-6 col-sm-12 col-12">
              <label className="label-control colorRed">
                * Indicates mandatory fields, Please fill mandatory fields
                before Submit
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
              <Link
                className="btn sub_form btn_continue blackbrd float-right"
                to="/job-queue"
              >
                Cancel
              </Link>
            </div>
          </div>
        </section>
        {/* </form> */}
      </div>
    </Fragment>
  );
};

AddDailyTarget.propTypes = {
  auth: PropTypes.object.isRequired,

  settings: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  regions: PropTypes.object.isRequired,
  dct: PropTypes.object.isRequired,
  sct: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  settings: state.settings,
  client: state.client,
  regions: state.regions,
  dct: state.dct,
  sct: state.sct,
});

export default connect(mapStateToProps, { getALLTeams })(AddDailyTarget);
