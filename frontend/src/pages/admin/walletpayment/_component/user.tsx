import { useEffect, useState } from "react";
import { fetchAllWallet } from "../../../../services/wallet";
import { IWallet } from "../../../../types/wallet";

function User() {
  const [wallets, setWallets] = useState<IWallet[]>([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const loadWallets = async () => {
      try {
        const data = await fetchAllWallet({ page, limit: 20 });
        setWallets(data.wallets);
        setTotalPages(data.totalPages);
        setTotalCount(data.totalCount);
      } catch (error) {
        console.log("Error loading withdrawal requests:", error);
      }
    };

    loadWallets();
  }, [page]);

  return (
    <div>
      <div className="font-jua text-lg mb-4">Users Wallet Management</div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto rounded-lg">
          <thead>
            <tr className="bg-dark text-white text-left">
              <th className="p-4 font-jua">User ID</th>
              <th className="p-4 font-jua">Username</th>
              <th className="p-4 font-jua">Wallet Balance</th>
              <th className="p-4 font-jua">Status</th>
              <th className="p-4 font-jua text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {wallets.map((wallet, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 ? "bg-light_blue" : null
                } text-white hover:bg-dark_blue`}
              >
                <td className="p-4">{wallet._id}</td>
                <td className="p-4">{wallet.user?.username}</td>
                <td className="p-4">{wallet.balance}</td>
                <td className="p-4">
                  {wallet.isActive ? "Active" : "Inactive"}
                </td>
                <td className="p-4 font-bold">
                  <div className="flex items-center justify-center gap-3">
                    <button className="bg-cream text-black text-xs p-1 px-4 rounded-full whitespace-nowrap">
                      View Transactions
                    </button>
                    <button className="bg-cream text-black text-xs p-1 px-4 rounded-full whitespace-nowrap">
                      Adjust Balance
                    </button>
                    <button className="bg-cream text-black text-xs p-1 px-4 rounded-full whitespace-nowrap">
                      Block User
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-6 mb-16 ">
        <span>
          Showing: {wallets.length} / {totalCount}
        </span>
        <div>
          <button
            disabled={page <= 1}
            onClick={() => (page > 1 ? setPage(page - 1) : null)}
            className="hover:underline mr-4 disabled:text-gray-500"
          >
            PREVIOUS /
          </button>
          <button
            disabled={page >= totalPages}
            onClick={() => (page < totalPages ? setPage(page + 1) : null)}
            className="hover:underline disabled:text-gray-500"
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
}

export default User;
