import { useState, useEffect } from "react";
import { useBranding } from "../../../../context/branding";

function Support() {
  const { branding, updateBranding } = useBranding();

  // Local state for adm?.adminSettings.support settings
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    link: "",
  });

  // Keep track of the initial state for comparison
  const [initialSupportSettings, setInitialSupportSettings] =
    useState(formData);

  // Populate default values from branding context
  useEffect(() => {
    if (branding) {
      const initialData = {
        email: branding?.adminSettings?.support?.email || "",
        phone: branding?.adminSettings?.support?.phone || "",
        link: branding?.adminSettings?.liveChat?.link || "",
      };
      setFormData(initialData);
      setInitialSupportSettings(initialData); // Store the initial state
    }
  }, [branding]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission to update adm?.adminSettings.support settings
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBranding({
      adminSettings: {
        ...branding!.adminSettings,
        support: {
          ...branding!.adminSettings?.support,
          email: formData.email,
          phone: formData.phone,
        },
        liveChat: {
          ...branding!.adminSettings?.liveChat,
          link: formData.link,
        },
      },
    });
  };

  // Check if any field has changed
  const isChanged =
    JSON.stringify(formData) !== JSON.stringify(initialSupportSettings);

  return (
    <div>
      <h2 className="font-jua text-xl mb-4 mt-8">Support and Contact</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-8">
          {/* Support Email */}
          <div>
            <div className="text-sm mb-2">Support Email</div>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              className="w-full p-4 bg-black text-white rounded-md focus:outline-none"
            />
          </div>

          {/* Contact Number */}
          <div>
            <div className="text-sm mb-2">Contact Number</div>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter Number"
              className="w-full p-4 bg-black text-white rounded-md focus:outline-none"
            />
          </div>

          {/* Live Chat Link */}
          <div>
            <div className="text-sm mb-2">Live Chat Link</div>
            <input
              type="text"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="Paste link here"
              className="w-full p-4 bg-black text-white rounded-md focus:outline-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        {isChanged && (
          <div className="mt-8">
            <button
              type="submit"
              className="px-4 py-2 bg-cream text-black rounded-md font-medium hover:opacity-75 transition duration-300"
            >
              Update Support Information
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default Support;
