import { useEffect, useState } from "react";
import {
  approveWithdrawalRequest,
  declineWithdrawalRequest,
  fetchAllWithdrawalRequests,
} from "../../../../services/withdrawalRequest";
import { IWithdrawalRequest } from "../../../../types/withdrawalRequest";
import moment from "moment";
import { useToastNotification } from "../../../../context/toastNotificationContext";

function Withdrawal() {
  const { addNotification } = useToastNotification();
  const [page, setPage] = useState(1);
  const [requests, setRequests] = useState<IWithdrawalRequest[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const handleApprove = async (id: string) => {
    try {
      const updatedRequest = await approveWithdrawalRequest(id);
    } catch (error: any) {
      addNotification({ message: error, error: true });
    }
  };

  const handleDecline = async (id: string) => {
    try {
      const updatedRequest = await declineWithdrawalRequest(id);
    } catch (error: any) {
      addNotification({ message: error, error: true });
    }
  };

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const data = await fetchAllWithdrawalRequests(page, 20);
        setRequests(data.withdrawalRequests);
        setTotalPages(data.totalPages);
        setTotalCount(data.totalCount);
      } catch (error) {
        console.log("Error loading withdrawal requests:", error);
      }
    };

    loadRequests();
  }, [page]);

  return (
    <div>
      <div className="font-jua text-lg mb-4">Withdrawal Requests</div>

      <table className="min-w-full table-auto rounded-lg">
        <thead>
          <tr className="bg-dark text-white text-left">
            <th className="p-4 font-jua">Request ID</th>
            <th className="p-4 font-jua">User ID</th>
            <th className="p-4 font-jua">Amount</th>
            <th className="p-4 font-jua">Requested Date</th>
            <th className="p-4 font-jua">Status</th>
            <th className="p-4 font-jua text-center">Actions</th>
          </tr>
        </thead>
        {requests.length <= 0 && (
          <div className="p-5">No withdrawal request</div>
        )}
        <tbody>
          {requests.map((request, index) => (
            <tr
              key={request._id}
              className={`${
                index % 2 ? "bg-light_blue" : null
              } text-white hover:bg-dark_blue`}
            >
              <td className="p-4">{request._id}</td>
              <td className="p-4">{request.user.username}</td>
              <td className="p-4">₦{request.amount}</td>
              <td className="p-4">{moment(request.createdAt).calendar()}</td>
              <td className="p-4">{request.status}</td>
              <td className="p-4 font-bold">
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => handleApprove(request._id)}
                    className="bg-cream text-black text-xs p-1 px-4 rounded-full"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDecline(request._id)}
                    className="bg-cream text-black text-xs p-1 px-4 rounded-full"
                  >
                    Reject
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-6 mb-16 ">
        <span>
          Showing: {requests.length} / {totalCount}
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

export default Withdrawal;
