import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../context/user";
import Loading from "../_components/loading";

function Protected() {
  const { user, loading } = useUser();
  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  return <Outlet />;
}

export default Protected;
