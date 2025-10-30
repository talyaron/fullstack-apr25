async function fetchLeaderBoard() {
    try {
        const response = await fetch('/api/data/leaderboard');
        if (!response.ok) {
            throw new Error(`Network response was not ok can't find leaderboard data`);
        }
        const data = await response.json();
        renderLeaderBoard(data);
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
    }
}
function renderLeaderBoard(data : Array<{ username: string; amountOfWins: string; attempts: number; }>) {
    const list = document.getElementById('leaderboard-list');
    if (!list) return;

    list.innerHTML = "";

    data.forEach(player => {
        const listItem = document.createElement('li');
        listItem.textContent = `${player.username} - AmountsOfWins: ${player.amountOfWins}, Attempts: ${player.attempts}, `;
        list.appendChild(listItem);
    });

}