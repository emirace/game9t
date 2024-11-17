import { useState, useEffect } from "react";
import { useBranding } from "../../../../context/branding";
import { useToastNotification } from "../../../../context/toastNotificationContext";
import { compressImageUpload } from "../../../../utils/image";

function Logo() {
  const { branding, updateBranding } = useBranding();
  const { addNotification } = useToastNotification();

  // Initialize local state for form fields
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    favicon: "",
    color: "#123456", // Default color
    timezone: "",
    language: "",
  });

  // Keep track of the initial state for comparison
  const [initialBranding, setInitialBranding] = useState(formData);

  // Set default values from branding context on initial load
  useEffect(() => {
    if (branding) {
      const initialData = {
        name: branding.name || "",
        logo: branding.logo || "",
        favicon: branding.favicon || "",
        color: branding.color || "#123456",
        timezone: branding.timezone || "",
        language: branding.language || "",
      };
      setFormData(initialData);
      setInitialBranding(initialData); // Store the initial state
    }
  }, [branding]);

  // Handle input change for form fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission to update branding
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateBranding(formData);
    addNotification({ message: "Updated successfully" });
  };

  const [loading, setLoading] = useState(false);
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      const imageurl = await compressImageUpload(file, 2048);
      setFormData((prevData) => ({
        ...prevData,
        [name]: imageurl,
      }));
      addNotification({ message: "Image uploaded successfully" });
    } catch (error) {
      addNotification({ message: "Image upload failed", error: true });
    } finally {
      setLoading(false);
    }
  };

  // Check if any field has changed
  const isChanged =
    JSON.stringify(formData) !== JSON.stringify(initialBranding);

  return (
    <div>
      <h2 className="font-jua text-xl mb-4">Logo & Branding</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-8">
          {/* Website Name */}
          <div>
            <div className="text-sm mb-2">Website Name</div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Website Name"
              className="w-full p-4 bg-black text-white rounded-md focus:outline-none"
            />
          </div>

          {/* Website Logo */}
          <div>
            <div className="text-sm mb-2">Website Logo</div>
            <div className="relative">
              <input
                type="text"
                name="logo"
                value={formData.logo}
                onChange={handleChange}
                placeholder="Enter Logo URL"
                className="w-full p-4 bg-black text-white rounded-md focus:outline-none"
              />
              <label
                htmlFor="image"
                className="absolute top-1/2 right-4 -translate-y-1/2 px-4 py-1 bg-cream cursor-pointer text-black font-light text-xs rounded-full transition duration-300 "
              >
                <input
                  type="file"
                  id="image"
                  onChange={(e) => handleImageUpload(e, "logo")}
                  className="sr-only"
                  accept="image/*"
                  disabled={loading}
                />
                <span>Upload Logo</span>
              </label>
            </div>
          </div>

          {/* Website Favicon */}
          <div>
            <div className="text-sm mb-2">Website Favicon</div>
            <div className="relative">
              <input
                type="text"
                name="favicon"
                value={formData.favicon}
                onChange={handleChange}
                placeholder="Enter Favicon URL"
                className="w-full p-4 bg-black text-white rounded-md focus:outline-none"
              />
              <label
                htmlFor="image"
                className="absolute top-1/2 right-4 -translate-y-1/2 px-4 py-1 bg-cream cursor-pointer text-black font-light text-xs rounded-full transition duration-300 "
              >
                <input
                  type="file"
                  id="image"
                  onChange={(e) => handleImageUpload(e, "favicon")}
                  className="sr-only"
                  accept="image/*"
                  disabled={loading}
                />
                <span>Upload Favicon</span>
              </label>
            </div>
          </div>

          {/* Brand Color */}
          <div>
            <div className="text-sm mb-2">Brand Color</div>
            <div className="relative">
              <div className="w-full p-4 bg-black rounded-md flex gap-3">
                <input
                  type="color"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="w-8 h-8"
                />
                <div>{formData.color}</div>
              </div>
            </div>
          </div>

          {/* Timezone Settings */}
          <div>
            <div className="text-sm mb-2">Timezone Settings</div>
            <select
              name="timezone"
              value={formData.timezone}
              onChange={handleChange}
              className="w-full p-4 bg-light_blue text-white rounded-md focus:outline-none"
            >
              <option value="" disabled>
                Select Timezone
              </option>
              {/* Example timezones */}
              <option value="UTC">UTC</option>
              <option value="GMT">GMT</option>
              <option value="EST">EST</option>
              {/* Add more timezones */}
            </select>
          </div>

          {/* Default Language */}
          <div>
            <div className="text-sm mb-2">Default Language</div>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full p-4 bg-light_blue text-white rounded-md focus:outline-none"
            >
              <option value="" disabled>
                Select Language
              </option>
              <option value="en">English</option>
              <option value="es">Spanish</option>
              {/* Add more languages */}
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
              Update Branding
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default Logo;
