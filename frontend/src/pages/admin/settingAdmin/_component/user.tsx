import { useState, useEffect } from "react";
import { useBranding } from "../../../../context/branding";

function User() {
  const { branding, updateBranding } = useBranding();

  // Initialize local state for the user settings
  const [formData, setFormData] = useState({
    maximumUsers: "",
    defaultUserRole: "",
    userVerification: "",
  });

  // Keep track of the initial state for comparison
  const [initialUserSettings, setInitialUserSettings] = useState(formData);

  // Set default values from branding context on initial load
  useEffect(() => {
    if (branding) {
      const initialData = {
        maximumUsers: branding?.adminSettings?.maximumUsers || "",
        defaultUserRole: branding?.adminSettings?.defaultUserRole || "",
        userVerification: branding?.adminSettings?.userVerification || "",
      };
      setFormData(initialData);
      setInitialUserSettings(initialData); // Store the initial state
    }
  }, [branding]);

  // Handle input change for form fields
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission to update user settings
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBranding({
      adminSettings: { ...branding!.adminSettings, ...formData },
    });
  };

  // Check if any field has changed
  const isChanged =
    JSON.stringify(formData) !== JSON.stringify(initialUserSettings);

  return (
    <div>
      <h2 className="font-jua text-xl mb-4">User Management Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-8">
          {/* Maximum Users */}
          <div>
            <div className="text-sm mb-2">Maximum Users</div>
            <select
              name="maximumUsers"
              value={formData.maximumUsers}
              onChange={handleChange}
              className="w-full p-4 bg-light_blue text-white rounded-md focus:outline-none"
            >
              <option value="" disabled>
                Select Maximum Users
              </option>
              <option value="0">0</option>
              <option value="1000">1000</option>
              <option value="5000">5000</option>
            </select>
          </div>

          {/* Default User Role */}
          <div>
            <div className="text-sm mb-2">Default User Role</div>
            <select
              name="defaultUserRole"
              value={formData.defaultUserRole}
              onChange={handleChange}
              className="w-full p-4 bg-light_blue text-white rounded-md focus:outline-none"
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="player">Player</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* User Verification */}
          <div>
            <div className="text-sm mb-2">User Verification</div>
            <select
              name="userVerification"
              value={formData.userVerification}
              onChange={handleChange}
              className="w-full p-4 bg-light_blue text-white rounded-md focus:outline-none"
            >
              <option value="" disabled>
                Select Verification
              </option>
              <option value="enable">Enable</option>
              <option value="disable">Disable</option>
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
              Update User Settings
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default User;
