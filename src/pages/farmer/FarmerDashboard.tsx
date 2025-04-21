
import { useEffect, useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import DashboardStats from "@/components/DashboardStats";
import CropCard from "@/components/CropCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { auth, cropService, statsService } from "@/services/api";
import type { Crop, DashboardStats as StatsType } from "@/lib/types";

const FarmerDashboard = () => {
  const navigate = useNavigate();
  const [crops, setCrops] = useState<Crop[]>([]);
  const [recentCrops, setRecentCrops] = useState<Crop[]>([]);
  const [stats, setStats] = useState<StatsType>({
    total: 0,
    approved: 0,
    rejected: 0,
    pending: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = auth.getCurrentUser();
        if (!user) return;

        // Fetch crops data
        const userCrops = await cropService.getFarmerCrops(user.id);
        setCrops(userCrops);
        
        // Get 3 most recent crops for the dashboard
        const sortedCrops = [...userCrops].sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setRecentCrops(sortedCrops.slice(0, 3));
        
        // Fetch dashboard stats
        const dashboardStats = await statsService.getFarmerStats(user.id);
        setStats(dashboardStats);
      } catch (error) {
        console.error("Error fetching farmer dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DashboardLayout requiredRole="farmer">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Farmer Dashboard</h1>
          <Button 
            onClick={() => navigate("/farmer/add-crop")}
            className="bg-cropGreen hover:bg-cropGreen-dark"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Crop
          </Button>
        </div>

        {/* Statistics */}
        <div className="mb-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-100 animate-pulse rounded-lg"></div>
              ))}
            </div>
          ) : (
            <DashboardStats role="farmer" stats={stats} />
          )}
        </div>

        {/* Recent submissions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Submissions</h2>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-48 bg-gray-100 animate-pulse rounded-lg"></div>
              ))}
            </div>
          ) : recentCrops.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentCrops.map((crop) => (
                <CropCard
                  key={crop.id}
                  id={crop.id}
                  cropType={crop.cropType}
                  quantity={crop.quantity}
                  unit={crop.unit}
                  growthStage={crop.growthStage}
                  plantingDate={crop.plantingDate}
                  status={crop.status}
                  feedback={crop.feedback}
                  onClick={() => navigate(`/farmer/crops/${crop.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <h3 className="text-gray-500 mb-2">No crops submitted yet</h3>
              <Button 
                onClick={() => navigate("/farmer/add-crop")}
                variant="outline"
                className="border-cropGreen text-cropGreen hover:bg-cropGreen/5"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Crop
              </Button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FarmerDashboard;
