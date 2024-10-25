import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { UserProvider } from "./context/user";
import { ToastNotificationProvider } from "./context/toastNotificationContext";
import ToastNotification from "./pages/_components/toastNotification";
import { GameProvider } from "./context/game";
import { WalletProvider } from "./context/wallet";
import { TransactionProvider } from "./context/transaction";

function App() {
  return (
    <ToastNotificationProvider>
      <UserProvider>
        <GameProvider>
          <WalletProvider>
            <TransactionProvider>
              <ToastNotification />
              <RouterProvider router={router} />
            </TransactionProvider>
          </WalletProvider>
        </GameProvider>
      </UserProvider>
    </ToastNotificationProvider>
  );
}

export default App;
