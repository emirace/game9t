import { useMemo } from "react";
import { Navigate, Outlet, useSearchParams } from "react-router-dom";
import { useUser } from "../../context/user";

function Auth() {
  const { user } = useUser();
  const [searchParam] = useSearchParams();
  const redirectUrl = useMemo(() => searchParam.get("redirect"), [searchParam]);

  if (user) {
    return <Navigate to={redirectUrl ? `/${redirectUrl}` : "/"} />;
  }
  return (
    <div className="text-white bg-dark_blue font-roboto text-sm md:text-base ">
      <Outlet />
    </div>
  );
}

export default Auth;
