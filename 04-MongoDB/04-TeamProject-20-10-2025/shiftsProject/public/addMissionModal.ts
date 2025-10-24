// Basic experiment: render a minimal modal from TypeScript and wire simple open/close + demo submit

document.addEventListener("DOMContentLoaded", () => {
  const host = document.getElementById("createMissionModal");
  if (!host) {
    console.warn("createMissionModal host not found in DOM");
    return;
  }

  // Inject basic HTML for the popup (kept very small for the experiment)
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
            <label class="form-group__label" for="controlCenter"
              >מרכז בקרה</label
            >
            <select class="form-group__select" id="controlCenter" required>
              <option value="" disabled selected>בחר מרכז בקרה</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-group__label" for="amountOfPeople"
              >כמות אנשים</label
            >
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

  // Populate mission types from API
  const missionTypeSelect = document.getElementById("missionType") as HTMLSelectElement | null;
  async function populateMissionTypes() {
    if (!missionTypeSelect) return;
    try {
      const res = await fetch('/api/get/shiftTypes', { headers: { 'Accept': 'application/json' } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      // Accept a few formats: ["type", ...] OR {shiftTypes:[...]} OR "type,type,..."
      let types: string[] = [];
      if (Array.isArray(data)) {
        types = data as string[];
      } else if (data && Array.isArray((data as any).shiftTypes)) {
        types = (data as any).shiftTypes as string[];
      } else if (typeof data === 'string') {
        types = data.split(',').map(s => s.trim()).filter(Boolean);
      }

      // Clear any existing non-placeholder options
      for (let i = missionTypeSelect.options.length - 1; i >= 1; i--) {
        missionTypeSelect.remove(i);
      }

      // Append options
      types.forEach((t) => {
        const opt = document.createElement('option');
        opt.value = t;
        opt.textContent = t;
        missionTypeSelect.appendChild(opt);
      });
    } catch (err) {
      console.error('Failed to load shift types:', err);
      // Provide a disabled error option so the user sees something
      const opt = document.createElement('option');
      opt.value = '';
      opt.textContent = 'שגיאה בטעינת סוגי משימות';
      opt.disabled = true;
      missionTypeSelect?.appendChild(opt);
    }
  }
  // Trigger load
  populateMissionTypes();

  // Populate control centers from API (prefers /get/controlCenter, falls back to /api/get/controlCenter)
  const controlCenterSelect = document.getElementById("controlCenter") as HTMLSelectElement | null;
  async function fetchJsonWithFallback(primary: string, fallback: string) {
    try {
      const r = await fetch(primary, { headers: { 'Accept': 'application/json' } });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return await r.json();
    } catch (e) {
      const r2 = await fetch(fallback, { headers: { 'Accept': 'application/json' } });
      if (!r2.ok) throw new Error(`HTTP ${r2.status}`);
      return await r2.json();
    }
  }

  async function populateControlCenters() {
    if (!controlCenterSelect) return;
    try {
      const data = await fetchJsonWithFallback('/get/controlCenter', '/api/get/controlCenter');

      // Normalize to an array of strings (names only)
      let centers: string[] = [];
      if (Array.isArray(data)) {
        if (data.length && typeof data[0] === 'object' && data[0] !== null) {
          centers = (data as any[])
            .map((o: any) => (typeof o?.controlCenterName === 'string' ? o.controlCenterName.trim() : ''))
            .filter(Boolean);
        } else {
          centers = (data as string[]).map(s => (typeof s === 'string' ? s.trim() : '')).filter(Boolean);
        }
      } else if (data && Array.isArray((data as any).controlCenters)) {
        centers = (data as any).controlCenters
          .map((o: any) => (typeof o === 'string' ? o.trim() : (typeof o?.controlCenterName === 'string' ? o.controlCenterName.trim() : '')))
          .filter(Boolean);
      } else if (typeof data === 'string') {
        centers = data.split(',').map(s => s.trim()).filter(Boolean);
      }

      // Clear any existing non-placeholder options
      for (let i = controlCenterSelect.options.length - 1; i >= 1; i--) {
        controlCenterSelect.remove(i);
      }

      // Add options
      centers.forEach((name) => {
        const opt = document.createElement('option');
        opt.value = name;
        opt.textContent = name;
        controlCenterSelect.appendChild(opt);
      });

      // If nothing returned, add a disabled note
      if (centers.length === 0) {
        const opt = document.createElement('option');
        opt.value = '';
        opt.textContent = 'לא נמצאו מרכזי בקרה';
        opt.disabled = true;
        controlCenterSelect.appendChild(opt);
      }
    } catch (err) {
      console.error('Failed to load control centers:', err);
      const opt = document.createElement('option');
      opt.value = '';
      opt.textContent = 'שגיאה בטעינת מרכזי בקרה';
      opt.disabled = true;
      controlCenterSelect?.appendChild(opt);
    }
  }

  // Trigger load
  populateControlCenters();

  // Helpers to show/hide by class (CSS should already style .create-mission-modal when open)
  const show = () => host.classList.add("is-open");
  const hide = () => host.classList.remove("is-open");

  // Open immediately for the experiment so you can see it works
  show();

  // Close interactions
  const closeBtn = document.getElementById("closeMissionModal");
  closeBtn?.addEventListener("click", hide);
  host.addEventListener("click", (ev) => {
    const target = ev.target as HTMLElement;
    if (target?.dataset?.action === "close") hide();
  });

  // Real submit: POST to /post/missions per schema
  const form = document.getElementById("createMissionFormModal") as HTMLFormElement | null;
  form?.addEventListener("submit", async (ev) => {
    ev.preventDefault();

    const missionTypeEl = document.getElementById("missionType") as HTMLSelectElement | null;
    const missionDateEl = document.getElementById("missionDate") as HTMLInputElement | null;
    const controlCenterEl = document.getElementById("controlCenter") as HTMLSelectElement | null;
    const amountEl = document.getElementById("amountOfPeople") as HTMLSelectElement | null;
    const noteEl = document.getElementById("missionNote") as HTMLTextAreaElement | null;

    const missionType = missionTypeEl?.value?.trim() || "";
    const shiftDateStr = missionDateEl?.value || ""; // yyyy-mm-dd
    const controlCenter = controlCenterEl?.value?.trim() || "";
    const amountPeople = amountEl?.value ? Number(amountEl.value) : NaN;
    const notes = noteEl?.value?.trim() || "";
    

    // Basic client-side validation to mirror schema requirements
    if (!missionType || !shiftDateStr || !controlCenter || !notes || !Number.isFinite(amountPeople)) {
      alert("נא למלא את כל השדות החיוניים (סוג משימה, תאריך, מרכז בקרה, כמות אנשים והערות).");
      return;
    }

    // Convert date string (yyyy-mm-dd) to ISO Date
    const shiftDate = new Date(shiftDateStr);

    // Build payload matching the schema. We set shiftType = missionType for now (same source select).
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
      const res = await fetch('api/post/missions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status} ${res.statusText} ${text}`.trim());
      }

      const result = await res.json().catch(() => ({}));
      console.log('Mission created:', result);
      alert('המשימה נוצרה בהצלחה');
      hide();
      // Optional: dispatch a custom event so the dashboard can refresh
      host.dispatchEvent(new CustomEvent('mission:created', { detail: result }));
    } catch (err) {
      console.error('Failed to create mission:', err);
      alert('אירעה שגיאה ביצירת המשימה. נסה שוב.');
    }
  });
});