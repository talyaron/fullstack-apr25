// ===============================================
// DASHBOARD TYPESCRIPT - Manager View
// ===============================================

import type {
  User,
  UserRole,
  Mission,
  DashboardStats,
  CreateMissionFormData,
  ApiResponse
} from './types';

// ===============================================
// STATE MANAGEMENT
// ===============================================

class DashboardState {
  private currentUser: User | null = null;
  private currentView: string = 'overview';
  private stats: DashboardStats = {
    totalMissions: 0,
    activeMissions: 0,
    pendingMissions: 0,
    completedMissions: 0,
    totalSoldiers: 0,
    totalTeams: 0
  };

  setUser(user: User): void {
    this.currentUser = user;
  }

  getUser(): User | null {
    return this.currentUser;
  }

  setView(view: string): void {
    this.currentView = view;
  }

  getView(): string {
    return this.currentView;
  }

  setStats(stats: DashboardStats): void {
    this.stats = stats;
  }

  getStats(): DashboardStats {
    return this.stats;
  }
}

const state = new DashboardState();

// ===============================================
// DOM ELEMENTS
// ===============================================

const elements = {
  // Navigation
  navItems: document.querySelectorAll<HTMLAnchorElement>('.dashboard__nav-item'),
  
  // Views
  views: document.querySelectorAll<HTMLElement>('.dashboard__view'),
  overviewView: document.getElementById('overviewView') as HTMLElement,
  createMissionView: document.getElementById('createMissionView') as HTMLElement,
  
  // Stats
  totalMissionsEl: document.getElementById('totalMissions') as HTMLElement,
  pendingMissionsEl: document.getElementById('pendingMissions') as HTMLElement,
  activeMissionsEl: document.getElementById('activeMissions') as HTMLElement,
  totalSoldiersEl: document.getElementById('totalSoldiers') as HTMLElement,
  
  // User
  userNameEl: document.getElementById('userName') as HTMLElement,
  userRoleEl: document.getElementById('userRole') as HTMLElement,
  logoutBtn: document.getElementById('logoutBtn') as HTMLButtonElement,
  
  // Forms
  createMissionForm: document.getElementById('createMissionForm') as HTMLFormElement,
  cancelMissionBtn: document.getElementById('cancelMissionBtn') as HTMLButtonElement,
  
  // Quick Actions
  quickActions: document.querySelectorAll<HTMLButtonElement>('.quick-action'),
  
  // Tables
  recentMissionsTable: document.getElementById('recentMissionsTable') as HTMLElement
};

// ===============================================
// NAVIGATION
// ===============================================

const navigateToView = (viewName: string): void => {
  // Hide all views
  elements.views.forEach((view) => {
    view.classList.add('dashboard__view--hidden');
  });

  // Show selected view
  const targetView = document.getElementById(`${viewName}View`);
  if (targetView) {
    targetView.classList.remove('dashboard__view--hidden');
  }

  // Update navigation active state
  elements.navItems.forEach((item) => {
    item.classList.remove('dashboard__nav-item--active');
    if (item.dataset.view === viewName) {
      item.classList.add('dashboard__nav-item--active');
    }
  });

  // Update state
  state.setView(viewName);

  // Update URL hash
  window.location.hash = viewName;
};

// Navigation click handlers
elements.navItems.forEach((item) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const viewName = item.dataset.view;
    if (viewName) {
      navigateToView(viewName);
    }
  });
});

// ===============================================
// QUICK ACTIONS
// ===============================================

elements.quickActions.forEach((btn) => {
  btn.addEventListener('click', () => {
    const action = btn.dataset.action;
    
    switch (action) {
      case 'create-mission':
        navigateToView('create-mission');
        break;
      case 'view-missions':
        navigateToView('missions');
        break;
      case 'manage-personnel':
        navigateToView('personnel');
        break;
    }
  });
});

// ===============================================
// STATS
// ===============================================

const updateStats = (stats: DashboardStats): void => {
  elements.totalMissionsEl.textContent = stats.totalMissions.toString();
  elements.pendingMissionsEl.textContent = stats.pendingMissions.toString();
  elements.activeMissionsEl.textContent = stats.activeMissions.toString();
  elements.totalSoldiersEl.textContent = stats.totalSoldiers.toString();
  
  state.setStats(stats);
};

const fetchStats = async (): Promise<void> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch('/api/stats');
    // const data: ApiResponse<DashboardStats> = await response.json();
    
    // Mock data for now
    const mockStats: DashboardStats = {
      totalMissions: 42,
      activeMissions: 15,
      pendingMissions: 8,
      completedMissions: 19,
      totalSoldiers: 156,
      totalTeams: 12
    };
    
    updateStats(mockStats);
  } catch (error) {
    console.error('Error fetching stats:', error);
  }
};

// ===============================================
// CREATE MISSION FORM
// ===============================================

const handleCreateMission = async (e: Event): Promise<void> => {
  e.preventDefault();
  
  const formData = new FormData(elements.createMissionForm);
  const missionData: CreateMissionFormData = {
    mission_type: formData.get('mission_type') as any,
    date: formData.get('date') as string,
    control_center_number: formData.get('control_center_number') as string,
    amount_people: Number(formData.get('amount_people')),
    notes: formData.get('notes') as string
  };
  
  console.log('Creating mission:', missionData);
  
  try {
    // TODO: Replace with actual API call
    // const response = await fetch('/api/missions', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(missionData)
    // });
    // const result: ApiResponse<Mission> = await response.json();
    
    // Mock success
    alert('המשימה נוצרה בהצלחה!');
    elements.createMissionForm.reset();
    navigateToView('overview');
    
    // Refresh stats
    await fetchStats();
  } catch (error) {
    console.error('Error creating mission:', error);
    alert('שגיאה ביצירת המשימה');
  }
};

elements.createMissionForm.addEventListener('submit', handleCreateMission);

elements.cancelMissionBtn.addEventListener('click', () => {
  elements.createMissionForm.reset();
  navigateToView('overview');
});

// ===============================================
// LOGOUT
// ===============================================

elements.logoutBtn.addEventListener('click', () => {
  if (confirm('האם אתה בטוח שברצונך להתנתק?')) {
    // TODO: Clear session/token
    window.location.href = '/index.html';
  }
});

// ===============================================
// LOAD CONTROL CENTERS
// ===============================================

const loadControlCenters = async (): Promise<void> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch('/api/control-centers');
    // const data: ApiResponse<ControlCenter[]> = await response.json();
    
    // Mock data
    const mockCenters = [
      { id: '1', control_center_number: '001', name: 'מרכז בקרה צפון' },
      { id: '2', control_center_number: '002', name: 'מרכז בקרה דרום' },
      { id: '3', control_center_number: '003', name: 'מרכז בקרה מרכז' }
    ];
    
    const select = document.getElementById('controlCenter') as HTMLSelectElement;
    mockCenters.forEach((center) => {
      const option = document.createElement('option');
      option.value = center.control_center_number;
      option.textContent = center.name;
      select.appendChild(option);
    });
  } catch (error) {
    console.error('Error loading control centers:', error);
  }
};

// ===============================================
// INITIALIZATION
// ===============================================

const initDashboard = async (): Promise<void> => {
  // TODO: Check authentication
  // const token = localStorage.getItem('token');
  // if (!token) {
  //   window.location.href = '/index.html';
  //   return;
  // }
  
  // Mock user
  const mockUser: User = {
    id: '1',
    role: 'manager',
    username: 'manager1',
    password: '',
    control_center: '001',
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  state.setUser(mockUser);
  elements.userNameEl.textContent = 'מפקד ראשי';
  elements.userRoleEl.textContent = 'מפקד עליון';
  
  // Load initial data
  await Promise.all([
    fetchStats(),
    loadControlCenters()
  ]);
  
  // Handle initial route
  const hash = window.location.hash.slice(1);
  if (hash) {
    navigateToView(hash);
  }
};

// Start the dashboard
initDashboard();