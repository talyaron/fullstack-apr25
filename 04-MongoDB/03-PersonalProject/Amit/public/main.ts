// ==========================
// 💾 MODEL
// ==========================

type Fact = {
  _id: string;
  title: string;
  description: string;
  category: string;
  source: string
  userId: string | { _id: string; name: string };
  createdAt?: string;
};


let ALL_FACTS: Fact[] = [];
let currentSearch = ""
let currentSort: "newest" | "oldest" | "az" | "za" = "newest";
let currentCategory = "All";

function selector(selector: string): HTMLElement | null {
  return document.querySelector(selector);
}

function allSelectors(selector: string): NodeListOf<HTMLElement> {
  return document.querySelectorAll(selector);
}

function normalize(text: string | undefined | null): string {
  return (text || "").trim().toLowerCase();
}

// ==========================
// 🎨 VIEW
// ==========================

function buildFactCard(fact: Fact): HTMLElement {
  const card = document.createElement("article");
  card.className = "fact-card";

  let authorName = "Unknown";
  if (fact.userId && typeof fact.userId === "object" && "name" in fact.userId) {
    authorName = (fact.userId as any).name;
  }

  const normalizedCategoryValue = normalize(fact.category);
  const categoryClass = normalizedCategoryValue ? `fact-card__category fact-card__category--${normalizedCategoryValue}` : "";
  const categoryTag = normalizedCategoryValue ? `<span class="${categoryClass}">#${normalizedCategoryValue}</span>` : "";

  card.innerHTML = `
    <h3 class="fact-card__title">${fact.title}</h3>
    <p class="fact-card__description">${fact.description}</p>
    <p class="fact-card__source">
      Source:<a href="${fact.source}" target="_blank" class="fact-card__link">${fact.source}</a>
    </p>
    <div class="fact-card__meta">
      <span class="fact-card__author">Posted by ${authorName}</span>
      ${categoryTag}
    </div>
  `;
  return card;
}

function renderFacts(facts: Fact[]): void {
  const listContainer = selector(".facts__list");
  if (!listContainer) return;

  listContainer.innerHTML = "";

  if (!facts || facts.length === 0) {
    listContainer.innerHTML = `<p class="facts__empty">No facts available in this category</p>`;
    return;
  }

  facts.forEach((fact) => listContainer.appendChild(buildFactCard(fact)));
}

// ==========================
// 🧠 CONTROLLER
// ==========================

function applyFiltersAndRender(): void {
  let results = [...ALL_FACTS];

  if (currentCategory !== "All") {
    const category = normalize(currentCategory);
    results = results.filter((fact) => normalize(fact.category) === category);
  }

  if (currentSearch) {
    const q = normalize(currentSearch);
    results = results.filter(
      (fact) => normalize(fact.title).includes(q) || normalize(fact.description).includes(q)
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
  try {
    const res = await fetch(`http://localhost:3000/api/facts/all-facts`, {
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

  } catch (error: any) {
    console.error(`Can't load the facts something went wrong ${error}`)

    ALL_FACTS = [];
    applyFiltersAndRender();
  }
}

function wireEvents(): void {
  const sidebar = selector(".categories-sidebar");

  sidebar?.addEventListener("click", (e) => {
    const target = (e.target as HTMLElement).closest(".category-btn") as HTMLElement | null;
    if (!target) return;

    currentCategory = target.dataset.category || "All";
    allSelectors(".category-btn").forEach((b) => b.classList.remove("active"));
    target.classList.add("active");

    applyFiltersAndRender();
  });


  const searchBtn = document.querySelector("#searchBtn");
  const searchInput = document.querySelector("#searchInput") as HTMLInputElement | null;

  searchBtn?.addEventListener("click", () => {
    currentSearch = (searchInput?.value || "").trim();
    applyFiltersAndRender();
  });

  searchInput?.addEventListener("input", () => {
    currentSearch = (searchInput?.value || "").trim();
    applyFiltersAndRender();
  });


  const sortGroup = selector(".facts__sort-group");
  sortGroup?.addEventListener("click", (e) => {
    const btn = (e.target as HTMLElement).closest(".sort-btn") as HTMLElement | null;
    if (!btn) return;
    const sortVal = btn.dataset.sort as "newest" | "oldest" | "az" | "za" | undefined;
    if (!sortVal) return;
    currentSort = sortVal;
    allSelectors(".sort-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    applyFiltersAndRender();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  wireEvents();
  loadFactsOnce();
});
