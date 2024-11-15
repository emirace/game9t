import React, { useState } from "react";
import IMAGES from "../../assets/images/images";
import ICONS from "../../assets/icons/icons";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/auth";
import Loading from "../_components/loading";
import { useToastNotification } from "../../context/toastNotificationContext";
import { FiEyeOff, FiEye } from "react-icons/fi";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { addNotification } = useToastNotification();
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // Form state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Error state
  const [errors, setErrors] = useState<Record<string, string | null>>({
    username: null,
    email: null,
    password: null,
    confirmPassword: null,
    general: null,
  });

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: null });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({
      username: null,
      email: null,
      password: null,
      confirmPassword: null,
      general: null,
    });

    const newErrors: Record<string, string | null> = {};

    // Validation
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.email.trim() || !validateEmail(formData.email)) {
      newErrors.email = "A valid email is required";
    }

    if (!formData.password.trim() || formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      await registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/auth/login");
    } catch (error: any) {
      setErrors({ ...errors, general: error });
      addNotification({ message: error, error: true });
    } finally {
      setLoading(false);
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="min-h-screen flex relative overflow-y-auto md:overflow-y-hidden">
      {/* Left Section */}
      <div
        className="w-full md:w-1/2 bg-cover bg-center flex flex-col justify-between p-4 md:p-20 md:pt-10"
        style={{ backgroundImage: `url(${IMAGES.signup})` }}
      >
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img src={IMAGES.logo} alt="logo" className="w-8 h-8" />
          <div>
            <div className="font-jua text-xl">Online Games</div>
            <div className="text-xs -mt-1">Play Online & Offline Game</div>
          </div>
        </div>
        <div>
          <h1 className="text-5xl font-jua">JOIN THE GAME</h1>
          <p className="text-lg">Play, Bet, Win!</p>
          <div className="mt-8 flex space-x-4">
            <Link to="#">
              <img src={ICONS.x} alt="Twitter" className="h-6 w-6" />
            </Link>
            <Link to="#">
              <img src={ICONS.instagram} alt="Instagram" className="h-6 w-6" />
            </Link>
            <Link to="#">
              <img src={ICONS.facebook} alt="Facebook" className="h-6 w-6" />
            </Link>
            <Link to="#">
              <img src={ICONS.bot} alt="Bot" className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="absolute bg-medium_blue bg-opacity-90 md:bg-none p-6 md:p-0 rounded-lg top-1/2 -translate-y-1/2 md:-translate-x-0 md:-translate-y-0 left-1/2 -translate-x-1/2 md:static md:w-1/2 md:flex md:items-center md:justify-center ">
        <div className="md:max-w-md w-full space-y-6">
          <h2 className="text-3xl font-jua text-center">Create Your Account</h2>

          <form className="mt-8 space-y-6" onSubmit={handleRegister}>
            <div>
              <input
                type="text"
                name="username"
                className="w-full px-4 py-3 rounded-md bg-black focus:outline-none"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && (
                <p className="text-red text-xs">{errors.username}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                name="email"
                className="w-full px-4 py-3 rounded-md bg-black focus:outline-none"
                placeholder="E-mail Address"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red text-xs">{errors.email}</p>
              )}
            </div>

            <div>
              <div className="flex items-center px-4 rounded-md bg-black">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="w-full px-4 py-3 rounded-md bg-black focus:outline-none"
                  placeholder="Create Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {showPassword ? (
                  <FiEyeOff onClick={togglePassword} />
                ) : (
                  <FiEye onClick={togglePassword} />
                )}
              </div>

              {errors.password && (
                <p className="text-red text-xs">{errors.password}</p>
              )}
            </div>

            <div>
              <div className="flex items-center px-4 rounded-md bg-black">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  className="w-full py-3  focus:outline-none"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />

                {showPassword ? (
                  <FiEyeOff onClick={toggleConfirmPassword} />
                ) : (
                  <FiEye onClick={toggleConfirmPassword} />
                )}
              </div>
              {errors.confirmPassword && (
                <p className="text-red text-xs">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="flex gap-4 items-center">
              <button
                type="submit"
                className="px-12 py-2 bg-black font-jua rounded-full hover:bg-cream hover:text-black flex gap-2"
                disabled={loading}
              >
                {loading && <Loading size="sm" />}
                Register
              </button>
              <button
                type="button"
                onClick={() => navigate("/auth/login")}
                className="ml-4 px-12 py-2 bg-cream font-jua text-black rounded-full hover:bg-black hover:text-white"
              >
                Login
              </button>
            </div>
            {errors.general && (
              <p className="text-red text-xs">{errors.general}</p>
            )}
          </form>

          <div className="mt-6">
            <button className="flex items-center justify-center w-full py-2 bg-light_blue hover:bg-medium_blue rounded-md">
              <img src={ICONS.google} className="h-5 w-5 mr-2" alt="Google" />
              Sign in with Google
            </button>
          </div>

          <div className="mt-2">
            <button className="flex items-center justify-center w-full py-2 bg-light_blue hover:bg-medium_blue rounded-md">
              <img
                src={ICONS.facebook_color}
                className="h-5 w-5 mr-2"
                alt="Facebook"
              />
              Sign in with Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
