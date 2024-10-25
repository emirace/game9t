import { Navigate, Outlet } from "react-router-dom";
import Header from "./_component/header";
import Sidebar from "./_component/sidebar";
import { useUser } from "../../context/user";
import Loading from "../_components/loading";

function Admin() {
  const { user, loading } = useUser();

  if (loading) {
    <div className="w-full h-screen flex justify-center items-center">
      <Loading />
    </div>;
  }
  if (user && user?.role !== "admin") {
    return <Navigate to="/profile" />;
  }

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
