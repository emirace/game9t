import { useState } from "react";
import ICONS from "../../../../../assets/icons/icons";

interface IQuestion {
  title: string;
  content: string;
}
export const Question: React.FC<IQuestion> = ({ content, title }) => {
  const [showContent, setShowContent] = useState(false);
  return (
    <div className="relative bg-dark p-4 rounded-md transform transition-transform duration-300 ease-in-out">
      <div className=" font-jua">{title}</div>
      {showContent && <div className="text-sm">{content}</div>}
      <div
        onClick={() => setShowContent(!showContent)}
        className="bg-cream p-1 absolute top-3 right-3 rounded-sm"
      >
        <img
          src={ICONS.arrow_down}
          className={`h-2 w-4 ${showContent ? "rotate-180" : ""}`}
          alt="star"
        />
      </div>
    </div>
  );
};
