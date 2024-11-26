import React, { useState } from "react";
import IMAGES from "../../assets/images/images";
import ICONS from "../../assets/icons/icons";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../../services/auth";
import Loading from "../_components/loading";
import { useToastNotification } from "../../context/toastNotificationContext";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const { addNotification } = useToastNotification();
  const [loading, setLoading] = useState(false);
  // Form state
  const [formData, setFormData] = useState({
    email: "",
  });

  // Error state
  const [errors, setErrors] = useState<Record<string, string | null>>({
    general: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: null });
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({
      username: null,
      password: null,
      general: null,
    });

    const newErrors: Record<string, string | null> = {};

    // Validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      await forgotPassword(formData.email);
      setFormData({
        email: "",
      });
      addNotification({ message: "Reset link sent to your email" });
    } catch (error: any) {
      setErrors({ ...errors, general: error });
      addNotification({ message: error, error: true });
    } finally {
      setLoading(false);
    }
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
          <h2 className="text-3xl font-jua text-center ">Forgot Password</h2>
          <form className="mt-8 space-y-6" onSubmit={handleForgotPassword}>
            <div>
              <input
                type="text"
                name="email"
                className="w-full px-4 py-3  rounded-md bg-black  focus:outline-none "
                placeholder="username/email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="flex gap-4 items-center">
              <button
                type="submit"
                className=" px-12 py-2 bg-black font-jua  rounded-full hover:bg-cream flex gap-2 hover:text-black"
              >
                {loading && <Loading size="sm" />}
                Send Link
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
