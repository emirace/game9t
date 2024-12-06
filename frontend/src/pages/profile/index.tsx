import { Link, Outlet } from "react-router-dom";
import ICONS from "../../assets/icons/icons";
import Stats from "./_components/stats";
import Sidebar from "./_components/sidebar";
import { useUser } from "../../context/user";
import moment from "moment";
import { useState } from "react";
import { useToastNotification } from "../../context/toastNotificationContext";
import Loading from "../_components/loading";
import IMAGES from "../../assets/images/images";
import { compressImageUpload } from "../../utils/image";
import { imageUrl } from "../../services/api";

function Profile() {
  const { user, updateUser, logout } = useUser();
  const { addNotification } = useToastNotification();
  const [username, setUsername] = useState(user?.username);
  const [editUsername, setEditUsername] = useState(false);
  const [email, setEmail] = useState(user?.email);
  const [editEmail, setEditEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async () => {
    try {
      if (!username && editUsername) {
        addNotification({ message: "Username is require", error: true });
        return;
      }

      if (!email && editEmail) {
        addNotification({ message: "Email is require", error: true });
        return;
      }
      setLoading(true);
      await updateUser(editEmail ? { email } : { username });
      addNotification({
        message: editEmail
          ? "Email updated successfully"
          : "Username updated successfully",
      });
      setEditEmail(false);
      setEditUsername(false);
    } catch (error: any) {
      addNotification({ message: error, error: true });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const imageurl = await compressImageUpload(file, 2048);
      await updateUser({ personalInfo: { profilePictureUrl: imageurl } });

      addNotification({ message: "Image uploaded successfully" });
    } catch (error) {
      addNotification({ message: "Image upload failed", error: true });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="px-4 md:px-20 py-10">
      <nav className="mb-6 flex items-center gap-2">
        <img src={ICONS.home} alt="home" className="w-4 h-4" />
        <Link to="/" className="hover:text-cream hover:underline">
          Home
        </Link>
        / <span className="text-white">Profile</span>
      </nav>
      <h1 className="text-4xl font-bold mb-8 text-cream">Profile</h1>
      <div className="bg-cream p-4 rounded-md text-black flex flex-col md:flex-row items-center justify-between ">
        <div className="">
          <div className=" font-jua text-xl mb-4">Welcome,</div>
          <div className=" flex items-center justify-between">
            <div className="flex flex-col md:flex-row items-center  space-x-4 mb-4">
              <div className="flex flex-row md:flex-col items-center gap-2">
                <img
                  src={
                    user?.personalInfo?.profilePictureUrl
                      ? imageUrl + user?.personalInfo?.profilePictureUrl
                      : IMAGES.user2
                  }
                  alt="Profile"
                  className="w-12 h-12 rounded-full bg-white"
                />
                <label
                  htmlFor="image"
                  className=" bg-white rounded-full text-xs py-1 px-2 text-black"
                >
                  <input
                    type="file"
                    id="image"
                    onChange={(e) => handleImageUpload(e)}
                    className="sr-only"
                    accept="image/*"
                    disabled={uploading}
                  />
                  Upload/Change Photo
                </label>
                {uploading && <Loading size="sm" />}
              </div>
              <table>
                <tbody>
                  <tr>
                    <td className="min-w-28">Username:</td>
                    <td>
                      <div className="flex gap-2">
                        {!editUsername ? (
                          <p className="font-jua">{user?.username}</p>
                        ) : (
                          <input
                            type="text"
                            className="w-full px-4 text-white rounded-md bg-black  focus:outline-none "
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        )}
                        <button
                          onClick={() =>
                            editUsername
                              ? handleSubmit()
                              : setEditUsername(true)
                          }
                          className="bg-white rounded-full text-xs py-1 px-2 text-black"
                        >
                          {editUsername ? "Update" : "Edit"}
                        </button>
                        {loading && editUsername && <Loading size="sm" />}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Email:</td>
                    <td>
                      <div className="flex gap-2">
                        {!editEmail ? (
                          <p className="font-jua">{user?.email}</p>
                        ) : (
                          <input
                            type="text"
                            className="w-full px-4 text-white rounded-md bg-black  focus:outline-none "
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        )}
                        <button
                          onClick={() =>
                            editEmail ? handleSubmit() : setEditEmail(true)
                          }
                          className="bg-white rounded-full text-xs py-1 px-2 text-black"
                        >
                          {editEmail ? "Update" : "Edit"}
                        </button>
                        {loading && editEmail && <Loading size="sm" />}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Member:</td>
                    <td>
                      <p className="font-jua">
                        {moment(user?.createdAt).fromNow()}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <button
          onClick={logout}
          className="px-8 py-3 min-w-48 bg-black text-white font-semibold rounded-full hover:bg-dark_blue transition-colors"
        >
          Logout
        </button>
      </div>
      <Stats />
      <div className="flex flex-col md:flex-row py-16 gap-8">
        <div className="flex-1">
          <Sidebar />
        </div>
        <div className="flex-[2] bg-[#142635] rounded-md p-4 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Profile;
