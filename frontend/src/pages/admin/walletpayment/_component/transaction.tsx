function Transaction() {
  return (
    <div>
      <div className="font-jua text-lg mb-4">Transaction Oversight</div>

      <table className="min-w-full table-auto rounded-lg">
        <thead>
          <tr className="bg-dark text-white text-left">
            <th className="p-4 font-jua">Transaction ID</th>
            <th className="p-4 font-jua">Username</th>
            <th className="p-4 font-jua">Date</th>
            <th className="p-4 font-jua">Type</th>
            <th className="p-4 font-jua">Amount</th>
            <th className="p-4 font-jua">Status</th>
            <th className="p-4 font-jua text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <tr
              key={index}
              className={`${
                index % 2 ? "bg-light_blue" : null
              } text-white hover:bg-dark_blue`}
            >
              <td className="p-4">{index + 1}</td>
              <td className="p-4">Johndoe123</td>
              <td className="p-4">2024-10-07</td>
              <td className="p-4">Deposit</td>
              <td className="p-4">₦500</td>
              <td className="p-4">Completed</td>
              <td className="p-4 font-bold">
                <div className="flex items-center justify-center gap-3">
                  <button className="bg-cream text-black text-xs p-1 px-4 rounded-full">
                    Approve
                  </button>
                  <button className="bg-cream text-black text-xs p-1 px-4 rounded-full">
                    Reject
                  </button>
                  <button className="bg-cream text-black text-xs p-1 px-4 rounded-full">
                    View Details
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-6 mb-16 ">
        <span>Showing: 12 / 30</span>
        <div>
          <button className="hover:underline mr-4">PREVIOUS /</button>
          <button className="hover:underline">NEXT</button>
        </div>
      </div>
    </div>
  );
}

export default Transaction;
