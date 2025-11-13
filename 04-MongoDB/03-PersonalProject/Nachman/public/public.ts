type Discovery = {
    _id: string;
    title: string;
    content: string;
    topic: string;
    difficulty: string;
    userId: string | { _id: string; name: string };
}

const VISITOR_LIMIT = 4;

function createDiscoveryCard(discovery: Discovery): HTMLElement {
  const discoveryCard = document.createElement("article");
  discoveryCard.className = "discovery-card";

  let creatorName = "Anonymous";
  if (typeof discovery.userId === "object" && "name" in discovery.userId) {
    creatorName = (discovery.userId as any).name;
  }

  const topicTag = discovery.topic ? `#${discovery.topic}` : "";
  const difficultyLevel = discovery.difficulty ? `[${discovery.difficulty.toUpperCase()}]` : "";

  discoveryCard.innerHTML = `
    <h3 class="discovery-card__heading">${discovery.title}</h3>
    <p class="discovery-card__content">${discovery.content}</p>
    <div class="discovery-card__info">
      <span class="discovery-card__creator">Shared by ${creatorName}</span>
      ${topicTag ? `<span class="discovery-card__topic">${topicTag}</span>` : ""}
      ${difficultyLevel ? `<span class="discovery-card__difficulty">${difficultyLevel}</span>` : ""}
    </div>
  `;
  return discoveryCard;
}

function addJoinPrompt(discoveryCount: number): void {
  const discoveryContainer = document.querySelector(".discovery-list");
  if (!discoveryContainer) return;

  if (discoveryCount <= VISITOR_LIMIT) return;

  const existingPrompt = discoveryContainer.querySelector(".join-prompt");
  if (existingPrompt) existingPrompt.remove();

  const joinPrompt = document.createElement("div");
  joinPrompt.className = "join-prompt";
  joinPrompt.innerHTML = `
    <p class="join-prompt__message">Discover more amazing insights and share your own knowledge!</p>
    <a class="join-prompt__button" href="./register/register.html">Join KnowledgeShare</a>
  `;
  discoveryContainer.appendChild(joinPrompt);
}

async function fetchAllDiscoveries(): Promise<Discovery[]> {
  try {
    const apiResponse = await fetch("http://localhost:3000/api/discoveries/all", {
      headers: { 
        "Authorization": "Bearer KNOWLEDGESHARE2025",
        "Content-Type": "application/json"
      },
    });
    if (!apiResponse.ok) throw new Error("Unable to load discoveries");
    return await apiResponse.json();
  } catch (error: any) {
    console.error("Discovery fetch error:", error.message);
    return [];
  }
}

async function displayDiscoveries(): Promise<void> {
  const discoveryGrid = document.querySelector(".discovery-list__grid");
  if (!discoveryGrid) return;

  const allDiscoveries: Discovery[] = await fetchAllDiscoveries();

  discoveryGrid.innerHTML = "";

  // Check if user is authenticated
  const userCheck = await fetch("http://localhost:3000/api/user/profile", { 
    credentials: "include",
    headers: { "Authorization": "Bearer KNOWLEDGESHARE2025" }
  });
  const isAuthenticated = userCheck.ok;

  const displayedDiscoveries = isAuthenticated ? allDiscoveries : allDiscoveries.slice(0, VISITOR_LIMIT);
  displayedDiscoveries.forEach((discovery) => discoveryGrid.appendChild(createDiscoveryCard(discovery)));

  if (!isAuthenticated) {
    addJoinPrompt(allDiscoveries.length);
  }
}

displayDiscoveries();