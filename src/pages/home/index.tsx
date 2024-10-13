import IMAGES from "../../assets/images/images";
import Adsection from "./_components/adsection";
import BrowseGame from "./_components/browseGame";
import Faq from "./_components/faq";
import Features from "./_components/features";
import Hero from "./_components/hero";
import Statistic from "./_components/statistic";
import TopLeader from "./_components/topLeader";

function Home() {
  return (
    <div>
      <Hero />
      <div className="px-20 relative">
        <img
          src={IMAGES.browsegameblur}
          className="absolute right-0 top-1/4 h-1/3 z-0 "
          alt="stat"
        />
        {/* <img
          src={IMAGES.statistic}
          className="absolute left-0 -bottom-20 h-1/2 z-0 "
          alt="stat"
        /> */}
        <TopLeader />
        <BrowseGame />
      </div>
      <Statistic />
      <Adsection />
      <Features />
      <Faq />
    </div>
  );
}

export default Home;
