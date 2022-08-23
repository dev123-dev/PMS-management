import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Select from "react-select";
import { Link } from "react-router-dom";
import {
  getDctClientDetails,
  getDctClientDetailsDD,
  getLastmessage,
} from "../../actions/dct";
import AllContacts from "./AllContacts";
import AllStatuschange from "./AllStatuschange";
import LastMessageDetails from "./LastMessageDetails";
import { getActiveCountry } from "../../actions/regions";

// import DeactiveLead from "./DeactiveLead";
const TestClientFollowup = ({
  auth: { isAuthenticated, user, users },
  dct: { dctClients, dctClientsDD },
  regions: { activeCountry },
  getDctClientDetails,
  getDctClientDetailsDD,
  getActiveCountry,
  getLastmessage,
}) => {
  useEffect(() => {
    getDctClientDetails({ dctClientCategory: "TC" });
  }, [getDctClientDetails]);
  useEffect(() => {
    getDctClientDetailsDD({ dctClientCategory: "TC" });
  }, [getDctClientDetailsDD]);
  useEffect(() => {
    getActiveCountry({ countryBelongsTo: "DCT" });
  }, []);

  const [filterData, setFilterData] = useState({ dctClientCategory: "TC" });

  const [searchDataVal, setsearchDataVal] = useState();
  const [leadData, setLeadData] = useState();
  const onClickHandler = (dctClients, idx) => {
    setLeadData(dctClients);

    const searchData = {
      callToId: dctClients._id,
    };
    setsearchDataVal(searchData);
    getLastmessage(searchData);
    setShowHide({
      ...showHide,
      showdateselectionSection: true,
    });
  };

  const [showHide, setShowHide] = useState({
    showdateselectionSection: false,
  });

  const { showdateselectionSection } = showHide;
  const handledivModalClose = () => setShowHide(false);
  const ondivcloseChange = (e) => {
    if (e) {
      handledivModalClose();
    }
  };
  const allcountry = [];
  activeCountry.map((country) =>
    allcountry.push({
      countryId: country._id,
      label: country.countryName,
      value: country.countryName,
    })
  );

  const [country, getcountryData] = useState();
  const [countryId, getcountryIdData] = useState(null);

  const oncountryChange = (e) => {
    getcountryData(e);
    getclientsData("");
    getcountryIdData(e.countryId);
    getDctClientDetails({ countryId: e.countryId, dctClientCategory: "TC" });
    getDctClientDetailsDD({ countryId: e.countryId, dctClientCategory: "TC" });
    setFilterData({ countryId: e.countryId, dctClientCategory: "TC" });
  };

  const allclient = [];
  dctClientsDD.map((clients) =>
    allclient.push({
      clientsId: clients._id,
      label: clients.companyName,
      value: clients.companyName,
    })
  );
  const [clients, getclientsData] = useState();
  const onclientsChange = (e) => {
    getclientsData(e);
    getDctClientDetails({
      countryId: countryId,
      clientsId: e.clientsId,
      dctClientCategory: "TC",
    });
    setFilterData({
      countryId: countryId,
      clientsId: e.clientsId,
      dctClientCategory: "TC",
    });
  };

  const onClickReset = () => {
    getcountryData("");
    getclientsData("");
    getDctClientDetails({ dctClientCategory: "TC" });
    getDctClientDetailsDD({ dctClientCategory: "TC" });
    setFilterData({ dctClientCategory: "TC" });
    ondivcloseChange(true);
  };
  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container container_align ">
        <section className="sub_reg">
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
            <div className=" col-lg-2 col-md-11 col-sm-10 col-10">
              <h5 className="heading_color">Test Client FollowUp</h5>
            </div>
            <div className=" col-lg-2 col-md-11 col-sm-10 col-10 py-2">
              <Select
                name="countryName"
                options={allcountry}
                isSearchable={true}
                value={country}
                placeholder="Select Region"
                onChange={(e) => oncountryChange(e)}
                required
              />
            </div>

            <div className=" col-lg-2 col-md-11 col-sm-10 col-10 py-2">
              <Select
                name="companyName"
                options={allclient}
                isSearchable={true}
                value={clients}
                placeholder="Select Lead"
                onChange={(e) => onclientsChange(e)}
                required
              />
            </div>
            <div className="col-lg-6 col-md-11 col-sm-12 col-11 py-3">
              <button
                className="btn btn_green_bg float-right"
                onClick={() => onClickReset()}
              >
                Refresh
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 col-md-12 col-sm-12 col-12 text-center ">
              <section className="body">
                <div className=" body-inner no-padding table-responsive fixTableHead">
                  <table
                    className="table table-bordered table-striped table-hover smll_row"
                    id="datatable2"
                  >
                    <thead>
                      <tr>
                        <th style={{ width: "10%" }}>Sl.No</th>
                        <th style={{ width: "6%" }}>Company </th>
                        <th style={{ width: "15%" }}>Website </th>
                        <th style={{ width: "13%" }}>Email</th>
                        <th style={{ width: "13%" }}>Region</th>
                        <th style={{ width: "13%" }}>Contact</th>
                        <th style={{ width: "13%" }}>Call Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dctClients &&
                        dctClients.map((dctClients, idx) => {
                          var callDates = "";
                          if (dctClients.dctCallDate) {
                            var ED = dctClients.dctCallDate.split(/\D/g);
                            callDates = [ED[2], ED[1], ED[0]].join("-");
                          }
                          return (
                            <tr key={idx}>
                              <td>{idx + 1}</td>
                              <td>
                                {" "}
                                <Link
                                  className="float-left ml-3"
                                  to="#"
                                  onClick={() =>
                                    onClickHandler(dctClients, idx)
                                  }
                                >
                                  {dctClients.companyName}
                                </Link>
                              </td>
                              <td>{dctClients.website}</td>
                              <td>{dctClients.emailId}</td>
                              <td>{dctClients.countryName}</td>
                              <td>{dctClients.phone1}</td>
                              <td>{callDates}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
            <div className="row col-lg-4 col-md-12 col-sm-12 col-12 ">
              <div className=" col-lg-12 col-md-6 col-sm-6 col-12 card-new no_padding sidePartHeight">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12 no_padding ">
                  {/* <label className="sidePartHeading ">Contacts</label>
                  {showdateselectionSection && ( */}
                  <AllContacts
                    leadDataVal={leadData}
                    from="client"
                    ondivcloseChange={ondivcloseChange}
                    filterData={filterData}
                    showdateselectionSection={showdateselectionSection}
                  />
                  {/* )} */}
                </div>
              </div>
              <div className=" col-lg-12 col-md-6 col-sm-6 col-12 card-new  no_padding ">
                <div
                  className="col-lg-12 col-md-12 col-sm-12 col-12 no_padding "
                  style={{ height: "30vh" }}
                >
                  <label className="sidePartHeading ">Status</label>
                  {showdateselectionSection && (
                    <AllStatuschange
                      leadDataVal={leadData}
                      from="TestClient"
                      ondivcloseChange={ondivcloseChange}
                      filterData={filterData}
                    />
                  )}
                </div>
              </div>
              <div className=" col-lg-12 col-md-6 col-sm-6 col-12 card-new no_padding ">
                <div
                  className="col-lg-12 col-md-12 col-sm-12 col-12 no_padding "
                  style={{ height: "23vh" }}
                >
                  <label className="sidePartHeading ">
                    Last Message Details
                  </label>
                  {showdateselectionSection && (
                    <LastMessageDetails
                      searchDataVal={searchDataVal}
                      ondivcloseChange={ondivcloseChange}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

TestClientFollowup.propTypes = {
  auth: PropTypes.object.isRequired,
  dct: PropTypes.object.isRequired,
  regions: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  dct: state.dct,
  regions: state.regions,
});

export default connect(mapStateToProps, {
  getDctClientDetails,
  getDctClientDetailsDD,
  getActiveCountry,
  getLastmessage,
})(TestClientFollowup);
