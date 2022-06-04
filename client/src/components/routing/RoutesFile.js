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
import EditEmployeeDetails from "../staffs/EditEmployeeDetails";
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

//project
import AllProjectStatus from "../projects/AllProjectStatus";

//settings
import AllPaymentMethods from "../settings/AllPaymentMethods";
import AddPaymentMethod from "../settings/AddPaymentMethod";
import AllUserGroups from "../settings/AllUserGroups";
const RoutesFile = () => {
  return (
    <section>
      <Switch>
        <PrivateRoute exact path="/add-staff" component={AddEmployeeDetails} />
        <PrivateRoute exact path="/all-staff" component={AllStaffDetails} />
        <PrivateRoute
          exact
          path="/edit-staff"
          component={EditEmployeeDetails}
        />

        {/* clients */}

        <PrivateRoute exact path="/all-clients" component={AllClientDetails} />
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
        {/* Project Status */}
        <PrivateRoute
          exact
          path="/all-project-status"
          component={AllProjectStatus}
        />

        {/* payment methods */}
        <PrivateRoute
          exact
          path="/all-payment-methods"
          component={AllPaymentMethods}
        />
        <PrivateRoute
          exact
          path="/add-payment-method"
          component={AddPaymentMethod}
        />

        <PrivateRoute exact path="/all-usergroups" component={AllUserGroups} />

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
