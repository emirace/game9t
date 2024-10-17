function Transaction() {
  return (
    <div className="text-sm">
      <h2 className="text-lg  mb-6">Transactions</h2>
      <table className="min-w-full table-auto rounded-lg">
        <thead>
          <tr className="bg-dark text-white text-left">
            <th className="p-4 font-jua">ID</th>
            <th className="p-4 font-jua">Date & Time</th>
            <th className="p-4 font-jua whitespace-nowrap">Transaction Type</th>
            <th className="p-4 font-jua whitespace-nowrap">Payment Method</th>
            <th className="p-4 font-jua">Amount</th>
            <th className="p-4 font-jua">Status</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
            <tr
              key={index}
              className={`${
                index % 2 ? "bg-light_blue" : null
              } text-white hover:bg-dark_blue`}
            >
              <td className="p-4">{index + 1}</td>
              <td className="p-4">2024-09-25 14:00</td>
              <td className="p-4">Deposit</td>
              <td className="p-4">Credit Card</td>
              <td className="p-4">₦500</td>
              <td className="p-4">Completed</td>
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
