function Newsletter() {
  return (
    <div className="px-4 md:px-20 flex flex-col justify-center items-center mb-40">
      <div className="font-jua text-3xl text-center mb-5">
        Stay Ahead of the Game with Our Exclusive Newsletter
      </div>
      <div className="text-center mb-2 max-w-2xl">
        Get the latest updates on top games, exclusive content, and gaming tips
        delivered straight to your inbox.
      </div>
      <div className="bg-black p-2 px-8 flex gap-2 items-center max-w-xl w-full rounded-md">
        <input placeholder="Email Address" className="bg-black w-full" />
      </div>
      <div className="flex justify-center pt-8">
        <button
          //   onClick={onButtonClick}
          className="px-8 py-3 min-w-48 bg-black text-white font-jua rounded-full hover:bg-dark_blue transition-colors"
        >
          Join Now
        </button>
      </div>
    </div>
  );
}

export default Newsletter;
