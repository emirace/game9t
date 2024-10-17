import { Outlet } from "react-router-dom";

function Auth() {
  return (
    <div className="text-white bg-dark_blue font-roboto text-sm md:text-base ">
      <Outlet />
    </div>
  );
}

export default Auth;
