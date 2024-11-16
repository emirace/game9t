import ICONS from "../../assets/icons/icons";

function Site() {
  return (
    <div>
      <h1 className="font-jua text-xl">Site Customization</h1>
      <div className="text-sm mb-6">
        Manage site color, brand identity, Typography and More
      </div>
      <h2 className="font-jua text-xl mb-4">Logo & Branding</h2>
      <div className="grid grid-cols-3 gap-8">
        <div>
          <div className="text-sm mb-2">Website Name</div>
          <input
            type="text"
            name="name"
            placeholder="Enter Website Name"
            className="w-full p-4 bg-black text-white rounded-md focus:outline-none "
          />
        </div>
        <div>
          <div className="text-sm mb-2">Website Logo</div>
          <div className="relative">
            <input
              type="text"
              name="name"
              placeholder="Upload Logo"
              className="w-full p-4 bg-black text-white rounded-md focus:outline-none "
            />
            <button
              type="submit"
              className=" absolute top-1/2 right-4 -translate-y-1/2 px-4 py-1 bg-cream text-black font-light text-xs rounded-full transition duration-300"
            >
              Update Logo
            </button>
          </div>
        </div>
        <div>
          <div className="text-sm mb-2">Website Favicon</div>
          <div className="relative">
            <input
              type="text"
              name="name"
              placeholder="Upload Favicon"
              className="w-full p-4 bg-black text-white rounded-md focus:outline-none "
            />
            <button
              type="submit"
              className=" absolute top-1/2 right-4 -translate-y-1/2 px-4 py-1 bg-cream text-black font-light text-xs rounded-full transition duration-300"
            >
              Update Favicon
            </button>
          </div>
        </div>
        <div>
          <div className="text-sm mb-2">Brand Color</div>
          <div className="relative">
            <div className="w-full p-4 bg-black  rounded-md flex gap-3 ">
              <div className="w-5 h-5 bg-light_blue  " />
              <div>#123456</div>
            </div>
            <button
              type="submit"
              className=" absolute top-1/2 right-4 -translate-y-1/2 w-5 h-5 bg-light_blue"
            />
          </div>
        </div>
        <div>
          <div className="text-sm mb-2">Timezone Settings</div>
          <select
            name="country"
            // value={formData.country}
            // onChange={handleInputChange}
            className="w-full p-4 bg-light_blue text-white rounded-md focus:outline-none"
          >
            <option value="" disabled>
              Select Timezone
            </option>
            {/* {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))} */}
          </select>
        </div>
        <div>
          <div className="text-sm mb-2">Default Language</div>
          <select
            name="country"
            // value={formData.country}
            // onChange={handleInputChange}
            className="w-full p-4 bg-light_blue text-white rounded-md focus:outline-none"
          >
            <option value="" disabled>
              Select Language
            </option>
            {/* {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))} */}
          </select>
        </div>
      </div>

      <h2 className="font-jua text-xl mb-4 mt-8">Navigation Menu</h2>
      <div className="flex gap-4 items-center">
        {["Home", "Games", "Leaderboard", "FAQ"].map((menu) => (
          <div className="p-3 bg-black rounded-md min-w-28">{menu}</div>
        ))}
        <div>+ Add More</div>
      </div>

      <h2 className="font-jua text-xl mb-4 mt-8">Footer Customazation</h2>
      <div className="grid grid-cols-3 gap-8">
        <div>
          <div className="text-sm mb-2">About Us</div>
          <textarea
            name="bio"
            // value={bio}
            // onChange={(e) => setBio(e.target.value)}
            placeholder="Write about Website"
            className="p-2 bg-black text-white flex-1 w-full rounded-md focus:outline-none h-40"
          />
        </div>
        <div>
          <div className="text-sm mb-2">Quick Links</div>
          <textarea
            name="bio"
            // value={bio}
            // onChange={(e) => setBio(e.target.value)}
            placeholder="Add Links"
            className="p-2 bg-black text-white flex-1 w-full rounded-md focus:outline-none h-40"
          />
        </div>
        <div>
          <div className="text-sm mb-2">Social Media Links</div>
          <div className=" flex flex-col gap-4 ">
            <div className="flex items-center gap-3">
              <img src={ICONS.x} alt="social" className="h-6" />
              <input
                type="text"
                className="w-full px-4 py-1  rounded-md bg-black  focus:outline-none "
                // value={x}
                // onChange={(e) => setX(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <img src={ICONS.instagram} alt="social" className="h-6" />
              <input
                type="text"
                className="w-full px-4 py-1  rounded-md bg-black  focus:outline-none "
                // value={instagram}
                // onChange={(e) => setInstagram(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <img src={ICONS.facebook} alt="social" className="h-6" />
              <input
                type="text"
                className="w-full px-4 py-1  rounded-md bg-black  focus:outline-none "
                // value={facebook}
                // onChange={(e) => setFacebook(e.target.value)}
              />
            </div>
            <div className="font-medium p-6 py-3">+Add More</div>
          </div>
        </div>

        <div>
          <div className="text-sm mb-2">Legal Pages</div>
          <textarea
            name="bio"
            // value={bio}
            // onChange={(e) => setBio(e.target.value)}
            placeholder="Add Links"
            className="p-2 bg-black text-white flex-1 w-full rounded-md focus:outline-none h-40"
          />
        </div>
      </div>

      <h2 className="font-jua text-xl mb-4 mt-8">CopyWrite Information</h2>
      <div className="grid grid-cols-3 gap-8">
        <div>
          <div className="text-sm mb-2">Website Name</div>
          <input
            type="text"
            name="name"
            placeholder="@ Your Website Name"
            className="w-full p-4 bg-black text-white rounded-md focus:outline-none "
          />
        </div>
      </div>

      <h2 className="font-jua text-xl mb-4 mt-8">Other Widget </h2>
      <div className="text-sm mb-2"> Enter Block Names</div>
      <div className="grid grid-cols-4 gap-8">
        <div className="relative">
          <input
            type="text"
            name="name"
            placeholder="Real-Time Gaming"
            className="w-full p-4 bg-black text-white rounded-md focus:outline-none "
          />
          <img
            src={ICONS.bats}
            alt="social"
            className="h-6  absolute top-1/2 right-4 -translate-y-1/2 "
          />
        </div>
        <div className="relative">
          <input
            type="text"
            name="name"
            placeholder="Secure Transactions"
            className="w-full p-4 bg-black text-white rounded-md focus:outline-none "
          />
          <img
            src={ICONS.box}
            alt="social"
            className="h-6  absolute top-1/2 right-4 -translate-y-1/2 "
          />
        </div>
        <div className="relative">
          <input
            type="text"
            name="name"
            placeholder="Exclusive Rewards"
            className="w-full p-4 bg-black text-white rounded-md focus:outline-none "
          />
          <img
            src={ICONS.tools}
            alt="social"
            className="h-6  absolute top-1/2 right-4 -translate-y-1/2 "
          />
        </div>
        <div className="relative">
          <input
            type="text"
            name="name"
            placeholder="24/7 Support"
            className="w-full p-4 bg-black text-white rounded-md focus:outline-none "
          />
          <img
            src={ICONS.users}
            alt="social"
            className="h-6  absolute top-1/2 right-4 -translate-y-1/2 "
          />
        </div>
      </div>
    </div>
  );
}

export default Site;
