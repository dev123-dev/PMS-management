import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "../layout/NotFound";

//user Section
import PrivateRoute from "./PrivateRoute";
import RouteDriver from "../dashboard/RouteDriver";

//DashBoard
import DailyJobSheet from "../dashboard/DailyJobSheet";
import JobQueue from "../dashboard/JobQueue";
import AddProject from "../dashboard/AddProject";
import ChangeProjectLifeCycle from "../dashboard/ChangeProjectLifeCycle";
import AllLatestChange from "../dashboard/AllLatestChange";
import Chat from "../../pages/Chat";
import ProjectVerification from "../dashboard/ProjectVerification";
import Amendments from "../dashboard/Amendments";

//region
import AllArea from "../region/AllArea";
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

// Designation
import AddDesignation from "../department/AddDesignation";
import EditDesignation from "../department/EditDesignation";
import DeactiveDesignation from "../department/DeactiveDesignation";
import AllDesignation from "../department/AllDesignation";

//project
import AllProjectStatus from "../projects/AllProjectStatus";

//settings
import AllPaymentMethods from "../settings/AllPaymentMethods";
import AddPaymentMethod from "../settings/AddPaymentMethod";
import AllUserGroups from "../settings/AllUserGroups";
import changePassword from "../auth/ChangePwd";
import AllFeedback from "../settings/AllFeedback";
import Trash from "../settings/Trash";

const RoutesFile = () => {
  return (
    <section>
      <Switch>
        <PrivateRoute exact path="/daily-job-sheet" component={DailyJobSheet} />
        <PrivateRoute exact path="/chat" component={Chat} />
        <PrivateRoute exact path="/job-queue" component={JobQueue} />
        <PrivateRoute exact path="/job-queue" component={JobQueue} />
        <PrivateRoute
          exact
          path="/job-verification"
          component={ProjectVerification}
        />
        <PrivateRoute exact path="/all-Amendments" component={Amendments} />
        <PrivateRoute exact path="/all-Region" component={AllArea} />

        <PrivateRoute exact path="/add-project" component={AddProject} />
        <PrivateRoute
          exact
          path="/change-project-life-cycle"
          component={ChangeProjectLifeCycle}
        />
        <PrivateRoute
          exact
          path="/AllLatestChange"
          component={AllLatestChange}
        />
        {/* staff */}
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

        {/* Designation */}
        <PrivateRoute
          exact
          path="/add-designation"
          component={AddDesignation}
        />
        <PrivateRoute
          exact
          path="/edit-designation"
          component={EditDesignation}
        />
        <PrivateRoute
          exact
          path="/deactivate-designation"
          component={DeactiveDesignation}
        />
        <PrivateRoute
          exact
          path="/all-designation"
          component={AllDesignation}
        />
        <PrivateRoute exact path="/all-feedback" component={AllFeedback} />
        <PrivateRoute exact path="/all-trash" component={Trash} />
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
