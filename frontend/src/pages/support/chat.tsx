import { Link } from "react-router-dom";
import ICONS from "../../assets/icons/icons";
import { useState } from "react";

function Chat() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    type: "",
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
        / <span className="text-white">Live Chat</span>
      </nav>
      <h1 className="text-4xl font-bold mb-8 text-cream">Live Chat</h1>
      <div className="font-jua text-3xl text-center  mb-5">
        Live Chat & Support
      </div>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="bg-[#142635] flex-1 rounded-md p-4 md:p-12">
          <div className="mt-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your Name"
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

          <div className="mb-4">
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full p-4 bg-black rounded-md focus:outline-none"
            >
              <option value="" disabled>
                Select Issue Type
              </option>
            </select>
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
            Start Chat
          </button>
        </div>
        <div className=" flex-1 px-4 md:px-12">
          <div>
            Welcome to our Live Chat! Our support team is here to help you. Chat
            with us for instant support or leave a message if we're offline.
          </div>

          <div className="font-jua text-xl mt-10 mb-5">Live Support hours</div>
          <table>
            <tr>
              <td className="w-36">Monday - Friday:</td>
              <td>9AM -8PM</td>
            </tr>
            <tr>
              <td className="w-36"> Saturday -Sunday:</td>
              <td>10AM - 6PM</td>
            </tr>
          </table>
          <button
            //   onClick={onButtonClick}
            className="px-8 mt-10 py-3 min-w-48 bg-black text-white font-jua rounded-full hover:bg-dark_blue transition-colors capitalize"
          >
            Click here to start live chat
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
