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
import AllCompany from "../settings/AllCompany";
import AddCompany from "../settings/AddCompany";
//dct
import EditDctClients from "../dct/EditDctClients";
import AllDctClients from "../dct/AllDctClients";
import AddDctClients from "../dct/AddDctClients";
import AllLeads from "../dct/AllLeads";
import AllProspects from "../dct/AllProspects";
import Allfollowup from "../dct/Allfollowup";
import TestClientFollowup from "../dct/TestClientFollowup";
import RegularClientFollowup from "../dct/RegularClientFollowup";
import AddLead from "../dct/AddLead";
import EditLead from "../dct/EditLead";
import DeactiveLead from "../dct/DeactiveLead";
import Amendments from "../dashboard/Amendments";
import DctCallsHistory from "../dct/DctCallsHistory";
//leavemanagement
import AllLeave from "../leave/AllLeave";

//region
import AllArea from "../region/AllArea";

//sct
import AllSctLeads from "../sct/AllSctLeads";
import AddSctLeads from "../sct/AddSctLeads";
import AllSctProspects from "../sct/AllSctProspects";
import AllSctFollowup from "../sct/AllSctFollowup";
import AllSctProjects from "../sct/AllSctProjects";
import AllDemos from "../sct/AllDemos";
import SctCallsHistory from "../sct/SctCallsHistory";
import AllEngagedClient from "../sct/AllEngagedClient";
import GenerateSctQuotation from "../sct/GenerateSctQuotation";
import GenerateInvoiceEngagedClient from "../sct/GenerateInvoiceEngagedClient";
import SctQuotationpdfprint from "../sct/SctQuotationpdfprint";
import AllSctRegularClients from "../sct/AllSctRegularClients";
import GeneratePo from "../sct/GeneratePo";
import SctPopdfPrint from "../sct/SctPopdfPrint";
import AllSctDocuments from "../sct/AllSctDocuments";
import GenerateInvoice from "../sct/GenerateInvoice";
const RoutesFile = () => {
  return (
    <section>
      <Switch>
        <PrivateRoute exact path="/daily-job-sheet" component={DailyJobSheet} />
        <PrivateRoute exact path="/chat" component={Chat} />
        <PrivateRoute exact path="/job-queue" component={JobQueue} />
        <PrivateRoute exact path="/job-queue" component={JobQueue} />
        <PrivateRoute exact path="/all-prospects" component={AllProspects} />
        <PrivateRoute exact path="/all-followup" component={Allfollowup} />
        <PrivateRoute
          exact
          path="/test-client-followup"
          component={TestClientFollowup}
        />
        <PrivateRoute exact path="/all-leads" component={AllLeads} />
        <PrivateRoute exact path="/all-leads" component={AllLeads} />
        <PrivateRoute exact path="/add-dct-client" component={AddDctClients} />
        <PrivateRoute exact path="/all-dct-client" component={AllDctClients} />
        <PrivateRoute
          exact
          path="/edit-dct-client"
          component={EditDctClients}
        />
        <PrivateRoute exact path="/dct-calls" component={DctCallsHistory} />
        <PrivateRoute
          exact
          path="/regular-client-followup"
          component={RegularClientFollowup}
        />
        {/* SCT */}
        <PrivateRoute exact path="/all-sct-leads" component={AllSctLeads} />
        <PrivateRoute exact path="/add-sct-lead" component={AddSctLeads} />
        <PrivateRoute
          exact
          path="/all-sct-prospects"
          component={AllSctProspects}
        />
        <PrivateRoute
          exact
          path="/all-sct-followup"
          component={AllSctFollowup}
        />
        <PrivateRoute
          exact
          path="/all-sct-projects"
          component={AllSctProjects}
        />
        <PrivateRoute exact path="/sct-calls" component={SctCallsHistory} />
        <PrivateRoute
          exact
          path="/all-engaged-clients"
          component={AllEngagedClient}
        />
        <PrivateRoute
          exact
          path="/all-regular-clients"
          component={AllSctRegularClients}
        />

        <PrivateRoute
          exact
          path="/all-invoice-engaged-client"
          component={GenerateInvoiceEngagedClient}
        />
        <PrivateRoute
          exact
          path="/print-pdf"
          component={SctQuotationpdfprint}
        />
        <PrivateRoute exact path="/print-PO-pdf" component={SctPopdfPrint} />
        <PrivateRoute
          exact
          path="/all-sct-documents"
          component={AllSctDocuments}
        />
        <PrivateRoute
          exact
          path="/generate-quotation"
          component={GenerateSctQuotation}
        />

        <PrivateRoute exact path="/generate-PO" component={GeneratePo} />
        <PrivateRoute
          exact
          path="/generate-Invoice"
          component={GenerateInvoice}
        />

        <PrivateRoute exact path="/all-demo" component={AllDemos} />

        <PrivateRoute exact path="/add-lead" component={AddLead} />
        <PrivateRoute exact path="/edit-lead" component={EditLead} />
        <PrivateRoute exact path="/deactive-lead" component={DeactiveLead} />
        <PrivateRoute exact path="/all-leave" component={AllLeave} />
        <PrivateRoute exact path="/all-Amendments" component={Amendments} />
        <PrivateRoute exact path="/all-Region" component={AllArea} />
        <PrivateRoute
          exact
          path="/job-verification"
          component={ProjectVerification}
        />
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
        <PrivateRoute exact path="/all-Amendments" component={Amendments} />
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
        <PrivateRoute exact path="/all-company" component={AllCompany} />
        <PrivateRoute exact path="/add-company" component={AddCompany} />
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
