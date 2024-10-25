import { useState } from "react";
import { useUser } from "../../context/user";
import { useToastNotification } from "../../context/toastNotificationContext";
import Loading from "../_components/loading";

function Bio() {
  const { user, updateUser } = useUser();
  const { addNotification } = useToastNotification();
  const [bio, setBio] = useState(user?.bio);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      if (!bio) {
        addNotification({ message: "Biography is required", error: true });
      }
      setLoading(true);
      await updateUser({ bio });
      setEdit(false);
      addNotification({ message: "Biography updated succesfully" });
    } catch (error: any) {
      addNotification({ message: error, error: true });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-full flex flex-col gap-4">
      <div className="text-lg mb-2">Add Biography</div>
      {!edit ? (
        <div className="mb-2 text-sm">{bio}</div>
      ) : (
        <textarea
          name="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Add your biography"
          className="p-2 bg-black text-white flex-1 w-full rounded-md focus:outline-none "
        />
      )}
      <div className="flex items-center gap-4">
        <button
          onClick={() => (edit ? handleUpdate() : setEdit(true))}
          className="bg-white rounded-full self-start  text-xs py-1 px-2 text-black"
          disabled={loading}
        >
          {edit ? "Update" : "Edit"}
        </button>
        {loading && <Loading size="sm" />}
      </div>
    </div>
  );
}

export default Bio;
