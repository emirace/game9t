import { Link } from "react-router-dom";
import ICONS from "../../assets/icons/icons";
import { useState } from "react";
import { compressImageUpload } from "../../utils/image";
import { useToastNotification } from "../../context/toastNotificationContext";

function Ticket() {
  const { addNotification } = useToastNotification();
  const [formData, setFormData] = useState({
    subject: "",
    email: "",
    message: "",
    category: "",
    attachment: "",
    level: "",
  });
  const [loading, setLoading] = useState(false);

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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      const imageurl = await compressImageUpload(file, 2048);
      setFormData((prevData) => ({
        ...prevData,
        attachment: imageurl,
      }));
      addNotification({ message: "Image uploaded successfully" });
    } catch (error) {
      addNotification({ message: "Image upload failed", error: true });
    } finally {
      setLoading(false);
    }
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
        / <span className="text-white">Support Ticket</span>
      </nav>
      <h1 className="text-4xl font-bold mb-8 text-cream">Support Ticket</h1>
      <div className="font-jua text-3xl text-center  mb-5">
        Submot Support Ticket
      </div>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="bg-[#142635] flex-1 rounded-md p-4 md:p-12">
          <div className="mt-4">
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="Subject"
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
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full p-4 bg-black rounded-md focus:outline-none"
            >
              <option value="" disabled>
                Category
              </option>
              <option value="Technical">Technical</option>
              <option value="Billing">Billing</option>
              <option value="General Inquiry">General Inquiry</option>
            </select>
          </div>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Describe Your Issue"
            className="p-2 mb-8 bg-black text-white flex-1 w-full rounded-md focus:outline-none h-56 "
          />
          <div className="relative mb-4">
            <input
              type="text"
              name="attachment"
              value={formData.attachment}
              onChange={handleInputChange}
              placeholder="Attachment(Optional)"
              className="w-full p-4 bg-black text-white rounded-md focus:outline-none"
            />
            <label
              htmlFor="image"
              className="absolute top-1/2 right-4 -translate-y-1/2 px-4 py-1 bg-cream cursor-pointer text-black font-light text-xs rounded-full transition duration-300 "
            >
              <input
                type="file"
                id="image"
                onChange={(e) => handleImageUpload(e)}
                className="sr-only"
                accept="image/*"
                disabled={loading}
              />
              <span>Choose file</span>
            </label>
          </div>

          <div className="mb-8">
            <select
              name="level"
              value={formData.level}
              onChange={handleInputChange}
              className="w-full p-4 bg-black rounded-md focus:outline-none"
            >
              <option value="" disabled>
                Priority Level
              </option>

              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          <button
            //   onClick={onButtonClick}
            className="px-8 py-3 min-w-48 bg-black text-white font-jua rounded-full hover:bg-dark_blue transition-colors"
          >
            Submit Ticket
          </button>
        </div>
        <div className=" flex-1 px-4 md:px-12 space-y-4">
          <div className="font-jua text-xl mt-10 mb-5">Your Open Tickets</div>
          <div className="bg-light_blue p-4">
            <div>
              <span className="font-jua">Ticket #1234</span> - Unable to Login
            </div>
            <div>Status: Open</div>
          </div>

          <div className="bg-light_blue p-4">
            <div>
              <span className="font-jua">Ticket #1234</span> - Payment Issue
            </div>
            <div>Status: In Progress</div>
          </div>

          <div className="bg-light_blue p-4">
            <div>
              <span className="font-jua">Ticket #1234</span> - Bug in game
            </div>
            <div>Status: Resolve</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
