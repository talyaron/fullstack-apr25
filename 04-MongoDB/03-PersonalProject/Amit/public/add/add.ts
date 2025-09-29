async function addFact(title: string, description: string, category: string) {
  try {
    const response = await fetch("http://localhost:3000/api/facts/add-fact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "SECRET",
      },
      body: JSON.stringify({ title, description, category }),
      credentials: "include",
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to add fact");

    alert("Fact added successfully!");
    window.location.href = "../index.html";
  } catch (error: any) {
    console.error("Add fact error:", error);
    alert(error.message);
  }
}

document.getElementById("addFactForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = (document.getElementById("title") as HTMLInputElement).value;
  const description = (document.getElementById("description") as HTMLInputElement).value;
  const category = (document.getElementById("category") as HTMLInputElement).value;
  addFact(title, description, category);
});
