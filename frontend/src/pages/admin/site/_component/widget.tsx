import { useState, useEffect } from "react";
import ICONS from "../../../../assets/icons/icons";
import { useBranding } from "../../../../context/branding";
import { useToastNotification } from "../../../../context/toastNotificationContext";

function Widget() {
  const { branding, updateBranding } = useBranding();
  const { addNotification } = useToastNotification();

  // State for widget block names
  const [blockNames, setBlockNames] = useState<string[]>(["", "", "", ""]);

  // Store initial values for change detection
  const [initialBlockNames, setInitialBlockNames] = useState(blockNames);

  // Populate block names from branding context
  useEffect(() => {
    if (branding?.widgetBlocks) {
      const initialData = branding.widgetBlocks.slice(0, 4); // Ensure it matches the 4 predefined blocks
      setBlockNames(initialData);
      setInitialBlockNames(initialData); // Store initial state for comparison
    }
  }, [branding]);

  // Handle changes to a specific block name
  const handleBlockNameChange = (index: number, value: string) => {
    setBlockNames((prevNames) => {
      const updatedNames = [...prevNames];
      updatedNames[index] = value;
      return updatedNames;
    });
  };

  // Submit updated block names
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateBranding({ widgetBlocks: blockNames });
    addNotification({ message: "Updated successfully" });
  };

  // Check if there are any changes
  const isChanged =
    JSON.stringify(blockNames) !== JSON.stringify(initialBlockNames);

  return (
    <div>
      <h2 className="font-jua text-xl mb-4 mt-8">Other Widget</h2>
      <form onSubmit={handleSubmit}>
        <div className="text-sm mb-2">Enter Block Names</div>
        <div className="grid grid-cols-4 gap-8">
          {blockNames.map((blockName, index) => {
            const placeholders = [
              "Real-Time Gaming",
              "Secure Transactions",
              "Exclusive Rewards",
              "24/7 Support",
            ];
            const icons = [ICONS.bats, ICONS.box, ICONS.tools, ICONS.users];
            return (
              <div className="relative" key={index}>
                <input
                  type="text"
                  name={`block${index + 1}`}
                  value={blockName}
                  onChange={(e) => handleBlockNameChange(index, e.target.value)}
                  placeholder={placeholders[index]}
                  className="w-full p-4 bg-black text-white rounded-md focus:outline-none"
                />
                <img
                  src={icons[index]}
                  alt="icon"
                  className="h-6 absolute top-1/2 right-4 -translate-y-1/2"
                />
              </div>
            );
          })}
        </div>

        {/* Submit Button */}
        {isChanged && (
          <div className="mt-8">
            <button
              type="submit"
              className="px-6 py-3 bg-cream text-black rounded-md font-medium hover:opacity-75 transition duration-300"
            >
              Update Block Names
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default Widget;
