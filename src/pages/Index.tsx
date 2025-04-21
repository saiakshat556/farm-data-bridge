
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LandingPage from "./LandingPage";
import { auth } from "@/services/api";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // If user is already logged in, redirect to their dashboard
    const user = auth.getCurrentUser();
    if (user) {
      if (user.role === "farmer") {
        navigate("/farmer");
      } else if (user.role === "officer") {
        navigate("/officer");
      } else if (user.role === "admin") {
        navigate("/admin");
      }
    }
  }, [navigate]);
  
  return <LandingPage />;
};

export default Index;
