import { useState } from "react";
import { IProfileData, IUser } from "../../../../types/user";
import Loading from "../../../_components/loading";

interface Props {
  user: IUser | null;
  handleSubmit: (id: string, data: IProfileData) => Promise<void>;
}

function EditUser({ user, handleSubmit }: Props) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    role: user?.role || "",
    status: user?.status || "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    await handleSubmit(user?._id, formData);
    setLoading(false);
  };

  return (
    <form onSubmit={handleUpdateUser} className=" space-y-6">
      <h2 className="text-2xl  font-jua">Edit User Details</h2>

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleInputChange}
        className="w-full p-3 bg-black rounded"
        required
      />

      <input
        type="text"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleInputChange}
        className="w-full p-3 bg-black rounded"
        required
      />

      <select
        name="role"
        value={formData.role}
        onChange={handleInputChange}
        className="w-full p-3 bg-black rounded"
        required
      >
        <option value="player">Player</option>
        <option value="admin">Admin</option>
        <option value="moderator">Moderator</option>
      </select>

      <select
        name="status"
        value={formData.status}
        onChange={handleInputChange}
        className="w-full p-3 bg-black rounded"
        required
      >
        <option value="active">Active</option>
        <option value="suspended">Suspended</option>
        <option value="deactivated">Deactivated</option>
      </select>
      <div className="flex items-end justify-end">
        <button
          type="submit"
          className="py-2 px-8 mt-4 bg-black  justify-center text-cream hover:bg-cream hover:text-black  flex items-center gap-2 rounded-full"
          disabled={loading}
        >
          {loading && <Loading size="sm" />}
          <span className="font-jua">Save Changes</span>
        </button>
      </div>
    </form>
  );
}

export default EditUser;
