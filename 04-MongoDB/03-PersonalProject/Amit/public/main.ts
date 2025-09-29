type Fact = {
  _id: string;
  title: string;
  description: string;
  category: string;
  userId: string | { _id: string; name: string };
  createdAt?: string;
};

const API_BASE = "http://localhost:3000";

let ALL_FACTS: Fact[] = [];
let currentSearch = "";
let currentSort: "newest" | "oldest" | "az" | "za" = "newest";
let currentCategory = "All";

function $(selector: string): HTMLElement | null {
  return document.querySelector(selector);
}

function $all(selector: string): NodeListOf<HTMLElement> {
  return document.querySelectorAll(selector);
}

function normalize(s: string | undefined | null): string {
  return (s || "").toLowerCase();
}

function buildFactCard(fact: Fact): HTMLElement {
  const card = document.createElement("article");
  card.className = "fact-card";

  let authorName = "Unknown";
  if (fact.userId && typeof fact.userId === "object" && "name" in fact.userId) {
    authorName = (fact.userId as any).name;
  }

  const catVal = normalize(fact.category);
  const categoryClass = catVal ? `fact-card__category fact-card__category--${catVal}` : "";
  const categoryTag = fact.category ? `<span class="${categoryClass}">#${fact.category}</span>` : "";

  card.innerHTML = `
    <h3 class="fact-card__title">${fact.title}</h3>
    <p class="fact-card__desc">${fact.description}</p>
    <div class="fact-card__meta">
      <span class="fact-card__author">Posted by ${authorName}</span>
      ${categoryTag}
    </div>
  `;
  return card;
}

function renderFacts(facts: Fact[]): void {
  const listContainer = $(".facts__list");
  if (!listContainer) return;

  listContainer.innerHTML = "";

  if (!facts || facts.length === 0) {
    listContainer.innerHTML = `<p class="facts__empty">No facts available in this category</p>`;
    return;
  }

  facts.forEach((f) => listContainer.appendChild(buildFactCard(f)));
}

function applyFiltersAndRender(): void {
  let results = [...ALL_FACTS];

  if (currentCategory !== "All") {
    const cat = normalize(currentCategory);
    results = results.filter((f) => normalize(f.category) === cat);
  }

  if (currentSearch) {
    const q = normalize(currentSearch);
    results = results.filter(
      (f) => normalize(f.title).includes(q) || normalize(f.description).includes(q)
    );
  }

  switch (currentSort) {
    case "newest":
      results.sort((a, b) => {
        const ta = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const tb = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return tb - ta;
      });
      break;
    case "oldest":
      results.sort((a, b) => {
        const ta = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const tb = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return ta - tb;
      });
      break;
    case "az":
      results.sort((a, b) => normalize(a.title).localeCompare(normalize(b.title)));
      break;
    case "za":
      results.sort((a, b) => normalize(b.title).localeCompare(normalize(a.title)));
      break;
  }

  renderFacts(results);
}

async function loadFactsOnce(): Promise<void> {
  const url = `${API_BASE}/api/facts/all-facts`;
  try {
    const res = await fetch(url, {
      headers: { "x-api-key": "SECRET" },
      credentials: "include",
    });

    if (!res.ok) {
      ALL_FACTS = [];
      applyFiltersAndRender();
      return;
    }

    const data = await res.json();
    ALL_FACTS = Array.isArray(data?.facts) ? data.facts : [];
    applyFiltersAndRender();
  } catch {
    ALL_FACTS = [];
    applyFiltersAndRender();
  }
}

function wireEvents(): void {
  const sidebar = $(".categories-sidebar");
  sidebar?.addEventListener("click", (e) => {
    const target = (e.target as HTMLElement).closest(".category-btn") as HTMLElement | null;
    if (!target) return;
    currentCategory = target.dataset.category || "All";
    $all(".category-btn").forEach((b) => b.classList.remove("active"));
    target.classList.add("active");
    applyFiltersAndRender();
  });

  const searchBtn = $("#searchBtn");
  const searchInput = $("#searchInput") as HTMLInputElement | null;

  searchBtn?.addEventListener("click", () => {
    currentSearch = (searchInput?.value || "").trim();
    applyFiltersAndRender();
  });

  searchInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      currentSearch = (searchInput.value || "").trim();
      applyFiltersAndRender();
    }
  });

  const sortGroup = $(".facts__sort-group");
  sortGroup?.addEventListener("click", (e) => {
    const btn = (e.target as HTMLElement).closest(".sort-btn") as HTMLElement | null;
    if (!btn) return;
    const sortVal = btn.dataset.sort as "newest" | "oldest" | "az" | "za" | undefined;
    if (!sortVal) return;
    currentSort = sortVal;
    $all(".sort-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    applyFiltersAndRender();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  wireEvents();
  loadFactsOnce();
});
