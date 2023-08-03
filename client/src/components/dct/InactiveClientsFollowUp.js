import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useEffect, useRef, useState } from "react";
import Spinner from "../layout/Spinner";
import AllContacts from "./AllContacts";
import AllStatuschange from "./AllStatuschange";
import LastMessageDetails from "./LastMessageDetails";
import { getInactiveClientsFollowUp, getLastmessage } from "../../actions/dct";
import ClockTimeZone from "./ClockTimeZone";

const InactiveClientsFolowUp = ({
  auth: { isAuthenticated, user },
  dct: { dctInactiveClientsFollowUp, dctInactiveClientsLoading },
  getInactiveClientsFollowUp,
  getLastmessage,
}) => {
  const [selRowIdx, setSelRowIdx] = useState(null);
  const [searchDataVal, setsearchDataVal] = useState();
  const [selInactiveClient, setSelInactiveClient] = useState("");
  const [filterData, setFilterData] = useState("");

  const [showHide, setShowHide] = useState({
    showdateselectionSection: false,
  });

  const { showdateselectionSection } = showHide;

  const ondivcloseChange = (e) => {
    if (e) {
      handledivModalClose();
    }
  };

  const handledivModalClose = () => setShowHide(false);

  useEffect(() => {
    getInactiveClientsFollowUp();
  }, []);

  // Create a ref for the selected row
  const selectedRowRef = useRef(null);

  // Function to scroll the selected row into view
  const scrollToSelectedRow = () => {
    if (selectedRowRef.current) {
      selectedRowRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'start' });
    }
  };

  useEffect(() => {
    if (selRowIdx && (selRowIdx + 1) <= dctInactiveClientsFollowUp.length) {
      sethighlightTimeZone(dctInactiveClientsFollowUp && dctInactiveClientsFollowUp.length !== 0 && dctInactiveClientsFollowUp[selRowIdx].timezone ? dctInactiveClientsFollowUp[selRowIdx].timezone : "");
      setShowRegion(dctInactiveClientsFollowUp && dctInactiveClientsFollowUp.length !== 0 && dctInactiveClientsFollowUp[selRowIdx].countryName ? dctInactiveClientsFollowUp[selRowIdx].countryName : "")
      scrollToSelectedRow();
    } else {
      setShowRegion("");
      sethighlightTimeZone("");
    }
  }, [dctInactiveClientsFollowUp]);

  const [Region, setShowRegion] = useState("");
  const [highlightTimeZone, sethighlightTimeZone] = useState("");
  const onClickHandler = (dctInactiveClient, idx) => {
    setSelRowIdx(idx);
    sethighlightTimeZone(
      dctInactiveClient.timezone && dctInactiveClient.timezone !== ""
        ? dctInactiveClient.timezone
        : ""
    );
    setShowRegion(dctInactiveClient.countryName);
    setSelInactiveClient(dctInactiveClient);
    const searchData = {
      callToId: dctInactiveClient._id,
    };
    setsearchDataVal(searchData);
    getLastmessage(searchData);
    setShowHide({
      ...showHide,
      showdateselectionSection: true,
    });
  };

  const onClickReset = () => {
    setSelRowIdx();
    setShowRegion("");
    sethighlightTimeZone("");

    setSelInactiveClient("");
    getInactiveClientsFollowUp();

    selectedRowRef.current = null;
  }

  return !isAuthenticated || !user ? (
    <Spinner />
  ) : (
    <div className="container container_align_CT ">
      <section className="sub_reg">
        <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding">
          <div
            className="row col-lg-12 col-md-11 col-sm-10 col-10"
            style={{ minHeight: "54px" }}
          >
            <ClockTimeZone Region={Region} highlightTimeZone={highlightTimeZone} />
          </div>
          <div className=" col-lg-2 col-md-11 col-sm-10 col-10">
            <h4 className="heading_color">Inactive Client Follow Up</h4>
          </div>
          <div className="col-lg-3 col-md-11 col-sm-12 col-11 py-2">
            {
              dctInactiveClientsLoading ? (<img
                src={require("../../static/images/Refresh-Loader.gif")}
                alt="Loading..." />) : (<></>)
            }
            <button
              className="btn btn_green_bg float-right"
              onClick={() => onClickReset()}
            >
              {
                dctInactiveClientsLoading ? "Loading" : "Refresh"
              }
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 col-md-12 col-sm-12 col-12 text-center ">
            <section className="body">
              <div className=" body-inner no-padding table-responsive fixTableHeadCT">
                <table
                  className="table table-bordered table-striped hoverrow smll_row"
                  id="datatable2"
                >
                  <thead>
                    <tr>
                      <th style={{ width: "15%" }}>Company </th>
                      <th style={{ width: "13%" }}>Website </th>
                      <th style={{ width: "11%" }}>Email</th>
                      <th style={{ width: "8%" }}>Region</th>
                      <th style={{ width: "13%" }}>Contact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dctInactiveClientsFollowUp &&
                      dctInactiveClientsFollowUp.map(
                        (dctInactiveClient, idx) => {
                          return (
                            <tr
                              key={idx}
                              className={
                                selRowIdx === idx ? "seletedrowcolorchange" : ""
                              }
                              ref={selRowIdx === idx ? selectedRowRef : null}
                              onClick={() =>
                                onClickHandler(dctInactiveClient, idx)
                              }
                            >
                              <td>{dctInactiveClient.companyName}</td>
                              <td>
                                <a
                                  href={dctInactiveClient.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {dctInactiveClient.website}
                                </a>
                              </td>
                              <td>{dctInactiveClient.emailId}</td>
                              <td>{dctInactiveClient.countryName}</td>
                              <td>
                                {dctInactiveClient.countryCode
                                  ? "+" + dctInactiveClient.countryCode
                                  : ""}
                                &nbsp;
                                {dctInactiveClient.phone1}
                              </td>
                            </tr>
                          );
                        }
                      )}
                  </tbody>
                </table>
              </div>
              <div className="row">
                <div className="col-lg-12 col-md-6 col-sm-11 col-11 align_right ">
                  No of Inactive Clients Follow Up :{" "}
                  {dctInactiveClientsFollowUp.length}
                </div>
              </div>
            </section>
          </div>
          <div className="row col-lg-4 col-md-12 col-sm-12 col-12 fixTableHead">
            <div className=" col-lg-12 col-md-6 col-sm-6 col-12 card-new no_padding sidePartHeight">
              <div className="col-lg-12 col-md-12 col-sm-12 col-12 no_padding ">
                <AllContacts
                  leadDataVal={selInactiveClient}
                  ondivcloseChange={ondivcloseChange}
                  from="InactiveClient"
                  filterData={filterData}
                  showdateselectionSection={showdateselectionSection}
                />
              </div>
            </div>
            <div className=" col-lg-12 col-md-6 col-sm-6 col-12 card-new no_padding statusTop">
              <div
                className="col-lg-12 col-md-12 col-sm-12 col-12 no_padding "
                style={{ height: "33vh" }}
              >
                <label className="sidePartHeading ">Status</label>
                {showdateselectionSection && (
                  <AllStatuschange
                    leadDataVal={selInactiveClient}
                    from="InactiveClient"
                    ondivcloseChange={ondivcloseChange}
                    filterData={filterData}
                  />
                )}
              </div>
            </div>
            <div className=" col-lg-12 col-md-6 col-sm-6 col-12 card-new no_padding lastMessage">
              <div
                className="col-lg-12 col-md-12 col-sm-12 col-12 no_padding "
                style={{ height: "18vh" }}
              >
                <label className="sidePartHeading ">Last Call History</label>
                {showdateselectionSection && (
                  <LastMessageDetails
                    from="InactiveClient"
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
  );
};

InactiveClientsFolowUp.propTypes = {
  auth: PropTypes.object.isRequired,
  dct: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  dct: state.dct,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getInactiveClientsFollowUp,
  getLastmessage,
})(InactiveClientsFolowUp);
