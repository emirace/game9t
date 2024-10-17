import { Link, Outlet } from "react-router-dom";
import ICONS from "../../assets/icons/icons";
import IMAGES from "../../assets/images/images";
import Stats from "./_components/stats";
import Sidebar from "./_components/sidebar";

function Profile() {
  return (
    <div className="px-20 py-10">
      <nav className="mb-6 flex items-center gap-2">
        <img src={ICONS.home} alt="home" className="w-4 h-4" />
        <Link to="/" className="hover:text-cream hover:underline">
          Home
        </Link>
        / <span className="text-white">Profile</span>
      </nav>
      <h1 className="text-4xl font-bold mb-8 text-cream">Profile</h1>
      <div className="bg-cream p-4 rounded-md text-black flex items-center justify-between ">
        <div className="">
          <div className=" font-jua text-xl mb-4">Welcome,</div>
          <div className=" flex items-center justify-between">
            <div className="flex items-center  space-x-4 mb-4">
              <div className="flex flex-col items-center gap-2">
                <img
                  src={IMAGES.user}
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
                <button className="bg-white rounded-full text-xs py-1 px-2 text-black">
                  Upload/Change Photo
                </button>
              </div>
              <table>
                <tbody>
                  <tr>
                    <td className="min-w-28">Username:</td>
                    <td>
                      <div className="flex gap-2">
                        <p className="font-jua">MrYogesh</p>
                        <button className="bg-white rounded-full text-xs py-1 px-2 text-black">
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Email:</td>
                    <td>
                      <div className="flex gap-2">
                        <p className="font-jua">yogesh@gmai.com</p>
                        <button className="bg-white rounded-full text-xs py-1 px-2 text-black">
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Member:</td>
                    <td>
                      <p className="font-jua">Since 2019</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <button
          //   onClick={onButtonClick}
          className="px-8 py-3 min-w-48 bg-black text-white font-semibold rounded-full hover:bg-dark_blue transition-colors"
        >
          Logout
        </button>
      </div>
      <Stats />
      <div className="flex py-16 gap-8">
        <div className="flex-1">
          <Sidebar />
        </div>
        <div className="flex-[2] bg-[#142635] rounded-md p-4 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Profile;
