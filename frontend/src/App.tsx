import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { UserProvider } from "./context/user";
import { ToastNotificationProvider } from "./context/toastNotificationContext";
import { GameProvider } from "./context/game";
import { WalletProvider } from "./context/wallet";
import { TransactionProvider } from "./context/transaction";
import { SocketProvider } from "./context/socket";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrandingProvider } from "./context/branding";
import { NotificationProvider } from "./context/notification";
import { MessageProvider } from "./context/message";

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
                    <MessageProvider>
                      <GoogleOAuthProvider clientId="466890716370-e5srktqi1k90ejf3vbdmkrg38fbdb8a9.apps.googleusercontent.com">
                        <RouterProvider router={router} />
                      </GoogleOAuthProvider>
                    </MessageProvider>
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
