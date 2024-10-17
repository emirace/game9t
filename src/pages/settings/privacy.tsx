import Checkbox from "../profile/_components/checkbox";

function Privacy() {
  return (
    <div>
      <div className="border-b border-b-cream mb-4">
        <div className="text-lg font-medium mb-4">Profile Visibility</div>
        <div className=" flex items-center justify-between mb-4">
          <div className="text-sm">
            <b>Public</b> (Anyone Can See Your Profile)
          </div>
          <Checkbox onChange={() => {}} />
        </div>
        <div className=" flex items-center justify-between mb-4">
          <div className="text-sm">
            <b>Private</b> (Only you can see your profile.)
          </div>{" "}
          <Checkbox onChange={() => {}} />
        </div>
        <div className=" flex items-center justify-between mb-4">
          <div className="text-sm">
            <b>Friends</b> (Only Friends can see your profile.)
          </div>{" "}
          <Checkbox onChange={() => {}} />
        </div>
      </div>
      <div className="border-b border-b-cream mb-4">
        <div className="text-lg font-medium mb-4">Game History Visibility</div>
        <div className=" flex items-center justify-between mb-4">
          <div className="text-sm">
            <b>Everyone</b> (Anyone Can See Your Profile)
          </div>
          <Checkbox onChange={() => {}} />
        </div>
        <div className=" flex items-center justify-between mb-4">
          <div className="text-sm">
            <b>Friends Only</b> (Only you can see your profile.)
          </div>
          <Checkbox onChange={() => {}} />
        </div>
        <div className=" flex items-center justify-between mb-4">
          <div className="text-sm">
            <b>Private</b> (Only Friends can see your profile.)
          </div>
          <Checkbox onChange={() => {}} />
        </div>
      </div>
      <div className="">
        <div className="text-lg font-medium mb-4">Search Visibility</div>
        <div className=" flex items-center justify-between mb-4">
          <div className="text-sm">Visible To Everyone</div>
          <Checkbox onChange={() => {}} />
        </div>
      </div>
    </div>
  );
}

export default Privacy;
