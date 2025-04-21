
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Refs to your new icons
const farmerIcon = "/lovable-uploads/8fa10a55-54b0-459d-a4a8-5220c86e6f98.png";
const employeeIcon = "/lovable-uploads/9068e8a8-dc37-4c77-9c2d-0d28020ad34f.png";
const adminIcon = "/lovable-uploads/6610e586-3a94-4540-acf0-21fbd86ab3ee.png";

const roles = [
  {
    label: "Farmer",
    role: "farmer",
    icon: farmerIcon,
  },
  {
    label: "Employee",
    role: "officer",
    icon: employeeIcon,
  },
  {
    label: "Admin",
    role: "admin",
    icon: adminIcon,
  },
];

const tabs = [
  { label: "Spotlight", active: true },
  { label: "Trending", active: false },
];

const RoleSelectionPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f6f6f6] flex flex-col relative">
      {/* Header */}
      <header className="w-full bg-white shadow-none border-b border-[#dedede]">
        <div className="max-w-4xl mx-auto flex items-center justify-center py-2 min-h-[75px]">
          <div className="flex items-center gap-2">
            {/* Tractor Icon (Replaceable with provided SVG or PNG if required) */}
            <img
              src="/lovable-uploads/edd1bce4-00fd-4b0f-9fd5-9288a8781dd1.png"
              alt="CropConnect logo"
              className="h-9 w-12 object-contain mt-1"
              style={{ minWidth: 48 }}
            />
            <span className="text-cropGreen font-serif text-3xl font-bold tracking-tight pl-2 select-none">CROPCONNECT</span>
          </div>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-1 flex flex-col items-center w-full">
        <h2 className="mt-8 text-2xl md:text-3xl font-bold text-cropGreen mb-6">Choose Your Role</h2>
        {/* Role cards */}
        <div className="flex flex-col md:flex-row gap-8 mb-10 mt-2 items-center justify-center">
          {roles.map((r) => (
            <button
              key={r.label}
              type="button"
              className={`bg-white rounded-xl shadow-md flex flex-col items-center justify-center cursor-pointer transition-all duration-200 min-w-[190px] max-w-xs border-2 border-transparent focus:ring-2 focus:ring-cropGreen focus:outline-none relative`}
              style={{
                boxShadow: "0px 4px 16px 0px #00000010",
                borderTop: "4px solid #FFD600",
                // For visual top-border
              }}
              tabIndex={0}
              onClick={() => navigate("/login", { state: { role: r.role } })}
              onKeyDown={e => {
                if (e.key === "Enter" || e.key === " ") {
                  navigate("/login", { state: { role: r.role } });
                }
              }}
              aria-label={`Select role: ${r.label}`}
            >
              <img
                src={r.icon}
                alt={r.label}
                className="h-16 w-16 select-none mt-3"
                draggable={false}
              />
              <span className="mt-5 text-[1.23rem] font-semibold text-cropGreen mb-3 pb-1 select-none">
                {r.label}
              </span>
            </button>
          ))}
        </div>

        {/* Latest updates */}
        <h3 className="text-xl mb-2 text-cropGreen font-semibold">Latest Updates</h3>
        <div className="flex flex-col md:flex-row w-full max-w-3xl gap-5 mb-12 px-2 justify-center">
          {tabs.map((tab, idx) => (
            <button
              key={tab.label}
              className={
                `flex-1 rounded-lg border border-[#e1e1e1] bg-white shadow transition-all duration-150
                min-h-[56px] flex items-center justify-center text-cropGreen text-lg font-semibold 
                ${tab.active ? "underline underline-offset-8 decoration-[3px] decoration-yellow-400" : ""}
                hover:bg-cropGreen/10 focus:ring-2 focus:ring-cropGreen focus:outline-none`
              }
              style={{ fontWeight: 600 }}
              tabIndex={0}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-cropGreen absolute left-0 bottom-0 text-white text-sm py-2 z-10">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center px-4">
          <span>
            © {new Date().getFullYear()} Crop Connect. All rights reserved.
          </span>
          <span className="mt-1 md:mt-0 flex gap-2">
            <a href="#" className="underline hover:text-yellow-200">About Us</a>
            <span className="mx-1">|</span>
            <a href="#" className="underline hover:text-yellow-200">Contact</a>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default RoleSelectionPage;
