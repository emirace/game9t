import ICONS from "../../../../assets/icons/icons";

const stats = [
  { icon: ICONS.profile_outline, name: "Active Users", value: "12,000" },
  { icon: "", name: "Ongoing Games", value: "300" },
  { icon: ICONS.dollar, name: "Revenue", value: "45,000" },
];

function Stat() {
  return (
    <div className="grid grid-cols-3 gap-6 mb-5">
      {stats.map((item, index) => (
        <div key={index} className="bg-light_blue p-4 rounded-md">
          <div className="flex items-center gap-2">
            <img src={item.icon} className=" h-4" />
            <div className="font-jua">{item.name}</div>
          </div>
          <div className="text-2xl font-bold">{item.value}</div>
        </div>
      ))}
    </div>
  );
}

export default Stat;
