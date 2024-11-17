import { useState, useEffect } from "react";
import { useBranding } from "../../../../context/branding";

function Typo() {
  const { branding, updateBranding } = useBranding();

  // Initialize local state for typography settings
  const [formData, setFormData] = useState({
    family: "",
    size: "",
    headingStyle: "",
  });

  // Keep track of the initial state for comparison
  const [initialTypo, setInitialTypo] = useState(formData);

  // Set default values from branding context on initial load
  useEffect(() => {
    if (branding) {
      const initialData = branding?.font;

      setFormData(initialData);
      setInitialTypo(initialData); // Store the initial state
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

  // Handle form submission to update typography
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBranding({ font: formData });
  };

  // Check if any field has changed
  const isChanged = JSON.stringify(formData) !== JSON.stringify(initialTypo);

  return (
    <div>
      <h2 className="font-jua text-xl mb-4 mt-8">Typography</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-8">
          {/* Select Font */}
          <div>
            <div className="text-sm mb-2">Select Font</div>
            <select
              name="family"
              value={formData.family}
              onChange={handleChange}
              className="w-full p-4 bg-light_blue text-white rounded-md focus:outline-none"
            >
              <option value="" disabled>
                Select font
              </option>
              <option value="Roboto">Roboto</option>
              <option value="Arial">Arial</option>
              <option value="Verdana">Verdana</option>
              <option value="Times New Roman">Times New Roman</option>
              {/* Add other font options here */}
            </select>
          </div>

          {/* Select Font Size */}
          <div>
            <div className="text-sm mb-2">Font Size</div>
            <select
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="w-full p-4 bg-light_blue text-white rounded-md focus:outline-none"
            >
              <option value="" disabled>
                Select size
              </option>
              <option value="12">12</option>
              <option value="14">14</option>
              <option value="16">16</option>
              {/* Add other font size options here */}
            </select>
          </div>

          {/* Heading Style */}
          <div>
            <div className="text-sm mb-2">Heading Style</div>
            <select
              name="headingStyle"
              value={formData.headingStyle}
              onChange={handleChange}
              className="w-full p-4 bg-light_blue text-white rounded-md focus:outline-none"
            >
              <option value="" disabled>
                Select style
              </option>
              <option value="bold">Bold</option>
              <option value="italic">Italic</option>
              <option value="underline">Underline</option>
              {/* Add other heading styles here */}
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
              Update Typography
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default Typo;
