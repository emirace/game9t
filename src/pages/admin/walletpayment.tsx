function Walletpayment() {
  return (
    <div>
      <h1 className="font-jua text-xl">User Management</h1>
      <div className="text-sm mb-6">
        Manage Your Users and their personal information
      </div>
      <div className="font-jua text-lg mb-4">Users Wallet Management</div>

      <table className="min-w-full table-auto rounded-lg">
        <thead>
          <tr className="bg-dark text-white text-left">
            <th className="p-4 font-jua">User ID</th>
            <th className="p-4 font-jua">Username</th>
            <th className="p-4 font-jua">Wallet Balance</th>
            <th className="p-4 font-jua">Status</th>
            <th className="p-4 font-jua">Actions</th>
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
              <td className="p-4">John Doe</td>
              <td className="p-4">Active</td>
              <td className="p-4 font-bold">
                <div className="">
                  <button className="bg-cream text-black text-xs p-1 px-4 rounded-full">
                    Active
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

export default Walletpayment;
