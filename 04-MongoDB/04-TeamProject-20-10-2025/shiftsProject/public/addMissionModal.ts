// ===============================================
// ADD MISSION MODAL - With Authentication
// ===============================================

import api from './api';

document.addEventListener("DOMContentLoaded", () => {
  const host = document.getElementById("createMissionModal");
  if (!host) {
    console.warn("createMissionModal host not found in DOM");
    return;
  } 
  
  // Inject HTML
  host.innerHTML = `
  <div class="create-mission-modal__overlay" data-action="close"></div>
      <div class="create-mission-modal__container">
        <div class="create-mission-modal__header">
          <h2 class="create-mission-modal__title">יצירת משימה חדשה</h2>
          <button class="create-mission-modal__close" id="closeMissionModal">
            ✕ 
          </button>
        </div>
          <form class="create-mission-modal__form" id="createMissionFormModal">
          <div class="form-group">
            <label class="form-group__label" for="missionType">סוג משימה</label>
            <select class="form-group__select" id="missionType" required>
              <option value="" disabled selected>בחר סוג משימה</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-group__label" for="missionDate">תאריך</label>
            <input
              type="date"
              class="form-group__input"
              id="missionDate"
              required
            />
          </div>

          <div class="form-group">
            <label class="form-group__label" for="controlCenter">מרכז בקרה</label>
            <select class="form-group__select" id="controlCenter" required>
              <option value="" disabled selected>בחר מרכז בקרה</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-group__label" for="amountOfPeople">כמות אנשים</label>
            <select class="form-group__select" id="amountOfPeople" required>
              <option value="">בחר כמות מבצעים</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-group__label" for="missionNote">הערות</label>
            <textarea
              class="form-group__textarea"
              id="missionNote"
              rows="4"
              placeholder="הוסף הערות למשימה..."
              required
            ></textarea>
          </div>

          <div class="create-mission-modal__actions">
            <button type="submit" class="btn btn--primary">
              <span class="btn__icon">➕</span>
              <span class="btn__text">צור משימה</span>
            </button>
            <button
              type="button"
              class="btn btn--secondary"
              id="cancelMissionBtn"
            >
              <span class="btn__text">ביטול</span>
            </button>
          </div>
        </form>
      </div>
  `;

  // ===============================================
  // POPULATE MISSION TYPES
  // ===============================================
  
  const missionTypeSelect = document.getElementById("missionType") as HTMLSelectElement | null;
  
  async function populateMissionTypes() {
    if (!missionTypeSelect) return;
    
    try {
      // ✅ תיקון: הוספת Type Assertion
      const data = await api.get<any>('/api/get/shiftTypes', true);
      
      let types: string[] = [];
      
      // ✅ תיקון: Type Guard עם assertion
      if (Array.isArray(data)) {
        types = (data as any[]).filter((item): item is string => typeof item === 'string');
      } else if (typeof data === 'string') {
        types = data.split(',').map(s => s.trim()).filter(Boolean);
      } else if (data && typeof data === 'object' && 'shiftTypes' in data) {
        const shiftTypes = (data as any).shiftTypes;
        if (Array.isArray(shiftTypes)) {
          types = (shiftTypes as any[]).filter((item): item is string => typeof item === 'string');
        }
      }

      // Clear existing options except placeholder
      while (missionTypeSelect.options.length > 1) {
        missionTypeSelect.remove(1);
      }

      if (types.length === 0) {
        const opt = document.createElement('option');
        opt.value = '';
        opt.textContent = 'אין סוגי משימות זמינים';
        opt.disabled = true;
        missionTypeSelect.appendChild(opt);
        return;
      }

      types.forEach((t) => {
        const opt = document.createElement('option');
        opt.value = t;
        opt.textContent = t;
        missionTypeSelect.appendChild(opt);
      });
      
    } catch (err) {
      console.error('❌ Failed to load shift types:', err);
      const opt = document.createElement('option');
      opt.value = '';
      opt.textContent = 'שגיאה בטעינת סוגי משימות';
      opt.disabled = true;
      missionTypeSelect?.appendChild(opt);
    }
  }

  populateMissionTypes();

  // ===============================================
  // POPULATE CONTROL CENTERS
  // ===============================================
  
  const controlCenterSelect = document.getElementById("controlCenter") as HTMLSelectElement | null;

  async function populateControlCenters() {
    if (!controlCenterSelect) return;
    
    try {
      // ✅ תיקון: הוספת Type Assertion
      const data = await api.get<any>('/api/get/controlCenter', true);

      let centers: string[] = [];
      
      // ✅ תיקון: Type Guard משופר
      if (Array.isArray(data)) {
        centers = (data as any[])
          .map((item) => {
            if (typeof item === 'string') {
              return item.trim();
            }
            if (item && typeof item === 'object' && 'controlCenterName' in item) {
              return String(item.controlCenterName).trim();
            }
            return '';
          })
          .filter(Boolean);
      } else if (typeof data === 'string') {
        centers = data.split(',').map(s => s.trim()).filter(Boolean);
      } else if (data && typeof data === 'object' && 'controlCenters' in data) {
        const controlCenters = (data as any).controlCenters;
        if (Array.isArray(controlCenters)) {
          centers = (controlCenters as any[])
            .map((item) => {
              if (typeof item === 'string') return item.trim();
              if (item && typeof item === 'object' && 'controlCenterName' in item) {
                return String(item.controlCenterName).trim();
              }
              return '';
            })
            .filter(Boolean);
        }
      }

      // Clear existing options except placeholder
      while (controlCenterSelect.options.length > 1) {
        controlCenterSelect.remove(1);
      }

      if (centers.length === 0) {
        const opt = document.createElement('option');
        opt.value = '';
        opt.textContent = 'לא נמצאו מרכזי בקרה';
        opt.disabled = true;
        controlCenterSelect.appendChild(opt);
        return;
      }

      centers.forEach((name) => {
        const opt = document.createElement('option');
        opt.value = name;
        opt.textContent = name;
        controlCenterSelect.appendChild(opt);
      });
      
    } catch (err) {
      console.error('❌ Failed to load control centers:', err);
      const opt = document.createElement('option');
      opt.value = '';
      opt.textContent = 'שגיאה בטעינת מרכזי בקרה';
      opt.disabled = true;
      controlCenterSelect?.appendChild(opt);
    }
  }

  populateControlCenters();

  // ===============================================
  // MODAL CONTROLS
  // ===============================================
  
  const show = () => host.classList.add("is-open");
  const hide = () => host.classList.remove("is-open");

  const closeBtn = document.getElementById("closeMissionModal");
  closeBtn?.addEventListener("click", hide);
  
  host.addEventListener("click", (ev) => {
    const target = ev.target as HTMLElement;
    if (target?.dataset?.action === "close") hide();
  });

  // ===============================================
  // FORM SUBMISSION
  // ===============================================
  
  const form = document.getElementById("createMissionFormModal") as HTMLFormElement | null;
  
  form?.addEventListener("submit", async (ev) => {
    ev.preventDefault();

    const missionTypeEl = document.getElementById("missionType") as HTMLSelectElement | null;
    const missionDateEl = document.getElementById("missionDate") as HTMLInputElement | null;
    const controlCenterEl = document.getElementById("controlCenter") as HTMLSelectElement | null;
    const amountEl = document.getElementById("amountOfPeople") as HTMLSelectElement | null;
    const noteEl = document.getElementById("missionNote") as HTMLTextAreaElement | null;

    const missionType = missionTypeEl?.value?.trim() || "";
    const shiftDateStr = missionDateEl?.value || "";
    const controlCenter = controlCenterEl?.value?.trim() || "";
    const amountPeople = amountEl?.value ? Number(amountEl.value) : NaN;
    const notes = noteEl?.value?.trim() || "";

    // Validation
    if (!missionType || !shiftDateStr || !controlCenter || !notes || !Number.isFinite(amountPeople)) {
      alert("נא למלא את כל השדות החיוניים");
      return;
    }

    const shiftDate = new Date(shiftDateStr);

    const payload = {
      shiftDate,
      amountPeople,
      missionType,
      notes,
      controlCenter,
      assignes_people: [],
      shiftType: missionType,
      status: 'waiting'
    };

    try {
      const result = await api.post('/api/post/missions', payload, true);
      
      console.log('✅ Mission created:', result);
      alert('המשימה נוצרה בהצלחה');
      hide();
       
      host.dispatchEvent(new CustomEvent('mission:created', { detail: result }));
      
      // ✅ רענון הדף
      window.location.reload();
      
    } catch (err: any) {
      console.error('❌ Failed to create mission:', err);
      alert(err.message || 'אירעה שגיאה ביצירת המשימה. נסה שוב.');
    }
  });
});