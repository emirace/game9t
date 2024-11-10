import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { UserProvider } from "./context/user";
import { ToastNotificationProvider } from "./context/toastNotificationContext";
import ToastNotification from "./pages/_components/toastNotification";
import { GameProvider } from "./context/game";
import { WalletProvider } from "./context/wallet";
import { TransactionProvider } from "./context/transaction";
import { SocketProvider } from "./context/socket";

function App() {
  return (
    <ToastNotificationProvider>
      <UserProvider>
        <SocketProvider>
          <GameProvider>
            <WalletProvider>
              <TransactionProvider>
                <ToastNotification />
                <RouterProvider router={router} />
              </TransactionProvider>
            </WalletProvider>
          </GameProvider>
        </SocketProvider>
      </UserProvider>
    </ToastNotificationProvider>
  );
}

export default App;
