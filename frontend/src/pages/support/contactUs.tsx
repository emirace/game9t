import { Link } from "react-router-dom";
import ICONS from "../../assets/icons/icons";
import { useState } from "react";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="px-4 md:px-20 py-10">
      <nav className="mb-6 flex items-center gap-2">
        <img src={ICONS.home} alt="home" className="w-4 h-4" />
        <Link to="/" className="hover:text-cream hover:underline">
          Home
        </Link>
        /
        <Link to="/support" className="hover:text-cream hover:underline">
          Support & help center
        </Link>
        / <span className="text-white">Contact Us</span>
      </nav>
      <h1 className="text-4xl font-bold mb-8 text-cream">Contact Us</h1>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="bg-[#142635] flex-1 rounded-md p-4 md:p-12">
          <div className="mt-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter Name"
              className="p-2 bg-black rounded-md focus:outline-none w-full "
            />
          </div>
          <div className="my-4">
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              className="p-2 bg-black rounded-md focus:outline-none w-full "
            />
          </div>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Enter Your Message Here"
            className="p-2 mb-8 bg-black text-white flex-1 w-full rounded-md focus:outline-none h-56 "
          />
          <button
            //   onClick={onButtonClick}
            className="px-8 py-3 min-w-48 bg-black text-white font-jua rounded-full hover:bg-dark_blue transition-colors"
          >
            Join Now
          </button>
        </div>
        <div className=" flex-1 p-4 md:p-12">
          <div className="font-jua text-3xl  mb-5">
            We'd Love to Hear from You
          </div>
          <div>
            For any inquiries or support, please fill out the form below or
            contact us via email or phone. Our team is here to assist you.
          </div>

          <div className="font-jua text-xl mt-10 mb-5">Other Methods</div>
          <table>
            <tr>
              <td className="w-20">Email:</td>
              <td> support@gamingwebsite.com</td>
            </tr>
            <tr>
              <td className="w-20"> Phone:</td>
              <td> +123-456-7890 </td>
            </tr>
            <tr>
              <td className="w-20">Address:</td>
              <td> 123 Gaming Street, City, Country</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
