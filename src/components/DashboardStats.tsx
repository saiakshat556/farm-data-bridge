
import { 
  ArrowUpIcon, 
  ArrowDownIcon, 
  CheckCircle, 
  XCircle, 
  Clock 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: number | string;
  description: string;
  change?: number;
  icon: React.ReactNode;
  iconBgColor: string;
  isIncreasePositive?: boolean;
}

const StatCard = ({
  title,
  value,
  description,
  change,
  icon,
  iconBgColor,
  isIncreasePositive = true,
}: StatCardProps) => {
  const changeAbsValue = change ? Math.abs(change) : 0;
  const isIncrease = change && change > 0;
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-sm font-medium text-gray-500">
            {title}
          </CardTitle>
          <CardDescription className="text-2xl font-bold text-black">
            {value}
          </CardDescription>
        </div>
        <div className={`p-2 rounded-full ${iconBgColor}`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-sm">
          {change !== undefined && (
            <>
              <span
                className={`flex items-center mr-1 ${
                  (isIncrease && isIncreasePositive) || (!isIncrease && !isIncreasePositive)
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {isIncrease ? (
                  <ArrowUpIcon className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4 mr-1" />
                )}
                {changeAbsValue}%
              </span>
            </>
          )}
          <span className="text-gray-500">{description}</span>
        </div>
      </CardContent>
    </Card>
  );
};

interface DashboardStatsProps {
  role: "farmer" | "officer" | "admin";
  stats: {
    total: number;
    approved: number;
    rejected: number;
    pending: number;
    totalChange?: number;
    approvedChange?: number;
    rejectedChange?: number;
    pendingChange?: number;
  };
}

export const DashboardStats = ({ role, stats }: DashboardStatsProps) => {
  const cards = [
    {
      title: role === "farmer" ? "Total Crops" : "Total Submissions",
      value: stats.total,
      change: stats.totalChange,
      description: "from previous period",
      icon: <div className="h-5 w-5 bg-cropGreen rounded-full"></div>,
      iconBgColor: "bg-cropGreen/20",
    },
    {
      title: "Approved",
      value: stats.approved,
      change: stats.approvedChange,
      description: "from previous period",
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      iconBgColor: "bg-green-100",
      isIncreasePositive: true,
    },
    {
      title: "Rejected",
      value: stats.rejected,
      change: stats.rejectedChange,
      description: "from previous period",
      icon: <XCircle className="h-5 w-5 text-red-600" />,
      iconBgColor: "bg-red-100",
      isIncreasePositive: false,
    },
    {
      title: "Pending",
      value: stats.pending,
      change: stats.pendingChange,
      description: "from previous period",
      icon: <Clock className="h-5 w-5 text-amber-600" />,
      iconBgColor: "bg-amber-100",
      isIncreasePositive: role !== "officer",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <StatCard key={index} {...card} />
      ))}
    </div>
  );
};

export default DashboardStats;
