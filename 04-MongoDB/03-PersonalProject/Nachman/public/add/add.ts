// Share discovery function
async function createDiscovery(discoveryTitle: string, discoveryText: string, selectedTopic: string, levelDifficulty: string): Promise<void> {
  try {
    const apiCall = await fetch("http://localhost:3000/api/discoveries/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer KNOWLEDGESHARE2025",
      },
      body: JSON.stringify({ 
        title: discoveryTitle, 
        content: discoveryText, 
        topic: selectedTopic,
        difficulty: levelDifficulty 
      }),
      credentials: "include",
    });

    const response = await apiCall.json();
    if (!apiCall.ok) throw new Error(response.message || "Failed to share discovery");

    alert("🎉 Discovery shared successfully!");
    window.location.href = "../index.html";
  } catch (error: any) {
    console.error("Share discovery error:", error);
    alert(error.message);
  }
}

// Form handler
document.getElementById("discoveryForm")?.addEventListener("submit", (e: Event) => {
  e.preventDefault();
  const title = (document.getElementById("title") as HTMLInputElement).value;
  const content = (document.getElementById("content") as HTMLTextAreaElement).value;
  const topic = (document.getElementById("topic") as HTMLSelectElement).value;
  const difficulty = (document.getElementById("difficulty") as HTMLSelectElement).value;
  createDiscovery(title, content, topic, difficulty);
});