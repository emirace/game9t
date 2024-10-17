import React from "react";
import IMAGES from "../../assets/images/images";
import ICONS from "../../assets/icons/icons";
import { Link, useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div
        className="w-1/2 bg-cover bg-center flex flex-col justify-between p-20 pt-10 "
        style={{
          backgroundImage: `url(${IMAGES.signup})`,
        }}
      >
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img src={IMAGES.logo} alt="logo" className="w-8 h-8" />
          <div>
            <div className="font-jua  text-xl">Online Games</div>
            <div className="text-xs -mt-1">Play Online & Offline Game</div>
          </div>
        </div>
        <div className="">
          <h1 className="text-5xl  font-jua">JOIN THE GAME</h1>
          <p className=" text-lg">Play, Bet, Win!</p>
          <div className="mt-8 flex  space-x-4">
            <Link to="#" className="">
              <img src={ICONS.x} alt="Twitter" className="h-6 w-6" />
            </Link>
            <Link to="#" className="">
              <img src={ICONS.instagram} alt="Instagram" className="h-6 w-6" />
            </Link>
            <Link to="#" className="">
              <img src={ICONS.facebook} alt="Facebook" className="h-6 w-6" />
            </Link>
            <Link to="#" className="">
              <img src={ICONS.bot} alt="Facebook" className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8">
          <h2 className="text-3xl font-jua text-center ">
            Create Your Account
          </h2>

          <form className="mt-8 space-y-6">
            <div>
              <input
                type="text"
                name="username"
                className="w-full px-4 py-3  rounded-md bg-black  focus:outline-none "
                placeholder="Username"
              />
            </div>
            <div>
              <input
                type="text"
                name="email"
                className="w-full px-4 py-3  rounded-md bg-black  focus:outline-none "
                placeholder="E-mail Address"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-3  rounded-md bg-black  focus:outline-none "
                placeholder="Create Password"
              />
            </div>
            <div>
              <input
                type="password"
                name="confirmPassword"
                className="w-full px-4 py-3  rounded-md bg-black  focus:outline-none "
                placeholder="Confirm Password"
              />
            </div>

            <div className="flex gap-4 items-center">
              <button
                type="submit"
                className=" px-12 py-2 bg-black font-jua  rounded-full hover:bg-cream"
              >
                Register
              </button>
              <button
                type="button"
                onClick={() => navigate("/auth/login")}
                className=" ml-4 px-12 py-2 bg-cream font-jua text-black rounded-full hover:bg-black"
              >
                Login
              </button>
            </div>

            <div className=" pt-4"></div>

            <div className="mt-6">
              <button className="flex items-center justify-center w-full py-2 bg-light_blue  rounded-md">
                <img src={ICONS.google} className="h-5 w-5 mr-2" alt="Google" />
                Sign in with Google
              </button>
            </div>

            <div className="mt-4">
              <button className="flex items-center justify-center w-full py-2 bg-light_blue  rounded-md">
                <img
                  src={ICONS.facebook_color}
                  className="h-5 w-5 mr-2"
                  alt="Facebook"
                />
                Sign in with Facebook
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
