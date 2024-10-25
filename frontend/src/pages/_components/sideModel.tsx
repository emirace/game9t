import React, { useEffect, useState } from "react";
import ICONS from "../../assets/icons/icons";

interface SidebarProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const SideModel: React.FC<SidebarProps> = ({ children, isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  // Sync the internal visibility state with the `isOpen` prop
  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-dark transform transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-x-0" : "translate-x-full"
        } z-40`}
      >
        <img
          src={ICONS.close}
          onClick={onClose}
          alt="close"
          className="w-4 h-4 absolute top-6 right-4 z-10"
        />

        {/* SideModel Content */}
        <div className="p-6">{children}</div>
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

export default SideModel;
