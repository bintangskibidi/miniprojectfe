import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;