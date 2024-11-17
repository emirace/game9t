import React from "react";
import IMAGES from "../../assets/images/images";
import ICONS from "../../assets/icons/icons";
import { useBranding } from "../../context/branding";
import { imageUrl } from "../../services/api";

// Data for the footer sections
const features = [
  { icon: ICONS.bats, label: "Real-Time Gaming" },
  { icon: ICONS.box, label: "Secure Transactions" },
  { icon: ICONS.tools, label: "Exclusive Rewards" },
  { icon: ICONS.users, label: "24/7 Support" },
];

const quickLinks = [
  "Home",
  "Games",
  "Leaderboard",
  "Wallet",
  "Challenges",
  "Support",
  "FAQ",
];

const legalLinks = [
  "Terms",
  "Disclaimer",
  "Privacy Policy",
  "Terms & Conditions",
  "Responsible Gaming",
];

const contactInfo = {
  email: "support@gamingwebsite.com",
  phone: "+123-456-7890",
  address: "123 Gaming Street, City, Country",
};

const Footer: React.FC = () => {
  const { branding } = useBranding();
  const socialLinks = [
    { icon: ICONS.x, href: branding?.socialMedia.twitter },
    { icon: ICONS.instagram, href: branding?.socialMedia.instagram },
    { icon: ICONS.facebook, href: branding?.socialMedia.facebook },
    { icon: ICONS.bot, href: "#" },
  ];
  return (
    <footer className="relative bg-dark pt-10 pb-16 md:pb-20">
      <img
        src={IMAGES.diceblur}
        className="absolute right-0 w-1/2 opacity-10 bottom-0 z-0 "
        alt="stat"
      />
      <img
        src={IMAGES.chess_back}
        className="absolute left-0 w-1/2 opacity-10 bottom-0 z-0 "
        alt="stat"
      />
      <div className="absolute left-1/2 -translate-x-1/2 -top-1/4 translate-y-1/5 md:translate-y-3/4 w-full  grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-8 px-4 md:px-20">
        {features.map((feature, index) => (
          <div key={index} className="bg-light_blue rounded-md p-4">
            <img
              src={feature.icon}
              alt="social icon"
              className="w-6 h-6 mb-2"
            />
            <span className="font-jua text-sm">{feature.label}</span>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 sm:grid-cols-6 gap-8 text-sm mt-20 px-4 md:px-20 ">
        {/* About */}
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-8">
            <img
              src={imageUrl + branding?.logo}
              alt="logo"
              className="w-8 h-8"
            />
            <div className="font-jua  text-xl">{branding?.name}</div>
          </div>
          <p className="">{branding?.aboutUs}</p>
        </div>

        {/* Quick Links */}
        <div className="col-span-1 hidden md:block">
          <h4 className=" text-lg mb-4 font-jua">Quick Links</h4>
          <ul className="space-y-2">
            {quickLinks.map((link, index) => (
              <li key={index}>{link}</li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div className="col-span-1 hidden md:block">
          <h4 className="font-jua text-lg mb-4">Legal</h4>
          <ul className="space-y-2">
            {legalLinks.map((link, index) => (
              <li key={index}>{link}</li>
            ))}
          </ul>
        </div>

        {/* Contact Us */}
        <div className="col-span-1 ">
          <h4 className="font-jua text-lg mb-4">Contact Us</h4>
          <ul className="space-y-2">
            <li>
              Email:{" "}
              {branding?.adminSettings?.support?.email || contactInfo.email}
            </li>
            <li>
              Phone:{" "}
              {branding?.adminSettings?.support?.phone || contactInfo.phone}
            </li>
            <li>Address: {contactInfo.address}</li>
          </ul>
        </div>

        <div className="col-span-1">
          <h4 className="font-jua text-lg mb-4">Follow Us</h4>
          <ul className="space-y-2">
            {socialLinks.map((social, index) => (
              <img
                key={index}
                src={social.icon}
                alt="social icon"
                className="w-4 h-4"
              />
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 text-center bg-[#333333] p-3 absolute bottom-0 left-0 right-0">
        <p>{branding?.copyright}</p>
      </div>
    </footer>
  );
};

export default Footer;
