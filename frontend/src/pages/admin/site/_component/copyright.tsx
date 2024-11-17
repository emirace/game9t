import { useState, useEffect } from "react";
import { useBranding } from "../../../../context/branding";

function Copyright() {
  const { branding, updateBranding } = useBranding();

  // Initialize local state for the copyright (website name)
  const [formData, setFormData] = useState({
    copyright: "",
  });

  // Keep track of the initial state for comparison
  const [initialCopyright, setInitialCopyright] = useState(formData);

  // Set default values from branding context on initial load
  useEffect(() => {
    if (branding) {
      const initialData = {
        copyright: branding?.copyright || "",
      };
      setFormData(initialData);
      setInitialCopyright(initialData); // Store the initial state
    }
  }, [branding]);

  // Handle input change for form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission to update copyright information
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBranding(formData);
  };

  // Check if any field has changed
  const isChanged =
    JSON.stringify(formData) !== JSON.stringify(initialCopyright);

  return (
    <div>
      <h2 className="font-jua text-xl mb-4 mt-8">Copyright Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-8">
          <div>
            <div className="text-sm mb-2">Copyright message</div>
            <input
              type="text"
              name="copyright"
              value={formData.copyright}
              onChange={handleChange}
              placeholder="@ Your Website Name"
              className="w-full p-4 bg-black text-white rounded-md focus:outline-none "
            />
          </div>
        </div>

        {/* Submit Button */}
        {isChanged && (
          <div className="mt-8">
            <button
              type="submit"
              className="px-6 py-3 bg-cream text-black rounded-md font-medium hover:opacity-75 transition duration-300"
            >
              Update Copyright Info
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default Copyright;
