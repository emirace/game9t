import { useToastNotification } from "../../context/toastNotificationContext";
import { useUser } from "../../context/user";
import Checkbox from "../profile/_components/checkbox";

function Privacy() {
  const { user, updateUser } = useUser();
  const { addNotification } = useToastNotification();

  const handleSubmit = async (field: string, value: any) => {
    try {
      await updateUser({
        settings: {
          ...user?.settings,
          privacy: { ...user?.settings.privacy, [field]: value },
        },
      });
      addNotification({ message: "Privacy updated successfully" });
    } catch (error: any) {
      addNotification({ message: error, error: true });
    }
  };

  return (
    <div>
      <div className="border-b border-b-cream border-opacity-20 mb-4">
        <div className="text-lg font-medium mb-4">Profile Visibility</div>
        <div className=" flex items-center justify-between mb-4">
          <div className="text-sm">
            <b>Public</b> (Anyone Can See Your Profile)
          </div>
          <Checkbox
            checked={user?.settings.privacy.profileVisibility === "public"}
            onChange={() => handleSubmit("profileVisibility", "public")}
          />
        </div>
        <div className=" flex items-center justify-between mb-4">
          <div className="text-sm">
            <b>Private</b> (Only you can see your profile.)
          </div>
          <Checkbox
            checked={user?.settings.privacy.profileVisibility === "private"}
            onChange={() => handleSubmit("profileVisibility", "private")}
          />
        </div>
        <div className=" flex items-center justify-between mb-4">
          <div className="text-sm">
            <b>Friends</b> (Only Friends can see your profile.)
          </div>
          <Checkbox
            checked={
              user?.settings.privacy.profileVisibility === "friends-only"
            }
            onChange={() => handleSubmit("profileVisibility", "friends-only")}
          />
        </div>
      </div>
      <div className="border-b border-b-cream border-opacity-20 mb-4">
        <div className="text-lg font-medium mb-4">Game History Visibility</div>
        <div className=" flex items-center justify-between mb-4">
          <div className="text-sm">
            <b>Everyone</b> (Anyone Can See Your Profile)
          </div>
          <Checkbox
            checked={user?.settings.privacy.gameVisibility === "public"}
            onChange={() => handleSubmit("gameVisibility", "public")}
          />
        </div>
        <div className=" flex items-center justify-between mb-4">
          <div className="text-sm">
            <b>Friends Only</b> (Only you can see your profile.)
          </div>
          <Checkbox
            checked={user?.settings.privacy.gameVisibility === "private"}
            onChange={() => handleSubmit("gameVisibility", "private")}
          />
        </div>
        <div className=" flex items-center justify-between mb-4">
          <div className="text-sm">
            <b>Private</b> (Only Friends can see your profile.)
          </div>

          <Checkbox
            checked={user?.settings.privacy.gameVisibility === "friends-only"}
            onChange={() => handleSubmit("gameVisibility", "friends-only")}
          />
        </div>
      </div>
      <div className="">
        <div className="text-lg font-medium mb-4">Search Visibility</div>
        <div className=" flex items-center justify-between mb-4">
          <div className="text-sm">Visible To Everyone</div>

          <Checkbox
            checked={user?.settings.privacy.searchVisibility!}
            onChange={() =>
              handleSubmit(
                "searchVisibility",
                !user?.settings.privacy.searchVisibility
              )
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Privacy;
