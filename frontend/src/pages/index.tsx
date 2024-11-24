import { Outlet } from "react-router-dom";
import Header from "./_components/header";
import Footer from "./_components/footer";
// import Newsletter from "./_components/newsletter";

function Layout() {
  return (
    <div
      className="text-white bg-dark_blue font-roboto text-sm md:text-base "
      style={{ fontSize: "var(--font-size)" }}
    >
      <Header />
      <Outlet />
      <div className="h-40" />
      {/* <Newsletter /> */}
      <Footer />
    </div>
  );
}

export default Layout;
