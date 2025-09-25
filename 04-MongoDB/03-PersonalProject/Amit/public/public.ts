import { Fact } from "./types";



async function renderFacts(facts: Fact[]) {
    const factsContainer = document.querySelector('.fact-list__container');
    if (!factsContainer) throw new Error("No container found");

    factsContainer.innerHTML = "";

    facts.forEach((fact) => {
        const factCard = document.createElement('article');
        factCard.className = "fact-card";
        factCard.innerHTML = `
            <h3 class="fact-card__title">${fact.title}</h3>
            <p class="fact-card__desc">${fact.description}</p>
            <span class="fact-card__author">Posted by ${fact.userId}</span>
        `;
        factsContainer.appendChild(factCard);
    });
}



const GUEST_LIMIT = 3;

function isLoggedIn() {
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    return Boolean(userId && userName);
}

function setupHeader() {
    const headerActions = document.getElementById("headerActions");
    if (!headerActions) return;

    if (isLoggedIn()) {
        const name = localStorage.getItem("userName") || "User";
        headerActions.innerHTML = `
      <span class="header__user">Hi, ${name}</span>
      <a href="./facts/add.html" class="header__btn">+ Add Fact</a>
      <button id="logoutBtn" class="header__btn header__btn--logout">Logout</button>
    `;

        const logoutBtn = document.getElementById("logoutBtn");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", () => {
                localStorage.removeItem("userId");
                localStorage.removeItem("userName");
                setupHeader();
                renderFactsSection();
            });
        }
    } else {
        headerActions.innerHTML = `
      <a href="./login/login.html" class="header__link">Login</a>
      <a href="./register/register.html" class="header__link">Register</a>
    `;
    }
}

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

function appendGuestCTA(totalCount: number) {
    const container = document.querySelector(".fact-list");
    if (!container) return;

    if (totalCount <= GUEST_LIMIT) return;

    const oldCta = container.querySelector(".fact-cta");
    if (oldCta) oldCta.remove();

    const cta = document.createElement("div");
    cta.className = "fact-cta";
    cta.innerHTML = `
    <p class="fact-cta__text">Want to read more facts and join the conversation?</p>
    <a class="fact-cta__link" href="./register/register.html">Register now</a>
  `;
    container.appendChild(cta);
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

    const visibleFacts = isLoggedIn() ? facts : facts.slice(0, GUEST_LIMIT);
    visibleFacts.forEach((fact) => listContainer.appendChild(buildFactCard(fact)));

    if (!isLoggedIn()) {
        appendGuestCTA(facts.length);
    } else {
        const cta = document.querySelector(".fact-cta");
        if (cta) cta.remove();
    }
}

async function main() {
    setupHeader();
    await renderFactsSection();
}

main();
