import ICONS from "../../assets/icons/icons";

const socialLinks = [
  { icon: ICONS.x, href: "#" },
  { icon: ICONS.instagram, href: "#" },
  { icon: ICONS.facebook, href: "#" },
  { icon: ICONS.bot, href: "#" },
];

function Account() {
  return (
    <div>
      <div className="text-lg font-medium mb-4">Account Settings</div>
      <div className=" flex items-center justify-between mb-4">
        <div className="text-sm">Change Your Display Name</div>
        <button className="bg-white rounded-full text-xs py-1 px-2 text-black">
          Update
        </button>
      </div>
      <div className=" flex items-center justify-between mb-4">
        <div className="text-sm">
          Update Your Email For Account Notifications
        </div>
        <button className="bg-white rounded-full text-xs py-1 px-2 text-black">
          Update
        </button>
      </div>
      <div className=" flex items-center justify-between mb-4">
        <div className="text-sm">Update Your Password For Security</div>
        <button className="bg-white rounded-full text-xs py-1 px-2 text-black">
          Update
        </button>
      </div>
      <div className=" flex items-center justify-between">
        <div className="text-sm">Manage Social Links</div>
        <div className="flex gap-3">
          {socialLinks.map((social, index) => (
            <img
              key={index}
              src={social.icon}
              alt="social icon"
              className="w-6 h-6"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Account;
