import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Spinner from "../layout/Spinner";
import { Modal } from "react-bootstrap";
import ClientCallHistory from "./ClientCallHistory";
const LastMessageDetails = ({
  auth: { isAuthenticated, user, users, loading },
  //   AddState,
}) => {
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

  const [showClientHistoryModal, setShowClientCallHistoryModal] =
    useState(false);
  const handleClientCallHistoryModalClose = () =>
    setShowClientCallHistoryModal(false);

  const onClientCallHistoryModalChange = (e) => {
    if (e) {
      handleClientCallHistoryModalClose();
    }
  };
  const onClickHandler = () => {
    setShowClientCallHistoryModal(true);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const finalData = {};
    console.log(finalData);
    // AddState(finalData);
    setFormData({
      isSubmitted: true,
    });
  };

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="col-lg-12 col-md-12 col-sm-12 col-12 ">
        <input
          type="submit"
          name="submit"
          value="History"
          // onClick={() => onClickHandler()}
          className="btn sub_form btn_continue blackbrd float-right"
        />
      </div>
    </Fragment>
  );
};

LastMessageDetails.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  //   AddState,
})(LastMessageDetails);
