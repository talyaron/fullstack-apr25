type Fact = {
    _id: string;
    title: string;
    description: string;
    category: string;
    userId: string | { _id: string; name: string };
}

const GUEST_LIMIT = 3;

function buildFactCard(fact: Fact): HTMLElement {
  const card = document.createElement("article");
  card.className = "fact-card";

  let authorName = "Unknown";
  if (typeof fact.userId === "object" && "name" in fact.userId) {
    authorName = (fact.userId as any).name;
  }

  const category = fact.category ? `#${fact.category}` : "";

  card.innerHTML = `
    <h3 class="fact-card__title">${fact.title}</h3>
    <p class="fact-card__desc">${fact.description}</p>
    <div class="fact-card__meta">
      <span class="fact-card__author">Posted by ${authorName}</span>
      ${category ? `<span class="fact-card__category">${category}</span>` : ""}
    </div>
  `;
  return card;
}

function appendRegisterBox(totalCount: number) {
  const container = document.querySelector(".fact-list");
  if (!container) return;

  if (totalCount <= GUEST_LIMIT) return;

  const oldBox = container.querySelector(".fact-register");
  if (oldBox) oldBox.remove();

  const box = document.createElement("div");
  box.className = "fact-register";
  box.innerHTML = `
    <p class="fact-register__text">Want to read more facts and join the conversation?</p>
    <a class="fact-register__link" href="./register/register.html">Register now</a>
  `;
  container.appendChild(box);
}

async function getAllFacts(): Promise<Fact[]> {
  try {
    const response = await fetch("http://localhost:3000/api/facts/all-facts", {
      headers: { "x-api-key": "SECRET" },
    });
    if (!response.ok) throw new Error("Failed to fetch facts");
    return await response.json();
  } catch (error: any) {
    console.error("Error fetching facts:", error.message);
    return [];
  }
}

async function renderFactsSection() {
  const listContainer = document.querySelector(".fact-list__container");
  if (!listContainer) return;

  const facts: Fact[] = await getAllFacts();

  listContainer.innerHTML = "";

  const response = await fetch("http://localhost:3000/api/user/me", { credentials: "include" });
  const isUser = response.ok;

  const visibleFacts = isUser ? facts : facts.slice(0, GUEST_LIMIT);
  visibleFacts.forEach((fact) => listContainer.appendChild(buildFactCard(fact)));

  if (!isUser) {
    appendRegisterBox(facts.length);
  }
}

renderFactsSection();
