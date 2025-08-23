import { useState } from "react";
import { Link } from "react-router-dom";
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
    <div className="fixed top-0 left-0 h-screen w-64 bg-white text-black flex flex-col justify-between shadow-md">
      {/* Top Menu */}
      <div>
        <div className="p-4 bg-green-900 text-center cursor-pointer flex items-center justify-center gap-2 mb-6">
          <h1 className="text-2xl font-bold text-white">InfraGuard AI</h1>
        </div>
        <ul className="space-y-3">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.name === "Home" ? "/" : `/${item.name.toLowerCase()}`}
                onClick={() => setActive(item.name)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  active === item.name
                    ? "bg-green-600 text-white"
                    : "hover:bg-gray-200 text-green-800"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Account Section (Bottom) */}
      <div className="p-4 bg-gray-100 text-center cursor-pointer flex items-center justify-center gap-2">
        <Settings className="text-gray-900" size={18} />
        <span className="font-semibold text-gray-800">Account</span>
      </div>
    </div>
  );
}

export default Sidebar;
