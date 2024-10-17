function Friends() {
  return (
    <div>
      <div className="text-lg font-medium mb-4">
        Friend & Challenge Preferences
      </div>
      <div className=" flex items-start justify-between mb-4">
        <div>
          <div className="text-sm">Friend Requests</div>
          <div className="text-xs font-light">
            Choose who can send you friend requests (Everyone, Friends Only, No
            One).
          </div>
        </div>
        <button className="bg-white rounded-full text-xs py-1 px-2 text-black">
          Friends
        </button>
      </div>

      <div className=" flex items-start justify-between mb-4">
        <div>
          <div className="text-sm">Challenges</div>
          <div className="text-xs font-light">
            Decide if others can challenge you directly or if challenges must be
            approved.
          </div>
        </div>
        <button className="bg-white rounded-full text-xs py-1 px-2 text-black">
          Edit
        </button>
      </div>
    </div>
  );
}

export default Friends;
