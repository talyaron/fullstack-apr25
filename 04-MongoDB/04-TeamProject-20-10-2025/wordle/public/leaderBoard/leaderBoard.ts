type Player = {
    username: string;
    amountOfVictories: number;
    amountOfGames: number;
    score: number;
    winRate: number;
};

function showElement(element: HTMLElement | null) {
    if (element) element.style.display = "";
}
function hideElement(element: HTMLElement | null) {
    if (element) element.style.display = "none";
}

async function fetchLeaderboard() {
    const listContainer = document.getElementById("leaderboard-list");
    const loadingMessage = document.getElementById("lb-loading");
    const errorMessage = document.getElementById("lb-error");

    showElement(loadingMessage);
    hideElement(errorMessage);
    if (listContainer) listContainer.innerHTML = "";

    try {
        const response = await fetch("/data/leaderboard", {
            headers: { "Accept": "application/json" },
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Couldn't fetch leaderboard data");
        }

        const players: Player[] = await response.json();
        renderLeaderboard(players);
    } catch (error: any) {
        console.error("Error fetching leaderboard:", error);
        if (errorMessage) errorMessage.textContent = "Failed to load leaderboard. Please try again.";
        showElement(errorMessage);
    } finally {
        hideElement(loadingMessage);
    }
}

function renderLeaderboard(players: Player[]) {
    const listContainer = document.getElementById("leaderboard-list");
    if (!listContainer) return;

    listContainer.innerHTML = "";

    if (!players.length) {
        const li = document.createElement("li");
        li.className = "leaderboard-item leaderboard-item--empty";
        li.textContent = "No results yet. Play a few games to appear here!";
        listContainer.appendChild(li);
        return;
    }

    players.forEach((player, index) => {
        const listItem = document.createElement("li");
        listItem.className = "leaderboard-item";

        const rank = index + 1;
        const rankSpan = document.createElement("span");
        rankSpan.className =
            "leaderboard-item__rank " +
            (rank === 1 ? "leaderboard-item__rank--1" :
                rank === 2 ? "leaderboard-item__rank--2" :
                    rank === 3 ? "leaderboard-item__rank--3" : "");
        rankSpan.textContent = `#${rank}`;

        const userDiv = document.createElement("div");
        userDiv.className = "leaderboard-item__user";

        const nameDiv = document.createElement("div");
        nameDiv.className = "leaderboard-item__user-name";
        nameDiv.textContent = player.username || "Unknown";

        const metaDiv = document.createElement("div");
        metaDiv.className = "leaderboard-item__user-meta";
        metaDiv.textContent = `Wins: ${player.amountOfVictories} • Games: ${player.amountOfGames}`;

        userDiv.appendChild(nameDiv);
        userDiv.appendChild(metaDiv);

        const scoreDiv = document.createElement("div");
        scoreDiv.className = "leaderboard-item__score";
        scoreDiv.textContent = `${player.winRate}%`;

        listItem.appendChild(rankSpan);
        listItem.appendChild(userDiv);
        listItem.appendChild(scoreDiv);

        listContainer.appendChild(listItem);
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fetchLeaderboard);
} else {
    fetchLeaderboard();
}


setInterval(fetchLeaderboard, 30_000);

window.addEventListener("storage", (e) => {
    if (e.key === "lb-refresh") {
        fetchLeaderboard();
    }
});

