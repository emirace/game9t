import React, { useState } from "react";
import IMAGES from "../../assets/images/images";
import ICONS from "../../assets/icons/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../services/auth";
import Loading from "../_components/loading";
import { useToastNotification } from "../../context/toastNotificationContext";

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const { addNotification } = useToastNotification();
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  // Form state
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  // Error state
  const [errors, setErrors] = useState<Record<string, string | null>>({
    confirmPassword: null,
    password: null,
    general: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: null });
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({
      confirmPassword: null,
      password: null,
      general: null,
    });

    const newErrors: Record<string, string | null> = {};

    // Validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.general = "Passwords do not match";
    }

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      return;
    }
    if (!token) return;
    try {
      setLoading(true);
      await resetPassword(token, formData.password);
      setFormData({
        password: "",
        confirmPassword: "",
      });
      addNotification({ message: "Password reset successfully" });
      navigate("/auth/login");
    } catch (error: any) {
      setErrors({ ...errors, general: error });
      addNotification({ message: error, error: true });
    } finally {
      setLoading(false);
    }
  };

  return !token ? (
    <div className="flex justify-center items-center w-full h-full">
      <p>Invalid or expired token</p>
    </div>
  ) : (
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
          <h2 className="text-3xl font-jua text-center ">Forgot Password</h2>
          <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
            <div>
              <input
                type="text"
                name="password"
                className="w-full px-4 py-3  rounded-md bg-black  focus:outline-none "
                placeholder="Enter new password"
                value={formData.password}
                onChange={handleChange}
              />

              {errors.password && (
                <p className="text-red text-xs">{errors.password}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                name="confirmPassword"
                className="w-full px-4 py-3  rounded-md bg-black  focus:outline-none "
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />

              {errors.confirmPassword && (
                <p className="text-red text-xs">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="flex gap-4 items-center">
              <button
                type="submit"
                className=" px-12 py-2 bg-black font-jua  rounded-full hover:bg-cream flex gap-2 hover:text-black"
              >
                {loading && <Loading size="sm" />}
                Reset Password
              </button>
            </div>

            {errors.general && (
              <p className="text-red text-xs">{errors.general}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
