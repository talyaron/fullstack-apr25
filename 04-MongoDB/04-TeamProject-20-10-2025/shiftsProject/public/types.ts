// ===============================================
// TYPE DEFINITIONS - Global Types
// ===============================================

declare global {
  type UserRole = 'manager' | 'soldier';

  interface User {
    id: string;
    role: UserRole;
    username: string;
    password: string;
    control_center: string;
    createdAt: Date;
    updatedAt: Date;
  }

  interface Mission {
    id: string;
    mission_type: string;
    date: string;
    control_center_number: string;
    amount_people: number;
    notes?: string;
    status: 'pending' | 'active' | 'completed';
    createdAt: Date;
  }

  interface DashboardStats {
    totalMissions: number;
    doneMissons: number;
    pendingMissions: number;
    completedMissions: number;
    totalSoldiers: number;
    totalTeams: number;
  }

  interface CreateMissionFormData {
    mission_type: string;
    date: string;
    control_center_number: string;
    amount_people: number;
    notes?: string;
  }

  interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
  }
}

export {}; // זה הופך את הקובץ ל-module בלי לייצא כלום