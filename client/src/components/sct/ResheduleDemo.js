import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateDemo } from "../../actions/sct";
import Spinner from "../layout/Spinner";

const ResheduleDemo = ({
  auth: { isAuthenticated, user, users },
  updateDemo,
  allDemos,
  onResheduleModalChange,
}) => {
  //   console.log("allDemo", allDemos);
  //DATE START
  var todayDateymd = new Date().toISOString().split("T")[0];
  //for next month
  var d = new Date(todayDateymd);
  d.setMonth(d.getMonth() + 1);
  var nextmonth = d.toISOString().split("T")[0];
  //for next year
  var d1 = new Date(todayDateymd);
  d1.setFullYear(d1.getFullYear() + 1);
  var nextyear = d1.toISOString().split("T")[0];
  //next day
  var d2 = new Date(todayDateymd);
  d2.setDate(d2.getDate() + 1);
  var nextday = d2.toISOString().split("T")[0];
  //less than today
  var d3 = new Date(todayDateymd);
  d3.setDate(d3.getDate());
  var todaydate = d3.toISOString().split("T")[0];
  //DATE ENDS

  const [newDemoDate, setdemoDate] = useState("");
  const onDateChange1 = (e) => {
    setdemoDate(e.target.value);
  };
  const [formData, setFormData] = useState({
    toTime: "",
    fromTime: "",
    isSubmitted: false,
  });
  const { toTime, fromTime } = formData;

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onUpdate = (e) => {
    e.preventDefault();
    const finalData = {
      recordId: allDemos ? allDemos._id : "",
      demoDate: allDemos ? allDemos.demoDate : "",
      newDemoDate: newDemoDate,
      fromTime: fromTime,
      toTime: toTime,
    };
    // console.log(finalData);
    updateDemo(finalData);
    onResheduleModalChange(true);
  };
  var demoDate = "";
  if (allDemos && allDemos.demoDate) {
    var ED = allDemos && allDemos.demoDate.split(/\D/g);
    demoDate = [ED[2], ED[1], ED[0]].join("-");
  }

  return !isAuthenticated || !user || !users ? (
    <Spinner />
  ) : (
    <Fragment>
      <section className="sub_reg">
        <form className="row" onSubmit={(e) => onUpdate(e)}>
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding ">
            <div className=" col-lg-4 col-md-12 col-sm-12 col-12 ">
              <>
                <label className="label-control">
                  Company Name: &nbsp;
                  {allDemos &&
                    allDemos.clientDetails &&
                    allDemos.clientDetails.sctCompanyName}
                </label>
              </>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 col-12">
              <label className="label-control">
                Staff : &nbsp;
                {allDemos &&
                  allDemos.clientDetails &&
                  allDemos.clientDetails.sctCallToStaffName}
              </label>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 col-12">
              <label className="label-control">
                Prev. Demo Date : {demoDate}
              </label>
            </div>
          </div>
          <div className="row col-lg-12 col-md-12 col-sm-12 col-12 no_padding ">
            <div className=" col-lg-4 col-md-12 col-sm-12 col-12 ">
              <>
                <label className="label-control">Demo Date</label>
                <input
                  type="date"
                  placeholder="dd/mm/yyyy"
                  className="form-control cpp-input datevalidation"
                  name="demoDate"
                  min={todaydate}
                  value={newDemoDate}
                  onChange={(e) => onDateChange1(e)}
                  style={{
                    width: "100%",
                  }}
                  required
                />
              </>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 col-12">
              <label className="label-control">From* :</label>

              <input
                type="time"
                className="form-control"
                name="fromTime"
                value={fromTime}
                min="00:00"
                max="24:00"
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 col-12">
              <label className="label-control">To* :</label>

              <input
                type="time"
                className="form-control"
                name="toTime"
                value={toTime}
                min="00:00"
                max="24:00"
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
          </div>

          <div
            className="col-lg-12 col-md-12 col-sm-12 col-12 Savebutton py-5"
            size="lg"
          >
            <input
              type="submit"
              name="Submit"
              value="Submit"
              className="btn sub_form btn_continue blackbrd Save float-right"
            />
          </div>
        </form>
      </section>
    </Fragment>
  );
};

ResheduleDemo.propTypes = {
  auth: PropTypes.object.isRequired,

  updateDemo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  shg: state.shg,
  updateDemo,
});

export default connect(mapStateToProps, {
  updateDemo,
})(ResheduleDemo);
