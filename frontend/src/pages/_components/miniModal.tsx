import React, { useEffect, useState } from "react";
import ICONS from "../../assets/icons/icons";

interface ModelProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  showClose?: boolean;
}

const MiniModel: React.FC<ModelProps> = ({
  children,
  isOpen,
  onClose,
  showClose,
}) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  // Sync the internal visibility state with the `isOpen` prop
  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  return (
    isVisible && (
      <>
        <div
          className={`fixed top-1/2  translate-x-1/2 right-1/2 w-3/4 md:w-1/2  bg-light_blue rounded-md overflow-y-auto  p-4 md:p-6 transform transition-transform duration-300 ease-in-out ${
            isVisible ? "-translate-y-1/2" : "translate-y-full"
          } z-40`}
        >
          {showClose && (
            <img
              src={ICONS.close}
              onClick={onClose}
              alt="close"
              className="w-4 h-4 absolute top-4 right-4 z-10"
            />
          )}

          {/* MiniModel Content */}
          {isVisible && <div className="h-full py-4 ">{children}</div>}
        </div>

        {/* Overlay when sidebar is open */}
        {isVisible && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-30"
            onClick={onClose} // Close the sidebar when clicking outside
          ></div>
        )}
      </>
    )
  );
};

export default MiniModel;
