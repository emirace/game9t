import React from "react";

interface CheckboxProps {
  onChange: (checked: boolean) => void;
  checked: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ onChange, checked }) => {
  const toggleCheckbox = () => {
    if (onChange) {
      onChange(!checked);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <div
        className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-colors duration-300 ${
          checked ? "bg-cream border-cream" : "border-cream"
        }`}
        onClick={toggleCheckbox}
      >
        {checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>

      <input
        type="checkbox"
        checked={checked}
        onChange={toggleCheckbox}
        className="hidden"
      />
    </div>
  );
};

export default Checkbox;
