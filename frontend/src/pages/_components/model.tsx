import React, { useEffect, useState } from "react";
import ICONS from "../../assets/icons/icons";

interface ModelProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Model: React.FC<ModelProps> = ({ children, isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  // Sync the internal visibility state with the `isOpen` prop
  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  return (
    <>
      <div
        className={`fixed top-1/2  translate-x-1/2 right-1/2 h-[75%] w-3/4 bg-light_blue rounded-md overflow-y-auto p-6 transform transition-transform duration-300 ease-in-out ${
          isVisible ? "-translate-y-1/2" : "translate-y-full"
        } z-40`}
      >
        <img
          src={ICONS.close}
          onClick={onClose}
          alt="close"
          className="w-4 h-4 absolute top-6 right-4 z-10"
        />

        {/* Model Content */}
        {isVisible && <div className="h-full ">{children}</div>}
      </div>

      {/* Overlay when sidebar is open */}
      {isVisible && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={onClose} // Close the sidebar when clicking outside
        ></div>
      )}
    </>
  );
};

export default Model;
