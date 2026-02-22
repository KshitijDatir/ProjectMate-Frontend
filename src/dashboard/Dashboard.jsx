import { useState } from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";
import OutgoingRequests from "./OutgoingRequests";
import IncomingRequests from "./IncomingRequests";

function Dashboard() {
  const [activeView, setActiveView] = useState("outgoing");

  return (
    <>
      <DashboardNavbar />

      <div className="dashboard-layout">
        <DashboardSidebar
          activeView={activeView}
          onChange={setActiveView}
        />

        <div className="dashboard-content-wrapper">
          <div className="dashboard-content-inner">
            {activeView === "outgoing" && <OutgoingRequests />}
            {activeView === "incoming" && <IncomingRequests />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;