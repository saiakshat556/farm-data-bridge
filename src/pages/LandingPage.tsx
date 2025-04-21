
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f7f7]">
      {/* Navigation Bar */}
      <header className="border-b bg-white shadow-none">
        <nav className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="h-9 w-9 bg-cropGreen rounded-md flex items-center justify-center mr-2">
              <span className="text-white font-extrabold text-lg">CC</span>
            </div>
            <span className="font-bold text-2xl text-cropGreen select-none tracking-tight">CropConnect</span>
          </div>
          <div className="flex gap-5">
            <Button
              variant="ghost"
              onClick={() => navigate("/login")}
              className="font-semibold text-gray-700 hover:text-cropGreen px-6"
            >
              Sign In
            </Button>
            <Button
              onClick={() => navigate("/register")}
              className="bg-cropGreen hover:bg-cropGreen-dark text-white font-semibold px-7 py-2 shadow uppercase"
              style={{ borderRadius: "8px" }}
            >
              Get Started
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-1 items-center justify-center min-h-[calc(100vh-64px)] px-4">
        <div className="flex flex-col md:flex-row w-full max-w-6xl gap-12 py-8">
          {/* Left */}
          <div className="md:w-1/2 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a242d] leading-tight mb-7">
              Connecting Farmers<br />and Officials for<br />Better Agriculture
            </h1>
            <p className="text-lg text-[#374151] mb-8 max-w-lg">
              CropConnect streamlines agricultural data management, enabling farmers to easily submit crop information and officials to efficiently verify and approve submissions.
            </p>
            <div className="flex gap-4">
              <Button
                onClick={() => navigate("/register")}
                className="bg-cropGreen hover:bg-cropGreen-dark text-white font-semibold px-7 py-3 text-base shadow"
                style={{ borderRadius: "7px" }}
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/login")}
                className="border-cropGreen text-cropGreen font-semibold px-7 py-3 text-base"
                style={{ borderRadius: "7px" }}
              >
                Sign In
              </Button>
            </div>
          </div>
          {/* Right */}
          <div className="md:w-1/2 flex items-center">
            <img
              src="/lovable-uploads/c02f4aea-480b-4141-bae0-8d8bfc694565.png"
              alt="Agriculture scene"
              className="rounded-xl shadow-lg w-full max-h-[340px] object-cover bg-[#eaeaea]"
              style={{ minWidth: "290px", border: "none" }}
              draggable={false}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;

