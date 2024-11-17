import { useState, useEffect } from "react";
import ICONS from "../../../../assets/icons/icons";
import { useBranding } from "../../../../context/branding";

function Footer() {
  const { branding, updateBranding } = useBranding();

  // Initialize local state for form fields
  const [formData, setFormData] = useState({
    aboutUs: "",
    quickLinks: "",
    socialMedia: {
      facebook: "",
      instagram: "",
      twitter: "",
    },
    legalPages: "",
  });

  // Keep track of the initial state for comparison
  const [initialFooter, setInitialFooter] = useState(formData);

  // Set default values from branding context on initial load
  useEffect(() => {
    if (branding) {
      const initialData = {
        aboutUs: branding?.aboutUs || "",
        quickLinks: branding?.quickLinks || "",
        socialMedia: {
          facebook: branding?.socialMedia?.facebook || "",
          instagram: branding?.socialMedia?.instagram || "",
          twitter: branding?.socialMedia?.twitter || "",
        },
        legalPages: branding?.legalPages || "",
      };
      setFormData(initialData);
      setInitialFooter(initialData); // Store the initial state
    }
  }, [branding]);

  // Handle input change for form fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("socialMedia")) {
      const [social, platform] = name.split(".");
      console.log(social);
      setFormData((prevData) => ({
        ...prevData,
        socialMedia: {
          ...prevData.socialMedia,
          [platform]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle form submission to update footer
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBranding(formData);
  };

  // Check if any field has changed
  const isChanged = JSON.stringify(formData) !== JSON.stringify(initialFooter);

  return (
    <div>
      <h2 className="font-jua text-xl mb-4 mt-8">Footer Customization</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-8">
          {/* About Us */}
          <div>
            <div className="text-sm mb-2">About Us</div>
            <textarea
              name="aboutUs"
              value={formData.aboutUs}
              onChange={handleChange}
              placeholder="Write about Website"
              className="p-2 bg-black text-white flex-1 w-full rounded-md focus:outline-none h-40"
            />
          </div>

          {/* Quick Links */}
          <div>
            <div className="text-sm mb-2">Quick Links</div>
            <textarea
              name="quickLinks"
              value={formData.quickLinks}
              onChange={handleChange}
              placeholder="Add Links"
              className="p-2 bg-black text-white flex-1 w-full rounded-md focus:outline-none h-40"
            />
          </div>

          {/* Social Media Links */}
          <div>
            <div className="text-sm mb-2">Social Media Links</div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <img src={ICONS.x} alt="social" className="h-6" />
                <input
                  type="text"
                  name="socialMedia.facebook"
                  value={formData.socialMedia.facebook}
                  onChange={handleChange}
                  className="w-full px-4 py-1 rounded-md bg-black focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-3">
                <img src={ICONS.instagram} alt="social" className="h-6" />
                <input
                  type="text"
                  name="socialMedia.instagram"
                  value={formData.socialMedia.instagram}
                  onChange={handleChange}
                  className="w-full px-4 py-1 rounded-md bg-black focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-3">
                <img src={ICONS.facebook} alt="social" className="h-6" />
                <input
                  type="text"
                  name="socialMedia.twitter"
                  value={formData.socialMedia.twitter}
                  onChange={handleChange}
                  className="w-full px-4 py-1 rounded-md bg-black focus:outline-none"
                />
              </div>
              <div className="font-medium p-6 py-3">+Add More</div>
            </div>
          </div>

          {/* Legal Pages */}
          <div>
            <div className="text-sm mb-2">Legal Pages</div>
            <textarea
              name="legalPages"
              value={formData.legalPages}
              onChange={handleChange}
              placeholder="Add Links"
              className="p-2 bg-black text-white flex-1 w-full rounded-md focus:outline-none h-40"
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
              Update Footer
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default Footer;
