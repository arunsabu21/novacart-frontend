import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

function AdminLayout() {
  return (
    <div>
      <AdminSidebar />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
