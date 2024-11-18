import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { UserProvider } from "./context/user";
import { ToastNotificationProvider } from "./context/toastNotificationContext";
import ToastNotification from "./pages/_components/toastNotification";
import { GameProvider } from "./context/game";
import { WalletProvider } from "./context/wallet";
import { TransactionProvider } from "./context/transaction";
import { SocketProvider } from "./context/socket";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrandingProvider } from "./context/branding";
import { NotificationProvider } from "./context/notification";

function App() {
  return (
    <ToastNotificationProvider>
      <BrandingProvider>
        <UserProvider>
          <SocketProvider>
            <GameProvider>
              <TransactionProvider>
                <WalletProvider>
                  <NotificationProvider>
                    <GoogleOAuthProvider clientId="<your_client_id>">
                      <ToastNotification />
                      <RouterProvider router={router} />
                    </GoogleOAuthProvider>
                  </NotificationProvider>
                </WalletProvider>
              </TransactionProvider>
            </GameProvider>
          </SocketProvider>
        </UserProvider>
      </BrandingProvider>
    </ToastNotificationProvider>
  );
}

export default App;
