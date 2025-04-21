
import { LoginCredentials, RegisterData, AuthResponse, Crop, CropSubmission, User, Notification, NotificationType } from '@/lib/types';

// This is a mock API service for frontend development
// In a real application, these would connect to your backend endpoints

const API_DELAY = 600; // Simulate network delay

// Helper to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data
const users = [
  {
    id: "user-1",
    name: "John Farmer",
    email: "farmer@example.com",
    password: "password123", // In a real app, passwords would be hashed
    role: "farmer",
    createdAt: "2023-01-15T10:30:00Z"
  },
  {
    id: "user-2",
    name: "Jane Officer",
    email: "officer@example.com",
    password: "password123",
    role: "officer",
    createdAt: "2023-01-10T08:20:00Z"
  },
  {
    id: "user-3",
    name: "Admin User",
    email: "admin@example.com",
    password: "password123",
    role: "admin",
    createdAt: "2023-01-01T00:00:00Z"
  }
];

const crops: Crop[] = [
  {
    id: "crop-1",
    userId: "user-1",
    cropType: "Wheat",
    quantity: 500,
    unit: "kg",
    growthStage: "Mature",
    plantingDate: "2023-03-15T00:00:00Z",
    harvestDate: "2023-06-15T00:00:00Z",
    location: "Field A",
    status: "approved" as const,
    feedback: "Looks great! Approved.",
    createdAt: "2023-03-15T10:30:00Z",
    updatedAt: "2023-03-16T14:20:00Z"
  },
  {
    id: "crop-2",
    userId: "user-1",
    cropType: "Corn",
    quantity: 300,
    unit: "kg",
    growthStage: "Growing",
    plantingDate: "2023-04-10T00:00:00Z",
    location: "Field B",
    status: "pending" as const,
    createdAt: "2023-04-10T09:15:00Z",
    updatedAt: "2023-04-10T09:15:00Z"
  },
  {
    id: "crop-3",
    userId: "user-1",
    cropType: "Soybeans",
    quantity: 200,
    unit: "kg",
    growthStage: "Seedling",
    plantingDate: "2023-04-25T00:00:00Z",
    location: "Field C",
    status: "rejected" as const,
    feedback: "Insufficient details provided. Please add more information about growing conditions.",
    createdAt: "2023-04-25T16:45:00Z",
    updatedAt: "2023-04-26T10:20:00Z"
  }
];

const notifications: Notification[] = [
  {
    id: "notif-1",
    userId: "user-1",
    title: "Crop Approved",
    message: "Your wheat crop submission has been approved.",
    read: false,
    type: "success",
    timestamp: "2023-03-16T14:20:00Z"
  },
  {
    id: "notif-2",
    userId: "user-1",
    title: "Crop Rejected",
    message: "Your soybean crop submission has been rejected. Please check the feedback.",
    read: false,
    type: "error",
    timestamp: "2023-04-26T10:20:00Z"
  },
  {
    id: "notif-3",
    userId: "user-2",
    title: "New Submission",
    message: "A farmer has submitted a new crop for review.",
    read: true,
    type: "info",
    timestamp: "2023-04-10T09:15:00Z"
  }
];

// Authentication API
export const auth = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    await delay(API_DELAY);
    
    const user = users.find(u => 
      u.email === credentials.email && u.password === credentials.password
    );
    
    if (!user) {
      throw new Error("Invalid credentials");
    }
    
    const { password, ...userWithoutPassword } = user;
    const token = `mock-jwt-token-${user.id}`;
    
    // Store in localStorage for persistence
    localStorage.setItem('cropconnect_token', token);
    localStorage.setItem('cropconnect_user', JSON.stringify(userWithoutPassword));
    
    return {
      token,
      user: userWithoutPassword as User
    };
  },
  
  register: async (data: RegisterData): Promise<AuthResponse> => {
    await delay(API_DELAY);
    
    if (users.some(u => u.email === data.email)) {
      throw new Error("User already exists");
    }
    
    const newUser = {
      id: `user-${users.length + 1}`,
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    
    const { password, ...userWithoutPassword } = newUser;
    const token = `mock-jwt-token-${newUser.id}`;
    
    // Store in localStorage for persistence
    localStorage.setItem('cropconnect_token', token);
    localStorage.setItem('cropconnect_user', JSON.stringify(userWithoutPassword));
    
    return {
      token,
      user: userWithoutPassword as User
    };
  },
  
  logout: async (): Promise<void> => {
    await delay(API_DELAY);
    localStorage.removeItem('cropconnect_token');
    localStorage.removeItem('cropconnect_user');
  },
  
  getCurrentUser: (): User | null => {
    const userJson = localStorage.getItem('cropconnect_user');
    return userJson ? JSON.parse(userJson) : null;
  },
  
  isAuthenticated: (): boolean => {
    return localStorage.getItem('cropconnect_token') !== null;
  }
};

// Crops API
export const cropService = {
  getAllCrops: async (): Promise<Crop[]> => {
    await delay(API_DELAY);
    return [...crops];
  },
  
  getFarmerCrops: async (userId: string): Promise<Crop[]> => {
    await delay(API_DELAY);
    return crops.filter(crop => crop.userId === userId);
  },
  
  getCropById: async (id: string): Promise<Crop | undefined> => {
    await delay(API_DELAY);
    return crops.find(crop => crop.id === id);
  },
  
  addCrop: async (userId: string, cropData: CropSubmission): Promise<Crop> => {
    await delay(API_DELAY);
    
    const newCrop: Crop = {
      id: `crop-${crops.length + 1}`,
      userId,
      ...cropData,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    crops.push(newCrop);
    
    // Create notification for officers
    const officerIds = users.filter(u => u.role === "officer").map(u => u.id);
    
    officerIds.forEach(officerId => {
      const newNotification: Notification = {
        id: `notif-${notifications.length + 1}`,
        userId: officerId,
        title: "New Crop Submission",
        message: `A new ${cropData.cropType} crop has been submitted for review.`,
        read: false,
        type: "info",
        timestamp: new Date().toISOString()
      };
      notifications.push(newNotification);
    });
    
    return newCrop;
  },
  
  updateCropStatus: async (
    id: string, 
    status: "approved" | "rejected", 
    feedback?: string
  ): Promise<Crop> => {
    await delay(API_DELAY);
    
    const cropIndex = crops.findIndex(crop => crop.id === id);
    if (cropIndex === -1) {
      throw new Error("Crop not found");
    }
    
    const updatedCrop = {
      ...crops[cropIndex],
      status,
      feedback,
      updatedAt: new Date().toISOString()
    };
    
    crops[cropIndex] = updatedCrop;
    
    // Create notification for the farmer
    const notificationType: NotificationType = status === "approved" ? "success" : "error";
    
    const newNotification: Notification = {
      id: `notif-${notifications.length + 1}`,
      userId: updatedCrop.userId,
      title: status === "approved" ? "Crop Approved" : "Crop Rejected",
      message: status === "approved" 
        ? `Your ${updatedCrop.cropType} crop submission has been approved.`
        : `Your ${updatedCrop.cropType} crop submission has been rejected. ${feedback || ''}`,
      read: false,
      type: notificationType,
      timestamp: new Date().toISOString()
    };
    
    notifications.push(newNotification);
    
    return updatedCrop;
  }
};

// Notifications API
export const notificationService = {
  getUserNotifications: async (userId: string): Promise<Notification[]> => {
    await delay(API_DELAY);
    return notifications
      .filter(notif => notif.userId === userId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  },
  
  markAsRead: async (id: string): Promise<Notification> => {
    await delay(API_DELAY);
    
    const notifIndex = notifications.findIndex(notif => notif.id === id);
    if (notifIndex === -1) {
      throw new Error("Notification not found");
    }
    
    const updatedNotif = {
      ...notifications[notifIndex],
      read: true
    };
    
    notifications[notifIndex] = updatedNotif;
    return updatedNotif;
  },
  
  markAllAsRead: async (userId: string): Promise<void> => {
    await delay(API_DELAY);
    
    notifications.forEach((notif, index) => {
      if (notif.userId === userId) {
        notifications[index] = {
          ...notif,
          read: true
        };
      }
    });
  }
};

// Users API (for admin)
export const userService = {
  getAllUsers: async (): Promise<User[]> => {
    await delay(API_DELAY);
    return users.map(({ password, ...user }) => user as User);
  },
  
  getUserById: async (id: string): Promise<User | undefined> => {
    await delay(API_DELAY);
    const user = users.find(u => u.id === id);
    if (!user) return undefined;
    
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  },
  
  getUserStats: async () => {
    await delay(API_DELAY);
    
    const totalUsers = users.length;
    const farmers = users.filter(u => u.role === "farmer").length;
    const officers = users.filter(u => u.role === "officer").length;
    const admins = users.filter(u => u.role === "admin").length;
    
    // Mock stats for new users (last 30 days)
    const newUsers = 2;
    const activeUsers = 3;
    
    return {
      totalUsers,
      farmers,
      officers,
      admins,
      newUsers,
      activeUsers
    };
  }
};

// Dashboard stats
export const statsService = {
  getFarmerStats: async (userId: string) => {
    await delay(API_DELAY);
    
    const userCrops = crops.filter(crop => crop.userId === userId);
    
    return {
      total: userCrops.length,
      approved: userCrops.filter(crop => crop.status === "approved").length,
      rejected: userCrops.filter(crop => crop.status === "rejected").length,
      pending: userCrops.filter(crop => crop.status === "pending").length,
      totalChange: 20,
      approvedChange: 15,
      rejectedChange: -5,
      pendingChange: 10
    };
  },
  
  getOfficerStats: async () => {
    await delay(API_DELAY);
    
    return {
      total: crops.length,
      approved: crops.filter(crop => crop.status === "approved").length,
      rejected: crops.filter(crop => crop.status === "rejected").length,
      pending: crops.filter(crop => crop.status === "pending").length,
      totalChange: 15,
      approvedChange: 10,
      rejectedChange: 0,
      pendingChange: 5
    };
  },
  
  getAdminStats: async () => {
    await delay(API_DELAY);
    
    return {
      total: crops.length,
      approved: crops.filter(crop => crop.status === "approved").length,
      rejected: crops.filter(crop => crop.status === "rejected").length,
      pending: crops.filter(crop => crop.status === "pending").length,
      totalChange: 25,
      approvedChange: 20,
      rejectedChange: -10,
      pendingChange: 15
    };
  }
};
