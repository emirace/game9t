import { useEffect, useState } from "react";
import { IProfileData, IUser } from "../../../types/user";
import { fetchAllUsers, updateUserById } from "../../../services/user";
import moment from "moment";
import ICONS from "../../../assets/icons/icons";
import EditUser from "./_component/editUser";
import { useToastNotification } from "../../../context/toastNotificationContext";
import MiniModel from "../../_components/miniModal";

function Users() {
  const { addNotification } = useToastNotification();
  const [users, setUsers] = useState<IUser[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [showEdit, SetshowEdit] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    fetchAllUsers({ page, search, limit: 20 })
      .then((res) => {
        setUsers(res.users);
        setPage(res.currentPage);
        setTotalCount(res.totalCount);
        setTotalPages(res.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search, page]);

  const handleShowUser = (user: IUser) => {
    SetshowEdit(true);
    setUser(user);
  };

  const handleClose = () => {
    SetshowEdit(false);
    setUser(null);
  };

  const handleSubmit = async (id: string, data: IProfileData) => {
    try {
      const res = await updateUserById(id, data);
      addNotification({ message: "User updated succesfully" });
      setUsers((prev) => prev.map((user) => (user._id === id ? res : user)));
      handleClose();
    } catch (error: any) {
      addNotification({ message: error, error: true });
    }
  };

  return (
    <div className="px-6">
      <h1 className="font-jua text-xl">User Management</h1>
      <div className="text-sm mb-6">
        Manage Your Users and their personal information
      </div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <div className="font-jua text-lg">All Users ({users.length})</div>
        <div className="flex items-center gap-3">
          <img src={ICONS.filter} className="w-4" />
          <input
            placeholder="Search"
            className="bg-black w-full p-2 rounded-md"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto rounded-lg">
          <thead>
            <tr className="bg-dark text-white text-left">
              <th className="p-4 font-jua">User ID</th>
              <th className="p-4 font-jua">Username</th>
              <th className="p-4 font-jua whitespace-nowrap">Full Name</th>
              <th className="p-4 font-jua whitespace-nowrap">Email</th>
              <th className="p-4 font-jua">Role</th>
              <th className="p-4 font-jua">Registration Date</th>
              <th className="p-4 font-jua">Status</th>
              <th className="p-4 font-jua">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 ? "bg-light_blue" : null
                } text-white hover:bg-dark_blue`}
              >
                <td className="p-4">{index + 1}</td>
                <td className="p-4">{user.username}</td>
                <td className="p-4">
                  {user?.personalInfo?.firstName} {user?.personalInfo?.lastName}
                </td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.role}</td>
                <td className="p-4">{moment(user.createdAt).calendar()}</td>
                <td className="p-4">{user.status}</td>
                <td
                  className="p-4 font-bold cursor-pointer"
                  onClick={() => handleShowUser(user)}
                >
                  Edit
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-6 mb-16 ">
        <span>
          Showing: {users.length} / {totalCount}
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
      <MiniModel isOpen={showEdit} onClose={handleClose} showClose={true}>
        <EditUser user={user} handleSubmit={handleSubmit} />
      </MiniModel>
    </div>
  );
}

export default Users;
