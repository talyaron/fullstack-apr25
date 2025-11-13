document.addEventListener("DOMContentLoaded", () => {
  const host = document.getElementById("missionsView");
  if (!host) {
    console.warn("missionsView host not found in DOM");
    return;
  }

  host.innerHTML = `
    <div class="container py-3">
      <div class="d-flex justify-content-between align-items-center mb-3">
      
        <h1 class="h3 m-0">כל המשימות</h1>
        <div id="missionsMeta" class="text-muted small"></div>
      </div>

<div class="card shadow-sm">
<div class="card-body p-0">
<div id="missionsTableArea">
<div id="missionsLoading" class="p-4 text-center text-muted">טוען משימות…</div>
<div id="missionsEmpty" class="p-4 text-center text-muted" style="display:none;">אין נתונים להצגה</div>
</div>
</div> 
</div> 
</div>
 

  `;
  missionsToView();
});

type Mission = {
  _id: string;
  shiftDate: string;
  amountPeople: number;
  missionType: string;
  notes: string;
  controlCenter?: string;
  status?: string;
};

// function statusBadge(status?: string) {
//   const s = (status || "").toLowerCase();
//   let cls = "secondary";
//   if (s === "ממתין" || s === "pending") cls = "warning";
//   else if (s === "בביצוע") cls = "info";
//   else if (s === "בוצע") cls = "success";
//   else if (s === "בוטל") cls = "secondary";
//   const text = status || "";
//   return `<span class="badge text-bg-${cls}">${text}</span>`;
// }

function statusForClass(status: any) {
  if (status === "בוצע") return "table-success";
  else if (status === "בוטל") return "table-danger";
  else if (status === "ממתין") return "table-warning";
  else if (status === "בביצוע") return "table-primary";

  return;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("he-IL", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}
function renderMissionsTable(items: Mission[]) {
  const area = document.getElementById("missionsTableArea");
  const loadingEl = document.getElementById("missionsLoading");
  const emptyEl = document.getElementById("missionsEmpty");
  if (!area || !loadingEl || !emptyEl) return;

  // מסתיר "טוען…"
  loadingEl.style.display = "none";

  // אם אין נתונים – מציג הודעת ריק
  if (!items || items.length === 0) {
    emptyEl.style.display = "block";
    return;
  }

  // אפשר מיון בסיסי לפי תאריך (רשות)
  items.sort(
    (a, b) => new Date(a.shiftDate).getTime() - new Date(b.shiftDate).getTime()
  );

  // בונה טבלת HTML בסיסית
  const table = document.createElement("table");
  table.className = "table table-sm table-hover align-middle mb-0";
  console.log("items---->", items);
  // thead
  table.innerHTML = `
  <thead class="table-light">
  <tr>
  <th class="text-end">תאריך</th>
  <th class="text-end">סוג משימה</th>
  <th class="text-end">מרכז בקרה</th>
  <th class="text-center">כמות</th>
  <th class="text-end">סטטוס</th>
  <th class="text-end">הערות</th>
  <th class="text-end">עריכה</th>
  <th class="text-end">מחיקה</th>
  </tr>
  </thead>
    <tbody></tbody>
  `;

  // tbody
  // const option = ['done','in-progress','waiting','cancelled']
  const tbody = table.querySelector("tbody")!;
  for (const m of items) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td class=${statusForClass(m.status)}>${formatDate(m.shiftDate)}</td>
    <td class=${statusForClass(m.status)}>${m.missionType ?? ""}</td>
    <td class=${statusForClass(m.status)}>${m.controlCenter ?? ""}</td>
    <td class=${statusForClass(m.status)}>${Number(m.amountPeople) || 0}</td>
    <td class=${statusForClass(m.status)}>
    <select class="form-select" data-id="${m._id}">
    ${options(m.status)}
    </select>
    </td>
    
    <td class=${statusForClass(m.status)}>${m.notes ?? ""}</td>
    <td class=${statusForClass(
      m.status
    )}><button class="btn btn-outline-secondary editBtn" data-id="${
      m._id
    }" type="button">edit</button></td>
  <td class=${statusForClass(
    m.status
  )}><button class="btn btn-outline-danger deleteBtn" data-id="${
      m._id
    }" type="button">delete</button></td>
    `;

    // <td class="text-end">${statusBadge(m.status)}</td>
    tbody.appendChild(tr);
  }
  tbody.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (!target) return;
    const btn = target.closest("button");
    if (!btn) return;
    const isDelete = btn.classList.contains("deleteBtn");
    if (!isDelete) return;
    const id = (btn as HTMLButtonElement).dataset.id;
    if (!id) return;
    handleDeleteMission(id);
  });

  tbody.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (!target) return;
    const btn = target.closest("button");
    if (!btn) return;
    const isEdit = btn.classList.contains("editBtn");
    if (!isEdit) return;
    const id = (btn as HTMLButtonElement).dataset.id;
    if (!id) return;
    handleEditMission(id);
  });

  tbody.addEventListener("change", (event) => {
    const selection = event.target as HTMLSelectElement;
    const id = selection.dataset.id;
    const newStatus = selection.value;
    console.log(`id: ${id} \nvalue: ${selection.value}`);
    handleStatusChange(id, newStatus);
  });
  // מנקה תוכן קודם (אם תבצע רענון) ומזריק את הטבלה
  // משאיר את ה־<h1> בחוץ כי הוא מחוץ לאזור
  const wrapper = document.createElement("div");
  wrapper.className = "table-responsive";
  wrapper.appendChild(table);

  area.querySelectorAll("table, .table-responsive").forEach((t) => t.remove());
  area.appendChild(wrapper);
}
function options(current?: string) {
  const values = ["ממתין", "בביצוע", "בוצע", "בוטל"];
  const cur = (current || "").toLowerCase();
  return values
    .map(
      (v) => `<option value="${v}" ${cur === v ? "selected" : ""}>${v}</option>`
    )
    .join("");
}
async function handleDeleteMission(missionId: any) {
  const confirmed = window.confirm("האם אתה בטוח שברצונך למחוק את המשימה?");
  if (!confirmed) return;
  try {
    const res = await fetch(`api/delete/missions/${missionId}`, {
      method: "DELETE",
      headers: { Accept: "application/json" },
    });
    await missionsToView();
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  } catch (error) {}
}

async function handleEditMission(missionId: any) {
  const host = document.getElementById("editMissionModal");
}
async function handleStatusChange(missionId: any, newStatus: any) {
  const req = await fetch(`api/patch/mission-newStatus/${missionId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ status: newStatus }),
  });
  await missionsToView();
  const res = await req.json();
  console.log(res);
}

async function missionsToView() {
  try {
    const res = await fetch("/api/get/missions", {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    renderMissionsTable(data);

    const meta = document.getElementById("missionsMeta");
    if (meta && Array.isArray(data)) meta.textContent = `${data.length} משימות`;
  } catch (error) {
    console.error("Failed to load missions:", error);
    const loadingEl = document.getElementById("missionsLoading");
    const emptyEl = document.getElementById("missionsEmpty");
    if (loadingEl) loadingEl.textContent = "שגיאה בטעינת המשימות";
    if (emptyEl) emptyEl.style.display = "block";
  }
}
