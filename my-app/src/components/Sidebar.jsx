import { useState } from "react";
import { Home, AlertTriangle, BarChart2, User, Settings } from "lucide-react";

function Sidebar() {
  const [active, setActive] = useState("Home");

  const menuItems = [
    { name: "Home", icon: <Home size={20} /> },
    { name: "Alerts", icon: <AlertTriangle size={20} /> },
    { name: "Reports", icon: <BarChart2 size={20} /> },
    { name: "Profile", icon: <User size={20} /> },
  ];

  return (
    <div className="h-screen w-64 bg-white-900 text-white flex flex-col justify-between">
      {/* Top Menu */}
      <div>
        <div className="p-4 bg-green-900 text-center rounded-b-xl cursor-pointer flex items-center justify-center gap-2">
            <h1 className="text-2xl font-bold mb-6 text-white-400">InfraGuard AI</h1>
        </div>
        <ul className="space-y-3">
          {menuItems.map((item) => (
            <li
              key={item.name}
              onClick={() => setActive(item.name)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition ${
                active === item.name
                  ? "bg-green-600 text-white"
                  : "hover:bg-gray-700 text-green-800"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Account Section (Bottom) */}
      <div className="p-4 bg-green-900 text-center rounded-t-xl cursor-pointer flex items-center justify-center gap-2">
        <Settings size={18} />
        <span className="font-semibold">Account</span>
      </div>
    </div>
  );
}

export default Sidebar;
