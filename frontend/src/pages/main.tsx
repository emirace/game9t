import { Outlet } from "react-router-dom";
import { GameSessionProvider } from "../context/gameSession";
import ScrollToTop from "./_components/ScrollToTop";
import { useBranding } from "../context/branding";
import { useEffect } from "react";
import {
  setFontStyle,
  setFontSize,
  setFavicon,
  setThemeColor,
} from "../utils/branding";
import Loading from "./_components/loading";
import ToastNotification from "./_components/toastNotification";
import AcceptGame from "./_components/acceptGame";

function Main() {
  const { branding, loading } = useBranding();
  useEffect(() => {
    if (branding) {
      if (branding.color) setThemeColor(branding.color);
      if (branding.font?.family) setFontStyle(branding.font.family);
      if (branding.font?.size) setFontSize(`${branding.font.size}px`);
      if (branding.favicon) setFavicon(branding.favicon);
    }
  }, [branding]);
  return (
    <GameSessionProvider>
      <ToastNotification />
      <AcceptGame />
      <ScrollToTop />
      {loading ? (
        <div className="h-screen w-screen bg-black flex justify-center items-center ">
          <Loading />
        </div>
      ) : (
        <Outlet />
      )}
    </GameSessionProvider>
  );
}

export default Main;
