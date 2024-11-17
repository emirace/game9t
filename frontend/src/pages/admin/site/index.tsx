import Copyright from "./_component/copyright";
import Footer from "./_component/footer";
import Logo from "./_component/logo";
import Typo from "./_component/typo";
import Widget from "./_component/widget";

function Site() {
  return (
    <div>
      <h1 className="font-jua text-xl">Site Customization</h1>
      <div className="text-sm mb-6">
        Manage site color, brand identity, Typography and More
      </div>
      <Logo />

      <h2 className="font-jua text-xl mb-4 mt-8">Navigation Menu</h2>
      <div className="flex gap-4 items-center">
        {["Home", "Games", "Leaderboard", "FAQ"].map((menu) => (
          <div className="p-3 bg-black rounded-md min-w-28">{menu}</div>
        ))}
        <div>+ Add More</div>
      </div>

      <Typo />

      <Footer />
      <Copyright />

      <Widget />
    </div>
  );
}

export default Site;
