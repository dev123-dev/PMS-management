import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "../layout/NotFound";

//user Section
import PrivateRoute from "./PrivateRoute";
import RouteDriver from "../dashboard/RouteDriver";

//DashBoard
import changePassword from "../auth/ChangePwd";
import AddEmployeeDetails from "../staffs/AddEmployeeDetails";
import AllStaffDetails from "../staffs/AllStaffDetails";
const RoutesFile = () => {
  return (
    <section>
      <Switch>
        <PrivateRoute exact path="/add-staff" component={AddEmployeeDetails} />
        <PrivateRoute exact path="/all-staff" component={AllStaffDetails} />

        <PrivateRoute
          exact
          path="/change-password"
          component={changePassword}
        />
        <PrivateRoute exact path="/route-driver" component={RouteDriver} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default RoutesFile;
