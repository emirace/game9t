import { useState, useEffect } from "react";
import { useBranding } from "../../../../context/branding";
import { useToastNotification } from "../../../../context/toastNotificationContext";

function Notification() {
  const { branding, updateBranding } = useBranding();
  const { addNotification } = useToastNotification();

  // Initialize local state for notification settings
  const [formData, setFormData] = useState({
    enableEmail: true,
    enableSMS: false,
    liveChat: false,
  });

  // Keep track of the initial state for comparison
  const [initialNotificationSettings, setInitialNotificationSettings] =
    useState(formData);

  // Set default values from branding context on initial load
  useEffect(() => {
    if (branding) {
      const initialData = {
        enableEmail:
          branding?.adminSettings?.notifications?.enableEmail || true,
        enableSMS: branding?.adminSettings?.notifications.enableSMS || false,
        liveChat: branding?.adminSettings?.liveChat.enabled || false,
      };
      setFormData(initialData);
      setInitialNotificationSettings(initialData); // Store the initial state
    }
  }, [branding]);

  // Handle input change for form fields
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value === "Enable" ? true : false,
    }));
  };

  // Handle form submission to update notification settings
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateBranding({
      adminSettings: {
        ...branding!.adminSettings,
        notifications: {
          ...branding!.adminSettings?.notifications,
          enableEmail: formData.enableEmail,
          enableSMS: formData.enableSMS,
        },
        liveChat: {
          ...branding!.adminSettings?.liveChat,
          enabled: formData.liveChat,
        },
      },
    });
    addNotification({ message: "Updated successfully" });
  };

  // Check if any field has changed
  const isChanged =
    JSON.stringify(formData) !== JSON.stringify(initialNotificationSettings);

  return (
    <div>
      <h2 className="font-jua text-xl mb-4 mt-8">Notification Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8">
          {/* Email Notification */}
          <div>
            <div className="text-sm mb-2">Email Notification</div>
            <select
              name="enableEmail"
              value={formData.enableEmail ? "Enable" : "Disable"}
              onChange={handleChange}
              className="w-full p-4 bg-light_blue text-white rounded-md focus:outline-none"
            >
              <option value="Enable">Enable</option>
              <option value="Disable">Disable</option>
            </select>
          </div>

          {/* SMS Notification */}
          <div>
            <div className="text-sm mb-2">SMS Notification</div>
            <select
              name="enableSMS"
              value={formData.enableSMS ? "Enable" : "Disable"}
              onChange={handleChange}
              className="w-full p-4 bg-light_blue text-white rounded-md focus:outline-none"
            >
              <option value="Enable">Enable</option>
              <option value="Disable">Disable</option>
            </select>
          </div>

          {/* Live Chat */}
          <div className="col-span-2 md:col-span-1">
            <div className="text-sm mb-2">Live Chat</div>
            <select
              name="liveChat"
              value={formData.liveChat ? "Enable" : "Disable"}
              onChange={handleChange}
              className="w-full p-4 bg-light_blue text-white rounded-md focus:outline-none"
            >
              <option value="Enable">Enable</option>
              <option value="Disable">Disable</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        {isChanged && (
          <div className="mt-8">
            <button
              type="submit"
              className="px-4 py-2 bg-cream text-black rounded-md font-medium hover:opacity-75 transition duration-300"
            >
              Update Notification Settings
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default Notification;
