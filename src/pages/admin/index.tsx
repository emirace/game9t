import { Outlet } from "react-router-dom";
import Header from "./_component/header";
import Sidebar from "./_component/sidebar";

function Admin() {
  return (
    <div className=" text-white bg-dark_blue font-roboto text-sm md:text-base h-screen overflow-hidden">
      <Header />
      <div className="flex gap-4 h-full">
        <div className="flex-1">
          <Sidebar />
        </div>
        <div className="flex-[4] p-4 pb-20 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Admin;
