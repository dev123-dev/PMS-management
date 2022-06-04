import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "../layout/NotFound";

//user Section
import PrivateRoute from "./PrivateRoute";
import RouteDriver from "../dashboard/RouteDriver";

//DashBoard
import changePassword from "../auth/ChangePwd";
// staff
import AddEmployeeDetails from "../staffs/AddEmployeeDetails";
import AllStaffDetails from "../staffs/AllStaffDetails";
// client
import AddClientDetails from "../clients/AddClientDetails";
import EditClientDetails from "../clients/EditClientDetails";
import DeactivateClient from "../clients/DeactivateClient";
import AllClientDetails from "../clients/AllClientDetails";

// department
import AddDepartment from "../department/AddDepartment";
import EditDepartment from "../department/EditDepartment";
import DeactivateDepartment from "../department/DeactivateDepartment";
import AllDepartment from "../department/AllDepartment";

const RoutesFile = () => {
  return (
    <section>
      <Switch>
        {/* Staff */}
        <PrivateRoute exact path="/add-user" component={AddEmployeeDetails} />
        <PrivateRoute exact path="/all-staff" component={AllStaffDetails} />

        {/* clients */}
        <PrivateRoute exact path="/add-client" component={AddClientDetails} />
        <PrivateRoute exact path="/edit-client" component={EditClientDetails} />
        <PrivateRoute
          exact
          path="/deactivate-client"
          component={DeactivateClient}
        />
        <PrivateRoute exact path="/all-client" component={AllClientDetails} />

        {/* Department */}
        <PrivateRoute exact path="/add-department" component={AddDepartment} />
        <PrivateRoute
          exact
          path="/edit-department"
          component={EditDepartment}
        />
        <PrivateRoute
          exact
          path="/deactivate-department"
          component={DeactivateDepartment}
        />
        <PrivateRoute exact path="/all-department" component={AllDepartment} />

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
