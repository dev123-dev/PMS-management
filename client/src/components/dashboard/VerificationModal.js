import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { VerifyProject } from "../../actions/projects";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
const VerificationModal = ({
  auth: { isAuthenticated, user, users, loading },
  allVerifydata,
  searchData,
  VerifyProject,
  onEditModalChange,
}) => {
  //formData

  const [formData, setFormData] = useState({
    projectName:
      allVerifydata && allVerifydata.projectName
        ? allVerifydata.projectName
        : "",
    clientName:
      allVerifydata && allVerifydata.projectName
        ? allVerifydata.clientName
        : "",
    clientFolderName:
      allVerifydata && allVerifydata.projectName
        ? allVerifydata.clientFolderName
        : "",
    projectQuantity:
      allVerifydata && allVerifydata.projectName
        ? allVerifydata.projectQuantity
        : "",

    isSubmitted: false,
  });

  const { projectName, clientName, clientFolderName, projectQuantity } =
    formData;
  const [error1, setError1] = useState({
    nametypeIdChecker: false,
    nametypeIdErrorStyle: {},
  });
  const { nametypeIdChecker, nametypeIdErrorStyle } = error1;
  const onInputChange = (e) => {
    setError1({
      ...error1,
      nametypeIdChecker: true,
      nametypeIdErrorStyle: { color: "#000" },
    });

    setFormDatas({ ...addData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      recordId: allVerifydata ? allVerifydata._id : "",
      projectVerifiedById: user._id,
      searchData: searchData,
      billingData: AddedDetails,
    };
    VerifyProject(finalData);
    onEditModalChange(true);
  };
  // code for next previous tabing starts
  const [tabIndex, setTabIndex] = useState(0);

  const NextBackBtn = (tabIndex) => {
    setTabIndex(tabIndex);
  };
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
  const [addData, setFormDatas] = useState({
    qty: "",
    price: "",
    description: "",
  });

  const { qty, price, description } = addData;

  const [AddedDetails, AddDetails] = useState([]);

  const onAdd = (e) => {
    const staffList = AddedDetails.filter(
      (AddDetails) => AddDetails.qty === qty
    );
    e.preventDefault();
    if (staffList.length === 0) {
      if (checkErrorscontact()) {
        const addData = {
          qty: qty,
          price: price,
          description: description?.trim(),
        };
        setFormDatas({
          ...addData,
          qty: "",
          price: "",
          description: "",
        });
        let temp = [];
        temp.push(...AddedDetails, addData);
        AddDetails(temp);
      }
    }
  };

  const onRemoveChange = (qty) => {
    const removeList = AddedDetails.filter(
      (AddDetails) => AddDetails.qty !== qty
    );
    AddDetails(removeList);
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <section className="sub_reg">
        <Tabs selectedIndex={tabIndex}>
          <div className="row col-lg-11 col-md-11 col-sm-12 col-12">
            <TabList>
              <Tab tabfor="0">Project Info</Tab>
              <Tab tabfor="1">Verification Details</Tab>
            </TabList>
          </div>

          <TabPanel tabId="0">
            <div className=" col-md-12 col-lg-12 col-sm-12 col-12 ">
              <form onSubmit={(e) => NextBackBtn(1)}>
                <div className="col-lg-12 col-md-12 col-sm-12 col-12 ">
                  <div className="row card-new ">
                    <div className="col-lg-8 col-md-12 col-sm-12 col-12">
                      <label className="label-control">
                        Project Name : {projectName}
                      </label>
                    </div>
                    <div className="col-lg-8 col-md-12 col-sm-12 col-12">
                      <label className="label-control">
                        Client Name : {clientName}
                      </label>
                    </div>
                    <div className="col-lg-8 col-md-12 col-sm-12 col-12">
                      <label className="label-control">
                        Folder Name : {clientFolderName}
                      </label>
                    </div>

                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                      <input
                        type="submit"
                        name="submit"
                        value="Next"
                        className="btn sub_form btn_continue Save float-right"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </TabPanel>
          <TabPanel tabId="1">
            <div className="row col-md-12 col-lg-12 col-sm-12 col-12 ">
              <div className="col-lg-12 col-md-12 col-sm-12 col-12 ">
                <div className="row card-new ">
                  <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                    <label className="label-control">Total Qty :</label>
                    <input
                      type="number"
                      name="projectQuantity"
                      value={projectQuantity}
                      className="form-control"
                      disabled
                    />
                  </div>
                  <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                    <label
                      className="label-control"
                      style={nametypeIdErrorStyle}
                    >
                      {" "}
                      Qty :
                    </label>
                    <input
                      type="number"
                      name="qty"
                      value={qty}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>

                  <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                    <label className="label-control"> Price :</label>
                    <input
                      type="number"
                      name="price"
                      value={price}
                      className="form-control"
                      onChange={(e) => onInputChange(e)}
                    />
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                    <label className="label-control"> Description :</label>

                    <textarea
                      name="description"
                      id="description"
                      className="textarea form-control"
                      rows="3"
                      placeholder="Description"
                      style={{ width: "100%" }}
                      value={description}
                      onChange={(e) => onInputChange(e)}
                    ></textarea>
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
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {AddedDetails &&
                        AddedDetails.map((AddDetail, idx) => {
                          return (
                            <tr key={idx}>
                              <td>{AddDetail.qty}</td>
                              <td>{AddDetail.price}</td>
                              <td>{AddDetail.description}</td>

                              <td>
                                <img
                                  className="img_icon_size log"
                                  onClick={() => onRemoveChange(AddDetail.qty)}
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
              <form
                className="row col-lg-12 col-md-12 col-sm-12 col-12"
                onSubmit={(e) => onSubmit(e)}
              >
                <div className="col-lg-12 col-md-12 col-sm-12 col-12 py-3">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <input
                      type="submit"
                      name="Save"
                      value="Submit"
                      className="btn sub_form btn_continue Save float-right"
                    />
                    <button
                      className="btn sub_form btn_continue Save float-right"
                      onClick={() => NextBackBtn(0)}
                    >
                      Previous
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </TabPanel>
        </Tabs>
      </section>
    </Fragment>
  );
};

VerificationModal.propTypes = {
  auth: PropTypes.object.isRequired,
  VerifyProject: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  VerifyProject,
})(VerificationModal);
