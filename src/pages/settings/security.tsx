function Security() {
  return (
    <div>
      <div className="text-lg font-medium mb-4">Security Settings</div>
      <div className=" flex items-start justify-between mb-4">
        <div>
          <div className="text-sm">Two-Factor Authentication (2FA)</div>
          <div className="text-xs font-light">
            Enable 2FA to add an extra layer of security.
          </div>
        </div>
        <button className="bg-white rounded-full text-xs py-1 px-2 text-black">
          Enable
        </button>
      </div>

      <div className=" flex items-start justify-between mb-4">
        <div>
          <div className="text-sm">Device Management</div>
          <div className="text-xs font-light">
            View and manage devices that have access to your account
          </div>
        </div>
        <button className="bg-white rounded-full text-xs py-1 px-2 text-black">
          Remove
        </button>
      </div>
      <div className=" flex items-start justify-between mb-4">
        <div>
          <div className="text-sm">Change Password</div>
          <div className="text-xs font-light">
            Update your password to keep your account secure.
          </div>
        </div>
        <button className="bg-white rounded-full text-xs py-1 px-2 text-black">
          Update
        </button>
      </div>
    </div>
  );
}

export default Security;
