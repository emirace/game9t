import { useState } from "react";
import ICONS from "../../assets/icons/icons";
import { useToastNotification } from "../../context/toastNotificationContext";
import { useUser } from "../../context/user";
import Loading from "../_components/loading";

function Social() {
  const { user, updateUser } = useUser();
  const { addNotification } = useToastNotification();
  const [facebook, setFacebook] = useState(user?.socialInfo?.facebook);
  const [x, setX] = useState(user?.socialInfo?.x);
  const [instagram, setInstagram] = useState(user?.socialInfo?.instagram);
  const [other, setOther] = useState(user?.socialInfo?.other);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await updateUser({ socialInfo: { facebook, instagram, x, other } });
      addNotification({ message: "Social info updated succesfully" });
    } catch (error: any) {
      addNotification({ message: error, error: true });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="text-lg mb-2">Add Biography</div>
      <div className="mt-6 flex flex-col gap-4 ">
        <div className="flex items-center gap-3">
          <img src={ICONS.x} alt="social" className="h-6" />
          <input
            type="text"
            className="w-full px-4 py-1  rounded-md bg-black  focus:outline-none "
            value={x}
            onChange={(e) => setX(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <img src={ICONS.instagram} alt="social" className="h-6" />
          <input
            type="text"
            className="w-full px-4 py-1  rounded-md bg-black  focus:outline-none "
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <img src={ICONS.facebook} alt="social" className="h-6" />
          <input
            type="text"
            className="w-full px-4 py-1  rounded-md bg-black  focus:outline-none "
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <img src={ICONS.bot} alt="social" className="h-6" />
          <input
            type="text"
            className="w-full px-4 py-1  rounded-md bg-black  focus:outline-none "
            value={other}
            onChange={(e) => setOther(e.target.value)}
          />
        </div>
        <div className="font-medium p-6 py-3">+Add More</div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleUpdate}
            className="bg-white rounded-full text-xs py-1 px-2 text-black"
            disabled={loading}
          >
            Update Changes
          </button>
          {loading && <Loading size="sm" />}
        </div>
      </div>
    </div>
  );
}

export default Social;
