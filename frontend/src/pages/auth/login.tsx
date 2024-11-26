import React, { useEffect, useState } from "react";
import IMAGES from "../../assets/images/images";
import ICONS from "../../assets/icons/icons";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/auth";
import Loading from "../_components/loading";
import { useUser } from "../../context/user";
import { useToastNotification } from "../../context/toastNotificationContext";
import { FiEye, FiEyeOff } from "react-icons/fi";
// import { useGoogleLogin } from "@react-oauth/google";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { addNotification } = useToastNotification();
  const { user, getUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // Form state
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // Error state
  const [errors, setErrors] = useState<Record<string, string | null>>({
    username: null,
    password: null,
    general: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: null });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({
      username: null,
      password: null,
      general: null,
    });

    const newErrors: Record<string, string | null> = {};

    // Validation
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const res = await loginUser({
        username: formData.username,
        password: formData.password,
      });
      localStorage.setItem("authToken", res.token);
      await getUser();
      setFormData({
        username: "",
        password: "",
      });
      navigate("/profile");
    } catch (error: any) {
      setErrors({ ...errors, general: error });
      addNotification({ message: error, error: true });
    } finally {
      setLoading(false);
    }
  };

  // const login = useGoogleLogin({
  //   onSuccess: (tokenResponse) => console.log(tokenResponse),
  // });

  useEffect(() => {
    const check = () => {
      if (user) {
        return <Navigate to="/" />;
      }
    };
    check();
  }, [user]);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex relative overflow-y-auto md:overflow-y-hidden">
      {/* Left Section */}
      <div
        className="w-full md:w-1/2 bg-cover bg-center flex flex-col justify-between p-4 md:p-20 md:pt-10 "
        style={{
          backgroundImage: `url(${IMAGES.login})`,
        }}
      >
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img src={IMAGES.logo} alt="logo" className="w-8 h-8" />
          <div>
            <div className="font-jua  text-xl">Game9t</div>
          </div>
        </div>
        <div className="">
          <h1 className="text-5xl  font-jua">WELCOME BACK</h1>
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
      <div className="absolute bg-medium_blue bg-opacity-90 md:bg-none p-6 md:p-0 rounded-lg top-1/2 -translate-y-1/2 md:-translate-x-0 md:-translate-y-0 left-1/2 -translate-x-1/2 md:static md:w-1/2 flex items-center justify-center ">
        <div className="md:max-w-md w-full space-y-6">
          <h2 className="text-3xl font-jua text-center ">
            Login Into Your Account
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div>
              <input
                type="text"
                name="username"
                className="w-full px-4 py-3  rounded-md bg-black  focus:outline-none "
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center px-4 rounded-md bg-black">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="w-full py-3  bg-black  focus:outline-none "
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              {showPassword ? (
                <FiEyeOff onClick={togglePassword} />
              ) : (
                <FiEye onClick={togglePassword} />
              )}
            </div>

            <div className="flex gap-4 items-center">
              <button
                type="submit"
                className=" px-12 py-2 bg-black font-jua  rounded-full hover:bg-cream flex gap-2 hover:text-black"
              >
                {loading && <Loading size="sm" />}
                Login
              </button>
              <button
                type="button"
                className=" ml-4 px-12 py-2 bg-cream font-jua text-black rounded-full hover:bg-black whitespace-nowrap hover:text-white"
                onClick={() => navigate("/auth/register")}
              >
                Sign Up
              </button>
            </div>

            <div className=" my-4">
              <Link
                to="/auth/forgot-password"
                className=" text-xs font-light underline"
              >
                Forgot Password?
              </Link>
            </div>
          </form>
          {/* <div className="mt-6">
            <button
              onClick={() => login()}
              className="flex items-center justify-center w-full py-2 bg-light_blue hover:bg-medium_blue  rounded-md"
            >
              <img src={ICONS.google} className="h-5 w-5 mr-2" alt="Google" />
              Sign in with Google
            </button>
          </div> */}
          {/* <div className="mt-2">
            <button className="flex items-center justify-center w-full py-2 bg-light_blue hover:bg-medium_blue rounded-md">
              <img
                src={ICONS.facebook_color}
                className="h-5 w-5 mr-2"
                alt="Facebook"
              />
              Sign in with Facebook
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
