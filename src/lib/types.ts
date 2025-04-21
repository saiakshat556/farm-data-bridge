
// User Types
export type UserRole = "farmer" | "officer" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  role: UserRole;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Crop Types
export type CropStatus = "pending" | "approved" | "rejected";

export interface Crop {
  id: string;
  userId: string;
  cropType: string;
  quantity: number;
  unit: string;
  growthStage: string;
  plantingDate: string;
  harvestDate?: string;
  location?: string;
  status: CropStatus;
  feedback?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CropSubmission {
  cropType: string;
  quantity: number;
  unit: string;
  growthStage: string;
  plantingDate: string;
  harvestDate?: string;
  location?: string;
}

// Notification Types
export type NotificationType = "info" | "success" | "warning" | "error";

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  type: NotificationType;
  timestamp: string;
}

// Stats Types
export interface DashboardStats {
  total: number;
  approved: number;
  rejected: number;
  pending: number;
  totalChange?: number;
  approvedChange?: number;
  rejectedChange?: number;
  pendingChange?: number;
}

// Admin Types
export interface UserStats {
  totalUsers: number;
  farmers: number;
  officers: number;
  admins: number;
  newUsers: number;
  activeUsers: number;
}

export interface SystemSettings {
  notificationsEnabled: boolean;
  backupFrequency: "daily" | "weekly" | "monthly";
  maintenanceMode: boolean;
}
