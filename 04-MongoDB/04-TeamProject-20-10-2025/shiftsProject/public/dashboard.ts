import api from './api.js';

// Elements
const userName = document.getElementById('userName') as HTMLSpanElement;
const userRole = document.getElementById('userRole') as HTMLSpanElement;
const userWelcome = document.getElementById('userWelcome') as HTMLSpanElement;
const logoutBtn = document.getElementById('logoutBtn') as HTMLButtonElement;
const addMissionBtn = document.getElementById('addMissionBtn') as HTMLButtonElement;
const missionsContainer = document.getElementById('missionsContainer') as HTMLDivElement;
const totalMissions = document.getElementById('totalMissions') as HTMLDivElement;
const activeMissions = document.getElementById('activeMissions') as HTMLDivElement;
const completedMissions = document.getElementById('completedMissions') as HTMLDivElement;

// Check authentication
if (!api.isAuthenticated()) {
  window.location.href = '/index.html';
}

// Load user data
async function loadUserData(): Promise<void> {
  try {
    const user = await api.getMe();
    userName.textContent = `${user.firstName} ${user.lastName}`;
    userWelcome.textContent = user.firstName;
    
    // Set role display
    const roleMap: Record<string, string> = {
      'soldier': 'חייל',
      'commander': 'מפקד',
      'admin': 'מנהל'
    };
    userRole.textContent = roleMap[user.role] || 'חייל';
    
    console.log('✅ User loaded:', user);
  } catch (error) {
    console.error('❌ Failed to load user:', error);
    api.logout();
  }
}

// Load missions
async function loadMissions(): Promise<void> {
  try {
    missionsContainer.innerHTML = `
      <div class="loading">
        <div class="spinner"></div>
        <div>טוען משימות...</div>
      </div>
    `;

    // TODO: Replace with actual API call when missions endpoint is ready
    // const missions = await api.get('/api/missions', true);
    
    // For now, show empty state
    setTimeout(() => {
      const missions: any[] = [];
      
      if (missions.length === 0) {
        missionsContainer.innerHTML = `
          <div class="empty-state">
            <div class="empty-icon">📋</div>
            <h3>אין משימות כרגע</h3>
            <p>לחץ על "הוסף משימה חדשה" כדי להתחיל</p>
          </div>
        `;
        
        // Update stats
        totalMissions.textContent = '0';
        activeMissions.textContent = '0';
        completedMissions.textContent = '0';
      } else {
        renderMissions(missions);
      }
    }, 500);
  } catch (error: any) {
    console.error('❌ Failed to load missions:', error);
    missionsContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">⚠️</div>
        <h3>שגיאה בטעינת משימות</h3>
        <p>${error.message || 'נסה לרענן את הדף'}</p>
      </div>
    `;
  }
}

// Render missions
function renderMissions(missions: any[]): void {
  const html = missions.map(mission => `
    <div class="mission-card" data-id="${mission._id}">
      <div class="mission-header">
        <div>
          <h4 class="mission-title">${mission.title}</h4>
          <p class="mission-description">${mission.description || 'אין תיאור'}</p>
        </div>
      </div>
      
      <div class="mission-meta">
        <div class="meta-item">
          <span class="meta-icon">📅</span>
          <span>${formatDate(mission.deadline)}</span>
        </div>
        <div class="meta-item">
          <span class="meta-icon">👤</span>
          <span>${mission.assignedTo?.firstName || 'לא משויך'}</span>
        </div>
        <div class="meta-item">
          <span class="meta-icon">📍</span>
          <span>${mission.location || 'לא צוין'}</span>
        </div>
      </div>
      
      <div class="mission-footer">
        <span class="mission-status status-${mission.status}">
          ${getStatusText(mission.status)}
        </span>
        <span class="mission-priority priority-${mission.priority}">
          ${getPriorityText(mission.priority)}
        </span>
      </div>
    </div>
  `).join('');
  
  missionsContainer.innerHTML = `<div class="missions-grid">${html}</div>`;
  
  // Update stats
  totalMissions.textContent = missions.length.toString();
  activeMissions.textContent = missions.filter(m => m.status === 'in-progress').length.toString();
  completedMissions.textContent = missions.filter(m => m.status === 'completed').length.toString();
}

// Format date
function formatDate(date: string): string {
  const d = new Date(date);
  return d.toLocaleDateString('he-IL', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

// Get status text
function getStatusText(status: string): string {
  const statusMap: Record<string, string> = {
    'pending': 'ממתין',
    'in-progress': 'בביצוע',
    'completed': 'הושלם'
  };
  return statusMap[status] || status;
}

// Get priority text
function getPriorityText(priority: string): string {
  const priorityMap: Record<string, string> = {
    'low': 'נמוכה',
    'medium': 'בינונית',
    'high': 'גבוהה' 
  };
  return priorityMap[priority] || priority;
}

// Logout
logoutBtn.addEventListener('click', () => {
  if (confirm('האם אתה בטוח שברצונך להתנתק?')) {
    api.logout();
  }
});

// Add mission
addMissionBtn.addEventListener('click', () => {
  alert('פיצ\'ר הוספת משימה יתווסף בקרוב! 🚀');
  // TODO: Open add mission modal
});

// Initialize
console.log('🚀 Dashboard initializing...');
loadUserData();
loadMissions(); 