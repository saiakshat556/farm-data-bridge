
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, Activity, Cog } from "lucide-react";

const roles = [
  {
    label: "Farmer",
    role: "farmer",
    icon: (
      <img
        src="/lovable-uploads/8fa10a55-54b0-459d-a4a8-5220c86e6f98.png"
        alt="Farmer"
        className="h-16 w-16"
      />
    ),
    cardStyle: "border-yellow-400 hover:shadow-lg",
    textStyle: "text-cropGreen",
    border: "border-2",
  },
  {
    label: "Employee",
    role: "officer",
    icon: (
      <img
        src="/lovable-uploads/9068e8a8-dc37-4c77-9c2d-0d28020ad34f.png"
        alt="Employee"
        className="h-16 w-16"
      />
    ),
    cardStyle: "border-yellow-400 hover:shadow-lg",
    textStyle: "text-cropGreen",
    border: "border-2",
  },
  {
    label: "Admin",
    role: "admin",
    icon: (
      <img
        src="/lovable-uploads/6610e586-3a94-4540-acf0-21fbd86ab3ee.png"
        alt="Admin"
        className="h-16 w-16"
      />
    ),
    cardStyle: "border-yellow-400 hover:shadow-lg",
    textStyle: "text-cropGreen",
    border: "border-2",
  },
];

const highlightTabs = [
  { label: "Spotlight", active: true },
  { label: "Trending", active: false },
];

const RoleSelectionPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f8f8] flex flex-col">
      {/* Header */}
      <header className="w-full bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto flex items-center justify-center py-5">
          {/* Logo - can be enhanced with SVG if desired */}
          <div className="flex items-center gap-3">
            <span className="text-cropGreen text-3xl font-extrabold">
              <svg width={50} height={40} viewBox="0 0 64 40">
                <circle cx={20} cy={29} r={6} fill="#4F7942" />
                <rect x={10} y={27} width={20} height={6} rx={2} fill="#A67B5B" />
                <rect x={33} y={32} width={18} height={4} rx={2} fill="#A67B5B" />
                <rect x={45} y={10} width={12} height={8} rx={2} fill="#4F7942" />
                <circle cx={52} cy={7} r={3} fill="#4F7942" />
              </svg>
            </span>
            <span className="text-cropGreen font-serif text-3xl font-bold tracking-tight">CROPCONNECT</span>
          </div>
        </div>
      </header>
      {/* Main Section */}
      <main className="flex-1 flex flex-col items-center px-2 md:px-0">
        <h2 className="mt-8 text-2xl md:text-3xl font-bold text-cropGreen mb-6">Choose Your Role</h2>
        {/* Role cards */}
        <div className="flex flex-col md:flex-row gap-8 mb-10">
          {roles.map((r) => (
            <div
              key={r.label}
              className={`bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 min-w-[198px] max-w-xs ${r.cardStyle} ${r.border}`}
              style={{ borderTopWidth: "4px" }}
              onClick={() => navigate("/login", { state: { role: r.role } })}
            >
              {r.icon}
              <span className={`mt-6 text-lg font-semibold ${r.textStyle}`}>{r.label}</span>
            </div>
          ))}
        </div>

        {/* Latest updates */}
        <h3 className="text-xl mb-1 text-cropGreen font-semibold">Latest Updates</h3>
        <div className="flex w-full md:w-[660px] gap-6 mb-12 justify-center">
          {highlightTabs.map((tab, i) => (
            <div
              key={tab.label}
              className="flex-1 bg-white mx-2 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center"
            >
              <Button
                variant="ghost"
                className={`w-full py-6 my-2 rounded-lg text-cropGreen text-lg font-semibold hover:bg-cropGreen/10 relative ${
                  tab.active ? "underline underline-offset-8 decoration-[3px] decoration-yellow-400" : ""
                }`}
              >
                {tab.label}
              </Button>
            </div>
          ))}
        </div>
      </main>
      {/* Footer */}
      <footer className="w-full bg-cropGreen absolute bottom-0 left-0 text-white text-sm py-2 mt-auto">
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
