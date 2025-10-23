// ===============================================
// TYPES & INTERFACES - Military Task System
// ===============================================

// User Roles
export type UserRole = 'manager' | 'commander' | 'soldier';

export const UserRoleDisplay: Record<UserRole, string> = {
  manager: 'מפקד עליון',
  commander: 'מפקד',
  soldier: 'חייל'
};

// Mission Types
export type MissionType = 
  | 'guard_duty'
  | 'patrol'
  | 'training'
  | 'maintenance'
  | 'operation'
  | 'other';

export const MissionTypeDisplay: Record<MissionType, string> = {
  guard_duty: 'שמירה',
  patrol: 'סיור',
  training: 'אימון',
  maintenance: 'תחזוקה',
  operation: 'מבצע',
  other: 'אחר'
};

// Mission Status
export type MissionStatus = 
  | 'pending'      // ממתינה להקצאה
  | 'assigned'     // הוקצתה
  | 'in_progress'  // בביצוע
  | 'completed'    // הושלמה
  | 'cancelled';   // בוטלה

export const MissionStatusDisplay: Record<MissionStatus, string> = {
  pending: 'ממתינה',
  assigned: 'הוקצתה',
  in_progress: 'בביצוע',
  completed: 'הושלמה',
  cancelled: 'בוטלה'
};

// ===============================================
// ENTITIES
// ===============================================

// User Interface
export interface User {
  id: string;
  role: UserRole;
  username: string;
  password: string;
  control_center: string;
  createdAt: Date;
  updatedAt: Date;
}

// Control Center Interface
export interface ControlCenter {
  id: string;
  control_center_number: string;
  name: string;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Person Interface (Soldier/Personnel)
export interface Person {
  id: string;
  person_id: string;           // מספר אישי
  first_name: string;
  last_name: string;
  phone_number: string;
  control_center_number: string;
  rank?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Team Interface
export interface Team {
  id: string;
  control_center_number: string;
  team_number: string;
  person_id: string;           // מפקד הצוות
  members?: Person[];
  createdAt: Date;
  updatedAt: Date;
}

// Mission Interface
export interface Mission {
  id: string;
  mission_type: MissionType;
  date: Date;
  control_center_number: string;
  amount_people: number;
  notes?: string;
  assigness_people: string[];  // Array of person_ids
  status: MissionStatus;
  created_by: string;          // user_id של המפקד שיצר
  assigned_by?: string;        // user_id של המפקד שהקצה
  createdAt: Date;
  updatedAt: Date;
}

// ===============================================
// DASHBOARD STATS
// ===============================================

export interface DashboardStats {
  totalMissions: number;
  activeMissions: number;
  pendingMissions: number;
  completedMissions: number;
  totalSoldiers: number;
  totalTeams: number;
}

// ===============================================
// FORM DATA
// ===============================================

export interface CreateMissionFormData {
  mission_type: MissionType;
  date: string;
  control_center_number: string;
  amount_people: number;
  notes: string;
}

export interface AssignMissionFormData {
  mission_id: string;
  assigness_people: string[];
}

// ===============================================
// API RESPONSE
// ===============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  limit: number;
}