
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CropCardProps {
  id: string;
  cropType: string;
  quantity: number;
  unit: string;
  growthStage: string;
  plantingDate: string;
  status: "pending" | "approved" | "rejected";
  feedback?: string;
  onClick?: () => void;
}

export const CropCard = ({
  id,
  cropType,
  quantity,
  unit,
  growthStage,
  plantingDate,
  status,
  feedback,
  onClick,
}: CropCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const getStatusDetails = () => {
    switch (status) {
      case "approved":
        return {
          icon: <CheckCircle className="h-5 w-5 text-green-500" />,
          label: "Approved",
          color: "bg-green-100 text-green-800 border-green-200",
        };
      case "rejected":
        return {
          icon: <XCircle className="h-5 w-5 text-red-500" />,
          label: "Rejected",
          color: "bg-red-100 text-red-800 border-red-200",
        };
      default:
        return {
          icon: <Clock className="h-5 w-5 text-amber-500" />,
          label: "Pending",
          color: "bg-amber-100 text-amber-800 border-amber-200",
        };
    }
  };

  const statusDetails = getStatusDetails();

  return (
    <Card 
      className={cn(
        "border-l-4 transition-all hover:shadow-md cursor-pointer",
        status === "pending" ? "border-l-amber-500" : 
        status === "approved" ? "border-l-green-500" : 
        "border-l-red-500"
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{cropType}</CardTitle>
          <Badge className={statusDetails.color}>
            <span className="flex items-center">
              {statusDetails.icon}
              <span className="ml-1">{statusDetails.label}</span>
            </span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-gray-500">Quantity</p>
            <p className="font-medium">
              {quantity} {unit}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Growth Stage</p>
            <p className="font-medium">{growthStage}</p>
          </div>
          <div>
            <p className="text-gray-500">Planting Date</p>
            <p className="font-medium">{formatDate(plantingDate)}</p>
          </div>
          <div>
            <p className="text-gray-500">ID</p>
            <p className="font-medium text-gray-600 text-xs">{id.substring(0, 8)}...</p>
          </div>
        </div>
        
        {feedback && status === "rejected" && (
          <div className="mt-3 p-2 bg-red-50 border border-red-100 text-sm rounded">
            <p className="text-gray-500 mb-1">Feedback:</p>
            <p className="text-red-800">{feedback}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CropCard;
