import { Link } from "react-router-dom";
import ICONS from "../../assets/icons/icons";
import { useState } from "react";

// const features = [
//   {
//     image: ICONS.call,
//     title: "Contact Us",
//     description:
//       "Permanently delete your account. Warning: All data will be lost.",
//     path: "/support/contact",
//   },
//   {
//     image: ICONS.faq,
//     title: "FAQ",
//     description:
//       "Find answers to frequently asked questions to help you navigate and enjoy our platform with ease.",
//     path: "/support/faq",
//   },
//   {
//     image: ICONS.article,
//     title: "Help Articles",
//     description:
//       "Find answers to frequently asked questions to help you navigate and enjoy our platform with ease.",
//     path: "/support/#",
//   },
//   {
//     image: ICONS.support2,
//     title: "Support Ticket",
//     description:
//       "Find answers to frequently asked questions to help you navigate and enjoy our platform with ease.",
//     path: "/support/ticket",
//   },
//   {
//     image: ICONS.users,
//     title: "Community Forum",
//     description:
//       "Find answers to frequently asked questions to help you navigate and enjoy our platform with ease.",
//     path: "/support/#",
//   },
//   {
//     image: ICONS.chat,
//     title: "Live Chat",
//     description:
//       "Find answers to frequently asked questions to help you navigate and enjoy our platform with ease.",
//     path: "/support/chat",
//   },
// ];

function Support() {
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
        / <span className="text-white">support & help center</span>
      </nav>
      <h1 className="text-4xl font-bold mb-8 text-cream">
        Support & Help Center
      </h1>

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
            Send
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

          {/* <div className="font-jua text-xl mt-10 mb-5">Other Methods</div>
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
          </table> */}
        </div>
      </div>

      {/* <div className="flex flex-col items-center gap-4 mb-12">
        <span className="font-jua text-3xl text-center">
          We’re Here To Help
        </span>

        <div className="bg-black p-2 flex gap-2 items-center rounded-md  w-full max-w-2xl">
          <img src={ICONS.search} alt="search" className="w-4 h-4" />
          <input placeholder="Search..." className="bg-black w-full" />
        </div>
      </div> */}

      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {features.map((item, index) => (
          <Link
            key={index}
            className="flex flex-col gap-2 bg-light_blue p-4 rounded-md "
            to={item.path}
          >
            <img src={item.image} className="w-4" alt="star" />
            <div className="text-xl font-jua">{item.title}</div>
            <div className="text-sm ">{item.description}</div>
          </Link>
        ))}
      </div> */}
      <div className="text-center my-16">
        <div className="font-jua text-xl text-center mb-2">
          Live Support Hours
        </div>
        <div>
          <span className="font-[600]">Monday - Friday</span> : 9:00 AM - 8:00
          PM
        </div>
        <div>
          <span className="font-[600]">Saturday - Sunday</span> : 10:00 AM -
          6:00 PM
        </div>
      </div>
    </div>
  );
}

export default Support;
