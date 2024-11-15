import React from "react";
import IMAGES from "../../../assets/images/images";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../context/user";

const Hero: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <div
      className="relative w-full  bg-cover bg-bottom"
      style={{ backgroundImage: `url(${IMAGES.hero})` }}
    >
      {/* <div className="absolute inset-0 bg-dark opacity-50"></div> */}
      {/* Overlay for readability */}
      <div className="relative z-10 flex flex-col justify-center items-start h-full text-left p-8 md:p-20 ">
        <h1 className="text-3xl md:text-6xl font-bold text-cream mb-8">
          The Battle Begins Here – Play, Bet, Win!
        </h1>
        <p className="text-xl text-gray-300 mb-8 hidden md:block ">
          Play exciting games like Chess, Connect Four, and Tic Tac Toe in
          real-time. <br />
          Compete with players worldwide and claim your rewards!
        </p>
        <div className="flex flex-col items-end md:w-2/12">
          <button
            onClick={() => navigate(user ? "/lobby" : "/auth/login")}
            className="px-6 py-3 w-full bg-black text-white font-semibold rounded-full hover:bg-cream transition-colors duration-300 mb-20"
          >
            Play Now
          </button>
          {/* <div className="hidden md:flex items-center gap-4">
            <img src={ICONS.heart} alt="like" className="w-5 h-5" />
            <img src={ICONS.share} alt="share" className="w-5 h-5" />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
