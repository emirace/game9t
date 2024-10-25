function Delete() {
  return (
    <div>
      <div className="text-lg font-medium mb-4">Account Deletion</div>
      <div className=" flex items-start justify-between mb-4">
        <div>
          <div className="text-sm">Delete Account</div>
          <div className="text-xs font-light">
            Permanently delete your account. Warning: All data will be lost.
          </div>
        </div>
        <button className="bg-white rounded-full text-xs py-1 px-2 text-black">
          Delete
        </button>
      </div>
    </div>
  );
}

export default Delete;
